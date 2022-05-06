const koa = require('koa')
const Router = require('koa-router')
const bodyparser = require('koa-bodyparser')
const koyBody = require('koa-body')
const utils = require('../utils/token.js')

const app = new koa()
const router = new Router()
app.use(koyBody({ multipart: true }))

router.get(`/`, async ctx => {
    let payload = {
        userid: 1,
        name: 'user'
    }
    let sign = 'my sign';
    // 其他选项
    let options = {
        //过期时间，表示秒的数字，或者表示时间跨度的字符串，格式见：
        // https://github.com/zeit/ms
        expiresIn: '2 days'
    };
    let token = utils.setToken(payload, sign, options);
    ctx.body = {
        status: 200,
        data: [{ name: 1, age: 2, token }],
        message: 'success'
    }
})
router.get('/home/:id?', async ctx => {
    if ('id' in ctx.params) {
        ctx.body = {
            status: 200,
            data: {
                body: ctx.params.id
            },
            message: 'success'
        }
    } else {
        ctx.body = {
            status: 199,
            message: 'error'
        }
    }

})
router.put('/ppp', async ctx => {
    var token = ctx.request.header.token
    let payload = utils.getToken(token, 'my sign');
    console.log(payload)
    let payload1 = {
        userid: 1,
        name: 'user'
    }
    console.log()
    if (payload.userid !== payload1.userid || payload.name !== payload1.name) {
        ctx.body = {
            status: 200,
            data: {
                body: payload
            },
            message: 'token无效'
        }
    } else {
        ctx.body = {
            status: 200,
            data: {
                body: payload
            },
            message: 'success'
        }
    }

})


app.use(bodyparser()).use(router.routes()).use(router.allowedMethods())
app.listen(3000, () => {
    console.log('启动了')
})