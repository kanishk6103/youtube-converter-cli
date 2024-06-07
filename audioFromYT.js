import ytdl from "ytdl-core";
import fs from "fs";
const audioDownloader = async (url, folder, file) => {
    const output = `${folder}/${file}.mp3`;
    if (fs.existsSync(output)) {
        console.log("File Already Exists");
        return output;
    }
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder);
    }
    const audioStream = ytdl(url, { quality: "highestaudio" });
    const writeStream = fs.createWriteStream(output);
    return new Promise((resolve, reject) => {
        audioStream.pipe(writeStream);
        writeStream.on("finish", () => {
            console.log("Downloaded the audio to ", output);
            resolve(output);
        })
        writeStream.on("error", () => {
            console.error("Error, can't write the file to disk!");
            reject();
        });
    })
}
export default audioDownloader;