// index.js
// 获取应用实例
const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    item:0,
    tab:0,
    playlist:[],
  woList:[
    {
      url:'../images/庆典和聚会-10.png',
      text:'k歌作品',
      page:'../order/order?type==已付款'
    },
    {
      url:'../images/视频.png',
      text:'视频',
      page:'../order/order?type==运输中'
    },
    {
      url:'../images/bs-icofont (248).png',
      text:'视频铃声',
      page:'../order/order?type==已完成'
    },
    {
      url:'../images/评论.png',
      text:'评论',
      page:'../afermarket/afermarket'
    },
  ],
    state:'paused',/*播放状态码*/
    playIndex:0,
    play:{
      currentTime:'00:00',
      duration:'00:00',
      percent:0,
      title:'',
      singer:'',
      img:'',
    },

  },

  login_admin(){
        let that=this
        if(that.data.username==''||that.data.password==''){
            wx.showToast({
                title: '账号或密码不能为空！',
                icon:'none'
            })
        }else if(that.data.username=='admin'&&that.data.password=='admin'){
            wx.navigateTo({
              url: '../admin-index/admin_index',
            })
        }else{
            wx.showToast({
              title: '账号或密码错误',
              icon:'none'
            })
        }
    },
    //输入信息
    input_msg(e){
        let name=e.currentTarget.dataset.name
        this.setData({
            [name]:e.detail.value
        })
    },
 
  //关闭登陆框
  close_login_case(){
    this.setData({
      show_login:false
    })
    


  },
  //打开登陆框
  show_login_case(){
    this.setData({
      show_login:true
    })
    //隐藏tabar

  },

  /*滚动条js函数*/
  sliderChange:function(e){
    var second=e.detail.value*this.audioCtx.duration/100
    this.audioCtx.seek(second)
  },
  /*播放/暂停音乐js函数*/
  play:function(){
    this.audioCtx.play()
    this.setData({state:'running'})
  },
  pause:function(){
    this.audioCtx.pause()
    this.setData({state:'paused'})
  },

  audioCtx:null,

  /*播放列表键 */
  change:function(e){
    this.setMusic(e.currentTarget.dataset.index)
    this.play()
  },


  onReady:function(index){
    this.audioCtx=wx.createInnerAudioContext()
    var that=this
    //播放失败检测
    this.audioCtx.onError(function(){
      console.log('播放失败：'+that.audioCtx.src)
    })
    //播放结束后自动换下一曲
    this.audioCtx.onEnded(function(){
      that.next()
    })
    //自动更新播放速度
    this.audioCtx.onPlay(function(){})
    this.audioCtx.onTimeUpdate(function(){
      that.setData({
        'play.duration':formatTime(that.audioCtx.duration),
        'play.currentTime':formatTime(that.audioCtx.currentTime),
        'play.percent':that.audioCtx.currentTime/that.audioCtx.duration*100
      })
    })
    //默认选择第一曲
    this.setMusic(0)
    //格式化时间
    function formatTime(time){
      var minute=Math.floor(time/60)%60;
      var second=Math.floor(time)%60;
      return (minute<10?'0'+minute:minute)+':'+(second<10?'0'+second:second)
    }
  },

  setMusic:function(index){
    var music=this.data.playlist[index]
    this.audioCtx.src=music.src
    this.setData({
      playIndex:index,
      'play.title':music.title,
      'play.singer':music.singer,
      'play.img':music.img,
      'play.currentTime':'00:00',
      'play.duration':'00:00',
      'play.percent':0
    })
  },

  next:function(){
    this.audioCtx.stop()
    var index=this.data.playIndex>=this.data.playlist.length-1?0:this.data.playIndex+1
    this.setMusic(index)
    if(this.data.state==='running'){
      this.play()
    }
  },

  changeItem:function(e){
    this.setData({
      item:e.target.dataset.item
    })
  },
  onClick(e){
    console.log(e)
  },

  changePage:function(e){
    this.setData({
      item:e.target.dataset.page
    })
  },
onShow(){
  db.collection('music').get().then(res =>{
    console.log(res)
    this.setData({
      playlist:res.data

    })
    
  })
},
  changeTab:function(e){
    this.setData({
      tab:e.detail.current
    })
  },





  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  toLogin(){
    wx.getUserProfile({
      desc: '获取用户信息',
      success:(res)=>{
        console.log(res);
        const { userInfo:{avatarUrl,nickName}}=res;
        const userInfo={
          avatarUrl,
          nickName
        }
        wx.setStorageSync('userInfo', userInfo);
        wx.setStorageSync('login', true);
        this.setData({
          login:true,
          avatarUrl,
          nickName
        })
      }
    })
  },
  getUserInfo(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
