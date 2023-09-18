import * as vscode from 'vscode';
import { db } from '../db';
import { player } from '../player';
import { playingState, updateState } from '../statusBar';
import { downloadTrack, getDownloadPath } from '../youtube';

let playlist: any = [];
let next: number;
let downloadPath: string;

export function playAPlaylist(context: vscode.ExtensionContext) {
    downloadPath = getDownloadPath(context);

    let playAPlaylist = vscode.commands.registerCommand(
        'musicplayer.playAPlaylist',
        async () => {
            const playlists = await db.getData('/playlists/');
            next = 0;
            const pick = await vscode.window.showQuickPick(Object.keys(playlists), {});
            if (!pick) return;

            playlist = playlists[pick];

            downloadAndPlayNext();
        }
    );

    context.subscriptions.push(playAPlaylist);
}

export async function downloadAndPlayNext() {
    const track = await downloadTrack(playlist[next].url, downloadPath);

    track.once('end', async () => {
        await player.load(downloadPath);
        await player.play();
        playingState();
        updateState();
    });

    player.once('stopped', () => {
        next++;
        if (playlist.length > next) {
            downloadAndPlayNext();
        }
    });
}

export function addToNextAndPlay(){
    const number = 1;
    if (playlist.length > next + number) {
        next += number;
        downloadAndPlayNext();
    } else {
        vscode.window.showWarningMessage("No tracks next in playlist");
    }
}

export function addLastToNextAndPlay(){
    console.log(playlist.length, next)
    if (next > 0) {
        next -= 1;
        downloadAndPlayNext();
    } else {
        vscode.window.showWarningMessage("No tracks beyond in playlist");
    }
}
