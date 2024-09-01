// 扩展封装储存API

// 同步储存数据 setStorageSync

export const setStorageSync = (key:string,value:any):void=>{
    try {
        wx.setStorageSync(key,value);
    } catch (error) {
        console.log('储存数据出错：', error);
    }
}

// 同步获取数据 getStorageSync
export const getStorageSync = (key:string):any=>{
    try {
        const value = wx.getStorageSync(key);
        console.log('获取数据：', value);
        if(value){
            return value
        }
    } catch (error) {
        console.log(`获取数据${key}出错：`, error);
    }
}

// 同步的删除数据
export  const clearStorageSync  = (key: string) =>{
    try {
        wx.removeStorageSync(key);
        console.log(`删除数据${key}成功`);
    } catch (error) {
        console.log(`删除数据${key}出错：`, error);
    }
}

// 清空本地的所有数据
export const clearStorageAllSync = (key: string) => {
    try {
        wx.clearStorageSync();
        console.log('清空本地所有数据成功');
    } catch (error) {
        console.log('清空本地所有数据出错：', error);
    }
}

/**
 * 封装异步的数据缓存API
 *
 */

// 异步储存数据 setStorage
