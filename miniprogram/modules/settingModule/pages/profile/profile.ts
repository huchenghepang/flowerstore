// pages/profile/profile.js

import { userStoreBehavior } from '@/behavior/behavior'
import { toast } from "@/utils/extends/toast"
import { reqUpdateUserInfo } from "../../../../api/index"
Page({
  // 页面的初始数据
  data: {
    isShowUpdateNickname: false,
    nickname: ""
  },
  behaviors: [userStoreBehavior],

  // 生命周期函数--监听页面加载
  onLoad: function (options) { },

  // 生命周期函数--监听页面初次渲染完成
  onReady: function () { },

  // 生命周期函数--监听页面显示
  onShow: function () { },

  // 生命周期函数--监听页面隐藏
  onHide: function () { },

  // 生命周期函数--监听页面卸载
  onUnload: function () { },

  // 页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () { },

  // 页面上拉触底事件的处理函数
  onReachBottom: function () { },

  // 用户点击右上角分享
  onShareAppMessage: function () { },
  changeAvator(event) {
    // 获取临时的图片路径
    const avatarUrl = event.detail.avatarUrl
    console.log(avatarUrl);
    console.log(this.data);

    this.setData({
      'userStore.userInfo.headimgurl': avatarUrl
    })
    // 上传图片到云存储
    wx.showLoading({ title: "头像上传中" })
    wx.uploadFile({
      url: "https://gmall-prod.atguigu.cn/mall-api/fileUpload",
      filePath: avatarUrl,
      name: "file",
      header: {
        token: wx.getStorageSync("token")
      },
      success: (res) => {
        const resAvatorUrl = JSON.parse(res.data).data
        toast({ title: "修改头像成功", icon: "success" })
        console.log(resAvatorUrl);

        this.setData({
          'userStore.userInfo.headimgurl': resAvatorUrl
        })
      },
      fail: (err) => {
        toast({ title: "头像上传失败", icon: "error" })
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  },
  updateNickName({ detail }) {
    const { nickName } = detail;
    console.log(nickName);

    this.setData({
      isShowUpdateNickname: true,
    })
  },
  // 确认修改昵称
  confirmUpdateNickname() {

    this.setData({
      'userStore.userInfo.nickname': this.data.nickname,
      isShowUpdateNickname: false
    })

  },
  // 取消修改昵称
  cancelUpdateNickname() {
    this.setData({
      isShowUpdateNickname: false
    })
  },
  // 设置input的新nickname
  setNewNickname({ detail }) {
    const { value } = detail;
    this.setData({
      'nickname': value
    })
  },
  async confirmUserInfo(event) {
    try {
      // 获取用户信息
      const userInfo = this.data.userStore.userInfo;
      // 发送请求
      await reqUpdateUserInfo(userInfo);
      // 更新本地存储
      (this as any).setUserInfo(userInfo).then(() => {
        toast({ title: "更新信息成功", icon: "success" })
      });


    } catch (error) {
      toast({ title: "更新信息失败", icon: "error" })
    }

  }
})
