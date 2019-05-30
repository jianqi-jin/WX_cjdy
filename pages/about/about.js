// pages/about/about.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentType: '',
    currentIndex: 0,
    dataList: [
      {
        type: 'about',
        title: '关于我们',
        content: '开发人员：\n工作环境：\n加入我们：\n'
      }, {
        type: 'about',
        title: '实现原理',
        content: '数据库：\n中间件：\n协议：\n'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let type = options.type;
    this.data.dataList.map((val, index) => {
      if(val.type == type){
        that.setData({
          currentIndex: index
        })
      }
    })
    this.setData({
      currentType: type
    })
    wx.setNavigationBarTitle({
      title: that.data.dataList[that.data.currentIndex].title
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