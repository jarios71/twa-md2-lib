declare var require: any;       // To avoid compilation errors with "require"...

import { Component } from '@angular/core';
import { TWADialogsModule } from 'twa-md2-dialogs';
// import { TWADialogsModule } from '../../../projects/twa-md2-dialogs/src/lib/twa-dialogs.module';


@Component({
    selector: 'alert-sample',
    templateUrl: './alert-sample.component.html',
    // styleUrls: ['./alert-sample.component.css']
})
export class AlertSampleComponent {

    title = 'ld';
    demoAlert: string = require('!!raw-loader?lang=typescript!./../../assets/code/alert-sample.ts');

    constructor(
        private dialogsService: TWADialogsModule
    ) {}

    showDemoAlert() {
        this.dialogsService
            .confirm(
                'Alert dialog',
                'This dialog only contains a text and a closing button.',
                'Close'
            )
            .subscribe(res => {
                console.log(res);
            }
        );
    }

}
