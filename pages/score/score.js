// pages/score/score.js
const util = require('../../utils/functionJW.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    optionIndex: 3,
    options: [
      '无(请重新登录或刷新页面)',
      '获取出错'
    ],
    scoreList: []
  },
  pickChange(e){
    let value = e.detail.value;
    this.setData({
      optionIndex: value
    })
    this.loadScore()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.showLoading({
      title: '获取学年...',
    })
    util.getOptions().then(res => {
      console.log(res)
      if (res.error || !res.data || res.data.length < 1){
        wx.showToast({
          title: '获取学年失败'
        })
      }else{
        wx.hideLoading();
        that.setData({
          options: res.data
        })
        that.loadScore();
      }
      
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  loadScore(){
    wx.showLoading({
      title: '查询成绩...',
    })
    let that = this;
    let option = this.data.options[this.data.optionIndex];
    util.getScore(option).then(res => {
      if(res.error || res.err){
        wx.showToast({
          title: '获取失败',
        })
        wx.hideLoading()
      } else {
        let scoreList = res.data;
        scoreList = scoreList.map((val, index) => {
          val.color = that.getColorFromScore(val.score);
          val.showFlag = false;
          return val
        })
        that.setData({
          scoreList: res.data
        })
        wx.hideLoading()
      }
    })
  },
  onReady: function () {

  },
  toggleScoreBox(e){
    let index = e.currentTarget.dataset.index;
    //let key = 'scoreList[' + index + '].showFlag';
    let scoreList = this.data.scoreList.map((val, index2) => {
      if(index == index2){
        val.showFlag = val.showFlag ? false : true
        return val;
      }else{
        val.showFlag = false
        return val;
      }
    })
    this.setData({
      scoreList//[key]: this.data.scoreList[index].showFlag ? false : true
    })
  },
  getColorFromScore(score){
    //红255-0  绿0-187
    try {
      if (score < 60) {
        return '#ff0000';
      } else {

        let scoreB = score - 60;
        let p = score / 100;
        let pr = scoreB / 40;
        if (pr > 1){
          pr = 1;
        }
        let r = parseInt(200 - pr * 200).toString(16);
        if(r.length < 2){
          r = '0'+r;
        }
        let g = parseInt(p * 187).toString(16);
        if (g.length < 2) {
          g = '0' + g;
        }
        return '#' + r + g + '00';//红绿蓝
      }
    }catch(e){
      console.log(e)
      return '00bb00'
    }
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