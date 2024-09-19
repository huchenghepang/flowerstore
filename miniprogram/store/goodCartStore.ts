// 管理购物数据的商店
import { action, observable } from "mobx-miniprogram"
import { reqGoodCartList } from "@/api/paycart";
export const goodCartStore = observable({
    // 购物车数据
    cartList: [],
    // 获取购物车数据
    getCartList: action(async function () {
        const result = await reqGoodCartList();
        this.cartList = result.data;
    }),
    // 加入购物车

    // 删除购物车中的某一项

    // 清空购物车

    // 获取购物车中的所有商品的数量
    get allCount() {
        let allCount = 0; // 商品总数
        // 如果购物为空 则直接返回不操作 默认为0
        if (this.cartList.length === 0) return 0
        // 遍历数组累加计算购物车总数
        this.cartList.forEach(item => {
            allCount += item.count;
        });
        return allCount > 99 ? 99 : allCount;
    }
})