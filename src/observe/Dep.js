/* 
    第三步，订阅器队列
*/
export default class Dep {
    constructor() {
        // 订阅队列
        this.subs = [];
    }

    // 订阅
    addSub(sub) {
        this.subs.push(sub);
    }
    // 广播
    notify() {
        for(let sub of this.subs) {
            sub.update();
        }
    }

    addDepend() {
        Dep.target.addDep(this);
    }
}

Dep.target = null;