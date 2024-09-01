// components/cardlist/cardlist.ts
Component({

  /**
   * 组件的属性列表
   */
  options:{
    multipleSlots:true
  },
  properties: {
    title:{
      type:String,
      value:"标题"
    },
    isShowMore:{
      type:Boolean,
      value:true
    },
    isShowTitle:{
      type:Boolean,
      value:true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})