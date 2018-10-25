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

# twa-md2-notifications

This module makes it easy to generate silent notifications and interact with them.

The notifications can be customizable and provide a service that makes them accessible throughout the application.

## Installation

npm way:

npm i twa-md2-notifications --save

## Usage

First, include the module in your app module:

```typescript
import { TwaMd2NotificationsModule } from 'twa-md2-notifications';

@NgModule({
    imports: [
        ...
        TwaMd2NotificationsModule,
        ...
    ],
    ...
})
```

And you can start to launch notifications:

```typescript
import { TwaMd2NotificationsModule } from 'twa-md2-notifications';

export class AppComponent {

    constructor(
        private notifsService: TwaMd2NotificationsModule
    ) {
        this.notifsService.add({
            title: 'Hi! I\'m a notification',
            message: 'I\'m part of another component from this library',
            date: '',
            data: {
                type: 'notification',
                action: (notif) => {
                    console.log('Callback successful!!', notif);
                }
            }
        });
    }

```

## Build

Run `ng build` to build the sample. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

Run `ng build --project twa-md2-dialogs` to build the module. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
