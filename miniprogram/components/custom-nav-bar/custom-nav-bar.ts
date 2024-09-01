// components/custom-nav-bar.ts
const systeminfo = require("@/utils/systeminfo")
console.log(systeminfo.getStatusInfo());


Component({
  // 扩展样式
  externalClasses: ['extend-class'],
  options: {
    styleIsolation: 'apply-shared'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: "首页"
    },
    isShowBack: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusInfo: systeminfo.getStatusInfo()
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})