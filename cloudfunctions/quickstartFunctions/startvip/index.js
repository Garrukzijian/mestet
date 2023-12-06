// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const usersCollection = db.collection('users')

// 云函数入口函数
exports.main = async (event, context) => {
  const { code } = event

  try {
    const { data } = await usersCollection.where({
      code: code
    }).get()

    if (data.length > 0) {
      const user = data[0]
      await usersCollection.doc(user._id).update({
        data: {
          isVip: true
        }
      })
      return {
        success: true,
        message: '更新成功'
      }
    } else {
      return {
        success: false,
        message: '未找到对应的用户'
      }
    }
  } catch (err) {
    return {
      success: false,
      message: '更新失败，请重试'
    }
  }
}
