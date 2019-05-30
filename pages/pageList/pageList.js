// pages/pageList/pageList.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageList: [],
    currentType: '',
    currentIndex: 0,
    btnList: [{
      title: '校园新闻',
      type: 'new'
    }, {
        title: '通知公告',
        type: 'notice'
      }, {
        title: '考试安排',
        type: 'exam'
      }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
      mask: true,
    })
    let that = this;
    let type ='';
    if (options){
      type = options.type;
    }
   
    this.setData({
      currentType: type
    }) 
    let btnList = this.data.btnList;
   btnList.forEach((val, index) => {
     if (val.type == type){ 
        that.setData({
          currentIndex: index
        })
        wx.setNavigationBarTitle({
          title: btnList[that.data.currentIndex].title,
        })
       util.getCard(type).then(res => {
          console.log(res)
          that.setData({
            pageList: res.data[0].cardData
          })
          wx.hideLoading()
        })

      }
    })
  },
  changeType(e){
    let type = e.currentTarget.dataset.type;
    this.onLoad({
      type
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
    let that = this;
    this.onLoad({
      type: that.data.currentType
    })
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