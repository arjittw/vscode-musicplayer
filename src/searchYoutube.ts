import * as vscode from 'vscode';
import * as yt from 'youtube-search-without-api-key';
const mpv = require("node-mpv-km");
import ytdl = require('ytdl-core');
import * as fs from 'fs'


export function searchYoutubePrompt(context: vscode.ExtensionContext) {
    const player = new mpv({
        "audio_only": true
    });

    let searchYoutube = vscode.commands.registerCommand('musicplayer.searchYoutube', async () => {
        const input = await vscode.window.showInputBox({
            prompt: "Search YouTube",
            placeHolder: "Search",
        });
        if (!input) return;

        const results = await yt.search(input);

        const pick = await vscode.window.showQuickPick(
            results.map((item) => {
                return { label: item.title, description: item.snippet.duration, url: item.url };
            }),
            {});

        if (!pick) return;

        const track = ytdl(pick.url, {
            filter: "audioonly",
            dlChunkSize: 250000,
        });

        const fileDownloadPath = vscode.Uri.joinPath(context.globalStorageUri,'song.webm').fsPath;
        
        if(!fs.existsSync(context.globalStorageUri.fsPath)) {
            fs.mkdirSync(context.globalStorageUri.fsPath);
        };

        track.pipe(fs.createWriteStream(fileDownloadPath))

        track.on('end', async () => {
            await player.start()
            await player.load(fileDownloadPath)
        })
    });

    context.subscriptions.push(searchYoutube);
}