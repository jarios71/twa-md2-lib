/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
export class TWAFilterEditorService {
    constructor() {
        this.processFilterOrs = (filters) => {
            /** @type {?} */
            let actualFilter = 0;
            /** @type {?} */
            const newFilters = [];
            filters.forEach((v, i) => {
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
            });
            return newFilters;
        };
        this.filterData = (filter, filterValue) => {
            /** @type {?} */
            const comparators = {
                '=>': (a, b) => a.includes(b),
                '===': (a, b) => a === b,
                '>=': (a, b) => a >= b,
                '>': (a, b) => a > b,
                '<=': (a, b) => a <= b,
                '<': (a, b) => a < b,
                'in': (a, b) => b.split(',').includes(a),
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
        };
        this.filterGroup = (filter, filterValue) => {
            /** @type {?} */
            const results = [];
            for (let i = 0, l = filter.fields.length; i < l; i++) {
                /** @type {?} */
                const results2 = [];
                filter.fields[i].forEach((v) => {
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
        };
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
        this.filter.change.subscribe((filters) => {
            this.filters = filters;
            this.applyFilter();
        });
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
        data = data.map((item, idx) => {
            item.realIndex = idx;
            return item;
        }).filter((item) => {
            ret = this.applyFilterToRow(item);
            return ret;
        });
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
            this.processedFilters[i].forEach((v) => {
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
        }
        else {
            ret = true;
        }
        return ret;
    }
}
TWAFilterEditorService.decorators = [
    { type: Injectable },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdhLW1kMi1maWx0ZXItZWRpdG9yLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly90d2EtbWQyLWZpbHRlci1lZGl0b3IvIiwic291cmNlcyI6WyJsaWIvdHdhLW1kMi1maWx0ZXItZWRpdG9yLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFNM0MsTUFBTSxPQUFPLHNCQUFzQjtJQURuQztRQXNGSSxxQkFBZ0IsR0FBRyxDQUFDLE9BQU8sRUFBRSxFQUFFOztnQkFDdkIsWUFBWSxHQUFHLENBQUM7O2tCQUNkLFVBQVUsR0FBRyxFQUFFO1lBQ3JCLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxLQUFLLElBQUksRUFBRTtvQkFDN0IsWUFBWSxFQUFFLENBQUM7b0JBQ2YsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztpQkFDdkI7Z0JBQ0QsSUFBSSxPQUFNLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssV0FBVyxFQUFFO29CQUNsRCxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2lCQUN2QjtnQkFDRCxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUU7OzBCQUNMLFFBQVEscUJBQU8sQ0FBQyxJQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFDO29CQUNoRSx5QkFBeUI7b0JBQ3pCLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQzNDO3FCQUFNO29CQUNILFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3BDO1lBQ0wsQ0FBQyxD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RSxDQUFDLEVBQUUsRUFBRTtnQkFDcEMsSUFBSSxDQUFDLENBQUMsRUFBRTtvQkFDSixHQUFHLEdBQUcsQ0FBQyxDQUFDO2lCQUNYO2dCQUNELE9BQU8sR0FBRyxDQUFDO1lBQ2YsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDYjtRQUVELElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUNoQixHQUFHLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDNUIsSUFBSSxDQUFDLEVBQUU7b0JBQ0gsR0FBRyxHQUFHLENBQUMsQ0FBQztpQkFDWDtnQkFDRCxPQUFPLEdBQUcsQ0FBQztZQUNmLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUNiO2FBQU07WUFDSCxHQUFHLEdBQUcsSUFBSSxDQUFDO1NBQ2Q7UUFFRCxPQUFPLEdBQUcsQ0FBQztJQUVmLENBQUM7OztZQXBGSixVQUFVOzs7O0lBR1AseUNBQXVCOztJQUV2Qiw4Q0FBb0I7O0lBQ3BCLHdDQUFpQzs7SUFDakMsc0NBQVk7O0lBQ1osNkNBQXNCOztJQUN0QixrREFBd0I7O0lBNkV4QixrREFxQkM7O0lBRUQsNENBbUNDOztJQUVELDZDQXdCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgVFdBRmlsdGVyRWRpdG9yQ29tcG9uZW50IH0gZnJvbSAnLi90d2EtbWQyLWZpbHRlci1lZGl0b3IuY29tcG9uZW50JztcbmltcG9ydCB7IEZpZWxkRmlsdGVyIH0gZnJvbSAnLi90d2EtbWQyLWZpbHRlci1lZGl0b3IuaW50ZXJmYWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRXQUZpbHRlckVkaXRvclNlcnZpY2Uge1xuXG4gICAgZmlsdGVyczogRmllbGRGaWx0ZXJbXTtcblxuICAgIGZpbHRlcmVkRGF0YTogYW55W107XG4gICAgZmlsdGVyOiBUV0FGaWx0ZXJFZGl0b3JDb21wb25lbnQ7XG4gICAgZGF0YTogYW55W107XG4gICAgcHJlcGFyZURhdGE6IEZ1bmN0aW9uO1xuICAgIHByb2Nlc3NlZEZpbHRlcnM6IGFueVtdO1xuXG4gICAgaW5pdChcbiAgICAgICAgZmlsdGVyOiBUV0FGaWx0ZXJFZGl0b3JDb21wb25lbnQsXG4gICAgICAgIGRhdGE6IGFueVtdLFxuICAgICAgICBwcmVwYXJlRGF0YT86IEZ1bmN0aW9uXG4gICAgKSB7XG4gICAgICAgIHRoaXMuZmlsdGVyID0gZmlsdGVyO1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgICAgICB0aGlzLnByZXBhcmVEYXRhID0gcHJlcGFyZURhdGE7XG5cbiAgICAgICAgdGhpcy5maWx0ZXIuY2hhbmdlLnN1YnNjcmliZSgoZmlsdGVyczogRmllbGRGaWx0ZXJbXSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJzID0gZmlsdGVycztcbiAgICAgICAgICAgIHRoaXMuYXBwbHlGaWx0ZXIoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucHJvY2Vzc2VkRmlsdGVycyA9IHRoaXMucHJvY2Vzc0ZpbHRlck9ycyh0aGlzLmZpbHRlci5hY3RpdmVGaWx0ZXJzKTtcbiAgICB9XG5cbiAgICBhcHBseUZpbHRlcihkYXRhID0gdGhpcy5kYXRhLnNsaWNlKCkpIHtcblxuICAgICAgICAvLyBsZXQgZGF0YSA9IHRoaXMuZGF0YS5zbGljZSgpO1xuICAgICAgICBsZXQgcmV0ID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gZGF0YS5sZW5ndGg7XG5cbiAgICAgICAgaWYgKCF0aGlzLmZpbHRlcikge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnByb2Nlc3NlZEZpbHRlcnMgPSB0aGlzLnByb2Nlc3NGaWx0ZXJPcnModGhpcy5maWx0ZXIuYWN0aXZlRmlsdGVycyk7XG5cbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcblxuICAgICAgICBkYXRhID0gZGF0YS5tYXAoKGl0ZW0sIGlkeCkgPT4ge1xuICAgICAgICAgICAgaXRlbS5yZWFsSW5kZXggPSBpZHg7XG4gICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgfSkuZmlsdGVyKChpdGVtOiBhbnkpID0+IHtcbiAgICAgICAgICAgIHJldCA9IHRoaXMuYXBwbHlGaWx0ZXJUb1JvdyhpdGVtKTtcbiAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkYXRhO1xuXG4gICAgfVxuXG4gICAgYXBwbHlGaWx0ZXJUb1JvdyhpdGVtKSB7XG5cbiAgICAgICAgbGV0IHJldCA9IHRydWU7XG4gICAgICAgIGNvbnN0IHJlc3VsdHMgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IHRoaXMucHJvY2Vzc2VkRmlsdGVycy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdHMyID0gW107XG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NlZEZpbHRlcnNbaV0uZm9yRWFjaCgodjogRmllbGRGaWx0ZXIpID0+IHtcbiAgICAgICAgICAgICAgICByZXN1bHRzMi5wdXNoKHRoaXMuZmlsdGVyRGF0YSh2LCBpdGVtKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaChyZXN1bHRzMi5yZWR1Y2UoKGFjYywgdikgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdikge1xuICAgICAgICAgICAgICAgICAgICBhY2MgPSB2O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICAgICAgfSwgdHJ1ZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlc3VsdHMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXQgPSByZXN1bHRzLnJlZHVjZSgoYWNjLCB2KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHYpIHtcbiAgICAgICAgICAgICAgICAgICAgYWNjID0gdjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmV0O1xuXG4gICAgfVxuXG4gICAgcHJvY2Vzc0ZpbHRlck9ycyA9IChmaWx0ZXJzKSA9PiB7XG4gICAgICAgIGxldCBhY3R1YWxGaWx0ZXIgPSAwO1xuICAgICAgICBjb25zdCBuZXdGaWx0ZXJzID0gW107XG4gICAgICAgIGZpbHRlcnMuZm9yRWFjaCgodiwgaSkgPT4ge1xuICAgICAgICAgICAgaWYgKGkgPiAwICYmIHYuYml0d2lzZSA9PT0gJ3x8Jykge1xuICAgICAgICAgICAgICAgIGFjdHVhbEZpbHRlcisrO1xuICAgICAgICAgICAgICAgIG5ld0ZpbHRlcnMucHVzaChbXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mKG5ld0ZpbHRlcnNbYWN0dWFsRmlsdGVyXSkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgbmV3RmlsdGVycy5wdXNoKFtdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh2LmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdHcm91cCA9IHsuLi52LCBmaWVsZHM6IHRoaXMucHJvY2Vzc0ZpbHRlck9ycyh2LmZpZWxkcyl9O1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG5ld0dyb3VwKTtcbiAgICAgICAgICAgICAgICBuZXdGaWx0ZXJzW2FjdHVhbEZpbHRlcl0ucHVzaChuZXdHcm91cCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5ld0ZpbHRlcnNbYWN0dWFsRmlsdGVyXS5wdXNoKHYpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gbmV3RmlsdGVycztcbiAgICB9XG5cbiAgICBmaWx0ZXJEYXRhID0gKGZpbHRlcjogYW55LCBmaWx0ZXJWYWx1ZTogYW55KSA9PiB7XG5cbiAgICAgICAgY29uc3QgY29tcGFyYXRvcnMgPSB7XG4gICAgICAgICAgICAnPT4nOiAoYTogc3RyaW5nLCBiOiBzdHJpbmcpID0+IGEuaW5jbHVkZXMoYiksXG4gICAgICAgICAgICAnPT09JzogKGE6IGFueSwgYjogYW55KSA9PiBhID09PSBiLFxuICAgICAgICAgICAgJz49JzogKGE6IGFueSwgYjogYW55KSA9PiBhID49IGIsXG4gICAgICAgICAgICAnPic6IChhOiBhbnksIGI6IGFueSkgPT4gYSA+IGIsXG4gICAgICAgICAgICAnPD0nOiAoYTogYW55LCBiOiBhbnkpID0+IGEgPD0gYixcbiAgICAgICAgICAgICc8JzogKGE6IGFueSwgYjogYW55KSA9PiBhIDwgYixcbiAgICAgICAgICAgICdpbic6IChhOiBhbnksIGI6IGFueSkgPT4gYi5zcGxpdCgnLCcpLmluY2x1ZGVzKGEpLFxuICAgICAgICB9O1xuXG4gICAgICAgIGxldCByZXRWYWx1ZSA9IGZhbHNlO1xuXG4gICAgICAgIGlmIChmaWx0ZXIuaXNncm91cCkge1xuICAgICAgICAgICAgcmV0VmFsdWUgPSB0aGlzLmZpbHRlckdyb3VwKGZpbHRlciwgZmlsdGVyVmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJlcGFyZURhdGEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByZXBhcmVEYXRhKGZpbHRlciwgZmlsdGVyVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGZpbHRlclZhbHVlW2ZpbHRlci5maWVsZF0gPT09ICdudW1iZXInICYmIChmaWx0ZXIub3BlcmF0aW9uICE9PSAnPT4nICYmIGZpbHRlci5vcGVyYXRpb24gIT09ICdpbicpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldFZhbHVlID0gY29tcGFyYXRvcnNbZmlsdGVyLm9wZXJhdGlvbl0oK2ZpbHRlclZhbHVlW2ZpbHRlci5maWVsZF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgK2ZpbHRlci52YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0VmFsdWUgPSBjb21wYXJhdG9yc1tmaWx0ZXIub3BlcmF0aW9uXShTdHJpbmcoZmlsdGVyVmFsdWVbZmlsdGVyLmZpZWxkXSkudG9Mb3dlckNhc2UoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTdHJpbmcoZmlsdGVyLnZhbHVlKS50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgICAgICByZXRWYWx1ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJldFZhbHVlO1xuXG4gICAgfVxuXG4gICAgZmlsdGVyR3JvdXAgPSAoZmlsdGVyOiBhbnksIGZpbHRlclZhbHVlOiBhbnkpID0+IHtcblxuICAgICAgICBjb25zdCByZXN1bHRzID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBmaWx0ZXIuZmllbGRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0czIgPSBbXTtcbiAgICAgICAgICAgIGZpbHRlci5maWVsZHNbaV0uZm9yRWFjaCgodjogYW55W10pID0+IHtcbiAgICAgICAgICAgICAgIHJlc3VsdHMyLnB1c2godGhpcy5maWx0ZXJEYXRhKHYsIGZpbHRlclZhbHVlKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaChyZXN1bHRzMi5yZWR1Y2UoKGFjYywgdjIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXYyKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjYyA9IHYyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICAgICAgfSwgdHJ1ZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdHMucmVkdWNlKChhY2MsIHYpID0+IHtcbiAgICAgICAgICAgIGlmICh2KSB7XG4gICAgICAgICAgICAgICAgYWNjID0gdjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIH0sIGZhbHNlKTtcblxuICAgIH1cbn1cbiJdfQ==