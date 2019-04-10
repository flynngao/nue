// Test Nue
import init from './instance/init';
import proxy from './instance/proxy';
import compiler from './compiler';

export default class Nue {
    constructor(options = {}) {
        // vm就代表框架对象
        const vm = this;
        this.$options = options;
        // init option
        init(vm);
        // proxy data
        proxy(vm);

        new compiler(options.el, vm);
    }
}