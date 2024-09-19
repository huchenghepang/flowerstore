// 必需新建实例


// 导入API 
import { reqIndexData } from '@/api/index';
import { userStoreBehavior } from "@/behavior/behavior";
import Toast from '@vant/weapp/toast/toast';

Page({
  behaviors: [userStoreBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    postImage: "",
    // 轮播图
    carouselList: [],
    // 首页分类数据
    categoryList: [],
    // 首页广告数据
    advertiseList: [],
    // 首页商品数据
    goodsList: [],
    // 首页推荐数据
    recommendList: [],
    // 是否在请求初始数据
    loading: true,
    // 小程序分享配置
    posterConfig: {
      showSavePopup: false,// 是否展示保存海报的弹窗
      width: 768,// 画布宽度
      height: 1200,// 画布高度
      backgroundColor: "#fdcf61", // 画布颜色
      debug: false,// 控制显示或者隐藏画布
      pixelRatio: 1,//控制清晰度 相对像素
      preLoad: true,//图片资源预下载
      "hide-loading": true,
      blocks: [
        {
          x: -100,
          y: -50,
          width: 300,// 内部有文字 那么块的宽度由文字宽度和内边距决定 // 非必填
          height: 200,// 必填
          paddingLeft: 10,// 内左边距
          paddingRight: 10,// 内右边距
          // borderWidth: 200,//边框宽度
          borderColor: "yellow",//边框颜色
          borderRadius: 100,//圆角
          backgroundColor: "#ffdf8c",
          zIndex: 0
        },
        {
          x: 568,
          y: -50,
          width: 300,// 内部有文字 那么块的宽度由文字宽度和内边距决定 // 非必填
          height: 200,// 必填
          paddingLeft: 10,// 内左边距
          paddingRight: 10,// 内右边距
          // borderWidth: 200,//边框宽度
          borderColor: "yellow",//边框颜色
          borderRadius: 100,//圆角
          zindex: 0, // 层级 越大越高
          backgroundColor: "#ffdf8c"
        },
        {
          x: 0,
          y: 200,
          height: 60,// 必填
          width: 768,
          paddingLeft: 10,// 内左边距
          paddingRight: 10,// 内右边距
          // borderWidth: 200,//边框宽度
          borderColor: "red",//边框颜色
          borderRadius: 100,//圆角
          zindex: 0, // 层级 越大越高
          backgroundColor: "#c99329",
        },
        {
          x: 34,
          y: 220,
          height: 30,// 必填
          width: 700,
          paddingLeft: 10,// 内左边距
          paddingRight: 10,// 内右边距
          // borderWidth: 200,//边框宽度
          borderColor: "red",//边框颜色
          borderRadius: 100,//圆角
          backgroundColor: "#905614",
          zIndex: 5

        },
        {
          x: 84,
          y: 221,
          height: 600,// 必填
          width: 600,
          paddingLeft: 10,// 内左边距
          paddingRight: 10,// 内右边距
          backgroundColor: "#fff2dd",
          zIndex: 5

        },
        {
          x: 84,
          y: 823,
          height: 250,// 必填
          width: 600,
          paddingLeft: 10,// 内左边距
          paddingRight: 10,// 内右边距
          backgroundColor: "#fff2dd",
          zIndex: 5
        },

      ],

      texts: [
        {
          // 块里面填充颜色
          x: 340,
          y: 50,
          fontSize: 30,
          text: "您的护花使者:【小花朵】",
          color: "#75520c",// 文字颜色
          opacity: 1,// 透明度
          lineHeight: 40,// 行高
          lineNum: 2,//根据宽度换行 
          // width: 100,// 没有指定即为画布宽度
          // marginLeft: 3,//控制多行位置的间隔
          // marginRight: 3,
          baseLine: "right",
          textAlign: "center",
          zIndex: 3,
          fontFamily: "STSong",
          fontWeight: "blod",
          fontStyle: "italic",
        },
        {
          // 块里面填充颜色
          x: 400,
          y: 80,
          fontSize: 20,
          text: "发现了一个宝藏小程序邀请您一起来赏花",
          color: "#9e7326",// 文字颜色
          opacity: 1,// 透明度
          lineHeight: 40,// 行高
          lineNum: 2,//根据宽度换行 
          // width: 100,// 没有指定即为画布宽度
          // marginLeft: 3,//控制多行位置的间隔
          // marginRight: 3,
          baseLine: "middle",
          textAlign: "center",
          zIndex: 3,
          fontStyle: "italic",
        },
        {
          x: 240,
          y: 880,
          fontSize: 30,
          text: "扫码来看看吧，亲~~~",
          color: "#9e7326",// 文字颜色
          opacity: 1,// 透明度
          lineHeight: 40,// 行高
          lineNum: 2,//根据宽度换行 
          // width: 100,// 没有指定即为画布宽度
          // marginLeft: 3,//控制多行位置的间隔
          // marginRight: 3,
          baseLine: "middle",
          textAlign: "center",
          zIndex: 999,
          fontStyle: "italic",
        },
      ],
      lines: [
        {
          startX: 0,
          startY: 200,
          endX: 384,
          endY: 100,
          width: 2,
          color: "red",
          zIndex: 2 // 层级 越大越高
        },
        {
          startX: 768,
          startY: 200,
          endX: 384,
          endY: 100,
          width: 2,
          color: "red",
          zIndex: 2 // 层级 越大越高
        },
        {
          startX: 84,
          startY: 821,
          endX: 368,
          endY: 821,
          width: 2,
          color: "gray",
          zIndex: 7 // 层级 越大越高
        },
        {
          startX: 400,
          startY: 821,
          endX: 684,
          endY: 821,
          width: 2,
          color: "gray",
          zIndex: 7 // 层级 越大越高
        }
      ],
      images: [
        {
          x: 100,
          y: 50,
          url: "http://139.198.127.41:9000/sph/20240917/tmp_1f0a1949df3efc70dba9b223676bdb97.jpg",
          width: 100,
          height: 100,
          borderRadius: 100,
          borderWidth: 10,
          borderColor: "#fafafa",
          zIndex: 4 // 层级 越大越高
        },
        // http://139.198.127.41:9000/sph/20240917/DuolKXk3BTY5e931e05c3e0b795cc14a5e7419134255.jpg
        {
          x: 450,
          y: 830,
          url: "http://139.198.127.41:9000/sph/20240917/DuolKXk3BTY5e931e05c3e0b795cc14a5e7419134255.jpg",
          width: 200,
          height: 200,
          borderWidth: 2,
          borderColor: "#fafafa",
          zIndex: 999 // 层级 越大越高
        },
        {
          x: 100,
          y: 230,
          url: "http://39.98.123.211:8300/images/banner-1.png",
          width: 570,
          height: 275,
          borderWidth: 2,
          borderColor: "#fafafa",
          zIndex: 999 // 层级 越大越高
        },
        {
          x: 100,
          y: 510,
          url: "http://39.98.123.211:8300/images/banner-2.png",
          width: 570,
          height: 275,
          borderWidth: 2,
          borderColor: "#fafafa",
          zIndex: 999 // 层级 越大越高
        }
      ],
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getDataAll();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    this.setData({
      show: false
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    this.setData({
      show: false
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage(opt): WechatMiniprogram.Page.ICustomShareContent {
    console.log(opt);

    return {
      title: "同城鲜花送",

      path: "pages/index/index",
      imageUrl: "../../assets/images/love.jpg"
    }
  },
  // 获取所有数据
  async getDataAll() {
    try {
      const resList = await reqIndexData()


      // 设置首页数据
      this.setData({
        carouselList: resList[0].data,
        categoryList: resList[1].data,
        advertiseList: resList[2].data,
        goodsList: resList[3].data,
        recommendList: resList[4].data,
        loading: false
      })
      console.log(this.data);
    } catch (error) {
      console.error(error);
    }
  },
  // 跳转分类页面
  goGoodListCategory(event: any) {
    const category2Id = event.mark.category2Id

    wx.navigateTo({
      url: '/modules/goodModule/pages/goodslist/goodslist?category2Id=' + category2Id,
    })
  },
  // 成功生成海报的回调
  onPosterSuccess(event) {
    console.log(event);
    Toast.success({
      message: '海报已生成',
      duration: 1500,
    });
    this.setData({
      show: true,
      postImage: event.detail
    })

  },
  onPosterFail(event) {
    Toast.fail('生成海报失败');
  },
  asyncCreatePoster() {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
    });
    // setData配置数据
    let nickname = "小花朵的护道人"
    if (this.data.userStore.userInfo.nickname && this.data.userStore.userInfo.nickname !== "******") {
      nickname = this.data.userStore.userInfo.nickname;
    }
    let imageUrl = "https://picsum.photos/200/300?grayscale";
    if (this.data.userStore.userInfo.headimgurl) {
      imageUrl = this.data.userStore.userInfo.headimgurl;
    };

    // 画布配置数据
    this.setData({
      "posterConfig.texts[0].text": `您的护花使者:【${nickname}】`,
      "posterConfig.images[0].url": imageUrl,
      "posterConfig.images[2].url": this.data.carouselList[0].imageUrl,
      "posterConfig.images[3].url": this.data.carouselList[1].imageUrl
    }, () => {
      this.selectComponent('#poster').onCreate(true)
    });
  },
  // 截取canvas图片
  async captureScreen() {
    try {

      // 获取当前页面的可视区域
      const query = wx.createSelectorQuery();
      const res = await new Promise((resolve) => {
        query.selectViewport().boundingClientRect(resolve).exec();
      });
      console.log(res);


      const { top, left, width, height } = res[0];

      // 创建 Canvas 上下文
      const canvas = wx.createCanvasContext('myCanvas', this);
      canvas.drawImage('current-page-image-url', 0, 0, width, height); // 使用实际的图片 URL
      canvas.draw(true, () => {
        wx.canvasToTempFilePath({
          canvasId: 'myCanvas',
          success: (res) => {
            wx.previewImage({
              urls: [res.tempFilePath]
            });
          },
          fail: (err) => {
            console.error('截取失败:', err);
          }
        });
      });
    } catch (error) {
      console.error('截取失败:', error);
    }
  },
  // 关闭弹框时
  onClose() {
    this.setData({
      show: false
    })
  },
  previewPostImage() {
    wx.previewImage({
      current: this.data.postImage,
      urls: [this.data.postImage]
    })
  },
  saveImageToPhotosAlbum(imageUrl) {
    wx.getSetting({
      success: (res) => {
        // 检查是否有保存到相册的权限
        console.log('授权状态:', res.authSetting);
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: () => {
              console.log('授权成功');
              this.savePostImage(this.data.postImage)
            },
            fail: (err) => {
              console.error('用户拒绝授权:', err);
              wx.showModal({
                title: '提示',
                content: '您未授权保存图片，是否前往设置打开授权？',
                success: (res) => {
                  if (res.confirm) {
                    wx.openSetting();
                  }
                }
              });
            }
          });
        } else {
          // 已经授权，直接保存图片
          this.savePostImage(this.data.postImage)
        }
      },
      fail: (err) => {
        console.error('获取授权信息失败:', err);
      }
    });
  },
  // 保存海报图片
  savePostImage(postImage) {
    // 保存图片到相册
    wx.saveImageToPhotosAlbum({
      filePath: postImage,
      success() {
        Toast.success({
          message: '海报已保存',
          duration: 1500,
        })
      },
      fail(event) {
        Toast.fail({
          message: '海报保存失败',
          duration: 1500,
        });
        // 保存海报失败获取设置权限？

      }
    })
  }
})