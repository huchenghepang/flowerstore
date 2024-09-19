import { toast } from "../../../../utils/extends/toast";
import { reqAddressList, reqDeleteAddress } from "../../../../api/index";
import { hiddenSwipeCellBehavior } from "../../../../behavior/swipecellhidden";


// 获取全局共享数据
const app = getApp();

Page({
  behaviors: [hiddenSwipeCellBehavior],
  // 页面的初始数据
  data: {
    addressList: [],
    frag: 0,// 如果frag变成1了 那么代表将是订单页面跳转过来的


  },
  onLoad(detail) {
    if (detail.frag == 1) {
      this.setData({
        frag: 1
      })
    }
    this.getAddressList();
  },
  // 获取地址列表数据 
  async getAddressList() {
    const { data: addressList } = await reqAddressList();
    this.setData({
      addressList
    })

  },
  // 去更新的页面
  goAddAddressPage(event: any) {
    const { id } = event.mark;
    if (id) {
      wx.navigateTo({
        url: `/modules/addressModule/pages/addaddress/addaddress?id=${id}`
      })
    }

  },
  //删除当前滑块地址
  async deleteAddress(event: any) {
    const { code } = await reqDeleteAddress(event.mark.id);
    if (code === 200) {
      this.getAddressList();
      toast({ title: "删除成功", icon: "success" })
    }
  },
  changeAddress({ mark: { id } }) {
    // 订单页面跳转 则选择地址并跳转回原来的订单页面
    if (this.data.frag == 1) {
      // 根据选择的ID来判断选择的地址
      const address = this.data.addressList.find(item => {
        return item.id === id
      })
      // 将全局地址设置为选择的地址
      app.globalData.address = address;
      wx.navigateBack({
        delta: 1
      })
    } else {
      return
    }
  }

})