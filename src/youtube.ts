import * as fs from 'fs';
import * as vscode from 'vscode';
// import * as yt from 'youtube-search-without-api-key';
import ytdl = require('@distube/ytdl-core');
const ytsr = require('ytsr');

export async function downloadTrack(url: string, path: string) {
    console.log(url, path);
    
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

    const results = await ytsr(input, { limit: 10 });

    return results as any;
}

export async function getSearchPick() {
    const results = await getSearchResults();

    if (!results) return;

    return await vscode.window.showQuickPick(
        results.items
            .filter((item: any) => item.type === 'video')
            .map((item: any) => {
                return {
                    label: item.title,
                    detail: `${item.duration} - ${item.author.name} - ${item.uploadedAt}`,
                    data: item,
                };
            }),
        {}
    ) as any;
}

export function getDownloadPath(context: vscode.ExtensionContext) {
    return vscode.Uri.joinPath(
        context.globalStorageUri,
        'youtube download.webm'
    ).fsPath;
}
