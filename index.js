#!/usr/bin/env node
import { program } from "commander";
import download from "./video-downloader.js";
import convertAudio from "./audio-downloader.js";
import getVideoTitle from "./utils/getVideoTitle.js"
import audioDownloader from "./audioFromYT.js";
import chalk from "chalk";
import figlet from "figlet";
import avDownloader from "./av-downloader.js";
import inquirer from "inquirer";
import ora from "ora"

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
program.command("interactive")
    .description("Interactive mode for the user to choose from download options")
    .action(() => {
        inquirer.prompt([
            {
                type: "list",
                name: "action",
                message: "Choose what do you want to download?",
                choices: ["Only Video", "Only Audio", "Video with Audio", "Manual Download"]
            },
        ]).then((res) => {
            if (res.action === "Only Video") {
                inquirer.prompt([
                    {
                        type: "input",
                        name: "url",
                        message: "Please enter a clean youtube link to convert: ",
                    }
                ]).then(async (ans) => {
                    try {
                        const title = await getVideoTitle(ans.url);
                        const cleaner = title.replace(/[^a-zA-Z0-9]/g, '_');
                        const fileName = cleaner;
                        const loader = ora("Downloading Video at: video/" + fileName).start();
                        const output = await download(ans.url, "video", fileName);
                        loader.succeed(console.log(chalk.green(`Download completed: ${output}`)));
                    }
                    catch (err) {
                        console.error(err);
                    }
                })
            }
            else if (res.action === "Only Audio") {
                inquirer.prompt([
                    {
                        type: "input",
                        name: "url",
                        message: "Please enter a clean youtube link to convert: ",
                    }
                ]).then(async (ans) => {
                    try {
                        const url = ans.url;
                        const title = await getVideoTitle(url);
                        const cleaner = title.replace(/[^a-zA-Z0-9]/g, '_');
                        const fileName = cleaner;
                        const loader = ora(`Downloading Audio at: music/${fileName}`).start();
                        const output = await audioDownloader(url, "music", fileName);
                        loader.succeed(console.log(chalk.green(`Download completed: ${output}`)));
                    }
                    catch (err) {
                        console.error(err);
                    }
                })
            }
            else if (res.action === "Video with Audio") {
                inquirer.prompt([
                    {
                        type: "input",
                        name: "url",
                        message: "Please enter a clean youtube link to convert: ",
                    }
                ]).then(async (ans) => {
                    try {
                        const url = ans.url
                        const folder = "videos"
                        const title = await getVideoTitle(url);
                        const cleaner = title.replace(/[^a-zA-Z0-9]/g, '_');
                        const fileName = cleaner;
                        const loader = ora(`Downloading Video at: ${folder}/${fileName}`).start();
                        const output = await avDownloader(url, folder, fileName);
                        loader.succeed(console.log(chalk.green(`Download completed: ${output}`)));
                    }
                    catch (err) {
                        console.error(err);
                    }
                })
            }
            else if (res.action === "Manual Download") {
                console.log(chalk.white("To manually download, use the -f for folder argument and -n for file name"));
                console.log(chalk.white("To download just video: youtube-converter download <url> -f <folderPath> -n <fileName>"));
                console.log(chalk.white("To download just audio: youtube-converter download-audio <url> -f <folderPath> -n <fileName>"));
                console.log(chalk.white("To download both audio and video: youtube-converter download-av <url> -f <folderPath> -n <fileName>"));
            }
            else {
                console.log(chalk.red("Invalid Action!"));
                process.exit(1);
            }
        })
    })

program.command("download <url>")
    .description("Enables users to download videos from youtube")
    .option("-f, --folderName <folder>", "output folder name", "videos")
    .option("-n, --name <file>", "output file name")
    .action(async (url, options) => {
        const { folderName: folder, name: file } = options;
        try {
            const title = await getVideoTitle(url);
            const cleaner = title.replace(/[^a-zA-Z0-9]/g, '_');
            const fileName = file || cleaner;
            const loader = ora(`Downloading Video at: ${folder}/${fileName}`).start();
            const output = await download(url, folder, file);
            loader.succeed(console.log(chalk.green(`Download completed: ${output}`)));
        }
        catch (err) {
            console.error(err);
        }
    })

program.command("download-audio <url>")
    .description("Enables users to download audio from youtube")
    .option("-f, --folderName <folder>", "output folder name", "music")
    .option("-n, --name <file>", "output file name")
    .action(async (url, options) => {
        const { folderName: folder, name: file } = options;
        try {
            const title = await getVideoTitle(url);
            const cleaner = title.replace(/[^a-zA-Z0-9]/g, '_');
            const fileName = file || cleaner;
            const loader = ora(`Downloading Video at: ${folder}/${fileName}`).start();
            const output = await audioDownloader(url, folder, fileName);
            loader.succeed(console.log(chalk.green(`Download completed: ${output}`)));
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

program.command("download-av <url>")
    .description("Enables users to download both audio and video from youtube")
    .option("-f, --folderName <folder>", "output folder name", "videosAV")
    .option("-n, --name <file>", "output file name")
    .action(async (url, options) => {
        const { folderName: folder, name: file } = options;
        try {
            const title = await getVideoTitle(url);
            const cleaner = title.replace(/[^a-zA-Z0-9]/g, '_');
            const fileName = file || cleaner;
            const loader = ora(`Downloading Video at: ${folder}/${fileName}`).start();
            const output = await avDownloader(url, folder, fileName);
            loader.succeed(console.log(chalk.green(`Download completed: ${output}`)));
            console.log(`Download completed: ${output}`);
        }
        catch (err) {
            console.error(err);
        }
    })


program.parse(process.argv);