
import GameManager from "./GameManager";

export default class InputManager {

    private static m_instance:InputManager;
    public static GetInstance():InputManager{
        if(this.m_instance==null)
        {
            this.m_instance=new InputManager();
        }
        return this.m_instance;
    }

    //Mobile
	private _scene:Laya.Scene3D;
	private rotation:Laya.Vector3;
	private lastPosition:Laya.Vector2=Laya.Vector2.ZERO;
	private distance:number = 0.0;
    private m_mouseDowned:boolean=false;
    private first:boolean=true;

    private m_dirx:number=0;
    private m_diry:number=0;

    private m_camera:Laya.Transform3D;

    private m_gameFirstTough:boolean=false;

    public InitInputManager():void
    {
        this.AddMouseEvent();
    }

    GetInputDirInMobile():void
    {
        var touchCount = this._scene.input.touchCount();
		if ( touchCount>0){
			//获取当前的触控点，数量为1
			var touch = this._scene.input.getTouch(0);
			//是否为新一次触碰，并未发生移动
			if (this.first){
				//获取触碰点的位置
				this.lastPosition.x = touch.position.x;
                this.lastPosition.y = touch.position.y;
                this.m_dirx=0;
                this.m_diry=0; 
				this.first = false;
			}
			else{
                this.GetInputDir(touch.position.x,touch.position.y);
				// //根据移动的距离进行旋转
				// (this.owner as Laya.Sprite3D).transform.rotate(new Laya.Vector3(1 * deltaY /2, 1 * deltaX / 2, 0), true, false);
			}
        }
        else{
            this.OnToughOut();
        }
    }

    //PC
    AddMouseEvent(){
        //鼠标事件监听
        Laya.stage.on(Laya.Event.MOUSE_MOVE,this, this.onMouseMove);
        Laya.stage.on(Laya.Event.MOUSE_DOWN,this, this.onMouseDown);
        Laya.stage.on(Laya.Event.MOUSE_UP,this, this.onMouseUp);
    }
    
    onMouseMove()
    {
        if(this.m_mouseDowned)
        {
            if(this.first)
            {
                this.first=false;
                this.lastPosition.x = Laya.MouseManager.instance.mouseX;
                this.lastPosition.y = Laya.MouseManager.instance.mouseY;
                this.m_dirx=0;
                this.m_diry=0; 
                // console.log("firstmove x "+this.m_dirx+ "y "+this.m_diry);
            }
            else
            {
                this.GetInputDir( Laya.MouseManager.instance.mouseX, Laya.MouseManager.instance.mouseY);
            }            
        }
        
    }

    onMouseDown(){
        this.m_mouseDowned=true;
        if(!this.m_gameFirstTough)
        {
           // console.log("firstToughScreen");
            this.m_gameFirstTough=true;
            // MsgDispatcher.Send("firstToughScreen");
        }
    }

    onMouseUp(){
        // console.log("Out "+this.m_dirx+ "y "+this.m_diry);
        this.m_mouseDowned=false;
        this.first=false;
        this.OnToughOut();
    }

    
    //根据鼠标获取移动方向
    GetInputDir(inputx:number,inputy:number):void
    {
	    //移动触碰点
        this.m_dirx= inputx - this.lastPosition.x;
        this.m_diry = inputy - this.lastPosition.y;
    
        // this.lastPosition.x = inputx;
        // this.lastPosition.y = inputy;

        // console.log("getInputDir");
    }

    OnToughOut()
    {
        this.first = true;
        this.lastPosition.x = 0;
        this.lastPosition.y = 0;   
        this.m_dirx=0;
        this.m_diry=0;    
    }
    

    public GetMoveDir():Laya.Vector2
    {
        let dir:Laya.Vector2=new Laya.Vector2(this.m_dirx,this.m_diry);
        return dir;
    }


    public GetScreenPoint(){
        var point: Laya.Vector2 = new Laya.Vector2();
        point.x = Laya.MouseManager.instance.mouseX;
        point.y = Laya.MouseManager.instance.mouseY;

        return point;
    }
 

}