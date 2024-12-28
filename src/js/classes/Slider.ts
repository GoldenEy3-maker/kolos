import Swiper, {
  Navigation,
  Pagination,
  Autoplay,
  EffectFade,
  Controller,
  SwiperOptions,
} from "swiper";
Swiper.use([Navigation, Pagination, Autoplay, EffectFade, Controller]);

interface ISlider {
  selector: NodeListOf<HTMLElement>;
  selectorText: String;
}

export default class Slider implements ISlider {
  selector: NodeListOf<HTMLElement>;
  selectorText: String;
  options: Object;
  sliders: Swiper[];
  buttonNext: String;
  buttonPrev: String;
  instances: Array<any>;
  paginationText: String;
  thumb: Swiper | null | undefined;

  constructor(selector = ".js-slider", options = {}, thumb?: Swiper) {
    this.selector = document.querySelectorAll(selector);
    this.selectorText = selector;
    this.options = options;
    this.sliders = [];
    this.buttonNext = `${this.selectorText}-next`;
    this.buttonPrev = `${this.selectorText}-prev`;
    this.instances = [];
    this.paginationText = `${selector}-pagination`;

    this.thumb = thumb;
    this.init();
  }

  init(): any {
    if (!this.selector.length) {
      return false;
    }
    this.bindOptions({});
    this.selector.forEach((item: HTMLElement) => {
      let slider = new Swiper(item, this.options);
      this.sliders.push(slider);
      this.instances.push(item);
    });
  }

  bindOptions(options: SwiperOptions) {
    const defaultOptions = {
      slidesPerView: "auto",
    };
    this.options = { ...this.options, ...defaultOptions, ...options };
  }
}
