#!/usr/bin/env node
import { program } from "commander";
import download from "./video-downloader.js";
import convertAudio from "./audio-downloader.js";
import audioDownloader, { getVideoTitle } from "./audioFromYT.js";
import chalk from "chalk";
import figlet from "figlet";
import asciify from "asciify-image";

// let options = {
//     fit: "box",
//     width: 200,
//     height: 100
// }

// asciify('./ytLogo.jpg', options, (err, asciified) => {
//     if (err) throw err;
//     console.log(asciified);
// });

console.log(
    chalk.green(figlet.textSync("YT CONVERTER", { horizontalLayout: "full" }))
)
console.log(
    chalk.blue("~ by kanishk6103\n")
)

program
    .name("youtube-converter")
    .description("a cli tool which lets users download audio or video from youtube")
    .version("1.0.0");

program.command("download <url>")
    .description("Enables users to download videos from youtube")
    .option("-f, --folderName <folder>", "output folder name", "videos")
    .option("-n, --name <file>", "output file name", "video")
    .action(async (url, options) => {
        const { folderName: folder, name: file } = options;
        try {
            const output = await download(url, folder, file);
        }
        catch (err) {
            console.error(err);
        }
    })

program.command("download-audio <url>")
    .description("Enables users to download audio from youtube")
    .option("-f, --folderName <folder>", "output folder name", "E:/D Drive/music stuff")
    .option("-n, --name <file>", "output file name")
    .action(async (url, options) => {
        const { folderName: folder, name: file } = options;
        try {
            const title = await getVideoTitle(url);
            const cleaner = title.replace(/[^a-zA-Z0-9]/g, '_');
            const fileName = file || cleaner;
            const output = await audioDownloader(url, folder, fileName);
        }
        catch (err) {
            console.error(err);
        }
    })
program.command("convert <path>")
    .description("Enables users to convert videos to audio from youtube")
    .option("-f, --folderName <folder>", "output folder name", "audioFolder")
    .option("-n, --name <file>", "output file name", "audio")
    .action(async (path, options) => {
        const { folderName: folder, name: file } = options;
        try {
            const output = await convertAudio(path, folder, file);
            console.log(`Audio converted to ${output}`);
        }
        catch (err) {
            console.error(err);
        }
    })
program.parse(process.argv);