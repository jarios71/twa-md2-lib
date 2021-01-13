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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdhLWRpYWxvZ3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uL3Byb2plY3RzL3R3YS1tZDItZGlhbG9ncy9zcmMvIiwic291cmNlcyI6WyJsaWIvdHdhLWRpYWxvZ3MuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFNbEQsTUFBTSxPQUFPLG1CQUFtQjtJQUpoQztRQUtFLFlBQU8sR0FBRyxPQUFPLENBQUM7SUFRcEIsQ0FBQztJQU5DLFFBQVE7UUFDTixVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLE9BQU8sSUFBSSxRQUFRLENBQUM7UUFDM0IsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2IsQ0FBQzs7O1lBWEEsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLFFBQVEsRUFBRSxhQUFhO2FBQ3hCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZXhhbXBsZS1jb21wb25lbnQnLFxuICB0ZW1wbGF0ZTogJ3t7bWVzc2FnZX19J1xufSlcbmV4cG9ydCBjbGFzcyBUV0FEaWFsb2dzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgbWVzc2FnZSA9ICdIZWxsbyc7XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLm1lc3NhZ2UgKz0gJyBXb3JsZCc7XG4gICAgfSwgMTAwMCk7XG59XG5cbn1cbiJdfQ==