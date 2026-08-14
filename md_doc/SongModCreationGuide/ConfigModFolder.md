> Author: lavverso   
> Date: 2026-06-30  
> Source: [Google Doc Link](https://docs.google.com/document/d/1xjQmM2EENKshNn-9o1U6KPMNADEkTrPyobqw1vRzvhQ)

Your mod should be set-up very specifically so that the mod loader can properly load your mod and databases, and so that the game can properly locate your files. If you download the template mod that I created, you can get an idea of how your mod should be set-up. You can also reference how to set-up your mod by looking at other mods.

For a standard 2D PV song mod, your mod folder should be structured like this:

```treeview
MOD NAME/
├── rom/
│   ├── 2d/
│   │   ├── mod_spr_db.bin
│   │   ├── spr_sel_pv####.farc
│   │   └── spr_sel_pvtmb_mod_name.farc
│   ├── movie/
│   │   └── pv_####.usm
│   ├── script/
│   │   ├── pv_####_extreme.dsc
│   │   ├── pv_####_extreme_1.dsc
│   │   ├── pv_####_hard.dsc
│   │   ├── pv_####_normal.dsc
│   │   └── pv_####_easy.dsc
│   ├── sound/
│   │   └── song/
│   │       └── pv_####.ogg
│   └── mod_pv_db.txt
└── config.toml
```

Here are some important things to keep in mind:

1. Just like with the previous section, any instance of **<font color=red>####</font>** should be replaced with **<font color=green>your reserved PV ID</font>**.

2. In the <font color=green>script</font> folder, it isn’t necessary to include all difficulties for each song. Only include the difficulties that you made. You will specify which difficulties you do and don’t have in your PV database, <font color=green>mod_pv_db.txt</font>, later in the guide. The next section will cover how to get these <font color=green>.DSC</font> files and which naming scheme to use.

3. Any instance of files containing <font color=green>pv_####</font> can be repeated if you’re putting multiple songs in one mod.

4. <font color=green>spr_sel_pvtmb_mod_name.farc</font> is a new naming scheme and thumbnail format that was introduced in DIVA Mod Loader v0.0.16 by vixen256. <font color=green>mod_name</font> should be replaced with your mod name, removing any special characters and replacing spaces with _ (eg. <font color=green>spr_sel_pvtmb_lavverso_song_pack.farc</font>). It’s **very important** that you pick a unique name for your mod and this file, as two files being named the same will lead to conflicts.

<!-- treeview --> 
<style>
  .markdown-section pre[data-lang="treeview"]::after {
    content: "Mod Folder Example";
  }
  .token.treeview-part .entry-name.ext-dsc:before { content: "\ea07"; } 
  .token.treeview-part .entry-name.ext-farc:before { content: "\ea08"; }
  .token.treeview-part .entry-name.ext-usm:before { content: "\ea05"; }
  .token.treeview-part .entry-name.ext-toml:before { content: "\ea06"; }
</style>