// pages/test/test.ts

import instance from "../../utils/request"

// 导入store 
import {countBehaviors} from "./behavior"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '/assets/images/avatar.png',
  },

  // 导入旧方式的Behavior
  behaviors: [countBehaviors],


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
   onShareAppMessage() {
   
  },

  async uploadAvator(event) {
    const {avatarUrl} = event.detail
    console.log(event);
    
    console.log(avatarUrl);
    try {
      const res = await instance.uploadFile("/fileUpload",event.detail.avatarUrl,"file")
    } catch (error) {
      console.log(error);
      
    }
   
    this.setData({
      avatarUrl: avatarUrl
    })
  }
})