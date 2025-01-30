export default class FloatingButton {
  floatingButton: HTMLElement | null;
  firstSection: HTMLElement | null;

  constructor() {
    this.floatingButton = document.querySelector("[data-floating-button]");
    this.firstSection = document.querySelector("section.first");
    this.init();
  }

  init() {
    const floatingButton = this.floatingButton;
    const firstSection = this.firstSection;

    if (floatingButton && firstSection) {
      const firstSectionBottom =
        firstSection.offsetTop + firstSection.offsetHeight;

      const debounce = (fn: Function, ms = 300) => {
        let timeoutId: ReturnType<typeof setTimeout>;
        return function (this: any, ...args: any[]) {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => fn.apply(this, args), ms);
        };
      };

      document.addEventListener(
        "scroll",
        debounce(() => {
          if (window.scrollY > firstSectionBottom) {
            floatingButton.setAttribute("aria-hidden", "false");
          } else {
            floatingButton.setAttribute("aria-hidden", "true");
          }
        }, 150),
      );
    }
  }
}
