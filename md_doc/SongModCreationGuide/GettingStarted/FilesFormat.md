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

### Converting Your Video Files (<font color=green>.USM</font>)  
For converting your video file, you have two options:
- [Wannacri_GUI][usm_hiki8man] by Hiki8man
- [WannaCriCS][usm_RERASER]
    - NOTE: Some people have had various issues with this software, such as files not converting fully and/or the YouTube download function not working. While it’s recommended that you download the video manually and use the former option, you can still use this converter in “local” mode.

An important note about these two softwares is that they are both unfortunately named similarly to the infamous WannaCry ransomware attack, which will more likely than not cause it to be flagged as a virus. **Both files are safe, and I would recommend looking into making an exclusion for them in your antivirus software.** If you are ever concerned about whether or not a file is malicious, I recommend scanning it through VirusTotal to obtain a detailed report. The reports for both software can be found here:
- [Wannacri_GUI VirusTotal Report][usm_hiki8man_report]
- [WannaCriCS VirusTotal Report][usm_RERASER_report]

Wannacri_GUI has the option of either using a user interface to select your files and convert them with various options, or using a pre-made <font color=green>.BAT</font> file to convert it to a <font color=green>.USM</font> file. Dragging and dropping your video onto the <font color=green>.BAT</font> file is all you’ll need for this portion, as it will convert your video with the proper VP9 encoding needed for Linux compatibility.  
![USM Conversion Example][USM_Conversion_Example]

If you choose to use the user interface, be sure that you select the VP9 option, otherwise users on Linux and Steam Deck cannot play your mods.  
![wannacri_GUI Example][wannacri_GUI_Example]

If you are using WannaCriCS, be sure that you select Local mode and use videos that you downloaded locally. The YouTube download function has been broken for quite a while as of the time this guide was being written.  
![WannaCriCS Example][wannacriCS_Example]

Please note that Comfy Studio does not support <font color=green>.USM</font> file formats, so you should always keep a back-up of your original files just in case you need to revisit your charts.

### Converting Your Audio Files (<font color=green>.OGG</font>)  
While the audio output from the previous step should suffice, I recommend using a software like Audacity to reconvert your original files to <font color=green>.OGG</font>, giving it the best possible quality and the ability to add other things if you choose. I will be using Audacity in this guide.

Before we start, I want to go over how the game’s song files are formatted for Mega Mix+ specifically. The DIVA games have a feature where the vocal tracks will stop playing if you miss notes. This is done by separating the vocal stems from the instrumentals, and storing them as separate channels. This means **Mega Mix+ utilizes up to 4 audio channels**:  
1. The Left (L) audio channel for the Instrumental
2. The Right (R) audio channel for the Instrumental
3. The Left (L) audio channel for the Vocals
4. The Right (R) audio channel for the Vocals

The audio channels must be mapped to channels 1, 2, 3, and 4 respectively in order to work properly in-game. I will elaborate more on that later in the guide.  
![Audio Channels][4_audio_channels]

**This is different from Arcade Future Tone song files**, which supports 8 audio channels; the normal four audio channels with reduced bass for the arcade cabinet speakers, and another four audio channels for headphones. Please don’t let this confuse you from how Mega Mix+’s audio files are formatted, as Mega Mix+ will still only support the initial 4 channels.  

**This process is completely optional**. Audio (such as the one in the below screenshot) will still load in Mega Mix+ properly even if the instrumental and vocal channels aren’t split from each other. It will simply not have the feature of vocals muting when you miss notes.  
![Non-Split Audio Example][normal_audio_file_example]

### Normalizing Audio
For this section, there is a video guide by AWaffleBird that goes over similar topics to this section. If you wish to do so, watch it [here][AWaffleBird_video].

Mega Mix+, interestingly, decreases the perceived loudness of an audio file for use in-game. There’s an easy way to do this in Audacity by using the “Loudness Normalization…” effect. Simply <kbd>Ctrl+A</kbd> to select all of your audio tracks, and navigate to “Effect”, then “Volume and Compression”, then “Loudness Normalization…”
![Loudness Normalization][loudness_menu]

You will be given a window to put in your normalization options. Make sure that “perceived loudness” is selected, that “Normalize stereo channels independently” is unchecked, and “Treat mono as dual-mono (recommended)” is checked. Setting the normalization to -15.0 LUFS works for most songs, but you may need to experiment.  
![Loudness Normalization Settings][loudness_setting]  
When you’re done, click “Apply”. The waveforms will be a lot smaller like the below image.  
![Normalized Non-Split Audio][loudness_after]

### (Optional) Splitting Vocal and Instrumental Stems
If you don’t want to go through the process of splitting your audio, skip to the [Exporting Audio](#exporting-audio) header. **For the most accurate output, it’s recommended to normalize your audio with the original file before splitting stems.**

There are different software that you can use to separate vocals. A common software that was recommended in the community over the years is [Ultimate Vocal Remover 5][ultimatevocalremovergui], although you aren’t confined to this. **You should always check to see if the stems were separated accurately and didn’t cause any audio loss after converting.** It may be easier to look for split vocal and instrumental stems and resyncing your chart to that instead of fighting with algorithms for a proper output.

Once your instrumentals and vocals are split, they will look something like this when imported (before normalization). These are two tracks with a Left and Right channel each.  
![Split Audio Example][split_audio_example]  
Once you’ve normalized and split your audio, right click on each track and select “Split Stereo to Mono”.  
![Split Stereo to Mono][split_stereo_to_mono]  
When you’re done, everything should be split up into four tracks like this.  
![Split Channels Example][split_channels_example]  
If you feel like you will have trouble keeping up with which track is which, feel free to rename them. It may be helpful when exporting.

### Exporting Audio  
When you are ready to export your audio, navigate to "File", then "Export Audio…"  
![File Export][file_export]  
Select the option “Export to computer”.  
![Export to Computer][export_ogg]  
I typically work with one file at a time per project. If you are working with multiple files, please adjust the “Export Range” accordingly. Otherwise, if you didn’t set-up your file to use four channels, you’re fine to leave these settings as follows:  
- File Name: **pv_####.ogg**
    - Note: Replace <font color=green>####</font> with the Song ID you are using for the song. You should have reserved this earlier in the guide.
- Channels: **Stereo**
- Format: **Ogg Vorbis FIles**
- Audio options:
    - Channels: **Stereo**
    - Sample Rate: **44100 Hz**
    - Quality: **8**

![Normal Export][config_ogg]

<font color=green>.OGG</font> is a lossy format, so it is your choice if you want to increase the quality. **However, increasing it will drastically bloat your file size, so most people will advise against it.**  
A Quality setting of 8 is generally recommended, as it’s a good balance of file size and audio quality. However, double check to make sure that there isn’t any major quality loss.

----

If you did not have split vocals and instrumentals, you’re free to proceed to the next header. However, **if you did have split vocals and instrumentals, you should select “Custom Mapping”.**  
![Custom Mapping Configuration][ogg_mapping]  
Remember to link up your channels like the following (the names are not relevant):
![Custom Mapping Configuration Example][ogg_mapping_config]  
1. **Left Instrumental Channel** to **Channel: 1**
2. **Right Instrumental Channel** to **Channel: 2**
3. **Left Vocal Channel** to **Channel: 3**
4. **Right Vocal Channel** to **Channel: 4**

Once that’s set-up, click “OK” and hit “Export” on the main “Export Audio” window!

<!--- link --->
[ytdlp_link]:https://github.com/yt-dlp/yt-dlp
[ytdlp_gui_link]:https://github.com/kannagi0303/yt-dlp-gui
[cobalt_link]:https://cobalt.tools/
[usm_hiki8man]:https://github.com/hiki8man/Wannacri_GUI/releases
[usm_RERASER]:https://github.com/RERASER/WannaCriCS/releases
[usm_hiki8man_report]:https://www.virustotal.com/gui/file/a7ee1ad107f50e1fe315439932f3f5504ec1ec79183a6ed82bb0fca8d7dfbb03
[usm_RERASER_report]:https://www.virustotal.com/gui/file/25f6333de3789ee7de0e587ef7fc1095b6c8f99adc3fe56fe6bd7b40a9093776/detection
[AWaffleBird_video]:https://www.youtube.com/watch?v=Co3rr6CGGAo
[ultimatevocalremovergui]:https://github.com/Anjok07/ultimatevocalremovergui


<!--- image --->
[USM_Conversion_Example]:https://i.imgur.com/h5NuHBz.gif
[wannacri_GUI_Example]:https://i.imgur.com/knuPBL1.png
[wannacriCS_Example]:https://i.imgur.com/JQ4vIJ1.png
[4_audio_channels]:https://i.imgur.com/G1iVSFj.png
[normal_audio_file_example]:https://i.imgur.com/MXFjzdB.png
[loudness_menu]:https://i.imgur.com/ATTBjXB.png
[loudness_setting]:https://i.imgur.com/4aponT6.png
[loudness_after]:https://i.imgur.com/6X4k2QO.png
[split_audio_example]:https://i.imgur.com/lwipu63.png
[split_stereo_to_mono]:https://i.imgur.com/rDFkQX2.png
[split_channels_example]:https://i.imgur.com/CYYJb8U.png
[file_export]:https://i.imgur.com/L544Xjz.png
[export_ogg]:https://i.imgur.com/IaQAZtl.png
[config_ogg]:https://i.imgur.com/E2GxsM0.png
[ogg_mapping_button]:https://i.imgur.com/y2JrGRu.png
[ogg_mapping_config]:https://i.imgur.com/TSGQhSZ.png