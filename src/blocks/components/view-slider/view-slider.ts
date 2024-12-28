import Swiper from "swiper";
import Slider from "../../../js/classes/Slider";

export default class ViewSlider extends Slider {
    contentWrapper: string | undefined;
    constructor(selector = ".js-view-slider") {
        super(selector);
    }
    init() {
        super.init();

    }
    bindOptions() {
        super.bindOptions({
            loop: false,
            slidesPerView: 1,
            spaceBetween: 20,
            speed: 1000,
            navigation: {
                nextEl: `${this.buttonNext}`,
                prevEl: `${this.buttonPrev}`,
            }
        });
    }
}