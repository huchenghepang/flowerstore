// components/bottom-custom-place/bottom-custom-place.ts
const systemInfo = require("@/utils/systeminfo");
const safeBattomAreaHeight =systemInfo.getSafeBattomAreaHeight()

Component({

  /**
   * 组件的属性列表
   */
  properties: {
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    safeBattomAreaHeight
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})