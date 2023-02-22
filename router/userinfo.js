const express = require('express')
const router = express.Router()

// 挂载路由

//  导入路由处理函数模块
const userinfo_handler = require('../router_handler/userinfo')

const expreeJoi = require('@escook/express-joi')

const { update_userinfo_schema, update_password_schema, update_avatar_schema } = require('../schema/user')

router.get('/userinfo', userinfo_handler.getUserInfo)

router.post('/userinfo', expreeJoi(update_userinfo_schema) , userinfo_handler.updateUserInfo)

router.post('/updatepwd', expreeJoi(update_password_schema), userinfo_handler.updatePassword)

// 更换头像的路由
router.post('/update/avatar', expreeJoi(update_avatar_schema) , userinfo_handler.updateAvatar)
// 挂载路由
module.exports = router