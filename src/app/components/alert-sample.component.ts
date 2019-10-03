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
    demoAlert: string = '';
    // demoAlert: string = require('!!raw-loader?lang=typescript!./../../assets/code/alert-sample.ts.txt');

    constructor(
        private dialogsService: TWADialogsModule
    ) {
        fetch('./assets/code/alert-sample.ts.txt').then(response => {
            response.text().then(text => {
                this.demoAlert = text;
            });
        });
    }

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
