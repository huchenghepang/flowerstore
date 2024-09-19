import { observable, action } from "mobx-miniprogram";
import { setStorageSync, getStorageSync } from "../utils/extends/storage"
export const userStore = observable({

    // 数据字段
    // 登录token
    token: getStorageSync("token") || "",
    // 用户信息
    userInfo: getStorageSync("userInfo") || {},
    //   actions方法
    login: action(function (token: string) {
        setStorageSync("token", token);
        this.token = token;
    }),
    setUserInfo: action(function (userInfo: object) {
        try {
            setStorageSync("userInfo", userInfo);
            this.userInfo = userInfo;
            return Promise.resolve(true)
        } catch (error) {
            return Promise.reject(false)
        }

    }),
    // 计算属性
    get isLogin() {
        return this.token !== "" ? true : false
    }
})