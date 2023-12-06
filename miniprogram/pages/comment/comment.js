Page({
  data: {
    replyType:1,
    replyIndex:'',
    showNone:false,
    showAll:false,
    commentList:[

      {
        headImage:'../images/banner1.jpg',//这是发布人的头像
        name:"arts",//这是发布人的姓名
        replyContent:"我真的超爱周杰",//这是发布人的发布内容
        replyTime:'2020-10-10 10:11',//这是发布人的时间
        replyList:[],
      },
      {
        headImage:'../images/banner1.jpg',
        name:"arts",
        replyContent:"绝了",
        replyTime:'2022-05-23 12:31',
        replyList:[],
      },
      {
        headImage:'../images/banner1.jpg',
        name:"arts",
        replyContent:"初听不知曲中意，在听已是曲中人",
        replyTime:'2022-12-10 10:33',
        replyList:[],
      },
      {
        headImage:'../images/banner1.jpg',
        name:"arts",
        replyContent:"不知不觉已经过了七年了",
        replyTime:'2023-1-188 13:17',
        replyList:[],
      },
      {
        headImage:'../images/banner1.jpg',
        name:"arts",
        replyContent:"唢呐一开赶走emo,一天不听浑身难受",
        replyTime:'2023-1-188 13:17',
        replyList:[],
      },

    ],
    

    /*定义一些数据*/
    focus: false, //输入框是否聚焦
    placeholder: '说点什么...', //底部输入框占字符
    placeholder2: '说点什么，让ta也认识看笔记的你', //顶部输入框占字符
    value: null, //顶部输入框内容
    comment_text: null, //底部评论框内容
    /*
     *以下初始化数据是用户点击任意一条评论或回复时需要设置的数据
     *然后将设置好的数据传递给评论时新创建的评论数据对象
    */
    now_reply_name: null, //当前点击的评论或回复评论的用户昵称
    now_reply_type: 0, //当前回复类型 默认为0 1为回复评论 2为回复回复
    now_parent_id: 0, //当前点击的评论或回复评论的所属评论id
    now_reply: 0, //当前点击的评论或回复评论的id

    //模拟用户信息
    userinfo: {
      nickName: '马飞', //用户昵称
      avatarUrl: '/images/assemblyNumber/discoveryDetails/per5.png' //用户头像
    }
  },
  onLoad() {
    var showNoneBool = false
    if( this.data.commentList.length == 0 ){showNoneBool = true}
    this.setData({
      showNone:showNoneBool,
    })


  },
  onReachBottom(){
    this.setData({
      showAll:true,
    })
  },
  inputGetValue: function (e) {
    this.setData({
      comment_text: e.detail.value
    });
  },
  sendBtn(e){
    if( this.data.comment_text == '' || this.data.comment_text == null ){
      wx.showToast({
        title: '请输入内容', //提示内容
        icon: 'none' //提示图标
      })
    }
    var userName = wx.getStorageSync('userInfo');
    let obj = {
      headImage:userName.avatarUrl,
      name:userName.nickName,   
      replyContent:this.data.comment_text,
      replyTime:this.funTimeBank(),
      replyList:[],
    }
    this.setData({
      showNone:false,
    })
    if( this.data.replyType == 1 ){
      this.data.commentList.push(obj)
      this.setData({
        commentList: this.data.commentList,
        comment_text: '',
      })
    }else if( this.data.replyType == 2 ){
      var msg = {
        headImage:userName.avatarUrl,
        name:userName.nickName,
        replyContent:this.data.comment_text,
        replyTime:this.funTimeBank(),

      }
      this.data.commentList[this.data.replyIndex].replyList.push(msg)
      this.setData({
        commentList: this.data.commentList,
        placeholder: '说点什么...',
        replyIndex:'',
        comment_text: '',
        replyType:1,
      })
    }
  },
  funTimeBank(){
    var myDate = new Date();
    var year = myDate.getFullYear();
    var month = myDate.getMonth()+1;
    var day = myDate.getDate();
    var hour = myDate.getHours();
    var min = myDate.getMinutes();
    var time = year + "-" + month + "-" + day + " " + hour + ":" + min
    return time
  },
  replyComment(e){
    var index = e.currentTarget.dataset.index
    this.setData({
      placeholder: '您要回复他什么呢',
      comment_text: '',
      replyType:2,
      replyIndex:index
    })
  },
})