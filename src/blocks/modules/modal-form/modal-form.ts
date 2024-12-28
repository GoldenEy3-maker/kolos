import {Modal} from "../../../js/classes/Modal";
import ModalFabric from "../../../js/classes/Modal";
import {Form} from "../../components/form/form";
class ModalForm extends Modal {
    form: Form | undefined;
    init() {
        super.init()
        // @ts-ignore
        console.log(this.element);
        // @ts-ignore
        this.form = new Form(this.element.querySelector(".js-form-modal"));
    }


    onReset() {
        super.onReset();
    }

    open(id: string | undefined) {
        super.open();
        console.log("open", id)
        if(id === "choose-consult" ) {
            this.form?.setId(id);
            this.form?.isSended();
            this.form?.changeHeader("Обратный звонок");
        } else if(id === "choose-apartments") {
            this.form?.setId(id);
            this.form?.isSended();
            this.form?.changeHeader("Заявка на бронирование");
        }
    }
}



export default class ModalFormFabric extends ModalFabric{
    static initFactory(selector: string) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            new ModalForm((el as HTMLElement));
        })
    }
}