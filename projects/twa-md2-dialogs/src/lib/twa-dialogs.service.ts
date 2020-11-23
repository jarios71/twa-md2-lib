import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { TWAConfirmDialogComponent } from "./confirm-dialog/twa-confirm-dialog.component";
import { TWAPromptDialogComponent } from "./prompt-dialog/twa-prompt-dialog.component";

@Injectable({
    providedIn: 'root'
})
export class TWADialogsService {
  constructor(private dialog: MatDialog) {}

  public confirm(
    title: string,
    message: string,
    okText?: string,
    cancelText?: string
  ): Observable<any> {
    let dialogRef: MatDialogRef<TWAConfirmDialogComponent>;

    dialogRef = this.dialog.open(TWAConfirmDialogComponent);

    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;
    dialogRef.componentInstance.okText = okText || 'Aceptar';
    dialogRef.componentInstance.cancelText = cancelText || '';

    return dialogRef.afterClosed();
  }

  public prompt(
    title: string,
    message: string,
    fields: any,
    okText?: string,
    cancelText?: string
  ): Observable<any> {
    let dialogRef: MatDialogRef<TWAPromptDialogComponent>;

    dialogRef = this.dialog.open(TWAPromptDialogComponent);

    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;
    dialogRef.componentInstance.fields = fields;
    dialogRef.componentInstance.okText = okText || "Aceptar";
    dialogRef.componentInstance.cancelText = cancelText || "";

    // onSubmit = dialogRef.componentInstance.getFormSubmitEv().subscribe(item => {
    //     dialogRef.componentInstance.result = item;
    // });

    return dialogRef.afterClosed();
  }
}
