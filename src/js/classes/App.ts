export default class App {
    init(func: any) {
        document.addEventListener("DOMContentLoaded", function (event) {
            func();
        });
    }
}