import instance from "../utils/request"
// 订单支付的接口

// 订单详情
export const reqOrderDetail = () => {
    return instance.get("/order/trade", { isShowLoading: true })
}

// 订单地址
export const reqOrderAddress = () => {
    return instance.get("/userAddress/getOrderAddress", { isShowLoading: true })
}

// 立即购买
export const reqAddGoodOrder = ({ goodsId, blessing }) => {
    return instance.get(`/order/buy/${goodsId}`, { blessing }, { isShowLoading: true })
}

interface Order {
    "buyName": "string",
    "buyPhone": "string",
    "cartList": [
        {
            "blessing": "string",
            "count": 0,
            "createTime": "string",
            "goodsId": 0,
            "imageUrl": "string",
            "isChecked": 0,
            "name": "string",
            "price": 0,
            "updateTime": "string"
        }
    ],
    "deliveryDate": "string",
    "remarks": "string",
    "userAddressId": 0
}

// 提交订单
export const reqOrder = (data: Order) => {
    return instance.post("/order/submitOrder", data, { isShowLoading: true })
}

// 微信预支付信息
export const reqPrePayInfo = (orderNo) => {
    return instance.get(`/webChat/createJsapi/${orderNo}`, {}, { isShowLoading: true })
}

// 微信支付状态查询
export const reqPayStatus = (orderNo) => {
    return instance.get(`/webChat/queryPayStatus/${orderNo}`, {}, { isShowLoading: true })
}

// 获取订单列表
export const reqOrderList = ({ page, limit }) => {
    return instance.get(`/order/order/${page}/${limit}`, {}, { isShowLoading: true })
}
