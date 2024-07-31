import * as vscode from 'vscode';
import { searchMusic } from './commands/searchMusic'
import { player } from './player'
import { controls } from './commands/controls';
import { initDb } from './db';
import { statusBar } from './statusBar';
import { searchAndAddToPlaylist } from './commands/searchAndAddToPlaylist';
import * as fs from "fs";
import { playAPlaylist } from './commands/playAPlaylist';

export async function activate(context: vscode.ExtensionContext) {
	if (!fs.existsSync(context.globalStorageUri.fsPath)) {
		fs.mkdirSync(context.globalStorageUri.fsPath);
	}
	try {
		await player.start();
	} catch (error) {
		console.log(error);
		vscode.window.showErrorMessage("Failed to find MPV on your system!", {
			modal: true,
			detail: "Make sure MPV is installed and is on your PATH.",
		});
		return;
	}
	initDb(context)
	searchMusic(context)
	searchAndAddToPlaylist(context)
	playAPlaylist(context)
	controls(context)
	statusBar(context)
}

export async function deactivate() {
	await player.quit()
}
