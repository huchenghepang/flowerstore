// pages/login/login.ts
import { toast } from "@/utils/extends/toast"
import { reqLogin, reqUserInfo } from "../../api/index";
import { userStore } from "../../store/userStore";
import { ComponentWithStore } from "mobx-miniprogram-bindings";
import { getCurrentPageParam } from "@/utils/pageInfo";
const { debounce } = require('@/utils/debounce');
ComponentWithStore({
  // 方法设置 没有用组件就不用写methods方法
  methods: {
    // 初始登录
    loginServe: debounce(function () {
      wx.login({
        success: async (res) => {
          if (res.code) {
            const result = await reqLogin(res.code);
            userStore.login(result.data.token);
            // 在登录成功后获取用户信息
            this.getUserInfo();
            // 跳转到我的界面 或者之前的界面
            const { redirect } = getCurrentPageParam()
            if (redirect) {
              wx.navigateBack()
              return;
            }
            wx.switchTab({ url: "/pages/myinfo/myinfo" })
          } else {
            toast({ title: "登录失败", icon: "error" })
          }
        }
      })
    }, 500),
    // 获取用户信息
    async getUserInfo() {
      let { data } = await reqUserInfo();
      userStore.setUserInfo(data);

    }
  },

  /**
   * 页面的初始数据
   */
  data: {
  },


})