> Author: lavverso   
> Date: 2026-05-11  
> Source: [Google Doc Link](https://docs.google.com/document/d/1xjQmM2EENKshNn-9o1U6KPMNADEkTrPyobqw1vRzvhQ)

*Hatsune Miku: Project DIVA Mega Mix+* uses script files for its charts and PVs. These script files contain information such as notes, when challenge times start and end, when to toggle the appearance of certain characters, when to play movie files, and when to change stages (among many others). These scripts are down as <font color=green>.DSC</font> files, which is one of the many binary formats that DIVA uses.

## Exporting Your Comfy Studio Chart
Before exporting your chart, you should take your **converted audio** file from the previous step and load it into Comfy Studio. This is to make sure your movie file and chart are still synced with the audio. At this point, you should have already made your chart and be aware of how to adjust timing offsets properly.

When saving charts in Comfy Studio, it will save it as a <font color=green>.CSFM</font> format file. DIVA obviously won’t use this, so you’ll need to export it to a <font color=green>.DSC</font> file. The Comfy Studio manual goes over this, so you should know how to do it if you read it earlier when the guide mentioned it. But, just in case…

1. In Comfy Studio, go to the ‘**File**’ tab, then ‘**Export**’, then ‘**Export PV Script Chart…**’.
![Export PV Script Chart][export_dsc_menu]  
    - ‘**Export UPDC Chart…**’ is PPD related and will not be covered in this guide.
    - ‘**Export PV Script MData…**’ only works for *Hatsune Miku: Project DIVA Arcade Future Tone* and requires you to have a dump of the game to even utilize it.

2. Name the file with the following naming schemes depending on your difficulty, replacing <font color=green>####</font> with your reserved PV ID from earlier:
    |||
    |---|---|
    |pv_####_<font color=Salmon>extreme</font>.dsc|…for <font color=Salmon>EXTREME</font> difficulty charts.|
    |pv_####_<font color=#9400D3>extreme_1</font>.dsc|…for <font color=#9400D3>EXTRA EXTREME</font> difficulty charts.|
    |pv_####_<font color=Gold>hard</font>.dsc|…for <font color=Gold>HARD</font> difficulty charts.|
    |pv_####_<font color=MediumSeaGreen>normal</font>.dsc|…for <font color=MediumSeaGreen>NORMAL</font> difficulty charts.|
    |pv_####_<font color=DarkTurquoise>easy</font>.dsc|…for <font color=DarkTurquoise>EASY</font> difficulty charts.|

## Checking Your Output
You can easily check the output of your chart by using Nastys’s [DSC Studio][dsc_studio]. Each DIVA scripts needs, at minimum, the following to play correctly:

1. <font color=green>TIME(0)</font>
    - …to begin the following commands at the beginning of the PV. All DSC commands are prefaced with a <font color=green>TIME()</font>; command, which specifies when a command will be run.:
2. <font color=green>CHANGE_FIELD(1)</font>;
    - …to set the first “stage” of the PV, even if it’s non-existent. You will utilize this if you want to use a sprite as the background instead of a movie file.
3. <font color=green>MIKU_DISP(0, 0)</font>;
    - …to hide the character, since they won’t be used in a 2D PV.
4. <font color=green>MUSIC_PLAY()</font>;
    - …to play the music defined in <font color=green>mod_pv_db.txt</font>. If a song file is defined but non-existent while this command is present, it will result in an infinite loading loop until the file is found by the game.
5. <font color=green>MOVIE_PLAY(1)</font>;
    - …to play the movie defined in <font color=green>mod_pv_db.txt</font>. If a movie file is defined but non-existent while this command is present, it will result in an infinite loading loop until the file is found by the game.
6. <font color=green>MOVIE_DISP(1)</font>;
    - …to display the played movie.
7. <font color=green>TIME(#)</font>;
    - …a final <font color=green>TIME()</font>; command for your script. # should be replaced with however long you want your script to run.
8. <font color=green>PV_END()</font>;
    - …to end the PV.
9. <font color=green>END()</font>;
    - …to stop parsing the script and send you to the next menu.

![Edit DSC File][edit_dsc]   
Exporting your chart with Comfy Studio will take care of all of this for you, but keep this in mind for when you are manually editing the script.

## (Optional) Manual Additions
These are optional features that Samyuu’s main branch of Comfy Studio does not support, which you can add using [DSC Studio][dsc_studio]. There may be forks of the software that support these features, but for the simplicity of the guide and for documentation purposes I won’t be discussing those forks. You can find more documentation on DSC commands [here][dma_dsc_doc].

> [!TIP]
> For all of my manual additions, I like to set things up in an extra <font color=green>.DSC</font> file that can easily be merged with whatever chart I’m working with. This is handy for when you’re working with multiple difficulties. You can easily merge two <font color=green>.DSC</font> files into one using the ‘**Merge (experimental)...**’ option under the ‘**File**’ tab in DSC Studio, which will automatically sort out commands with the option to remove unnecessary <font color=green>TIME()</font>; commands and move <font color=green>PV_END()</font>; and <font color=green>END()</font>; to the end of the script.

<!-- Links -->
[dsc_studio]:https://nastys.github.io
[dma_dsc_doc]:https://docs.divamodarchive.com/DivaScript

<!-- Image -->
[export_dsc_menu]:assets/image15.png
[edit_dsc]:assets/image16.png