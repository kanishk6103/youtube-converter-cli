import fs from "fs";
import ffmpegPath from "ffmpeg-static";
import ffmpeg from "fluent-ffmpeg";
import chalk from "chalk";

ffmpeg.setFfmpegPath(ffmpegPath);

const convertAudio = async (audioPath, folderName, fileName) => {
    const output = `${folderName}/${fileName}.mp3`;
    if (fs.existsSync(output)) {
        console.log("File Already Exists");
        return output;
    }
    if (!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName);
    }
    const options = [
        '-vn', // only audio, no video
        '-acodec', 'libmp3lame', // codec name used
        '-ac', '2', // 2 audio channels (stereo)
        '-ab', '160k',  //320 kbps bitrate
        '-ar', '48000' // audio sample rate 48k
    ]
    return new Promise((resolve, reject) => {
        ffmpeg(audioPath)
            .outputOptions(options)
            .save(output)
            .on('error', (error, stdout, stderr) => {
                console.log(chalk.yellow("FFMPEG error! ", error));
                // console.log(chalk.yellow("ouput: ", stdout));
                // console.log(chalk.yellow("stderr ", stderr));
                reject(error);
            })
            .on('exit', () => {
                console.log("audio downloaded");
                resolve(output);
            });
    });
}

export default convertAudio;