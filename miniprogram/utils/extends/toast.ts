// 消息模块的封装

/// <reference path="/typings/types/wx/lib.wx.api.d.ts"

// 定义消息类型

function toast(msg: WechatMiniprogram.ShowToastOption = { title: "加载中...", icon: "loading", duration: 2000, mask: false }) {
    wx.showToast(msg);
}

(wx as any).toast = toast;
export { toast };

