declare var require: any;       // To avoid compilation errors with 'require'...

import { Component, Output, EventEmitter, ViewChild, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';

import { BehaviorSubject, Observable, merge } from 'rxjs';
import { map } from 'rxjs/operators';

// import { TWADialogsModule } from '../../../projects/twa-md2-dialogs/src/lib/twa-dialogs.module';
import { TWADialogsModule } from 'twa-md2-dialogs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TWAFilterEditorService, TWAFilterEditorComponent, FieldFilter } from '../../../projects/twa-md2-filter-editor/src/public_api';
import { TwaMd2NotificationsService } from 'twa-md2-notifications';

@Component({
    selector: 'ld-filter-editor-sample',
    templateUrl: './filter-editor-sample.component.html',
    styles: [
       `mat-header-cell.tools,
        mat-cell.tools {
            max-width: 40px!important;
        }
        mat-cell.tools div.tools {
           display: none;
        }
        mat-row:hover mat-cell.tools div.tools {
           display: block;
        }
       `,
    ]
})
export class FilterEditorSampleComponent implements OnInit {

    title = 'ld';
    demoFilterHTML: string = require('!!raw-loader!./../../assets/code/filter-editor-sample.component.html.txt');
    demoFilterTypeScript: string = require('!!raw-loader!./../../assets/code/filter-editor-sample.component.ts.txt');
    // demoFilterHTML: string = require('!!raw-loader?lang=html!./../../assets/code/filter-editor-sample.component.html.txt');
    // demoFilterTypeScript: string = require('!!raw-loader?lang=typescript!./../../assets/code/filter-editor-sample.component.ts.txt');
    demoFilterJSON: string = `\n` + JSON.stringify(require('./../../assets/data/bbt.json'), null, 4);
    episodesDB: BBTDatabase | null;
    episodes: BBTDataSource | null;
    filter: BBTFilter = new BBTFilter();
    selectedTab = 0;

    displayedColumns = [
        'airdate',
        'airtime',
        'name',
        'number',
        'season',
        'summary',
        'tools'
    ];
    fieldOptions = {
        title: 'test',
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
            {
                name: 'number',
                field: 'number',
                label: 'Episode',
                orderDir: '',
                color: 'primary'
            },
            {
                name: 'season',
                field: 'season',
                label: 'Season',
                orderDir: '',
                color: 'primary'
            },
            {
                name: 'summary',
                field: 'summary',
                label: 'Summary',
                orderDir: '',
                color: 'primary'
            },
        ],
        results: []
    };
    /* Configuration object for the filter editor */
    filterConfig = {
        /* with operationsData you can limit the operators or change their labels */
        operationsData: [
            {
                type: 'contain',
                label: 'includes',
                operator: '=>'
            },
            {
                type: 'equal',
                label: 'equals',
                operator: '==='
            },
            {
                type: 'greaterEqual',
                label: 'greater or equal',
                operator: '>='
            },
            {
                type: 'greater',
                label: 'greater',
                operator: '>'
            },
            {
                type: 'lessEqual',
                label: 'less or equal',
                operator: '<='
            },
            {
                type: 'less',
                label: 'less',
                operator: '<'
            },
            {
                type: 'in',
                label: 'in',
                operator: 'in'
            },
        ],
        /* with *filter* you can send an initial filter to the filter editor */
        // filter: [
        // ]
    };
    @ViewChild(MatPaginator, {static: true})
    paginator: MatPaginator;
    @ViewChild(TWAFilterEditorComponent, {static: true})
    BBTFilter: TWAFilterEditorComponent;
    @ViewChild('demoTabs', {static: true})
    demoTabs;

    initialFilters = [];

    sort: MatSort = new MatSort();

    constructor(
        private dialogsService: TWADialogsModule,
        private http: HttpClient,
        private filterService: TWAFilterEditorService,
        private notifsService: TwaMd2NotificationsService,
    ) {}

    ngOnInit() {

        this.episodesDB = new BBTDatabase(this.http);
        this.episodes = new BBTDataSource(
            this.episodesDB,
            this.paginator,
            this.sort,
            this.filter,
            this.fieldOptions,
            this.filterService,
        );
        const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
        const options = { headers: headers};
        this.filterService.init(
            this.BBTFilter,
            this.episodesDB.data.slice(),
            (filter, filterValue) => {
                // Here we can manipulate the data before that are filtered
            });

        this.sort.active = 'airdate';

    }

    tabChanged(event) {
        this.selectedTab = event.index;
    }

    getRows() {
        return (this.episodes ? this.episodes.resultsLength : 0);
    }

    loadFilter() {

        const filter = [
            {
                color: 'primary',
                explanation: '"Sheldon" => summary',
                label: 'Summary',
                name: 'summary',
                field: 'summary',
                bitwise: '&&',
                operation: '=>',
                value: 'Sheldon'
            },
            {
                explanation: '"Wolowitz" => summary',
                color: 'primary',
                label: 'Summary',
                name: 'summary',
                field: 'summary',
                bitwise: '&&',
                operation: '=>',
                value: 'Wolowitz'
            },
            {
                color: '',
                name: '',
                field: '',
                isgroup: true,
                bitwise: '&&',
                fields: [
                    {
                        color: 'primary',
                        explanation: '"2013" => airdate',
                        label: 'Air Date',
                        name: 'airdate',
                        field: 'airdate',
                        bitwise: '||',
                        operation: '=>',
                        value: '2013',
                        selected: false
                    },
                    {
                        color: 'primary',
                        explanation: '"2014" => airdate',
                        label: 'Air Date',
                        name: 'airdate',
                        field: 'airdate',
                        bitwise: '||',
                        operation: '=>',
                        value: '2014',
                        selected: false
                    },
                    {
                        color: 'primary',
                        explanation: 'season > 9',
                        label: 'Season',
                        name: 'season',
                        field: 'season',
                        bitwise: '||',
                        operation: '>',
                        value: '9',
                        selected: false,
                    }
                ],
                selected: false
            },
        ];

        this.BBTFilter.activeFilters = filter;
        this.onChange(this.episodes.filter);

    }

    onChange(filters: any[]) {
        this.episodes.filter = filters;
        this.filter.change.emit(filters);
    }

    openEpisode(episode, idx) {

        const episodeForm = [
            {
                key: 'name',
                label: 'Title',
                type: 'text',
                value: episode.name
            },
            {
                key: 'airdate',
                label: 'Air date',
                type: 'date',
                value: episode.airdate,
                fxFlex: '50%'
            },
            {
                key: 'airtime',
                label: 'Air date',
                type: 'time',
                value: episode.airtime,
                fxFlex: '50%'
            },
            {
                key: 'number',
                label: 'Episode',
                type: 'number',
                value: episode.number,
                fxFlex: '50%'
            },
            {
                key: 'season',
                label: 'Season',
                type: 'text',
                value: episode.season,
                fxFlex: '50%'
            },
            {
                key: 'summary',
                label: 'Summary',
                type: 'textarea',
                value: episode.summary
            },
        ];

        this.dialogsService.prompt(
            'Edit episode',
            '',
            episodeForm,
            'Save',
            'Cancel'
        ).subscribe(result => {
                if (result) {
                    this.episodesDB.data[(this.episodes.filteredData[idx] &&
                                          this.episodes.filteredData[idx].realIndex) ?
                                            this.episodes.filteredData[idx].realIndex : idx] = {...episode, ...result};
                    this.notifsService.add({
                        title: 'Episode edited!',
                        message: 'You\'re edited the episode "' + result.name + '"',
                        date: ''
                    });
                    this.onChange(this.episodes.filter);
                }
            }
        );

    }

    deleteEpisode(episode, idx) {
        this.dialogsService.confirm(
            'Delete episode',
            'This action removes the episode ' + episode.name + ' from de db. Are you sure?',
            'Yes',
            'No, please... cancel!'
        ).subscribe(res => {
            if (res) {
                this.episodesDB.data.splice(this.episodes.filteredData[idx].realIndex, 1);
                this.onChange(this.episodes.filter);
            }
        })
    }

}

export class BBTDatabase {

    dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    get data(): any[] { return this.dataChange.value; }
    resultLength: 0;
    episodes: any[];

    lastParams = {
        filter: {},
        sort: '',
        start: 0,
        limit: 25
    };

    constructor(
        private http: HttpClient,
    ) {

        this.reload();

    }

    reload(force = false) {

        if (!force && this.episodes && this.episodes.length) {
            let copiedData = [];
            this.data.splice(0, this.data.length);
            for (let i = 0, l = this.episodes.length; i < l; i++) {
                copiedData = this.data.slice();
                copiedData.push(this.episodes[i]);
                this.dataChange.next(copiedData);
            }
            return;
        }

        const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
        const options = { headers: headers};

        this.http.get('./assets/data/bbt.json', options).subscribe(res => {
            this.episodes = res['_embedded'].episodes;
            let copiedData = [];
            this.data.splice(0, this.data.length);
            for (let i = 0, l = this.episodes.length; i < l; i++) {
                copiedData = this.data.slice();
                copiedData.push(this.episodes[i]);
                this.dataChange.next(copiedData);
            }
            if (this.episodes.length === 0) {
                this.dataChange.next(copiedData);
            }
        });

    }

}

export class BBTDataSource extends DataSource<any> {

    _filterChange = new BehaviorSubject(<FieldFilter[]>this._filter.filters);
    get filter(): FieldFilter[] { return this._filterChange.value; }
    set filter(filter: FieldFilter[]) { this._filterChange.next(filter); }

    filteredRows = 0;
    filteredData = [];

    resultsLength = 0;
    isLoadingResults = false;
    isRateLimitReached = false;
    filteredAnimals = [];
    // sort: MatSort;

    constructor(
        public _database: BBTDatabase,
        private _paginator: MatPaginator,
        private _sort: MatSort,
        public _filter: BBTFilter,
        private fieldOptions: any,
        private filterService: TWAFilterEditorService,
    ) {
        super();
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this._database.dataChange,
            this._paginator.page,
            this._filterChange,
        ];

        return merge(...displayDataChanges).pipe(
            map(() => {

                const data = this.filterService.applyFilter(this._database.data.slice());

                this.filteredRows = data.length;
                let startIndex = this._paginator.pageIndex * this._paginator.pageSize;
                if (startIndex >= data.length) {
                    this._paginator.pageIndex = 0;
                    startIndex = 0;
                }
                // this.filteredData = this.getSortedData(data).splice(startIndex, this._paginator.pageSize);
                this.resultsLength = data.length;
                this.filteredData = data.splice(startIndex, this._paginator.pageSize);
                return this.filteredData;
            })
        );
    }

    toggleFiltered(selected: boolean, arrayToggled: any[]) {

        let ret = true;

        this._database.data.map((item: any, idx: number) => {

            ret = this.filterService.applyFilterToRow(item);

            if (ret) {
                item.selected = selected;
                arrayToggled.push(idx);
            }

        });

    }

    /** Returns a sorted copy of the database data. */
    getSortedData(data: any[]): any[] {

        if (!this._sort.active || this._sort.direction === '') {
                return data;
        }

        return data.sort((a, b) => {
            let propertyA: number|string = '';
            let propertyB: number|string = '';
            let tmpdata: any|string = '';

            for (const i in this.fieldOptions.fields) {
                if (this.fieldOptions.fields.hasOwnProperty(i)) {
                    tmpdata = this.fieldOptions.fields[i].field;
                    if (this._sort.active === tmpdata) {
                        [propertyA, propertyB] = [a[this.fieldOptions.fields[i].field], b[this.fieldOptions.fields[i].field]];
                        break;
                    }
                }
            }

            const valueA = (propertyA === '' || isNaN(+propertyA)) ? propertyA : +propertyA;
            const valueB = (propertyB === '' || isNaN(+propertyB)) ? propertyB : +propertyB;

            return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
        });
    }

    disconnect() {}

}

class BBTFilter {

    filters: FieldFilter[] = [];

    @Output() change: EventEmitter<any> = new EventEmitter();
    toJson() {
            return {
                    filters: this.filters,
            };
    }
    isEmpty() {
        return (!this.filters.length);
    }

}
