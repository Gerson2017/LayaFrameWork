
import MathTool from "../Tool/MathTool";
import { EventTool } from "../Tool/EventTool";
import { WeChatAd } from "../Tool/WeChatAd";
import Platform, { PlatformType } from "../Tool/Ad/Platform";
import UIManager, { ViewType } from "../UI/UIManager";
import MsgDispatcher, { MsgType } from "../Tool/MsgDispatcher";
import GameManager from "../Tool/Manager/GameManager";
import AdMan from "../Tool/Ad/FaceBookAd";




export class SavePlatformData
{
    public token:string;
    public android_id;
    public build;
    public category;
    public client_ts;
    public connection_type;
    public device;
    public event_id;
    public manufacturer;
    public os_version;
    public platform;
    public sdk_version;
    public session_id;
    public session_num;
    public user_id;
    public d0;
    public d1;
    public d2;
    public d3;
    public d4;
    public d5;
}


export class GroundColorData
{
    public Level:Number;
    public Color:Array<colorgrounddata>;
}

export class colorgrounddata
{
    public r:number;
    public g:number;
    public b:number;
    public a:number;
}


///皮肤配置表
export class SkinData
{
    public page:number;
    public skinIds:number[];
    public price:number;
}


//碰撞基础数据表
export class BaseData
{
   public normalSpeed:number=60;
   public acceleration:number=20;
   public speedInternal:number=30;
   public playerRageCount:number=3;
   public playerRageTime:number=3;
   public enemyRageCount:number=5;
   public enemyRageTime:number=2;//发怒时间

   public CopyData(data:BaseData)
   {
        this.normalSpeed=data.normalSpeed;
        this.acceleration=data.acceleration;
        this.speedInternal=data.speedInternal;
        this.playerRageCount=data.playerRageCount;
        this.playerRageTime=data.playerRageTime;
        this.enemyRageCount=data.enemyRageCount;
        this.enemyRageTime=data.enemyRageTime;
   }
}


export class WeChatShareData
{
    public Title:string;
    public ImageId:string;
    public ImageUrl:string;
}


//关卡等级数据表
export class RankData
{
    public Level:number=1;
    public Rank:string="";
    public Star:number=1;
    public Kill_reward:number=0;
    public Gold_reward:number=0;
    public Diamond_reward:number=0;
    public Special_reward:number=0;
    public Enemy_Attack:number=0;
    public Enemy_Defense:number=0;
    public Enemy_killForceBase:number=0;
    public Enemy_continueForce:number;
    public Enemy_forceinternal:number;
}


//保存信息
export class SaveData 
{
    // public PlayerId:string="";//
    public PlayerLevel: number = 0;//等级
    public PlayerDiamonCount: number = 0;//砖石数
    public PlayerSkinCount: number = 0;//皮肤数
    public GameLoaded: number = -1;//0 游戏资源加载完成 1 游戏资源没有加载完成
    public SceneLoad: number = -1;//0代表没有加载完场景 1代表完成加载完场景
    public PlayerClickStart: number = -1; //0 没有点击开始  1 点击开始
}


//场景信息
export class LevelSceneData   //LevelSceneData
{
    public ID: number = 1;
    public SearchMapStartPoint: Laya.Vector3;
    public MapGripScal: number;
    public SearchMapWidth: number;//搜寻宽度
    public SearchMapHeight: number;//搜寻高度
    public Level: number;
    public AINumber: number;
    public AIStreagy: number;
}

//等级礼物信息
export class LevelGiftData 
{
    public lv: number = 0;
    public RewardType: number;
    public RewardDiamondCount: number;
    public UseFulData: number;
}

//玩家皮肤信息
export class PlayerSkinData 
{
    public SkinArray: Array<number> = [1];

}



//玩家初始信息表
export class PlayerInitialData
{
    public normalSpeed:number;
    public acceleration:number;
    public speedInternal:number;
    public playerRageCount:number;
    public playerRageTime:number;
    public init_attack:number;
    public init_defense:number;
    public attackdis:number;
    public unblancedis:number;
    public unbalance_time:number;
    public unbalance_acceleration:number;
    public roll_time:number;
    public roll_acceleration:number;
} 

//敌人初始信息表
export class EnemyInitialData
{
    public normalSpeed:number;
    public acceleration:number;
    public speedInternal:number;
    public enemyRageCount:number;
    public enemyRageTime:number;
    public attackdis:number;
    public unblancedis:number;
    public unbalance_time:number;
    public unbalance_acceleration:number;
    public roll_time:number;
    public roll_acceleration:number;
} 


///皮肤视频观看
export class SkinVedioData
{
    public date:string;
    public vediotimes:number;
}


//技能信息表
export class SkillInfoData
{
    public Level:number;
    public Attack_consume:number;
    public Defense_consume:number;
    public Profit:number;
    public Profit_consume:number;
    public Player_Attack:number;
    public Player_Defense:number;//摩擦力
    public Player_killForceBase:number;
    public Player_continueForce:number;
    public Player_forceinternal:number;

}


export default class GameRoleData    //PlayerData
{
    public PlayerId: string = "";
    public KillCount: number = 0;//击杀总数
    public killnum: number = 0;//击杀数量
    public Mass: number = 10;
    public Skin: number = 0;
    public DiamonCount: number = 0;
    public GoldCount:number=0;
    public Level: number = 0;
    public MaxLevel:number=0;
    public TeamScore:number=1000;//团队战积分   
    public AttackLevel:number=1;
    public DefenseLevel:number=1;
    public ProfitLevel:number=1;
    public LoginOutTime:number=0;
    public GetSpecialGift:number=-1;
    public GetGiftLevelArray: Array<number> = [];

    public CopyValue(roledata: GameRoleData) 
    {
        if (roledata.killnum != undefined) 
            this.killnum = roledata.killnum;
        if (roledata.KillCount != undefined) 
            this.KillCount = roledata.killnum;
        if (roledata.Mass != undefined) 
            this.Mass = roledata.Mass;
        if (roledata.Skin != undefined) 
            this.Skin = roledata.Skin;
        if (roledata.Level != undefined) 
            this.Level = roledata.Level;
        if (roledata.AttackLevel != undefined) 
            this.AttackLevel = roledata.AttackLevel;
        if (roledata.DefenseLevel != undefined) 
            this.DefenseLevel = roledata.DefenseLevel;
        if (roledata.ProfitLevel != undefined) 
            this.ProfitLevel = roledata.ProfitLevel;
        if (roledata.DiamonCount != undefined) 
            this.DiamonCount = roledata.DiamonCount;
        if (roledata.PlayerId != undefined) 
            this.PlayerId = roledata.PlayerId;
        if (roledata.GetGiftLevelArray != undefined) 
            this.GetGiftLevelArray = roledata.GetGiftLevelArray;
        if (roledata.GoldCount != undefined) 
            this.GoldCount = roledata.GoldCount;
        if (roledata.TeamScore != undefined) 
            this.TeamScore = roledata.TeamScore;
        if (roledata.LoginOutTime!=undefined) 
            this.LoginOutTime=roledata.LoginOutTime;
        if (roledata.GetSpecialGift!=undefined) 
            this.GetSpecialGift=roledata.GetSpecialGift;
        if (roledata.MaxLevel!=undefined) 
            this.MaxLevel=roledata.MaxLevel;
    }

    public ResetData() 
    {
        this.killnum = 0;
        this.KillCount = 0;
        this.Mass = 10;
    }

}



export class GameDataManager 
{
    public static s_UIFoler = "ui/WeiXin/";
    public static s_ShowSkinFloder="ShowModel/img_skin";

    public static s_LevelConfigJsonPath = "res/JsonFiles/LevelConfig.json";
    public static s_GiftRewardJsonPath = "res/JsonFiles/SpecialGift.json";
    public static s_RankDataJsonPath = "res/JsonFiles/Rank.json";
    public static s_WeChatShareConfigJsonPath="res/JsonFiles/WeChatShare.json";
    public static s_SavePlatformDataJsonPath="res/JsonFiles/PlatFormConfig.json";
    public static s_PlayerInitialDataJsonPath = "res/JsonFiles/PlayerInitialData.json";
    public static s_EnemyInitialDataJsonPath = "res/JsonFiles/EnemyInitialData.json";
    public static s_GroundColorDataJsonPath="res/JsonFiles/GroundColor.json";
    public static s_SkinInfoDataJsonPath="res/JsonFiles/Skin.json";
    public static s_SkillDataJsonPath="res/JsonFiles/Skill.json";
    public static s_LevelUpViewPartPath="res/Levellight.part";
    public static s_PlayerGetRewardPartPath="res/GoldAddAnim.part";
    public static s_PlayeWinPartPath="res/Win.part";

    public static s_MapCubePath = "unityRes/Prefabs/LayaScene_MapCubePrefab/Conventional/MapCubePrefab.lh";
    public static s_SumoRolePath = "unityRes/Prefabs/LayaScene_SumoRolePrefab/Conventional/SumoRolePrefab.lh";
   // public static s_TuoWeiCaiHongPath = "unityRes/Prefabs/LayaScene_tuowei_caihongPrefab/Conventional/tuowei_caihongPrefab.lh";
    public static s_TuoWeiShanDianPath = "unityRes/Prefabs/LayaScene_tuowei_shandianPrefab/Conventional/tuowei_shandianPrefab.lh";
    public static s_XuanzhuanEffectPath = "unityRes/Prefabs/LayaScene_xuanzhuanPrefab/Conventional/xuanzhuanPrefab.lh";
    public static s_PengzhuangPath = "unityRes/Prefabs/LayaScene_PengzhuangPrefab/Conventional/PengzhuangPrefab.lh";
    public static s_LuoShuiPath = "unityRes/Prefabs/LayaScene_LuoShuiPrefab/Conventional/LuoShuiPrefab.lh";
    public static s_LevelUpTextPrefabPath = "unityRes/Prefabs/LayaScene_levelUpTextPrefab/Conventional/levelUpTextPrefab.lh"
    public static s_ModelSkinTextureFloder = "Skin/";
    public static s_FaceTextureFloder="PlayerFace/img_face";

    public static s_SkyMaterialPath = "unityRes/Sky/ColorSky.lmat";//"unityRes/Scene/LayaScene_Ground_levelAll/Conventional/Assets/Material/SkyBox.lmat";
    public static s_GroundmagmaPath = "unityRes/MatTexture/Ground/Groundmaga.png";
    public static s_GroundWaterPath = "unityRes/MatTexture/Ground/GroundWater.png";
    public static s_ScenePath = "unityRes/Scene/LayaScene_Ground_levelAll/Conventional/Ground_levelAll.ls";

    public static s_ModelSkinMap: { [key: number]: Laya.BaseTexture; } = {};
    public static s_FaceSkinMap:{[key:number]:Laya.BaseTexture;}={};

    public static s_ModelSkinNum = 18;
    public static s_ModelSkinArray = [];
    public static s_FaceArray=[];

    public static s_EnemyValue = 25;
    public static s_PlayerLevelMax = 120;

    private static m_PlayerRoleData: GameRoleData;

    public static get PlayerRoleData() 
    {
        if (GameDataManager.m_PlayerRoleData == null) {
            GameDataManager.m_PlayerRoleData = GameDataManager.GetPlayerData();
        }
        return GameDataManager.m_PlayerRoleData;
    }


    public static Init(): void 
    {
        EventTool.Init();
        if (Platform.GetPlatform()==PlatformType.WeChat) 
        {
            WeChatAd.InitWeChatAd();    
        }
        GameDataManager.InitLoadPath();
        GameDataManager.LoadResources();
    }




    private static InitLoadPath(){
       
        if (Laya["MiniAdpter"] != null && Laya["MiniAdpter"].nativefiles != null) {
            Laya["MiniAdpter"].nativefiles = [
                "ui/Loading/bg_loading.png",
                "ui/Loading/progress.png",
                "ui/Loading/progressbar.png",
            ]
            Laya.URL.basePath = "https://XXXXXXX";
        }
        UIManager.Instance.PushPanel(ViewType.LoadingView);
      
    }


    private static LoadResources()
    {
        let playerdata = GameDataManager.PlayerRoleData;
        var resource = [
            "res/atlas/PlayerLevel.atlas",
             "res/atlas/ui/WeiXin.atlas",
            "res/atlas/ShowModel.atlas",

            GameDataManager.s_LevelConfigJsonPath,
            GameDataManager.s_GiftRewardJsonPath,
            GameDataManager.s_RankDataJsonPath,
            GameDataManager.s_PlayerInitialDataJsonPath,
            GameDataManager.s_EnemyInitialDataJsonPath,
            GameDataManager.s_WeChatShareConfigJsonPath,
            GameDataManager.s_SavePlatformDataJsonPath,
            GameDataManager.s_SkinInfoDataJsonPath,
            GameDataManager.s_GroundColorDataJsonPath,
            GameDataManager.s_SkillDataJsonPath,
            GameDataManager.s_LevelUpViewPartPath,
            GameDataManager.s_PlayerGetRewardPartPath,
            GameDataManager.s_PlayeWinPartPath,

            GameDataManager.s_MapCubePath,
            GameDataManager.s_SumoRolePath,
            GameDataManager.s_TuoWeiShanDianPath,
            GameDataManager.s_PengzhuangPath,
            GameDataManager.s_LuoShuiPath,
            GameDataManager.s_LevelUpTextPrefabPath,
            GameDataManager.s_XuanzhuanEffectPath,
            GameDataManager.s_ScenePath,
 
            GameDataManager.s_SkyMaterialPath,
            GameDataManager.s_GroundmagmaPath,
            GameDataManager.s_GroundWaterPath,

        ];

        for (let index = 1; index <= this.s_ModelSkinNum; index++) 
        {
            var Texturestr = this.s_ModelSkinTextureFloder + index + ".png";
            resource.push(Texturestr);
            this.s_ModelSkinArray.push(Texturestr);
        }
        var Texturestr = this.s_ModelSkinTextureFloder + "19.png";
        resource.push(Texturestr);
        this.s_ModelSkinArray.push(Texturestr);


        // for (let index = 1; index <=6; index++) {
        //     let facestr=this.s_FaceTextureFloder+index+".png"
        //     resource.push(facestr);
        //     this.s_FaceArray.push(facestr);
        // }

        Laya.loader.create(resource, Laya.Handler.create(this, this.onPreLoadFinish), Laya.Handler.create(this, this.onLoadProgress));
    }


    private static onLoadProgress(progress: number) 
    {
        let platform = Platform.GetPlatform();
        let percent = Math.floor(progress * 100);
        switch (platform) {
            case PlatformType.WeChat:
                MsgDispatcher.Send(MsgType.GameLoading.toString(), percent);
                break;
            case PlatformType.FaceBook:
                if (Platform.isFacebook()) 
                {
                    FBInstant.setLoadingProgress(percent);
                }
                break;

            default:
                console.log("NoNeedProgress platform " + platform);
                break;
        }
        // console.log("onLoadProgress "+progress);
    }


    private static onPreLoadFinish() 
    { 
        EventTool.LogEvent("MyGameLoaded");
        MsgDispatcher.Send(MsgType.GameLoadOver.toString());
        // Laya.LocalStorage.removeItem("PlayerSkinInfo");
        Laya.LocalStorage.removeItem("leveldata");
        let playerdata = GameDataManager.PlayerRoleData;

        let platform = Platform.GetPlatform();
        switch (platform) {
            case PlatformType.FaceBook:
                if (Platform.isFacebook()) {
                    GameDataManager.FBLoad(playerdata);
                }
                else{
                    GameDataManager.NormalLoad(playerdata);
                } 
            break;
            case PlatformType.WeChat:
                if (playerdata.PlayerId=="") 
                {
                    playerdata.PlayerId = MathTool.GetPlayerId();
                }
            default:
                GameDataManager.NormalLoad(playerdata);
            break;
        }
    }


    static NormalLoad(playerdata:GameRoleData)
    {
        GameDataManager.LoadTexture();
        GameDataManager.SetPlayerDataLocal();
        GameManager.GetInstance().Init();
    }

    
    static FBLoad(playerdata:GameRoleData)
    {
        FBInstant.startGameAsync().then(function () {
            //加载场景                 
            console.log("--------fb--------");
            var playerId = FBInstant.player.getID();
            var playerName = FBInstant.player.getName();

            playerdata.PlayerId = playerId;
            GameDataManager.SetPlayerDataLocal();

            console.log("fbId=" + playerId);
            console.log("--------fb--------");
            GameDataManager.LoadTexture();
            AdMan.LoadGameAssistant();
            GameManager.GetInstance().Init();
        });
    }


    static LoadTexture() 
    {
        for (let index = 0; index < this.s_ModelSkinArray.length; index++) 
        {
            const element = GameDataManager.s_ModelSkinArray[index];
            let texture = Laya.loader.getRes(element);
            GameDataManager.s_ModelSkinMap[index] = texture;
        }

        for (let index = 0; index <=this.s_FaceArray.length; index++) {
            const element =GameDataManager.s_FaceArray[index];
            let texture=Laya.loader.getRes(element);
            GameDataManager.s_FaceSkinMap[index] = texture;  
        }

        console.log("Loadtexture");
    }



    public static SetPlayerDataLocal(key = "PlayerData") 
    {
        var playerinfo = JSON.stringify(GameDataManager.PlayerRoleData);
        // console.log(playerinfo);
        Laya.LocalStorage.setItem(key, playerinfo);
    }


    private static GetPlayerData(key: string = "PlayerData"): GameRoleData 
    {
        let playerinfo = Laya.LocalStorage.getItem(key);
        let playerdata: GameRoleData = new GameRoleData();
        if (playerinfo != null && playerinfo != "undefined" && playerinfo != "") 
        {
            let saveplayerdata = JSON.parse(playerinfo);
            if (saveplayerdata != null) 
            {
                playerdata.CopyValue(saveplayerdata);
            }
        }
        return playerdata;
    }




    private static s_groundColorDatas:Array<GroundColorData>=[] ;

    public static GetGroundColorData():Array<GroundColorData>
    {
        if (GameDataManager.s_groundColorDatas.length<1) 
        {
            GameDataManager.s_groundColorDatas=Laya.loader.getRes(GameDataManager.s_GroundColorDataJsonPath);
        }

        return GameDataManager.s_groundColorDatas;
    }


    public static GetLevelConfig(): Array<LevelSceneData> {
        var json: Array<LevelSceneData> = Laya.loader.getRes(this.s_LevelConfigJsonPath);
        // console.log("GetLevelConfig ===="+json[0].ID);
        // var levelconfigArray=json.parse();
        return json;
    }

    public static GetLevelGiftConfig() 
    {
        var json: Array<LevelGiftData> = Laya.loader.getRes(this.s_GiftRewardJsonPath);
        return json;
    }


    private static m_skininfos:Array<SkinData>=[];
    public static GetSkinDataInfo()
    {
       if (GameDataManager.m_skininfos.length<1)
       {
         GameDataManager.m_skininfos=Laya.loader.getRes(GameDataManager.s_SkinInfoDataJsonPath);    
       }
       return GameDataManager.m_skininfos;
    }



    private static m_playerInitialData:PlayerInitialData;
    //获取玩家信息数据
    public static GetPlayerInitialData()
    {
        if (this.m_playerInitialData==null)
        {
            this.m_playerInitialData=Laya.loader.getRes(GameDataManager.s_PlayerInitialDataJsonPath);    
        }
        return this.m_playerInitialData;
    }

    public static m_enemyInitialData:EnemyInitialData;
    //获取敌人信息
    public static GetEnemyInitialData()
    {
        if (this.m_enemyInitialData==null) 
        {
            this.m_enemyInitialData=Laya.loader.getRes(GameDataManager.s_EnemyInitialDataJsonPath);
        }

        return this.m_enemyInitialData;
    }




    private static s_rankdata:Array<RankData>=[];
    /**
     * 获取排行数据
     */
    public static GetRankDatas():Array<RankData>
    {
        if (GameDataManager.s_rankdata.length<1) 
        {
            GameDataManager.s_rankdata=Laya.loader.getRes(this.s_RankDataJsonPath);    
        }
        return  GameDataManager.s_rankdata;
    }


    private static s_skillData:Array<SkillInfoData>=[];
    //获取技能信息
    public static GetSkillDatas()
    {
        if (this.s_skillData.length<1)
        {
            this.s_skillData=Laya.loader.getRes(this.s_SkillDataJsonPath);    
        }
        return this.s_skillData;
    }


    public static GetPlayerSkinInfos(): Array<number> 
    {
        var playerSkinInfo = Laya.LocalStorage.getItem("PlayerSkinInfo");
        let skinInfoList: Array<number> = [];
        if (playerSkinInfo != null && playerSkinInfo != "undefined" && playerSkinInfo != "") {
            // console.log("GetPlayerSkinInfos====="+playerSkinInfo);
            skinInfoList = JSON.parse(playerSkinInfo);
        }
        if (skinInfoList == null || skinInfoList.length < 1) 
        {
            skinInfoList = [0]
        }

        // console.log("GetPlayerSkinInfos="+skinInfoList);
        return skinInfoList;
    }


    public static AddSkinInfoId(Id: number) 
    {
        let SkinInfoList = this.GetPlayerSkinInfos();
        if (SkinInfoList.indexOf(Id) > -1) {
            return;
        }
        //  console.log("ID=========="+Id);
        SkinInfoList.push(Id);
        let skininfo = JSON.stringify(SkinInfoList);
        Laya.LocalStorage.setItem("PlayerSkinInfo", skininfo);
    }



}