const fs = require("fs");

//渲染进展使用Nodejs的第二种方法
//这个文件在index.html里面引入
fs.readFile("package.json", (err,data)=>{
    if (err)  {
        console(err);
        return;
    }
    console.log(data.toString());
});