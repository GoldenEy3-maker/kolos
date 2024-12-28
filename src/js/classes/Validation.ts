
class ValidationInit {
    validatePhone(val: string): boolean {
        const regExp: RegExp =  /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
        return !!val.match(regExp);
    }
    validateEmail(val: string): boolean {
        const regExp =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return !!val.match(regExp);
    }
    validateText(val: string): boolean {
        return val.trim().length > 1;
    } 
}





const Validation = new ValidationInit();



export default Validation;