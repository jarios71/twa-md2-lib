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
        var /** @type {?} */ formValidators = [];
        if (validators) {
            try {
                for (var _a = tslib_1.__values(Object.keys(validators)), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var validation = _b.value;
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
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        return formValidators;
        var e_1, _c;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdhLXByb21wdC1kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vdHdhLW1kMi1kaWFsb2dzLyIsInNvdXJjZXMiOlsibGliL3Byb21wdC1kaWFsb2cvdHdhLXByb21wdC1kaWFsb2cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDaEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR3BFLE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBeUk1QyxrQ0FBbUIsU0FBaUQ7UUFBakQsY0FBUyxHQUFULFNBQVMsQ0FBd0M7b0JBWDNDLElBQUksU0FBUyxDQUFDLEVBQUUsQ0FBQzs0QkFDUixJQUFJLFlBQVksRUFBRTtLQVduRDs7OztJQUVELDJDQUFROzs7SUFBUjtRQUVJLHFCQUFNLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDckIsR0FBRyxDQUFDLENBQUMscUJBQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzFCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxXQUFXLENBQzNDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLEVBQUUsRUFDMUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMs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QUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNwQzs7Ozs7SUFFTyxnREFBYTs7OztjQUFDLFVBQWU7UUFFakMscUJBQU0sY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUUxQixFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDOztnQkFDYixHQUFHLENBQUMsQ0FBcUIsSUFBQSxLQUFBLGlCQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUEsZ0JBQUE7b0JBQTNDLElBQU0sVUFBVSxXQUFBO29CQUNqQixFQUFFLENBQUMsQ0FBQyxVQUFVLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQzt3QkFDNUIsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7cUJBQzVDO29CQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQzt3QkFDOUIsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQy9EO2lCQUNKOzs7Ozs7Ozs7U0FDSjtRQUVELE1BQU0sQ0FBQyxjQUFjLENBQUM7Ozs7Z0JBbE83QixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLHVCQUF1Qjs7O29CQUdqQyxNQUFNLEVBQUUsQ0FBQyxzREFBc0QsQ0FBQztvQkFDaEUsUUFBUSxFQUFFLDZpTEF1R1Q7aUJBQ0o7Ozs7Z0JBL0hRLFlBQVk7O21DQURyQjs7U0FpSWEsd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nUmVmIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cCwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFNhZmVIdG1sIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmltcG9ydCB7IG1hcCwgc3RhcnRXaXRoIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElUV0FQcm9tcHRGaWVsZCB7XG4gICAga2V5OiBzdHJpbmc7XG4gICAgbGFiZWw6IHN0cmluZztcbiAgICB0eXBlOiBzdHJpbmc7XG4gICAgZnhGbGV4OiBzdHJpbmc7XG4gICAgdmFsdWU6IHN0cmluZztcbiAgICBvcHRpb25zOiBhbnlbXTtcbiAgICBhdXRvY29tcGxldGU6IGFueTtcbiAgICByb3dzOiBhbnlbXTtcbiAgICB2YWxpZGF0aW9uOiBhbnk7XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndHdhLWFwcC1wcm9tcHQtZGlhbG9nJyxcbiAgICAvLyB0ZW1wbGF0ZVVybDogJy4vdHdhLXByb21wdC1kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxuICAgIC8vIHN0eWxlVXJsczogWycuL3R3YS1wcm9tcHQtZGlhbG9nLmNvbXBvbmVudC5jc3MnXVxuICAgIHN0eWxlczogWycubWF0LWVycm9yIHsgZGlzcGxheTogYmxvY2s7IG1hcmdpbjogLTE1cHggMCAxNXB4OyB9J10sXG4gICAgdGVtcGxhdGU6IGBcbiAgICA8aDI+e3sgdGl0bGUgfX08L2gyPlxuICAgIDxwIFtpbm5lckh0bWxdPVwibWVzc2FnZUh0bWxcIj48L3A+XG5cbiAgICA8Zm9ybSBub3ZhbGlkYXRlIChuZ1N1Ym1pdCk9XCJvblN1Ym1pdChmb3JtLnZhbHVlKVwiIFtmb3JtR3JvdXBdPVwiZm9ybVwiIGZ4TGF5b3V0PVwicm93IHdyYXBcIiBmeExheW91dEdhcD1cIjEwcHhcIj5cbiAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgcHJvcCBvZiBmaWVsZHNcIiBmeEZsZXg9XCJ7e3Byb3AuZnhGbGV4ID8gKCdjYWxjKCcgKyBwcm9wLmZ4RmxleCArICcgLSAxMHB4KScpIDogJzEwMCUnfX1cIiBmeExheW91dD1cImNvbHVtblwiPlxuICAgICAgICAgICAgPGRpdiBbbmdTd2l0Y2hdPVwicHJvcC50eXBlXCIgZnhGbGV4PVwiMTAwJVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIid0ZXh0J1wiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgKm5nSWY9XCIhcHJvcC5hdXRvY29tcGxldGVcIiBmeEZsZXg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgcGxhY2Vob2xkZXI9XCJ7e3Byb3AubGFiZWx9fVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJwcm9wLmtleVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2lkXT1cInByb3Aua2V5XCIgW3R5cGVdPVwicHJvcC50eXBlXCIgZnhGbGV4PlxuICAgICAgICAgICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwicHJvcC5hdXRvY29tcGxldGVcIiBmeEZsZXg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgZnhGbGV4PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBtYXRJbnB1dCBwbGFjZWhvbGRlcj1cInt7cHJvcC5sYWJlbH19XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJwcm9wLmtleVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFttYXRBdXRvY29tcGxldGVdPVwiYXV0b1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChibHVyKT1cImFjQ2hlY2tCbHVyKHByb3ApXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2lkXT1cInByb3Aua2V5XCIgW3R5cGVdPVwicHJvcC50eXBlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1hdXRvY29tcGxldGUgI2F1dG89XCJtYXRBdXRvY29tcGxldGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvcHRpb25TZWxlY3RlZCk9XCJhY0NsaWNrKHByb3AsICRldmVudClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bWF0LW9wdGlvbiAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIHByb3AuYXV0b2NvbXBsZXRlLmZpbHRlcmVkT3B0aW9ucyB8IGFzeW5jXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3ZhbHVlXT1cIm9wdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IG9wdGlvbiB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbWF0LW9wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbWF0LWF1dG9jb21wbGV0ZT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ3RleHRhcmVhJ1wiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgZnhGbGV4PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIG1hdElucHV0IHBsYWNlaG9sZGVyPVwie3twcm9wLmxhYmVsfX1cIiByb3dzPVwie3twcm9wLnJvd3N8fCczJ319XCIgYXV0b3NpemVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cInByb3Aua2V5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaWRdPVwicHJvcC5rZXlcIiBbdHlwZV09XCJwcm9wLnR5cGVcIj48L3RleHRhcmVhPlxuICAgICAgICAgICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIidudW1iZXInXCI+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZCBmeEZsZXg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgcGxhY2Vob2xkZXI9XCJ7e3Byb3AubGFiZWx9fVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJwcm9wLmtleVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2lkXT1cInByb3Aua2V5XCIgW3R5cGVdPVwicHJvcC50eXBlXCI+XG4gICAgICAgICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCInZGF0ZSdcIj5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkIGZ4RmxleD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBtYXRJbnB1dCBbbWF0RGF0ZXBpY2tlcl09cGlja2VyIHBsYWNlaG9sZGVyPVwie3twcm9wLmxhYmVsfX1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwicHJvcC5rZXlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpZF09XCJwcm9wLmtleVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1kYXRlcGlja2VyICNwaWNrZXI+PC9tYXQtZGF0ZXBpY2tlcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxtYXQtZGF0ZXBpY2tlci10b2dnbGUgbWF0U3VmZml4IFtmb3JdPVwicGlja2VyXCI+PC9tYXQtZGF0ZXBpY2tlci10b2dnbGU+XG4gICAgICAgICAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ3RpbWUnXCI+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZCBmeEZsZXg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgW25neFRpbWVwaWNrZXJdPVwidHBpY2tlclwiIHBsYWNlaG9sZGVyPVwie3twcm9wLmxhYmVsfX1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmb3JtYXRdPVwiMjRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwicHJvcC5rZXlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpZF09XCJwcm9wLmtleVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5neC1tYXRlcmlhbC10aW1lcGlja2VyICN0cGlja2VyPjwvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCIncmFkaW8nXCIgZnhMYXlvdXQ9XCJjb2x1bW5cIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBfbmdjb250ZW50LWMyMD1cIlwiIHN0eWxlPVwiaGVpZ2h0OiAyMHB4O1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIF9uZ2NvbnRlbnQtYzIwPVwiXCIgc3R5bGU9XCJ0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTEuMjgxMjVlbSkgc2NhbGUoMC43NSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVyc3BlY3RpdmUoMTAwcHgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZVooMC4wMDFweCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTEuMjgxMjVlbSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGUoMC43NSk7d2lkdGg6IDEzMy4zMzMzMzMzMyU7bWFyZ2luOiAyMHB4IDAgMCAwO2ZvbnQtd2VpZ2h0OiAxMDA7Y29sb3I6ICM2NjY7XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3twcm9wLmxhYmVsfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8bWF0LXJhZGlvLWdyb3VwIFtmb3JtQ29udHJvbE5hbWVdPVwicHJvcC5rZXlcIiBbbmFtZV09XCJwcm9wLmtleVwiIGZ4TGF5b3V0PVwiY29sdW1uXCIgc3R5bGU9XCJtYXJnaW4tdG9wOiAxNHB4O1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1yYWRpby1idXR0b24gW3ZhbHVlXT1cIm9wdGlvbi52YWx1ZVwiICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgcHJvcC5vcHRpb25zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3tvcHRpb24ubGFiZWx9fVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9tYXQtcmFkaW8tYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L21hdC1yYWRpby1ncm91cD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIidzZWxlY3QnXCI+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZCBmeEZsZXg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bWF0LXNlbGVjdCBbZm9ybUNvbnRyb2xOYW1lXT1cInByb3Aua2V5XCIgcGxhY2Vob2xkZXI9XCJ7e3Byb3AubGFiZWx9fVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgcHJvcC5vcHRpb25zXCIgW3ZhbHVlXT1cIm9wdGlvbi52YWx1ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBvcHRpb24ubGFiZWwgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L21hdC1vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L21hdC1zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlcnJvclwiICpuZ0lmPVwiZm9ybS5nZXQocHJvcC5rZXkpLmludmFsaWQgJiYgKGZvcm0uZ2V0KHByb3Aua2V5KS5kaXJ0eSB8fCBmb3JtLmdldChwcm9wLmtleSkudG91Y2hlZClcIiBmeEZsZXg9XCIxMDAlXCI+XG4gICAgICAgICAgICAgICAgPG1hdC1lcnJvciAqbmdJZj1cImZvcm0uZ2V0KHByb3Aua2V5KS5lcnJvcnMucmVxdWlyZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgRWwgY2FtcG8ge3sgcHJvcC5sYWJlbCB9fSBlcyBvYmxpZ2F0b3Jpby5cbiAgICAgICAgICAgICAgICA8L21hdC1lcnJvcj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Zvcm0+XG5cbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBtYXQtcmFpc2VkLWJ1dHRvblxuICAgICAgICAoY2xpY2spPVwic2VuZCgpXCI+e3sgb2tUZXh0IH19PC9idXR0b24+XG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbWF0LWJ1dHRvblxuICAgICAgICAoY2xpY2spPVwiZGlhbG9nUmVmLmNsb3NlKGZhbHNlKVwiPnt7IGNhbmNlbFRleHQgfX08L2J1dHRvbj5cblxuICAgIGBcbn0pXG5leHBvcnQgY2xhc3MgVFdBUHJvbXB0RGlhbG9nQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIHB1YmxpYyBmb3JtOiBGb3JtR3JvdXAgPSBuZXcgRm9ybUdyb3VwKHt9KTtcbiAgICBmb3JtU3VibWl0RXY6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgcHVibGljIHRpdGxlOiBzdHJpbmc7XG4gICAgcHVibGljIG1lc3NhZ2U6IHN0cmluZztcbiAgICBwdWJsaWMgbWVzc2FnZUh0bWw6IFNhZmVIdG1sO1xuICAgIHB1YmxpYyBmaWVsZHM6IElUV0FQcm9tcHRGaWVsZFtdO1xuICAgIHB1YmxpYyBva1RleHQ6IHN0cmluZztcbiAgICBwdWJsaWMgY2FuY2VsVGV4dDogc3RyaW5nO1xuICAgIHB1YmxpYyBvblN1Ym1pdDogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPFRXQVByb21wdERpYWxvZ0NvbXBvbmVudD4pIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcblxuICAgICAgICBjb25zdCBmb3JtR3JvdXAgPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCBpIGluIHRoaXMuZmllbGRzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5maWVsZHMuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgICAgICAgICBmb3JtR3JvdXBbdGhpcy5maWVsZHNbaV0ua2V5XSA9IG5ldyBGb3JtQ29udHJvbChcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWVsZHNbaV0udmFsdWUgfHwgJycsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwVmFsaWRhdG9ycyh0aGlzLmZpZWxkc1tpXS52YWxpZGF0aW9uKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5maWVsZHNbaV0uYXV0b2NvbXBsZXRlKTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuZmllbGRzW2ldLmF1dG9jb21wbGV0ZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy5maWVsZHNbaV0uYXV0b2NvbXBsZXRlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5maWVsZHNbaV0uYXV0b2NvbXBsZXRlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWVsZHNbaV0uYXV0b2NvbXBsZXRlLmZpbHRlcmVkT3B0aW9ucyA9IHRoaXMuZ2V0Rm9ybUdyb3VwRXZlbnQoZm9ybUdyb3VwLCBpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZvcm0gPSBuZXcgRm9ybUdyb3VwKGZvcm1Hcm91cCk7XG5cbiAgICB9XG5cbiAgICBnZXRGb3JtR3JvdXBFdmVudChmb3JtR3JvdXAsIGkpIHtcbiAgICAgICAgcmV0dXJuIGZvcm1Hcm91cFt0aGlzLmZpZWxkc1tpXS5rZXldLnZhbHVlQ2hhbmdlcy5waXBlKFxuICAgICAgICAgICAgc3RhcnRXaXRoKCcnKSxcbiAgICAgICAgICAgIG1hcChmaWx0ZXJWYWx1ZSA9PiBmaWx0ZXJWYWx1ZSA/IHRoaXMuX2ZpbHRlclZhbHVlcyhmaWx0ZXJWYWx1ZSwgdGhpcy5maWVsZHNbaV0uYXV0b2NvbXBsZXRlLm9wdGlvbnMpIDpcbiAgICAgICAgICAgICAgICB0aGlzLmZpZWxkc1tpXS5hdXRvY29tcGxldGUub3B0aW9ucy5zbGljZSgpKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2ZpbHRlclZhbHVlcyh2YWx1ZSwgb3B0aW9ucykge1xuXG4gICAgICAgIGNvbnN0IGZpbHRlcmVkVmFsdWUgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIHJldHVybiBvcHRpb25zLmZpbHRlcihvcHRpb24gPT4gb3B0aW9uLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihmaWx0ZXJlZFZhbHVlKSA+PSAwKTtcblxuICAgIH1cblxuICAgIGdldEZvcm1TdWJtaXRFdigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZvcm1TdWJtaXRFdjtcbiAgICB9XG5cbiAgICBzZW5kKCkge1xuICAgICAgICAgICAgbGV0IGk7XG4gICAgICAgICAgICB0aGlzLmZvcm0udXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICAgICAgICAgICAgaWYgKHRoaXMuZm9ybS5zdGF0dXMgIT09ICdJTlZBTElEJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSh0aGlzLmZvcm0udmFsdWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpIGluIHRoaXMuZm9ybS5jb250cm9scykge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmZvcm0uY29udHJvbHNbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmZvcm0uY29udHJvbHMuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZm9ybS5jb250cm9sc1tpXS5tYXJrQXNUb3VjaGVkKHsgb25seVNlbGY6IHRydWUgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcm0uY29udHJvbHNbaV0udXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgIH1cblxuICAgIGFjQ2xpY2soZmllbGQ6IGFueSwgZXZlbnQ6IGFueSkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhldmVudCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGZpZWxkLmF1dG9jb21wbGV0ZSk7XG4gICAgICAgIGlmICh0eXBlb2YgZmllbGQuYXV0b2NvbXBsZXRlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBmaWVsZC5hdXRvY29tcGxldGUuZm9yY2VTZWxlY3QgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgICAgICAgZmllbGQuYXV0b2NvbXBsZXRlLmZvcmNlU2VsZWN0KSB7XG4gICAgICAgICAgICAgICAgZmllbGQuYXV0b2NvbXBsZXRlLnNlbGVjdGVkID0gZXZlbnQub3B0aW9uLnZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWNDaGVja0JsdXIoZmllbGQpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coZmllbGQuYXV0b2NvbXBsZXRlLnNlbGVjdGVkLCB0aGlzLmZvcm0uY29udHJvbHNbZmllbGQua2V5XS52YWx1ZSk7XG4gICAgICAgIGlmICh0eXBlb2YgZmllbGQuYXV0b2NvbXBsZXRlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBmaWVsZC5hdXRvY29tcGxldGUuZm9yY2VTZWxlY3QgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgICAgICAgZmllbGQuYXV0b2NvbXBsZXRlLmZvcmNlU2VsZWN0KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFmaWVsZC5hdXRvY29tcGxldGUuc2VsZWN0ZWQgfHxcbiAgICAgICAgICAgICAgICAgICAgZmllbGQuYXV0b2NvbXBsZXRlLnNlbGVjdGVkICE9PSB0aGlzLmZvcm0uY29udHJvbHNbZmllbGQua2V5XS52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcm0uY29udHJvbHNbZmllbGQua2V5XS5zZXRWYWx1ZShudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgZmllbGQuYXV0b2NvbXBsZXRlLnNlbGVjdGVkID0gJyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3VibWl0Rm9ybShmb3JtOiBhbnkpIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybVN1Ym1pdEV2LmVtaXQoZm9ybSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtYXBWYWxpZGF0b3JzKHZhbGlkYXRvcnM6IGFueSkge1xuXG4gICAgICAgIGNvbnN0IGZvcm1WYWxpZGF0b3JzID0gW107XG5cbiAgICAgICAgaWYgKHZhbGlkYXRvcnMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdmFsaWRhdGlvbiBvZiBPYmplY3Qua2V5cyh2YWxpZGF0b3JzKSkge1xuICAgICAgICAgICAgICAgIGlmICh2YWxpZGF0aW9uID09PSAncmVxdWlyZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1WYWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5yZXF1aXJlZCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWxpZGF0aW9uID09PSAnbWluJykge1xuICAgICAgICAgICAgICAgICAgICBmb3JtVmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMubWluKHZhbGlkYXRvcnNbdmFsaWRhdGlvbl0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZm9ybVZhbGlkYXRvcnM7XG4gICAgfVxuXG59XG4iXX0=