const joi = require('joi')

const username = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()

const id = joi.number().integer().min(1).required()
const nickName = joi.string().required()
const email = joi.string().email().required()

const avatar = joi.string().dataUri().required()

// 定义验证注册何登录表单数据的规则对象
exports.reg_login_schema = {
    body:{
        username,
        password
    }
}

exports.update_userinfo_schema = {
    // body 需要对 req.body 里面的数据进行验证
    body:{
        id,
        nickName,
        email
    }
}

exports.update_password_schema = {
    body:{
        oldPwd: password,
        newPwd: joi.not(joi.ref('oldPwd')).concat(password)
    }
}

exports.update_avatar_schema = {
    body: {
        avatar
    }
}