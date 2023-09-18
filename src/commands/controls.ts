import { player } from '../player';
import * as vscode from 'vscode';
import { updateState } from '../statusBar';
import { addLastToNextAndPlay, addToNextAndPlay } from './playAPlaylist';

export function controls(context: vscode.ExtensionContext) {
    let togglePause = vscode.commands.registerCommand(
        'musicplayer.togglePause',
        async () => {
            await player.togglePause();
            updateState();
        }
    );

    let seekForward = vscode.commands.registerCommand(
        'musicplayer.seekForward',
        async () => {
            await player.seek(10);
            updateState();
        }
    );

    let seekBackword = vscode.commands.registerCommand(
        'musicplayer.seekBackword',
        async () => {
            await player.seek(-10);
            updateState();
        }
    );

    let playNext = vscode.commands.registerCommand('musicplayer.playNext', async () => {
        addToNextAndPlay();
    });

    let playPrevious = vscode.commands.registerCommand(
        'musicplayer.playPrevious',
        async () => {
            addLastToNextAndPlay();
        }
    );

    let editPlaylist = vscode.commands.registerCommand(
        'musicplayer.editPlaylist',
        () => {
            vscode.window.showTextDocument(vscode.Uri.joinPath(context.globalStorageUri, "db.json"));
        }
    );

    context.subscriptions.push(
        seekForward,
        seekBackword,
        togglePause,
        playNext,
        playPrevious,
        editPlaylist
    );
}
