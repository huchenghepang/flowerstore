// 商品管理模块的接口
import instance from "../utils/request"

// 获取商品的列表 page:表示页码 limit表示一页多少条数据 rest参数有两个 category1Id category2Id 可选
export const reqGoodList = ({ page, limit, ...rest }) => {
    return instance.get(`/goods/list/${page}/${limit}`, {}, rest)
}

// 获取商品的详情
export const reqGoodDetail = (goodsId: number) => {
    return instance.get(`/goods/${goodsId}`)
}