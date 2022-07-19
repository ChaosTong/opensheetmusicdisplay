const exec=require('child_process').exec;
const Koa = require('koa2');
const app = new Koa();

app.use(async ctx => {
  let result = await doShellCmd('node ./test/Util/generateImages_browserless.mjs ../../build ./test/test ./test/test/ex png 0 0 allSmall --osmdtesting');//调用exec
  // console.log(result);
  ctx.body = result;
});

app.listen(3000);


function doShellCmd(cmd){
    let str = cmd;
    let result = {};
    return new Promise(function(resolve,reject) {
        exec(str,function(err,stdout,stderr) {
            if (err) {
                console.log('err');
                result.errCode = 500;
                result.data = "操作失败！请重试";
                reject(result);
            } else {
                // console.log('stdout ',stdout);//标准输出
                result.errCode = 200;
                result.data = JSON.parse(stdout);
                resolve(result);
            }
        })
    })
}