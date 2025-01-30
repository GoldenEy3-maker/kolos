import { Modal } from "../../../js/classes/Modal";
import ModalFabric from "../../../js/classes/Modal";
import { Form } from "../../components/form/form";
class ModalForm extends Modal {
  form: Form | undefined;
  init() {
    super.init();
    // @ts-ignore
    // @ts-ignore
    this.form = new Form(this.element.querySelector(".js-form-modal"));
  }

  onReset() {
    super.onReset();
  }

  open(id: string | undefined) {
    super.open();
    this.form?.form.classList.add("consult-form");
    this.form?.form.classList.remove("booking-form");
    if (id === "choose-consult") {
      this.form?.setId(id);
      this.form?.isSended();
      this.form?.changeHeader("Обратный звонок");
      this.form?.form.classList.add("consult-form");
    } else if (id === "choose-apartments") {
      this.form?.setId(id);
      this.form?.isSended();
      this.form?.changeHeader("Заявка на бронирование");
    }
  }
}

export default class ModalFormFabric extends ModalFabric {
  static initFactory(selector: string) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => {
      new ModalForm(el as HTMLElement);
    });
  }
}
