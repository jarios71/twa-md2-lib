import { MatDialogRef } from '@angular/material';
import { SafeHtml } from '@angular/platform-browser';
export declare class TWAConfirmDialogComponent {
    dialogRef: MatDialogRef<TWAConfirmDialogComponent>;
    title: string;
    message: string;
    messageHtml: SafeHtml;
    okText: string;
    cancelText: string;
    constructor(dialogRef: MatDialogRef<TWAConfirmDialogComponent>);
}
