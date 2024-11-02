# Obsidian Wardley Maps Plugin

This is plugin for Obsidian (https://obsidian.md) that enables displaying and editing of Wardley Maps in the [OnlineWardleyMaps](https://onlinewardleymaps.com) format.

## Usage

Add a code block to your markdown file using Source mode ` ```wardleymap ` include with a closing ` ``` `.  View the raw source of this file to see an example below.

### Example

```wardleymap
title Sample Wardley Map
note "This is a simple example" at 0.5 0.5 [0.89, 0.08]

component Customer [0.58, 0.17] 
component Website [0.52, 0.68] 
component Payment Gateway [0.25, 0.60] 
component Hosting [0.3, 0.4] 

Customer -> Website
Website -> Payment Gateway
Website -> Hosting

size [800,400]
```

## Getting Started

> **⚠️ Important: Installer Version Requirement**  
> Wardley Maps requires a recent version of the Obsidian installer. If you experience issues with the plugin not loading properly:
> 
> 1. First, try updating Obsidian normally at `Settings > General > Check for updates`.
> 
> 2. If issues persist, manually update your Obsidian installer:
>    - Download the latest installer from [Obsidian's download page](https://obsidian.md/download)
>    - Close Obsidian completely
>    - Run the new installer
> 
> For more details, see [Obsidian's guide on installer updates](https://help.obsidian.md/Getting+started/Update+Obsidian#Installer+updates).

Currently, Wardley Maps is available through [Beta Quickstart](#beta-quickstart-recommended) or [Manual Installation](#manual-installation). Community plugin support is coming soon.

### Beta Quickstart (Recommended)

To install Obsidian Wardley Maps as a beta plugin:

1. Install the BRAT plugin if you haven't already. [Click here](obsidian://show-plugin?id=obsidian42-brat) to install BRAT in Obsidian.
2. Open the command palette and run the command **"BRAT: Add a beta plugin for testing"**.
3. Copy and paste this link into the modal: https://github.com/damonsk/obsidian-wardley-maps and click "Add Plugin" and wait for the installation.
4. Go to `Settings > Community plugins` and refresh the list of plugins. Enable "Wardley Maps".

### Manual Installation

1. Download `main.js`, `manifest.json`, and `styles.css` from the [latest release](https://github.com/damonsk/obsidian-wardley-maps/releases/latest).
2. Create a folder named `obsidian-wardley-maps` in your vault's `<Vault>/.obsidian/plugins/` directory.
3. Place the downloaded files into this new folder.
4. Open Obsidian settings `Settings > Community plugins`, and enable Wardley Maps.

## License

This project is licensed under the [AGPL-3.0 license](LICENSE).

## Support the Project

If you find [obsidian-wardley-maps](https://github.com/damonsk/obsidian-wardley-maps), [OnlineWardleyMaps](https://github.com/damonsk/onlinewardleymaps) or [vscode-wardley-maps](https://github.com/damonsk/vscode-wardley-maps) valuable, consider supporting its development:

[![Patreon](https://c5.patreon.com/external/logo/become_a_patron_button.png)](https://www.patreon.com/mapsascode/overview)

Follow on X (Twitter) [@MapsAsCode](https://x.com/mapsascode) for updates and announcements!

Your support helps maintain and improve this plugin as well as OnlineWardleyMaps and vscode-wardley-maps. Every contribution is appreciated. Thank you for your support!