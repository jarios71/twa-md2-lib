declare var require: any;       // To avoid compilation errors with "require"...

import { Component } from '@angular/core';
import { TWADialogsModule } from 'twa-md2-dialogs';
// import { TWADialogsModule } from '../../../projects/twa-md2-dialogs/src/public_api';


@Component({
    selector: 'confirm-sample',
    templateUrl: './confirm-sample.component.html',
})
export class ConfirmSampleComponent {

    title = 'ld';
    demoConfirm: string = '';

    constructor(
        private dialogsService: TWADialogsModule
    ) {
        fetch('./assets/code/confirm-sample.ts.txt').then(response => {
            response.text().then(text => {
                this.demoConfirm = text;
            });
        });
    }

    showDemoConfirm() {
        this.dialogsService
            .confirm(
                'Confirm Dialog',
                'This dialog allows you to display a message and set response options.',
                'Send',
                'Cancel'
            )
            .subscribe(res => {
                console.log(res);
            }
        );
    }

}
