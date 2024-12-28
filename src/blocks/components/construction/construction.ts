import Swiper from "swiper";
import Slider from "../../../js/classes/Slider";
import {Fancybox} from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
class ConstructionSlider extends Slider {
    contentWrapper: string | undefined;
    constructor(selector = ".js-construction-slider") {
        super(selector);
    }

    init() {
        super.init();
        Fancybox.bind("[data-fancybox]", {});
    }

    bindOptions() {
        super.bindOptions({
            loop: false,
            slidesPerView: 3,
            spaceBetween: 30,
            speed: 1000,
            navigation: {
                nextEl: `${this.buttonNext}`,
                prevEl: `${this.buttonPrev}`,
            },
            breakpoints:  {
                0: {
                    slidesPerView: 1,
                },
                576: {
                    slidesPerView: 2,
                },
                991: {
                    slidesPerView: 3,
                }
            }

        });
    }
}

class ConstructionLine {

    line: HTMLElement | Element | null;
    counter: HTMLElement | Element | null;
    constructor(selector: string) {
        this.line = document.querySelector(`${selector} span`);
        this.counter = document.querySelector(`${selector}-title span`);
        this.init();
    }
    init() {
        if(this.line) {
            // @ts-ignore
            this.line.style.width =  this.counter?.textContent;
        }
    }
}


export default class Construction {
    constructor() {
        new ConstructionSlider();
        new ConstructionLine(".js-construction-line");
    }
}

