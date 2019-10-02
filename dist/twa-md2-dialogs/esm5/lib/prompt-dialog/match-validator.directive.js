/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, forwardRef, Attribute } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
var MatchValidator = /** @class */ (function () {
    function MatchValidator(match) {
        this.match = match;
    }
    /**
     * @param {?} c
     * @return {?}
     */
    MatchValidator.prototype.validate = /**
     * @param {?} c
     * @return {?}
     */
    function (c) {
        // self value (e.g. retype password)
        /** @type {?} */
        var v = c.value;
        // control value (e.g. password)
        /** @type {?} */
        var e = c.root.get(this.match);
        // value not equal
        if (e && v !== e.value) {
            return {
                match: false
            };
        }
        return null;
    };
    MatchValidator.decorators = [
        { type: Directive, args: [{
                    selector: '[tm-match][formControlName],[tm-match][formControl],[tm-match][ngModel]',
                    providers: [
                        { provide: NG_VALIDATORS, useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return MatchValidator; })), multi: true }
                    ]
                },] }
    ];
    /** @nocollapse */
    MatchValidator.ctorParameters = function () { return [
        { type: String, decorators: [{ type: Attribute, args: ['tm-match',] }] }
    ]; };
    return MatchValidator;
}());
export { MatchValidator };
if (false) {
    /** @type {?} */
    MatchValidator.prototype.match;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0Y2gtdmFsaWRhdG9yLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3R3YS1tZDItZGlhbG9ncy8iLCJzb3VyY2VzIjpbImxpYi9wcm9tcHQtZGlhbG9nL21hdGNoLXZhbGlkYXRvci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRSxPQUFPLEVBQThCLGFBQWEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNFO0lBT0ksd0JBQTJDLEtBQWE7UUFBYixVQUFLLEdBQUwsS0FBSyxDQUFRO0lBQUcsQ0FBQzs7Ozs7SUFFNUQsaUNBQVE7Ozs7SUFBUixVQUFTLENBQWtCOzs7WUFFakIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLOzs7WUFHWCxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUVoQyxrQkFBa0I7UUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUU7WUFDcEIsT0FBTztnQkFDSCxLQUFLLEVBQUUsS0FBSzthQUNmLENBQUM7U0FDTDtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7O2dCQXZCSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLHlFQUF5RTtvQkFDbkYsU0FBUyxFQUFFO3dCQUNQLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsVUFBVTs7OzRCQUFDLGNBQU0sT0FBQSxjQUFjLEVBQWQsQ0FBYyxFQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRTtxQkFDekY7aUJBQ0o7Ozs7NkNBRWlCLFNBQVMsU0FBQyxVQUFVOztJQWlCdEMscUJBQUM7Q0FBQSxBQXhCRCxJQXdCQztTQWxCWSxjQUFjOzs7SUFDViwrQkFBMkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIGZvcndhcmRSZWYsIEF0dHJpYnV0ZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmFsaWRhdG9yLCBBYnN0cmFjdENvbnRyb2wsIE5HX1ZBTElEQVRPUlMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1t0bS1tYXRjaF1bZm9ybUNvbnRyb2xOYW1lXSxbdG0tbWF0Y2hdW2Zvcm1Db250cm9sXSxbdG0tbWF0Y2hdW25nTW9kZWxdJyxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiBOR19WQUxJREFUT1JTLCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNYXRjaFZhbGlkYXRvciksIG11bHRpOiB0cnVlIH1cbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE1hdGNoVmFsaWRhdG9yIGltcGxlbWVudHMgVmFsaWRhdG9yIHtcbiAgICBjb25zdHJ1Y3RvciggQEF0dHJpYnV0ZSgndG0tbWF0Y2gnKSBwdWJsaWMgbWF0Y2g6IHN0cmluZykge31cblxuICAgIHZhbGlkYXRlKGM6IEFic3RyYWN0Q29udHJvbCk6IHsgW2tleTogc3RyaW5nXTogYW55IH0ge1xuICAgICAgICAvLyBzZWxmIHZhbHVlIChlLmcuIHJldHlwZSBwYXNzd29yZClcbiAgICAgICAgY29uc3QgdiA9IGMudmFsdWU7XG5cbiAgICAgICAgLy8gY29udHJvbCB2YWx1ZSAoZS5nLiBwYXNzd29yZClcbiAgICAgICAgY29uc3QgZSA9IGMucm9vdC5nZXQodGhpcy5tYXRjaCk7XG5cbiAgICAgICAgLy8gdmFsdWUgbm90IGVxdWFsXG4gICAgICAgIGlmIChlICYmIHYgIT09IGUudmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgbWF0Y2g6IGZhbHNlXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn1cbiJdfQ==