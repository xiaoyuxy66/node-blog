const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require("../controllor/blog");
const {SuccessModule,ErrorModule}=require('../module/resModules');

const handleBlogRouter=(req,res)=>{
    const method=req.method; 
    const id=req.query.id
    
    //获取博客列表
    if(method === 'GET'&&req.path === '/api/blog/list'){
      const author=req.query.author||'';
      const keyWords = req.query.keyWords || "";
      // const listDatas=getList(author,keyWords);
      // return new SuccessModule(listDatas,"获取列表成功");
      const result = getList(author, keyWords);
      
      //返回的依然是promise
      return result.then(listDatas=>{
        return new SuccessModule(listDatas, "获取列表成功");
      })
    }
    //获取博客详情
    if (method === "GET" && req.path === "/api/blog/detail") {
      const id=req.query.id;
      // const data=getDetail(id);
      // return new SuccessModule(data,"获取博客详情成功");
      const result = getDetail(id);
      return result.then(data=>{
        return new SuccessModule(data, "获取博客详情成功");
      })
    }
    //新建博客
    if (method === "POST" && req.path === "/api/blog/new") {
      req.body.author="zhangsan"; //暂用假数据，待开发登陆校验时换成真实数据
    
      const result=newBlog(req.body);
      return result.then(data=>{
        return new SuccessModule(data, "新增博客成功");
      })
    }
    //更新博客
    if (method === "POST" && req.path === "/api/blog/update") {
      const result=updateBlog(id,req.body);
      return result.then(data=>{
        if(data){
          return new SuccessModule("更新博客成功");
        }else{
          return new ErrorModule("更新博客失败");
        }
      })

    }
    //删除博客
    if (method === "POST" && req.path === "/api/blog/del") {
      const author = "zhangsan"; //暂用假数据，待开发登陆校验时换成真实数据
      const result = delBlog(id, author);
      return result.then(data=>{
         if (data) {
           return new SuccessModule("更新博客成功");
         } else {
           return new ErrorModule("更新博客失败");
         }
      })
    }
}

module.exports = handleBlogRouter;