# YOUTUBE CONVERTER CLI TOOL
#### A tool by kanishk6103

<br>

![youtube-converter-interactive-menu](https://github.com/kanishk6103/youtube-converter-cli/assets/72643990/f9f79a4a-b62a-4a6a-b25d-e49a6661a7aa)


### Instructions:
  - You can download youtube videos and audio through this cli tool
  - To download without much hassle just type in: ``` youtube-converter interactive ``` and you will get 3 options:
     - [Download only Audio](README.md#download-only-audio)
     - [Download only Video](README.md#download-only-video)
     - [Download video with audio](README.md#download-video-with-audio)
     - [Manual Download](README.md#manual-download)
  <br>
  
  ### Download only Audio
  To download just the audio, you'll have to select "Only Audio" from the interactive menu.
  After selecting the option you'll be asked for a **clean** youtube url, paste the url and press enter.
  The default download location is music/```title of the video``` 
<br>
<br>

  ### Download only Video
  To download just the video, you'll have to select "Only Video" from the interactive menu.
  After selecting the option you'll be asked for a **clean** youtube url, paste the url and press enter.
  The default download location is video/```title of the video``` 
<br>
<br>

  ### Download Video with Audio
  To download the video with audio, you'll have to select "Video with Audio" from the interactive menu.
  After selecting the option you'll be asked for a **clean** youtube url, paste the url and press enter.
  The default download location is videos/```title of the video``` 

<br>

  ### Manual Download
  Manual download gives the user more options to choose the folder and filename for the file. Either choose "Manual Download" from the menu or directly
  type in the following commands: <br>
  #### For Audio Only: ```youtube-converter download-audio <url> -f <folderPath> -n <fileName>``` <br>
  - Default folderPath: music
  - Default fileName: ```title of the video```
  #### For Video Only: ```youtube-converter download <url> -f <folderPath> -n <fileName>``` <br>
  - Default folderPath: videos
  - Default fileName: ```title of the video```
  #### For Video with Audio: ```youtube-converter download-av <url> -f <folderPath> -n <fileName>``` <br>
  - Default folderPath: videosAV
  - Default fileName: ```title of the video```
    <br>
  #### Note: -f and -n are folder and file arguments, if they are not provided default values will be used
