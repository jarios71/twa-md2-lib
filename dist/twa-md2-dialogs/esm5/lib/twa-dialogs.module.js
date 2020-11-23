import { __decorate, __metadata } from "tslib";
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
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/dialog";
import * as i2 from "@angular/platform-browser";
var TWADialogsModule = /** @class */ (function () {
    function TWADialogsModule(dialog, _sanitizer) {
        this.dialog = dialog;
        this._sanitizer = _sanitizer;
    }
    TWADialogsModule_1 = TWADialogsModule;
    TWADialogsModule.prototype.confirm = function (title, message, okText, cancelText) {
        var dialogRef;
        dialogRef = this.dialog.open(TWAConfirmDialogComponent);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;
        dialogRef.componentInstance.messageHtml = this._sanitizer.bypassSecurityTrustHtml(message);
        dialogRef.componentInstance.okText = okText || 'Aceptar';
        dialogRef.componentInstance.cancelText = cancelText || '';
        return dialogRef.afterClosed();
    };
    TWADialogsModule.prototype.prompt = function (title, message, fields, okText, cancelText) {
        var dialogRef;
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
    };
    var TWADialogsModule_1;
    TWADialogsModule.ctorParameters = function () { return [
        { type: MatDialog },
        { type: DomSanitizer }
    ]; };
    TWADialogsModule.ɵprov = i0.ɵɵdefineInjectable({ factory: function TWADialogsModule_Factory() { return new TWADialogsModule(i0.ɵɵinject(i1.MatDialog), i0.ɵɵinject(i2.DomSanitizer)); }, token: TWADialogsModule, providedIn: "root" });
    TWADialogsModule = TWADialogsModule_1 = __decorate([
        NgModule({
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
            entryComponents: [TWAConfirmDialogComponent, TWAPromptDialogComponent],
            providers: [
                TWADialogsModule_1,
                TWAConfirmDialogComponent,
                TWAPromptDialogComponent
            ]
        }),
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [MatDialog,
            DomSanitizer])
    ], TWADialogsModule);
    return TWADialogsModule;
}());
export { TWADialogsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdhLWRpYWxvZ3MubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdHdhLW1kMi1kaWFsb2dzLyIsInNvdXJjZXMiOlsibGliL3R3YS1kaWFsb2dzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNuRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM3RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUV2RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDM0UsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDMUYsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDdkYsNkRBQTZEO0FBQzdELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFB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Q1Asb0JBQW9CO2dCQUNwQix5QkFBeUI7Z0JBQ3pCLHdCQUF3QjthQUN6QjtZQUNELGVBQWUsRUFBRSxDQUFDLHlCQUF5QixFQUFFLHdCQUF3QixDQUFDO1lBQ3RFLFNBQVMsRUFBRTtnQkFDVCxrQkFBZ0I7Z0JBQ2hCLHlCQUF5QjtnQkFDekIsd0JBQXdCO2FBQ3pCO1NBQ0YsQ0FBQztRQUNELFVBQVUsQ0FBQztZQUNSLFVBQVUsRUFBRSxNQUFNO1NBQ3JCLENBQUM7eUNBR29CLFNBQVM7WUFDTCxZQUFZO09BSHpCLGdCQUFnQixDQWlENUI7MkJBcEhEO0NBb0hDLEFBakRELElBaURDO1NBakRZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTWF0SW5wdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pbnB1dCc7XG5pbXBvcnQgeyBNYXRDaGVja2JveE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NoZWNrYm94JztcbmltcG9ydCB7IE1hdFNlbGVjdE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NlbGVjdCc7XG5pbXBvcnQgeyBNYXRSYWRpb01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3JhZGlvJztcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pY29uJztcbmltcG9ydCB7IE1hdERhdGVwaWNrZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kYXRlcGlja2VyJztcbmltcG9ydCB7IE1hdE5hdGl2ZURhdGVNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7IE1hdEF1dG9jb21wbGV0ZU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2F1dG9jb21wbGV0ZSc7XG5cbmltcG9ydCB7IE1hdGNoVmFsaWRhdG9yIH0gZnJvbSAnLi9wcm9tcHQtZGlhbG9nL21hdGNoLXZhbGlkYXRvci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVFdBRGlhbG9nc0NvbXBvbmVudCB9IGZyb20gJy4vdHdhLWRpYWxvZ3MuY29tcG9uZW50JztcbmltcG9ydCB7IFRXQUNvbmZpcm1EaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL2NvbmZpcm0tZGlhbG9nL3R3YS1jb25maXJtLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgVFdBUHJvbXB0RGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi9wcm9tcHQtZGlhbG9nL3R3YS1wcm9tcHQtZGlhbG9nLmNvbXBvbmVudCc7XG4vLyBpbXBvcnQgeyBUV0FEaWFsb2dzU2VydmljZSB9IGZyb20gJy4vdHdhLWRpYWxvZ3Muc2VydmljZSc7XG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24nO1xuaW1wb3J0IHsgTWF0RGlhbG9nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7IE5neE1hdGVyaWFsVGltZXBpY2tlck1vZHVsZSB9IGZyb20gJ25neC1tYXRlcmlhbC10aW1lcGlja2VyJztcbmltcG9ydCB7IERvbVNhbml0aXplciwgU2FmZUh0bWwgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTWF0RGlhbG9nLCBNYXREaWFsb2dSZWYgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZsZXhMYXlvdXRNb2R1bGUsXG4gICAgTWF0RGlhbG9nTW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlLFxuICAgIE1hdENoZWNrYm94TW9kdWxlLFxuICAgIE1hdFNlbGVjdE1vZHVsZSxcbiAgICBNYXRSYWRpb01vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdERhdGVwaWNrZXJNb2R1bGUsXG4gICAgTWF0TmF0aXZlRGF0ZU1vZHVsZSxcbiAgICBNYXRBdXRvY29tcGxldGVNb2R1bGUsXG4gICAgTmd4TWF0ZXJpYWxUaW1lcGlja2VyTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICAvLyBUV0FEaWFsb2dzTW9kdWxlLFxuICAgIFRXQURpYWxvZ3NDb21wb25lbnQsXG4gICAgVFdBQ29uZmlybURpYWxvZ0NvbXBvbmVudCxcbiAgICBUV0FQcm9tcHREaWFsb2dDb21wb25lbnQsXG4gICAgTWF0Y2hWYWxpZGF0b3IsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICAvLyBUV0FEaWFsb2dzTW9kdWxlLFxuICAgIFRXQUNvbmZpcm1EaWFsb2dDb21wb25lbnQsXG4gICAgVFdBUHJvbXB0RGlhbG9nQ29tcG9uZW50XG4gIF0sXG4gIGVudHJ5Q29tcG9uZW50czogW1RXQUNvbmZpcm1EaWFsb2dDb21wb25lbnQsIFRXQVByb21wdERpYWxvZ0NvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW1xuICAgIFRXQURpYWxvZ3NNb2R1bGUsXG4gICAgVFdBQ29uZmlybURpYWxvZ0NvbXBvbmVudCxcbiAgICBUV0FQcm9tcHREaWFsb2dDb21wb25lbnRcbiAgXVxufSlcbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgVFdBRGlhbG9nc01vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBkaWFsb2c6IE1hdERpYWxvZyxcbiAgICAgIHByaXZhdGUgX3Nhbml0aXplcjogRG9tU2FuaXRpemVyXG4gICAgKSB7fVxuXG4gIHB1YmxpYyBjb25maXJtKFxuICAgIHRpdGxlOiBzdHJpbmcsXG4gICAgbWVzc2FnZTogc3RyaW5nLFxuICAgIG9rVGV4dD86IHN0cmluZyxcbiAgICBjYW5jZWxUZXh0Pzogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgbGV0IGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPFRXQUNvbmZpcm1EaWFsb2dDb21wb25lbnQ+O1xuXG4gICAgZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihUV0FDb25maXJtRGlhbG9nQ29tcG9uZW50KTtcblxuICAgIGRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS50aXRsZSA9IHRpdGxlO1xuICAgIGRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICBkaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UubWVzc2FnZUh0bWwgPSB0aGlzLl9zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwobWVzc2FnZSk7XG4gICAgZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLm9rVGV4dCA9IG9rVGV4dCB8fCAnQWNlcHRhcic7XG4gICAgZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLmNhbmNlbFRleHQgPSBjYW5jZWxUZXh0IHx8ICcnO1xuXG4gICAgcmV0dXJuIGRpYWxvZ1JlZi5hZnRlckNsb3NlZCgpO1xuICB9XG5cbiAgcHVibGljIHByb21wdChcbiAgICB0aXRsZTogc3RyaW5nLFxuICAgIG1lc3NhZ2U6IHN0cmluZyxcbiAgICBmaWVsZHM6IGFueSxcbiAgICBva1RleHQ/OiBzdHJpbmcsXG4gICAgY2FuY2VsVGV4dD86IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGxldCBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxUV0FQcm9tcHREaWFsb2dDb21wb25lbnQ+O1xuXG4gICAgZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihUV0FQcm9tcHREaWFsb2dDb21wb25lbnQpO1xuXG4gICAgZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLnRpdGxlID0gdGl0bGU7XG4gICAgZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIGRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5tZXNzYWdlSHRtbCA9IHRoaXMuX3Nhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0SHRtbChtZXNzYWdlKTtcbiAgICBkaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UuZmllbGRzID0gZmllbGRzO1xuICAgIGRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5va1RleHQgPSBva1RleHQgfHwgJ0FjZXB0YXInO1xuICAgIGRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5jYW5jZWxUZXh0ID0gY2FuY2VsVGV4dCB8fCAnQ2FuY2VsYXInO1xuXG4gICAgLy8gb25TdWJtaXQgPSBkaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UuZ2V0Rm9ybVN1Ym1pdEV2KCkuc3Vic2NyaWJlKGl0ZW0gPT4ge1xuICAgIC8vICAgICBkaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UucmVzdWx0ID0gaXRlbTtcbiAgICAvLyB9KTtcblxuICAgIHJldHVybiBkaWFsb2dSZWYuYWZ0ZXJDbG9zZWQoKTtcbiAgfVxufVxuIl19