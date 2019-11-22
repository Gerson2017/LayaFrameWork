import GameManager from "./GameManager";
import MsgDispatcher, { MsgType } from "../MsgDispatcher";
import TimeTool from "../TimeTool";
import { GameDataManager } from "../../Resource/ResourceLoad";




enum CameraState
{
    Start,
    Running,
    Move,
}

export default class CameraMove extends Laya.Script3D {

    private m_playerTransform:Laya.Transform3D;
    private m_disV3:Laya.Vector3=new Laya.Vector3();
    private m_sp:Laya.Sprite3D;
    private m_speed=2;

    public m_CameraState=CameraState.Start;

    public get MySprite3D():Laya.Sprite3D
    {
        if(this.m_sp==null)
        {
            this.m_sp=this.owner as Laya.Sprite3D;
        }
        return  this.m_sp;
    }

    private m_follow:boolean=false;
    

    public xoffset=0;
    public yoffset=110.5;
    public zoffset=-102.1;

    public m_startQua=new Laya.Quaternion(0,0.97,0.22,0);
    public m_startPos=new Laya.Vector3(0,28,-45.8);

    public m_runningQua=new Laya.Quaternion(0,0.927,0.373,0);
    public m_runningPos=new Laya.Vector3(0,110.5,-102.1);
    //public m_runningPos=new Laya.Vector3(0,80.5,-75.1)

    public m_targetStartPos=new Laya.Vector3();
    public m_targetRunningPos=new Laya.Vector3();


    onAwake()
    {
        MsgDispatcher.Register(MsgType.GameStart.toString(),function()
        {
            this.m_CameraState=CameraState.Move;
        }.bind(this));

        MsgDispatcher.Register(MsgType.ChangeLevel.toString(),function()
        {
            this.m_CameraState=CameraState.Start;
        }.bind(this));

        MsgDispatcher.Register(MsgType.GameWaiting.toString(),function()
        {
            this.m_CameraState=CameraState.Running;
        }.bind(this));


        var resource = "unityRes/Sky/ColorSky.ltc";
        let camera=this.MySprite3D as Laya.Camera;
        camera.clearFlag=Laya.BaseCamera.CLEARFLAG_SKY;
        Laya.TextureCube.load(resource, Laya.Handler.create(this, this.OnSkyLoadFinish));
       
    }



    public  UpdateFollow(player:Laya.Sprite3D)
    {
        this.m_follow=true;
        this.m_playerTransform=player.transform; 
            

        let ts=this.MySprite3D.transform;
      //  console.log("MySprite3D w="+ ts.rotation.w+" x="+ ts.rotation.x+" y="+ts.rotation.y+" z="+ts.rotation.z);
        Laya.Vector3.add( this.m_playerTransform.position,this.m_startPos,this.m_targetStartPos);
        Laya.Vector3.add( this.m_playerTransform.position,this.m_runningPos,this.m_targetRunningPos);

    }


    private m_multiple=1;

    onUpdate()
    {
        
        let ts=this.MySprite3D.transform;
        switch (this.m_CameraState) 
        {
            case CameraState.Start:
                let startqua=new Laya.Quaternion();
                Laya.Quaternion.slerp(ts.rotation,this.m_startQua,this.m_speed*TimeTool.DeltaTime,startqua);
               
                ts.rotation=this.m_startQua;
                ts.position=this.m_targetStartPos;    
                this.FollowPos(this.m_targetStartPos);
            break;
            case CameraState.Running:
                let ms=this.MySprite3D.transform;
                let runqua=new Laya.Quaternion();
                Laya.Quaternion.slerp(ts.rotation,this.m_runningQua,this.m_speed*TimeTool.DeltaTime,runqua);
                ts.rotation=runqua;
                this.FollowPos(this.m_targetRunningPos);
            break;
            case CameraState.Move:
                if (this.m_follow) 
                {
                  //  this.m_multiple+=100*TimeTool.DeltaTime;
                    Laya.Vector3.add( this.m_playerTransform.position, this.m_runningPos,this.m_targetRunningPos);
                    ts.position=this.m_targetRunningPos;
                   // ts.position=new Laya.Vector3(this.m_targetRunningPos.x,this.m_targetRunningPos.y+ this.m_multiple,this.m_targetRunningPos.z);
                }
            break;
        }

    }


    public StopFollow()
    {
        this.m_follow=false;
    }


    FollowPos(targetpos:Laya.Vector3)
    {
        let ts=this.MySprite3D.transform;
        let dis=Laya.Vector3.distance(ts.position,this.m_startPos);

        if (dis>0.02)
        {
            let temppos=new Laya.Vector3();
           
            Laya.Vector3.lerp(ts.position,targetpos,this.m_speed*TimeTool.DeltaTime,temppos);
            ts.position=temppos;
        }
        else
        {
            ts.position=targetpos;     
            this.m_follow=true;
        }

    }



    public OnSkyLoadFinish(cubeTexture) 
    {
        //console.log(GameManager.GetInstance().m_currentScene.skyRenderer);
       let skinMat=Laya.loader.getRes(GameDataManager.s_SkyMaterialPath) as Laya.SkyBoxMaterial;
       // let skinMat=new Laya.SkyBoxMaterial();
        //var skyMat: Laya.SkyBoxMaterial = GameManager.GetInstance().m_currentScene.skyRenderer.material as Laya.SkyBoxMaterial;
        skinMat.textureCube = cubeTexture;
        GameManager.GetInstance().m_currentScene.skyRenderer.material=skinMat;
    }

}