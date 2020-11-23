import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
let TWAMd2DynformsComponent = class TWAMd2DynformsComponent {
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
};
__decorate([
    Input(),
    __metadata("design:type", Array)
], TWAMd2DynformsComponent.prototype, "fields", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], TWAMd2DynformsComponent.prototype, "submit", void 0);
TWAMd2DynformsComponent = __decorate([
    Component({
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
    }),
    __metadata("design:paramtypes", [])
], TWAMd2DynformsComponent);
export { TWAMd2DynformsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdhLW1kMi1keW5mb3Jtcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly90d2EtbWQyLWR5bmZvcm1zLyIsInNvdXJjZXMiOlsibGliL3R3YS1tZDItZHluZm9ybXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBcUIsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRixPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUdwRSxPQUFPLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBdUxoRCxJQUFhLHVCQUF1QixHQUFwQyxNQUFhLHVCQUF1QjtJQXVCbEM7UUFuQk8sU0FBSSxHQUFjLElBQUksU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzNDLGlCQUFZLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUMsYUFBUSxHQUFhLElBQUksUUFBUSxFQUFFLENBQUM7UUFDcEMsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFVcEIsV0FBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7SUFNbEIsQ0FBQztJQUVqQixRQUFRO1FBQ04scUJBQXFCO0lBQ3ZCLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxVQUFVO1FBRVIsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLEtBQUssTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUN6QixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUMvQixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtvQkFDaEMsU0FBUyxDQUFDLElB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c291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIE9uSW5pdCwgT25DaGFuZ2VzLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCwgRm9ybUdyb3VwLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgU2FmZUh0bWwgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuaW1wb3J0IHsgbWFwLCBzdGFydFdpdGggfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVRXQVByb21wdEZpZWxkIHtcbiAga2V5OiBzdHJpbmc7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIHR5cGU6IHN0cmluZztcbiAgZnhGbGV4OiBzdHJpbmc7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIG9wdGlvbnM6IGFueVtdO1xuICBhdXRvY29tcGxldGU6IGFueTtcbiAgcm93czogYW55W107XG4gIHZhbGlkYXRpb246IGFueTtcbiAgdmFsaWRhdGlvbk1lc3NhZ2VzPzogYW55O1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0d2EtbWQyLWR5bmZvcm1zJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8aDIgKm5nSWY9XCJ0aXRsZSAmJiB0aXRsZSA+ICcnXCI+e3sgdGl0bGUgfX08L2gyPlxuICAgIDxwICpuZ0lmPVwibWVzc2FnZSAmJiBtZXNzYWdlID4gJydcIiBbaW5uZXJIdG1sXT1cIm1lc3NhZ2VIdG1sXCI+PC9wPlxuXG4gICAgPGZvcm0gbm92YWxpZGF0ZSAobmdTdWJtaXQpPVwic3VibWl0Rm9ybShmb3JtLnZhbHVlKVwiIFtmb3JtR3JvdXBdPVwiZm9ybVwiIGZ4TGF5b3V0PVwicm93IHdyYXBcIiBmeExheW91dEdhcD1cIjEwcHhcIj5cbiAgICAgIDxkaXYgKm5nRm9yPVwibGV0IHByb3Agb2YgZmllbGRzXCIgZnhGbGV4PVwie3socHJvcC5meEZsZXggIT0gJ2ZhbHNlJykgPyAoJ2NhbGMoJyArIHByb3AuZnhGbGV4ICsgJyAtIDEwcHgpJykgOiAoKHByb3AuZnhGbGV4ID09ICdmYWxzZScpID8gJzAgMCAwJyA6ICcxMDAlJyl9fVwiIGZ4TGF5b3V0PVwiY29sdW1uXCI+XG4gICAgICAgIDxkaXYgW25nU3dpdGNoXT1cInByb3AudHlwZVwiIGZ4RmxleD1cIjEwMCVcIj5cbiAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCIndGV4dCdcIj5cbiAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZCBjbGFzcz1cImR5bmZvcm0tZmllbGQte3twcm9wLmtleX19XCIgKm5nSWY9XCIhcHJvcC5hdXRvY29tcGxldGVcIiBmeEZsZXg+XG4gICAgICAgICAgICAgIDxpbnB1dCBtYXRJbnB1dCBwbGFjZWhvbGRlcj1cInt7cHJvcC5sYWJlbH19XCJcbiAgICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cInByb3Aua2V5XCJcbiAgICAgICAgICAgICAgICBbaWRdPVwicHJvcC5rZXlcIiBbdHlwZV09XCJwcm9wLnR5cGVcIiBmeEZsZXg+XG4gICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cInByb3AuYXV0b2NvbXBsZXRlXCIgZnhGbGV4PlxuICAgICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgY2xhc3M9XCJkeW5mb3JtLWZpZWxkLXt7cHJvcC5rZXl9fVwiIGZ4RmxleD5cbiAgICAgICAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgcGxhY2Vob2xkZXI9XCJ7e3Byb3AubGFiZWx9fVwiXG4gICAgICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cInByb3Aua2V5XCJcbiAgICAgICAgICAgICAgICAgIFttYXRBdXRvY29tcGxldGVdPVwiYXV0b1wiXG4gICAgICAgICAgICAgICAgICAoYmx1cik9XCJhY0NoZWNrQmx1cihwcm9wKVwiXG4gICAgICAgICAgICAgICAgICBbaWRdPVwicHJvcC5rZXlcIiBbdHlwZV09XCJwcm9wLnR5cGVcIj5cbiAgICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgICAgPG1hdC1hdXRvY29tcGxldGUgI2F1dG89XCJtYXRBdXRvY29tcGxldGVcIlxuICAgICAgICAgICAgICAgIChvcHRpb25TZWxlY3RlZCk9XCJhY0NsaWNrKHByb3AsICRldmVudClcIj5cbiAgICAgICAgICAgICAgICA8bWF0LW9wdGlvbiAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIHByb3AuYXV0b2NvbXBsZXRlLmZpbHRlcmVkT3B0aW9ucyB8IGFzeW5jXCJcbiAgICAgICAgICAgICAgICAgIFt2YWx1ZV09XCJvcHRpb25cIj5cbiAgICAgICAgICAgICAgICB7eyBvcHRpb24gfX1cbiAgICAgICAgICAgICAgICA8L21hdC1vcHRpb24+XG4gICAgICAgICAgICAgIDwvbWF0LWF1dG9jb21wbGV0ZT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ3Bhc3N3b3JkJ1wiPlxuICAgICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgY2xhc3M9XCJkeW5mb3JtLWZpZWxkLXt7cHJvcC5rZXl9fVwiIGZ4RmxleD5cbiAgICAgICAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgcGxhY2Vob2xkZXI9XCJ7e3Byb3AubGFiZWx9fVwiXG4gICAgICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cInByb3Aua2V5XCJcbiAgICAgICAgICAgICAgICAgIFtpZF09XCJwcm9wLmtleVwiIFt0eXBlXT1cInByb3AudHlwZVwiIGZ4RmxleD5cbiAgICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ3RleHRhcmVhJ1wiPlxuICAgICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgY2xhc3M9XCJkeW5mb3JtLWZpZWxkLXt7cHJvcC5rZXl9fVwiIGZ4RmxleD5cbiAgICAgICAgICAgICAgICA8dGV4dGFyZWEgbWF0SW5wdXQgcGxhY2Vob2xkZXI9XCJ7e3Byb3AubGFiZWx9fVwiIHJvd3M9XCJ7e3Byb3Aucm93c3x8JzMnfX1cIiBhdXRvc2l6ZVxuICAgICAgICAgICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJwcm9wLmtleVwiXG4gICAgICAgICAgICAgICAgICBbaWRdPVwicHJvcC5rZXlcIiBbdHlwZV09XCJwcm9wLnR5cGVcIj48L3RleHRhcmVhPlxuICAgICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCInbnVtYmVyJ1wiPlxuICAgICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgY2xhc3M9XCJkeW5mb3JtLWZpZWxkLXt7cHJvcC5rZXl9fVwiIGZ4RmxleD5cbiAgICAgICAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgcGxhY2Vob2xkZXI9XCJ7e3Byb3AubGFiZWx9fVwiXG4gICAgICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cInByb3Aua2V5XCJcbiAgICAgICAgICAgICAgICAgIFtpZF09XCJwcm9wLmtleVwiIFt0eXBlXT1cInByb3AudHlwZVwiPlxuICAgICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCInZmlsZSdcIj5cbiAgICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkIGNsYXNzPVwiZHluZm9ybS1maWVsZC17e3Byb3Aua2V5fX1cIiBmeEZsZXg+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJmaWxlXCJcbiAgICAgICAgICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwicHJvcC5rZXlcIlxuICAgICAgICAgICAgICAgICAgW2lkXT1cInByb3Aua2V5XCJcbiAgICAgICAgICAgICAgICAgIFt0eXBlXT1cInByb3AudHlwZVwiXG4gICAgICAgICAgICAgICAgICBzdHlsZT1cImRpc3BsYXk6IG5vbmVcIlxuICAgICAgICAgICAgICAgICAgKGNoYW5nZSk9XCJjaGFuZ2VGaWxlcygkZXZlbnQpXCIgLz5cbiAgICAgICAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgcGxhY2Vob2xkZXI9XCJ7e3Byb3AubGFiZWx9fVwiXG4gICAgICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cInByb3Aua2V5ICsgJ0N0cmwnXCJcbiAgICAgICAgICAgICAgICAgIFtpZF09XCJwcm9wLmtleSArICdDdHJsJ1wiIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgIChjbGljayk9XCJhZGRGaWxlcyhwcm9wLmtleSlcIj5cbiAgICAgICAgICAgICAgICA8bWF0LWljb24gbWF0U3VmZml4IChjbGljayk9XCJhZGRGaWxlcyhwcm9wLmtleSlcIj5mb2xkZXI8L21hdC1pY29uPlxuICAgICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCInY2hlY2tib3gnXCIgY2xhc3M9XCJkeW5mb3JtLWZpZWxkLXt7cHJvcC5rZXl9fVwiPlxuICAgICAgICAgICAgICA8bWF0LWNoZWNrYm94XG4gICAgICAgICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJwcm9wLmtleVwiXG4gICAgICAgICAgICAgICAgW2lkXT1cInByb3Aua2V5XCI+XG4gICAgICAgICAgICAgICAge3twcm9wLmxhYmVsfX1cbiAgICAgICAgICAgICAgPC9tYXQtY2hlY2tib3g+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIidkYXRlJ1wiPlxuICAgICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgY2xhc3M9XCJkeW5mb3JtLWZpZWxkLXt7cHJvcC5rZXl9fVwiIGZ4RmxleD5cbiAgICAgICAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgW21hdERhdGVwaWNrZXJdPXBpY2tlciBwbGFjZWhvbGRlcj1cInt7cHJvcC5sYWJlbH19XCJcbiAgICAgICAgICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwicHJvcC5rZXlcIlxuICAgICAgICAgICAgICAgICAgW2lkXT1cInByb3Aua2V5XCI+XG4gICAgICAgICAgICAgICAgPG1hdC1kYXRlcGlja2VyICNwaWNrZXI+PC9tYXQtZGF0ZXBpY2tlcj5cbiAgICAgICAgICAgICAgICA8bWF0LWRhdGVwaWNrZXItdG9nZ2xlIG1hdFN1ZmZpeCBbZm9yXT1cInBpY2tlclwiPjwvbWF0LWRhdGVwaWNrZXItdG9nZ2xlPlxuICAgICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCIndGltZSdcIj5cbiAgICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkIGNsYXNzPVwiZHluZm9ybS1maWVsZC17e3Byb3Aua2V5fX1cIiBmeEZsZXg+XG4gICAgICAgICAgICAgICAgPGlucHV0IG1hdElucHV0IFtuZ3hUaW1lcGlja2VyXT1cInRwaWNrZXJcIiBwbGFjZWhvbGRlcj1cInt7cHJvcC5sYWJlbH19XCJcbiAgICAgICAgICAgICAgICAgIFtmb3JtYXRdPVwiMjRcIlxuICAgICAgICAgICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJwcm9wLmtleVwiXG4gICAgICAgICAgICAgICAgICBbaWRdPVwicHJvcC5rZXlcIj5cbiAgICAgICAgICAgICAgICA8bmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIgI3RwaWNrZXI+PC9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlcj5cbiAgICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCIncmFkaW8nXCIgZnhMYXlvdXQ9XCJjb2x1bW5cIiBjbGFzcz1cImR5bmZvcm0tZmllbGQte3twcm9wLmtleX19XCI+XG4gICAgICAgICAgICAgIDxkaXYgX25nY29udGVudC1jMjA9XCJcIiBzdHlsZT1cImhlaWdodDogMjBweDtcIj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgX25nY29udGVudC1jMjA9XCJcIiBzdHlsZT1cInRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMS4yODEyNWVtKSBzY2FsZSgwLjc1KVxuICAgICAgICAgICAgICAgICAgICBwZXJzcGVjdGl2ZSgxMDBweClcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlWigwLjAwMXB4KTtcbiAgICAgICAgICAgICAgICAgICAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMS4yODEyNWVtKVxuICAgICAgICAgICAgICAgICAgICBzY2FsZSgwLjc1KTt3aWR0aDogMTMzLjMzMzMzMzMzJTttYXJnaW46IDIwcHggMCAwIDA7Zm9udC13ZWlnaHQ6IDEwMDtjb2xvcjogIzY2NjtcIj5cbiAgICAgICAgICAgICAgICAgIHt7cHJvcC5sYWJlbH19XG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxtYXQtcmFkaW8tZ3JvdXAgW2Zvcm1Db250cm9sTmFtZV09XCJwcm9wLmtleVwiIFtuYW1lXT1cInByb3Aua2V5XCIgZnhMYXlvdXQ9XCJjb2x1bW5cIiBzdHlsZT1cIm1hcmdpbi10b3A6IDE0cHg7XCI+XG4gICAgICAgICAgICAgICAgPG1hdC1yYWRpby1idXR0b24gW3ZhbHVlXT1cIm9wdGlvbi52YWx1ZVwiICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgcHJvcC5vcHRpb25zXCI+XG4gICAgICAgICAgICAgICAgICB7e29wdGlvbi5sYWJlbH19XG4gICAgICAgICAgICAgICAgPC9tYXQtcmFkaW8tYnV0dG9uPlxuICAgICAgICAgICAgICA8L21hdC1yYWRpby1ncm91cD5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCInc2VsZWN0J1wiPlxuICAgICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgY2xhc3M9XCJkeW5mb3JtLWZpZWxkLXt7cHJvcC5rZXl9fVwiIGZ4RmxleD5cbiAgICAgICAgICAgICAgICA8bWF0LXNlbGVjdCBbZm9ybUNvbnRyb2xOYW1lXT1cInByb3Aua2V5XCIgcGxhY2Vob2xkZXI9XCJ7e3Byb3AubGFiZWx9fVwiPlxuICAgICAgICAgICAgICAgICAgPG1hdC1vcHRpb24gKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBwcm9wLm9wdGlvbnNcIiBbdmFsdWVdPVwib3B0aW9uLnZhbHVlXCI+XG4gICAgICAgICAgICAgICAgICAgIHt7IG9wdGlvbi5sYWJlbCB9fVxuICAgICAgICAgICAgICAgICAgPC9tYXQtb3B0aW9uPlxuICAgICAgICAgICAgICAgIDwvbWF0LXNlbGVjdD5cbiAgICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImVycm9yXCIgKm5nSWY9XCJmb3JtLmdldChwcm9wLmtleSkuZXJyb3JzXCIgZnhGbGV4PVwiMTAwJVwiPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImVycm9yXCIgKm5nSWY9XCJmb3JtLmdldChwcm9wLmtleSkuaW52YWxpZCAmJiAoZm9ybS5nZXQocHJvcC5rZXkpLmRpcnR5IHx8IGZvcm0uZ2V0KHByb3Aua2V5KS50b3VjaGVkKVwiIGZ4RmxleD1cIjEwMCVcIj5cbiAgICAgICAgICA8bWF0LWVycm9yICpuZ0lmPVwiZm9ybS5nZXQocHJvcC5rZXkpLmVycm9ycy5yZXF1aXJlZFwiPlxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cImRyYXdDdXN0b21FcnJvcnMocHJvcCwgJ3JlcXVpcmVkJylcIj5cbiAgICAgICAgICAgICAge3twcm9wLnZhbGlkYXRpb25NZXNzYWdlcy5yZXF1aXJlZH19XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgKm5nSWY9XCIhcHJvcC52YWxpZGF0aW9uTWVzc2FnZXMgfHwgIXByb3AudmFsaWRhdGlvbk1lc3NhZ2VzLnJlcXVpcmVkXCI+XG4gICAgICAgICAgICAgIFRoZSBmaWVsZCB7eyBwcm9wLmxhYmVsIH19IGlzIHJlcXVpcmVkLlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9tYXQtZXJyb3I+XG4gICAgICAgICAgPG1hdC1lcnJvciAqbmdJZj1cImZvcm0uZ2V0KHByb3Aua2V5KS5lcnJvcnMubWF0Y2hcIj5cbiAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJkcmF3Q3VzdG9tRXJyb3JzKHByb3AsICdtYXRjaCcpXCI+XG4gICAgICAgICAgICAgIHt7cHJvcC52YWxpZGF0aW9uTWVzc2FnZXMubWF0Y2h9fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiIXByb3AudmFsaWRhdGlvbk1lc3NhZ2VzIHx8ICFwcm9wLnZhbGlkYXRpb25NZXNzYWdlcy5tYXRjaFwiPlxuICAgICAgICAgICAgICBUaGUgZmllbGRzIGRvZXNuJ3QgbWF0Y2guXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L21hdC1lcnJvcj5cbiAgICAgICAgICA8bWF0LWVycm9yICpuZ0lmPVwiZm9ybS5nZXQocHJvcC5rZXkpLmVycm9ycy5taW5cIj5cbiAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJkcmF3Q3VzdG9tRXJyb3JzKHByb3AsICdtaW4nKVwiPlxuICAgICAgICAgICAgICB7e3Byb3AudmFsaWRhdGlvbk1lc3NhZ2VzLm1pbn19XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgKm5nSWY9XCIhcHJvcC52YWxpZGF0aW9uTWVzc2FnZXMgfHwgIXByb3AudmFsaWRhdGlvbk1lc3NhZ2VzLm1pblwiPlxuICAgICAgICAgICAgICBUaGUgbWluaW1hbCB2YWx1ZSBpcyB7e2Zvcm0uZ2V0KHByb3Aua2V5KS5lcnJvcnMubWluLm1pbn19LlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9tYXQtZXJyb3I+XG4gICAgICAgICAgPG1hdC1lcnJvciAqbmdJZj1cImZvcm0uZ2V0KHByb3Aua2V5KS5lcnJvcnMubWF4XCI+XG4gICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiZHJhd0N1c3RvbUVycm9ycyhwcm9wLCAnbWF4JylcIj5cbiAgICAgICAgICAgICAge3twcm9wLnZhbGlkYXRpb25NZXNzYWdlcy5tYXh9fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiIXByb3AudmFsaWRhdGlvbk1lc3NhZ2VzIHx8ICFwcm9wLnZhbGlkYXRpb25NZXNzYWdlcy5tYXhcIj5cbiAgICAgICAgICAgICAgVGhlIG1heCB2YWx1ZSBpcyB7e2Zvcm0uZ2V0KHByb3Aua2V5KS5lcnJvcnMubWF4Lm1heH19LlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9tYXQtZXJyb3I+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGZ4RmxleD48L2Rpdj5cbiAgICA8L2Zvcm0+XG5cbiAgICA8IS0tIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG1hdC1yYWlzZWQtYnV0dG9uXG4gICAgICAoY2xpY2spPVwic2VuZCgpXCI+e3sgb2tUZXh0IH19PC9idXR0b24+XG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbWF0LWJ1dHRvblxuICAgICAgKGNsaWNrKT1cImRpYWxvZ1JlZi5jbG9zZShmYWxzZSlcIj57eyBjYW5jZWxUZXh0IH19PC9idXR0b24+IC0tPlxuICBgLFxuICBzdHlsZXM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIFRXQU1kMkR5bmZvcm1zQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuXG4gIGRhdGE6IGFueTtcblxuICBwdWJsaWMgZm9ybTogRm9ybUdyb3VwID0gbmV3IEZvcm1Hcm91cCh7fSk7XG4gIGZvcm1TdWJtaXRFdjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIHB1YmxpYyBmb3JtRGF0YTogRm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgcHVibGljIGlzTXVsdGlwYXJ0ID0gZmFsc2U7XG5cbiAgcHVibGljIHRpdGxlOiBzdHJpbmc7XG4gIHB1YmxpYyBtZXNzYWdlOiBzdHJpbmc7XG4gIHB1YmxpYyBtZXNzYWdlSHRtbDogU2FmZUh0bWw7XG5cbiAgQElucHV0KClcbiAgcHVibGljIGZpZWxkczogSVRXQVByb21wdEZpZWxkW107XG5cbiAgQE91dHB1dCgpXG4gIHB1YmxpYyBzdWJtaXQgPSB0aGlzLmZvcm1TdWJtaXRFdjtcblxuICBwdWJsaWMgb2tUZXh0OiBzdHJpbmc7XG4gIHB1YmxpYyBjYW5jZWxUZXh0OiBzdHJpbmc7XG4gIHB1YmxpYyBvblN1Ym1pdDogYW55O1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgLy8gdGhpcy5jcmVhdGVGb3JtKCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICB0aGlzLmNyZWF0ZUZvcm0oKTtcbiAgfVxuXG4gIGNyZWF0ZUZvcm0oKSB7XG5cbiAgICBjb25zdCBmb3JtR3JvdXAgPSB7fTtcbiAgICBmb3IgKGNvbnN0IGkgaW4gdGhpcy5maWVsZHMpIHtcbiAgICAgICAgaWYgKHRoaXMuZmllbGRzLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5maWVsZHNbaV0udHlwZSAhPT0gJ2ZpbGUnKSB7XG4gICAgICAgICAgICAgICAgZm9ybUdyb3VwW3RoaXMuZmllbGRzW2ldLmtleV0gPSBuZXcgRm9ybUNvbnRyb2woXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmllbGRzW2ldLnZhbHVlIHx8ICcnLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcFZhbGlkYXRvcnModGhpcy5maWVsZHNbaV0udmFsaWRhdGlvbiwgdGhpcy5maWVsZHNbaV0ua2V5KVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvcm1Hcm91cFt0aGlzLmZpZWxkc1tpXS5rZXldID0gbmV3IEZvcm1Db250cm9sKFxuICAgICAgICAgICAgICAgICAgICAnJyxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBWYWxpZGF0b3JzKHRoaXMuZmllbGRzW2ldLnZhbGlkYXRpb24sIHRoaXMuZmllbGRzW2ldLmtleSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmZpZWxkc1tpXS5hdXRvY29tcGxldGUgIT09ICd1bmRlZmluZWQnICYmIHRoaXMuZmllbGRzW2ldLmF1dG9jb21wbGV0ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maWVsZHNbaV0uYXV0b2NvbXBsZXRlLmZpbHRlcmVkT3B0aW9ucyA9IHRoaXMuZ2V0Rm9ybUdyb3VwRXZlbnQoZm9ybUdyb3VwLCBpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmZpZWxkc1tpXS50eXBlID09PSAnZmlsZScpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzTXVsdGlwYXJ0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBmb3JtR3JvdXBbdGhpcy5maWVsZHNbaV0ua2V5ICsgJ0N0cmwnXSA9IG5ldyBGb3JtQ29udHJvbChcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWVsZHNbaV0udmFsdWVcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5mb3JtID0gbmV3IEZvcm1Hcm91cChmb3JtR3JvdXApO1xuXG4gIH1cblxuICBnZXRGb3JtR3JvdXBFdmVudChmb3JtR3JvdXAsIGkpIHtcbiAgICByZXR1cm4gZm9ybUdyb3VwW3RoaXMuZmllbGRzW2ldLmtleV0udmFsdWVDaGFuZ2VzLnBpcGUoXG4gICAgICAgIHN0YXJ0V2l0aCgnJyksXG4gICAgICAgIG1hcChmaWx0ZXJWYWx1ZSA9PiBmaWx0ZXJWYWx1ZSA/IHRoaXMuX2ZpbHRlclZhbHVlcyhmaWx0ZXJWYWx1ZSwgdGhpcy5maWVsZHNbaV0uYXV0b2NvbXBsZXRlLm9wdGlvbnMpIDpcbiAgICAgICAgICAgIHRoaXMuZmllbGRzW2ldLmF1dG9jb21wbGV0ZS5vcHRpb25zLnNsaWNlKCkpXG4gICAgKTtcbiAgfVxuXG4gIGxvZyhvYmplY3Q6IGFueSkge1xuICAgICAgY29uc29sZS5sb2cob2JqZWN0KTtcbiAgfVxuXG4gIHByaXZhdGUgX2ZpbHRlclZhbHVlcyh2YWx1ZSwgb3B0aW9ucykge1xuXG4gICAgICBjb25zdCBmaWx0ZXJlZFZhbHVlID0gdmFsdWUudG9Mb3dlckNhc2UoKTtcblxuICAgICAgcmV0dXJuIG9wdGlvbnMuZmlsdGVyKG9wdGlvbiA9PiBvcHRpb24udG9Mb3dlckNhc2UoKS5pbmRleE9mKGZpbHRlcmVkVmFsdWUpID49IDApO1xuXG4gIH1cblxuICBnZXRGb3JtU3VibWl0RXYoKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZm9ybVN1Ym1pdEV2O1xuICB9XG5cbiAgc2VuZCgpIHtcbiAgICAvLyBsZXQgaTtcbiAgICB0aGlzLmZvcm0udXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICAgIGlmICh0aGlzLmZvcm0uc3RhdHVzICE9PSAnSU5WQUxJRCcpIHtcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuZm9ybS5jb250cm9scyk7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmZvcm0udmFsdWUpO1xuICAgICAgaWYgKHRoaXMuaXNNdWx0aXBhcnQpIHtcbiAgICAgICAgY29uc3QgZmllbGRzID0gdGhpcy5maWVsZHM7XG4gICAgICAgIGZvciAoY29uc3QgaSBpbiBmaWVsZHMpIHtcbiAgICAgICAgICBpZiAoZmllbGRzW2ldLnR5cGUgIT09ICdmaWxlJykge1xuICAgICAgICAgICAgdGhpcy5mb3JtRGF0YS5zZXQoZmllbGRzW2ldLmtleSwgdGhpcy5mb3JtLnZhbHVlW2ZpZWxkc1tpXS5rZXldKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGksIHRoaXMuZm9ybURhdGEuZ2V0QWxsKGZpZWxkc1tpXS5rZXkpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2ZpbGUnLCBpLCB0aGlzLmZvcm1EYXRhLmdldEFsbChmaWVsZHNbaV0ua2V5KSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHRoaXMuZGlhbG9nUmVmLmNsb3NlKHRoaXMuZm9ybURhdGEpO1xuICAgICAgICAvLyBUT0RPOiBFbWl0IHJlc3VsdHNcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHRoaXMuZGlhbG9nUmVmLmNsb3NlKHRoaXMuZm9ybS52YWx1ZSk7XG4gICAgICAgIC8vIFRPRE86IEVtaXQgcmVzdWx0c1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGNvbnN0IGkgaW4gdGhpcy5mb3JtLmNvbnRyb2xzKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmZvcm0uY29udHJvbHNbaV0pO1xuICAgICAgICBpZiAodGhpcy5mb3JtLmNvbnRyb2xzLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgICAgdGhpcy5mb3JtLmNvbnRyb2xzW2ldLm1hcmtBc1RvdWNoZWQoeyBvbmx5U2VsZjogdHJ1ZSB9KTtcbiAgICAgICAgICB0aGlzLmZvcm0uY29udHJvbHNbaV0udXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYWNDbGljayhmaWVsZDogYW55LCBldmVudDogYW55KSB7XG4gICAgICAvLyBjb25zb2xlLmxvZyhldmVudCk7XG4gICAgICAvLyBjb25zb2xlLmxvZyhmaWVsZC5hdXRvY29tcGxldGUpO1xuICAgICAgaWYgKHR5cGVvZiBmaWVsZC5hdXRvY29tcGxldGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBmaWVsZC5hdXRvY29tcGxldGUuZm9yY2VTZWxlY3QgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgICAgIGZpZWxkLmF1dG9jb21wbGV0ZS5mb3JjZVNlbGVjdCkge1xuICAgICAgICAgICAgICBmaWVsZC5hdXRvY29tcGxldGUuc2VsZWN0ZWQgPSBldmVudC5vcHRpb24udmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgfVxuICB9XG5cbiAgYWNDaGVja0JsdXIoZmllbGQpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGZpZWxkLmF1dG9jb21wbGV0ZS5zZWxlY3RlZCwgdGhpcy5mb3JtLmNvbnRyb2xzW2ZpZWxkLmtleV0udmFsdWUpO1xuICAgICAgaWYgKHR5cGVvZiBmaWVsZC5hdXRvY29tcGxldGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBmaWVsZC5hdXRvY29tcGxldGUuZm9yY2VTZWxlY3QgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgICAgIGZpZWxkLmF1dG9jb21wbGV0ZS5mb3JjZVNlbGVjdCkge1xuICAgICAgICAgICAgICBpZiAoIWZpZWxkLmF1dG9jb21wbGV0ZS5zZWxlY3RlZCB8fFxuICAgICAgICAgICAgICAgICAgZmllbGQuYXV0b2NvbXBsZXRlLnNlbGVjdGVkICE9PSB0aGlzLmZvcm0uY29udHJvbHNbZmllbGQua2V5XS52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtLmNvbnRyb2xzW2ZpZWxkLmtleV0uc2V0VmFsdWUobnVsbCk7XG4gICAgICAgICAgICAgICAgICBmaWVsZC5hdXRvY29tcGxldGUuc2VsZWN0ZWQgPSAnJztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH1cbiAgfVxuXG4gIHN1Ym1pdEZvcm0oZm9ybTogYW55KSB7XG4gICAgICAgICAgdGhpcy5mb3JtU3VibWl0RXYuZW1pdChmb3JtKTtcbiAgfVxuXG4gIGRyYXdDdXN0b21FcnJvcnMocHJvcCwgZXJyb3IpIHtcbiAgICAgIGxldCByZXQgPSBmYWxzZTtcbiAgICAgIGlmICh0eXBlb2YgcHJvcC52YWxpZGF0aW9uTWVzc2FnZXMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBwcm9wLnZhbGlkYXRpb25NZXNzYWdlc1tlcnJvcl0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgIHJldCA9IHByb3AudmFsaWRhdGlvbk1lc3NhZ2VzW2Vycm9yXSA+ICcnO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldCA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0ID0gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgcHJpdmF0ZSBtYXBWYWxpZGF0b3JzKHZhbGlkYXRvcnM6IGFueSwgZmllbGQpIHtcblxuICAgICAgY29uc3QgZm9ybVZhbGlkYXRvcnMgPSBbXTtcblxuICAgICAgaWYgKHZhbGlkYXRvcnMpIHtcbiAgICAgICAgICBmb3IgKGNvbnN0IHZhbGlkYXRpb24gb2YgT2JqZWN0LmtleXModmFsaWRhdG9ycykpIHtcbiAgICAgICAgICAgICAgaWYgKHZhbGlkYXRpb24gPT09ICdyZXF1aXJlZCcpIHtcbiAgICAgICAgICAgICAgICAgIGZvcm1WYWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5yZXF1aXJlZCk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsaWRhdGlvbiA9PT0gJ21hdGNoJykge1xuICAgICAgICAgICAgICAgICAgZm9ybVZhbGlkYXRvcnMucHVzaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgbGV0IHJldDogYW55IHwgYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRyb2wgPSB0aGlzLmZvcm0uZ2V0KHZhbGlkYXRvcnNbdmFsaWRhdGlvbl0pO1xuICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5mb3JtLmdldChmaWVsZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgcmV0ID0gISh0aGlzLmZvcm0uZ2V0KGZpZWxkKSAmJiB0aGlzLmZvcm0uZ2V0KGZpZWxkKS52YWx1ZSA9PT0gY29udHJvbC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZXQgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaDogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsaWRhdGlvbiA9PT0gJ21pbicpIHtcbiAgICAgICAgICAgICAgICAgIGZvcm1WYWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5taW4odmFsaWRhdG9yc1t2YWxpZGF0aW9uXSkpO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbGlkYXRpb24gPT09ICdtYXgnKSB7XG4gICAgICAgICAgICAgICAgICBmb3JtVmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMubWF4KHZhbGlkYXRvcnNbdmFsaWRhdGlvbl0pKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZvcm1WYWxpZGF0b3JzO1xuICB9XG5cbiAgYWRkRmlsZXMoZm9ybUVsZW1lbnQpOiB2b2lkIHtcblxuICAgICAgY29uc29sZS5sb2coZm9ybUVsZW1lbnQsIHRoaXMuZm9ybS5nZXQoZm9ybUVsZW1lbnQpKTtcbiAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChmb3JtRWxlbWVudCkgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICAgIGVsZW0uY2xpY2soKTtcbiAgICAgIC8vIHRoaXMuZm9ybS5nZXQoZm9ybUVsZW1lbnQpLm5hdGl2ZUVsZW1lbnQuY2xpY2soKTtcblxuICB9XG5cbiAgY2hhbmdlRmlsZXMoZm9ybUVsZW1lbnQpOiB2b2lkIHtcblxuICAgICAgdGhpcy5mb3JtLmdldChmb3JtRWxlbWVudC50YXJnZXQuaWQgKyAnQ3RybCcpLnNldFZhbHVlKGZvcm1FbGVtZW50LnRhcmdldC5maWxlc1swXS5uYW1lKTtcblxuICAgICAgLy8gY29uc29sZS5sb2coZm9ybUVsZW1lbnQpO1xuICAgICAgLy8gY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgIHRoaXMuZm9ybURhdGEuYXBwZW5kKGZvcm1FbGVtZW50LnRhcmdldC5pZCwgZm9ybUVsZW1lbnQudGFyZ2V0LmZpbGVzWzBdKTtcbiAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMuZm9ybURhdGEpKTtcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuZm9ybURhdGEpO1xuICAgICAgLy8gdGhpcy5mb3JtLmdldChmb3JtRWxlbWVudC50YXJnZXQuaWQpLnNldFZhbHVlKEpTT04uc3RyaW5naWZ5KGZvcm1EYXRhKSk7XG5cbiAgfVxuXG59XG4iXX0=