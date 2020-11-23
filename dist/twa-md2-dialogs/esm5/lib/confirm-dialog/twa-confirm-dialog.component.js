import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
var TWAConfirmDialogComponent = /** @class */ (function () {
    function TWAConfirmDialogComponent(dialogRef) {
        this.dialogRef = dialogRef;
    }
    TWAConfirmDialogComponent.ctorParameters = function () { return [
        { type: MatDialogRef }
    ]; };
    TWAConfirmDialogComponent = __decorate([
        Component({
            selector: 'twa-app-confirm-dialog',
            // templateUrl: './twa-confirm-dialog.component.html',
            // styleUrls: ['./twa-confirm-dialog.component.css'],
            template: "\n    <h2>{{ title }}</h2>\n    <p [innerHtml]=\"messageHtml\"></p>\n\n    <button type=\"button\" mat-raised-button\n        (click)=\"dialogRef.close(true)\">{{ okText }}</button>\n    <button type=\"button\" mat-button *ngIf=\"cancelText > ''\"\n        (click)=\"dialogRef.close()\">{{ cancelText }}</button>\n    "
        }),
        __metadata("design:paramtypes", [MatDialogRef])
    ], TWAConfirmDialogComponent);
    return TWAConfirmDialogComponent;
}());
export { TWAConfirmDialogComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdhLWNvbmZpcm0tZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3R3YS1tZDItZGlhbG9ncy8iLCJzb3VyY2VzIjpbImxpYi9jb25maXJtLWRpYWxvZy90d2EtY29uZmlybS1kaWFsb2cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQWtCeEQ7SUFRSSxtQ0FBbUIsU0FBa0Q7UUFBbEQsY0FBUyxHQUFULFNBQVMsQ0FBeUM7SUFFckUsQ0FBQzs7Z0JBRjZCLFlBQVk7O0lBUmpDLHlCQUF5QjtRQWZyQyxTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsd0JBQXdCO1lBQ2xDLHNEQUFzRDtZQUN0RCxxREFBcUQ7WUFDckQsUUFBUSxFQUFFLGdVQVFUO1NBQ0osQ0FBQzt5Q0FVZ0MsWUFBWTtPQVJqQyx5QkFBeUIsQ0FXckM7SUFBRCxnQ0FBQztDQUFBLEFBWEQsSUFXQztTQVhZLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nUmVmIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7IFNhZmVIdG1sIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndHdhLWFwcC1jb25maXJtLWRpYWxvZycsXG4gICAgLy8gdGVtcGxhdGVVcmw6ICcuL3R3YS1jb25maXJtLWRpYWxvZy5jb21wb25lbnQuaHRtbCcsXG4gICAgLy8gc3R5bGVVcmxzOiBbJy4vdHdhLWNvbmZpcm0tZGlhbG9nLmNvbXBvbmVudC5jc3MnXSxcbiAgICB0ZW1wbGF0ZTogYFxuICAgIDxoMj57eyB0aXRsZSB9fTwvaDI+XG4gICAgPHAgW2lubmVySHRtbF09XCJtZXNzYWdlSHRtbFwiPjwvcD5cblxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG1hdC1yYWlzZWQtYnV0dG9uXG4gICAgICAgIChjbGljayk9XCJkaWFsb2dSZWYuY2xvc2UodHJ1ZSlcIj57eyBva1RleHQgfX08L2J1dHRvbj5cbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBtYXQtYnV0dG9uICpuZ0lmPVwiY2FuY2VsVGV4dCA+ICcnXCJcbiAgICAgICAgKGNsaWNrKT1cImRpYWxvZ1JlZi5jbG9zZSgpXCI+e3sgY2FuY2VsVGV4dCB9fTwvYnV0dG9uPlxuICAgIGBcbn0pXG5cbmV4cG9ydCBjbGFzcyBUV0FDb25maXJtRGlhbG9nQ29tcG9uZW50IHtcblxuICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xuICAgIHB1YmxpYyBtZXNzYWdlOiBzdHJpbmc7XG4gICAgcHVibGljIG1lc3NhZ2VIdG1sOiBTYWZlSHRtbDtcbiAgICBwdWJsaWMgb2tUZXh0OiBzdHJpbmc7XG4gICAgcHVibGljIGNhbmNlbFRleHQ6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxUV0FDb25maXJtRGlhbG9nQ29tcG9uZW50Pikge1xuXG4gICAgfVxufVxuIl19