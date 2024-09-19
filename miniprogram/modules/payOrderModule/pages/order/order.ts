import { reqOrderList } from "@/api/payorder"

// pages/order/order.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    limit: 10,
    orderList: [],
    total: 0,
    isBottom: false,
    isLoading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getOrderList()
  },
  // 监听触底
  onReachBottom() {
    // 如果正在加载中 则不执行 节流;
    if (this.data.isLoading) {
      console.log('节流');
      return
    }

    // 判断当前页面的订单数，是否是最大了
    if (this.data.orderList.length >= this.data.total) {
      this.setData({
        isBottom: true
      })
      return
    }
    this.setData({
      isLoading: true
    })
    this.getOrderList()

  },
  async getOrderList() {
    const { limit, page } = this.data;
    // 如果触底 则页面加1 请求数据
    this.setData({
      page: this.data.page + 1
    });
    const result = await reqOrderList({ page, limit })
    this.setData({
      orderList: [...this.data.orderList, ...result.data.records],
      total: result.data.total,
      isLoading: false
    })
  }

})