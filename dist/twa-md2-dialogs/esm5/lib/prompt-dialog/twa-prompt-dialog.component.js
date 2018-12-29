/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
/**
 * @record
 */
export function ITWAPromptField() { }
function ITWAPromptField_tsickle_Closure_declarations() {
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
}
var TWAPromptDialogComponent = /** @class */ (function () {
    function TWAPromptDialogComponent(dialogRef) {
        this.dialogRef = dialogRef;
        this.form = new FormGroup({});
        this.formSubmitEv = new EventEmitter();
    }
    /**
     * @return {?}
     */
    TWAPromptDialogComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ formGroup = {};
        for (var /** @type {?} */ i in this.fields) {
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
    };
    /**
     * @param {?} formGroup
     * @param {?} i
     * @return {?}
     */
    TWAPromptDialogComponent.prototype.getFormGroupEvent = /**
     * @param {?} formGroup
     * @param {?} i
     * @return {?}
     */
    function (formGroup, i) {
        var _this = this;
        return formGroup[this.fields[i].key].valueChanges.pipe(startWith(''), map(function (filterValue) { return filterValue ? _this._filterValues(filterValue, _this.fields[i].autocomplete.options) :
            _this.fields[i].autocomplete.options.slice(); }));
    };
    /**
     * @param {?} value
     * @param {?} options
     * @return {?}
     */
    TWAPromptDialogComponent.prototype._filterValues = /**
     * @param {?} value
     * @param {?} options
     * @return {?}
     */
    function (value, options) {
        var /** @type {?} */ filteredValue = value.toLowerCase();
        return options.filter(function (option) { return option.toLowerCase().indexOf(filteredValue) >= 0; });
    };
    /**
     * @return {?}
     */
    TWAPromptDialogComponent.prototype.getFormSubmitEv = /**
     * @return {?}
     */
    function () {
        return this.formSubmitEv;
    };
    /**
     * @return {?}
     */
    TWAPromptDialogComponent.prototype.send = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ i;
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
    };
    /**
     * @param {?} field
     * @param {?} event
     * @return {?}
     */
    TWAPromptDialogComponent.prototype.acClick = /**
     * @param {?} field
     * @param {?} event
     * @return {?}
     */
    function (field, event) {
        // console.log(event);
        // console.log(field.autocomplete);
        if (typeof field.autocomplete !== 'undefined') {
            if (typeof field.autocomplete.forceSelect !== 'undefined' &&
                field.autocomplete.forceSelect) {
                field.autocomplete.selected = event.option.value;
            }
        }
    };
    /**
     * @param {?} field
     * @return {?}
     */
    TWAPromptDialogComponent.prototype.acCheckBlur = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
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
    };
    /**
     * @param {?} form
     * @return {?}
     */
    TWAPromptDialogComponent.prototype.submitForm = /**
     * @param {?} form
     * @return {?}
     */
    function (form) {
        this.formSubmitEv.emit(form);
    };
    /**
     * @param {?} validators
     * @return {?}
     */
    TWAPromptDialogComponent.prototype.mapValidators = /**
     * @param {?} validators
     * @return {?}
     */
    function (validators) {
        var e_1, _a;
        var /** @type {?} */ formValidators = [];
        if (validators) {
            try {
                for (var _b = tslib_1.__values(Object.keys(validators)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var validation = _c.value;
                    if (validation === 'required') {
                        formValidators.push(Validators.required);
                    }
                    else if (validation === 'min') {
                        formValidators.push(Validators.min(validators[validation]));
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        return formValidators;
    };
    TWAPromptDialogComponent.decorators = [
        { type: Component, args: [{
                    selector: 'twa-app-prompt-dialog',
                    // templateUrl: './twa-prompt-dialog.component.html',
                    // styleUrls: ['./twa-prompt-dialog.component.css']
                    styles: ['.mat-error { display: block; margin: -15px 0 15px; }'],
                    template: "\n    <h2>{{ title }}</h2>\n    <p [innerHtml]=\"messageHtml\"></p>\n\n    <form novalidate (ngSubmit)=\"onSubmit(form.value)\" [formGroup]=\"form\" fxLayout=\"row wrap\" fxLayoutGap=\"10px\">\n        <div *ngFor=\"let prop of fields\" fxFlex=\"{{prop.fxFlex ? ('calc(' + prop.fxFlex + ' - 10px)') : '100%'}}\" fxLayout=\"column\">\n            <div [ngSwitch]=\"prop.type\" fxFlex=\"100%\">\n                <div *ngSwitchCase=\"'text'\">\n                    <mat-form-field *ngIf=\"!prop.autocomplete\" fxFlex>\n                        <input matInput placeholder=\"{{prop.label}}\"\n                            [formControlName]=\"prop.key\"\n                            [id]=\"prop.key\" [type]=\"prop.type\" fxFlex>\n                    </mat-form-field>\n                    <div *ngIf=\"prop.autocomplete\" fxFlex>\n                        <mat-form-field fxFlex>\n                            <input matInput placeholder=\"{{prop.label}}\"\n                                [formControlName]=\"prop.key\"\n                                [matAutocomplete]=\"auto\"\n                                (blur)=\"acCheckBlur(prop)\"\n                                [id]=\"prop.key\" [type]=\"prop.type\">\n                        </mat-form-field>\n                        <mat-autocomplete #auto=\"matAutocomplete\"\n                            (optionSelected)=\"acClick(prop, $event)\">\n                            <mat-option *ngFor=\"let option of prop.autocomplete.filteredOptions | async\"\n                                [value]=\"option\">\n                            {{ option }}\n                            </mat-option>\n                        </mat-autocomplete>\n                    </div>\n                </div>\n                <div *ngSwitchCase=\"'textarea'\">\n                    <mat-form-field fxFlex>\n                        <textarea matInput placeholder=\"{{prop.label}}\" rows=\"{{prop.rows||'3'}}\" autosize\n                            [formControlName]=\"prop.key\"\n                            [id]=\"prop.key\" [type]=\"prop.type\"></textarea>\n                    </mat-form-field>\n                </div>\n                <div *ngSwitchCase=\"'number'\">\n                    <mat-form-field fxFlex>\n                        <input matInput placeholder=\"{{prop.label}}\"\n                            [formControlName]=\"prop.key\"\n                            [id]=\"prop.key\" [type]=\"prop.type\">\n                   </mat-form-field>\n                </div>\n                <div *ngSwitchCase=\"'date'\">\n                    <mat-form-field fxFlex>\n                        <input matInput [matDatepicker]=picker placeholder=\"{{prop.label}}\"\n                            [formControlName]=\"prop.key\"\n                            [id]=\"prop.key\">\n                        <mat-datepicker #picker></mat-datepicker>\n                        <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n                    </mat-form-field>\n                </div>\n                <div *ngSwitchCase=\"'time'\">\n                    <mat-form-field fxFlex>\n                        <input matInput [ngxTimepicker]=\"tpicker\" placeholder=\"{{prop.label}}\"\n                            [format]=\"24\"\n                            [formControlName]=\"prop.key\"\n                            [id]=\"prop.key\">\n                        <ngx-material-timepicker #tpicker></ngx-material-timepicker>\n                    </mat-form-field>\n                </div>\n\n                <div *ngSwitchCase=\"'radio'\" fxLayout=\"column\">\n                    <div _ngcontent-c20=\"\" style=\"height: 20px;\">\n                        <label _ngcontent-c20=\"\" style=\"transform: translateY(-1.28125em) scale(0.75)\n                                perspective(100px)\n                                translateZ(0.001px);\n                                -ms-transform: translateY(-1.28125em)\n                                scale(0.75);width: 133.33333333%;margin: 20px 0 0 0;font-weight: 100;color: #666;\">\n                            {{prop.label}}\n                        </label>\n                    </div>\n                    <mat-radio-group [formControlName]=\"prop.key\" [name]=\"prop.key\" fxLayout=\"column\" style=\"margin-top: 14px;\">\n                        <mat-radio-button [value]=\"option.value\" *ngFor=\"let option of prop.options\">\n                            {{option.label}}\n                        </mat-radio-button>\n                    </mat-radio-group>\n                </div>\n\n                <div *ngSwitchCase=\"'select'\">\n                    <mat-form-field fxFlex>\n                        <mat-select [formControlName]=\"prop.key\" placeholder=\"{{prop.label}}\">\n                            <mat-option *ngFor=\"let option of prop.options\" [value]=\"option.value\">\n                                {{ option.label }}\n                            </mat-option>\n                        </mat-select>\n                    </mat-form-field>\n                </div>\n            </div>\n            <div class=\"error\" *ngIf=\"form.get(prop.key).invalid && (form.get(prop.key).dirty || form.get(prop.key).touched)\" fxFlex=\"100%\">\n                <mat-error *ngIf=\"form.get(prop.key).errors.required\">\n                    El campo {{ prop.label }} es obligatorio.\n                </mat-error>\n            </div>\n        </div>\n    </form>\n\n    <button type=\"button\" mat-raised-button\n        (click)=\"send()\">{{ okText }}</button>\n    <button type=\"button\" mat-button\n        (click)=\"dialogRef.close(false)\">{{ cancelText }}</button>\n\n    "
                },] },
    ];
    /** @nocollapse */
    TWAPromptDialogComponent.ctorParameters = function () { return [
        { type: MatDialogRef }
    ]; };
    return TWAPromptDialogComponent;
}());
export { TWAPromptDialogComponent };
function TWAPromptDialogComponent_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdhLXByb21wdC1kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vdHdhLW1kMi1kaWFsb2dzLyIsInNvdXJjZXMiOlsibGliL3Byb21wdC1kaWFsb2cvdHdhLXByb21wdC1kaWFsb2cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDaEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR3BFLE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBeUk1QyxrQ0FBbUIsU0FBaUQ7UUFBakQsY0FBUyxHQUFULFNBQVMsQ0FBd0M7b0JBWDNDLElBQUksU0FBUyxDQUFDLEVBQUUsQ0FBQztRQUMxQyxvQkFBa0MsSUFBSSxZQUFZLEVBQUUsQ0FBQztLQVdwRDs7OztJQUVELDJDQUFROzs7SUFBUjtRQUVJLHFCQUFNLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDckIsS0FBSyxxQkFBTSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUN6QixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUMvQixTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLFdBQVcsQ0FDM0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksRUFBRSxFQUMxQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQ2hELENB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QUFJLFVBQVUsS0FBSyxVQUFVLEVBQUU7d0JBQzNCLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3FCQUM1Qzt5QkFBTSxJQUFJLFVBQVUsS0FBSyxLQUFLLEVBQUU7d0JBQzdCLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUMvRDtpQkFDSjs7Ozs7Ozs7O1NBQ0o7UUFFRCxPQUFPLGNBQWMsQ0FBQzs7O2dCQWxPN0IsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSx1QkFBdUI7OztvQkFHakMsTUFBTSxFQUFFLENBQUMsc0RBQXNELENBQUM7b0JBQ2hFLFFBQVEsRUFBRSw2aUxBdUdUO2lCQUNKOzs7O2dCQS9IUSxZQUFZOzttQ0FEckI7O1NBaUlhLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdERpYWxvZ1JlZiB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IEZvcm1Db250cm9sLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBTYWZlSHRtbCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5pbXBvcnQgeyBtYXAsIHN0YXJ0V2l0aCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZXhwb3J0IGludGVyZmFjZSBJVFdBUHJvbXB0RmllbGQge1xuICAgIGtleTogc3RyaW5nO1xuICAgIGxhYmVsOiBzdHJpbmc7XG4gICAgdHlwZTogc3RyaW5nO1xuICAgIGZ4RmxleDogc3RyaW5nO1xuICAgIHZhbHVlOiBzdHJpbmc7XG4gICAgb3B0aW9uczogYW55W107XG4gICAgYXV0b2NvbXBsZXRlOiBhbnk7XG4gICAgcm93czogYW55W107XG4gICAgdmFsaWRhdGlvbjogYW55O1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3R3YS1hcHAtcHJvbXB0LWRpYWxvZycsXG4gICAgLy8gdGVtcGxhdGVVcmw6ICcuL3R3YS1wcm9tcHQtZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcbiAgICAvLyBzdHlsZVVybHM6IFsnLi90d2EtcHJvbXB0LWRpYWxvZy5jb21wb25lbnQuY3NzJ11cbiAgICBzdHlsZXM6IFsnLm1hdC1lcnJvciB7IGRpc3BsYXk6IGJsb2NrOyBtYXJnaW46IC0xNXB4IDAgMTVweDsgfSddLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgPGgyPnt7IHRpdGxlIH19PC9oMj5cbiAgICA8cCBbaW5uZXJIdG1sXT1cIm1lc3NhZ2VIdG1sXCI+PC9wPlxuXG4gICAgPGZvcm0gbm92YWxpZGF0ZSAobmdTdWJtaXQpPVwib25TdWJtaXQoZm9ybS52YWx1ZSlcIiBbZm9ybUdyb3VwXT1cImZvcm1cIiBmeExheW91dD1cInJvdyB3cmFwXCIgZnhMYXlvdXRHYXA9XCIxMHB4XCI+XG4gICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IHByb3Agb2YgZmllbGRzXCIgZnhGbGV4PVwie3twcm9wLmZ4RmxleCA/ICgnY2FsYygnICsgcHJvcC5meEZsZXggKyAnIC0gMTBweCknKSA6ICcxMDAlJ319XCIgZnhMYXlvdXQ9XCJjb2x1bW5cIj5cbiAgICAgICAgICAgIDxkaXYgW25nU3dpdGNoXT1cInByb3AudHlwZVwiIGZ4RmxleD1cIjEwMCVcIj5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCIndGV4dCdcIj5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkICpuZ0lmPVwiIXByb3AuYXV0b2NvbXBsZXRlXCIgZnhGbGV4PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IG1hdElucHV0IHBsYWNlaG9sZGVyPVwie3twcm9wLmxhYmVsfX1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwicHJvcC5rZXlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpZF09XCJwcm9wLmtleVwiIFt0eXBlXT1cInByb3AudHlwZVwiIGZ4RmxleD5cbiAgICAgICAgICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cInByb3AuYXV0b2NvbXBsZXRlXCIgZnhGbGV4PlxuICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkIGZ4RmxleD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgcGxhY2Vob2xkZXI9XCJ7e3Byb3AubGFiZWx9fVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwicHJvcC5rZXlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbWF0QXV0b2NvbXBsZXRlXT1cImF1dG9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoYmx1cik9XCJhY0NoZWNrQmx1cihwcm9wKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpZF09XCJwcm9wLmtleVwiIFt0eXBlXT1cInByb3AudHlwZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxtYXQtYXV0b2NvbXBsZXRlICNhdXRvPVwibWF0QXV0b2NvbXBsZXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAob3B0aW9uU2VsZWN0ZWQpPVwiYWNDbGljayhwcm9wLCAkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1vcHRpb24gKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBwcm9wLmF1dG9jb21wbGV0ZS5maWx0ZXJlZE9wdGlvbnMgfCBhc3luY1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt2YWx1ZV09XCJvcHRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBvcHRpb24gfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L21hdC1vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L21hdC1hdXRvY29tcGxldGU+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIid0ZXh0YXJlYSdcIj5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkIGZ4RmxleD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBtYXRJbnB1dCBwbGFjZWhvbGRlcj1cInt7cHJvcC5sYWJlbH19XCIgcm93cz1cInt7cHJvcC5yb3dzfHwnMyd9fVwiIGF1dG9zaXplXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJwcm9wLmtleVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2lkXT1cInByb3Aua2V5XCIgW3R5cGVdPVwicHJvcC50eXBlXCI+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCInbnVtYmVyJ1wiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgZnhGbGV4PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IG1hdElucHV0IHBsYWNlaG9sZGVyPVwie3twcm9wLmxhYmVsfX1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwicHJvcC5rZXlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpZF09XCJwcm9wLmtleVwiIFt0eXBlXT1cInByb3AudHlwZVwiPlxuICAgICAgICAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ2RhdGUnXCI+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZCBmeEZsZXg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgW21hdERhdGVwaWNrZXJdPXBpY2tlciBwbGFjZWhvbGRlcj1cInt7cHJvcC5sYWJlbH19XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cInByb3Aua2V5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaWRdPVwicHJvcC5rZXlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxtYXQtZGF0ZXBpY2tlciAjcGlja2VyPjwvbWF0LWRhdGVwaWNrZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bWF0LWRhdGVwaWNrZXItdG9nZ2xlIG1hdFN1ZmZpeCBbZm9yXT1cInBpY2tlclwiPjwvbWF0LWRhdGVwaWNrZXItdG9nZ2xlPlxuICAgICAgICAgICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIid0aW1lJ1wiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgZnhGbGV4PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IG1hdElucHV0IFtuZ3hUaW1lcGlja2VyXT1cInRwaWNrZXJcIiBwbGFjZWhvbGRlcj1cInt7cHJvcC5sYWJlbH19XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZm9ybWF0XT1cIjI0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cInByb3Aua2V5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaWRdPVwicHJvcC5rZXlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZ3gtbWF0ZXJpYWwtdGltZXBpY2tlciAjdHBpY2tlcj48L25neC1tYXRlcmlhbC10aW1lcGlja2VyPlxuICAgICAgICAgICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ3JhZGlvJ1wiIGZ4TGF5b3V0PVwiY29sdW1uXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgX25nY29udGVudC1jMjA9XCJcIiBzdHlsZT1cImhlaWdodDogMjBweDtcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBfbmdjb250ZW50LWMyMD1cIlwiIHN0eWxlPVwidHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xLjI4MTI1ZW0pIHNjYWxlKDAuNzUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNwZWN0aXZlKDEwMHB4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVaKDAuMDAxcHgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xLjI4MTI1ZW0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlKDAuNzUpO3dpZHRoOiAxMzMuMzMzMzMzMzMlO21hcmdpbjogMjBweCAwIDAgMDtmb250LXdlaWdodDogMTAwO2NvbG9yOiAjNjY2O1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7cHJvcC5sYWJlbH19XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1yYWRpby1ncm91cCBbZm9ybUNvbnRyb2xOYW1lXT1cInByb3Aua2V5XCIgW25hbWVdPVwicHJvcC5rZXlcIiBmeExheW91dD1cImNvbHVtblwiIHN0eWxlPVwibWFyZ2luLXRvcDogMTRweDtcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxtYXQtcmFkaW8tYnV0dG9uIFt2YWx1ZV09XCJvcHRpb24udmFsdWVcIiAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIHByb3Aub3B0aW9uc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7b3B0aW9uLmxhYmVsfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbWF0LXJhZGlvLWJ1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9tYXQtcmFkaW8tZ3JvdXA+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCInc2VsZWN0J1wiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgZnhGbGV4PlxuICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1zZWxlY3QgW2Zvcm1Db250cm9sTmFtZV09XCJwcm9wLmtleVwiIHBsYWNlaG9sZGVyPVwie3twcm9wLmxhYmVsfX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bWF0LW9wdGlvbiAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIHByb3Aub3B0aW9uc1wiIFt2YWx1ZV09XCJvcHRpb24udmFsdWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgb3B0aW9uLmxhYmVsIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9tYXQtb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9tYXQtc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZXJyb3JcIiAqbmdJZj1cImZvcm0uZ2V0KHByb3Aua2V5KS5pbnZhbGlkICYmIChmb3JtLmdldChwcm9wLmtleSkuZGlydHkgfHwgZm9ybS5nZXQocHJvcC5rZXkpLnRvdWNoZWQpXCIgZnhGbGV4PVwiMTAwJVwiPlxuICAgICAgICAgICAgICAgIDxtYXQtZXJyb3IgKm5nSWY9XCJmb3JtLmdldChwcm9wLmtleSkuZXJyb3JzLnJlcXVpcmVkXCI+XG4gICAgICAgICAgICAgICAgICAgIEVsIGNhbXBvIHt7IHByb3AubGFiZWwgfX0gZXMgb2JsaWdhdG9yaW8uXG4gICAgICAgICAgICAgICAgPC9tYXQtZXJyb3I+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9mb3JtPlxuXG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbWF0LXJhaXNlZC1idXR0b25cbiAgICAgICAgKGNsaWNrKT1cInNlbmQoKVwiPnt7IG9rVGV4dCB9fTwvYnV0dG9uPlxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG1hdC1idXR0b25cbiAgICAgICAgKGNsaWNrKT1cImRpYWxvZ1JlZi5jbG9zZShmYWxzZSlcIj57eyBjYW5jZWxUZXh0IH19PC9idXR0b24+XG5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIFRXQVByb21wdERpYWxvZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBwdWJsaWMgZm9ybTogRm9ybUdyb3VwID0gbmV3IEZvcm1Hcm91cCh7fSk7XG4gICAgZm9ybVN1Ym1pdEV2OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xuICAgIHB1YmxpYyBtZXNzYWdlOiBzdHJpbmc7XG4gICAgcHVibGljIG1lc3NhZ2VIdG1sOiBTYWZlSHRtbDtcbiAgICBwdWJsaWMgZmllbGRzOiBJVFdBUHJvbXB0RmllbGRbXTtcbiAgICBwdWJsaWMgb2tUZXh0OiBzdHJpbmc7XG4gICAgcHVibGljIGNhbmNlbFRleHQ6IHN0cmluZztcbiAgICBwdWJsaWMgb25TdWJtaXQ6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxUV0FQcm9tcHREaWFsb2dDb21wb25lbnQ+KSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG5cbiAgICAgICAgY29uc3QgZm9ybUdyb3VwID0ge307XG4gICAgICAgIGZvciAoY29uc3QgaSBpbiB0aGlzLmZpZWxkcykge1xuICAgICAgICAgICAgaWYgKHRoaXMuZmllbGRzLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgICAgICAgICAgZm9ybUdyb3VwW3RoaXMuZmllbGRzW2ldLmtleV0gPSBuZXcgRm9ybUNvbnRyb2woXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmllbGRzW2ldLnZhbHVlIHx8ICcnLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcFZhbGlkYXRvcnModGhpcy5maWVsZHNbaV0udmFsaWRhdGlvbilcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZmllbGRzW2ldLmF1dG9jb21wbGV0ZSk7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmZpZWxkc1tpXS5hdXRvY29tcGxldGUgIT09ICd1bmRlZmluZWQnICYmIHRoaXMuZmllbGRzW2ldLmF1dG9jb21wbGV0ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZmllbGRzW2ldLmF1dG9jb21wbGV0ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmllbGRzW2ldLmF1dG9jb21wbGV0ZS5maWx0ZXJlZE9wdGlvbnMgPSB0aGlzLmdldEZvcm1Hcm91cEV2ZW50KGZvcm1Hcm91cCwgaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5mb3JtID0gbmV3IEZvcm1Hcm91cChmb3JtR3JvdXApO1xuXG4gICAgfVxuXG4gICAgZ2V0Rm9ybUdyb3VwRXZlbnQoZm9ybUdyb3VwLCBpKSB7XG4gICAgICAgIHJldHVybiBmb3JtR3JvdXBbdGhpcy5maWVsZHNbaV0ua2V5XS52YWx1ZUNoYW5nZXMucGlwZShcbiAgICAgICAgICAgIHN0YXJ0V2l0aCgnJyksXG4gICAgICAgICAgICBtYXAoZmlsdGVyVmFsdWUgPT4gZmlsdGVyVmFsdWUgPyB0aGlzLl9maWx0ZXJWYWx1ZXMoZmlsdGVyVmFsdWUsIHRoaXMuZmllbGRzW2ldLmF1dG9jb21wbGV0ZS5vcHRpb25zKSA6XG4gICAgICAgICAgICAgICAgdGhpcy5maWVsZHNbaV0uYXV0b2NvbXBsZXRlLm9wdGlvbnMuc2xpY2UoKSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9maWx0ZXJWYWx1ZXModmFsdWUsIG9wdGlvbnMpIHtcblxuICAgICAgICBjb25zdCBmaWx0ZXJlZFZhbHVlID0gdmFsdWUudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICByZXR1cm4gb3B0aW9ucy5maWx0ZXIob3B0aW9uID0+IG9wdGlvbi50b0xvd2VyQ2FzZSgpLmluZGV4T2YoZmlsdGVyZWRWYWx1ZSkgPj0gMCk7XG5cbiAgICB9XG5cbiAgICBnZXRGb3JtU3VibWl0RXYoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mb3JtU3VibWl0RXY7XG4gICAgfVxuXG4gICAgc2VuZCgpIHtcbiAgICAgICAgICAgIGxldCBpO1xuICAgICAgICAgICAgdGhpcy5mb3JtLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmZvcm0uc3RhdHVzICE9PSAnSU5WQUxJRCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UodGhpcy5mb3JtLnZhbHVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoaSBpbiB0aGlzLmZvcm0uY29udHJvbHMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5mb3JtLmNvbnRyb2xzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5mb3JtLmNvbnRyb2xzLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcm0uY29udHJvbHNbaV0ubWFya0FzVG91Y2hlZCh7IG9ubHlTZWxmOiB0cnVlIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtLmNvbnRyb2xzW2ldLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICB9XG5cbiAgICBhY0NsaWNrKGZpZWxkOiBhbnksIGV2ZW50OiBhbnkpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coZXZlbnQpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhmaWVsZC5hdXRvY29tcGxldGUpO1xuICAgICAgICBpZiAodHlwZW9mIGZpZWxkLmF1dG9jb21wbGV0ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZmllbGQuYXV0b2NvbXBsZXRlLmZvcmNlU2VsZWN0ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgICAgICAgIGZpZWxkLmF1dG9jb21wbGV0ZS5mb3JjZVNlbGVjdCkge1xuICAgICAgICAgICAgICAgIGZpZWxkLmF1dG9jb21wbGV0ZS5zZWxlY3RlZCA9IGV2ZW50Lm9wdGlvbi52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFjQ2hlY2tCbHVyKGZpZWxkKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGZpZWxkLmF1dG9jb21wbGV0ZS5zZWxlY3RlZCwgdGhpcy5mb3JtLmNvbnRyb2xzW2ZpZWxkLmtleV0udmFsdWUpO1xuICAgICAgICBpZiAodHlwZW9mIGZpZWxkLmF1dG9jb21wbGV0ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZmllbGQuYXV0b2NvbXBsZXRlLmZvcmNlU2VsZWN0ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgICAgICAgIGZpZWxkLmF1dG9jb21wbGV0ZS5mb3JjZVNlbGVjdCkge1xuICAgICAgICAgICAgICAgIGlmICghZmllbGQuYXV0b2NvbXBsZXRlLnNlbGVjdGVkIHx8XG4gICAgICAgICAgICAgICAgICAgIGZpZWxkLmF1dG9jb21wbGV0ZS5zZWxlY3RlZCAhPT0gdGhpcy5mb3JtLmNvbnRyb2xzW2ZpZWxkLmtleV0udmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtLmNvbnRyb2xzW2ZpZWxkLmtleV0uc2V0VmFsdWUobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIGZpZWxkLmF1dG9jb21wbGV0ZS5zZWxlY3RlZCA9ICcnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN1Ym1pdEZvcm0oZm9ybTogYW55KSB7XG4gICAgICAgICAgICB0aGlzLmZvcm1TdWJtaXRFdi5lbWl0KGZvcm0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgbWFwVmFsaWRhdG9ycyh2YWxpZGF0b3JzOiBhbnkpIHtcblxuICAgICAgICBjb25zdCBmb3JtVmFsaWRhdG9ycyA9IFtdO1xuXG4gICAgICAgIGlmICh2YWxpZGF0b3JzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHZhbGlkYXRpb24gb2YgT2JqZWN0LmtleXModmFsaWRhdG9ycykpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsaWRhdGlvbiA9PT0gJ3JlcXVpcmVkJykge1xuICAgICAgICAgICAgICAgICAgICBmb3JtVmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMucmVxdWlyZWQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsaWRhdGlvbiA9PT0gJ21pbicpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybVZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLm1pbih2YWxpZGF0b3JzW3ZhbGlkYXRpb25dKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZvcm1WYWxpZGF0b3JzO1xuICAgIH1cblxufVxuIl19