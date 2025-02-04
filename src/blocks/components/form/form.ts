import HTTP from "../../../js/classes/HTTP";
import { AxiosError, AxiosResponse } from "axios";
import Validation from "../../../js/classes/Validation";
import { findParent } from "../../../js/helpers/helpers";
interface FormItem {
  name: string;
  value: string;
  isValid: boolean;
}
export class Form {
  action: string;
  form: HTMLElement | Element;
  button: HTMLButtonElement | null;
  message: HTMLElement | Element | null;
  inputs: NodeListOf<Element>;
  textarea: NodeListOf<Element>;
  data: FormItem[];
  title: HTMLElement | Element | null;
  dopInfo: string | null;
  id: string | null;
  sendedForm: string[] = [];

  constructor(element: HTMLElement | Element) {
    this.form = element;
    this.action = element.getAttribute("action") || "";
    this.inputs = this.form.querySelectorAll("input");
    this.textarea = this.form.querySelectorAll("textarea");
    this.message = this.form.querySelector(".js-message");
    this.title = this.form.querySelector(".js-form-title");
    this.button = this.form.querySelector("button");

    this.dopInfo = (this.form as HTMLElement).dataset.dopinfo || null;
    this.data = [];

    this.id = null;

    this.init();
  }
  init() {
    this.initMasks();
    this.onSubmit();
    this.onChange();
  }

  protected initMasks() {
    // init mask on inputs
  }
  hideForm() {
    //@ts-ignore
    this.message.style.display = "block";
    this.form.querySelectorAll("label, .form__footer").forEach((i) => {
      //@ts-ignore
      i.style.display = "none";
    });
  }
  openForm() {
    //@ts-ignore
    this.message.style.display = "none";
    this.form.querySelectorAll("label, .form__footer").forEach((i) => {
      const valueHolders = i.querySelectorAll("input, textarea");
      //@ts-ignore
      valueHolders.forEach((i) => {
        (i as any).value = "";
      });
      //@ts-ignore
      i.style.removeProperty("display");
    });
  }

  isSended() {
    if (
      this.sendedForm.includes(<string>this.id) &&
      this.id === "choose-consult"
    ) {
      this.hideForm();
    } else {
      this.openForm();
    }
  }
  setId(id: string) {
    this.id = id;
  }
  protected onChange() {
    this.inputs.forEach((input: any) => {
      input.addEventListener("change", () => {
        const label = findParent(input, "js-form-label");
        if (input.value.length) {
          label.classList.add("focus");
        } else {
          label.classList.remove("focus");
        }
      });
    });
  }
  protected onSubmit() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();

      // @ts-ignore
      this.button?.disabled = true;
      //@ts-ignore
      this.message?.textContent = "";

      if (!this.collectData()) {
        console.error("Форма не прошла валидацию");
        this.button?.removeAttribute("disabled");
        return false;
      }
      this.dopInfo = (this.form as HTMLElement).dataset.dopinfo || null;
      if (true) {
        HTTP.sendAjax(
          this.action,
          { data: this.data, dopInfo: this.dopInfo },
          (data: AxiosResponse) => {
            if (data.status) {
              this.button?.removeAttribute("disabled");
              //@ts-ignore
              this.dopInfo = (this.form as HTMLElement).dataset.dopinfo;
              // if ((this.dopInfo as any).length) {
              //@ts-ignore
              // ym(94591627, "reachGoal", "to book");
              // } else {
              //@ts-ignore
              // ym(94591627, "reachGoal", "calls");
              // }
              //@ts-ignore
              this.message?.innerHTML = `
                                <h5>${data.data.title}</h5>
                                <p>${data.data.text}</p>
                            `;

              this.hideForm();

              this.message?.classList.remove("error");

              (this.form as HTMLFormElement).reset();

              this.sendedForm.push(<string>this.id);

              if (this.form.classList.contains("booking-form")) {
                // @ts-ignore
                ym(94591627, "reachGoal", "to book");
              }

              if (this.form.classList.contains("consult-form")) {
                // @ts-ignore
                ym(94591627, "reachGoal", "callback");
              }

              if (this.form.classList.contains("questions-form")) {
                // @ts-ignore
                ym(94591627, "reachGoal", "questions");
              }
            } else {
              //@ts-ignore
              this.button?.disabled = false;
              //@ts-ignore
              this.message?.innerHTML = "";
              //@ts-ignore
              this.message?.innerHTML = `
                                <h5>${data.data.title}</h5>
                                <p>${data.data.text}</p>
                            `;
              this.message?.classList.add("error");
            }
          },
          (data: AxiosError) => {
            this.button?.removeAttribute("disabled");
            //@ts-ignore
            this.message?.textContent = data.data;
            this.sendedForm.push(<string>this.id);
          },
        );
      }
    });
  }
  changeHeader(text: string) {
    if (this.title) {
      this.title.textContent = text;
    }
  }
  protected collectData(): boolean {
    let result = true;
    this.data = [];
    this.inputs.forEach((input: any) => {
      const type = input.dataset.type;
      const isRequired = JSON.parse(input.dataset.required);
      const value = input.value;
      const name = input.name;
      const label = findParent(input, "js-form-label");
      const obj: FormItem = {
        isValid: true,
        name,
        value,
      };
      if (isRequired) {
        switch (type) {
          case "phone":
            obj.isValid = Validation.validatePhone(value);
            break;
          case "email":
            obj.isValid = Validation.validateEmail(value);
            break;
          case "text":
            obj.isValid = Validation.validateText(value);
            break;
        }
      }

      if (!obj.isValid) {
        result = false;
        label.classList.add("invalid");
      } else {
        label.classList.remove("invalid");
      }
      this.data.push(obj);
    });

    console.log(this.data);

    return result;
  }
}

export default class FormFabric {
  static initFactory(selector: string) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => {
      new Form(el as HTMLElement);
    });
  }
}
