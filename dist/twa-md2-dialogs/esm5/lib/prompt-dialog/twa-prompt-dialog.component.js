/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        /** @type {?} */
        var formGroup = {};
        for (var i in this.fields) {
            if (this.fields.hasOwnProperty(i)) {
                formGroup[this.fields[i].key] = new FormControl(this.fields[i].value || '', this.mapValidators(this.fields[i].validation, this.fields[i].key));
                if (typeof this.fields[i].autocomplete !== 'undefined' && this.fields[i].autocomplete !== undefined) {
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
     * @param {?} object
     * @return {?}
     */
    TWAPromptDialogComponent.prototype.log = /**
     * @param {?} object
     * @return {?}
     */
    function (object) {
        console.log(object);
    };
    /**
     * @private
     * @param {?} value
     * @param {?} options
     * @return {?}
     */
    TWAPromptDialogComponent.prototype._filterValues = /**
     * @private
     * @param {?} value
     * @param {?} options
     * @return {?}
     */
    function (value, options) {
        /** @type {?} */
        var filteredValue = value.toLowerCase();
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
        /** @type {?} */
        var i;
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
     * @param {?} prop
     * @param {?} error
     * @return {?}
     */
    TWAPromptDialogComponent.prototype.drawCustomErrors = /**
     * @param {?} prop
     * @param {?} error
     * @return {?}
     */
    function (prop, error) {
        /** @type {?} */
        var ret = false;
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
    };
    /**
     * @private
     * @param {?} validators
     * @param {?} field
     * @return {?}
     */
    TWAPromptDialogComponent.prototype.mapValidators = /**
     * @private
     * @param {?} validators
     * @param {?} field
     * @return {?}
     */
    function (validators, field) {
        var _this = this;
        var e_1, _a;
        /** @type {?} */
        var formValidators = [];
        if (validators) {
            var _loop_1 = function (validation) {
                if (validation === 'required') {
                    formValidators.push(Validators.required);
                }
                else if (validation === 'match') {
                    formValidators.push(function () {
                        /** @type {?} */
                        var ret = false;
                        /** @type {?} */
                        var control = _this.form.get(validators[validation]);
                        if (!_this.form.get(field)) {
                            ret = null;
                        }
                        ret = !(_this.form.get(field) && _this.form.get(field).value === control.value);
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
            };
            try {
                for (var _b = tslib_1.__values(Object.keys(validators)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var validation = _c.value;
                    _loop_1(validation);
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
                    template: "\n    <h2>{{ title }}</h2>\n    <p [innerHtml]=\"messageHtml\"></p>\n\n    <form novalidate (ngSubmit)=\"submitForm(form.value)\" [formGroup]=\"form\" fxLayout=\"row wrap\" fxLayoutGap=\"10px\">\n        <div *ngFor=\"let prop of fields\" fxFlex=\"{{prop.fxFlex ? ('calc(' + prop.fxFlex + ' - 10px)') : '100%'}}\" fxLayout=\"column\">\n            <div [ngSwitch]=\"prop.type\" fxFlex=\"100%\">\n                <div *ngSwitchCase=\"'text'\">\n                    <mat-form-field *ngIf=\"!prop.autocomplete\" fxFlex>\n                        <input matInput placeholder=\"{{prop.label}}\"\n                            [formControlName]=\"prop.key\"\n                            [id]=\"prop.key\" [type]=\"prop.type\" fxFlex>\n                    </mat-form-field>\n                    <div *ngIf=\"prop.autocomplete\" fxFlex>\n                        <mat-form-field fxFlex>\n                            <input matInput placeholder=\"{{prop.label}}\"\n                                [formControlName]=\"prop.key\"\n                                [matAutocomplete]=\"auto\"\n                                (blur)=\"acCheckBlur(prop)\"\n                                [id]=\"prop.key\" [type]=\"prop.type\">\n                        </mat-form-field>\n                        <mat-autocomplete #auto=\"matAutocomplete\"\n                            (optionSelected)=\"acClick(prop, $event)\">\n                            <mat-option *ngFor=\"let option of prop.autocomplete.filteredOptions | async\"\n                                [value]=\"option\">\n                            {{ option }}\n                            </mat-option>\n                        </mat-autocomplete>\n                    </div>\n                </div>\n                <div *ngSwitchCase=\"'password'\">\n                    <mat-form-field fxFlex>\n                        <input matInput type=\"password\" placeholder=\"{{prop.label}}\"\n                            [formControlName]=\"prop.key\"\n                            [id]=\"prop.key\" [type]=\"prop.type\" fxFlex>\n                    </mat-form-field>\n                </div>\n                <div *ngSwitchCase=\"'textarea'\">\n                    <mat-form-field fxFlex>\n                        <textarea matInput placeholder=\"{{prop.label}}\" rows=\"{{prop.rows||'3'}}\" autosize\n                            [formControlName]=\"prop.key\"\n                            [id]=\"prop.key\" [type]=\"prop.type\"></textarea>\n                    </mat-form-field>\n                </div>\n                <div *ngSwitchCase=\"'number'\">\n                    <mat-form-field fxFlex>\n                        <input matInput placeholder=\"{{prop.label}}\"\n                            [formControlName]=\"prop.key\"\n                            [id]=\"prop.key\" [type]=\"prop.type\">\n                   </mat-form-field>\n                </div>\n                <div *ngSwitchCase=\"'date'\">\n                    <mat-form-field fxFlex>\n                        <input matInput [matDatepicker]=picker placeholder=\"{{prop.label}}\"\n                            [formControlName]=\"prop.key\"\n                            [id]=\"prop.key\">\n                        <mat-datepicker #picker></mat-datepicker>\n                        <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n                    </mat-form-field>\n                </div>\n                <div *ngSwitchCase=\"'time'\">\n                    <mat-form-field fxFlex>\n                        <input matInput [ngxTimepicker]=\"tpicker\" placeholder=\"{{prop.label}}\"\n                            [format]=\"24\"\n                            [formControlName]=\"prop.key\"\n                            [id]=\"prop.key\">\n                        <ngx-material-timepicker #tpicker></ngx-material-timepicker>\n                    </mat-form-field>\n                </div>\n\n                <div *ngSwitchCase=\"'radio'\" fxLayout=\"column\">\n                    <div _ngcontent-c20=\"\" style=\"height: 20px;\">\n                        <label _ngcontent-c20=\"\" style=\"transform: translateY(-1.28125em) scale(0.75)\n                                perspective(100px)\n                                translateZ(0.001px);\n                                -ms-transform: translateY(-1.28125em)\n                                scale(0.75);width: 133.33333333%;margin: 20px 0 0 0;font-weight: 100;color: #666;\">\n                            {{prop.label}}\n                        </label>\n                    </div>\n                    <mat-radio-group [formControlName]=\"prop.key\" [name]=\"prop.key\" fxLayout=\"column\" style=\"margin-top: 14px;\">\n                        <mat-radio-button [value]=\"option.value\" *ngFor=\"let option of prop.options\">\n                            {{option.label}}\n                        </mat-radio-button>\n                    </mat-radio-group>\n                </div>\n\n                <div *ngSwitchCase=\"'select'\">\n                    <mat-form-field fxFlex>\n                        <mat-select [formControlName]=\"prop.key\" placeholder=\"{{prop.label}}\">\n                            <mat-option *ngFor=\"let option of prop.options\" [value]=\"option.value\">\n                                {{ option.label }}\n                            </mat-option>\n                        </mat-select>\n                    </mat-form-field>\n                </div>\n            </div>\n            <div class=\"error\" *ngIf=\"form.get(prop.key).errors\" fxFlex=\"100%\">\n            </div>\n            <div class=\"error\" *ngIf=\"form.get(prop.key).invalid && (form.get(prop.key).dirty || form.get(prop.key).touched)\" fxFlex=\"100%\">\n                <mat-error *ngIf=\"form.get(prop.key).errors.required\">\n                    <div *ngIf=\"drawCustomErrors(prop, 'required')\">\n                        {{prop.validationMessages.required}}\n                    </div>\n                    <div *ngIf=\"!prop.validationMessages || !prop.validationMessages.required\">\n                        The field {{ prop.label }} is required.\n                    </div>\n                </mat-error>\n                <mat-error *ngIf=\"form.get(prop.key).errors.match\">\n                    <div *ngIf=\"drawCustomErrors(prop, 'match')\">\n                        {{prop.validationMessages.match}}\n                    </div>\n                    <div *ngIf=\"!prop.validationMessages || !prop.validationMessages.match\">\n                        The fields doesn't match.\n                    </div>\n                </mat-error>\n                <mat-error *ngIf=\"form.get(prop.key).errors.min\">\n                    <div *ngIf=\"drawCustomErrors(prop, 'min')\">\n                        {{prop.validationMessages.min}}\n                    </div>\n                    <div *ngIf=\"!prop.validationMessages || !prop.validationMessages.min\">\n                        The minimal value is {{form.get(prop.key).errors.min.min}}.\n                    </div>\n                </mat-error>\n                <mat-error *ngIf=\"form.get(prop.key).errors.max\">\n                    <div *ngIf=\"drawCustomErrors(prop, 'max')\">\n                        {{prop.validationMessages.max}}\n                    </div>\n                    <div *ngIf=\"!prop.validationMessages || !prop.validationMessages.max\">\n                        The max value is {{form.get(prop.key).errors.max.max}}.\n                    </div>\n                </mat-error>\n            </div>\n        </div>\n    </form>\n\n    <button type=\"button\" mat-raised-button\n        (click)=\"send()\">{{ okText }}</button>\n    <button type=\"button\" mat-button\n        (click)=\"dialogRef.close(false)\">{{ cancelText }}</button>\n\n    "
                },] },
    ];
    /** @nocollapse */
    TWAPromptDialogComponent.ctorParameters = function () { return [
        { type: MatDialogRef }
    ]; };
    return TWAPromptDialogComponent;
}());
export { TWAPromptDialogComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdhLXByb21wdC1kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vdHdhLW1kMi1kaWFsb2dzLyIsInNvdXJjZXMiOlsibGliL3Byb21wdC1kaWFsb2cvdHdhLXByb21wdC1kaWFsb2cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDaEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR3BFLE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFJaEQscUNBV0M7OztJQVZHLDhCQUFZOztJQUNaLGdDQUFjOztJQUNkLCtCQUFhOztJQUNiLGlDQUFlOztJQUNmLGdDQUFjOztJQUNkLGtDQUFlOztJQUNmLHVDQUFrQjs7SUFDbEIsK0JBQVk7O0lBQ1oscUNBQWdCOztJQUNoQiw2Q0FBeUI7O0FBRzdCO0lBaUtJLGtDQUFtQixTQUFpRDtRQUFqRCxjQUFTLEdBQVQsU0FBUyxDQUF3QztRQVg3RCxTQUFJLEdBQWMsSUFBSSxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDM0MsaUJBQVksR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQVdyRCxDQUFDOzs7O0lBRUQsMkNBQVE7OztJQUFSOztZQUVVLFNBQVMsR0FBRyxFQUFFO1FBQ3BCLEtBQUssSUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUN6QixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUMvQixTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLFdBQVcs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LDBDQUFzQjs7SUFDdEIsOENBQTBCOztJQUMxQiw0Q0FBcUI7O0lBRVQsNkNBQXdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nUmVmIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cCwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFNhZmVIdG1sIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmltcG9ydCB7IG1hcCwgc3RhcnRXaXRoIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBNYXRjaFZhbGlkYXRvciB9IGZyb20gJy4vbWF0Y2gtdmFsaWRhdG9yLmRpcmVjdGl2ZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVRXQVByb21wdEZpZWxkIHtcbiAgICBrZXk6IHN0cmluZztcbiAgICBsYWJlbDogc3RyaW5nO1xuICAgIHR5cGU6IHN0cmluZztcbiAgICBmeEZsZXg6IHN0cmluZztcbiAgICB2YWx1ZTogc3RyaW5nO1xuICAgIG9wdGlvbnM6IGFueVtdO1xuICAgIGF1dG9jb21wbGV0ZTogYW55O1xuICAgIHJvd3M6IGFueVtdO1xuICAgIHZhbGlkYXRpb246IGFueTtcbiAgICB2YWxpZGF0aW9uTWVzc2FnZXM/OiBhbnk7XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndHdhLWFwcC1wcm9tcHQtZGlhbG9nJyxcbiAgICAvLyB0ZW1wbGF0ZVVybDogJy4vdHdhLXByb21wdC1kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxuICAgIC8vIHN0eWxlVXJsczogWycuL3R3YS1wcm9tcHQtZGlhbG9nLmNvbXBvbmVudC5jc3MnXVxuICAgIHN0eWxlczogWycubWF0LWVycm9yIHsgZGlzcGxheTogYmxvY2s7IG1hcmdpbjogLTE1cHggMCAxNXB4OyB9J10sXG4gICAgdGVtcGxhdGU6IGBcbiAgICA8aDI+e3sgdGl0bGUgfX08L2gyPlxuICAgIDxwIFtpbm5lckh0bWxdPVwibWVzc2FnZUh0bWxcIj48L3A+XG5cbiAgICA8Zm9ybSBub3ZhbGlkYXRlIChuZ1N1Ym1pdCk9XCJzdWJtaXRGb3JtKGZvcm0udmFsdWUpXCIgW2Zvcm1Hcm91cF09XCJmb3JtXCIgZnhMYXlvdXQ9XCJyb3cgd3JhcFwiIGZ4TGF5b3V0R2FwPVwiMTBweFwiPlxuICAgICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBwcm9wIG9mIGZpZWxkc1wiIGZ4RmxleD1cInt7cHJvcC5meEZsZXggPyAoJ2NhbGMoJyArIHByb3AuZnhGbGV4ICsgJyAtIDEwcHgpJykgOiAnMTAwJSd9fVwiIGZ4TGF5b3V0PVwiY29sdW1uXCI+XG4gICAgICAgICAgICA8ZGl2IFtuZ1N3aXRjaF09XCJwcm9wLnR5cGVcIiBmeEZsZXg9XCIxMDAlXCI+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ3RleHQnXCI+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZCAqbmdJZj1cIiFwcm9wLmF1dG9jb21wbGV0ZVwiIGZ4RmxleD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBtYXRJbnB1dCBwbGFjZWhvbGRlcj1cInt7cHJvcC5sYWJlbH19XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cInByb3Aua2V5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaWRdPVwicHJvcC5rZXlcIiBbdHlwZV09XCJwcm9wLnR5cGVcIiBmeEZsZXg+XG4gICAgICAgICAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJwcm9wLmF1dG9jb21wbGV0ZVwiIGZ4RmxleD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZCBmeEZsZXg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IG1hdElucHV0IHBsYWNlaG9sZGVyPVwie3twcm9wLmxhYmVsfX1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cInByb3Aua2V5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW21hdEF1dG9jb21wbGV0ZV09XCJhdXRvXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGJsdXIpPVwiYWNDaGVja0JsdXIocHJvcClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaWRdPVwicHJvcC5rZXlcIiBbdHlwZV09XCJwcm9wLnR5cGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bWF0LWF1dG9jb21wbGV0ZSAjYXV0bz1cIm1hdEF1dG9jb21wbGV0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKG9wdGlvblNlbGVjdGVkKT1cImFjQ2xpY2socHJvcCwgJGV2ZW50KVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgcHJvcC5hdXRvY29tcGxldGUuZmlsdGVyZWRPcHRpb25zIHwgYXN5bmNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdmFsdWVdPVwib3B0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgb3B0aW9uIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9tYXQtb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9tYXQtYXV0b2NvbXBsZXRlPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCIncGFzc3dvcmQnXCI+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZCBmeEZsZXg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgcGxhY2Vob2xkZXI9XCJ7e3Byb3AubGFiZWx9fVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJwcm9wLmtleVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2lkXT1cInByb3Aua2V5XCIgW3R5cGVdPVwicHJvcC50eXBlXCIgZnhGbGV4PlxuICAgICAgICAgICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIid0ZXh0YXJlYSdcIj5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkIGZ4RmxleD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBtYXRJbnB1dCBwbGFjZWhvbGRlcj1cInt7cHJvcC5sYWJlbH19XCIgcm93cz1cInt7cHJvcC5yb3dzfHwnMyd9fVwiIGF1dG9zaXplXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJwcm9wLmtleVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2lkXT1cInByb3Aua2V5XCIgW3R5cGVdPVwicHJvcC50eXBlXCI+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCInbnVtYmVyJ1wiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgZnhGbGV4PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IG1hdElucHV0IHBsYWNlaG9sZGVyPVwie3twcm9wLmxhYmVsfX1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwicHJvcC5rZXlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpZF09XCJwcm9wLmtleVwiIFt0eXBlXT1cInByb3AudHlwZVwiPlxuICAgICAgICAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ2RhdGUnXCI+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZCBmeEZsZXg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgW21hdERhdGVwaWNrZXJdPXBpY2tlciBwbGFjZWhvbGRlcj1cInt7cHJvcC5sYWJlbH19XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cInByb3Aua2V5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaWRdPVwicHJvcC5rZXlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxtYXQtZGF0ZXBpY2tlciAjcGlja2VyPjwvbWF0LWRhdGVwaWNrZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bWF0LWRhdGVwaWNrZXItdG9nZ2xlIG1hdFN1ZmZpeCBbZm9yXT1cInBpY2tlclwiPjwvbWF0LWRhdGVwaWNrZXItdG9nZ2xlPlxuICAgICAgICAgICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIid0aW1lJ1wiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgZnhGbGV4PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IG1hdElucHV0IFtuZ3hUaW1lcGlja2VyXT1cInRwaWNrZXJcIiBwbGFjZWhvbGRlcj1cInt7cHJvcC5sYWJlbH19XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZm9ybWF0XT1cIjI0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cInByb3Aua2V5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaWRdPVwicHJvcC5rZXlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZ3gtbWF0ZXJpYWwtdGltZXBpY2tlciAjdHBpY2tlcj48L25neC1tYXRlcmlhbC10aW1lcGlja2VyPlxuICAgICAgICAgICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ3JhZGlvJ1wiIGZ4TGF5b3V0PVwiY29sdW1uXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgX25nY29udGVudC1jMjA9XCJcIiBzdHlsZT1cImhlaWdodDogMjBweDtcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBfbmdjb250ZW50LWMyMD1cIlwiIHN0eWxlPVwidHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xLjI4MTI1ZW0pIHNjYWxlKDAuNzUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNwZWN0aXZlKDEwMHB4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVaKDAuMDAxcHgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xLjI4MTI1ZW0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlKDAuNzUpO3dpZHRoOiAxMzMuMzMzMzMzMzMlO21hcmdpbjogMjBweCAwIDAgMDtmb250LXdlaWdodDogMTAwO2NvbG9yOiAjNjY2O1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7cHJvcC5sYWJlbH19XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1yYWRpby1ncm91cCBbZm9ybUNvbnRyb2xOYW1lXT1cInByb3Aua2V5XCIgW25hbWVdPVwicHJvcC5rZXlcIiBmeExheW91dD1cImNvbHVtblwiIHN0eWxlPVwibWFyZ2luLXRvcDogMTRweDtcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxtYXQtcmFkaW8tYnV0dG9uIFt2YWx1ZV09XCJvcHRpb24udmFsdWVcIiAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIHByb3Aub3B0aW9uc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7b3B0aW9uLmxhYmVsfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbWF0LXJhZGlvLWJ1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9tYXQtcmFkaW8tZ3JvdXA+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCInc2VsZWN0J1wiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgZnhGbGV4PlxuICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1zZWxlY3QgW2Zvcm1Db250cm9sTmFtZV09XCJwcm9wLmtleVwiIHBsYWNlaG9sZGVyPVwie3twcm9wLmxhYmVsfX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bWF0LW9wdGlvbiAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIHByb3Aub3B0aW9uc1wiIFt2YWx1ZV09XCJvcHRpb24udmFsdWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgb3B0aW9uLmxhYmVsIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9tYXQtb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9tYXQtc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZXJyb3JcIiAqbmdJZj1cImZvcm0uZ2V0KHByb3Aua2V5KS5lcnJvcnNcIiBmeEZsZXg9XCIxMDAlXCI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlcnJvclwiICpuZ0lmPVwiZm9ybS5nZXQocHJvcC5rZXkpLmludmFsaWQgJiYgKGZvcm0uZ2V0KHByb3Aua2V5KS5kaXJ0eSB8fCBmb3JtLmdldChwcm9wLmtleSkudG91Y2hlZClcIiBmeEZsZXg9XCIxMDAlXCI+XG4gICAgICAgICAgICAgICAgPG1hdC1lcnJvciAqbmdJZj1cImZvcm0uZ2V0KHByb3Aua2V5KS5lcnJvcnMucmVxdWlyZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cImRyYXdDdXN0b21FcnJvcnMocHJvcCwgJ3JlcXVpcmVkJylcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt7cHJvcC52YWxpZGF0aW9uTWVzc2FnZXMucmVxdWlyZWR9fVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cIiFwcm9wLnZhbGlkYXRpb25NZXNzYWdlcyB8fCAhcHJvcC52YWxpZGF0aW9uTWVzc2FnZXMucmVxdWlyZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIFRoZSBmaWVsZCB7eyBwcm9wLmxhYmVsIH19IGlzIHJlcXVpcmVkLlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L21hdC1lcnJvcj5cbiAgICAgICAgICAgICAgICA8bWF0LWVycm9yICpuZ0lmPVwiZm9ybS5nZXQocHJvcC5rZXkpLmVycm9ycy5tYXRjaFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiZHJhd0N1c3RvbUVycm9ycyhwcm9wLCAnbWF0Y2gnKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge3twcm9wLnZhbGlkYXRpb25NZXNzYWdlcy5tYXRjaH19XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiIXByb3AudmFsaWRhdGlvbk1lc3NhZ2VzIHx8ICFwcm9wLnZhbGlkYXRpb25NZXNzYWdlcy5tYXRjaFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgVGhlIGZpZWxkcyBkb2Vzbid0IG1hdGNoLlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L21hdC1lcnJvcj5cbiAgICAgICAgICAgICAgICA8bWF0LWVycm9yICpuZ0lmPVwiZm9ybS5nZXQocHJvcC5rZXkpLmVycm9ycy5taW5cIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cImRyYXdDdXN0b21FcnJvcnMocHJvcCwgJ21pbicpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7e3Byb3AudmFsaWRhdGlvbk1lc3NhZ2VzLm1pbn19XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiIXByb3AudmFsaWRhdGlvbk1lc3NhZ2VzIHx8ICFwcm9wLnZhbGlkYXRpb25NZXNzYWdlcy5taW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIFRoZSBtaW5pbWFsIHZhbHVlIGlzIHt7Zm9ybS5nZXQocHJvcC5rZXkpLmVycm9ycy5taW4ubWlufX0uXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvbWF0LWVycm9yPlxuICAgICAgICAgICAgICAgIDxtYXQtZXJyb3IgKm5nSWY9XCJmb3JtLmdldChwcm9wLmtleSkuZXJyb3JzLm1heFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiZHJhd0N1c3RvbUVycm9ycyhwcm9wLCAnbWF4JylcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt7cHJvcC52YWxpZGF0aW9uTWVzc2FnZXMubWF4fX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCIhcHJvcC52YWxpZGF0aW9uTWVzc2FnZXMgfHwgIXByb3AudmFsaWRhdGlvbk1lc3NhZ2VzLm1heFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgVGhlIG1heCB2YWx1ZSBpcyB7e2Zvcm0uZ2V0KHByb3Aua2V5KS5lcnJvcnMubWF4Lm1heH19LlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L21hdC1lcnJvcj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Zvcm0+XG5cbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBtYXQtcmFpc2VkLWJ1dHRvblxuICAgICAgICAoY2xpY2spPVwic2VuZCgpXCI+e3sgb2tUZXh0IH19PC9idXR0b24+XG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbWF0LWJ1dHRvblxuICAgICAgICAoY2xpY2spPVwiZGlhbG9nUmVmLmNsb3NlKGZhbHNlKVwiPnt7IGNhbmNlbFRleHQgfX08L2J1dHRvbj5cblxuICAgIGBcbn0pXG5leHBvcnQgY2xhc3MgVFdBUHJvbXB0RGlhbG9nQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIHB1YmxpYyBmb3JtOiBGb3JtR3JvdXAgPSBuZXcgRm9ybUdyb3VwKHt9KTtcbiAgICBmb3JtU3VibWl0RXY6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgcHVibGljIHRpdGxlOiBzdHJpbmc7XG4gICAgcHVibGljIG1lc3NhZ2U6IHN0cmluZztcbiAgICBwdWJsaWMgbWVzc2FnZUh0bWw6IFNhZmVIdG1sO1xuICAgIHB1YmxpYyBmaWVsZHM6IElUV0FQcm9tcHRGaWVsZFtdO1xuICAgIHB1YmxpYyBva1RleHQ6IHN0cmluZztcbiAgICBwdWJsaWMgY2FuY2VsVGV4dDogc3RyaW5nO1xuICAgIHB1YmxpYyBvblN1Ym1pdDogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPFRXQVByb21wdERpYWxvZ0NvbXBvbmVudD4pIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcblxuICAgICAgICBjb25zdCBmb3JtR3JvdXAgPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCBpIGluIHRoaXMuZmllbGRzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5maWVsZHMuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgICAgICAgICBmb3JtR3JvdXBbdGhpcy5maWVsZHNbaV0ua2V5XSA9IG5ldyBGb3JtQ29udHJvbChcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWVsZHNbaV0udmFsdWUgfHwgJycsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwVmFsaWRhdG9ycyh0aGlzLmZpZWxkc1tpXS52YWxpZGF0aW9uLCB0aGlzLmZpZWxkc1tpXS5rZXkpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuZmllbGRzW2ldLmF1dG9jb21wbGV0ZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy5maWVsZHNbaV0uYXV0b2NvbXBsZXRlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWVsZHNbaV0uYXV0b2NvbXBsZXRlLmZpbHRlcmVkT3B0aW9ucyA9IHRoaXMuZ2V0Rm9ybUdyb3VwRXZlbnQoZm9ybUdyb3VwLCBpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZvcm0gPSBuZXcgRm9ybUdyb3VwKGZvcm1Hcm91cCk7XG5cbiAgICB9XG5cbiAgICBnZXRGb3JtR3JvdXBFdmVudChmb3JtR3JvdXAsIGkpIHtcbiAgICAgICAgcmV0dXJuIGZvcm1Hcm91cFt0aGlzLmZpZWxkc1tpXS5rZXldLnZhbHVlQ2hhbmdlcy5waXBlKFxuICAgICAgICAgICAgc3RhcnRXaXRoKCcnKSxcbiAgICAgICAgICAgIG1hcChmaWx0ZXJWYWx1ZSA9PiBmaWx0ZXJWYWx1ZSA/IHRoaXMuX2ZpbHRlclZhbHVlcyhmaWx0ZXJWYWx1ZSwgdGhpcy5maWVsZHNbaV0uYXV0b2NvbXBsZXRlLm9wdGlvbnMpIDpcbiAgICAgICAgICAgICAgICB0aGlzLmZpZWxkc1tpXS5hdXRvY29tcGxldGUub3B0aW9ucy5zbGljZSgpKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGxvZyhvYmplY3Q6IGFueSkge1xuICAgICAgICBjb25zb2xlLmxvZyhvYmplY3QpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2ZpbHRlclZhbHVlcyh2YWx1ZSwgb3B0aW9ucykge1xuXG4gICAgICAgIGNvbnN0IGZpbHRlcmVkVmFsdWUgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIHJldHVybiBvcHRpb25zLmZpbHRlcihvcHRpb24gPT4gb3B0aW9uLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihmaWx0ZXJlZFZhbHVlKSA+PSAwKTtcblxuICAgIH1cblxuICAgIGdldEZvcm1TdWJtaXRFdigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZvcm1TdWJtaXRFdjtcbiAgICB9XG5cbiAgICBzZW5kKCkge1xuICAgICAgICAgICAgbGV0IGk7XG4gICAgICAgICAgICB0aGlzLmZvcm0udXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICAgICAgICAgICAgaWYgKHRoaXMuZm9ybS5zdGF0dXMgIT09ICdJTlZBTElEJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSh0aGlzLmZvcm0udmFsdWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpIGluIHRoaXMuZm9ybS5jb250cm9scykge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmZvcm0uY29udHJvbHNbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmZvcm0uY29udHJvbHMuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZm9ybS5jb250cm9sc1tpXS5tYXJrQXNUb3VjaGVkKHsgb25seVNlbGY6IHRydWUgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcm0uY29udHJvbHNbaV0udXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgIH1cblxuICAgIGFjQ2xpY2soZmllbGQ6IGFueSwgZXZlbnQ6IGFueSkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhldmVudCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGZpZWxkLmF1dG9jb21wbGV0ZSk7XG4gICAgICAgIGlmICh0eXBlb2YgZmllbGQuYXV0b2NvbXBsZXRlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBmaWVsZC5hdXRvY29tcGxldGUuZm9yY2VTZWxlY3QgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgICAgICAgZmllbGQuYXV0b2NvbXBsZXRlLmZvcmNlU2VsZWN0KSB7XG4gICAgICAgICAgICAgICAgZmllbGQuYXV0b2NvbXBsZXRlLnNlbGVjdGVkID0gZXZlbnQub3B0aW9uLnZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWNDaGVja0JsdXIoZmllbGQpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coZmllbGQuYXV0b2NvbXBsZXRlLnNlbGVjdGVkLCB0aGlzLmZvcm0uY29udHJvbHNbZmllbGQua2V5XS52YWx1ZSk7XG4gICAgICAgIGlmICh0eXBlb2YgZmllbGQuYXV0b2NvbXBsZXRlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBmaWVsZC5hdXRvY29tcGxldGUuZm9yY2VTZWxlY3QgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgICAgICAgZmllbGQuYXV0b2NvbXBsZXRlLmZvcmNlU2VsZWN0KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFmaWVsZC5hdXRvY29tcGxldGUuc2VsZWN0ZWQgfHxcbiAgICAgICAgICAgICAgICAgICAgZmllbGQuYXV0b2NvbXBsZXRlLnNlbGVjdGVkICE9PSB0aGlzLmZvcm0uY29udHJvbHNbZmllbGQua2V5XS52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcm0uY29udHJvbHNbZmllbGQua2V5XS5zZXRWYWx1ZShudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgZmllbGQuYXV0b2NvbXBsZXRlLnNlbGVjdGVkID0gJyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3VibWl0Rm9ybShmb3JtOiBhbnkpIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybVN1Ym1pdEV2LmVtaXQoZm9ybSk7XG4gICAgfVxuXG4gICAgZHJhd0N1c3RvbUVycm9ycyhwcm9wLCBlcnJvcikge1xuICAgICAgICBsZXQgcmV0ID0gZmFsc2U7XG4gICAgICAgIGlmICh0eXBlb2YgcHJvcC52YWxpZGF0aW9uTWVzc2FnZXMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHByb3AudmFsaWRhdGlvbk1lc3NhZ2VzW2Vycm9yXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICByZXQgPSBwcm9wLnZhbGlkYXRpb25NZXNzYWdlc1tlcnJvcl0gPiAnJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0ID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH1cblxuICAgIHByaXZhdGUgbWFwVmFsaWRhdG9ycyh2YWxpZGF0b3JzOiBhbnksIGZpZWxkKSB7XG5cbiAgICAgICAgY29uc3QgZm9ybVZhbGlkYXRvcnMgPSBbXTtcblxuICAgICAgICBpZiAodmFsaWRhdG9ycykge1xuICAgICAgICAgICAgZm9yIChjb25zdCB2YWxpZGF0aW9uIG9mIE9iamVjdC5rZXlzKHZhbGlkYXRvcnMpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbGlkYXRpb24gPT09ICdyZXF1aXJlZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybVZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLnJlcXVpcmVkKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbGlkYXRpb24gPT09ICdtYXRjaCcpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybVZhbGlkYXRvcnMucHVzaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmV0OiBhbnkgfCBib29sZWFuID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb250cm9sID0gdGhpcy5mb3JtLmdldCh2YWxpZGF0b3JzW3ZhbGlkYXRpb25dKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5mb3JtLmdldChmaWVsZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0ID0gISh0aGlzLmZvcm0uZ2V0KGZpZWxkKSAmJiB0aGlzLmZvcm0uZ2V0KGZpZWxkKS52YWx1ZSA9PT0gY29udHJvbC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2g6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWxpZGF0aW9uID09PSAnbWluJykge1xuICAgICAgICAgICAgICAgICAgICBmb3JtVmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMubWluKHZhbGlkYXRvcnNbdmFsaWRhdGlvbl0pKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbGlkYXRpb24gPT09ICdtYXgnKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1WYWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5tYXgodmFsaWRhdG9yc1t2YWxpZGF0aW9uXSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmb3JtVmFsaWRhdG9ycztcbiAgICB9XG5cbn1cbiJdfQ==