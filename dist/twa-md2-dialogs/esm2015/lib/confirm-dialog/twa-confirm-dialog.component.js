/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
export class TWAConfirmDialogComponent {
    /**
     * @param {?} dialogRef
     */
    constructor(dialogRef) {
        this.dialogRef = dialogRef;
    }
}
TWAConfirmDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'twa-app-confirm-dialog',
                // templateUrl: './twa-confirm-dialog.component.html',
                // styleUrls: ['./twa-confirm-dialog.component.css'],
                template: `
    <h2>{{ title }}</h2>
    <p [innerHtml]="messageHtml"></p>

    <button type="button" mat-raised-button
        (click)="dialogRef.close(true)">{{ okText }}</button>
    <button type="button" mat-button *ngIf="cancelText > ''"
        (click)="dialogRef.close()">{{ cancelText }}</button>
    `
            },] },
];
/** @nocollapse */
TWAConfirmDialogComponent.ctorParameters = () => [
    { type: MatDialogRef }
];
function TWAConfirmDialogComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    TWAConfirmDialogComponent.prototype.title;
    /** @type {?} */
    TWAConfirmDialogComponent.prototype.message;
    /** @type {?} */
    TWAConfirmDialogComponent.prototype.messageHtml;
    /** @type {?} */
    TWAConfirmDialogComponent.prototype.okText;
    /** @type {?} */
    TWAConfirmDialogComponent.prototype.cancelText;
    /** @type {?} */
    TWAConfirmDialogComponent.prototype.dialogRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdhLWNvbmZpcm0tZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3R3YS1tZDItZGlhbG9ncy8iLCJzb3VyY2VzIjpbImxpYi9jb25maXJtLWRpYWxvZy90d2EtY29uZmlybS1kaWFsb2cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQWtCakQsTUFBTTs7OztJQVFGLFlBQW1CLFNBQWtEO1FBQWxELGNBQVMsR0FBVCxTQUFTLENBQXlDO0tBRXBFOzs7WUF6QkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSx3QkFBd0I7OztnQkFHbEMsUUFBUSxFQUFFOzs7Ozs7OztLQVFUO2FBQ0o7Ozs7WUFoQlEsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nUmVmIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgU2FmZUh0bWwgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd0d2EtYXBwLWNvbmZpcm0tZGlhbG9nJyxcbiAgICAvLyB0ZW1wbGF0ZVVybDogJy4vdHdhLWNvbmZpcm0tZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcbiAgICAvLyBzdHlsZVVybHM6IFsnLi90d2EtY29uZmlybS1kaWFsb2cuY29tcG9uZW50LmNzcyddLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgPGgyPnt7IHRpdGxlIH19PC9oMj5cbiAgICA8cCBbaW5uZXJIdG1sXT1cIm1lc3NhZ2VIdG1sXCI+PC9wPlxuXG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbWF0LXJhaXNlZC1idXR0b25cbiAgICAgICAgKGNsaWNrKT1cImRpYWxvZ1JlZi5jbG9zZSh0cnVlKVwiPnt7IG9rVGV4dCB9fTwvYnV0dG9uPlxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG1hdC1idXR0b24gKm5nSWY9XCJjYW5jZWxUZXh0ID4gJydcIlxuICAgICAgICAoY2xpY2spPVwiZGlhbG9nUmVmLmNsb3NlKClcIj57eyBjYW5jZWxUZXh0IH19PC9idXR0b24+XG4gICAgYFxufSlcblxuZXhwb3J0IGNsYXNzIFRXQUNvbmZpcm1EaWFsb2dDb21wb25lbnQge1xuXG4gICAgcHVibGljIHRpdGxlOiBzdHJpbmc7XG4gICAgcHVibGljIG1lc3NhZ2U6IHN0cmluZztcbiAgICBwdWJsaWMgbWVzc2FnZUh0bWw6IFNhZmVIdG1sO1xuICAgIHB1YmxpYyBva1RleHQ6IHN0cmluZztcbiAgICBwdWJsaWMgY2FuY2VsVGV4dDogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPFRXQUNvbmZpcm1EaWFsb2dDb21wb25lbnQ+KSB7XG5cbiAgICB9XG59XG4iXX0=