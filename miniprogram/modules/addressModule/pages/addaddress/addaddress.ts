// modules/addressModule/pages/addaddress/addaddress.js

import { modal } from "../../../../utils/extends/showModal";
import { toast } from "../../../../utils/extends/toast";
// 引入SDK核心类
import QQMapWX from '../../../../libs/qqmap-wx-jssdk.min.js'
// 导入表单验证
import Schema from "../../../../miniprogram_npm/async-validator/dist-node/index";
// 引入请求接口
import { reqAddAddress, reqAddressDetail, reqUpdateAddress } from "../../../../api/index";
Page({

  // 页面的初始数据
  data: {
    checked: true,
    "name": "",    // 收货人
    "phone": "",    // 手机号码
    "provinceName": "",    // 省
    "provinceCode": "",    // 省编码
    "cityName": "",    // 市
    "cityCode": "",    // 市编码
    "districtName": "",    // 区
    "districtCode": "",    // 市编码
    "address": "",    // 详细地址
    "fullAddress": "",    // 完整地址
    "isDefault": 1,  // 是否默认地址
    "simpleAddress": "",
    "pageTitle": "新增收货地址"
  },

  // 生命周期函数--监听页面加载,
  onLoad: function () {
    this.qqMapSdk = new QQMapWX({
      key: "2ZSBZ-VLWEH-ALSDT-WR3BU-A3PJF-H7BOU"
    });
    // 处理新增还是更新页面
    this.handleEditOrAdd();
  },

  onChangeDefault({ detail }) {
    this.setData({
      checked: detail,
      isDefault: detail ? 1 : 0
    })

  },
  // 选择地区后的事件
  bindRegionChange(event) {
    this.setData({
      provinceName: event.detail.value[0],
      provinceCode: event.detail.code[0],
      cityName: event.detail.value[1],
      cityCode: event.detail.code[1],
      districtName: event.detail.value[2],
      districtCode: event.detail.code[2],
    })
    if (this.data.provinceName == this.data.cityName) {
      this.setData({
        simpleAddress: this.data.cityName + this.data.districtName
      })
    } else {
      this.setData({
        simpleAddress: this.data.provinceName + this.data.cityName + this.data.districtName
      })
    }
  },
  // 保存收集地址的表单
  async saveAddressform() {
    const { provinceName, cityName, districtName, address } = this.data;

    this.setData({
      fullAddress: provinceName + cityName + districtName + address
    })
    const { simpleAddress, ...addressData } = this.data;
    console.log(addressData);
    const { valid } = await this.validateAddressInfo(addressData);
    // 如果验证通过则发送请求新增地址
    if (!valid) return
    const result = !!this.data.isEdit ? (await reqUpdateAddress(this.data)) : (await reqAddAddress(addressData))
    if (result.code == 200) {

      (!!this.data.isEdit) ? toast({ title: "更新地址成功" }) : toast({ title: '新增地址成功' });
      // 更新前一个页面的数据
      try {
        // 获取上一个页面的实例对象
        const pages = getCurrentPages();
        const prevPage = pages[pages.length - 2];
        // 调用上一个页面的方法
        prevPage.getAddressList();
        wx.navigateBack()
      } catch (error) {
        console.log(error);

      }
    }
  },

  // 根据授权情况获取位置获取位置信息 
  async getLocalAddress() {
    let settingInfo = {};
    try {
      settingInfo = await wx.getSetting();
    } catch (error) {
      toast({ title: '获取设置失败' })
    }

    // 判断是否授权
    let isAuthLocation = (settingInfo as any).authSetting['scope.userLocation'];

    if (!isAuthLocation) {
      // 如果没有授权，则弹出授权提示框
      const modalRes = await modal({ title: "授权提醒", content: "您还未授权获取位置信息，是否去授权？" });

      if (!modalRes) {
        toast({ title: '您取消了授权', icon: 'none' })
      } else {
        // 如果是第一次权限获取则提醒获取位置权限
        if (isAuthLocation === undefined) {
          try {
            const res = await wx.getLocation();
            return
          } catch (error) {
            return toast({ title: '获取位置失败', icon: 'none' })
          }
        }
        // 如果用户点击了确定，则跳转到设置页面，引导用户授权
        const { authSetting } = await wx.openSetting();
        // 如果没有更新完成授权则提醒失败
        if (!authSetting['scope.userLocation']) {
          return toast({ title: '未完成授权', icon: 'none' })
        } else {
          // 通过设置更新位置信息权限
          try {
            const res = await wx.getLocation();
            console.log('第二次');
            console.log(res);
            return
          } catch (error) {
            return toast({ title: '获取位置失败', icon: 'none' })
          }
        }

      }
    } else {
      // 如果已经授权，则直接获取位置信息
      try {
        const res = await wx.getLocation();
        console.log('第三次');
        console.log(res);
        return
      } catch (error) {
        return toast({ title: '获取位置失败', icon: 'none' })
      }
    }
  },
  // 根据位置信息解析出地址
  async getAddressByLocation(location) {
    const { latitude, longitude, name, address } = location;
    // 使用腾讯地图服务SDK的reverseGeocoder方法根据经纬度解析出详细的地址
    this.qqMapSdk.reverseGeocoder({
      location: {
        latitude,
        longitude
      },
      success: (res: any) => {
        console.log(res);
        const { result: { address_component: { street_number }, ad_info: { adcode, province, city, city_code, district, nation_code } } } = res;
        console.log(street_number, adcode, province, city, city_code, district, nation_code);
        this.setData({
          provinceName: province,
          provinceCode: adcode.replace(adcode.substring(2, 6), "0000"),
          cityName: city,
          cityCode: city_code.slice(nation_code.length),
          districtName: district,
          districtCode: district && adcode, // 匹配最后一个真值
          address: [name, street_number].join(""),
          simpleAddress: province + city + district,
        })
        console.log(this.data);


      },
      fail: (res: any) => {
        toast({ title: '获取地址失败', icon: 'none' })
      }
    })
  },
  // 手动选择位置
  async chooseLocation() {
    try {
      const locationInfo = await wx.chooseLocation();
      await this.getAddressByLocation(locationInfo);

    } catch (error) {
      if (error.errMsg === "chooseLocation:fail auth deny") {
        toast({ title: '获取位置失败', icon: 'none' })
      }

    }
  },
  // 验证表单地址信息
  validateAddressInfo(data: {}) {
    // 配置表单验证的规则
    // 验证收货人，是否只包含大小写字母、数字和中文字符
    const nameRegExp = '^[a-zA-Z\\d\\u4e00-\\u9fa5]+$'

    // 验证手机号
    const phoneReg = '^1(?:3\\d|4[4-9]|5[0-35-9]|6[67]|7[0-8]|8\\d|9\\d)\\d{8}$'

    // 每一项是一个验证规则，验证规则属性需要和验证的数据进行同名
    const rules = {
      name: [
        { required: true, message: '请输入收货人姓名' },
        { pattern: nameRegExp, message: '收货人姓名不合法' }
      ],
      phone: [
        { required: true, message: '请输入收货人手机号' },
        { pattern: phoneReg, message: '手机号不合法' }
      ],
      provinceName: { required: true, message: '请选择收货人所在地区' },
      address: { required: true, message: '请输入详细地址' }
    }

    // 创建实例
    const validator = new Schema(rules);
    return new Promise((resolve, reject) => {
      // 调用验证方法
      validator.validate(data, (errors: any) => {
        if (errors) {
          // 如果验证失败，则返回错误信息
          toast({ title: errors[0].message, icon: 'none' })
          resolve({ valid: false })
        } else {
          // 如果验证成功，则返回成功信息
          resolve({ valid: true })
        }
      })
    })
  },
  // 处理是更新页面还是新增页面
  handleEditOrAdd() {
    // 获取当前页面的路由对象
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    // 获取路由参数


    const options = currentPage.options;

    // 判断是否有id参数
    if (options.id) {
      // 如果有id参数，则是更新页面
      this.getAddressInfoById(options.id);
      this.setData({
        isEdit: true,
        pageTitle: "更新收货地址"
      });
    } else {
      // 如果没有id参数，则是新增页面
      this.setData({
        isEdit: false,
      })
    }
  },
  // 获取更新收货地址的数据
  async getAddressInfoById(id: string) {
    const { data } = await reqAddressDetail(id)
    this.setData(data);
    this.setData({
      "simpleAddress": data.provinceName !== data.cityName ? (data.provinceName + data.cityName + data.districtName) : (data.cityName + data.districtName)
    })
  }
})