import { Directive, forwardRef, Attribute } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
export class MatchValidator {
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
}
MatchValidator.decorators = [
    { type: Directive, args: [{
                selector: '[tm-match][formControlName],[tm-match][formControl],[tm-match][ngModel]',
                providers: [
                    { provide: NG_VALIDATORS, useExisting: forwardRef(() => MatchValidator), multi: true }
                ]
            },] }
];
MatchValidator.ctorParameters = () => [
    { type: String, decorators: [{ type: Attribute, args: ['tm-match',] }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0Y2gtdmFsaWRhdG9yLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi9wcm9qZWN0cy90d2EtbWQyLWRpYWxvZ3Mvc3JjLyIsInNvdXJjZXMiOlsibGliL3Byb21wdC1kaWFsb2cvbWF0Y2gtdmFsaWRhdG9yLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakUsT0FBTyxFQUE4QixhQUFhLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQU8zRSxNQUFNLE9BQU8sY0FBYztJQUN2QixZQUEyQyxLQUFhO1FBQWIsVUFBSyxHQUFMLEtBQUssQ0FBUTtJQUFHLENBQUM7SUFFNUQsUUFBUSxDQUFDLENBQWtCO1FBQ3ZCLG9DQUFvQztRQUNwQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBRWxCLGdDQUFnQztRQUNoQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFakMsa0JBQWtCO1FBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFO1lBQ3BCLE9BQU87Z0JBQ0gsS0FBSyxFQUFFLEtBQUs7YUFDZixDQUFDO1NBQ0w7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDOzs7WUF2QkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSx5RUFBeUU7Z0JBQ25GLFNBQVMsRUFBRTtvQkFDUCxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxjQUFjLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFO2lCQUN6RjthQUNKOzs7eUNBRWlCLFNBQVMsU0FBQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBmb3J3YXJkUmVmLCBBdHRyaWJ1dGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZhbGlkYXRvciwgQWJzdHJhY3RDb250cm9sLCBOR19WQUxJREFUT1JTIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdG0tbWF0Y2hdW2Zvcm1Db250cm9sTmFtZV0sW3RtLW1hdGNoXVtmb3JtQ29udHJvbF0sW3RtLW1hdGNoXVtuZ01vZGVsXScsXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogTkdfVkFMSURBVE9SUywgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWF0Y2hWYWxpZGF0b3IpLCBtdWx0aTogdHJ1ZSB9XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBNYXRjaFZhbGlkYXRvciBpbXBsZW1lbnRzIFZhbGlkYXRvciB7XG4gICAgY29uc3RydWN0b3IoIEBBdHRyaWJ1dGUoJ3RtLW1hdGNoJykgcHVibGljIG1hdGNoOiBzdHJpbmcpIHt9XG5cbiAgICB2YWxpZGF0ZShjOiBBYnN0cmFjdENvbnRyb2wpOiB7IFtrZXk6IHN0cmluZ106IGFueSB9IHtcbiAgICAgICAgLy8gc2VsZiB2YWx1ZSAoZS5nLiByZXR5cGUgcGFzc3dvcmQpXG4gICAgICAgIGNvbnN0IHYgPSBjLnZhbHVlO1xuXG4gICAgICAgIC8vIGNvbnRyb2wgdmFsdWUgKGUuZy4gcGFzc3dvcmQpXG4gICAgICAgIGNvbnN0IGUgPSBjLnJvb3QuZ2V0KHRoaXMubWF0Y2gpO1xuXG4gICAgICAgIC8vIHZhbHVlIG5vdCBlcXVhbFxuICAgICAgICBpZiAoZSAmJiB2ICE9PSBlLnZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIG1hdGNoOiBmYWxzZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59XG4iXX0=