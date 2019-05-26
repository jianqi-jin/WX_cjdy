//logs.js
const util = require('../../utils/util.js')
const app = getApp();

Page({
  data: {
    logs: [],
    msg:'asd'
  },
  onLoad: function () {
    this.setData({
      msg: app.globalData.name
    });
  }
})
