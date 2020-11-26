import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
export class TWAConfirmDialogComponent {
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
            },] }
];
TWAConfirmDialogComponent.ctorParameters = () => [
    { type: MatDialogRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdhLWNvbmZpcm0tZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi9wcm9qZWN0cy90d2EtbWQyLWRpYWxvZ3Mvc3JjLyIsInNvdXJjZXMiOlsibGliL2NvbmZpcm0tZGlhbG9nL3R3YS1jb25maXJtLWRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFrQnhELE1BQU0sT0FBTyx5QkFBeUI7SUFRbEMsWUFBbUIsU0FBa0Q7UUFBbEQsY0FBUyxHQUFULFNBQVMsQ0FBeUM7SUFFckUsQ0FBQzs7O1lBekJKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsd0JBQXdCO2dCQUNsQyxzREFBc0Q7Z0JBQ3RELHFEQUFxRDtnQkFDckQsUUFBUSxFQUFFOzs7Ozs7OztLQVFUO2FBQ0o7OztZQWhCUSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXREaWFsb2dSZWYgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHsgU2FmZUh0bWwgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd0d2EtYXBwLWNvbmZpcm0tZGlhbG9nJyxcbiAgICAvLyB0ZW1wbGF0ZVVybDogJy4vdHdhLWNvbmZpcm0tZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcbiAgICAvLyBzdHlsZVVybHM6IFsnLi90d2EtY29uZmlybS1kaWFsb2cuY29tcG9uZW50LmNzcyddLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgPGgyPnt7IHRpdGxlIH19PC9oMj5cbiAgICA8cCBbaW5uZXJIdG1sXT1cIm1lc3NhZ2VIdG1sXCI+PC9wPlxuXG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbWF0LXJhaXNlZC1idXR0b25cbiAgICAgICAgKGNsaWNrKT1cImRpYWxvZ1JlZi5jbG9zZSh0cnVlKVwiPnt7IG9rVGV4dCB9fTwvYnV0dG9uPlxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG1hdC1idXR0b24gKm5nSWY9XCJjYW5jZWxUZXh0ID4gJydcIlxuICAgICAgICAoY2xpY2spPVwiZGlhbG9nUmVmLmNsb3NlKClcIj57eyBjYW5jZWxUZXh0IH19PC9idXR0b24+XG4gICAgYFxufSlcblxuZXhwb3J0IGNsYXNzIFRXQUNvbmZpcm1EaWFsb2dDb21wb25lbnQge1xuXG4gICAgcHVibGljIHRpdGxlOiBzdHJpbmc7XG4gICAgcHVibGljIG1lc3NhZ2U6IHN0cmluZztcbiAgICBwdWJsaWMgbWVzc2FnZUh0bWw6IFNhZmVIdG1sO1xuICAgIHB1YmxpYyBva1RleHQ6IHN0cmluZztcbiAgICBwdWJsaWMgY2FuY2VsVGV4dDogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPFRXQUNvbmZpcm1EaWFsb2dDb21wb25lbnQ+KSB7XG5cbiAgICB9XG59XG4iXX0=