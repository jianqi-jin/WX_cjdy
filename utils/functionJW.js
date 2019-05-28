const app = getApp()
const user = {
  loadVcode: () => {
    var that = this;
    return new Promise(resolve => {
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
          resolve({
            err: 0,
            data: vCodeBase64
          });
          /*that.setData({
            vCodeBase64
          })*/
          wx.hideLoading();
        }
      })  
    })
    
  },
  login_JW: (obj, bind) => {
    if (bind != false){
      bind = true;
    }
    let that = this;
    return new Promise(resolve => {
      var user = obj.user;
      var psw = obj.psw;
      var vCode = obj.vCode;
      let resault = {
        err: null,
        msg: ''
      }
      if (!user) {
        //this.showError('请输入学号')
        resault.err = 1;
        resault.msg = '请输入学号'
        resolve(resault);
        return
      }
      if (!psw) {
        //this.showError('请输入密码')
        resault.err = 1;
        resault.msg = '请输入密码'
        resolve(resault);
        return
      }
      if (!vCode) {
        //this.showError('请输入验证码')
        resault.err = 1;
        resault.msg = '请输入验证码'
        resolve(resault);
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
          vCode,
          bind
        },
        url: app.globalData.serverUri + 'bindUser',
        success(res) {
          let body = res.data;
          console.log(body)
          try {
            if (body.status) {
              wx.showToast({
                title: body.msg,
              })
              resolve({
                err: 0,
                msg: body.msg
              })
              return
            } else {
              //that.showError(body.msg)
              resolve({
                err: 1,
                msg: body.msg
              })
              return
            }
          } catch (e) {
            console.log(e)
            //that.showError('解析错误')
            resolve({
              err: 1,
              msg: '解析错误'
            })
            return
          }
        }
      })
    })
    
  },
  getOptions: () => {
    let that = this;
    return new Promise(resolve => {
      wx.request({
        url: app.globalData.serverUri + 'getOptions',
        data: '',
        header: {
          'cookie': wx.getStorageSync('sid') + ';' + wx.getStorageSync('jsessionid'),
          'content-type': 'application/json'
        },
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          try{
            resolve(res.data)
          }catch(e){
            resolve({
              err: 1,
              msg: '解析出错'
            })
          }
        },
        fail: function (res) {
          resolve({
            err: 1,
            msg: '网络出现问题'
          })
         },
      })
    })
    
  },
  getScore: (option) => {
    let that = this;
    return new Promise(resolve => {
      wx.request({
        url: app.globalData.serverUri + 'getScore?option=' + option,
        data: '',
        header: {
          'cookie': wx.getStorageSync('sid') + ';' + wx.getStorageSync('jsessionid'),
          'content-type': 'application/json'
        },
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function(res) {
          try {
            resolve(res.data);
          }catch(e){
            console.log(e)
            resolve({
              error: 1,
              msg: '解析失败'
            })
          }
        },
        fail: function(res) {
          resolve({
            err: 1,
            msg: '网络错误'
          })
        },
        complete: function(res) {},
      })
    })
  }
}

module.exports = {
  loadVcode: user.loadVcode,
  loginJW: user.login_JW,
  getOptions: user.getOptions,
  getScore: user.getScore
}