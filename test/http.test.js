/**
 * @description
 * @author EricWXY
 */

const server = require('./server')

test('json 返回格式正确', async() => {
  const res = await server.get('/json')
  expect(res.body).toEqual({
    title:'koa2 json'
  })
  expect(res.body.title).toBe('koa2 json')
})

test('post 请求返回格式正确',async()=> {
  const res = await server.post('/post_test').send({data:'test'})
  if(res.status===200){
    expect(res.body).toEqual({
      status:200,
      msg:'success',
      req:{
        data:'test'
      }
    })
  }
})