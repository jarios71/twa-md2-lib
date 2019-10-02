/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
export class TWAFilterEditorService {
    constructor() {
        this.processFilterOrs = (/**
         * @param {?} filters
         * @return {?}
         */
        (filters) => {
            /** @type {?} */
            let actualFilter = 0;
            /** @type {?} */
            const newFilters = [];
            filters.forEach((/**
             * @param {?} v
             * @param {?} i
             * @return {?}
             */
            (v, i) => {
                if (i > 0 && v.bitwise === '||') {
                    actualFilter++;
                    newFilters.push([]);
                }
                if (typeof (newFilters[actualFilter]) === 'undefined') {
                    newFilters.push([]);
                }
                if (v.isgroup) {
                    /** @type {?} */
                    const newGroup = Object.assign({}, v, { fields: this.processFilterOrs(v.fields) });
                    // console.log(newGroup);
                    newFilters[actualFilter].push(newGroup);
                }
                else {
                    newFilters[actualFilter].push(v);
                }
            }));
            return newFilters;
        });
        this.filterData = (/**
         * @param {?} filter
         * @param {?} filterValue
         * @return {?}
         */
        (filter, filterValue) => {
            /** @type {?} */
            const comparators = {
                '=>': (/**
                 * @param {?} a
                 * @param {?} b
                 * @return {?}
                 */
                (a, b) => a.includes(b)),
                '===': (/**
                 * @param {?} a
                 * @param {?} b
                 * @return {?}
                 */
                (a, b) => a === b),
                '>=': (/**
                 * @param {?} a
                 * @param {?} b
                 * @return {?}
                 */
                (a, b) => a >= b),
                '>': (/**
                 * @param {?} a
                 * @param {?} b
                 * @return {?}
                 */
                (a, b) => a > b),
                '<=': (/**
                 * @param {?} a
                 * @param {?} b
                 * @return {?}
                 */
                (a, b) => a <= b),
                '<': (/**
                 * @param {?} a
                 * @param {?} b
                 * @return {?}
                 */
                (a, b) => a < b),
                'in': (/**
                 * @param {?} a
                 * @param {?} b
                 * @return {?}
                 */
                (a, b) => b.split(',').includes(a)),
            };
            /** @type {?} */
            let retValue = false;
            if (filter.isgroup) {
                retValue = this.filterGroup(filter, filterValue);
            }
            else {
                if (this.prepareData) {
                    this.prepareData(filter, filterValue);
                }
                try {
                    if (typeof filterValue[filter.field] === 'number' && (filter.operation !== '=>' && filter.operation !== 'in')) {
                        retValue = comparators[filter.operation](+filterValue[filter.field], +filter.value);
                    }
                    else {
                        retValue = comparators[filter.operation](String(filterValue[filter.field]).toLowerCase(), String(filter.value).toLowerCase());
                    }
                }
                catch (_a) {
                    retValue = false;
                }
            }
            return retValue;
        });
        this.filterGroup = (/**
         * @param {?} filter
         * @param {?} filterValue
         * @return {?}
         */
        (filter, filterValue) => {
            /** @type {?} */
            const results = [];
            for (let i = 0, l = filter.fields.length; i < l; i++) {
                /** @type {?} */
                const results2 = [];
                filter.fields[i].forEach((/**
                 * @param {?} v
                 * @return {?}
                 */
                (v) => {
                    results2.push(this.filterData(v, filterValue));
                }));
                results.push(results2.reduce((/**
                 * @param {?} acc
                 * @param {?} v2
                 * @return {?}
                 */
                (acc, v2) => {
                    if (!v2) {
                        acc = v2;
                    }
                    return acc;
                }), true));
            }
            return results.reduce((/**
             * @param {?} acc
             * @param {?} v
             * @return {?}
             */
            (acc, v) => {
                if (v) {
                    acc = v;
                }
                return acc;
            }), false);
        });
    }
    /**
     * @param {?} filter
     * @param {?} data
     * @param {?=} prepareData
     * @return {?}
     */
    init(filter, data, prepareData) {
        this.filter = filter;
        this.data = data;
        this.prepareData = prepareData;
        this.filter.change.subscribe((/**
         * @param {?} filters
         * @return {?}
         */
        (filters) => {
            this.filters = filters;
            this.applyFilter();
        }));
        this.processedFilters = this.processFilterOrs(this.filter.activeFilters);
    }
    /**
     * @param {?=} data
     * @return {?}
     */
    applyFilter(data = this.data.slice()) {
        // let data = this.data.slice();
        /** @type {?} */
        let ret = true;
        /** @type {?} */
        const length = data.length;
        if (!this.filter) {
            return data;
        }
        this.processedFilters = this.processFilterOrs(this.filter.activeFilters);
        this.data = data;
        data = data.map((/**
         * @param {?} item
         * @param {?} idx
         * @return {?}
         */
        (item, idx) => {
            item.realIndex = idx;
            return item;
        })).filter((/**
         * @param {?} item
         * @return {?}
         */
        (item) => {
            ret = this.applyFilterToRow(item);
            return ret;
        }));
        return data;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    applyFilterToRow(item) {
        /** @type {?} */
        let ret = true;
        /** @type {?} */
        const results = [];
        for (let i = 0, l = this.processedFilters.length; i < l; i++) {
            /** @type {?} */
            const results2 = [];
            this.processedFilters[i].forEach((/**
             * @param {?} v
             * @return {?}
             */
            (v) => {
                results2.push(this.filterData(v, item));
            }));
            results.push(results2.reduce((/**
             * @param {?} acc
             * @param {?} v
             * @return {?}
             */
            (acc, v) => {
                if (!v) {
                    acc = v;
                }
                return acc;
            }), true));
        }
        if (results.length) {
            ret = results.reduce((/**
             * @param {?} acc
             * @param {?} v
             * @return {?}
             */
            (acc, v) => {
                if (v) {
                    acc = v;
                }
                return acc;
            }), false);
        }
        else {
            ret = true;
        }
        return ret;
    }
}
TWAFilterEditorService.decorators = [
    { type: Injectable }
];
if (false) {
    /** @type {?} */
    TWAFilterEditorService.prototype.filters;
    /** @type {?} */
    TWAFilterEditorService.prototype.filteredData;
    /** @type {?} */
    TWAFilterEditorService.prototype.filter;
    /** @type {?} */
    TWAFilterEditorService.prototype.data;
    /** @type {?} */
    TWAFilterEditorService.prototype.prepareData;
    /** @type {?} */
    TWAFilterEditorService.prototype.processedFilters;
    /** @type {?} */
    TWAFilterEditorService.prototype.processFilterOrs;
    /** @type {?} */
    TWAFilterEditorService.prototype.filterData;
    /** @type {?} */
    TWAFilterEditorService.prototype.filterGroup;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdhLW1kMi1maWx0ZXItZWRpdG9yLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly90d2EtbWQyLWZpbHRlci1lZGl0b3IvIiwic291cmNlcyI6WyJsaWIvdHdhLW1kMi1maWx0ZXItZWRpdG9yLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFNM0MsTUFBTSxPQUFPLHNCQUFzQjtJQURuQztRQXNGSSxxQkFBZ0I7Ozs7UUFBRyxDQUFDLE9BQU8sRUFBRSxFQUFFOztnQkFDdkIsWUFBWSxHQUFHLENBQUM7O2tCQUNkLFVBQVUsR0FBRyxFQUFFO1lBQ3JCLE9BQU8sQ0FBQyxPQUFPOzs7OztZQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNyQixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sS0FBSyxJQUFJLEVBQUU7b0JBQzdCLFlBQVksRUFBRSxDQUFDO29CQUNmLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQ3ZCO2dCQUNELElBQUksT0FBTSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLFdBQVcsRUFBRTtvQkFDbEQsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztpQkFDdkI7Z0JBQ0QsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFOzswQkFDTCxRQUFRLHFCQUFPLENBQUMsSUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBQztvQkFDaEUseUJBQXlCO29CQUN6QixVQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUMzQztxQkFBTTtvQkFDSCxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNwQztZQUNM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QyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM1QyxDQUFDLEVBQUMsQ0FBQztZQUNILE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU07Ozs7O1lBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3BDLElBQUksQ0FBQyxDQUFDLEVBQUU7b0JBQ0osR0FBRyxHQUFHLENBQUMsQ0FBQztpQkFDWDtnQkFDRCxPQUFPLEdBQUcsQ0FBQztZQUNmLENBQUMsR0FBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ2I7UUFFRCxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDaEIsR0FBRyxHQUFHLE9BQU8sQ0FBQyxNQUFNOzs7OztZQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUM1QixJQUFJLENBQUMsRUFBRTtvQkFDSCxHQUFHLEdBQUcsQ0FBQyxDQUFDO2lCQUNYO2dCQUNELE9BQU8sR0FBRyxDQUFDO1lBQ2YsQ0FBQyxHQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ2I7YUFBTTtZQUNILEdBQUcsR0FBRyxJQUFJLENBQUM7U0FDZDtRQUVELE9BQU8sR0FBRyxDQUFDO0lBRWYsQ0FBQzs7O1lBcEZKLFVBQVU7Ozs7SUFHUCx5Q0FBdUI7O0lBRXZCLDhDQUFvQjs7SUFDcEIsd0NBQWlDOztJQUNqQyxzQ0FBWTs7SUFDWiw2Q0FBc0I7O0lBQ3RCLGtEQUF3Qjs7SUE2RXhCLGtEQXFCQzs7SUFFRCw0Q0FtQ0M7O0lBRUQsNkNBd0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBUV0FGaWx0ZXJFZGl0b3JDb21wb25lbnQgfSBmcm9tICcuL3R3YS1tZDItZmlsdGVyLWVkaXRvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmllbGRGaWx0ZXIgfSBmcm9tICcuL3R3YS1tZDItZmlsdGVyLWVkaXRvci5pbnRlcmZhY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVFdBRmlsdGVyRWRpdG9yU2VydmljZSB7XG5cbiAgICBmaWx0ZXJzOiBGaWVsZEZpbHRlcltdO1xuXG4gICAgZmlsdGVyZWREYXRhOiBhbnlbXTtcbiAgICBmaWx0ZXI6IFRXQUZpbHRlckVkaXRvckNvbXBvbmVudDtcbiAgICBkYXRhOiBhbnlbXTtcbiAgICBwcmVwYXJlRGF0YTogRnVuY3Rpb247XG4gICAgcHJvY2Vzc2VkRmlsdGVyczogYW55W107XG5cbiAgICBpbml0KFxuICAgICAgICBmaWx0ZXI6IFRXQUZpbHRlckVkaXRvckNvbXBvbmVudCxcbiAgICAgICAgZGF0YTogYW55W10sXG4gICAgICAgIHByZXBhcmVEYXRhPzogRnVuY3Rpb25cbiAgICApIHtcbiAgICAgICAgdGhpcy5maWx0ZXIgPSBmaWx0ZXI7XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgICAgIHRoaXMucHJlcGFyZURhdGEgPSBwcmVwYXJlRGF0YTtcblxuICAgICAgICB0aGlzLmZpbHRlci5jaGFuZ2Uuc3Vic2NyaWJlKChmaWx0ZXJzOiBGaWVsZEZpbHRlcltdKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmZpbHRlcnMgPSBmaWx0ZXJzO1xuICAgICAgICAgICAgdGhpcy5hcHBseUZpbHRlcigpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5wcm9jZXNzZWRGaWx0ZXJzID0gdGhpcy5wcm9jZXNzRmlsdGVyT3JzKHRoaXMuZmlsdGVyLmFjdGl2ZUZpbHRlcnMpO1xuICAgIH1cblxuICAgIGFwcGx5RmlsdGVyKGRhdGEgPSB0aGlzLmRhdGEuc2xpY2UoKSkge1xuXG4gICAgICAgIC8vIGxldCBkYXRhID0gdGhpcy5kYXRhLnNsaWNlKCk7XG4gICAgICAgIGxldCByZXQgPSB0cnVlO1xuICAgICAgICBjb25zdCBsZW5ndGggPSBkYXRhLmxlbmd0aDtcblxuICAgICAgICBpZiAoIXRoaXMuZmlsdGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucHJvY2Vzc2VkRmlsdGVycyA9IHRoaXMucHJvY2Vzc0ZpbHRlck9ycyh0aGlzLmZpbHRlci5hY3RpdmVGaWx0ZXJzKTtcblxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuXG4gICAgICAgIGRhdGEgPSBkYXRhLm1hcCgoaXRlbSwgaWR4KSA9PiB7XG4gICAgICAgICAgICBpdGVtLnJlYWxJbmRleCA9IGlkeDtcbiAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICB9KS5maWx0ZXIoKGl0ZW06IGFueSkgPT4ge1xuICAgICAgICAgICAgcmV0ID0gdGhpcy5hcHBseUZpbHRlclRvUm93KGl0ZW0pO1xuICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRhdGE7XG5cbiAgICB9XG5cbiAgICBhcHBseUZpbHRlclRvUm93KGl0ZW0pIHtcblxuICAgICAgICBsZXQgcmV0ID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgcmVzdWx0cyA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gdGhpcy5wcm9jZXNzZWRGaWx0ZXJzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0czIgPSBbXTtcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc2VkRmlsdGVyc1tpXS5mb3JFYWNoKCh2OiBGaWVsZEZpbHRlcikgPT4ge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMyLnB1c2godGhpcy5maWx0ZXJEYXRhKHYsIGl0ZW0pKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHJlc3VsdHMyLnJlZHVjZSgoYWNjLCB2KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF2KSB7XG4gICAgICAgICAgICAgICAgICAgIGFjYyA9IHY7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgICAgICB9LCB0cnVlKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVzdWx0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldCA9IHJlc3VsdHMucmVkdWNlKChhY2MsIHYpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodikge1xuICAgICAgICAgICAgICAgICAgICBhY2MgPSB2O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0ID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXQ7XG5cbiAgICB9XG5cbiAgICBwcm9jZXNzRmlsdGVyT3JzID0gKGZpbHRlcnMpID0+IHtcbiAgICAgICAgbGV0IGFjdHVhbEZpbHRlciA9IDA7XG4gICAgICAgIGNvbnN0IG5ld0ZpbHRlcnMgPSBbXTtcbiAgICAgICAgZmlsdGVycy5mb3JFYWNoKCh2LCBpKSA9PiB7XG4gICAgICAgICAgICBpZiAoaSA+IDAgJiYgdi5iaXR3aXNlID09PSAnfHwnKSB7XG4gICAgICAgICAgICAgICAgYWN0dWFsRmlsdGVyKys7XG4gICAgICAgICAgICAgICAgbmV3RmlsdGVycy5wdXNoKFtdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YobmV3RmlsdGVyc1thY3R1YWxGaWx0ZXJdKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBuZXdGaWx0ZXJzLnB1c2goW10pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHYuaXNncm91cCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld0dyb3VwID0gey4uLnYsIGZpZWxkczogdGhpcy5wcm9jZXNzRmlsdGVyT3JzKHYuZmllbGRzKX07XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cobmV3R3JvdXApO1xuICAgICAgICAgICAgICAgIG5ld0ZpbHRlcnNbYWN0dWFsRmlsdGVyXS5wdXNoKG5ld0dyb3VwKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV3RmlsdGVyc1thY3R1YWxGaWx0ZXJdLnB1c2godik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBuZXdGaWx0ZXJzO1xuICAgIH1cblxuICAgIGZpbHRlckRhdGEgPSAoZmlsdGVyOiBhbnksIGZpbHRlclZhbHVlOiBhbnkpID0+IHtcblxuICAgICAgICBjb25zdCBjb21wYXJhdG9ycyA9IHtcbiAgICAgICAgICAgICc9Pic6IChhOiBzdHJpbmcsIGI6IHN0cmluZykgPT4gYS5pbmNsdWRlcyhiKSxcbiAgICAgICAgICAgICc9PT0nOiAoYTogYW55LCBiOiBhbnkpID0+IGEgPT09IGIsXG4gICAgICAgICAgICAnPj0nOiAoYTogYW55LCBiOiBhbnkpID0+IGEgPj0gYixcbiAgICAgICAgICAgICc+JzogKGE6IGFueSwgYjogYW55KSA9PiBhID4gYixcbiAgICAgICAgICAgICc8PSc6IChhOiBhbnksIGI6IGFueSkgPT4gYSA8PSBiLFxuICAgICAgICAgICAgJzwnOiAoYTogYW55LCBiOiBhbnkpID0+IGEgPCBiLFxuICAgICAgICAgICAgJ2luJzogKGE6IGFueSwgYjogYW55KSA9PiBiLnNwbGl0KCcsJykuaW5jbHVkZXMoYSksXG4gICAgICAgIH07XG5cbiAgICAgICAgbGV0IHJldFZhbHVlID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKGZpbHRlci5pc2dyb3VwKSB7XG4gICAgICAgICAgICByZXRWYWx1ZSA9IHRoaXMuZmlsdGVyR3JvdXAoZmlsdGVyLCBmaWx0ZXJWYWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmVwYXJlRGF0YSkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJlcGFyZURhdGEoZmlsdGVyLCBmaWx0ZXJWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZmlsdGVyVmFsdWVbZmlsdGVyLmZpZWxkXSA9PT0gJ251bWJlcicgJiYgKGZpbHRlci5vcGVyYXRpb24gIT09ICc9PicgJiYgZmlsdGVyLm9wZXJhdGlvbiAhPT0gJ2luJykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0VmFsdWUgPSBjb21wYXJhdG9yc1tmaWx0ZXIub3BlcmF0aW9uXSgrZmlsdGVyVmFsdWVbZmlsdGVyLmZpZWxkXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArZmlsdGVyLnZhbHVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXRWYWx1ZSA9IGNvbXBhcmF0b3JzW2ZpbHRlci5vcGVyYXRpb25dKFN0cmluZyhmaWx0ZXJWYWx1ZVtmaWx0ZXIuZmllbGRdKS50b0xvd2VyQ2FzZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFN0cmluZyhmaWx0ZXIudmFsdWUpLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgICAgIHJldFZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmV0VmFsdWU7XG5cbiAgICB9XG5cbiAgICBmaWx0ZXJHcm91cCA9IChmaWx0ZXI6IGFueSwgZmlsdGVyVmFsdWU6IGFueSkgPT4ge1xuXG4gICAgICAgIGNvbnN0IHJlc3VsdHMgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGZpbHRlci5maWVsZHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHRzMiA9IFtdO1xuICAgICAgICAgICAgZmlsdGVyLmZpZWxkc1tpXS5mb3JFYWNoKCh2OiBhbnlbXSkgPT4ge1xuICAgICAgICAgICAgICAgcmVzdWx0czIucHVzaCh0aGlzLmZpbHRlckRhdGEodiwgZmlsdGVyVmFsdWUpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHJlc3VsdHMyLnJlZHVjZSgoYWNjLCB2MikgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdjIpIHtcbiAgICAgICAgICAgICAgICAgICAgYWNjID0gdjI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgICAgICB9LCB0cnVlKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0cy5yZWR1Y2UoKGFjYywgdikgPT4ge1xuICAgICAgICAgICAgaWYgKHYpIHtcbiAgICAgICAgICAgICAgICBhY2MgPSB2O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfSwgZmFsc2UpO1xuXG4gICAgfVxufVxuIl19