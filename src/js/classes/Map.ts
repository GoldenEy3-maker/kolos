// @ts-nocheck
export default class YandexMap {
  selector: string;
  element: HTMLElement | null;
  options: any;
  disables: any[];
  controls: string[];
  map: any;
  data: any;
  constructor(
    selector: string,
    options: object = {
      zoom: 14,
      disables: ["scrollZoom"],
      centerCoord: {
        x: "53.342441",
        y: "83.799198",
      },
    },
    data: any[] = [],
  ) {
    this.map = null;
    this.selector = `${selector}`;
    this.element = document.querySelector(`#${selector}`);
    this.options = options;
    this.disables = this.options?.disables;
    this.controls = [
      "rulerControl",
      "zoomControl",
      "geolocationControl",
      "inputSearch",
      "routeButtonControl",
      "trafficControl",
      "typeSelector",
      "fullscreenControl",
    ];
    this.data = data || [];

    // if(!!document.querySelector(`#${this.selector}`)) {
    this.init();

    this.setControlElements(["zoomControl"]);
    // }
  }
  init() {
    if (!this.element) {
      return;
    }
    ymaps.ready(() => {
      this.map = new ymaps.Map(this.selector, {
        center: [this.options.centerCoord.x, this.options.centerCoord.y],
        zoom: this.options.zoom,
        controls: this.controls,
      });
      this.map.controls.remove("zoomControl");
      this.disableBehaviorsEvents(this.disables);
      this.addGeoObjects(this.data);
    });
  }

  destroy() {
    this.map.destroy();
  }

  addGeoObjects(data: Array<any> = []) {
    if (!data.length) {
      return false;
    }
    setTimeout(() => {
      for (let item of data) {
        this.map.geoObjects.add(
          new ymaps.Placemark(
            [item?.coords.x, item?.coords.y],
            {
              hintContent: item?.hintContent,
              balloonContent: item?.baloonContent,
            },
            {
              iconLayout: "default#image",
              iconImageHref: item?.img?.href,
              iconImageSize: [item?.img?.size.x, item?.img?.size.y],
              iconImageOffset: [item?.img?.offset.x, item?.img?.offset.y],
            },
          ),
        );
      }
    }, 1000);
  }
  removeAllGeoObjects() {
    this.map.geoObjects.removeAll();
  }

  disableBehaviorsEvents(data: string[]) {
    setTimeout(() => {
      for (let item in data) {
        this.map.behaviors.disable(data[item]);
      }
    }, 1000);
  }
  disableControlElement(item: string[]) {
    let arr = [];
    for (let i = 0; i < this.controls.length; i++) {
      if (this.controls[i] !== item) {
        arr.push(this.controls[i]);
      }
    }
    this.controls = arr;
  }

  setControlElements(elements: string[] = []) {
    this.controls = elements;
  }

  setEvent(eventName, callback) {
    try {
      setTimeout(() => {
        this.map.geoObjects.events.add(eventName, function (e) {
          callback(e);
        });
      }, 1000);
    } catch {
      if (this.map === null) {
        console.error("Карта еще не инициализирована");
      } else {
        console.error("Неизвестная ошибка");
      }
    }
  }

  zoomIn() {
    if (this.options.zoom >= 19) {
      return false;
    }
    this.map.setZoom(this.options.zoom + 1);
    this.options.zoom += 1;
  }
  zoomOut() {
    if (this.options.zoom < 1) {
      return false;
    }
    this.map.setZoom(this.options.zoom - 1);
    this.options.zoom -= 1;
  }
  setZoom(num: number) {
    if (num < 1 || num > 19) {
      return false;
    }
    this.map.setZoom(num);
    this.options.zoom = num;
  }
  getZoom() {
    return this.map.getZoom();
  }
}
