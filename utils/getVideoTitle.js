import ytdl from "ytdl-core";
const getVideoTitle = (videoURL) => {
    return new Promise((resolve, reject) => {
        ytdl.getBasicInfo(videoURL).then(info => resolve(info.videoDetails.title)).catch(err => reject(err));
    });
}

export default getVideoTitle;