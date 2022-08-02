import * as vscode from 'vscode';
import { player } from './player';

export let togglePauseButton: vscode.StatusBarItem;
export let seekForwardButton: vscode.StatusBarItem;
export let seekBackwordButton: vscode.StatusBarItem;
export let playNextButton: vscode.StatusBarItem;
export let playPreviousButton: vscode.StatusBarItem;

export async function statusBar(context: vscode.ExtensionContext) {
    seekBackwordButton = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Left,
        185
    );
    seekBackwordButton.command = 'musicplayer.seekBackword';
    seekBackwordButton.text = '$(chevron-left)';
    context.subscriptions.push(seekBackwordButton);

    togglePauseButton = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Left,
        185
    );
    togglePauseButton.command = 'musicplayer.togglePause';
    togglePauseButton.text = '';
    context.subscriptions.push(togglePauseButton);

    seekForwardButton = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Left,
        185
    );
    seekForwardButton.command = 'musicplayer.seekForward';
    seekForwardButton.text = '$(chevron-right)';
    context.subscriptions.push(seekForwardButton);
}

export async function updateState() {
    togglePauseButton.tooltip = (await player.isPaused()) ? 'Play' : 'Pause';
}

export async function playingState() {
    seekBackwordButton.show();
    togglePauseButton.show();
    seekForwardButton.show();
}

export async function stoppedState() {
    seekBackwordButton.hide();
    togglePauseButton.hide();
    seekForwardButton.hide();
}

player.on('stopped', () => {
    stoppedState();
});

player.on('timeposition', async (timePosition: number) => {
    const time = new Date(timePosition * 1000).toISOString();
    togglePauseButton.text =
        timePosition < 3600 ? time.substring(14, 19) : time.substring(11, 19);
});
