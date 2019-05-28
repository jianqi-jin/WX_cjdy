// pages/jwTools/jwTools.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnList: [
      {
        title: '成绩查询',
        page: '/pages/jwLogin/jwLogin?type=0&action=0&nextUrl=' + encodeURI('/pages/score/score')
      },
      {
        title: '4、6级查询',
        page: '/pages/bind/bind'
      },
      {
        title: '专业要求查询',
        page: '/pages/bind/bind'
      },
      {
        title: '大物实验查询',
        page: '/pages/bind/bind'
      },
      {
        title: '课程表查询',
        page: '/pages/bind/bind'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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