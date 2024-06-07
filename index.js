#!/usr/bin/env node
import { program } from "commander";
import download from "./video-downloader.js";
import convertAudio from "./audio-downloader.js";
import audioDownloader from "./audioFromYT.js";
program
    .name("youtube-converter")
    .description("a cli tool which lets users download audio or video from youtube")
    .version("1.0.0");

// program.command("lower <name>")
//     .option("-l, --lowercase", "convert a string to lowercase version")
//     .action((name, options) => {
//         console.log(`Hello, ${options.lowercase ? name.toLowerCase() : name}`);
//     });


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
    .option("-f, --folderName <folder>", "output folder name", "audio")
    .option("-n, --name <file>", "output file name", "audio")
    .action(async (url, options) => {
        const { folderName: folder, name: file } = options;
        try {
            const output = await audioDownloader(url, folder, file);
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
// console.log("test");