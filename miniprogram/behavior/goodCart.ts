import { goodCartStore } from '../store/goodCartStore'
import { BehaviorWithStore } from 'mobx-miniprogram-bindings'

export const goodCartStoreBehavior = BehaviorWithStore({
    storeBindings: [{
        store: goodCartStore,
        namespace: 'goodCartStore',
        fields: ['cartList', 'allCount'],
        actions: ['getCartList']
    }]
})