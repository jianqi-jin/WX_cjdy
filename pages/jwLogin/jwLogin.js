// pages/jwLogin/jwLogin.js
var app = getApp();
const utils = require('../../utils/util.js')
const JWFun = require('../../utils/functionJW.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bindType: false,//不绑定
    action: false,//仅为绑定
    nextUrl: '',
    vCodeBase64: '',
    popErrorMsg: '',
    userInfo: null,
    input: {
      title: [
        '请输入学号',
        '请输入密码',
        '请输入验证码'
      ],
      name: [
        'user',
        'psw',
        'vCode'
      ],
      value:[
        '',
        ''
      ]
    }
  },
  onShow(e) {
    var that = this;
    utils.tryToGetUserInfo().then(res => {
      var info = res;
      if(!info || info.error){
        wx.showModal({
          title: '权限错误',
          content: '获取授权失败',
          showCancel: false
        });
        wx.switchTab({
          url: "../user/user",
        })
      }else{
        info = JSON.parse(res.rawData);
        //console.log(info);
        that.setData({
          userInfo: info
        })
      }
      this._userInit().then(res => {
        that.loadVcode()
      });
    });

  },
  loadVcode(){
    let that = this;
    JWFun.loadVcode().then(res => {
      that.setData({
        vCodeBase64: res.data
      })
    })
  },
  onLoad(query){
    console.log(query)
    //设置绑定信息
    /*
    let launchOptions = wx.getLaunchOptionsSync();
    console.log(launchOptions);
    let query = launchOptions.query;*/
    let type = query.type == 0 || query.type == null ? false : true;
    console.log(type)
    
    wx.setNavigationBarTitle({
      title: type ? '账号绑定' : '教务登录',
    })
    let action = query.action == 0 || query.action == null ? false : true;
    let nextUrl = query.nextUrl == undefined ? '' : query.nextUrl;
    this.setData({
      bindType: type,
      action,
      nextUrl
    })
  },
  formSubmit(e){
    let that = this;
    console.log(e)
    
    var obj = e.detail.value;
    app.globalData.jwInfo.user = obj.user;
    wx.showLoading({
      title: '登录教务系统...',
      mask: true,
    })
    JWFun.loginJW(obj, this.data.bindType).then(res => {
      wx.hideLoading()
      if(res.err){
        that.showError(res.msg)
      }else{
        if (that.data.action){
          utils.getClassTableList().then(res => {
            wx.showToast({
              title: res.msg,
            })
            setTimeout(function () {

              if (that.data.nextUrl) {
                wx.navigateTo({
                  url: that.data.nextUrl,
                })
              } else {
                wx.navigateBack({
                  delta: 1
                })
              }
            }, 1000)
          })
        }else{
          wx.showToast({
            title: res.msg,
          })
          setTimeout(function () {
            
            if (that.data.nextUrl) {
              wx.navigateTo({
                url: that.data.nextUrl,
              })
            } else {
              wx.navigateBack({
                delta: 1
              })
            }
          }, 1000)
          
          
        }
        
      }
    })
    return
  },
  getClassTableList(){
    utils.getClassTableList().then(res => {
      console.log(res)
      wx.showToast({
        title: res.msg,
      })
    });
  },
  _userInit(){
    return new Promise(resolve => {
      wx.showLoading({
        title: 'loading...',
      })
      wx.request({
        url: app.globalData.serverUri + 'userInit',
        success: (res) => {
          //console.log(res)
          wx.setStorageSync('jsessionid', res.data);
          wx.hideLoading()
          resolve({
            err: 0,
            msg: 'success'
          }) 
        }
      })
    })
    
  },
  showError(msg){
    if(this.data.popErrorMsg){
      return 
    }
    const animation = wx.createAnimation({
      duration: 250,
      timingFunction: 'ease'
    })
    animation.translate(0, 29).step();
    this.setData({
      popErrorMsg: msg
    })
    this.setData({
      animationData: animation.export()
    })
    
    var that = this;
    setTimeout(function(){
      animation.translate(0, -29).step();
      that.setData({
        animationData: animation.export()
      })
      setTimeout(function(){
        that.setData({
          popErrorMsg: ''
        })
      }, 250)
    }, 3000)
  }

})