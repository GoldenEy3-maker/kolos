export default class Load {
    selector: string;
    elements: NodeListOf<Element> | null ;
    container:   null | undefined | Element;
    limit: number | undefined;

    constructor(selector = ".js-load") {
        this.selector = selector;
        this.elements = document.querySelectorAll(this.selector);
        if(!this.elements.length) return;
        this.container = document.querySelector(`${this.selector} ${this.selector}-container`);
        if(!this.container) return;
        this.limit = Number((this.container as HTMLElement).dataset.limit);
    }
    init() {
        this.onClick();
    }
    enableElements(elements: NodeListOf<Element>, limit: number = 0): boolean {
        Array.from(elements).forEach((element, index) => {
            if(limit === 0) {
                element.classList.remove('hidden');
            } else {
                if(index < limit)
                    element.classList.remove('hidden');
            }
        })
        return elements.length <= limit || limit === 0;
    }
    onClick() {
        this.elements?.forEach((element: Element) => {
            const buttons = element.querySelectorAll(`${this.selector}-button`);
            buttons.forEach((button) => {
                this.setClickListener(button, element)
            })
        })
    }
    setClickListener(button: Element, wrapper: Element) {
        button.addEventListener("click", (e: Event) => {
            e.preventDefault();
            let result;
            if(wrapper.classList.contains(`js-load-all`)) {
                const hiddenElements = wrapper.querySelectorAll(`${this.selector}-hidden`);
                result = this.enableElements(hiddenElements);
            } else {
                result = this.enableElements((this.container as any).querySelectorAll('.hidden'), this.limit);
            }
            if(result) {
                button.remove();
            }
        })
    }
}