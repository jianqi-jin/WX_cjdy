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

const pageJW = {
  getCard: (type) => {
    let url
    if(!type){
      url = app.globalData.serverUri + 'index/card'
    }else{
      url = app.globalData.serverUri + 'index/card?type='+type
    }
    return new Promise(resolve => {
      wx.request({
        url,
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          res.data = res.data.map((val, index) => {
            val.cardData = val.cardData.map((val2, index2) => {
              val2.imgList = val2.imgList.split(',');
              return val2
            })
            return val
          })
          resolve(res)
        }
      })
    })
  },
  getContent:(id) => {
    let that = this;
    return new Promise(resolve => {
      wx.request({
        url: app.globalData.serverUri + 'getContent?id=' + id,
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          resolve(res.data)
        }
      })
    })
    
  }
}

function getNowWeekBeginStamp() {
  let nowDate = new Date();
  let Year = nowDate.getYear() + 1900;
  let Month = nowDate.getMonth() + 1;
  let date = nowDate.getDate();
  let dateStr = Year + '-' + Month + '-' + date
  console.log(dateStr)
  let stamp = (new Date(dateStr)).getTime();
  let weekDay = (new Date(dateStr)).getDay();
  stamp = stamp - (weekDay - 1) * 24 * 60 * 60 * 1000;
  return stamp;
}
function getStartTime() {
  return new Promise(resolve => {
    wx.request({
      url: app.globalData.serverUri +'getStartTime',
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res)
        try {
          let timeStamp = res.data.res.startTime;
          let startDate = new Date(parseInt(timeStamp)).toLocaleString();
          let stamp = getNowWeekBeginStamp();
          let nowDay = (new Date()).getDay() ;//星期几
          let nowWeekNum = (stamp - timeStamp) / (24 * 60 * 60 * 1000 * 7) + 1
          resolve({
            err: 0, 
            startDate,
            nowWeekNum,
            timeStamp,
            nowDay,
            msg: '获取成功'
          })
        } catch (e) {
          console.log(e)
          resolve({
            err: 1,
            msg: '获取失败'
          })
        }
      }
    })
    
    
  })
  
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
        let cookie = '';
        if (!res.cookies[0].name){
          cookie = res.cookies[0]
        }else{
          cookie = res.cookies[0].name + "=" + res.cookies[0].value
        }
        wx.setStorageSync('sid', cookie);
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
  getStuInfo: user.getStuInfo,
  getStartTime,
  getCard: pageJW.getCard,
  getContent: pageJW.getContent
}