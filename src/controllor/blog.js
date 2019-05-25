const {exec} =require("../db/mysql");

const getList=(author,keywords)=>{
    let sql=`select * from blogs where 1=1 ;` //1=1是一个拼接小技巧 注意后面的空格

    if(author){
        sql+=`and author='${author}' ;`
    }
    if (keywords) {
        sql += `and title like '%${keywords}%' ;`
    }
    sql+=`order by createtime desc`;

    //返回的是promise 不再是以前的假数据数组
    return exec(sql);
}
const getDetail=(id)=>{
    let sql=`select * from blogs where id='${id}';`

    //返回只有一条数据的数据，把这个数组变成一个对象
    return exec(sql).then(rows=>{
        return rows[0]
    })
}

const newBlog=(blogData={})=>{
    //bogData是一个博客对象，包含content，title等属性
   const title = blogData.title;
   const author = blogData.author;
   const content = blogData.content;
   const createtime = Date.now();
   const sql = `insert blogs (title,content,author,createtime) values ('${title}','${author}','${content}','${createtime}')`;

   //插入成功会返回一个是否插入成功的对象
   return exec(sql).then(insertData=>{
       //console.log(insertData);
       return {
           id:insertData.insertId
       }
   })
}
const updateBlog=(id,blogData={})=>{
    //id就是要更新博客的id
    //bogData是一个博客对象，包含content，title等属性
    const title = blogData.title;
    const author = blogData.author;
    const content = blogData.content;
    const sql=`update blogs set title='${title}',author='${author}',content='${content}' where id=${id}`

    return exec(sql).then(updateDates=>{
        if (updateDates.affectedRows>0) {
            return true
        }
        return false
    })
}
const delBlog=(id,author)=>{
    const sql=`delete from blogs where id=${id} and author='${author}'`
    return exec(sql).then(deleteDatas=>{
        if (updateDates.affectedRows > 0) {
          return true;
        }
        return false;
    })
} 

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
};