import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
@Directive({
    selector: '[tm-match][formControlName],[tm-match][formControl],[tm-match][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => MatchValidator), multi: true }
    ]
})
export class MatchValidator implements Validator {
    constructor( @Attribute('tm-match') public match: string) {}

    validate(c: AbstractControl): { [key: string]: any } {
        // self value (e.g. retype password)
        const v = c.value;

        // control value (e.g. password)
        const e = c.root.get(this.match);

        // value not equal
        if (e && v !== e.value) {
            return {
                match: false
            };
        }
        return null;
    }
}
