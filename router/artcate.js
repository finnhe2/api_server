// 这是文章分类的路由模块
const express = require('express')
const router = express.Router()

// 导入文章分类的路由处理模块
const artcate_handler = require('../router_handler/artcate')

// 导入校验中间件
const expressJoi = require('@escook/express-joi')
const { add_cate_schema, delete_cate_schema, update_cate_schema } = require('../schema/artcate')

// 获取文章分类列表数据的路由
router.get('/cates', artcate_handler.getArticleCates)
// 新增文章分类的路由
router.post('/addcates', expressJoi(add_cate_schema), artcate_handler.addArticleCates)

router.get('/deletecates/:id', expressJoi(delete_cate_schema), artcate_handler.deleteCateById)

router.get('/cate/:id', expressJoi(delete_cate_schema), artcate_handler.getArticleById)

router.post('/updatecate', expressJoi(update_cate_schema), artcate_handler.updateCateById)

module.exports = router