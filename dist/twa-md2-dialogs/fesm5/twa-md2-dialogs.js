import { Directive, forwardRef, Attribute, Component, EventEmitter, NgModule, Injectable } from '@angular/core';
import { NG_VALIDATORS, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatNativeDateModule, MatButtonModule, MatDialogModule, MatDialog } from '@angular/material';
import { __values } from 'tslib';
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
        { type: Directive, args: [{
                    selector: '[tm-match][formControlName],[tm-match][formControl],[tm-match][ngModel]',
                    providers: [
                        { provide: NG_VALIDATORS, useExisting: forwardRef(function () { return MatchValidator; }), multi: true }
                    ]
                },] },
    ];
    /** @nocollapse */
    MatchValidator.ctorParameters = function () { return [
        { type: String, decorators: [{ type: Attribute, args: ['tm-match',] }] }
    ]; };
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
        { type: Component, args: [{
                    selector: 'twa-app-confirm-dialog',
                    // templateUrl: './twa-confirm-dialog.component.html',
                    // styleUrls: ['./twa-confirm-dialog.component.css'],
                    template: "\n    <h2>{{ title }}</h2>\n    <p [innerHtml]=\"messageHtml\"></p>\n\n    <button type=\"button\" mat-raised-button\n        (click)=\"dialogRef.close(true)\">{{ okText }}</button>\n    <button type=\"button\" mat-button *ngIf=\"cancelText > ''\"\n        (click)=\"dialogRef.close()\">{{ cancelText }}</button>\n    "
                },] },
    ];
    /** @nocollapse */
    TWAConfirmDialogComponent.ctorParameters = function () { return [
        { type: MatDialogRef }
    ]; };
    return TWAConfirmDialogComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
        { type: Injectable },
    ];
    /** @nocollapse */
    TWADialogsModule.ctorParameters = function () { return [
        { type: MatDialog },
        { type: DomSanitizer }
    ]; };
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

export { TWADialogsModule, TWAConfirmDialogComponent, TWAPromptDialogComponent, MatchValidator as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdhLW1kMi1kaWFsb2dzLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly90d2EtbWQyLWRpYWxvZ3MvbGliL3Byb21wdC1kaWFsb2cvbWF0Y2gtdmFsaWRhdG9yLmRpcmVjdGl2ZS50cyIsIm5nOi8vdHdhLW1kMi1kaWFsb2dzL2xpYi9jb25maXJtLWRpYWxvZy90d2EtY29uZmlybS1kaWFsb2cuY29tcG9uZW50LnRzIiwibmc6Ly90d2EtbWQyLWRpYWxvZ3MvbGliL3Byb21wdC1kaWFsb2cvdHdhLXByb21wdC1kaWFsb2cuY29tcG9uZW50LnRzIiwibmc6Ly90d2EtbWQyLWRpYWxvZ3MvbGliL3R3YS1kaWFsb2dzLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIGZvcndhcmRSZWYsIEF0dHJpYnV0ZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmFsaWRhdG9yLCBBYnN0cmFjdENvbnRyb2wsIE5HX1ZBTElEQVRPUlMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1t0bS1tYXRjaF1bZm9ybUNvbnRyb2xOYW1lXSxbdG0tbWF0Y2hdW2Zvcm1Db250cm9sXSxbdG0tbWF0Y2hdW25nTW9kZWxdJyxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiBOR19WQUxJREFUT1JTLCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNYXRjaFZhbGlkYXRvciksIG11bHRpOiB0cnVlIH1cbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE1hdGNoVmFsaWRhdG9yIGltcGxlbWVudHMgVmFsaWRhdG9yIHtcbiAgICBjb25zdHJ1Y3RvciggQEF0dHJpYnV0ZSgndG0tbWF0Y2gnKSBwdWJsaWMgbWF0Y2g6IHN0cmluZykge31cblxuICAgIHZhbGlkYXRlKGM6IEFic3RyYWN0Q29udHJvbCk6IHsgW2tleTogc3RyaW5nXTogYW55IH0ge1xuICAgICAgICAvLyBzZWxmIHZhbHVlIChlLmcuIHJldHlwZSBwYXNzd29yZClcbiAgICAgICAgY29uc3QgdiA9IGMudmFsdWU7XG5cbiAgICAgICAgLy8gY29udHJvbCB2YWx1ZSAoZS5nLiBwYXNzd29yZClcbiAgICAgICAgY29uc3QgZSA9IGMucm9vdC5nZXQodGhpcy5tYXRjaCk7XG5cbiAgICAgICAgLy8gdmFsdWUgbm90IGVxdWFsXG4gICAgICAgIGlmIChlICYmIHYgIT09IGUudmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgbWF0Y2g6IGZhbHNlXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nUmVmIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgU2FmZUh0bWwgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd0d2EtYXBwLWNvbmZpcm0tZGlhbG9nJyxcbiAgICAvLyB0ZW1wbGF0ZVVybDogJy4vdHdhLWNvbmZpcm0tZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcbiAgICAvLyBzdHlsZVVybHM6IFsnLi90d2EtY29uZmlybS1kaWFsb2cuY29tcG9uZW50LmNzcyddLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgPGgyPnt7IHRpdGxlIH19PC9oMj5cbiAgICA8cCBbaW5uZXJIdG1sXT1cIm1lc3NhZ2VIdG1sXCI+PC9wPlxuXG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbWF0LXJhaXNlZC1idXR0b25cbiAgICAgICAgKGNsaWNrKT1cImRpYWxvZ1JlZi5jbG9zZSh0cnVlKVwiPnt7IG9rVGV4dCB9fTwvYnV0dG9uPlxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG1hdC1idXR0b24gKm5nSWY9XCJjYW5jZWxUZXh0ID4gJydcIlxuICAgICAgICAoY2xpY2spPVwiZGlhbG9nUmVmLmNsb3NlKClcIj57eyBjYW5jZWxUZXh0IH19PC9idXR0b24+XG4gICAgYFxufSlcblxuZXhwb3J0IGNsYXNzIFRXQUNvbmZpcm1EaWFsb2dDb21wb25lbnQge1xuXG4gICAgcHVibGljIHRpdGxlOiBzdHJpbmc7XG4gICAgcHVibGljIG1lc3NhZ2U6IHN0cmluZztcbiAgICBwdWJsaWMgbWVzc2FnZUh0bWw6IFNhZmVIdG1sO1xuICAgIHB1YmxpYyBva1RleHQ6IHN0cmluZztcbiAgICBwdWJsaWMgY2FuY2VsVGV4dDogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPFRXQUNvbmZpcm1EaWFsb2dDb21wb25lbnQ+KSB7XG5cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXREaWFsb2dSZWYgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCwgRm9ybUdyb3VwLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgU2FmZUh0bWwgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuaW1wb3J0IHsgbWFwLCBzdGFydFdpdGggfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE1hdGNoVmFsaWRhdG9yIH0gZnJvbSAnLi9tYXRjaC12YWxpZGF0b3IuZGlyZWN0aXZlJztcblxuZXhwb3J0IGludGVyZmFjZSBJVFdBUHJvbXB0RmllbGQge1xuICAgIGtleTogc3RyaW5nO1xuICAgIGxhYmVsOiBzdHJpbmc7XG4gICAgdHlwZTogc3RyaW5nO1xuICAgIGZ4RmxleDogc3RyaW5nO1xuICAgIHZhbHVlOiBzdHJpbmc7XG4gICAgb3B0aW9uczogYW55W107XG4gICAgYXV0b2NvbXBsZXRlOiBhbnk7XG4gICAgcm93czogYW55W107XG4gICAgdmFsaWRhdGlvbjogYW55O1xuICAgIHZhbGlkYXRpb25NZXNzYWdlcz86IGFueTtcbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd0d2EtYXBwLXByb21wdC1kaWFsb2cnLFxuICAgIC8vIHRlbXBsYXRlVXJsOiAnLi90d2EtcHJvbXB0LWRpYWxvZy5jb21wb25lbnQuaHRtbCcsXG4gICAgLy8gc3R5bGVVcmxzOiBbJy4vdHdhLXByb21wdC1kaWFsb2cuY29tcG9uZW50LmNzcyddXG4gICAgc3R5bGVzOiBbJy5tYXQtZXJyb3IgeyBkaXNwbGF5OiBibG9jazsgbWFyZ2luOiAtMTVweCAwIDE1cHg7IH0nXSxcbiAgICB0ZW1wbGF0ZTogYFxuICAgIDxoMj57eyB0aXRsZSB9fTwvaDI+XG4gICAgPHAgW2lubmVySHRtbF09XCJtZXNzYWdlSHRtbFwiPjwvcD5cblxuICAgIDxmb3JtIG5vdmFsaWRhdGUgKG5nU3VibWl0KT1cInN1Ym1pdEZvcm0oZm9ybS52YWx1ZSlcIiBbZm9ybUdyb3VwXT1cImZvcm1cIiBmeExheW91dD1cInJvdyB3cmFwXCIgZnhMYXlvdXRHYXA9XCIxMHB4XCI+XG4gICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IHByb3Agb2YgZmllbGRzXCIgZnhGbGV4PVwie3twcm9wLmZ4RmxleCA/ICgnY2FsYygnICsgcHJvcC5meEZsZXggKyAnIC0gMTBweCknKSA6ICcxMDAlJ319XCIgZnhMYXlvdXQ9XCJjb2x1bW5cIj5cbiAgICAgICAgICAgIDxkaXYgW25nU3dpdGNoXT1cInByb3AudHlwZVwiIGZ4RmxleD1cIjEwMCVcIj5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCIndGV4dCdcIj5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkICpuZ0lmPVwiIXByb3AuYXV0b2NvbXBsZXRlXCIgZnhGbGV4PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IG1hdElucHV0IHBsYWNlaG9sZGVyPVwie3twcm9wLmxhYmVsfX1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwicHJvcC5rZXlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpZF09XCJwcm9wLmtleVwiIFt0eXBlXT1cInByb3AudHlwZVwiIGZ4RmxleD5cbiAgICAgICAgICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cInByb3AuYXV0b2NvbXBsZXRlXCIgZnhGbGV4PlxuICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkIGZ4RmxleD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgcGxhY2Vob2xkZXI9XCJ7e3Byb3AubGFiZWx9fVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwicHJvcC5rZXlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbWF0QXV0b2NvbXBsZXRlXT1cImF1dG9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoYmx1cik9XCJhY0NoZWNrQmx1cihwcm9wKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpZF09XCJwcm9wLmtleVwiIFt0eXBlXT1cInByb3AudHlwZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxtYXQtYXV0b2NvbXBsZXRlICNhdXRvPVwibWF0QXV0b2NvbXBsZXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAob3B0aW9uU2VsZWN0ZWQpPVwiYWNDbGljayhwcm9wLCAkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1vcHRpb24gKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBwcm9wLmF1dG9jb21wbGV0ZS5maWx0ZXJlZE9wdGlvbnMgfCBhc3luY1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt2YWx1ZV09XCJvcHRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBvcHRpb24gfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L21hdC1vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L21hdC1hdXRvY29tcGxldGU+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIidwYXNzd29yZCdcIj5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkIGZ4RmxleD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBtYXRJbnB1dCB0eXBlPVwicGFzc3dvcmRcIiBwbGFjZWhvbGRlcj1cInt7cHJvcC5sYWJlbH19XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cInByb3Aua2V5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaWRdPVwicHJvcC5rZXlcIiBbdHlwZV09XCJwcm9wLnR5cGVcIiBmeEZsZXg+XG4gICAgICAgICAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ3RleHRhcmVhJ1wiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgZnhGbGV4PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIG1hdElucHV0IHBsYWNlaG9sZGVyPVwie3twcm9wLmxhYmVsfX1cIiByb3dzPVwie3twcm9wLnJvd3N8fCczJ319XCIgYXV0b3NpemVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cInByb3Aua2V5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaWRdPVwicHJvcC5rZXlcIiBbdHlwZV09XCJwcm9wLnR5cGVcIj48L3RleHRhcmVhPlxuICAgICAgICAgICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIidudW1iZXInXCI+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZCBmeEZsZXg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgcGxhY2Vob2xkZXI9XCJ7e3Byb3AubGFiZWx9fVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJwcm9wLmtleVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2lkXT1cInByb3Aua2V5XCIgW3R5cGVdPVwicHJvcC50eXBlXCI+XG4gICAgICAgICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCInZGF0ZSdcIj5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkIGZ4RmxleD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBtYXRJbnB1dCBbbWF0RGF0ZXBpY2tlcl09cGlja2VyIHBsYWNlaG9sZGVyPVwie3twcm9wLmxhYmVsfX1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwicHJvcC5rZXlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpZF09XCJwcm9wLmtleVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1kYXRlcGlja2VyICNwaWNrZXI+PC9tYXQtZGF0ZXBpY2tlcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxtYXQtZGF0ZXBpY2tlci10b2dnbGUgbWF0U3VmZml4IFtmb3JdPVwicGlja2VyXCI+PC9tYXQtZGF0ZXBpY2tlci10b2dnbGU+XG4gICAgICAgICAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ3RpbWUnXCI+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZCBmeEZsZXg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgW25neFRpbWVwaWNrZXJdPVwidHBpY2tlclwiIHBsYWNlaG9sZGVyPVwie3twcm9wLmxhYmVsfX1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmb3JtYXRdPVwiMjRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwicHJvcC5rZXlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpZF09XCJwcm9wLmtleVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5neC1tYXRlcmlhbC10aW1lcGlja2VyICN0cGlja2VyPjwvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCIncmFkaW8nXCIgZnhMYXlvdXQ9XCJjb2x1bW5cIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBfbmdjb250ZW50LWMyMD1cIlwiIHN0eWxlPVwiaGVpZ2h0OiAyMHB4O1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIF9uZ2NvbnRlbnQtYzIwPVwiXCIgc3R5bGU9XCJ0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTEuMjgxMjVlbSkgc2NhbGUoMC43NSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVyc3BlY3RpdmUoMTAwcHgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZVooMC4wMDFweCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTEuMjgxMjVlbSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGUoMC43NSk7d2lkdGg6IDEzMy4zMzMzMzMzMyU7bWFyZ2luOiAyMHB4IDAgMCAwO2ZvbnQtd2VpZ2h0OiAxMDA7Y29sb3I6ICM2NjY7XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3twcm9wLmxhYmVsfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8bWF0LXJhZGlvLWdyb3VwIFtmb3JtQ29udHJvbE5hbWVdPVwicHJvcC5rZXlcIiBbbmFtZV09XCJwcm9wLmtleVwiIGZ4TGF5b3V0PVwiY29sdW1uXCIgc3R5bGU9XCJtYXJnaW4tdG9wOiAxNHB4O1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1yYWRpby1idXR0b24gW3ZhbHVlXT1cIm9wdGlvbi52YWx1ZVwiICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgcHJvcC5vcHRpb25zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3tvcHRpb24ubGFiZWx9fVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9tYXQtcmFkaW8tYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L21hdC1yYWRpby1ncm91cD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIidzZWxlY3QnXCI+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZCBmeEZsZXg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bWF0LXNlbGVjdCBbZm9ybUNvbnRyb2xOYW1lXT1cInByb3Aua2V5XCIgcGxhY2Vob2xkZXI9XCJ7e3Byb3AubGFiZWx9fVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgcHJvcC5vcHRpb25zXCIgW3ZhbHVlXT1cIm9wdGlvbi52YWx1ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBvcHRpb24ubGFiZWwgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L21hdC1vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L21hdC1zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlcnJvclwiICpuZ0lmPVwiZm9ybS5nZXQocHJvcC5rZXkpLmVycm9yc1wiIGZ4RmxleD1cIjEwMCVcIj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVycm9yXCIgKm5nSWY9XCJmb3JtLmdldChwcm9wLmtleSkuaW52YWxpZCAmJiAoZm9ybS5nZXQocHJvcC5rZXkpLmRpcnR5IHx8IGZvcm0uZ2V0KHByb3Aua2V5KS50b3VjaGVkKVwiIGZ4RmxleD1cIjEwMCVcIj5cbiAgICAgICAgICAgICAgICA8bWF0LWVycm9yICpuZ0lmPVwiZm9ybS5nZXQocHJvcC5rZXkpLmVycm9ycy5yZXF1aXJlZFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiZHJhd0N1c3RvbUVycm9ycyhwcm9wLCAncmVxdWlyZWQnKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge3twcm9wLnZhbGlkYXRpb25NZXNzYWdlcy5yZXF1aXJlZH19XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiIXByb3AudmFsaWRhdGlvbk1lc3NhZ2VzIHx8ICFwcm9wLnZhbGlkYXRpb25NZXNzYWdlcy5yZXF1aXJlZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgVGhlIGZpZWxkIHt7IHByb3AubGFiZWwgfX0gaXMgcmVxdWlyZWQuXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvbWF0LWVycm9yPlxuICAgICAgICAgICAgICAgIDxtYXQtZXJyb3IgKm5nSWY9XCJmb3JtLmdldChwcm9wLmtleSkuZXJyb3JzLm1hdGNoXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJkcmF3Q3VzdG9tRXJyb3JzKHByb3AsICdtYXRjaCcpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7e3Byb3AudmFsaWRhdGlvbk1lc3NhZ2VzLm1hdGNofX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCIhcHJvcC52YWxpZGF0aW9uTWVzc2FnZXMgfHwgIXByb3AudmFsaWRhdGlvbk1lc3NhZ2VzLm1hdGNoXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBUaGUgZmllbGRzIGRvZXNuJ3QgbWF0Y2guXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvbWF0LWVycm9yPlxuICAgICAgICAgICAgICAgIDxtYXQtZXJyb3IgKm5nSWY9XCJmb3JtLmdldChwcm9wLmtleSkuZXJyb3JzLm1pblwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiZHJhd0N1c3RvbUVycm9ycyhwcm9wLCAnbWluJylcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt7cHJvcC52YWxpZGF0aW9uTWVzc2FnZXMubWlufX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCIhcHJvcC52YWxpZGF0aW9uTWVzc2FnZXMgfHwgIXByb3AudmFsaWRhdGlvbk1lc3NhZ2VzLm1pblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgVGhlIG1pbmltYWwgdmFsdWUgaXMge3tmb3JtLmdldChwcm9wLmtleSkuZXJyb3JzLm1pbi5taW59fS5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9tYXQtZXJyb3I+XG4gICAgICAgICAgICAgICAgPG1hdC1lcnJvciAqbmdJZj1cImZvcm0uZ2V0KHByb3Aua2V5KS5lcnJvcnMubWF4XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJkcmF3Q3VzdG9tRXJyb3JzKHByb3AsICdtYXgnKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge3twcm9wLnZhbGlkYXRpb25NZXNzYWdlcy5tYXh9fVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cIiFwcm9wLnZhbGlkYXRpb25NZXNzYWdlcyB8fCAhcHJvcC52YWxpZGF0aW9uTWVzc2FnZXMubWF4XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBUaGUgbWF4IHZhbHVlIGlzIHt7Zm9ybS5nZXQocHJvcC5rZXkpLmVycm9ycy5tYXgubWF4fX0uXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvbWF0LWVycm9yPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZm9ybT5cblxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG1hdC1yYWlzZWQtYnV0dG9uXG4gICAgICAgIChjbGljayk9XCJzZW5kKClcIj57eyBva1RleHQgfX08L2J1dHRvbj5cbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBtYXQtYnV0dG9uXG4gICAgICAgIChjbGljayk9XCJkaWFsb2dSZWYuY2xvc2UoZmFsc2UpXCI+e3sgY2FuY2VsVGV4dCB9fTwvYnV0dG9uPlxuXG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBUV0FQcm9tcHREaWFsb2dDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgcHVibGljIGZvcm06IEZvcm1Hcm91cCA9IG5ldyBGb3JtR3JvdXAoe30pO1xuICAgIGZvcm1TdWJtaXRFdjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBwdWJsaWMgdGl0bGU6IHN0cmluZztcbiAgICBwdWJsaWMgbWVzc2FnZTogc3RyaW5nO1xuICAgIHB1YmxpYyBtZXNzYWdlSHRtbDogU2FmZUh0bWw7XG4gICAgcHVibGljIGZpZWxkczogSVRXQVByb21wdEZpZWxkW107XG4gICAgcHVibGljIG9rVGV4dDogc3RyaW5nO1xuICAgIHB1YmxpYyBjYW5jZWxUZXh0OiBzdHJpbmc7XG4gICAgcHVibGljIG9uU3VibWl0OiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8VFdBUHJvbXB0RGlhbG9nQ29tcG9uZW50Pikge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuXG4gICAgICAgIGNvbnN0IGZvcm1Hcm91cCA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IGkgaW4gdGhpcy5maWVsZHMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmZpZWxkcy5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgICAgICAgICAgIGZvcm1Hcm91cFt0aGlzLmZpZWxkc1tpXS5rZXldID0gbmV3IEZvcm1Db250cm9sKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpZWxkc1tpXS52YWx1ZSB8fCAnJyxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBWYWxpZGF0b3JzKHRoaXMuZmllbGRzW2ldLnZhbGlkYXRpb24sIHRoaXMuZmllbGRzW2ldLmtleSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5maWVsZHNbaV0uYXV0b2NvbXBsZXRlICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLmZpZWxkc1tpXS5hdXRvY29tcGxldGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpZWxkc1tpXS5hdXRvY29tcGxldGUuZmlsdGVyZWRPcHRpb25zID0gdGhpcy5nZXRGb3JtR3JvdXBFdmVudChmb3JtR3JvdXAsIGkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZm9ybSA9IG5ldyBGb3JtR3JvdXAoZm9ybUdyb3VwKTtcblxuICAgIH1cblxuICAgIGdldEZvcm1Hcm91cEV2ZW50KGZvcm1Hcm91cCwgaSkge1xuICAgICAgICByZXR1cm4gZm9ybUdyb3VwW3RoaXMuZmllbGRzW2ldLmtleV0udmFsdWVDaGFuZ2VzLnBpcGUoXG4gICAgICAgICAgICBzdGFydFdpdGgoJycpLFxuICAgICAgICAgICAgbWFwKGZpbHRlclZhbHVlID0+IGZpbHRlclZhbHVlID8gdGhpcy5fZmlsdGVyVmFsdWVzKGZpbHRlclZhbHVlLCB0aGlzLmZpZWxkc1tpXS5hdXRvY29tcGxldGUub3B0aW9ucykgOlxuICAgICAgICAgICAgICAgIHRoaXMuZmllbGRzW2ldLmF1dG9jb21wbGV0ZS5vcHRpb25zLnNsaWNlKCkpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgbG9nKG9iamVjdDogYW55KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKG9iamVjdCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZmlsdGVyVmFsdWVzKHZhbHVlLCBvcHRpb25zKSB7XG5cbiAgICAgICAgY29uc3QgZmlsdGVyZWRWYWx1ZSA9IHZhbHVlLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgcmV0dXJuIG9wdGlvbnMuZmlsdGVyKG9wdGlvbiA9PiBvcHRpb24udG9Mb3dlckNhc2UoKS5pbmRleE9mKGZpbHRlcmVkVmFsdWUpID49IDApO1xuXG4gICAgfVxuXG4gICAgZ2V0Rm9ybVN1Ym1pdEV2KCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm9ybVN1Ym1pdEV2O1xuICAgIH1cblxuICAgIHNlbmQoKSB7XG4gICAgICAgICAgICBsZXQgaTtcbiAgICAgICAgICAgIHRoaXMuZm9ybS51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgICAgICAgICBpZiAodGhpcy5mb3JtLnN0YXR1cyAhPT0gJ0lOVkFMSUQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKHRoaXMuZm9ybS52YWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgaW4gdGhpcy5mb3JtLmNvbnRyb2xzKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuZm9ybS5jb250cm9sc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZm9ybS5jb250cm9scy5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtLmNvbnRyb2xzW2ldLm1hcmtBc1RvdWNoZWQoeyBvbmx5U2VsZjogdHJ1ZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZm9ybS5jb250cm9sc1tpXS51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgfVxuXG4gICAgYWNDbGljayhmaWVsZDogYW55LCBldmVudDogYW55KSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGV2ZW50KTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coZmllbGQuYXV0b2NvbXBsZXRlKTtcbiAgICAgICAgaWYgKHR5cGVvZiBmaWVsZC5hdXRvY29tcGxldGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGZpZWxkLmF1dG9jb21wbGV0ZS5mb3JjZVNlbGVjdCAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgICAgICAgICBmaWVsZC5hdXRvY29tcGxldGUuZm9yY2VTZWxlY3QpIHtcbiAgICAgICAgICAgICAgICBmaWVsZC5hdXRvY29tcGxldGUuc2VsZWN0ZWQgPSBldmVudC5vcHRpb24udmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhY0NoZWNrQmx1cihmaWVsZCkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhmaWVsZC5hdXRvY29tcGxldGUuc2VsZWN0ZWQsIHRoaXMuZm9ybS5jb250cm9sc1tmaWVsZC5rZXldLnZhbHVlKTtcbiAgICAgICAgaWYgKHR5cGVvZiBmaWVsZC5hdXRvY29tcGxldGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGZpZWxkLmF1dG9jb21wbGV0ZS5mb3JjZVNlbGVjdCAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgICAgICAgICBmaWVsZC5hdXRvY29tcGxldGUuZm9yY2VTZWxlY3QpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWZpZWxkLmF1dG9jb21wbGV0ZS5zZWxlY3RlZCB8fFxuICAgICAgICAgICAgICAgICAgICBmaWVsZC5hdXRvY29tcGxldGUuc2VsZWN0ZWQgIT09IHRoaXMuZm9ybS5jb250cm9sc1tmaWVsZC5rZXldLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9ybS5jb250cm9sc1tmaWVsZC5rZXldLnNldFZhbHVlKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICBmaWVsZC5hdXRvY29tcGxldGUuc2VsZWN0ZWQgPSAnJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdWJtaXRGb3JtKGZvcm06IGFueSkge1xuICAgICAgICAgICAgdGhpcy5mb3JtU3VibWl0RXYuZW1pdChmb3JtKTtcbiAgICB9XG5cbiAgICBkcmF3Q3VzdG9tRXJyb3JzKHByb3AsIGVycm9yKSB7XG4gICAgICAgIGxldCByZXQgPSBmYWxzZTtcbiAgICAgICAgaWYgKHR5cGVvZiBwcm9wLnZhbGlkYXRpb25NZXNzYWdlcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcHJvcC52YWxpZGF0aW9uTWVzc2FnZXNbZXJyb3JdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHJldCA9IHByb3AudmFsaWRhdGlvbk1lc3NhZ2VzW2Vycm9yXSA+ICcnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtYXBWYWxpZGF0b3JzKHZhbGlkYXRvcnM6IGFueSwgZmllbGQpIHtcblxuICAgICAgICBjb25zdCBmb3JtVmFsaWRhdG9ycyA9IFtdO1xuXG4gICAgICAgIGlmICh2YWxpZGF0b3JzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHZhbGlkYXRpb24gb2YgT2JqZWN0LmtleXModmFsaWRhdG9ycykpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsaWRhdGlvbiA9PT0gJ3JlcXVpcmVkJykge1xuICAgICAgICAgICAgICAgICAgICBmb3JtVmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMucmVxdWlyZWQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsaWRhdGlvbiA9PT0gJ21hdGNoJykge1xuICAgICAgICAgICAgICAgICAgICBmb3JtVmFsaWRhdG9ycy5wdXNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZXQ6IGFueSB8IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRyb2wgPSB0aGlzLmZvcm0uZ2V0KHZhbGlkYXRvcnNbdmFsaWRhdGlvbl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmZvcm0uZ2V0KGZpZWxkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXQgPSAhKHRoaXMuZm9ybS5nZXQoZmllbGQpICYmIHRoaXMuZm9ybS5nZXQoZmllbGQpLnZhbHVlID09PSBjb250cm9sLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmV0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaDogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbGlkYXRpb24gPT09ICdtaW4nKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1WYWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5taW4odmFsaWRhdG9yc1t2YWxpZGF0aW9uXSkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsaWRhdGlvbiA9PT0gJ21heCcpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybVZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLm1heCh2YWxpZGF0b3JzW3ZhbGlkYXRpb25dKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZvcm1WYWxpZGF0b3JzO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNYXRJbnB1dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2lucHV0JztcbmltcG9ydCB7IE1hdENoZWNrYm94TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY2hlY2tib3gnO1xuaW1wb3J0IHsgTWF0U2VsZWN0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2VsZWN0JztcbmltcG9ydCB7IE1hdFJhZGlvTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvcmFkaW8nO1xuaW1wb3J0IHsgTWF0RGF0ZXBpY2tlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RhdGVwaWNrZXInO1xuaW1wb3J0IHsgTWF0TmF0aXZlRGF0ZU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IE1hdEF1dG9jb21wbGV0ZU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2F1dG9jb21wbGV0ZSc7XG5cbmltcG9ydCB7IE1hdGNoVmFsaWRhdG9yIH0gZnJvbSAnLi9wcm9tcHQtZGlhbG9nL21hdGNoLXZhbGlkYXRvci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVFdBQ29uZmlybURpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vY29uZmlybS1kaWFsb2cvdHdhLWNvbmZpcm0tZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUV0FQcm9tcHREaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL3Byb21wdC1kaWFsb2cvdHdhLXByb21wdC1kaWFsb2cuY29tcG9uZW50Jztcbi8vIGltcG9ydCB7IFRXQURpYWxvZ3NTZXJ2aWNlIH0gZnJvbSAnLi90d2EtZGlhbG9ncy5zZXJ2aWNlJztcbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSwgTWF0RGlhbG9nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgTmd4TWF0ZXJpYWxUaW1lcGlja2VyTW9kdWxlIH0gZnJvbSAnbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXInO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyLCBTYWZlSHRtbCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBNYXREaWFsb2csIE1hdERpYWxvZ1JlZiB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGbGV4TGF5b3V0TW9kdWxlLFxuICAgIE1hdERpYWxvZ01vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICBNYXRDaGVja2JveE1vZHVsZSxcbiAgICBNYXRTZWxlY3RNb2R1bGUsXG4gICAgTWF0UmFkaW9Nb2R1bGUsXG4gICAgTWF0RGF0ZXBpY2tlck1vZHVsZSxcbiAgICBNYXROYXRpdmVEYXRlTW9kdWxlLFxuICAgIE1hdEF1dG9jb21wbGV0ZU1vZHVsZSxcbiAgICBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJNb2R1bGUuZm9yUm9vdCgpLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICAvLyBUV0FEaWFsb2dzTW9kdWxlLFxuICAgIFRXQUNvbmZpcm1EaWFsb2dDb21wb25lbnQsXG4gICAgVFdBUHJvbXB0RGlhbG9nQ29tcG9uZW50LFxuICAgIE1hdGNoVmFsaWRhdG9yLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgLy8gVFdBRGlhbG9nc01vZHVsZSxcbiAgICBUV0FDb25maXJtRGlhbG9nQ29tcG9uZW50LFxuICAgIFRXQVByb21wdERpYWxvZ0NvbXBvbmVudFxuICBdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtUV0FDb25maXJtRGlhbG9nQ29tcG9uZW50LCBUV0FQcm9tcHREaWFsb2dDb21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtcbiAgICBUV0FEaWFsb2dzTW9kdWxlLFxuICAgIFRXQUNvbmZpcm1EaWFsb2dDb21wb25lbnQsXG4gICAgVFdBUHJvbXB0RGlhbG9nQ29tcG9uZW50XG4gIF1cbn0pXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVFdBRGlhbG9nc01vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBkaWFsb2c6IE1hdERpYWxvZyxcbiAgICAgIHByaXZhdGUgX3Nhbml0aXplcjogRG9tU2FuaXRpemVyXG4gICAgKSB7fVxuXG4gIHB1YmxpYyBjb25maXJtKFxuICAgIHRpdGxlOiBzdHJpbmcsXG4gICAgbWVzc2FnZTogc3RyaW5nLFxuICAgIG9rVGV4dD86IHN0cmluZyxcbiAgICBjYW5jZWxUZXh0Pzogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgbGV0IGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPFRXQUNvbmZpcm1EaWFsb2dDb21wb25lbnQ+O1xuXG4gICAgZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihUV0FDb25maXJtRGlhbG9nQ29tcG9uZW50KTtcblxuICAgIGRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS50aXRsZSA9IHRpdGxlO1xuICAgIGRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICBkaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UubWVzc2FnZUh0bWwgPSB0aGlzLl9zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwobWVzc2FnZSk7XG4gICAgZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLm9rVGV4dCA9IG9rVGV4dCB8fCAnQWNlcHRhcic7XG4gICAgZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLmNhbmNlbFRleHQgPSBjYW5jZWxUZXh0IHx8ICcnO1xuXG4gICAgcmV0dXJuIGRpYWxvZ1JlZi5hZnRlckNsb3NlZCgpO1xuICB9XG5cbiAgcHVibGljIHByb21wdChcbiAgICB0aXRsZTogc3RyaW5nLFxuICAgIG1lc3NhZ2U6IHN0cmluZyxcbiAgICBmaWVsZHM6IGFueSxcbiAgICBva1RleHQ/OiBzdHJpbmcsXG4gICAgY2FuY2VsVGV4dD86IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGxldCBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxUV0FQcm9tcHREaWFsb2dDb21wb25lbnQ+O1xuXG4gICAgZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihUV0FQcm9tcHREaWFsb2dDb21wb25lbnQpO1xuXG4gICAgZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLnRpdGxlID0gdGl0bGU7XG4gICAgZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIGRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5tZXNzYWdlSHRtbCA9IHRoaXMuX3Nhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0SHRtbChtZXNzYWdlKTtcbiAgICBkaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UuZmllbGRzID0gZmllbGRzO1xuICAgIGRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5va1RleHQgPSBva1RleHQgfHwgJ0FjZXB0YXInO1xuICAgIGRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5jYW5jZWxUZXh0ID0gY2FuY2VsVGV4dCB8fCAnQ2FuY2VsYXInO1xuXG4gICAgLy8gb25TdWJtaXQgPSBkaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UuZ2V0Rm9ybVN1Ym1pdEV2KCkuc3Vic2NyaWJlKGl0ZW0gPT4ge1xuICAgIC8vICAgICBkaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UucmVzdWx0ID0gaXRlbTtcbiAgICAvLyB9KTtcblxuICAgIHJldHVybiBkaWFsb2dSZWYuYWZ0ZXJDbG9zZWQoKTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbInRzbGliXzEuX192YWx1ZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFTSSx3QkFBMkMsS0FBYTtRQUFiLFVBQUssR0FBTCxLQUFLLENBQVE7S0FBSTs7Ozs7SUFFNUQsaUNBQVE7Ozs7SUFBUixVQUFTLENBQWtCOzs7WUFFakIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLOzs7WUFHWCxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQzs7UUFHaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUU7WUFDcEIsT0FBTztnQkFDSCxLQUFLLEVBQUUsS0FBSzthQUNmLENBQUM7U0FDTDtRQUNELE9BQU8sSUFBSSxDQUFDO0tBQ2Y7O2dCQXZCSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLHlFQUF5RTtvQkFDbkYsU0FBUyxFQUFFO3dCQUNQLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxjQUFjLEdBQUEsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7cUJBQ3pGO2lCQUNKOzs7OzZDQUVpQixTQUFTLFNBQUMsVUFBVTs7SUFpQnRDLHFCQUFD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