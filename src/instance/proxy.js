/* 
    代码实现的第二步
    简单数据代理 让 vm._data.a 变成 vm.a 
 */


export default function proxy(vm) {
    for(let key in vm._data) {
        proxyProperty(vm, '_data', key);
    }
} 
// proxy function
function proxyProperty (target, sourceKey, key) {
    Object.defineProperty(target, key, {
        configurable: true,
        get() {
            return target[sourceKey][key];
        },
        set(newVal) {
            target[sourceKey][key] = newVal;
        }
    })
    
}