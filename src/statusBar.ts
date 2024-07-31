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

    togglePauseButton = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Left,
        185
    );
    togglePauseButton.command = 'musicplayer.togglePause';
    togglePauseButton.text = '';

    seekForwardButton = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Left,
        185
    );
    seekForwardButton.command = 'musicplayer.seekForward';
    seekForwardButton.text = '$(chevron-right)';

    playNextButton = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Left,
        185
    );
    playNextButton.command = 'musicplayer.playNext';
    playNextButton.text = '$(triangle-right)';

    playPreviousButton = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Left,
        185
    );
    playPreviousButton.command = 'musicplayer.playPrevious';
    playPreviousButton.text = '$(triangle-left)';

    context.subscriptions.push(
        playPreviousButton,
        seekBackwordButton,
        togglePauseButton,
        seekForwardButton,
        playNextButton
    );
}

player.on('started', () => {    
    togglePauseButton.tooltip = 'Play';
})

player.on('paused', () => {
    togglePauseButton.tooltip = 'Pause';
})

export async function playingState() {
    playPreviousButton.show()
    seekBackwordButton.show();
    togglePauseButton.show();
    seekForwardButton.show();
    playNextButton.show()
}

export async function stoppedState() {
    playPreviousButton.hide()
    seekBackwordButton.hide();
    togglePauseButton.hide();
    seekForwardButton.hide();
    playNextButton.hide()
}

player.on('stopped', () => {
    stoppedState();
});

player.on('timeposition', async (timePosition: number) => {
    const time = new Date(timePosition * 1000).toISOString();
    togglePauseButton.text =
        timePosition < 3600 ? time.substring(14, 19) : time.substring(11, 19);
});
