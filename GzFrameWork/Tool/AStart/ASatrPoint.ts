export default class AStarPoint extends Laya.Script3D{
    
    public  Parent:AStarPoint=null;
    
    //H 表示从指定的方格移动到终点 B 的预计耗费
    public  H:number=Number.MAX_VALUE;
    // G 表示从起点 A 移动到网格上指定方格的移动耗费 (可沿斜方向移动).
    public  G:number=Number.MAX_VALUE;
    public  Pos:Laya.Vector3=new Laya.Vector3();

    public  IndexX:number=0;
    public  IndexY:number=0;

    public IsWall:boolean=false;

    private m_sp:Laya.Sprite3D;

    private m_frameCount=0;
    private m_meshEnable=false;

    onEnable()
    {
        this.m_frameCount=0;
    }

    onUpdate()
    {
        this.m_frameCount++;
        if (this.m_frameCount>2) 
        {
            this.MySprite.active=false;
        }
    }


    public get MySprite()
    {
        if (this.m_sp==null) 
        {
            this.m_sp=this.owner as Laya.Sprite3D;    
        }
        return this.m_sp;
    }


    public  GetF():number
    {
        return this.H+this.G;
    }


    public InitPoint(indexx:number,indexy:number,parent:AStarPoint=null)
    {
        this.IndexX=indexx;
        this.IndexY=indexy;
        this.Parent=parent;
        this.IsWall=false;
    }


    public onTriggerStay(other:Laya.PhysicsComponent) :void 
    {
        if (this.IsWall) {
            return;
        }
        if (other.owner.name== "Obstracle")
        {
            this.IsWall = true;
           this.ChangeColor(0.5,0.5,0.5,1);
        }
    }


    public ChangeColor( r:number,g:number,b:number,a:number):void
    {
       if (!this.m_meshEnable) {
           return;
       } 
      //  console.log("AStarPoint ChangeColor X="+this.IndexX+" Y="+this.IndexY);
        ((this.owner as Laya.MeshSprite3D).meshRenderer.material as Laya.BlinnPhongMaterial).albedoColor = new Laya.Vector4(r,g,b,a);
    }


    public SetMeshEnable(enable:boolean)
    {
        this.m_meshEnable=enable;
        //if (!enable) return;
       // (this.owner as Laya.MeshSprite3D).meshRenderer.enable=enable;
    }


    public SetPosByN3(x:number,y:number,z:number)
    {
        let pos=new Laya.Vector3(x,y,z);
        this.MySprite.transform.position=pos;
    }

     public SetPosByV3(pos:Laya.Vector3)
     {
         this.MySprite.transform.position=pos;
     }

     public SetScalByN3(x:number,y:number,z:number)
     {
        let pos=new Laya.Vector3(x,y,z);
        this.MySprite.transform.scale=pos;
     }
    
     public SetScalByV3(scal:Laya.Vector3){
         this.MySprite.transform.scale=scal;
     }


     public ResetInfo()
     {
         this.MySprite.active=false;
         this.Parent=null;
         this.IsWall=false;
         this.H=Number.MAX_VALUE;
         this.G=Number.MAX_VALUE;
         this.ChangeColor(1,1,1,1);
    }

}