import Swiper from "swiper";
import Slider from "../../../js/classes/Slider";

export default class HistorySlider extends Slider {
    constructor(selector = ".js-history-slider") {
        super(selector);
    }
    init() {
        super.init();
        this.onSlide();

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

    onSlide() {
        this.sliders.forEach((slider) => {
            slider.on('slideChange', (e: Swiper) => {
                const currentSlideIndex = e.realIndex;
                const content = slider.el.querySelectorAll(".js-content");

                content.forEach((i: Element | HTMLElement) => {
                    if(i.id === String(currentSlideIndex)) {
                        i.classList.add("active")
                    } else {
                        i.classList.remove("active")
                    }
                })
            })
        })
    }
}
