const {login}=require("../controllor/user");
const {SuccessModule,ErrorModule}=require("../module/resModules");
const {set} = require('../db/redis');

const handleUserRouter = (req, res) => {
  const method = req.method;

  //登陆
  if (method === "POST" && req.path === "/api/user/login") {
    const{username,password}=req.body;
    const result = login(username, password);
    return result.then(userDate=>{
      if(userDate.username){
        //设置session
        req.session.username=data.username;
        req.session.realname=data.realname;
        //  同步redis
        set(req.sessionId, req.session);

        return new SuccessModule("登录成功");
      }
      return new ErrorModule("登录失败");
    })
  }
};

module.exports = handleUserRouter;
