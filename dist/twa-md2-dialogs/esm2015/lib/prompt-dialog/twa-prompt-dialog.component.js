/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
/**
 * @record
 */
export function ITWAPromptField() { }
if (false) {
    /** @type {?} */
    ITWAPromptField.prototype.key;
    /** @type {?} */
    ITWAPromptField.prototype.label;
    /** @type {?} */
    ITWAPromptField.prototype.type;
    /** @type {?} */
    ITWAPromptField.prototype.fxFlex;
    /** @type {?} */
    ITWAPromptField.prototype.value;
    /** @type {?} */
    ITWAPromptField.prototype.options;
    /** @type {?} */
    ITWAPromptField.prototype.autocomplete;
    /** @type {?} */
    ITWAPromptField.prototype.rows;
    /** @type {?} */
    ITWAPromptField.prototype.validation;
    /** @type {?|undefined} */
    ITWAPromptField.prototype.validationMessages;
}
export class TWAPromptDialogComponent {
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
        /** @type {?} */
        const formGroup = {};
        for (const i in this.fields) {
            if (this.fields.hasOwnProperty(i)) {
                formGroup[this.fields[i].key] = new FormControl(this.fields[i].value || '', this.mapValidators(this.fields[i].validation, this.fields[i].key));
                if (typeof this.fields[i].autocomplete !== 'undefined' && this.fields[i].autocomplete !== undefined) {
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
     * @param {?} object
     * @return {?}
     */
    log(object) {
        console.log(object);
    }
    /**
     * @private
     * @param {?} value
     * @param {?} options
     * @return {?}
     */
    _filterValues(value, options) {
        /** @type {?} */
        const filteredValue = value.toLowerCase();
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
        /** @type {?} */
        let i;
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
     * @param {?} prop
     * @param {?} error
     * @return {?}
     */
    drawCustomErrors(prop, error) {
        /** @type {?} */
        let ret = false;
        if (typeof prop.validationMessages !== 'undefined') {
            if (typeof prop.validationMessages[error] !== 'undefined') {
                ret = prop.validationMessages[error] > '';
            }
            else {
                ret = false;
            }
        }
        else {
            ret = false;
        }
        return ret;
    }
    /**
     * @private
     * @param {?} validators
     * @param {?} field
     * @return {?}
     */
    mapValidators(validators, field) {
        /** @type {?} */
        const formValidators = [];
        if (validators) {
            for (const validation of Object.keys(validators)) {
                if (validation === 'required') {
                    formValidators.push(Validators.required);
                }
                else if (validation === 'match') {
                    formValidators.push(() => {
                        /** @type {?} */
                        let ret = false;
                        /** @type {?} */
                        const control = this.form.get(validators[validation]);
                        if (!this.form.get(field)) {
                            ret = null;
                        }
                        ret = !(this.form.get(field) && this.form.get(field).value === control.value);
                        if (!ret) {
                            ret = null;
                        }
                        else {
                            ret = {
                                match: true
                            };
                        }
                        return ret;
                    });
                }
                else if (validation === 'min') {
                    formValidators.push(Validators.min(validators[validation]));
                }
                else if (validation === 'max') {
                    formValidators.push(Validators.max(validators[validation]));
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

    <form novalidate (ngSubmit)="submitForm(form.value)" [formGroup]="form" fxLayout="row wrap" fxLayoutGap="10px">
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
                <div *ngSwitchCase="'password'">
                    <mat-form-field fxFlex>
                        <input matInput type="password" placeholder="{{prop.label}}"
                            [formControlName]="prop.key"
                            [id]="prop.key" [type]="prop.type" fxFlex>
                    </mat-form-field>
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
            <div class="error" *ngIf="form.get(prop.key).errors" fxFlex="100%">
            </div>
            <div class="error" *ngIf="form.get(prop.key).invalid && (form.get(prop.key).dirty || form.get(prop.key).touched)" fxFlex="100%">
                <mat-error *ngIf="form.get(prop.key).errors.required">
                    <div *ngIf="drawCustomErrors(prop, 'required')">
                        {{prop.validationMessages.required}}
                    </div>
                    <div *ngIf="!prop.validationMessages || !prop.validationMessages.required">
                        The field {{ prop.label }} is required.
                    </div>
                </mat-error>
                <mat-error *ngIf="form.get(prop.key).errors.match">
                    <div *ngIf="drawCustomErrors(prop, 'match')">
                        {{prop.validationMessages.match}}
                    </div>
                    <div *ngIf="!prop.validationMessages || !prop.validationMessages.match">
                        The fields doesn't match.
                    </div>
                </mat-error>
                <mat-error *ngIf="form.get(prop.key).errors.min">
                    <div *ngIf="drawCustomErrors(prop, 'min')">
                        {{prop.validationMessages.min}}
                    </div>
                    <div *ngIf="!prop.validationMessages || !prop.validationMessages.min">
                        The minimal value is {{form.get(prop.key).errors.min.min}}.
                    </div>
                </mat-error>
                <mat-error *ngIf="form.get(prop.key).errors.max">
                    <div *ngIf="drawCustomErrors(prop, 'max')">
                        {{prop.validationMessages.max}}
                    </div>
                    <div *ngIf="!prop.validationMessages || !prop.validationMessages.max">
                        The max value is {{form.get(prop.key).errors.max.max}}.
                    </div>
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
if (false) {
    /** @type {?} */
    TWAPromptDialogComponent.prototype.form;
    /** @type {?} */
    TWAPromptDialogComponent.prototype.formSubmitEv;
    /** @type {?} */
    TWAPromptDialogComponent.prototype.title;
    /** @type {?} */
    TWAPromptDialogComponent.prototype.message;
    /** @type {?} */
    TWAPromptDialogComponent.prototype.messageHtml;
    /** @type {?} */
    TWAPromptDialogComponent.prototype.fields;
    /** @type {?} */
    TWAPromptDialogComponent.prototype.okText;
    /** @type {?} */
    TWAPromptDialogComponent.prototype.cancelText;
    /** @type {?} */
    TWAPromptDialogComponent.prototype.onSubmit;
    /** @type {?} */
    TWAPromptDialogComponent.prototype.dialogRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdhLXByb21wdC1kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vdHdhLW1kMi1kaWFsb2dzLyIsInNvdXJjZXMiOlsibGliL3Byb21wdC1kaWFsb2cvdHdhLXByb21wdC1kaWFsb2cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNoRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHcEUsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUloRCxxQ0FXQzs7O0lBVkcsOEJBQVk7O0lBQ1osZ0NBQWM7O0lBQ2QsK0JBQWE7O0lBQ2IsaUNBQWU7O0lBQ2YsZ0NBQWM7O0lBQ2Qsa0NBQWU7O0lBQ2YsdUNBQWtCOztJQUNsQiwrQkFBWTs7SUFDWixxQ0FBZ0I7O0lBQ2hCLDZDQUF5Qjs7QUF1SjdCLE1BQU0sT0FBTyx3QkFBd0I7Ozs7SUFhakMsWUFBbUIsU0FBaUQ7UUFBakQsY0FBUyxHQUFULFNBQVMsQ0FBd0M7UUFYN0QsU0FBSSxHQUFjLElBQUksU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzNDLGlCQUFZLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7SUFXckQsQ0FBQzs7OztJQUVELFFBQVE7O2NBRUUsU0FBUyxHQUFHLEVBQUU7UUFDcEIsS0FBSyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ3pCLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQy9CLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFH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SSxDQUFDLEdBQUcsRUFBRTs0QkFDTixHQUFHLEdBQUcsSUFBSSxDQUFDO3lCQUNkOzZCQUFNOzRCQUNILEdBQUcsR0FBRztnQ0FDRixLQUFLLEVBQUUsSUFBSTs2QkFDZCxDQUFDO3lCQUNMO3dCQUNELE9BQU8sR0FBRyxDQUFDO29CQUNmLENBQUMsQ0FBQyxDQUFDO2lCQUNOO3FCQUFNLElBQUksVUFBVSxLQUFLLEtBQUssRUFBRTtvQkFDN0IsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQy9EO3FCQUFNLElBQUksVUFBVSxLQUFLLEtBQUssRUFBRTtvQkFDN0IsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQy9EO2FBQ0o7U0FDSjtRQUVELE9BQU8sY0FBYyxDQUFDO0lBQzFCLENBQUM7OztZQTVTSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHVCQUF1Qjs7O2dCQUdqQyxNQUFNLEVBQUUsQ0FBQyxzREFBc0QsQ0FBQztnQkFDaEUsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0E2SVQ7YUFDSjs7OztZQXhLUSxZQUFZOzs7O0lBMktqQix3Q0FBMkM7O0lBQzNDLGdEQUFxRDs7SUFFckQseUNBQXFCOztJQUNyQiwyQ0FBdUI7O0lBQ3ZCLCtDQUE2Qjs7SUFDN0IsMENBQWlDOztJQUNqQywwQ0FBc0I7O0lBQ3RCLDhDQUEwQjs7SUFDMUIsNENBQXFCOztJQUVULDZDQUF3RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdERpYWxvZ1JlZiB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IEZvcm1Db250cm9sLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBTYWZlSHRtbCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5pbXBvcnQgeyBtYXAsIHN0YXJ0V2l0aCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTWF0Y2hWYWxpZGF0b3IgfSBmcm9tICcuL21hdGNoLXZhbGlkYXRvci5kaXJlY3RpdmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElUV0FQcm9tcHRGaWVsZCB7XG4gICAga2V5OiBzdHJpbmc7XG4gICAgbGFiZWw6IHN0cmluZztcbiAgICB0eXBlOiBzdHJpbmc7XG4gICAgZnhGbGV4OiBzdHJpbmc7XG4gICAgdmFsdWU6IHN0cmluZztcbiAgICBvcHRpb25zOiBhbnlbXTtcbiAgICBhdXRvY29tcGxldGU6IGFueTtcbiAgICByb3dzOiBhbnlbXTtcbiAgICB2YWxpZGF0aW9uOiBhbnk7XG4gICAgdmFsaWRhdGlvbk1lc3NhZ2VzPzogYW55O1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3R3YS1hcHAtcHJvbXB0LWRpYWxvZycsXG4gICAgLy8gdGVtcGxhdGVVcmw6ICcuL3R3YS1wcm9tcHQtZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcbiAgICAvLyBzdHlsZVVybHM6IFsnLi90d2EtcHJvbXB0LWRpYWxvZy5jb21wb25lbnQuY3NzJ11cbiAgICBzdHlsZXM6IFsnLm1hdC1lcnJvciB7IGRpc3BsYXk6IGJsb2NrOyBtYXJnaW46IC0xNXB4IDAgMTVweDsgfSddLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgPGgyPnt7IHRpdGxlIH19PC9oMj5cbiAgICA8cCBbaW5uZXJIdG1sXT1cIm1lc3NhZ2VIdG1sXCI+PC9wPlxuXG4gICAgPGZvcm0gbm92YWxpZGF0ZSAobmdTdWJtaXQpPVwic3VibWl0Rm9ybShmb3JtLnZhbHVlKVwiIFtmb3JtR3JvdXBdPVwiZm9ybVwiIGZ4TGF5b3V0PVwicm93IHdyYXBcIiBmeExheW91dEdhcD1cIjEwcHhcIj5cbiAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgcHJvcCBvZiBmaWVsZHNcIiBmeEZsZXg9XCJ7e3Byb3AuZnhGbGV4ID8gKCdjYWxjKCcgKyBwcm9wLmZ4RmxleCArICcgLSAxMHB4KScpIDogJzEwMCUnfX1cIiBmeExheW91dD1cImNvbHVtblwiPlxuICAgICAgICAgICAgPGRpdiBbbmdTd2l0Y2hdPVwicHJvcC50eXBlXCIgZnhGbGV4PVwiMTAwJVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIid0ZXh0J1wiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgKm5nSWY9XCIhcHJvcC5hdXRvY29tcGxldGVcIiBmeEZsZXg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgcGxhY2Vob2xkZXI9XCJ7e3Byb3AubGFiZWx9fVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJwcm9wLmtleVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2lkXT1cInByb3Aua2V5XCIgW3R5cGVdPVwicHJvcC50eXBlXCIgZnhGbGV4PlxuICAgICAgICAgICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwicHJvcC5hdXRvY29tcGxldGVcIiBmeEZsZXg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgZnhGbGV4PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBtYXRJbnB1dCBwbGFjZWhvbGRlcj1cInt7cHJvcC5sYWJlbH19XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJwcm9wLmtleVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFttYXRBdXRvY29tcGxldGVdPVwiYXV0b1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChibHVyKT1cImFjQ2hlY2tCbHVyKHByb3ApXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2lkXT1cInByb3Aua2V5XCIgW3R5cGVdPVwicHJvcC50eXBlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1hdXRvY29tcGxldGUgI2F1dG89XCJtYXRBdXRvY29tcGxldGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvcHRpb25TZWxlY3RlZCk9XCJhY0NsaWNrKHByb3AsICRldmVudClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bWF0LW9wdGlvbiAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIHByb3AuYXV0b2NvbXBsZXRlLmZpbHRlcmVkT3B0aW9ucyB8IGFzeW5jXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3ZhbHVlXT1cIm9wdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IG9wdGlvbiB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbWF0LW9wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbWF0LWF1dG9jb21wbGV0ZT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ3Bhc3N3b3JkJ1wiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgZnhGbGV4PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IG1hdElucHV0IHR5cGU9XCJwYXNzd29yZFwiIHBsYWNlaG9sZGVyPVwie3twcm9wLmxhYmVsfX1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwicHJvcC5rZXlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpZF09XCJwcm9wLmtleVwiIFt0eXBlXT1cInByb3AudHlwZVwiIGZ4RmxleD5cbiAgICAgICAgICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCIndGV4dGFyZWEnXCI+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZCBmeEZsZXg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWEgbWF0SW5wdXQgcGxhY2Vob2xkZXI9XCJ7e3Byb3AubGFiZWx9fVwiIHJvd3M9XCJ7e3Byb3Aucm93c3x8JzMnfX1cIiBhdXRvc2l6ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwicHJvcC5rZXlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpZF09XCJwcm9wLmtleVwiIFt0eXBlXT1cInByb3AudHlwZVwiPjwvdGV4dGFyZWE+XG4gICAgICAgICAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ251bWJlcidcIj5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkIGZ4RmxleD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBtYXRJbnB1dCBwbGFjZWhvbGRlcj1cInt7cHJvcC5sYWJlbH19XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cInByb3Aua2V5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaWRdPVwicHJvcC5rZXlcIiBbdHlwZV09XCJwcm9wLnR5cGVcIj5cbiAgICAgICAgICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIidkYXRlJ1wiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgZnhGbGV4PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IG1hdElucHV0IFttYXREYXRlcGlja2VyXT1waWNrZXIgcGxhY2Vob2xkZXI9XCJ7e3Byb3AubGFiZWx9fVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJwcm9wLmtleVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2lkXT1cInByb3Aua2V5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bWF0LWRhdGVwaWNrZXIgI3BpY2tlcj48L21hdC1kYXRlcGlja2VyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1kYXRlcGlja2VyLXRvZ2dsZSBtYXRTdWZmaXggW2Zvcl09XCJwaWNrZXJcIj48L21hdC1kYXRlcGlja2VyLXRvZ2dsZT5cbiAgICAgICAgICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCIndGltZSdcIj5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkIGZ4RmxleD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBtYXRJbnB1dCBbbmd4VGltZXBpY2tlcl09XCJ0cGlja2VyXCIgcGxhY2Vob2xkZXI9XCJ7e3Byb3AubGFiZWx9fVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Zvcm1hdF09XCIyNFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJwcm9wLmtleVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2lkXT1cInByb3Aua2V5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIgI3RwaWNrZXI+PC9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlcj5cbiAgICAgICAgICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIidyYWRpbydcIiBmeExheW91dD1cImNvbHVtblwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IF9uZ2NvbnRlbnQtYzIwPVwiXCIgc3R5bGU9XCJoZWlnaHQ6IDIwcHg7XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgX25nY29udGVudC1jMjA9XCJcIiBzdHlsZT1cInRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMS4yODEyNWVtKSBzY2FsZSgwLjc1KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJzcGVjdGl2ZSgxMDBweClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlWigwLjAwMXB4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMS4yODEyNWVtKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2FsZSgwLjc1KTt3aWR0aDogMTMzLjMzMzMzMzMzJTttYXJnaW46IDIwcHggMCAwIDA7Zm9udC13ZWlnaHQ6IDEwMDtjb2xvcjogIzY2NjtcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7e3Byb3AubGFiZWx9fVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtcmFkaW8tZ3JvdXAgW2Zvcm1Db250cm9sTmFtZV09XCJwcm9wLmtleVwiIFtuYW1lXT1cInByb3Aua2V5XCIgZnhMYXlvdXQ9XCJjb2x1bW5cIiBzdHlsZT1cIm1hcmdpbi10b3A6IDE0cHg7XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bWF0LXJhZGlvLWJ1dHRvbiBbdmFsdWVdPVwib3B0aW9uLnZhbHVlXCIgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBwcm9wLm9wdGlvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7e29wdGlvbi5sYWJlbH19XG4gICAgICAgICAgICAgICAgICAgICAgICA8L21hdC1yYWRpby1idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvbWF0LXJhZGlvLWdyb3VwPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ3NlbGVjdCdcIj5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkIGZ4RmxleD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxtYXQtc2VsZWN0IFtmb3JtQ29udHJvbE5hbWVdPVwicHJvcC5rZXlcIiBwbGFjZWhvbGRlcj1cInt7cHJvcC5sYWJlbH19XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1vcHRpb24gKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBwcm9wLm9wdGlvbnNcIiBbdmFsdWVdPVwib3B0aW9uLnZhbHVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IG9wdGlvbi5sYWJlbCB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbWF0LW9wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbWF0LXNlbGVjdD5cbiAgICAgICAgICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVycm9yXCIgKm5nSWY9XCJmb3JtLmdldChwcm9wLmtleSkuZXJyb3JzXCIgZnhGbGV4PVwiMTAwJVwiPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZXJyb3JcIiAqbmdJZj1cImZvcm0uZ2V0KHByb3Aua2V5KS5pbnZhbGlkICYmIChmb3JtLmdldChwcm9wLmtleSkuZGlydHkgfHwgZm9ybS5nZXQocHJvcC5rZXkpLnRvdWNoZWQpXCIgZnhGbGV4PVwiMTAwJVwiPlxuICAgICAgICAgICAgICAgIDxtYXQtZXJyb3IgKm5nSWY9XCJmb3JtLmdldChwcm9wLmtleSkuZXJyb3JzLnJlcXVpcmVkXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJkcmF3Q3VzdG9tRXJyb3JzKHByb3AsICdyZXF1aXJlZCcpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7e3Byb3AudmFsaWRhdGlvbk1lc3NhZ2VzLnJlcXVpcmVkfX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCIhcHJvcC52YWxpZGF0aW9uTWVzc2FnZXMgfHwgIXByb3AudmFsaWRhdGlvbk1lc3NhZ2VzLnJlcXVpcmVkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBUaGUgZmllbGQge3sgcHJvcC5sYWJlbCB9fSBpcyByZXF1aXJlZC5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9tYXQtZXJyb3I+XG4gICAgICAgICAgICAgICAgPG1hdC1lcnJvciAqbmdJZj1cImZvcm0uZ2V0KHByb3Aua2V5KS5lcnJvcnMubWF0Y2hcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cImRyYXdDdXN0b21FcnJvcnMocHJvcCwgJ21hdGNoJylcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt7cHJvcC52YWxpZGF0aW9uTWVzc2FnZXMubWF0Y2h9fVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cIiFwcm9wLnZhbGlkYXRpb25NZXNzYWdlcyB8fCAhcHJvcC52YWxpZGF0aW9uTWVzc2FnZXMubWF0Y2hcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIFRoZSBmaWVsZHMgZG9lc24ndCBtYXRjaC5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9tYXQtZXJyb3I+XG4gICAgICAgICAgICAgICAgPG1hdC1lcnJvciAqbmdJZj1cImZvcm0uZ2V0KHByb3Aua2V5KS5lcnJvcnMubWluXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJkcmF3Q3VzdG9tRXJyb3JzKHByb3AsICdtaW4nKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge3twcm9wLnZhbGlkYXRpb25NZXNzYWdlcy5taW59fVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cIiFwcm9wLnZhbGlkYXRpb25NZXNzYWdlcyB8fCAhcHJvcC52YWxpZGF0aW9uTWVzc2FnZXMubWluXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBUaGUgbWluaW1hbCB2YWx1ZSBpcyB7e2Zvcm0uZ2V0KHByb3Aua2V5KS5lcnJvcnMubWluLm1pbn19LlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L21hdC1lcnJvcj5cbiAgICAgICAgICAgICAgICA8bWF0LWVycm9yICpuZ0lmPVwiZm9ybS5nZXQocHJvcC5rZXkpLmVycm9ycy5tYXhcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cImRyYXdDdXN0b21FcnJvcnMocHJvcCwgJ21heCcpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7e3Byb3AudmFsaWRhdGlvbk1lc3NhZ2VzLm1heH19XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiIXByb3AudmFsaWRhdGlvbk1lc3NhZ2VzIHx8ICFwcm9wLnZhbGlkYXRpb25NZXNzYWdlcy5tYXhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIFRoZSBtYXggdmFsdWUgaXMge3tmb3JtLmdldChwcm9wLmtleSkuZXJyb3JzLm1heC5tYXh9fS5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9tYXQtZXJyb3I+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9mb3JtPlxuXG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbWF0LXJhaXNlZC1idXR0b25cbiAgICAgICAgKGNsaWNrKT1cInNlbmQoKVwiPnt7IG9rVGV4dCB9fTwvYnV0dG9uPlxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG1hdC1idXR0b25cbiAgICAgICAgKGNsaWNrKT1cImRpYWxvZ1JlZi5jbG9zZShmYWxzZSlcIj57eyBjYW5jZWxUZXh0IH19PC9idXR0b24+XG5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIFRXQVByb21wdERpYWxvZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBwdWJsaWMgZm9ybTogRm9ybUdyb3VwID0gbmV3IEZvcm1Hcm91cCh7fSk7XG4gICAgZm9ybVN1Ym1pdEV2OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xuICAgIHB1YmxpYyBtZXNzYWdlOiBzdHJpbmc7XG4gICAgcHVibGljIG1lc3NhZ2VIdG1sOiBTYWZlSHRtbDtcbiAgICBwdWJsaWMgZmllbGRzOiBJVFdBUHJvbXB0RmllbGRbXTtcbiAgICBwdWJsaWMgb2tUZXh0OiBzdHJpbmc7XG4gICAgcHVibGljIGNhbmNlbFRleHQ6IHN0cmluZztcbiAgICBwdWJsaWMgb25TdWJtaXQ6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxUV0FQcm9tcHREaWFsb2dDb21wb25lbnQ+KSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG5cbiAgICAgICAgY29uc3QgZm9ybUdyb3VwID0ge307XG4gICAgICAgIGZvciAoY29uc3QgaSBpbiB0aGlzLmZpZWxkcykge1xuICAgICAgICAgICAgaWYgKHRoaXMuZmllbGRzLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgICAgICAgICAgZm9ybUdyb3VwW3RoaXMuZmllbGRzW2ldLmtleV0gPSBuZXcgRm9ybUNvbnRyb2woXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmllbGRzW2ldLnZhbHVlIHx8ICcnLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcFZhbGlkYXRvcnModGhpcy5maWVsZHNbaV0udmFsaWRhdGlvbiwgdGhpcy5maWVsZHNbaV0ua2V5KVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmZpZWxkc1tpXS5hdXRvY29tcGxldGUgIT09ICd1bmRlZmluZWQnICYmIHRoaXMuZmllbGRzW2ldLmF1dG9jb21wbGV0ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmllbGRzW2ldLmF1dG9jb21wbGV0ZS5maWx0ZXJlZE9wdGlvbnMgPSB0aGlzLmdldEZvcm1Hcm91cEV2ZW50KGZvcm1Hcm91cCwgaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5mb3JtID0gbmV3IEZvcm1Hcm91cChmb3JtR3JvdXApO1xuXG4gICAgfVxuXG4gICAgZ2V0Rm9ybUdyb3VwRXZlbnQoZm9ybUdyb3VwLCBpKSB7XG4gICAgICAgIHJldHVybiBmb3JtR3JvdXBbdGhpcy5maWVsZHNbaV0ua2V5XS52YWx1ZUNoYW5nZXMucGlwZShcbiAgICAgICAgICAgIHN0YXJ0V2l0aCgnJyksXG4gICAgICAgICAgICBtYXAoZmlsdGVyVmFsdWUgPT4gZmlsdGVyVmFsdWUgPyB0aGlzLl9maWx0ZXJWYWx1ZXMoZmlsdGVyVmFsdWUsIHRoaXMuZmllbGRzW2ldLmF1dG9jb21wbGV0ZS5vcHRpb25zKSA6XG4gICAgICAgICAgICAgICAgdGhpcy5maWVsZHNbaV0uYXV0b2NvbXBsZXRlLm9wdGlvbnMuc2xpY2UoKSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBsb2cob2JqZWN0OiBhbnkpIHtcbiAgICAgICAgY29uc29sZS5sb2cob2JqZWN0KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9maWx0ZXJWYWx1ZXModmFsdWUsIG9wdGlvbnMpIHtcblxuICAgICAgICBjb25zdCBmaWx0ZXJlZFZhbHVlID0gdmFsdWUudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICByZXR1cm4gb3B0aW9ucy5maWx0ZXIob3B0aW9uID0+IG9wdGlvbi50b0xvd2VyQ2FzZSgpLmluZGV4T2YoZmlsdGVyZWRWYWx1ZSkgPj0gMCk7XG5cbiAgICB9XG5cbiAgICBnZXRGb3JtU3VibWl0RXYoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mb3JtU3VibWl0RXY7XG4gICAgfVxuXG4gICAgc2VuZCgpIHtcbiAgICAgICAgICAgIGxldCBpO1xuICAgICAgICAgICAgdGhpcy5mb3JtLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmZvcm0uc3RhdHVzICE9PSAnSU5WQUxJRCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UodGhpcy5mb3JtLnZhbHVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoaSBpbiB0aGlzLmZvcm0uY29udHJvbHMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5mb3JtLmNvbnRyb2xzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5mb3JtLmNvbnRyb2xzLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcm0uY29udHJvbHNbaV0ubWFya0FzVG91Y2hlZCh7IG9ubHlTZWxmOiB0cnVlIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtLmNvbnRyb2xzW2ldLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICB9XG5cbiAgICBhY0NsaWNrKGZpZWxkOiBhbnksIGV2ZW50OiBhbnkpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coZXZlbnQpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhmaWVsZC5hdXRvY29tcGxldGUpO1xuICAgICAgICBpZiAodHlwZW9mIGZpZWxkLmF1dG9jb21wbGV0ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZmllbGQuYXV0b2NvbXBsZXRlLmZvcmNlU2VsZWN0ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgICAgICAgIGZpZWxkLmF1dG9jb21wbGV0ZS5mb3JjZVNlbGVjdCkge1xuICAgICAgICAgICAgICAgIGZpZWxkLmF1dG9jb21wbGV0ZS5zZWxlY3RlZCA9IGV2ZW50Lm9wdGlvbi52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFjQ2hlY2tCbHVyKGZpZWxkKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGZpZWxkLmF1dG9jb21wbGV0ZS5zZWxlY3RlZCwgdGhpcy5mb3JtLmNvbnRyb2xzW2ZpZWxkLmtleV0udmFsdWUpO1xuICAgICAgICBpZiAodHlwZW9mIGZpZWxkLmF1dG9jb21wbGV0ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZmllbGQuYXV0b2NvbXBsZXRlLmZvcmNlU2VsZWN0ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgICAgICAgIGZpZWxkLmF1dG9jb21wbGV0ZS5mb3JjZVNlbGVjdCkge1xuICAgICAgICAgICAgICAgIGlmICghZmllbGQuYXV0b2NvbXBsZXRlLnNlbGVjdGVkIHx8XG4gICAgICAgICAgICAgICAgICAgIGZpZWxkLmF1dG9jb21wbGV0ZS5zZWxlY3RlZCAhPT0gdGhpcy5mb3JtLmNvbnRyb2xzW2ZpZWxkLmtleV0udmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtLmNvbnRyb2xzW2ZpZWxkLmtleV0uc2V0VmFsdWUobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIGZpZWxkLmF1dG9jb21wbGV0ZS5zZWxlY3RlZCA9ICcnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN1Ym1pdEZvcm0oZm9ybTogYW55KSB7XG4gICAgICAgICAgICB0aGlzLmZvcm1TdWJtaXRFdi5lbWl0KGZvcm0pO1xuICAgIH1cblxuICAgIGRyYXdDdXN0b21FcnJvcnMocHJvcCwgZXJyb3IpIHtcbiAgICAgICAgbGV0IHJldCA9IGZhbHNlO1xuICAgICAgICBpZiAodHlwZW9mIHByb3AudmFsaWRhdGlvbk1lc3NhZ2VzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBwcm9wLnZhbGlkYXRpb25NZXNzYWdlc1tlcnJvcl0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgcmV0ID0gcHJvcC52YWxpZGF0aW9uTWVzc2FnZXNbZXJyb3JdID4gJyc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG5cbiAgICBwcml2YXRlIG1hcFZhbGlkYXRvcnModmFsaWRhdG9yczogYW55LCBmaWVsZCkge1xuXG4gICAgICAgIGNvbnN0IGZvcm1WYWxpZGF0b3JzID0gW107XG5cbiAgICAgICAgaWYgKHZhbGlkYXRvcnMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdmFsaWRhdGlvbiBvZiBPYmplY3Qua2V5cyh2YWxpZGF0b3JzKSkge1xuICAgICAgICAgICAgICAgIGlmICh2YWxpZGF0aW9uID09PSAncmVxdWlyZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1WYWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5yZXF1aXJlZCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWxpZGF0aW9uID09PSAnbWF0Y2gnKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1WYWxpZGF0b3JzLnB1c2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJldDogYW55IHwgYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udHJvbCA9IHRoaXMuZm9ybS5nZXQodmFsaWRhdG9yc1t2YWxpZGF0aW9uXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZm9ybS5nZXQoZmllbGQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldCA9ICEodGhpcy5mb3JtLmdldChmaWVsZCkgJiYgdGhpcy5mb3JtLmdldChmaWVsZCkudmFsdWUgPT09IGNvbnRyb2wudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXQgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsaWRhdGlvbiA9PT0gJ21pbicpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybVZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLm1pbih2YWxpZGF0b3JzW3ZhbGlkYXRpb25dKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWxpZGF0aW9uID09PSAnbWF4Jykge1xuICAgICAgICAgICAgICAgICAgICBmb3JtVmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMubWF4KHZhbGlkYXRvcnNbdmFsaWRhdGlvbl0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZm9ybVZhbGlkYXRvcnM7XG4gICAgfVxuXG59XG4iXX0=