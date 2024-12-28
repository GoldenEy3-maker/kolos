import Swiper from "swiper";
import Slider from "../../../js/classes/Slider";

export default class DetailSlider extends Slider {
  contentWrapper: string | undefined;

  constructor(selector = ".js-detail-slider") {
    super(selector);
  }
  init() {
    super.init();

    new DetailSliderTabs(this.instances);
  }
  bindOptions() {
    super.bindOptions({
      loop: false,
      slidesPerView: 1,
      spaceBetween: 20,
      speed: 1000,
      // navigation: {
      //     nextEl: `${this.buttonNext}`,
      //     prevEl: `${this.buttonPrev}`,
      // }
    });
  }
}

class DetailSliderTabs {
  tabs: NodeListOf<Element>;
  sliders: Element[];
  constructor(sliders: Element[]) {
    this.tabs = document.querySelectorAll(".js-detail-slider-tab");
    this.sliders = sliders;
    this.init();
  }
  private init() {
    this.event();
  }
  private event() {
    this.tabs.forEach((tab: Element) => {
      tab.addEventListener("click", (e) => {
        e.preventDefault();
        const id = (tab as HTMLElement).dataset.id;
        this.setActiveTab(tab);

        if (id) {
          this.setSlider(id);
        } else {
          throw Error("нет дата атрибута data-id на табе");
        }
      });
    });
  }

  private setActiveTab(tab: Element | HTMLElement) {
    this.tabs.forEach((tab: Element) => {
      this.removeClassActive(tab);
    });
    this.setClassActive(tab);
  }

  private setClassActive(el: Element | HTMLElement) {
    el.classList.add("active");
  }
  private removeClassActive(el: Element | HTMLElement) {
    el.classList.remove("active");
  }

  private setSlider(id: string) {
    this.sliders.forEach((slider) => {
      const sliderId = slider.id;
      if (sliderId === id) {
        this.setClassActive(slider);
      } else {
        this.removeClassActive(slider);
      }
    });
  }
}
