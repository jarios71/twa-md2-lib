import { __decorate } from "tslib";
import { Component } from '@angular/core';
let TWADialogsComponent = class TWADialogsComponent {
    constructor() {
        this.message = 'Hello';
    }
    ngOnInit() {
        setTimeout(() => {
            this.message += ' World';
        }, 1000);
    }
};
TWADialogsComponent = __decorate([
    Component({
        selector: 'example-component',
        template: '{{message}}'
    })
], TWADialogsComponent);
export { TWADialogsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdhLWRpYWxvZ3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vdHdhLW1kMi1kaWFsb2dzLyIsInNvdXJjZXMiOlsibGliL3R3YS1kaWFsb2dzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQU1sRCxJQUFhLG1CQUFtQixHQUFoQyxNQUFhLG1CQUFtQjtJQUFoQztRQUNDLFlBQU8sR0FBRyxPQUFPLENBQUM7SUFRbkIsQ0FBQztJQU5BLFFBQVE7UUFDUCxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2YsSUFBSSxDQUFDLE9BQU8sSUFBSSxRQUFRLENBQUM7UUFDMUIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ1YsQ0FBQztDQUVELENBQUE7QUFUWSxtQkFBbUI7SUFKL0IsU0FBUyxDQUFDO1FBQ1YsUUFBUSxFQUFFLG1CQUFtQjtRQUM3QixRQUFRLEVBQUUsYUFBYTtLQUN2QixDQUFDO0dBQ1csbUJBQW1CLENBUy9CO1NBVFksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiAnZXhhbXBsZS1jb21wb25lbnQnLFxuXHR0ZW1wbGF0ZTogJ3t7bWVzc2FnZX19J1xufSlcbmV4cG9ydCBjbGFzcyBUV0FEaWFsb2dzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblx0bWVzc2FnZSA9ICdIZWxsbyc7XG5cblx0bmdPbkluaXQoKSB7XG5cdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHR0aGlzLm1lc3NhZ2UgKz0gJyBXb3JsZCc7XG5cdFx0fSwgMTAwMCk7XG5cdH1cblxufVxuIl19