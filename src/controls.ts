import { player } from './player';
import * as vscode from 'vscode';

export function controls(context: vscode.ExtensionContext) {
    let togglePause = vscode.commands.registerCommand(
        'musicplayer.togglePause',
        async () => {
            await player.togglePause();
        }
    );

    let forward = vscode.commands.registerCommand('musicplayer.forward', async () => {
        await player.seek(10);
    });

    let rewind = vscode.commands.registerCommand('musicplayer.rewind', async () => {
        await player.seek(-10);
    });

    context.subscriptions.push(forward, rewind, togglePause);
}
