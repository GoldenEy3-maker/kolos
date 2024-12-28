import App from "../classes/App";
import PageLoader from "../classes/PageLoader";
import DetailSlider from "../../blocks/components/detail-slider/detail-slider";
import Construction from "../../blocks/components/construction/construction";
import Map from "../../blocks/components/location/location";
import HistorySlider from "../../blocks/components/history/history-slider";
import ModalFabric from "../classes/Modal";
import ModalFormFabric from "../../blocks/modules/modal-form/modal-form";
import FormFabric from "../../blocks/components/form/form";
import ModalNewsFabric, {
  ModalNewsSlider,
} from "../../blocks/modules/modal-news/modal-news";
import PlansSlider from "../../blocks/components/plans-slider/plans-slider";
import ViewSlider from "../../blocks/components/view-slider/view-slider";
import {
  PlacesImagesSlider,
  PlacesTextSlider,
} from "../../blocks/components/places/places";
import Mask from "../classes/Mask";

const init = () => {
  new PageLoader();
  new Construction();
  Sliders();
  Maps();
  new Mask(".js-mask-phone");
};

const Maps = () => {
  new Map();
};
const Sliders = () => {
  new DetailSlider();
  new HistorySlider();
  new ModalNewsSlider();
  new PlansSlider();
  new ViewSlider();
  ModalNewsFabric.initFactory(".js-modal-news");
  ModalFormFabric.initFactory(".js-modal-form");
  ModalFabric.initFactory(".js-modal");
  FormFabric.initFactory(".js-form");
  const placesImages = new PlacesImagesSlider();
  const placesText = new PlacesTextSlider();
  const placesImagesSlider = placesImages.sliders[0];
  const placesTextSlider = placesText.sliders[0];
  placesTextSlider.controller.control = placesImagesSlider;
  placesImagesSlider.controller.control = placesTextSlider;
};

new App().init(() => {
  init();
});
