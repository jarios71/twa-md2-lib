var MatchValidator_1;
import { __decorate, __metadata, __param } from "tslib";
import { Directive, forwardRef, Attribute } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
let MatchValidator = MatchValidator_1 = class MatchValidator {
    constructor(match) {
        this.match = match;
    }
    validate(c) {
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
};
MatchValidator.ctorParameters = () => [
    { type: String, decorators: [{ type: Attribute, args: ['tm-match',] }] }
];
MatchValidator = MatchValidator_1 = __decorate([
    Directive({
        selector: '[tm-match][formControlName],[tm-match][formControl],[tm-match][ngModel]',
        providers: [
            { provide: NG_VALIDATORS, useExisting: forwardRef(() => MatchValidator_1), multi: true }
        ]
    }),
    __param(0, Attribute('tm-match')),
    __metadata("design:paramtypes", [String])
], MatchValidator);
export { MatchValidator };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0Y2gtdmFsaWRhdG9yLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3R3YS1tZDItZGlhbG9ncy8iLCJzb3VyY2VzIjpbImxpYi9wcm9tcHQtZGlhbG9nL21hdGNoLXZhbGlkYXRvci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakUsT0FBTyxFQUE4QixhQUFhLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQU8zRSxJQUFhLGNBQWMsc0JBQTNCLE1BQWEsY0FBYztJQUN2QixZQUEyQyxLQUFhO1FBQWIsVUFBSyxHQUFMLEtBQUssQ0FBUTtJQUFHLENBQUM7SUFFNUQsUUFBUSxDQUFDLENBQWtCO1FBQ3ZCLG9DQUFvQztRQUNwQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBRWxCLGdDQUFnQztRQUNoQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFakMsa0JBQWtCO1FBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFO1lBQ3BCLE9BQU87Z0JBQ0gsS0FBSyxFQUFFLEtBQUs7YUFDZixDQUFDO1NBQ0w7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQ0osQ0FBQTs7eUNBakJpQixTQUFTLFNBQUMsVUFBVTs7QUFEekIsY0FBYztJQU4xQixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUseUVBQXlFO1FBQ25GLFNBQVMsRUFBRTtZQUNQLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGdCQUFjLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFO1NBQ3pGO0tBQ0osQ0FBQztJQUVnQixXQUFBLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQTs7R0FEMUIsY0FBYyxDQWtCMUI7U0FsQlksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgZm9yd2FyZFJlZiwgQXR0cmlidXRlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBWYWxpZGF0b3IsIEFic3RyYWN0Q29udHJvbCwgTkdfVkFMSURBVE9SUyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3RtLW1hdGNoXVtmb3JtQ29udHJvbE5hbWVdLFt0bS1tYXRjaF1bZm9ybUNvbnRyb2xdLFt0bS1tYXRjaF1bbmdNb2RlbF0nLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1hdGNoVmFsaWRhdG9yKSwgbXVsdGk6IHRydWUgfVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgTWF0Y2hWYWxpZGF0b3IgaW1wbGVtZW50cyBWYWxpZGF0b3Ige1xuICAgIGNvbnN0cnVjdG9yKCBAQXR0cmlidXRlKCd0bS1tYXRjaCcpIHB1YmxpYyBtYXRjaDogc3RyaW5nKSB7fVxuXG4gICAgdmFsaWRhdGUoYzogQWJzdHJhY3RDb250cm9sKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSB7XG4gICAgICAgIC8vIHNlbGYgdmFsdWUgKGUuZy4gcmV0eXBlIHBhc3N3b3JkKVxuICAgICAgICBjb25zdCB2ID0gYy52YWx1ZTtcblxuICAgICAgICAvLyBjb250cm9sIHZhbHVlIChlLmcuIHBhc3N3b3JkKVxuICAgICAgICBjb25zdCBlID0gYy5yb290LmdldCh0aGlzLm1hdGNoKTtcblxuICAgICAgICAvLyB2YWx1ZSBub3QgZXF1YWxcbiAgICAgICAgaWYgKGUgJiYgdiAhPT0gZS52YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBtYXRjaDogZmFsc2VcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufVxuIl19