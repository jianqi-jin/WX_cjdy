// pages/user/user.js
var app = getApp();

const util = require('../../utils/util.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfoFlag: false,
    userInfo: null,
    stuData: null,
    btnList: [
      {
        title: '账号绑定',
        page: '/pages/bind/bind'
      },
      {
        title: '实现原理',
        page: '/pages/about/about?type=setUp'
      },
      {
        title: '关于我们',
        page: '/pages/about/about?type=about'
      }
    ]
  },
  onLoad() {
    let that = this;
    if (!app.globalData.userInfo){
      return;
    }else{
      wx.showLoading({
        title: '正在登录',
      })
      this._tryToGetUserInfo().then(res=>{
        wx.hideLoading();
        that.getStuInfo();
      });
    }
  },
  onPullDownRefresh(){
    this.onLoad()
  },
  _tryToGetUserInfo() {
    var that = this;
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.userInfo']) {//检查授权
            wx.showToast({
              title: '请授权登录',
              icon: 'none',
              duration: 2000
            })
            that.setData({
              userInfoFlag: false
            })
          } else {
            wx.showToast({
              title: '授权成功',
            })
            wx.getUserInfo({
              success(res) {
                that.setData({
                  userInfoFlag: true
                })
                app.globalData.userInfo = res;
                //获取到了userInfo
                //进行后台换取用户信息和id，学号等相关信息。
                //console.log(app.globalData.userInfo);
                that.setData({
                  userInfo: JSON.parse(app.globalData.userInfo.rawData)
                })
                resolve({err: 0})
              }
            })
          }
        }
      })
    })
    
  },
  _userLoginByCode(code) {
    return new Promise(resolve => {
      wx.showLoading({
        title: '正在请求信息',
      })
      //server userLoginByCode
      wx.request({
        url: app.globalData.serverUri + 'login',
        data: {
          code: code
        },
        success(res) {
          wx.setStorageSync('sid', res.header['set-cookie']);
          wx.hideLoading();
          console.log(res)
          resolve(res)
        }
      })
    })
  },
  bindUserInfo(e){//授权登录
  var that = this;
    var userInfo = e.detail.userInfo;
    if (userInfo){
      wx.showLoading({
        title: '正在绑定',
      })
      that._tryToGetUserInfo().then(res => {
        wx.showLoading({
          title: '正在登录',
        })
        that.getStuInfo();
      });
    }else{
      wx.showModal({
        title: '授权失败',
        content: '您拒绝了授权登录',
        showCancel: false
      })
    }
  },
  getStuInfo(){
    util.getStuInfo().then(res => {
      console.log(res)
      wx.showToast({
        title: res.msg,
      })
      this.setData({
        stuData: res.stuData
      })
    })
  },
  Fun(){
    console.log(this.data.userInfo.nickName)
  }
})