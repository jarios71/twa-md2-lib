import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { MatchValidator } from './prompt-dialog/match-validator.directive';
import { TWADialogsComponent } from './twa-dialogs.component';
import { TWAConfirmDialogComponent } from './confirm-dialog/twa-confirm-dialog.component';
import { TWAPromptDialogComponent } from './prompt-dialog/twa-prompt-dialog.component';
// import { TWADialogsService } from './twa-dialogs.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatRadioModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    NgxMaterialTimepickerModule,
  ],
  declarations: [
    // TWADialogsModule,
    TWADialogsComponent,
    TWAConfirmDialogComponent,
    TWAPromptDialogComponent,
    MatchValidator,
  ],
  exports: [
    // TWADialogsModule,
    TWAConfirmDialogComponent,
    TWAPromptDialogComponent
  ],
  // entryComponents: [TWAConfirmDialogComponent, TWAPromptDialogComponent],
  providers: [
    TWADialogsModule,
    TWAConfirmDialogComponent,
    TWAPromptDialogComponent
  ]
})
@Injectable({
    providedIn: 'root'
})
export class TWADialogsModule {
  constructor(
      private dialog: MatDialog,
      private _sanitizer: DomSanitizer
    ) {}

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
    dialogRef.componentInstance.messageHtml = this._sanitizer.bypassSecurityTrustHtml(message);
    dialogRef.componentInstance.okText = okText || 'Aceptar';
    dialogRef.componentInstance.cancelText = cancelText || '';

    return dialogRef.afterClosed();
  }

  public prompt(
    title: string,
    message: string,
    fields: any,
    okText?: string,
    cancelText?: string,
    onChanges?: any,
  ): Observable<any> {
    let dialogRef: MatDialogRef<TWAPromptDialogComponent>;

    dialogRef = this.dialog.open(TWAPromptDialogComponent);

    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;
    dialogRef.componentInstance.messageHtml = this._sanitizer.bypassSecurityTrustHtml(message);
    dialogRef.componentInstance.fields = fields;
    dialogRef.componentInstance.okText = okText || 'Aceptar';
    dialogRef.componentInstance.cancelText = cancelText || 'Cancelar';
    dialogRef.componentInstance.onChanges = onChanges || false;

    // onSubmit = dialogRef.componentInstance.getFormSubmitEv().subscribe(item => {
    //     dialogRef.componentInstance.result = item;
    // });

    return dialogRef.afterClosed();
  }
}
