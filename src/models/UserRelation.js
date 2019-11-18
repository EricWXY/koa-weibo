/**
 * @description 用户关注关系
 * @author EricWXY
 */

const { seq, INTEGER } = require('./_seq')

const UserRelation = seq.define('userRelation', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户id'
  },
  followerId: {
    type: INTEGER,
    allowNull: false,
    comment: '被关注用户id'
  },

})

module.exports = UserRelation
