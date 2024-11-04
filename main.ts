import { Plugin, TFile } from 'obsidian';
import { Root, createRoot } from 'react-dom/client';
import React from 'react';
import {MapViewContainer} from './MapViewContainer';

interface WardleyMapsPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: WardleyMapsPluginSettings = {
	mySetting: 'default'
}

export default class WardleyMapsPlugin extends Plugin {
	settings: WardleyMapsPluginSettings;

	async onload() {
		await this.loadSettings();
		this.registerMarkdownCodeBlockProcessor('wardleymap', async (source, el, ctx) => {
			el.appendChild(document.createTextNode(source));
			let root: Root;
			if (el instanceof Element) {
				const reactComponent = React.createElement(MapViewContainer, {
					markdownText: source,
					mutateMapText: async (newText: string) => {
						// Get the active file from the context
						const activeFile = ctx.sourcePath ? this.app.vault.getAbstractFileByPath(ctx.sourcePath) : null;

						// Proceed if activeFile is found and is a TFile
						if (activeFile instanceof TFile) {
							// Read the current content of the file
							const fileContent = await this.app.vault.read(activeFile);

							// Split file content by lines for easier manipulation
							const lines = fileContent.trim().split('\n');

							// Replace the lines for the `wardleymap` block
							// Locate the block by line numbers provided in ctx
							const startLine = ctx.getSectionInfo(el)?.lineStart ?? 0;
							const endLine = ctx.getSectionInfo(el)?.lineEnd ?? 0;

							// Update the block content in-place
							lines.splice(startLine + 1, endLine - startLine - 1, newText.trim());

							// Join lines back and save the file
							const updatedContent = lines.join('\n');
							await this.app.vault.modify(activeFile, updatedContent);
						} else {
							console.error('Unable to locate the active file or file is not a TFile');
						}
					}
				});
				el.classList.add('wardley-map-root');
				root = createRoot(el);
				root.render(reactComponent);
			}
		});
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}