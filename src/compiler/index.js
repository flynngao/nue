/**
 *  编译函数
 */

import Watcher from '../observe/Watcher'

export default class compiler { // 第三步，构建模板
    constructor(el, vm) {
        vm.$el = document.querySelector(el);
        this.replace(vm.$el, vm);
    }

    // 替换函数
    replace(el, vm) {
        Array.from(el.childNodes).forEach(node => {
            let text = node.textContent;
            let reg = /\{\{(.*?)\}\}/g // reg for {{}}

            // 文本节点
            if (node.nodeType === 3 && reg.test(text)) {
                let arr = RegExp.$1.trim().split('.');
                // 递归找到对应值
                let val = vm;
                arr.forEach(key => {
                    val = val[key];
                })
                // 替换
                node.textContent = text.replace(reg, val).trim();

                // 当值变动的时候更新的watcher，初始化
                new Watcher(vm, RegExp.$1, (newVal) => {
                    node.textContent = text.replace(reg, newVal).trim();
                })

            }

            // 针对input做双向绑定
            if (node.nodeType === 1) {
                let attr = node.attributes;
                Array.from(attr).forEach(a => {
                    if (!a.name.includes('v-')) {
                        return;
                    }
                    let exp = a.value
                    let arr = exp.trim().split('.');
                    // 初始化把input的值设上
                    if (a.name.includes('v-')) {
                        let val = vm;
                        arr.forEach((key, i) => {
                            if (i === arr.length - 1) {
                                node.value = val[key];
                                return
                            }
                            val = val[key];
                        });
                    }
                    // 更新值的时候反向更新
                    new Watcher(vm, exp, (newVal) => {
                        node.value = newVal;
                    })
                    // input的时候更新值
                    node.addEventListener('input', e => {
                        let newVal = e.target.value;
                        
                        // 递归找到对应值
                        let val = vm;
                        arr.forEach((key, i) => {
                            if (i === arr.length - 1) {
                                val[key] = newVal
                                return
                            }
                            val = val[key];
                        });
                    });

                });
            }

            // 继续替换子节点
            if (node.childNodes && node.childNodes.length) {
                this.replace(node, vm);
            }

        })
    }
}
