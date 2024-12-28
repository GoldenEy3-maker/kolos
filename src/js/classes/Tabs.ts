abstract class ITabs {
    tabsList: any;
    tabs: any;
}
export default class Tabs extends ITabs {

    constructor(selector = ".js-tabs") {
        super();
        this.tabsList = document.querySelector(selector);
        this.tabs = this.tabsList?.querySelectorAll(`${selector}-item`);
        this.init();
    }
    init() {
        if(!this.tabsList) return false;
        this.onClick();
    }

    onClick() {
        this.tabs.forEach((item: any) => {
            item.addEventListener("click", (e: Event) => {
                const link = (e.target as any);
                if(!link.href) {
                    if(this.isTabActive(item)) {
                        this.closeTab(item);
                    } else {
                        this.closeAllTabs();
                        this.openTab(item);
                    }
                }
                
            });
        });
    }
    isTabActive(tab: any) {
        return !!tab.classList.contains("active");
    }
    closeTab(tab: any) {
        tab.classList.remove("active");
    }
    openTab(tab: any) {
        tab.classList.add("active");
    }
    closeAllTabs() {
        this.tabs.forEach((item: any) => {
            item.classList.remove("active");
        });
    }
}
class TwoTabs {
    selector: string;
    elements: NodeListOf<Element>
    constructor(selector = ".js-tabs") {
        this.selector = selector;
        this.elements = document.querySelectorAll(this.selector);
        this.init();
    }
    init(): TwoTabs | boolean {
        if(!this.elements.length) return false;
        this.elements.forEach((element) => {
            const items = element.querySelectorAll(`${this.selector}-item`);
            items.forEach(item => {
                const toggle = item.querySelector(`${this.selector}-toggle`);

                this.setEventListener(toggle, item);
            }) 
        })
        return this;
    }

    setEventListener(toggle: Element | null, item: Element | null) {
        toggle?.addEventListener("click", () => {
            if(this.isTabOpen(item)) {
                this.hideTab(item)
            } else {
                this.openTab(item)
            }
        })
    }
    isTabOpen(item: Element | null) {
        return item?.classList.contains("active");
    }
    hideTab(item: Element | null) {
        item?.classList.remove("active");
    }
    openTab(item: Element | null) {
        item?.classList.add("active");
    }
}


export const TabsInit = () => {
    new TwoTabs();
}