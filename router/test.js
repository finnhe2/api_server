// 这是文章分类的路由模块
const express = require('express')
const router = express.Router()

// 导入文章分类的路由处理模块
const test_handler = require('../router_handler/test')

// 获取文章分类列表数据的路由
router.get('/getTestData', test_handler.regUser)
module.exports = router