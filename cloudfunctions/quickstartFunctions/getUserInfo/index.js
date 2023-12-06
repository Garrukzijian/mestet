// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const { code } = event
  const db = cloud.database()
  
  try {
    const result = await db.collection('users').where({
      code: code
    }).get()
    return result
  } catch (err) {
    console.error(err)
    return err
  }
}
