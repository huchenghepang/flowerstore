// 封装消息确认函数

/// <reference path="/typings/types/wx/lib.wx.api.d.ts"

export function modal(options:WechatMiniprogram.ShowModalOption ={}){
    return new Promise((reslove)=>{
        // 默认行为
        const modalOption = {
            title:"提示",
            content:"这个是一个模态弹窗",
            confirmText:"确认",
            cancelText:"取消",
            showCancel:true,
            confirmColor:"#576B95"
        }

        wx.showModal({
            ...modalOption,
            ...options,
            complete({confirm,cancel}:any){
                confirm && reslove(true);
                cancel && reslove(false);
            }
        })

    })
}

(wx as any).modal = modal
