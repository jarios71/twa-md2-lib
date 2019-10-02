/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            }] }
];
/** @nocollapse */
TWAConfirmDialogComponent.ctorParameters = () => [
    { type: MatDialogRef }
];
if (false) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdhLWNvbmZpcm0tZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3R3YS1tZDItZGlhbG9ncy8iLCJzb3VyY2VzIjpbImxpYi9jb25maXJtLWRpYWxvZy90d2EtY29uZmlybS1kaWFsb2cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQWtCakQsTUFBTSxPQUFPLHlCQUF5Qjs7OztJQVFsQyxZQUFtQixTQUFrRDtRQUFsRCxjQUFTLEdBQVQsU0FBUyxDQUF5QztJQUVyRSxDQUFDOzs7WUF6QkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSx3QkFBd0I7OztnQkFHbEMsUUFBUSxFQUFFOzs7Ozs7OztLQVFUO2FBQ0o7Ozs7WUFoQlEsWUFBWTs7OztJQW9CakIsMENBQXFCOztJQUNyQiw0Q0FBdUI7O0lBQ3ZCLGdEQUE2Qjs7SUFDN0IsMkNBQXNCOztJQUN0QiwrQ0FBMEI7O0lBRWQsOENBQXlEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXREaWFsb2dSZWYgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBTYWZlSHRtbCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3R3YS1hcHAtY29uZmlybS1kaWFsb2cnLFxuICAgIC8vIHRlbXBsYXRlVXJsOiAnLi90d2EtY29uZmlybS1kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxuICAgIC8vIHN0eWxlVXJsczogWycuL3R3YS1jb25maXJtLWRpYWxvZy5jb21wb25lbnQuY3NzJ10sXG4gICAgdGVtcGxhdGU6IGBcbiAgICA8aDI+e3sgdGl0bGUgfX08L2gyPlxuICAgIDxwIFtpbm5lckh0bWxdPVwibWVzc2FnZUh0bWxcIj48L3A+XG5cbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBtYXQtcmFpc2VkLWJ1dHRvblxuICAgICAgICAoY2xpY2spPVwiZGlhbG9nUmVmLmNsb3NlKHRydWUpXCI+e3sgb2tUZXh0IH19PC9idXR0b24+XG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbWF0LWJ1dHRvbiAqbmdJZj1cImNhbmNlbFRleHQgPiAnJ1wiXG4gICAgICAgIChjbGljayk9XCJkaWFsb2dSZWYuY2xvc2UoKVwiPnt7IGNhbmNlbFRleHQgfX08L2J1dHRvbj5cbiAgICBgXG59KVxuXG5leHBvcnQgY2xhc3MgVFdBQ29uZmlybURpYWxvZ0NvbXBvbmVudCB7XG5cbiAgICBwdWJsaWMgdGl0bGU6IHN0cmluZztcbiAgICBwdWJsaWMgbWVzc2FnZTogc3RyaW5nO1xuICAgIHB1YmxpYyBtZXNzYWdlSHRtbDogU2FmZUh0bWw7XG4gICAgcHVibGljIG9rVGV4dDogc3RyaW5nO1xuICAgIHB1YmxpYyBjYW5jZWxUZXh0OiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8VFdBQ29uZmlybURpYWxvZ0NvbXBvbmVudD4pIHtcblxuICAgIH1cbn1cbiJdfQ==