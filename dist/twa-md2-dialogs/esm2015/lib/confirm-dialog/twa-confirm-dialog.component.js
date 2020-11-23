import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
let TWAConfirmDialogComponent = class TWAConfirmDialogComponent {
    constructor(dialogRef) {
        this.dialogRef = dialogRef;
    }
};
TWAConfirmDialogComponent.ctorParameters = () => [
    { type: MatDialogRef }
];
TWAConfirmDialogComponent = __decorate([
    Component({
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
    }),
    __metadata("design:paramtypes", [MatDialogRef])
], TWAConfirmDialogComponent);
export { TWAConfirmDialogComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdhLWNvbmZpcm0tZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3R3YS1tZDItZGlhbG9ncy8iLCJzb3VyY2VzIjpbImxpYi9jb25maXJtLWRpYWxvZy90d2EtY29uZmlybS1kaWFsb2cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQWtCeEQsSUFBYSx5QkFBeUIsR0FBdEMsTUFBYSx5QkFBeUI7SUFRbEMsWUFBbUIsU0FBa0Q7UUFBbEQsY0FBUyxHQUFULFNBQVMsQ0FBeUM7SUFFckUsQ0FBQztDQUNKLENBQUE7O1lBSGlDLFlBQVk7O0FBUmpDLHlCQUF5QjtJQWZyQyxTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsd0JBQXdCO1FBQ2xDLHNEQUFzRDtRQUN0RCxxREFBcUQ7UUFDckQsUUFBUSxFQUFFOzs7Ozs7OztLQVFUO0tBQ0osQ0FBQztxQ0FVZ0MsWUFBWTtHQVJqQyx5QkFBeUIsQ0FXckM7U0FYWSx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdERpYWxvZ1JlZiB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBTYWZlSHRtbCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3R3YS1hcHAtY29uZmlybS1kaWFsb2cnLFxuICAgIC8vIHRlbXBsYXRlVXJsOiAnLi90d2EtY29uZmlybS1kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxuICAgIC8vIHN0eWxlVXJsczogWycuL3R3YS1jb25maXJtLWRpYWxvZy5jb21wb25lbnQuY3NzJ10sXG4gICAgdGVtcGxhdGU6IGBcbiAgICA8aDI+e3sgdGl0bGUgfX08L2gyPlxuICAgIDxwIFtpbm5lckh0bWxdPVwibWVzc2FnZUh0bWxcIj48L3A+XG5cbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBtYXQtcmFpc2VkLWJ1dHRvblxuICAgICAgICAoY2xpY2spPVwiZGlhbG9nUmVmLmNsb3NlKHRydWUpXCI+e3sgb2tUZXh0IH19PC9idXR0b24+XG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbWF0LWJ1dHRvbiAqbmdJZj1cImNhbmNlbFRleHQgPiAnJ1wiXG4gICAgICAgIChjbGljayk9XCJkaWFsb2dSZWYuY2xvc2UoKVwiPnt7IGNhbmNlbFRleHQgfX08L2J1dHRvbj5cbiAgICBgXG59KVxuXG5leHBvcnQgY2xhc3MgVFdBQ29uZmlybURpYWxvZ0NvbXBvbmVudCB7XG5cbiAgICBwdWJsaWMgdGl0bGU6IHN0cmluZztcbiAgICBwdWJsaWMgbWVzc2FnZTogc3RyaW5nO1xuICAgIHB1YmxpYyBtZXNzYWdlSHRtbDogU2FmZUh0bWw7XG4gICAgcHVibGljIG9rVGV4dDogc3RyaW5nO1xuICAgIHB1YmxpYyBjYW5jZWxUZXh0OiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8VFdBQ29uZmlybURpYWxvZ0NvbXBvbmVudD4pIHtcblxuICAgIH1cbn1cbiJdfQ==