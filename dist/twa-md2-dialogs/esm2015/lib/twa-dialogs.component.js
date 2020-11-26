import { Component } from '@angular/core';
export class TWADialogsComponent {
    constructor() {
        this.message = 'Hello';
    }
    ngOnInit() {
        setTimeout(() => {
            this.message += ' World';
        }, 1000);
    }
}
TWADialogsComponent.decorators = [
    { type: Component, args: [{
                selector: 'example-component',
                template: '{{message}}'
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdhLWRpYWxvZ3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uL3Byb2plY3RzL3R3YS1tZDItZGlhbG9ncy9zcmMvIiwic291cmNlcyI6WyJsaWIvdHdhLWRpYWxvZ3MuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFNbEQsTUFBTSxPQUFPLG1CQUFtQjtJQUpoQztRQUtDLFlBQU8sR0FBRyxPQUFPLENBQUM7SUFRbkIsQ0FBQztJQU5BLFFBQVE7UUFDUCxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2YsSUFBSSxDQUFDLE9BQU8sSUFBSSxRQUFRLENBQUM7UUFDMUIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ1YsQ0FBQzs7O1lBWEQsU0FBUyxTQUFDO2dCQUNWLFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLFFBQVEsRUFBRSxhQUFhO2FBQ3ZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiAnZXhhbXBsZS1jb21wb25lbnQnLFxuXHR0ZW1wbGF0ZTogJ3t7bWVzc2FnZX19J1xufSlcbmV4cG9ydCBjbGFzcyBUV0FEaWFsb2dzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblx0bWVzc2FnZSA9ICdIZWxsbyc7XG5cblx0bmdPbkluaXQoKSB7XG5cdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHR0aGlzLm1lc3NhZ2UgKz0gJyBXb3JsZCc7XG5cdFx0fSwgMTAwMCk7XG5cdH1cblxufVxuIl19