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

