import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
export declare class TWADialogsModule {
    private dialog;
    private _sanitizer;
    constructor(dialog: MatDialog, _sanitizer: DomSanitizer);
    confirm(title: string, message: string, okText?: string, cancelText?: string): Observable<any>;
    prompt(title: string, message: string, fields: any, okText?: string, cancelText?: string, onChanges?: any): Observable<any>;
}
