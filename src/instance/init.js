import observe from '../observe'

export default function init(vm) {
    let data = vm._data = vm.$options.data
    observe(data);
}