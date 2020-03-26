import { EventEmitter, OnInit, OnChanges } from '@angular/core';
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
    validationMessages?: any;
}
export declare class TWAMd2DynformsComponent implements OnInit, OnChanges {
    data: any;
    form: FormGroup;
    formSubmitEv: EventEmitter<any>;
    formData: FormData;
    isMultipart: boolean;
    title: string;
    message: string;
    messageHtml: SafeHtml;
    fields: ITWAPromptField[];
    submit: EventEmitter<any>;
    okText: string;
    cancelText: string;
    onSubmit: any;
    constructor();
    ngOnInit(): void;
    ngOnChanges(): void;
    createForm(): void;
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
