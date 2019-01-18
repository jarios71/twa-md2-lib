import { Validator, AbstractControl } from '@angular/forms';
export declare class MatchValidator implements Validator {
    match: string;
    constructor(match: string);
    validate(c: AbstractControl): {
        [key: string]: any;
    };
}
