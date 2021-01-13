import { ɵɵdefineInjectable, Injectable, EventEmitter, Component, Input, Output, NgModule } from '@angular/core';
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
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

class TwaMd2DynformsService {
    constructor() { }
}
TwaMd2DynformsService.ɵprov = ɵɵdefineInjectable({ factory: function TwaMd2DynformsService_Factory() { return new TwaMd2DynformsService(); }, token: TwaMd2DynformsService, providedIn: "root" });
TwaMd2DynformsService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
TwaMd2DynformsService.ctorParameters = () => [];

class TWAMd2DynformsComponent {
    constructor() {
        this.form = new FormGroup({});
        this.formSubmitEv = new EventEmitter();
        this.formData = new FormData();
        this.isMultipart = false;
        this.submit = this.formSubmitEv;
    }
    ngOnInit() {
        // this.createForm();
    }
    ngOnChanges() {
        this.createForm();
    }
    createForm() {
        const formGroup = {};
        for (const i in this.fields) {
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
    }
    getFormGroupEvent(formGroup, i) {
        return formGroup[this.fields[i].key].valueChanges.pipe(startWith(''), map(filterValue => filterValue ? this._filterValues(filterValue, this.fields[i].autocomplete.options) :
            this.fields[i].autocomplete.options.slice()));
    }
    log(object) {
        console.log(object);
    }
    _filterValues(value, options) {
        const filteredValue = value.toLowerCase();
        return options.filter(option => option.toLowerCase().indexOf(filteredValue) >= 0);
    }
    getFormSubmitEv() {
        return this.formSubmitEv;
    }
    send() {
        // let i;
        this.form.updateValueAndValidity();
        if (this.form.status !== 'INVALID') {
            console.log(this.form.controls);
            console.log(this.form.value);
            if (this.isMultipart) {
                const fields = this.fields;
                for (const i in fields) {
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
            for (const i in this.form.controls) {
                // console.log(this.form.controls[i]);
                if (this.form.controls.hasOwnProperty(i)) {
                    this.form.controls[i].markAsTouched({ onlySelf: true });
                    this.form.controls[i].updateValueAndValidity();
                }
            }
        }
    }
    acClick(field, event) {
        // console.log(event);
        // console.log(field.autocomplete);
        if (typeof field.autocomplete !== 'undefined') {
            if (typeof field.autocomplete.forceSelect !== 'undefined' &&
                field.autocomplete.forceSelect) {
                field.autocomplete.selected = event.option.value;
            }
        }
    }
    acCheckBlur(field) {
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
    }
    submitForm(form) {
        this.formSubmitEv.emit(form);
    }
    drawCustomErrors(prop, error) {
        let ret = false;
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
    }
    mapValidators(validators, field) {
        const formValidators = [];
        if (validators) {
            for (const validation of Object.keys(validators)) {
                if (validation === 'required') {
                    formValidators.push(Validators.required);
                }
                else if (validation === 'match') {
                    formValidators.push(() => {
                        let ret = false;
                        const control = this.form.get(validators[validation]);
                        if (!this.form.get(field)) {
                            ret = null;
                        }
                        ret = !(this.form.get(field) && this.form.get(field).value === control.value);
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
            }
        }
        return formValidators;
    }
    addFiles(formElement) {
        console.log(formElement, this.form.get(formElement));
        const elem = document.getElementById(formElement);
        elem.click();
        // this.form.get(formElement).nativeElement.click();
    }
    changeFiles(formElement) {
        this.form.get(formElement.target.id + 'Ctrl').setValue(formElement.target.files[0].name);
        // console.log(formElement);
        // const formData = new FormData();
        this.formData.append(formElement.target.id, formElement.target.files[0]);
        console.log(JSON.stringify(this.formData));
        console.log(this.formData);
        // this.form.get(formElement.target.id).setValue(JSON.stringify(formData));
    }
}
TWAMd2DynformsComponent.decorators = [
    { type: Component, args: [{
                selector: 'twa-md2-dynforms',
                template: `
    <h2 *ngIf="title && title > ''">{{ title }}</h2>
    <p *ngIf="message && message > ''" [innerHtml]="messageHtml"></p>

    <form novalidate (ngSubmit)="submitForm(form.value)" [formGroup]="form" fxLayout="row wrap" fxLayoutGap="10px">
      <div *ngFor="let prop of fields" fxFlex="{{(prop.fxFlex != 'false') ? ('calc(' + prop.fxFlex + ' - 10px)') : ((prop.fxFlex == 'false') ? '0 0 0' : '100%')}}" fxLayout="column">
        <div [ngSwitch]="prop.type" fxFlex="100%">
          <div *ngSwitchCase="'text'">
            <mat-form-field class="dynform-field-{{prop.key}}" *ngIf="!prop.autocomplete" fxFlex>
              <input matInput placeholder="{{prop.label}}"
                [formControlName]="prop.key"
                [id]="prop.key" [type]="prop.type" fxFlex>
            </mat-form-field>
            <div *ngIf="prop.autocomplete" fxFlex>
              <mat-form-field class="dynform-field-{{prop.key}}" fxFlex>
                <input matInput placeholder="{{prop.label}}"
                  [formControlName]="prop.key"
                  [matAutocomplete]="auto"
                  (blur)="acCheckBlur(prop)"
                  [id]="prop.key" [type]="prop.type">
              </mat-form-field>
              <mat-autocomplete #auto="matAutocomplete"
                (optionSelected)="acClick(prop, $event)">
                <mat-option *ngFor="let option of prop.autocomplete.filteredOptions | async"
                  [value]="option">
                {{ option }}
                </mat-option>
              </mat-autocomplete>
            </div>
          </div>
          <div *ngSwitchCase="'h4'">
            <h4>{{prop.label}}</h4>
          </div>
            <div *ngSwitchCase="'password'">
              <mat-form-field class="dynform-field-{{prop.key}}" fxFlex>
                <input matInput type="password" placeholder="{{prop.label}}"
                  [formControlName]="prop.key"
                  [id]="prop.key" [type]="prop.type" fxFlex>
              </mat-form-field>
            </div>
            <div *ngSwitchCase="'textarea'">
              <mat-form-field class="dynform-field-{{prop.key}}" fxFlex>
                <textarea matInput placeholder="{{prop.label}}" rows="{{prop.rows||'3'}}" autosize
                  [formControlName]="prop.key"
                  [id]="prop.key" [type]="prop.type"></textarea>
              </mat-form-field>
            </div>
            <div *ngSwitchCase="'number'">
              <mat-form-field class="dynform-field-{{prop.key}}" fxFlex>
                <input matInput placeholder="{{prop.label}}"
                  [formControlName]="prop.key"
                  [id]="prop.key" [type]="prop.type">
              </mat-form-field>
            </div>
            <div *ngSwitchCase="'file'">
              <mat-form-field class="dynform-field-{{prop.key}}" fxFlex>
                <input type="file"
                  [formControlName]="prop.key"
                  [id]="prop.key"
                  [type]="prop.type"
                  style="display: none"
                  (change)="changeFiles($event)" />
                <input matInput placeholder="{{prop.label}}"
                  [formControlName]="prop.key + 'Ctrl'"
                  [id]="prop.key + 'Ctrl'" type="text"
                  (click)="addFiles(prop.key)">
                <mat-icon matSuffix (click)="addFiles(prop.key)">folder</mat-icon>
              </mat-form-field>
            </div>
            <div *ngSwitchCase="'checkbox'" class="dynform-field-{{prop.key}}">
              <mat-checkbox
                [formControlName]="prop.key"
                [id]="prop.key">
                {{prop.label}}
              </mat-checkbox>
            </div>
            <div *ngSwitchCase="'date'">
              <mat-form-field class="dynform-field-{{prop.key}}" fxFlex>
                <input matInput [matDatepicker]=picker placeholder="{{prop.label}}"
                  [formControlName]="prop.key"
                  [id]="prop.key">
                <mat-datepicker #picker></mat-datepicker>
                <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
              </mat-form-field>
            </div>
            <div *ngSwitchCase="'time'">
              <mat-form-field class="dynform-field-{{prop.key}}" fxFlex>
                <input matInput [ngxTimepicker]="tpicker" placeholder="{{prop.label}}"
                  [format]="24"
                  [formControlName]="prop.key"
                  [id]="prop.key">
                <ngx-material-timepicker #tpicker></ngx-material-timepicker>
              </mat-form-field>
            </div>

            <div *ngSwitchCase="'radio'" fxLayout="column" class="dynform-field-{{prop.key}}">
              <div _ngcontent-c20="" style="height: 20px;">
                <label _ngcontent-c20="" style="transform: translateY(-1.28125em) scale(0.75)
                    perspective(100px)
                    translateZ(0.001px);
                    -ms-transform: translateY(-1.28125em)
                    scale(0.75);width: 133.33333333%;margin: 20px 0 0 0;font-weight: 100;color: #666;">
                  {{prop.label}}
                </label>
              </div>
              <mat-radio-group [formControlName]="prop.key" [name]="prop.key" fxLayout="column" style="margin-top: 14px;">
                <mat-radio-button [value]="option.value" *ngFor="let option of prop.options">
                  {{option.label}}
                </mat-radio-button>
              </mat-radio-group>
            </div>

            <div *ngSwitchCase="'select'">
              <mat-form-field class="dynform-field-{{prop.key}}" fxFlex>
                <mat-select [formControlName]="prop.key" placeholder="{{prop.label}}">
                  <mat-option *ngFor="let option of prop.options" [value]="option.value">
                    {{ option.label }}
                  </mat-option>
                </mat-select>
              </mat-form-field>
            </div>
        </div>
        <div class="error" *ngIf="form.get(prop.key).errors" fxFlex="100%">
        </div>
        <div class="error" *ngIf="form.get(prop.key).invalid && (form.get(prop.key).dirty || form.get(prop.key).touched)" fxFlex="100%">
          <mat-error *ngIf="form.get(prop.key).errors.required">
            <div *ngIf="drawCustomErrors(prop, 'required')">
              {{prop.validationMessages.required}}
            </div>
            <div *ngIf="!prop.validationMessages || !prop.validationMessages.required">
              The field {{ prop.label }} is required.
            </div>
          </mat-error>
          <mat-error *ngIf="form.get(prop.key).errors.match">
            <div *ngIf="drawCustomErrors(prop, 'match')">
              {{prop.validationMessages.match}}
            </div>
            <div *ngIf="!prop.validationMessages || !prop.validationMessages.match">
              The fields doesn't match.
            </div>
          </mat-error>
          <mat-error *ngIf="form.get(prop.key).errors.min">
            <div *ngIf="drawCustomErrors(prop, 'min')">
              {{prop.validationMessages.min}}
            </div>
            <div *ngIf="!prop.validationMessages || !prop.validationMessages.min">
              The minimal value is {{form.get(prop.key).errors.min.min}}.
            </div>
          </mat-error>
          <mat-error *ngIf="form.get(prop.key).errors.max">
            <div *ngIf="drawCustomErrors(prop, 'max')">
              {{prop.validationMessages.max}}
            </div>
            <div *ngIf="!prop.validationMessages || !prop.validationMessages.max">
              The max value is {{form.get(prop.key).errors.max.max}}.
            </div>
          </mat-error>
        </div>
      </div>
      <div fxFlex></div>
    </form>

    <!-- <button type="button" mat-raised-button
      (click)="send()">{{ okText }}</button>
    <button type="button" mat-button
      (click)="dialogRef.close(false)">{{ cancelText }}</button> -->
  `
            },] }
];
TWAMd2DynformsComponent.ctorParameters = () => [];
TWAMd2DynformsComponent.propDecorators = {
    fields: [{ type: Input }],
    submit: [{ type: Output }]
};

class TWAMd2DynformsModule {
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
            },] }
];

/*
 * Public API Surface of twa-md2-dynforms
 */

/**
 * Generated bundle index. Do not edit.
 */

export { TWAMd2DynformsComponent, TWAMd2DynformsModule, TwaMd2DynformsService };
//# sourceMappingURL=twa-md2-dynforms.js.map
