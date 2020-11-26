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
import { DomSanitizer } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/dialog";
import * as i2 from "@angular/platform-browser";
export class TWADialogsModule {
    constructor(dialog, _sanitizer) {
        this.dialog = dialog;
        this._sanitizer = _sanitizer;
    }
    confirm(title, message, okText, cancelText) {
        let dialogRef;
        dialogRef = this.dialog.open(TWAConfirmDialogComponent);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;
        dialogRef.componentInstance.messageHtml = this._sanitizer.bypassSecurityTrustHtml(message);
        dialogRef.componentInstance.okText = okText || 'Aceptar';
        dialogRef.componentInstance.cancelText = cancelText || '';
        return dialogRef.afterClosed();
    }
    prompt(title, message, fields, okText, cancelText) {
        let dialogRef;
        dialogRef = this.dialog.open(TWAPromptDialogComponent);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;
        dialogRef.componentInstance.messageHtml = this._sanitizer.bypassSecurityTrustHtml(message);
        dialogRef.componentInstance.fields = fields;
        dialogRef.componentInstance.okText = okText || 'Aceptar';
        dialogRef.componentInstance.cancelText = cancelText || 'Cancelar';
        // onSubmit = dialogRef.componentInstance.getFormSubmitEv().subscribe(item => {
        //     dialogRef.componentInstance.result = item;
        // });
        return dialogRef.afterClosed();
    }
}
TWADialogsModule.ɵprov = i0.ɵɵdefineInjectable({ factory: function TWADialogsModule_Factory() { return new TWADialogsModule(i0.ɵɵinject(i1.MatDialog), i0.ɵɵinject(i2.DomSanitizer)); }, token: TWADialogsModule, providedIn: "root" });
TWADialogsModule.decorators = [
    { type: NgModule, args: [{
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
            },] },
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
TWADialogsModule.ctorParameters = () => [
    { type: MatDialog },
    { type: DomSanitizer }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdhLWRpYWxvZ3MubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uL3Byb2plY3RzL3R3YS1tZDItZGlhbG9ncy9zcmMvIiwic291cmNlcyI6WyJsaWIvdHdhLWRpYWxvZ3MubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDekQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzNELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDbkUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDN0QsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFFdkUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQzFGLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3ZGLDZEQUE2RDtBQUM3RCxPQUFPLEVB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QkFDRCwwRUFBMEU7Z0JBQzFFLFNBQVMsRUFBRTtvQkFDVCxnQkFBZ0I7b0JBQ2hCLHlCQUF5QjtvQkFDekIsd0JBQXdCO2lCQUN6QjthQUNGO1lBQ0EsVUFBVSxTQUFDO2dCQUNSLFVBQVUsRUFBRSxNQUFNO2FBQ3JCOzs7WUF6Q1EsU0FBUztZQUpULFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZsZXhMYXlvdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mbGV4LWxheW91dCc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE1hdElucHV0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaW5wdXQnO1xuaW1wb3J0IHsgTWF0Q2hlY2tib3hNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jaGVja2JveCc7XG5pbXBvcnQgeyBNYXRTZWxlY3RNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zZWxlY3QnO1xuaW1wb3J0IHsgTWF0UmFkaW9Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9yYWRpbyc7XG5pbXBvcnQgeyBNYXRJY29uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaWNvbic7XG5pbXBvcnQgeyBNYXREYXRlcGlja2VyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGF0ZXBpY2tlcic7XG5pbXBvcnQgeyBNYXROYXRpdmVEYXRlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQgeyBNYXRBdXRvY29tcGxldGVNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9hdXRvY29tcGxldGUnO1xuXG5pbXBvcnQgeyBNYXRjaFZhbGlkYXRvciB9IGZyb20gJy4vcHJvbXB0LWRpYWxvZy9tYXRjaC12YWxpZGF0b3IuZGlyZWN0aXZlJztcbmltcG9ydCB7IFRXQURpYWxvZ3NDb21wb25lbnQgfSBmcm9tICcuL3R3YS1kaWFsb2dzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUV0FDb25maXJtRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi9jb25maXJtLWRpYWxvZy90d2EtY29uZmlybS1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IFRXQVByb21wdERpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vcHJvbXB0LWRpYWxvZy90d2EtcHJvbXB0LWRpYWxvZy5jb21wb25lbnQnO1xuLy8gaW1wb3J0IHsgVFdBRGlhbG9nc1NlcnZpY2UgfSBmcm9tICcuL3R3YS1kaWFsb2dzLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYnV0dG9uJztcbmltcG9ydCB7IE1hdERpYWxvZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJNb2R1bGUgfSBmcm9tICduZ3gtbWF0ZXJpYWwtdGltZXBpY2tlcic7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIsIFNhZmVIdG1sIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE1hdERpYWxvZywgTWF0RGlhbG9nUmVmIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGbGV4TGF5b3V0TW9kdWxlLFxuICAgIE1hdERpYWxvZ01vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICBNYXRDaGVja2JveE1vZHVsZSxcbiAgICBNYXRTZWxlY3RNb2R1bGUsXG4gICAgTWF0UmFkaW9Nb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXREYXRlcGlja2VyTW9kdWxlLFxuICAgIE1hdE5hdGl2ZURhdGVNb2R1bGUsXG4gICAgTWF0QXV0b2NvbXBsZXRlTW9kdWxlLFxuICAgIE5neE1hdGVyaWFsVGltZXBpY2tlck1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgLy8gVFdBRGlhbG9nc01vZHVsZSxcbiAgICBUV0FEaWFsb2dzQ29tcG9uZW50LFxuICAgIFRXQUNvbmZpcm1EaWFsb2dDb21wb25lbnQsXG4gICAgVFdBUHJvbXB0RGlhbG9nQ29tcG9uZW50LFxuICAgIE1hdGNoVmFsaWRhdG9yLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgLy8gVFdBRGlhbG9nc01vZHVsZSxcbiAgICBUV0FDb25maXJtRGlhbG9nQ29tcG9uZW50LFxuICAgIFRXQVByb21wdERpYWxvZ0NvbXBvbmVudFxuICBdLFxuICAvLyBlbnRyeUNvbXBvbmVudHM6IFtUV0FDb25maXJtRGlhbG9nQ29tcG9uZW50LCBUV0FQcm9tcHREaWFsb2dDb21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtcbiAgICBUV0FEaWFsb2dzTW9kdWxlLFxuICAgIFRXQUNvbmZpcm1EaWFsb2dDb21wb25lbnQsXG4gICAgVFdBUHJvbXB0RGlhbG9nQ29tcG9uZW50XG4gIF1cbn0pXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFRXQURpYWxvZ3NNb2R1bGUge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgZGlhbG9nOiBNYXREaWFsb2csXG4gICAgICBwcml2YXRlIF9zYW5pdGl6ZXI6IERvbVNhbml0aXplclxuICAgICkge31cblxuICBwdWJsaWMgY29uZmlybShcbiAgICB0aXRsZTogc3RyaW5nLFxuICAgIG1lc3NhZ2U6IHN0cmluZyxcbiAgICBva1RleHQ/OiBzdHJpbmcsXG4gICAgY2FuY2VsVGV4dD86IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGxldCBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxUV0FDb25maXJtRGlhbG9nQ29tcG9uZW50PjtcblxuICAgIGRpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nLm9wZW4oVFdBQ29uZmlybURpYWxvZ0NvbXBvbmVudCk7XG5cbiAgICBkaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UudGl0bGUgPSB0aXRsZTtcbiAgICBkaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLm1lc3NhZ2VIdG1sID0gdGhpcy5fc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKG1lc3NhZ2UpO1xuICAgIGRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5va1RleHQgPSBva1RleHQgfHwgJ0FjZXB0YXInO1xuICAgIGRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5jYW5jZWxUZXh0ID0gY2FuY2VsVGV4dCB8fCAnJztcblxuICAgIHJldHVybiBkaWFsb2dSZWYuYWZ0ZXJDbG9zZWQoKTtcbiAgfVxuXG4gIHB1YmxpYyBwcm9tcHQoXG4gICAgdGl0bGU6IHN0cmluZyxcbiAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgZmllbGRzOiBhbnksXG4gICAgb2tUZXh0Pzogc3RyaW5nLFxuICAgIGNhbmNlbFRleHQ/OiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBsZXQgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8VFdBUHJvbXB0RGlhbG9nQ29tcG9uZW50PjtcblxuICAgIGRpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nLm9wZW4oVFdBUHJvbXB0RGlhbG9nQ29tcG9uZW50KTtcblxuICAgIGRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS50aXRsZSA9IHRpdGxlO1xuICAgIGRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICBkaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UubWVzc2FnZUh0bWwgPSB0aGlzLl9zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwobWVzc2FnZSk7XG4gICAgZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLmZpZWxkcyA9IGZpZWxkcztcbiAgICBkaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2Uub2tUZXh0ID0gb2tUZXh0IHx8ICdBY2VwdGFyJztcbiAgICBkaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UuY2FuY2VsVGV4dCA9IGNhbmNlbFRleHQgfHwgJ0NhbmNlbGFyJztcblxuICAgIC8vIG9uU3VibWl0ID0gZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLmdldEZvcm1TdWJtaXRFdigpLnN1YnNjcmliZShpdGVtID0+IHtcbiAgICAvLyAgICAgZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLnJlc3VsdCA9IGl0ZW07XG4gICAgLy8gfSk7XG5cbiAgICByZXR1cm4gZGlhbG9nUmVmLmFmdGVyQ2xvc2VkKCk7XG4gIH1cbn1cbiJdfQ==