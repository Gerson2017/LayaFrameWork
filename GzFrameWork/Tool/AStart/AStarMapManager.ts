import AStarPoint from "./ASatrPoint";
import GameManager from "../Manager/GameManager";
import SimpleObjectPool from "../Pool/SimpleObjectPool";
import { GameDataManager } from "../../Resource/ResourceLoad";
import MathTool from "../MathTool";

export default class AStarMapManager {

    private static m_instance;
    public static GetInstance():AStarMapManager
    {
        if(this.m_instance==null)
        {
            this.m_instance=new AStarMapManager();
        }
        return this.m_instance;
    }


    private  m_mapWidth:number = 8;
    private  m_mapHeight:number = 6;

    public  m_Prefab:Laya.Sprite3D;
    public  m_Maparray:AStarPoint[][]=[];
    private m_internal:number=10;
    private m_currentScene:Laya.Scene3D;

   // public m_yPos:number=2;//Y轴高度

    public  m_AItargetPosarray:Array<Laya.Transform3D>=[];
    private  m_targetParent:Laya.Sprite3D;
    private  m_scene:Laya.Scene3D;

    private m_MapCubePool:SimpleObjectPool<AStarPoint>;
    private m_visualization:boolean=false;

    
    public InitMap(mapParentNode,startPos:Laya.Vector3=new Laya.Vector3(),widthcount:number=200,heightcount:number=200,internal:number=20):void
    {       
        this.m_currentScene=GameManager.GetInstance().m_currentScene;

        this.ResetArMap();

        if (this.m_MapCubePool==null) 
        {
            this.m_MapCubePool=new SimpleObjectPool(()=>{
            let arpoint:AStarPoint=this.InitPrefab(this.m_currentScene).getComponent(AStarPoint);
            return arpoint;
           });
        }

        this.m_Maparray=[];
        this.m_mapWidth=Math.floor(widthcount/internal); 
        this.m_mapHeight=Math.floor(heightcount/internal);
        this.m_internal=internal;       
        Laya.timer.frameOnce(1,this,this.InitStartPoints,[mapParentNode,startPos,internal]);     
    }


    private m_nodeIndex=0;
    private m_times=1;
    private m_runbase=20;
    InitStartPoints(mapParentNode,startPos:Laya.Vector3=new Laya.Vector3(),internal:number=20)
    {
        for(var i =this.m_nodeIndex;i < this.m_mapWidth;i++)
        {
                this. m_Maparray[i] = [];
                for(var j = 0;j <this.m_mapHeight; j++)
                {
                    let pos=new Laya.Vector3();
                    Laya.Vector3.add(startPos,new Laya.Vector3(this.m_internal * i,0,this.m_internal * j),pos);              
                    let point=this.m_MapCubePool.Allocate();
                    point.MySprite.active=true;
                    point.MySprite.transform.position=pos;
                    this.m_Maparray[i][j]=point;
                    this.m_Maparray[i][j].SetMeshEnable(this.m_visualization);
                    this.m_Maparray[i][j].SetScalByN3(internal-0.2,3,internal-0.2);
                    this.m_Maparray[i][j].Pos=pos;
                   // console.log(this.m_Maparray[i][j].Pos);
                    this.m_Maparray[i][j].InitPoint(i,j);
                }
                this.m_nodeIndex=i;
                let ceilnum=Math.ceil(this.m_mapWidth/this.m_runbase)*this.m_times;
              //  console.log("index="+this.m_nodeIndex+" "+this.m_mapWidth+" cell="+ceilnum);
                if(this.m_nodeIndex>=ceilnum-1)
                { 
                    this.m_times++;
                    break; 
                }
        }
        if (this.m_nodeIndex>= (this.m_mapWidth-1))
        {
            this.SetTargetTsParent(mapParentNode);   
            this.m_nodeIndex=0;
            this.m_times=1;
        }
        else
        {
            Laya.timer.frameOnce(1,this,this.InitStartPoints,[mapParentNode,startPos,internal]);   
        }
        
      
    }

    SetTargetTsParent(targetParent:Laya.Sprite3D)
    {
        this.m_targetParent=targetParent;
        this.m_AItargetPosarray=[];
        for (let index = 0; index < this.m_targetParent.numChildren; index++) 
        {
           let child:Laya.Sprite3D= this.m_targetParent.getChildAt(index) as Laya.Sprite3D;
           this.m_AItargetPosarray.push(child.transform);
           let node= this.GetPointByPos(child.transform.position);
           if(node==null)
            continue;
           node.ChangeColor(1,0,0,1);
        }
       // console.log(this.m_AItargetPosarray);
    }


    InitPrefab(parent:Laya.Node):Laya.Sprite3D
    {
        if(this.m_Prefab==null)
        {
            let mapCubePrefab:Laya.Sprite3D=Laya.loader.getRes(GameDataManager.s_MapCubePath);
            this.m_currentScene.addChild(mapCubePrefab);
            this.m_Prefab=mapCubePrefab.getChildByName("MapCube") as Laya.Sprite3D;
            this.m_Prefab.active=false;
            this.m_Prefab.addComponent(AStarPoint);
        }
        let prefab:Laya.Sprite3D=Laya.Sprite3D.instantiate(this.m_Prefab, parent);
        prefab.active=true;
        return prefab;
    }


    public ClearData():void
    {
        this.m_Maparray=[];
    }

    ///获取格子点
    public  GetPointByPos( pos:Laya.Vector3):AStarPoint
    {
        let startx:number=this.m_Maparray[0][0].Pos.x-this.m_internal/2;
        let startz:number=this.m_Maparray[0][0].Pos.z-this.m_internal/2;

        let indexx:number=Math.floor(Math.abs(pos.x-startx) /this.m_internal);
        let indexy:number=Math.floor(Math.abs(pos.z-startz) /this.m_internal);

        indexx=MathTool.Clamp(indexx,0, this.m_mapWidth-1);
        indexy= MathTool.Clamp(indexy, 0, this.m_mapHeight - 1);

        return this.m_Maparray[indexx][indexy];
    }


    public  GetSurroundPoins( point:AStarPoint):Array<AStarPoint>
    {
        // console.log("GetSurroundPoins=="+point.IndexX+" y="+point.IndexY+" f="+point.GetF());
        let up:AStarPoint = null, down:AStarPoint = null, left:AStarPoint = null, right:AStarPoint = null;
        //左上 右上 左下 右下
        let lu:AStarPoint = null, ru:AStarPoint = null, ld:AStarPoint = null, rd:AStarPoint = null;

        if (point.IndexY>0)
        {
            up = this. m_Maparray[point.IndexX][ point.IndexY - 1];
        }

        if (point.IndexY<this.m_mapHeight-1)
        {
            down = this.m_Maparray[point.IndexX][point.IndexY + 1];
        }

        if (point.IndexX>0)
        {
            left= this.m_Maparray[point.IndexX-1][point.IndexY];
        }
        if (point.IndexX<this.m_mapWidth-1)
        {
            right = this.m_Maparray[point.IndexX +1][ point.IndexY];
        }

        if (up!=null&&left!=null)
        {
            lu = this.m_Maparray[point.IndexX-1][point.IndexY-1];
        }

        if (up != null && right != null)
        {
            ru = this.m_Maparray[point.IndexX+1][point.IndexY - 1];
        }
        if (down != null && left != null)
        {
            ld= this.m_Maparray[point.IndexX - 1][ point.IndexY +1];
        }
        if (down != null && right != null)
        {
            rd = this.m_Maparray[point.IndexX + 1][ point.IndexY +1];
        }

       let pointlist: Array<AStarPoint> = [];

       if (up != null && !up.IsWall)
       {
           pointlist.push(up);
       }
        //判断上下左右是否可以到达
        if (down!=null&&!down.IsWall)
        {
            pointlist.push(down);
        }
      
        if (left != null && !left.IsWall)
        {
            pointlist.push(left);
        }
        if (right != null && !right.IsWall)
        {
            pointlist.push(right);
        }
        //左上 左边和上边都不能为墙
        if (lu!=null&&lu.IsWall==false&&left.IsWall==false&&up.IsWall==false)
        {
            pointlist.push(lu);
        }
        //右上 右边和上边都不能为墙
        if (ru != null && ru.IsWall == false && right.IsWall == false && up.IsWall == false)
        {
            pointlist.push(ru);
        }
        //左下 左边和下边都不能为墙
        if (ld != null && ld.IsWall == false && left.IsWall == false && down.IsWall == false)
        {
            pointlist.push(ld);
        }
        //右下 右边和下边都不能为墙
        if (rd != null && rd.IsWall == false && right.IsWall == false && down.IsWall == false)
        {
            pointlist.push(rd);
        }
        return pointlist;

    }


    public ResetArMap()
    {
        this.m_Maparray.forEach(cubeArray => {
            cubeArray.forEach(element => {
                element.ResetInfo();
                this.m_MapCubePool.Recycle(element);
            });
        });
        
        if ( this.m_Maparray.length>0) {
            this.m_Maparray.splice(0,this.m_Maparray.length);
        }
      
    }


    public DisableMapCube()
    {
        this.m_Maparray.forEach(cubeArray => {
            cubeArray.forEach(element => {
              element.MySprite.active=false;
            });
        });
    }

    


}