import { reqOrderAddress, reqOrderDetail, reqAddGoodOrder, reqPrePayInfo, reqOrder, reqPayStatus } from "@/api/payorder";
import { formatTime } from "@/utils/formtartime";
import Schema from "../../../../miniprogram_npm/async-validator/dist-node/index";
import { toast } from "@/utils/extends/toast";
import { modal } from "@/utils/extends/showModal";
// import { goodCartStore } from "../../../../store/goodCartStore";

// 获取全局数据
const app = getApp()

// modules/payModule/payOder/payOder.js
Page({

  // 页面的初始数据
  data: {
    "orderInfo": {},// 商品订单详情
    "addressInfo": {},
    "isShowCalendar": false,
    "deliveryDate": "",// 订单需要送达的时间
    "buyName": "",
    "buyPhone": "",
    "remarks": "", // 祝福语
  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    this.setData({
      ...options
    })
    console.log(options);

  },
  // 生命周期函数--监听页面显示
  onShow: function () {
    this.getAddress();
    this.getOrderInfo()

  },
  onUnload() {
    app.globalData.address = {} // 关闭页面后清空全局收货地址
  },
  // 获取收货地址
  async getAddress() {
    if (app.globalData.address.id) {
      // 如果存在全局定义的地址使用全局地址 而不再请求
      this.setData({
        addressInfo: app.globalData.address
      });
      // 全局收货地址需要置空
      app.globalData.address = {}
      return
    }
    const result = await reqOrderAddress()
    // 保存收货地址
    this.setData({
      addressInfo: result.data
    })

  },
  // 获取订单的详情
  async getOrderInfo() {
    const { goodsId, blessing } = this.data
    const res = goodsId ? (await reqAddGoodOrder({ goodsId, blessing })) : (await reqOrderDetail());
    this.setData({
      orderInfo: res.data,
      remarks: res.data.cartVoList[0].blessing
    });
  },
  showCalendar() {
    console.log('aaa');

    this.setData({
      isShowCalendar: true
    })
  },
  onConfirmDate(event) {
    const time = formatTime(event.detail)
    this.setData({
      isShowCalendar: false,
      deliveryDate: time.split(" ")[0]
    })
    console.log(typeof time);

  },
  onClose() {
    this.setData({
      isShowCalendar: false
    })
  },
  async submitOrder() {
    const { buyName, buyPhone, deliveryDate, remarks } = this.data
    const params = {
      buyName,
      buyPhone,
      cartList: this.data.orderInfo.cartVoList,
      deliveryDate,
      remarks,
      userAddressId: this.data.addressInfo.id
    }
    const { valid } = await this.validatorInfo(params);

    if (!valid) return
    // 验证成功提交订单
    const result = await reqOrder(params)
    if (result.code === 200) {
      // 记录下单号
      this.orderNo = result.data;
      await this.payOrder()
    }

  },
  async validatorInfo(params) {
    // 验证收货人，是否只包含大小写字母、数字和中文字符
    const nameRegExp = '^[a-zA-Z\\d\\u4e00-\\u9fa5]+$'

    // 验证手机号，是否符合中国大陆手机号码的格式
    const phoneReg = '^1(?:3\\d|4[4-9]|5[0-35-9]|6[67]|7[0-8]|8\\d|9\\d)\\d{8}$'
    const rules = {
      userAddressId: [{ required: true, message: "请输入地址" }],
      buyName: [{ required: true, message: '请输入姓名' }, { pattern: nameRegExp, message: '收货人姓名不合法' }],
      buyPhone: [{ required: true, message: '请输入您的手机号' }, { pattern: phoneReg, message: '号码格式不正确' }],
      deliveryDate: [{ required: true, message: '请选择送货日期' }],
    }
    // 传入验证规则 实例化
    const validator = new Schema(rules)
    return new Promise((resolve) => {
      validator.validate(params, (errors) => {
        if (errors) {
          toast({ title: errors[0].message, icon: "error" })
          resolve({ valid: false })
        } else {
          resolve({ valid: true })
        }
      })
    })
  },
  // 根据订单编号发起预支付请求
  async payOrder() {
    const { orderNo } = this
    if (!orderNo) return
    const { code, data } = await reqPrePayInfo(orderNo)
    if (code === 200) {
      const { prepayId } = data;
      const payParams = {
        timeStamp: data.timeStamp,
        nonceStr: data.nonceStr,
        package: data.package,
        signType: data.signType,
        paySign: data.paySign,
      }
      // 发起微信支付
      await this.wxPay(payParams)
    }
  },
  async wxPay(payParams) {
    try {
      const res = await wx.requestPayment({
        ...payParams,
        success(res) {
          this.getPayStatus()
        },
        fail: async (res) => {
          console.log(res);

          console.log('失败');

          if (res.errMsg.startsWith("requestPayment:fail no permission") || res.errMsg.startsWith("requestPayment:fail jsapi has no permission")) {
            const result = await modal({ title: "支付提醒", content: "由于没有认证商业开发者支付权限，所以只能模拟支付，确认表示开始模拟支付，会成功跳转" })
            if (result) {
              wx.redirectTo({
                url: "/modules/payOrderModule/pages/order/order",
                success: (res) => {
                  toast({ title: "支付成功", icon: "success" })
                }
              })
              return
            }
          }

          toast({ title: '支付失败', icon: "error" })
        }
      })
    } catch (error) {
      console.log(error);
    }
  },
  // 获取支付状态
  async getPayStatus() {
    try {
      if (this.orderNo) {
        const result = await reqPayStatus(this.orderNo);
        if (result.code == 200) {

          // 跳转到支付状态页面
          wx.redirectTo({
            url: "/modules/payOrderModule/pages/order/order",
            success: (res) => {
              // 清空购物车
              // goodCartStore.cartList = [];  这里是无效的 因为事实上订单就没有成功 所以清除不了
              toast({ title: "支付成功", icon: "success" })
              toast({ title: "支付成功", icon: "success" })
            }
          })
        }
      }
    } catch (error) {
      console.log('失败');

      // 支付失败
      toast({ title: "支付失败", icon: "error" })

    }



  }
})