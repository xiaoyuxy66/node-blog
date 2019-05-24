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
      const listDatas=getList(author,keyWords);
      return new SuccessModule(listDatas,"获取列表成功");
    }
    //获取博客详情
    if (method === "GET" && req.path === "/api/blog/detail") {
      const id=req.query.id;
      const data=getDetail(id);
      return new SuccessModule(data,"获取博客详情成功");
    }
    //新建博客
    if (method === "POST" && req.path === "/api/blog/new") {
      const data=newBlog(req.body);
      return new SuccessModule(data,"新增博客成功");
    }
    //更新博客
    if (method === "POST" && req.path === "/api/blog/update") {
      const result=updateBlog(id,req.body);
      if (result) {
        return new SuccessModule("更新博客成功");
      }else{
        return new ErrorModule("更新博客失败");
      }
    }
    //删除博客
    if (method === "POST" && req.path === "/api/blog/del") {
     const result = delBlog(id);
     if (result) {
       return new SuccessModule("删除博客成功");
     } else {
       return new ErrorModule("删除博客失败");
     }
    }
}

module.exports = handleBlogRouter;