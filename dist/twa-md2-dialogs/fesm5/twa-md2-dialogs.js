import { __decorate, __param, __metadata, __values } from 'tslib';
import { Attribute, Directive, forwardRef, Component, EventEmitter, ɵɵdefineInjectable, ɵɵinject, NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NG_VALIDATORS, FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogRef, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { startWith, map } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { DomSanitizer } from '@angular/platform-browser';

var MatchValidator = /** @class */ (function () {
    function MatchValidator(match) {
        this.match = match;
    }
    MatchValidator_1 = MatchValidator;
    MatchValidator.prototype.validate = function (c) {
        // self value (e.g. retype password)
        var v = c.value;
        // control value (e.g. password)
        var e = c.root.get(this.match);
        // value not equal
        if (e && v !== e.value) {
            return {
                match: false
            };
        }
        return null;
    };
    var MatchValidator_1;
    MatchValidator.ctorParameters = function () { return [
        { type: String, decorators: [{ type: Attribute, args: ['tm-match',] }] }
    ]; };
    MatchValidator = MatchValidator_1 = __decorate([
        Directive({
            selector: '[tm-match][formControlName],[tm-match][formControl],[tm-match][ngModel]',
            providers: [
                { provide: NG_VALIDATORS, useExisting: forwardRef(function () { return MatchValidator_1; }), multi: true }
            ]
        }),
        __param(0, Attribute('tm-match')),
        __metadata("design:paramtypes", [String])
    ], MatchValidator);
    return MatchValidator;
}());

var TWADialogsComponent = /** @class */ (function () {
    function TWADialogsComponent() {
        this.message = 'Hello';
    }
    TWADialogsComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.message += ' World';
        }, 1000);
    };
    TWADialogsComponent = __decorate([
        Component({
            selector: 'example-component',
            template: '{{message}}'
        })
    ], TWADialogsComponent);
    return TWADialogsComponent;
}());

var TWAConfirmDialogComponent = /** @class */ (function () {
    function TWAConfirmDialogComponent(dialogRef) {
        this.dialogRef = dialogRef;
    }
    TWAConfirmDialogComponent.ctorParameters = function () { return [
        { type: MatDialogRef }
    ]; };
    TWAConfirmDialogComponent = __decorate([
        Component({
            selector: 'twa-app-confirm-dialog',
            // templateUrl: './twa-confirm-dialog.component.html',
            // styleUrls: ['./twa-confirm-dialog.component.css'],
            template: "\n    <h2>{{ title }}</h2>\n    <p [innerHtml]=\"messageHtml\"></p>\n\n    <button type=\"button\" mat-raised-button\n        (click)=\"dialogRef.close(true)\">{{ okText }}</button>\n    <button type=\"button\" mat-button *ngIf=\"cancelText > ''\"\n        (click)=\"dialogRef.close()\">{{ cancelText }}</button>\n    "
        }),
        __metadata("design:paramtypes", [MatDialogRef])
    ], TWAConfirmDialogComponent);
    return TWAConfirmDialogComponent;
}());

var TWAPromptDialogComponent = /** @class */ (function () {
    function TWAPromptDialogComponent(dialogRef) {
        this.dialogRef = dialogRef;
        this.form = new FormGroup({});
        this.formSubmitEv = new EventEmitter();
        this.formData = new FormData();
        this.isMultipart = false;
    }
    TWAPromptDialogComponent.prototype.ngOnInit = function () {
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
    TWAPromptDialogComponent.prototype.getFormGroupEvent = function (formGroup, i) {
        var _this = this;
        return formGroup[this.fields[i].key].valueChanges.pipe(startWith(''), map(function (filterValue) { return filterValue ? _this._filterValues(filterValue, _this.fields[i].autocomplete.options) :
            _this.fields[i].autocomplete.options.slice(); }));
    };
    TWAPromptDialogComponent.prototype.log = function (object) {
        console.log(object);
    };
    TWAPromptDialogComponent.prototype._filterValues = function (value, options) {
        var filteredValue = value.toLowerCase();
        return options.filter(function (option) { return option.toLowerCase().indexOf(filteredValue) >= 0; });
    };
    TWAPromptDialogComponent.prototype.getFormSubmitEv = function () {
        return this.formSubmitEv;
    };
    TWAPromptDialogComponent.prototype.send = function () {
        // let i;
        this.form.updateValueAndValidity();
        if (this.form.status !== 'INVALID') {
            console.log(this.form.controls);
            console.log(this.form.value);
            if (this.isMultipart) {
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
                this.dialogRef.close(this.formData);
            }
            else {
                this.dialogRef.close(this.form.value);
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
    TWAPromptDialogComponent.prototype.acClick = function (field, event) {
        // console.log(event);
        // console.log(field.autocomplete);
        if (typeof field.autocomplete !== 'undefined') {
            if (typeof field.autocomplete.forceSelect !== 'undefined' &&
                field.autocomplete.forceSelect) {
                field.autocomplete.selected = event.option.value;
            }
        }
    };
    TWAPromptDialogComponent.prototype.acCheckBlur = function (field) {
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
    TWAPromptDialogComponent.prototype.submitForm = function (form) {
        this.formSubmitEv.emit(form);
    };
    TWAPromptDialogComponent.prototype.drawCustomErrors = function (prop, error) {
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
    TWAPromptDialogComponent.prototype.mapValidators = function (validators, field) {
        var e_1, _a;
        var _this = this;
        var formValidators = [];
        if (validators) {
            var _loop_1 = function (validation) {
                if (validation === 'required') {
                    formValidators.push(Validators.required);
                }
                else if (validation === 'match') {
                    formValidators.push(function () {
                        var ret = false;
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
    TWAPromptDialogComponent.prototype.addFiles = function (formElement) {
        console.log(formElement, this.form.get(formElement));
        var elem = document.getElementById(formElement);
        elem.click();
        // this.form.get(formElement).nativeElement.click();
    };
    TWAPromptDialogComponent.prototype.changeFiles = function (formElement) {
        this.form.get(formElement.target.id + 'Ctrl').setValue(formElement.target.files[0].name);
        // console.log(formElement);
        // const formData = new FormData();
        this.formData.append(formElement.target.id, formElement.target.files[0]);
        console.log(JSON.stringify(this.formData));
        console.log(this.formData);
        // this.form.get(formElement.target.id).setValue(JSON.stringify(formData));
    };
    TWAPromptDialogComponent.ctorParameters = function () { return [
        { type: MatDialogRef }
    ]; };
    TWAPromptDialogComponent = __decorate([
        Component({
            selector: 'twa-app-prompt-dialog',
            template: "\n    <h2>{{ title }}</h2>\n    <p [innerHtml]=\"messageHtml\"></p>\n\n    <form novalidate (ngSubmit)=\"submitForm(form.value)\" [formGroup]=\"form\" fxLayout=\"row wrap\" fxLayoutGap=\"10px\">\n        <div *ngFor=\"let prop of fields\" fxFlex=\"{{prop.fxFlex ? prop.fxFlex : '100'}}\" fxLayout=\"column\">\n        <!-- <div *ngFor=\"let prop of fields\" fxFlex=\"{{prop.fxFlex ? ('calc(' + prop.fxFlex + ' - 10px)') : '100%'}}\" fxLayout=\"column\"> -->\n            <div [ngSwitch]=\"prop.type\" fxFlex=\"100%\">\n                <div *ngSwitchCase=\"'text'\">\n                    <mat-form-field *ngIf=\"!prop.autocomplete\" fxFlex>\n                        <input matInput placeholder=\"{{prop.label}}\"\n                            [formControlName]=\"prop.key\"\n                            [id]=\"prop.key\" [type]=\"prop.type\" fxFlex>\n                    </mat-form-field>\n                    <div *ngIf=\"prop.autocomplete\" fxFlex>\n                        <mat-form-field fxFlex>\n                            <input matInput placeholder=\"{{prop.label}}\"\n                                [formControlName]=\"prop.key\"\n                                [matAutocomplete]=\"auto\"\n                                (blur)=\"acCheckBlur(prop)\"\n                                [id]=\"prop.key\" [type]=\"prop.type\">\n                        </mat-form-field>\n                        <mat-autocomplete #auto=\"matAutocomplete\"\n                            (optionSelected)=\"acClick(prop, $event)\">\n                            <mat-option *ngFor=\"let option of prop.autocomplete.filteredOptions | async\"\n                                [value]=\"option\">\n                            {{ option }}\n                            </mat-option>\n                        </mat-autocomplete>\n                    </div>\n                </div>\n                <div *ngSwitchCase=\"'password'\">\n                    <mat-form-field fxFlex>\n                        <input matInput type=\"password\" placeholder=\"{{prop.label}}\"\n                            [formControlName]=\"prop.key\"\n                            [id]=\"prop.key\" [type]=\"prop.type\" fxFlex>\n                    </mat-form-field>\n                </div>\n                <div *ngSwitchCase=\"'textarea'\">\n                    <mat-form-field fxFlex>\n                        <textarea matInput placeholder=\"{{prop.label}}\" rows=\"{{prop.rows||'3'}}\" autosize\n                            [formControlName]=\"prop.key\"\n                            [id]=\"prop.key\" [type]=\"prop.type\"></textarea>\n                    </mat-form-field>\n                </div>\n                <div *ngSwitchCase=\"'number'\">\n                    <mat-form-field fxFlex>\n                        <input matInput placeholder=\"{{prop.label}}\"\n                            [formControlName]=\"prop.key\"\n                            [id]=\"prop.key\" [type]=\"prop.type\">\n                    </mat-form-field>\n                </div>\n                <div *ngSwitchCase=\"'file'\">\n                    <mat-form-field fxFlex>\n                        <input type=\"file\"\n                            [formControlName]=\"prop.key\"\n                            [id]=\"prop.key\"\n                            [type]=\"prop.type\"\n                            style=\"display: none\"\n                            (change)=\"changeFiles($event)\" />\n                        <input matInput placeholder=\"{{prop.label}}\"\n                            [formControlName]=\"prop.key + 'Ctrl'\"\n                            [id]=\"prop.key + 'Ctrl'\" type=\"text\"\n                            (click)=\"addFiles(prop.key)\">\n                        <mat-icon matSuffix (click)=\"addFiles(prop.key)\">folder</mat-icon>\n                    </mat-form-field>\n                </div>\n                <div *ngSwitchCase=\"'checkbox'\">\n                    <mat-checkbox\n                        [formControlName]=\"prop.key\"\n                        [id]=\"prop.key\">\n                        {{prop.label}}\n                    </mat-checkbox>\n                </div>\n                <div *ngSwitchCase=\"'date'\">\n                    <mat-form-field fxFlex>\n                        <input matInput [matDatepicker]=picker placeholder=\"{{prop.label}}\"\n                            [formControlName]=\"prop.key\"\n                            [id]=\"prop.key\">\n                        <mat-datepicker #picker></mat-datepicker>\n                        <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n                    </mat-form-field>\n                </div>\n                <div *ngSwitchCase=\"'time'\">\n                    <mat-form-field fxFlex>\n                        <input matInput [ngxTimepicker]=\"tpicker\" placeholder=\"{{prop.label}}\"\n                            [format]=\"24\"\n                            [formControlName]=\"prop.key\"\n                            [id]=\"prop.key\">\n                        <ngx-material-timepicker #tpicker></ngx-material-timepicker>\n                    </mat-form-field>\n                </div>\n\n                <div *ngSwitchCase=\"'radio'\" fxLayout=\"column\">\n                    <div _ngcontent-c20=\"\" style=\"height: 20px;\">\n                        <label _ngcontent-c20=\"\" style=\"transform: translateY(-1.28125em) scale(0.75)\n                                perspective(100px)\n                                translateZ(0.001px);\n                                -ms-transform: translateY(-1.28125em)\n                                scale(0.75);width: 133.33333333%;margin: 20px 0 0 0;font-weight: 100;color: #666;\">\n                            {{prop.label}}\n                        </label>\n                    </div>\n                    <mat-radio-group [formControlName]=\"prop.key\" [name]=\"prop.key\" fxLayout=\"column\" style=\"margin-top: 14px;\">\n                        <mat-radio-button [value]=\"option.value\" *ngFor=\"let option of prop.options\">\n                            {{option.label}}\n                        </mat-radio-button>\n                    </mat-radio-group>\n                </div>\n\n                <div *ngSwitchCase=\"'select'\">\n                    <mat-form-field fxFlex>\n                        <mat-select [formControlName]=\"prop.key\" placeholder=\"{{prop.label}}\">\n                            <mat-option *ngFor=\"let option of prop.options\" [value]=\"option.value\">\n                                {{ option.label }}\n                            </mat-option>\n                        </mat-select>\n                    </mat-form-field>\n                </div>\n            </div>\n            <div class=\"error\" *ngIf=\"form.get(prop.key).errors\" fxFlex=\"100%\">\n            </div>\n            <div class=\"error\" *ngIf=\"form.get(prop.key).invalid && (form.get(prop.key).dirty || form.get(prop.key).touched)\" fxFlex=\"100%\">\n                <mat-error *ngIf=\"form.get(prop.key).errors.required\">\n                    <div *ngIf=\"drawCustomErrors(prop, 'required')\">\n                        {{prop.validationMessages.required}}\n                    </div>\n                    <div *ngIf=\"!prop.validationMessages || !prop.validationMessages.required\">\n                        The field {{ prop.label }} is required.\n                    </div>\n                </mat-error>\n                <mat-error *ngIf=\"form.get(prop.key).errors.match\">\n                    <div *ngIf=\"drawCustomErrors(prop, 'match')\">\n                        {{prop.validationMessages.match}}\n                    </div>\n                    <div *ngIf=\"!prop.validationMessages || !prop.validationMessages.match\">\n                        The fields doesn't match.\n                    </div>\n                </mat-error>\n                <mat-error *ngIf=\"form.get(prop.key).errors.min\">\n                    <div *ngIf=\"drawCustomErrors(prop, 'min')\">\n                        {{prop.validationMessages.min}}\n                    </div>\n                    <div *ngIf=\"!prop.validationMessages || !prop.validationMessages.min\">\n                        The minimal value is {{form.get(prop.key).errors.min.min}}.\n                    </div>\n                </mat-error>\n                <mat-error *ngIf=\"form.get(prop.key).errors.max\">\n                    <div *ngIf=\"drawCustomErrors(prop, 'max')\">\n                        {{prop.validationMessages.max}}\n                    </div>\n                    <div *ngIf=\"!prop.validationMessages || !prop.validationMessages.max\">\n                        The max value is {{form.get(prop.key).errors.max.max}}.\n                    </div>\n                </mat-error>\n            </div>\n        </div>\n    </form>\n\n    <button type=\"button\" mat-raised-button\n        (click)=\"send()\">{{ okText }}</button>\n    <button type=\"button\" mat-button\n        (click)=\"dialogRef.close(false)\">{{ cancelText }}</button>\n\n    ",
            styles: ['.mat-error { display: block; margin: -15px 0 15px; }']
        }),
        __metadata("design:paramtypes", [MatDialogRef])
    ], TWAPromptDialogComponent);
    return TWAPromptDialogComponent;
}());

var TWADialogsModule = /** @class */ (function () {
    function TWADialogsModule(dialog, _sanitizer) {
        this.dialog = dialog;
        this._sanitizer = _sanitizer;
    }
    TWADialogsModule_1 = TWADialogsModule;
    TWADialogsModule.prototype.confirm = function (title, message, okText, cancelText) {
        var dialogRef;
        dialogRef = this.dialog.open(TWAConfirmDialogComponent);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;
        dialogRef.componentInstance.messageHtml = this._sanitizer.bypassSecurityTrustHtml(message);
        dialogRef.componentInstance.okText = okText || 'Aceptar';
        dialogRef.componentInstance.cancelText = cancelText || '';
        return dialogRef.afterClosed();
    };
    TWADialogsModule.prototype.prompt = function (title, message, fields, okText, cancelText) {
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
    var TWADialogsModule_1;
    TWADialogsModule.ctorParameters = function () { return [
        { type: MatDialog },
        { type: DomSanitizer }
    ]; };
    TWADialogsModule.ɵprov = ɵɵdefineInjectable({ factory: function TWADialogsModule_Factory() { return new TWADialogsModule(ɵɵinject(MatDialog), ɵɵinject(DomSanitizer)); }, token: TWADialogsModule, providedIn: "root" });
    TWADialogsModule = TWADialogsModule_1 = __decorate([
        NgModule({
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
                MatIconModule,
                MatDatepickerModule,
                MatNativeDateModule,
                MatAutocompleteModule,
                NgxMaterialTimepickerModule,
            ],
            declarations: [
                // TWADialogsModule,
                TWADialogsComponent,
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
                TWADialogsModule_1,
                TWAConfirmDialogComponent,
                TWAPromptDialogComponent
            ]
        }),
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [MatDialog,
            DomSanitizer])
    ], TWADialogsModule);
    return TWADialogsModule;
}());

/*
 * Public API Surface of twa-md2-dialogs
 */

/**
 * Generated bundle index. Do not edit.
 */

export { TWAConfirmDialogComponent, TWADialogsModule, TWAPromptDialogComponent, TWADialogsComponent as ɵa, MatchValidator as ɵb };
//# sourceMappingURL=twa-md2-dialogs.js.map
