declare var require: any;       // To avoid compilation errors with "require"...

import { Component } from '@angular/core';
import { TWADialogsModule } from 'twa-md2-dialogs';
// import { TWADialogsModule } from '../../../projects/twa-md2-dialogs/src/public_api';


@Component({
    selector: 'autocomplete-sample',
    templateUrl: './autocomplete-sample.component.html',
})
export class AutocompleteSampleComponent {

    title = 'ld';
    demoAutocomplete: string = require('!!raw-loader?lang=typescript!./../../assets/code/autocomplete-sample.ts');

    constructor(
        private dialogsService: TWADialogsModule
    ) {}

    showDemoAutocomplete() {
        this.dialogsService
            .prompt(
                'Dialog with autocomplete',
                'Here we show a <strong>text field</strong> with autocomplete.',
                [
                    {
                        key: 'field1',
                        label: 'Autocomplete field',
                        type: 'text',
                        value: '',
                        fxFlex: '100',
                        autocomplete: {
                            forceSelect: true,
                            options: [
                                'first option',
                                'second option',
                                'third option',
                                'fourth option'
                            ]
                        }
                    },
                ],
                'Send',
                'Cancel')
            .subscribe(res => {
                console.log(res);
            }
        );
    }

}
