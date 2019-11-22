
export class SoundManager
{

    public static s_ClickSound="res/Audio/Click.mp3";
 // public static s_CrashSound="res/Audio/Crash.mp3";
    public static s_DefeateSound="res/Audio/Defeate.mp3";
    public static s_LevelUpSound="res/Audio/LevelUp.mp3";
    public static s_MainUISound="res/Audio/MainUI.mp3";
    public static s_VictorySound="res/Audio/Victory.mp3";
    public static s_TimeReduceSound="res/Audio/TimeGo.mp3";
    public static s_StartGameSound="res/Audio/TimeEnd.mp3";

    private static s_canPlaySound=true;
    private static s_canPlayMusic=true;


    public static PlaySound(soundurl:string)
    {
        if (!this.s_canPlaySound) return;
        Laya.SoundManager.playSound(soundurl);
    }

    //背景音乐
    public static PlayMusic(musicurl:string)
    {
        if (!this.s_canPlayMusic) {
            return;
        }
        Laya.SoundManager.musicVolume=0.5;
        Laya.SoundManager.playMusic(musicurl,0);
        
    }


    public static StopSound(soundurl:string)
    {
       // if (!this.s_canPlaySound) return;
        Laya.SoundManager.stopSound(soundurl);
    }


    //背景音乐
    public static StopMusic()
    {
        Laya.SoundManager.stopMusic();
    }

    //
    public static OpenMusic()
    {
        this.s_canPlayMusic=true;
        SoundManager.PlayMusic(this.s_MainUISound);
    }

    public static CloseMusic()
    {
        this.s_canPlayMusic=false;
        Laya.SoundManager.stopMusic();
    }


    public static MuteSound(){
        this.s_canPlaySound=false;
        Laya.SoundManager.stopAllSound();
    }


    public static OpenAllSound()
    {
        this.s_canPlaySound=true;
        Laya.SoundManager.stopAllSound();
    }


}