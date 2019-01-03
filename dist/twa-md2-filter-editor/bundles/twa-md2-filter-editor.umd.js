(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/forms'), require('@angular/material/icon'), require('@angular/material/select'), require('@angular/material/chips'), require('@angular/material/input'), require('@angular/material/button'), require('@angular/flex-layout'), require('@angular/material/tooltip'), require('@angular/material/menu'), require('@angular/cdk/drag-drop')) :
    typeof define === 'function' && define.amd ? define('twa-md2-filter-editor', ['exports', '@angular/core', '@angular/common', '@angular/forms', '@angular/material/icon', '@angular/material/select', '@angular/material/chips', '@angular/material/input', '@angular/material/button', '@angular/flex-layout', '@angular/material/tooltip', '@angular/material/menu', '@angular/cdk/drag-drop'], factory) :
    (factory((global['twa-md2-filter-editor'] = {}),global.ng.core,global.ng.common,global.ng.forms,global.ng.material.icon,global.ng.material.select,global.ng.material.chips,global.ng.material.input,global.ng.material.button,global.ng['flex-layout'],global.ng.material.tooltip,global.ng.material.menu,global.ng.cdk['drag-drop']));
}(this, (function (exports,core,common,forms,icon,select,chips,input,button,flexLayout,tooltip,menu,dragDrop) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
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
                        var newGroup = __assign({}, v, { fields: _this.processFilterOrs(v.fields) });
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
                if (data === void 0) {
                    data = this.data.slice();
                }
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
            { type: core.Injectable },
        ];
        return TWAFilterEditorService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var TWAFilterEditorComponent = /** @class */ (function () {
        function TWAFilterEditorComponent() {
            this.change = new core.EventEmitter();
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
            this.arrayMove = function (arr, oldIndex, newIndex) {
                if (newIndex > arr.length) {
                    /** @type {?} */
                    var k = newIndex - arr.length;
                    while (k--) {
                        arr.push(undefined);
                    }
                }
                arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
                return arr;
            };
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
        TWAFilterEditorComponent.prototype.checkFilter = /**
         * @return {?}
         */
            function () {
                return (this.selectedField === 'none' || this.selectedValue === '');
            };
        /**
         * @return {?}
         */
        TWAFilterEditorComponent.prototype.addFilter = /**
         * @return {?}
         */
            function () {
                var _a;
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
                var getParentFilterInGroup = function (group, filter2) {
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
                };
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
                this.activeFilters.forEach(function (filter, tmpidx) {
                    if (filter.selected) {
                        idx = tmpidx;
                        return;
                    }
                    else if (filter.isgroup) {
                        filter.fields.forEach(function (filter2, tmpidx2) {
                            if (filter2.selected) {
                                idx = tmpidx2;
                                group = tmpidx;
                                return;
                            }
                        });
                    }
                });
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
                var getInGroup = function (group) {
                    return group.fields.reduce(function (acc2, filter) {
                        if (filter.isgroup) {
                            acc2 += getInGroup(filter);
                        }
                        else if (filter.selected) {
                            acc2++;
                        }
                        return acc2;
                    }, 0);
                };
                return this.activeFilters.reduce(function (acc, filter) {
                    if (filter.isgroup) {
                        acc += getInGroup(filter);
                    }
                    else if (filter.selected) {
                        acc++;
                    }
                    return acc;
                }, 0);
            };
        /**
         * @return {?}
         */
        TWAFilterEditorComponent.prototype.clearSelection = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var clearSelectionInGroup = function (group) {
                    group.fields.forEach(function (filter) {
                        if (filter.isgroup) {
                            filter = clearSelectionInGroup(filter);
                        }
                        else {
                            filter.selected = false;
                        }
                    });
                    return group;
                };
                this.activeFilters = this.activeFilters.map(function (filter) {
                    if (filter.isgroup) {
                        filter = clearSelectionInGroup(filter);
                        // filter.fields = filter.fields.map((filter2) => {
                        //     filter2.selected = false;
                        //     return filter2;
                        // });
                    }
                    filter.selected = false;
                    return filter;
                });
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
                var groupSelectedInGroup = function (filter) {
                    /** @type {?} */
                    var ret2 = 0;
                    if (filter.isgroup) {
                        filter.fields.forEach(function (filter2) {
                            if (filter2.isgroup) {
                                ret2 += groupSelectedInGroup(filter2);
                            }
                            else {
                                if (filter2.selected) {
                                    ret2++;
                                }
                            }
                        });
                        return ret2;
                    }
                    else {
                        if (filter.selected) {
                            return 1;
                        }
                    }
                };
                /** @type {?} */
                var groups = this.activeFilters.filter(function (filter) { return filter.isgroup; });
                /** @type {?} */
                var ret = 0;
                groups.forEach(function (group) {
                    group.fields.forEach(function (filter) {
                        if (filter.isgroup) {
                            ret += groupSelectedInGroup(filter);
                        }
                        else if (filter.selected) {
                            ret++;
                        }
                    });
                });
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
                var entireGroupSelectedInGroup = function (group) {
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
                };
                /** @type {?} */
                var groups = this.activeFilters.filter(function (filter) { return filter.isgroup; });
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
                    group.fields.forEach(function (filter) {
                    });
                    if (selected) {
                        return true;
                    }
                }
                groups.forEach(function (group) {
                });
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
                var createInGroup = function (filter) {
                    /** @type {?} */
                    var selected2 = filter.fields.filter(function (filter2) { return filter2.selected; });
                    /** @type {?} */
                    var groupPosition2 = filter.fields.findIndex(function (v) { return v.selected; });
                    /** @type {?} */
                    var resultFilter2;
                    if (selected2.length) {
                        resultFilter2 = filter.fields.filter(function (filter2) { return !filter2.selected; });
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
                        resultFilter2 = filter.fields.map(function (filter2) {
                            if (filter2.isgroup) {
                                createInGroup(filter2);
                            }
                            return filter2;
                        });
                    }
                    filter.fields = resultFilter2;
                };
                /** @type {?} */
                var selected = this.activeFilters.filter(function (filter) { return filter.selected; });
                /** @type {?} */
                var groupPosition = this.activeFilters.findIndex(function (v) { return v.selected; });
                /** @type {?} */
                var resultFilter;
                if (selected.length) {
                    resultFilter = this.activeFilters.filter(function (filter) { return !filter.selected; });
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
                    resultFilter = this.activeFilters.map(function (filter) {
                        if (filter.isgroup) {
                            createInGroup(filter);
                        }
                        return filter;
                    });
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
                var sanitizeGroupsInGroup = function (group, parent) {
                    group.fields.map(function (filter, idx) {
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
                    });
                };
                this.activeFilters.map(function (filter, idx) {
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
                });
            };
        /**
         * @return {?}
         */
        TWAFilterEditorComponent.prototype.removeFromGroup = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var removeFromGroupInGroup = function (group, parent, idx) {
                    group.fields.forEach(function (filter2, idx2) {
                        if (filter2.isgroup) {
                            removeFromGroupInGroup(filter2, group, idx2);
                        }
                    });
                    /** @type {?} */
                    var tmpFilters = group.fields.filter(function (filter2) { return filter2.selected; });
                    group.fields = group.fields.filter(function (filter2) { return !filter2.selected; });
                    tmpFilters.forEach(function (v) {
                        v.selected = false;
                        parent.fields.push(v);
                    });
                    if (group.fields.length === 0) {
                        parent.fields.splice(idx, 1);
                    }
                };
                this.activeFilters = this.activeFilters.reduce(function (newFilters, filter) {
                    if (filter.isgroup) {
                        filter.fields.forEach(function (filter2, idx) {
                            if (filter2.isgroup) {
                                removeFromGroupInGroup(filter2, filter, idx);
                            }
                        });
                        /** @type {?} */
                        var tmpFilters = filter.fields.filter(function (filter2) { return filter2.selected; });
                        filter.fields = filter.fields.filter(function (filter2) { return !filter2.selected; });
                        if (filter.fields.length) {
                            newFilters.push(filter);
                        }
                        tmpFilters.forEach(function (v) {
                            newFilters.push(v);
                        });
                    }
                    else {
                        newFilters.push(filter);
                    }
                    return newFilters;
                }, []);
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
                this.arrayMove(this.activeFilters, event.previousIndex, event.currentIndex);
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
                var fileObj = (( /** @type {?} */(document.getElementById('fileSet')))).files[0];
                /** @type {?} */
                var reader = new FileReader();
                reader.onload = function () {
                    /** @type {?} */
                    var lines = (( /** @type {?} */(reader.result))).split(/\r?\n/).filter(function (val) { return val > ''; });
                    _this.selectedValue = lines.join(', ');
                    _this.fileSet.nativeElement.value = '';
                };
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
            { type: core.Component, args: [{
                        selector: 'twa-md2-filter-editor',
                        template: "<div fxLayout=\"row\" fxLayoutGap=\"20px\">\n    <div fxLayout=\"column\" fxFlex>\n        <div class=\"selector\" fxLayout=\"row\" fxLayoutGap=\"10px\">\n            <mat-form-field>\n                <mat-select [(ngModel)]=\"selectedField\">\n                    <mat-option selected value=\"none\">{{texts.filterBy}}</mat-option>\n                    <mat-option *ngFor=\"let field of filterOptions.fields\" [(value)]=\"field.name\">{{field.label}}</mat-option>\n                </mat-select>\n            </mat-form-field>\n            <mat-form-field>\n                <mat-select [(ngModel)]=\"operation\">\n                    <mat-option *ngFor=\"let op of operationsData\" value=\"{{op.type}}\">{{op.label}}</mat-option>\n                </mat-select>\n            </mat-form-field>\n            <mat-form-field>\n                <input matInput placeholder=\"{{texts.filter}}\" [(ngModel)]=\"selectedValue\"\n                        (focus)=\"onFocus($event)\" (blur)=\"onBlur($event)\" />\n                <button mat-button *ngIf=\"operation==='in'\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"fileSet.click()\">\n                    <mat-icon>attach_file</mat-icon>\n                </button>\n            </mat-form-field>\n            <div>\n                <button mat-button mat-icon-button (click)=\"addFilter()\" [disabled]=\"checkFilter()\">\n                    <mat-icon>send</mat-icon>\n                </button>\n            </div>\n            <div fxFlex>&nbsp;</div>\n            <div class=\"tools\" *ngIf=\"activeFilters.length > 0\" fxLayout=\"row\">\n                <button mat-button mat-icon-button\n                    matTooltip=\"{{texts.group}}\"\n                    (click)=\"createGroup()\"\n                    [disabled]=\"getSelected() < 2\">\n                    <mat-icon>link</mat-icon>\n                </button>\n                <button mat-button mat-icon-button\n                    matTooltip=\"{{texts.ungroup}}\"\n                    (click)=\"removeFromGroup()\"\n                    [disabled]=\"!groupSelected()\">\n                    <mat-icon>link_off</mat-icon>\n                </button>\n                <button mat-button mat-icon-button\n                    matTooltip=\"{{texts.moveLeft}}\"\n                    (click)=\"moveTo(-1)\"\n                    [disabled]=\"getSelected() !== 1 && !entireGroupSelected()\">\n                    <mat-icon>arrow_back</mat-icon>\n                </button>\n                <button mat-button mat-icon-button\n                    matTooltip=\"{{texts.moveRight}}\"\n                    (click)=\"moveTo(1)\"\n                    [disabled]=\"getSelected() !== 1 && !entireGroupSelected()\">\n                    <mat-icon>arrow_forward</mat-icon>\n                </button>\n                <button mat-button mat-icon-button\n                    matTooltip=\"{{texts.clearSelection}}\"\n                    [disabled]=\"getSelected() < 1\"\n                    (click)=\"clearSelection()\">\n                    <mat-icon>clear</mat-icon>\n                </button>\n                <button mat-button mat-icon-button\n                        matTooltip=\"{{texts.clearAll}}\"\n                        [disabled]=\"activeFilters.length < 1\"\n                        (click)=\"clearFilters()\">\n                    <mat-icon>clear_all</mat-icon>\n                </button>\n            </div>\n        </div>\n        <div class=\"filter\" fxLayoutGap=\"12\">\n            <mat-chip-list cdkDropList\n                           cdkDropListOrientation=\"horizontal\"\n                           (cdkDropListDropped)=\"onDroppedFilter($event)\">\n                <ng-container *ngFor=\"let filter of activeFilters; let idx = index\">\n                    <div fxLayout=\"row\"\n                    cdkDrag\n                    (cdkDragStarted)=\"onStartDragFilter($event, filter)\" [ngClass]=\"{'cgroup': filter.isgroup}\">\n                        <button mat-button *ngIf=\"idx > 0\" [matMenuTriggerFor]=\"menu\" class=\"bitwise\">{{filter.bitwise}}</button>\n                        <mat-menu #menu=\"matMenu\">\n                            <button mat-menu-item (click)=\"changeBitwise(filter, '&&')\">&&</button>\n                            <button mat-menu-item (click)=\"changeBitwise(filter, '||')\">||</button>\n                        </mat-menu>\n                        <mat-chip color=\"{{filter.color}}\" selected=\"true\"\n                                  id=\"filter-{{idx}}\"\n                                  [removable]=\"true\" (removed)=\"removeFilter(filter)\"\n                                  [matTooltip]=\"filter.value\"\n                                  [matTooltipDisabled]=\"filter.operation!=='in'\"\n                                  matTooltipShowDelay=\"1500\"\n                                  (click)=\"selectFilter(filter)\"\n                                  *ngIf=\"!filter.isgroup\"\n                                  [ngClass]=\"{'selected': filter.selected, 'mat-accent': filter.selected}\">\n                            {{filter.explanation}}\n                            <mat-icon matChipRemove>cancel</mat-icon>\n                        </mat-chip>\n                        <div *ngIf=\"filter.isgroup\" fxLayout=\"row\">\n                            <div *ngTemplateOutlet=\"group; context: { filter: this.filter, idx: this.idx}\" fxLayout=\"row\">\n                            </div>\n                        </div>\n                    </div>\n                </ng-container>\n            </mat-chip-list>\n        </div>\n    </div>\n    <input style=\"visibilty: hidden; height: 0px; width: 0px;\" type=\"file\" id=\"fileSet\" #fileSet (change)=\"uploadSet()\" />\n</div>\n<ng-template #group let-filter=\"filter\" let-idx=\"idx\">\n    <span class=\"group-start\">(</span>\n    <ng-container *ngFor=\"let filter2 of filter.fields; let idx2 = index\">\n        <button mat-button *ngIf=\"idx2 > 0\" [matMenuTriggerFor]=\"menu2\"\n                class=\"bitwise\">\n            {{filter2.bitwise}}\n        </button>\n        <mat-menu #menu2=\"matMenu\">\n            <button mat-menu-item (click)=\"changeBitwise(filter2, '&&')\">&&</button>\n            <button mat-menu-item (click)=\"changeBitwise(filter2, '||')\">||</button>\n        </mat-menu>\n        <div>\n            <mat-chip color=\"{{filter.color}}\" selected=\"true\"\n                id=\"filter-{{idx}}-{{idx2}}\"\n                [removable]=\"true\" (removed)=\"removeFilter(filter2)\"\n                [matTooltip]=\"filter2.value\"\n                [matTooltipDisabled]=\"filter.operation!=='in'\"\n                matTooltipShowDelay=\"1500\"\n                (click)=\"selectFilter(filter2)\"\n                [ngClass]=\"{'selected': filter2.selected, 'mat-accent': filter2.selected}\"\n                *ngIf=\"!filter2.isgroup\"\n            >{{filter2.explanation}}\n                <mat-icon matChipRemove>cancel</mat-icon>\n            </mat-chip>\n            <div *ngIf=\"filter2.isgroup\" fxLayout=\"row\">\n                <div *ngTemplateOutlet=\"group; context: { filter: this.filter2, idx: this.idx2}\">\n                </div>\n            </div>\n        </div>\n    </ng-container>\n    <span class=\"group-end\">)</span>\n</ng-template>\n",
                        styles: [
                            "\n    .error { color: red; }\n    .selector {\n        width: 100%;\n    }\n    .filter {\n        padding-bottom: 12px;\n    }\n    .filter mat-chip {\n        margin: 4px;\n    }\n    .cgroup {\n        display: flex;\n    }\n    mat-chip.selected {\n        color: #fff;\n        font-weight: bold;\n    }\n    span.group-start,\n    span.group-end {\n        font-size: 25px;\n    }\n    button.bitwise {\n        min-width: 24px;\n        padding-left: 0;\n        padding-right: 0;\n    }\n    "
                        ]
                    },] },
        ];
        /** @nocollapse */
        TWAFilterEditorComponent.ctorParameters = function () { return []; };
        TWAFilterEditorComponent.propDecorators = {
            options: [{ type: core.Input }],
            config: [{ type: core.Input }],
            change: [{ type: core.Output }],
            fileSet: [{ type: core.ViewChild, args: ['fileSet',] }],
            handleKeyboardEvent: [{ type: core.HostListener, args: ['document:keydown', ['$event'],] }]
        };
        return TWAFilterEditorComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var TWAFilterEditorModule = /** @class */ (function () {
        function TWAFilterEditorModule() {
        }
        TWAFilterEditorModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            forms.FormsModule,
                            forms.ReactiveFormsModule,
                            icon.MatIconModule,
                            select.MatSelectModule,
                            chips.MatChipsModule,
                            input.MatInputModule,
                            button.MatButtonModule,
                            flexLayout.FlexLayoutModule,
                            tooltip.MatTooltipModule,
                            menu.MatMenuModule,
                            dragDrop.DragDropModule,
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
                    },] },
        ];
        return TWAFilterEditorModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.TWAFilterEditorService = TWAFilterEditorService;
    exports.TWAFilterEditorComponent = TWAFilterEditorComponent;
    exports.TWAFilterEditorModule = TWAFilterEditorModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdhLW1kMi1maWx0ZXItZWRpdG9yLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbbnVsbCwibmc6Ly90d2EtbWQyLWZpbHRlci1lZGl0b3IvbGliL3R3YS1tZDItZmlsdGVyLWVkaXRvci5zZXJ2aWNlLnRzIiwibmc6Ly90d2EtbWQyLWZpbHRlci1lZGl0b3IvbGliL3R3YS1tZDItZmlsdGVyLWVkaXRvci5jb21wb25lbnQudHMiLCJuZzovL3R3YS1tZDItZmlsdGVyLWVkaXRvci9saWIvdHdhLW1kMi1maWx0ZXItZWRpdG9yLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgVFdBRmlsdGVyRWRpdG9yQ29tcG9uZW50IH0gZnJvbSAnLi90d2EtbWQyLWZpbHRlci1lZGl0b3IuY29tcG9uZW50JztcbmltcG9ydCB7IEZpZWxkRmlsdGVyIH0gZnJvbSAnLi90d2EtbWQyLWZpbHRlci1lZGl0b3IuaW50ZXJmYWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRXQUZpbHRlckVkaXRvclNlcnZpY2Uge1xuXG4gICAgZmlsdGVyczogRmllbGRGaWx0ZXJbXTtcblxuICAgIGZpbHRlcmVkRGF0YTogYW55W107XG4gICAgZmlsdGVyOiBUV0FGaWx0ZXJFZGl0b3JDb21wb25lbnQ7XG4gICAgZGF0YTogYW55W107XG4gICAgcHJlcGFyZURhdGE6IEZ1bmN0aW9uO1xuICAgIHByb2Nlc3NlZEZpbHRlcnM6IGFueVtdO1xuXG4gICAgaW5pdChcbiAgICAgICAgZmlsdGVyOiBUV0FGaWx0ZXJFZGl0b3JDb21wb25lbnQsXG4gICAgICAgIGRhdGE6IGFueVtdLFxuICAgICAgICBwcmVwYXJlRGF0YT86IEZ1bmN0aW9uXG4gICAgKSB7XG4gICAgICAgIHRoaXMuZmlsdGVyID0gZmlsdGVyO1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgICAgICB0aGlzLnByZXBhcmVEYXRhID0gcHJlcGFyZURhdGE7XG5cbiAgICAgICAgdGhpcy5maWx0ZXIuY2hhbmdlLnN1YnNjcmliZSgoZmlsdGVyczogRmllbGRGaWx0ZXJbXSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJzID0gZmlsdGVycztcbiAgICAgICAgICAgIHRoaXMuYXBwbHlGaWx0ZXIoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucHJvY2Vzc2VkRmlsdGVycyA9IHRoaXMucHJvY2Vzc0ZpbHRlck9ycyh0aGlzLmZpbHRlci5hY3RpdmVGaWx0ZXJzKTtcbiAgICB9XG5cbiAgICBhcHBseUZpbHRlcihkYXRhID0gdGhpcy5kYXRhLnNsaWNlKCkpIHtcblxuICAgICAgICAvLyBsZXQgZGF0YSA9IHRoaXMuZGF0YS5zbGljZSgpO1xuICAgICAgICBsZXQgcmV0ID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gZGF0YS5sZW5ndGg7XG5cbiAgICAgICAgaWYgKCF0aGlzLmZpbHRlcikge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnByb2Nlc3NlZEZpbHRlcnMgPSB0aGlzLnByb2Nlc3NGaWx0ZXJPcnModGhpcy5maWx0ZXIuYWN0aXZlRmlsdGVycyk7XG5cbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcblxuICAgICAgICBkYXRhID0gZGF0YS5tYXAoKGl0ZW0sIGlkeCkgPT4ge1xuICAgICAgICAgICAgaXRlbS5yZWFsSW5kZXggPSBpZHg7XG4gICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgfSkuZmlsdGVyKChpdGVtOiBhbnkpID0+IHtcbiAgICAgICAgICAgIHJldCA9IHRoaXMuYXBwbHlGaWx0ZXJUb1JvdyhpdGVtKTtcbiAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkYXRhO1xuXG4gICAgfVxuXG4gICAgYXBwbHlGaWx0ZXJUb1JvdyhpdGVtKSB7XG5cbiAgICAgICAgbGV0IHJldCA9IHRydWU7XG4gICAgICAgIGNvbnN0IHJlc3VsdHMgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IHRoaXMucHJvY2Vzc2VkRmlsdGVycy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdHMyID0gW107XG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NlZEZpbHRlcnNbaV0uZm9yRWFjaCgodjogRmllbGRGaWx0ZXIpID0+IHtcbiAgICAgICAgICAgICAgICByZXN1bHRzMi5wdXNoKHRoaXMuZmlsdGVyRGF0YSh2LCBpdGVtKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaChyZXN1bHRzMi5yZWR1Y2UoKGFjYywgdikgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdikge1xuICAgICAgICAgICAgICAgICAgICBhY2MgPSB2O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICAgICAgfSwgdHJ1ZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlc3VsdHMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXQgPSByZXN1bHRzLnJlZHVjZSgoYWNjLCB2KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHYpIHtcbiAgICAgICAgICAgICAgICAgICAgYWNjID0gdjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmV0O1xuXG4gICAgfVxuXG4gICAgcHJvY2Vzc0ZpbHRlck9ycyA9IChmaWx0ZXJzKSA9PiB7XG4gICAgICAgIGxldCBhY3R1YWxGaWx0ZXIgPSAwO1xuICAgICAgICBjb25zdCBuZXdGaWx0ZXJzID0gW107XG4gICAgICAgIGZpbHRlcnMuZm9yRWFjaCgodiwgaSkgPT4ge1xuICAgICAgICAgICAgaWYgKGkgPiAwICYmIHYuYml0d2lzZSA9PT0gJ3x8Jykge1xuICAgICAgICAgICAgICAgIGFjdHVhbEZpbHRlcisrO1xuICAgICAgICAgICAgICAgIG5ld0ZpbHRlcnMucHVzaChbXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mKG5ld0ZpbHRlcnNbYWN0dWFsRmlsdGVyXSkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgbmV3RmlsdGVycy5wdXNoKFtdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh2LmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdHcm91cCA9IHsuLi52LCBmaWVsZHM6IHRoaXMucHJvY2Vzc0ZpbHRlck9ycyh2LmZpZWxkcyl9O1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG5ld0dyb3VwKTtcbiAgICAgICAgICAgICAgICBuZXdGaWx0ZXJzW2FjdHVhbEZpbHRlcl0ucHVzaChuZXdHcm91cCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5ld0ZpbHRlcnNbYWN0dWFsRmlsdGVyXS5wdXNoKHYpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gbmV3RmlsdGVycztcbiAgICB9XG5cbiAgICBmaWx0ZXJEYXRhID0gKGZpbHRlcjogYW55LCBmaWx0ZXJWYWx1ZTogYW55KSA9PiB7XG5cbiAgICAgICAgY29uc3QgY29tcGFyYXRvcnMgPSB7XG4gICAgICAgICAgICAnPT4nOiAoYTogc3RyaW5nLCBiOiBzdHJpbmcpID0+IGEuaW5jbHVkZXMoYiksXG4gICAgICAgICAgICAnPT09JzogKGE6IGFueSwgYjogYW55KSA9PiBhID09PSBiLFxuICAgICAgICAgICAgJz49JzogKGE6IGFueSwgYjogYW55KSA9PiBhID49IGIsXG4gICAgICAgICAgICAnPic6IChhOiBhbnksIGI6IGFueSkgPT4gYSA+IGIsXG4gICAgICAgICAgICAnPD0nOiAoYTogYW55LCBiOiBhbnkpID0+IGEgPD0gYixcbiAgICAgICAgICAgICc8JzogKGE6IGFueSwgYjogYW55KSA9PiBhIDwgYixcbiAgICAgICAgICAgICdpbic6IChhOiBhbnksIGI6IGFueSkgPT4gYi5zcGxpdCgnLCcpLmluY2x1ZGVzKGEpLFxuICAgICAgICB9O1xuXG4gICAgICAgIGxldCByZXRWYWx1ZSA9IGZhbHNlO1xuXG4gICAgICAgIGlmIChmaWx0ZXIuaXNncm91cCkge1xuICAgICAgICAgICAgcmV0VmFsdWUgPSB0aGlzLmZpbHRlckdyb3VwKGZpbHRlciwgZmlsdGVyVmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJlcGFyZURhdGEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByZXBhcmVEYXRhKGZpbHRlciwgZmlsdGVyVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGZpbHRlclZhbHVlW2ZpbHRlci5maWVsZF0gPT09ICdudW1iZXInICYmIChmaWx0ZXIub3BlcmF0aW9uICE9PSAnPT4nICYmIGZpbHRlci5vcGVyYXRpb24gIT09ICdpbicpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldFZhbHVlID0gY29tcGFyYXRvcnNbZmlsdGVyLm9wZXJhdGlvbl0oK2ZpbHRlclZhbHVlW2ZpbHRlci5maWVsZF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgK2ZpbHRlci52YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0VmFsdWUgPSBjb21wYXJhdG9yc1tmaWx0ZXIub3BlcmF0aW9uXShTdHJpbmcoZmlsdGVyVmFsdWVbZmlsdGVyLmZpZWxkXSkudG9Mb3dlckNhc2UoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTdHJpbmcoZmlsdGVyLnZhbHVlKS50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgICAgICByZXRWYWx1ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJldFZhbHVlO1xuXG4gICAgfVxuXG4gICAgZmlsdGVyR3JvdXAgPSAoZmlsdGVyOiBhbnksIGZpbHRlclZhbHVlOiBhbnkpID0+IHtcblxuICAgICAgICBjb25zdCByZXN1bHRzID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBmaWx0ZXIuZmllbGRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0czIgPSBbXTtcbiAgICAgICAgICAgIGZpbHRlci5maWVsZHNbaV0uZm9yRWFjaCgodjogYW55W10pID0+IHtcbiAgICAgICAgICAgICAgIHJlc3VsdHMyLnB1c2godGhpcy5maWx0ZXJEYXRhKHYsIGZpbHRlclZhbHVlKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaChyZXN1bHRzMi5yZWR1Y2UoKGFjYywgdjIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXYyKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjYyA9IHYyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICAgICAgfSwgdHJ1ZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdHMucmVkdWNlKChhY2MsIHYpID0+IHtcbiAgICAgICAgICAgIGlmICh2KSB7XG4gICAgICAgICAgICAgICAgYWNjID0gdjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIH0sIGZhbHNlKTtcblxuICAgIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEZpbHRlckVkaXRvck9wdGlvbnMsIEZpZWxkRmlsdGVyLCBGaWx0ZXJFZGl0b3JDb25maWcgfSBmcm9tICcuL3R3YS1tZDItZmlsdGVyLWVkaXRvci5pbnRlcmZhY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0d2EtbWQyLWZpbHRlci1lZGl0b3InLFxuICB0ZW1wbGF0ZTogYDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEdhcD1cIjIwcHhcIj5cbiAgICA8ZGl2IGZ4TGF5b3V0PVwiY29sdW1uXCIgZnhGbGV4PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic2VsZWN0b3JcIiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0R2FwPVwiMTBweFwiPlxuICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgICAgIDxtYXQtc2VsZWN0IFsobmdNb2RlbCldPVwic2VsZWN0ZWRGaWVsZFwiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LW9wdGlvbiBzZWxlY3RlZCB2YWx1ZT1cIm5vbmVcIj57e3RleHRzLmZpbHRlckJ5fX08L21hdC1vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCBmaWVsZCBvZiBmaWx0ZXJPcHRpb25zLmZpZWxkc1wiIFsodmFsdWUpXT1cImZpZWxkLm5hbWVcIj57e2ZpZWxkLmxhYmVsfX08L21hdC1vcHRpb24+XG4gICAgICAgICAgICAgICAgPC9tYXQtc2VsZWN0PlxuICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgICAgICA8bWF0LXNlbGVjdCBbKG5nTW9kZWwpXT1cIm9wZXJhdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LW9wdGlvbiAqbmdGb3I9XCJsZXQgb3Agb2Ygb3BlcmF0aW9uc0RhdGFcIiB2YWx1ZT1cInt7b3AudHlwZX19XCI+e3tvcC5sYWJlbH19PC9tYXQtb3B0aW9uPlxuICAgICAgICAgICAgICAgIDwvbWF0LXNlbGVjdD5cbiAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICAgICAgPGlucHV0IG1hdElucHV0IHBsYWNlaG9sZGVyPVwie3t0ZXh0cy5maWx0ZXJ9fVwiIFsobmdNb2RlbCldPVwic2VsZWN0ZWRWYWx1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAoZm9jdXMpPVwib25Gb2N1cygkZXZlbnQpXCIgKGJsdXIpPVwib25CbHVyKCRldmVudClcIiAvPlxuICAgICAgICAgICAgICAgIDxidXR0b24gbWF0LWJ1dHRvbiAqbmdJZj1cIm9wZXJhdGlvbj09PSdpbidcIiBtYXRTdWZmaXggbWF0LWljb24tYnV0dG9uIGFyaWEtbGFiZWw9XCJDbGVhclwiIChjbGljayk9XCJmaWxlU2V0LmNsaWNrKClcIj5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1pY29uPmF0dGFjaF9maWxlPC9tYXQtaWNvbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxidXR0b24gbWF0LWJ1dHRvbiBtYXQtaWNvbi1idXR0b24gKGNsaWNrKT1cImFkZEZpbHRlcigpXCIgW2Rpc2FibGVkXT1cImNoZWNrRmlsdGVyKClcIj5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1pY29uPnNlbmQ8L21hdC1pY29uPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGZ4RmxleD4mbmJzcDs8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b29sc1wiICpuZ0lmPVwiYWN0aXZlRmlsdGVycy5sZW5ndGggPiAwXCIgZnhMYXlvdXQ9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIG1hdC1idXR0b24gbWF0LWljb24tYnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIG1hdFRvb2x0aXA9XCJ7e3RleHRzLmdyb3VwfX1cIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwiY3JlYXRlR3JvdXAoKVwiXG4gICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJnZXRTZWxlY3RlZCgpIDwgMlwiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWljb24+bGluazwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBtYXQtYnV0dG9uIG1hdC1pY29uLWJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBtYXRUb29sdGlwPVwie3t0ZXh0cy51bmdyb3VwfX1cIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwicmVtb3ZlRnJvbUdyb3VwKClcIlxuICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiIWdyb3VwU2VsZWN0ZWQoKVwiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWljb24+bGlua19vZmY8L21hdC1pY29uPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gbWF0LWJ1dHRvbiBtYXQtaWNvbi1idXR0b25cbiAgICAgICAgICAgICAgICAgICAgbWF0VG9vbHRpcD1cInt7dGV4dHMubW92ZUxlZnR9fVwiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJtb3ZlVG8oLTEpXCJcbiAgICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImdldFNlbGVjdGVkKCkgIT09IDEgJiYgIWVudGlyZUdyb3VwU2VsZWN0ZWQoKVwiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWljb24+YXJyb3dfYmFjazwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBtYXQtYnV0dG9uIG1hdC1pY29uLWJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBtYXRUb29sdGlwPVwie3t0ZXh0cy5tb3ZlUmlnaHR9fVwiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJtb3ZlVG8oMSlcIlxuICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZ2V0U2VsZWN0ZWQoKSAhPT0gMSAmJiAhZW50aXJlR3JvdXBTZWxlY3RlZCgpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbj5hcnJvd19mb3J3YXJkPC9tYXQtaWNvbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIG1hdC1idXR0b24gbWF0LWljb24tYnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIG1hdFRvb2x0aXA9XCJ7e3RleHRzLmNsZWFyU2VsZWN0aW9ufX1cIlxuICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZ2V0U2VsZWN0ZWQoKSA8IDFcIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwiY2xlYXJTZWxlY3Rpb24oKVwiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWljb24+Y2xlYXI8L21hdC1pY29uPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gbWF0LWJ1dHRvbiBtYXQtaWNvbi1idXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdFRvb2x0aXA9XCJ7e3RleHRzLmNsZWFyQWxsfX1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImFjdGl2ZUZpbHRlcnMubGVuZ3RoIDwgMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwiY2xlYXJGaWx0ZXJzKClcIj5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1pY29uPmNsZWFyX2FsbDwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmaWx0ZXJcIiBmeExheW91dEdhcD1cIjEyXCI+XG4gICAgICAgICAgICA8bWF0LWNoaXAtbGlzdCBjZGtEcm9wTGlzdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY2RrRHJvcExpc3RPcmllbnRhdGlvbj1cImhvcml6b250YWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNka0Ryb3BMaXN0RHJvcHBlZCk9XCJvbkRyb3BwZWRGaWx0ZXIoJGV2ZW50KVwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGZpbHRlciBvZiBhY3RpdmVGaWx0ZXJzOyBsZXQgaWR4ID0gaW5kZXhcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiXG4gICAgICAgICAgICAgICAgICAgIGNka0RyYWdcbiAgICAgICAgICAgICAgICAgICAgKGNka0RyYWdTdGFydGVkKT1cIm9uU3RhcnREcmFnRmlsdGVyKCRldmVudCwgZmlsdGVyKVwiIFtuZ0NsYXNzXT1cInsnY2dyb3VwJzogZmlsdGVyLmlzZ3JvdXB9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG1hdC1idXR0b24gKm5nSWY9XCJpZHggPiAwXCIgW21hdE1lbnVUcmlnZ2VyRm9yXT1cIm1lbnVcIiBjbGFzcz1cImJpdHdpc2VcIj57e2ZpbHRlci5iaXR3aXNlfX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxtYXQtbWVudSAjbWVudT1cIm1hdE1lbnVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG1hdC1tZW51LWl0ZW0gKGNsaWNrKT1cImNoYW5nZUJpdHdpc2UoZmlsdGVyLCAnJiYnKVwiPiYmPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBtYXQtbWVudS1pdGVtIChjbGljayk9XCJjaGFuZ2VCaXR3aXNlKGZpbHRlciwgJ3x8JylcIj58fDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9tYXQtbWVudT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxtYXQtY2hpcCBjb2xvcj1cInt7ZmlsdGVyLmNvbG9yfX1cIiBzZWxlY3RlZD1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPVwiZmlsdGVyLXt7aWR4fX1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtyZW1vdmFibGVdPVwidHJ1ZVwiIChyZW1vdmVkKT1cInJlbW92ZUZpbHRlcihmaWx0ZXIpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbWF0VG9vbHRpcF09XCJmaWx0ZXIudmFsdWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFttYXRUb29sdGlwRGlzYWJsZWRdPVwiZmlsdGVyLm9wZXJhdGlvbiE9PSdpbidcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdFRvb2x0aXBTaG93RGVsYXk9XCIxNTAwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwic2VsZWN0RmlsdGVyKGZpbHRlcilcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiIWZpbHRlci5pc2dyb3VwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3NlbGVjdGVkJzogZmlsdGVyLnNlbGVjdGVkLCAnbWF0LWFjY2VudCc6IGZpbHRlci5zZWxlY3RlZH1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7e2ZpbHRlci5leHBsYW5hdGlvbn19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1pY29uIG1hdENoaXBSZW1vdmU+Y2FuY2VsPC9tYXQtaWNvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbWF0LWNoaXA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiZmlsdGVyLmlzZ3JvdXBcIiBmeExheW91dD1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nVGVtcGxhdGVPdXRsZXQ9XCJncm91cDsgY29udGV4dDogeyBmaWx0ZXI6IHRoaXMuZmlsdGVyLCBpZHg6IHRoaXMuaWR4fVwiIGZ4TGF5b3V0PVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L21hdC1jaGlwLWxpc3Q+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxpbnB1dCBzdHlsZT1cInZpc2liaWx0eTogaGlkZGVuOyBoZWlnaHQ6IDBweDsgd2lkdGg6IDBweDtcIiB0eXBlPVwiZmlsZVwiIGlkPVwiZmlsZVNldFwiICNmaWxlU2V0IChjaGFuZ2UpPVwidXBsb2FkU2V0KClcIiAvPlxuPC9kaXY+XG48bmctdGVtcGxhdGUgI2dyb3VwIGxldC1maWx0ZXI9XCJmaWx0ZXJcIiBsZXQtaWR4PVwiaWR4XCI+XG4gICAgPHNwYW4gY2xhc3M9XCJncm91cC1zdGFydFwiPig8L3NwYW4+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZmlsdGVyMiBvZiBmaWx0ZXIuZmllbGRzOyBsZXQgaWR4MiA9IGluZGV4XCI+XG4gICAgICAgIDxidXR0b24gbWF0LWJ1dHRvbiAqbmdJZj1cImlkeDIgPiAwXCIgW21hdE1lbnVUcmlnZ2VyRm9yXT1cIm1lbnUyXCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cImJpdHdpc2VcIj5cbiAgICAgICAgICAgIHt7ZmlsdGVyMi5iaXR3aXNlfX1cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxtYXQtbWVudSAjbWVudTI9XCJtYXRNZW51XCI+XG4gICAgICAgICAgICA8YnV0dG9uIG1hdC1tZW51LWl0ZW0gKGNsaWNrKT1cImNoYW5nZUJpdHdpc2UoZmlsdGVyMiwgJyYmJylcIj4mJjwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBtYXQtbWVudS1pdGVtIChjbGljayk9XCJjaGFuZ2VCaXR3aXNlKGZpbHRlcjIsICd8fCcpXCI+fHw8L2J1dHRvbj5cbiAgICAgICAgPC9tYXQtbWVudT5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxtYXQtY2hpcCBjb2xvcj1cInt7ZmlsdGVyLmNvbG9yfX1cIiBzZWxlY3RlZD1cInRydWVcIlxuICAgICAgICAgICAgICAgIGlkPVwiZmlsdGVyLXt7aWR4fX0te3tpZHgyfX1cIlxuICAgICAgICAgICAgICAgIFtyZW1vdmFibGVdPVwidHJ1ZVwiIChyZW1vdmVkKT1cInJlbW92ZUZpbHRlcihmaWx0ZXIyKVwiXG4gICAgICAgICAgICAgICAgW21hdFRvb2x0aXBdPVwiZmlsdGVyMi52YWx1ZVwiXG4gICAgICAgICAgICAgICAgW21hdFRvb2x0aXBEaXNhYmxlZF09XCJmaWx0ZXIub3BlcmF0aW9uIT09J2luJ1wiXG4gICAgICAgICAgICAgICAgbWF0VG9vbHRpcFNob3dEZWxheT1cIjE1MDBcIlxuICAgICAgICAgICAgICAgIChjbGljayk9XCJzZWxlY3RGaWx0ZXIoZmlsdGVyMilcIlxuICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsnc2VsZWN0ZWQnOiBmaWx0ZXIyLnNlbGVjdGVkLCAnbWF0LWFjY2VudCc6IGZpbHRlcjIuc2VsZWN0ZWR9XCJcbiAgICAgICAgICAgICAgICAqbmdJZj1cIiFmaWx0ZXIyLmlzZ3JvdXBcIlxuICAgICAgICAgICAgPnt7ZmlsdGVyMi5leHBsYW5hdGlvbn19XG4gICAgICAgICAgICAgICAgPG1hdC1pY29uIG1hdENoaXBSZW1vdmU+Y2FuY2VsPC9tYXQtaWNvbj5cbiAgICAgICAgICAgIDwvbWF0LWNoaXA+XG4gICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiZmlsdGVyMi5pc2dyb3VwXCIgZnhMYXlvdXQ9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ1RlbXBsYXRlT3V0bGV0PVwiZ3JvdXA7IGNvbnRleHQ6IHsgZmlsdGVyOiB0aGlzLmZpbHRlcjIsIGlkeDogdGhpcy5pZHgyfVwiPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvbmctY29udGFpbmVyPlxuICAgIDxzcGFuIGNsYXNzPVwiZ3JvdXAtZW5kXCI+KTwvc3Bhbj5cbjwvbmctdGVtcGxhdGU+XG5gLFxuICBzdHlsZXM6IFtcbiAgICBgXG4gICAgLmVycm9yIHsgY29sb3I6IHJlZDsgfVxuICAgIC5zZWxlY3RvciB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgIH1cbiAgICAuZmlsdGVyIHtcbiAgICAgICAgcGFkZGluZy1ib3R0b206IDEycHg7XG4gICAgfVxuICAgIC5maWx0ZXIgbWF0LWNoaXAge1xuICAgICAgICBtYXJnaW46IDRweDtcbiAgICB9XG4gICAgLmNncm91cCB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgfVxuICAgIG1hdC1jaGlwLnNlbGVjdGVkIHtcbiAgICAgICAgY29sb3I6ICNmZmY7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIH1cbiAgICBzcGFuLmdyb3VwLXN0YXJ0LFxuICAgIHNwYW4uZ3JvdXAtZW5kIHtcbiAgICAgICAgZm9udC1zaXplOiAyNXB4O1xuICAgIH1cbiAgICBidXR0b24uYml0d2lzZSB7XG4gICAgICAgIG1pbi13aWR0aDogMjRweDtcbiAgICAgICAgcGFkZGluZy1sZWZ0OiAwO1xuICAgICAgICBwYWRkaW5nLXJpZ2h0OiAwO1xuICAgIH1cbiAgICBgXG4gIF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBUV0FGaWx0ZXJFZGl0b3JDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQElucHV0KCkgb3B0aW9uczogRmlsdGVyRWRpdG9yT3B0aW9ucztcbiAgICBASW5wdXQoKSBjb25maWc6IEZpbHRlckVkaXRvckNvbmZpZztcbiAgICBAT3V0cHV0KCkgY2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55W10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnlbXT4oKTtcblxuICAgIEBWaWV3Q2hpbGQoJ2ZpbGVTZXQnKSBmaWxlU2V0OiBFbGVtZW50UmVmO1xuXG4gICAgZmlsdGVyT3B0aW9uczogRmlsdGVyRWRpdG9yT3B0aW9ucztcbiAgICBzZWxlY3RlZEZpZWxkID0gJ25vbmUnO1xuICAgIHNlbGVjdGVkVmFsdWUgPSAnJztcbiAgICBvcGVyYXRpb24gPSAnY29udGFpbic7XG4gICAgYWN0aXZlRmlsdGVyczogRmllbGRGaWx0ZXJbXSA9IFtdO1xuICAgIGVkaXRpbmcgPSBmYWxzZTtcbiAgICB0ZXh0cyA9IHtcbiAgICAgICAgZmlsdGVyQnk6ICdGaWx0ZXIgYnkuLi4nLFxuICAgICAgICBmaWx0ZXI6ICdmaWx0ZXInLFxuICAgICAgICBncm91cDogJ0dyb3VwJyxcbiAgICAgICAgdW5ncm91cDogJ1VuZ3JvdXAnLFxuICAgICAgICBtb3ZlTGVmdDogJ01vdmUgdG8gbGVmdCcsXG4gICAgICAgIG1vdmVSaWdodDogJ01vdmUgdG8gcmlnaHQnLFxuICAgICAgICBjbGVhclNlbGVjdGlvbjogJ0NsZWFyIHNlbGVjdGlvbicsXG4gICAgICAgIGNsZWFyQWxsOiAnQ2xlYXIgZmlsdGVycycsXG5cbiAgICB9O1xuICAgIG9wZXJhdGlvbnM6IGFueSA9IHtcbiAgICAgICAgY29udGFpbjogJz0+JyxcbiAgICAgICAgZXF1YWw6ICc9PT0nLFxuICAgICAgICBncmVhdGVyRXF1YWw6ICc+PScsXG4gICAgICAgIGdyZWF0ZXI6ICc+JyxcbiAgICAgICAgbGVzc0VxdWFsOiAnPD0nLFxuICAgICAgICBsZXNzOiAnPCcsXG4gICAgICAgIGluOiAnaW4nLFxuICAgIH07XG4gICAgb3BlcmF0aW9uc0RhdGEgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdjb250YWluJyxcbiAgICAgICAgICAgIGxhYmVsOiAnY29udGFpbnMnLFxuICAgICAgICAgICAgb3BlcmF0b3I6ICc9PidcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2VxdWFsJyxcbiAgICAgICAgICAgIGxhYmVsOiAnZXF1YWxzJyxcbiAgICAgICAgICAgIG9wZXJhdG9yOiAnPT09J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnZ3JlYXRlckVxdWFsJyxcbiAgICAgICAgICAgIGxhYmVsOiAnZ3JlYXRlciBvciBlcXVhbCcsXG4gICAgICAgICAgICBvcGVyYXRvcjogJz49J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnZ3JlYXRlcicsXG4gICAgICAgICAgICBsYWJlbDogJ2dyZWF0ZXInLFxuICAgICAgICAgICAgb3BlcmF0b3I6ICc+J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnbGVzc0VxdWFsJyxcbiAgICAgICAgICAgIGxhYmVsOiAnbGVzcyBvciBlcXVhbCcsXG4gICAgICAgICAgICBvcGVyYXRvcjogJzw9J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnbGVzcycsXG4gICAgICAgICAgICBsYWJlbDogJ2xlc3MnLFxuICAgICAgICAgICAgb3BlcmF0b3I6ICc8J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnaW4nLFxuICAgICAgICAgICAgbGFiZWw6ICdpbicsXG4gICAgICAgICAgICBvcGVyYXRvcjogJ2luJ1xuICAgICAgICB9LFxuICAgIF07XG5cbiAgICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDprZXlkb3duJywgWyckZXZlbnQnXSlcbiAgICBoYW5kbGVLZXlib2FyZEV2ZW50KGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICgoZXZlbnQua2V5ID09PSAnYycgJiYgZXZlbnQuY3RybEtleSkpIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJGaWx0ZXJzKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5lZGl0aW5nICYmIGV2ZW50LmtleUNvZGUgPT09IDEzKSB7XG4gICAgICAgICAgICB0aGlzLmFkZEZpbHRlcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgY2hlY2tGaWx0ZXIoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAodGhpcy5zZWxlY3RlZEZpZWxkID09PSAnbm9uZScgfHwgdGhpcy5zZWxlY3RlZFZhbHVlID09PSAnJyk7XG4gICAgfVxuXG4gICAgYWRkRmlsdGVyKCkge1xuICAgICAgICBsZXQgY29sb3IgPSAnJyxcbiAgICAgICAgICAgIGZpZWxkID0gJycsXG4gICAgICAgICAgICBkYmZpZWxkID0gJycsXG4gICAgICAgICAgICBsYWJlbCA9ICcnLFxuICAgICAgICAgICAgbmFtZSA9ICcnLFxuICAgICAgICAgICAgZXhwbGFuYXRpb24gPSB0aGlzLnNlbGVjdGVkRmllbGQgKyAnICcgKyB0aGlzLm9wZXJhdGlvbnNbdGhpcy5vcGVyYXRpb25dICsgJyAnICsgdGhpcy5zZWxlY3RlZFZhbHVlO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gdGhpcy5maWx0ZXJPcHRpb25zLmZpZWxkcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmZpbHRlck9wdGlvbnMuZmllbGRzW2ldLm5hbWUgPT09IHRoaXMuc2VsZWN0ZWRGaWVsZCkge1xuICAgICAgICAgICAgICAgIC8vIGNvbG9yID0gdGhpcy5maWx0ZXJPcHRpb25zLmZpZWxkc1tpXS5jb2xvcjtcbiAgICAgICAgICAgICAgICAvLyBmaWVsZCA9IHRoaXMuZmlsdGVyT3B0aW9ucy5maWVsZHNbaV0uZmllbGQ7XG4gICAgICAgICAgICAgICAgLy8gbGFiZWwgPSB0aGlzLmZpbHRlck9wdGlvbnMuZmllbGRzW2ldLmxhYmVsO1xuICAgICAgICAgICAgICAgIC8vIG5hbWUgPSB0aGlzLmZpbHRlck9wdGlvbnMuZmllbGRzW2ldLm5hbWU7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogLi4ud2l0aCBvYmplY3QgZGVzdHJ1Y3R1cmluZ1xuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICh7IGNvbG9yLCBmaWVsZCwgZGJmaWVsZCwgbGFiZWwsIG5hbWUgfSA9IHRoaXMuZmlsdGVyT3B0aW9ucy5maWVsZHNbaV0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wZXJhdGlvbiA9PT0gJ2luJykge1xuICAgICAgICAgICAgZXhwbGFuYXRpb24gPSB0aGlzLnNlbGVjdGVkRmllbGQgKyAnICcgKyB0aGlzLm9wZXJhdGlvbnNbdGhpcy5vcGVyYXRpb25dICsgJyAoLi4uKSc7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5vcGVyYXRpb24gPT09ICdjb250YWluJykge1xuICAgICAgICAgICAgLy8gZXhwbGFuYXRpb24gPSB0aGlzLnNlbGVjdGVkRmllbGQgKyAnICcgKyB0aGlzLm9wZXJhdGlvbnNbdGhpcy5vcGVyYXRpb25dICsgJyAnICsgdGhpcy5zZWxlY3RlZFZhbHVlO1xuICAgICAgICAgICAgZXhwbGFuYXRpb24gPSAnXCInICsgdGhpcy5zZWxlY3RlZFZhbHVlICsgJ1wiICcgKyB0aGlzLm9wZXJhdGlvbnNbdGhpcy5vcGVyYXRpb25dICsgJyAnICsgdGhpcy5zZWxlY3RlZEZpZWxkO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYWN0aXZlRmlsdGVycy5wdXNoKHtcbiAgICAgICAgICAgIGNvbG9yOiBjb2xvcixcbiAgICAgICAgICAgIGV4cGxhbmF0aW9uOiBleHBsYW5hdGlvbixcbiAgICAgICAgICAgIGxhYmVsOiBsYWJlbCxcbiAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICBmaWVsZDogZmllbGQsXG4gICAgICAgICAgICBkYmZpZWxkOiBkYmZpZWxkLFxuICAgICAgICAgICAgYml0d2lzZTogJyYmJyxcbiAgICAgICAgICAgIG9wZXJhdGlvbjogdGhpcy5vcGVyYXRpb25zW3RoaXMub3BlcmF0aW9uXSxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnNlbGVjdGVkVmFsdWVcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRWYWx1ZSA9ICcnO1xuICAgICAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMuYWN0aXZlRmlsdGVycyk7XG4gICAgfVxuXG4gICAgc2VsZWN0RmlsdGVyKGZpbHRlcjogRmllbGRGaWx0ZXIpIHtcbiAgICAgICAgZmlsdGVyLnNlbGVjdGVkID0gIWZpbHRlci5zZWxlY3RlZDtcbiAgICAgICAgY29uc3QgZ3JvdXAgPSB0aGlzLmdldFBhcmVudEZpbHRlcihmaWx0ZXIpO1xuICAgICAgICBpZiAoZ3JvdXApIHtcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZEFsbCA9IHRydWU7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGdyb3VwLmZpZWxkcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0bXBmaWx0ZXIgPSBncm91cC5maWVsZHNbaV07XG4gICAgICAgICAgICAgICAgaWYgKCF0bXBmaWx0ZXIuaXNncm91cCAmJiAhdG1wZmlsdGVyLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkQWxsID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkQWxsKSB7XG4gICAgICAgICAgICAgICAgZ3JvdXAuc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0UGFyZW50RmlsdGVyKGZpbHRlcjogRmllbGRGaWx0ZXIpOiBGaWVsZEZpbHRlciB8IG51bGwge1xuICAgICAgICBjb25zdCBnZXRQYXJlbnRGaWx0ZXJJbkdyb3VwID0gKGdyb3VwOiBGaWVsZEZpbHRlciwgZmlsdGVyMjogRmllbGRGaWx0ZXIpOiBGaWVsZEZpbHRlciB8IG51bGwgPT4ge1xuICAgICAgICAgICAgcmV0ID0gbnVsbDtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBncm91cC5maWVsZHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdG1wZmlsdGVyID0gZ3JvdXAuZmllbGRzW2ldO1xuICAgICAgICAgICAgICAgIGlmIChKU09OLnN0cmluZ2lmeSh0bXBmaWx0ZXIpID09PSBKU09OLnN0cmluZ2lmeShmaWx0ZXIyKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ3JvdXA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0bXBmaWx0ZXIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgICAgICByZXQgPSBnZXRQYXJlbnRGaWx0ZXJJbkdyb3VwKHRtcGZpbHRlciwgZmlsdGVyMik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICB9O1xuICAgICAgICBsZXQgcmV0ID0gbnVsbDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSB0aGlzLmFjdGl2ZUZpbHRlcnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCB0bXBmaWx0ZXIgPSB0aGlzLmFjdGl2ZUZpbHRlcnNbaV07XG4gICAgICAgICAgICBpZiAoSlNPTi5zdHJpbmdpZnkodG1wZmlsdGVyKSA9PT0gSlNPTi5zdHJpbmdpZnkoZmlsdGVyKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0bXBmaWx0ZXIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgIHJldCA9IGdldFBhcmVudEZpbHRlckluR3JvdXAodG1wZmlsdGVyLCBmaWx0ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG5cbiAgICBhcnJheU1vdmUgPSAoYXJyOiBhbnlbXSwgb2xkSW5kZXg6IG51bWJlciwgbmV3SW5kZXg6IG51bWJlcik6IGFueVtdID0+IHtcbiAgICAgICAgaWYgKG5ld0luZGV4ID4gYXJyLmxlbmd0aCkge1xuICAgICAgICAgICAgbGV0IGsgPSBuZXdJbmRleCAtIGFyci5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoay0tKSB7XG4gICAgICAgICAgICAgICAgYXJyLnB1c2godW5kZWZpbmVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBhcnIuc3BsaWNlKG5ld0luZGV4LCAwLCBhcnIuc3BsaWNlKG9sZEluZGV4LCAxKVswXSk7XG4gICAgICAgIHJldHVybiBhcnI7XG4gICAgfVxuXG4gICAgbW92ZVRvKGRpcmVjdGlvbjogbnVtYmVyKSB7XG4gICAgICAgIGxldCBpZHggPSAtMSxcbiAgICAgICAgICAgIHRvSWR4ID0gLTEsXG4gICAgICAgICAgICBncm91cCA9IC0xO1xuICAgICAgICAvLyBTZWFyY2hpbmcgdGhlIHNlbGVjdGVkIGZpbHRlci4uLlxuICAgICAgICB0aGlzLmFjdGl2ZUZpbHRlcnMuZm9yRWFjaCgoZmlsdGVyLCB0bXBpZHgpID0+IHtcbiAgICAgICAgICAgIGlmIChmaWx0ZXIuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICBpZHggPSB0bXBpZHg7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChmaWx0ZXIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgIGZpbHRlci5maWVsZHMuZm9yRWFjaCgoZmlsdGVyMiwgdG1waWR4MikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyMi5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWR4ID0gdG1waWR4MjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwID0gdG1waWR4O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChpZHggPj0gMCkge1xuXG4gICAgICAgICAgICBpZiAoZ3JvdXAgPj0gMCkge1xuICAgICAgICAgICAgICAgIHRvSWR4ID0gKGlkeCArIGRpcmVjdGlvbikgPj0gMCA/IGlkeCArIGRpcmVjdGlvbiA6IHRoaXMuYWN0aXZlRmlsdGVyc1tncm91cF0uZmllbGRzLmxlbmd0aCArIGRpcmVjdGlvbjtcbiAgICAgICAgICAgICAgICBpZiAodG9JZHggPj0gdGhpcy5hY3RpdmVGaWx0ZXJzW2dyb3VwXS5maWVsZHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvSWR4ID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVGaWx0ZXJzW2dyb3VwXS5maWVsZHMgPSB0aGlzLmFycmF5TW92ZSh0aGlzLmFjdGl2ZUZpbHRlcnNbZ3JvdXBdLmZpZWxkcywgaWR4LCB0b0lkeCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRvSWR4ID0gKGlkeCArIGRpcmVjdGlvbikgPj0gMCA/IGlkeCArIGRpcmVjdGlvbiA6IHRoaXMuYWN0aXZlRmlsdGVycy5sZW5ndGggKyBkaXJlY3Rpb247XG4gICAgICAgICAgICAgICAgaWYgKHRvSWR4ID49IHRoaXMuYWN0aXZlRmlsdGVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9JZHggPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUZpbHRlcnMgPSB0aGlzLmFycmF5TW92ZSh0aGlzLmFjdGl2ZUZpbHRlcnMsIGlkeCwgdG9JZHgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMuYWN0aXZlRmlsdGVycyk7XG5cbiAgICB9XG5cbiAgICBnZXRTZWxlY3RlZCgpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBnZXRJbkdyb3VwID0gKGdyb3VwOiBGaWVsZEZpbHRlcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGdyb3VwLmZpZWxkcy5yZWR1Y2UoKGFjYzIsIGZpbHRlcikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgICAgICBhY2MyICs9IGdldEluR3JvdXAoZmlsdGVyKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZpbHRlci5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICBhY2MyKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBhY2MyO1xuICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLmFjdGl2ZUZpbHRlcnMucmVkdWNlKChhY2MsIGZpbHRlcikgPT4ge1xuICAgICAgICAgICAgaWYgKGZpbHRlci5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgYWNjICs9IGdldEluR3JvdXAoZmlsdGVyKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZmlsdGVyLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgYWNjKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICB9LCAwKTtcblxuICAgIH1cblxuICAgIGNsZWFyU2VsZWN0aW9uKCk6IHZvaWQge1xuXG4gICAgICAgIGNvbnN0IGNsZWFyU2VsZWN0aW9uSW5Hcm91cCA9IChncm91cCkgPT4ge1xuICAgICAgICAgICAgZ3JvdXAuZmllbGRzLmZvckVhY2goKGZpbHRlcikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgICAgICBmaWx0ZXIgPSBjbGVhclNlbGVjdGlvbkluR3JvdXAoZmlsdGVyKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmaWx0ZXIuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIGdyb3VwO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuYWN0aXZlRmlsdGVycyA9IHRoaXMuYWN0aXZlRmlsdGVycy5tYXAoKGZpbHRlcikgPT4ge1xuICAgICAgICAgICAgaWYgKGZpbHRlci5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgZmlsdGVyID0gY2xlYXJTZWxlY3Rpb25Jbkdyb3VwKGZpbHRlcik7XG4gICAgICAgICAgICAgICAgLy8gZmlsdGVyLmZpZWxkcyA9IGZpbHRlci5maWVsZHMubWFwKChmaWx0ZXIyKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gICAgIGZpbHRlcjIuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAvLyAgICAgcmV0dXJuIGZpbHRlcjI7XG4gICAgICAgICAgICAgICAgLy8gfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaWx0ZXIuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiBmaWx0ZXI7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgY2hhbmdlQml0d2lzZShmaWx0ZXI6IEZpZWxkRmlsdGVyLCBiaXR3aXNlKSB7XG4gICAgICAgIGZpbHRlci5iaXR3aXNlID0gYml0d2lzZTtcbiAgICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh0aGlzLmFjdGl2ZUZpbHRlcnMpO1xuICAgIH1cblxuICAgIGdyb3VwU2VsZWN0ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IGdyb3VwU2VsZWN0ZWRJbkdyb3VwID0gKGZpbHRlcjogRmllbGRGaWx0ZXIpID0+IHtcbiAgICAgICAgICAgIGxldCByZXQyID0gMDtcbiAgICAgICAgICAgIGlmIChmaWx0ZXIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgIGZpbHRlci5maWVsZHMuZm9yRWFjaCgoZmlsdGVyMikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyMi5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXQyICs9IGdyb3VwU2VsZWN0ZWRJbkdyb3VwKGZpbHRlcjIpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlcjIuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXQyKys7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmV0MjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlci5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGdyb3VwcyA9IHRoaXMuYWN0aXZlRmlsdGVycy5maWx0ZXIoZmlsdGVyID0+IGZpbHRlci5pc2dyb3VwKTtcbiAgICAgICAgbGV0IHJldCA9IDA7XG4gICAgICAgIGdyb3Vwcy5mb3JFYWNoKChncm91cCkgPT4ge1xuICAgICAgICAgICAgZ3JvdXAuZmllbGRzLmZvckVhY2goZmlsdGVyID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0ICs9IGdyb3VwU2VsZWN0ZWRJbkdyb3VwKGZpbHRlcik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmaWx0ZXIuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0Kys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmV0ID4gMDtcbiAgICB9XG5cbiAgICBlbnRpcmVHcm91cFNlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCBlbnRpcmVHcm91cFNlbGVjdGVkSW5Hcm91cCA9IChncm91cDogRmllbGRGaWx0ZXIpID0+IHtcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZDIgPSB0cnVlO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGdyb3VwLmZpZWxkcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWx0ZXIgPSBncm91cC5maWVsZHNbaV07XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlci5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkMiA9IGVudGlyZUdyb3VwU2VsZWN0ZWRJbkdyb3VwKGZpbHRlcik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghZmlsdGVyLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkMiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzZWxlY3RlZDIgJiYgZ3JvdXAuZmllbGRzLmxlbmd0aCA+IDA7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGdyb3VwcyA9IHRoaXMuYWN0aXZlRmlsdGVycy5maWx0ZXIoZmlsdGVyID0+IGZpbHRlci5pc2dyb3VwKTtcbiAgICAgICAgbGV0IHNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgZm9yIChsZXQgaWcgPSAwLCBsZyA9IGdyb3Vwcy5sZW5ndGg7IGlnIDwgbGc7IGlnKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwID0gZ3JvdXBzW2lnXTtcbiAgICAgICAgICAgIGZvciAobGV0IGlnMiA9IDAsIGxnMiA9IGdyb3VwLmZpZWxkcy5sZW5ndGg7IGlnMiA8IGxnMjsgaWcyKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWx0ZXIgPSBncm91cC5maWVsZHNbaWcyXTtcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSBlbnRpcmVHcm91cFNlbGVjdGVkSW5Hcm91cChmaWx0ZXIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghZmlsdGVyLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ3JvdXAuZmllbGRzLmZvckVhY2goZmlsdGVyID0+IHtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZ3JvdXBzLmZvckVhY2goKGdyb3VwKSA9PiB7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc2VsZWN0ZWQgJiYgZ3JvdXBzLmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgY3JlYXRlR3JvdXAoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGNyZWF0ZUluR3JvdXAgPSAoZmlsdGVyOiBGaWVsZEZpbHRlcikgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWQyID0gZmlsdGVyLmZpZWxkcy5maWx0ZXIoZmlsdGVyMiA9PiBmaWx0ZXIyLnNlbGVjdGVkKSxcbiAgICAgICAgICAgIGdyb3VwUG9zaXRpb24yID0gZmlsdGVyLmZpZWxkcy5maW5kSW5kZXgodiA9PiB2LnNlbGVjdGVkKTtcbiAgICAgICAgICAgIGxldCByZXN1bHRGaWx0ZXIyOiBGaWVsZEZpbHRlcltdO1xuICAgICAgICAgICAgaWYgKHNlbGVjdGVkMi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRGaWx0ZXIyID0gZmlsdGVyLmZpZWxkcy5maWx0ZXIoZmlsdGVyMiA9PiAhZmlsdGVyMi5zZWxlY3RlZCk7XG4gICAgICAgICAgICAgICAgcmVzdWx0RmlsdGVyMi5zcGxpY2UoZ3JvdXBQb3NpdGlvbjIsIDAsIHtcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcnLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgZmllbGQ6ICcnLFxuICAgICAgICAgICAgICAgICAgICBpc2dyb3VwOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBiaXR3aXNlOiAnJiYnLFxuICAgICAgICAgICAgICAgICAgICBmaWVsZHM6IHNlbGVjdGVkMlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHRGaWx0ZXIyID0gZmlsdGVyLmZpZWxkcy5tYXAoZmlsdGVyMiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZUluR3JvdXAoZmlsdGVyMik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZpbHRlcjI7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaWx0ZXIuZmllbGRzID0gcmVzdWx0RmlsdGVyMjtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMuYWN0aXZlRmlsdGVycy5maWx0ZXIoZmlsdGVyID0+IGZpbHRlci5zZWxlY3RlZCksXG4gICAgICAgICAgICAgIGdyb3VwUG9zaXRpb24gPSB0aGlzLmFjdGl2ZUZpbHRlcnMuZmluZEluZGV4KHYgPT4gdi5zZWxlY3RlZCk7XG4gICAgICAgIGxldCByZXN1bHRGaWx0ZXI6IEZpZWxkRmlsdGVyW107XG4gICAgICAgIGlmIChzZWxlY3RlZC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJlc3VsdEZpbHRlciA9IHRoaXMuYWN0aXZlRmlsdGVycy5maWx0ZXIoZmlsdGVyID0+ICFmaWx0ZXIuc2VsZWN0ZWQpO1xuICAgICAgICAgICAgcmVzdWx0RmlsdGVyLnNwbGljZShncm91cFBvc2l0aW9uLCAwLCB7XG4gICAgICAgICAgICAgICAgY29sb3I6ICcnLFxuICAgICAgICAgICAgICAgIG5hbWU6ICcnLFxuICAgICAgICAgICAgICAgIGZpZWxkOiAnJyxcbiAgICAgICAgICAgICAgICBpc2dyb3VwOiB0cnVlLFxuICAgICAgICAgICAgICAgIGJpdHdpc2U6ICcmJicsXG4gICAgICAgICAgICAgICAgZmllbGRzOiBzZWxlY3RlZFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUZpbHRlcnMgPSByZXN1bHRGaWx0ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHRGaWx0ZXIgPSB0aGlzLmFjdGl2ZUZpbHRlcnMubWFwKGZpbHRlciA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlci5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUluR3JvdXAoZmlsdGVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpbHRlcjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh0aGlzLmFjdGl2ZUZpbHRlcnMpO1xuICAgIH1cblxuICAgIHNhbml0aXplR3JvdXBzKCkge1xuICAgICAgICBjb25zdCBzYW5pdGl6ZUdyb3Vwc0luR3JvdXAgPSAoZ3JvdXAsIHBhcmVudD86IEZpZWxkRmlsdGVyKSA9PiB7XG4gICAgICAgICAgICBncm91cC5maWVsZHMubWFwKChmaWx0ZXI6IEZpZWxkRmlsdGVyLCBpZHg6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLmZpZWxkcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwLmZpZWxkcy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmaWx0ZXIuZmllbGRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ3JvdXAuZmllbGRzLnB1c2goey4uLmZpbHRlci5maWVsZHNbMF19KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwLmZpZWxkcy5zcGxpY2UoaWR4LCAxLCB7Li4uZmlsdGVyLmZpZWxkc1swXX0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2FuaXRpemVHcm91cHNJbkdyb3VwKGZpbHRlciwgZ3JvdXApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYWN0aXZlRmlsdGVycy5tYXAoKGZpbHRlcjogRmllbGRGaWx0ZXIsIGlkeDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBpZiAoZmlsdGVyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLmZpZWxkcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVGaWx0ZXJzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZmlsdGVyLmZpZWxkcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5hY3RpdmVGaWx0ZXJzLnB1c2goey4uLmZpbHRlci5maWVsZHNbMF19KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVGaWx0ZXJzLnNwbGljZShpZHgsIDEsIHsuLi5maWx0ZXIuZmllbGRzWzBdfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzYW5pdGl6ZUdyb3Vwc0luR3JvdXAoZmlsdGVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbW92ZUZyb21Hcm91cCgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgcmVtb3ZlRnJvbUdyb3VwSW5Hcm91cCA9IChncm91cDogRmllbGRGaWx0ZXIsIHBhcmVudDogRmllbGRGaWx0ZXIsIGlkeCkgPT4ge1xuICAgICAgICAgICAgZ3JvdXAuZmllbGRzLmZvckVhY2goKGZpbHRlcjIsIGlkeDIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyMi5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUZyb21Hcm91cEluR3JvdXAoZmlsdGVyMiwgZ3JvdXAsIGlkeDIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3QgdG1wRmlsdGVycyA9IGdyb3VwLmZpZWxkcy5maWx0ZXIoKGZpbHRlcjI6IEZpZWxkRmlsdGVyKSA9PiBmaWx0ZXIyLnNlbGVjdGVkKTtcbiAgICAgICAgICAgIGdyb3VwLmZpZWxkcyA9IGdyb3VwLmZpZWxkcy5maWx0ZXIoKGZpbHRlcjI6IEZpZWxkRmlsdGVyKSA9PiAhZmlsdGVyMi5zZWxlY3RlZCk7XG4gICAgICAgICAgICB0bXBGaWx0ZXJzLmZvckVhY2goKHY6IEZpZWxkRmlsdGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgdi5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHBhcmVudC5maWVsZHMucHVzaCh2KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGdyb3VwLmZpZWxkcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBwYXJlbnQuZmllbGRzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuYWN0aXZlRmlsdGVycyA9IHRoaXMuYWN0aXZlRmlsdGVycy5yZWR1Y2UoKG5ld0ZpbHRlcnMsIGZpbHRlcikgPT4ge1xuICAgICAgICAgICAgaWYgKGZpbHRlci5pc2dyb3VwKSB7XG5cbiAgICAgICAgICAgICAgICBmaWx0ZXIuZmllbGRzLmZvckVhY2goKGZpbHRlcjIsIGlkeCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyMi5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVGcm9tR3JvdXBJbkdyb3VwKGZpbHRlcjIsIGZpbHRlciwgaWR4KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgdG1wRmlsdGVycyA9IGZpbHRlci5maWVsZHMuZmlsdGVyKGZpbHRlcjIgPT4gZmlsdGVyMi5zZWxlY3RlZCk7XG4gICAgICAgICAgICAgICAgZmlsdGVyLmZpZWxkcyA9IGZpbHRlci5maWVsZHMuZmlsdGVyKGZpbHRlcjIgPT4gIWZpbHRlcjIuc2VsZWN0ZWQpO1xuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIuZmllbGRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBuZXdGaWx0ZXJzLnB1c2goZmlsdGVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdG1wRmlsdGVycy5mb3JFYWNoKHYgPT4ge1xuICAgICAgICAgICAgICAgICAgICBuZXdGaWx0ZXJzLnB1c2godik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5ld0ZpbHRlcnMucHVzaChmaWx0ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ld0ZpbHRlcnM7XG4gICAgICAgIH0sIFtdKTtcbiAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICB0aGlzLnNhbml0aXplR3JvdXBzKCk7XG4gICAgICAgIHRoaXMuY2hhbmdlLmVtaXQodGhpcy5hY3RpdmVGaWx0ZXJzKTtcbiAgICB9XG5cbiAgICBvblN0YXJ0RHJhZ0ZpbHRlcihfZXZlbnQsIF9maWx0ZXIpIHtcbiAgICB9XG5cbiAgICBvbkRyb3BwZWRGaWx0ZXIoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5hcnJheU1vdmUodGhpcy5hY3RpdmVGaWx0ZXJzLCBldmVudC5wcmV2aW91c0luZGV4LCBldmVudC5jdXJyZW50SW5kZXgpO1xuICAgICAgICAvLyB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgIHRoaXMuc2FuaXRpemVHcm91cHMoKTtcbiAgICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh0aGlzLmFjdGl2ZUZpbHRlcnMpO1xuICAgIH1cblxuICAgIHVwbG9hZFNldCgpIHtcbiAgICAgICAgY29uc3QgZmlsZU9iaiA9ICg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlsZVNldCcpKS5maWxlc1swXTtcbiAgICAgICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgICAgcmVhZGVyLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGxpbmVzID0gKDxzdHJpbmc+cmVhZGVyLnJlc3VsdCkuc3BsaXQoL1xccj9cXG4vKS5maWx0ZXIodmFsID0+IHZhbCA+ICcnKTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRWYWx1ZSA9IGxpbmVzLmpvaW4oJywgJyk7XG4gICAgICAgICAgICB0aGlzLmZpbGVTZXQubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnO1xuICAgICAgICB9O1xuICAgICAgICByZWFkZXIucmVhZEFzVGV4dChmaWxlT2JqKTtcbiAgICB9XG5cbiAgICByZW1vdmVGaWx0ZXIoZmlsdGVyOiBGaWVsZEZpbHRlcik6IHZvaWQge1xuICAgICAgICAvLyBjb25zdCByZW1vdmVGaWx0ZXJJbkdyb3VwID0gKGdyb3VwLCBmaWx0ZXIpID0+IHtcblxuICAgICAgICAvLyB9O1xuICAgICAgICBjb25zdCBwYXJlbnQgPSB0aGlzLmdldFBhcmVudEZpbHRlcihmaWx0ZXIpO1xuICAgICAgICBsZXQgZ3JvdXA6IEZpZWxkRmlsdGVyW107XG4gICAgICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgICAgIGdyb3VwID0gcGFyZW50LmZpZWxkcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdyb3VwID0gdGhpcy5hY3RpdmVGaWx0ZXJzO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gZ3JvdXAubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoSlNPTi5zdHJpbmdpZnkoZ3JvdXBbaV0pID09PSBKU09OLnN0cmluZ2lmeShmaWx0ZXIpKSB7XG4gICAgICAgICAgICAgICAgZ3JvdXAuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2FuaXRpemVHcm91cHMoKTtcbiAgICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh0aGlzLmFjdGl2ZUZpbHRlcnMpO1xuICAgIH1cblxuICAgIGNsZWFyRmlsdGVycygpIHtcbiAgICAgICAgdGhpcy5hY3RpdmVGaWx0ZXJzID0gW107XG4gICAgICAgIHRoaXMuY2hhbmdlLmVtaXQodGhpcy5hY3RpdmVGaWx0ZXJzKTtcbiAgICB9XG5cbiAgICBvbkZvY3VzKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZWRpdGluZyA9IHRydWU7XG4gICAgfVxuXG4gICAgb25CbHVyKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZWRpdGluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmZpbHRlck9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRGaWVsZCA9ICh0eXBlb2YgdGhpcy5maWx0ZXJPcHRpb25zLmZpZWxkc1swXSAhPT0gJ3VuZGVmaW5lZCcpID8gdGhpcy5maWx0ZXJPcHRpb25zLmZpZWxkc1swXS5uYW1lIDogJ25vbmUnO1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuY29uZmlnICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZyAmJiB0eXBlb2YgdGhpcy5jb25maWcub3BlcmF0aW9uc0RhdGEgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcGVyYXRpb25zRGF0YSA9IHRoaXMuY29uZmlnLm9wZXJhdGlvbnNEYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnICYmIHR5cGVvZiB0aGlzLmNvbmZpZy5maWx0ZXIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVGaWx0ZXJzID0gdGhpcy5jb25maWcuZmlsdGVyLnNsaWNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5jb25maWcgJiYgdHlwZW9mIHRoaXMuY29uZmlnLnRleHRzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHRoaXMudGV4dHMgPSB7Li4udGhpcy50ZXh0cywgLi4udGhpcy5jb25maWcudGV4dHN9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHRoaXMuZmlsdGVyT3B0aW9ucyA9IEpTT04ucGFyc2UodGhpcy5vcHRpb25zKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNYXRJY29uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaWNvbic7XG5pbXBvcnQgeyBNYXRTZWxlY3RNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zZWxlY3QnO1xuaW1wb3J0IHsgTWF0Q2hpcHNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jaGlwcyc7XG5pbXBvcnQgeyBNYXRJbnB1dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2lucHV0JztcbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2J1dHRvbic7XG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuaW1wb3J0IHsgTWF0VG9vbHRpcE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3Rvb2x0aXAnO1xuaW1wb3J0IHsgTWF0TWVudU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL21lbnUnO1xuaW1wb3J0IHsgRHJhZ0Ryb3BNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcblxuaW1wb3J0IHsgVFdBRmlsdGVyRWRpdG9yQ29tcG9uZW50IH0gZnJvbSAnLi90d2EtbWQyLWZpbHRlci1lZGl0b3IuY29tcG9uZW50JztcbmltcG9ydCB7IFRXQUZpbHRlckVkaXRvclNlcnZpY2UgfSBmcm9tICcuL3R3YS1tZDItZmlsdGVyLWVkaXRvci5zZXJ2aWNlJztcbmltcG9ydCB7IEZpZWxkRmlsdGVyIH0gZnJvbSAnLi90d2EtbWQyLWZpbHRlci1lZGl0b3IuaW50ZXJmYWNlJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgRm9ybXNNb2R1bGUsXG4gICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgICAgIE1hdEljb25Nb2R1bGUsXG4gICAgICAgIE1hdFNlbGVjdE1vZHVsZSxcbiAgICAgICAgTWF0Q2hpcHNNb2R1bGUsXG4gICAgICAgIE1hdElucHV0TW9kdWxlLFxuICAgICAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgICAgIEZsZXhMYXlvdXRNb2R1bGUsXG4gICAgICAgIE1hdFRvb2x0aXBNb2R1bGUsXG4gICAgICAgIE1hdE1lbnVNb2R1bGUsXG4gICAgICAgIERyYWdEcm9wTW9kdWxlLFxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIFRXQUZpbHRlckVkaXRvckNvbXBvbmVudCxcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgVFdBRmlsdGVyRWRpdG9yQ29tcG9uZW50LFxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIFRXQUZpbHRlckVkaXRvclNlcnZpY2VcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIFRXQUZpbHRlckVkaXRvck1vZHVsZSB7fVxuIl0sIm5hbWVzIjpbIkluamVjdGFibGUiLCJFdmVudEVtaXR0ZXIiLCJDb21wb25lbnQiLCJJbnB1dCIsIk91dHB1dCIsIlZpZXdDaGlsZCIsIkhvc3RMaXN0ZW5lciIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIiwiRm9ybXNNb2R1bGUiLCJSZWFjdGl2ZUZvcm1zTW9kdWxlIiwiTWF0SWNvbk1vZHVsZSIsIk1hdFNlbGVjdE1vZHVsZSIsIk1hdENoaXBzTW9kdWxlIiwiTWF0SW5wdXRNb2R1bGUiLCJNYXRCdXR0b25Nb2R1bGUiLCJGbGV4TGF5b3V0TW9kdWxlIiwiTWF0VG9vbHRpcE1vZHVsZSIsIk1hdE1lbnVNb2R1bGUiLCJEcmFnRHJvcE1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0lBQUE7Ozs7Ozs7Ozs7Ozs7O0FBY0EsSUFlTyxJQUFJLFFBQVEsR0FBRztRQUNsQixR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