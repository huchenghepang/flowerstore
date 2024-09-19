import { toast } from "@/utils/extends/toast";
import { reqGoodDetail } from "../../../../api/good"

import { userStoreBehavior } from "@/behavior/behavior"
import { getCurrentPageUrl } from "@/utils/pageInfo";
import { reqAddGoodCart } from "@/api/paycart";
const computedBehavior = require('miniprogram-computed').behavior
Page({
  behaviors: [userStoreBehavior, computedBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    isShowBack: true,
    isShowIndex: false,
    show: false,
    count: 1,
    goodInfo: {},
    buyStatus: 0, // 购物的状态 0代表购物车 1代表立即购买
    blessing: ""
  },
  watch: {
    'userStore.isLogin': function (newValue) {
      if (newValue) {
        this.getCartList();
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { id, share } = options;
    if (share) {
      this.setData({
        isShowBack: false,
        isShowIndex: true
      })
    }
    this.getGoodDetail(id);
    // 获取购物车数据

    // 登录了才获取购物车数据
    if (this.data.userStore.isLogin) {
      this.getCartList();
    }
  },
  onShow() {

  },
  onShareAppMessage() {
    return {
      title: "同城鲜花送：" + this.data.goodInfo.name,
      path: "/modules/goodModule/pages/detail/detail?id=" + this.data.goodInfo.id + "&share=1",
      imageUrl: this.data.goodInfo.imageUrl
    }
  },

  async getGoodDetail(goodsId: any) {
    const { data: goodInfo } = await reqGoodDetail(goodsId);
    this.setData({
      goodInfo: goodInfo
    });
  },

  backToIndex() {
    wx.switchTab({
      url: "/pages/index/index"
    });
  },
  goCart() {
    wx.switchTab({
      url: "/pages/paycart/paycart"
    }
    )
  },

  showCart({ mark }) {
    const result = this.handleLogin();
    // 没有登录直接返回 不执行后续任务
    if (!result) return;

    this.setData({
      show: true,
      buyStatus: mark.status // 购买状态
    })
  },
  onClose() {
    this.setData({
      show: false,
      count: 1,
      buyStatus: 0, // 购物的状态 0代表购物车 1代表立即购买
      blessing: ""
    });
  },
  onChange(event: any) {
    // vant步进器改变后的
    this.setData({
      count: event.detail
    })
  },
  // 点击大图能够预览
  previewImage(event: any) {
    const { dataset: url } = event.target;
    wx.previewImage({
      current: url.url, // 当前图片的链接
      urls: this.data.goodInfo.detailList
    })
  },
  // 关联用户是否登录 只有用户登录了才能进行添加操作 没有登录则跳转登录
  handleLogin() {
    if (!this.data.userStore.isLogin) {
      // 提醒没有登录
      toast({
        title: "未登录", icon: "error", duration: 1500, success: () => {
          setTimeout(() => {
            const url = getCurrentPageUrl();
            // 跳转到登录页面
            wx.navigateTo({
              url: "/pages/login/login?redirect=" + url
            });
          }, 1500)
        }
      });

      return false;
    } else {
      return true;
    }
  },
  // 提交购物按钮 购物车或者直接购买
  async commitAddCart() {
    const { count, blessing } = this.data;
    const goodsId = this.data.goodInfo.id;
    if (this.data.buyStatus == 0) {
      // 加入购物车
      const result = await reqAddGoodCart({ count, goodsId, blessing });
      if (result.code === 200) {

        this.getCartList(); // 重新计算购物车数量
        toast({ title: "加入购物车成功", icon: "success" })
      }
    } else {
      // 直接购买
      wx.navigateTo({
        url: `/modules/payOrderModule/pages/payOrder/payOrder?goodsId=${goodsId}&blessing=${blessing}`
      })
    }
    this.onClose(); // 关闭购物车窗口
  },
  /*   // 计算购物车的购买数量
    async calculateAllCount() {
      let allCount = 0;
      const result = await reqGoodCartList();
      // 如果购物为空 则直接返回不操作 默认为0
      if (result.data.length === 0) return
      // 遍历数组累加计算购物车总数
      result.data.forEach(item => {
        allCount += item.count
      });
      this.setData({
        allCount: allCount > 99 ? 99 : allCount
      });
    } */
}) 