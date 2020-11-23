import { Injectable } from '@angular/core';

import { TWAFilterEditorComponent } from './twa-md2-filter-editor.component';
import { FieldFilter } from './twa-md2-filter-editor.interface';

@Injectable()
export class TWAFilterEditorService {

    filters: FieldFilter[];

    filteredData: any[];
    filter: TWAFilterEditorComponent;
    data: any[];
    prepareData: Function;
    processedFilters: any[];

    init(
        filter: TWAFilterEditorComponent,
        data: any[],
        prepareData?: Function
    ) {
        this.filter = filter;
        this.data = data;
        this.prepareData = prepareData;

        this.filter.change.subscribe((filters: FieldFilter[]) => {
            this.filters = filters;
            this.applyFilter();
        });
        this.processedFilters = this.processFilterOrs(this.filter.activeFilters);
    }

    applyFilter(data = this.data.slice()) {

        // let data = this.data.slice();
        let ret = true;
        const length = data.length;

        if (!this.filter) {
            return data;
        }

        this.processedFilters = this.processFilterOrs(this.filter.activeFilters);

        this.data = data;

        data = data.map((item, idx) => {
            item.realIndex = idx;
            return item;
        }).filter((item: any) => {
            ret = this.applyFilterToRow(item);
            return ret;
        });

        return data;

    }

    applyFilterToRow(item) {

        let ret = true;
        const results = [];

        for (let i = 0, l = this.processedFilters.length; i < l; i++) {
            const results2 = [];
            this.processedFilters[i].forEach((v: FieldFilter) => {
                results2.push(this.filterData(v, item));
            });
            results.push(results2.reduce((acc, v) => {
                if (!v) {
                    acc = v;
                }
                return acc;
            }, true));
        }

        if (results.length) {
            ret = results.reduce((acc, v) => {
                if (v) {
                    acc = v;
                }
                return acc;
            }, false);
        } else {
            ret = true;
        }

        return ret;

    }

    processFilterOrs = (filters) => {
        let actualFilter = 0;
        const newFilters = [];
        filters.forEach((v, i) => {
            if (i > 0 && v.bitwise === '||') {
                actualFilter++;
                newFilters.push([]);
            }
            if (typeof(newFilters[actualFilter]) === 'undefined') {
                newFilters.push([]);
            }
            if (v.isgroup) {
                const newGroup = {...v, fields: this.processFilterOrs(v.fields)};
                // console.log(newGroup);
                newFilters[actualFilter].push(newGroup);
            } else {
                newFilters[actualFilter].push(v);
            }
        });

        return newFilters;
    }

    filterData = (filter: any, filterValue: any) => {

      const comparators = {
        '=>': (a: string, b: string) => a.includes(b),
        '===': (a: any, b: any) => a === b,
        '>=': (a: any, b: any) => a >= b,
        '>': (a: any, b: any) => a > b,
        '<=': (a: any, b: any) => a <= b,
        '<': (a: any, b: any) => a < b,
        'in': (a: any, b: any) => b.split(',').includes(a),
      };
      const isNumeric = (n) => {
        return !isNaN(parseFloat(n)) && isFinite(n);
      };

      let retValue = false;

      if (filter.isgroup) {
        retValue = this.filterGroup(filter, filterValue);
      } else {
        if (this.prepareData) {
            this.prepareData(filter, filterValue);
        }
        try {
          if (typeof filterValue[filter.field] === 'number' && (filter.operation !== '=>' && filter.operation !== 'in')) {
            retValue = comparators[filter.operation](+filterValue[filter.field], +filter.value);
          } else if ((!isNumeric(filterValue[filter.field]) || !isNumeric(filter.value)) &&
              (typeof filterValue[filter.field] === 'string' || filterValue[filter.field] instanceof String)) {
            retValue = comparators[filter.operation](String(filterValue[filter.field]).toLowerCase(),
                                                      String(filter.value).toLowerCase());
          } else if (isNumeric(filterValue[filter.field]) && isNumeric(filter.value)) {
            retValue = comparators[filter.operation](+filterValue[filter.field], +filter.value);
          } else {
            retValue = comparators[filter.operation](filterValue[filter.field], filter.value);
          }
        } catch {
            retValue = false;
        }
      }

      return retValue;

    }

    filterGroup = (filter: any, filterValue: any) => {

        const results = [];

        for (let i = 0, l = filter.fields.length; i < l; i++) {
            const results2 = [];
            filter.fields[i].forEach((v: any[]) => {
               results2.push(this.filterData(v, filterValue));
            });
            results.push(results2.reduce((acc, v2) => {
                if (!v2) {
                    acc = v2;
                }
                return acc;
            }, true));
        }

        return results.reduce((acc, v) => {
            if (v) {
                acc = v;
            }
            return acc;
        }, false);

    }
}
