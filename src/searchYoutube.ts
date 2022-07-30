import * as vscode from "vscode";
import * as yt from "youtube-search-without-api-key";
import ytdl = require("ytdl-core");
import * as fs from "fs";
import { player } from "./player";
import { db } from "./storage";
import { downloadTrack } from "./youtube";

export function searchYoutube(context: vscode.ExtensionContext) {
    let searchYoutube = vscode.commands.registerCommand(
        "musicplayer.searchYoutube",
        async () => {
            const input = await vscode.window.showInputBox({
                prompt: "Search YouTube",
                placeHolder: "Search",
            });

            if (!input) return;

            const results = await yt.search(input);

            const pick = await vscode.window.showQuickPick(
                results.map(item => {
                    return {
                        label: item.title,
                        detail: `${item.snippet.duration} - ${item.snippet.publishedAt}`,
                        url: item.url,
                    };
                }),
                {}
            );

            if (!pick) return;

            const downloadPath = vscode.Uri.joinPath(
                context.globalStorageUri,
                "youtube download.webm"
            ).fsPath;

            const track = await downloadTrack(pick.url, downloadPath);

            track.on("end", async () => {
                await player.load(downloadPath);
                await player.resume()
            });
        }
    );

    context.subscriptions.push(searchYoutube);
}
