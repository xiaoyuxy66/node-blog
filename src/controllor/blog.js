const getList=(author,keywords)=>{
    //先写假数据但是格式要正确
    return [
      {
        id: 1,
        title: "第一章题目",
        content: "ddafdafda",
        author: "zd",
        createTime: 1558699060015
      },
      {
        id: 2,
        title: "第二章题目",
        content: "ddafdafda",
        author: "zd",
        createTime: 1558699191529
      }
    ];
}
const getDetail=(id)=>{
    return {
        id: 1,
        title: "第一章题目",
        content: "ddafdafda",
        author: "zd",
        createTime: 1558699060015
    }
}

const newBlog=(blogData={})=>{
    //bogData是一个博客对象，包含content，title等属性
    console.log("new blogData..." + blogData);
    return{
        id:3 //表示新建博客插入数据表里面的ID
    }
}
const updateBlog=(id,blogData={})=>{
    //id就是要更新博客的id
    //bogData是一个博客对象，包含content，title等属性
    return true
}
const delBlog=(id)=>{
    return true;
} 

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
};