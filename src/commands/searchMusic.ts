import * as vscode from 'vscode';
import { searchYoutube } from '../searchYoutube';

export function searchMusic(context: vscode.ExtensionContext) {
    let searchMusic = vscode.commands.registerCommand('musicplayer.searchMusic', async () => {
        const pick = await vscode.window.showQuickPick(['YouTube'], {});
        if (pick === 'YouTube') {
            await searchYoutube(context);
        }
    });

    context.subscriptions.push(searchMusic);
}
