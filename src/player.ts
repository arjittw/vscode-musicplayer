const mpv = require('node-mpv-km');

export const player = new mpv({
    audio_only: true,
    auto_restart: true,
});
