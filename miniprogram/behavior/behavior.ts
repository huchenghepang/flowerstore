import { userStore } from "../store/userStore";
import { goodCartStore } from '../store/goodCartStore'
import { BehaviorWithStore } from "mobx-miniprogram-bindings";

export const userStoreBehavior = BehaviorWithStore({
    storeBindings: [
        {
            store: userStore,
            namespace: "userStore",
            fields: { 'userInfo': () => userStore.userInfo, "isLogin": () => userStore.isLogin },
            // fields: ['userInfo', "isLogin"],
            actions: ["setUserInfo"]
        },
        {
            store: goodCartStore,
            namespace: 'goodCartStore',
            fields: ['cartList', 'allCount'],
            actions: ['getCartList']
        }
    ]
})