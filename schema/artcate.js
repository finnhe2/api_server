// 导入校验规则的模块
const joi = require('joi')

// 定义 分类名称 和 分类别名 的校验规则
const name = joi.string().required()
const alias = joi.string().alphanum().required()

// 定义 分类Id 的校验规则
const id = joi.number().integer().min(1).required()

// 校验规则对象  -- 添加分类
module.exports.add_cate_schema = {
    body: {
        name,
        alias
    }
}
module.exports.delete_cate_schema = {
    params: {
        id
    }
}
module.exports.update_cate_schema = {
    body:{
        Id: id,
        name,
        alias
    }
}