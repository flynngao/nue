/** test code for defineProperty */
let obj = {};

let song = 'sfds';
obj.singer = 'afdsa';

Object.defineProperty(obj, 'music', {
    configurable: true,
    enumerable: true,
    get() {
        return song;
    },
    set(val) {
        song = val;
    }
});

console.log(obj, obj.music);
obj.music = 'fdsafdsa';
console.log(obj, obj.music);