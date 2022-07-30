import ytdl = require("ytdl-core");
import * as fs from "fs";

export async function downloadTrack(url: string, path: string) {
    const track = ytdl(url, {
        filter: "audioonly",
        dlChunkSize: 250000,
    });

    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }

    track.pipe(fs.createWriteStream(path));

    return track;
}
