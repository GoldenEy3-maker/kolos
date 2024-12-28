import Inputmask from "inputmask";

export default class Mask {
  selector: string;
  constructor(selector: string) {
    this.selector = selector;
    this.init();
  }

  init() {
    this.phone({});
  }

  phone(options: any) {
    return new Inputmask({
      ...options,
      mask: "+7 (999) 999 99-99",
      showMaskOnHover: false,
      autoUnmask: true,
    }).mask(this.selector);
  }
}
