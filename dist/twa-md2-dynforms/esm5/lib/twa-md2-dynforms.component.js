/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
var TWAMd2DynformsComponent = /** @class */ (function () {
    function TWAMd2DynformsComponent() {
        this.form = new FormGroup({});
        this.formSubmitEv = new EventEmitter();
        this.formData = new FormData();
        this.isMultipart = false;
        this.submit = this.formSubmitEv;
    }
    /**
     * @return {?}
     */
    TWAMd2DynformsComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        // this.createForm();
    };
    /**
     * @return {?}
     */
    TWAMd2DynformsComponent.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        this.createForm();
    };
    /**
     * @return {?}
     */
    TWAMd2DynformsComponent.prototype.createForm = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var formGroup = {};
        for (var i in this.fields) {
            if (this.fields.hasOwnProperty(i)) {
                if (this.fields[i].type !== 'file') {
                    formGroup[this.fields[i].key] = new FormControl(this.fields[i].value || '', this.mapValidators(this.fields[i].validation, this.fields[i].key));
                }
                else {
                    formGroup[this.fields[i].key] = new FormControl('', this.mapValidators(this.fields[i].validation, this.fields[i].key));
                }
                if (typeof this.fields[i].autocomplete !== 'undefined' && this.fields[i].autocomplete !== undefined) {
                    this.fields[i].autocomplete.filteredOptions = this.getFormGroupEvent(formGroup, i);
                }
                if (this.fields[i].type === 'file') {
                    this.isMultipart = true;
                    formGroup[this.fields[i].key + 'Ctrl'] = new FormControl(this.fields[i].value);
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
    TWAMd2DynformsComponent.prototype.getFormGroupEvent = /**
     * @param {?} formGroup
     * @param {?} i
     * @return {?}
     */
    function (formGroup, i) {
        var _this = this;
        return formGroup[this.fields[i].key].valueChanges.pipe(startWith(''), map((/**
         * @param {?} filterValue
         * @return {?}
         */
        function (filterValue) { return filterValue ? _this._filterValues(filterValue, _this.fields[i].autocomplete.options) :
            _this.fields[i].autocomplete.options.slice(); })));
    };
    /**
     * @param {?} object
     * @return {?}
     */
    TWAMd2DynformsComponent.prototype.log = /**
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
    TWAMd2DynformsComponent.prototype._filterValues = /**
     * @private
     * @param {?} value
     * @param {?} options
     * @return {?}
     */
    function (value, options) {
        /** @type {?} */
        var filteredValue = value.toLowerCase();
        return options.filter((/**
         * @param {?} option
         * @return {?}
         */
        function (option) { return option.toLowerCase().indexOf(filteredValue) >= 0; }));
    };
    /**
     * @return {?}
     */
    TWAMd2DynformsComponent.prototype.getFormSubmitEv = /**
     * @return {?}
     */
    function () {
        return this.formSubmitEv;
    };
    /**
     * @return {?}
     */
    TWAMd2DynformsComponent.prototype.send = /**
     * @return {?}
     */
    function () {
        // let i;
        this.form.updateValueAndValidity();
        if (this.form.status !== 'INVALID') {
            console.log(this.form.controls);
            console.log(this.form.value);
            if (this.isMultipart) {
                /** @type {?} */
                var fields = this.fields;
                for (var i in fields) {
                    if (fields[i].type !== 'file') {
                        this.formData.set(fields[i].key, this.form.value[fields[i].key]);
                        console.log(i, this.formData.getAll(fields[i].key));
                    }
                    else {
                        console.log('file', i, this.formData.getAll(fields[i].key));
                    }
                }
                // this.dialogRef.close(this.formData);
                // TODO: Emit results
            }
            else {
                // this.dialogRef.close(this.form.value);
                // TODO: Emit results
            }
        }
        else {
            for (var i in this.form.controls) {
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
    TWAMd2DynformsComponent.prototype.acClick = /**
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
    TWAMd2DynformsComponent.prototype.acCheckBlur = /**
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
    TWAMd2DynformsComponent.prototype.submitForm = /**
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
    TWAMd2DynformsComponent.prototype.drawCustomErrors = /**
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
    TWAMd2DynformsComponent.prototype.mapValidators = /**
     * @private
     * @param {?} validators
     * @param {?} field
     * @return {?}
     */
    function (validators, field) {
        var e_1, _a;
        var _this = this;
        /** @type {?} */
        var formValidators = [];
        if (validators) {
            var _loop_1 = function (validation) {
                if (validation === 'required') {
                    formValidators.push(Validators.required);
                }
                else if (validation === 'match') {
                    formValidators.push((/**
                     * @return {?}
                     */
                    function () {
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
                    }));
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
    /**
     * @param {?} formElement
     * @return {?}
     */
    TWAMd2DynformsComponent.prototype.addFiles = /**
     * @param {?} formElement
     * @return {?}
     */
    function (formElement) {
        console.log(formElement, this.form.get(formElement));
        /** @type {?} */
        var elem = (/** @type {?} */ (document.getElementById(formElement)));
        elem.click();
        // this.form.get(formElement).nativeElement.click();
    };
    /**
     * @param {?} formElement
     * @return {?}
     */
    TWAMd2DynformsComponent.prototype.changeFiles = /**
     * @param {?} formElement
     * @return {?}
     */
    function (formElement) {
        this.form.get(formElement.target.id + 'Ctrl').setValue(formElement.target.files[0].name);
        // console.log(formElement);
        // const formData = new FormData();
        this.formData.append(formElement.target.id, formElement.target.files[0]);
        console.log(JSON.stringify(this.formData));
        console.log(this.formData);
        // this.form.get(formElement.target.id).setValue(JSON.stringify(formData));
    };
    TWAMd2DynformsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'twa-md2-dynforms',
                    template: "\n    <h2 *ngIf=\"title && title > ''\">{{ title }}</h2>\n    <p *ngIf=\"message && message > ''\" [innerHtml]=\"messageHtml\"></p>\n\n    <form novalidate (ngSubmit)=\"submitForm(form.value)\" [formGroup]=\"form\" fxLayout=\"row wrap\" fxLayoutGap=\"10px\">\n      <div *ngFor=\"let prop of fields\" fxFlex=\"{{(prop.fxFlex != 'false') ? ('calc(' + prop.fxFlex + ' - 10px)') : ((prop.fxFlex == 'false') ? '0 0 0' : '100%')}}\" fxLayout=\"column\">\n        <div [ngSwitch]=\"prop.type\" fxFlex=\"100%\">\n          <div *ngSwitchCase=\"'text'\">\n            <mat-form-field class=\"dynform-field-{{prop.key}}\" *ngIf=\"!prop.autocomplete\" fxFlex>\n              <input matInput placeholder=\"{{prop.label}}\"\n                [formControlName]=\"prop.key\"\n                [id]=\"prop.key\" [type]=\"prop.type\" fxFlex>\n            </mat-form-field>\n            <div *ngIf=\"prop.autocomplete\" fxFlex>\n              <mat-form-field class=\"dynform-field-{{prop.key}}\" fxFlex>\n                <input matInput placeholder=\"{{prop.label}}\"\n                  [formControlName]=\"prop.key\"\n                  [matAutocomplete]=\"auto\"\n                  (blur)=\"acCheckBlur(prop)\"\n                  [id]=\"prop.key\" [type]=\"prop.type\">\n              </mat-form-field>\n              <mat-autocomplete #auto=\"matAutocomplete\"\n                (optionSelected)=\"acClick(prop, $event)\">\n                <mat-option *ngFor=\"let option of prop.autocomplete.filteredOptions | async\"\n                  [value]=\"option\">\n                {{ option }}\n                </mat-option>\n              </mat-autocomplete>\n            </div>\n          </div>\n            <div *ngSwitchCase=\"'password'\">\n              <mat-form-field class=\"dynform-field-{{prop.key}}\" fxFlex>\n                <input matInput type=\"password\" placeholder=\"{{prop.label}}\"\n                  [formControlName]=\"prop.key\"\n                  [id]=\"prop.key\" [type]=\"prop.type\" fxFlex>\n              </mat-form-field>\n            </div>\n            <div *ngSwitchCase=\"'textarea'\">\n              <mat-form-field class=\"dynform-field-{{prop.key}}\" fxFlex>\n                <textarea matInput placeholder=\"{{prop.label}}\" rows=\"{{prop.rows||'3'}}\" autosize\n                  [formControlName]=\"prop.key\"\n                  [id]=\"prop.key\" [type]=\"prop.type\"></textarea>\n              </mat-form-field>\n            </div>\n            <div *ngSwitchCase=\"'number'\">\n              <mat-form-field class=\"dynform-field-{{prop.key}}\" fxFlex>\n                <input matInput placeholder=\"{{prop.label}}\"\n                  [formControlName]=\"prop.key\"\n                  [id]=\"prop.key\" [type]=\"prop.type\">\n              </mat-form-field>\n            </div>\n            <div *ngSwitchCase=\"'file'\">\n              <mat-form-field class=\"dynform-field-{{prop.key}}\" fxFlex>\n                <input type=\"file\"\n                  [formControlName]=\"prop.key\"\n                  [id]=\"prop.key\"\n                  [type]=\"prop.type\"\n                  style=\"display: none\"\n                  (change)=\"changeFiles($event)\" />\n                <input matInput placeholder=\"{{prop.label}}\"\n                  [formControlName]=\"prop.key + 'Ctrl'\"\n                  [id]=\"prop.key + 'Ctrl'\" type=\"text\"\n                  (click)=\"addFiles(prop.key)\">\n                <mat-icon matSuffix (click)=\"addFiles(prop.key)\">folder</mat-icon>\n              </mat-form-field>\n            </div>\n            <div *ngSwitchCase=\"'checkbox'\" class=\"dynform-field-{{prop.key}}\">\n              <mat-checkbox\n                [formControlName]=\"prop.key\"\n                [id]=\"prop.key\">\n                {{prop.label}}\n              </mat-checkbox>\n            </div>\n            <div *ngSwitchCase=\"'date'\">\n              <mat-form-field class=\"dynform-field-{{prop.key}}\" fxFlex>\n                <input matInput [matDatepicker]=picker placeholder=\"{{prop.label}}\"\n                  [formControlName]=\"prop.key\"\n                  [id]=\"prop.key\">\n                <mat-datepicker #picker></mat-datepicker>\n                <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n              </mat-form-field>\n            </div>\n            <div *ngSwitchCase=\"'time'\">\n              <mat-form-field class=\"dynform-field-{{prop.key}}\" fxFlex>\n                <input matInput [ngxTimepicker]=\"tpicker\" placeholder=\"{{prop.label}}\"\n                  [format]=\"24\"\n                  [formControlName]=\"prop.key\"\n                  [id]=\"prop.key\">\n                <ngx-material-timepicker #tpicker></ngx-material-timepicker>\n              </mat-form-field>\n            </div>\n\n            <div *ngSwitchCase=\"'radio'\" fxLayout=\"column\" class=\"dynform-field-{{prop.key}}\">\n              <div _ngcontent-c20=\"\" style=\"height: 20px;\">\n                <label _ngcontent-c20=\"\" style=\"transform: translateY(-1.28125em) scale(0.75)\n                    perspective(100px)\n                    translateZ(0.001px);\n                    -ms-transform: translateY(-1.28125em)\n                    scale(0.75);width: 133.33333333%;margin: 20px 0 0 0;font-weight: 100;color: #666;\">\n                  {{prop.label}}\n                </label>\n              </div>\n              <mat-radio-group [formControlName]=\"prop.key\" [name]=\"prop.key\" fxLayout=\"column\" style=\"margin-top: 14px;\">\n                <mat-radio-button [value]=\"option.value\" *ngFor=\"let option of prop.options\">\n                  {{option.label}}\n                </mat-radio-button>\n              </mat-radio-group>\n            </div>\n\n            <div *ngSwitchCase=\"'select'\">\n              <mat-form-field class=\"dynform-field-{{prop.key}}\" fxFlex>\n                <mat-select [formControlName]=\"prop.key\" placeholder=\"{{prop.label}}\">\n                  <mat-option *ngFor=\"let option of prop.options\" [value]=\"option.value\">\n                    {{ option.label }}\n                  </mat-option>\n                </mat-select>\n              </mat-form-field>\n            </div>\n        </div>\n        <div class=\"error\" *ngIf=\"form.get(prop.key).errors\" fxFlex=\"100%\">\n        </div>\n        <div class=\"error\" *ngIf=\"form.get(prop.key).invalid && (form.get(prop.key).dirty || form.get(prop.key).touched)\" fxFlex=\"100%\">\n          <mat-error *ngIf=\"form.get(prop.key).errors.required\">\n            <div *ngIf=\"drawCustomErrors(prop, 'required')\">\n              {{prop.validationMessages.required}}\n            </div>\n            <div *ngIf=\"!prop.validationMessages || !prop.validationMessages.required\">\n              The field {{ prop.label }} is required.\n            </div>\n          </mat-error>\n          <mat-error *ngIf=\"form.get(prop.key).errors.match\">\n            <div *ngIf=\"drawCustomErrors(prop, 'match')\">\n              {{prop.validationMessages.match}}\n            </div>\n            <div *ngIf=\"!prop.validationMessages || !prop.validationMessages.match\">\n              The fields doesn't match.\n            </div>\n          </mat-error>\n          <mat-error *ngIf=\"form.get(prop.key).errors.min\">\n            <div *ngIf=\"drawCustomErrors(prop, 'min')\">\n              {{prop.validationMessages.min}}\n            </div>\n            <div *ngIf=\"!prop.validationMessages || !prop.validationMessages.min\">\n              The minimal value is {{form.get(prop.key).errors.min.min}}.\n            </div>\n          </mat-error>\n          <mat-error *ngIf=\"form.get(prop.key).errors.max\">\n            <div *ngIf=\"drawCustomErrors(prop, 'max')\">\n              {{prop.validationMessages.max}}\n            </div>\n            <div *ngIf=\"!prop.validationMessages || !prop.validationMessages.max\">\n              The max value is {{form.get(prop.key).errors.max.max}}.\n            </div>\n          </mat-error>\n        </div>\n      </div>\n      <div fxFlex></div>\n    </form>\n\n    <!-- <button type=\"button\" mat-raised-button\n      (click)=\"send()\">{{ okText }}</button>\n    <button type=\"button\" mat-button\n      (click)=\"dialogRef.close(false)\">{{ cancelText }}</button> -->\n  "
                }] }
    ];
    /** @nocollapse */
    TWAMd2DynformsComponent.ctorParameters = function () { return []; };
    TWAMd2DynformsComponent.propDecorators = {
        fields: [{ type: Input }],
        submit: [{ type: Output }]
    };
    return TWAMd2DynformsComponent;
}());
export { TWAMd2DynformsComponent };
if (false) {
    /** @type {?} */
    TWAMd2DynformsComponent.prototype.data;
    /** @type {?} */
    TWAMd2DynformsComponent.prototype.form;
    /** @type {?} */
    TWAMd2DynformsComponent.prototype.formSubmitEv;
    /** @type {?} */
    TWAMd2DynformsComponent.prototype.formData;
    /** @type {?} */
    TWAMd2DynformsComponent.prototype.isMultipart;
    /** @type {?} */
    TWAMd2DynformsComponent.prototype.title;
    /** @type {?} */
    TWAMd2DynformsComponent.prototype.message;
    /** @type {?} */
    TWAMd2DynformsComponent.prototype.messageHtml;
    /** @type {?} */
    TWAMd2DynformsComponent.prototype.fields;
    /** @type {?} */
    TWAMd2DynformsComponent.prototype.submit;
    /** @type {?} */
    TWAMd2DynformsComponent.prototype.okText;
    /** @type {?} */
    TWAMd2DynformsComponent.prototype.cancelText;
    /** @type {?} */
    TWAMd2DynformsComponent.prototype.onSubmit;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdhLW1kMi1keW5mb3Jtcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly90d2EtbWQyLWR5bmZvcm1zLyIsInNvdXJjZXMiOlsibGliL3R3YS1tZDItZHluZm9ybXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQXFCLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUYsT0FBTyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHcEUsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUVoRCxxQ0FXQzs7O0lBVkMsOEJBQVk7O0lBQ1osZ0NBQWM7O0lBQ2QsK0JBQWE7O0lBQ2IsaUNBQWU7O0lBQ2YsZ0NBQWM7O0lBQ2Qsa0NBQWU7O0lBQ2YsdUNBQWtCOztJQUNsQiwrQkFBWTs7SUFDWixxQ0FBZ0I7O0lBQ2hCLDZDQUF5Qjs7QUFHM0I7SUErTEU7UUFuQk8sU0FBSSxHQUFjLElBQUksU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzNDLGlCQUFZLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUMsYUFBUSxHQUFhLElBQUksUUFBUSxFQUFFLENBQUM7UUFDcEMsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFVcEIsV0FBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7SUFNbEIsQ0FBQzs7OztJQUVqQiwwQ0FBUTs7O0lBQVI7UUFDRSxxQkFBcUI7SUFDdkIsQ0FBQzs7OztJQUVELDZDQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNwQixDQUFDOzs7O0lBRUQsNENBQVU7OztJQUFWOztZQUVRLFNBQVMsR0FBRyxFQUFFO1FBQ3BCLEtBQUssSUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUN6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QiwyRUFBMkU7SUFFL0UsQ0FBQzs7Z0JBcllGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixRQUFRLEVBQUUsMm5RQW1LVDtpQkFFRjs7Ozs7eUJBY0UsS0FBSzt5QkFHTCxNQUFNOztJQStNVCw4QkFBQztDQUFBLEFBdllELElBdVlDO1NBL05ZLHVCQUF1Qjs7O0lBRWxDLHVDQUFVOztJQUVWLHVDQUEyQzs7SUFDM0MsK0NBQXFEOztJQUNyRCwyQ0FBMkM7O0lBQzNDLDhDQUEyQjs7SUFFM0Isd0NBQXFCOztJQUNyQiwwQ0FBdUI7O0lBQ3ZCLDhDQUE2Qjs7SUFFN0IseUNBQ2lDOztJQUVqQyx5Q0FDa0M7O0lBRWxDLHlDQUFzQjs7SUFDdEIsNkNBQTBCOztJQUMxQiwyQ0FBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgT25Jbml0LCBPbkNoYW5nZXMsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Db250cm9sLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBTYWZlSHRtbCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5pbXBvcnQgeyBtYXAsIHN0YXJ0V2l0aCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZXhwb3J0IGludGVyZmFjZSBJVFdBUHJvbXB0RmllbGQge1xuICBrZXk6IHN0cmluZztcbiAgbGFiZWw6IHN0cmluZztcbiAgdHlwZTogc3RyaW5nO1xuICBmeEZsZXg6IHN0cmluZztcbiAgdmFsdWU6IHN0cmluZztcbiAgb3B0aW9uczogYW55W107XG4gIGF1dG9jb21wbGV0ZTogYW55O1xuICByb3dzOiBhbnlbXTtcbiAgdmFsaWRhdGlvbjogYW55O1xuICB2YWxpZGF0aW9uTWVzc2FnZXM/OiBhbnk7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3R3YS1tZDItZHluZm9ybXMnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxoMiAqbmdJZj1cInRpdGxlICYmIHRpdGxlID4gJydcIj57eyB0aXRsZSB9fTwvaDI+XG4gICAgPHAgKm5nSWY9XCJtZXNzYWdlICYmIG1lc3NhZ2UgPiAnJ1wiIFtpbm5lckh0bWxdPVwibWVzc2FnZUh0bWxcIj48L3A+XG5cbiAgICA8Zm9ybSBub3ZhbGlkYXRlIChuZ1N1Ym1pdCk9XCJzdWJtaXRGb3JtKGZvcm0udmFsdWUpXCIgW2Zvcm1Hcm91cF09XCJmb3JtXCIgZnhMYXlvdXQ9XCJyb3cgd3JhcFwiIGZ4TGF5b3V0R2FwPVwiMTBweFwiPlxuICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgcHJvcCBvZiBmaWVsZHNcIiBmeEZsZXg9XCJ7eyhwcm9wLmZ4RmxleCAhPSAnZmFsc2UnKSA/ICgnY2FsYygnICsgcHJvcC5meEZsZXggKyAnIC0gMTBweCknKSA6ICgocHJvcC5meEZsZXggPT0gJ2ZhbHNlJykgPyAnMCAwIDAnIDogJzEwMCUnKX19XCIgZnhMYXlvdXQ9XCJjb2x1bW5cIj5cbiAgICAgICAgPGRpdiBbbmdTd2l0Y2hdPVwicHJvcC50eXBlXCIgZnhGbGV4PVwiMTAwJVwiPlxuICAgICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIid0ZXh0J1wiPlxuICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkIGNsYXNzPVwiZHluZm9ybS1maWVsZC17e3Byb3Aua2V5fX1cIiAqbmdJZj1cIiFwcm9wLmF1dG9jb21wbGV0ZVwiIGZ4RmxleD5cbiAgICAgICAgICAgICAgPGlucHV0IG1hdElucHV0IHBsYWNlaG9sZGVyPVwie3twcm9wLmxhYmVsfX1cIlxuICAgICAgICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwicHJvcC5rZXlcIlxuICAgICAgICAgICAgICAgIFtpZF09XCJwcm9wLmtleVwiIFt0eXBlXT1cInByb3AudHlwZVwiIGZ4RmxleD5cbiAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICA8ZGl2ICpuZ0lmPVwicHJvcC5hdXRvY29tcGxldGVcIiBmeEZsZXg+XG4gICAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZCBjbGFzcz1cImR5bmZvcm0tZmllbGQte3twcm9wLmtleX19XCIgZnhGbGV4PlxuICAgICAgICAgICAgICAgIDxpbnB1dCBtYXRJbnB1dCBwbGFjZWhvbGRlcj1cInt7cHJvcC5sYWJlbH19XCJcbiAgICAgICAgICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwicHJvcC5rZXlcIlxuICAgICAgICAgICAgICAgICAgW21hdEF1dG9jb21wbGV0ZV09XCJhdXRvXCJcbiAgICAgICAgICAgICAgICAgIChibHVyKT1cImFjQ2hlY2tCbHVyKHByb3ApXCJcbiAgICAgICAgICAgICAgICAgIFtpZF09XCJwcm9wLmtleVwiIFt0eXBlXT1cInByb3AudHlwZVwiPlxuICAgICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgICA8bWF0LWF1dG9jb21wbGV0ZSAjYXV0bz1cIm1hdEF1dG9jb21wbGV0ZVwiXG4gICAgICAgICAgICAgICAgKG9wdGlvblNlbGVjdGVkKT1cImFjQ2xpY2socHJvcCwgJGV2ZW50KVwiPlxuICAgICAgICAgICAgICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgcHJvcC5hdXRvY29tcGxldGUuZmlsdGVyZWRPcHRpb25zIHwgYXN5bmNcIlxuICAgICAgICAgICAgICAgICAgW3ZhbHVlXT1cIm9wdGlvblwiPlxuICAgICAgICAgICAgICAgIHt7IG9wdGlvbiB9fVxuICAgICAgICAgICAgICAgIDwvbWF0LW9wdGlvbj5cbiAgICAgICAgICAgICAgPC9tYXQtYXV0b2NvbXBsZXRlPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCIncGFzc3dvcmQnXCI+XG4gICAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZCBjbGFzcz1cImR5bmZvcm0tZmllbGQte3twcm9wLmtleX19XCIgZnhGbGV4PlxuICAgICAgICAgICAgICAgIDxpbnB1dCBtYXRJbnB1dCB0eXBlPVwicGFzc3dvcmRcIiBwbGFjZWhvbGRlcj1cInt7cHJvcC5sYWJlbH19XCJcbiAgICAgICAgICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwicHJvcC5rZXlcIlxuICAgICAgICAgICAgICAgICAgW2lkXT1cInByb3Aua2V5XCIgW3R5cGVdPVwicHJvcC50eXBlXCIgZnhGbGV4PlxuICAgICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCIndGV4dGFyZWEnXCI+XG4gICAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZCBjbGFzcz1cImR5bmZvcm0tZmllbGQte3twcm9wLmtleX19XCIgZnhGbGV4PlxuICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBtYXRJbnB1dCBwbGFjZWhvbGRlcj1cInt7cHJvcC5sYWJlbH19XCIgcm93cz1cInt7cHJvcC5yb3dzfHwnMyd9fVwiIGF1dG9zaXplXG4gICAgICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cInByb3Aua2V5XCJcbiAgICAgICAgICAgICAgICAgIFtpZF09XCJwcm9wLmtleVwiIFt0eXBlXT1cInByb3AudHlwZVwiPjwvdGV4dGFyZWE+XG4gICAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIidudW1iZXInXCI+XG4gICAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZCBjbGFzcz1cImR5bmZvcm0tZmllbGQte3twcm9wLmtleX19XCIgZnhGbGV4PlxuICAgICAgICAgICAgICAgIDxpbnB1dCBtYXRJbnB1dCBwbGFjZWhvbGRlcj1cInt7cHJvcC5sYWJlbH19XCJcbiAgICAgICAgICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwicHJvcC5rZXlcIlxuICAgICAgICAgICAgICAgICAgW2lkXT1cInByb3Aua2V5XCIgW3R5cGVdPVwicHJvcC50eXBlXCI+XG4gICAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIidmaWxlJ1wiPlxuICAgICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgY2xhc3M9XCJkeW5mb3JtLWZpZWxkLXt7cHJvcC5rZXl9fVwiIGZ4RmxleD5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImZpbGVcIlxuICAgICAgICAgICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJwcm9wLmtleVwiXG4gICAgICAgICAgICAgICAgICBbaWRdPVwicHJvcC5rZXlcIlxuICAgICAgICAgICAgICAgICAgW3R5cGVdPVwicHJvcC50eXBlXCJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPVwiZGlzcGxheTogbm9uZVwiXG4gICAgICAgICAgICAgICAgICAoY2hhbmdlKT1cImNoYW5nZUZpbGVzKCRldmVudClcIiAvPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBtYXRJbnB1dCBwbGFjZWhvbGRlcj1cInt7cHJvcC5sYWJlbH19XCJcbiAgICAgICAgICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwicHJvcC5rZXkgKyAnQ3RybCdcIlxuICAgICAgICAgICAgICAgICAgW2lkXT1cInByb3Aua2V5ICsgJ0N0cmwnXCIgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cImFkZEZpbGVzKHByb3Aua2V5KVwiPlxuICAgICAgICAgICAgICAgIDxtYXQtaWNvbiBtYXRTdWZmaXggKGNsaWNrKT1cImFkZEZpbGVzKHByb3Aua2V5KVwiPmZvbGRlcjwvbWF0LWljb24+XG4gICAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIidjaGVja2JveCdcIiBjbGFzcz1cImR5bmZvcm0tZmllbGQte3twcm9wLmtleX19XCI+XG4gICAgICAgICAgICAgIDxtYXQtY2hlY2tib3hcbiAgICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cInByb3Aua2V5XCJcbiAgICAgICAgICAgICAgICBbaWRdPVwicHJvcC5rZXlcIj5cbiAgICAgICAgICAgICAgICB7e3Byb3AubGFiZWx9fVxuICAgICAgICAgICAgICA8L21hdC1jaGVja2JveD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ2RhdGUnXCI+XG4gICAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZCBjbGFzcz1cImR5bmZvcm0tZmllbGQte3twcm9wLmtleX19XCIgZnhGbGV4PlxuICAgICAgICAgICAgICAgIDxpbnB1dCBtYXRJbnB1dCBbbWF0RGF0ZXBpY2tlcl09cGlja2VyIHBsYWNlaG9sZGVyPVwie3twcm9wLmxhYmVsfX1cIlxuICAgICAgICAgICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJwcm9wLmtleVwiXG4gICAgICAgICAgICAgICAgICBbaWRdPVwicHJvcC5rZXlcIj5cbiAgICAgICAgICAgICAgICA8bWF0LWRhdGVwaWNrZXIgI3BpY2tlcj48L21hdC1kYXRlcGlja2VyPlxuICAgICAgICAgICAgICAgIDxtYXQtZGF0ZXBpY2tlci10b2dnbGUgbWF0U3VmZml4IFtmb3JdPVwicGlja2VyXCI+PC9tYXQtZGF0ZXBpY2tlci10b2dnbGU+XG4gICAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIid0aW1lJ1wiPlxuICAgICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgY2xhc3M9XCJkeW5mb3JtLWZpZWxkLXt7cHJvcC5rZXl9fVwiIGZ4RmxleD5cbiAgICAgICAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgW25neFRpbWVwaWNrZXJdPVwidHBpY2tlclwiIHBsYWNlaG9sZGVyPVwie3twcm9wLmxhYmVsfX1cIlxuICAgICAgICAgICAgICAgICAgW2Zvcm1hdF09XCIyNFwiXG4gICAgICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cInByb3Aua2V5XCJcbiAgICAgICAgICAgICAgICAgIFtpZF09XCJwcm9wLmtleVwiPlxuICAgICAgICAgICAgICAgIDxuZ3gtbWF0ZXJpYWwtdGltZXBpY2tlciAjdHBpY2tlcj48L25neC1tYXRlcmlhbC10aW1lcGlja2VyPlxuICAgICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIidyYWRpbydcIiBmeExheW91dD1cImNvbHVtblwiIGNsYXNzPVwiZHluZm9ybS1maWVsZC17e3Byb3Aua2V5fX1cIj5cbiAgICAgICAgICAgICAgPGRpdiBfbmdjb250ZW50LWMyMD1cIlwiIHN0eWxlPVwiaGVpZ2h0OiAyMHB4O1wiPlxuICAgICAgICAgICAgICAgIDxsYWJlbCBfbmdjb250ZW50LWMyMD1cIlwiIHN0eWxlPVwidHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xLjI4MTI1ZW0pIHNjYWxlKDAuNzUpXG4gICAgICAgICAgICAgICAgICAgIHBlcnNwZWN0aXZlKDEwMHB4KVxuICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVaKDAuMDAxcHgpO1xuICAgICAgICAgICAgICAgICAgICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xLjI4MTI1ZW0pXG4gICAgICAgICAgICAgICAgICAgIHNjYWxlKDAuNzUpO3dpZHRoOiAxMzMuMzMzMzMzMzMlO21hcmdpbjogMjBweCAwIDAgMDtmb250LXdlaWdodDogMTAwO2NvbG9yOiAjNjY2O1wiPlxuICAgICAgICAgICAgICAgICAge3twcm9wLmxhYmVsfX1cbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPG1hdC1yYWRpby1ncm91cCBbZm9ybUNvbnRyb2xOYW1lXT1cInByb3Aua2V5XCIgW25hbWVdPVwicHJvcC5rZXlcIiBmeExheW91dD1cImNvbHVtblwiIHN0eWxlPVwibWFyZ2luLXRvcDogMTRweDtcIj5cbiAgICAgICAgICAgICAgICA8bWF0LXJhZGlvLWJ1dHRvbiBbdmFsdWVdPVwib3B0aW9uLnZhbHVlXCIgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBwcm9wLm9wdGlvbnNcIj5cbiAgICAgICAgICAgICAgICAgIHt7b3B0aW9uLmxhYmVsfX1cbiAgICAgICAgICAgICAgICA8L21hdC1yYWRpby1idXR0b24+XG4gICAgICAgICAgICAgIDwvbWF0LXJhZGlvLWdyb3VwPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIidzZWxlY3QnXCI+XG4gICAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZCBjbGFzcz1cImR5bmZvcm0tZmllbGQte3twcm9wLmtleX19XCIgZnhGbGV4PlxuICAgICAgICAgICAgICAgIDxtYXQtc2VsZWN0IFtmb3JtQ29udHJvbE5hbWVdPVwicHJvcC5rZXlcIiBwbGFjZWhvbGRlcj1cInt7cHJvcC5sYWJlbH19XCI+XG4gICAgICAgICAgICAgICAgICA8bWF0LW9wdGlvbiAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIHByb3Aub3B0aW9uc1wiIFt2YWx1ZV09XCJvcHRpb24udmFsdWVcIj5cbiAgICAgICAgICAgICAgICAgICAge3sgb3B0aW9uLmxhYmVsIH19XG4gICAgICAgICAgICAgICAgICA8L21hdC1vcHRpb24+XG4gICAgICAgICAgICAgICAgPC9tYXQtc2VsZWN0PlxuICAgICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZXJyb3JcIiAqbmdJZj1cImZvcm0uZ2V0KHByb3Aua2V5KS5lcnJvcnNcIiBmeEZsZXg9XCIxMDAlXCI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZXJyb3JcIiAqbmdJZj1cImZvcm0uZ2V0KHByb3Aua2V5KS5pbnZhbGlkICYmIChmb3JtLmdldChwcm9wLmtleSkuZGlydHkgfHwgZm9ybS5nZXQocHJvcC5rZXkpLnRvdWNoZWQpXCIgZnhGbGV4PVwiMTAwJVwiPlxuICAgICAgICAgIDxtYXQtZXJyb3IgKm5nSWY9XCJmb3JtLmdldChwcm9wLmtleSkuZXJyb3JzLnJlcXVpcmVkXCI+XG4gICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiZHJhd0N1c3RvbUVycm9ycyhwcm9wLCAncmVxdWlyZWQnKVwiPlxuICAgICAgICAgICAgICB7e3Byb3AudmFsaWRhdGlvbk1lc3NhZ2VzLnJlcXVpcmVkfX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cIiFwcm9wLnZhbGlkYXRpb25NZXNzYWdlcyB8fCAhcHJvcC52YWxpZGF0aW9uTWVzc2FnZXMucmVxdWlyZWRcIj5cbiAgICAgICAgICAgICAgVGhlIGZpZWxkIHt7IHByb3AubGFiZWwgfX0gaXMgcmVxdWlyZWQuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L21hdC1lcnJvcj5cbiAgICAgICAgICA8bWF0LWVycm9yICpuZ0lmPVwiZm9ybS5nZXQocHJvcC5rZXkpLmVycm9ycy5tYXRjaFwiPlxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cImRyYXdDdXN0b21FcnJvcnMocHJvcCwgJ21hdGNoJylcIj5cbiAgICAgICAgICAgICAge3twcm9wLnZhbGlkYXRpb25NZXNzYWdlcy5tYXRjaH19XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgKm5nSWY9XCIhcHJvcC52YWxpZGF0aW9uTWVzc2FnZXMgfHwgIXByb3AudmFsaWRhdGlvbk1lc3NhZ2VzLm1hdGNoXCI+XG4gICAgICAgICAgICAgIFRoZSBmaWVsZHMgZG9lc24ndCBtYXRjaC5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvbWF0LWVycm9yPlxuICAgICAgICAgIDxtYXQtZXJyb3IgKm5nSWY9XCJmb3JtLmdldChwcm9wLmtleSkuZXJyb3JzLm1pblwiPlxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cImRyYXdDdXN0b21FcnJvcnMocHJvcCwgJ21pbicpXCI+XG4gICAgICAgICAgICAgIHt7cHJvcC52YWxpZGF0aW9uTWVzc2FnZXMubWlufX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cIiFwcm9wLnZhbGlkYXRpb25NZXNzYWdlcyB8fCAhcHJvcC52YWxpZGF0aW9uTWVzc2FnZXMubWluXCI+XG4gICAgICAgICAgICAgIFRoZSBtaW5pbWFsIHZhbHVlIGlzIHt7Zm9ybS5nZXQocHJvcC5rZXkpLmVycm9ycy5taW4ubWlufX0uXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L21hdC1lcnJvcj5cbiAgICAgICAgICA8bWF0LWVycm9yICpuZ0lmPVwiZm9ybS5nZXQocHJvcC5rZXkpLmVycm9ycy5tYXhcIj5cbiAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJkcmF3Q3VzdG9tRXJyb3JzKHByb3AsICdtYXgnKVwiPlxuICAgICAgICAgICAgICB7e3Byb3AudmFsaWRhdGlvbk1lc3NhZ2VzLm1heH19XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgKm5nSWY9XCIhcHJvcC52YWxpZGF0aW9uTWVzc2FnZXMgfHwgIXByb3AudmFsaWRhdGlvbk1lc3NhZ2VzLm1heFwiPlxuICAgICAgICAgICAgICBUaGUgbWF4IHZhbHVlIGlzIHt7Zm9ybS5nZXQocHJvcC5rZXkpLmVycm9ycy5tYXgubWF4fX0uXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L21hdC1lcnJvcj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgZnhGbGV4PjwvZGl2PlxuICAgIDwvZm9ybT5cblxuICAgIDwhLS0gPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbWF0LXJhaXNlZC1idXR0b25cbiAgICAgIChjbGljayk9XCJzZW5kKClcIj57eyBva1RleHQgfX08L2J1dHRvbj5cbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBtYXQtYnV0dG9uXG4gICAgICAoY2xpY2spPVwiZGlhbG9nUmVmLmNsb3NlKGZhbHNlKVwiPnt7IGNhbmNlbFRleHQgfX08L2J1dHRvbj4gLS0+XG4gIGAsXG4gIHN0eWxlczogW11cbn0pXG5leHBvcnQgY2xhc3MgVFdBTWQyRHluZm9ybXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG5cbiAgZGF0YTogYW55O1xuXG4gIHB1YmxpYyBmb3JtOiBGb3JtR3JvdXAgPSBuZXcgRm9ybUdyb3VwKHt9KTtcbiAgZm9ybVN1Ym1pdEV2OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgcHVibGljIGZvcm1EYXRhOiBGb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICBwdWJsaWMgaXNNdWx0aXBhcnQgPSBmYWxzZTtcblxuICBwdWJsaWMgdGl0bGU6IHN0cmluZztcbiAgcHVibGljIG1lc3NhZ2U6IHN0cmluZztcbiAgcHVibGljIG1lc3NhZ2VIdG1sOiBTYWZlSHRtbDtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgZmllbGRzOiBJVFdBUHJvbXB0RmllbGRbXTtcblxuICBAT3V0cHV0KClcbiAgcHVibGljIHN1Ym1pdCA9IHRoaXMuZm9ybVN1Ym1pdEV2O1xuXG4gIHB1YmxpYyBva1RleHQ6IHN0cmluZztcbiAgcHVibGljIGNhbmNlbFRleHQ6IHN0cmluZztcbiAgcHVibGljIG9uU3VibWl0OiBhbnk7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICAvLyB0aGlzLmNyZWF0ZUZvcm0oKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMuY3JlYXRlRm9ybSgpO1xuICB9XG5cbiAgY3JlYXRlRm9ybSgpIHtcblxuICAgIGNvbnN0IGZvcm1Hcm91cCA9IHt9O1xuICAgIGZvciAoY29uc3QgaSBpbiB0aGlzLmZpZWxkcykge1xuICAgICAgICBpZiAodGhpcy5maWVsZHMuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmZpZWxkc1tpXS50eXBlICE9PSAnZmlsZScpIHtcbiAgICAgICAgICAgICAgICBmb3JtR3JvdXBbdGhpcy5maWVsZHNbaV0ua2V5XSA9IG5ldyBGb3JtQ29udHJvbChcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWVsZHNbaV0udmFsdWUgfHwgJycsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwVmFsaWRhdG9ycyh0aGlzLmZpZWxkc1tpXS52YWxpZGF0aW9uLCB0aGlzLmZpZWxkc1tpXS5rZXkpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9ybUdyb3VwW3RoaXMuZmllbGRzW2ldLmtleV0gPSBuZXcgRm9ybUNvbnRyb2woXG4gICAgICAgICAgICAgICAgICAgICcnLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcFZhbGlkYXRvcnModGhpcy5maWVsZHNbaV0udmFsaWRhdGlvbiwgdGhpcy5maWVsZHNbaV0ua2V5KVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuZmllbGRzW2ldLmF1dG9jb21wbGV0ZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy5maWVsZHNbaV0uYXV0b2NvbXBsZXRlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpZWxkc1tpXS5hdXRvY29tcGxldGUuZmlsdGVyZWRPcHRpb25zID0gdGhpcy5nZXRGb3JtR3JvdXBFdmVudChmb3JtR3JvdXAsIGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuZmllbGRzW2ldLnR5cGUgPT09ICdmaWxlJykge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNNdWx0aXBhcnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGZvcm1Hcm91cFt0aGlzLmZpZWxkc1tpXS5rZXkgKyAnQ3RybCddID0gbmV3IEZvcm1Db250cm9sKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpZWxkc1tpXS52YWx1ZVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmZvcm0gPSBuZXcgRm9ybUdyb3VwKGZvcm1Hcm91cCk7XG5cbiAgfVxuXG4gIGdldEZvcm1Hcm91cEV2ZW50KGZvcm1Hcm91cCwgaSkge1xuICAgIHJldHVybiBmb3JtR3JvdXBbdGhpcy5maWVsZHNbaV0ua2V5XS52YWx1ZUNoYW5nZXMucGlwZShcbiAgICAgICAgc3RhcnRXaXRoKCcnKSxcbiAgICAgICAgbWFwKGZpbHRlclZhbHVlID0+IGZpbHRlclZhbHVlID8gdGhpcy5fZmlsdGVyVmFsdWVzKGZpbHRlclZhbHVlLCB0aGlzLmZpZWxkc1tpXS5hdXRvY29tcGxldGUub3B0aW9ucykgOlxuICAgICAgICAgICAgdGhpcy5maWVsZHNbaV0uYXV0b2NvbXBsZXRlLm9wdGlvbnMuc2xpY2UoKSlcbiAgICApO1xuICB9XG5cbiAgbG9nKG9iamVjdDogYW55KSB7XG4gICAgICBjb25zb2xlLmxvZyhvYmplY3QpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZmlsdGVyVmFsdWVzKHZhbHVlLCBvcHRpb25zKSB7XG5cbiAgICAgIGNvbnN0IGZpbHRlcmVkVmFsdWUgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICByZXR1cm4gb3B0aW9ucy5maWx0ZXIob3B0aW9uID0+IG9wdGlvbi50b0xvd2VyQ2FzZSgpLmluZGV4T2YoZmlsdGVyZWRWYWx1ZSkgPj0gMCk7XG5cbiAgfVxuXG4gIGdldEZvcm1TdWJtaXRFdigpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5mb3JtU3VibWl0RXY7XG4gIH1cblxuICBzZW5kKCkge1xuICAgIC8vIGxldCBpO1xuICAgIHRoaXMuZm9ybS51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgaWYgKHRoaXMuZm9ybS5zdGF0dXMgIT09ICdJTlZBTElEJykge1xuICAgICAgY29uc29sZS5sb2codGhpcy5mb3JtLmNvbnRyb2xzKTtcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuZm9ybS52YWx1ZSk7XG4gICAgICBpZiAodGhpcy5pc011bHRpcGFydCkge1xuICAgICAgICBjb25zdCBmaWVsZHMgPSB0aGlzLmZpZWxkcztcbiAgICAgICAgZm9yIChjb25zdCBpIGluIGZpZWxkcykge1xuICAgICAgICAgIGlmIChmaWVsZHNbaV0udHlwZSAhPT0gJ2ZpbGUnKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm1EYXRhLnNldChmaWVsZHNbaV0ua2V5LCB0aGlzLmZvcm0udmFsdWVbZmllbGRzW2ldLmtleV0pO1xuICAgICAgICAgICAgY29uc29sZS5sb2coaSwgdGhpcy5mb3JtRGF0YS5nZXRBbGwoZmllbGRzW2ldLmtleSkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZmlsZScsIGksIHRoaXMuZm9ybURhdGEuZ2V0QWxsKGZpZWxkc1tpXS5rZXkpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gdGhpcy5kaWFsb2dSZWYuY2xvc2UodGhpcy5mb3JtRGF0YSk7XG4gICAgICAgIC8vIFRPRE86IEVtaXQgcmVzdWx0c1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gdGhpcy5kaWFsb2dSZWYuY2xvc2UodGhpcy5mb3JtLnZhbHVlKTtcbiAgICAgICAgLy8gVE9ETzogRW1pdCByZXN1bHRzXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAoY29uc3QgaSBpbiB0aGlzLmZvcm0uY29udHJvbHMpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuZm9ybS5jb250cm9sc1tpXSk7XG4gICAgICAgIGlmICh0aGlzLmZvcm0uY29udHJvbHMuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgICB0aGlzLmZvcm0uY29udHJvbHNbaV0ubWFya0FzVG91Y2hlZCh7IG9ubHlTZWxmOiB0cnVlIH0pO1xuICAgICAgICAgIHRoaXMuZm9ybS5jb250cm9sc1tpXS51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhY0NsaWNrKGZpZWxkOiBhbnksIGV2ZW50OiBhbnkpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGV2ZW50KTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGZpZWxkLmF1dG9jb21wbGV0ZSk7XG4gICAgICBpZiAodHlwZW9mIGZpZWxkLmF1dG9jb21wbGV0ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGZpZWxkLmF1dG9jb21wbGV0ZS5mb3JjZVNlbGVjdCAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgICAgICAgZmllbGQuYXV0b2NvbXBsZXRlLmZvcmNlU2VsZWN0KSB7XG4gICAgICAgICAgICAgIGZpZWxkLmF1dG9jb21wbGV0ZS5zZWxlY3RlZCA9IGV2ZW50Lm9wdGlvbi52YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICB9XG4gIH1cblxuICBhY0NoZWNrQmx1cihmaWVsZCkge1xuICAgICAgLy8gY29uc29sZS5sb2coZmllbGQuYXV0b2NvbXBsZXRlLnNlbGVjdGVkLCB0aGlzLmZvcm0uY29udHJvbHNbZmllbGQua2V5XS52YWx1ZSk7XG4gICAgICBpZiAodHlwZW9mIGZpZWxkLmF1dG9jb21wbGV0ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGZpZWxkLmF1dG9jb21wbGV0ZS5mb3JjZVNlbGVjdCAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgICAgICAgZmllbGQuYXV0b2NvbXBsZXRlLmZvcmNlU2VsZWN0KSB7XG4gICAgICAgICAgICAgIGlmICghZmllbGQuYXV0b2NvbXBsZXRlLnNlbGVjdGVkIHx8XG4gICAgICAgICAgICAgICAgICBmaWVsZC5hdXRvY29tcGxldGUuc2VsZWN0ZWQgIT09IHRoaXMuZm9ybS5jb250cm9sc1tmaWVsZC5rZXldLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmZvcm0uY29udHJvbHNbZmllbGQua2V5XS5zZXRWYWx1ZShudWxsKTtcbiAgICAgICAgICAgICAgICAgIGZpZWxkLmF1dG9jb21wbGV0ZS5zZWxlY3RlZCA9ICcnO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgfVxuICB9XG5cbiAgc3VibWl0Rm9ybShmb3JtOiBhbnkpIHtcbiAgICAgICAgICB0aGlzLmZvcm1TdWJtaXRFdi5lbWl0KGZvcm0pO1xuICB9XG5cbiAgZHJhd0N1c3RvbUVycm9ycyhwcm9wLCBlcnJvcikge1xuICAgICAgbGV0IHJldCA9IGZhbHNlO1xuICAgICAgaWYgKHR5cGVvZiBwcm9wLnZhbGlkYXRpb25NZXNzYWdlcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIHByb3AudmFsaWRhdGlvbk1lc3NhZ2VzW2Vycm9yXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgcmV0ID0gcHJvcC52YWxpZGF0aW9uTWVzc2FnZXNbZXJyb3JdID4gJyc7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0ID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXQ7XG4gIH1cblxuICBwcml2YXRlIG1hcFZhbGlkYXRvcnModmFsaWRhdG9yczogYW55LCBmaWVsZCkge1xuXG4gICAgICBjb25zdCBmb3JtVmFsaWRhdG9ycyA9IFtdO1xuXG4gICAgICBpZiAodmFsaWRhdG9ycykge1xuICAgICAgICAgIGZvciAoY29uc3QgdmFsaWRhdGlvbiBvZiBPYmplY3Qua2V5cyh2YWxpZGF0b3JzKSkge1xuICAgICAgICAgICAgICBpZiAodmFsaWRhdGlvbiA9PT0gJ3JlcXVpcmVkJykge1xuICAgICAgICAgICAgICAgICAgZm9ybVZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLnJlcXVpcmVkKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWxpZGF0aW9uID09PSAnbWF0Y2gnKSB7XG4gICAgICAgICAgICAgICAgICBmb3JtVmFsaWRhdG9ycy5wdXNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBsZXQgcmV0OiBhbnkgfCBib29sZWFuID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udHJvbCA9IHRoaXMuZm9ybS5nZXQodmFsaWRhdG9yc1t2YWxpZGF0aW9uXSk7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmZvcm0uZ2V0KGZpZWxkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZXQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICByZXQgPSAhKHRoaXMuZm9ybS5nZXQoZmllbGQpICYmIHRoaXMuZm9ybS5nZXQoZmllbGQpLnZhbHVlID09PSBjb250cm9sLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZXQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWxpZGF0aW9uID09PSAnbWluJykge1xuICAgICAgICAgICAgICAgICAgZm9ybVZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLm1pbih2YWxpZGF0b3JzW3ZhbGlkYXRpb25dKSk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsaWRhdGlvbiA9PT0gJ21heCcpIHtcbiAgICAgICAgICAgICAgICAgIGZvcm1WYWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5tYXgodmFsaWRhdG9yc1t2YWxpZGF0aW9uXSkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZm9ybVZhbGlkYXRvcnM7XG4gIH1cblxuICBhZGRGaWxlcyhmb3JtRWxlbWVudCk6IHZvaWQge1xuXG4gICAgICBjb25zb2xlLmxvZyhmb3JtRWxlbWVudCwgdGhpcy5mb3JtLmdldChmb3JtRWxlbWVudCkpO1xuICAgICAgY29uc3QgZWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGZvcm1FbGVtZW50KSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgICAgZWxlbS5jbGljaygpO1xuICAgICAgLy8gdGhpcy5mb3JtLmdldChmb3JtRWxlbWVudCkubmF0aXZlRWxlbWVudC5jbGljaygpO1xuXG4gIH1cblxuICBjaGFuZ2VGaWxlcyhmb3JtRWxlbWVudCk6IHZvaWQge1xuXG4gICAgICB0aGlzLmZvcm0uZ2V0KGZvcm1FbGVtZW50LnRhcmdldC5pZCArICdDdHJsJykuc2V0VmFsdWUoZm9ybUVsZW1lbnQudGFyZ2V0LmZpbGVzWzBdLm5hbWUpO1xuXG4gICAgICAvLyBjb25zb2xlLmxvZyhmb3JtRWxlbWVudCk7XG4gICAgICAvLyBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgdGhpcy5mb3JtRGF0YS5hcHBlbmQoZm9ybUVsZW1lbnQudGFyZ2V0LmlkLCBmb3JtRWxlbWVudC50YXJnZXQuZmlsZXNbMF0pO1xuICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5mb3JtRGF0YSkpO1xuICAgICAgY29uc29sZS5sb2codGhpcy5mb3JtRGF0YSk7XG4gICAgICAvLyB0aGlzLmZvcm0uZ2V0KGZvcm1FbGVtZW50LnRhcmdldC5pZCkuc2V0VmFsdWUoSlNPTi5zdHJpbmdpZnkoZm9ybURhdGEpKTtcblxuICB9XG5cbn1cbiJdfQ==