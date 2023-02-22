const db = require('../db/index')

exports.getArticleCates = (req, res)=>{
    const sql = 'select * from ev_article_cate where is_delete=0'
    db.query(sql, (err, results)=>{
        if(err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取文章成功',
            data: results
        })
    })
}

module.exports.addArticleCates = (req, res)=>{
    // 先查询 分类名称:name 和 别名:alias 属性是否被占用, 没有被占用则添加
    const sql = 'select * from ev_article_cate where name=? or alias=?'
    db.query(sql, [req.body.name, req.body.alias], (err, results)=>{
        if(err) return res.cc(err)
        if(results.length === 2) return res.cc('分类名称和别名均被占用1')
        if(results.length ===1 && results[0].name==req.body.name && results[0].alias==req.body.alias) return res.cc('分类名和别名均被占用2')
        if(results.length ===1 && results[0].name==req.body.name) return res.cc('分类名被占用')
        if(results.length ===1 && results[0].alias==req.body.alias) return res.cc('别名被占用')
        
        // TODO 新增文章分类
        const sql2 = 'insert into ev_article_cate set ?'
        db.query(sql2, req.body, (err, results)=>{
            if(err) return res.cc(err)
            if(results.affectedRows !==1) return res.cc('新增文章分类失败')
            
            res.cc('新增文章分类成功', 0)
        })
    })
}

module.exports.deleteCateById = (req, res)=>{
    const sql = 'update ev_article_cate set is_delete=1 where id=?'
    db.query(sql, req.params.id, (err, results)=>{
        if(err) return res.cc(err)
        if(results.affectedRows !==1) return res.cc('删除文章分类失败')
        // 删除文章分类成功
        res.cc('删除文章分类成功', 0)
    })
}

module.exports.getArticleById = (req, res)=>{
    const sql = 'select * from ev_article_cate where id=?'
    db.query(sql, req.params.id, (err, results)=>{
        if(err) return res.cc(err)
        if(results.length !==1) return res.cc('获取文章分类数据失败')
        // 把数据响应给客户端
        res.send({
            status: 0,
            message: '获取文章分类数据成功',
            data: results
        })
    })
}
module.exports.updateCateById = (req, res)=>{
    const sql = 'update ev_article_cate set ? where Id=?'
    db.query(sql, [req.body, req.body.Id], (err, results)=>{
        if(err) return res.cc(err)
        if(results.affectedRows !==1) return res.cc('更新文章分类失败')
        res.cc('更新文章分类成功', 0)
    })
}