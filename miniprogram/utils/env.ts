// 小程序的环境变量配置文件

const { miniProgram } = wx.getAccountInfoSync()

// 获取当前微信小程序的版本

/* 'develop'： 开发版;
    trial： 体验版;
    'release'： 正式版; 
*/
const {envVersion} = miniProgram

let env = {
    baseUrl:"https://gmall-prod.atguigu.cn/mall-api"
}

switch (envVersion){
    case "develop": 
        env.baseUrl = "https://gmall-prod.atguigu.cn/mall-api"
        break;

    case "trial":
        env.baseUrl = "https://gmall-prod.atguigu.cn/mall-api"
        break;
    case "release":
        env.baseUrl = "https://gmall-prod.atguigu.cn/mall-api"
        break
    default:
}

export {env};