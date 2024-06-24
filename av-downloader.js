import ytdl from "ytdl-core";
import fs from "fs";
import ffmpegPath from "ffmpeg-static";
import cp from "child_process";
import stream from "stream";

const avDownloader = async (url, folder, file, options = {}) => {
    const output = `${folder}/${file}.mp4`;
    if (fs.existsSync(output)) {
        console.log("File Already Exists");
        return output;
    }
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder);
    }
    const result = new stream.PassThrough({ highWaterMark: options.highWaterMark || 1024 * 512 });

    try {
        const info = await ytdl.getInfo(url, options);
        const audioStream = ytdl.downloadFromInfo(info, { ...options, quality: 'highestaudio' });
        const videoStream = ytdl.downloadFromInfo(info, { ...options, quality: 'highestvideo' });

        const ffmpegProcess = cp.spawn(ffmpegPath, [
            '-loglevel', '8', '-hide_banner',
            '-i', 'pipe:3', '-i', 'pipe:4',  // input audio and video by pipe
            '-map', '0:a', '-map', '1:v',  // map audio and video correspondingly
            '-c', 'copy', // no need to change the codec
            output
        ], {
            windowsHide: true,  // no popup window for Windows users
            stdio: [
                'pipe', 'pipe', 'pipe', // silence stdin/out, forward stderr,
                'pipe', 'pipe' // and pipe audio, video
            ]
        });

        audioStream.pipe(ffmpegProcess.stdio[3]);
        videoStream.pipe(ffmpegProcess.stdio[4]);

        ffmpegProcess.on('close', () => {
            console.log('ffmpeg process finished');
            result.end();
        });

        ffmpegProcess.on('error', (err) => {
            console.error('ffmpeg process error:', err);
            result.destroy(err);
        });

        return new Promise((resolve, reject) => {
            ffmpegProcess.on('close', (code) => {
                if (code === 0) {
                    resolve(output);
                } else {
                    reject(new Error(`ffmpeg process exited with code ${code}`));
                }
            });
        });
    } catch (err) {
        console.error('Error downloading audio or video:', err);
        result.destroy(err);
        throw err;
    }
};

export default avDownloader;
