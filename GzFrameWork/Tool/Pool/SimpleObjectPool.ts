
   interface IPool<T>
  {
       Allocate():T;

      Recycle(obj:T): boolean;
  }


   interface IObjectFactory<T>
  {
       Create():T;
  }

   abstract class Pool<T> implements IPool<T>
  {
      protected  mCacheStack:Array<T> = new Array<T>();

      protected mFactory :IObjectFactory<T> ;

      /// <summary>
      /// Gets the current count.
      /// </summary>
      /// <value>The current count.</value>
      public  CurCount():number
      {
       return this.mCacheStack.length; 
      }

      public  Allocate():T
      {
          return this.mCacheStack.length > 0 ? this.mCacheStack.pop() :this.mFactory.Create();
      }

      public abstract  Recycle(obj:T ):boolean;
  }


   class CustomObjectFactroy<T> implements IObjectFactory<T>
  {
      private  mFactroyMethod:()=>T;


      constructor(factroyMethod:()=>T){
        this.mFactroyMethod = factroyMethod;
      }
      


      public  Create():T
      {
          return this.mFactroyMethod();
      }
  }


    export default  class SimpleObjectPool<T> extends Pool<T>
    {
         mResetMethod:(t)=>{};

         constructor(factroyMethod:()=>T, resetMethod:(t)=>{} = null, initCount:number = 0)
         { 
            super();
            this.mFactory = new CustomObjectFactroy<T>(factroyMethod);
            this.mResetMethod = resetMethod;
 
             for (var i = 0; i < initCount; i++)
             {
                this.mCacheStack.push(this.mFactory.Create());
             }
         }
 

        public  Recycle(obj:T ):boolean
        {
            if (this.mResetMethod != null)
            {
                this.mResetMethod(obj);
            }

           this.mCacheStack.push(obj);

            return true;
        }
    }

