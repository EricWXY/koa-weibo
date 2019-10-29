/**
 * @description user model test
 * @author EricWXY
 */

const { User } = require('../../src/models/index')

test('User 模型的各个属性，符合预取', () => {
  // build 会构建一个内存的 User 实例，但不会提交到数据库
  let user = User.build({
    userName: 'zhangsan',
    password: 'p123',
    nickName: '张三',
    picture: '/xxx.png',
    city: '北京'
  })
  // 验证各种属性
  expect(user.userName).toBe('zhangsan')
  expect(user.password).toBe('p123')
  expect(user.nickName).toBe('张三')
  expect(user.picture).toBe('/xxx.png')
  expect(user.city).toBe('北京')
  expect(user.gender).toBe(3)//测试 gender 的默认值

})