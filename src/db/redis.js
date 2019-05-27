const {REDIS_CONF}=require('../conf/db');
const redis=require('redis');

//创建客户端
const clientRedis = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);
clientRedis.on('error',err=>{
    console.error(err);
})

function set(key,val){
    if(typeof val === 'object'){
        val=JSON.stringify(val);
    }
    clientRedis.set(key,val,redis.print)
}

function get(key){
    const promise = new Promise((resolve, reject) => {
      clientRedis.get(key, (err, val) => {
        if (err) {
          reject(err);
          return;
        }
        if (val == null) {
          resolve(val);
          return;
        }
        try {
          resolve(JSON.parse(val));
        } catch (ex) {
          resolve(val);
        }
      });
    });

    return promise
}


module.exports={
    get,
    set
}
