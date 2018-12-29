/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
var TWAFilterEditorService = /** @class */ (function () {
    function TWAFilterEditorService() {
        var _this = this;
        this.processFilterOrs = function (filters) {
            /** @type {?} */
            var actualFilter = 0;
            /** @type {?} */
            var newFilters = [];
            filters.forEach(function (v, i) {
                if (i > 0 && v.bitwise === '||') {
                    actualFilter++;
                    newFilters.push([]);
                }
                if (typeof (newFilters[actualFilter]) === 'undefined') {
                    newFilters.push([]);
                }
                if (v.isgroup) {
                    /** @type {?} */
                    var newGroup = tslib_1.__assign({}, v, { fields: _this.processFilterOrs(v.fields) });
                    // console.log(newGroup);
                    newFilters[actualFilter].push(newGroup);
                }
                else {
                    newFilters[actualFilter].push(v);
                }
            });
            return newFilters;
        };
        this.filterData = function (filter, filterValue) {
            /** @type {?} */
            var comparators = {
                '=>': function (a, b) { return a.includes(b); },
                '===': function (a, b) { return a === b; },
                '>=': function (a, b) { return a >= b; },
                '>': function (a, b) { return a > b; },
                '<=': function (a, b) { return a <= b; },
                '<': function (a, b) { return a < b; },
                'in': function (a, b) { return b.split(',').includes(a); },
            };
            /** @type {?} */
            var retValue = false;
            if (filter.isgroup) {
                retValue = _this.filterGroup(filter, filterValue);
            }
            else {
                if (_this.prepareData) {
                    _this.prepareData(filter, filterValue);
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
        this.filterGroup = function (filter, filterValue) {
            /** @type {?} */
            var results = [];
            var _loop_1 = function (i, l) {
                /** @type {?} */
                var results2 = [];
                filter.fields[i].forEach(function (v) {
                    results2.push(_this.filterData(v, filterValue));
                });
                results.push(results2.reduce(function (acc, v2) {
                    if (!v2) {
                        acc = v2;
                    }
                    return acc;
                }, true));
            };
            for (var i = 0, l = filter.fields.length; i < l; i++) {
                _loop_1(i, l);
            }
            return results.reduce(function (acc, v) {
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
    TWAFilterEditorService.prototype.init = /**
     * @param {?} filter
     * @param {?} data
     * @param {?=} prepareData
     * @return {?}
     */
    function (filter, data, prepareData) {
        var _this = this;
        this.filter = filter;
        this.data = data;
        this.prepareData = prepareData;
        this.filter.change.subscribe(function (filters) {
            _this.filters = filters;
            _this.applyFilter();
        });
        this.processedFilters = this.processFilterOrs(this.filter.activeFilters);
    };
    /**
     * @param {?=} data
     * @return {?}
     */
    TWAFilterEditorService.prototype.applyFilter = /**
     * @param {?=} data
     * @return {?}
     */
    function (data) {
        var _this = this;
        if (data === void 0) { data = this.data.slice(); }
        // let data = this.data.slice();
        /** @type {?} */
        var ret = true;
        /** @type {?} */
        var length = data.length;
        this.processedFilters = this.processFilterOrs(this.filter.activeFilters);
        this.data = data;
        data = data.map(function (item, idx) {
            item.realIndex = idx;
            return item;
        }).filter(function (item) {
            ret = _this.applyFilterToRow(item);
            return ret;
        });
        return data;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    TWAFilterEditorService.prototype.applyFilterToRow = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        var _this = this;
        /** @type {?} */
        var ret = true;
        /** @type {?} */
        var results = [];
        var _loop_2 = function (i, l) {
            /** @type {?} */
            var results2 = [];
            this_1.processedFilters[i].forEach(function (v) {
                results2.push(_this.filterData(v, item));
            });
            results.push(results2.reduce(function (acc, v) {
                if (!v) {
                    acc = v;
                }
                return acc;
            }, true));
        };
        var this_1 = this;
        for (var i = 0, l = this.processedFilters.length; i < l; i++) {
            _loop_2(i, l);
        }
        if (results.length) {
            ret = results.reduce(function (acc, v) {
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
    };
    TWAFilterEditorService.decorators = [
        { type: Injectable },
    ];
    return TWAFilterEditorService;
}());
export { TWAFilterEditorService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdhLW1kMi1maWx0ZXItZWRpdG9yLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly90d2EtbWQyLWZpbHRlci1lZGl0b3IvIiwic291cmNlcyI6WyJsaWIvdHdhLW1kMi1maWx0ZXItZWRpdG9yLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSzNDO0lBQUE7UUFBQSxpQkF1S0M7UUFyRkcscUJBQWdCLEdBQUcsVUFBQyxPQUFPOztnQkFDbkIsWUFBWSxHQUFHLENBQUM7O2dCQUNkLFVBQVUsR0FBRyxFQUFFO1lBQ3JCLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQztnQkFDakIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEtBQUssSUFBSSxFQUFFO29CQUM3QixZQUFZLEVBQUUsQ0FBQztvQkFDZixVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2lCQUN2QjtnQkFDRCxJQUFJLE9BQU0sQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxXQUFXLEVBQUU7b0JBQ2xELFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQ3ZCO2dCQUNELElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRTs7d0JBQ0wsUUFBUSx3QkFBTyxDQUFDLElBQUUsTUFBTSxFQUFFLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUM7b0JBQ2hFLHlCQUF5QjtvQkFDekIsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDM0M7cUJBQU07b0JBQ0gsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDcEM7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVILE9BQU8sVUFBVSxD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QUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2QsQ0FBQzs7UUFYRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTtvQkFBbkQsQ0FBQyxFQUFNLENBQUM7U0FXaEI7UUFFRCxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDaEIsR0FBRyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBQyxHQUFHLEVBQUUsQ0FBQztnQkFDeEIsSUFBSSxDQUFDLEVBQUU7b0JBQ0gsR0FBRyxHQUFHLENBQUMsQ0FBQztpQkFDWDtnQkFDRCxPQUFPLEdBQUcsQ0FBQztZQUNmLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUNiO2FBQU07WUFDSCxHQUFHLEdBQUcsSUFBSSxDQUFDO1NBQ2Q7UUFFRCxPQUFPLEdBQUcsQ0FBQztJQUVmLENBQUM7O2dCQWhGSixVQUFVOztJQXVLWCw2QkFBQztDQUFBLEFBdktELElBdUtDO1NBdEtZLHNCQUFzQjs7O0lBRS9CLHlDQUF1Qjs7SUFFdkIsOENBQW9COztJQUNwQix3Q0FBaUM7O0lBQ2pDLHNDQUFZOztJQUNaLDZDQUFzQjs7SUFDdEIsa0RBQXdCOztJQXlFeEIsa0RBcUJDOztJQUVELDRDQW1DQzs7SUFFRCw2Q0F3QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFRXQUZpbHRlckVkaXRvckNvbXBvbmVudCB9IGZyb20gJy4vdHdhLW1kMi1maWx0ZXItZWRpdG9yLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGaWVsZEZpbHRlciB9IGZyb20gJy4vdHdhLW1kMi1maWx0ZXItZWRpdG9yLmludGVyZmFjZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUV0FGaWx0ZXJFZGl0b3JTZXJ2aWNlIHtcblxuICAgIGZpbHRlcnM6IEZpZWxkRmlsdGVyW107XG5cbiAgICBmaWx0ZXJlZERhdGE6IGFueVtdO1xuICAgIGZpbHRlcjogVFdBRmlsdGVyRWRpdG9yQ29tcG9uZW50O1xuICAgIGRhdGE6IGFueVtdO1xuICAgIHByZXBhcmVEYXRhOiBGdW5jdGlvbjtcbiAgICBwcm9jZXNzZWRGaWx0ZXJzOiBhbnlbXTtcblxuICAgIGluaXQoXG4gICAgICAgIGZpbHRlcjogVFdBRmlsdGVyRWRpdG9yQ29tcG9uZW50LFxuICAgICAgICBkYXRhOiBhbnlbXSxcbiAgICAgICAgcHJlcGFyZURhdGE/OiBGdW5jdGlvblxuICAgICkge1xuICAgICAgICB0aGlzLmZpbHRlciA9IGZpbHRlcjtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICAgICAgdGhpcy5wcmVwYXJlRGF0YSA9IHByZXBhcmVEYXRhO1xuXG4gICAgICAgIHRoaXMuZmlsdGVyLmNoYW5nZS5zdWJzY3JpYmUoKGZpbHRlcnM6IEZpZWxkRmlsdGVyW10pID0+IHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVycyA9IGZpbHRlcnM7XG4gICAgICAgICAgICB0aGlzLmFwcGx5RmlsdGVyKCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnByb2Nlc3NlZEZpbHRlcnMgPSB0aGlzLnByb2Nlc3NGaWx0ZXJPcnModGhpcy5maWx0ZXIuYWN0aXZlRmlsdGVycyk7XG4gICAgfVxuXG4gICAgYXBwbHlGaWx0ZXIoZGF0YSA9IHRoaXMuZGF0YS5zbGljZSgpKSB7XG5cbiAgICAgICAgLy8gbGV0IGRhdGEgPSB0aGlzLmRhdGEuc2xpY2UoKTtcbiAgICAgICAgbGV0IHJldCA9IHRydWU7XG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IGRhdGEubGVuZ3RoO1xuXG4gICAgICAgIHRoaXMucHJvY2Vzc2VkRmlsdGVycyA9IHRoaXMucHJvY2Vzc0ZpbHRlck9ycyh0aGlzLmZpbHRlci5hY3RpdmVGaWx0ZXJzKTtcblxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuXG4gICAgICAgIGRhdGEgPSBkYXRhLm1hcCgoaXRlbSwgaWR4KSA9PiB7XG4gICAgICAgICAgICBpdGVtLnJlYWxJbmRleCA9IGlkeDtcbiAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICB9KS5maWx0ZXIoKGl0ZW06IGFueSkgPT4ge1xuICAgICAgICAgICAgcmV0ID0gdGhpcy5hcHBseUZpbHRlclRvUm93KGl0ZW0pO1xuICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRhdGE7XG5cbiAgICB9XG5cbiAgICBhcHBseUZpbHRlclRvUm93KGl0ZW0pIHtcblxuICAgICAgICBsZXQgcmV0ID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgcmVzdWx0cyA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gdGhpcy5wcm9jZXNzZWRGaWx0ZXJzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0czIgPSBbXTtcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc2VkRmlsdGVyc1tpXS5mb3JFYWNoKCh2OiBGaWVsZEZpbHRlcikgPT4ge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMyLnB1c2godGhpcy5maWx0ZXJEYXRhKHYsIGl0ZW0pKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHJlc3VsdHMyLnJlZHVjZSgoYWNjLCB2KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF2KSB7XG4gICAgICAgICAgICAgICAgICAgIGFjYyA9IHY7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgICAgICB9LCB0cnVlKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVzdWx0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldCA9IHJlc3VsdHMucmVkdWNlKChhY2MsIHYpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodikge1xuICAgICAgICAgICAgICAgICAgICBhY2MgPSB2O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0ID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXQ7XG5cbiAgICB9XG5cbiAgICBwcm9jZXNzRmlsdGVyT3JzID0gKGZpbHRlcnMpID0+IHtcbiAgICAgICAgbGV0IGFjdHVhbEZpbHRlciA9IDA7XG4gICAgICAgIGNvbnN0IG5ld0ZpbHRlcnMgPSBbXTtcbiAgICAgICAgZmlsdGVycy5mb3JFYWNoKCh2LCBpKSA9PiB7XG4gICAgICAgICAgICBpZiAoaSA+IDAgJiYgdi5iaXR3aXNlID09PSAnfHwnKSB7XG4gICAgICAgICAgICAgICAgYWN0dWFsRmlsdGVyKys7XG4gICAgICAgICAgICAgICAgbmV3RmlsdGVycy5wdXNoKFtdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YobmV3RmlsdGVyc1thY3R1YWxGaWx0ZXJdKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBuZXdGaWx0ZXJzLnB1c2goW10pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHYuaXNncm91cCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld0dyb3VwID0gey4uLnYsIGZpZWxkczogdGhpcy5wcm9jZXNzRmlsdGVyT3JzKHYuZmllbGRzKX07XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cobmV3R3JvdXApO1xuICAgICAgICAgICAgICAgIG5ld0ZpbHRlcnNbYWN0dWFsRmlsdGVyXS5wdXNoKG5ld0dyb3VwKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV3RmlsdGVyc1thY3R1YWxGaWx0ZXJdLnB1c2godik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBuZXdGaWx0ZXJzO1xuICAgIH1cblxuICAgIGZpbHRlckRhdGEgPSAoZmlsdGVyOiBhbnksIGZpbHRlclZhbHVlOiBhbnkpID0+IHtcblxuICAgICAgICBjb25zdCBjb21wYXJhdG9ycyA9IHtcbiAgICAgICAgICAgICc9Pic6IChhOiBzdHJpbmcsIGI6IHN0cmluZykgPT4gYS5pbmNsdWRlcyhiKSxcbiAgICAgICAgICAgICc9PT0nOiAoYTogYW55LCBiOiBhbnkpID0+IGEgPT09IGIsXG4gICAgICAgICAgICAnPj0nOiAoYTogYW55LCBiOiBhbnkpID0+IGEgPj0gYixcbiAgICAgICAgICAgICc+JzogKGE6IGFueSwgYjogYW55KSA9PiBhID4gYixcbiAgICAgICAgICAgICc8PSc6IChhOiBhbnksIGI6IGFueSkgPT4gYSA8PSBiLFxuICAgICAgICAgICAgJzwnOiAoYTogYW55LCBiOiBhbnkpID0+IGEgPCBiLFxuICAgICAgICAgICAgJ2luJzogKGE6IGFueSwgYjogYW55KSA9PiBiLnNwbGl0KCcsJykuaW5jbHVkZXMoYSksXG4gICAgICAgIH07XG5cbiAgICAgICAgbGV0IHJldFZhbHVlID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKGZpbHRlci5pc2dyb3VwKSB7XG4gICAgICAgICAgICByZXRWYWx1ZSA9IHRoaXMuZmlsdGVyR3JvdXAoZmlsdGVyLCBmaWx0ZXJWYWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmVwYXJlRGF0YSkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJlcGFyZURhdGEoZmlsdGVyLCBmaWx0ZXJWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZmlsdGVyVmFsdWVbZmlsdGVyLmZpZWxkXSA9PT0gJ251bWJlcicgJiYgKGZpbHRlci5vcGVyYXRpb24gIT09ICc9PicgJiYgZmlsdGVyLm9wZXJhdGlvbiAhPT0gJ2luJykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0VmFsdWUgPSBjb21wYXJhdG9yc1tmaWx0ZXIub3BlcmF0aW9uXSgrZmlsdGVyVmFsdWVbZmlsdGVyLmZpZWxkXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArZmlsdGVyLnZhbHVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXRWYWx1ZSA9IGNvbXBhcmF0b3JzW2ZpbHRlci5vcGVyYXRpb25dKFN0cmluZyhmaWx0ZXJWYWx1ZVtmaWx0ZXIuZmllbGRdKS50b0xvd2VyQ2FzZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFN0cmluZyhmaWx0ZXIudmFsdWUpLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgICAgIHJldFZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmV0VmFsdWU7XG5cbiAgICB9XG5cbiAgICBmaWx0ZXJHcm91cCA9IChmaWx0ZXI6IGFueSwgZmlsdGVyVmFsdWU6IGFueSkgPT4ge1xuXG4gICAgICAgIGNvbnN0IHJlc3VsdHMgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGZpbHRlci5maWVsZHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHRzMiA9IFtdO1xuICAgICAgICAgICAgZmlsdGVyLmZpZWxkc1tpXS5mb3JFYWNoKCh2OiBhbnlbXSkgPT4ge1xuICAgICAgICAgICAgICAgcmVzdWx0czIucHVzaCh0aGlzLmZpbHRlckRhdGEodiwgZmlsdGVyVmFsdWUpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHJlc3VsdHMyLnJlZHVjZSgoYWNjLCB2MikgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdjIpIHtcbiAgICAgICAgICAgICAgICAgICAgYWNjID0gdjI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgICAgICB9LCB0cnVlKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0cy5yZWR1Y2UoKGFjYywgdikgPT4ge1xuICAgICAgICAgICAgaWYgKHYpIHtcbiAgICAgICAgICAgICAgICBhY2MgPSB2O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfSwgZmFsc2UpO1xuXG4gICAgfVxufVxuIl19