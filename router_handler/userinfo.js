const db = require('../db/index')

const bcrypt = require('bcryptjs')

// 获取用户基本信息的处理函数
exports.getUserInfo = (req, res) =>{
    // 定义 SQL 语句，查询用户信息
    const sql = 'select id,username,email,user_pic from ev_users where id =?'
    db.query(sql, req.user.id, (err,results)=>{
        if(err) return res.cc(err)
        if(results.length !==1) return res.cc('获取用户信息失败')

        // 将用户信息响应给客户端
        res.send({
            status: 0,
            message: '获取用户基本信息成功',
            data: results[0]
        })
    })
}

// 更新用户基本信息的处理函数
exports.updateUserInfo = (req, res)=>{
    const sql = 'update ev_users set ? where id=?'
    console.log(req.body)
    db.query(sql, [req.body, req.body.id], (err, results)=>{
        if(err) return res.cc(err)
        // 执行 SQL 语句成功,但影响行数不为 1
        if(results.affectedRows !==1) return res.cc('修改用户基本信息失败')
        return res.cc('修改用户基本信息成功',)
    })
}

// 重置密码
exports.updatePassword = (req, res)=>{
    const sql = 'select * from ev_users where id=?'
    db.query(sql, req.user.id, (err, results)=>{
        if(err) return res.cc(err)
        if(results.length !==1) return res.cc('用户不存在')
        // res.cc('ok')

        // TODO  判断用户输入的旧密码是否正确
        const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
        if(!compareResult) return res.cc('原密码错误')

        // TODO 定义更新密码的 SQL 语句
        const sql2 = 'update ev_users set password=? where id=?'
        // 对新密码进行加密处理
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
        // 调用db.query() 执行 SQL 语句
        db.query(sql2, [newPwd, req.user.id], (err, results)=>{
            if(err) return res.cc(err)
            if(results.affectedRows !==1) return res.cc('更新密码失败')
            // 成功
            res.cc('更新密码成功', 0)
        })
    })

}

// 更新用户头像的处理函数
exports.updateAvatar = (req, res)=>{
    const sql = 'update ev_users set user_pic=? where id=?'
    db.query(sql, [req.body.avatar, req.user.id], (err,results)=>{
        if(err) return res.cc(err)
        if(results.affectedRows !==1) return res.cc('更新头像失败!')

        return res.cc('更新头像成功', 0)
    })
}