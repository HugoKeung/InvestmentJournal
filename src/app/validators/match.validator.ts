import { AbstractControl, ValidatorFn } from "@angular/forms";

export class MatchValidator{
    static inArray (array: string[]): ValidatorFn{
        return (c: AbstractControl): {[key: string]: boolean} | null=>  {
            let input = c.value;
            if (array.indexOf(input)>-1){
                return null;
            }
            else return {'inArray': true};
        }
    }


}
