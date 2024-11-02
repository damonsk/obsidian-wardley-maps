import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, TFile } from 'obsidian';
import { Root, createRoot } from 'react-dom/client';
import React from 'react';
import {MapViewContainer} from './MapViewContainer';

interface MyPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default'
}

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		await this.loadSettings();
		this.registerMarkdownCodeBlockProcessor('wardleymap', async (source, el, ctx) => {
			console.log("Wardley Map Code Block Processor", [source, el, ctx]);	
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

							console.log('Wardley map block updated successfully');
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
		
		// // This adds an editor command that can perform some operation on the current editor instance
		// this.addCommand({
		// 	id: 'sample-editor-command',
		// 	name: 'Sample editor command',
		// 	editorCallback: (editor: Editor, view: MarkdownView) => {
		// 		console.log(editor.getSelection());
		// 		editor.replaceSelection('Sample Editor Command');
		// 	}
		// });
		// // This adds a complex command that can check whether the current state of the app allows execution of the command
		// this.addCommand({
		// 	id: 'open-sample-modal-complex',
		// 	name: 'Open sample modal (complex)',
		// 	checkCallback: (checking: boolean) => {
		// 		// Conditions to check
		// 		const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
		// 		if (markdownView) {
		// 			// If checking is true, we're simply "checking" if the command can be run.
		// 			// If checking is false, then we want to actually perform the operation.
		// 			if (!checking) {
		// 				new SampleModal(this.app).open();
		// 			}

		// 			// This command will only show up in Command Palette when the check function returns true
		// 			return true;
		// 		}
		// 	}
		// });

		// // This adds a settings tab so the user can configure various aspects of the plugin
		// this.addSettingTab(new SampleSettingTab(this.app, this));

		// // If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// // Using this function will automatically remove the event listener when this plugin is disabled.
		// this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
		// 	console.log('click', evt);
		// });

		// // When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		// this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
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

// class SampleModal extends Modal {
// 	constructor(app: App) {
// 		super(app);
// 	}

// 	onOpen() {
// 		const {contentEl} = this;
// 		contentEl.setText('Woah!');
// 	}

// 	onClose() {
// 		const {contentEl} = this;
// 		contentEl.empty();
// 	}
// }

// class SampleSettingTab extends PluginSettingTab {
// 	plugin: MyPlugin;

// 	constructor(app: App, plugin: MyPlugin) {
// 		super(app, plugin);
// 		this.plugin = plugin;
// 	}

// 	display(): void {
// 		const {containerEl} = this;

// 		containerEl.empty();

// 		new Setting(containerEl)
// 			.setName('Setting #1')
// 			.setDesc('It\'s a secret')
// 			.addText(text => text
// 				.setPlaceholder('Enter your secret')
// 				.setValue(this.plugin.settings.mySetting)
// 				.onChange(async (value) => {
// 					this.plugin.settings.mySetting = value;
// 					await this.plugin.saveSettings();
// 				}));
// 	}
// }
