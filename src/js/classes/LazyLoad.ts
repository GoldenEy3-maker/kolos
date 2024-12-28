import LazyLoad from 'vanilla-lazyload'


export default class Lazy {
    lazyload: any;
    eventUpdate = "lazyload.update";
    constructor() {
        this.lazyload = new LazyLoad();
        this.init();
    }
    dispatchUpdate() {
        document.dispatchEvent(new CustomEvent(this.eventUpdate));
    }
    init() {
        document.addEventListener(this.eventUpdate, () => {
            this.lazyload.update()
        })
    }
}