// pages/paycart/paycart.ts
import { hiddenSwipeCellBehavior } from "../../behavior/swipecellhidden";
import { userStoreBehavior } from '@/behavior/behavior';
import { reqUpdateGoodCartStatus, reqCheckedStatusGoodCart, reqAddGoodCart, reqDeleteGood } from '@/api/paycart';
import { modal } from '@/utils/extends/showModal';
import { toast } from "@/utils/extends/toast";
const computedBehavior = require('miniprogram-computed').behavior
// 防抖
const { debounce } = require('@/utils/debounce');
Page({
  behaviors: [hiddenSwipeCellBehavior, userStoreBehavior, computedBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    count: 1,
  },
  watch: {
    'userStore.isLogin': function (newValue) {
      this.getGoodCartList();
    }
  },
  computed: {
    checkedAll(data) {
      return data.goodCartStore.cartList.every(item => item.isChecked === 1)
    },
    // 计算全部金额
    totalPrice(data) {
      let total = 0;
      data.goodCartStore.cartList.forEach(item => {
        if (item.isChecked === 1) {
          total += item.price * item.count
        }
      })
      return total
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getGoodCartList()
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
  },
  onHide() {
    this.onSwipeCellPageTap()
  },
  // 修改购物车数量
  onChangeCount: debounce(async function (event: any) {
    const { detail, mark: { goodsId, index, oldCount } } = event;
    const count = detail - oldCount;
    await reqAddGoodCart({ goodsId, count });
    this.setData({
      [`goodCartStore.cartList[${index}].count`]: detail
    })
  }, 500),
  async toggleAll(event: any) {

    // 若是全选状态 则变全不选 反之全选 0 全不选 1全选
    if (this.data.checkedAll) {
      const result = await reqCheckedStatusGoodCart(0);
      if (result.code == 200) {
        this.data.goodCartStore.cartList.forEach((item, index) => {
          this.setData({
            [`goodCartStore.cartList[${index}].isChecked`]: 0
          })
        })
      }
    } else {
      const result = await reqCheckedStatusGoodCart(1);
      if (result.code == 200) {
        this.data.goodCartStore.cartList.forEach((item, index) => {
          // 注意使用setData来修改数据 那样才能被监视到
          this.setData({
            [`goodCartStore.cartList[${index}].isChecked`]: 1
          })
        })
      }
    }
  },
  // 获取购物车列表
  getGoodCartList() {
    // 登录了便请求购物车数据 方便后续渲染
    if (this.data.userStore.isLogin) {
      this.getCartList();
    }
  },
  // 更新购物车的选中状态
  async updateGoodCartStatus({ mark, detail }) {
    const result = await reqUpdateGoodCartStatus({ goodsId: mark.id, isChecked: detail ? 1 : 0 })
    // 再次网络请求来获取状态更新
    // this.getGoodCartList() 
    // 本地更新状态
    this.setData({
      [`goodCartStore.cartList[${mark.index}].isChecked`]: detail ? 1 : 0
    })
  },
  async deleteGood(event) {
    const { mark: { goodsId } } = event
    try {
      const confirmStatus = await modal({ title: "删除提醒", content: "确定要删除这个商品吗" })
      if (!confirmStatus) return
      await reqDeleteGood(goodsId);
      // 删除成功
      this.getGoodCartList()
      return
    } catch (error) {
      // 删除失败
      wx.showToast({
        title: '删除失败',
        icon: 'none',
        duration: 2000,
      })
    }
  },
  // 跳转到商品对应的详情界面
  goDetail({ mark }) {
    const { id } = mark;

    wx.navigateTo({
      url: `/modules/goodModule/pages/detail/detail?id=${id}`,
    })
  },
  goPayOrder() {
    // 如果价格为0，那就是没有选择订单，那么就不会提交订单 
    if (this.data.totalPrice == 0) {
      toast({ title: "没有选择商品", icon: "error" })
      return
    }
    wx.navigateTo({
      url: '/modules/payOrderModule/pages/payOrder/payOrder',
    })
  }


})