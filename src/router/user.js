const {login}=require("../controllor/user");
const {SuccessModule,ErrorModule}=require("../module/resModules");

const handleUserRouter = (req, res) => {
  const method = req.method;

  //登陆
  if (method === "GET" && req.path === "/api/user/login") {
    //const{username,password}=req.body;
    const { username, password } = req.query;
    const result = login(username, password);
    return result.then(userDate=>{
      if(userDate.username){
        //设置session
        req.session.username=data.username;
        req.session.realname=data.realname;
        
        return new SuccessModule("登录成功");
      }
      return new ErrorModule("登录失败");
    })
  }
};

module.exports = handleUserRouter;
