# twa-modules

Modules made for angular material. The set includes:

- [twa-md2-dialogs](https://github.com/jarios71//twa-md2-lib/#twa-md2-dialogs)
- [twa-md2-notifications](https://github.com/jarios71//twa-md2-lib/#twa-md2-notifications)
- [twa-md2-filter-editor](https://github.com/jarios71//twa-md2-lib/#twa-md2-filter-editor)

[Online demo](https://jarios71.github.io/twa-md2-lib/)

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
                    {
                        key: 'file1',
                        label: 'File upload',
                        type: 'file',
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
import { TWAMd2NotificationsModule } from 'twa-md2-notifications';

@NgModule({
    imports: [
        ...
        TWAMd2NotificationsModule,
        ...
    ],
    ...
})
```

And you can start to launch notifications:

```typescript
import { TWAMd2NotificationsModule } from 'twa-md2-notifications';

export class AppComponent {

    constructor(
        private notifsService: TWAMd2NotificationsModule
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

# twa-md2-filter-editor

This plugin offers an interface to create complex filters visually, it also provides a service that processes the data and returns it already filtered.

The service can process all data at once or record by record.

## Installation

npm way:

npm i twa-md2-filter-editor --save

## Usage

First, include the module in your app module:

```typescript
import { TWAMd2FilterEditorModule } from 'twa-md2-filter-editor';

@NgModule({
    imports: [
        ...
        TWAMd2FilterEditorModule,
        ...
    ],
    ...
})
```

 Now you can insert the component and start to filter data:

```html
    <twa-md2-filter-editor [options]="fieldOptions" [config]="filterConfig" (change)="onChange($event)" #BBTFilter fxFlex></twa-md2-filter-editor>

```

```typescript
import { TWAMd2FilterEditorModule } from 'twa-md2-filter-editor';

export class AppComponent implements OnInit {

    fieldOptions = {
        fields: [
            {
                name: 'airdate',
                field: 'airdate',
                label: 'Air Date',
                orderDir: '',
                color: 'primary'
            },
            {
                name: 'airtime',
                field: 'airtime',
                label: 'Air Time',
                orderDir: '',
                color: 'primary'
            },
            {
                name: 'name',
                field: 'name',
                label: 'Title',
                orderDir: '',
                color: 'primary'
            },
            ...
        ],
    };
    filterConfig = {
        /* with operationsData you can limit the operators or change their labels */
        operationsData: [
            {
                type: 'contain',
                label: 'include',
                operator: '=>'
            },
            {
                type: 'equal',
                label: 'equals',
                operator: '==='
            },
            ...
        ]
    };

    @ViewChild(TWAFilterEditorComponent)
    BBTFilter: TWAFilterEditorComponent;

    constructor(
        private filterService: TWAMd2FilterEditorService
    ) {}

    ngOnInit() {

        this.episodesDB = new BBTDatabase(this.http);

        this.filterService.init(
            this.BBTFilter,
            this.episodesDB.data.slice(),
            (filter, filterValue) => {
                // Here we can manipulate the data before that are filtered
            }
        );
    }

    ...

```

## Donation

If this project help you reduce time to develop, you can give me a cup of coffee (or depending on the time... a cold beer) ;)

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=G9LBKNGB73L64)

## Build

Run `ng build --project twa-md2-dialogs` to build the dialogs module. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

Run `ng build --project twa-md2-notifications` to build the notifications module. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

Run `ng build --project twa-md2-filter-editor` to build the filter editor module. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

Run `ng build` to build the sample. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
