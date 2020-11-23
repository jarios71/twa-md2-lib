(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/flex-layout'), require('@angular/forms'), require('@angular/material/input'), require('@angular/material/checkbox'), require('@angular/material/select'), require('@angular/material/radio'), require('@angular/material/icon'), require('@angular/material/datepicker'), require('@angular/material/core'), require('@angular/material/autocomplete'), require('@angular/material/dialog'), require('rxjs/operators'), require('@angular/material/button'), require('ngx-material-timepicker'), require('@angular/platform-browser')) :
    typeof define === 'function' && define.amd ? define('twa-md2-dialogs', ['exports', '@angular/core', '@angular/common', '@angular/flex-layout', '@angular/forms', '@angular/material/input', '@angular/material/checkbox', '@angular/material/select', '@angular/material/radio', '@angular/material/icon', '@angular/material/datepicker', '@angular/material/core', '@angular/material/autocomplete', '@angular/material/dialog', 'rxjs/operators', '@angular/material/button', 'ngx-material-timepicker', '@angular/platform-browser'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['twa-md2-dialogs'] = {}, global.ng.core, global.ng.common, global.ng.flexLayout, global.ng.forms, global.ng.material.input, global.ng.material.checkbox, global.ng.material.select, global.ng.material.radio, global.ng.material.icon, global.ng.material.datepicker, global.ng.material.core, global.ng.material.autocomplete, global.ng.material.dialog, global.rxjs.operators, global.ng.material.button, global.ngxMaterialTimepicker, global.ng.platformBrowser));
}(this, (function (exports, i0, common, flexLayout, forms, input, checkbox, select, radio, icon, datepicker, core, autocomplete, i1, operators, button, ngxMaterialTimepicker, i2) { 'use strict';

    var MatchValidator = /** @class */ (function () {
        function MatchValidator(match) {
            this.match = match;
        }
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
        return MatchValidator;
    }());
    MatchValidator.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[tm-match][formControlName],[tm-match][formControl],[tm-match][ngModel]',
                    providers: [
                        { provide: forms.NG_VALIDATORS, useExisting: i0.forwardRef(function () { return MatchValidator; }), multi: true }
                    ]
                },] }
    ];
    MatchValidator.ctorParameters = function () { return [
        { type: String, decorators: [{ type: i0.Attribute, args: ['tm-match',] }] }
    ]; };

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
        return TWADialogsComponent;
    }());
    TWADialogsComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'example-component',
                    template: '{{message}}'
                },] }
    ];

    var TWAConfirmDialogComponent = /** @class */ (function () {
        function TWAConfirmDialogComponent(dialogRef) {
            this.dialogRef = dialogRef;
        }
        return TWAConfirmDialogComponent;
    }());
    TWAConfirmDialogComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'twa-app-confirm-dialog',
                    // templateUrl: './twa-confirm-dialog.component.html',
                    // styleUrls: ['./twa-confirm-dialog.component.css'],
                    template: "\n    <h2>{{ title }}</h2>\n    <p [innerHtml]=\"messageHtml\"></p>\n\n    <button type=\"button\" mat-raised-button\n        (click)=\"dialogRef.close(true)\">{{ okText }}</button>\n    <button type=\"button\" mat-button *ngIf=\"cancelText > ''\"\n        (click)=\"dialogRef.close()\">{{ cancelText }}</button>\n    "
                },] }
    ];
    TWAConfirmDialogComponent.ctorParameters = function () { return [
        { type: i1.MatDialogRef }
    ]; };

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    ;
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    var TWAPromptDialogComponent = /** @class */ (function () {
        function TWAPromptDialogComponent(dialogRef) {
            this.dialogRef = dialogRef;
            this.form = new forms.FormGroup({});
            this.formSubmitEv = new i0.EventEmitter();
            this.formData = new FormData();
            this.isMultipart = false;
        }
        TWAPromptDialogComponent.prototype.ngOnInit = function () {
            var formGroup = {};
            for (var i in this.fields) {
                if (this.fields.hasOwnProperty(i)) {
                    if (this.fields[i].type !== 'file') {
                        formGroup[this.fields[i].key] = new forms.FormControl(this.fields[i].value || '', this.mapValidators(this.fields[i].validation, this.fields[i].key));
                    }
                    else {
                        formGroup[this.fields[i].key] = new forms.FormControl('', this.mapValidators(this.fields[i].validation, this.fields[i].key));
                    }
                    if (typeof this.fields[i].autocomplete !== 'undefined' && this.fields[i].autocomplete !== undefined) {
                        this.fields[i].autocomplete.filteredOptions = this.getFormGroupEvent(formGroup, i);
                    }
                    if (this.fields[i].type === 'file') {
                        this.isMultipart = true;
                        formGroup[this.fields[i].key + 'Ctrl'] = new forms.FormControl(this.fields[i].value);
                    }
                }
            }
            this.form = new forms.FormGroup(formGroup);
        };
        TWAPromptDialogComponent.prototype.getFormGroupEvent = function (formGroup, i) {
            var _this = this;
            return formGroup[this.fields[i].key].valueChanges.pipe(operators.startWith(''), operators.map(function (filterValue) { return filterValue ? _this._filterValues(filterValue, _this.fields[i].autocomplete.options) :
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
                        formValidators.push(forms.Validators.required);
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
        return TWAPromptDialogComponent;
    }());
    TWAPromptDialogComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'twa-app-prompt-dialog',
                    template: "\n    <h2>{{ title }}</h2>\n    <p [innerHtml]=\"messageHtml\"></p>\n\n    <form novalidate (ngSubmit)=\"submitForm(form.value)\" [formGroup]=\"form\" fxLayout=\"row wrap\" fxLayoutGap=\"10px\">\n        <div *ngFor=\"let prop of fields\" fxFlex=\"{{prop.fxFlex ? prop.fxFlex : '100'}}\" fxLayout=\"column\">\n        <!-- <div *ngFor=\"let prop of fields\" fxFlex=\"{{prop.fxFlex ? ('calc(' + prop.fxFlex + ' - 10px)') : '100%'}}\" fxLayout=\"column\"> -->\n            <div [ngSwitch]=\"prop.type\" fxFlex=\"100%\">\n                <div *ngSwitchCase=\"'text'\">\n                    <mat-form-field *ngIf=\"!prop.autocomplete\" fxFlex>\n                        <input matInput placeholder=\"{{prop.label}}\"\n                            [formControlName]=\"prop.key\"\n                            [id]=\"prop.key\" [type]=\"prop.type\" fxFlex>\n                    </mat-form-field>\n                    <div *ngIf=\"prop.autocomplete\" fxFlex>\n                        <mat-form-field fxFlex>\n                            <input matInput placeholder=\"{{prop.label}}\"\n                                [formControlName]=\"prop.key\"\n                                [matAutocomplete]=\"auto\"\n                                (blur)=\"acCheckBlur(prop)\"\n                                [id]=\"prop.key\" [type]=\"prop.type\">\n                        </mat-form-field>\n                        <mat-autocomplete #auto=\"matAutocomplete\"\n                            (optionSelected)=\"acClick(prop, $event)\">\n                            <mat-option *ngFor=\"let option of prop.autocomplete.filteredOptions | async\"\n                                [value]=\"option\">\n                            {{ option }}\n                            </mat-option>\n                        </mat-autocomplete>\n                    </div>\n                </div>\n                <div *ngSwitchCase=\"'password'\">\n                    <mat-form-field fxFlex>\n                        <input matInput type=\"password\" placeholder=\"{{prop.label}}\"\n                            [formControlName]=\"prop.key\"\n                            [id]=\"prop.key\" [type]=\"prop.type\" fxFlex>\n                    </mat-form-field>\n                </div>\n                <div *ngSwitchCase=\"'textarea'\">\n                    <mat-form-field fxFlex>\n                        <textarea matInput placeholder=\"{{prop.label}}\" rows=\"{{prop.rows||'3'}}\" autosize\n                            [formControlName]=\"prop.key\"\n                            [id]=\"prop.key\" [type]=\"prop.type\"></textarea>\n                    </mat-form-field>\n                </div>\n                <div *ngSwitchCase=\"'number'\">\n                    <mat-form-field fxFlex>\n                        <input matInput placeholder=\"{{prop.label}}\"\n                            [formControlName]=\"prop.key\"\n                            [id]=\"prop.key\" [type]=\"prop.type\">\n                    </mat-form-field>\n                </div>\n                <div *ngSwitchCase=\"'file'\">\n                    <mat-form-field fxFlex>\n                        <input type=\"file\"\n                            [formControlName]=\"prop.key\"\n                            [id]=\"prop.key\"\n                            [type]=\"prop.type\"\n                            style=\"display: none\"\n                            (change)=\"changeFiles($event)\" />\n                        <input matInput placeholder=\"{{prop.label}}\"\n                            [formControlName]=\"prop.key + 'Ctrl'\"\n                            [id]=\"prop.key + 'Ctrl'\" type=\"text\"\n                            (click)=\"addFiles(prop.key)\">\n                        <mat-icon matSuffix (click)=\"addFiles(prop.key)\">folder</mat-icon>\n                    </mat-form-field>\n                </div>\n                <div *ngSwitchCase=\"'checkbox'\">\n                    <mat-checkbox\n                        [formControlName]=\"prop.key\"\n                        [id]=\"prop.key\">\n                        {{prop.label}}\n                    </mat-checkbox>\n                </div>\n                <div *ngSwitchCase=\"'date'\">\n                    <mat-form-field fxFlex>\n                        <input matInput [matDatepicker]=picker placeholder=\"{{prop.label}}\"\n                            [formControlName]=\"prop.key\"\n                            [id]=\"prop.key\">\n                        <mat-datepicker #picker></mat-datepicker>\n                        <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n                    </mat-form-field>\n                </div>\n                <div *ngSwitchCase=\"'time'\">\n                    <mat-form-field fxFlex>\n                        <input matInput [ngxTimepicker]=\"tpicker\" placeholder=\"{{prop.label}}\"\n                            [format]=\"24\"\n                            [formControlName]=\"prop.key\"\n                            [id]=\"prop.key\">\n                        <ngx-material-timepicker #tpicker></ngx-material-timepicker>\n                    </mat-form-field>\n                </div>\n\n                <div *ngSwitchCase=\"'radio'\" fxLayout=\"column\">\n                    <div _ngcontent-c20=\"\" style=\"height: 20px;\">\n                        <label _ngcontent-c20=\"\" style=\"transform: translateY(-1.28125em) scale(0.75)\n                                perspective(100px)\n                                translateZ(0.001px);\n                                -ms-transform: translateY(-1.28125em)\n                                scale(0.75);width: 133.33333333%;margin: 20px 0 0 0;font-weight: 100;color: #666;\">\n                            {{prop.label}}\n                        </label>\n                    </div>\n                    <mat-radio-group [formControlName]=\"prop.key\" [name]=\"prop.key\" fxLayout=\"column\" style=\"margin-top: 14px;\">\n                        <mat-radio-button [value]=\"option.value\" *ngFor=\"let option of prop.options\">\n                            {{option.label}}\n                        </mat-radio-button>\n                    </mat-radio-group>\n                </div>\n\n                <div *ngSwitchCase=\"'select'\">\n                    <mat-form-field fxFlex>\n                        <mat-select [formControlName]=\"prop.key\" placeholder=\"{{prop.label}}\">\n                            <mat-option *ngFor=\"let option of prop.options\" [value]=\"option.value\">\n                                {{ option.label }}\n                            </mat-option>\n                        </mat-select>\n                    </mat-form-field>\n                </div>\n            </div>\n            <div class=\"error\" *ngIf=\"form.get(prop.key).errors\" fxFlex=\"100%\">\n            </div>\n            <div class=\"error\" *ngIf=\"form.get(prop.key).invalid && (form.get(prop.key).dirty || form.get(prop.key).touched)\" fxFlex=\"100%\">\n                <mat-error *ngIf=\"form.get(prop.key).errors.required\">\n                    <div *ngIf=\"drawCustomErrors(prop, 'required')\">\n                        {{prop.validationMessages.required}}\n                    </div>\n                    <div *ngIf=\"!prop.validationMessages || !prop.validationMessages.required\">\n                        The field {{ prop.label }} is required.\n                    </div>\n                </mat-error>\n                <mat-error *ngIf=\"form.get(prop.key).errors.match\">\n                    <div *ngIf=\"drawCustomErrors(prop, 'match')\">\n                        {{prop.validationMessages.match}}\n                    </div>\n                    <div *ngIf=\"!prop.validationMessages || !prop.validationMessages.match\">\n                        The fields doesn't match.\n                    </div>\n                </mat-error>\n                <mat-error *ngIf=\"form.get(prop.key).errors.min\">\n                    <div *ngIf=\"drawCustomErrors(prop, 'min')\">\n                        {{prop.validationMessages.min}}\n                    </div>\n                    <div *ngIf=\"!prop.validationMessages || !prop.validationMessages.min\">\n                        The minimal value is {{form.get(prop.key).errors.min.min}}.\n                    </div>\n                </mat-error>\n                <mat-error *ngIf=\"form.get(prop.key).errors.max\">\n                    <div *ngIf=\"drawCustomErrors(prop, 'max')\">\n                        {{prop.validationMessages.max}}\n                    </div>\n                    <div *ngIf=\"!prop.validationMessages || !prop.validationMessages.max\">\n                        The max value is {{form.get(prop.key).errors.max.max}}.\n                    </div>\n                </mat-error>\n            </div>\n        </div>\n    </form>\n\n    <button type=\"button\" mat-raised-button\n        (click)=\"send()\">{{ okText }}</button>\n    <button type=\"button\" mat-button\n        (click)=\"dialogRef.close(false)\">{{ cancelText }}</button>\n\n    ",
                    styles: ['.mat-error { display: block; margin: -15px 0 15px; }']
                },] }
    ];
    TWAPromptDialogComponent.ctorParameters = function () { return [
        { type: i1.MatDialogRef }
    ]; };

    var TWADialogsModule = /** @class */ (function () {
        function TWADialogsModule(dialog, _sanitizer) {
            this.dialog = dialog;
            this._sanitizer = _sanitizer;
        }
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
        return TWADialogsModule;
    }());
    TWADialogsModule.ɵprov = i0.ɵɵdefineInjectable({ factory: function TWADialogsModule_Factory() { return new TWADialogsModule(i0.ɵɵinject(i1.MatDialog), i0.ɵɵinject(i2.DomSanitizer)); }, token: TWADialogsModule, providedIn: "root" });
    TWADialogsModule.decorators = [
        { type: i0.NgModule, args: [{
                    imports: [
                        common.CommonModule,
                        flexLayout.FlexLayoutModule,
                        i1.MatDialogModule,
                        button.MatButtonModule,
                        forms.FormsModule,
                        forms.ReactiveFormsModule,
                        input.MatInputModule,
                        checkbox.MatCheckboxModule,
                        select.MatSelectModule,
                        radio.MatRadioModule,
                        icon.MatIconModule,
                        datepicker.MatDatepickerModule,
                        core.MatNativeDateModule,
                        autocomplete.MatAutocompleteModule,
                        ngxMaterialTimepicker.NgxMaterialTimepickerModule,
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
                    // entryComponents: [TWAConfirmDialogComponent, TWAPromptDialogComponent],
                    providers: [
                        TWADialogsModule,
                        TWAConfirmDialogComponent,
                        TWAPromptDialogComponent
                    ]
                },] },
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    TWADialogsModule.ctorParameters = function () { return [
        { type: i1.MatDialog },
        { type: i2.DomSanitizer }
    ]; };

    /*
     * Public API Surface of twa-md2-dialogs
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.TWAConfirmDialogComponent = TWAConfirmDialogComponent;
    exports.TWADialogsModule = TWADialogsModule;
    exports.TWAPromptDialogComponent = TWAPromptDialogComponent;
    exports.ɵa = TWADialogsComponent;
    exports.ɵb = MatchValidator;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=twa-md2-dialogs.umd.js.map
