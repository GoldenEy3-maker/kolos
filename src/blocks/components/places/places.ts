import Slider from "../../../js/classes/Slider";

export class PlacesTextSlider extends Slider {
  constructor() {
    super("[data-places-text]");
  }

  bindOptions() {
    super.bindOptions({
      loop: false,
      slidesPerView: 1,
      speed: 1000,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }
}

export class PlacesImagesSlider extends Slider {
  constructor() {
    super("[data-places-images]");
  }

  bindOptions() {
    super.bindOptions({
      loop: false,
      slidesPerView: 1,
      speed: 1000,
    });
  }
}
