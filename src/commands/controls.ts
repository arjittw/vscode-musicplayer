import { player } from '../player';
import * as vscode from 'vscode';
import { updateState } from '../statusBar';
import { downloadAndPlayNext, addToNext } from './playAPlaylist';

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
        addToNext(1);
        downloadAndPlayNext();
    });

    let playPrevious = vscode.commands.registerCommand(
        'musicplayer.playPrevious',
        async () => {
            addToNext(-1);
            downloadAndPlayNext();
        }
    );

    context.subscriptions.push(
        seekForward,
        seekBackword,
        togglePause,
        playNext,
        playPrevious
    );
}
