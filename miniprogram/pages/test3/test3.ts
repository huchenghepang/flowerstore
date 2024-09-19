import { ComponentWithComputed } from "miniprogram-computed";
ComponentWithComputed({

  // 页面的初始数据
  data: {
    numA: 1,
    numB: 2,
  },
  methods: {
    // 修改
    add() {
      this.setData({
        numA: this.data.numA + 1
      })
    }
  },
  // 计算属性
  computed: {
    sum(data) {
      console.log('计算属性读取了');
      return data.numA + data.numB
    }
  },
  // 监视属性的变化 
  watch: {
    "numA": function (newVal) {
      console.log('numA发生了变化', newVal);
    },
    "numB": function (newVal) {
      console.log('numB发生了变化', newVal);
    },
    "numA,numB": function (newValA, newValB) {
      console.log('numA或者numB发生了变化', newValA, newValB);
    }
  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {

  },

  // 生命周期函数--监听页面初次渲染完成
  onReady: function () {

  },

  // 生命周期函数--监听页面显示
  onShow: function () {

  },

  // 生命周期函数--监听页面隐藏
  onHide: function () {

  },

  // 生命周期函数--监听页面卸载
  onUnload: function () {

  },

  // 页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {

  },

  // 页面上拉触底事件的处理函数
  onReachBottom: function () {

  },

  // 用户点击右上角分享
  onShareAppMessage: function () {

  },

})