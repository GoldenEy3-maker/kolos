export const findParent = (el: any, parentClass: String) => {
    let parent  = el.parentNode;

    try {
        for(let i = 0; i < 100; i++) {
            if(parent.classList.contains(parentClass)) {
                return parent;
            } else {
                parent = parent.parentNode;
            }
        }
    } catch(err) {
    }
}