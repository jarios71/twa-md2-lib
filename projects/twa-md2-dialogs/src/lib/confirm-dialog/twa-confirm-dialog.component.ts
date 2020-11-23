import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SafeHtml } from '@angular/platform-browser';

@Component({
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
})

export class TWAConfirmDialogComponent {

    public title: string;
    public message: string;
    public messageHtml: SafeHtml;
    public okText: string;
    public cancelText: string;

    constructor(public dialogRef: MatDialogRef<TWAConfirmDialogComponent>) {

    }
}
