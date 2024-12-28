import {Modal} from "../../../js/classes/Modal";
import ModalFabric from "../../../js/classes/Modal";
import {Form} from "../../components/form/form";
import Slider from "../../../js/classes/Slider";
import {ModalNewsInfoItem} from "./modal-news.interfaces";
class ModalNews extends Modal {
    contentHolder: HTMLElement | Element | null = null;
    init() {
        this.contentHolder = this.element?.querySelector('.js-content-inner');
        super.init();
    }
    public open(id: string = "") {
        super.open();
        document.body.classList.add("active-news-modal");
    }
    public close() {
        super.close();
        document.body.classList.remove("active-news-modal");
    }

    protected onClick() {
        this.toggleButtons.forEach(button => {
            button.addEventListener("click", (e) => {

                this.resetButton = document.querySelector(".js-modal-reset");
                e.preventDefault();
                const content = (button as HTMLElement).dataset.markup;
                if(this.element.classList.contains("active")) {
                    this.resetButton?.classList.remove("active");
                    this.close();
                } else {
                    this.resetButton?.classList.add("active");

                    if(content) {
                        this.setContent(JSON.parse(content))
                        this.open();
                    }
                }
            })
        })
    }
    protected setContent(content: ModalNewsInfoItem) {
        this.contentHolder = this.element?.querySelector('.js-content-inner');
        const titleElement = this.contentHolder?.querySelector('.js-news-title');
        const imgElement = this.contentHolder?.querySelector('.js-news-img img');
        const dateElement = this.contentHolder?.querySelector('.js-news-date');
        const leftContentElement = this.contentHolder?.querySelector('.js-news-left');
        const rightContentElement = this.contentHolder?.querySelector('.js-news-right');
        const {title, img, date, leftContent, rightContent} = content;
        if(this.contentHolder) {
            if(titleElement) {
                titleElement.textContent = title;
            }
            if(dateElement) {
                dateElement.textContent = date;
            }
            if(leftContentElement) {
                leftContentElement.innerHTML = leftContent;
            }
            if(rightContentElement) {
                rightContentElement.innerHTML = rightContent;
            }
            if(imgElement) {
                imgElement.setAttribute('src', img);
            }
        }
    }
}



export class ModalNewsSlider extends Slider {
    constructor(selector = ".js-news-slider") {
        super(selector);
    }
    init() {
        super.init();
    }
    bindOptions() {
        super.bindOptions({
            loop: true,
            slidesPerView: 1,
            spaceBetween: 20,
            speed: 1000,
            navigation: {
                nextEl: `${this.buttonNext}`,
                prevEl: `${this.buttonPrev}`,
            }
        });
    }
}


export default class ModalNewsFabric extends ModalFabric{
    static initFactory(selector: string) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            new ModalNews((el as HTMLElement));
        })
    }
}