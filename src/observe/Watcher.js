/**
 * Watcher 订阅者
 */
import Dep from './Dep'

export default class Watcher {
    constructor (vm, expression, cb) {
        this.vm = vm;
        this.cb = cb;
        this.expression = expression; // 需要替换的值
        this.value = this.getValue();

        Dep.target = this;

        let arr = expression.trim().split('.');
        let val = vm;
        arr.forEach(key => {
            val = val[key];  // 此时回调用 数据劫持的get方法，pushu一个执行事件
        });

        Dep.target = null;
        
    }

    getValue() {
        
    }

    update() {
        let arr = this.expression.trim().split('.');
        let val = this.vm;
        arr.forEach(key => {
            val = val[key];  // 此时回调用 数据劫持的get方法，pushu一个执行事件
        });
        this.cb(val);
    }
}