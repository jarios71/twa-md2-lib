declare var require: any;       // To avoid compilation errors with "require"...

import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TWADialogsModule } from 'twa-md2-dialogs';
import { TwaMd2NotificationsService } from 'twa-md2-notifications';

@Component({
    selector: 'ld-root',
    templateUrl: './app.component.html',
    styleUrls: [
        './app.component.scss'
    ]
})
export class AppComponent {

    title = 'ld';
    demoAlert: string = require('!!raw-loader!./../assets/code/alert-sample.ts.txt');
    demoConfirm: string = require('!!raw-loader!./../assets/code/confirm-sample.ts.txt');
    demoAutocomplete: string = require('!!raw-loader!./../assets/code/autocomplete-sample.ts.txt');
    demoForm: string = require('!!raw-loader!./../assets/code/form-sample.ts.txt');
    demoDynForm: string = require('!!raw-loader!./../assets/code/dynform-sample.ts.txt');
    // demoAlert: string = require('!!raw-loader?lang=typescript!./../assets/code/alert-sample.ts.txt');
    // demoConfirm: string = require('!!raw-loader?lang=typescript!./../assets/code/confirm-sample.ts.txt');
    // demoAutocomplete: string = require('!!raw-loader?lang=typescript!./../assets/code/autocomplete-sample.ts.txt');
    // demoForm: string = require('!!raw-loader?lang=typescript!./../assets/code/form-sample.ts.txt');

    samplesDialog = [
        {
            title: 'Alert dialog',
            path: 'alert-sample'
        },
        {
            title: 'Confirm dialog',
            path: 'confirm-sample'
        },
        {
            title: 'Dialog with autocomplete',
            path: 'autocomplete-sample'
        },
        {
            title: 'Dialog with simple form',
            path: 'form-sample'
        },
    ];

    samplesFilter = [
        {
            title: 'Filter Editor',
            path: 'filter-editor-sample'
        },
    ];

    samplesDynForms = [
        {
            title: 'Dynamic Forms',
            path: 'dynform-sample'
        },
    ];

    constructor(
        private _Activatedroute: ActivatedRoute,
        public router: Router,
        private dialogsService: TWADialogsModule,
        public notifsService: TwaMd2NotificationsService
    ) {
        // this.router.events.subscribe((res) => {
        //     console.log(this.router.url, 'Current URL');
        // });
        this.notifsService.add({
            title: 'Hi! I\'m a notification',
            message: 'I\'m part of another component from this library',
            date: '',
            data: {
                type: 'notification',
                action: (notif) => {
                    console.log('Callback successful!!', notif);
                    this.notifsService.add({
                        title: 'I\'m a fired notification',
                        message: 'I\'m fired from a callback of first click, and I\'ve a custom image as icon.',
                        date: '',
                        data: {
                            type: 'notification',
                            action: (notif2) => {
                                console.log('Second callback successful!!', notif2);
                            }
                        },
                        image: './assets/images/yo-mangarized-100x100.png',
                    });
                }
            }
            // image: '/assets/images/yo-mangarized-100x100.png',
        });
        this.notifsService.add({
            title: 'I\'m a second notification',
            message: 'I\'m here only for demo',
            date: '',
            data: {
                type: 'notification',
                action: (notif) => {
                    console.log('Callback successful!!', notif);
                }
            }
        });
    }

    panelClicked(notif) {
        console.log('Callback Successful!!', notif);
    }

}
