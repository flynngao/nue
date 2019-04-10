/*
    数据劫持，整个框架的第一步
*/
import Dep from './Dep';

class Observe {

    constructor(data) {
        this.dep = new Dep();
        this.walk(data);
    }

    walk(data) {
        let dep = this.dep;
        for (let key in data) {
            // 递归可能对象，全部属性使用defineProperty
            observe(data[key]);
            // 添加
            let val = data[key]
            Object.defineProperty(data, key, {
                configurable: true,
                get() {
                    Dep.target && dep.addSub(Dep.target)
                    return val;
                },
                set(newVal) {
                    if (val === newVal) return;
                    val = newVal;
                    // 新值是对象继续递归observe
                    observe(newVal);
                    // 所有数据更新
                    dep.notify();
                }
            })
        }
    }
}

export default function observe(data) {
    if (data && typeof data === 'object') return new Observe(data);
    // function 如果不return是会保留再堆栈里？
    return;
}