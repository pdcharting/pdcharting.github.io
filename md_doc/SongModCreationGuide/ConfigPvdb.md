> Author: lavverso   
> Date: 2026-06-30  
> Source: [Google Doc Link](https://docs.google.com/document/d/1xjQmM2EENKshNn-9o1U6KPMNADEkTrPyobqw1vRzvhQ)

## What is pv_db? :id=about_pv_db

The game’s <font color=green>`pv_db`</font> contains almost all information for a song including the BPM, difficulties, the number of performers and who they are, song naming, credits, and more.
![pv_db][pv_db_image]
The game’s <font color=green>`pv_db`</font> is sorted in a tree-like format, with some objects having multiple nodes. It’s also important to note that it is **sorted Lexicographically Ascending**. If it isn’t sorted in that order, the game will fail to parse them and cause issues.

## What is the mod_ prefix? :id=about_mod_prefix
<font color=green>`mod_`</font> prefixed databases allows the mod loader to **append** database entries to the game’s databases. It’s very important that you use <font color=green>`mod_`</font> prefixes for your databases at every opportunity. This is because, without the <font color=green>`mod_`</font> prefix, the mod loader will **replace** the original file which can cause conflicts with other mods at the least and, at the worst, delete vanilla database entries.

You can read more about Mod Database Loading on the [DIVA Mod Loader GitHub page][DML_github].

## mod_pv_db Categories :id=categories
Some categories might be unused by the vanilla game. However, I would recommend filling them out accurately in case any future mods or plug-ins depend on the values.

You can comment out specific lines in your <font color=green>`mod_pv_db.txt`</font> by prefacing a line with a hash (<font color=green>#</font>). Please remember any lines that you may have commented out if you use any special text editor functions, such as the **Sort Lines Lexicographically Ascending** Line Operation in Notepad++.

The **Song Mod Resources** file linked at the beginning of the guide includes a **Template Song Mod**. That contains a template <font color=green>`mod_pv_db.txt`</font> for you to use. **The first thing you should do is replace all instances of <font color=green>pv_####</font> with your reserved PV ID**. You can easily do this by doing <kbd>Ctrl</kbd>+<kbd>H</kbd> in Notepad++, a handy text editor that many DIVA modders rely on.
![Replace Hash][replace_hash]

Do note that any changes done to your <font color=green>`mod_pv_db.txt`</font> will not be reflected until you restart your game.

> [!TIP]
> You can easily find references on how to set up your <font color=green>`mod_pv_db`</font> by referring to the following:
> 1. <font color=green>`pv_db.txt`</font> in **rom_steam_region** of **diva_main_region.cpk**
> 2. <font color=green>`mdata_pv_db.txt`</font> in **rom_steam_region_dlc** of **diva_dlc00_region.cpk**
> 3. Referring to <font color=green>`mod_pv_db.txt`</font> of other mods (although you shouldn’t redistribute parts of other’s mods, and this guide is not endorsing that)

### BPM :id=bpm
----
```
pv_####.bpm
```
Take your BPM from your chart in Comfy Studio, and put it here. If you have multiple BPM changes in your chart, put whatever the most common BPM value is in your song.

This value is mostly unused by the vanilla game but is required for your entry to load.

### Date :id=date
----
```
pv_####.date
```
Input the date in <font color=green>YYYMMDD</font> format. For example, <font color=green>`20200101`</font> for January 1, 2020, or <font color=green>`20101125`</font> for November 25, 2010.   
This can be whatever day you want. The most common use cases are the date that the chart was added, or the date that the mod (or mod update) containing the chart was to be released.

This value is mostly unused by the vanilla game but is required for your entry to load.

### Song Difficulties :id=difficulty
----
```
pv_####.difficulty
```
Here, you will identify your charts and what difficulties they are for. This is where the naming schemes mentioned earlier during the [Exporting Your Comfy Studio Chart][export_dsc] section will come into play.

Since <font color=green>`mod_pv_db.txt`</font> is to be listed Lexicographically Ascending, you will need to list difficulties in the following order:
- 1. EASY
- 2. EXTREME
    - EXTRA EXTREME charts are listed as an attribute of EXTREME charts. More will be detailed below.
- 3. HARD
- 4. NORMAL

If you don’t have a chart for a specific difficulty, then the length field needs to be 0. For example,

```
pv_####.difficulty.easy.length=0
pv_####.difficulty.extreme.length=0
pv_####.difficulty.hard.length=0
pv_####.difficulty.normal.length=0
```

For difficulty levels, they are written in the <font color=green>`pv_db`</font> with the format <font color=green>`PV_LV_WW_D`</font>, with <font color=green>`WW`</font> being a two digit whole number and <font color=green>`D`</font> being a decimal. For example, **6.5** would be <font color=green>`PV_LV_06_5`</font>. **10.0** would be <font color=green>`PV_LV_10_0`</font>. Even if your difficulty is a single digit, you should still append a 0 to the front to make it two digits (similar to the <font color=green>`PV_LV_06_5`</font> example).   
Please refer in-game to which star ratings are available for each difficulty (eg. for EXTREME, 6.0, 6.5, and so-on). Anything outside of what the game uses for each difficulty is not accepted.

Below are guides to help you put in your chart information.

> [!IMPORTANT]
> **Remember to replace <font color=green>####</font> with your reserved PV ID.**

#### <font color=DarkTurquoise>Easy</font> :id=difficulty_ez
<details open>
  <summary><strong>Settings</strong></summary>

```
pv_####.difficulty.easy.0.edition=0
pv_####.difficulty.easy.0.level=PV_LV_01_0
pv_####.difficulty.easy.0.level_sort_index=20
pv_####.difficulty.easy.0.script_file_name=rom/script/pv_####_easy.dsc
pv_####.difficulty.easy.0.script_format=0x15122517
pv_####.difficulty.easy.0.version=1
pv_####.difficulty.easy.length=1
```
</details>
<details open>
  <summary><strong>Difficulty Levels</strong></summary>

EASY songs should only have the following difficulty levels. Copy-paste them as needed.   
```
PV_LV_01_0
PV_LV_01_5
PV_LV_02_0
PV_LV_02_5
PV_LV_03_0
PV_LV_03_5
PV_LV_04_0
PV_LV_04_5
```
</details>

#### <font color=Salmon>Extreme</font> :id=difficulty_ex
<details open>
  <summary><strong>Settings</strong></summary>

```
pv_####.difficulty.extreme.0.edition=0
pv_####.difficulty.extreme.0.level=PV_LV_08_0
pv_####.difficulty.extreme.0.level_sort_index=20
pv_####.difficulty.extreme.0.script_file_name=rom/script/pv_####_extreme.dsc
pv_####.difficulty.extreme.0.script_format=0x15122517
pv_####.difficulty.extreme.0.version=1
pv_####.difficulty.extreme.length=1
```
</details>
<details open>
  <summary><strong>Difficulty Levels</strong></summary>

EXTREME songs should only have the following difficulty levels. Copy-paste them as needed.
```
PV_LV_06_0
PV_LV_06_5
PV_LV_07_0
PV_LV_07_5
PV_LV_08_0
PV_LV_08_5
PV_LV_09_0
PV_LV_09_5
PV_LV_10_0
```
</details>

#### <font color=#9400D3>EXTRA EXTREME</font> :id=difficulty_exex
<details open>
  <summary><strong>Settings</strong></summary>

> [!NOTE]
> It’s possible to have an EXTRA EXTREME chart without having an EXTREME chart. If you want to do that, the set-up is the same as EXTREME except with two key differences:
> 1. An additional .attribute.extra=1 field, signifying that it’s an extreme chart.
> 2. The script_file_name attribute should point to rom/script/pv_####_extreme_1.dsc

Here is an example of that here:
```
pv_####.difficulty.extreme.0.attribute.extra=1
pv_####.difficulty.extreme.0.attribute.original=0
pv_####.difficulty.extreme.0.attribute.slide=1
pv_####.difficulty.extreme.0.edition=1
pv_####.difficulty.extreme.0.level=PV_LV_08_0
pv_####.difficulty.extreme.0.level_sort_index=20
pv_####.difficulty.extreme.0.script_file_name=rom/script/pv_####_extreme_1.dsc
pv_####.difficulty.extreme.0.script_format=0x15122517
pv_####.difficulty.extreme.0.version=1
pv_####.difficulty.extreme.length=1
```

If you would like to have an EXTRA EXTREME chart in addition to an EXTREME chart, you will need to add the following to your already defined EXTREME chart while replacing the pre-existing extreme.length= attribute:
```
pv_####.difficulty.extreme.1.attribute.extra=1
pv_####.difficulty.extreme.1.attribute.original=0
pv_####.difficulty.extreme.1.attribute.slide=1
pv_####.difficulty.extreme.1.edition=1
pv_####.difficulty.extreme.1.level=PV_LV_08_0
pv_####.difficulty.extreme.1.level_sort_index=20
pv_####.difficulty.extreme.1.script_file_name=rom/script/pv_####_extreme_1.dsc
pv_####.difficulty.extreme.1.script_format=0x15122517
pv_####.difficulty.extreme.1.version=1
pv_####.difficulty.extreme.length=2
```

Ensure that you don’t have two pv_####.difficulty.extreme.length= lines. This will cause issues in parsing and may cause the EXTRA EXTREME difficulty to not appear, or vice versa.
</details>
<details open>
  <summary><strong>Difficulty Levels</strong></summary>

EXTRA EXTREME songs have the same difficulty levels as EXTREME. Copy-paste them as needed.
```
PV_LV_06_0
PV_LV_06_5
PV_LV_07_0
PV_LV_07_5
PV_LV_08_0
PV_LV_08_5
PV_LV_09_0
PV_LV_09_5
PV_LV_10_0
```
</details>

#### <font color=Gold>HARD</font> :id=difficulty_hd
<details open>
  <summary><strong>Settings</strong></summary>

```
pv_####.difficulty.hard.0.edition=0
pv_####.difficulty.hard.0.level=PV_LV_06_0
pv_####.difficulty.hard.0.level_sort_index=20
pv_####.difficulty.hard.0.script_file_name=rom/script/pv_####_hard.dsc
pv_####.difficulty.hard.0.script_format=0x15122517
pv_####.difficulty.hard.0.version=1
pv_####.difficulty.hard.length=1
```
</details>
<details open>
  <summary><strong>Difficulty Levels</strong></summary>

HARD songs should only have the following difficulty levels. Copy-paste them as needed.
```
PV_LV_04_0
PV_LV_04_5
PV_LV_05_0
PV_LV_05_5
PV_LV_06_0
PV_LV_06_5
PV_LV_07_0
PV_LV_07_5
PV_LV_08_0
```
</details>

#### <font color=MediumSeaGreen>NORMAL</font> :id=difficulty_nm
<details open>
  <summary><strong>Settings</strong></summary>

```
pv_####.difficulty.normal.0.edition=0
pv_####.difficulty.normal.0.level=PV_LV_04_0
pv_####.difficulty.normal.0.level_sort_index=20
pv_####.difficulty.normal.0.script_file_name=rom/script/pv_####_normal.dsc
pv_####.difficulty.normal.0.script_format=0x15122517
pv_####.difficulty.normal.0.version=1
pv_####.difficulty.normal.length=1
```
</details>
<details open>
  <summary><strong>Difficulty Levels</strong></summary>

NORMAL songs should only have the following difficulty levels. Copy-paste them as needed.
```
PV_LV_03_0
PV_LV_03_5
PV_LV_04_0
PV_LV_04_5
PV_LV_05_0
PV_LV_05_5
PV_LV_06_0
PV_LV_06_5
```
</details>

### (Optional) AET Set Name :id=aet_set_name
----
```
pv_####.disp2d.set_name=####
```
This is for more advanced modders, and setting this up is just to help ensure things load if you were to go back and add extra things to your mod.

All you need to worry about here is setting the value to whatever your PVID is. For example, <font color=green>`pv_275.disp2d.set_name=275`</font>, or <font color=green>`pv_6918.disp2d.set_name=6918`</font>. This will work fine as long as you follow proper naming conventions for your files.

### Movie File Name :id=movie_file_name
----
```
pv_####.movie_file_name
```
This points to the location of your movie file. If you have been following the guide so far and are using the template mod, you can just replace all instances of <font color=green>`pv_####`</font> with your PV ID. For example, <font color=green>`pv_####.movie_file_name=rom/movie/pv_####.mp4`</font> would turn into something like <font color=green>`pv_6918.movie_file_name=rom/movie/pv_6918.mp4`</font>.

Even though your movie file has a <font color=green>`.USM`</font> extension, you should still have <font color=green>`.mp4`</font> in the <font color=green>`mod_pv_db.txt`</font>. The game knows that the movie files are stored in the <font color=green>`.USM`</font> containers, so this will not cause issues.

### Modifier Settings :id=modifier
----
```
pv_####.hidden_timing
pv_####.high_speed_rate
pv_####.sudden_timing
```
These affect the different **Game Modifiers** that are available whenever you select a song to play- **HIDDEN**, **HI SPEED**, and **SUDDEN** respectively. If you would like to customize these, I recommend experimenting and referring to settings from songs in-game that have the same or similar BPMs to your song.

### Performer Settings :id=performer
----
```
pv_####.performer
```
Each song can have up to 6 performer values, with several possible attributes attached to each one. Here is an example:
```
pv_6918.performer.0.chara=MIK
pv_6918.performer.0.pv_costume=1
pv_6918.performer.0.type=VOCAL
pv_6918.performer.1.chara=RIN
pv_6918.performer.1.costume=1
pv_6918.performer.1.type=GUEST
pv_6918.performer.2.chara=LEN
pv_6918.performer.2.costume=1
pv_6918.performer.2.type=GUEST
pv_6918.performer.3.chara=LUK
pv_6918.performer.3.costume=1
pv_6918.performer.3.type=GUEST
pv_6918.performer.4.chara=KAI
pv_6918.performer.4.costume=1
pv_6918.performer.4.type=GUEST
pv_6918.performer.5.chara=MEI
pv_6918.performer.5.costume=1
pv_6918.performer.5.type=GUEST
pv_6918.performer.num=6
```
Similar to the difficulties section, there are a lot more attributes to this that I could cover. **For the simplicity of the guide**, I will be covering strictly what SEGA has used for vanilla 2D PVs. This is to help prevent potential issues from occurring. You can find out more about other performer attributes by checking out songs in the vanilla game or checking other documentation.

#### Performer Character :id=performer_chara
```
pv_####.performer.#.chara
```
This designates which character the song will appear under, and which modules will be recommended to the player. **It is important that you only use one of the 10 characters listed below**, as using a non-existent character can cause issues in-game (for example, with covers).

Please note that, in the vanilla any song that is using a chara from the Extra Characters tab (Yowane Haku, Akita Neru, Sakine Meiko, Kasane Teto) will **not** appear in the “`Singer`” sort even if you are navigating through the “`ALL`” tab. The only exception is if they are partnered with one or more of the main 6 characters.

|<font color=green>`chara`</font> Code|Character Name|Appears in “Singer” sort?|
|---|---|---|
|`MIK`|Hatsune Miku|YES|
|`RIN`|Kagamine Rin|YES|
|`LEN`|Kagamine Len|YES|
|`LUK`|Megurine Luka|YES|
|`KAI`|KAITO|YES|
|`MEI`|MEIKO|YES|
|`HAK`|Yowane Haku|NO|
|`NER`|Akita Neru|NO|
|`SAK`|Sakine Meiko|NO|
|`TET`|Kasane Teto|NO|

#### Performer PV Costume :id=performer_pv_costume
----
```
pv_####.performer.#.pv_costume
```
This attribute is what tells the game what the recommended module should be for your song. It takes the **costume ID** (or COS ID) for a character as it’s listed in the game’s module table, which of course needs to be associated with an existing module.

The quirk to this is that whatever the costume ID is, **the module table expects you to add 1 to whatever the value was**. Since <font color=green>`pv_costume`</font> takes the costume ID **as it’s listed in the module table**, you will need to add +1 to whatever ID you’re using. So, even though all the default modules have a COS ID of 0, they’ll be listed in the module table and your <font color=green>`pv_costume`</font> field as <font color=green>`1`</font>.

All official 2D PV songs in the game use the default modules, so you’re free to just leave any <font color=green>`pv_costume`</font> fields set to <font color=green>`1`</font>. Otherwise, you can look up which costume pertains to which module using [DIVA Mod Archive][DMA].

#### Performer Type :id=performer_type
----
```
pv_####.performer.#.type
```
These are simple classifications that show a character’s role in a PV. If a character **sings** in a PV, then their type should be <font color=green>`VOCAL`</font>. If a character **only appears** in a PV but still plays an important role, then their type should be <font color=green>`GUEST`</font>.

The quirk to this is that whatever the costume ID is, **the module table expects you to add 1 to whatever the value was**. Since <font color=green>`pv_costume`</font> takes the costume ID **as it’s listed in the module table**, you will need to add +1 to whatever ID you’re using. So, even though all the default modules have a COS ID of 0, they’ll be listed in the module table and your <font color=green>`pv_costume`</font> field as <font color=green>`1`</font>.

All official 2D PV songs in the game use the default modules, so you’re free to just leave any <font color=green>`pv_costume`</font> fields set to <font color=green>`1`</font>. Otherwise, you can look up which costume pertains to which module using [DIVA Mod Archive][DMA].

#### Number of Performers
----
```
pv_####.performer.num
```
These designate the number of performers in your song. Remember that the performer indexes start at 0 instead of 1 when counting.

- 1. If you have a performer with index <font color=green>`0`</font>…
        - You will set <font color=green>`pv_####.performer.num=1`</font>
- 2. If you have performers with indexes <font color=green>`0`</font> and <font color=green>`1`</font>…
        - You will set <font color=green>`pv_####.performer.num=2`</font>.
- 3. If you have performers with indexes <font color=green>`0`</font>, <font color=green>`1`</font>, and <font color=green>`2`</font>…
        - You will set <font color=green>`pv_####.performer.num=3`</font>
- 4. If you have performers with indexes <font color=green>`0`</font>, <font color=green>`1`</font>, <font color=green>`2`</font>, and <font color=green>`3`</font>…
        - You will set <font color=green>`pv_####.performer.num=4`</font>
- 5. If you have performers with indexes <font color=green>`0`</font>, <font color=green>`1`</font>, <font color=green>`2`</font>, <font color=green>`3`</font>, and <font color=green>`4`</font>…
        - You will set <font color=green>`pv_####.performer.num=5`</font>
        - At the time of writing this guide, having 5 performers is allowed by the game but may cause some visual issues.
- 6. If you have performers with indexes <font color=green>`0`</font>, <font color=green>`1`</font>, <font color=green>`2`</font>, <font color=green>`3`</font>, <font color=green>`4`</font>, and <font color=green>`5`</font>…
        - You will set <font color=green>`pv_####.performer.num=6`</font>

Having any more than 6 performers is not allowed by the game. Sorry to those who wanted Teto to be with all the Cryptonloids.

#### (Optional) Initializing Performer’s Motions 
----
```
pv_####.motion
```

Technically, you should also initialize all of your performers to use the basic t-pose motion. However, SEGA is really inconsistent with this for the following reasons:

- 1. Earlier 2DPVs (such as _Leia_, _Francisca_, and _slump_) define the default motion as the old <font color=green>`CMN_MRA00_13_01`</font> motion from Arcade. This has never changed.
- 2. 2DPVs introduced at the end of Arcade Future Tone’s lifespan (Hibikase and Suna no Wakusei feat. Hatsune Miku) do not have any motions defined whatsoever.
- 3. SEGA made a mistake with BRING IT ON and instead of defining the t-pose motion for both performers, they just defined two instances of it.

For those reasons, **you do not need to worry about the <font color=green>pv_####.motion</font> field in your <font color=green>mod_pv_db</font> as long as you’re making a 2D PV mod**. However, they will be listed here:
```
pv_####.motion.01=CMN_POSE_DEFAULT_T
pv_####.motion2P.01=CMN_POSE_DEFAULT_T
pv_####.motion3P.01=CMN_POSE_DEFAULT_T
pv_####.motion4P.01=CMN_POSE_DEFAULT_T
pv_####.motion5P.01=CMN_POSE_DEFAULT_T
pv_####.motion6P.01=CMN_POSE_DEFAULT_T
```

#### (Optional) Chance Time Success Audio
----
```
pv_####.pvbranch_success_se_name
```
**If** you added a Chance Time Note (Rainbow Note) to your chart earlier in the guide, you **will** need to add this line to your <font color=green>`mod_pv_db.txt`</font>. Paste this line in after the <font color=green>`pv_####.performer.num=`</font> line, replacing <font color=green>####</font> with your PV ID:
```
pv_####.pvbranch_success_se_name=pvchange04
```

#### Song Select Audio Preview 
----
```
pv_####.sabi
```
You can set this up in Comfy Studio using the Song Preview settings, or by doing it manually:
![Song Preview settings][preview_time]

<font color=green>`pv_####.sabi.play_time=`</font> is the duration of the preview. <font color=green>`pv_####.sabi.start_time=`</font> is when the preview starts. For my example, the fields would be…
```
pv_####.sabi.play_time=29.610
pv_####.sabi.start_time=35.115
```

Do note that Comfy Studio lists the time stamps in MM.SS.ssss, meanwhile the <font color=green>`mod_pv_db.txt`</font> will only take SS.ssss. So if your time stamp is <font color=green>`01:30.000`</font>, you will need to change that to seconds (so add the 60 seconds to the 30 seconds, ie. <font color=green>`pv_####.sabi.start_time=90.000`</font>)

Decimal places are not an issue. SEGA typically tends to round them to the nearest tenth decimal value, if you are curious. Also make sure that you don’t get the values confused, as they’re listed backwards in <font color=green>`pv_db`</font> compared to how they are in Comfy Studio.

#### Song File Name
----
```
pv_####.song_file_name
```
This points to the location of your song file. If you have been following the guide so far and are using the template mod, you can just replace all instances of <font color=green>`pv_####`</font> with your PV ID. For example, <font color=green>`pv_####.song_file_name=rom/sound/song/pv_####.ogg`</font> would turn into something like <font color=green>`pv_6918.song_file_name=rom/sound/song/pv_6918.ogg`</font>.

#### Default Sound Effects
----
```
pv_####.se_name
pv_####.slide_name
pv_####.slidertouch_name
pv_####.chainslide_first_name, etc.
```
Each song has a default sound effect for each type (Button, Slide, Chain Slide, and Slider Control) that is defined in the <font color=green>`pv_db`</font>. These options are what is used for the **Song Defaults** option in the **Button FX Config** in-game.

See the below tables to see which names you should set for each attribute. If needed, you can match the Japanese Names for each sound effect type to the names displayed in Comfy Studio. Using anything outside of this list might cause issues unless your mod includes the custom sound effects.


<details open>
  <summary><strong>Button Sound Effects</strong></summary>

> [!NOTE]
> This information was taken from gm_btn_se_id.bin from rom_ps4 of diva_main.cpk.

|Japanese Name|English Name|se_name|
|---|---|---|
|ボタン音Ａ|Button FX A|01_button1|
|ボタン音Ｂ|Button FX B|02_button2|
|ボタン音Ｃ|Button FX C|03_button3|
|ボタン音Ｄ|Button FX D|05_button5|
|ボタン音Ｅ|Button FX E|06_button6|
|ボタン音Ｆ|Button FX F|41_button9|
|ボタン音Ｇ|Button FX G|42_button10|
|ボタン音Ｈ|Button FX H|43_button11|
|ボタン音Ｉ|Button FX I|44_button12|
|ハイハットＡ|Hi-hat A|08_hh1|
|ハイハットＡ(2nd)|Hi-hat A (2nd)|08_hh1_2nd|
|ハイハットＢ|Hi-hat B|10_hh3|
|ハイハットＢ(2nd)|Hi-hat B (2nd)|10_hh3_2nd|
|大太鼓|Taiko Drum|20_wataiko|
|大太鼓(2nd)|Taiko Drum (2nd)|20_wataiko_2nd|
|ウッドブロックＡ|Woodblock A|21_wood1|
|ウッドブロックＡ(2nd)|Woodblock A (2nd)|21_wood1_2nd|
|ウッドブロックＢ|Woodblock B|22_wood2|
|ウッドブロックＢ(2nd)|Woodblock B (2nd)|22_wood2_2nd|
|スティック|Stick|23_stick|
|タンバリン|Tambourine|24_tambourine|
|タンバリン(2nd)|Tambourine (2nd)|24_tambourine_2nd|
|鈴|Bell|28_bell3|
|クラップ|Clap|29_clap|

</details>

<!-- Links -->
[DML_github]:https://github.com/blueskythlikesclouds/DivaModLoader
[DMA]:https://divamodarchive.com/modules

<!-- Image -->
[pv_db_image]:assets/image8.png
[replace_hash]:assets/image36.png
[preview_time]:assets/image21.png

<!-- Markdown -->
[export_dsc]:/SongModCreationGuide/ConfigDSC.md ':target=exporting-your-comfy-studio-chart'