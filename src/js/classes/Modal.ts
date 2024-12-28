export class Modal {
  element: HTMLElement | Element;
  toggleButtons: NodeListOf<Element>;
  name: string;
  // closeButton: Element | null;
  resetButton: Element | null;

  constructor(element: HTMLElement) {
    this.element = element;
    this.name = element.dataset.name || "";
    this.toggleButtons = document.querySelectorAll(
      `[data-button='${this.name}']:not(.js-modal-reset)`,
    );
    this.resetButton = document.querySelector(".js-modal-reset");
    this.init();
  }

  protected init(): void {
    this.onClick();
    this.onClickModalMenuItem();
    this.onReset();
  }
  protected onClick() {
    this.toggleButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        this.resetButton = document.querySelector(".js-modal-reset");
        e.preventDefault();
        if (this.element.classList.contains("active")) {
          this.resetButton?.classList.remove("active");
          this.close((button as HTMLElement).dataset.id);
        } else {
          this.resetButton?.classList.add("active");
          this.open((button as HTMLElement).dataset.id);
        }
      });
    });
  }

  onReset() {
    const modals = document.querySelectorAll(
      ".js-modal, .js-modal-form, .js-modal-news",
    );

    document
      .querySelector(".js-modal-reset")
      ?.replaceWith(
        (document.querySelector(".js-modal-reset") as Node)?.cloneNode(true),
      );
    this.resetButton = document.querySelector(".js-modal-reset");
    this.resetButton?.addEventListener("click", (e) => {
      e.preventDefault();

      if (this.name !== "modal-menu") {
        this.resetButton?.classList.remove("active");
        this.close();
      } else {
        let closeFunc = false;

        modals.forEach((i) => {
          if (i.classList.contains("active")) {
            closeFunc = true;
          }
        });
        if (closeFunc) {
          this.close();
          this.resetButton?.classList.remove("active");
          if (document.querySelector(".js-form-modal")) {
            document
              .querySelector(".js-form-modal")
              ?.setAttribute("data-dopinfo", "");
          }
          modals.forEach((i) => {
            i.classList.remove("active");
          });
        } else {
          this.resetButton?.classList.add("active");

          this.open();
        }
      }
    });
  }
  public open(id: string = "") {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.setProperty("--scrollbar-width", `${scrollbarWidth}px`);
    this.element.classList.add("active");
    document.body.classList.add("active-modal");
  }
  public close(id: string = "") {
    this.element.classList.remove("active");
    document.body.classList.remove("active-modal");
    // document.body.style.removeProperty("--scrollbar-width");
  }

  public onClickModalMenuItem() {
    if (this.name === "modal-menu") {
      const menuItems: NodeListOf<Element> = this.element.querySelectorAll(
        ".modal-menu__item a",
      );
      menuItems.forEach((i) => {
        i.addEventListener("click", (e) => {
          this.close();
          this.resetButton?.classList.remove("active");
        });
      });
    }
  }
}

export default class ModalFabric {
  static initFactory(selector: string) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => {
      new Modal(el as HTMLElement);
    });
  }
}
