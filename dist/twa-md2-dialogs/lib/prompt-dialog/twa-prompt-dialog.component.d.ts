import { EventEmitter, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { SafeHtml } from '@angular/platform-browser';
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
export declare class TWAPromptDialogComponent implements OnInit {
    dialogRef: MatDialogRef<TWAPromptDialogComponent>;
    form: FormGroup;
    formSubmitEv: EventEmitter<any>;
    formData: FormData;
    isMultipart: boolean;
    title: string;
    message: string;
    messageHtml: SafeHtml;
    fields: ITWAPromptField[];
    okText: string;
    cancelText: string;
    onSubmit: any;
    onChanges: any;
    updatingOnChanges: boolean;
    constructor(dialogRef: MatDialogRef<TWAPromptDialogComponent>);
    ngOnInit(): void;
    setOnChanges(): void;
    getFormGroupEvent(formGroup: any, i: any): any;
    log(object: any): void;
    private _filterValues;
    getFormSubmitEv(): EventEmitter<any>;
    send(): void;
    acClick(field: any, event: any): void;
    acCheckBlur(field: any): void;
    submitForm(form: any): void;
    drawCustomErrors(prop: any, error: any): boolean;
    private mapValidators;
    addFiles(formElement: any): void;
    changeFiles(formElement: any): void;
}
