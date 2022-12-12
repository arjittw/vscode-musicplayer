import { playingState, updateState } from './statusBar';
import * as vscode from 'vscode';
import { downloadTrack, getDownloadPath, getSearchPick } from './youtube';
import { player } from './player';

export async function searchYoutube(context: vscode.ExtensionContext) {
    const pick = await getSearchPick();

    if (!pick) return;

    const downloadPath = getDownloadPath(context);

    const track = await downloadTrack(pick.data.url, downloadPath);

    track.on('end', async () => {
        await player.load(downloadPath);
        await player.play();
        playingState();
        updateState();
    });
}
