// 导入 mysql 模块
const mysql = require('mysql')

// 创建数据库连接对象
// const db = mysql.createPool({
//     host: '127.0.0.1',
//     user:'root',
//     password:'admin123',
//     database:'my_d  b_01'
// })
const db = mysql.createPool({
    host: '4127.0.0.1',
    port: 3306,
    user:'umlsuser',
    password:'umls0902',
    database:'aigraph_job' 
})

module.exports = db