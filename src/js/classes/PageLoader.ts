export default class PageLoader {
    constructor() {
        this.init();
    }

    init() {
        this.onScroll();
        const windowTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        document.querySelectorAll('section').forEach(item => {
            if (!item.classList.contains('showItems') && windowTop + windowHeight >= item.offsetTop + (windowHeight / 6)) {
                item.classList.add('showItems')
            }
        })
    }

    onScroll() {
        window.addEventListener('scroll', () => {
            const windowTop = window.pageYOffset;
            const windowHeight = window.innerHeight;

            document.querySelectorAll('section').forEach(item => {
                if (!item.classList.contains('showItems') && windowTop + windowHeight >= item.offsetTop + (windowHeight / 6)) {
                    item.classList.add('showItems')
                }
            })
        })
    }
}
