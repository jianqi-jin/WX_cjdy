// pages/bind/bind.js
var app = getApp();
const utils = require('../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
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
        '160203140126',
        '101737'
      ]
    }
  },
  onLoad(){
    var that = this;
    utils.tryToGetUserInfo().then(res => {
      var info = res;
      if(info.error){
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
    var that = this;
    wx.showLoading({
      title: 'vCode...',
    })
    wx.request({
      header: {
        cookie: wx.getStorageSync('jsessionid')
      },
      url: app.globalData.serverUri + 'getVcode',
      success: (res) => {
        console.log(res.header)
        var vCodeBase64 = res.data.data.base64;
        that.setData({
          vCodeBase64
        })
        wx.hideLoading();
      }
    })
  },
  formSubmit(e){
    let that = this;
    console.log(e)
    var obj = e.detail.value;
    var user = obj.user;
    var psw = obj.psw;
    var vCode = obj.vCode;
    if(!user){
      this.showError('请输入学号')
      return
    }
    if (!psw) {
      this.showError('请输入密码')
      return
    }
    if (!vCode) {
      this.showError('请输入验证码')
      return
    };
    //console.log(wx.getStorageSync('sid'))
    wx.request({
      method: 'POST',
      header: {
        'cookie': wx.getStorageSync('sid') + ';' + wx.getStorageSync('jsessionid'),
        'content-type': 'application/json'
      },
      data: {
        user,
        psw,
        vCode
      },
      url: app.globalData.serverUri + 'bindUser',
      success(res){
        let body = res.data;
        console.log(body)
        try{
          if (body.status) {
            wx.showToast({
              title: body.msg,
            })
          }else{
            that.showError(body.msg)
          }
        }catch(e){
          console.log(e)
          that.showError('asd')
        }
        
        
        
      }
    })
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