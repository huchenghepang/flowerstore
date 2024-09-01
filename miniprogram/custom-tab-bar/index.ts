
Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    "borderStyle": "black",
    "backgroundColor": "#ffffff",
    "list": [
      {
        "pagePath": "/pages/index/index",
        "iconPath": "/assets/tabbar/index.png",
        "selectedIconPath": "/assets/tabbar/index-active.png",
        "text": "首页"
      },
      {
        "pagePath": "/pages/category/category",
        "iconPath": "/assets/tabbar/cate.png",
        "selectedIconPath": "/assets/tabbar/cate-active.png",
        "text": "分类"
      },
      {
        "pagePath": "/pages/paycart/paycart",
        "iconPath": "/assets/tabbar/cart.png",
        "selectedIconPath": "/assets/tabbar/cart-active.png",
        "text": "购物车"
      },
      {
        "pagePath": "/pages/myinfo/myinfo",
        "iconPath": "/assets/tabbar/my.png",
        "selectedIconPath": "/assets/tabbar/my-active.png",
        "text": "我的"
      },
      
    ]
  },
  attached() {
  },
  methods: {
    switchTab(e:any) {
      const data = e.currentTarget.dataset
      const url = data.path;
      
      wx.switchTab({url});
/*       (this as any).setData({
        selected: data.index
      }) */  // 解决闪烁文件
    }
  }
})