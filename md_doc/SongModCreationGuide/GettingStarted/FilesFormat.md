> Author: lavverso   
> Date: 2026-05-11  
> Source: [Google Doc Link](https://docs.google.com/document/d/1xjQmM2EENKshNn-9o1U6KPMNADEkTrPyobqw1vRzvhQ/edit?tab=t.0#heading=h.sjrxwdhhqogt)

## Obtaining Your Files
Before doing anything, you’ll want to grab the video and/or audio files for the song that you want to chart and convert them into DIVA’s formats. This is helpful especially for the audio file to help make sure that your chart keeps the same sync from Comfy Studio to the in-game implementation.


**While most mods utilize movie files, you also have the option to use static sprite(s) in place of a movie file.** If you choose to use sprites, I will provide another explanation later in the guide when you are setting up your sprite files.


You have several options that are recommended by the community to grab your audio and/or video files:

- [yt-dlp][ytdlp_link]
    - Works for YouTube, Nico Nico Douga, and other video services
    - Needs to be used via a command prompt
- [yt-dlp-gui][ytdlp_gui_link]
    - Windows Only
    - Provides a user interface for [yt-dlp][ytdlp_link] so that you don’t need to use a command prompt, but requires a little bit of set-up
- [cobalt.tools][cobalt_link]
    - Browser interface compared to a downloadable software
    - Supports various video services, but does NOT support Nico Nico Douga at the time this guide was written
    - You may have to rely on community forks such as https://cobalt.meowing.de/ whenever YouTube does something on their back-end that breaks it.

This guide will not be a tutorial for how to use these software. If you’re going to be modding the game, you should be able to utilize common sense to research and find out how to use them. Just note that if you’re downloading from YouTube, it will sometimes break the software due to YouTube’s constant fight against ad blockers. Therefore, you may have to use these interchangeably if updating them doesn’t fix it.


If you are going to be utilizing a video file, you will want to download video files with **VP9 codec**. This is because Linux (ie. Steam Deck) doesn’t support H264 codec and can fail to load the video file, resulting in a black screen or sometimes crash. **It’s also important to note that converting H264 codec videos to VP9 codec can be time consuming depending on your hardware and inflate the video’s file size**. Therefore, it’s recommended that you download VP9 codec videos from the start when you can. (Sometimes videos are not available with VP9 codec, and that’s okay- but you should always choose VP9 when the option is available). **Never download your files in a resolution higher than 1920 x 1080.**


**If you download a file in <font color=green>.WEBM</font> format, it should always have a VP9 codec. So utilize that when you have the option!**

> [!Tip]If your only codec download option is H264 (which is typical for older videos on sites like Nico Nico Douga), it may be less costly to convert your video to VP9 codec via FFmpeg before converting it into a .USM container. If you’re editing videos, you can use plug-ins such as the AdobeWebM extension for Adobe Premiere Pro to add a .WEBM export option, which has VP9 codec by default.


Otherwise, formats do not matter as they will be converted later by the tools this guide will go over. Download whatever will give you the highest quality out of the options available. For example, <font color=green>.MP4</font> for video or <font color=green>.WAV/.OPUS/.M4A</font> for audio. **Based on my own experience, I would avoid <font color=green>.MP3</font> formats** as they can cut out any blank space at the beginning of the audio file and cause your video to become unsynced.


Other things such as stereo audio channels and separated instrumentals and vocals are good things to take into consideration when choosing which files you want to use, but this is optional and I will go more in-depth about this later in the guide.

## Converting to DIVA Supported Formats  
Now that you have your files, you’ll prepare them to be used in-game. **It’s recommended that you keep copies of the original files just in case**. Also please note that the <font color=green>.OGG</font> Vorbis format Project DIVA utilizes for audio files can be **very lossy**, so any work done on the audio file should be done to the original file and **not** the <font color=green>.OGG</font>.

Your song mod will utilize specific formats:

- A <font color=green>.OGG</font> Vorbis format audio file with a Sample Rate of 44100 Hz
- A movie file stored in a CriWare <font color=green>.USM</font> container

I will cover this in two steps: converting your video, and converting your audio. **Feel free to disregard the video conversion step and wait until later in the guide for a tutorial on how to set-up sprite backgrounds.**

### Converting Your Video Files (.USM)

[ytdlp_link]:https://github.com/yt-dlp/yt-dlp
[ytdlp_gui_link]:https://github.com/kannagi0303/yt-dlp-gui
[cobalt_link]:https://cobalt.tools/