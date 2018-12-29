import { Component, EventEmitter, NgModule, Injectable } from '@angular/core';
import { MatDialogRef, MatNativeDateModule, MatButtonModule, MatDialogModule, MatDialog } from '@angular/material';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TWAConfirmDialogComponent {
    /**
     * @param {?} dialogRef
     */
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
            },] },
];
/** @nocollapse */
TWAConfirmDialogComponent.ctorParameters = () => [
    { type: MatDialogRef }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TWAPromptDialogComponent {
    /**
     * @param {?} dialogRef
     */
    constructor(dialogRef) {
        this.dialogRef = dialogRef;
        this.form = new FormGroup({});
        this.formSubmitEv = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        const /** @type {?} */ formGroup = {};
        for (const /** @type {?} */ i in this.fields) {
            if (this.fields.hasOwnProperty(i)) {
                formGroup[this.fields[i].key] = new FormControl(this.fields[i].value || '', this.mapValidators(this.fields[i].validation));
                console.log(this.fields[i].autocomplete);
                if (typeof this.fields[i].autocomplete !== 'undefined' && this.fields[i].autocomplete !== undefined) {
                    console.log(this.fields[i].autocomplete);
                    this.fields[i].autocomplete.filteredOptions = this.getFormGroupEvent(formGroup, i);
                }
            }
        }
        this.form = new FormGroup(formGroup);
    }
    /**
     * @param {?} formGroup
     * @param {?} i
     * @return {?}
     */
    getFormGroupEvent(formGroup, i) {
        return formGroup[this.fields[i].key].valueChanges.pipe(startWith(''), map(filterValue => filterValue ? this._filterValues(filterValue, this.fields[i].autocomplete.options) :
            this.fields[i].autocomplete.options.slice()));
    }
    /**
     * @param {?} value
     * @param {?} options
     * @return {?}
     */
    _filterValues(value, options) {
        const /** @type {?} */ filteredValue = value.toLowerCase();
        return options.filter(option => option.toLowerCase().indexOf(filteredValue) >= 0);
    }
    /**
     * @return {?}
     */
    getFormSubmitEv() {
        return this.formSubmitEv;
    }
    /**
     * @return {?}
     */
    send() {
        let /** @type {?} */ i;
        this.form.updateValueAndValidity();
        if (this.form.status !== 'INVALID') {
            this.dialogRef.close(this.form.value);
        }
        else {
            for (i in this.form.controls) {
                // console.log(this.form.controls[i]);
                if (this.form.controls.hasOwnProperty(i)) {
                    this.form.controls[i].markAsTouched({ onlySelf: true });
                    this.form.controls[i].updateValueAndValidity();
                }
            }
        }
    }
    /**
     * @param {?} field
     * @param {?} event
     * @return {?}
     */
    acClick(field, event) {
        // console.log(event);
        // console.log(field.autocomplete);
        if (typeof field.autocomplete !== 'undefined') {
            if (typeof field.autocomplete.forceSelect !== 'undefined' &&
                field.autocomplete.forceSelect) {
                field.autocomplete.selected = event.option.value;
            }
        }
    }
    /**
     * @param {?} field
     * @return {?}
     */
    acCheckBlur(field) {
        // console.log(field.autocomplete.selected, this.form.controls[field.key].value);
        if (typeof field.autocomplete !== 'undefined') {
            if (typeof field.autocomplete.forceSelect !== 'undefined' &&
                field.autocomplete.forceSelect) {
                if (!field.autocomplete.selected ||
                    field.autocomplete.selected !== this.form.controls[field.key].value) {
                    this.form.controls[field.key].setValue(null);
                    field.autocomplete.selected = '';
                }
            }
        }
    }
    /**
     * @param {?} form
     * @return {?}
     */
    submitForm(form) {
        this.formSubmitEv.emit(form);
    }
    /**
     * @param {?} validators
     * @return {?}
     */
    mapValidators(validators) {
        const /** @type {?} */ formValidators = [];
        if (validators) {
            for (const /** @type {?} */ validation of Object.keys(validators)) {
                if (validation === 'required') {
                    formValidators.push(Validators.required);
                }
                else if (validation === 'min') {
                    formValidators.push(Validators.min(validators[validation]));
                }
            }
        }
        return formValidators;
    }
}
TWAPromptDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'twa-app-prompt-dialog',
                // templateUrl: './twa-prompt-dialog.component.html',
                // styleUrls: ['./twa-prompt-dialog.component.css']
                styles: ['.mat-error { display: block; margin: -15px 0 15px; }'],
                template: `
    <h2>{{ title }}</h2>
    <p [innerHtml]="messageHtml"></p>

    <form novalidate (ngSubmit)="onSubmit(form.value)" [formGroup]="form" fxLayout="row wrap" fxLayoutGap="10px">
        <div *ngFor="let prop of fields" fxFlex="{{prop.fxFlex ? ('calc(' + prop.fxFlex + ' - 10px)') : '100%'}}" fxLayout="column">
            <div [ngSwitch]="prop.type" fxFlex="100%">
                <div *ngSwitchCase="'text'">
                    <mat-form-field *ngIf="!prop.autocomplete" fxFlex>
                        <input matInput placeholder="{{prop.label}}"
                            [formControlName]="prop.key"
                            [id]="prop.key" [type]="prop.type" fxFlex>
                    </mat-form-field>
                    <div *ngIf="prop.autocomplete" fxFlex>
                        <mat-form-field fxFlex>
                            <input matInput placeholder="{{prop.label}}"
                                [formControlName]="prop.key"
                                [matAutocomplete]="auto"
                                (blur)="acCheckBlur(prop)"
                                [id]="prop.key" [type]="prop.type">
                        </mat-form-field>
                        <mat-autocomplete #auto="matAutocomplete"
                            (optionSelected)="acClick(prop, $event)">
                            <mat-option *ngFor="let option of prop.autocomplete.filteredOptions | async"
                                [value]="option">
                            {{ option }}
                            </mat-option>
                        </mat-autocomplete>
                    </div>
                </div>
                <div *ngSwitchCase="'textarea'">
                    <mat-form-field fxFlex>
                        <textarea matInput placeholder="{{prop.label}}" rows="{{prop.rows||'3'}}" autosize
                            [formControlName]="prop.key"
                            [id]="prop.key" [type]="prop.type"></textarea>
                    </mat-form-field>
                </div>
                <div *ngSwitchCase="'number'">
                    <mat-form-field fxFlex>
                        <input matInput placeholder="{{prop.label}}"
                            [formControlName]="prop.key"
                            [id]="prop.key" [type]="prop.type">
                   </mat-form-field>
                </div>
                <div *ngSwitchCase="'date'">
                    <mat-form-field fxFlex>
                        <input matInput [matDatepicker]=picker placeholder="{{prop.label}}"
                            [formControlName]="prop.key"
                            [id]="prop.key">
                        <mat-datepicker #picker></mat-datepicker>
                        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
                    </mat-form-field>
                </div>
                <div *ngSwitchCase="'time'">
                    <mat-form-field fxFlex>
                        <input matInput [ngxTimepicker]="tpicker" placeholder="{{prop.label}}"
                            [format]="24"
                            [formControlName]="prop.key"
                            [id]="prop.key">
                        <ngx-material-timepicker #tpicker></ngx-material-timepicker>
                    </mat-form-field>
                </div>

                <div *ngSwitchCase="'radio'" fxLayout="column">
                    <div _ngcontent-c20="" style="height: 20px;">
                        <label _ngcontent-c20="" style="transform: translateY(-1.28125em) scale(0.75)
                                perspective(100px)
                                translateZ(0.001px);
                                -ms-transform: translateY(-1.28125em)
                                scale(0.75);width: 133.33333333%;margin: 20px 0 0 0;font-weight: 100;color: #666;">
                            {{prop.label}}
                        </label>
                    </div>
                    <mat-radio-group [formControlName]="prop.key" [name]="prop.key" fxLayout="column" style="margin-top: 14px;">
                        <mat-radio-button [value]="option.value" *ngFor="let option of prop.options">
                            {{option.label}}
                        </mat-radio-button>
                    </mat-radio-group>
                </div>

                <div *ngSwitchCase="'select'">
                    <mat-form-field fxFlex>
                        <mat-select [formControlName]="prop.key" placeholder="{{prop.label}}">
                            <mat-option *ngFor="let option of prop.options" [value]="option.value">
                                {{ option.label }}
                            </mat-option>
                        </mat-select>
                    </mat-form-field>
                </div>
            </div>
            <div class="error" *ngIf="form.get(prop.key).invalid && (form.get(prop.key).dirty || form.get(prop.key).touched)" fxFlex="100%">
                <mat-error *ngIf="form.get(prop.key).errors.required">
                    El campo {{ prop.label }} es obligatorio.
                </mat-error>
            </div>
        </div>
    </form>

    <button type="button" mat-raised-button
        (click)="send()">{{ okText }}</button>
    <button type="button" mat-button
        (click)="dialogRef.close(false)">{{ cancelText }}</button>

    `
            },] },
];
/** @nocollapse */
TWAPromptDialogComponent.ctorParameters = () => [
    { type: MatDialogRef }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TWADialogsModule {
    /**
     * @param {?} dialog
     * @param {?} _sanitizer
     */
    constructor(dialog, _sanitizer) {
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
    confirm(title, message, okText, cancelText) {
        let /** @type {?} */ dialogRef;
        dialogRef = this.dialog.open(TWAConfirmDialogComponent);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;
        dialogRef.componentInstance.messageHtml = this._sanitizer.bypassSecurityTrustHtml(message);
        dialogRef.componentInstance.okText = okText || 'Aceptar';
        dialogRef.componentInstance.cancelText = cancelText || '';
        return dialogRef.afterClosed();
    }
    /**
     * @param {?} title
     * @param {?} message
     * @param {?} fields
     * @param {?=} okText
     * @param {?=} cancelText
     * @return {?}
     */
    prompt(title, message, fields, okText, cancelText) {
        let /** @type {?} */ dialogRef;
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
TWADialogsModule.ctorParameters = () => [
    { type: MatDialog },
    { type: DomSanitizer }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { TWADialogsModule, TWAConfirmDialogComponent, TWAPromptDialogComponent };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdhLW1kMi1kaWFsb2dzLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly90d2EtbWQyLWRpYWxvZ3MvbGliL2NvbmZpcm0tZGlhbG9nL3R3YS1jb25maXJtLWRpYWxvZy5jb21wb25lbnQudHMiLCJuZzovL3R3YS1tZDItZGlhbG9ncy9saWIvcHJvbXB0LWRpYWxvZy90d2EtcHJvbXB0LWRpYWxvZy5jb21wb25lbnQudHMiLCJuZzovL3R3YS1tZDItZGlhbG9ncy9saWIvdHdhLWRpYWxvZ3MubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nUmVmIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgU2FmZUh0bWwgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd0d2EtYXBwLWNvbmZpcm0tZGlhbG9nJyxcbiAgICAvLyB0ZW1wbGF0ZVVybDogJy4vdHdhLWNvbmZpcm0tZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcbiAgICAvLyBzdHlsZVVybHM6IFsnLi90d2EtY29uZmlybS1kaWFsb2cuY29tcG9uZW50LmNzcyddLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgPGgyPnt7IHRpdGxlIH19PC9oMj5cbiAgICA8cCBbaW5uZXJIdG1sXT1cIm1lc3NhZ2VIdG1sXCI+PC9wPlxuXG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbWF0LXJhaXNlZC1idXR0b25cbiAgICAgICAgKGNsaWNrKT1cImRpYWxvZ1JlZi5jbG9zZSh0cnVlKVwiPnt7IG9rVGV4dCB9fTwvYnV0dG9uPlxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG1hdC1idXR0b24gKm5nSWY9XCJjYW5jZWxUZXh0ID4gJydcIlxuICAgICAgICAoY2xpY2spPVwiZGlhbG9nUmVmLmNsb3NlKClcIj57eyBjYW5jZWxUZXh0IH19PC9idXR0b24+XG4gICAgYFxufSlcblxuZXhwb3J0IGNsYXNzIFRXQUNvbmZpcm1EaWFsb2dDb21wb25lbnQge1xuXG4gICAgcHVibGljIHRpdGxlOiBzdHJpbmc7XG4gICAgcHVibGljIG1lc3NhZ2U6IHN0cmluZztcbiAgICBwdWJsaWMgbWVzc2FnZUh0bWw6IFNhZmVIdG1sO1xuICAgIHB1YmxpYyBva1RleHQ6IHN0cmluZztcbiAgICBwdWJsaWMgY2FuY2VsVGV4dDogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPFRXQUNvbmZpcm1EaWFsb2dDb21wb25lbnQ+KSB7XG5cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXREaWFsb2dSZWYgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCwgRm9ybUdyb3VwLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgU2FmZUh0bWwgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuaW1wb3J0IHsgbWFwLCBzdGFydFdpdGggfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVRXQVByb21wdEZpZWxkIHtcbiAgICBrZXk6IHN0cmluZztcbiAgICBsYWJlbDogc3RyaW5nO1xuICAgIHR5cGU6IHN0cmluZztcbiAgICBmeEZsZXg6IHN0cmluZztcbiAgICB2YWx1ZTogc3RyaW5nO1xuICAgIG9wdGlvbnM6IGFueVtdO1xuICAgIGF1dG9jb21wbGV0ZTogYW55O1xuICAgIHJvd3M6IGFueVtdO1xuICAgIHZhbGlkYXRpb246IGFueTtcbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd0d2EtYXBwLXByb21wdC1kaWFsb2cnLFxuICAgIC8vIHRlbXBsYXRlVXJsOiAnLi90d2EtcHJvbXB0LWRpYWxvZy5jb21wb25lbnQuaHRtbCcsXG4gICAgLy8gc3R5bGVVcmxzOiBbJy4vdHdhLXByb21wdC1kaWFsb2cuY29tcG9uZW50LmNzcyddXG4gICAgc3R5bGVzOiBbJy5tYXQtZXJyb3IgeyBkaXNwbGF5OiBibG9jazsgbWFyZ2luOiAtMTVweCAwIDE1cHg7IH0nXSxcbiAgICB0ZW1wbGF0ZTogYFxuICAgIDxoMj57eyB0aXRsZSB9fTwvaDI+XG4gICAgPHAgW2lubmVySHRtbF09XCJtZXNzYWdlSHRtbFwiPjwvcD5cblxuICAgIDxmb3JtIG5vdmFsaWRhdGUgKG5nU3VibWl0KT1cIm9uU3VibWl0KGZvcm0udmFsdWUpXCIgW2Zvcm1Hcm91cF09XCJmb3JtXCIgZnhMYXlvdXQ9XCJyb3cgd3JhcFwiIGZ4TGF5b3V0R2FwPVwiMTBweFwiPlxuICAgICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBwcm9wIG9mIGZpZWxkc1wiIGZ4RmxleD1cInt7cHJvcC5meEZsZXggPyAoJ2NhbGMoJyArIHByb3AuZnhGbGV4ICsgJyAtIDEwcHgpJykgOiAnMTAwJSd9fVwiIGZ4TGF5b3V0PVwiY29sdW1uXCI+XG4gICAgICAgICAgICA8ZGl2IFtuZ1N3aXRjaF09XCJwcm9wLnR5cGVcIiBmeEZsZXg9XCIxMDAlXCI+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ3RleHQnXCI+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZCAqbmdJZj1cIiFwcm9wLmF1dG9jb21wbGV0ZVwiIGZ4RmxleD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBtYXRJbnB1dCBwbGFjZWhvbGRlcj1cInt7cHJvcC5sYWJlbH19XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cInByb3Aua2V5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaWRdPVwicHJvcC5rZXlcIiBbdHlwZV09XCJwcm9wLnR5cGVcIiBmeEZsZXg+XG4gICAgICAgICAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJwcm9wLmF1dG9jb21wbGV0ZVwiIGZ4RmxleD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZCBmeEZsZXg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IG1hdElucHV0IHBsYWNlaG9sZGVyPVwie3twcm9wLmxhYmVsfX1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cInByb3Aua2V5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW21hdEF1dG9jb21wbGV0ZV09XCJhdXRvXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGJsdXIpPVwiYWNDaGVja0JsdXIocHJvcClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaWRdPVwicHJvcC5rZXlcIiBbdHlwZV09XCJwcm9wLnR5cGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bWF0LWF1dG9jb21wbGV0ZSAjYXV0bz1cIm1hdEF1dG9jb21wbGV0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKG9wdGlvblNlbGVjdGVkKT1cImFjQ2xpY2socHJvcCwgJGV2ZW50KVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgcHJvcC5hdXRvY29tcGxldGUuZmlsdGVyZWRPcHRpb25zIHwgYXN5bmNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdmFsdWVdPVwib3B0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgb3B0aW9uIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9tYXQtb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9tYXQtYXV0b2NvbXBsZXRlPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCIndGV4dGFyZWEnXCI+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZCBmeEZsZXg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWEgbWF0SW5wdXQgcGxhY2Vob2xkZXI9XCJ7e3Byb3AubGFiZWx9fVwiIHJvd3M9XCJ7e3Byb3Aucm93c3x8JzMnfX1cIiBhdXRvc2l6ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwicHJvcC5rZXlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpZF09XCJwcm9wLmtleVwiIFt0eXBlXT1cInByb3AudHlwZVwiPjwvdGV4dGFyZWE+XG4gICAgICAgICAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ251bWJlcidcIj5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkIGZ4RmxleD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBtYXRJbnB1dCBwbGFjZWhvbGRlcj1cInt7cHJvcC5sYWJlbH19XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cInByb3Aua2V5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaWRdPVwicHJvcC5rZXlcIiBbdHlwZV09XCJwcm9wLnR5cGVcIj5cbiAgICAgICAgICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIidkYXRlJ1wiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgZnhGbGV4PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IG1hdElucHV0IFttYXREYXRlcGlja2VyXT1waWNrZXIgcGxhY2Vob2xkZXI9XCJ7e3Byb3AubGFiZWx9fVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJwcm9wLmtleVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2lkXT1cInByb3Aua2V5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bWF0LWRhdGVwaWNrZXIgI3BpY2tlcj48L21hdC1kYXRlcGlja2VyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1kYXRlcGlja2VyLXRvZ2dsZSBtYXRTdWZmaXggW2Zvcl09XCJwaWNrZXJcIj48L21hdC1kYXRlcGlja2VyLXRvZ2dsZT5cbiAgICAgICAgICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCIndGltZSdcIj5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkIGZ4RmxleD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBtYXRJbnB1dCBbbmd4VGltZXBpY2tlcl09XCJ0cGlja2VyXCIgcGxhY2Vob2xkZXI9XCJ7e3Byb3AubGFiZWx9fVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Zvcm1hdF09XCIyNFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJwcm9wLmtleVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2lkXT1cInByb3Aua2V5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIgI3RwaWNrZXI+PC9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlcj5cbiAgICAgICAgICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIidyYWRpbydcIiBmeExheW91dD1cImNvbHVtblwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IF9uZ2NvbnRlbnQtYzIwPVwiXCIgc3R5bGU9XCJoZWlnaHQ6IDIwcHg7XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgX25nY29udGVudC1jMjA9XCJcIiBzdHlsZT1cInRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMS4yODEyNWVtKSBzY2FsZSgwLjc1KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJzcGVjdGl2ZSgxMDBweClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlWigwLjAwMXB4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMS4yODEyNWVtKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2FsZSgwLjc1KTt3aWR0aDogMTMzLjMzMzMzMzMzJTttYXJnaW46IDIwcHggMCAwIDA7Zm9udC13ZWlnaHQ6IDEwMDtjb2xvcjogIzY2NjtcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7e3Byb3AubGFiZWx9fVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtcmFkaW8tZ3JvdXAgW2Zvcm1Db250cm9sTmFtZV09XCJwcm9wLmtleVwiIFtuYW1lXT1cInByb3Aua2V5XCIgZnhMYXlvdXQ9XCJjb2x1bW5cIiBzdHlsZT1cIm1hcmdpbi10b3A6IDE0cHg7XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bWF0LXJhZGlvLWJ1dHRvbiBbdmFsdWVdPVwib3B0aW9uLnZhbHVlXCIgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBwcm9wLm9wdGlvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7e29wdGlvbi5sYWJlbH19XG4gICAgICAgICAgICAgICAgICAgICAgICA8L21hdC1yYWRpby1idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvbWF0LXJhZGlvLWdyb3VwPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ3NlbGVjdCdcIj5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkIGZ4RmxleD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxtYXQtc2VsZWN0IFtmb3JtQ29udHJvbE5hbWVdPVwicHJvcC5rZXlcIiBwbGFjZWhvbGRlcj1cInt7cHJvcC5sYWJlbH19XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1vcHRpb24gKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBwcm9wLm9wdGlvbnNcIiBbdmFsdWVdPVwib3B0aW9uLnZhbHVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IG9wdGlvbi5sYWJlbCB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbWF0LW9wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbWF0LXNlbGVjdD5cbiAgICAgICAgICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVycm9yXCIgKm5nSWY9XCJmb3JtLmdldChwcm9wLmtleSkuaW52YWxpZCAmJiAoZm9ybS5nZXQocHJvcC5rZXkpLmRpcnR5IHx8IGZvcm0uZ2V0KHByb3Aua2V5KS50b3VjaGVkKVwiIGZ4RmxleD1cIjEwMCVcIj5cbiAgICAgICAgICAgICAgICA8bWF0LWVycm9yICpuZ0lmPVwiZm9ybS5nZXQocHJvcC5rZXkpLmVycm9ycy5yZXF1aXJlZFwiPlxuICAgICAgICAgICAgICAgICAgICBFbCBjYW1wbyB7eyBwcm9wLmxhYmVsIH19IGVzIG9ibGlnYXRvcmlvLlxuICAgICAgICAgICAgICAgIDwvbWF0LWVycm9yPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZm9ybT5cblxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG1hdC1yYWlzZWQtYnV0dG9uXG4gICAgICAgIChjbGljayk9XCJzZW5kKClcIj57eyBva1RleHQgfX08L2J1dHRvbj5cbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBtYXQtYnV0dG9uXG4gICAgICAgIChjbGljayk9XCJkaWFsb2dSZWYuY2xvc2UoZmFsc2UpXCI+e3sgY2FuY2VsVGV4dCB9fTwvYnV0dG9uPlxuXG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBUV0FQcm9tcHREaWFsb2dDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgcHVibGljIGZvcm06IEZvcm1Hcm91cCA9IG5ldyBGb3JtR3JvdXAoe30pO1xuICAgIGZvcm1TdWJtaXRFdjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBwdWJsaWMgdGl0bGU6IHN0cmluZztcbiAgICBwdWJsaWMgbWVzc2FnZTogc3RyaW5nO1xuICAgIHB1YmxpYyBtZXNzYWdlSHRtbDogU2FmZUh0bWw7XG4gICAgcHVibGljIGZpZWxkczogSVRXQVByb21wdEZpZWxkW107XG4gICAgcHVibGljIG9rVGV4dDogc3RyaW5nO1xuICAgIHB1YmxpYyBjYW5jZWxUZXh0OiBzdHJpbmc7XG4gICAgcHVibGljIG9uU3VibWl0OiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8VFdBUHJvbXB0RGlhbG9nQ29tcG9uZW50Pikge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuXG4gICAgICAgIGNvbnN0IGZvcm1Hcm91cCA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IGkgaW4gdGhpcy5maWVsZHMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmZpZWxkcy5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgICAgICAgICAgIGZvcm1Hcm91cFt0aGlzLmZpZWxkc1tpXS5rZXldID0gbmV3IEZvcm1Db250cm9sKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpZWxkc1tpXS52YWx1ZSB8fCAnJyxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBWYWxpZGF0b3JzKHRoaXMuZmllbGRzW2ldLnZhbGlkYXRpb24pXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmZpZWxkc1tpXS5hdXRvY29tcGxldGUpO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5maWVsZHNbaV0uYXV0b2NvbXBsZXRlICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLmZpZWxkc1tpXS5hdXRvY29tcGxldGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmZpZWxkc1tpXS5hdXRvY29tcGxldGUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpZWxkc1tpXS5hdXRvY29tcGxldGUuZmlsdGVyZWRPcHRpb25zID0gdGhpcy5nZXRGb3JtR3JvdXBFdmVudChmb3JtR3JvdXAsIGkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZm9ybSA9IG5ldyBGb3JtR3JvdXAoZm9ybUdyb3VwKTtcblxuICAgIH1cblxuICAgIGdldEZvcm1Hcm91cEV2ZW50KGZvcm1Hcm91cCwgaSkge1xuICAgICAgICByZXR1cm4gZm9ybUdyb3VwW3RoaXMuZmllbGRzW2ldLmtleV0udmFsdWVDaGFuZ2VzLnBpcGUoXG4gICAgICAgICAgICBzdGFydFdpdGgoJycpLFxuICAgICAgICAgICAgbWFwKGZpbHRlclZhbHVlID0+IGZpbHRlclZhbHVlID8gdGhpcy5fZmlsdGVyVmFsdWVzKGZpbHRlclZhbHVlLCB0aGlzLmZpZWxkc1tpXS5hdXRvY29tcGxldGUub3B0aW9ucykgOlxuICAgICAgICAgICAgICAgIHRoaXMuZmllbGRzW2ldLmF1dG9jb21wbGV0ZS5vcHRpb25zLnNsaWNlKCkpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZmlsdGVyVmFsdWVzKHZhbHVlLCBvcHRpb25zKSB7XG5cbiAgICAgICAgY29uc3QgZmlsdGVyZWRWYWx1ZSA9IHZhbHVlLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgcmV0dXJuIG9wdGlvbnMuZmlsdGVyKG9wdGlvbiA9PiBvcHRpb24udG9Mb3dlckNhc2UoKS5pbmRleE9mKGZpbHRlcmVkVmFsdWUpID49IDApO1xuXG4gICAgfVxuXG4gICAgZ2V0Rm9ybVN1Ym1pdEV2KCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm9ybVN1Ym1pdEV2O1xuICAgIH1cblxuICAgIHNlbmQoKSB7XG4gICAgICAgICAgICBsZXQgaTtcbiAgICAgICAgICAgIHRoaXMuZm9ybS51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgICAgICAgICBpZiAodGhpcy5mb3JtLnN0YXR1cyAhPT0gJ0lOVkFMSUQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKHRoaXMuZm9ybS52YWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgaW4gdGhpcy5mb3JtLmNvbnRyb2xzKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuZm9ybS5jb250cm9sc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZm9ybS5jb250cm9scy5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtLmNvbnRyb2xzW2ldLm1hcmtBc1RvdWNoZWQoeyBvbmx5U2VsZjogdHJ1ZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZm9ybS5jb250cm9sc1tpXS51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgfVxuXG4gICAgYWNDbGljayhmaWVsZDogYW55LCBldmVudDogYW55KSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGV2ZW50KTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coZmllbGQuYXV0b2NvbXBsZXRlKTtcbiAgICAgICAgaWYgKHR5cGVvZiBmaWVsZC5hdXRvY29tcGxldGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGZpZWxkLmF1dG9jb21wbGV0ZS5mb3JjZVNlbGVjdCAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgICAgICAgICBmaWVsZC5hdXRvY29tcGxldGUuZm9yY2VTZWxlY3QpIHtcbiAgICAgICAgICAgICAgICBmaWVsZC5hdXRvY29tcGxldGUuc2VsZWN0ZWQgPSBldmVudC5vcHRpb24udmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhY0NoZWNrQmx1cihmaWVsZCkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhmaWVsZC5hdXRvY29tcGxldGUuc2VsZWN0ZWQsIHRoaXMuZm9ybS5jb250cm9sc1tmaWVsZC5rZXldLnZhbHVlKTtcbiAgICAgICAgaWYgKHR5cGVvZiBmaWVsZC5hdXRvY29tcGxldGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGZpZWxkLmF1dG9jb21wbGV0ZS5mb3JjZVNlbGVjdCAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgICAgICAgICBmaWVsZC5hdXRvY29tcGxldGUuZm9yY2VTZWxlY3QpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWZpZWxkLmF1dG9jb21wbGV0ZS5zZWxlY3RlZCB8fFxuICAgICAgICAgICAgICAgICAgICBmaWVsZC5hdXRvY29tcGxldGUuc2VsZWN0ZWQgIT09IHRoaXMuZm9ybS5jb250cm9sc1tmaWVsZC5rZXldLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9ybS5jb250cm9sc1tmaWVsZC5rZXldLnNldFZhbHVlKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICBmaWVsZC5hdXRvY29tcGxldGUuc2VsZWN0ZWQgPSAnJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdWJtaXRGb3JtKGZvcm06IGFueSkge1xuICAgICAgICAgICAgdGhpcy5mb3JtU3VibWl0RXYuZW1pdChmb3JtKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG1hcFZhbGlkYXRvcnModmFsaWRhdG9yczogYW55KSB7XG5cbiAgICAgICAgY29uc3QgZm9ybVZhbGlkYXRvcnMgPSBbXTtcblxuICAgICAgICBpZiAodmFsaWRhdG9ycykge1xuICAgICAgICAgICAgZm9yIChjb25zdCB2YWxpZGF0aW9uIG9mIE9iamVjdC5rZXlzKHZhbGlkYXRvcnMpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbGlkYXRpb24gPT09ICdyZXF1aXJlZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybVZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLnJlcXVpcmVkKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbGlkYXRpb24gPT09ICdtaW4nKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1WYWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5taW4odmFsaWRhdG9yc1t2YWxpZGF0aW9uXSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmb3JtVmFsaWRhdG9ycztcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTWF0SW5wdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pbnB1dCc7XG5pbXBvcnQgeyBNYXRDaGVja2JveE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NoZWNrYm94JztcbmltcG9ydCB7IE1hdFNlbGVjdE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NlbGVjdCc7XG5pbXBvcnQgeyBNYXRSYWRpb01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3JhZGlvJztcbmltcG9ydCB7IE1hdERhdGVwaWNrZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kYXRlcGlja2VyJztcbmltcG9ydCB7IE1hdE5hdGl2ZURhdGVNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBNYXRBdXRvY29tcGxldGVNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9hdXRvY29tcGxldGUnO1xuaW1wb3J0IHsgVFdBQ29uZmlybURpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vY29uZmlybS1kaWFsb2cvdHdhLWNvbmZpcm0tZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUV0FQcm9tcHREaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL3Byb21wdC1kaWFsb2cvdHdhLXByb21wdC1kaWFsb2cuY29tcG9uZW50Jztcbi8vIGltcG9ydCB7IFRXQURpYWxvZ3NTZXJ2aWNlIH0gZnJvbSAnLi90d2EtZGlhbG9ncy5zZXJ2aWNlJztcbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSwgTWF0RGlhbG9nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgTmd4TWF0ZXJpYWxUaW1lcGlja2VyTW9kdWxlIH0gZnJvbSAnbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXInO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyLCBTYWZlSHRtbCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBNYXREaWFsb2csIE1hdERpYWxvZ1JlZiB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGbGV4TGF5b3V0TW9kdWxlLFxuICAgIE1hdERpYWxvZ01vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICBNYXRDaGVja2JveE1vZHVsZSxcbiAgICBNYXRTZWxlY3RNb2R1bGUsXG4gICAgTWF0UmFkaW9Nb2R1bGUsXG4gICAgTWF0RGF0ZXBpY2tlck1vZHVsZSxcbiAgICBNYXROYXRpdmVEYXRlTW9kdWxlLFxuICAgIE1hdEF1dG9jb21wbGV0ZU1vZHVsZSxcbiAgICBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJNb2R1bGUuZm9yUm9vdCgpLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICAvLyBUV0FEaWFsb2dzTW9kdWxlLFxuICAgIFRXQUNvbmZpcm1EaWFsb2dDb21wb25lbnQsXG4gICAgVFdBUHJvbXB0RGlhbG9nQ29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICAvLyBUV0FEaWFsb2dzTW9kdWxlLFxuICAgIFRXQUNvbmZpcm1EaWFsb2dDb21wb25lbnQsXG4gICAgVFdBUHJvbXB0RGlhbG9nQ29tcG9uZW50XG4gIF0sXG4gIGVudHJ5Q29tcG9uZW50czogW1RXQUNvbmZpcm1EaWFsb2dDb21wb25lbnQsIFRXQVByb21wdERpYWxvZ0NvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW1xuICAgIFRXQURpYWxvZ3NNb2R1bGUsXG4gICAgVFdBQ29uZmlybURpYWxvZ0NvbXBvbmVudCxcbiAgICBUV0FQcm9tcHREaWFsb2dDb21wb25lbnRcbiAgXVxufSlcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUV0FEaWFsb2dzTW9kdWxlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIGRpYWxvZzogTWF0RGlhbG9nLFxuICAgICAgcHJpdmF0ZSBfc2FuaXRpemVyOiBEb21TYW5pdGl6ZXJcbiAgICApIHt9XG5cbiAgcHVibGljIGNvbmZpcm0oXG4gICAgdGl0bGU6IHN0cmluZyxcbiAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgb2tUZXh0Pzogc3RyaW5nLFxuICAgIGNhbmNlbFRleHQ/OiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBsZXQgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8VFdBQ29uZmlybURpYWxvZ0NvbXBvbmVudD47XG5cbiAgICBkaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKFRXQUNvbmZpcm1EaWFsb2dDb21wb25lbnQpO1xuXG4gICAgZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLnRpdGxlID0gdGl0bGU7XG4gICAgZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIGRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5tZXNzYWdlSHRtbCA9IHRoaXMuX3Nhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0SHRtbChtZXNzYWdlKTtcbiAgICBkaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2Uub2tUZXh0ID0gb2tUZXh0IHx8ICdBY2VwdGFyJztcbiAgICBkaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UuY2FuY2VsVGV4dCA9IGNhbmNlbFRleHQgfHwgJyc7XG5cbiAgICByZXR1cm4gZGlhbG9nUmVmLmFmdGVyQ2xvc2VkKCk7XG4gIH1cblxuICBwdWJsaWMgcHJvbXB0KFxuICAgIHRpdGxlOiBzdHJpbmcsXG4gICAgbWVzc2FnZTogc3RyaW5nLFxuICAgIGZpZWxkczogYW55LFxuICAgIG9rVGV4dD86IHN0cmluZyxcbiAgICBjYW5jZWxUZXh0Pzogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgbGV0IGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPFRXQVByb21wdERpYWxvZ0NvbXBvbmVudD47XG5cbiAgICBkaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKFRXQVByb21wdERpYWxvZ0NvbXBvbmVudCk7XG5cbiAgICBkaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UudGl0bGUgPSB0aXRsZTtcbiAgICBkaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLm1lc3NhZ2VIdG1sID0gdGhpcy5fc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKG1lc3NhZ2UpO1xuICAgIGRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5maWVsZHMgPSBmaWVsZHM7XG4gICAgZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLm9rVGV4dCA9IG9rVGV4dCB8fCAnQWNlcHRhcic7XG4gICAgZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLmNhbmNlbFRleHQgPSBjYW5jZWxUZXh0IHx8ICdDYW5jZWxhcic7XG5cbiAgICAvLyBvblN1Ym1pdCA9IGRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5nZXRGb3JtU3VibWl0RXYoKS5zdWJzY3JpYmUoaXRlbSA9PiB7XG4gICAgLy8gICAgIGRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5yZXN1bHQgPSBpdGVtO1xuICAgIC8vIH0pO1xuXG4gICAgcmV0dXJuIGRpYWxvZ1JlZi5hZnRlckNsb3NlZCgpO1xuICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE1BbUJhLHlCQUF5Qjs7OztJQVFsQyxZQUFtQixTQUFrRDtRQUFsRCxjQUFTLEdBQVQsU0FBUyxDQUF5QztLQUVwRTs7O1lBekJKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsd0JBQXdCOzs7Z0JBR2xDLFFBQVEsRUFBRTs7Ozs7Ozs7S0FRVDthQUNKOzs7O1lBaEJRLFlBQVk7Ozs7Ozs7QUNEckIsTUFpSWEsd0JBQXdCOzs7O0lBYWpDLFlBQW1CLFNBQWlEO1FBQWpELGNBQVMsR0FBVCxTQUFTLENBQXdDO29CQVgzQyxJQUFJLFNBQVMsQ0FBQyxFQUFFLENBQUM7UUFDMUMsb0JBQWtDLElBQUksWUFBWSxFQUFFLENBQUM7S0FXcEQ7Ozs7SUFFRCxRQUFRO1FBRUosdUJBQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNyQixLQUFLLHVCQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ3pCLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQy9CLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksV0FBVyxDQUMzQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxFQUFFLEVBQzFCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FDaEQsQ0FBQztnQkFDRixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ3pDLElBQUksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksS0FBSyxXQUFXLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLEtBQUssU0FBUyxFQUFFO29CQUNqRyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7b0JBQ3pDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUN0RjthQUNKO1NBQ0o7UUFFRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBRXhDOzs7Ozs7SUFFRCxpQkFBaUIsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUMxQixPQUFPLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQ2xELFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFDYixHQUFHLENBQUMsV0FBVyxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUM7WUFDakcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQ25ELENBQUM7S0FDTDs7Ozs7O0lBRU8sYUFBYSxDQUFDLEtBQUssRUFBRSxPQUFPO1FBRWhDLHVCQUFNLGFBQWEsR0FBRyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFMUMsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOzs7OztJQUl0RixlQUFlO1FBQ1AsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0tBQ2hDOzs7O0lBRUQsSUFBSTtRQUNJLHFCQUFJLENBQUMsQ0FBQztRQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUNuQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLFNBQVMsRUFBRTtZQUM1QixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzdDO2FBQU07WUFDQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Z0JBRXRCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztvQkFDeEQsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztpQkFDdEQ7YUFDUjtTQUNSO0tBQ1I7Ozs7OztJQUVELE9BQU8sQ0FBQyxLQUFVLEVBQUUsS0FBVTs7O1FBRzFCLElBQUksT0FBTyxLQUFLLENBQUMsWUFBWSxLQUFLLFdBQVcsRUFBRTtZQUMzQyxJQUFJLE9BQU8sS0FBSyxDQUFDLFlBQVksQ0FBQyxXQUFXLEtBQUssV0FBVztnQkFDckQsS0FBSyxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUU7Z0JBQ2hDLEtBQUssQ0FBQyxZQUFZLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO2FBQ3BEO1NBQ0o7S0FDSjs7Ozs7SUFFRCxXQUFXLENBQUMsS0FBSzs7UUFFYixJQUFJLE9BQU8sS0FBSyxDQUFDLFlBQVksS0FBSyxXQUFXLEVBQUU7WUFDM0MsSUFBSSxPQUFPLEtBQUssQ0FBQyxZQUFZLENBQUMsV0FBVyxLQUFLLFdBQVc7Z0JBQ3JELEtBQUssQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFO2dCQUNoQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxRQUFRO29CQUM1QixLQUFLLENBQUMsWUFBWSxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFO29CQUNyRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUM3QyxLQUFLLENBQUMsWUFBWSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7aUJBQ3BDO2FBQ0o7U0FDSjtLQUNKOzs7OztJQUVELFVBQVUsQ0FBQyxJQUFTO1FBQ1osSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDcEM7Ozs7O0lBRU8sYUFBYSxDQUFDLFVBQWU7UUFFakMsdUJBQU0sY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUUxQixJQUFJLFVBQVUsRUFBRTtZQUNaLEtBQUssdUJBQU0sVUFBVSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQzlDLElBQUksVUFBVSxLQUFLLFVBQVUsRUFBRTtvQkFDM0IsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQzVDO3FCQUFNLElBQUksVUFBVSxLQUFLLEtBQUssRUFBRTtvQkFDN0IsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQy9EO2FBQ0o7U0FDSjtRQUVELE9BQU8sY0FBYyxDQUFDOzs7O1lBbE83QixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHVCQUF1Qjs7O2dCQUdqQyxNQUFNLEVBQUUsQ0FBQyxzREFBc0QsQ0FBQztnQkFDaEUsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBdUdUO2FBQ0o7Ozs7WUEvSFEsWUFBWTs7Ozs7OztBQ0RyQixNQXlEYSxnQkFBZ0I7Ozs7O0lBQzNCLFlBQ1ksUUFDQTtRQURBLFdBQU0sR0FBTixNQUFNO1FBQ04sZUFBVSxHQUFWLFVBQVU7S0FDaEI7Ozs7Ozs7O0lBRUMsT0FBTyxDQUNaLEtBQWEsRUFDYixPQUFlLEVBQ2YsTUFBZSxFQUNmLFVBQW1CO1FBRW5CLHFCQUFJLFNBQWtELENBQUM7UUFFdkQsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFFeEQsU0FBUyxDQUFDLGlCQUFpQixDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDMUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDOUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLHVCQUF1QixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNGLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEdBQUcsTUFBTSxJQUFJLFNBQVMsQ0FBQztRQUN6RCxTQUFTLENBQUMsaUJBQWlCLENBQUMsVUFBVSxHQUFHLFVBQVUsSUFBSSxFQUFFLENBQUM7UUFFMUQsT0FBTyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7Ozs7Ozs7Ozs7SUFHMUIsTUFBTSxDQUNYLEtBQWEsRUFDYixPQUFlLEVBQ2YsTUFBVyxFQUNYLE1BQWUsRUFDZixVQUFtQjtRQUVuQixxQkFBSSxTQUFpRCxDQUFDO1FBRXRELFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBRXZELFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQzFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQzlDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyx1QkFBdUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzRixTQUFTLENBQUMsaUJBQWlCLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUM1QyxTQUFTLENBQUMsaUJBQWlCLENBQUMsTUFBTSxHQUFHLE1BQU0sSUFBSSxTQUFTLENBQUM7UUFDekQsU0FBUyxDQUFDLGlCQUFpQixDQUFDLFVBQVUsR0FBRyxVQUFVLElBQUksVUFBVSxDQUFDOzs7O1FBTWxFLE9BQU8sU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDOzs7O1lBbEZsQyxRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osZ0JBQWdCO29CQUNoQixlQUFlO29CQUNmLGVBQWU7b0JBQ2YsV0FBVztvQkFDWCxtQkFBbUI7b0JBQ25CLGNBQWM7b0JBQ2QsaUJBQWlCO29CQUNqQixlQUFlO29CQUNmLGNBQWM7b0JBQ2QsbUJBQW1CO29CQUNuQixtQkFBbUI7b0JBQ25CLHFCQUFxQjtvQkFDckIsMkJBQTJCLENBQUMsT0FBTyxFQUFFO2lCQUN0QztnQkFDRCxZQUFZLEVBQUU7b0JBRVoseUJBQXlCO29CQUN6Qix3QkFBd0I7aUJBQ3pCO2dCQUNELE9BQU8sRUFBRTtvQkFFUCx5QkFBeUI7b0JBQ3pCLHdCQUF3QjtpQkFDekI7Z0JBQ0QsZUFBZSxFQUFFLENBQUMseUJBQXlCLEVBQUUsd0JBQXdCLENBQUM7Z0JBQ3RFLFNBQVMsRUFBRTtvQkFDVCxnQkFBZ0I7b0JBQ2hCLHlCQUF5QjtvQkFDekIsd0JBQXdCO2lCQUN6QjthQUNGO1lBQ0EsVUFBVTs7OztZQXBDRixTQUFTO1lBSlQsWUFBWTs7Ozs7Ozs7Ozs7Ozs7OyJ9