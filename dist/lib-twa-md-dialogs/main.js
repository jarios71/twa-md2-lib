(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./dist/twa-md2-dialogs/fesm5/twa-md2-dialogs.js":
/*!*******************************************************!*\
  !*** ./dist/twa-md2-dialogs/fesm5/twa-md2-dialogs.js ***!
  \*******************************************************/
/*! exports provided: TWADialogsModule, TWAConfirmDialogComponent, TWAPromptDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TWADialogsModule", function() { return TWADialogsModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TWAConfirmDialogComponent", function() { return TWAConfirmDialogComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TWAPromptDialogComponent", function() { return TWAPromptDialogComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/esm5/input.es5.js");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/checkbox */ "./node_modules/@angular/material/esm5/checkbox.es5.js");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/select */ "./node_modules/@angular/material/esm5/select.es5.js");
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/radio */ "./node_modules/@angular/material/esm5/radio.es5.js");
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/datepicker */ "./node_modules/@angular/material/esm5/datepicker.es5.js");
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/autocomplete */ "./node_modules/@angular/material/esm5/autocomplete.es5.js");
/* harmony import */ var ngx_material_timepicker__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ngx-material-timepicker */ "./node_modules/ngx-material-timepicker/esm5/ngx-material-timepicker.js");














/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var TWAConfirmDialogComponent = /** @class */ (function () {
    function TWAConfirmDialogComponent(dialogRef) {
        this.dialogRef = dialogRef;
    }
    TWAConfirmDialogComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    selector: 'twa-app-confirm-dialog',
                    // templateUrl: './twa-confirm-dialog.component.html',
                    // styleUrls: ['./twa-confirm-dialog.component.css'],
                    template: "\n\t\t<p>{{ title }}</p>\n\t\t<p>{{ message }}</p>\n\n\t\t<button type=\"button\" mat-raised-button\n\t\t    (click)=\"dialogRef.close(true)\">{{ okText }}</button>\n\t\t<button type=\"button\" mat-button\n\t\t    (click)=\"dialogRef.close()\">{{ cancelText }}</button>\n\t\t"
                },] },
    ];
    /** @nocollapse */
    TWAConfirmDialogComponent.ctorParameters = function () { return [
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"] }
    ]; };
    return TWAConfirmDialogComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var TWAPromptDialogComponent = /** @class */ (function () {
    function TWAPromptDialogComponent(dialogRef) {
        this.dialogRef = dialogRef;
        this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormGroup"]({});
        this.formSubmitEv = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
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
                formGroup[this.fields[i].key] = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](this.fields[i].value || '', this.mapValidators(this.fields[i].validation));
            }
        }
        this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormGroup"](formGroup);
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
        console.log(event);
        console.log(field.autocomplete);
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
        console.log(field.autocomplete.selected, this.form.controls[field.key].value);
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
                for (var _a = Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__values"])(Object.keys(validators)), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var validation = _b.value;
                    if (validation === 'required') {
                        formValidators.push(_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required);
                    }
                    else if (validation === 'min') {
                        formValidators.push(_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].min(validators[validation]));
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
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    selector: 'twa-app-prompt-dialog',
                    // templateUrl: './twa-prompt-dialog.component.html',
                    // styleUrls: ['./twa-prompt-dialog.component.css']
                    template: "\n    <h2>{{ title }}</h2>\n    <p>{{ message }}</p>\n\n    <form novalidate (ngSubmit)=\"onSubmit(form.value)\" [formGroup]=\"form\" fxLayout=\"column\">\n        <div *ngFor=\"let prop of fields\" fxFlex>\n            <div [ngSwitch]=\"prop.type\">\n                <div *ngSwitchCase=\"'text'\" fxFlex=\"{{prop.fxFlex||'none'}}\">\n                    <mat-form-field *ngIf=\"!prop.autocomplete\" fxFlex=\"{{prop.fxFlex||'none'}}\">\n                        <input matInput placeholder=\"{{prop.label}}\"\n                            [formControlName]=\"prop.key\"\n                            [id]=\"prop.key\" [type]=\"prop.type\" fxFlex=\"{{prop.fxFlex||'none'}}\">\n                    </mat-form-field>\n                    <div *ngIf=\"prop.autocomplete\">\n                        <mat-form-field fxFlex=\"{{prop.fxFlex||'none'}}\">\n                            <input matInput placeholder=\"{{prop.label}}\"\n                                [formControlName]=\"prop.key\"\n                                [matAutocomplete]=\"auto\"\n                                (blur)=\"acCheckBlur(prop)\"\n                                [id]=\"prop.key\" [type]=\"prop.type\" fxFlex=\"{{prop.fxFlex||'none'}}\">\n                        </mat-form-field>\n                        <mat-autocomplete #auto=\"matAutocomplete\"\n                            (optionSelected)=\"acClick(prop, $event)\">\n                            <mat-option *ngFor=\"let option of prop.autocomplete.options\" \n                                [value]=\"option\">\n                            {{ option }}\n                            </mat-option>\n                        </mat-autocomplete>\n                    </div>\n                </div>\n                <div *ngSwitchCase=\"'textarea'\" fxFlex=\"{{prop.fxFlex||'none'}}\">\n                    <mat-form-field fxFlex=\"{{prop.fxFlex||'none'}}\">\n                        <textarea matInput placeholder=\"{{prop.label}}\" rows=\"{{prop.rows||'3'}}\" autosize\n                            [formControlName]=\"prop.key\"\n                            [id]=\"prop.key\" [type]=\"prop.type\"></textarea>\n                    </mat-form-field>\n                </div>\n                <div *ngSwitchCase=\"'number'\" fxFlex=\"{{prop.fxFlex||'none'}}\">\n                    <mat-form-field fxFlex=\"{{prop.fxFlex||'none'}}\">\n                        <input matInput placeholder=\"{{prop.label}}\"\n                            [formControlName]=\"prop.key\"\n                            [id]=\"prop.key\" [type]=\"prop.type\">\n                   </mat-form-field>\n                </div>\n                <div *ngSwitchCase=\"'date'\" fxFlex=\"{{prop.fxFlex||'none'}}\">\n                    <mat-form-field fxFlex=\"{{prop.fxFlex||'none'}}\">\n                        <input matInput [matDatepicker]=picker placeholder=\"{{prop.label}}\"\n                            [formControlName]=\"prop.key\"\n                            [id]=\"prop.key\">\n                        <mat-datepicker #picker></mat-datepicker>\n                        <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n                    </mat-form-field>\n                </div>\n                <div *ngSwitchCase=\"'time'\" fxFlex=\"{{prop.fxFlex||'none'}}\">\n                    <mat-form-field fxFlex=\"{{prop.fxFlex||'none'}}\">\n                        <input matInput [ngxTimepicker]=\"tpicker\" placeholder=\"{{prop.label}}\"\n                            [format]=\"24\"\n                            [formControlName]=\"prop.key\"\n                            [id]=\"prop.key\">\n                        <ngx-material-timepicker #tpicker></ngx-material-timepicker>\n                    </mat-form-field>\n                </div>\n\n                <div *ngSwitchCase=\"'radio'\" fxFlex=\"{{prop.fxFlex||'none'}}\" fxLayout=\"column\">\n                    <div _ngcontent-c20=\"\" style=\"height: 20px;\" fxFlex=\"{{prop.fxFlex||'none'}}\">\n                        <label _ngcontent-c20=\"\" style=\"transform: translateY(-1.28125em) scale(0.75) \n                                perspective(100px)\n                                translateZ(0.001px);\n                                -ms-transform: translateY(-1.28125em)\n                                scale(0.75);width: 133.33333333%;margin: 20px 0 0 0;font-weight: 100;color: #666;\">\n                            {{prop.label}}\n                        </label>\n                    </div>\n                    <mat-radio-group [formControlName]=\"prop.key\" [name]=\"prop.key\" fxLayout=\"column\" style=\"margin-top: 14px;\">\n                        <mat-radio-button [value]=\"option.value\" *ngFor=\"let option of prop.options\">\n                            {{option.label}}\n                        </mat-radio-button>\n                    </mat-radio-group>\n                </div>\n\n                <div *ngSwitchCase=\"'select'\" fxFlex=\"{{prop.fxFlex||'none'}}\">\n                    <mat-form-field fxFlex=\"{{prop.fxFlex||'none'}}\">\n                        <mat-select [formControlName]=\"prop.key\" placeholder=\"{{prop.label}}\">\n                            <mat-option *ngFor=\"let option of prop.options\" [value]=\"option.value\">\n                                {{ option.label }}\n                            </mat-option>\n                        </mat-select>\n                    </mat-form-field>\n                </div>\n            </div>\n            <div class=\"error\" *ngIf=\"form.get(prop.key).invalid && (form.get(prop.key).dirty || form.get(prop.key).touched)\">\n                <mat-error *ngIf=\"form.get(prop.key).errors.required\">\n                    El campo {{ prop.label }} es obligatorio.\n                </mat-error>\n            </div>\n        </div>\n    </form>\n\n    <button type=\"button\" mat-raised-button\n        (click)=\"send()\">{{ okText }}</button>\n    <button type=\"button\" mat-button\n        (click)=\"dialogRef.close(false)\">{{ cancelText }}</button>\n\n    "
                },] },
    ];
    /** @nocollapse */
    TWAPromptDialogComponent.ctorParameters = function () { return [
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"] }
    ]; };
    return TWAPromptDialogComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var TWADialogsModule = /** @class */ (function () {
    function TWADialogsModule(dialog) {
        this.dialog = dialog;
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
        dialogRef.componentInstance.okText = okText || 'Aceptar';
        dialogRef.componentInstance.cancelText = cancelText || 'Cancelar';
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
        dialogRef.componentInstance.fields = fields;
        dialogRef.componentInstance.okText = okText || 'Aceptar';
        dialogRef.componentInstance.cancelText = cancelText || 'Cancelar';
        // onSubmit = dialogRef.componentInstance.getFormSubmitEv().subscribe(item => {
        //     dialogRef.componentInstance.result = item;
        // });
        return dialogRef.afterClosed();
    };
    TWADialogsModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"],
                        _angular_flex_layout__WEBPACK_IMPORTED_MODULE_5__["FlexLayoutModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatButtonModule"],
                        _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                        _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                        _angular_material_input__WEBPACK_IMPORTED_MODULE_6__["MatInputModule"],
                        _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_7__["MatCheckboxModule"],
                        _angular_material_select__WEBPACK_IMPORTED_MODULE_8__["MatSelectModule"],
                        _angular_material_radio__WEBPACK_IMPORTED_MODULE_9__["MatRadioModule"],
                        _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_10__["MatDatepickerModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatNativeDateModule"],
                        _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_11__["MatAutocompleteModule"],
                        ngx_material_timepicker__WEBPACK_IMPORTED_MODULE_12__["NgxMaterialTimepickerModule"].forRoot(),
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
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"] },
    ];
    /** @nocollapse */
    TWADialogsModule.ctorParameters = function () { return [
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"] }
    ]; };
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



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdhLW1kMi1kaWFsb2dzLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly90d2EtbWQyLWRpYWxvZ3MvbGliL2NvbmZpcm0tZGlhbG9nL3R3YS1jb25maXJtLWRpYWxvZy5jb21wb25lbnQudHMiLCJuZzovL3R3YS1tZDItZGlhbG9ncy9saWIvcHJvbXB0LWRpYWxvZy90d2EtcHJvbXB0LWRpYWxvZy5jb21wb25lbnQudHMiLCJuZzovL3R3YS1tZDItZGlhbG9ncy9saWIvdHdhLWRpYWxvZ3MubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nUmVmIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG5AQ29tcG9uZW50KHtcblx0XHRzZWxlY3RvcjogJ3R3YS1hcHAtY29uZmlybS1kaWFsb2cnLFxuXHRcdC8vIHRlbXBsYXRlVXJsOiAnLi90d2EtY29uZmlybS1kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxuXHRcdC8vIHN0eWxlVXJsczogWycuL3R3YS1jb25maXJtLWRpYWxvZy5jb21wb25lbnQuY3NzJ10sXG5cdFx0dGVtcGxhdGU6IGBcblx0XHQ8cD57eyB0aXRsZSB9fTwvcD5cblx0XHQ8cD57eyBtZXNzYWdlIH19PC9wPlxuXG5cdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbWF0LXJhaXNlZC1idXR0b25cblx0XHQgICAgKGNsaWNrKT1cImRpYWxvZ1JlZi5jbG9zZSh0cnVlKVwiPnt7IG9rVGV4dCB9fTwvYnV0dG9uPlxuXHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG1hdC1idXR0b25cblx0XHQgICAgKGNsaWNrKT1cImRpYWxvZ1JlZi5jbG9zZSgpXCI+e3sgY2FuY2VsVGV4dCB9fTwvYnV0dG9uPlxuXHRcdGBcbn0pXG5leHBvcnQgY2xhc3MgVFdBQ29uZmlybURpYWxvZ0NvbXBvbmVudCB7XG5cblx0XHRwdWJsaWMgdGl0bGU6IHN0cmluZztcblx0XHRwdWJsaWMgbWVzc2FnZTogc3RyaW5nO1xuXHRcdHB1YmxpYyBva1RleHQ6IHN0cmluZztcblx0XHRwdWJsaWMgY2FuY2VsVGV4dDogc3RyaW5nO1xuXG5cdFx0Y29uc3RydWN0b3IocHVibGljIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPFRXQUNvbmZpcm1EaWFsb2dDb21wb25lbnQ+KSB7XG5cblx0XHR9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXREaWFsb2dSZWYgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCwgRm9ybUdyb3VwLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElUV0FQcm9tcHRGaWVsZCB7XG4gICAga2V5OiBzdHJpbmc7XG4gICAgbGFiZWw6IHN0cmluZztcbiAgICB0eXBlOiBzdHJpbmc7XG4gICAgZnhGbGV4OiBzdHJpbmc7XG4gICAgdmFsdWU6IHN0cmluZztcbiAgICBvcHRpb25zOiBhbnlbXTtcbiAgICBhdXRvY29tcGxldGU6IGFueTtcbiAgICByb3dzOiBhbnlbXTtcbiAgICB2YWxpZGF0aW9uOiBhbnk7XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndHdhLWFwcC1wcm9tcHQtZGlhbG9nJyxcbiAgICAvLyB0ZW1wbGF0ZVVybDogJy4vdHdhLXByb21wdC1kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxuICAgIC8vIHN0eWxlVXJsczogWycuL3R3YS1wcm9tcHQtZGlhbG9nLmNvbXBvbmVudC5jc3MnXVxuICAgIHRlbXBsYXRlOiBgXG4gICAgPGgyPnt7IHRpdGxlIH19PC9oMj5cbiAgICA8cD57eyBtZXNzYWdlIH19PC9wPlxuXG4gICAgPGZvcm0gbm92YWxpZGF0ZSAobmdTdWJtaXQpPVwib25TdWJtaXQoZm9ybS52YWx1ZSlcIiBbZm9ybUdyb3VwXT1cImZvcm1cIiBmeExheW91dD1cImNvbHVtblwiPlxuICAgICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBwcm9wIG9mIGZpZWxkc1wiIGZ4RmxleD5cbiAgICAgICAgICAgIDxkaXYgW25nU3dpdGNoXT1cInByb3AudHlwZVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIid0ZXh0J1wiIGZ4RmxleD1cInt7cHJvcC5meEZsZXh8fCdub25lJ319XCI+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZCAqbmdJZj1cIiFwcm9wLmF1dG9jb21wbGV0ZVwiIGZ4RmxleD1cInt7cHJvcC5meEZsZXh8fCdub25lJ319XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgcGxhY2Vob2xkZXI9XCJ7e3Byb3AubGFiZWx9fVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJwcm9wLmtleVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2lkXT1cInByb3Aua2V5XCIgW3R5cGVdPVwicHJvcC50eXBlXCIgZnhGbGV4PVwie3twcm9wLmZ4RmxleHx8J25vbmUnfX1cIj5cbiAgICAgICAgICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cInByb3AuYXV0b2NvbXBsZXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgZnhGbGV4PVwie3twcm9wLmZ4RmxleHx8J25vbmUnfX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgcGxhY2Vob2xkZXI9XCJ7e3Byb3AubGFiZWx9fVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwicHJvcC5rZXlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbWF0QXV0b2NvbXBsZXRlXT1cImF1dG9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoYmx1cik9XCJhY0NoZWNrQmx1cihwcm9wKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpZF09XCJwcm9wLmtleVwiIFt0eXBlXT1cInByb3AudHlwZVwiIGZ4RmxleD1cInt7cHJvcC5meEZsZXh8fCdub25lJ319XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1hdXRvY29tcGxldGUgI2F1dG89XCJtYXRBdXRvY29tcGxldGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvcHRpb25TZWxlY3RlZCk9XCJhY0NsaWNrKHByb3AsICRldmVudClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bWF0LW9wdGlvbiAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIHByb3AuYXV0b2NvbXBsZXRlLm9wdGlvbnNcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3ZhbHVlXT1cIm9wdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IG9wdGlvbiB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbWF0LW9wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbWF0LWF1dG9jb21wbGV0ZT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ3RleHRhcmVhJ1wiIGZ4RmxleD1cInt7cHJvcC5meEZsZXh8fCdub25lJ319XCI+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZCBmeEZsZXg9XCJ7e3Byb3AuZnhGbGV4fHwnbm9uZSd9fVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIG1hdElucHV0IHBsYWNlaG9sZGVyPVwie3twcm9wLmxhYmVsfX1cIiByb3dzPVwie3twcm9wLnJvd3N8fCczJ319XCIgYXV0b3NpemVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cInByb3Aua2V5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaWRdPVwicHJvcC5rZXlcIiBbdHlwZV09XCJwcm9wLnR5cGVcIj48L3RleHRhcmVhPlxuICAgICAgICAgICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIidudW1iZXInXCIgZnhGbGV4PVwie3twcm9wLmZ4RmxleHx8J25vbmUnfX1cIj5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkIGZ4RmxleD1cInt7cHJvcC5meEZsZXh8fCdub25lJ319XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgcGxhY2Vob2xkZXI9XCJ7e3Byb3AubGFiZWx9fVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJwcm9wLmtleVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2lkXT1cInByb3Aua2V5XCIgW3R5cGVdPVwicHJvcC50eXBlXCI+XG4gICAgICAgICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCInZGF0ZSdcIiBmeEZsZXg9XCJ7e3Byb3AuZnhGbGV4fHwnbm9uZSd9fVwiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgZnhGbGV4PVwie3twcm9wLmZ4RmxleHx8J25vbmUnfX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBtYXRJbnB1dCBbbWF0RGF0ZXBpY2tlcl09cGlja2VyIHBsYWNlaG9sZGVyPVwie3twcm9wLmxhYmVsfX1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwicHJvcC5rZXlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpZF09XCJwcm9wLmtleVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1kYXRlcGlja2VyICNwaWNrZXI+PC9tYXQtZGF0ZXBpY2tlcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxtYXQtZGF0ZXBpY2tlci10b2dnbGUgbWF0U3VmZml4IFtmb3JdPVwicGlja2VyXCI+PC9tYXQtZGF0ZXBpY2tlci10b2dnbGU+XG4gICAgICAgICAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ3RpbWUnXCIgZnhGbGV4PVwie3twcm9wLmZ4RmxleHx8J25vbmUnfX1cIj5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkIGZ4RmxleD1cInt7cHJvcC5meEZsZXh8fCdub25lJ319XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgW25neFRpbWVwaWNrZXJdPVwidHBpY2tlclwiIHBsYWNlaG9sZGVyPVwie3twcm9wLmxhYmVsfX1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmb3JtYXRdPVwiMjRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwicHJvcC5rZXlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpZF09XCJwcm9wLmtleVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5neC1tYXRlcmlhbC10aW1lcGlja2VyICN0cGlja2VyPjwvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCIncmFkaW8nXCIgZnhGbGV4PVwie3twcm9wLmZ4RmxleHx8J25vbmUnfX1cIiBmeExheW91dD1cImNvbHVtblwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IF9uZ2NvbnRlbnQtYzIwPVwiXCIgc3R5bGU9XCJoZWlnaHQ6IDIwcHg7XCIgZnhGbGV4PVwie3twcm9wLmZ4RmxleHx8J25vbmUnfX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBfbmdjb250ZW50LWMyMD1cIlwiIHN0eWxlPVwidHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xLjI4MTI1ZW0pIHNjYWxlKDAuNzUpIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJzcGVjdGl2ZSgxMDBweClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlWigwLjAwMXB4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMS4yODEyNWVtKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2FsZSgwLjc1KTt3aWR0aDogMTMzLjMzMzMzMzMzJTttYXJnaW46IDIwcHggMCAwIDA7Zm9udC13ZWlnaHQ6IDEwMDtjb2xvcjogIzY2NjtcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7e3Byb3AubGFiZWx9fVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtcmFkaW8tZ3JvdXAgW2Zvcm1Db250cm9sTmFtZV09XCJwcm9wLmtleVwiIFtuYW1lXT1cInByb3Aua2V5XCIgZnhMYXlvdXQ9XCJjb2x1bW5cIiBzdHlsZT1cIm1hcmdpbi10b3A6IDE0cHg7XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bWF0LXJhZGlvLWJ1dHRvbiBbdmFsdWVdPVwib3B0aW9uLnZhbHVlXCIgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBwcm9wLm9wdGlvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7e29wdGlvbi5sYWJlbH19XG4gICAgICAgICAgICAgICAgICAgICAgICA8L21hdC1yYWRpby1idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvbWF0LXJhZGlvLWdyb3VwPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ3NlbGVjdCdcIiBmeEZsZXg9XCJ7e3Byb3AuZnhGbGV4fHwnbm9uZSd9fVwiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgZnhGbGV4PVwie3twcm9wLmZ4RmxleHx8J25vbmUnfX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxtYXQtc2VsZWN0IFtmb3JtQ29udHJvbE5hbWVdPVwicHJvcC5rZXlcIiBwbGFjZWhvbGRlcj1cInt7cHJvcC5sYWJlbH19XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1vcHRpb24gKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBwcm9wLm9wdGlvbnNcIiBbdmFsdWVdPVwib3B0aW9uLnZhbHVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IG9wdGlvbi5sYWJlbCB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbWF0LW9wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbWF0LXNlbGVjdD5cbiAgICAgICAgICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVycm9yXCIgKm5nSWY9XCJmb3JtLmdldChwcm9wLmtleSkuaW52YWxpZCAmJiAoZm9ybS5nZXQocHJvcC5rZXkpLmRpcnR5IHx8IGZvcm0uZ2V0KHByb3Aua2V5KS50b3VjaGVkKVwiPlxuICAgICAgICAgICAgICAgIDxtYXQtZXJyb3IgKm5nSWY9XCJmb3JtLmdldChwcm9wLmtleSkuZXJyb3JzLnJlcXVpcmVkXCI+XG4gICAgICAgICAgICAgICAgICAgIEVsIGNhbXBvIHt7IHByb3AubGFiZWwgfX0gZXMgb2JsaWdhdG9yaW8uXG4gICAgICAgICAgICAgICAgPC9tYXQtZXJyb3I+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9mb3JtPlxuXG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbWF0LXJhaXNlZC1idXR0b25cbiAgICAgICAgKGNsaWNrKT1cInNlbmQoKVwiPnt7IG9rVGV4dCB9fTwvYnV0dG9uPlxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG1hdC1idXR0b25cbiAgICAgICAgKGNsaWNrKT1cImRpYWxvZ1JlZi5jbG9zZShmYWxzZSlcIj57eyBjYW5jZWxUZXh0IH19PC9idXR0b24+XG5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIFRXQVByb21wdERpYWxvZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBwdWJsaWMgZm9ybTogRm9ybUdyb3VwID0gbmV3IEZvcm1Hcm91cCh7fSk7XG4gICAgZm9ybVN1Ym1pdEV2OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xuICAgIHB1YmxpYyBtZXNzYWdlOiBzdHJpbmc7XG4gICAgcHVibGljIGZpZWxkczogSVRXQVByb21wdEZpZWxkW107XG4gICAgcHVibGljIG9rVGV4dDogc3RyaW5nO1xuICAgIHB1YmxpYyBjYW5jZWxUZXh0OiBzdHJpbmc7XG4gICAgcHVibGljIG9uU3VibWl0OiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8VFdBUHJvbXB0RGlhbG9nQ29tcG9uZW50Pikge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuXG4gICAgICAgIGNvbnN0IGZvcm1Hcm91cCA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IGkgaW4gdGhpcy5maWVsZHMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmZpZWxkcy5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgICAgICAgICAgIGZvcm1Hcm91cFt0aGlzLmZpZWxkc1tpXS5rZXldID0gbmV3IEZvcm1Db250cm9sKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpZWxkc1tpXS52YWx1ZSB8fCAnJyxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBWYWxpZGF0b3JzKHRoaXMuZmllbGRzW2ldLnZhbGlkYXRpb24pXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZm9ybSA9IG5ldyBGb3JtR3JvdXAoZm9ybUdyb3VwKTtcblxuICAgIH1cblxuICAgIGdldEZvcm1TdWJtaXRFdigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZvcm1TdWJtaXRFdjtcbiAgICB9XG5cbiAgICBzZW5kKCkge1xuICAgICAgICAgICAgbGV0IGk7XG4gICAgICAgICAgICB0aGlzLmZvcm0udXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICAgICAgICAgICAgaWYgKHRoaXMuZm9ybS5zdGF0dXMgIT09ICdJTlZBTElEJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSh0aGlzLmZvcm0udmFsdWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpIGluIHRoaXMuZm9ybS5jb250cm9scykge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmZvcm0uY29udHJvbHNbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmZvcm0uY29udHJvbHMuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZm9ybS5jb250cm9sc1tpXS5tYXJrQXNUb3VjaGVkKHsgb25seVNlbGY6IHRydWUgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcm0uY29udHJvbHNbaV0udXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgIH1cblxuICAgIGFjQ2xpY2soZmllbGQ6IGFueSwgZXZlbnQ6IGFueSkge1xuICAgICAgICBjb25zb2xlLmxvZyhldmVudCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGZpZWxkLmF1dG9jb21wbGV0ZSk7XG4gICAgICAgIGlmICh0eXBlb2YgZmllbGQuYXV0b2NvbXBsZXRlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBmaWVsZC5hdXRvY29tcGxldGUuZm9yY2VTZWxlY3QgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgICAgICAgZmllbGQuYXV0b2NvbXBsZXRlLmZvcmNlU2VsZWN0KSB7XG4gICAgICAgICAgICAgICAgZmllbGQuYXV0b2NvbXBsZXRlLnNlbGVjdGVkID0gZXZlbnQub3B0aW9uLnZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWNDaGVja0JsdXIoZmllbGQpIHtcbiAgICAgICAgY29uc29sZS5sb2coZmllbGQuYXV0b2NvbXBsZXRlLnNlbGVjdGVkLCB0aGlzLmZvcm0uY29udHJvbHNbZmllbGQua2V5XS52YWx1ZSk7XG4gICAgICAgIGlmICh0eXBlb2YgZmllbGQuYXV0b2NvbXBsZXRlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBmaWVsZC5hdXRvY29tcGxldGUuZm9yY2VTZWxlY3QgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgICAgICAgZmllbGQuYXV0b2NvbXBsZXRlLmZvcmNlU2VsZWN0KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFmaWVsZC5hdXRvY29tcGxldGUuc2VsZWN0ZWQgfHxcbiAgICAgICAgICAgICAgICAgICAgZmllbGQuYXV0b2NvbXBsZXRlLnNlbGVjdGVkICE9PSB0aGlzLmZvcm0uY29udHJvbHNbZmllbGQua2V5XS52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcm0uY29udHJvbHNbZmllbGQua2V5XS5zZXRWYWx1ZShudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgZmllbGQuYXV0b2NvbXBsZXRlLnNlbGVjdGVkID0gJyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3VibWl0Rm9ybShmb3JtOiBhbnkpIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybVN1Ym1pdEV2LmVtaXQoZm9ybSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtYXBWYWxpZGF0b3JzKHZhbGlkYXRvcnM6IGFueSkge1xuXG4gICAgICAgIGNvbnN0IGZvcm1WYWxpZGF0b3JzID0gW107XG5cbiAgICAgICAgaWYgKHZhbGlkYXRvcnMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdmFsaWRhdGlvbiBvZiBPYmplY3Qua2V5cyh2YWxpZGF0b3JzKSkge1xuICAgICAgICAgICAgICAgIGlmICh2YWxpZGF0aW9uID09PSAncmVxdWlyZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1WYWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5yZXF1aXJlZCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWxpZGF0aW9uID09PSAnbWluJykge1xuICAgICAgICAgICAgICAgICAgICBmb3JtVmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMubWluKHZhbGlkYXRvcnNbdmFsaWRhdGlvbl0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZm9ybVZhbGlkYXRvcnM7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZsZXhMYXlvdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mbGV4LWxheW91dCc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE1hdElucHV0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaW5wdXQnO1xuaW1wb3J0IHsgTWF0Q2hlY2tib3hNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jaGVja2JveCc7XG5pbXBvcnQgeyBNYXRTZWxlY3RNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zZWxlY3QnO1xuaW1wb3J0IHsgTWF0UmFkaW9Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9yYWRpbyc7XG5pbXBvcnQgeyBNYXREYXRlcGlja2VyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGF0ZXBpY2tlcic7XG5pbXBvcnQgeyBNYXROYXRpdmVEYXRlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgTWF0QXV0b2NvbXBsZXRlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYXV0b2NvbXBsZXRlJztcbmltcG9ydCB7IFRXQUNvbmZpcm1EaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL2NvbmZpcm0tZGlhbG9nL3R3YS1jb25maXJtLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgVFdBUHJvbXB0RGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi9wcm9tcHQtZGlhbG9nL3R3YS1wcm9tcHQtZGlhbG9nLmNvbXBvbmVudCc7XG4vLyBpbXBvcnQgeyBUV0FEaWFsb2dzU2VydmljZSB9IGZyb20gJy4vdHdhLWRpYWxvZ3Muc2VydmljZSc7XG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUsIE1hdERpYWxvZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IE5neE1hdGVyaWFsVGltZXBpY2tlck1vZHVsZSB9IGZyb20gJ25neC1tYXRlcmlhbC10aW1lcGlja2VyJztcblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTWF0RGlhbG9nLCBNYXREaWFsb2dSZWYgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRmxleExheW91dE1vZHVsZSxcbiAgICBNYXREaWFsb2dNb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgTWF0Q2hlY2tib3hNb2R1bGUsXG4gICAgTWF0U2VsZWN0TW9kdWxlLFxuICAgIE1hdFJhZGlvTW9kdWxlLFxuICAgIE1hdERhdGVwaWNrZXJNb2R1bGUsXG4gICAgTWF0TmF0aXZlRGF0ZU1vZHVsZSxcbiAgICBNYXRBdXRvY29tcGxldGVNb2R1bGUsXG4gICAgTmd4TWF0ZXJpYWxUaW1lcGlja2VyTW9kdWxlLmZvclJvb3QoKSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgLy8gVFdBRGlhbG9nc01vZHVsZSxcbiAgICBUV0FDb25maXJtRGlhbG9nQ29tcG9uZW50LFxuICAgIFRXQVByb21wdERpYWxvZ0NvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgLy8gVFdBRGlhbG9nc01vZHVsZSxcbiAgICBUV0FDb25maXJtRGlhbG9nQ29tcG9uZW50LFxuICAgIFRXQVByb21wdERpYWxvZ0NvbXBvbmVudFxuICBdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtUV0FDb25maXJtRGlhbG9nQ29tcG9uZW50LCBUV0FQcm9tcHREaWFsb2dDb21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtcbiAgICBUV0FEaWFsb2dzTW9kdWxlLFxuICAgIFRXQUNvbmZpcm1EaWFsb2dDb21wb25lbnQsXG4gICAgVFdBUHJvbXB0RGlhbG9nQ29tcG9uZW50XG4gIF1cbn0pXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVFdBRGlhbG9nc01vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGlhbG9nOiBNYXREaWFsb2cpIHt9XG5cbiAgcHVibGljIGNvbmZpcm0oXG4gICAgdGl0bGU6IHN0cmluZyxcbiAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgb2tUZXh0Pzogc3RyaW5nLFxuICAgIGNhbmNlbFRleHQ/OiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBsZXQgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8VFdBQ29uZmlybURpYWxvZ0NvbXBvbmVudD47XG5cbiAgICBkaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKFRXQUNvbmZpcm1EaWFsb2dDb21wb25lbnQpO1xuXG4gICAgZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLnRpdGxlID0gdGl0bGU7XG4gICAgZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIGRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5va1RleHQgPSBva1RleHQgfHwgJ0FjZXB0YXInO1xuICAgIGRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5jYW5jZWxUZXh0ID0gY2FuY2VsVGV4dCB8fCAnQ2FuY2VsYXInO1xuXG4gICAgcmV0dXJuIGRpYWxvZ1JlZi5hZnRlckNsb3NlZCgpO1xuICB9XG5cbiAgcHVibGljIHByb21wdChcbiAgICB0aXRsZTogc3RyaW5nLFxuICAgIG1lc3NhZ2U6IHN0cmluZyxcbiAgICBmaWVsZHM6IGFueSxcbiAgICBva1RleHQ/OiBzdHJpbmcsXG4gICAgY2FuY2VsVGV4dD86IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGxldCBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxUV0FQcm9tcHREaWFsb2dDb21wb25lbnQ+O1xuXG4gICAgZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihUV0FQcm9tcHREaWFsb2dDb21wb25lbnQpO1xuXG4gICAgZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLnRpdGxlID0gdGl0bGU7XG4gICAgZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIGRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5maWVsZHMgPSBmaWVsZHM7XG4gICAgZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLm9rVGV4dCA9IG9rVGV4dCB8fCAnQWNlcHRhcic7XG4gICAgZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLmNhbmNlbFRleHQgPSBjYW5jZWxUZXh0IHx8ICdDYW5jZWxhcic7XG5cbiAgICAvLyBvblN1Ym1pdCA9IGRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5nZXRGb3JtU3VibWl0RXYoKS5zdWJzY3JpYmUoaXRlbSA9PiB7XG4gICAgLy8gICAgIGRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5yZXN1bHQgPSBpdGVtO1xuICAgIC8vIH0pO1xuXG4gICAgcmV0dXJuIGRpYWxvZ1JlZi5hZnRlckNsb3NlZCgpO1xuICB9XG59XG4iXSwibmFtZXMiOlsidHNsaWJfMS5fX3ZhbHVlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUF3QkUsbUNBQW1C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

/***/ }),

/***/ "./node_modules/moment/locale sync recursive ^\\.\\/.*$":
/*!**************************************************!*\
  !*** ./node_modules/moment/locale sync ^\.\/.*$ ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "./node_modules/moment/locale/af.js",
	"./af.js": "./node_modules/moment/locale/af.js",
	"./ar": "./node_modules/moment/locale/ar.js",
	"./ar-dz": "./node_modules/moment/locale/ar-dz.js",
	"./ar-dz.js": "./node_modules/moment/locale/ar-dz.js",
	"./ar-kw": "./node_modules/moment/locale/ar-kw.js",
	"./ar-kw.js": "./node_modules/moment/locale/ar-kw.js",
	"./ar-ly": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ly.js": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ma": "./node_modules/moment/locale/ar-ma.js",
	"./ar-ma.js": "./node_modules/moment/locale/ar-ma.js",
	"./ar-sa": "./node_modules/moment/locale/ar-sa.js",
	"./ar-sa.js": "./node_modules/moment/locale/ar-sa.js",
	"./ar-tn": "./node_modules/moment/locale/ar-tn.js",
	"./ar-tn.js": "./node_modules/moment/locale/ar-tn.js",
	"./ar.js": "./node_modules/moment/locale/ar.js",
	"./az": "./node_modules/moment/locale/az.js",
	"./az.js": "./node_modules/moment/locale/az.js",
	"./be": "./node_modules/moment/locale/be.js",
	"./be.js": "./node_modules/moment/locale/be.js",
	"./bg": "./node_modules/moment/locale/bg.js",
	"./bg.js": "./node_modules/moment/locale/bg.js",
	"./bm": "./node_modules/moment/locale/bm.js",
	"./bm.js": "./node_modules/moment/locale/bm.js",
	"./bn": "./node_modules/moment/locale/bn.js",
	"./bn.js": "./node_modules/moment/locale/bn.js",
	"./bo": "./node_modules/moment/locale/bo.js",
	"./bo.js": "./node_modules/moment/locale/bo.js",
	"./br": "./node_modules/moment/locale/br.js",
	"./br.js": "./node_modules/moment/locale/br.js",
	"./bs": "./node_modules/moment/locale/bs.js",
	"./bs.js": "./node_modules/moment/locale/bs.js",
	"./ca": "./node_modules/moment/locale/ca.js",
	"./ca.js": "./node_modules/moment/locale/ca.js",
	"./cs": "./node_modules/moment/locale/cs.js",
	"./cs.js": "./node_modules/moment/locale/cs.js",
	"./cv": "./node_modules/moment/locale/cv.js",
	"./cv.js": "./node_modules/moment/locale/cv.js",
	"./cy": "./node_modules/moment/locale/cy.js",
	"./cy.js": "./node_modules/moment/locale/cy.js",
	"./da": "./node_modules/moment/locale/da.js",
	"./da.js": "./node_modules/moment/locale/da.js",
	"./de": "./node_modules/moment/locale/de.js",
	"./de-at": "./node_modules/moment/locale/de-at.js",
	"./de-at.js": "./node_modules/moment/locale/de-at.js",
	"./de-ch": "./node_modules/moment/locale/de-ch.js",
	"./de-ch.js": "./node_modules/moment/locale/de-ch.js",
	"./de.js": "./node_modules/moment/locale/de.js",
	"./dv": "./node_modules/moment/locale/dv.js",
	"./dv.js": "./node_modules/moment/locale/dv.js",
	"./el": "./node_modules/moment/locale/el.js",
	"./el.js": "./node_modules/moment/locale/el.js",
	"./en-au": "./node_modules/moment/locale/en-au.js",
	"./en-au.js": "./node_modules/moment/locale/en-au.js",
	"./en-ca": "./node_modules/moment/locale/en-ca.js",
	"./en-ca.js": "./node_modules/moment/locale/en-ca.js",
	"./en-gb": "./node_modules/moment/locale/en-gb.js",
	"./en-gb.js": "./node_modules/moment/locale/en-gb.js",
	"./en-ie": "./node_modules/moment/locale/en-ie.js",
	"./en-ie.js": "./node_modules/moment/locale/en-ie.js",
	"./en-il": "./node_modules/moment/locale/en-il.js",
	"./en-il.js": "./node_modules/moment/locale/en-il.js",
	"./en-nz": "./node_modules/moment/locale/en-nz.js",
	"./en-nz.js": "./node_modules/moment/locale/en-nz.js",
	"./eo": "./node_modules/moment/locale/eo.js",
	"./eo.js": "./node_modules/moment/locale/eo.js",
	"./es": "./node_modules/moment/locale/es.js",
	"./es-do": "./node_modules/moment/locale/es-do.js",
	"./es-do.js": "./node_modules/moment/locale/es-do.js",
	"./es-us": "./node_modules/moment/locale/es-us.js",
	"./es-us.js": "./node_modules/moment/locale/es-us.js",
	"./es.js": "./node_modules/moment/locale/es.js",
	"./et": "./node_modules/moment/locale/et.js",
	"./et.js": "./node_modules/moment/locale/et.js",
	"./eu": "./node_modules/moment/locale/eu.js",
	"./eu.js": "./node_modules/moment/locale/eu.js",
	"./fa": "./node_modules/moment/locale/fa.js",
	"./fa.js": "./node_modules/moment/locale/fa.js",
	"./fi": "./node_modules/moment/locale/fi.js",
	"./fi.js": "./node_modules/moment/locale/fi.js",
	"./fo": "./node_modules/moment/locale/fo.js",
	"./fo.js": "./node_modules/moment/locale/fo.js",
	"./fr": "./node_modules/moment/locale/fr.js",
	"./fr-ca": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ca.js": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ch": "./node_modules/moment/locale/fr-ch.js",
	"./fr-ch.js": "./node_modules/moment/locale/fr-ch.js",
	"./fr.js": "./node_modules/moment/locale/fr.js",
	"./fy": "./node_modules/moment/locale/fy.js",
	"./fy.js": "./node_modules/moment/locale/fy.js",
	"./gd": "./node_modules/moment/locale/gd.js",
	"./gd.js": "./node_modules/moment/locale/gd.js",
	"./gl": "./node_modules/moment/locale/gl.js",
	"./gl.js": "./node_modules/moment/locale/gl.js",
	"./gom-latn": "./node_modules/moment/locale/gom-latn.js",
	"./gom-latn.js": "./node_modules/moment/locale/gom-latn.js",
	"./gu": "./node_modules/moment/locale/gu.js",
	"./gu.js": "./node_modules/moment/locale/gu.js",
	"./he": "./node_modules/moment/locale/he.js",
	"./he.js": "./node_modules/moment/locale/he.js",
	"./hi": "./node_modules/moment/locale/hi.js",
	"./hi.js": "./node_modules/moment/locale/hi.js",
	"./hr": "./node_modules/moment/locale/hr.js",
	"./hr.js": "./node_modules/moment/locale/hr.js",
	"./hu": "./node_modules/moment/locale/hu.js",
	"./hu.js": "./node_modules/moment/locale/hu.js",
	"./hy-am": "./node_modules/moment/locale/hy-am.js",
	"./hy-am.js": "./node_modules/moment/locale/hy-am.js",
	"./id": "./node_modules/moment/locale/id.js",
	"./id.js": "./node_modules/moment/locale/id.js",
	"./is": "./node_modules/moment/locale/is.js",
	"./is.js": "./node_modules/moment/locale/is.js",
	"./it": "./node_modules/moment/locale/it.js",
	"./it.js": "./node_modules/moment/locale/it.js",
	"./ja": "./node_modules/moment/locale/ja.js",
	"./ja.js": "./node_modules/moment/locale/ja.js",
	"./jv": "./node_modules/moment/locale/jv.js",
	"./jv.js": "./node_modules/moment/locale/jv.js",
	"./ka": "./node_modules/moment/locale/ka.js",
	"./ka.js": "./node_modules/moment/locale/ka.js",
	"./kk": "./node_modules/moment/locale/kk.js",
	"./kk.js": "./node_modules/moment/locale/kk.js",
	"./km": "./node_modules/moment/locale/km.js",
	"./km.js": "./node_modules/moment/locale/km.js",
	"./kn": "./node_modules/moment/locale/kn.js",
	"./kn.js": "./node_modules/moment/locale/kn.js",
	"./ko": "./node_modules/moment/locale/ko.js",
	"./ko.js": "./node_modules/moment/locale/ko.js",
	"./ky": "./node_modules/moment/locale/ky.js",
	"./ky.js": "./node_modules/moment/locale/ky.js",
	"./lb": "./node_modules/moment/locale/lb.js",
	"./lb.js": "./node_modules/moment/locale/lb.js",
	"./lo": "./node_modules/moment/locale/lo.js",
	"./lo.js": "./node_modules/moment/locale/lo.js",
	"./lt": "./node_modules/moment/locale/lt.js",
	"./lt.js": "./node_modules/moment/locale/lt.js",
	"./lv": "./node_modules/moment/locale/lv.js",
	"./lv.js": "./node_modules/moment/locale/lv.js",
	"./me": "./node_modules/moment/locale/me.js",
	"./me.js": "./node_modules/moment/locale/me.js",
	"./mi": "./node_modules/moment/locale/mi.js",
	"./mi.js": "./node_modules/moment/locale/mi.js",
	"./mk": "./node_modules/moment/locale/mk.js",
	"./mk.js": "./node_modules/moment/locale/mk.js",
	"./ml": "./node_modules/moment/locale/ml.js",
	"./ml.js": "./node_modules/moment/locale/ml.js",
	"./mn": "./node_modules/moment/locale/mn.js",
	"./mn.js": "./node_modules/moment/locale/mn.js",
	"./mr": "./node_modules/moment/locale/mr.js",
	"./mr.js": "./node_modules/moment/locale/mr.js",
	"./ms": "./node_modules/moment/locale/ms.js",
	"./ms-my": "./node_modules/moment/locale/ms-my.js",
	"./ms-my.js": "./node_modules/moment/locale/ms-my.js",
	"./ms.js": "./node_modules/moment/locale/ms.js",
	"./mt": "./node_modules/moment/locale/mt.js",
	"./mt.js": "./node_modules/moment/locale/mt.js",
	"./my": "./node_modules/moment/locale/my.js",
	"./my.js": "./node_modules/moment/locale/my.js",
	"./nb": "./node_modules/moment/locale/nb.js",
	"./nb.js": "./node_modules/moment/locale/nb.js",
	"./ne": "./node_modules/moment/locale/ne.js",
	"./ne.js": "./node_modules/moment/locale/ne.js",
	"./nl": "./node_modules/moment/locale/nl.js",
	"./nl-be": "./node_modules/moment/locale/nl-be.js",
	"./nl-be.js": "./node_modules/moment/locale/nl-be.js",
	"./nl.js": "./node_modules/moment/locale/nl.js",
	"./nn": "./node_modules/moment/locale/nn.js",
	"./nn.js": "./node_modules/moment/locale/nn.js",
	"./pa-in": "./node_modules/moment/locale/pa-in.js",
	"./pa-in.js": "./node_modules/moment/locale/pa-in.js",
	"./pl": "./node_modules/moment/locale/pl.js",
	"./pl.js": "./node_modules/moment/locale/pl.js",
	"./pt": "./node_modules/moment/locale/pt.js",
	"./pt-br": "./node_modules/moment/locale/pt-br.js",
	"./pt-br.js": "./node_modules/moment/locale/pt-br.js",
	"./pt.js": "./node_modules/moment/locale/pt.js",
	"./ro": "./node_modules/moment/locale/ro.js",
	"./ro.js": "./node_modules/moment/locale/ro.js",
	"./ru": "./node_modules/moment/locale/ru.js",
	"./ru.js": "./node_modules/moment/locale/ru.js",
	"./sd": "./node_modules/moment/locale/sd.js",
	"./sd.js": "./node_modules/moment/locale/sd.js",
	"./se": "./node_modules/moment/locale/se.js",
	"./se.js": "./node_modules/moment/locale/se.js",
	"./si": "./node_modules/moment/locale/si.js",
	"./si.js": "./node_modules/moment/locale/si.js",
	"./sk": "./node_modules/moment/locale/sk.js",
	"./sk.js": "./node_modules/moment/locale/sk.js",
	"./sl": "./node_modules/moment/locale/sl.js",
	"./sl.js": "./node_modules/moment/locale/sl.js",
	"./sq": "./node_modules/moment/locale/sq.js",
	"./sq.js": "./node_modules/moment/locale/sq.js",
	"./sr": "./node_modules/moment/locale/sr.js",
	"./sr-cyrl": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr.js": "./node_modules/moment/locale/sr.js",
	"./ss": "./node_modules/moment/locale/ss.js",
	"./ss.js": "./node_modules/moment/locale/ss.js",
	"./sv": "./node_modules/moment/locale/sv.js",
	"./sv.js": "./node_modules/moment/locale/sv.js",
	"./sw": "./node_modules/moment/locale/sw.js",
	"./sw.js": "./node_modules/moment/locale/sw.js",
	"./ta": "./node_modules/moment/locale/ta.js",
	"./ta.js": "./node_modules/moment/locale/ta.js",
	"./te": "./node_modules/moment/locale/te.js",
	"./te.js": "./node_modules/moment/locale/te.js",
	"./tet": "./node_modules/moment/locale/tet.js",
	"./tet.js": "./node_modules/moment/locale/tet.js",
	"./tg": "./node_modules/moment/locale/tg.js",
	"./tg.js": "./node_modules/moment/locale/tg.js",
	"./th": "./node_modules/moment/locale/th.js",
	"./th.js": "./node_modules/moment/locale/th.js",
	"./tl-ph": "./node_modules/moment/locale/tl-ph.js",
	"./tl-ph.js": "./node_modules/moment/locale/tl-ph.js",
	"./tlh": "./node_modules/moment/locale/tlh.js",
	"./tlh.js": "./node_modules/moment/locale/tlh.js",
	"./tr": "./node_modules/moment/locale/tr.js",
	"./tr.js": "./node_modules/moment/locale/tr.js",
	"./tzl": "./node_modules/moment/locale/tzl.js",
	"./tzl.js": "./node_modules/moment/locale/tzl.js",
	"./tzm": "./node_modules/moment/locale/tzm.js",
	"./tzm-latn": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm-latn.js": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm.js": "./node_modules/moment/locale/tzm.js",
	"./ug-cn": "./node_modules/moment/locale/ug-cn.js",
	"./ug-cn.js": "./node_modules/moment/locale/ug-cn.js",
	"./uk": "./node_modules/moment/locale/uk.js",
	"./uk.js": "./node_modules/moment/locale/uk.js",
	"./ur": "./node_modules/moment/locale/ur.js",
	"./ur.js": "./node_modules/moment/locale/ur.js",
	"./uz": "./node_modules/moment/locale/uz.js",
	"./uz-latn": "./node_modules/moment/locale/uz-latn.js",
	"./uz-latn.js": "./node_modules/moment/locale/uz-latn.js",
	"./uz.js": "./node_modules/moment/locale/uz.js",
	"./vi": "./node_modules/moment/locale/vi.js",
	"./vi.js": "./node_modules/moment/locale/vi.js",
	"./x-pseudo": "./node_modules/moment/locale/x-pseudo.js",
	"./x-pseudo.js": "./node_modules/moment/locale/x-pseudo.js",
	"./yo": "./node_modules/moment/locale/yo.js",
	"./yo.js": "./node_modules/moment/locale/yo.js",
	"./zh-cn": "./node_modules/moment/locale/zh-cn.js",
	"./zh-cn.js": "./node_modules/moment/locale/zh-cn.js",
	"./zh-hk": "./node_modules/moment/locale/zh-hk.js",
	"./zh-hk.js": "./node_modules/moment/locale/zh-hk.js",
	"./zh-tw": "./node_modules/moment/locale/zh-tw.js",
	"./zh-tw.js": "./node_modules/moment/locale/zh-tw.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	var module = __webpack_require__(id);
	return module;
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/moment/locale sync recursive ^\\.\\/.*$";

/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n<div style=\"text-align:center\">\n  <h1>\n    Welcome to {{ title }}!\n  </h1>\n  <img width=\"300\" alt=\"Angular Logo\" src=\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==\">\n</div>\n<h2>Here are some links to help you start: </h2>\n<ul>\n  <li>\n    <h2><a target=\"_blank\" rel=\"noopener\" href=\"https://angular.io/tutorial\">Tour of Heroes</a></h2>\n  </li>\n  <li>\n    <h2><a target=\"_blank\" rel=\"noopener\" href=\"https://github.com/angular/angular-cli/wiki\">CLI Documentation</a></h2>\n  </li>\n  <li>\n    <h2><a target=\"_blank\" rel=\"noopener\" href=\"https://blog.angular.io/\">Angular blog</a></h2>\n  </li>\n  <button mat-raised-button (click)=\"testDialog()\">Test dialog</button>\n</ul>\n\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var twa_md2_dialogs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! twa-md2-dialogs */ "./dist/twa-md2-dialogs/fesm5/twa-md2-dialogs.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// import { TWADialogsModule } from 'twa-md2-dialogs';
// import { TWADialogsModule } from '../../projects/twa-md2-dialogs/src/public_api';

var AppComponent = /** @class */ (function () {
    function AppComponent(dialogsService) {
        this.dialogsService = dialogsService;
        this.title = 'ld';
    }
    AppComponent.prototype.testDialog = function () {
        this.dialogsService
            .prompt('Iniciar báscula', 'Introduzca los datos asociados al proceso de pesado:', [
            {
                key: 'cea',
                label: 'CEA',
                type: 'text',
                value: '',
                fxFlex: 'none',
                autocomplete: {
                    forceSelect: true,
                    options: [
                        'test 1',
                        'test 2',
                        'test 3',
                        'test 4'
                    ]
                }
            },
        ], 'Enviar', 'Cancelar')
            .subscribe(function (res) {
            if (res !== false && typeof res.cea !== 'undefined') {
                console.log(res);
            }
        });
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'ld-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [twa_md2_dialogs__WEBPACK_IMPORTED_MODULE_1__["TWADialogsModule"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/esm5/icon.es5.js");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/tooltip */ "./node_modules/@angular/material/esm5/tooltip.es5.js");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/snack-bar */ "./node_modules/@angular/material/esm5/snack-bar.es5.js");
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/menu */ "./node_modules/@angular/material/esm5/menu.es5.js");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/toolbar */ "./node_modules/@angular/material/esm5/toolbar.es5.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/esm5/input.es5.js");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/checkbox */ "./node_modules/@angular/material/esm5/checkbox.es5.js");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/select */ "./node_modules/@angular/material/esm5/select.es5.js");
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/radio */ "./node_modules/@angular/material/esm5/radio.es5.js");
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/datepicker */ "./node_modules/@angular/material/esm5/datepicker.es5.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/table */ "./node_modules/@angular/material/esm5/table.es5.js");
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/paginator */ "./node_modules/@angular/material/esm5/paginator.es5.js");
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/sidenav */ "./node_modules/@angular/material/esm5/sidenav.es5.js");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/list */ "./node_modules/@angular/material/esm5/list.es5.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/esm5/card.es5.js");
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/expansion */ "./node_modules/@angular/material/esm5/expansion.es5.js");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/progress-bar */ "./node_modules/@angular/material/esm5/progress-bar.es5.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/chips */ "./node_modules/@angular/material/esm5/chips.es5.js");
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/material/slide-toggle */ "./node_modules/@angular/material/esm5/slide-toggle.es5.js");
/* harmony import */ var _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/material/grid-list */ "./node_modules/@angular/material/esm5/grid-list.es5.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var twa_md2_dialogs__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! twa-md2-dialogs */ "./dist/twa-md2-dialogs/fesm5/twa-md2-dialogs.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



























// import { MatModule } from '@angular/material/';



var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_28__["AppComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__["BrowserAnimationsModule"],
                twa_md2_dialogs__WEBPACK_IMPORTED_MODULE_27__["TWADialogsModule"],
                _angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButtonModule"],
                _angular_material_menu__WEBPACK_IMPORTED_MODULE_7__["MatMenuModule"],
                _angular_material_card__WEBPACK_IMPORTED_MODULE_19__["MatCardModule"],
                _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_8__["MatToolbarModule"],
                _angular_material_input__WEBPACK_IMPORTED_MODULE_9__["MatInputModule"],
                _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_10__["MatCheckboxModule"],
                _angular_material_select__WEBPACK_IMPORTED_MODULE_11__["MatSelectModule"],
                _angular_material_radio__WEBPACK_IMPORTED_MODULE_12__["MatRadioModule"],
                _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_13__["MatDatepickerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_14__["MatNativeDateModule"],
                _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__["MatIconModule"],
                _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_5__["MatTooltipModule"],
                _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_6__["MatSnackBarModule"],
                _angular_material_table__WEBPACK_IMPORTED_MODULE_15__["MatTableModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_14__["MatSortModule"],
                _angular_material_paginator__WEBPACK_IMPORTED_MODULE_16__["MatPaginatorModule"],
                _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_17__["MatSidenavModule"],
                _angular_material_list__WEBPACK_IMPORTED_MODULE_18__["MatListModule"],
                _angular_material_menu__WEBPACK_IMPORTED_MODULE_7__["MatMenuModule"],
                _angular_material_expansion__WEBPACK_IMPORTED_MODULE_20__["MatExpansionModule"],
                _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_21__["MatProgressBarModule"],
                _angular_material_dialog__WEBPACK_IMPORTED_MODULE_22__["MatDialogModule"],
                _angular_material_chips__WEBPACK_IMPORTED_MODULE_23__["MatChipsModule"],
                _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_24__["MatSlideToggleModule"],
                _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_25__["MatGridListModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_26__["FlexLayoutModule"],
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_28__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/jose/work/sira.es/sira-ng2-components/lib-twa-md-dialogs/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map