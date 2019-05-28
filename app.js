//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    "name": "1" ,
    classTitle: ['校园动态'],
    serverUri: 'https://127.0.0.1:3001/',
    //serverUri: 'https://39.106.49.94:3001/',//39.106.49.94
    errCode: {
      22: 'session验证失效，需跳转user.page',
      34: '教务网cookie失效，需要重新登录'
    },
    jwInfo: {
      user: '',
      psw: '',
      status: 0,
      statusStr: {
        '0': '未操作',
        '1': '登录成功',
        '-1': '登录失效'
      },
      cookieStr: ''
    }
  }
})