import { AbstractControl, ValidatorFn } from "@angular/forms";


export class DateValidators {
    static notFuture(c: AbstractControl): {[key: string]:boolean} | null {
        let inputDate = new Date(c.value).getTime();
        let today = new Date().getTime();
        if (inputDate>today){
            return {'dateValidate':true};
        }
        else return null;
    }
}