// 消息模块的封装

/// <reference path="/typings/types/wx/lib.wx.api.d.ts"

// 定义消息类型

interface Message {
    title: string;
    icon?: "success" | "loading" | "none" | "undefined";
    image?: string;
    duration?: number;
    mask?: boolean;
    success?: Function | undefined;
    fail?: Function | undefined;
    complete?: Function | undefined;
}
import "typings/index"
export function toast(msg:WechatMiniprogram.ShowToastOption = {title:"加载中...",icon:"loading",duration:1500,mask:false}){
    wx.showToast(msg);
}

(wx as any).toast = toast;

