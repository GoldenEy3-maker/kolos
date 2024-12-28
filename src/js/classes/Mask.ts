import Inputmask from "inputmask";

export default class Mask {
    selector: string
    constructor(selector: string) {
        this.selector = selector
    }

    init() {
        new Mask('.js-mask-phone').phone({})
    }

    phone(options: any) {
        return new Inputmask({
            ...options,
            mask: '+7 (999) 999 99-99',
            showMaskOnHover: false,
            autoUnmask: true
        }).mask(this.selector)
    }
}
