import MsgDispatcher from "./MsgDispatcher";

export  abstract class SimpleSp3D extends Laya.Script3D {


    public static Delay( seconds:number,  onFinished:Function,caller:any=this)
    {
        Laya.timer.once(seconds,caller,onFinished());
    }


    mMsgRecorder: Array<MsgRecord> = new Array<MsgRecord>();

    public  RegisterMsg( msgName:string, onMsgReceived:Function )
    {
        MsgDispatcher.Register(msgName, onMsgReceived);
       this.mMsgRecorder.push(MsgRecord.Allocate(msgName, onMsgReceived));
    }

    public  SendMsg( msgName:string, data)
    {
        MsgDispatcher.Send(msgName, data);
    }

    public UnRegisterMsgAll(msgName:string)
    {
        for (let index = 0; index < this. mMsgRecorder.length; index++) 
        {
            let record = this. mMsgRecorder[index];
            if(record.Name==msgName)
            {
                MsgDispatcher.UnRegisterAll(record.Name);
               this.mMsgRecorder.splice(index,0);
               record.Recycle();
                return;
            }
        }

    }

    public UnRegisterMsg( msgName:string,  onMsgReceived:Function)
    {

        for (let index = 0; index <  this. mMsgRecorder.length; index++)
         {
            let record = this. mMsgRecorder[index];
            if(record.Name==msgName&&record.OnMsgReceived==record.OnMsgReceived)
            {
                MsgDispatcher.UnRegister(record.Name, record.OnMsgReceived);
                this. mMsgRecorder.splice(index,1);
                record.Recycle();
            }
        }
    }



    onDestroy(){
        this.OnBeforeDestroy();
        this.mMsgRecorder.forEach(msgRecord => 
        {
            MsgDispatcher.UnRegister(msgRecord.Name, msgRecord.OnMsgReceived);
             msgRecord.Recycle();
        });

    }

    protected abstract OnBeforeDestroy();



}

class MsgRecord
    {
        private MsgRecord() { }

        static  mMsgRecordPool:Array<MsgRecord> = new Array<MsgRecord>();

        public static  Allocate( msgName:string,  onMsgReceived:Function ):MsgRecord
        {
            var retRecord =this.mMsgRecordPool.length > 0 ?this.mMsgRecordPool.pop() : new MsgRecord();
            retRecord.Name = msgName;
            retRecord.OnMsgReceived = onMsgReceived;

            return retRecord;
        }

        public Recycle()
        {
           this.Name = null;

           this.OnMsgReceived = null;

           MsgRecord.mMsgRecordPool.push(this);
        }

        public  Name:string;

        public  OnMsgReceived:Function;
    }

  