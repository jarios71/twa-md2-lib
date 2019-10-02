/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
var TWAFilterEditorService = /** @class */ (function () {
    function TWAFilterEditorService() {
        var _this = this;
        this.processFilterOrs = (/**
         * @param {?} filters
         * @return {?}
         */
        function (filters) {
            /** @type {?} */
            var actualFilter = 0;
            /** @type {?} */
            var newFilters = [];
            filters.forEach((/**
             * @param {?} v
             * @param {?} i
             * @return {?}
             */
            function (v, i) {
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
            }));
            return newFilters;
        });
        this.filterData = (/**
         * @param {?} filter
         * @param {?} filterValue
         * @return {?}
         */
        function (filter, filterValue) {
            /** @type {?} */
            var comparators = {
                '=>': (/**
                 * @param {?} a
                 * @param {?} b
                 * @return {?}
                 */
                function (a, b) { return a.includes(b); }),
                '===': (/**
                 * @param {?} a
                 * @param {?} b
                 * @return {?}
                 */
                function (a, b) { return a === b; }),
                '>=': (/**
                 * @param {?} a
                 * @param {?} b
                 * @return {?}
                 */
                function (a, b) { return a >= b; }),
                '>': (/**
                 * @param {?} a
                 * @param {?} b
                 * @return {?}
                 */
                function (a, b) { return a > b; }),
                '<=': (/**
                 * @param {?} a
                 * @param {?} b
                 * @return {?}
                 */
                function (a, b) { return a <= b; }),
                '<': (/**
                 * @param {?} a
                 * @param {?} b
                 * @return {?}
                 */
                function (a, b) { return a < b; }),
                'in': (/**
                 * @param {?} a
                 * @param {?} b
                 * @return {?}
                 */
                function (a, b) { return b.split(',').includes(a); }),
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
        });
        this.filterGroup = (/**
         * @param {?} filter
         * @param {?} filterValue
         * @return {?}
         */
        function (filter, filterValue) {
            /** @type {?} */
            var results = [];
            var _loop_1 = function (i, l) {
                /** @type {?} */
                var results2 = [];
                filter.fields[i].forEach((/**
                 * @param {?} v
                 * @return {?}
                 */
                function (v) {
                    results2.push(_this.filterData(v, filterValue));
                }));
                results.push(results2.reduce((/**
                 * @param {?} acc
                 * @param {?} v2
                 * @return {?}
                 */
                function (acc, v2) {
                    if (!v2) {
                        acc = v2;
                    }
                    return acc;
                }), true));
            };
            for (var i = 0, l = filter.fields.length; i < l; i++) {
                _loop_1(i, l);
            }
            return results.reduce((/**
             * @param {?} acc
             * @param {?} v
             * @return {?}
             */
            function (acc, v) {
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
        this.filter.change.subscribe((/**
         * @param {?} filters
         * @return {?}
         */
        function (filters) {
            _this.filters = filters;
            _this.applyFilter();
        }));
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
        function (item, idx) {
            item.realIndex = idx;
            return item;
        })).filter((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            ret = _this.applyFilterToRow(item);
            return ret;
        }));
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
            this_1.processedFilters[i].forEach((/**
             * @param {?} v
             * @return {?}
             */
            function (v) {
                results2.push(_this.filterData(v, item));
            }));
            results.push(results2.reduce((/**
             * @param {?} acc
             * @param {?} v
             * @return {?}
             */
            function (acc, v) {
                if (!v) {
                    acc = v;
                }
                return acc;
            }), true));
        };
        var this_1 = this;
        for (var i = 0, l = this.processedFilters.length; i < l; i++) {
            _loop_2(i, l);
        }
        if (results.length) {
            ret = results.reduce((/**
             * @param {?} acc
             * @param {?} v
             * @return {?}
             */
            function (acc, v) {
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
    };
    TWAFilterEditorService.decorators = [
        { type: Injectable }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdhLW1kMi1maWx0ZXItZWRpdG9yLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly90d2EtbWQyLWZpbHRlci1lZGl0b3IvIiwic291cmNlcyI6WyJsaWIvdHdhLW1kMi1maWx0ZXItZWRpdG9yLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSzNDO0lBQUE7UUFBQSxpQkEyS0M7UUFyRkcscUJBQWdCOzs7O1FBQUcsVUFBQyxPQUFPOztnQkFDbkIsWUFBWSxHQUFHLENBQUM7O2dCQUNkLFVBQVUsR0FBRyxFQUFFO1lBQ3JCLE9BQU8sQ0FBQyxPQUFPOzs7OztZQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxLQUFLLElBQUksRUFBRTtvQkFDN0IsWUFBWSxFQUFFLENBQUM7b0JBQ2YsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztpQkFDdkI7Z0JBQ0QsSUFBSSxPQUFNLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssV0FBVyxFQUFFO29CQUNsRCxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2lCQUN2QjtnQkFDRCxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUU7O3dCQUNMLFFBQVEsd0JBQU8sQ0FBQyxJQUFFLE1BQU0sRUFBRSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFDO29CQUNoRSx5QkFBeUI7b0JBQ3pCLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQzNDO3FCQUFNO29CQUNILFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3BDO1lBQ0wsQ0FBQyxFQUFDLENBQUM7WUFFSCxPQUFP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O1lBQ0gsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTTs7Ozs7WUFBQyxVQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUNoQyxJQUFJLENBQUMsQ0FBQyxFQUFFO29CQUNKLEdBQUcsR0FBRyxDQUFDLENBQUM7aUJBQ1g7Z0JBQ0QsT0FBTyxHQUFHLENBQUM7WUFDZixDQUFDLEdBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQzs7O1FBVmQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUU7b0JBQW5ELENBQUMsRUFBTSxDQUFDO1NBV2hCO1FBRUQsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQ2hCLEdBQUcsR0FBRyxPQUFPLENBQUMsTUFBTTs7Ozs7WUFBQyxVQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUN4QixJQUFJLENBQUMsRUFBRTtvQkFDSCxHQUFHLEdBQUcsQ0FBQyxDQUFDO2lCQUNYO2dCQUNELE9BQU8sR0FBRyxDQUFDO1lBQ2YsQ0FBQyxHQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ2I7YUFBTTtZQUNILEdBQUcsR0FBRyxJQUFJLENBQUM7U0FDZDtRQUVELE9BQU8sR0FBRyxDQUFDO0lBRWYsQ0FBQzs7Z0JBcEZKLFVBQVU7O0lBMktYLDZCQUFDO0NBQUEsQUEzS0QsSUEyS0M7U0ExS1ksc0JBQXNCOzs7SUFFL0IseUNBQXVCOztJQUV2Qiw4Q0FBb0I7O0lBQ3BCLHdDQUFpQzs7SUFDakMsc0NBQVk7O0lBQ1osNkNBQXNCOztJQUN0QixrREFBd0I7O0lBNkV4QixrREFxQkM7O0lBRUQsNENBbUNDOztJQUVELDZDQXdCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgVFdBRmlsdGVyRWRpdG9yQ29tcG9uZW50IH0gZnJvbSAnLi90d2EtbWQyLWZpbHRlci1lZGl0b3IuY29tcG9uZW50JztcbmltcG9ydCB7IEZpZWxkRmlsdGVyIH0gZnJvbSAnLi90d2EtbWQyLWZpbHRlci1lZGl0b3IuaW50ZXJmYWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRXQUZpbHRlckVkaXRvclNlcnZpY2Uge1xuXG4gICAgZmlsdGVyczogRmllbGRGaWx0ZXJbXTtcblxuICAgIGZpbHRlcmVkRGF0YTogYW55W107XG4gICAgZmlsdGVyOiBUV0FGaWx0ZXJFZGl0b3JDb21wb25lbnQ7XG4gICAgZGF0YTogYW55W107XG4gICAgcHJlcGFyZURhdGE6IEZ1bmN0aW9uO1xuICAgIHByb2Nlc3NlZEZpbHRlcnM6IGFueVtdO1xuXG4gICAgaW5pdChcbiAgICAgICAgZmlsdGVyOiBUV0FGaWx0ZXJFZGl0b3JDb21wb25lbnQsXG4gICAgICAgIGRhdGE6IGFueVtdLFxuICAgICAgICBwcmVwYXJlRGF0YT86IEZ1bmN0aW9uXG4gICAgKSB7XG4gICAgICAgIHRoaXMuZmlsdGVyID0gZmlsdGVyO1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgICAgICB0aGlzLnByZXBhcmVEYXRhID0gcHJlcGFyZURhdGE7XG5cbiAgICAgICAgdGhpcy5maWx0ZXIuY2hhbmdlLnN1YnNjcmliZSgoZmlsdGVyczogRmllbGRGaWx0ZXJbXSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJzID0gZmlsdGVycztcbiAgICAgICAgICAgIHRoaXMuYXBwbHlGaWx0ZXIoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucHJvY2Vzc2VkRmlsdGVycyA9IHRoaXMucHJvY2Vzc0ZpbHRlck9ycyh0aGlzLmZpbHRlci5hY3RpdmVGaWx0ZXJzKTtcbiAgICB9XG5cbiAgICBhcHBseUZpbHRlcihkYXRhID0gdGhpcy5kYXRhLnNsaWNlKCkpIHtcblxuICAgICAgICAvLyBsZXQgZGF0YSA9IHRoaXMuZGF0YS5zbGljZSgpO1xuICAgICAgICBsZXQgcmV0ID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gZGF0YS5sZW5ndGg7XG5cbiAgICAgICAgaWYgKCF0aGlzLmZpbHRlcikge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnByb2Nlc3NlZEZpbHRlcnMgPSB0aGlzLnByb2Nlc3NGaWx0ZXJPcnModGhpcy5maWx0ZXIuYWN0aXZlRmlsdGVycyk7XG5cbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcblxuICAgICAgICBkYXRhID0gZGF0YS5tYXAoKGl0ZW0sIGlkeCkgPT4ge1xuICAgICAgICAgICAgaXRlbS5yZWFsSW5kZXggPSBpZHg7XG4gICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgfSkuZmlsdGVyKChpdGVtOiBhbnkpID0+IHtcbiAgICAgICAgICAgIHJldCA9IHRoaXMuYXBwbHlGaWx0ZXJUb1JvdyhpdGVtKTtcbiAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkYXRhO1xuXG4gICAgfVxuXG4gICAgYXBwbHlGaWx0ZXJUb1JvdyhpdGVtKSB7XG5cbiAgICAgICAgbGV0IHJldCA9IHRydWU7XG4gICAgICAgIGNvbnN0IHJlc3VsdHMgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IHRoaXMucHJvY2Vzc2VkRmlsdGVycy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdHMyID0gW107XG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NlZEZpbHRlcnNbaV0uZm9yRWFjaCgodjogRmllbGRGaWx0ZXIpID0+IHtcbiAgICAgICAgICAgICAgICByZXN1bHRzMi5wdXNoKHRoaXMuZmlsdGVyRGF0YSh2LCBpdGVtKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaChyZXN1bHRzMi5yZWR1Y2UoKGFjYywgdikgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdikge1xuICAgICAgICAgICAgICAgICAgICBhY2MgPSB2O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICAgICAgfSwgdHJ1ZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlc3VsdHMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXQgPSByZXN1bHRzLnJlZHVjZSgoYWNjLCB2KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHYpIHtcbiAgICAgICAgICAgICAgICAgICAgYWNjID0gdjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmV0O1xuXG4gICAgfVxuXG4gICAgcHJvY2Vzc0ZpbHRlck9ycyA9IChmaWx0ZXJzKSA9PiB7XG4gICAgICAgIGxldCBhY3R1YWxGaWx0ZXIgPSAwO1xuICAgICAgICBjb25zdCBuZXdGaWx0ZXJzID0gW107XG4gICAgICAgIGZpbHRlcnMuZm9yRWFjaCgodiwgaSkgPT4ge1xuICAgICAgICAgICAgaWYgKGkgPiAwICYmIHYuYml0d2lzZSA9PT0gJ3x8Jykge1xuICAgICAgICAgICAgICAgIGFjdHVhbEZpbHRlcisrO1xuICAgICAgICAgICAgICAgIG5ld0ZpbHRlcnMucHVzaChbXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mKG5ld0ZpbHRlcnNbYWN0dWFsRmlsdGVyXSkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgbmV3RmlsdGVycy5wdXNoKFtdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh2LmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdHcm91cCA9IHsuLi52LCBmaWVsZHM6IHRoaXMucHJvY2Vzc0ZpbHRlck9ycyh2LmZpZWxkcyl9O1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG5ld0dyb3VwKTtcbiAgICAgICAgICAgICAgICBuZXdGaWx0ZXJzW2FjdHVhbEZpbHRlcl0ucHVzaChuZXdHcm91cCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5ld0ZpbHRlcnNbYWN0dWFsRmlsdGVyXS5wdXNoKHYpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gbmV3RmlsdGVycztcbiAgICB9XG5cbiAgICBmaWx0ZXJEYXRhID0gKGZpbHRlcjogYW55LCBmaWx0ZXJWYWx1ZTogYW55KSA9PiB7XG5cbiAgICAgICAgY29uc3QgY29tcGFyYXRvcnMgPSB7XG4gICAgICAgICAgICAnPT4nOiAoYTogc3RyaW5nLCBiOiBzdHJpbmcpID0+IGEuaW5jbHVkZXMoYiksXG4gICAgICAgICAgICAnPT09JzogKGE6IGFueSwgYjogYW55KSA9PiBhID09PSBiLFxuICAgICAgICAgICAgJz49JzogKGE6IGFueSwgYjogYW55KSA9PiBhID49IGIsXG4gICAgICAgICAgICAnPic6IChhOiBhbnksIGI6IGFueSkgPT4gYSA+IGIsXG4gICAgICAgICAgICAnPD0nOiAoYTogYW55LCBiOiBhbnkpID0+IGEgPD0gYixcbiAgICAgICAgICAgICc8JzogKGE6IGFueSwgYjogYW55KSA9PiBhIDwgYixcbiAgICAgICAgICAgICdpbic6IChhOiBhbnksIGI6IGFueSkgPT4gYi5zcGxpdCgnLCcpLmluY2x1ZGVzKGEpLFxuICAgICAgICB9O1xuXG4gICAgICAgIGxldCByZXRWYWx1ZSA9IGZhbHNlO1xuXG4gICAgICAgIGlmIChmaWx0ZXIuaXNncm91cCkge1xuICAgICAgICAgICAgcmV0VmFsdWUgPSB0aGlzLmZpbHRlckdyb3VwKGZpbHRlciwgZmlsdGVyVmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJlcGFyZURhdGEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByZXBhcmVEYXRhKGZpbHRlciwgZmlsdGVyVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGZpbHRlclZhbHVlW2ZpbHRlci5maWVsZF0gPT09ICdudW1iZXInICYmIChmaWx0ZXIub3BlcmF0aW9uICE9PSAnPT4nICYmIGZpbHRlci5vcGVyYXRpb24gIT09ICdpbicpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldFZhbHVlID0gY29tcGFyYXRvcnNbZmlsdGVyLm9wZXJhdGlvbl0oK2ZpbHRlclZhbHVlW2ZpbHRlci5maWVsZF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgK2ZpbHRlci52YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0VmFsdWUgPSBjb21wYXJhdG9yc1tmaWx0ZXIub3BlcmF0aW9uXShTdHJpbmcoZmlsdGVyVmFsdWVbZmlsdGVyLmZpZWxkXSkudG9Mb3dlckNhc2UoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTdHJpbmcoZmlsdGVyLnZhbHVlKS50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgICAgICByZXRWYWx1ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJldFZhbHVlO1xuXG4gICAgfVxuXG4gICAgZmlsdGVyR3JvdXAgPSAoZmlsdGVyOiBhbnksIGZpbHRlclZhbHVlOiBhbnkpID0+IHtcblxuICAgICAgICBjb25zdCByZXN1bHRzID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBmaWx0ZXIuZmllbGRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0czIgPSBbXTtcbiAgICAgICAgICAgIGZpbHRlci5maWVsZHNbaV0uZm9yRWFjaCgodjogYW55W10pID0+IHtcbiAgICAgICAgICAgICAgIHJlc3VsdHMyLnB1c2godGhpcy5maWx0ZXJEYXRhKHYsIGZpbHRlclZhbHVlKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaChyZXN1bHRzMi5yZWR1Y2UoKGFjYywgdjIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXYyKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjYyA9IHYyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICAgICAgfSwgdHJ1ZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdHMucmVkdWNlKChhY2MsIHYpID0+IHtcbiAgICAgICAgICAgIGlmICh2KSB7XG4gICAgICAgICAgICAgICAgYWNjID0gdjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIH0sIGZhbHNlKTtcblxuICAgIH1cbn1cbiJdfQ==