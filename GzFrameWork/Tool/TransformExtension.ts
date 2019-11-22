export default class TransformExtension {


        public static Forward(transform:Laya.Transform3D){
            let forward:Laya.Vector3=new Laya.Vector3();
            transform.getForward(forward);
            return forward;
        }

        public static Right(transform:Laya.Transform3D):Laya.Vector3{
            let right:Laya.Vector3=new Laya.Vector3();
            transform.getRight(right);
            return right;
        }

}