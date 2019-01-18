(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/material'), require('rxjs/operators'), require('@angular/common'), require('@angular/flex-layout'), require('@angular/material/input'), require('@angular/material/checkbox'), require('@angular/material/select'), require('@angular/material/radio'), require('@angular/material/datepicker'), require('@angular/material/autocomplete'), require('ngx-material-timepicker'), require('@angular/platform-browser')) :
    typeof define === 'function' && define.amd ? define('twa-md2-dialogs', ['exports', '@angular/core', '@angular/forms', '@angular/material', 'rxjs/operators', '@angular/common', '@angular/flex-layout', '@angular/material/input', '@angular/material/checkbox', '@angular/material/select', '@angular/material/radio', '@angular/material/datepicker', '@angular/material/autocomplete', 'ngx-material-timepicker', '@angular/platform-browser'], factory) :
    (factory((global['twa-md2-dialogs'] = {}),global.ng.core,global.ng.forms,global.ng.material,global.rxjs.operators,global.ng.common,global.ng['flex-layout'],global.ng.material.input,global.ng.material.checkbox,global.ng.material.select,global.ng.material.radio,global.ng.material.datepicker,global.ng.material.autocomplete,null,global.ng.platformBrowser));
}(this, (function (exports,core,forms,material,operators,common,flexLayout,input,checkbox,select,radio,datepicker,autocomplete,ngxMaterialTimepicker,platformBrowser) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var MatchValidator = /** @class */ (function () {
        function MatchValidator(match) {
            this.match = match;
        }
        /**
         * @param {?} c
         * @return {?}
         */
        MatchValidator.prototype.validate = /**
         * @param {?} c
         * @return {?}
         */
            function (c) {
                // self value (e.g. retype password)
                /** @type {?} */
                var v = c.value;
                // control value (e.g. password)
                /** @type {?} */
                var e = c.root.get(this.match);
                // value not equal
                if (e && v !== e.value) {
                    return {
                        match: false
                    };
                }
                return null;
            };
        MatchValidator.decorators = [
            { type: core.Directive, args: [{
                        selector: '[tm-match][formControlName],[tm-match][formControl],[tm-match][ngModel]',
                        providers: [
                            { provide: forms.NG_VALIDATORS, useExisting: core.forwardRef(function () { return MatchValidator; }), multi: true }
                        ]
                    },] },
        ];
        /** @nocollapse */
        MatchValidator.ctorParameters = function () {
            return [
                { type: String, decorators: [{ type: core.Attribute, args: ['tm-match',] }] }
            ];
        };
        return MatchValidator;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var TWAConfirmDialogComponent = /** @class */ (function () {
        function TWAConfirmDialogComponent(dialogRef) {
            this.dialogRef = dialogRef;
        }
        TWAConfirmDialogComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'twa-app-confirm-dialog',
                        // templateUrl: './twa-confirm-dialog.component.html',
                        // styleUrls: ['./twa-confirm-dialog.component.css'],
                        template: "\n    <h2>{{ title }}</h2>\n    <p [innerHtml]=\"messageHtml\"></p>\n\n    <button type=\"button\" mat-raised-button\n        (click)=\"dialogRef.close(true)\">{{ okText }}</button>\n    <button type=\"button\" mat-button *ngIf=\"cancelText > ''\"\n        (click)=\"dialogRef.close()\">{{ cancelText }}</button>\n    "
                    },] },
        ];
        /** @nocollapse */
        TWAConfirmDialogComponent.ctorParameters = function () {
            return [
                { type: material.MatDialogRef }
            ];
        };
        return TWAConfirmDialogComponent;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m)
            return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length)
                    o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var TWAPromptDialogComponent = /** @class */ (function () {
        function TWAPromptDialogComponent(dialogRef) {
            this.dialogRef = dialogRef;
            this.form = new forms.FormGroup({});
            this.formSubmitEv = new core.EventEmitter();
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
                        formGroup[this.fields[i].key] = new forms.FormControl(this.fields[i].value || '', this.mapValidators(this.fields[i].validation, this.fields[i].key));
                        if (typeof this.fields[i].autocomplete !== 'undefined' && this.fields[i].autocomplete !== undefined) {
                            this.fields[i].autocomplete.filteredOptions = this.getFormGroupEvent(formGroup, i);
                        }
                    }
                }
                this.form = new forms.FormGroup(formGroup);
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
                return formGroup[this.fields[i].key].valueChanges.pipe(operators.startWith(''), operators.map(function (filterValue) {
                    return filterValue ? _this._filterValues(filterValue, _this.fields[i].autocomplete.options) :
                        _this.fields[i].autocomplete.options.slice();
                }));
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
                            formValidators.push(forms.Validators.required);
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
                            formValidators.push(forms.Validators.min(validators[validation]));
                        }
                        else if (validation === 'max') {
                            formValidators.push(forms.Validators.max(validators[validation]));
                        }
                    };
                    try {
                        for (var _b = __values(Object.keys(validators)), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var validation = _c.value;
                            _loop_1(validation);
                        }
                    }
                    catch (e_1_1) {
                        e_1 = { error: e_1_1 };
                    }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return))
                                _a.call(_b);
                        }
                        finally {
                            if (e_1)
                                throw e_1.error;
                        }
                    }
                }
                return formValidators;
            };
        TWAPromptDialogComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'twa-app-prompt-dialog',
                        // templateUrl: './twa-prompt-dialog.component.html',
                        // styleUrls: ['./twa-prompt-dialog.component.css']
                        styles: ['.mat-error { display: block; margin: -15px 0 15px; }'],
                        template: "\n    <h2>{{ title }}</h2>\n    <p [innerHtml]=\"messageHtml\"></p>\n\n    <form novalidate (ngSubmit)=\"submitForm(form.value)\" [formGroup]=\"form\" fxLayout=\"row wrap\" fxLayoutGap=\"10px\">\n        <div *ngFor=\"let prop of fields\" fxFlex=\"{{prop.fxFlex ? ('calc(' + prop.fxFlex + ' - 10px)') : '100%'}}\" fxLayout=\"column\">\n            <div [ngSwitch]=\"prop.type\" fxFlex=\"100%\">\n                <div *ngSwitchCase=\"'text'\">\n                    <mat-form-field *ngIf=\"!prop.autocomplete\" fxFlex>\n                        <input matInput placeholder=\"{{prop.label}}\"\n                            [formControlName]=\"prop.key\"\n                            [id]=\"prop.key\" [type]=\"prop.type\" fxFlex>\n                    </mat-form-field>\n                    <div *ngIf=\"prop.autocomplete\" fxFlex>\n                        <mat-form-field fxFlex>\n                            <input matInput placeholder=\"{{prop.label}}\"\n                                [formControlName]=\"prop.key\"\n                                [matAutocomplete]=\"auto\"\n                                (blur)=\"acCheckBlur(prop)\"\n                                [id]=\"prop.key\" [type]=\"prop.type\">\n                        </mat-form-field>\n                        <mat-autocomplete #auto=\"matAutocomplete\"\n                            (optionSelected)=\"acClick(prop, $event)\">\n                            <mat-option *ngFor=\"let option of prop.autocomplete.filteredOptions | async\"\n                                [value]=\"option\">\n                            {{ option }}\n                            </mat-option>\n                        </mat-autocomplete>\n                    </div>\n                </div>\n                <div *ngSwitchCase=\"'password'\">\n                    <mat-form-field fxFlex>\n                        <input matInput type=\"password\" placeholder=\"{{prop.label}}\"\n                            [formControlName]=\"prop.key\"\n                            [id]=\"prop.key\" [type]=\"prop.type\" fxFlex>\n                    </mat-form-field>\n                </div>\n                <div *ngSwitchCase=\"'textarea'\">\n                    <mat-form-field fxFlex>\n                        <textarea matInput placeholder=\"{{prop.label}}\" rows=\"{{prop.rows||'3'}}\" autosize\n                            [formControlName]=\"prop.key\"\n                            [id]=\"prop.key\" [type]=\"prop.type\"></textarea>\n                    </mat-form-field>\n                </div>\n                <div *ngSwitchCase=\"'number'\">\n                    <mat-form-field fxFlex>\n                        <input matInput placeholder=\"{{prop.label}}\"\n                            [formControlName]=\"prop.key\"\n                            [id]=\"prop.key\" [type]=\"prop.type\">\n                   </mat-form-field>\n                </div>\n                <div *ngSwitchCase=\"'date'\">\n                    <mat-form-field fxFlex>\n                        <input matInput [matDatepicker]=picker placeholder=\"{{prop.label}}\"\n                            [formControlName]=\"prop.key\"\n                            [id]=\"prop.key\">\n                        <mat-datepicker #picker></mat-datepicker>\n                        <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n                    </mat-form-field>\n                </div>\n                <div *ngSwitchCase=\"'time'\">\n                    <mat-form-field fxFlex>\n                        <input matInput [ngxTimepicker]=\"tpicker\" placeholder=\"{{prop.label}}\"\n                            [format]=\"24\"\n                            [formControlName]=\"prop.key\"\n                            [id]=\"prop.key\">\n                        <ngx-material-timepicker #tpicker></ngx-material-timepicker>\n                    </mat-form-field>\n                </div>\n\n                <div *ngSwitchCase=\"'radio'\" fxLayout=\"column\">\n                    <div _ngcontent-c20=\"\" style=\"height: 20px;\">\n                        <label _ngcontent-c20=\"\" style=\"transform: translateY(-1.28125em) scale(0.75)\n                                perspective(100px)\n                                translateZ(0.001px);\n                                -ms-transform: translateY(-1.28125em)\n                                scale(0.75);width: 133.33333333%;margin: 20px 0 0 0;font-weight: 100;color: #666;\">\n                            {{prop.label}}\n                        </label>\n                    </div>\n                    <mat-radio-group [formControlName]=\"prop.key\" [name]=\"prop.key\" fxLayout=\"column\" style=\"margin-top: 14px;\">\n                        <mat-radio-button [value]=\"option.value\" *ngFor=\"let option of prop.options\">\n                            {{option.label}}\n                        </mat-radio-button>\n                    </mat-radio-group>\n                </div>\n\n                <div *ngSwitchCase=\"'select'\">\n                    <mat-form-field fxFlex>\n                        <mat-select [formControlName]=\"prop.key\" placeholder=\"{{prop.label}}\">\n                            <mat-option *ngFor=\"let option of prop.options\" [value]=\"option.value\">\n                                {{ option.label }}\n                            </mat-option>\n                        </mat-select>\n                    </mat-form-field>\n                </div>\n            </div>\n            <div class=\"error\" *ngIf=\"form.get(prop.key).errors\" fxFlex=\"100%\">\n            </div>\n            <div class=\"error\" *ngIf=\"form.get(prop.key).invalid && (form.get(prop.key).dirty || form.get(prop.key).touched)\" fxFlex=\"100%\">\n                <mat-error *ngIf=\"form.get(prop.key).errors.required\">\n                    <div *ngIf=\"drawCustomErrors(prop, 'required')\">\n                        {{prop.validationMessages.required}}\n                    </div>\n                    <div *ngIf=\"!prop.validationMessages || !prop.validationMessages.required\">\n                        The field {{ prop.label }} is required.\n                    </div>\n                </mat-error>\n                <mat-error *ngIf=\"form.get(prop.key).errors.match\">\n                    <div *ngIf=\"drawCustomErrors(prop, 'match')\">\n                        {{prop.validationMessages.match}}\n                    </div>\n                    <div *ngIf=\"!prop.validationMessages || !prop.validationMessages.match\">\n                        The fields doesn't match.\n                    </div>\n                </mat-error>\n                <mat-error *ngIf=\"form.get(prop.key).errors.min\">\n                    <div *ngIf=\"drawCustomErrors(prop, 'min')\">\n                        {{prop.validationMessages.min}}\n                    </div>\n                    <div *ngIf=\"!prop.validationMessages || !prop.validationMessages.min\">\n                        The minimal value is {{form.get(prop.key).errors.min.min}}.\n                    </div>\n                </mat-error>\n                <mat-error *ngIf=\"form.get(prop.key).errors.max\">\n                    <div *ngIf=\"drawCustomErrors(prop, 'max')\">\n                        {{prop.validationMessages.max}}\n                    </div>\n                    <div *ngIf=\"!prop.validationMessages || !prop.validationMessages.max\">\n                        The max value is {{form.get(prop.key).errors.max.max}}.\n                    </div>\n                </mat-error>\n            </div>\n        </div>\n    </form>\n\n    <button type=\"button\" mat-raised-button\n        (click)=\"send()\">{{ okText }}</button>\n    <button type=\"button\" mat-button\n        (click)=\"dialogRef.close(false)\">{{ cancelText }}</button>\n\n    "
                    },] },
        ];
        /** @nocollapse */
        TWAPromptDialogComponent.ctorParameters = function () {
            return [
                { type: material.MatDialogRef }
            ];
        };
        return TWAPromptDialogComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
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
                /** @type {?} */
                var dialogRef;
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
                /** @type {?} */
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
        TWADialogsModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            flexLayout.FlexLayoutModule,
                            material.MatDialogModule,
                            material.MatButtonModule,
                            forms.FormsModule,
                            forms.ReactiveFormsModule,
                            input.MatInputModule,
                            checkbox.MatCheckboxModule,
                            select.MatSelectModule,
                            radio.MatRadioModule,
                            datepicker.MatDatepickerModule,
                            material.MatNativeDateModule,
                            autocomplete.MatAutocompleteModule,
                            ngxMaterialTimepicker.NgxMaterialTimepickerModule.forRoot(),
                        ],
                        declarations: [
                            // TWADialogsModule,
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
                            TWADialogsModule,
                            TWAConfirmDialogComponent,
                            TWAPromptDialogComponent
                        ]
                    },] },
            { type: core.Injectable },
        ];
        /** @nocollapse */
        TWADialogsModule.ctorParameters = function () {
            return [
                { type: material.MatDialog },
                { type: platformBrowser.DomSanitizer }
            ];
        };
        return TWADialogsModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.TWADialogsModule = TWADialogsModule;
    exports.TWAConfirmDialogComponent = TWAConfirmDialogComponent;
    exports.TWAPromptDialogComponent = TWAPromptDialogComponent;
    exports.ɵa = MatchValidator;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdhLW1kMi1kaWFsb2dzLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vdHdhLW1kMi1kaWFsb2dzL2xpYi9wcm9tcHQtZGlhbG9nL21hdGNoLXZhbGlkYXRvci5kaXJlY3RpdmUudHMiLCJuZzovL3R3YS1tZDItZGlhbG9ncy9saWIvY29uZmlybS1kaWFsb2cvdHdhLWNvbmZpcm0tZGlhbG9nLmNvbXBvbmVudC50cyIsbnVsbCwibmc6Ly90d2EtbWQyLWRpYWxvZ3MvbGliL3Byb21wdC1kaWFsb2cvdHdhLXByb21wdC1kaWFsb2cuY29tcG9uZW50LnRzIiwibmc6Ly90d2EtbWQyLWRpYWxvZ3MvbGliL3R3YS1kaWFsb2dzLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIGZvcndhcmRSZWYsIEF0dHJpYnV0ZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmFsaWRhdG9yLCBBYnN0cmFjdENvbnRyb2wsIE5HX1ZBTElEQVRPUlMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1t0bS1tYXRjaF1bZm9ybUNvbnRyb2xOYW1lXSxbdG0tbWF0Y2hdW2Zvcm1Db250cm9sXSxbdG0tbWF0Y2hdW25nTW9kZWxdJyxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiBOR19WQUxJREFUT1JTLCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNYXRjaFZhbGlkYXRvciksIG11bHRpOiB0cnVlIH1cbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE1hdGNoVmFsaWRhdG9yIGltcGxlbWVudHMgVmFsaWRhdG9yIHtcbiAgICBjb25zdHJ1Y3RvciggQEF0dHJpYnV0ZSgndG0tbWF0Y2gnKSBwdWJsaWMgbWF0Y2g6IHN0cmluZykge31cblxuICAgIHZhbGlkYXRlKGM6IEFic3RyYWN0Q29udHJvbCk6IHsgW2tleTogc3RyaW5nXTogYW55IH0ge1xuICAgICAgICAvLyBzZWxmIHZhbHVlIChlLmcuIHJldHlwZSBwYXNzd29yZClcbiAgICAgICAgY29uc3QgdiA9IGMudmFsdWU7XG5cbiAgICAgICAgLy8gY29udHJvbCB2YWx1ZSAoZS5nLiBwYXNzd29yZClcbiAgICAgICAgY29uc3QgZSA9IGMucm9vdC5nZXQodGhpcy5tYXRjaCk7XG5cbiAgICAgICAgLy8gdmFsdWUgbm90IGVxdWFsXG4gICAgICAgIGlmIChlICYmIHYgIT09IGUudmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgbWF0Y2g6IGZhbHNlXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nUmVmIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgU2FmZUh0bWwgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd0d2EtYXBwLWNvbmZpcm0tZGlhbG9nJyxcbiAgICAvLyB0ZW1wbGF0ZVVybDogJy4vdHdhLWNvbmZpcm0tZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcbiAgICAvLyBzdHlsZVVybHM6IFsnLi90d2EtY29uZmlybS1kaWFsb2cuY29tcG9uZW50LmNzcyddLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgPGgyPnt7IHRpdGxlIH19PC9oMj5cbiAgICA8cCBbaW5uZXJIdG1sXT1cIm1lc3NhZ2VIdG1sXCI+PC9wPlxuXG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbWF0LXJhaXNlZC1idXR0b25cbiAgICAgICAgKGNsaWNrKT1cImRpYWxvZ1JlZi5jbG9zZSh0cnVlKVwiPnt7IG9rVGV4dCB9fTwvYnV0dG9uPlxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG1hdC1idXR0b24gKm5nSWY9XCJjYW5jZWxUZXh0ID4gJydcIlxuICAgICAgICAoY2xpY2spPVwiZGlhbG9nUmVmLmNsb3NlKClcIj57eyBjYW5jZWxUZXh0IH19PC9idXR0b24+XG4gICAgYFxufSlcblxuZXhwb3J0IGNsYXNzIFRXQUNvbmZpcm1EaWFsb2dDb21wb25lbnQge1xuXG4gICAgcHVibGljIHRpdGxlOiBzdHJpbmc7XG4gICAgcHVibGljIG1lc3NhZ2U6IHN0cmluZztcbiAgICBwdWJsaWMgbWVzc2FnZUh0bWw6IFNhZmVIdG1sO1xuICAgIHB1YmxpYyBva1RleHQ6IHN0cmluZztcbiAgICBwdWJsaWMgY2FuY2VsVGV4dDogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPFRXQUNvbmZpcm1EaWFsb2dDb21wb25lbnQ+KSB7XG5cbiAgICB9XG59XG4iLCIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdERpYWxvZ1JlZiB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IEZvcm1Db250cm9sLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBTYWZlSHRtbCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5pbXBvcnQgeyBtYXAsIHN0YXJ0V2l0aCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTWF0Y2hWYWxpZGF0b3IgfSBmcm9tICcuL21hdGNoLXZhbGlkYXRvci5kaXJlY3RpdmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElUV0FQcm9tcHRGaWVsZCB7XG4gICAga2V5OiBzdHJpbmc7XG4gICAgbGFiZWw6IHN0cmluZztcbiAgICB0eXBlOiBzdHJpbmc7XG4gICAgZnhGbGV4OiBzdHJpbmc7XG4gICAgdmFsdWU6IHN0cmluZztcbiAgICBvcHRpb25zOiBhbnlbXTtcbiAgICBhdXRvY29tcGxldGU6IGFueTtcbiAgICByb3dzOiBhbnlbXTtcbiAgICB2YWxpZGF0aW9uOiBhbnk7XG4gICAgdmFsaWRhdGlvbk1lc3NhZ2VzPzogYW55O1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3R3YS1hcHAtcHJvbXB0LWRpYWxvZycsXG4gICAgLy8gdGVtcGxhdGVVcmw6ICcuL3R3YS1wcm9tcHQtZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcbiAgICAvLyBzdHlsZVVybHM6IFsnLi90d2EtcHJvbXB0LWRpYWxvZy5jb21wb25lbnQuY3NzJ11cbiAgICBzdHlsZXM6IFsnLm1hdC1lcnJvciB7IGRpc3BsYXk6IGJsb2NrOyBtYXJnaW46IC0xNXB4IDAgMTVweDsgfSddLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgPGgyPnt7IHRpdGxlIH19PC9oMj5cbiAgICA8cCBbaW5uZXJIdG1sXT1cIm1lc3NhZ2VIdG1sXCI+PC9wPlxuXG4gICAgPGZvcm0gbm92YWxpZGF0ZSAobmdTdWJtaXQpPVwic3VibWl0Rm9ybShmb3JtLnZhbHVlKVwiIFtmb3JtR3JvdXBdPVwiZm9ybVwiIGZ4TGF5b3V0PVwicm93IHdyYXBcIiBmeExheW91dEdhcD1cIjEwcHhcIj5cbiAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgcHJvcCBvZiBmaWVsZHNcIiBmeEZsZXg9XCJ7e3Byb3AuZnhGbGV4ID8gKCdjYWxjKCcgKyBwcm9wLmZ4RmxleCArICcgLSAxMHB4KScpIDogJzEwMCUnfX1cIiBmeExheW91dD1cImNvbHVtblwiPlxuICAgICAgICAgICAgPGRpdiBbbmdTd2l0Y2hdPVwicHJvcC50eXBlXCIgZnhGbGV4PVwiMTAwJVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIid0ZXh0J1wiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgKm5nSWY9XCIhcHJvcC5hdXRvY29tcGxldGVcIiBmeEZsZXg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgcGxhY2Vob2xkZXI9XCJ7e3Byb3AubGFiZWx9fVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJwcm9wLmtleVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2lkXT1cInByb3Aua2V5XCIgW3R5cGVdPVwicHJvcC50eXBlXCIgZnhGbGV4PlxuICAgICAgICAgICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwicHJvcC5hdXRvY29tcGxldGVcIiBmeEZsZXg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgZnhGbGV4PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBtYXRJbnB1dCBwbGFjZWhvbGRlcj1cInt7cHJvcC5sYWJlbH19XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJwcm9wLmtleVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFttYXRBdXRvY29tcGxldGVdPVwiYXV0b1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChibHVyKT1cImFjQ2hlY2tCbHVyKHByb3ApXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2lkXT1cInByb3Aua2V5XCIgW3R5cGVdPVwicHJvcC50eXBlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1hdXRvY29tcGxldGUgI2F1dG89XCJtYXRBdXRvY29tcGxldGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvcHRpb25TZWxlY3RlZCk9XCJhY0NsaWNrKHByb3AsICRldmVudClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bWF0LW9wdGlvbiAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIHByb3AuYXV0b2NvbXBsZXRlLmZpbHRlcmVkT3B0aW9ucyB8IGFzeW5jXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3ZhbHVlXT1cIm9wdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IG9wdGlvbiB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbWF0LW9wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbWF0LWF1dG9jb21wbGV0ZT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ3Bhc3N3b3JkJ1wiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgZnhGbGV4PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IG1hdElucHV0IHR5cGU9XCJwYXNzd29yZFwiIHBsYWNlaG9sZGVyPVwie3twcm9wLmxhYmVsfX1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwicHJvcC5rZXlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpZF09XCJwcm9wLmtleVwiIFt0eXBlXT1cInByb3AudHlwZVwiIGZ4RmxleD5cbiAgICAgICAgICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCIndGV4dGFyZWEnXCI+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZCBmeEZsZXg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWEgbWF0SW5wdXQgcGxhY2Vob2xkZXI9XCJ7e3Byb3AubGFiZWx9fVwiIHJvd3M9XCJ7e3Byb3Aucm93c3x8JzMnfX1cIiBhdXRvc2l6ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwicHJvcC5rZXlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpZF09XCJwcm9wLmtleVwiIFt0eXBlXT1cInByb3AudHlwZVwiPjwvdGV4dGFyZWE+XG4gICAgICAgICAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ251bWJlcidcIj5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkIGZ4RmxleD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBtYXRJbnB1dCBwbGFjZWhvbGRlcj1cInt7cHJvcC5sYWJlbH19XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cInByb3Aua2V5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaWRdPVwicHJvcC5rZXlcIiBbdHlwZV09XCJwcm9wLnR5cGVcIj5cbiAgICAgICAgICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIidkYXRlJ1wiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgZnhGbGV4PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IG1hdElucHV0IFttYXREYXRlcGlja2VyXT1waWNrZXIgcGxhY2Vob2xkZXI9XCJ7e3Byb3AubGFiZWx9fVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJwcm9wLmtleVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2lkXT1cInByb3Aua2V5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bWF0LWRhdGVwaWNrZXIgI3BpY2tlcj48L21hdC1kYXRlcGlja2VyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1kYXRlcGlja2VyLXRvZ2dsZSBtYXRTdWZmaXggW2Zvcl09XCJwaWNrZXJcIj48L21hdC1kYXRlcGlja2VyLXRvZ2dsZT5cbiAgICAgICAgICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCIndGltZSdcIj5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkIGZ4RmxleD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBtYXRJbnB1dCBbbmd4VGltZXBpY2tlcl09XCJ0cGlja2VyXCIgcGxhY2Vob2xkZXI9XCJ7e3Byb3AubGFiZWx9fVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Zvcm1hdF09XCIyNFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJwcm9wLmtleVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2lkXT1cInByb3Aua2V5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIgI3RwaWNrZXI+PC9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlcj5cbiAgICAgICAgICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIidyYWRpbydcIiBmeExheW91dD1cImNvbHVtblwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IF9uZ2NvbnRlbnQtYzIwPVwiXCIgc3R5bGU9XCJoZWlnaHQ6IDIwcHg7XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgX25nY29udGVudC1jMjA9XCJcIiBzdHlsZT1cInRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMS4yODEyNWVtKSBzY2FsZSgwLjc1KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJzcGVjdGl2ZSgxMDBweClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlWigwLjAwMXB4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMS4yODEyNWVtKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2FsZSgwLjc1KTt3aWR0aDogMTMzLjMzMzMzMzMzJTttYXJnaW46IDIwcHggMCAwIDA7Zm9udC13ZWlnaHQ6IDEwMDtjb2xvcjogIzY2NjtcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7e3Byb3AubGFiZWx9fVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtcmFkaW8tZ3JvdXAgW2Zvcm1Db250cm9sTmFtZV09XCJwcm9wLmtleVwiIFtuYW1lXT1cInByb3Aua2V5XCIgZnhMYXlvdXQ9XCJjb2x1bW5cIiBzdHlsZT1cIm1hcmdpbi10b3A6IDE0cHg7XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bWF0LXJhZGlvLWJ1dHRvbiBbdmFsdWVdPVwib3B0aW9uLnZhbHVlXCIgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBwcm9wLm9wdGlvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7e29wdGlvbi5sYWJlbH19XG4gICAgICAgICAgICAgICAgICAgICAgICA8L21hdC1yYWRpby1idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvbWF0LXJhZGlvLWdyb3VwPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ3NlbGVjdCdcIj5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkIGZ4RmxleD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxtYXQtc2VsZWN0IFtmb3JtQ29udHJvbE5hbWVdPVwicHJvcC5rZXlcIiBwbGFjZWhvbGRlcj1cInt7cHJvcC5sYWJlbH19XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1vcHRpb24gKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBwcm9wLm9wdGlvbnNcIiBbdmFsdWVdPVwib3B0aW9uLnZhbHVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IG9wdGlvbi5sYWJlbCB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbWF0LW9wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbWF0LXNlbGVjdD5cbiAgICAgICAgICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVycm9yXCIgKm5nSWY9XCJmb3JtLmdldChwcm9wLmtleSkuZXJyb3JzXCIgZnhGbGV4PVwiMTAwJVwiPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZXJyb3JcIiAqbmdJZj1cImZvcm0uZ2V0KHByb3Aua2V5KS5pbnZhbGlkICYmIChmb3JtLmdldChwcm9wLmtleSkuZGlydHkgfHwgZm9ybS5nZXQocHJvcC5rZXkpLnRvdWNoZWQpXCIgZnhGbGV4PVwiMTAwJVwiPlxuICAgICAgICAgICAgICAgIDxtYXQtZXJyb3IgKm5nSWY9XCJmb3JtLmdldChwcm9wLmtleSkuZXJyb3JzLnJlcXVpcmVkXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJkcmF3Q3VzdG9tRXJyb3JzKHByb3AsICdyZXF1aXJlZCcpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7e3Byb3AudmFsaWRhdGlvbk1lc3NhZ2VzLnJlcXVpcmVkfX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCIhcHJvcC52YWxpZGF0aW9uTWVzc2FnZXMgfHwgIXByb3AudmFsaWRhdGlvbk1lc3NhZ2VzLnJlcXVpcmVkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBUaGUgZmllbGQge3sgcHJvcC5sYWJlbCB9fSBpcyByZXF1aXJlZC5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9tYXQtZXJyb3I+XG4gICAgICAgICAgICAgICAgPG1hdC1lcnJvciAqbmdJZj1cImZvcm0uZ2V0KHByb3Aua2V5KS5lcnJvcnMubWF0Y2hcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cImRyYXdDdXN0b21FcnJvcnMocHJvcCwgJ21hdGNoJylcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt7cHJvcC52YWxpZGF0aW9uTWVzc2FnZXMubWF0Y2h9fVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cIiFwcm9wLnZhbGlkYXRpb25NZXNzYWdlcyB8fCAhcHJvcC52YWxpZGF0aW9uTWVzc2FnZXMubWF0Y2hcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIFRoZSBmaWVsZHMgZG9lc24ndCBtYXRjaC5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9tYXQtZXJyb3I+XG4gICAgICAgICAgICAgICAgPG1hdC1lcnJvciAqbmdJZj1cImZvcm0uZ2V0KHByb3Aua2V5KS5lcnJvcnMubWluXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJkcmF3Q3VzdG9tRXJyb3JzKHByb3AsICdtaW4nKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge3twcm9wLnZhbGlkYXRpb25NZXNzYWdlcy5taW59fVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cIiFwcm9wLnZhbGlkYXRpb25NZXNzYWdlcyB8fCAhcHJvcC52YWxpZGF0aW9uTWVzc2FnZXMubWluXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBUaGUgbWluaW1hbCB2YWx1ZSBpcyB7e2Zvcm0uZ2V0KHByb3Aua2V5KS5lcnJvcnMubWluLm1pbn19LlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L21hdC1lcnJvcj5cbiAgICAgICAgICAgICAgICA8bWF0LWVycm9yICpuZ0lmPVwiZm9ybS5nZXQocHJvcC5rZXkpLmVycm9ycy5tYXhcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cImRyYXdDdXN0b21FcnJvcnMocHJvcCwgJ21heCcpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7e3Byb3AudmFsaWRhdGlvbk1lc3NhZ2VzLm1heH19XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiIXByb3AudmFsaWRhdGlvbk1lc3NhZ2VzIHx8ICFwcm9wLnZhbGlkYXRpb25NZXNzYWdlcy5tYXhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIFRoZSBtYXggdmFsdWUgaXMge3tmb3JtLmdldChwcm9wLmtleSkuZXJyb3JzLm1heC5tYXh9fS5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9tYXQtZXJyb3I+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9mb3JtPlxuXG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbWF0LXJhaXNlZC1idXR0b25cbiAgICAgICAgKGNsaWNrKT1cInNlbmQoKVwiPnt7IG9rVGV4dCB9fTwvYnV0dG9uPlxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG1hdC1idXR0b25cbiAgICAgICAgKGNsaWNrKT1cImRpYWxvZ1JlZi5jbG9zZShmYWxzZSlcIj57eyBjYW5jZWxUZXh0IH19PC9idXR0b24+XG5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIFRXQVByb21wdERpYWxvZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBwdWJsaWMgZm9ybTogRm9ybUdyb3VwID0gbmV3IEZvcm1Hcm91cCh7fSk7XG4gICAgZm9ybVN1Ym1pdEV2OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xuICAgIHB1YmxpYyBtZXNzYWdlOiBzdHJpbmc7XG4gICAgcHVibGljIG1lc3NhZ2VIdG1sOiBTYWZlSHRtbDtcbiAgICBwdWJsaWMgZmllbGRzOiBJVFdBUHJvbXB0RmllbGRbXTtcbiAgICBwdWJsaWMgb2tUZXh0OiBzdHJpbmc7XG4gICAgcHVibGljIGNhbmNlbFRleHQ6IHN0cmluZztcbiAgICBwdWJsaWMgb25TdWJtaXQ6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxUV0FQcm9tcHREaWFsb2dDb21wb25lbnQ+KSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG5cbiAgICAgICAgY29uc3QgZm9ybUdyb3VwID0ge307XG4gICAgICAgIGZvciAoY29uc3QgaSBpbiB0aGlzLmZpZWxkcykge1xuICAgICAgICAgICAgaWYgKHRoaXMuZmllbGRzLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgICAgICAgICAgZm9ybUdyb3VwW3RoaXMuZmllbGRzW2ldLmtleV0gPSBuZXcgRm9ybUNvbnRyb2woXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmllbGRzW2ldLnZhbHVlIHx8ICcnLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcFZhbGlkYXRvcnModGhpcy5maWVsZHNbaV0udmFsaWRhdGlvbiwgdGhpcy5maWVsZHNbaV0ua2V5KVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmZpZWxkc1tpXS5hdXRvY29tcGxldGUgIT09ICd1bmRlZmluZWQnICYmIHRoaXMuZmllbGRzW2ldLmF1dG9jb21wbGV0ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmllbGRzW2ldLmF1dG9jb21wbGV0ZS5maWx0ZXJlZE9wdGlvbnMgPSB0aGlzLmdldEZvcm1Hcm91cEV2ZW50KGZvcm1Hcm91cCwgaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5mb3JtID0gbmV3IEZvcm1Hcm91cChmb3JtR3JvdXApO1xuXG4gICAgfVxuXG4gICAgZ2V0Rm9ybUdyb3VwRXZlbnQoZm9ybUdyb3VwLCBpKSB7XG4gICAgICAgIHJldHVybiBmb3JtR3JvdXBbdGhpcy5maWVsZHNbaV0ua2V5XS52YWx1ZUNoYW5nZXMucGlwZShcbiAgICAgICAgICAgIHN0YXJ0V2l0aCgnJyksXG4gICAgICAgICAgICBtYXAoZmlsdGVyVmFsdWUgPT4gZmlsdGVyVmFsdWUgPyB0aGlzLl9maWx0ZXJWYWx1ZXMoZmlsdGVyVmFsdWUsIHRoaXMuZmllbGRzW2ldLmF1dG9jb21wbGV0ZS5vcHRpb25zKSA6XG4gICAgICAgICAgICAgICAgdGhpcy5maWVsZHNbaV0uYXV0b2NvbXBsZXRlLm9wdGlvbnMuc2xpY2UoKSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBsb2cob2JqZWN0OiBhbnkpIHtcbiAgICAgICAgY29uc29sZS5sb2cob2JqZWN0KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9maWx0ZXJWYWx1ZXModmFsdWUsIG9wdGlvbnMpIHtcblxuICAgICAgICBjb25zdCBmaWx0ZXJlZFZhbHVlID0gdmFsdWUudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICByZXR1cm4gb3B0aW9ucy5maWx0ZXIob3B0aW9uID0+IG9wdGlvbi50b0xvd2VyQ2FzZSgpLmluZGV4T2YoZmlsdGVyZWRWYWx1ZSkgPj0gMCk7XG5cbiAgICB9XG5cbiAgICBnZXRGb3JtU3VibWl0RXYoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mb3JtU3VibWl0RXY7XG4gICAgfVxuXG4gICAgc2VuZCgpIHtcbiAgICAgICAgICAgIGxldCBpO1xuICAgICAgICAgICAgdGhpcy5mb3JtLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmZvcm0uc3RhdHVzICE9PSAnSU5WQUxJRCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UodGhpcy5mb3JtLnZhbHVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoaSBpbiB0aGlzLmZvcm0uY29udHJvbHMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5mb3JtLmNvbnRyb2xzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5mb3JtLmNvbnRyb2xzLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcm0uY29udHJvbHNbaV0ubWFya0FzVG91Y2hlZCh7IG9ubHlTZWxmOiB0cnVlIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtLmNvbnRyb2xzW2ldLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICB9XG5cbiAgICBhY0NsaWNrKGZpZWxkOiBhbnksIGV2ZW50OiBhbnkpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coZXZlbnQpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhmaWVsZC5hdXRvY29tcGxldGUpO1xuICAgICAgICBpZiAodHlwZW9mIGZpZWxkLmF1dG9jb21wbGV0ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZmllbGQuYXV0b2NvbXBsZXRlLmZvcmNlU2VsZWN0ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgICAgICAgIGZpZWxkLmF1dG9jb21wbGV0ZS5mb3JjZVNlbGVjdCkge1xuICAgICAgICAgICAgICAgIGZpZWxkLmF1dG9jb21wbGV0ZS5zZWxlY3RlZCA9IGV2ZW50Lm9wdGlvbi52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFjQ2hlY2tCbHVyKGZpZWxkKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGZpZWxkLmF1dG9jb21wbGV0ZS5zZWxlY3RlZCwgdGhpcy5mb3JtLmNvbnRyb2xzW2ZpZWxkLmtleV0udmFsdWUpO1xuICAgICAgICBpZiAodHlwZW9mIGZpZWxkLmF1dG9jb21wbGV0ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZmllbGQuYXV0b2NvbXBsZXRlLmZvcmNlU2VsZWN0ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgICAgICAgIGZpZWxkLmF1dG9jb21wbGV0ZS5mb3JjZVNlbGVjdCkge1xuICAgICAgICAgICAgICAgIGlmICghZmllbGQuYXV0b2NvbXBsZXRlLnNlbGVjdGVkIHx8XG4gICAgICAgICAgICAgICAgICAgIGZpZWxkLmF1dG9jb21wbGV0ZS5zZWxlY3RlZCAhPT0gdGhpcy5mb3JtLmNvbnRyb2xzW2ZpZWxkLmtleV0udmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtLmNvbnRyb2xzW2ZpZWxkLmtleV0uc2V0VmFsdWUobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIGZpZWxkLmF1dG9jb21wbGV0ZS5zZWxlY3RlZCA9ICcnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN1Ym1pdEZvcm0oZm9ybTogYW55KSB7XG4gICAgICAgICAgICB0aGlzLmZvcm1TdWJtaXRFdi5lbWl0KGZvcm0pO1xuICAgIH1cblxuICAgIGRyYXdDdXN0b21FcnJvcnMocHJvcCwgZXJyb3IpIHtcbiAgICAgICAgbGV0IHJldCA9IGZhbHNlO1xuICAgICAgICBpZiAodHlwZW9mIHByb3AudmFsaWRhdGlvbk1lc3NhZ2VzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBwcm9wLnZhbGlkYXRpb25NZXNzYWdlc1tlcnJvcl0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgcmV0ID0gcHJvcC52YWxpZGF0aW9uTWVzc2FnZXNbZXJyb3JdID4gJyc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG5cbiAgICBwcml2YXRlIG1hcFZhbGlkYXRvcnModmFsaWRhdG9yczogYW55LCBmaWVsZCkge1xuXG4gICAgICAgIGNvbnN0IGZvcm1WYWxpZGF0b3JzID0gW107XG5cbiAgICAgICAgaWYgKHZhbGlkYXRvcnMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdmFsaWRhdGlvbiBvZiBPYmplY3Qua2V5cyh2YWxpZGF0b3JzKSkge1xuICAgICAgICAgICAgICAgIGlmICh2YWxpZGF0aW9uID09PSAncmVxdWlyZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1WYWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5yZXF1aXJlZCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWxpZGF0aW9uID09PSAnbWF0Y2gnKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1WYWxpZGF0b3JzLnB1c2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJldDogYW55IHwgYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udHJvbCA9IHRoaXMuZm9ybS5nZXQodmFsaWRhdG9yc1t2YWxpZGF0aW9uXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZm9ybS5nZXQoZmllbGQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldCA9ICEodGhpcy5mb3JtLmdldChmaWVsZCkgJiYgdGhpcy5mb3JtLmdldChmaWVsZCkudmFsdWUgPT09IGNvbnRyb2wudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXQgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsaWRhdGlvbiA9PT0gJ21pbicpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybVZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLm1pbih2YWxpZGF0b3JzW3ZhbGlkYXRpb25dKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWxpZGF0aW9uID09PSAnbWF4Jykge1xuICAgICAgICAgICAgICAgICAgICBmb3JtVmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMubWF4KHZhbGlkYXRvcnNbdmFsaWRhdGlvbl0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZm9ybVZhbGlkYXRvcnM7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZsZXhMYXlvdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mbGV4LWxheW91dCc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE1hdElucHV0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaW5wdXQnO1xuaW1wb3J0IHsgTWF0Q2hlY2tib3hNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jaGVja2JveCc7XG5pbXBvcnQgeyBNYXRTZWxlY3RNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zZWxlY3QnO1xuaW1wb3J0IHsgTWF0UmFkaW9Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9yYWRpbyc7XG5pbXBvcnQgeyBNYXREYXRlcGlja2VyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGF0ZXBpY2tlcic7XG5pbXBvcnQgeyBNYXROYXRpdmVEYXRlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgTWF0QXV0b2NvbXBsZXRlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYXV0b2NvbXBsZXRlJztcblxuaW1wb3J0IHsgTWF0Y2hWYWxpZGF0b3IgfSBmcm9tICcuL3Byb21wdC1kaWFsb2cvbWF0Y2gtdmFsaWRhdG9yLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBUV0FDb25maXJtRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi9jb25maXJtLWRpYWxvZy90d2EtY29uZmlybS1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IFRXQVByb21wdERpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vcHJvbXB0LWRpYWxvZy90d2EtcHJvbXB0LWRpYWxvZy5jb21wb25lbnQnO1xuLy8gaW1wb3J0IHsgVFdBRGlhbG9nc1NlcnZpY2UgfSBmcm9tICcuL3R3YS1kaWFsb2dzLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlLCBNYXREaWFsb2dNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJNb2R1bGUgfSBmcm9tICduZ3gtbWF0ZXJpYWwtdGltZXBpY2tlcic7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIsIFNhZmVIdG1sIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE1hdERpYWxvZywgTWF0RGlhbG9nUmVmIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZsZXhMYXlvdXRNb2R1bGUsXG4gICAgTWF0RGlhbG9nTW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlLFxuICAgIE1hdENoZWNrYm94TW9kdWxlLFxuICAgIE1hdFNlbGVjdE1vZHVsZSxcbiAgICBNYXRSYWRpb01vZHVsZSxcbiAgICBNYXREYXRlcGlja2VyTW9kdWxlLFxuICAgIE1hdE5hdGl2ZURhdGVNb2R1bGUsXG4gICAgTWF0QXV0b2NvbXBsZXRlTW9kdWxlLFxuICAgIE5neE1hdGVyaWFsVGltZXBpY2tlck1vZHVsZS5mb3JSb290KCksXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIC8vIFRXQURpYWxvZ3NNb2R1bGUsXG4gICAgVFdBQ29uZmlybURpYWxvZ0NvbXBvbmVudCxcbiAgICBUV0FQcm9tcHREaWFsb2dDb21wb25lbnQsXG4gICAgTWF0Y2hWYWxpZGF0b3IsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICAvLyBUV0FEaWFsb2dzTW9kdWxlLFxuICAgIFRXQUNvbmZpcm1EaWFsb2dDb21wb25lbnQsXG4gICAgVFdBUHJvbXB0RGlhbG9nQ29tcG9uZW50XG4gIF0sXG4gIGVudHJ5Q29tcG9uZW50czogW1RXQUNvbmZpcm1EaWFsb2dDb21wb25lbnQsIFRXQVByb21wdERpYWxvZ0NvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW1xuICAgIFRXQURpYWxvZ3NNb2R1bGUsXG4gICAgVFdBQ29uZmlybURpYWxvZ0NvbXBvbmVudCxcbiAgICBUV0FQcm9tcHREaWFsb2dDb21wb25lbnRcbiAgXVxufSlcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUV0FEaWFsb2dzTW9kdWxlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIGRpYWxvZzogTWF0RGlhbG9nLFxuICAgICAgcHJpdmF0ZSBfc2FuaXRpemVyOiBEb21TYW5pdGl6ZXJcbiAgICApIHt9XG5cbiAgcHVibGljIGNvbmZpcm0oXG4gICAgdGl0bGU6IHN0cmluZyxcbiAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgb2tUZXh0Pzogc3RyaW5nLFxuICAgIGNhbmNlbFRleHQ/OiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBsZXQgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8VFdBQ29uZmlybURpYWxvZ0NvbXBvbmVudD47XG5cbiAgICBkaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKFRXQUNvbmZpcm1EaWFsb2dDb21wb25lbnQpO1xuXG4gICAgZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLnRpdGxlID0gdGl0bGU7XG4gICAgZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIGRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5tZXNzYWdlSHRtbCA9IHRoaXMuX3Nhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0SHRtbChtZXNzYWdlKTtcbiAgICBkaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2Uub2tUZXh0ID0gb2tUZXh0IHx8ICdBY2VwdGFyJztcbiAgICBkaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UuY2FuY2VsVGV4dCA9IGNhbmNlbFRleHQgfHwgJyc7XG5cbiAgICByZXR1cm4gZGlhbG9nUmVmLmFmdGVyQ2xvc2VkKCk7XG4gIH1cblxuICBwdWJsaWMgcHJvbXB0KFxuICAgIHRpdGxlOiBzdHJpbmcsXG4gICAgbWVzc2FnZTogc3RyaW5nLFxuICAgIGZpZWxkczogYW55LFxuICAgIG9rVGV4dD86IHN0cmluZyxcbiAgICBjYW5jZWxUZXh0Pzogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgbGV0IGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPFRXQVByb21wdERpYWxvZ0NvbXBvbmVudD47XG5cbiAgICBkaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKFRXQVByb21wdERpYWxvZ0NvbXBvbmVudCk7XG5cbiAgICBkaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UudGl0bGUgPSB0aXRsZTtcbiAgICBkaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLm1lc3NhZ2VIdG1sID0gdGhpcy5fc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKG1lc3NhZ2UpO1xuICAgIGRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5maWVsZHMgPSBmaWVsZHM7XG4gICAgZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLm9rVGV4dCA9IG9rVGV4dCB8fCAnQWNlcHRhcic7XG4gICAgZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLmNhbmNlbFRleHQgPSBjYW5jZWxUZXh0IHx8ICdDYW5jZWxhcic7XG5cbiAgICAvLyBvblN1Ym1pdCA9IGRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5nZXRGb3JtU3VibWl0RXYoKS5zdWJzY3JpYmUoaXRlbSA9PiB7XG4gICAgLy8gICAgIGRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5yZXN1bHQgPSBpdGVtO1xuICAgIC8vIH0pO1xuXG4gICAgcmV0dXJuIGRpYWxvZ1JlZi5hZnRlckNsb3NlZCgpO1xuICB9XG59XG4iXSwibmFtZXMiOlsiRGlyZWN0aXZlIiwiTkdfVkFMSURBVE9SUyIsImZvcndhcmRSZWYiLCJBdHRyaWJ1dGUiLCJDb21wb25lbnQiLCJNYXREaWFsb2dSZWYiLCJGb3JtR3JvdXAiLCJFdmVudEVtaXR0ZXIiLCJGb3JtQ29udHJvbCIsInN0YXJ0V2l0aCIsIm1hcCIsIlZhbGlkYXRvcnMiLCJ0c2xpYl8xLl9fdmFsdWVzIiwiTmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiLCJGbGV4TGF5b3V0TW9kdWxlIiwiTWF0RGlhbG9nTW9kdWxlIiwiTWF0QnV0dG9uTW9kdWxlIiwiRm9ybXNNb2R1bGUiLCJSZWFjdGl2ZUZvcm1zTW9kdWxlIiwiTWF0SW5wdXRNb2R1bGUiLCJNYXRDaGVja2JveE1vZHVsZSIsIk1hdFNlbGVjdE1vZHVsZSIsIk1hdFJhZGlvTW9kdWxlIiwiTWF0RGF0ZXBpY2tlck1vZHVsZSIsIk1hdE5hdGl2ZURhdGVNb2R1bGUiLCJNYXRBdXRvY29tcGxldGVNb2R1bGUiLCJOZ3hNYXRlcmlhbFRpbWVwaWNrZXJNb2R1bGUiLCJJbmplY3RhYmxlIiwiTWF0RGlhbG9nIiwiRG9tU2FuaXRpemVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7UUFTSSx3QkFBMkMsS0FBYTtZQUFiLFVBQUssR0FBTCxLQUFLLENBQVE7U0FBSTs7Ozs7UUFFNUQsaUNBQVE7Ozs7WUFBUixVQUFTLENBQWtCOzs7b0JBRWpCLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSzs7O29CQUdYLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDOztnQkFHaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUU7b0JBQ3BCLE9BQU87d0JBQ0gsS0FBSyxFQUFFLEtBQUs7cUJBQ2YsQ0FBQztpQkFDTDtnQkFDRCxPQUFPLElBQUksQ0FBQzthQUNmOztvQkF2QkpBLGNBQVMsU0FBQzt3QkFDUCxRQUFRLEVBQUUseUVBQXlFO3dCQUNuRixTQUFTLEVBQUU7NEJBQ1AsRUFBRSxPQUFPLEVBQUVDLG1CQUFhLEVBQUUsV0FBVyxFQUFFQyxlQUFVLENBQUMsY0FBTSxPQUFBLGNBQWMsR0FBQSxDQUFD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