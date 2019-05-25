const {loginCheck}=require("../controllor/user");
const {SuccessModule,ErrorModule}=require("../module/resModules");

const handleUserRouter = (req, res) => {
  const method = req.method;

  //登陆
  if (method === "POST" && req.path === "/api/user/login") {
    const{username,password}=req.body;
    const result = loginCheck(username, password);
    return result.then(userDate=>{
      if(userDate.username){
        return new SuccessModule("登录成功");
      }
      return new ErrorModule("登录失败");
    })
  }
};

module.exports = handleUserRouter;
