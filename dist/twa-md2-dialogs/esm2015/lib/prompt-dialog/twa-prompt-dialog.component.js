import { Component, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
export class TWAPromptDialogComponent {
    constructor(dialogRef) {
        this.dialogRef = dialogRef;
        this.form = new FormGroup({});
        this.formSubmitEv = new EventEmitter();
        this.formData = new FormData();
        this.isMultipart = false;
    }
    ngOnInit() {
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
                this.dialogRef.close(this.formData);
            }
            else {
                this.dialogRef.close(this.form.value);
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
TWAPromptDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'twa-app-prompt-dialog',
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

    `,
                styles: ['.mat-error { display: block; margin: -15px 0 15px; }']
            },] }
];
TWAPromptDialogComponent.ctorParameters = () => [
    { type: MatDialogRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdhLXByb21wdC1kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lLm9sZC9qb3NlL3dvcmsvc2lyYS5lcy9zaXJhLW5nMi1jb21wb25lbnRzL2xpYi10d2EtbWQvcHJvamVjdHMvdHdhLW1kMi1kaWFsb2dzL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9wcm9tcHQtZGlhbG9nL3R3YS1wcm9tcHQtZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNoRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHcEUsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQTRMaEQsTUFBTSxPQUFPLHdCQUF3QjtJQWVqQyxZQUFtQixTQUFpRDtRQUFqRCxjQUFTLEdBQVQsU0FBUyxDQUF3QztRQWI3RCxTQUFJLEdBQWMsSUFBSSxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDM0MsaUJBQVksR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM5QyxhQUFRLEdBQWEsSUFBSSxRQUFRLEVBQUUsQ0FBQztRQUNwQyxnQkFBVyxHQUFHLEtBQUssQ0FBQztJQVczQixDQUFDO0lBRUQsUUFBUTtRQUVKLE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNyQixLQUFLLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDekIsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDL0IsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUU7b0JBQ2hDLFNBQVMs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dXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdERpYWxvZ1JlZiB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCwgRm9ybUdyb3VwLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgU2FmZUh0bWwgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuaW1wb3J0IHsgbWFwLCBzdGFydFdpdGggfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE1hdGNoVmFsaWRhdG9yIH0gZnJvbSAnLi9tYXRjaC12YWxpZGF0b3IuZGlyZWN0aXZlJztcblxuZXhwb3J0IGludGVyZmFjZSBJVFdBUHJvbXB0RmllbGQge1xuICAgIGtleTogc3RyaW5nO1xuICAgIGxhYmVsOiBzdHJpbmc7XG4gICAgdHlwZTogc3RyaW5nO1xuICAgIGZ4RmxleD86IHN0cmluZztcbiAgICB2YWx1ZT86IHN0cmluZztcbiAgICBvcHRpb25zPzogYW55W107XG4gICAgYXV0b2NvbXBsZXRlPzogYW55O1xuICAgIHJvd3M/OiBhbnlbXTtcbiAgICB2YWxpZGF0aW9uPzogYW55O1xuICAgIHZhbGlkYXRpb25NZXNzYWdlcz86IGFueTtcbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd0d2EtYXBwLXByb21wdC1kaWFsb2cnLFxuICAgIC8vIHRlbXBsYXRlVXJsOiAnLi90d2EtcHJvbXB0LWRpYWxvZy5jb21wb25lbnQuaHRtbCcsXG4gICAgLy8gc3R5bGVVcmxzOiBbJy4vdHdhLXByb21wdC1kaWFsb2cuY29tcG9uZW50LmNzcyddXG4gICAgc3R5bGVzOiBbJy5tYXQtZXJyb3IgeyBkaXNwbGF5OiBibG9jazsgbWFyZ2luOiAtMTVweCAwIDE1cHg7IH0nXSxcbiAgICB0ZW1wbGF0ZTogYFxuICAgIDxoMj57eyB0aXRsZSB9fTwvaDI+XG4gICAgPHAgW2lubmVySHRtbF09XCJtZXNzYWdlSHRtbFwiPjwvcD5cblxuICAgIDxmb3JtIG5vdmFsaWRhdGUgKG5nU3VibWl0KT1cInN1Ym1pdEZvcm0oZm9ybS52YWx1ZSlcIiBbZm9ybUdyb3VwXT1cImZvcm1cIiBmeExheW91dD1cInJvdyB3cmFwXCIgZnhMYXlvdXRHYXA9XCIxMHB4XCI+XG4gICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IHByb3Agb2YgZmllbGRzXCIgZnhGbGV4PVwie3twcm9wLmZ4RmxleCA/IHByb3AuZnhGbGV4IDogJzEwMCd9fVwiIGZ4TGF5b3V0PVwiY29sdW1uXCI+XG4gICAgICAgIDwhLS0gPGRpdiAqbmdGb3I9XCJsZXQgcHJvcCBvZiBmaWVsZHNcIiBmeEZsZXg9XCJ7e3Byb3AuZnhGbGV4ID8gKCdjYWxjKCcgKyBwcm9wLmZ4RmxleCArICcgLSAxMHB4KScpIDogJzEwMCUnfX1cIiBmeExheW91dD1cImNvbHVtblwiPiAtLT5cbiAgICAgICAgICAgIDxkaXYgW25nU3dpdGNoXT1cInByb3AudHlwZVwiIGZ4RmxleD1cIjEwMCVcIj5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCIndGV4dCdcIj5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkICpuZ0lmPVwiIXByb3AuYXV0b2NvbXBsZXRlXCIgZnhGbGV4PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IG1hdElucHV0IHBsYWNlaG9sZGVyPVwie3twcm9wLmxhYmVsfX1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwicHJvcC5rZXlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpZF09XCJwcm9wLmtleVwiIFt0eXBlXT1cInByb3AudHlwZVwiIGZ4RmxleD5cbiAgICAgICAgICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cInByb3AuYXV0b2NvbXBsZXRlXCIgZnhGbGV4PlxuICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkIGZ4RmxleD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgcGxhY2Vob2xkZXI9XCJ7e3Byb3AubGFiZWx9fVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwicHJvcC5rZXlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbWF0QXV0b2NvbXBsZXRlXT1cImF1dG9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoYmx1cik9XCJhY0NoZWNrQmx1cihwcm9wKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpZF09XCJwcm9wLmtleVwiIFt0eXBlXT1cInByb3AudHlwZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxtYXQtYXV0b2NvbXBsZXRlICNhdXRvPVwibWF0QXV0b2NvbXBsZXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAob3B0aW9uU2VsZWN0ZWQpPVwiYWNDbGljayhwcm9wLCAkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1vcHRpb24gKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBwcm9wLmF1dG9jb21wbGV0ZS5maWx0ZXJlZE9wdGlvbnMgfCBhc3luY1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt2YWx1ZV09XCJvcHRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBvcHRpb24gfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L21hdC1vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L21hdC1hdXRvY29tcGxldGU+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIidwYXNzd29yZCdcIj5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkIGZ4RmxleD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBtYXRJbnB1dCB0eXBlPVwicGFzc3dvcmRcIiBwbGFjZWhvbGRlcj1cInt7cHJvcC5sYWJlbH19XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cInByb3Aua2V5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaWRdPVwicHJvcC5rZXlcIiBbdHlwZV09XCJwcm9wLnR5cGVcIiBmeEZsZXg+XG4gICAgICAgICAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ3RleHRhcmVhJ1wiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgZnhGbGV4PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIG1hdElucHV0IHBsYWNlaG9sZGVyPVwie3twcm9wLmxhYmVsfX1cIiByb3dzPVwie3twcm9wLnJvd3N8fCczJ319XCIgYXV0b3NpemVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cInByb3Aua2V5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaWRdPVwicHJvcC5rZXlcIiBbdHlwZV09XCJwcm9wLnR5cGVcIj48L3RleHRhcmVhPlxuICAgICAgICAgICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIidudW1iZXInXCI+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZCBmeEZsZXg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgcGxhY2Vob2xkZXI9XCJ7e3Byb3AubGFiZWx9fVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJwcm9wLmtleVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2lkXT1cInByb3Aua2V5XCIgW3R5cGVdPVwicHJvcC50eXBlXCI+XG4gICAgICAgICAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ2ZpbGUnXCI+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZCBmeEZsZXg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImZpbGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwicHJvcC5rZXlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpZF09XCJwcm9wLmtleVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3R5cGVdPVwicHJvcC50eXBlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT1cImRpc3BsYXk6IG5vbmVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjaGFuZ2UpPVwiY2hhbmdlRmlsZXMoJGV2ZW50KVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgcGxhY2Vob2xkZXI9XCJ7e3Byb3AubGFiZWx9fVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJwcm9wLmtleSArICdDdHJsJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2lkXT1cInByb3Aua2V5ICsgJ0N0cmwnXCIgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJhZGRGaWxlcyhwcm9wLmtleSlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbiBtYXRTdWZmaXggKGNsaWNrKT1cImFkZEZpbGVzKHByb3Aua2V5KVwiPmZvbGRlcjwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ2NoZWNrYm94J1wiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWNoZWNrYm94XG4gICAgICAgICAgICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cInByb3Aua2V5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtpZF09XCJwcm9wLmtleVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge3twcm9wLmxhYmVsfX1cbiAgICAgICAgICAgICAgICAgICAgPC9tYXQtY2hlY2tib3g+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ2RhdGUnXCI+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZCBmeEZsZXg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgW21hdERhdGVwaWNrZXJdPXBpY2tlciBwbGFjZWhvbGRlcj1cInt7cHJvcC5sYWJlbH19XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cInByb3Aua2V5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaWRdPVwicHJvcC5rZXlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxtYXQtZGF0ZXBpY2tlciAjcGlja2VyPjwvbWF0LWRhdGVwaWNrZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bWF0LWRhdGVwaWNrZXItdG9nZ2xlIG1hdFN1ZmZpeCBbZm9yXT1cInBpY2tlclwiPjwvbWF0LWRhdGVwaWNrZXItdG9nZ2xlPlxuICAgICAgICAgICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIid0aW1lJ1wiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgZnhGbGV4PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IG1hdElucHV0IFtuZ3hUaW1lcGlja2VyXT1cInRwaWNrZXJcIiBwbGFjZWhvbGRlcj1cInt7cHJvcC5sYWJlbH19XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZm9ybWF0XT1cIjI0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cInByb3Aua2V5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaWRdPVwicHJvcC5rZXlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZ3gtbWF0ZXJpYWwtdGltZXBpY2tlciAjdHBpY2tlcj48L25neC1tYXRlcmlhbC10aW1lcGlja2VyPlxuICAgICAgICAgICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ3JhZGlvJ1wiIGZ4TGF5b3V0PVwiY29sdW1uXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgX25nY29udGVudC1jMjA9XCJcIiBzdHlsZT1cImhlaWdodDogMjBweDtcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBfbmdjb250ZW50LWMyMD1cIlwiIHN0eWxlPVwidHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xLjI4MTI1ZW0pIHNjYWxlKDAuNzUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNwZWN0aXZlKDEwMHB4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVaKDAuMDAxcHgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xLjI4MTI1ZW0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlKDAuNzUpO3dpZHRoOiAxMzMuMzMzMzMzMzMlO21hcmdpbjogMjBweCAwIDAgMDtmb250LXdlaWdodDogMTAwO2NvbG9yOiAjNjY2O1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7cHJvcC5sYWJlbH19XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1yYWRpby1ncm91cCBbZm9ybUNvbnRyb2xOYW1lXT1cInByb3Aua2V5XCIgW25hbWVdPVwicHJvcC5rZXlcIiBmeExheW91dD1cImNvbHVtblwiIHN0eWxlPVwibWFyZ2luLXRvcDogMTRweDtcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxtYXQtcmFkaW8tYnV0dG9uIFt2YWx1ZV09XCJvcHRpb24udmFsdWVcIiAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIHByb3Aub3B0aW9uc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7b3B0aW9uLmxhYmVsfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbWF0LXJhZGlvLWJ1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9tYXQtcmFkaW8tZ3JvdXA+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCInc2VsZWN0J1wiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgZnhGbGV4PlxuICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1zZWxlY3QgW2Zvcm1Db250cm9sTmFtZV09XCJwcm9wLmtleVwiIHBsYWNlaG9sZGVyPVwie3twcm9wLmxhYmVsfX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bWF0LW9wdGlvbiAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIHByb3Aub3B0aW9uc1wiIFt2YWx1ZV09XCJvcHRpb24udmFsdWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgb3B0aW9uLmxhYmVsIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9tYXQtb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9tYXQtc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZXJyb3JcIiAqbmdJZj1cImZvcm0uZ2V0KHByb3Aua2V5KS5lcnJvcnNcIiBmeEZsZXg9XCIxMDAlXCI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlcnJvclwiICpuZ0lmPVwiZm9ybS5nZXQocHJvcC5rZXkpLmludmFsaWQgJiYgKGZvcm0uZ2V0KHByb3Aua2V5KS5kaXJ0eSB8fCBmb3JtLmdldChwcm9wLmtleSkudG91Y2hlZClcIiBmeEZsZXg9XCIxMDAlXCI+XG4gICAgICAgICAgICAgICAgPG1hdC1lcnJvciAqbmdJZj1cImZvcm0uZ2V0KHByb3Aua2V5KS5lcnJvcnMucmVxdWlyZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cImRyYXdDdXN0b21FcnJvcnMocHJvcCwgJ3JlcXVpcmVkJylcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt7cHJvcC52YWxpZGF0aW9uTWVzc2FnZXMucmVxdWlyZWR9fVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cIiFwcm9wLnZhbGlkYXRpb25NZXNzYWdlcyB8fCAhcHJvcC52YWxpZGF0aW9uTWVzc2FnZXMucmVxdWlyZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIFRoZSBmaWVsZCB7eyBwcm9wLmxhYmVsIH19IGlzIHJlcXVpcmVkLlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L21hdC1lcnJvcj5cbiAgICAgICAgICAgICAgICA8bWF0LWVycm9yICpuZ0lmPVwiZm9ybS5nZXQocHJvcC5rZXkpLmVycm9ycy5tYXRjaFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiZHJhd0N1c3RvbUVycm9ycyhwcm9wLCAnbWF0Y2gnKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge3twcm9wLnZhbGlkYXRpb25NZXNzYWdlcy5tYXRjaH19XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiIXByb3AudmFsaWRhdGlvbk1lc3NhZ2VzIHx8ICFwcm9wLnZhbGlkYXRpb25NZXNzYWdlcy5tYXRjaFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgVGhlIGZpZWxkcyBkb2Vzbid0IG1hdGNoLlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L21hdC1lcnJvcj5cbiAgICAgICAgICAgICAgICA8bWF0LWVycm9yICpuZ0lmPVwiZm9ybS5nZXQocHJvcC5rZXkpLmVycm9ycy5taW5cIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cImRyYXdDdXN0b21FcnJvcnMocHJvcCwgJ21pbicpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7e3Byb3AudmFsaWRhdGlvbk1lc3NhZ2VzLm1pbn19XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiIXByb3AudmFsaWRhdGlvbk1lc3NhZ2VzIHx8ICFwcm9wLnZhbGlkYXRpb25NZXNzYWdlcy5taW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIFRoZSBtaW5pbWFsIHZhbHVlIGlzIHt7Zm9ybS5nZXQocHJvcC5rZXkpLmVycm9ycy5taW4ubWlufX0uXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvbWF0LWVycm9yPlxuICAgICAgICAgICAgICAgIDxtYXQtZXJyb3IgKm5nSWY9XCJmb3JtLmdldChwcm9wLmtleSkuZXJyb3JzLm1heFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiZHJhd0N1c3RvbUVycm9ycyhwcm9wLCAnbWF4JylcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt7cHJvcC52YWxpZGF0aW9uTWVzc2FnZXMubWF4fX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCIhcHJvcC52YWxpZGF0aW9uTWVzc2FnZXMgfHwgIXByb3AudmFsaWRhdGlvbk1lc3NhZ2VzLm1heFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgVGhlIG1heCB2YWx1ZSBpcyB7e2Zvcm0uZ2V0KHByb3Aua2V5KS5lcnJvcnMubWF4Lm1heH19LlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L21hdC1lcnJvcj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Zvcm0+XG5cbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBtYXQtcmFpc2VkLWJ1dHRvblxuICAgICAgICAoY2xpY2spPVwic2VuZCgpXCI+e3sgb2tUZXh0IH19PC9idXR0b24+XG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbWF0LWJ1dHRvblxuICAgICAgICAoY2xpY2spPVwiZGlhbG9nUmVmLmNsb3NlKGZhbHNlKVwiPnt7IGNhbmNlbFRleHQgfX08L2J1dHRvbj5cblxuICAgIGBcbn0pXG5leHBvcnQgY2xhc3MgVFdBUHJvbXB0RGlhbG9nQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIHB1YmxpYyBmb3JtOiBGb3JtR3JvdXAgPSBuZXcgRm9ybUdyb3VwKHt9KTtcbiAgICBmb3JtU3VibWl0RXY6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIHB1YmxpYyBmb3JtRGF0YTogRm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICBwdWJsaWMgaXNNdWx0aXBhcnQgPSBmYWxzZTtcblxuICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xuICAgIHB1YmxpYyBtZXNzYWdlOiBzdHJpbmc7XG4gICAgcHVibGljIG1lc3NhZ2VIdG1sOiBTYWZlSHRtbDtcbiAgICBwdWJsaWMgZmllbGRzOiBJVFdBUHJvbXB0RmllbGRbXTtcbiAgICBwdWJsaWMgb2tUZXh0OiBzdHJpbmc7XG4gICAgcHVibGljIGNhbmNlbFRleHQ6IHN0cmluZztcbiAgICBwdWJsaWMgb25TdWJtaXQ6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxUV0FQcm9tcHREaWFsb2dDb21wb25lbnQ+KSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG5cbiAgICAgICAgY29uc3QgZm9ybUdyb3VwID0ge307XG4gICAgICAgIGZvciAoY29uc3QgaSBpbiB0aGlzLmZpZWxkcykge1xuICAgICAgICAgICAgaWYgKHRoaXMuZmllbGRzLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZmllbGRzW2ldLnR5cGUgIT09ICdmaWxlJykge1xuICAgICAgICAgICAgICAgICAgICBmb3JtR3JvdXBbdGhpcy5maWVsZHNbaV0ua2V5XSA9IG5ldyBGb3JtQ29udHJvbChcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmllbGRzW2ldLnZhbHVlIHx8ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBWYWxpZGF0b3JzKHRoaXMuZmllbGRzW2ldLnZhbGlkYXRpb24sIHRoaXMuZmllbGRzW2ldLmtleSlcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmb3JtR3JvdXBbdGhpcy5maWVsZHNbaV0ua2V5XSA9IG5ldyBGb3JtQ29udHJvbChcbiAgICAgICAgICAgICAgICAgICAgICAgICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBWYWxpZGF0b3JzKHRoaXMuZmllbGRzW2ldLnZhbGlkYXRpb24sIHRoaXMuZmllbGRzW2ldLmtleSlcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmZpZWxkc1tpXS5hdXRvY29tcGxldGUgIT09ICd1bmRlZmluZWQnICYmIHRoaXMuZmllbGRzW2ldLmF1dG9jb21wbGV0ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmllbGRzW2ldLmF1dG9jb21wbGV0ZS5maWx0ZXJlZE9wdGlvbnMgPSB0aGlzLmdldEZvcm1Hcm91cEV2ZW50KGZvcm1Hcm91cCwgaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZpZWxkc1tpXS50eXBlID09PSAnZmlsZScpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc011bHRpcGFydCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1Hcm91cFt0aGlzLmZpZWxkc1tpXS5rZXkgKyAnQ3RybCddID0gbmV3IEZvcm1Db250cm9sKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maWVsZHNbaV0udmFsdWVcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZvcm0gPSBuZXcgRm9ybUdyb3VwKGZvcm1Hcm91cCk7XG5cbiAgICB9XG5cbiAgICBnZXRGb3JtR3JvdXBFdmVudChmb3JtR3JvdXAsIGkpIHtcbiAgICAgICAgcmV0dXJuIGZvcm1Hcm91cFt0aGlzLmZpZWxkc1tpXS5rZXldLnZhbHVlQ2hhbmdlcy5waXBlKFxuICAgICAgICAgICAgc3RhcnRXaXRoKCcnKSxcbiAgICAgICAgICAgIG1hcChmaWx0ZXJWYWx1ZSA9PiBmaWx0ZXJWYWx1ZSA/IHRoaXMuX2ZpbHRlclZhbHVlcyhmaWx0ZXJWYWx1ZSwgdGhpcy5maWVsZHNbaV0uYXV0b2NvbXBsZXRlLm9wdGlvbnMpIDpcbiAgICAgICAgICAgICAgICB0aGlzLmZpZWxkc1tpXS5hdXRvY29tcGxldGUub3B0aW9ucy5zbGljZSgpKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGxvZyhvYmplY3Q6IGFueSkge1xuICAgICAgICBjb25zb2xlLmxvZyhvYmplY3QpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2ZpbHRlclZhbHVlcyh2YWx1ZSwgb3B0aW9ucykge1xuXG4gICAgICAgIGNvbnN0IGZpbHRlcmVkVmFsdWUgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIHJldHVybiBvcHRpb25zLmZpbHRlcihvcHRpb24gPT4gb3B0aW9uLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihmaWx0ZXJlZFZhbHVlKSA+PSAwKTtcblxuICAgIH1cblxuICAgIGdldEZvcm1TdWJtaXRFdigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZvcm1TdWJtaXRFdjtcbiAgICB9XG5cbiAgICBzZW5kKCkge1xuICAgICAgICAgICAgLy8gbGV0IGk7XG4gICAgICAgICAgICB0aGlzLmZvcm0udXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICAgICAgICAgICAgaWYgKHRoaXMuZm9ybS5zdGF0dXMgIT09ICdJTlZBTElEJykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZm9ybS5jb250cm9scyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5mb3JtLnZhbHVlKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc011bHRpcGFydCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWVsZHMgPSB0aGlzLmZpZWxkcztcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBpIGluIGZpZWxkcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpZWxkc1tpXS50eXBlICE9PSAnZmlsZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcm1EYXRhLnNldChmaWVsZHNbaV0ua2V5LCB0aGlzLmZvcm0udmFsdWVbZmllbGRzW2ldLmtleV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGksIHRoaXMuZm9ybURhdGEuZ2V0QWxsKGZpZWxkc1tpXS5rZXkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2ZpbGUnLCBpLCB0aGlzLmZvcm1EYXRhLmdldEFsbChmaWVsZHNbaV0ua2V5KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UodGhpcy5mb3JtRGF0YSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UodGhpcy5mb3JtLnZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGkgaW4gdGhpcy5mb3JtLmNvbnRyb2xzKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuZm9ybS5jb250cm9sc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZm9ybS5jb250cm9scy5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtLmNvbnRyb2xzW2ldLm1hcmtBc1RvdWNoZWQoeyBvbmx5U2VsZjogdHJ1ZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZm9ybS5jb250cm9sc1tpXS51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgfVxuXG4gICAgYWNDbGljayhmaWVsZDogYW55LCBldmVudDogYW55KSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGV2ZW50KTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coZmllbGQuYXV0b2NvbXBsZXRlKTtcbiAgICAgICAgaWYgKHR5cGVvZiBmaWVsZC5hdXRvY29tcGxldGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGZpZWxkLmF1dG9jb21wbGV0ZS5mb3JjZVNlbGVjdCAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgICAgICAgICBmaWVsZC5hdXRvY29tcGxldGUuZm9yY2VTZWxlY3QpIHtcbiAgICAgICAgICAgICAgICBmaWVsZC5hdXRvY29tcGxldGUuc2VsZWN0ZWQgPSBldmVudC5vcHRpb24udmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhY0NoZWNrQmx1cihmaWVsZCkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhmaWVsZC5hdXRvY29tcGxldGUuc2VsZWN0ZWQsIHRoaXMuZm9ybS5jb250cm9sc1tmaWVsZC5rZXldLnZhbHVlKTtcbiAgICAgICAgaWYgKHR5cGVvZiBmaWVsZC5hdXRvY29tcGxldGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGZpZWxkLmF1dG9jb21wbGV0ZS5mb3JjZVNlbGVjdCAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgICAgICAgICBmaWVsZC5hdXRvY29tcGxldGUuZm9yY2VTZWxlY3QpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWZpZWxkLmF1dG9jb21wbGV0ZS5zZWxlY3RlZCB8fFxuICAgICAgICAgICAgICAgICAgICBmaWVsZC5hdXRvY29tcGxldGUuc2VsZWN0ZWQgIT09IHRoaXMuZm9ybS5jb250cm9sc1tmaWVsZC5rZXldLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9ybS5jb250cm9sc1tmaWVsZC5rZXldLnNldFZhbHVlKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICBmaWVsZC5hdXRvY29tcGxldGUuc2VsZWN0ZWQgPSAnJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdWJtaXRGb3JtKGZvcm06IGFueSkge1xuICAgICAgICAgICAgdGhpcy5mb3JtU3VibWl0RXYuZW1pdChmb3JtKTtcbiAgICB9XG5cbiAgICBkcmF3Q3VzdG9tRXJyb3JzKHByb3AsIGVycm9yKSB7XG4gICAgICAgIGxldCByZXQgPSBmYWxzZTtcbiAgICAgICAgaWYgKHR5cGVvZiBwcm9wLnZhbGlkYXRpb25NZXNzYWdlcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcHJvcC52YWxpZGF0aW9uTWVzc2FnZXNbZXJyb3JdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHJldCA9IHByb3AudmFsaWRhdGlvbk1lc3NhZ2VzW2Vycm9yXSA+ICcnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtYXBWYWxpZGF0b3JzKHZhbGlkYXRvcnM6IGFueSwgZmllbGQpIHtcblxuICAgICAgICBjb25zdCBmb3JtVmFsaWRhdG9ycyA9IFtdO1xuXG4gICAgICAgIGlmICh2YWxpZGF0b3JzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHZhbGlkYXRpb24gb2YgT2JqZWN0LmtleXModmFsaWRhdG9ycykpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsaWRhdGlvbiA9PT0gJ3JlcXVpcmVkJykge1xuICAgICAgICAgICAgICAgICAgICBmb3JtVmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMucmVxdWlyZWQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsaWRhdGlvbiA9PT0gJ21hdGNoJykge1xuICAgICAgICAgICAgICAgICAgICBmb3JtVmFsaWRhdG9ycy5wdXNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZXQ6IGFueSB8IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRyb2wgPSB0aGlzLmZvcm0uZ2V0KHZhbGlkYXRvcnNbdmFsaWRhdGlvbl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmZvcm0uZ2V0KGZpZWxkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXQgPSAhKHRoaXMuZm9ybS5nZXQoZmllbGQpICYmIHRoaXMuZm9ybS5nZXQoZmllbGQpLnZhbHVlID09PSBjb250cm9sLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmV0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaDogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbGlkYXRpb24gPT09ICdtaW4nKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1WYWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5taW4odmFsaWRhdG9yc1t2YWxpZGF0aW9uXSkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsaWRhdGlvbiA9PT0gJ21heCcpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybVZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLm1heCh2YWxpZGF0b3JzW3ZhbGlkYXRpb25dKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZvcm1WYWxpZGF0b3JzO1xuICAgIH1cblxuICAgIGFkZEZpbGVzKGZvcm1FbGVtZW50KTogdm9pZCB7XG5cbiAgICAgICAgY29uc29sZS5sb2coZm9ybUVsZW1lbnQsIHRoaXMuZm9ybS5nZXQoZm9ybUVsZW1lbnQpKTtcbiAgICAgICAgY29uc3QgZWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGZvcm1FbGVtZW50KSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgICAgICBlbGVtLmNsaWNrKCk7XG4gICAgICAgIC8vIHRoaXMuZm9ybS5nZXQoZm9ybUVsZW1lbnQpLm5hdGl2ZUVsZW1lbnQuY2xpY2soKTtcblxuICAgIH1cblxuICAgIGNoYW5nZUZpbGVzKGZvcm1FbGVtZW50KTogdm9pZCB7XG5cbiAgICAgICAgdGhpcy5mb3JtLmdldChmb3JtRWxlbWVudC50YXJnZXQuaWQgKyAnQ3RybCcpLnNldFZhbHVlKGZvcm1FbGVtZW50LnRhcmdldC5maWxlc1swXS5uYW1lKTtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhmb3JtRWxlbWVudCk7XG4gICAgICAgIC8vIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICAgIHRoaXMuZm9ybURhdGEuYXBwZW5kKGZvcm1FbGVtZW50LnRhcmdldC5pZCwgZm9ybUVsZW1lbnQudGFyZ2V0LmZpbGVzWzBdKTtcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5mb3JtRGF0YSkpO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmZvcm1EYXRhKTtcbiAgICAgICAgLy8gdGhpcy5mb3JtLmdldChmb3JtRWxlbWVudC50YXJnZXQuaWQpLnNldFZhbHVlKEpTT04uc3RyaW5naWZ5KGZvcm1EYXRhKSk7XG5cbiAgICB9XG5cbn1cbiJdfQ==