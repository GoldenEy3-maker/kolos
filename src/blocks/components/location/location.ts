import YandexMap from "../../../js/classes/Map";

export default class Map extends YandexMap {
  // url: string | undefined = "";
  constructor(selector = "js-map") {
    super(selector);
    this.data = [
      {
        coords: {
          x: 53.342441,
          y: 83.799198,
        },
        img: {
          href: "img/map-pin.svg",
          size: {
            x: 50,
            y: 40,
          },
          offset: {
            x: -25,
            y: -20,
          },
        },
      },
    ];
    // if (this.element) {
    //   this.getData();
    // }
  }
  // init() {
  // this.getData().then(() => {
  //   super.init();
  // });
  // }

  // public filterGeoObjects(type: string) {
  //   this.removeAllGeoObjects();

  //   if (type !== "all") {
  //     const newData = this.data.filter((i: any) => i.type === type);
  //     this.addGeoObjects(newData);
  //   } else {
  //     this.addGeoObjects(this.data);
  //   }
  // }

  // async getData() {
  //   const url = this.element?.dataset.action;

  //   await HTTP.sendAjax(
  //     url || "",
  //     {
  //       url: window.location.href,
  //     },
  //     (dataInf: any) => {
  //       const { options, data } = dataInf.data;
  //       this.options = options;
  //       this.data = data;
  //       return true;
  //     },
  //     (err: any) => {
  //       return false;
  //     },
  //   );
  // }
}
