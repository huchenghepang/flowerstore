// 管理购物车模块的接口
import instance from "../utils/request"

// 加入购物车接口
export const reqAddGoodCart = ({ goodsId, count, blessing }) => {
    return instance.get(`/cart/addToCart/${goodsId}/${count}`, { blessing }, { isShowLoading: false })
}

// 购物车列表

export const reqGoodCartList = () => {
    return instance.get('/cart/getCartList', {}, { isShowLoading: false })
}

// 更新商品状态
export const reqUpdateGoodCartStatus = ({ goodsId, isChecked }) => {
    return instance.get(`/cart/checkCart/${goodsId}/${isChecked}`, {}, { isShowLoading: false })
}

// 全选或者全不选

export const reqCheckedStatusGoodCart = (isChecked) => {
    return instance.get(`/cart/checkAllCart/${isChecked}`, {}, { isShowLoading: false })
}

// 删除商品
export const reqDeleteGood = (goodsId) => {
    return instance.get(`/cart/delete/${goodsId}`)
}