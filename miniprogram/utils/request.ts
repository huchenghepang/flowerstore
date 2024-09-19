/// <reference path="/typings/types/wx/lib.wx.api.d.ts"
// 封装网络请求

// 导入环境变量
import { env } from "./env"

interface RequestOptions extends WechatMiniprogram.RequestOption {
  baseUrl?: String | undefined | null
  isShowLoading?: Boolean
  filePath?: String | undefined | null
  name?: String | undefined
}

// 错误响应的接口 排他
type ErrorResponse = Omit<WechatMiniprogram.RequestFailCallbackErr, 'errno'>

interface Interceptors {
  request?: (options: RequestOptions) => RequestOptions
  response?: (res: WechatMiniprogram.RequestSuccessCallbackResult) => any
  error?: (error: ErrorResponse) => ErrorResponse
  complete?: (res: WechatMiniprogram.RequestSuccessCallbackResult) => void
}

// 创建一个请求的类
class WxRequest {
  // 设计类时可以有默认的配置

  defaultOptions: RequestOptions = {
    // 请求的域名
    baseUrl: '',
    // 请求的接口地址
    url: '',
    // 请求的数据参数
    data: undefined,
    // 默认的请求方法
    method: 'GET',
    // 请求头部
    header: {
      'Content-Type': 'application/json'
    },
    // 请求超时时间
    timeout: 60000,
    isShowLoading: false
  }

  // 初始化一个队列
  queue: string[] = []

  // 定义请求拦截器和响应拦截器 在请求或者响应的时候进行处理
  interceptors: Interceptors = {
    request: (options: RequestOptions) => options,
    response: (res: WechatMiniprogram.RequestSuccessCallbackResult) => res,
    error: (err: ErrorResponse) => err,
    complete: (res: WechatMiniprogram.RequestSuccessCallbackResult) => { }
  }

  constructor(option = {}) {
    // 合并请求的默认的配置参数
    this.defaultOptions = Object.assign({}, this.defaultOptions, option)
  }
  request(options: RequestOptions) {
    // 使用promise封装异步请求

    // 拼接请求的完整url
    options.url = this.defaultOptions.baseUrl + options.url
    // 合并请求的参数
    options = { ...this.defaultOptions, ...options }
    return new Promise((resolve, reject) => {
      // 这里为了保持对this的引用使用了saveThis这个中间变量
      const saveThis = this
      // 对上传文件的请求
      if ((options.method as string) === 'UPLOAD') {
        if (options.isShowLoading) {
          this.queue.length === 0 &&
            wx.showLoading({
              title: '上传中...'
            })
        }

        // 加入到队列中 如果有一个请求的话
        this.queue.push('request')


        // 上传文件
        wx.uploadFile({
          ...options,
          success(res: any) {
            // 处理上传文件成功的响应
            res.data = JSON.parse(res.data)
            const mergeResponse = Object.assign({}, res, { config: options, isSuccess: true })
            if (saveThis.interceptors.response) {
              res = saveThis.interceptors.response(mergeResponse)
            }
            resolve(res)
          },
          fail(err: any) {
            const mergeErr = Object.assign({}, err, { config: options, isSuccess: false })
            // 调用错误拦截器 处理失败的请求
            if (saveThis.interceptors.error) {
              err = saveThis.interceptors.error(mergeErr)
            }

            reject(err)
          },
          complete() {
            // 如果是不需要显示加载中的则直接返回
            if (!options.isShowLoading) {
              return
            }

            // 请求完成隐藏显示加载中



            // 找到并删除该任务 每次完成一个请求就删除掉一个队列中的任务 如果所有任务为则，// 经过100ms后再关闭
            saveThis.queue.pop()
            saveThis.queue.length === 0 &&
              (() => {
                setTimeout(() => wx.hideLoading(), 100)
              })();
          }
        } as any)
      } else {
        // 调用请求拦截器
        if (saveThis.interceptors.request) {
          options = saveThis.interceptors.request(options)
        }

        // 显示加载中

        // 加入到队列中 如果当前队列没有任务在则显示加载中


        if (options.isShowLoading) {
          this.queue.length === 0 &&
            wx.showLoading({
              title: '加载中...'
            })
        };

        // 加入到队列中 如果有一个请求的话
        this.queue.push('request');

        // 使用wx.equest发起网络请求
        wx.request({
          ...options,
          // 请求成功的回调
          success(res) {
            const mergeRes = Object.assign({}, res, { config: options, isSuccess: true })
            // 调用响应拦截器 处理成功的请求
            if (saveThis.interceptors.response) {
              res = saveThis.interceptors.response(mergeRes)
            }

            resolve(res)
          },
          // 请求失败的回调 当网络不佳，或者404等 服务器不存在时
          fail(error) {
            // 错误的合并
            const mergeError = Object.assign({}, error, { config: options, isSuccess: false })
            if (saveThis.interceptors.error) {
              error = saveThis.interceptors.error(mergeError)
            }
            reject(error)
          },
          complete() {
            // 如果是不需要显示加载中的则直接返回
            if (!options.isShowLoading && saveThis.queue.length == 0) {
              return
            }

            // 请求完成隐藏显示加载中

            // 找到并删除该任务 每次完成一个请求就删除掉一个队列中的任务 如果所有任务为则，// 经过100ms后再关闭
            saveThis.queue.pop()
            saveThis.queue.length === 0 &&
              (() => {
                setTimeout(() => wx.hideLoading(), 100)
              })()
          }
        })
      }


    })
  }

  // 封装get请求的快捷方法
  get(url: string, data = {}, config = {}) {
    return this.request({ url, data, ...config, method: 'GET' })
  }
  // 封装post请求的快捷方法
  post(url: string, data = {}, config = {}) {
    return this.request({ url, data, ...config, method: 'POST' })
  }
  // 封装put请求的快捷方法
  put(url: string, data = {}, config = {}) {
    return this.request({ url, data, ...config, method: 'PUT' })
  }
  // 封装delete请求的快捷方法
  delete(url: string, data = {}, config = {}) {
    return this.request({ url, data, ...config, method: 'DELETE' })
  }

  // 封装处理并发请求 Promise.all
  all(promises: Array<Promise<any>>): Promise<any[]> {
    return Promise.all(promises)
  }

  // 封装上传文件的请求
  /**
   * Description 文件上传接口
   * @param {string} url:string 文件的上传地址
   * @param {string} filePath:string 文件的存放路径
   * @param {string} name:string 文件的对应的key
   * @param {object} config={} 其他配置选项
   * @returns {any}
   */
  uploadFile(url: string, filePath: string, name: string, config = { isShowLoading: false }) {
    return this.request({ url, filePath, name, method: 'UPLOAD' as 'DELETE' | 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'TRACE' | 'CONNECT', ...config })
  }
}

// 将请求类实例化
const instance = new WxRequest({
  baseUrl: env.baseUrl,
  timeout: 15000
})

// 配置请求拦截器

instance.interceptors.request = (options) => {
  // 这里可以添加token的请求截器 用于身份的验证
  // options.header.Authorization = `Bearer ${wx.getStorageSync('token')}`;
  if (wx.getStorageSync('token')) {
    options.header!.token = wx.getStorageSync('token')
  }
  // 定义请求拦截器的内容

  return options
}

// 配置响应拦截器
instance.interceptors.response = (res) => {
  // 定义响应拦截器的内容
  // 根据响应体的内容进行处理

  switch ((res.data as any).code) {
    case 200:
      // 正常返回
      return res.data
    case 208:
      // token 失效
      wx.clearStorageSync()
      wx.showToast({
        title: '您的身份已失效，请重新登录',
        icon: 'none',
        duration: 2000
      })
      // 取登录页面
      wx.navigateTo({ url: '/pages/login/login' })
      return res.data
    case 500:
      // 服务器内部错误
      wx.showToast({
        title: '服务器内部错误',
        icon: 'none',
        duration: 2000
      })
      return res.data
    default:
      // 其他错误
      wx.showToast({
        title: '请求出错了',
        icon: 'none',
        duration: 2000
      })
      // 交出错误给外部处理
      return Promise.reject(res)
  }
}

// 配置错误拦截器
instance.interceptors.error = (err) => {
  // 这里可以添加token过期的拦截器
  // 定义错误拦截器的内容

  wx.showToast({
    title: '当前网络可能存在问题，请检查网络设置',
    icon: 'none',
    duration: 2000
  })
  return err
}

// 暴露实例 以供外部使用

export default instance
