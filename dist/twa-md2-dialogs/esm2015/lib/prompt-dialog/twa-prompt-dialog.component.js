/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
/**
 * @record
 */
export function ITWAPromptField() { }
function ITWAPromptField_tsickle_Closure_declarations() {
    /** @type {?} */
    ITWAPromptField.prototype.key;
    /** @type {?} */
    ITWAPromptField.prototype.label;
    /** @type {?} */
    ITWAPromptField.prototype.type;
    /** @type {?} */
    ITWAPromptField.prototype.fxFlex;
    /** @type {?} */
    ITWAPromptField.prototype.value;
    /** @type {?} */
    ITWAPromptField.prototype.options;
    /** @type {?} */
    ITWAPromptField.prototype.autocomplete;
    /** @type {?} */
    ITWAPromptField.prototype.rows;
    /** @type {?} */
    ITWAPromptField.prototype.validation;
}
export class TWAPromptDialogComponent {
    /**
     * @param {?} dialogRef
     */
    constructor(dialogRef) {
        this.dialogRef = dialogRef;
        this.form = new FormGroup({});
        this.formSubmitEv = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        const /** @type {?} */ formGroup = {};
        for (const /** @type {?} */ i in this.fields) {
            if (this.fields.hasOwnProperty(i)) {
                formGroup[this.fields[i].key] = new FormControl(this.fields[i].value || '', this.mapValidators(this.fields[i].validation));
                console.log(this.fields[i].autocomplete);
                if (typeof this.fields[i].autocomplete !== 'undefined' && this.fields[i].autocomplete !== undefined) {
                    console.log(this.fields[i].autocomplete);
                    this.fields[i].autocomplete.filteredOptions = this.getFormGroupEvent(formGroup, i);
                }
            }
        }
        this.form = new FormGroup(formGroup);
    }
    /**
     * @param {?} formGroup
     * @param {?} i
     * @return {?}
     */
    getFormGroupEvent(formGroup, i) {
        return formGroup[this.fields[i].key].valueChanges.pipe(startWith(''), map(filterValue => filterValue ? this._filterValues(filterValue, this.fields[i].autocomplete.options) :
            this.fields[i].autocomplete.options.slice()));
    }
    /**
     * @param {?} value
     * @param {?} options
     * @return {?}
     */
    _filterValues(value, options) {
        const /** @type {?} */ filteredValue = value.toLowerCase();
        return options.filter(option => option.toLowerCase().indexOf(filteredValue) >= 0);
    }
    /**
     * @return {?}
     */
    getFormSubmitEv() {
        return this.formSubmitEv;
    }
    /**
     * @return {?}
     */
    send() {
        let /** @type {?} */ i;
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
    }
    /**
     * @param {?} field
     * @param {?} event
     * @return {?}
     */
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
    /**
     * @param {?} field
     * @return {?}
     */
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
    /**
     * @param {?} form
     * @return {?}
     */
    submitForm(form) {
        this.formSubmitEv.emit(form);
    }
    /**
     * @param {?} validators
     * @return {?}
     */
    mapValidators(validators) {
        const /** @type {?} */ formValidators = [];
        if (validators) {
            for (const /** @type {?} */ validation of Object.keys(validators)) {
                if (validation === 'required') {
                    formValidators.push(Validators.required);
                }
                else if (validation === 'min') {
                    formValidators.push(Validators.min(validators[validation]));
                }
            }
        }
        return formValidators;
    }
}
TWAPromptDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'twa-app-prompt-dialog',
                // templateUrl: './twa-prompt-dialog.component.html',
                // styleUrls: ['./twa-prompt-dialog.component.css']
                styles: ['.mat-error { display: block; margin: -15px 0 15px; }'],
                template: `
    <h2>{{ title }}</h2>
    <p [innerHtml]="messageHtml"></p>

    <form novalidate (ngSubmit)="onSubmit(form.value)" [formGroup]="form" fxLayout="row wrap" fxLayoutGap="10px">
        <div *ngFor="let prop of fields" fxFlex="{{prop.fxFlex ? ('calc(' + prop.fxFlex + ' - 10px)') : '100%'}}" fxLayout="column">
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
            <div class="error" *ngIf="form.get(prop.key).invalid && (form.get(prop.key).dirty || form.get(prop.key).touched)" fxFlex="100%">
                <mat-error *ngIf="form.get(prop.key).errors.required">
                    El campo {{ prop.label }} es obligatorio.
                </mat-error>
            </div>
        </div>
    </form>

    <button type="button" mat-raised-button
        (click)="send()">{{ okText }}</button>
    <button type="button" mat-button
        (click)="dialogRef.close(false)">{{ cancelText }}</button>

    `
            },] },
];
/** @nocollapse */
TWAPromptDialogComponent.ctorParameters = () => [
    { type: MatDialogRef }
];
function TWAPromptDialogComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    TWAPromptDialogComponent.prototype.form;
    /** @type {?} */
    TWAPromptDialogComponent.prototype.formSubmitEv;
    /** @type {?} */
    TWAPromptDialogComponent.prototype.title;
    /** @type {?} */
    TWAPromptDialogComponent.prototype.message;
    /** @type {?} */
    TWAPromptDialogComponent.prototype.messageHtml;
    /** @type {?} */
    TWAPromptDialogComponent.prototype.fields;
    /** @type {?} */
    TWAPromptDialogComponent.prototype.okText;
    /** @type {?} */
    TWAPromptDialogComponent.prototype.cancelText;
    /** @type {?} */
    TWAPromptDialogComponent.prototype.onSubmit;
    /** @type {?} */
    TWAPromptDialogComponent.prototype.dialogRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdhLXByb21wdC1kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vdHdhLW1kMi1kaWFsb2dzLyIsInNvdXJjZXMiOlsibGliL3Byb21wdC1kaWFsb2cvdHdhLXByb21wdC1kaWFsb2cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNoRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHcEUsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTRIaEQsTUFBTTs7OztJQWFGLFlBQW1CLFNBQWlEO1FBQWpELGNBQVMsR0FBVCxTQUFTLENBQXdDO29CQVgzQyxJQUFJLFNBQVMsQ0FBQyxFQUFFLENBQUM7NEJBQ1IsSUFBSSxZQUFZLEVBQUU7S0FXbkQ7Ozs7SUFFRCxRQUFRO1FBRUosdUJBQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNyQixHQUFHLENBQUMsQ0FBQyx1QkFBTSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDMUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLFdBQVcsQ0FDM0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksRUFBRSxFQUMxQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FB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QUcsRUFBRSxDQUFDO1FBRTFCLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDYixHQUFHLENBQUMsQ0FBQyx1QkFBTSxVQUFVLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9DLEVBQUUsQ0FBQyxDQUFDLFVBQVUsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO29CQUM1QixjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDNUM7Z0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUM5QixjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDL0Q7YUFDSjtTQUNKO1FBRUQsTUFBTSxDQUFDLGNBQWMsQ0FBQzs7OztZQWxPN0IsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSx1QkFBdUI7OztnQkFHakMsTUFBTSxFQUFFLENBQUMsc0RBQXNELENBQUM7Z0JBQ2hFLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQXVHVDthQUNKOzs7O1lBL0hRLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXREaWFsb2dSZWYgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCwgRm9ybUdyb3VwLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgU2FmZUh0bWwgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuaW1wb3J0IHsgbWFwLCBzdGFydFdpdGggfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVRXQVByb21wdEZpZWxkIHtcbiAgICBrZXk6IHN0cmluZztcbiAgICBsYWJlbDogc3RyaW5nO1xuICAgIHR5cGU6IHN0cmluZztcbiAgICBmeEZsZXg6IHN0cmluZztcbiAgICB2YWx1ZTogc3RyaW5nO1xuICAgIG9wdGlvbnM6IGFueVtdO1xuICAgIGF1dG9jb21wbGV0ZTogYW55O1xuICAgIHJvd3M6IGFueVtdO1xuICAgIHZhbGlkYXRpb246IGFueTtcbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd0d2EtYXBwLXByb21wdC1kaWFsb2cnLFxuICAgIC8vIHRlbXBsYXRlVXJsOiAnLi90d2EtcHJvbXB0LWRpYWxvZy5jb21wb25lbnQuaHRtbCcsXG4gICAgLy8gc3R5bGVVcmxzOiBbJy4vdHdhLXByb21wdC1kaWFsb2cuY29tcG9uZW50LmNzcyddXG4gICAgc3R5bGVzOiBbJy5tYXQtZXJyb3IgeyBkaXNwbGF5OiBibG9jazsgbWFyZ2luOiAtMTVweCAwIDE1cHg7IH0nXSxcbiAgICB0ZW1wbGF0ZTogYFxuICAgIDxoMj57eyB0aXRsZSB9fTwvaDI+XG4gICAgPHAgW2lubmVySHRtbF09XCJtZXNzYWdlSHRtbFwiPjwvcD5cblxuICAgIDxmb3JtIG5vdmFsaWRhdGUgKG5nU3VibWl0KT1cIm9uU3VibWl0KGZvcm0udmFsdWUpXCIgW2Zvcm1Hcm91cF09XCJmb3JtXCIgZnhMYXlvdXQ9XCJyb3cgd3JhcFwiIGZ4TGF5b3V0R2FwPVwiMTBweFwiPlxuICAgICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBwcm9wIG9mIGZpZWxkc1wiIGZ4RmxleD1cInt7cHJvcC5meEZsZXggPyAoJ2NhbGMoJyArIHByb3AuZnhGbGV4ICsgJyAtIDEwcHgpJykgOiAnMTAwJSd9fVwiIGZ4TGF5b3V0PVwiY29sdW1uXCI+XG4gICAgICAgICAgICA8ZGl2IFtuZ1N3aXRjaF09XCJwcm9wLnR5cGVcIiBmeEZsZXg9XCIxMDAlXCI+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ3RleHQnXCI+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZCAqbmdJZj1cIiFwcm9wLmF1dG9jb21wbGV0ZVwiIGZ4RmxleD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBtYXRJbnB1dCBwbGFjZWhvbGRlcj1cInt7cHJvcC5sYWJlbH19XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cInByb3Aua2V5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaWRdPVwicHJvcC5rZXlcIiBbdHlwZV09XCJwcm9wLnR5cGVcIiBmeEZsZXg+XG4gICAgICAgICAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJwcm9wLmF1dG9jb21wbGV0ZVwiIGZ4RmxleD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZCBmeEZsZXg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IG1hdElucHV0IHBsYWNlaG9sZGVyPVwie3twcm9wLmxhYmVsfX1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cInByb3Aua2V5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW21hdEF1dG9jb21wbGV0ZV09XCJhdXRvXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGJsdXIpPVwiYWNDaGVja0JsdXIocHJvcClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaWRdPVwicHJvcC5rZXlcIiBbdHlwZV09XCJwcm9wLnR5cGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bWF0LWF1dG9jb21wbGV0ZSAjYXV0bz1cIm1hdEF1dG9jb21wbGV0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKG9wdGlvblNlbGVjdGVkKT1cImFjQ2xpY2socHJvcCwgJGV2ZW50KVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgcHJvcC5hdXRvY29tcGxldGUuZmlsdGVyZWRPcHRpb25zIHwgYXN5bmNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdmFsdWVdPVwib3B0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgb3B0aW9uIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9tYXQtb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9tYXQtYXV0b2NvbXBsZXRlPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCIndGV4dGFyZWEnXCI+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZCBmeEZsZXg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWEgbWF0SW5wdXQgcGxhY2Vob2xkZXI9XCJ7e3Byb3AubGFiZWx9fVwiIHJvd3M9XCJ7e3Byb3Aucm93c3x8JzMnfX1cIiBhdXRvc2l6ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwicHJvcC5rZXlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpZF09XCJwcm9wLmtleVwiIFt0eXBlXT1cInByb3AudHlwZVwiPjwvdGV4dGFyZWE+XG4gICAgICAgICAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ251bWJlcidcIj5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkIGZ4RmxleD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBtYXRJbnB1dCBwbGFjZWhvbGRlcj1cInt7cHJvcC5sYWJlbH19XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cInByb3Aua2V5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaWRdPVwicHJvcC5rZXlcIiBbdHlwZV09XCJwcm9wLnR5cGVcIj5cbiAgICAgICAgICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIidkYXRlJ1wiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgZnhGbGV4PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IG1hdElucHV0IFttYXREYXRlcGlja2VyXT1waWNrZXIgcGxhY2Vob2xkZXI9XCJ7e3Byb3AubGFiZWx9fVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJwcm9wLmtleVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2lkXT1cInByb3Aua2V5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bWF0LWRhdGVwaWNrZXIgI3BpY2tlcj48L21hdC1kYXRlcGlja2VyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1kYXRlcGlja2VyLXRvZ2dsZSBtYXRTdWZmaXggW2Zvcl09XCJwaWNrZXJcIj48L21hdC1kYXRlcGlja2VyLXRvZ2dsZT5cbiAgICAgICAgICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCIndGltZSdcIj5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkIGZ4RmxleD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBtYXRJbnB1dCBbbmd4VGltZXBpY2tlcl09XCJ0cGlja2VyXCIgcGxhY2Vob2xkZXI9XCJ7e3Byb3AubGFiZWx9fVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Zvcm1hdF09XCIyNFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJwcm9wLmtleVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2lkXT1cInByb3Aua2V5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIgI3RwaWNrZXI+PC9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlcj5cbiAgICAgICAgICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIidyYWRpbydcIiBmeExheW91dD1cImNvbHVtblwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IF9uZ2NvbnRlbnQtYzIwPVwiXCIgc3R5bGU9XCJoZWlnaHQ6IDIwcHg7XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgX25nY29udGVudC1jMjA9XCJcIiBzdHlsZT1cInRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMS4yODEyNWVtKSBzY2FsZSgwLjc1KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJzcGVjdGl2ZSgxMDBweClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlWigwLjAwMXB4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMS4yODEyNWVtKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2FsZSgwLjc1KTt3aWR0aDogMTMzLjMzMzMzMzMzJTttYXJnaW46IDIwcHggMCAwIDA7Zm9udC13ZWlnaHQ6IDEwMDtjb2xvcjogIzY2NjtcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7e3Byb3AubGFiZWx9fVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtcmFkaW8tZ3JvdXAgW2Zvcm1Db250cm9sTmFtZV09XCJwcm9wLmtleVwiIFtuYW1lXT1cInByb3Aua2V5XCIgZnhMYXlvdXQ9XCJjb2x1bW5cIiBzdHlsZT1cIm1hcmdpbi10b3A6IDE0cHg7XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bWF0LXJhZGlvLWJ1dHRvbiBbdmFsdWVdPVwib3B0aW9uLnZhbHVlXCIgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBwcm9wLm9wdGlvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7e29wdGlvbi5sYWJlbH19XG4gICAgICAgICAgICAgICAgICAgICAgICA8L21hdC1yYWRpby1idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvbWF0LXJhZGlvLWdyb3VwPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ3NlbGVjdCdcIj5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkIGZ4RmxleD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxtYXQtc2VsZWN0IFtmb3JtQ29udHJvbE5hbWVdPVwicHJvcC5rZXlcIiBwbGFjZWhvbGRlcj1cInt7cHJvcC5sYWJlbH19XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1vcHRpb24gKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBwcm9wLm9wdGlvbnNcIiBbdmFsdWVdPVwib3B0aW9uLnZhbHVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IG9wdGlvbi5sYWJlbCB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbWF0LW9wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbWF0LXNlbGVjdD5cbiAgICAgICAgICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVycm9yXCIgKm5nSWY9XCJmb3JtLmdldChwcm9wLmtleSkuaW52YWxpZCAmJiAoZm9ybS5nZXQocHJvcC5rZXkpLmRpcnR5IHx8IGZvcm0uZ2V0KHByb3Aua2V5KS50b3VjaGVkKVwiIGZ4RmxleD1cIjEwMCVcIj5cbiAgICAgICAgICAgICAgICA8bWF0LWVycm9yICpuZ0lmPVwiZm9ybS5nZXQocHJvcC5rZXkpLmVycm9ycy5yZXF1aXJlZFwiPlxuICAgICAgICAgICAgICAgICAgICBFbCBjYW1wbyB7eyBwcm9wLmxhYmVsIH19IGVzIG9ibGlnYXRvcmlvLlxuICAgICAgICAgICAgICAgIDwvbWF0LWVycm9yPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZm9ybT5cblxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG1hdC1yYWlzZWQtYnV0dG9uXG4gICAgICAgIChjbGljayk9XCJzZW5kKClcIj57eyBva1RleHQgfX08L2J1dHRvbj5cbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBtYXQtYnV0dG9uXG4gICAgICAgIChjbGljayk9XCJkaWFsb2dSZWYuY2xvc2UoZmFsc2UpXCI+e3sgY2FuY2VsVGV4dCB9fTwvYnV0dG9uPlxuXG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBUV0FQcm9tcHREaWFsb2dDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgcHVibGljIGZvcm06IEZvcm1Hcm91cCA9IG5ldyBGb3JtR3JvdXAoe30pO1xuICAgIGZvcm1TdWJtaXRFdjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBwdWJsaWMgdGl0bGU6IHN0cmluZztcbiAgICBwdWJsaWMgbWVzc2FnZTogc3RyaW5nO1xuICAgIHB1YmxpYyBtZXNzYWdlSHRtbDogU2FmZUh0bWw7XG4gICAgcHVibGljIGZpZWxkczogSVRXQVByb21wdEZpZWxkW107XG4gICAgcHVibGljIG9rVGV4dDogc3RyaW5nO1xuICAgIHB1YmxpYyBjYW5jZWxUZXh0OiBzdHJpbmc7XG4gICAgcHVibGljIG9uU3VibWl0OiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8VFdBUHJvbXB0RGlhbG9nQ29tcG9uZW50Pikge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuXG4gICAgICAgIGNvbnN0IGZvcm1Hcm91cCA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IGkgaW4gdGhpcy5maWVsZHMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmZpZWxkcy5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgICAgICAgICAgIGZvcm1Hcm91cFt0aGlzLmZpZWxkc1tpXS5rZXldID0gbmV3IEZvcm1Db250cm9sKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpZWxkc1tpXS52YWx1ZSB8fCAnJyxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBWYWxpZGF0b3JzKHRoaXMuZmllbGRzW2ldLnZhbGlkYXRpb24pXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmZpZWxkc1tpXS5hdXRvY29tcGxldGUpO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5maWVsZHNbaV0uYXV0b2NvbXBsZXRlICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLmZpZWxkc1tpXS5hdXRvY29tcGxldGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmZpZWxkc1tpXS5hdXRvY29tcGxldGUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpZWxkc1tpXS5hdXRvY29tcGxldGUuZmlsdGVyZWRPcHRpb25zID0gdGhpcy5nZXRGb3JtR3JvdXBFdmVudChmb3JtR3JvdXAsIGkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZm9ybSA9IG5ldyBGb3JtR3JvdXAoZm9ybUdyb3VwKTtcblxuICAgIH1cblxuICAgIGdldEZvcm1Hcm91cEV2ZW50KGZvcm1Hcm91cCwgaSkge1xuICAgICAgICByZXR1cm4gZm9ybUdyb3VwW3RoaXMuZmllbGRzW2ldLmtleV0udmFsdWVDaGFuZ2VzLnBpcGUoXG4gICAgICAgICAgICBzdGFydFdpdGgoJycpLFxuICAgICAgICAgICAgbWFwKGZpbHRlclZhbHVlID0+IGZpbHRlclZhbHVlID8gdGhpcy5fZmlsdGVyVmFsdWVzKGZpbHRlclZhbHVlLCB0aGlzLmZpZWxkc1tpXS5hdXRvY29tcGxldGUub3B0aW9ucykgOlxuICAgICAgICAgICAgICAgIHRoaXMuZmllbGRzW2ldLmF1dG9jb21wbGV0ZS5vcHRpb25zLnNsaWNlKCkpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZmlsdGVyVmFsdWVzKHZhbHVlLCBvcHRpb25zKSB7XG5cbiAgICAgICAgY29uc3QgZmlsdGVyZWRWYWx1ZSA9IHZhbHVlLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgcmV0dXJuIG9wdGlvbnMuZmlsdGVyKG9wdGlvbiA9PiBvcHRpb24udG9Mb3dlckNhc2UoKS5pbmRleE9mKGZpbHRlcmVkVmFsdWUpID49IDApO1xuXG4gICAgfVxuXG4gICAgZ2V0Rm9ybVN1Ym1pdEV2KCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm9ybVN1Ym1pdEV2O1xuICAgIH1cblxuICAgIHNlbmQoKSB7XG4gICAgICAgICAgICBsZXQgaTtcbiAgICAgICAgICAgIHRoaXMuZm9ybS51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgICAgICAgICBpZiAodGhpcy5mb3JtLnN0YXR1cyAhPT0gJ0lOVkFMSUQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKHRoaXMuZm9ybS52YWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgaW4gdGhpcy5mb3JtLmNvbnRyb2xzKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuZm9ybS5jb250cm9sc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZm9ybS5jb250cm9scy5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtLmNvbnRyb2xzW2ldLm1hcmtBc1RvdWNoZWQoeyBvbmx5U2VsZjogdHJ1ZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZm9ybS5jb250cm9sc1tpXS51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgfVxuXG4gICAgYWNDbGljayhmaWVsZDogYW55LCBldmVudDogYW55KSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGV2ZW50KTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coZmllbGQuYXV0b2NvbXBsZXRlKTtcbiAgICAgICAgaWYgKHR5cGVvZiBmaWVsZC5hdXRvY29tcGxldGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGZpZWxkLmF1dG9jb21wbGV0ZS5mb3JjZVNlbGVjdCAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgICAgICAgICBmaWVsZC5hdXRvY29tcGxldGUuZm9yY2VTZWxlY3QpIHtcbiAgICAgICAgICAgICAgICBmaWVsZC5hdXRvY29tcGxldGUuc2VsZWN0ZWQgPSBldmVudC5vcHRpb24udmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhY0NoZWNrQmx1cihmaWVsZCkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhmaWVsZC5hdXRvY29tcGxldGUuc2VsZWN0ZWQsIHRoaXMuZm9ybS5jb250cm9sc1tmaWVsZC5rZXldLnZhbHVlKTtcbiAgICAgICAgaWYgKHR5cGVvZiBmaWVsZC5hdXRvY29tcGxldGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGZpZWxkLmF1dG9jb21wbGV0ZS5mb3JjZVNlbGVjdCAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgICAgICAgICBmaWVsZC5hdXRvY29tcGxldGUuZm9yY2VTZWxlY3QpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWZpZWxkLmF1dG9jb21wbGV0ZS5zZWxlY3RlZCB8fFxuICAgICAgICAgICAgICAgICAgICBmaWVsZC5hdXRvY29tcGxldGUuc2VsZWN0ZWQgIT09IHRoaXMuZm9ybS5jb250cm9sc1tmaWVsZC5rZXldLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9ybS5jb250cm9sc1tmaWVsZC5rZXldLnNldFZhbHVlKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICBmaWVsZC5hdXRvY29tcGxldGUuc2VsZWN0ZWQgPSAnJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdWJtaXRGb3JtKGZvcm06IGFueSkge1xuICAgICAgICAgICAgdGhpcy5mb3JtU3VibWl0RXYuZW1pdChmb3JtKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG1hcFZhbGlkYXRvcnModmFsaWRhdG9yczogYW55KSB7XG5cbiAgICAgICAgY29uc3QgZm9ybVZhbGlkYXRvcnMgPSBbXTtcblxuICAgICAgICBpZiAodmFsaWRhdG9ycykge1xuICAgICAgICAgICAgZm9yIChjb25zdCB2YWxpZGF0aW9uIG9mIE9iamVjdC5rZXlzKHZhbGlkYXRvcnMpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbGlkYXRpb24gPT09ICdyZXF1aXJlZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybVZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLnJlcXVpcmVkKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbGlkYXRpb24gPT09ICdtaW4nKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1WYWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5taW4odmFsaWRhdG9yc1t2YWxpZGF0aW9uXSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmb3JtVmFsaWRhdG9ycztcbiAgICB9XG5cbn1cbiJdfQ==