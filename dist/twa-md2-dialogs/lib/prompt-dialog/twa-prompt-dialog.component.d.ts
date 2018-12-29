import { EventEmitter, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { SafeHtml } from '@angular/platform-browser';
export interface ITWAPromptField {
    key: string;
    label: string;
    type: string;
    fxFlex: string;
    value: string;
    options: any[];
    autocomplete: any;
    rows: any[];
    validation: any;
}
export declare class TWAPromptDialogComponent implements OnInit {
    dialogRef: MatDialogRef<TWAPromptDialogComponent>;
    form: FormGroup;
    formSubmitEv: EventEmitter<any>;
    title: string;
    message: string;
    messageHtml: SafeHtml;
    fields: ITWAPromptField[];
    okText: string;
    cancelText: string;
    onSubmit: any;
    constructor(dialogRef: MatDialogRef<TWAPromptDialogComponent>);
    ngOnInit(): void;
    getFormGroupEvent(formGroup: any, i: any): any;
    private _filterValues;
    getFormSubmitEv(): EventEmitter<any>;
    send(): void;
    acClick(field: any, event: any): void;
    acCheckBlur(field: any): void;
    submitForm(form: any): void;
    private mapValidators;
}
