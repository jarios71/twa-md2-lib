(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/material'), require('@angular/forms'), require('rxjs/operators'), require('@angular/common'), require('@angular/flex-layout'), require('@angular/material/input'), require('@angular/material/checkbox'), require('@angular/material/select'), require('@angular/material/radio'), require('@angular/material/datepicker'), require('@angular/material/autocomplete'), require('ngx-material-timepicker'), require('@angular/platform-browser')) :
    typeof define === 'function' && define.amd ? define('twa-md2-dialogs', ['exports', '@angular/core', '@angular/material', '@angular/forms', 'rxjs/operators', '@angular/common', '@angular/flex-layout', '@angular/material/input', '@angular/material/checkbox', '@angular/material/select', '@angular/material/radio', '@angular/material/datepicker', '@angular/material/autocomplete', 'ngx-material-timepicker', '@angular/platform-browser'], factory) :
    (factory((global['twa-md2-dialogs'] = {}),global.ng.core,global.ng.material,global.ng.forms,global.rxjs.operators,global.ng.common,global.ng['flex-layout'],global.ng.material.input,global.ng.material.checkbox,global.ng.material.select,global.ng.material.radio,global.ng.material.datepicker,global.ng.material.autocomplete,null,global.ng.platformBrowser));
}(this, (function (exports,core,material,forms,operators,common,flexLayout,input,checkbox,select,radio,datepicker,autocomplete,ngxMaterialTimepicker,platformBrowser) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var TWAConfirmDialogComponent = (function () {
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
     * @suppress {checkTypes} checked by tsc
     */
    var TWAPromptDialogComponent = (function () {
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
                var /** @type {?} */ formGroup = {};
                for (var /** @type {?} */ i in this.fields) {
                    if (this.fields.hasOwnProperty(i)) {
                        formGroup[this.fields[i].key] = new forms.FormControl(this.fields[i].value || '', this.mapValidators(this.fields[i].validation));
                        console.log(this.fields[i].autocomplete);
                        if (typeof this.fields[i].autocomplete !== 'undefined' && this.fields[i].autocomplete !== undefined) {
                            console.log(this.fields[i].autocomplete);
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
                        for (var _a = __values(Object.keys(validators)), _b = _a.next(); !_b.done; _b = _a.next()) {
                            var validation = _b.value;
                            if (validation === 'required') {
                                formValidators.push(forms.Validators.required);
                            }
                            else if (validation === 'min') {
                                formValidators.push(forms.Validators.min(validators[validation]));
                            }
                        }
                    }
                    catch (e_1_1) {
                        e_1 = { error: e_1_1 };
                    }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return))
                                _c.call(_a);
                        }
                        finally {
                            if (e_1)
                                throw e_1.error;
                        }
                    }
                }
                return formValidators;
                var e_1, _c;
            };
        TWAPromptDialogComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'twa-app-prompt-dialog',
                        // templateUrl: './twa-prompt-dialog.component.html',
                        // styleUrls: ['./twa-prompt-dialog.component.css']
                        styles: ['.mat-error { display: block; margin: -15px 0 15px; }'],
                        template: "\n    <h2>{{ title }}</h2>\n    <p [innerHtml]=\"messageHtml\"></p>\n\n    <form novalidate (ngSubmit)=\"onSubmit(form.value)\" [formGroup]=\"form\" fxLayout=\"row wrap\" fxLayoutGap=\"10px\">\n        <div *ngFor=\"let prop of fields\" fxFlex=\"{{prop.fxFlex ? ('calc(' + prop.fxFlex + ' - 10px)') : '100%'}}\" fxLayout=\"column\">\n            <div [ngSwitch]=\"prop.type\" fxFlex=\"100%\">\n                <div *ngSwitchCase=\"'text'\">\n                    <mat-form-field *ngIf=\"!prop.autocomplete\" fxFlex>\n                        <input matInput placeholder=\"{{prop.label}}\"\n                            [formControlName]=\"prop.key\"\n                            [id]=\"prop.key\" [type]=\"prop.type\" fxFlex>\n                    </mat-form-field>\n                    <div *ngIf=\"prop.autocomplete\" fxFlex>\n                        <mat-form-field fxFlex>\n                            <input matInput placeholder=\"{{prop.label}}\"\n                                [formControlName]=\"prop.key\"\n                                [matAutocomplete]=\"auto\"\n                                (blur)=\"acCheckBlur(prop)\"\n                                [id]=\"prop.key\" [type]=\"prop.type\">\n                        </mat-form-field>\n                        <mat-autocomplete #auto=\"matAutocomplete\"\n                            (optionSelected)=\"acClick(prop, $event)\">\n                            <mat-option *ngFor=\"let option of prop.autocomplete.filteredOptions | async\"\n                                [value]=\"option\">\n                            {{ option }}\n                            </mat-option>\n                        </mat-autocomplete>\n                    </div>\n                </div>\n                <div *ngSwitchCase=\"'textarea'\">\n                    <mat-form-field fxFlex>\n                        <textarea matInput placeholder=\"{{prop.label}}\" rows=\"{{prop.rows||'3'}}\" autosize\n                            [formControlName]=\"prop.key\"\n                            [id]=\"prop.key\" [type]=\"prop.type\"></textarea>\n                    </mat-form-field>\n                </div>\n                <div *ngSwitchCase=\"'number'\">\n                    <mat-form-field fxFlex>\n                        <input matInput placeholder=\"{{prop.label}}\"\n                            [formControlName]=\"prop.key\"\n                            [id]=\"prop.key\" [type]=\"prop.type\">\n                   </mat-form-field>\n                </div>\n                <div *ngSwitchCase=\"'date'\">\n                    <mat-form-field fxFlex>\n                        <input matInput [matDatepicker]=picker placeholder=\"{{prop.label}}\"\n                            [formControlName]=\"prop.key\"\n                            [id]=\"prop.key\">\n                        <mat-datepicker #picker></mat-datepicker>\n                        <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n                    </mat-form-field>\n                </div>\n                <div *ngSwitchCase=\"'time'\">\n                    <mat-form-field fxFlex>\n                        <input matInput [ngxTimepicker]=\"tpicker\" placeholder=\"{{prop.label}}\"\n                            [format]=\"24\"\n                            [formControlName]=\"prop.key\"\n                            [id]=\"prop.key\">\n                        <ngx-material-timepicker #tpicker></ngx-material-timepicker>\n                    </mat-form-field>\n                </div>\n\n                <div *ngSwitchCase=\"'radio'\" fxLayout=\"column\">\n                    <div _ngcontent-c20=\"\" style=\"height: 20px;\">\n                        <label _ngcontent-c20=\"\" style=\"transform: translateY(-1.28125em) scale(0.75)\n                                perspective(100px)\n                                translateZ(0.001px);\n                                -ms-transform: translateY(-1.28125em)\n                                scale(0.75);width: 133.33333333%;margin: 20px 0 0 0;font-weight: 100;color: #666;\">\n                            {{prop.label}}\n                        </label>\n                    </div>\n                    <mat-radio-group [formControlName]=\"prop.key\" [name]=\"prop.key\" fxLayout=\"column\" style=\"margin-top: 14px;\">\n                        <mat-radio-button [value]=\"option.value\" *ngFor=\"let option of prop.options\">\n                            {{option.label}}\n                        </mat-radio-button>\n                    </mat-radio-group>\n                </div>\n\n                <div *ngSwitchCase=\"'select'\">\n                    <mat-form-field fxFlex>\n                        <mat-select [formControlName]=\"prop.key\" placeholder=\"{{prop.label}}\">\n                            <mat-option *ngFor=\"let option of prop.options\" [value]=\"option.value\">\n                                {{ option.label }}\n                            </mat-option>\n                        </mat-select>\n                    </mat-form-field>\n                </div>\n            </div>\n            <div class=\"error\" *ngIf=\"form.get(prop.key).invalid && (form.get(prop.key).dirty || form.get(prop.key).touched)\" fxFlex=\"100%\">\n                <mat-error *ngIf=\"form.get(prop.key).errors.required\">\n                    El campo {{ prop.label }} es obligatorio.\n                </mat-error>\n            </div>\n        </div>\n    </form>\n\n    <button type=\"button\" mat-raised-button\n        (click)=\"send()\">{{ okText }}</button>\n    <button type=\"button\" mat-button\n        (click)=\"dialogRef.close(false)\">{{ cancelText }}</button>\n\n    "
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
     * @suppress {checkTypes} checked by tsc
     */
    var TWADialogsModule = (function () {
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
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    exports.TWADialogsModule = TWADialogsModule;
    exports.TWAConfirmDialogComponent = TWAConfirmDialogComponent;
    exports.TWAPromptDialogComponent = TWAPromptDialogComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdhLW1kMi1kaWFsb2dzLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vdHdhLW1kMi1kaWFsb2dzL2xpYi9jb25maXJtLWRpYWxvZy90d2EtY29uZmlybS1kaWFsb2cuY29tcG9uZW50LnRzIixudWxsLCJuZzovL3R3YS1tZDItZGlhbG9ncy9saWIvcHJvbXB0LWRpYWxvZy90d2EtcHJvbXB0LWRpYWxvZy5jb21wb25lbnQudHMiLCJuZzovL3R3YS1tZDItZGlhbG9ncy9saWIvdHdhLWRpYWxvZ3MubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nUmVmIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgU2FmZUh0bWwgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd0d2EtYXBwLWNvbmZpcm0tZGlhbG9nJyxcbiAgICAvLyB0ZW1wbGF0ZVVybDogJy4vdHdhLWNvbmZpcm0tZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcbiAgICAvLyBzdHlsZVVybHM6IFsnLi90d2EtY29uZmlybS1kaWFsb2cuY29tcG9uZW50LmNzcyddLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgPGgyPnt7IHRpdGxlIH19PC9oMj5cbiAgICA8cCBbaW5uZXJIdG1sXT1cIm1lc3NhZ2VIdG1sXCI+PC9wPlxuXG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbWF0LXJhaXNlZC1idXR0b25cbiAgICAgICAgKGNsaWNrKT1cImRpYWxvZ1JlZi5jbG9zZSh0cnVlKVwiPnt7IG9rVGV4dCB9fTwvYnV0dG9uPlxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG1hdC1idXR0b24gKm5nSWY9XCJjYW5jZWxUZXh0ID4gJydcIlxuICAgICAgICAoY2xpY2spPVwiZGlhbG9nUmVmLmNsb3NlKClcIj57eyBjYW5jZWxUZXh0IH19PC9idXR0b24+XG4gICAgYFxufSlcblxuZXhwb3J0IGNsYXNzIFRXQUNvbmZpcm1EaWFsb2dDb21wb25lbnQge1xuXG4gICAgcHVibGljIHRpdGxlOiBzdHJpbmc7XG4gICAgcHVibGljIG1lc3NhZ2U6IHN0cmluZztcbiAgICBwdWJsaWMgbWVzc2FnZUh0bWw6IFNhZmVIdG1sO1xuICAgIHB1YmxpYyBva1RleHQ6IHN0cmluZztcbiAgICBwdWJsaWMgY2FuY2VsVGV4dDogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPFRXQUNvbmZpcm1EaWFsb2dDb21wb25lbnQ+KSB7XG5cbiAgICB9XG59XG4iLCIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdERpYWxvZ1JlZiB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IEZvcm1Db250cm9sLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBTYWZlSHRtbCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5pbXBvcnQgeyBtYXAsIHN0YXJ0V2l0aCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZXhwb3J0IGludGVyZmFjZSBJVFdBUHJvbXB0RmllbGQge1xuICAgIGtleTogc3RyaW5nO1xuICAgIGxhYmVsOiBzdHJpbmc7XG4gICAgdHlwZTogc3RyaW5nO1xuICAgIGZ4RmxleDogc3RyaW5nO1xuICAgIHZhbHVlOiBzdHJpbmc7XG4gICAgb3B0aW9uczogYW55W107XG4gICAgYXV0b2NvbXBsZXRlOiBhbnk7XG4gICAgcm93czogYW55W107XG4gICAgdmFsaWRhdGlvbjogYW55O1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3R3YS1hcHAtcHJvbXB0LWRpYWxvZycsXG4gICAgLy8gdGVtcGxhdGVVcmw6ICcuL3R3YS1wcm9tcHQtZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcbiAgICAvLyBzdHlsZVVybHM6IFsnLi90d2EtcHJvbXB0LWRpYWxvZy5jb21wb25lbnQuY3NzJ11cbiAgICBzdHlsZXM6IFsnLm1hdC1lcnJvciB7IGRpc3BsYXk6IGJsb2NrOyBtYXJnaW46IC0xNXB4IDAgMTVweDsgfSddLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgPGgyPnt7IHRpdGxlIH19PC9oMj5cbiAgICA8cCBbaW5uZXJIdG1sXT1cIm1lc3NhZ2VIdG1sXCI+PC9wPlxuXG4gICAgPGZvcm0gbm92YWxpZGF0ZSAobmdTdWJtaXQpPVwib25TdWJtaXQoZm9ybS52YWx1ZSlcIiBbZm9ybUdyb3VwXT1cImZvcm1cIiBmeExheW91dD1cInJvdyB3cmFwXCIgZnhMYXlvdXRHYXA9XCIxMHB4XCI+XG4gICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IHByb3Agb2YgZmllbGRzXCIgZnhGbGV4PVwie3twcm9wLmZ4RmxleCA/ICgnY2FsYygnICsgcHJvcC5meEZsZXggKyAnIC0gMTBweCknKSA6ICcxMDAlJ319XCIgZnhMYXlvdXQ9XCJjb2x1bW5cIj5cbiAgICAgICAgICAgIDxkaXYgW25nU3dpdGNoXT1cInByb3AudHlwZVwiIGZ4RmxleD1cIjEwMCVcIj5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCIndGV4dCdcIj5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkICpuZ0lmPVwiIXByb3AuYXV0b2NvbXBsZXRlXCIgZnhGbGV4PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IG1hdElucHV0IHBsYWNlaG9sZGVyPVwie3twcm9wLmxhYmVsfX1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwicHJvcC5rZXlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpZF09XCJwcm9wLmtleVwiIFt0eXBlXT1cInByb3AudHlwZVwiIGZ4RmxleD5cbiAgICAgICAgICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cInByb3AuYXV0b2NvbXBsZXRlXCIgZnhGbGV4PlxuICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkIGZ4RmxleD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgcGxhY2Vob2xkZXI9XCJ7e3Byb3AubGFiZWx9fVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwicHJvcC5rZXlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbWF0QXV0b2NvbXBsZXRlXT1cImF1dG9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoYmx1cik9XCJhY0NoZWNrQmx1cihwcm9wKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpZF09XCJwcm9wLmtleVwiIFt0eXBlXT1cInByb3AudHlwZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxtYXQtYXV0b2NvbXBsZXRlICNhdXRvPVwibWF0QXV0b2NvbXBsZXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAob3B0aW9uU2VsZWN0ZWQpPVwiYWNDbGljayhwcm9wLCAkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1vcHRpb24gKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBwcm9wLmF1dG9jb21wbGV0ZS5maWx0ZXJlZE9wdGlvbnMgfCBhc3luY1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt2YWx1ZV09XCJvcHRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBvcHRpb24gfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L21hdC1vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L21hdC1hdXRvY29tcGxldGU+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIid0ZXh0YXJlYSdcIj5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkIGZ4RmxleD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBtYXRJbnB1dCBwbGFjZWhvbGRlcj1cInt7cHJvcC5sYWJlbH19XCIgcm93cz1cInt7cHJvcC5yb3dzfHwnMyd9fVwiIGF1dG9zaXplXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJwcm9wLmtleVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2lkXT1cInByb3Aua2V5XCIgW3R5cGVdPVwicHJvcC50eXBlXCI+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCInbnVtYmVyJ1wiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgZnhGbGV4PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IG1hdElucHV0IHBsYWNlaG9sZGVyPVwie3twcm9wLmxhYmVsfX1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwicHJvcC5rZXlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpZF09XCJwcm9wLmtleVwiIFt0eXBlXT1cInByb3AudHlwZVwiPlxuICAgICAgICAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ2RhdGUnXCI+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZCBmeEZsZXg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgW21hdERhdGVwaWNrZXJdPXBpY2tlciBwbGFjZWhvbGRlcj1cInt7cHJvcC5sYWJlbH19XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cInByb3Aua2V5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaWRdPVwicHJvcC5rZXlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxtYXQtZGF0ZXBpY2tlciAjcGlja2VyPjwvbWF0LWRhdGVwaWNrZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bWF0LWRhdGVwaWNrZXItdG9nZ2xlIG1hdFN1ZmZpeCBbZm9yXT1cInBpY2tlclwiPjwvbWF0LWRhdGVwaWNrZXItdG9nZ2xlPlxuICAgICAgICAgICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIid0aW1lJ1wiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgZnhGbGV4PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IG1hdElucHV0IFtuZ3hUaW1lcGlja2VyXT1cInRwaWNrZXJcIiBwbGFjZWhvbGRlcj1cInt7cHJvcC5sYWJlbH19XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZm9ybWF0XT1cIjI0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cInByb3Aua2V5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaWRdPVwicHJvcC5rZXlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZ3gtbWF0ZXJpYWwtdGltZXBpY2tlciAjdHBpY2tlcj48L25neC1tYXRlcmlhbC10aW1lcGlja2VyPlxuICAgICAgICAgICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ3JhZGlvJ1wiIGZ4TGF5b3V0PVwiY29sdW1uXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgX25nY29udGVudC1jMjA9XCJcIiBzdHlsZT1cImhlaWdodDogMjBweDtcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBfbmdjb250ZW50LWMyMD1cIlwiIHN0eWxlPVwidHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xLjI4MTI1ZW0pIHNjYWxlKDAuNzUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNwZWN0aXZlKDEwMHB4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVaKDAuMDAxcHgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xLjI4MTI1ZW0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlKDAuNzUpO3dpZHRoOiAxMzMuMzMzMzMzMzMlO21hcmdpbjogMjBweCAwIDAgMDtmb250LXdlaWdodDogMTAwO2NvbG9yOiAjNjY2O1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7cHJvcC5sYWJlbH19XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1yYWRpby1ncm91cCBbZm9ybUNvbnRyb2xOYW1lXT1cInByb3Aua2V5XCIgW25hbWVdPVwicHJvcC5rZXlcIiBmeExheW91dD1cImNvbHVtblwiIHN0eWxlPVwibWFyZ2luLXRvcDogMTRweDtcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxtYXQtcmFkaW8tYnV0dG9uIFt2YWx1ZV09XCJvcHRpb24udmFsdWVcIiAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIHByb3Aub3B0aW9uc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7b3B0aW9uLmxhYmVsfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbWF0LXJhZGlvLWJ1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9tYXQtcmFkaW8tZ3JvdXA+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCInc2VsZWN0J1wiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgZnhGbGV4PlxuICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1zZWxlY3QgW2Zvcm1Db250cm9sTmFtZV09XCJwcm9wLmtleVwiIHBsYWNlaG9sZGVyPVwie3twcm9wLmxhYmVsfX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bWF0LW9wdGlvbiAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIHByb3Aub3B0aW9uc1wiIFt2YWx1ZV09XCJvcHRpb24udmFsdWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgb3B0aW9uLmxhYmVsIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9tYXQtb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9tYXQtc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZXJyb3JcIiAqbmdJZj1cImZvcm0uZ2V0KHByb3Aua2V5KS5pbnZhbGlkICYmIChmb3JtLmdldChwcm9wLmtleSkuZGlydHkgfHwgZm9ybS5nZXQocHJvcC5rZXkpLnRvdWNoZWQpXCIgZnhGbGV4PVwiMTAwJVwiPlxuICAgICAgICAgICAgICAgIDxtYXQtZXJyb3IgKm5nSWY9XCJmb3JtLmdldChwcm9wLmtleSkuZXJyb3JzLnJlcXVpcmVkXCI+XG4gICAgICAgICAgICAgICAgICAgIEVsIGNhbXBvIHt7IHByb3AubGFiZWwgfX0gZXMgb2JsaWdhdG9yaW8uXG4gICAgICAgICAgICAgICAgPC9tYXQtZXJyb3I+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9mb3JtPlxuXG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbWF0LXJhaXNlZC1idXR0b25cbiAgICAgICAgKGNsaWNrKT1cInNlbmQoKVwiPnt7IG9rVGV4dCB9fTwvYnV0dG9uPlxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG1hdC1idXR0b25cbiAgICAgICAgKGNsaWNrKT1cImRpYWxvZ1JlZi5jbG9zZShmYWxzZSlcIj57eyBjYW5jZWxUZXh0IH19PC9idXR0b24+XG5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIFRXQVByb21wdERpYWxvZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBwdWJsaWMgZm9ybTogRm9ybUdyb3VwID0gbmV3IEZvcm1Hcm91cCh7fSk7XG4gICAgZm9ybVN1Ym1pdEV2OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xuICAgIHB1YmxpYyBtZXNzYWdlOiBzdHJpbmc7XG4gICAgcHVibGljIG1lc3NhZ2VIdG1sOiBTYWZlSHRtbDtcbiAgICBwdWJsaWMgZmllbGRzOiBJVFdBUHJvbXB0RmllbGRbXTtcbiAgICBwdWJsaWMgb2tUZXh0OiBzdHJpbmc7XG4gICAgcHVibGljIGNhbmNlbFRleHQ6IHN0cmluZztcbiAgICBwdWJsaWMgb25TdWJtaXQ6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxUV0FQcm9tcHREaWFsb2dDb21wb25lbnQ+KSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG5cbiAgICAgICAgY29uc3QgZm9ybUdyb3VwID0ge307XG4gICAgICAgIGZvciAoY29uc3QgaSBpbiB0aGlzLmZpZWxkcykge1xuICAgICAgICAgICAgaWYgKHRoaXMuZmllbGRzLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgICAgICAgICAgZm9ybUdyb3VwW3RoaXMuZmllbGRzW2ldLmtleV0gPSBuZXcgRm9ybUNvbnRyb2woXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmllbGRzW2ldLnZhbHVlIHx8ICcnLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcFZhbGlkYXRvcnModGhpcy5maWVsZHNbaV0udmFsaWRhdGlvbilcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZmllbGRzW2ldLmF1dG9jb21wbGV0ZSk7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmZpZWxkc1tpXS5hdXRvY29tcGxldGUgIT09ICd1bmRlZmluZWQnICYmIHRoaXMuZmllbGRzW2ldLmF1dG9jb21wbGV0ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZmllbGRzW2ldLmF1dG9jb21wbGV0ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmllbGRzW2ldLmF1dG9jb21wbGV0ZS5maWx0ZXJlZE9wdGlvbnMgPSB0aGlzLmdldEZvcm1Hcm91cEV2ZW50KGZvcm1Hcm91cCwgaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5mb3JtID0gbmV3IEZvcm1Hcm91cChmb3JtR3JvdXApO1xuXG4gICAgfVxuXG4gICAgZ2V0Rm9ybUdyb3VwRXZlbnQoZm9ybUdyb3VwLCBpKSB7XG4gICAgICAgIHJldHVybiBmb3JtR3JvdXBbdGhpcy5maWVsZHNbaV0ua2V5XS52YWx1ZUNoYW5nZXMucGlwZShcbiAgICAgICAgICAgIHN0YXJ0V2l0aCgnJyksXG4gICAgICAgICAgICBtYXAoZmlsdGVyVmFsdWUgPT4gZmlsdGVyVmFsdWUgPyB0aGlzLl9maWx0ZXJWYWx1ZXMoZmlsdGVyVmFsdWUsIHRoaXMuZmllbGRzW2ldLmF1dG9jb21wbGV0ZS5vcHRpb25zKSA6XG4gICAgICAgICAgICAgICAgdGhpcy5maWVsZHNbaV0uYXV0b2NvbXBsZXRlLm9wdGlvbnMuc2xpY2UoKSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9maWx0ZXJWYWx1ZXModmFsdWUsIG9wdGlvbnMpIHtcblxuICAgICAgICBjb25zdCBmaWx0ZXJlZFZhbHVlID0gdmFsdWUudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICByZXR1cm4gb3B0aW9ucy5maWx0ZXIob3B0aW9uID0+IG9wdGlvbi50b0xvd2VyQ2FzZSgpLmluZGV4T2YoZmlsdGVyZWRWYWx1ZSkgPj0gMCk7XG5cbiAgICB9XG5cbiAgICBnZXRGb3JtU3VibWl0RXYoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mb3JtU3VibWl0RXY7XG4gICAgfVxuXG4gICAgc2VuZCgpIHtcbiAgICAgICAgICAgIGxldCBpO1xuICAgICAgICAgICAgdGhpcy5mb3JtLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmZvcm0uc3RhdHVzICE9PSAnSU5WQUxJRCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UodGhpcy5mb3JtLnZhbHVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoaSBpbiB0aGlzLmZvcm0uY29udHJvbHMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5mb3JtLmNvbnRyb2xzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5mb3JtLmNvbnRyb2xzLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcm0uY29udHJvbHNbaV0ubWFya0FzVG91Y2hlZCh7IG9ubHlTZWxmOiB0cnVlIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtLmNvbnRyb2xzW2ldLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICB9XG5cbiAgICBhY0NsaWNrKGZpZWxkOiBhbnksIGV2ZW50OiBhbnkpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coZXZlbnQpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhmaWVsZC5hdXRvY29tcGxldGUpO1xuICAgICAgICBpZiAodHlwZW9mIGZpZWxkLmF1dG9jb21wbGV0ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZmllbGQuYXV0b2NvbXBsZXRlLmZvcmNlU2VsZWN0ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgICAgICAgIGZpZWxkLmF1dG9jb21wbGV0ZS5mb3JjZVNlbGVjdCkge1xuICAgICAgICAgICAgICAgIGZpZWxkLmF1dG9jb21wbGV0ZS5zZWxlY3RlZCA9IGV2ZW50Lm9wdGlvbi52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFjQ2hlY2tCbHVyKGZpZWxkKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGZpZWxkLmF1dG9jb21wbGV0ZS5zZWxlY3RlZCwgdGhpcy5mb3JtLmNvbnRyb2xzW2ZpZWxkLmtleV0udmFsdWUpO1xuICAgICAgICBpZiAodHlwZW9mIGZpZWxkLmF1dG9jb21wbGV0ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZmllbGQuYXV0b2NvbXBsZXRlLmZvcmNlU2VsZWN0ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgICAgICAgIGZpZWxkLmF1dG9jb21wbGV0ZS5mb3JjZVNlbGVjdCkge1xuICAgICAgICAgICAgICAgIGlmICghZmllbGQuYXV0b2NvbXBsZXRlLnNlbGVjdGVkIHx8XG4gICAgICAgICAgICAgICAgICAgIGZpZWxkLmF1dG9jb21wbGV0ZS5zZWxlY3RlZCAhPT0gdGhpcy5mb3JtLmNvbnRyb2xzW2ZpZWxkLmtleV0udmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtLmNvbnRyb2xzW2ZpZWxkLmtleV0uc2V0VmFsdWUobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIGZpZWxkLmF1dG9jb21wbGV0ZS5zZWxlY3RlZCA9ICcnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN1Ym1pdEZvcm0oZm9ybTogYW55KSB7XG4gICAgICAgICAgICB0aGlzLmZvcm1TdWJtaXRFdi5lbWl0KGZvcm0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgbWFwVmFsaWRhdG9ycyh2YWxpZGF0b3JzOiBhbnkpIHtcblxuICAgICAgICBjb25zdCBmb3JtVmFsaWRhdG9ycyA9IFtdO1xuXG4gICAgICAgIGlmICh2YWxpZGF0b3JzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHZhbGlkYXRpb24gb2YgT2JqZWN0LmtleXModmFsaWRhdG9ycykpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsaWRhdGlvbiA9PT0gJ3JlcXVpcmVkJykge1xuICAgICAgICAgICAgICAgICAgICBmb3JtVmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMucmVxdWlyZWQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsaWRhdGlvbiA9PT0gJ21pbicpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybVZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLm1pbih2YWxpZGF0b3JzW3ZhbGlkYXRpb25dKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZvcm1WYWxpZGF0b3JzO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNYXRJbnB1dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2lucHV0JztcbmltcG9ydCB7IE1hdENoZWNrYm94TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY2hlY2tib3gnO1xuaW1wb3J0IHsgTWF0U2VsZWN0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2VsZWN0JztcbmltcG9ydCB7IE1hdFJhZGlvTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvcmFkaW8nO1xuaW1wb3J0IHsgTWF0RGF0ZXBpY2tlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RhdGVwaWNrZXInO1xuaW1wb3J0IHsgTWF0TmF0aXZlRGF0ZU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IE1hdEF1dG9jb21wbGV0ZU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2F1dG9jb21wbGV0ZSc7XG5pbXBvcnQgeyBUV0FDb25maXJtRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi9jb25maXJtLWRpYWxvZy90d2EtY29uZmlybS1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IFRXQVByb21wdERpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vcHJvbXB0LWRpYWxvZy90d2EtcHJvbXB0LWRpYWxvZy5jb21wb25lbnQnO1xuLy8gaW1wb3J0IHsgVFdBRGlhbG9nc1NlcnZpY2UgfSBmcm9tICcuL3R3YS1kaWFsb2dzLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlLCBNYXREaWFsb2dNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJNb2R1bGUgfSBmcm9tICduZ3gtbWF0ZXJpYWwtdGltZXBpY2tlcic7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIsIFNhZmVIdG1sIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE1hdERpYWxvZywgTWF0RGlhbG9nUmVmIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZsZXhMYXlvdXRNb2R1bGUsXG4gICAgTWF0RGlhbG9nTW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlLFxuICAgIE1hdENoZWNrYm94TW9kdWxlLFxuICAgIE1hdFNlbGVjdE1vZHVsZSxcbiAgICBNYXRSYWRpb01vZHVsZSxcbiAgICBNYXREYXRlcGlja2VyTW9kdWxlLFxuICAgIE1hdE5hdGl2ZURhdGVNb2R1bGUsXG4gICAgTWF0QXV0b2NvbXBsZXRlTW9kdWxlLFxuICAgIE5neE1hdGVyaWFsVGltZXBpY2tlck1vZHVsZS5mb3JSb290KCksXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIC8vIFRXQURpYWxvZ3NNb2R1bGUsXG4gICAgVFdBQ29uZmlybURpYWxvZ0NvbXBvbmVudCxcbiAgICBUV0FQcm9tcHREaWFsb2dDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIC8vIFRXQURpYWxvZ3NNb2R1bGUsXG4gICAgVFdBQ29uZmlybURpYWxvZ0NvbXBvbmVudCxcbiAgICBUV0FQcm9tcHREaWFsb2dDb21wb25lbnRcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbVFdBQ29uZmlybURpYWxvZ0NvbXBvbmVudCwgVFdBUHJvbXB0RGlhbG9nQ29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgVFdBRGlhbG9nc01vZHVsZSxcbiAgICBUV0FDb25maXJtRGlhbG9nQ29tcG9uZW50LFxuICAgIFRXQVByb21wdERpYWxvZ0NvbXBvbmVudFxuICBdXG59KVxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRXQURpYWxvZ3NNb2R1bGUge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgZGlhbG9nOiBNYXREaWFsb2csXG4gICAgICBwcml2YXRlIF9zYW5pdGl6ZXI6IERvbVNhbml0aXplclxuICAgICkge31cblxuICBwdWJsaWMgY29uZmlybShcbiAgICB0aXRsZTogc3RyaW5nLFxuICAgIG1lc3NhZ2U6IHN0cmluZyxcbiAgICBva1RleHQ/OiBzdHJpbmcsXG4gICAgY2FuY2VsVGV4dD86IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGxldCBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxUV0FDb25maXJtRGlhbG9nQ29tcG9uZW50PjtcblxuICAgIGRpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nLm9wZW4oVFdBQ29uZmlybURpYWxvZ0NvbXBvbmVudCk7XG5cbiAgICBkaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UudGl0bGUgPSB0aXRsZTtcbiAgICBkaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLm1lc3NhZ2VIdG1sID0gdGhpcy5fc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKG1lc3NhZ2UpO1xuICAgIGRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5va1RleHQgPSBva1RleHQgfHwgJ0FjZXB0YXInO1xuICAgIGRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5jYW5jZWxUZXh0ID0gY2FuY2VsVGV4dCB8fCAnJztcblxuICAgIHJldHVybiBkaWFsb2dSZWYuYWZ0ZXJDbG9zZWQoKTtcbiAgfVxuXG4gIHB1YmxpYyBwcm9tcHQoXG4gICAgdGl0bGU6IHN0cmluZyxcbiAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgZmllbGRzOiBhbnksXG4gICAgb2tUZXh0Pzogc3RyaW5nLFxuICAgIGNhbmNlbFRleHQ/OiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBsZXQgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8VFdBUHJvbXB0RGlhbG9nQ29tcG9uZW50PjtcblxuICAgIGRpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nLm9wZW4oVFdBUHJvbXB0RGlhbG9nQ29tcG9uZW50KTtcblxuICAgIGRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS50aXRsZSA9IHRpdGxlO1xuICAgIGRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICBkaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UubWVzc2FnZUh0bWwgPSB0aGlzLl9zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwobWVzc2FnZSk7XG4gICAgZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLmZpZWxkcyA9IGZpZWxkcztcbiAgICBkaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2Uub2tUZXh0ID0gb2tUZXh0IHx8ICdBY2VwdGFyJztcbiAgICBkaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UuY2FuY2VsVGV4dCA9IGNhbmNlbFRleHQgfHwgJ0NhbmNlbGFyJztcblxuICAgIC8vIG9uU3VibWl0ID0gZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLmdldEZvcm1TdWJtaXRFdigpLnN1YnNjcmliZShpdGVtID0+IHtcbiAgICAvLyAgICAgZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLnJlc3VsdCA9IGl0ZW07XG4gICAgLy8gfSk7XG5cbiAgICByZXR1cm4gZGlhbG9nUmVmLmFmdGVyQ2xvc2VkKCk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJDb21wb25lbnQiLCJNYXREaWFsb2dSZWYiLCJGb3JtR3JvdXAiLCJFdmVudEVtaXR0ZXIiLCJGb3JtQ29udHJvbCIsInN0YXJ0V2l0aCIsIm1hcCIsInRzbGliXzEuX192YWx1ZXMiLCJWYWxpZGF0b3JzIiwiTmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiLCJGbGV4TGF5b3V0TW9kdWxlIiwiTWF0RGlhbG9nTW9kdWxlIiwiTWF0QnV0dG9uTW9kdWxlIiwiRm9ybXNNb2R1bGUiLCJSZWFjdGl2ZUZvcm1zTW9kdWxlIiwiTWF0SW5wdXRNb2R1bGUiLCJNYXRDaGVja2JveE1vZHVsZSIsIk1hdFNlbGVjdE1vZHVsZSIsIk1hdFJhZGlvTW9kdWxlIiwiTWF0RGF0ZXBpY2tlck1vZHVsZSIsIk1hdE5hdGl2ZURhdGVNb2R1bGUiLCJNYXRBdXRvY29tcGxldGVNb2R1bGUiLCJOZ3hNYXRlcmlhbFRpbWVwaWNrZXJNb2R1bGUiLCJJbmplY3RhYmxlIiwiTWF0RGlhbG9nIiwiRG9tU2FuaXRpemVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7UUEyQkksbUNBQW1CLFNBQWtEO1lBQWxELGNBQVMsR0FBVCxTQUFTLENBQXlDO1NBRXBFOztvQkF6QkpBLGNBQVMsU0FBQzt3QkFDUCxRQUFRLEVBQUUsd0JBQXdCOzs7d0JBR2xDLFFBQVEsRUFBRSxnVUFRVDtxQkFDSjs7Ozs7d0JBaEJRQyxxQkFBWTs7O3dDQURyQjs7O0lDQUE7Ozs7Ozs7Ozs7Ozs7O0FBY0Esc0JBNEZ5QixDQUFDO1FBQ3RCLElBQUksQ0FBQyxHQUFHLE9BQU8sTUFBTSxLQUFLLFVBQVUsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDO1lBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNO29CQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQztnQkFDbkMsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUM7YUFDM0M7U0FDSixDQUFDO0lBQ04sQ0FBQzs7Ozs7OztRQzJC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