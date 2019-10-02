/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, forwardRef, Attribute } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
export class MatchValidator {
    /**
     * @param {?} match
     */
    constructor(match) {
        this.match = match;
    }
    /**
     * @param {?} c
     * @return {?}
     */
    validate(c) {
        // self value (e.g. retype password)
        /** @type {?} */
        const v = c.value;
        // control value (e.g. password)
        /** @type {?} */
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
MatchValidator.decorators = [
    { type: Directive, args: [{
                selector: '[tm-match][formControlName],[tm-match][formControl],[tm-match][ngModel]',
                providers: [
                    { provide: NG_VALIDATORS, useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => MatchValidator)), multi: true }
                ]
            },] }
];
/** @nocollapse */
MatchValidator.ctorParameters = () => [
    { type: String, decorators: [{ type: Attribute, args: ['tm-match',] }] }
];
if (false) {
    /** @type {?} */
    MatchValidator.prototype.match;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0Y2gtdmFsaWRhdG9yLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3R3YS1tZDItZGlhbG9ncy8iLCJzb3VyY2VzIjpbImxpYi9wcm9tcHQtZGlhbG9nL21hdGNoLXZhbGlkYXRvci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRSxPQUFPLEVBQThCLGFBQWEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBTzNFLE1BQU0sT0FBTyxjQUFjOzs7O0lBQ3ZCLFlBQTJDLEtBQWE7UUFBYixVQUFLLEdBQUwsS0FBSyxDQUFRO0lBQUcsQ0FBQzs7Ozs7SUFFNUQsUUFBUSxDQUFDLENBQWtCOzs7Y0FFakIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLOzs7Y0FHWCxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUVoQyxrQkFBa0I7UUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUU7WUFDcEIsT0FBTztnQkFDSCxLQUFLLEVBQUUsS0FBSzthQUNmLENBQUM7U0FDTDtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7OztZQXZCSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHlFQUF5RTtnQkFDbkYsU0FBUyxFQUFFO29CQUNQLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsVUFBVTs7O3dCQUFDLEdBQUcsRUFBRSxDQUFDLGNBQWMsRUFBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7aUJBQ3pGO2FBQ0o7Ozs7eUNBRWlCLFNBQVMsU0FBQyxVQUFVOzs7O0lBQXJCLCtCQUEyQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgZm9yd2FyZFJlZiwgQXR0cmlidXRlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBWYWxpZGF0b3IsIEFic3RyYWN0Q29udHJvbCwgTkdfVkFMSURBVE9SUyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3RtLW1hdGNoXVtmb3JtQ29udHJvbE5hbWVdLFt0bS1tYXRjaF1bZm9ybUNvbnRyb2xdLFt0bS1tYXRjaF1bbmdNb2RlbF0nLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1hdGNoVmFsaWRhdG9yKSwgbXVsdGk6IHRydWUgfVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgTWF0Y2hWYWxpZGF0b3IgaW1wbGVtZW50cyBWYWxpZGF0b3Ige1xuICAgIGNvbnN0cnVjdG9yKCBAQXR0cmlidXRlKCd0bS1tYXRjaCcpIHB1YmxpYyBtYXRjaDogc3RyaW5nKSB7fVxuXG4gICAgdmFsaWRhdGUoYzogQWJzdHJhY3RDb250cm9sKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSB7XG4gICAgICAgIC8vIHNlbGYgdmFsdWUgKGUuZy4gcmV0eXBlIHBhc3N3b3JkKVxuICAgICAgICBjb25zdCB2ID0gYy52YWx1ZTtcblxuICAgICAgICAvLyBjb250cm9sIHZhbHVlIChlLmcuIHBhc3N3b3JkKVxuICAgICAgICBjb25zdCBlID0gYy5yb290LmdldCh0aGlzLm1hdGNoKTtcblxuICAgICAgICAvLyB2YWx1ZSBub3QgZXF1YWxcbiAgICAgICAgaWYgKGUgJiYgdiAhPT0gZS52YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBtYXRjaDogZmFsc2VcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufVxuIl19