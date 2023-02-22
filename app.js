const express = require('express')
const app = express()

const joi = require('joi')

// 导入并配置cors中间件
const cors = require('cors')
app.use(cors())

// 配置解析表单数据的中间件,注意这个中间件只能解析 application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// 一定要在路由之前，封装 res.cc函数 ☆☆☆
app.use((req, res, next)=>{
    res.cc = (err, status=1)=>{
        res.send({
            status,
            message: err instanceof Error?err.message:err
        })
    }
    next()
})

// 导入配置文件
const config = require('./config')
// 解析 token 的中间件
const expressJWT = require('express-jwt')
// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))

// 导入并使用用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)
// 导入并使用用户信息的路由模块
const userinfoRouter = require('./router/userinfo')
app.use('/my', userinfoRouter)
// 导入并使用文章分类的路由模块
const artCateRouter =  require('./router/artcate')
app.use('/my/article', artCateRouter)
// 导入并使用文章路由模块
const articleRouter = require('./router/article')
app.use('/my/article', articleRouter)
// 测试接口
const testRouter = require('./router/test')
app.use('/api', testRouter)

// 定义错误级别的中间件
app.use((err, req, res, next)=>{
    if(err instanceof joi.ValidationError) return res.cc(err)
    if(err.name === 'UnauthorizedError') return res.cc('身份认证失败')
    // 未知的错误
    res.cc(err)
})

app.listen(3007,()=>{
    console.log('api running at 3007 port')
    console.log('12345')
})