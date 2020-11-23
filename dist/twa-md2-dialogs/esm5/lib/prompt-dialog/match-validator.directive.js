import { __decorate, __metadata, __param } from "tslib";
import { Directive, forwardRef, Attribute } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
var MatchValidator = /** @class */ (function () {
    function MatchValidator(match) {
        this.match = match;
    }
    MatchValidator_1 = MatchValidator;
    MatchValidator.prototype.validate = function (c) {
        // self value (e.g. retype password)
        var v = c.value;
        // control value (e.g. password)
        var e = c.root.get(this.match);
        // value not equal
        if (e && v !== e.value) {
            return {
                match: false
            };
        }
        return null;
    };
    var MatchValidator_1;
    MatchValidator.ctorParameters = function () { return [
        { type: String, decorators: [{ type: Attribute, args: ['tm-match',] }] }
    ]; };
    MatchValidator = MatchValidator_1 = __decorate([
        Directive({
            selector: '[tm-match][formControlName],[tm-match][formControl],[tm-match][ngModel]',
            providers: [
                { provide: NG_VALIDATORS, useExisting: forwardRef(function () { return MatchValidator_1; }), multi: true }
            ]
        }),
        __param(0, Attribute('tm-match')),
        __metadata("design:paramtypes", [String])
    ], MatchValidator);
    return MatchValidator;
}());
export { MatchValidator };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0Y2gtdmFsaWRhdG9yLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3R3YS1tZDItZGlhbG9ncy8iLCJzb3VyY2VzIjpbImxpYi9wcm9tcHQtZGlhbG9nL21hdGNoLXZhbGlkYXRvci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRSxPQUFPLEVBQThCLGFBQWEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBTzNFO0lBQ0ksd0JBQTJDLEtBQWE7UUFBYixVQUFLLEdBQUwsS0FBSyxDQUFRO0lBQUcsQ0FBQzt1QkFEbkQsY0FBYztJQUd2QixpQ0FBUSxHQUFSLFVBQVMsQ0FBa0I7UUFDdkIsb0NBQW9DO1FBQ3BDLElBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFFbEIsZ0NBQWdDO1FBQ2hDLElBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVqQyxrQkFBa0I7UUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUU7WUFDcEIsT0FBTztnQkFDSCxLQUFLLEVBQUUsS0FBSzthQUNmLENBQUM7U0FDTDtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7Ozs2Q0FoQmEsU0FBUyxTQUFDLFVBQVU7O0lBRHpCLGNBQWM7UUFOMUIsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLHlFQUF5RTtZQUNuRixTQUFTLEVBQUU7Z0JBQ1AsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLGdCQUFjLEVBQWQsQ0FBYyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRTthQUN6RjtTQUNKLENBQUM7UUFFZ0IsV0FBQSxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUE7O09BRDFCLGNBQWMsQ0FrQjFCO0lBQUQscUJBQUM7Q0FBQSxBQWxCRCxJQWtCQztTQWxCWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBmb3J3YXJkUmVmLCBBdHRyaWJ1dGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZhbGlkYXRvciwgQWJzdHJhY3RDb250cm9sLCBOR19WQUxJREFUT1JTIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdG0tbWF0Y2hdW2Zvcm1Db250cm9sTmFtZV0sW3RtLW1hdGNoXVtmb3JtQ29udHJvbF0sW3RtLW1hdGNoXVtuZ01vZGVsXScsXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogTkdfVkFMSURBVE9SUywgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWF0Y2hWYWxpZGF0b3IpLCBtdWx0aTogdHJ1ZSB9XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBNYXRjaFZhbGlkYXRvciBpbXBsZW1lbnRzIFZhbGlkYXRvciB7XG4gICAgY29uc3RydWN0b3IoIEBBdHRyaWJ1dGUoJ3RtLW1hdGNoJykgcHVibGljIG1hdGNoOiBzdHJpbmcpIHt9XG5cbiAgICB2YWxpZGF0ZShjOiBBYnN0cmFjdENvbnRyb2wpOiB7IFtrZXk6IHN0cmluZ106IGFueSB9IHtcbiAgICAgICAgLy8gc2VsZiB2YWx1ZSAoZS5nLiByZXR5cGUgcGFzc3dvcmQpXG4gICAgICAgIGNvbnN0IHYgPSBjLnZhbHVlO1xuXG4gICAgICAgIC8vIGNvbnRyb2wgdmFsdWUgKGUuZy4gcGFzc3dvcmQpXG4gICAgICAgIGNvbnN0IGUgPSBjLnJvb3QuZ2V0KHRoaXMubWF0Y2gpO1xuXG4gICAgICAgIC8vIHZhbHVlIG5vdCBlcXVhbFxuICAgICAgICBpZiAoZSAmJiB2ICE9PSBlLnZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIG1hdGNoOiBmYWxzZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59XG4iXX0=