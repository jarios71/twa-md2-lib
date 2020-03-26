import { __assign } from 'tslib';
import { Injectable, EventEmitter, Component, Input, Output, ViewChild, HostListener, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { DragDropModule } from '@angular/cdk/drag-drop';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
                    var newGroup = __assign({}, v, { fields: _this.processFilterOrs(v.fields) });
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TWAFilterEditorComponent = /** @class */ (function () {
    function TWAFilterEditorComponent() {
        this.change = new EventEmitter();
        this.selectedField = 'none';
        this.selectedValue = '';
        this.operation = 'contain';
        this.activeFilters = [];
        this.editing = false;
        this.texts = {
            filterBy: 'Filter by...',
            filter: 'filter',
            group: 'Group',
            ungroup: 'Ungroup',
            moveLeft: 'Move to left',
            moveRight: 'Move to right',
            openFilter: 'Open saved filter',
            saveFilter: 'Save filter',
            clearSelection: 'Clear selection',
            clearAll: 'Clear filters',
        };
        this.operations = {
            contain: '=>',
            equal: '===',
            greaterEqual: '>=',
            greater: '>',
            lessEqual: '<=',
            less: '<',
            in: 'in',
        };
        this.operationsData = [
            {
                type: 'contain',
                label: 'contains',
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
        ];
        this.arrayMove = (/**
         * @param {?} arr
         * @param {?} oldIndex
         * @param {?} newIndex
         * @return {?}
         */
        function (arr, oldIndex, newIndex) {
            if (newIndex > arr.length) {
                /** @type {?} */
                var k = newIndex - arr.length;
                while (k--) {
                    arr.push(undefined);
                }
            }
            arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
            return arr;
        });
    }
    /**
     * @param {?} event
     * @return {?}
     */
    TWAFilterEditorComponent.prototype.handleKeyboardEvent = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if ((event.key === 'c' && event.ctrlKey)) {
            this.clearFilters();
        }
        else if (this.editing && event.keyCode === 13) {
            this.addFilter();
        }
    };
    /**
     * @return {?}
     */
    TWAFilterEditorComponent.prototype.openFilters = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var fileObj = ((/** @type {?} */ (document.getElementById('openFiltersFile')))).files[0];
        /** @type {?} */
        var reader = new FileReader();
        reader.onload = (/**
         * @return {?}
         */
        function () {
            // console.log(reader.result);
            /** @type {?} */
            var data = JSON.parse((/** @type {?} */ (reader.result)));
            _this.activeFilters = data;
            _this.change.emit(_this.activeFilters);
        });
        reader.readAsText(fileObj);
    };
    /**
     * @return {?}
     */
    TWAFilterEditorComponent.prototype.saveFilters = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var blob = new Blob([JSON.stringify(this.activeFilters)], { type: 'text/json' });
        /** @type {?} */
        var filename = 'filters.json';
        /** @type {?} */
        var element = document.createElement('a');
        element.href = window.URL.createObjectURL(blob);
        element.download = filename;
        document.body.appendChild(element);
        element.click();
    };
    /**
     * @return {?}
     */
    TWAFilterEditorComponent.prototype.checkFilter = /**
     * @return {?}
     */
    function () {
        return (this.selectedField === 'none' || this.selectedValue === '');
    };
    /**
     * @return {?}
     */
    TWAFilterEditorComponent.prototype.sendFilter = /**
     * @return {?}
     */
    function () {
        this.addFilter();
    };
    /**
     * @return {?}
     */
    TWAFilterEditorComponent.prototype.addFilter = /**
     * @return {?}
     */
    function () {
        // console.log('adding filter...');
        var _a;
        // console.log('adding filter...');
        /** @type {?} */
        var color = '';
        /** @type {?} */
        var field = '';
        /** @type {?} */
        var dbfield = '';
        /** @type {?} */
        var label = '';
        /** @type {?} */
        var name = '';
        /** @type {?} */
        var explanation = this.selectedField + ' ' + this.operations[this.operation] + ' ' + this.selectedValue;
        for (var i = 0, l = this.filterOptions.fields.length; i < l; i++) {
            if (this.filterOptions.fields[i].name === this.selectedField) {
                // color = this.filterOptions.fields[i].color;
                // field = this.filterOptions.fields[i].field;
                // label = this.filterOptions.fields[i].label;
                // name = this.filterOptions.fields[i].name;
                /**
                 * ...with object destructuring
                 */
                (_a = this.filterOptions.fields[i], color = _a.color, field = _a.field, dbfield = _a.dbfield, label = _a.label, name = _a.name);
                break;
            }
        }
        if (this.operation === 'in') {
            explanation = this.selectedField + ' ' + this.operations[this.operation] + ' (...)';
        }
        else if (this.operation === 'contain') {
            // explanation = this.selectedField + ' ' + this.operations[this.operation] + ' ' + this.selectedValue;
            explanation = '"' + this.selectedValue + '" ' + this.operations[this.operation] + ' ' + this.selectedField;
        }
        this.activeFilters.push({
            color: color,
            explanation: explanation,
            label: label,
            name: name,
            field: field,
            dbfield: dbfield,
            bitwise: '&&',
            operation: this.operations[this.operation],
            value: this.selectedValue
        });
        this.selectedValue = '';
        // console.log(this.activeFilters);
        this.change.emit(this.activeFilters);
    };
    /**
     * @param {?} filter
     * @return {?}
     */
    TWAFilterEditorComponent.prototype.selectFilter = /**
     * @param {?} filter
     * @return {?}
     */
    function (filter) {
        filter.selected = !filter.selected;
        /** @type {?} */
        var group = this.getParentFilter(filter);
        if (group) {
            /** @type {?} */
            var selectedAll = true;
            for (var i = 0, l = group.fields.length; i < l; i++) {
                /** @type {?} */
                var tmpfilter = group.fields[i];
                if (!tmpfilter.isgroup && !tmpfilter.selected) {
                    selectedAll = false;
                }
            }
            if (selectedAll) {
                group.selected = true;
            }
        }
    };
    /**
     * @param {?} filter
     * @return {?}
     */
    TWAFilterEditorComponent.prototype.getParentFilter = /**
     * @param {?} filter
     * @return {?}
     */
    function (filter) {
        /** @type {?} */
        var getParentFilterInGroup = (/**
         * @param {?} group
         * @param {?} filter2
         * @return {?}
         */
        function (group, filter2) {
            ret = null;
            for (var i = 0, l = group.fields.length; i < l; i++) {
                /** @type {?} */
                var tmpfilter = group.fields[i];
                if (JSON.stringify(tmpfilter) === JSON.stringify(filter2)) {
                    return group;
                }
                else if (tmpfilter.isgroup) {
                    ret = getParentFilterInGroup(tmpfilter, filter2);
                }
            }
            return ret;
        });
        /** @type {?} */
        var ret = null;
        for (var i = 0, l = this.activeFilters.length; i < l; i++) {
            /** @type {?} */
            var tmpfilter = this.activeFilters[i];
            if (JSON.stringify(tmpfilter) === JSON.stringify(filter)) {
                return null;
            }
            else if (tmpfilter.isgroup) {
                ret = getParentFilterInGroup(tmpfilter, filter);
            }
        }
        return ret;
    };
    /**
     * @param {?} direction
     * @return {?}
     */
    TWAFilterEditorComponent.prototype.moveTo = /**
     * @param {?} direction
     * @return {?}
     */
    function (direction) {
        /** @type {?} */
        var idx = -1;
        /** @type {?} */
        var toIdx = -1;
        /** @type {?} */
        var group = -1;
        // Searching the selected filter...
        this.activeFilters.forEach((/**
         * @param {?} filter
         * @param {?} tmpidx
         * @return {?}
         */
        function (filter, tmpidx) {
            if (filter.selected) {
                idx = tmpidx;
                return;
            }
            else if (filter.isgroup) {
                filter.fields.forEach((/**
                 * @param {?} filter2
                 * @param {?} tmpidx2
                 * @return {?}
                 */
                function (filter2, tmpidx2) {
                    if (filter2.selected) {
                        idx = tmpidx2;
                        group = tmpidx;
                        return;
                    }
                }));
            }
        }));
        if (idx >= 0) {
            if (group >= 0) {
                toIdx = (idx + direction) >= 0 ? idx + direction : this.activeFilters[group].fields.length + direction;
                if (toIdx >= this.activeFilters[group].fields.length) {
                    toIdx = 0;
                }
                this.activeFilters[group].fields = this.arrayMove(this.activeFilters[group].fields, idx, toIdx);
            }
            else {
                toIdx = (idx + direction) >= 0 ? idx + direction : this.activeFilters.length + direction;
                if (toIdx >= this.activeFilters.length) {
                    toIdx = 0;
                }
                this.activeFilters = this.arrayMove(this.activeFilters, idx, toIdx);
            }
        }
        this.change.emit(this.activeFilters);
    };
    /**
     * @return {?}
     */
    TWAFilterEditorComponent.prototype.getSelected = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var getInGroup = (/**
         * @param {?} group
         * @return {?}
         */
        function (group) {
            return group.fields.reduce((/**
             * @param {?} acc2
             * @param {?} filter
             * @return {?}
             */
            function (acc2, filter) {
                if (filter.isgroup) {
                    acc2 += getInGroup(filter);
                }
                else if (filter.selected) {
                    acc2++;
                }
                return acc2;
            }), 0);
        });
        return this.activeFilters.reduce((/**
         * @param {?} acc
         * @param {?} filter
         * @return {?}
         */
        function (acc, filter) {
            if (filter.isgroup) {
                acc += getInGroup(filter);
            }
            else if (filter.selected) {
                acc++;
            }
            return acc;
        }), 0);
    };
    /**
     * @return {?}
     */
    TWAFilterEditorComponent.prototype.clearSelection = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var clearSelectionInGroup = (/**
         * @param {?} group
         * @return {?}
         */
        function (group) {
            group.fields.forEach((/**
             * @param {?} filter
             * @return {?}
             */
            function (filter) {
                if (filter.isgroup) {
                    filter = clearSelectionInGroup(filter);
                }
                else {
                    filter.selected = false;
                }
            }));
            return group;
        });
        this.activeFilters = this.activeFilters.map((/**
         * @param {?} filter
         * @return {?}
         */
        function (filter) {
            if (filter.isgroup) {
                filter = clearSelectionInGroup(filter);
                // filter.fields = filter.fields.map((filter2) => {
                //     filter2.selected = false;
                //     return filter2;
                // });
            }
            filter.selected = false;
            return filter;
        }));
    };
    /**
     * @param {?} filter
     * @param {?} bitwise
     * @return {?}
     */
    TWAFilterEditorComponent.prototype.changeBitwise = /**
     * @param {?} filter
     * @param {?} bitwise
     * @return {?}
     */
    function (filter, bitwise) {
        filter.bitwise = bitwise;
        this.change.emit(this.activeFilters);
    };
    /**
     * @return {?}
     */
    TWAFilterEditorComponent.prototype.groupSelected = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var groupSelectedInGroup = (/**
         * @param {?} filter
         * @return {?}
         */
        function (filter) {
            /** @type {?} */
            var ret2 = 0;
            if (filter.isgroup) {
                filter.fields.forEach((/**
                 * @param {?} filter2
                 * @return {?}
                 */
                function (filter2) {
                    if (filter2.isgroup) {
                        ret2 += groupSelectedInGroup(filter2);
                    }
                    else {
                        if (filter2.selected) {
                            ret2++;
                        }
                    }
                }));
                return ret2;
            }
            else {
                if (filter.selected) {
                    return 1;
                }
            }
        });
        /** @type {?} */
        var groups = this.activeFilters.filter((/**
         * @param {?} filter
         * @return {?}
         */
        function (filter) { return filter.isgroup; }));
        /** @type {?} */
        var ret = 0;
        groups.forEach((/**
         * @param {?} group
         * @return {?}
         */
        function (group) {
            group.fields.forEach((/**
             * @param {?} filter
             * @return {?}
             */
            function (filter) {
                if (filter.isgroup) {
                    ret += groupSelectedInGroup(filter);
                }
                else if (filter.selected) {
                    ret++;
                }
            }));
        }));
        return ret > 0;
    };
    /**
     * @return {?}
     */
    TWAFilterEditorComponent.prototype.entireGroupSelected = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var entireGroupSelectedInGroup = (/**
         * @param {?} group
         * @return {?}
         */
        function (group) {
            /** @type {?} */
            var selected2 = true;
            for (var i = 0, l = group.fields.length; i < l; i++) {
                /** @type {?} */
                var filter = group.fields[i];
                if (filter.isgroup) {
                    selected2 = entireGroupSelectedInGroup(filter);
                    if (selected2) {
                        return true;
                    }
                }
                else if (!filter.selected) {
                    selected2 = false;
                }
            }
            return selected2 && group.fields.length > 0;
        });
        /** @type {?} */
        var groups = this.activeFilters.filter((/**
         * @param {?} filter
         * @return {?}
         */
        function (filter) { return filter.isgroup; }));
        /** @type {?} */
        var selected = true;
        for (var ig = 0, lg = groups.length; ig < lg; ig++) {
            /** @type {?} */
            var group = groups[ig];
            for (var ig2 = 0, lg2 = group.fields.length; ig2 < lg2; ig2++) {
                /** @type {?} */
                var filter = group.fields[ig2];
                if (filter.isgroup) {
                    selected = entireGroupSelectedInGroup(filter);
                    if (selected) {
                        return true;
                    }
                }
                else if (!filter.selected) {
                    selected = false;
                }
            }
            group.fields.forEach((/**
             * @param {?} filter
             * @return {?}
             */
            function (filter) {
            }));
            if (selected) {
                return true;
            }
        }
        groups.forEach((/**
         * @param {?} group
         * @return {?}
         */
        function (group) {
        }));
        return selected && groups.length > 0;
    };
    /**
     * @return {?}
     */
    TWAFilterEditorComponent.prototype.createGroup = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var createInGroup = (/**
         * @param {?} filter
         * @return {?}
         */
        function (filter) {
            /** @type {?} */
            var selected2 = filter.fields.filter((/**
             * @param {?} filter2
             * @return {?}
             */
            function (filter2) { return filter2.selected; }));
            /** @type {?} */
            var groupPosition2 = filter.fields.findIndex((/**
             * @param {?} v
             * @return {?}
             */
            function (v) { return v.selected; }));
            /** @type {?} */
            var resultFilter2;
            if (selected2.length) {
                resultFilter2 = filter.fields.filter((/**
                 * @param {?} filter2
                 * @return {?}
                 */
                function (filter2) { return !filter2.selected; }));
                resultFilter2.splice(groupPosition2, 0, {
                    color: '',
                    name: '',
                    field: '',
                    isgroup: true,
                    bitwise: '&&',
                    fields: selected2
                });
            }
            else {
                resultFilter2 = filter.fields.map((/**
                 * @param {?} filter2
                 * @return {?}
                 */
                function (filter2) {
                    if (filter2.isgroup) {
                        createInGroup(filter2);
                    }
                    return filter2;
                }));
            }
            filter.fields = resultFilter2;
        });
        /** @type {?} */
        var selected = this.activeFilters.filter((/**
         * @param {?} filter
         * @return {?}
         */
        function (filter) { return filter.selected; }));
        /** @type {?} */
        var groupPosition = this.activeFilters.findIndex((/**
         * @param {?} v
         * @return {?}
         */
        function (v) { return v.selected; }));
        /** @type {?} */
        var resultFilter;
        if (selected.length) {
            resultFilter = this.activeFilters.filter((/**
             * @param {?} filter
             * @return {?}
             */
            function (filter) { return !filter.selected; }));
            resultFilter.splice(groupPosition, 0, {
                color: '',
                name: '',
                field: '',
                isgroup: true,
                bitwise: '&&',
                fields: selected
            });
            this.activeFilters = resultFilter;
        }
        else {
            resultFilter = this.activeFilters.map((/**
             * @param {?} filter
             * @return {?}
             */
            function (filter) {
                if (filter.isgroup) {
                    createInGroup(filter);
                }
                return filter;
            }));
        }
        this.clearSelection();
        this.change.emit(this.activeFilters);
    };
    /**
     * @return {?}
     */
    TWAFilterEditorComponent.prototype.sanitizeGroups = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var sanitizeGroupsInGroup = (/**
         * @param {?} group
         * @param {?=} parent
         * @return {?}
         */
        function (group, parent) {
            group.fields.map((/**
             * @param {?} filter
             * @param {?} idx
             * @return {?}
             */
            function (filter, idx) {
                if (filter.isgroup) {
                    if (filter.fields.length === 0) {
                        group.fields.splice(idx, 1);
                    }
                    else if (filter.fields.length === 1) {
                        // group.fields.push({...filter.fields[0]});
                        group.fields.splice(idx, 1, __assign({}, filter.fields[0]));
                    }
                    else {
                        sanitizeGroupsInGroup(filter, group);
                    }
                }
            }));
        });
        this.activeFilters.map((/**
         * @param {?} filter
         * @param {?} idx
         * @return {?}
         */
        function (filter, idx) {
            if (filter.isgroup) {
                if (filter.fields.length === 0) {
                    _this.activeFilters.splice(idx, 1);
                }
                else if (filter.fields.length === 1) {
                    // this.activeFilters.push({...filter.fields[0]});
                    _this.activeFilters.splice(idx, 1, __assign({}, filter.fields[0]));
                }
                else {
                    sanitizeGroupsInGroup(filter);
                }
            }
        }));
    };
    /**
     * @return {?}
     */
    TWAFilterEditorComponent.prototype.removeFromGroup = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var removeFromGroupInGroup = (/**
         * @param {?} group
         * @param {?} parent
         * @param {?} idx
         * @return {?}
         */
        function (group, parent, idx) {
            group.fields.forEach((/**
             * @param {?} filter2
             * @param {?} idx2
             * @return {?}
             */
            function (filter2, idx2) {
                if (filter2.isgroup) {
                    removeFromGroupInGroup(filter2, group, idx2);
                }
            }));
            /** @type {?} */
            var tmpFilters = group.fields.filter((/**
             * @param {?} filter2
             * @return {?}
             */
            function (filter2) { return filter2.selected; }));
            group.fields = group.fields.filter((/**
             * @param {?} filter2
             * @return {?}
             */
            function (filter2) { return !filter2.selected; }));
            tmpFilters.forEach((/**
             * @param {?} v
             * @return {?}
             */
            function (v) {
                v.selected = false;
                parent.fields.push(v);
            }));
            if (group.fields.length === 0) {
                parent.fields.splice(idx, 1);
            }
        });
        this.activeFilters = this.activeFilters.reduce((/**
         * @param {?} newFilters
         * @param {?} filter
         * @return {?}
         */
        function (newFilters, filter) {
            if (filter.isgroup) {
                filter.fields.forEach((/**
                 * @param {?} filter2
                 * @param {?} idx
                 * @return {?}
                 */
                function (filter2, idx) {
                    if (filter2.isgroup) {
                        removeFromGroupInGroup(filter2, filter, idx);
                    }
                }));
                /** @type {?} */
                var tmpFilters = filter.fields.filter((/**
                 * @param {?} filter2
                 * @return {?}
                 */
                function (filter2) { return filter2.selected; }));
                filter.fields = filter.fields.filter((/**
                 * @param {?} filter2
                 * @return {?}
                 */
                function (filter2) { return !filter2.selected; }));
                if (filter.fields.length) {
                    newFilters.push(filter);
                }
                tmpFilters.forEach((/**
                 * @param {?} v
                 * @return {?}
                 */
                function (v) {
                    newFilters.push(v);
                }));
            }
            else {
                newFilters.push(filter);
            }
            return newFilters;
        }), []);
        this.clearSelection();
        this.sanitizeGroups();
        this.change.emit(this.activeFilters);
    };
    /**
     * @param {?} _event
     * @param {?} _filter
     * @return {?}
     */
    TWAFilterEditorComponent.prototype.onStartDragFilter = /**
     * @param {?} _event
     * @param {?} _filter
     * @return {?}
     */
    function (_event, _filter) {
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TWAFilterEditorComponent.prototype.onDroppedFilter = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        console.log('dropped');
        this.arrayMove(this.activeFilters, event.previousIndex, event.currentIndex);
        console.log(this.activeFilters);
        // this.clearSelection();
        this.sanitizeGroups();
        this.change.emit(this.activeFilters);
    };
    /**
     * @return {?}
     */
    TWAFilterEditorComponent.prototype.uploadSet = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var fileObj = ((/** @type {?} */ (document.getElementById('fileSet')))).files[0];
        /** @type {?} */
        var reader = new FileReader();
        reader.onload = (/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var lines = ((/** @type {?} */ (reader.result))).split(/\r?\n/).filter((/**
             * @param {?} val
             * @return {?}
             */
            function (val) { return val > ''; }));
            _this.selectedValue = lines.join(', ');
            _this.fileSet.nativeElement.value = '';
        });
        reader.readAsText(fileObj);
    };
    /**
     * @param {?} filter
     * @return {?}
     */
    TWAFilterEditorComponent.prototype.removeFilter = /**
     * @param {?} filter
     * @return {?}
     */
    function (filter) {
        // const removeFilterInGroup = (group, filter) => {
        // const removeFilterInGroup = (group, filter) => {
        // };
        /** @type {?} */
        var parent = this.getParentFilter(filter);
        /** @type {?} */
        var group;
        if (parent) {
            group = parent.fields;
        }
        else {
            group = this.activeFilters;
        }
        for (var i = 0, l = group.length; i < l; i++) {
            if (JSON.stringify(group[i]) === JSON.stringify(filter)) {
                group.splice(i, 1);
                break;
            }
        }
        this.sanitizeGroups();
        this.change.emit(this.activeFilters);
    };
    /**
     * @return {?}
     */
    TWAFilterEditorComponent.prototype.clearFilters = /**
     * @return {?}
     */
    function () {
        this.activeFilters = [];
        this.change.emit(this.activeFilters);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TWAFilterEditorComponent.prototype.onFocus = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.editing = true;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TWAFilterEditorComponent.prototype.onBlur = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.editing = false;
    };
    /**
     * @return {?}
     */
    TWAFilterEditorComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.filterOptions = this.options;
        this.selectedField = (typeof this.filterOptions.fields[0] !== 'undefined') ? this.filterOptions.fields[0].name : 'none';
        if (typeof this.config !== undefined) {
            if (this.config && typeof this.config.operationsData !== 'undefined') {
                this.operationsData = this.config.operationsData;
            }
            if (this.config && typeof this.config.filter !== 'undefined') {
                this.activeFilters = this.config.filter.slice();
            }
            if (this.config && typeof this.config.texts !== 'undefined') {
                this.texts = __assign({}, this.texts, this.config.texts);
            }
        }
        // this.filterOptions = JSON.parse(this.options);
    };
    TWAFilterEditorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'twa-md2-filter-editor',
                    template: "<div fxLayout=\"column\" style=\"width: 100%;\">\n    <div class=\"selector\" fxLayout=\"row\" fxLayoutGap=\"10px\">\n        <mat-form-field>\n            <mat-select [(ngModel)]=\"selectedField\">\n                <mat-option selected value=\"none\">{{texts.filterBy}}</mat-option>\n                <mat-option *ngFor=\"let field of filterOptions.fields\" [(value)]=\"field.name\">{{field.label}}</mat-option>\n            </mat-select>\n        </mat-form-field>\n        <mat-form-field>\n            <mat-select [(ngModel)]=\"operation\">\n                <mat-option *ngFor=\"let op of operationsData\" value=\"{{op.type}}\">{{op.label}}</mat-option>\n            </mat-select>\n        </mat-form-field>\n        <mat-form-field>\n            <input matInput placeholder=\"{{texts.filter}}\" [(ngModel)]=\"selectedValue\"\n                    (focus)=\"onFocus($event)\" (blur)=\"onBlur($event)\" />\n            <button mat-button *ngIf=\"operation==='in'\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"fileSet.click()\">\n                <mat-icon>attach_file</mat-icon>\n            </button>\n        </mat-form-field>\n        <div>\n            <button mat-button mat-icon-button (click)=\"sendFilter()\" [disabled]=\"checkFilter()\">\n                <mat-icon>send</mat-icon>\n            </button>\n        </div>\n        <div fxFlex></div>\n        <button mat-button mat-icon-button\n                *ngIf=\"activeFilters.length === 0\"\n                matTooltip=\"{{texts.openFilter}}\"\n                (click)=\"openFiltersFile.click()\">\n            <mat-icon>folder_open</mat-icon>\n        </button>\n        <div class=\"tools\" *ngIf=\"activeFilters.length > 0\" fxLayout=\"row\">\n            <button mat-button mat-icon-button\n                    matTooltip=\"{{texts.group}}\"\n                    (click)=\"createGroup()\"\n                    [disabled]=\"getSelected() < 2\">\n                <mat-icon>link</mat-icon>\n            </button>\n            <button mat-button mat-icon-button\n                    matTooltip=\"{{texts.ungroup}}\"\n                    (click)=\"removeFromGroup()\"\n                    [disabled]=\"!groupSelected()\">\n                <mat-icon>link_off</mat-icon>\n            </button>\n            <button mat-button mat-icon-button\n                    matTooltip=\"{{texts.moveLeft}}\"\n                    (click)=\"moveTo(-1)\"\n                    [disabled]=\"getSelected() !== 1 && !entireGroupSelected()\">\n                <mat-icon>arrow_back</mat-icon>\n            </button>\n            <button mat-button mat-icon-button\n                    matTooltip=\"{{texts.moveRight}}\"\n                    (click)=\"moveTo(1)\"\n                    [disabled]=\"getSelected() !== 1 && !entireGroupSelected()\">\n                <mat-icon>arrow_forward</mat-icon>\n            </button>\n            <button mat-button mat-icon-button\n                    matTooltip=\"{{texts.openFilter}}\"\n                    (click)=\"openFiltersFile.click()\">\n                <mat-icon>folder_open</mat-icon>\n            </button>\n            <button mat-button mat-icon-button\n                    matTooltip=\"{{texts.saveFilter}}\"\n                    [disabled]=\"getSelected() > 1\"\n                    (click)=\"saveFilters()\">\n                <mat-icon>save</mat-icon>\n            </button>\n            <button mat-button mat-icon-button\n                    matTooltip=\"{{texts.clearSelection}}\"\n                    [disabled]=\"getSelected() < 1\"\n                    (click)=\"clearSelection()\">\n                <mat-icon>clear</mat-icon>\n            </button>\n            <button mat-button mat-icon-button\n                    matTooltip=\"{{texts.clearAll}}\"\n                    [disabled]=\"activeFilters.length < 1\"\n                    (click)=\"clearFilters()\">\n                <mat-icon>clear_all</mat-icon>\n            </button>\n        </div>\n    </div>\n    <div class=\"filter\" fxLayoutGap=\"12\">\n        <mat-chip-list cdkDropList\n                        cdkDropListOrientation=\"horizontal\"\n                        #filterList=\"cdkDropList\"\n                        (cdkDropListDropped)=\"onDroppedFilter($event)\">\n            <!-- <ng-container *ngFor=\"let filter of activeFilters; let idx = index\"> -->\n                <div fxLayout=\"row\"\n                *ngFor=\"let filter of activeFilters; let idx = index\"\n                cdkDrag\n                (cdkDragStarted)=\"onStartDragFilter($event, filter)\" [ngClass]=\"{'cgroup': filter.isgroup}\">\n                    <button mat-button *ngIf=\"idx > 0\" [matMenuTriggerFor]=\"menu\" class=\"bitwise\">{{filter.bitwise}}</button>\n                    <mat-menu #menu=\"matMenu\">\n                        <button mat-menu-item (click)=\"changeBitwise(filter, '&&')\">&&</button>\n                        <button mat-menu-item (click)=\"changeBitwise(filter, '||')\">||</button>\n                    </mat-menu>\n                    <mat-chip color=\"{{filter.color}}\" selected=\"true\"\n                                id=\"filter-{{idx}}\"\n                                [removable]=\"true\" (removed)=\"removeFilter(filter)\"\n                                [matTooltip]=\"filter.value\"\n                                [matTooltipDisabled]=\"filter.operation!=='in'\"\n                                matTooltipShowDelay=\"1500\"\n                                (click)=\"selectFilter(filter)\"\n                                *ngIf=\"!filter.isgroup\"\n                                [ngClass]=\"{'selected': filter.selected, 'mat-accent': filter.selected}\">\n                        {{filter.explanation}}\n                        <mat-icon matChipRemove>cancel</mat-icon>\n                    </mat-chip>\n                    <div *ngIf=\"filter.isgroup\" fxLayout=\"row\">\n                        <div *ngTemplateOutlet=\"group; context: { filter: this.filter, idx: this.idx}\" fxLayout=\"row\">\n                        </div>\n                    </div>\n                </div>\n            <!-- </ng-container> -->\n        </mat-chip-list>\n    </div>\n</div>\n<input style=\"visibilty: hidden; height: 0px; width: 0px;\" type=\"file\" id=\"fileSet\" #fileSet (change)=\"uploadSet()\" />\n<input style=\"visibilty: hidden; height: 0px; width: 0px;\" type=\"file\" id=\"openFiltersFile\" #openFiltersFile (change)=\"openFilters()\" />\n<ng-template #group let-filter=\"filter\" let-idx=\"idx\">\n    <span class=\"group-start\">(</span>\n    <ng-container *ngFor=\"let filter2 of filter.fields; let idx2 = index\">\n        <button mat-button *ngIf=\"idx2 > 0\" [matMenuTriggerFor]=\"menu2\"\n                class=\"bitwise\">\n            {{filter2.bitwise}}\n        </button>\n        <mat-menu #menu2=\"matMenu\">\n            <button mat-menu-item (click)=\"changeBitwise(filter2, '&&')\">&&</button>\n            <button mat-menu-item (click)=\"changeBitwise(filter2, '||')\">||</button>\n        </mat-menu>\n        <div>\n            <mat-chip color=\"{{filter.color}}\" selected=\"true\"\n                id=\"filter-{{idx}}-{{idx2}}\"\n                [removable]=\"true\" (removed)=\"removeFilter(filter2)\"\n                [matTooltip]=\"filter2.value\"\n                [matTooltipDisabled]=\"filter.operation!=='in'\"\n                matTooltipShowDelay=\"1500\"\n                (click)=\"selectFilter(filter2)\"\n                [ngClass]=\"{'selected': filter2.selected, 'mat-accent': filter2.selected}\"\n                *ngIf=\"!filter2.isgroup\"\n            >{{filter2.explanation}}\n                <mat-icon matChipRemove>cancel</mat-icon>\n            </mat-chip>\n            <div *ngIf=\"filter2.isgroup\" fxLayout=\"row\">\n                <div *ngTemplateOutlet=\"group; context: { filter: this.filter2, idx: this.idx2}\">\n                </div>\n            </div>\n        </div>\n    </ng-container>\n    <span class=\"group-end\">)</span>\n</ng-template>\n",
                    styles: ["\n    .error { color: red; }\n    .selector {\n        width: 100%;\n    }\n    .filter {\n        padding-bottom: 12px;\n    }\n    .filter mat-chip {\n        margin: 4px;\n    }\n    .cgroup {\n        display: flex;\n    }\n    mat-chip.selected {\n        color: #fff;\n        font-weight: bold;\n    }\n    span.group-start,\n    span.group-end {\n        font-size: 25px;\n    }\n    button.bitwise {\n        min-width: 24px;\n        padding-left: 0;\n        padding-right: 0;\n    }\n    "]
                }] }
    ];
    /** @nocollapse */
    TWAFilterEditorComponent.ctorParameters = function () { return []; };
    TWAFilterEditorComponent.propDecorators = {
        options: [{ type: Input }],
        config: [{ type: Input }],
        change: [{ type: Output }],
        fileSet: [{ type: ViewChild, args: ['fileSet', { static: true },] }],
        openFiltersFile: [{ type: ViewChild, args: ['oepnFiltersFile', { static: true },] }],
        handleKeyboardEvent: [{ type: HostListener, args: ['document:keydown', ['$event'],] }]
    };
    return TWAFilterEditorComponent;
}());
if (false) {
    /** @type {?} */
    TWAFilterEditorComponent.prototype.options;
    /** @type {?} */
    TWAFilterEditorComponent.prototype.config;
    /** @type {?} */
    TWAFilterEditorComponent.prototype.change;
    /** @type {?} */
    TWAFilterEditorComponent.prototype.fileSet;
    /** @type {?} */
    TWAFilterEditorComponent.prototype.openFiltersFile;
    /** @type {?} */
    TWAFilterEditorComponent.prototype.filterOptions;
    /** @type {?} */
    TWAFilterEditorComponent.prototype.selectedField;
    /** @type {?} */
    TWAFilterEditorComponent.prototype.selectedValue;
    /** @type {?} */
    TWAFilterEditorComponent.prototype.operation;
    /** @type {?} */
    TWAFilterEditorComponent.prototype.activeFilters;
    /** @type {?} */
    TWAFilterEditorComponent.prototype.editing;
    /** @type {?} */
    TWAFilterEditorComponent.prototype.texts;
    /** @type {?} */
    TWAFilterEditorComponent.prototype.operations;
    /** @type {?} */
    TWAFilterEditorComponent.prototype.operationsData;
    /** @type {?} */
    TWAFilterEditorComponent.prototype.arrayMove;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TWAFilterEditorModule = /** @class */ (function () {
    function TWAFilterEditorModule() {
    }
    TWAFilterEditorModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        MatIconModule,
                        MatSelectModule,
                        MatChipsModule,
                        MatInputModule,
                        MatButtonModule,
                        FlexLayoutModule,
                        MatTooltipModule,
                        MatMenuModule,
                        DragDropModule,
                    ],
                    declarations: [
                        TWAFilterEditorComponent,
                    ],
                    exports: [
                        TWAFilterEditorComponent,
                    ],
                    providers: [
                        TWAFilterEditorService
                    ]
                },] }
    ];
    return TWAFilterEditorModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function FilterEditorOptions() { }
if (false) {
    /** @type {?} */
    FilterEditorOptions.prototype.title;
    /** @type {?} */
    FilterEditorOptions.prototype.fields;
    /** @type {?} */
    FilterEditorOptions.prototype.results;
}
/**
 * @record
 */
function OperationData() { }
if (false) {
    /** @type {?} */
    OperationData.prototype.type;
    /** @type {?} */
    OperationData.prototype.label;
    /** @type {?} */
    OperationData.prototype.operator;
}
/**
 * @record
 */
function FilterEditorConfig() { }
if (false) {
    /** @type {?} */
    FilterEditorConfig.prototype.operationsData;
    /** @type {?|undefined} */
    FilterEditorConfig.prototype.filter;
    /** @type {?|undefined} */
    FilterEditorConfig.prototype.texts;
}
/**
 * @record
 */
function FieldFilter() { }
if (false) {
    /** @type {?} */
    FieldFilter.prototype.color;
    /** @type {?} */
    FieldFilter.prototype.field;
    /** @type {?|undefined} */
    FieldFilter.prototype.dbfield;
    /** @type {?} */
    FieldFilter.prototype.name;
    /** @type {?|undefined} */
    FieldFilter.prototype.label;
    /** @type {?|undefined} */
    FieldFilter.prototype.bitwise;
    /** @type {?|undefined} */
    FieldFilter.prototype.operation;
    /** @type {?|undefined} */
    FieldFilter.prototype.explanation;
    /** @type {?|undefined} */
    FieldFilter.prototype.value;
    /** @type {?|undefined} */
    FieldFilter.prototype.selected;
    /** @type {?|undefined} */
    FieldFilter.prototype.isgroup;
    /** @type {?|undefined} */
    FieldFilter.prototype.fields;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { TWAFilterEditorComponent, TWAFilterEditorModule, TWAFilterEditorService };
//# sourceMappingURL=twa-md2-filter-editor.js.map
