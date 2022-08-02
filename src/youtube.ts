import * as fs from 'fs';
import * as vscode from 'vscode';
import * as yt from 'youtube-search-without-api-key';
import ytdl = require('ytdl-core');

export async function downloadTrack(url: string, path: string) {
    const track = ytdl(url, {
        filter: 'audioonly',
        dlChunkSize: 250000,
    });

    track.pipe(fs.createWriteStream(path));

    return track;
}

export async function getSearchResults() {
    const input = await vscode.window.showInputBox({
        prompt: 'Search YouTube',
        placeHolder: 'Search YouTube',
    });

    if (!input) return;

    const results = await yt.search(input);
    return results;
}

export async function getSearchPick() {
    const results = await getSearchResults();
    if (!results) return;

    return await vscode.window.showQuickPick(
        results.map(item => {
            return {
                label: item.title,
                detail: `${item.snippet.duration} - ${item.snippet.publishedAt}`,
                data: item,
            };
        }),
        {}
    );
}

export function getDownloadPath(context: vscode.ExtensionContext) {
    return vscode.Uri.joinPath(
        context.globalStorageUri,
        'youtube download.webm'
    ).fsPath;
}
