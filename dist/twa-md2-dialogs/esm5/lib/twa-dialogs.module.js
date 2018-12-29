/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TWAConfirmDialogComponent } from './confirm-dialog/twa-confirm-dialog.component';
import { TWAPromptDialogComponent } from './prompt-dialog/twa-prompt-dialog.component';
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { DomSanitizer } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
var TWADialogsModule = /** @class */ (function () {
    function TWADialogsModule(dialog, _sanitizer) {
        this.dialog = dialog;
        this._sanitizer = _sanitizer;
    }
    /**
     * @param {?} title
     * @param {?} message
     * @param {?=} okText
     * @param {?=} cancelText
     * @return {?}
     */
    TWADialogsModule.prototype.confirm = /**
     * @param {?} title
     * @param {?} message
     * @param {?=} okText
     * @param {?=} cancelText
     * @return {?}
     */
    function (title, message, okText, cancelText) {
        var /** @type {?} */ dialogRef;
        dialogRef = this.dialog.open(TWAConfirmDialogComponent);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;
        dialogRef.componentInstance.messageHtml = this._sanitizer.bypassSecurityTrustHtml(message);
        dialogRef.componentInstance.okText = okText || 'Aceptar';
        dialogRef.componentInstance.cancelText = cancelText || '';
        return dialogRef.afterClosed();
    };
    /**
     * @param {?} title
     * @param {?} message
     * @param {?} fields
     * @param {?=} okText
     * @param {?=} cancelText
     * @return {?}
     */
    TWADialogsModule.prototype.prompt = /**
     * @param {?} title
     * @param {?} message
     * @param {?} fields
     * @param {?=} okText
     * @param {?=} cancelText
     * @return {?}
     */
    function (title, message, fields, okText, cancelText) {
        var /** @type {?} */ dialogRef;
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
                        MatDatepickerModule,
                        MatNativeDateModule,
                        MatAutocompleteModule,
                        NgxMaterialTimepickerModule.forRoot(),
                    ],
                    declarations: [
                        TWAConfirmDialogComponent,
                        TWAPromptDialogComponent
                    ],
                    exports: [
                        TWAConfirmDialogComponent,
                        TWAPromptDialogComponent
                    ],
                    entryComponents: [TWAConfirmDialogComponent, TWAPromptDialogComponent],
                    providers: [
                        TWADialogsModule,
                        TWAConfirmDialogComponent,
                        TWAPromptDialogComponent
                    ]
                },] },
        { type: Injectable },
    ];
    /** @nocollapse */
    TWADialogsModule.ctorParameters = function () { return [
        { type: MatDialog },
        { type: DomSanitizer }
    ]; };
    return TWADialogsModule;
}());
export { TWADialogsModule };
function TWADialogsModule_tsickle_Closure_declarations() {
    /** @type {?} */
    TWADialogsModule.prototype.dialog;
    /** @type {?} */
    TWADialogsModule.prototype._sanitizer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdhLWRpYWxvZ3MubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdHdhLW1kMi1kaWFsb2dzLyIsInNvdXJjZXMiOlsibGliL3R3YS1kaWFsb2dzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ25FLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQzFGLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBRXZGLE9BQU8sRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDckUsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdEUsT0FBTyxFQUFFLFlBQVksRUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRW5FLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLFNBQVMsRUFBZ0IsTUFBTSxtQkFBbUIsQ0FBQzs7SUFzQzFELDBCQUNZLFFBQ0E7UUFEQSxXQUFNLEdBQU4sTUFBTTtRQUNOLGVBQVUsR0FBVixVQUFVO0tBQ2hCOzs7Ozs7OztJQUVDLGtDQUFPOzs7Ozs7O2NBQ1osS0FBYSxFQUNiLE9BQWUsRUFDZixNQUFlLEVBQ2YsVUFBbUI7UUFFbkIscUJBQUksU0FBa0QsQ0FBQztRQUV2RCxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQztRQUV4RCxTQUFTLENBQUMsaUJBQWlCLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUMxQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUM5QyxTQUFTLENBQUMsaUJBQWlCLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsdUJBQXVCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0YsU0FBUyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sR0FBRyxNQUFNLElBQUksU0FBUyxDQUFDO1FBQ3pELFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEdBQUcsVUFBVSxJQUFJLEVBQUUsQ0FBQztRQUUxRCxPQUFPLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7Ozs7Ozs7OztJQUcxQixpQ0FBTTs7Ozs7Ozs7Y0FDWCxLQUFhLEVBQ2IsT0FBZSxFQUNmLE1BQVcsRUFDWCxNQUFlLEVBQ2YsVUFBbUI7UUFFbkIscUJBQUksU0FBaUQsQ0FBQztRQUV0RCxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUV2RCxTQUFTLENBQUMsaUJBQWlCLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUMxQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUM5QyxTQUFTLENBQUMsaUJBQWlCLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsdUJBQXVCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0YsU0FBUyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDNUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sR0FBRyxNQUFNLElBQUksU0FBUyxDQUFDO1FBQ3pELFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEdBQUcsVUFBVSxJQUFJLFVBQVUsQ0FBQzs7OztRQU1sRSxPQUFPLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7O2dCQWxGbEMsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLGdCQUFnQjt3QkFDaEIsZUFBZTt3QkFDZixlQUFlO3dCQUNmLFdBQVc7d0JBQ1gsbUJBQW1CO3dCQUNuQixjQUFjO3dCQUNkLGlCQUFpQjt3QkFDakIsZUFBZTt3QkFDZixjQUFjO3dCQUNkLG1CQUFtQjt3QkFDbkIsbUJBQW1CO3dCQUNuQixxQkFBcUI7d0JBQ3JCLDJCQUEyQixDQUFDLE9BQU8sRUFBRTtxQkFDdEM7b0JBQ0QsWUFBWSxFQUFFO3dCQUVaLHlCQUF5Qjt3QkFDekIsd0JBQXdCO3FCQUN6QjtvQkFDRCxPQUFPLEVBQUU7d0JBRVAseUJBQXlCO3dCQUN6Qix3QkFBd0I7cUJBQ3pCO29CQUNELGVBQWUsRUFBRSxDQUFDLHlCQUF5QixFQUFFLHdCQUF3QixDQUFDO29CQUN0RSxTQUFTLEVBQUU7d0JBQ1QsZ0JBQWdCO3dCQUNoQix5QkFBeUI7d0JBQ3pCLHdCQUF3QjtxQkFDekI7aUJBQ0Y7Z0JBQ0EsVUFBVTs7OztnQkFwQ0YsU0FBUztnQkFKVCxZQUFZOzsyQkFoQnJCOztTQXlEYSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZsZXhMYXlvdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mbGV4LWxheW91dCc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE1hdElucHV0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaW5wdXQnO1xuaW1wb3J0IHsgTWF0Q2hlY2tib3hNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jaGVja2JveCc7XG5pbXBvcnQgeyBNYXRTZWxlY3RNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zZWxlY3QnO1xuaW1wb3J0IHsgTWF0UmFkaW9Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9yYWRpbyc7XG5pbXBvcnQgeyBNYXREYXRlcGlja2VyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGF0ZXBpY2tlcic7XG5pbXBvcnQgeyBNYXROYXRpdmVEYXRlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgTWF0QXV0b2NvbXBsZXRlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYXV0b2NvbXBsZXRlJztcbmltcG9ydCB7IFRXQUNvbmZpcm1EaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL2NvbmZpcm0tZGlhbG9nL3R3YS1jb25maXJtLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgVFdBUHJvbXB0RGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi9wcm9tcHQtZGlhbG9nL3R3YS1wcm9tcHQtZGlhbG9nLmNvbXBvbmVudCc7XG4vLyBpbXBvcnQgeyBUV0FEaWFsb2dzU2VydmljZSB9IGZyb20gJy4vdHdhLWRpYWxvZ3Muc2VydmljZSc7XG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUsIE1hdERpYWxvZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IE5neE1hdGVyaWFsVGltZXBpY2tlck1vZHVsZSB9IGZyb20gJ25neC1tYXRlcmlhbC10aW1lcGlja2VyJztcbmltcG9ydCB7IERvbVNhbml0aXplciwgU2FmZUh0bWwgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTWF0RGlhbG9nLCBNYXREaWFsb2dSZWYgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRmxleExheW91dE1vZHVsZSxcbiAgICBNYXREaWFsb2dNb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgTWF0Q2hlY2tib3hNb2R1bGUsXG4gICAgTWF0U2VsZWN0TW9kdWxlLFxuICAgIE1hdFJhZGlvTW9kdWxlLFxuICAgIE1hdERhdGVwaWNrZXJNb2R1bGUsXG4gICAgTWF0TmF0aXZlRGF0ZU1vZHVsZSxcbiAgICBNYXRBdXRvY29tcGxldGVNb2R1bGUsXG4gICAgTmd4TWF0ZXJpYWxUaW1lcGlja2VyTW9kdWxlLmZvclJvb3QoKSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgLy8gVFdBRGlhbG9nc01vZHVsZSxcbiAgICBUV0FDb25maXJtRGlhbG9nQ29tcG9uZW50LFxuICAgIFRXQVByb21wdERpYWxvZ0NvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgLy8gVFdBRGlhbG9nc01vZHVsZSxcbiAgICBUV0FDb25maXJtRGlhbG9nQ29tcG9uZW50LFxuICAgIFRXQVByb21wdERpYWxvZ0NvbXBvbmVudFxuICBdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtUV0FDb25maXJtRGlhbG9nQ29tcG9uZW50LCBUV0FQcm9tcHREaWFsb2dDb21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtcbiAgICBUV0FEaWFsb2dzTW9kdWxlLFxuICAgIFRXQUNvbmZpcm1EaWFsb2dDb21wb25lbnQsXG4gICAgVFdBUHJvbXB0RGlhbG9nQ29tcG9uZW50XG4gIF1cbn0pXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVFdBRGlhbG9nc01vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBkaWFsb2c6IE1hdERpYWxvZyxcbiAgICAgIHByaXZhdGUgX3Nhbml0aXplcjogRG9tU2FuaXRpemVyXG4gICAgKSB7fVxuXG4gIHB1YmxpYyBjb25maXJtKFxuICAgIHRpdGxlOiBzdHJpbmcsXG4gICAgbWVzc2FnZTogc3RyaW5nLFxuICAgIG9rVGV4dD86IHN0cmluZyxcbiAgICBjYW5jZWxUZXh0Pzogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgbGV0IGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPFRXQUNvbmZpcm1EaWFsb2dDb21wb25lbnQ+O1xuXG4gICAgZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihUV0FDb25maXJtRGlhbG9nQ29tcG9uZW50KTtcblxuICAgIGRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS50aXRsZSA9IHRpdGxlO1xuICAgIGRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICBkaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UubWVzc2FnZUh0bWwgPSB0aGlzLl9zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwobWVzc2FnZSk7XG4gICAgZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLm9rVGV4dCA9IG9rVGV4dCB8fCAnQWNlcHRhcic7XG4gICAgZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLmNhbmNlbFRleHQgPSBjYW5jZWxUZXh0IHx8ICcnO1xuXG4gICAgcmV0dXJuIGRpYWxvZ1JlZi5hZnRlckNsb3NlZCgpO1xuICB9XG5cbiAgcHVibGljIHByb21wdChcbiAgICB0aXRsZTogc3RyaW5nLFxuICAgIG1lc3NhZ2U6IHN0cmluZyxcbiAgICBmaWVsZHM6IGFueSxcbiAgICBva1RleHQ/OiBzdHJpbmcsXG4gICAgY2FuY2VsVGV4dD86IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGxldCBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxUV0FQcm9tcHREaWFsb2dDb21wb25lbnQ+O1xuXG4gICAgZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihUV0FQcm9tcHREaWFsb2dDb21wb25lbnQpO1xuXG4gICAgZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLnRpdGxlID0gdGl0bGU7XG4gICAgZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIGRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5tZXNzYWdlSHRtbCA9IHRoaXMuX3Nhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0SHRtbChtZXNzYWdlKTtcbiAgICBkaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UuZmllbGRzID0gZmllbGRzO1xuICAgIGRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5va1RleHQgPSBva1RleHQgfHwgJ0FjZXB0YXInO1xuICAgIGRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5jYW5jZWxUZXh0ID0gY2FuY2VsVGV4dCB8fCAnQ2FuY2VsYXInO1xuXG4gICAgLy8gb25TdWJtaXQgPSBkaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UuZ2V0Rm9ybVN1Ym1pdEV2KCkuc3Vic2NyaWJlKGl0ZW0gPT4ge1xuICAgIC8vICAgICBkaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UucmVzdWx0ID0gaXRlbTtcbiAgICAvLyB9KTtcblxuICAgIHJldHVybiBkaWFsb2dSZWYuYWZ0ZXJDbG9zZWQoKTtcbiAgfVxufVxuIl19