class BaseModule{
    constructor(data,message){
        if(typeof data==='string'){
            this.message=data;
            data=null;
            message=null;
            return
        }
        if(data){
            this.data=data;
        }
        if(message){
            this.message=message;
        }
    }
}

//成功
class SuccessModule extends BaseModule{
    constructor(data,message){
        super(data,message);
        this.code=0;
    }
}

//失败
class ErrorModule extends BaseModule{
    constructor(data,message){
        super(data,message);
        this.code=-1;
    }
}

module.exports={
    SuccessModule,
    ErrorModule
}


