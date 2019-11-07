/**
 * @description user api test
 * @author EricWXY
 */

const server = require('../server')

// 用户信息
const userName = `u_${Date.now()}`
const password = `p_${Date.now()}`
const testUser = {
  userName,
  password,
  nickName: userName,
  gender: 1
}

// 存储cookie
let COOKIE = ''

// 注册
test('注册一个用户，应该成功', async () => {
  let res = await server
    .post('/api/user/register')
    .send(testUser)

  expect(res.body.errno).toBe(0)
})

// 重复注册
test('重复注册用户，应该失败', async () => {
  let res = await server
    .post('/api/user/register')
    .send(testUser)

  expect(res.body.errno).not.toBe(0)
})

//查询用户名是否存在
test('查询注册的用户名，应该存在', async () => {
  let res = await server
    .post('/api/user/isExist')
    .send({ userName })

  expect(res.body.errno).toBe(10001)
})

// json schema 校验
test('json schema 检测，非法的格式应该失败', async () => {
  let res = await server
    .post('/api/user/register')
    .send({
      userName: 123,
      password: 'a',
      gender: 'man'
    })

  expect(res.body.errno).not.toBe(0)
})

// 登录
test('登录，应该成功', async () => {
  let res = await server
    .post('/api/user/login')
    .send({ userName, password })

  expect(res.body.errno).toBe(0)

  // 获取 cookie
  COOKIE = res.headers['set-cookie'].join(';')
})

// 修改基本信息
test('修改基本信息应该成功', async () => {
  let res = await server
    .patch('/api/user/changeInfo')
    .send({
      nickName: 'testNickName',
      city: 'testCity',
      picture: '/test.png',
    })
    .set('cookie', COOKIE)

  expect(res.body.errno).toBe(0)
})

//修改密码
test('修改密码应该成功', async () => {
  let res = await server
    .patch('/api/user/changePassword')
    .send({
      password,
      newPassword: `p_${Date.now()}`,
    })
    .set('cookie', COOKIE)

  expect(res.body.errno).toBe(0)
})

// 删除
test('删除用户，应该成功', async () => {
  let res = await server
    .post('/api/user/del')
    .set('cookie', COOKIE)

  expect(res.body.errno).toBe(0)
})

// 退出登录
test('推出登录应该成功', async () => {
  let res = await server
    .post('/api/user/logout')
    .set('cookie',COOKIE)

  expect(res.body.errno).toBe(0)
})

//再次查询用户，应该不存在
test('再次查询用户，因该不存在', async () => {
  let res = await server
    .post('/api/user/isExist')
    .send({ userName })

  expect(res.body.errno).not.toBe(0)
})
