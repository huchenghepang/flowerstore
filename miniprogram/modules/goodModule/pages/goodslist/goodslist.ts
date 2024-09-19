import { getCurrentPageUrl, getCurrentPageParam } from "@/utils/pageInfo";
import { reqGoodList } from "../../../../api/good"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowBack: true,
    goodList: [],
    total: 0,// 所有的条数
    pages: 0,// 页码总数
    requestData: {
      page: 1,
      limit: 10,
      category1Id: "",
      category2Id: "",
    },
    isLoading: false, // 配置节阀流
    categoryName: "商品列表"
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(option) {
    // 获取上个页面传来的参数 可能有一级分类或者二级分类的Id
    const { category1Id, category2Id, categoryName, share } = option;
    if (share == 1) {
      this.setData({
        isShowBack: false
      })
    }
    this.setData({
      "requestData.category1Id": category1Id ? category1Id : "",
      "requestData.category2Id": category2Id ? category2Id : "",
      categoryName
    });
    // 请求初始第一页数据
    this.getGoodList();
  },
  // 触底加载
  onReachBottom() {
    // 如果有一个请求还在进行则不会进行请求
    if (this.data.isLoading) return
    if (this.data.goodList.length < this.data.total) {
      this.data.requestData.page++;
      this.getGoodList();
    }
  },
  // 监听下拉刷新
  onPullDownRefresh() {
    // 初始数据
    this.setData({
      requestData: {
        page: 1,
        limit: 10,
        category1Id: "",
        category2Id: "",
      },
    })
    this.getGoodList(true);  // 重新获取数据
    wx.stopPullDownRefresh();  // 结束下拉刷新
  },
  onShareAppMessage() {
    const pageUrl = getCurrentPageUrl();
    const { category1Id, category2Id, categoryName } = getCurrentPageParam()

    // 用户点击右上角分享
    // category1Id=1&category2Id=4&categoryName=爱意表达
    return {
      title: '同城送花小程序',
      path: `/modules/goodModule/pages/goodslist/goodslist?`
        + `${category1Id ? `category1Id=${category1Id}&` : ''}`
        + `${this.data.requestData.category2Id ? `category2Id=${category2Id}&` : ''}`
        + `${categoryName ? `categoryName=${categoryName}&` : ''}`
        + `share=1`,
    }
  },


  async getGoodList(isPullDown: boolean = false) {
    this.setData({ isLoading: true })  // 开始loading状态
    const { data } = await reqGoodList(this.data.requestData);

    // 判断是否是下拉刷新调用 如果是下拉刷新调用 那么这个刷新应该重置goodList数据
    if (isPullDown) {
      this.setData({ goodList: [] })  // 重置goodList数据
    }
    this.setData({
      goodList: [...this.data.goodList, ...data.records],
      pages: data.pages,
      total: data.total,
    });
    this.setData({ isLoading: false })  // 结束loading状态
  }
})