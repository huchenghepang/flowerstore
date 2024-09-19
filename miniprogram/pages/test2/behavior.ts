import { BehaviorWithStore } from "mobx-miniprogram-bindings";
import { numStore } from "../../store/numStore"

export const countBehaviors = BehaviorWithStore({
    // 数组写法
/*     storeBindings:{
        store: numStore,
        fields: ["numA","numB","sum","computedSum"],
        actions:["add"]
    } */

    // 对象写法

    storeBindings:[{
        namespace: "numStore",
        store:numStore,
        fields:{
            A:()=>numStore.numA,
            B:"numB",
            sum:"sum",
            computedSum:()=>numStore.computedSum
        },
        // 方法调用开启命名空间无效 直接调用就好了
        actions:{"addAll":"add"}
    }]
})