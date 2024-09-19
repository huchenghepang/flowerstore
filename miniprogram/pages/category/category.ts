
import {reqCategoryData} from '@/api/index'
// pages/category/category.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryDataList:[

    ],
    activeIndex:0,
    category2DataList:[],
    category1Id:null,
    isLoading:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getCategoryData();
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
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1,
      })
    }
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

  // 获取分类页面的数据
  async getCategoryData(){
    try {
      const result = await reqCategoryData()
      this.setData({
        categoryDataList: result.data,
        category2DataList:result.data[0].children,
        category1Id:result.data[0].id,
        isLoading:false
      })
      console.log(this.data.categoryDataList);
      console.log(this.data.category2DataList);
      
      
    } catch (error) {
      console.log(error);
      
    }
  },

  // 处理切换分类
  onChangeCategoryItem(event:any){
    // 重新设置激活的样式
    this.setData({
      activeIndex:event.mark.index,
      category2DataList:this.data.categoryDataList[event.mark.index].children,
      category1Id:this.data.categoryDataList[event.mark.index].id
    })
    
  } 
})