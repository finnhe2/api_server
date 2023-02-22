// 导入处理函数的核心模块
const path = require('path')
const db = require('../db/index')

exports.addArticle = (req, res)=>{
    console.log(req.file)
    if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('文章封面是必选参数！')
}