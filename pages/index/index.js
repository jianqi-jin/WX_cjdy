//index.js
//获取应用实例
const app = getApp()
//const util = require('../../utils/color.js')
Page({
  data:{
    btnList: [{
      name: 'A+',
      title: '成绩查询',
      page: '/pages/jwLogin/jwLogin?type=0&action=0&nextUrl=' + encodeURI('/pages/score/score')
    }, {
        name: '表',
        title: '课程表',
        page: '/pages/table/table'
      }, {
        name: 'new',
        title: '校园新闻',
        page: '/pages/pageList/pageList?type=new'
      }, {
        name: '告',
        title: '通知公告',
        page: '/pages/pageList/pageList?type=notice'
      }, {
        name: '考',
        title: '考试安排',
        page: '/pages/pageList/pageList?type=exam'
      }
    ],
    banner:[
      /**
       * {
        id: 123,
        imgUrl: "https://127.0.0.1:3001/images/banner/banne1.png",
        title: "东北banner1"
      }
       * 
       */
    ],
    test: null,
    card: [
      /*
      id: 123,
	        classId: 1,
	        classTitle: "校园动态",
	        cardData: [
	          {
	            id: 131,
	            title: "校长蒋户名出席黑龙江省13界人民代表大会",
	            info: "校长蒋明湖出席黑龙江省第13届人民代表大会，此次大会	的目的是为了加强合作，他在从中发言，并进行了很多市场调	查",
	            imgUrl: "../../res/imgs/card4.jpg"
	          },
	          {
	            id: 131,
	            title: "校长蒋户名出席黑龙江省13界人民代表大会",
	            info: "校长蒋明湖出席黑龙江省第13届人民代表大会，此次大会	的目的是为了加强合作，他在从中发言，并进行了很多市场调	查",
	            imgUrl: "../../res/imgs/card5.jpg"
	          },
	          {
	            id: 131,
	            title: "校长蒋户名出席黑龙江省13界人民代表大会",
	            info: "校长蒋明湖出席黑龙江省第13届人民代表大会，此次大会	的目的是为了加强合作，他在从中发言，并进行了很多市场调	查",
	            imgUrl: "../../res/imgs/card4.jpg"
	          }
	        ]
      */
    ]
  },
  onLoad(){ 
    this._init();
  },
  onPullDownRefresh(){
    this._init().then(res => {
      wx.stopPullDownRefresh();
    });
  },
  _init(){
    return new Promise(response => {
      wx.showLoading({
        title: 'loading...',
        mask: true
      })
      this._getCard().then(res => {
        this._getBanner().then(res => {
          setTimeout(() => {
            wx.hideLoading();
            response();
          }, 2000)
        }
        )
      })
    })
    
  },
  _getCard(){
    return new Promise(response => {
      var that = this;
      wx.request({
        url: app.globalData.serverUri + 'index/card',
        success: function (res) {
          console.log(res);
          try{
            res.data = res.data.map((val, index) => {
              val.cardData = val.cardData.map((val2, index2) => {
                val2.imgList = val2.imgList.split(',');
                return val2
              })
              return val
            })
            that.setData({
              card: res.data
            })
          }catch(e){
            console.log(e)
          }
          response();
        }
      })
    })
    
  },
  _getBanner() {
    return new Promise(response => {
      var that = this;
      wx.request({
        url: app.globalData.serverUri + 'index/banner',
        success: function (res) {
          that.setData({
            banner: res.data.banner
          })
          response();
        }
      })
    })
    
  },
  getColor: index => {
    return 'asd'
  },
  Fun: () => {
    //wx.showToast({ title: '加载中', icon: 'loading', duration: 10000 });
    
  }
})