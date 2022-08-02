import * as vscode from 'vscode';
import { db } from '../db';
import { getSearchPick } from '../youtube';

export function searchAndAddToPlaylist(context: vscode.ExtensionContext) {
    let searchMusic = vscode.commands.registerCommand(
        'musicplayer.searchAndAddToPlaylist',
        async () => {
            const sitePick = await vscode.window.showQuickPick(['YouTube'], {});
            if (sitePick === 'YouTube') {
                const searchPick = await getSearchPick();

                if (!searchPick) return;

                const playlistName = await vscode.window.showInputBox({
                    prompt: "Enter Playlist Name in which to add",
                })

                if (!playlistName) return;

                db.push(`/playlists/${playlistName}`,searchPick.data)

                vscode.window.showInformationMessage(`Added "${searchPick.data.snippet.title}" to playlist "${playlistName}"`);
            }
        }
    );

    context.subscriptions.push(searchMusic);
}
