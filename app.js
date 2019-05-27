const querystring=require('querystring');
const {get,set}=require('./src/db/redis');
const {access}=require('./src/utils/log');
const handleUserRouter=require('./src/router/user');
const handleBlogRouter=require('./src/router/blog');

//const SESSION_DATA={};

//获取cookie的过期时间
const getCookieExpires=()=>{
  const d=new Date();
  d.setTime(d.getTime+(24*60*60*1000));
  return d.toGMTDtring();
}


const getPostData=(req)=>{
    const promise=new Promise((resolve,reject)=>{
        if(req.method!=='POST'){
            resolve({});
            return
        }
        if(req.headers['Content-type']!=='application/json'){
            resolve({});
            return
        }
        const postData='';
        req.on('data',chunk=>{
            postData+=chunk.toString();
        })
        req.on('end',()=>{
            if (!postData) {
                 resolve({});
                 return;
            }
            resolve(
                JSON.parse(postData)
            )
        })
    });
    return promise
}

let httpHandle = (req, res) => {
  //access log
  access(`${req.method} -- ${req.url}-- ${req.headers['user-agent']}--${Date.now()}`)

  //设置返回值为json格式
  res.setHeader("Content-type", "application/json");
  const url = req.url;
  req.path = url.split("?")[0];

  //解析query
  req.query = querystring.parse(url.split("?")[1]);

  //解析cookie
  req.cookie = {};
  const cookieStr = req.headers.cookie || "";
  cookieStr.split(";").forEach(item => {
    const arr = item.split("=");
    const key = arr[0].trim();
    const value = arr[1].trim();
    req.cookie[key] = value;
  });

  //解析session
  // let needSetCookie=false; //是否需要设置cookie
  // let userId=req.cookie.userid;
  // if(userId){
  //     if (!SESSION_DATA[userId]) {
  //         SESSION_DATA[userId]={};
  //     }
  // }else{
  //     needSetCookie=true;
  //     userId=`${Date.now()}_${Math.random()}`;
  //     SESSION_DATA[userId] = {};
  // }
  // req.session = SESSION_DATA[userId];

  //解析session(使用redis)
  let needSetCookie = false; //是否需要设置cookie
  let userId = req.cookie.userid;
  if (!userId) {
       needSetCookie = true;
       userId = `${Date.now()}_${Math.random()}`;
       //初始化 redis 中的 session
       set(userId,{});
  }

  //获取session
  res.sessionId=userId;
  get(res.sessionId).then(sessionData=>{
      if (sessionData==null) {
          //初始化 redis 中的 session
          set(userId,{});
          //设置session
          req.session={};
      }else{
          req.session = sessionData;
      }
      console.log("req.session", req.session);

      //处理post data
      //return getPostData(req)
  })

  //处理post data
  getPostData(req).then(postData => {
    req.body = postData;
    //处理blog路由
    // const blogDate = handleBlogRouter(req,res);
    // if (blogDate) {
    //     res.end(JSON.stringify(blogDate))
    //     return
    // }

    //处理blog路由(promise)
    const blogResult = handleBlogRouter(req, res);
    if (blogResult) {
      blogResult.then(blogDate => {
        res.end(JSON.stringify(blogDate));
      });
      return;
    }

    //处理user路由
    // const userDate=handleUserRouter(req,res);
    // if(userDate){
    //     res.end(JSON.stringify(userDate));
    //     return
    // }
    //处理user路由(promise)
    const userResult = handleUserRouter(req, res);
    if (userResult) {
      userResult.then(userDate => {
        if (needSetCookie) {
          res.setHeader(
            "Set-Cookie",
            `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`
          );
        }
        res.end(JSON.stringify(userDate));
      });
      return;
    }

    //404
    res.writeHeader(404, { "Content-type": "text/plain" });
    res.write("404 not found");
    res.end();
  });
};

module.exports=httpHandle;