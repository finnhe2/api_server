const db = require('../db/index')

// 注册新用户的处理函数
exports.regUser = (req, res)=>{
    const sqlStr = 'select * from aigraph_job_user'
    console.log(sqlStr)
    db.query(sqlStr, (err, results)=>{
        console.log('err',err)
        console.log('asdewfwe')
        if(err){
            return res.cc(err)
        }
        res.send({
            status: 0,
            message: '获取数据成功2',
            data: results
        })
    })
}