import { action, observable } from "mobx-miniprogram";

export const numStore = observable({
    numA: 1,
    numB: 2,
    sum: 0,
    // 方法
    add: action(function ({ mark }) {
        console.log(mark.number);
        console.log(this.numA);

        this.numA += +mark.number
        this.numB += +mark.number

    }),

    get computedSum() {
        return this.numA + this.numB
    }
})