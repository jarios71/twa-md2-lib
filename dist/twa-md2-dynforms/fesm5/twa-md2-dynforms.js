import { Injectable, ɵɵdefineInjectable, EventEmitter, Component, Input, Output, NgModule } from '@angular/core';
import { __values } from 'tslib';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule, MatNativeDateModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TwaMd2DynformsService = /** @class */ (function () {
    function TwaMd2DynformsService() {
    }
    TwaMd2DynformsService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    TwaMd2DynformsService.ctorParameters = function () { return []; };
    /** @nocollapse */ TwaMd2DynformsService.ngInjectableDef = ɵɵdefineInjectable({ factory: function TwaMd2DynformsService_Factory() { return new TwaMd2DynformsService(); }, token: TwaMd2DynformsService, providedIn: "root" });
    return TwaMd2DynformsService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function ITWAPromptField() { }
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
                for (var _b = __values(Object.keys(validators)), _c = _b.next(); !_c.done; _c = _b.next()) {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TWAMd2DynformsModule = /** @class */ (function () {
    function TWAMd2DynformsModule() {
    }
    TWAMd2DynformsModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [TWAMd2DynformsComponent],
                    imports: [
                        CommonModule,
                        FlexLayoutModule,
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
                    exports: [TWAMd2DynformsComponent],
                    entryComponents: [TWAMd2DynformsComponent],
                },] }
    ];
    return TWAMd2DynformsModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { TWAMd2DynformsComponent, TWAMd2DynformsModule, TwaMd2DynformsService };
//# sourceMappingURL=twa-md2-dynforms.js.map
