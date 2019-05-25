const querystring=require('querystring');
const handleUserRouter=require('./src/router/user');
const handleBlogRouter=require('./src/router/blog');


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

let httpHandle=(req,res)=>{
    //设置返回值为json格式
    res.setHeader('Content-type','application/json');
    const url = req.url;
    req.path = url.split("?")[0];
    req.query=querystring.parse(url.split('?')[1]);

    //处理post data
    getPostData(req).then(postData=>{
        req.body=postData;
        //处理blog路由
        // const blogDate = handleBlogRouter(req,res);
        // if (blogDate) {
        //     res.end(JSON.stringify(blogDate))
        //     return
        // }

        //处理blog路由(promise)
        const blogResult = handleBlogRouter(req, res);
        if (blogResult) {
            blogResult.then(blogDate=>{
                 res.end(JSON.stringify(blogDate));
            });
            return
        }

        //处理user路由
        // const userDate=handleUserRouter(req,res);
        // if(userDate){
        //     res.end(JSON.stringify(userDate));
        //     return
        // }
        const userResult = handleUserRouter(req, res);
        if (userResult) {
            userResult.then(userDate=>{
                 res.end(JSON.stringify(userDate));
            });
            return
        }

        //404
        res.writeHeader(404,{'Content-type':'text/plain'});
        res.write("404 not found");
        res.end();
    })
}

module.exports=httpHandle;