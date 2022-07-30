import * as vscode from 'vscode';
import {searchYoutube} from './searchYoutube'
import {player} from './player'
import { controls } from './controls';
import { initDb } from './storage';

export function activate(context: vscode.ExtensionContext) {
	initDb(context)
	player.start()
	searchYoutube(context)
	controls(context)
}

export async function deactivate() {
	await player.quit()
}
