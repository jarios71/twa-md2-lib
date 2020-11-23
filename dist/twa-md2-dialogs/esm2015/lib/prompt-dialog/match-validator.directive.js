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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0Y2gtdmFsaWRhdG9yLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS5vbGQvam9zZS93b3JrL3NpcmEuZXMvc2lyYS1uZzItY29tcG9uZW50cy9saWItdHdhLW1kL3Byb2plY3RzL3R3YS1tZDItZGlhbG9ncy9zcmMvIiwic291cmNlcyI6WyJsaWIvcHJvbXB0LWRpYWxvZy9tYXRjaC12YWxpZGF0b3IuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRSxPQUFPLEVBQThCLGFBQWEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBTzNFLE1BQU0sT0FBTyxjQUFjO0lBQ3ZCLFlBQTJDLEtBQWE7UUFBYixVQUFLLEdBQUwsS0FBSyxDQUFRO0lBQUcsQ0FBQztJQUU1RCxRQUFRLENBQUMsQ0FBa0I7UUFDdkIsb0NBQW9DO1FBQ3BDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFFbEIsZ0NBQWdDO1FBQ2hDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVqQyxrQkFBa0I7UUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUU7WUFDcEIsT0FBTztnQkFDSCxLQUFLLEVBQUUsS0FBSzthQUNmLENBQUM7U0FDTDtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7OztZQXZCSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHlFQUF5RTtnQkFDbkYsU0FBUyxFQUFFO29CQUNQLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7aUJBQ3pGO2FBQ0o7Ozt5Q0FFaUIsU0FBUyxTQUFDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIGZvcndhcmRSZWYsIEF0dHJpYnV0ZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmFsaWRhdG9yLCBBYnN0cmFjdENvbnRyb2wsIE5HX1ZBTElEQVRPUlMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1t0bS1tYXRjaF1bZm9ybUNvbnRyb2xOYW1lXSxbdG0tbWF0Y2hdW2Zvcm1Db250cm9sXSxbdG0tbWF0Y2hdW25nTW9kZWxdJyxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiBOR19WQUxJREFUT1JTLCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNYXRjaFZhbGlkYXRvciksIG11bHRpOiB0cnVlIH1cbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE1hdGNoVmFsaWRhdG9yIGltcGxlbWVudHMgVmFsaWRhdG9yIHtcbiAgICBjb25zdHJ1Y3RvciggQEF0dHJpYnV0ZSgndG0tbWF0Y2gnKSBwdWJsaWMgbWF0Y2g6IHN0cmluZykge31cblxuICAgIHZhbGlkYXRlKGM6IEFic3RyYWN0Q29udHJvbCk6IHsgW2tleTogc3RyaW5nXTogYW55IH0ge1xuICAgICAgICAvLyBzZWxmIHZhbHVlIChlLmcuIHJldHlwZSBwYXNzd29yZClcbiAgICAgICAgY29uc3QgdiA9IGMudmFsdWU7XG5cbiAgICAgICAgLy8gY29udHJvbCB2YWx1ZSAoZS5nLiBwYXNzd29yZClcbiAgICAgICAgY29uc3QgZSA9IGMucm9vdC5nZXQodGhpcy5tYXRjaCk7XG5cbiAgICAgICAgLy8gdmFsdWUgbm90IGVxdWFsXG4gICAgICAgIGlmIChlICYmIHYgIT09IGUudmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgbWF0Y2g6IGZhbHNlXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn1cbiJdfQ==