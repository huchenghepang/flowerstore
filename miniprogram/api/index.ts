// 首页的api
import instance from "../utils/request"

// 并发获取首页的数据
export const reqIndexData = () => {
    return instance.all([instance.get("/index/findBanner"),
    instance.get('/index/findCategory1'),
    instance.get('/index/advertisement'),
    instance.get('/index/findListGoods'),
    instance.get('/index/findRecommendGoods'),])
}

// 获取分类页面的数据

export const reqCategoryData = () => {
    return instance.get('/index/findCategoryTree')
}

// 请求登录
export const reqLogin = (code: string) => {
    return instance.get(`/weixin/wxLogin/${code}`)
}

// 获取用户信息
export const reqUserInfo = () => {
    return instance.get('/weixin/getuserInfo')
}

// 更新用户信息
export const reqUpdateUserInfo = (data: { nickname: string, headimgurl: string }) => {
    return instance.post('/weixin/updateUser', data)
}

// 新增收货地址
export const reqAddAddress = (data: {
    name: string, phone: string, provinceName: string, provinceCode: string, cityName: string, cityCode: string, districtName: string,
    districtCode: string, address: string, fullAddress: string, isDefault: number
}) => {
    return instance.post('/userAddress/save', data, { isShowLoading: false })
}
// 收货地址列表
export const reqAddressList = () => {
    return instance.get('/userAddress/findUserAddress')
}

// 收货地址详情
export const reqAddressDetail = (id: string) => {
    return instance.get(`/userAddress/${id}`)
}



// 更新收货地址
export const reqUpdateAddress = (data: {
    id: number, name: string, phone: string, provinceName: string, provinceCode: string, cityName: string, cityCode: string, districtName: string,
    districtCode: string, address: string, fullAddress: string, isDefault: number, createTime: string, updateTime: string, isDeleted: number, userId: string
}) => {
    return instance.post('/userAddress/update', data, { isShowLoading: false })
}

// 删除收货地址
export const reqDeleteAddress = (id: string) => {
    return instance.get(`/userAddress/delete/${id}`, {}, { isShowLoading: false })
}

