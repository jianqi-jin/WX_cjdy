// pages/bind/bind.js
const util = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      user: '',
      psw: '',
      major: '',
      name: ''
    },
  },
  getClassTable(){
    wx.showLoading({
      title: '正在导入...',
    })
    util.getClassTableList().then(res => {
      wx.hideLoading();
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.setNavigationBarTitle({
      title: '学号绑定',
    })

    util.getStuInfo().then(res =>{
      that.setData({
        userInfo: res.stuData
      })
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    util.getStuInfo().then(res => {
      that.setData({
        userInfo: res.stuData
      })
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.onLoad()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})