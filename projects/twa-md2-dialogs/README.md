# twa-md2-dialogs

This module makes it easy to generate alert dialogs, confirmation or data collection.

It allows the generation of dynamic forms based on JSON objects, including basic validations and layout options.

## Installation

npm way:

npm i twa-md2-dialogs --save

## Usage

First, include the module in your app module:

```typescript
import { TWADialogsModule } from 'twa-md2-dialogs';

@NgModule({
    imports: [
        ...
        TWADialogsModule,
        ...
    ],
    ...
})
```

And you can start to launch dialogs:

```typescript
import { TWADialogsModule } from 'twa-md2-dialogs';

export class AppComponent {

    constructor(
        private dialogsService: TWADialogsModule
    ) {
    }

    showAlertDialog() {
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

    showPromptDialog() {
        this.dialogsService
            .prompt(
                'Dialog with simple form',
                'Here we show a simple form',
                [
                    {
                        key: 'name',
                        label: 'Name',
                        type: 'text',
                        value: '',
                        fxFlex: '100%',
                    },
                    {
                        key: 'sex',
                        label: 'Sex',
                        type: 'select',
                        value: '',
                        fxFlex: '50%',
                        options: [
                            {
                                label: 'Male',
                                value: '1'
                            },
                            {
                                label: 'Female',
                                value: '2'
                            },
                        ]
                    },
                    {
                        key: 'age',
                        label: 'Age',
                        type: 'number',
                        value: '',
                        fxFlex: '50%'
                    },
                    {
                        key: 'field1',
                        label: 'Autocomplete field',
                        type: 'text',
                        value: '',
                        fxFlex: '100%',
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
                    {
                        key: 'date',
                        label: 'Date',
                        type: 'date',
                        value: '',
                        fxFlex: '100%'
                    },
                ],
                'Send',
                'Cancel')
            .subscribe(res => {
                if (res) {
                    console.log(res);
                }
            }
        );
    }

```

## Build

Run `ng build` to build the sample. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

Run `ng build --project twa-md2-dialogs` to build the module. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
