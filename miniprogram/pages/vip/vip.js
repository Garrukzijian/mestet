// pages/applet/applet.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showDialog: false,
    isLogin: Boolean,
    download: 0,
    card: 0,
    day: 0,
    score: 40,
    imageList: [{
        leftImage: '../images/数字专辑.png',
        rightImage: '../images/智能设备VIP.png'
      },
      {
        leftImage: '../images/豪华vip.png',
        rightImage: '../images/直通三大app.png'
      },
    ]
  },
  showPaymentDialog: function () {
    this.setData({
      showDialog: true
    });
  },
  confirmPayment: function () {

    console.log(this.data.code);
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      data: {
        code: this.data.code,
        type: 'startvip',
      },
      success: res => {
        // 调用云函数成功
        wx.showToast({
          title: '付款成功',
          icon: 'success',
          duration: 2000
        });
        this.setData({
          showDialog: false
        });
        wx.redirectTo({
          url: '/pages/index/index' // 替换为当前页面路径
        })
      },
      fail: err => {
        // 调用云函数失败
        console.error(err)
      }
    })

  },
  cancelPayment: function () {
    this.setData({
      showDialog: false
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const userInfo = app.globalData.userInfo
    console.log(userInfo);
    this.setData({
      nickName: userInfo.nickName,
      avatarUrl: userInfo.avatarUrl,
      code: userInfo.code,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
})