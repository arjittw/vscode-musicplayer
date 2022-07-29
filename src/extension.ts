import * as vscode from 'vscode';
import {searchYoutubePrompt} from './searchYoutube'

export function activate(context: vscode.ExtensionContext) {
	searchYoutubePrompt(context)
}

export function deactivate() {}
