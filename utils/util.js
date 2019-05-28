const app = getApp();
const userInfo = {
  tryToGetUserInfo: () => {
    return new Promise(resolve => {
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.userInfo']) {
            resolve({
              error: '1',
              info: '未获取授权'
            });
             
          } else {
            wx.getUserInfo({
              success(res) {
                try {
                  resolve(res);
                }catch(e){
                  resolve({
                    err: 1,
                    msg: '解析错误'
                  });
                }
              }
            })
          }
        }
      })
    })
    
  }
}

const user = {
  getClassTableList: () => {
    return new Promise(resolve => {
      wx.request({
        url: app.globalData.serverUri + 'getClassTableList',
        header: {
          'cookie': wx.getStorageSync('sid') + ';' + wx.getStorageSync('jsessionid')
        },
        success(res) {
          try {
            resolve(res.data)
          } catch (e) {
            console.log(e)
            resolve({
              err: 1,
              errMsg: '未知错误'
            })
          }

        }
      })
    })
    
  },
  verLogin: () => {
    return new Promise(resolve => {
      wx.login({
        success(res) {
          _userLoginByCode(res.code).then(res => {
            resolve(res)
          })
        }
    })
    
    });
  },
  getStuInfo: () => {
    let that = this;
    return new Promise(resolve => {
      user.verLogin().then(res => {
        wx.request({
          url: app.globalData.serverUri + 'getStuInfo',
          header: {
            cookie: wx.getStorageSync('sid')
          },
          success: (res) => {
            app.globalData.jwInfo.user = res.user;
            resolve(res.data)
          }
        })
      });
    })
    
  }
}

function _userLoginByCode(code){
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
        wx.setStorageSync('sid', res.cookies[0].name + "=" + res.cookies[0].value);
        wx.hideLoading();
        console.log(res)
        resolve(res)
      }
    })
  })
}

module.exports = {
  tryToGetUserInfo: userInfo.tryToGetUserInfo,
  getClassTableList: user.getClassTableList,
  verLogin: user.verLogin,
  getStuInfo: user.getStuInfo
}