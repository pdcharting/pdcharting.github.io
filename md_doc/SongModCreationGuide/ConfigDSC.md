> Author: lavverso   
> Date: 2026-05-11  
> Source: [Google Doc Link](https://docs.google.com/document/d/1xjQmM2EENKshNn-9o1U6KPMNADEkTrPyobqw1vRzvhQ)

*Hatsune Miku: Project DIVA Mega Mix+* uses script files for its charts and PVs. These script files contain information such as notes, when challenge times start and end, when to toggle the appearance of certain characters, when to play movie files, and when to change stages (among many others). These scripts are down as <font color=green>`.DSC`</font> files, which is one of the many binary formats that DIVA uses.

## Exporting Your Comfy Studio Chart
Before exporting your chart, you should take your **converted audio** file from the previous step and load it into Comfy Studio. This is to make sure your movie file and chart are still synced with the audio. At this point, you should have already made your chart and be aware of how to adjust timing offsets properly.

When saving charts in Comfy Studio, it will save it as a <font color=green>`.CSFM`</font> format file. DIVA obviously won’t use this, so you’ll need to export it to a <font color=green>`.DSC`</font> file. The Comfy Studio manual goes over this, so you should know how to do it if you read it earlier when the guide mentioned it. But, just in case…

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

1. <font color=green>TIME(0);</font>
    - …to begin the following commands at the beginning of the PV. All DSC commands are prefaced with a <font color=green>`TIME();`</font> command, which specifies when a command will be run.:
2. <font color=green>CHANGE_FIELD(1);</font>
    - …to set the first “stage” of the PV, even if it’s non-existent. You will utilize this if you want to use a sprite as the background instead of a movie file.
3. <font color=green>MIKU_DISP(0, 0);</font>
    - …to hide the character, since they won’t be used in a 2D PV.
4. <font color=green>MUSIC_PLAY();</font>
    - …to play the music defined in <font color=green>`mod_pv_db.txt`</font>. If a song file is defined but non-existent while this command is present, it will result in an infinite loading loop until the file is found by the game.
5. <font color=green>MOVIE_PLAY(1);</font>
    - …to play the movie defined in <font color=green>`mod_pv_db.txt`</font>. If a movie file is defined but non-existent while this command is present, it will result in an infinite loading loop until the file is found by the game.
6. <font color=green>MOVIE_DISP(1);</font>
    - …to display the played movie.
7. <font color=green>TIME(#);</font>
    - …a final <font color=green>`TIME();`</font> command for your script. # should be replaced with however long you want your script to run.
8. <font color=green>PV_END();</font>
    - …to end the PV.
9. <font color=green>END();</font>
    - …to stop parsing the script and send you to the next menu.

![Edit DSC File][edit_dsc]   
Exporting your chart with Comfy Studio will take care of all of this for you, but keep this in mind for when you are manually editing the script.

## (Optional) Manual Additions
These are optional features that Samyuu’s main branch of Comfy Studio does not support, which you can add using [DSC Studio][dsc_studio]. There may be forks of the software that support these features, but for the simplicity of the guide and for documentation purposes I won’t be discussing those forks. You can find more documentation on DSC commands [here][dma_dsc_doc].

> [!TIP]
> For all of my manual additions, I like to set things up in an extra <font color=green>`.DSC`</font> file that can easily be merged with whatever chart I’m working with. This is handy for when you’re working with multiple difficulties. You can easily merge two <font color=green>`.DSC`</font> files into one using the ‘**Merge (experimental)...**’ option under the ‘**File**’ tab in DSC Studio, which will automatically sort out commands with the option to remove unnecessary <font color=green>`TIME();`</font> commands and move <font color=green>`PV_END();`</font> and <font color=green>`END();`</font> to the end of the script.

### Converting TIME(); Unit Values   

----

As mentioned earlier, all DSC commands are prefaced with a <font color=green>`TIME();`</font> command, which specifies when a command will be run.   
You can easily convert time values to DIVA’s <font color=green>`TIME();`</font> units using Nastys’s [PDTIME][pd_time_tool] tool. Simply put in a time in HH:MM:SS.ssss format to convert to <font color=green>`TIME();`</font> units.

<font color=green>`TIME();`</font> units is the time in seconds multiplied by 100,000. For example… 
- 1. 3:13.50 (3 minutes, 13 seconds, 50 milliseconds) would be 193.5 seconds.
- 2. Multiply that by 100,000 to get 19350000 (193,5 * 100,000 = 19,350,000).
- 3. The 19350000 is the value that will be inserted in your TIME(); command.  

Your final <font color=green>`TIME();`</font> command would be <font color=green>`TIME(19350000);`</font>.   
Nastys’s [DSC Studio][dsc_studio] will also display <font color=green>`TIME();`</font> command values in HH:MM:SS.ssss format in real time while editing.

### Refining Your Sync

----

Sometimes, your chart sync may be off depending on your movie and song offsets. You can experiment with your offset by using the ‘**Advanced TIME shift…**’ option in DSC Studio.
![Advanced TIME shift...][time_shift]

### Adding CHALLENGE TIME

----

> [!IMPORTANT]
> This is for adding Challenge Time to Arcade charts. The information is different for adding Challenge Time and Chance Time to New Classics charts.

Use the <font color=green>`MODE_SELECT(31,1);`</font> command to designate the beginning of your chart’s Challenge Time. Use the <font color=green>`MODE_SELECT(31,3);`</font> command to designate the end of your chart’s Challenge Time. A chart should have only one Challenge Time, and adding more may cause issues.

For example, if you would like your Challenge Time to begin at 2:42.0000:
<font color=green>
`TIME(16200000);`   
`MODE_SELECT(31,1);`
</font>

If you would like your Challenge Time to end at 3:13.5000:   
<font color=green>
`TIME(19350000);`   
`MODE_SELECT(31,3);`
</font>

Please note that for Arcade charts, Challenge Times only appear in EASY and NORMAL difficulty charts. If you would like them to appear in HARD, EXTREME, or EXTRA EXTREME difficulty charts, you will need to use an extra plug-in such as vixen256’s [Challenge Time][ct_mod] mod. **This will bloat your scores as Challenge Time will give you additional points, and is not just an aesthetic change like Technical Zones.**

### Adding TECHNICAL ZONES   

----

> [!IMPORTANT]
> This is for adding Technical Zones to Arcade charts. The information is different for adding Technical Zones to New Classics charts.

`Technical Zones` technically (hah) do not exist in Mega Mix+, even though the commands for them do exist in some of the early chart additions from *Hatsune Miku: Project DIVA F* such as *Unhappy Refrain*. However, they can be reimplemented using ehoclover’s [Let’s Get Technical!][tz_mod] or [New Classics][nc_mod] mods. **Unlike Challenge Time, Technical Zones are only an aesthetic change in Arcade charts. Passing or failing Technical Zones will not affect your score in Arcade charts.**

Use the <font color=green>`MODE_SELECT(31,8);`</font> command to designate the beginning of a Technical Zone. Use the <font color=green>`MODE_SELECT(31, 9);`</font> command to designate the end of a Technical Zone. Per official rules, charts should only have two Technical Zones which should not overlap with a Challenge Time. However, it is possible to do so otherwise.

For example, if you would like your Technical Zone to begin at 1:45.5000:   
<font color=green>
`TIME(10550000);`   
`MODE_SELECT(31,8);`
</font>

If you would like your Technical Zone to end at 2:26.0000:   
<font color=green>
`TIME(14600000);`   
`MODE_SELECT(31,9);`
</font>

### Adding Chance Time Notes (or Rainbow Notes)

----

In Arcade charts, Chance Time was reimplemented as a singular note that, when hit, plays a special “SUCCESS” effect and changes the PV to a special success event. These are only ever seen in PVs from *Hatsune Miku: Project DIVA F* and *Hatsune Miku: Project DIVA F 2nd*, as those are the only two games that support success events. However, it’s possible to add these to any song whether or not you have a success event.

While I could list every target ID that you would need to change in order to have its rainbow counterpart, it’s much easier to do the following:

- 1. Open Comfy Studio, and copy the note that you would like to change to a rainbow note.
- 2. Paste what you copied into a text editor. You should get something like this:
![Past into Text Editor][past_comfy_note_test]
- 3. Each <font color=green>Target</font> item has a list of values that defines things like the note type, X and Y position values, angle information, etc. **To turn your note into a rainbow, change the sixth (6) value in the list to a 1.** If you pasted a multi-note, repeat this process for each target.
![][set_chance_true]
- 4. Copy the section for your note. Paste back into Comfy Studio. Delete your old note and replace it if needed. Your note(s) should now have a rainbow border effect.
![][check_chance_note]
- 5. Export your DSC normally. Congratulations, you now have a rainbow note in your chart!
You will also need to add <font color=green>pv_####.pvbranch_success_se_name=pvchange04</font> to your <font color=green>mod_pv_db.txt</font>, replacing <font color=green>####</font> with your reserved PV ID. You will be reminded of this during that section of the guide.

----

<!-- Links -->
[dsc_studio]:https://nastys.github.io
[dma_dsc_doc]:https://docs.divamodarchive.com/DivaScript
[pd_time_tool]:https://nastys.github.io/pdtime/
[ct_mod]:https://divamodarchive.com/post/75
[tz_mod]:https://divamodarchive.com/post/47
[nc_mod]:https://divamodarchive.com/post/169

<!-- Image -->
[export_dsc_menu]:assets/image15.png
[edit_dsc]:assets/image16.png
[time_shift]:assets/image4.png
[past_comfy_note_test]:assets/image30.png
[set_chance_true]:assets/image32.png
[check_chance_note]:assets/image47.png