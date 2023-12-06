// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const {
    avatarUrl,
    nickName,
    code,
  } = event
  const db = cloud.database()
  const userInfo = {
    avatarUrl: avatarUrl,
    nickName: nickName,
    code: code,
    isVip: false,
  }

  try {
    // 查询数据库，判断code是否已存在
    const existingUser = await db.collection('users').where({
      code: code
    }).get()
    
    if (existingUser.data.length > 0) {
      // 如果已存在相同code的记录，则不进行添加操作
      console.log('Code already exists in database.')
      return {
        code: -1,
        message: 'Code already exists in database.'
      }
    } else {
      // 不存在相同code的记录，进行添加操作
      const result = await db.collection('users').add({
        data: userInfo
      })
      return result
    }
  } catch (err) {
    console.error(err)
    return err
  }
}
