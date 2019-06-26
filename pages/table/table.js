var app = getApp();

const util = require('../../utils/util.js')

Page({
  data:{
    showSetBox: false,
    years:[
      '2018-2019第一学年',
      '2018-2019第二学年',
      '2019-2020第一学年',
      '2019-2020第二学年'
    ],
    currentYear: 0,
    majors:[
      '海洋油气专业',
      "应用物理学与数学概率论设计统计船业规划图纸制造专业"
    ],
    currentMajor: 0,
    weeks: [
      '第一周',
      '第二周',
      '第三周',
      '第四周',
      '第五周',
      '第六周',
      '第七周',
      '第八周',
      '第九周',
      '第十周',
      '第十一周',
      '第十二周',
      '第十三周',
      '第十四周',
      '第十五周',
      '第十六周',
      '第十七周',
      '第十八周'
    ],
    currentDay: 1,//  1-7
    days: [
      '周一',
      '周二',
      '周三',
      '周四',
      '周五',
      '周六',
      '周日'
    ],
    currentWeek: 1,
    classTableTitle: [
      {
        index: 1,
        startTime: '8:00',
        endTime: '9:35'
      },
      {
        index: 2,
        startTime: '8:00',
        endTime: '9:35'
      },
      {
        index: 3,
        startTime: '8:00',
        endTime: '9:35'
      },
      {
        index: 4,
        startTime: '8:00',
        endTime: '9:35'
      },
      {
        index: 5,
        startTime: '8:00',
        endTime: '9:35'
      },
      {
        index: 6,
        startTime: '8:00',
        endTime: '9:35'
      }
    ],
    classTableList: [
      {}, {}, {}, {}, {}, {}, {},
    ]
  },
  onShow(){
    let that = this;
    util.getStuInfo().then(res => {
      that.setData({
        classTableList: JSON.parse(res.stuData.table)
      })
    })


    util.getStartTime().then(res => {
      console.log(res)
      let currentDay = res.nowDay;
      if (currentDay == 0) {
        currentDay = 7;
      }
      that.setData({
        currentWeek: res.nowWeekNum,
        currentDay
      })
    })
    
  },
  toggleSetBox(){
    let that = this;
    this.setData({
      showSetBox: ~that.data.showSetBox 
    })
  },
  hiddenSet(){
    this.setData({
      showSetBox: false
    })
  },
  login: () => {
    wx.login({
      success: (res) => {
        console.log(res)
      }
    })
  },
  onLoad(){
  },
  weekChange(e){
    var index = Math.floor(e.detail.value) + 1;
    this.setData({
      currentWeek: index
    })

  },
  changeMajor(e){
    var index = Math.floor(e.detail.value);
    this.setData({
      currentMajor: index
    })
  },
  changeYear(e){
    var index = Math.floor(e.detail.value);
    this.setData({
      currentYear: index
    })
  }
})