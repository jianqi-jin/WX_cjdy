const app = getApp()
Component({
  properties: {
    //props
    selectedIndex: {
      type: Number,
      value: 0
    },
    navBtnList: {
      type: Object,
      value: [
        // {
        //   url: '/pages/home/home',
        //   img: '/res/icon/nav-icon-home.png',
        //   selectedImg: '/res/icon/nav-icon-home-pre.png',
        //   title: '首页',
        //   havT: true
        // }, 
        // {
        //   url: '/pages/recommend/recommend',
        //   img: '/res/icon/tuijian.png',
        //   selectedImg: '/res/icon/tuijian.png',
        //   title: '推荐有奖',
        //   havT: false
        // },{

        //   url: '/pages/order/order',
        //   img: '/res/icon/nav-icon-order.png',
        //   selectedImg: '/res/icon/nav-icon-order-pre.png',
        //   title: '订单',
        //   havT: true
        // },{

        //   url: '/pages/user/user',
        //   img: '/res/icon/nav-icon-user.png',
        //   selectedImg: '/res/icon/nav-icon-user-pre.png',
        //   title: '我的',
        //   havT: true
        // }
      ],
    }
  },
  data: {
    // 这里是一些组件内部数据
    someData: {}
  },
  methods: {
    // 这里是一个自定义方法
    customMethod: function() {},
    navTo: function(item) {
      let index = item.currentTarget.dataset.index;
      console.log(this.data.navBtnList[index]);
      wx.redirectTo({
        url: this.data.navBtnList[index].url,
      })
    }
  },
  ready() {
    if (app.globalData.navBottom) {
      this.setData({
        navBtnList: app.globalData.navBottom
      })
    }
    app.navReady = () => {
      console.log('navBottomReLoad')
      this.setData({
        navBtnList: app.globalData.navBottom
      })
    }
  }
})