import ytdl from "ytdl-core";
import fs from "fs";
const download = async (url, folder, file) => {
    const output = `${folder}/${file}.mp4`;
    if (fs.existsSync(output)) {
        console.log("File Already Exists");
    }
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder);
    }
    const vidStream = ytdl(url, { quality: "highest" });
    const writeStream = fs.createWriteStream(output);
    return new Promise((resolve, reject) => {
        vidStream.pipe(writeStream);
        writeStream.on("finish", () => {
            console.log("Downloaded the video to ", output);
            resolve(output);
        })
        writeStream.on("error", () => {
            console.error("Error, can't write the file to disk!");
            reject();
        });
    })
}
export default download;
// ytdl("youtubeLink").pipe(fs.createWriteStream("video.mp4"));