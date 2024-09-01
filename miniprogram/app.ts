// app.ts
// APP 函数 注册小程序 注册小程序。接受一个 Object 参数，其指定小程序的生命周期回调等。 

import { modal } from "./utils/extends/ShowModal.ts"
import { toast } from "./utils/extends/Toast.ts"

App<IAppOption>({
  // 定义的是全局的数据
  globalData: {},
  // 监听小程序的初始
  onLaunch(option) {
    toast()
    modal()

  },
  //小程序展示页面
  onShow(){

  },
  // 监听小程序切换后台 即从当前小程序切换出去了 可能是去别的应用 切换出去了微信
  onHide(){
   
  },
  // 监听错误
  onError(){


  },
  // 小程序没有找到
  onPageNotFound(){
  },
  // 没有处理的异步任务错误 全局进行处理
  onUnhandledRejection(msg){
   
  },
  onThemeChange(){
  
    
  },
  // 其他全局绑定的函数 自定义函数 可以通过全局访问到
  sayHello(){
  },
})