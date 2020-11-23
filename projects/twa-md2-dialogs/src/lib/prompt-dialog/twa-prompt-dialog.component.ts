import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SafeHtml } from '@angular/platform-browser';

import { map, startWith } from 'rxjs/operators';

import { MatchValidator } from './match-validator.directive';

export interface ITWAPromptField {
    key: string;
    label: string;
    type: string;
    fxFlex?: string;
    value?: string;
    options?: any[];
    autocomplete?: any;
    rows?: any[];
    validation?: any;
    validationMessages?: any;
}

@Component({
    selector: 'twa-app-prompt-dialog',
    // templateUrl: './twa-prompt-dialog.component.html',
    // styleUrls: ['./twa-prompt-dialog.component.css']
    styles: ['.mat-error { display: block; margin: -15px 0 15px; }'],
    template: `
    <h2>{{ title }}</h2>
    <p [innerHtml]="messageHtml"></p>

    <form novalidate (ngSubmit)="submitForm(form.value)" [formGroup]="form" fxLayout="row wrap" fxLayoutGap="10px">
        <div *ngFor="let prop of fields" fxFlex="{{prop.fxFlex ? prop.fxFlex : '100'}}" fxLayout="column">
        <!-- <div *ngFor="let prop of fields" fxFlex="{{prop.fxFlex ? ('calc(' + prop.fxFlex + ' - 10px)') : '100%'}}" fxLayout="column"> -->
            <div [ngSwitch]="prop.type" fxFlex="100%">
                <div *ngSwitchCase="'text'">
                    <mat-form-field *ngIf="!prop.autocomplete" fxFlex>
                        <input matInput placeholder="{{prop.label}}"
                            [formControlName]="prop.key"
                            [id]="prop.key" [type]="prop.type" fxFlex>
                    </mat-form-field>
                    <div *ngIf="prop.autocomplete" fxFlex>
                        <mat-form-field fxFlex>
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
                <div *ngSwitchCase="'password'">
                    <mat-form-field fxFlex>
                        <input matInput type="password" placeholder="{{prop.label}}"
                            [formControlName]="prop.key"
                            [id]="prop.key" [type]="prop.type" fxFlex>
                    </mat-form-field>
                </div>
                <div *ngSwitchCase="'textarea'">
                    <mat-form-field fxFlex>
                        <textarea matInput placeholder="{{prop.label}}" rows="{{prop.rows||'3'}}" autosize
                            [formControlName]="prop.key"
                            [id]="prop.key" [type]="prop.type"></textarea>
                    </mat-form-field>
                </div>
                <div *ngSwitchCase="'number'">
                    <mat-form-field fxFlex>
                        <input matInput placeholder="{{prop.label}}"
                            [formControlName]="prop.key"
                            [id]="prop.key" [type]="prop.type">
                    </mat-form-field>
                </div>
                <div *ngSwitchCase="'file'">
                    <mat-form-field fxFlex>
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
                <div *ngSwitchCase="'checkbox'">
                    <mat-checkbox
                        [formControlName]="prop.key"
                        [id]="prop.key">
                        {{prop.label}}
                    </mat-checkbox>
                </div>
                <div *ngSwitchCase="'date'">
                    <mat-form-field fxFlex>
                        <input matInput [matDatepicker]=picker placeholder="{{prop.label}}"
                            [formControlName]="prop.key"
                            [id]="prop.key">
                        <mat-datepicker #picker></mat-datepicker>
                        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
                    </mat-form-field>
                </div>
                <div *ngSwitchCase="'time'">
                    <mat-form-field fxFlex>
                        <input matInput [ngxTimepicker]="tpicker" placeholder="{{prop.label}}"
                            [format]="24"
                            [formControlName]="prop.key"
                            [id]="prop.key">
                        <ngx-material-timepicker #tpicker></ngx-material-timepicker>
                    </mat-form-field>
                </div>

                <div *ngSwitchCase="'radio'" fxLayout="column">
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
                    <mat-form-field fxFlex>
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
    </form>

    <button type="button" mat-raised-button
        (click)="send()">{{ okText }}</button>
    <button type="button" mat-button
        (click)="dialogRef.close(false)">{{ cancelText }}</button>

    `
})
export class TWAPromptDialogComponent implements OnInit {

    public form: FormGroup = new FormGroup({});
    formSubmitEv: EventEmitter<any> = new EventEmitter();
    public formData: FormData = new FormData();
    public isMultipart = false;

    public title: string;
    public message: string;
    public messageHtml: SafeHtml;
    public fields: ITWAPromptField[];
    public okText: string;
    public cancelText: string;
    public onSubmit: any;

    constructor(public dialogRef: MatDialogRef<TWAPromptDialogComponent>) {
    }

    ngOnInit() {

        const formGroup = {};
        for (const i in this.fields) {
            if (this.fields.hasOwnProperty(i)) {
                if (this.fields[i].type !== 'file') {
                    formGroup[this.fields[i].key] = new FormControl(
                        this.fields[i].value || '',
                        this.mapValidators(this.fields[i].validation, this.fields[i].key)
                    );
                } else {
                    formGroup[this.fields[i].key] = new FormControl(
                        '',
                        this.mapValidators(this.fields[i].validation, this.fields[i].key)
                    );
                }
                if (typeof this.fields[i].autocomplete !== 'undefined' && this.fields[i].autocomplete !== undefined) {
                    this.fields[i].autocomplete.filteredOptions = this.getFormGroupEvent(formGroup, i);
                }
                if (this.fields[i].type === 'file') {
                    this.isMultipart = true;
                    formGroup[this.fields[i].key + 'Ctrl'] = new FormControl(
                        this.fields[i].value
                    );
                }
            }
        }

        this.form = new FormGroup(formGroup);

    }

    getFormGroupEvent(formGroup, i) {
        return formGroup[this.fields[i].key].valueChanges.pipe(
            startWith(''),
            map(filterValue => filterValue ? this._filterValues(filterValue, this.fields[i].autocomplete.options) :
                this.fields[i].autocomplete.options.slice())
        );
    }

    log(object: any) {
        console.log(object);
    }

    private _filterValues(value, options) {

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
                        } else {
                            console.log('file', i, this.formData.getAll(fields[i].key));
                        }
                    }
                    this.dialogRef.close(this.formData);
                } else {
                    this.dialogRef.close(this.form.value);
                }
            } else {
                    for (const i in this.form.controls) {
                    // console.log(this.form.controls[i]);
                            if (this.form.controls.hasOwnProperty(i)) {
                                    this.form.controls[i].markAsTouched({ onlySelf: true });
                                    this.form.controls[i].updateValueAndValidity();
                            }
                    }
            }
    }

    acClick(field: any, event: any) {
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

    submitForm(form: any) {
            this.formSubmitEv.emit(form);
    }

    drawCustomErrors(prop, error) {
        let ret = false;
        if (typeof prop.validationMessages !== 'undefined') {
            if (typeof prop.validationMessages[error] !== 'undefined') {
                ret = prop.validationMessages[error] > '';
            } else {
                ret = false;
            }
        } else {
            ret = false;
        }
        return ret;
    }

    private mapValidators(validators: any, field) {

        const formValidators = [];

        if (validators) {
            for (const validation of Object.keys(validators)) {
                if (validation === 'required') {
                    formValidators.push(Validators.required);
                } else if (validation === 'match') {
                    formValidators.push(() => {
                        let ret: any | boolean = false;
                        const control = this.form.get(validators[validation]);
                        if (!this.form.get(field)) {
                            ret = null;
                        }
                        ret = !(this.form.get(field) && this.form.get(field).value === control.value);
                        if (!ret) {
                            ret = null;
                        } else {
                            ret = {
                                match: true
                            };
                        }
                        return ret;
                    });
                } else if (validation === 'min') {
                    formValidators.push(Validators.min(validators[validation]));
                } else if (validation === 'max') {
                    formValidators.push(Validators.max(validators[validation]));
                }
            }
        }

        return formValidators;
    }

    addFiles(formElement): void {

        console.log(formElement, this.form.get(formElement));
        const elem = document.getElementById(formElement) as HTMLInputElement;
        elem.click();
        // this.form.get(formElement).nativeElement.click();

    }

    changeFiles(formElement): void {

        this.form.get(formElement.target.id + 'Ctrl').setValue(formElement.target.files[0].name);

        // console.log(formElement);
        // const formData = new FormData();
        this.formData.append(formElement.target.id, formElement.target.files[0]);
        console.log(JSON.stringify(this.formData));
        console.log(this.formData);
        // this.form.get(formElement.target.id).setValue(JSON.stringify(formData));

    }

}
