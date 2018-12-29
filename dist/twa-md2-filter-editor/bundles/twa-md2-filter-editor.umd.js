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
                        (_a = this.filterOptions.fields[i], color = _a.color, field = _a.field, label = _a.label, name = _a.name);
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
                    if (typeof this.config.operationsData !== 'undefined') {
                        this.operationsData = this.config.operationsData;
                    }
                    if (typeof this.config.filter !== 'undefined') {
                        this.activeFilters = this.config.filter.slice();
                    }
                }
                // this.filterOptions = JSON.parse(this.options);
            };
        TWAFilterEditorComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'twa-md2-filter-editor',
                        template: "<div fxLayout=\"row\" fxLayoutGap=\"20px\">\n    <div fxLayout=\"column\" fxFlex>\n        <div class=\"selector\" fxLayout=\"row\" fxLayoutGap=\"10px\">\n            <mat-form-field>\n                <mat-select [(ngModel)]=\"selectedField\">\n                    <mat-option selected value=\"none\">Filtrar por...</mat-option>\n                    <mat-option *ngFor=\"let field of filterOptions.fields\" [(value)]=\"field.name\">{{field.label}}</mat-option>\n                </mat-select>\n            </mat-form-field>\n            <mat-form-field>\n                <mat-select [(ngModel)]=\"operation\">\n                    <mat-option *ngFor=\"let op of operationsData\" value=\"{{op.type}}\">{{op.label}}</mat-option>\n                </mat-select>\n            </mat-form-field>\n            <mat-form-field>\n                <input matInput placeholder=\"filtro\" [(ngModel)]=\"selectedValue\"\n                        (focus)=\"onFocus($event)\" (blur)=\"onBlur($event)\" />\n                <button mat-button *ngIf=\"operation==='in'\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"fileSet.click()\">\n                    <mat-icon>attach_file</mat-icon>\n                </button>\n            </mat-form-field>\n            <div>\n                <button mat-button mat-icon-button (click)=\"addFilter()\" [disabled]=\"checkFilter()\">\n                    <mat-icon>send</mat-icon>\n                </button>\n            </div>\n            <div fxFlex>&nbsp;</div>\n            <div class=\"tools\" *ngIf=\"activeFilters.length > 0\" fxLayout=\"row\">\n                <button mat-button mat-icon-button\n                    matTooltip=\"Agrupar\"\n                    (click)=\"createGroup()\"\n                    [disabled]=\"getSelected() < 2\">\n                    <mat-icon>link</mat-icon>\n                </button>\n                <button mat-button mat-icon-button\n                    matTooltip=\"Desagrupar\"\n                    (click)=\"removeFromGroup()\"\n                    [disabled]=\"!groupSelected()\">\n                    <mat-icon>link_off</mat-icon>\n                </button>\n                <button mat-button mat-icon-button\n                    matTooltip=\"Mover a la izquierda\"\n                    (click)=\"moveTo(-1)\"\n                    [disabled]=\"getSelected() !== 1 && !entireGroupSelected()\">\n                    <mat-icon>arrow_back</mat-icon>\n                </button>\n                <button mat-button mat-icon-button\n                    matTooltip=\"Mover a la derecha\"\n                    (click)=\"moveTo(1)\"\n                    [disabled]=\"getSelected() !== 1 && !entireGroupSelected()\">\n                    <mat-icon>arrow_forward</mat-icon>\n                </button>\n                <button mat-button mat-icon-button\n                    matTooltip=\"Limpiar selecci\u00F3n\"\n                    [disabled]=\"getSelected() < 1\"\n                    (click)=\"clearSelection()\">\n                    <mat-icon>clear</mat-icon>\n                </button>\n                <button mat-button mat-icon-button\n                        matTooltip=\"Limpiar filtros\"\n                        [disabled]=\"activeFilters.length < 1\"\n                        (click)=\"clearFilters()\">\n                    <mat-icon>clear_all</mat-icon>\n                </button>\n            </div>\n        </div>\n        <div class=\"filter\" fxLayoutGap=\"12\">\n            <mat-chip-list cdkDropList\n                           cdkDropListOrientation=\"horizontal\"\n                           (cdkDropListDropped)=\"onDroppedFilter($event)\">\n                <ng-container *ngFor=\"let filter of activeFilters; let idx = index\">\n                    <div fxLayout=\"row\"\n                    cdkDrag\n                    (cdkDragStarted)=\"onStartDragFilter($event, filter)\" [ngClass]=\"{'cgroup': filter.isgroup}\">\n                        <button mat-button *ngIf=\"idx > 0\" [matMenuTriggerFor]=\"menu\" class=\"bitwise\">{{filter.bitwise}}</button>\n                        <mat-menu #menu=\"matMenu\">\n                            <button mat-menu-item (click)=\"changeBitwise(filter, '&&')\">&&</button>\n                            <button mat-menu-item (click)=\"changeBitwise(filter, '||')\">||</button>\n                        </mat-menu>\n                        <mat-chip color=\"{{filter.color}}\" selected=\"true\"\n                                  id=\"filter-{{idx}}\"\n                                  [removable]=\"true\" (removed)=\"removeFilter(filter)\"\n                                  [matTooltip]=\"filter.value\"\n                                  [matTooltipDisabled]=\"filter.operation!=='in'\"\n                                  matTooltipShowDelay=\"1500\"\n                                  (click)=\"selectFilter(filter)\"\n                                  *ngIf=\"!filter.isgroup\"\n                                  [ngClass]=\"{'selected': filter.selected, 'mat-accent': filter.selected}\">\n                            {{filter.explanation}}\n                            <mat-icon matChipRemove>cancel</mat-icon>\n                        </mat-chip>\n                        <div *ngIf=\"filter.isgroup\" fxLayout=\"row\">\n                            <div *ngTemplateOutlet=\"group; context: { filter: this.filter, idx: this.idx}\" fxLayout=\"row\">\n                            </div>\n                        </div>\n                    </div>\n                </ng-container>\n            </mat-chip-list>\n        </div>\n    </div>\n    <input style=\"visibilty: hidden; height: 0px; width: 0px;\" type=\"file\" id=\"fileSet\" #fileSet (change)=\"uploadSet()\" />\n</div>\n<ng-template #group let-filter=\"filter\" let-idx=\"idx\">\n    <span class=\"group-start\">(</span>\n    <ng-container *ngFor=\"let filter2 of filter.fields; let idx2 = index\">\n        <button mat-button *ngIf=\"idx2 > 0\" [matMenuTriggerFor]=\"menu2\"\n                class=\"bitwise\">\n            {{filter2.bitwise}}\n        </button>\n        <mat-menu #menu2=\"matMenu\">\n            <button mat-menu-item (click)=\"changeBitwise(filter2, '&&')\">&&</button>\n            <button mat-menu-item (click)=\"changeBitwise(filter2, '||')\">||</button>\n        </mat-menu>\n        <div>\n            <mat-chip color=\"{{filter.color}}\" selected=\"true\"\n                id=\"filter-{{idx}}-{{idx2}}\"\n                [removable]=\"true\" (removed)=\"removeFilter(filter2)\"\n                [matTooltip]=\"filter2.value\"\n                [matTooltipDisabled]=\"filter.operation!=='in'\"\n                matTooltipShowDelay=\"1500\"\n                (click)=\"selectFilter(filter2)\"\n                [ngClass]=\"{'selected': filter2.selected, 'mat-accent': filter2.selected}\"\n                *ngIf=\"!filter2.isgroup\"\n            >{{filter2.explanation}}\n                <mat-icon matChipRemove>cancel</mat-icon>\n            </mat-chip>\n            <div *ngIf=\"filter2.isgroup\" fxLayout=\"row\">\n                <div *ngTemplateOutlet=\"group; context: { filter: this.filter2, idx: this.idx2}\">\n                </div>\n            </div>\n        </div>\n    </ng-container>\n    <span class=\"group-end\">)</span>\n</ng-template>\n",
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdhLW1kMi1maWx0ZXItZWRpdG9yLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbbnVsbCwibmc6Ly90d2EtbWQyLWZpbHRlci1lZGl0b3IvbGliL3R3YS1tZDItZmlsdGVyLWVkaXRvci5zZXJ2aWNlLnRzIiwibmc6Ly90d2EtbWQyLWZpbHRlci1lZGl0b3IvbGliL3R3YS1tZDItZmlsdGVyLWVkaXRvci5jb21wb25lbnQudHMiLCJuZzovL3R3YS1tZDItZmlsdGVyLWVkaXRvci9saWIvdHdhLW1kMi1maWx0ZXItZWRpdG9yLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgVFdBRmlsdGVyRWRpdG9yQ29tcG9uZW50IH0gZnJvbSAnLi90d2EtbWQyLWZpbHRlci1lZGl0b3IuY29tcG9uZW50JztcbmltcG9ydCB7IEZpZWxkRmlsdGVyIH0gZnJvbSAnLi90d2EtbWQyLWZpbHRlci1lZGl0b3IuaW50ZXJmYWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRXQUZpbHRlckVkaXRvclNlcnZpY2Uge1xuXG4gICAgZmlsdGVyczogRmllbGRGaWx0ZXJbXTtcblxuICAgIGZpbHRlcmVkRGF0YTogYW55W107XG4gICAgZmlsdGVyOiBUV0FGaWx0ZXJFZGl0b3JDb21wb25lbnQ7XG4gICAgZGF0YTogYW55W107XG4gICAgcHJlcGFyZURhdGE6IEZ1bmN0aW9uO1xuICAgIHByb2Nlc3NlZEZpbHRlcnM6IGFueVtdO1xuXG4gICAgaW5pdChcbiAgICAgICAgZmlsdGVyOiBUV0FGaWx0ZXJFZGl0b3JDb21wb25lbnQsXG4gICAgICAgIGRhdGE6IGFueVtdLFxuICAgICAgICBwcmVwYXJlRGF0YT86IEZ1bmN0aW9uXG4gICAgKSB7XG4gICAgICAgIHRoaXMuZmlsdGVyID0gZmlsdGVyO1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgICAgICB0aGlzLnByZXBhcmVEYXRhID0gcHJlcGFyZURhdGE7XG5cbiAgICAgICAgdGhpcy5maWx0ZXIuY2hhbmdlLnN1YnNjcmliZSgoZmlsdGVyczogRmllbGRGaWx0ZXJbXSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJzID0gZmlsdGVycztcbiAgICAgICAgICAgIHRoaXMuYXBwbHlGaWx0ZXIoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucHJvY2Vzc2VkRmlsdGVycyA9IHRoaXMucHJvY2Vzc0ZpbHRlck9ycyh0aGlzLmZpbHRlci5hY3RpdmVGaWx0ZXJzKTtcbiAgICB9XG5cbiAgICBhcHBseUZpbHRlcihkYXRhID0gdGhpcy5kYXRhLnNsaWNlKCkpIHtcblxuICAgICAgICAvLyBsZXQgZGF0YSA9IHRoaXMuZGF0YS5zbGljZSgpO1xuICAgICAgICBsZXQgcmV0ID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gZGF0YS5sZW5ndGg7XG5cbiAgICAgICAgdGhpcy5wcm9jZXNzZWRGaWx0ZXJzID0gdGhpcy5wcm9jZXNzRmlsdGVyT3JzKHRoaXMuZmlsdGVyLmFjdGl2ZUZpbHRlcnMpO1xuXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG5cbiAgICAgICAgZGF0YSA9IGRhdGEubWFwKChpdGVtLCBpZHgpID0+IHtcbiAgICAgICAgICAgIGl0ZW0ucmVhbEluZGV4ID0gaWR4O1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgIH0pLmZpbHRlcigoaXRlbTogYW55KSA9PiB7XG4gICAgICAgICAgICByZXQgPSB0aGlzLmFwcGx5RmlsdGVyVG9Sb3coaXRlbSk7XG4gICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGF0YTtcblxuICAgIH1cblxuICAgIGFwcGx5RmlsdGVyVG9Sb3coaXRlbSkge1xuXG4gICAgICAgIGxldCByZXQgPSB0cnVlO1xuICAgICAgICBjb25zdCByZXN1bHRzID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSB0aGlzLnByb2Nlc3NlZEZpbHRlcnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHRzMiA9IFtdO1xuICAgICAgICAgICAgdGhpcy5wcm9jZXNzZWRGaWx0ZXJzW2ldLmZvckVhY2goKHY6IEZpZWxkRmlsdGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzdWx0czIucHVzaCh0aGlzLmZpbHRlckRhdGEodiwgaXRlbSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXN1bHRzLnB1c2gocmVzdWx0czIucmVkdWNlKChhY2MsIHYpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXYpIHtcbiAgICAgICAgICAgICAgICAgICAgYWNjID0gdjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgICAgIH0sIHRydWUpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZXN1bHRzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0ID0gcmVzdWx0cy5yZWR1Y2UoKGFjYywgdikgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh2KSB7XG4gICAgICAgICAgICAgICAgICAgIGFjYyA9IHY7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJldDtcblxuICAgIH1cblxuICAgIHByb2Nlc3NGaWx0ZXJPcnMgPSAoZmlsdGVycykgPT4ge1xuICAgICAgICBsZXQgYWN0dWFsRmlsdGVyID0gMDtcbiAgICAgICAgY29uc3QgbmV3RmlsdGVycyA9IFtdO1xuICAgICAgICBmaWx0ZXJzLmZvckVhY2goKHYsIGkpID0+IHtcbiAgICAgICAgICAgIGlmIChpID4gMCAmJiB2LmJpdHdpc2UgPT09ICd8fCcpIHtcbiAgICAgICAgICAgICAgICBhY3R1YWxGaWx0ZXIrKztcbiAgICAgICAgICAgICAgICBuZXdGaWx0ZXJzLnB1c2goW10pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZihuZXdGaWx0ZXJzW2FjdHVhbEZpbHRlcl0pID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIG5ld0ZpbHRlcnMucHVzaChbXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodi5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3R3JvdXAgPSB7Li4udiwgZmllbGRzOiB0aGlzLnByb2Nlc3NGaWx0ZXJPcnModi5maWVsZHMpfTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhuZXdHcm91cCk7XG4gICAgICAgICAgICAgICAgbmV3RmlsdGVyc1thY3R1YWxGaWx0ZXJdLnB1c2gobmV3R3JvdXApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXdGaWx0ZXJzW2FjdHVhbEZpbHRlcl0ucHVzaCh2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIG5ld0ZpbHRlcnM7XG4gICAgfVxuXG4gICAgZmlsdGVyRGF0YSA9IChmaWx0ZXI6IGFueSwgZmlsdGVyVmFsdWU6IGFueSkgPT4ge1xuXG4gICAgICAgIGNvbnN0IGNvbXBhcmF0b3JzID0ge1xuICAgICAgICAgICAgJz0+JzogKGE6IHN0cmluZywgYjogc3RyaW5nKSA9PiBhLmluY2x1ZGVzKGIpLFxuICAgICAgICAgICAgJz09PSc6IChhOiBhbnksIGI6IGFueSkgPT4gYSA9PT0gYixcbiAgICAgICAgICAgICc+PSc6IChhOiBhbnksIGI6IGFueSkgPT4gYSA+PSBiLFxuICAgICAgICAgICAgJz4nOiAoYTogYW55LCBiOiBhbnkpID0+IGEgPiBiLFxuICAgICAgICAgICAgJzw9JzogKGE6IGFueSwgYjogYW55KSA9PiBhIDw9IGIsXG4gICAgICAgICAgICAnPCc6IChhOiBhbnksIGI6IGFueSkgPT4gYSA8IGIsXG4gICAgICAgICAgICAnaW4nOiAoYTogYW55LCBiOiBhbnkpID0+IGIuc3BsaXQoJywnKS5pbmNsdWRlcyhhKSxcbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgcmV0VmFsdWUgPSBmYWxzZTtcblxuICAgICAgICBpZiAoZmlsdGVyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgIHJldFZhbHVlID0gdGhpcy5maWx0ZXJHcm91cChmaWx0ZXIsIGZpbHRlclZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXBhcmVEYXRhKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmVwYXJlRGF0YShmaWx0ZXIsIGZpbHRlclZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBmaWx0ZXJWYWx1ZVtmaWx0ZXIuZmllbGRdID09PSAnbnVtYmVyJyAmJiAoZmlsdGVyLm9wZXJhdGlvbiAhPT0gJz0+JyAmJiBmaWx0ZXIub3BlcmF0aW9uICE9PSAnaW4nKSkge1xuICAgICAgICAgICAgICAgICAgICByZXRWYWx1ZSA9IGNvbXBhcmF0b3JzW2ZpbHRlci5vcGVyYXRpb25dKCtmaWx0ZXJWYWx1ZVtmaWx0ZXIuZmllbGRdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICtmaWx0ZXIudmFsdWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldFZhbHVlID0gY29tcGFyYXRvcnNbZmlsdGVyLm9wZXJhdGlvbl0oU3RyaW5nKGZpbHRlclZhbHVlW2ZpbHRlci5maWVsZF0pLnRvTG93ZXJDYXNlKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU3RyaW5nKGZpbHRlci52YWx1ZSkudG9Mb3dlckNhc2UoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICAgICAgcmV0VmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXRWYWx1ZTtcblxuICAgIH1cblxuICAgIGZpbHRlckdyb3VwID0gKGZpbHRlcjogYW55LCBmaWx0ZXJWYWx1ZTogYW55KSA9PiB7XG5cbiAgICAgICAgY29uc3QgcmVzdWx0cyA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gZmlsdGVyLmZpZWxkcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdHMyID0gW107XG4gICAgICAgICAgICBmaWx0ZXIuZmllbGRzW2ldLmZvckVhY2goKHY6IGFueVtdKSA9PiB7XG4gICAgICAgICAgICAgICByZXN1bHRzMi5wdXNoKHRoaXMuZmlsdGVyRGF0YSh2LCBmaWx0ZXJWYWx1ZSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXN1bHRzLnB1c2gocmVzdWx0czIucmVkdWNlKChhY2MsIHYyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF2Mikge1xuICAgICAgICAgICAgICAgICAgICBhY2MgPSB2MjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgICAgIH0sIHRydWUpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHRzLnJlZHVjZSgoYWNjLCB2KSA9PiB7XG4gICAgICAgICAgICBpZiAodikge1xuICAgICAgICAgICAgICAgIGFjYyA9IHY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICB9LCBmYWxzZSk7XG5cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBGaWx0ZXJFZGl0b3JPcHRpb25zLCBGaWVsZEZpbHRlciwgRmlsdGVyRWRpdG9yQ29uZmlnIH0gZnJvbSAnLi90d2EtbWQyLWZpbHRlci1lZGl0b3IuaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndHdhLW1kMi1maWx0ZXItZWRpdG9yJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRHYXA9XCIyMHB4XCI+XG4gICAgPGRpdiBmeExheW91dD1cImNvbHVtblwiIGZ4RmxleD5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNlbGVjdG9yXCIgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEdhcD1cIjEwcHhcIj5cbiAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgICAgICA8bWF0LXNlbGVjdCBbKG5nTW9kZWwpXT1cInNlbGVjdGVkRmllbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1vcHRpb24gc2VsZWN0ZWQgdmFsdWU9XCJub25lXCI+RmlsdHJhciBwb3IuLi48L21hdC1vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCBmaWVsZCBvZiBmaWx0ZXJPcHRpb25zLmZpZWxkc1wiIFsodmFsdWUpXT1cImZpZWxkLm5hbWVcIj57e2ZpZWxkLmxhYmVsfX08L21hdC1vcHRpb24+XG4gICAgICAgICAgICAgICAgPC9tYXQtc2VsZWN0PlxuICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgICAgICA8bWF0LXNlbGVjdCBbKG5nTW9kZWwpXT1cIm9wZXJhdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LW9wdGlvbiAqbmdGb3I9XCJsZXQgb3Agb2Ygb3BlcmF0aW9uc0RhdGFcIiB2YWx1ZT1cInt7b3AudHlwZX19XCI+e3tvcC5sYWJlbH19PC9tYXQtb3B0aW9uPlxuICAgICAgICAgICAgICAgIDwvbWF0LXNlbGVjdD5cbiAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICAgICAgPGlucHV0IG1hdElucHV0IHBsYWNlaG9sZGVyPVwiZmlsdHJvXCIgWyhuZ01vZGVsKV09XCJzZWxlY3RlZFZhbHVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChmb2N1cyk9XCJvbkZvY3VzKCRldmVudClcIiAoYmx1cik9XCJvbkJsdXIoJGV2ZW50KVwiIC8+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBtYXQtYnV0dG9uICpuZ0lmPVwib3BlcmF0aW9uPT09J2luJ1wiIG1hdFN1ZmZpeCBtYXQtaWNvbi1idXR0b24gYXJpYS1sYWJlbD1cIkNsZWFyXCIgKGNsaWNrKT1cImZpbGVTZXQuY2xpY2soKVwiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWljb24+YXR0YWNoX2ZpbGU8L21hdC1pY29uPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBtYXQtYnV0dG9uIG1hdC1pY29uLWJ1dHRvbiAoY2xpY2spPVwiYWRkRmlsdGVyKClcIiBbZGlzYWJsZWRdPVwiY2hlY2tGaWx0ZXIoKVwiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWljb24+c2VuZDwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgZnhGbGV4PiZuYnNwOzwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvb2xzXCIgKm5nSWY9XCJhY3RpdmVGaWx0ZXJzLmxlbmd0aCA+IDBcIiBmeExheW91dD1cInJvd1wiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gbWF0LWJ1dHRvbiBtYXQtaWNvbi1idXR0b25cbiAgICAgICAgICAgICAgICAgICAgbWF0VG9vbHRpcD1cIkFncnVwYXJcIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwiY3JlYXRlR3JvdXAoKVwiXG4gICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJnZXRTZWxlY3RlZCgpIDwgMlwiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWljb24+bGluazwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBtYXQtYnV0dG9uIG1hdC1pY29uLWJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBtYXRUb29sdGlwPVwiRGVzYWdydXBhclwiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJyZW1vdmVGcm9tR3JvdXAoKVwiXG4gICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCIhZ3JvdXBTZWxlY3RlZCgpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbj5saW5rX29mZjwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBtYXQtYnV0dG9uIG1hdC1pY29uLWJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBtYXRUb29sdGlwPVwiTW92ZXIgYSBsYSBpenF1aWVyZGFcIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwibW92ZVRvKC0xKVwiXG4gICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJnZXRTZWxlY3RlZCgpICE9PSAxICYmICFlbnRpcmVHcm91cFNlbGVjdGVkKClcIj5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1pY29uPmFycm93X2JhY2s8L21hdC1pY29uPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gbWF0LWJ1dHRvbiBtYXQtaWNvbi1idXR0b25cbiAgICAgICAgICAgICAgICAgICAgbWF0VG9vbHRpcD1cIk1vdmVyIGEgbGEgZGVyZWNoYVwiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJtb3ZlVG8oMSlcIlxuICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZ2V0U2VsZWN0ZWQoKSAhPT0gMSAmJiAhZW50aXJlR3JvdXBTZWxlY3RlZCgpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbj5hcnJvd19mb3J3YXJkPC9tYXQtaWNvbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIG1hdC1idXR0b24gbWF0LWljb24tYnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIG1hdFRvb2x0aXA9XCJMaW1waWFyIHNlbGVjY2nDg8KzblwiXG4gICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJnZXRTZWxlY3RlZCgpIDwgMVwiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJjbGVhclNlbGVjdGlvbigpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbj5jbGVhcjwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBtYXQtYnV0dG9uIG1hdC1pY29uLWJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgbWF0VG9vbHRpcD1cIkxpbXBpYXIgZmlsdHJvc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiYWN0aXZlRmlsdGVycy5sZW5ndGggPCAxXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJjbGVhckZpbHRlcnMoKVwiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWljb24+Y2xlYXJfYWxsPC9tYXQtaWNvbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZpbHRlclwiIGZ4TGF5b3V0R2FwPVwiMTJcIj5cbiAgICAgICAgICAgIDxtYXQtY2hpcC1saXN0IGNka0Ryb3BMaXN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjZGtEcm9wTGlzdE9yaWVudGF0aW9uPVwiaG9yaXpvbnRhbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAoY2RrRHJvcExpc3REcm9wcGVkKT1cIm9uRHJvcHBlZEZpbHRlcigkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZmlsdGVyIG9mIGFjdGl2ZUZpbHRlcnM7IGxldCBpZHggPSBpbmRleFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCJcbiAgICAgICAgICAgICAgICAgICAgY2RrRHJhZ1xuICAgICAgICAgICAgICAgICAgICAoY2RrRHJhZ1N0YXJ0ZWQpPVwib25TdGFydERyYWdGaWx0ZXIoJGV2ZW50LCBmaWx0ZXIpXCIgW25nQ2xhc3NdPVwieydjZ3JvdXAnOiBmaWx0ZXIuaXNncm91cH1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gbWF0LWJ1dHRvbiAqbmdJZj1cImlkeCA+IDBcIiBbbWF0TWVudVRyaWdnZXJGb3JdPVwibWVudVwiIGNsYXNzPVwiYml0d2lzZVwiPnt7ZmlsdGVyLmJpdHdpc2V9fTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1tZW51ICNtZW51PVwibWF0TWVudVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gbWF0LW1lbnUtaXRlbSAoY2xpY2spPVwiY2hhbmdlQml0d2lzZShmaWx0ZXIsICcmJicpXCI+JiY8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG1hdC1tZW51LWl0ZW0gKGNsaWNrKT1cImNoYW5nZUJpdHdpc2UoZmlsdGVyLCAnfHwnKVwiPnx8PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L21hdC1tZW51PlxuICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1jaGlwIGNvbG9yPVwie3tmaWx0ZXIuY29sb3J9fVwiIHNlbGVjdGVkPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9XCJmaWx0ZXIte3tpZHh9fVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3JlbW92YWJsZV09XCJ0cnVlXCIgKHJlbW92ZWQpPVwicmVtb3ZlRmlsdGVyKGZpbHRlcilcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFttYXRUb29sdGlwXT1cImZpbHRlci52YWx1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW21hdFRvb2x0aXBEaXNhYmxlZF09XCJmaWx0ZXIub3BlcmF0aW9uIT09J2luJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0VG9vbHRpcFNob3dEZWxheT1cIjE1MDBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJzZWxlY3RGaWx0ZXIoZmlsdGVyKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCIhZmlsdGVyLmlzZ3JvdXBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsnc2VsZWN0ZWQnOiBmaWx0ZXIuc2VsZWN0ZWQsICdtYXQtYWNjZW50JzogZmlsdGVyLnNlbGVjdGVkfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7ZmlsdGVyLmV4cGxhbmF0aW9ufX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bWF0LWljb24gbWF0Q2hpcFJlbW92ZT5jYW5jZWw8L21hdC1pY29uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9tYXQtY2hpcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJmaWx0ZXIuaXNncm91cFwiIGZ4TGF5b3V0PVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiAqbmdUZW1wbGF0ZU91dGxldD1cImdyb3VwOyBjb250ZXh0OiB7IGZpbHRlcjogdGhpcy5maWx0ZXIsIGlkeDogdGhpcy5pZHh9XCIgZnhMYXlvdXQ9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvbWF0LWNoaXAtbGlzdD5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGlucHV0IHN0eWxlPVwidmlzaWJpbHR5OiBoaWRkZW47IGhlaWdodDogMHB4OyB3aWR0aDogMHB4O1wiIHR5cGU9XCJmaWxlXCIgaWQ9XCJmaWxlU2V0XCIgI2ZpbGVTZXQgKGNoYW5nZSk9XCJ1cGxvYWRTZXQoKVwiIC8+XG48L2Rpdj5cbjxuZy10ZW1wbGF0ZSAjZ3JvdXAgbGV0LWZpbHRlcj1cImZpbHRlclwiIGxldC1pZHg9XCJpZHhcIj5cbiAgICA8c3BhbiBjbGFzcz1cImdyb3VwLXN0YXJ0XCI+KDwvc3Bhbj5cbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBmaWx0ZXIyIG9mIGZpbHRlci5maWVsZHM7IGxldCBpZHgyID0gaW5kZXhcIj5cbiAgICAgICAgPGJ1dHRvbiBtYXQtYnV0dG9uICpuZ0lmPVwiaWR4MiA+IDBcIiBbbWF0TWVudVRyaWdnZXJGb3JdPVwibWVudTJcIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwiYml0d2lzZVwiPlxuICAgICAgICAgICAge3tmaWx0ZXIyLmJpdHdpc2V9fVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPG1hdC1tZW51ICNtZW51Mj1cIm1hdE1lbnVcIj5cbiAgICAgICAgICAgIDxidXR0b24gbWF0LW1lbnUtaXRlbSAoY2xpY2spPVwiY2hhbmdlQml0d2lzZShmaWx0ZXIyLCAnJiYnKVwiPiYmPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIG1hdC1tZW51LWl0ZW0gKGNsaWNrKT1cImNoYW5nZUJpdHdpc2UoZmlsdGVyMiwgJ3x8JylcIj58fDwvYnV0dG9uPlxuICAgICAgICA8L21hdC1tZW51PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPG1hdC1jaGlwIGNvbG9yPVwie3tmaWx0ZXIuY29sb3J9fVwiIHNlbGVjdGVkPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgaWQ9XCJmaWx0ZXIte3tpZHh9fS17e2lkeDJ9fVwiXG4gICAgICAgICAgICAgICAgW3JlbW92YWJsZV09XCJ0cnVlXCIgKHJlbW92ZWQpPVwicmVtb3ZlRmlsdGVyKGZpbHRlcjIpXCJcbiAgICAgICAgICAgICAgICBbbWF0VG9vbHRpcF09XCJmaWx0ZXIyLnZhbHVlXCJcbiAgICAgICAgICAgICAgICBbbWF0VG9vbHRpcERpc2FibGVkXT1cImZpbHRlci5vcGVyYXRpb24hPT0naW4nXCJcbiAgICAgICAgICAgICAgICBtYXRUb29sdGlwU2hvd0RlbGF5PVwiMTUwMFwiXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cInNlbGVjdEZpbHRlcihmaWx0ZXIyKVwiXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieydzZWxlY3RlZCc6IGZpbHRlcjIuc2VsZWN0ZWQsICdtYXQtYWNjZW50JzogZmlsdGVyMi5zZWxlY3RlZH1cIlxuICAgICAgICAgICAgICAgICpuZ0lmPVwiIWZpbHRlcjIuaXNncm91cFwiXG4gICAgICAgICAgICA+e3tmaWx0ZXIyLmV4cGxhbmF0aW9ufX1cbiAgICAgICAgICAgICAgICA8bWF0LWljb24gbWF0Q2hpcFJlbW92ZT5jYW5jZWw8L21hdC1pY29uPlxuICAgICAgICAgICAgPC9tYXQtY2hpcD5cbiAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJmaWx0ZXIyLmlzZ3JvdXBcIiBmeExheW91dD1cInJvd1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nVGVtcGxhdGVPdXRsZXQ9XCJncm91cDsgY29udGV4dDogeyBmaWx0ZXI6IHRoaXMuZmlsdGVyMiwgaWR4OiB0aGlzLmlkeDJ9XCI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9uZy1jb250YWluZXI+XG4gICAgPHNwYW4gY2xhc3M9XCJncm91cC1lbmRcIj4pPC9zcGFuPlxuPC9uZy10ZW1wbGF0ZT5cbmAsXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICAuZXJyb3IgeyBjb2xvcjogcmVkOyB9XG4gICAgLnNlbGVjdG9yIHtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgfVxuICAgIC5maWx0ZXIge1xuICAgICAgICBwYWRkaW5nLWJvdHRvbTogMTJweDtcbiAgICB9XG4gICAgLmZpbHRlciBtYXQtY2hpcCB7XG4gICAgICAgIG1hcmdpbjogNHB4O1xuICAgIH1cbiAgICAuY2dyb3VwIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICB9XG4gICAgbWF0LWNoaXAuc2VsZWN0ZWQge1xuICAgICAgICBjb2xvcjogI2ZmZjtcbiAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgfVxuICAgIHNwYW4uZ3JvdXAtc3RhcnQsXG4gICAgc3Bhbi5ncm91cC1lbmQge1xuICAgICAgICBmb250LXNpemU6IDI1cHg7XG4gICAgfVxuICAgIGJ1dHRvbi5iaXR3aXNlIHtcbiAgICAgICAgbWluLXdpZHRoOiAyNHB4O1xuICAgICAgICBwYWRkaW5nLWxlZnQ6IDA7XG4gICAgICAgIHBhZGRpbmctcmlnaHQ6IDA7XG4gICAgfVxuICAgIGBcbiAgXVxufSlcblxuZXhwb3J0IGNsYXNzIFRXQUZpbHRlckVkaXRvckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBASW5wdXQoKSBvcHRpb25zOiBGaWx0ZXJFZGl0b3JPcHRpb25zO1xuICAgIEBJbnB1dCgpIGNvbmZpZzogRmlsdGVyRWRpdG9yQ29uZmlnO1xuICAgIEBPdXRwdXQoKSBjaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnlbXT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueVtdPigpO1xuXG4gICAgQFZpZXdDaGlsZCgnZmlsZVNldCcpIGZpbGVTZXQ6IEVsZW1lbnRSZWY7XG5cbiAgICBmaWx0ZXJPcHRpb25zOiBGaWx0ZXJFZGl0b3JPcHRpb25zO1xuICAgIHNlbGVjdGVkRmllbGQgPSAnbm9uZSc7XG4gICAgc2VsZWN0ZWRWYWx1ZSA9ICcnO1xuICAgIG9wZXJhdGlvbiA9ICdjb250YWluJztcbiAgICBhY3RpdmVGaWx0ZXJzOiBGaWVsZEZpbHRlcltdID0gW107XG4gICAgZWRpdGluZyA9IGZhbHNlO1xuICAgIG9wZXJhdGlvbnM6IGFueSA9IHtcbiAgICAgICAgY29udGFpbjogJz0+JyxcbiAgICAgICAgZXF1YWw6ICc9PT0nLFxuICAgICAgICBncmVhdGVyRXF1YWw6ICc+PScsXG4gICAgICAgIGdyZWF0ZXI6ICc+JyxcbiAgICAgICAgbGVzc0VxdWFsOiAnPD0nLFxuICAgICAgICBsZXNzOiAnPCcsXG4gICAgICAgIGluOiAnaW4nLFxuICAgIH07XG4gICAgb3BlcmF0aW9uc0RhdGEgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdjb250YWluJyxcbiAgICAgICAgICAgIGxhYmVsOiAnY29udGFpbnMnLFxuICAgICAgICAgICAgb3BlcmF0b3I6ICc9PidcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2VxdWFsJyxcbiAgICAgICAgICAgIGxhYmVsOiAnZXF1YWxzJyxcbiAgICAgICAgICAgIG9wZXJhdG9yOiAnPT09J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnZ3JlYXRlckVxdWFsJyxcbiAgICAgICAgICAgIGxhYmVsOiAnZ3JlYXRlciBvciBlcXVhbCcsXG4gICAgICAgICAgICBvcGVyYXRvcjogJz49J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnZ3JlYXRlcicsXG4gICAgICAgICAgICBsYWJlbDogJ2dyZWF0ZXInLFxuICAgICAgICAgICAgb3BlcmF0b3I6ICc+J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnbGVzc0VxdWFsJyxcbiAgICAgICAgICAgIGxhYmVsOiAnbGVzcyBvciBlcXVhbCcsXG4gICAgICAgICAgICBvcGVyYXRvcjogJzw9J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnbGVzcycsXG4gICAgICAgICAgICBsYWJlbDogJ2xlc3MnLFxuICAgICAgICAgICAgb3BlcmF0b3I6ICc8J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnaW4nLFxuICAgICAgICAgICAgbGFiZWw6ICdpbicsXG4gICAgICAgICAgICBvcGVyYXRvcjogJ2luJ1xuICAgICAgICB9LFxuICAgIF07XG5cbiAgICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDprZXlkb3duJywgWyckZXZlbnQnXSlcbiAgICBoYW5kbGVLZXlib2FyZEV2ZW50KGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICgoZXZlbnQua2V5ID09PSAnYycgJiYgZXZlbnQuY3RybEtleSkpIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJGaWx0ZXJzKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5lZGl0aW5nICYmIGV2ZW50LmtleUNvZGUgPT09IDEzKSB7XG4gICAgICAgICAgICB0aGlzLmFkZEZpbHRlcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgY2hlY2tGaWx0ZXIoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAodGhpcy5zZWxlY3RlZEZpZWxkID09PSAnbm9uZScgfHwgdGhpcy5zZWxlY3RlZFZhbHVlID09PSAnJyk7XG4gICAgfVxuXG4gICAgYWRkRmlsdGVyKCkge1xuICAgICAgICBsZXQgY29sb3IgPSAnJyxcbiAgICAgICAgICAgIGZpZWxkID0gJycsXG4gICAgICAgICAgICBsYWJlbCA9ICcnLFxuICAgICAgICAgICAgbmFtZSA9ICcnLFxuICAgICAgICAgICAgZXhwbGFuYXRpb24gPSB0aGlzLnNlbGVjdGVkRmllbGQgKyAnICcgKyB0aGlzLm9wZXJhdGlvbnNbdGhpcy5vcGVyYXRpb25dICsgJyAnICsgdGhpcy5zZWxlY3RlZFZhbHVlO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gdGhpcy5maWx0ZXJPcHRpb25zLmZpZWxkcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmZpbHRlck9wdGlvbnMuZmllbGRzW2ldLm5hbWUgPT09IHRoaXMuc2VsZWN0ZWRGaWVsZCkge1xuICAgICAgICAgICAgICAgIC8vIGNvbG9yID0gdGhpcy5maWx0ZXJPcHRpb25zLmZpZWxkc1tpXS5jb2xvcjtcbiAgICAgICAgICAgICAgICAvLyBmaWVsZCA9IHRoaXMuZmlsdGVyT3B0aW9ucy5maWVsZHNbaV0uZmllbGQ7XG4gICAgICAgICAgICAgICAgLy8gbGFiZWwgPSB0aGlzLmZpbHRlck9wdGlvbnMuZmllbGRzW2ldLmxhYmVsO1xuICAgICAgICAgICAgICAgIC8vIG5hbWUgPSB0aGlzLmZpbHRlck9wdGlvbnMuZmllbGRzW2ldLm5hbWU7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogLi4ud2l0aCBvYmplY3QgZGVzdHJ1Y3R1cmluZ1xuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICh7IGNvbG9yLCBmaWVsZCwgbGFiZWwsIG5hbWUgfSA9IHRoaXMuZmlsdGVyT3B0aW9ucy5maWVsZHNbaV0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wZXJhdGlvbiA9PT0gJ2luJykge1xuICAgICAgICAgICAgZXhwbGFuYXRpb24gPSB0aGlzLnNlbGVjdGVkRmllbGQgKyAnICcgKyB0aGlzLm9wZXJhdGlvbnNbdGhpcy5vcGVyYXRpb25dICsgJyAoLi4uKSc7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5vcGVyYXRpb24gPT09ICdjb250YWluJykge1xuICAgICAgICAgICAgLy8gZXhwbGFuYXRpb24gPSB0aGlzLnNlbGVjdGVkRmllbGQgKyAnICcgKyB0aGlzLm9wZXJhdGlvbnNbdGhpcy5vcGVyYXRpb25dICsgJyAnICsgdGhpcy5zZWxlY3RlZFZhbHVlO1xuICAgICAgICAgICAgZXhwbGFuYXRpb24gPSAnXCInICsgdGhpcy5zZWxlY3RlZFZhbHVlICsgJ1wiICcgKyB0aGlzLm9wZXJhdGlvbnNbdGhpcy5vcGVyYXRpb25dICsgJyAnICsgdGhpcy5zZWxlY3RlZEZpZWxkO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYWN0aXZlRmlsdGVycy5wdXNoKHtcbiAgICAgICAgICAgIGNvbG9yOiBjb2xvcixcbiAgICAgICAgICAgIGV4cGxhbmF0aW9uOiBleHBsYW5hdGlvbixcbiAgICAgICAgICAgIGxhYmVsOiBsYWJlbCxcbiAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICBmaWVsZDogZmllbGQsXG4gICAgICAgICAgICBiaXR3aXNlOiAnJiYnLFxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLm9wZXJhdGlvbnNbdGhpcy5vcGVyYXRpb25dLFxuICAgICAgICAgICAgdmFsdWU6IHRoaXMuc2VsZWN0ZWRWYWx1ZVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFZhbHVlID0gJyc7XG4gICAgICAgIHRoaXMuY2hhbmdlLmVtaXQodGhpcy5hY3RpdmVGaWx0ZXJzKTtcbiAgICB9XG5cbiAgICBzZWxlY3RGaWx0ZXIoZmlsdGVyOiBGaWVsZEZpbHRlcikge1xuICAgICAgICBmaWx0ZXIuc2VsZWN0ZWQgPSAhZmlsdGVyLnNlbGVjdGVkO1xuICAgICAgICBjb25zdCBncm91cCA9IHRoaXMuZ2V0UGFyZW50RmlsdGVyKGZpbHRlcik7XG4gICAgICAgIGlmIChncm91cCkge1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkQWxsID0gdHJ1ZTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gZ3JvdXAuZmllbGRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRtcGZpbHRlciA9IGdyb3VwLmZpZWxkc1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoIXRtcGZpbHRlci5pc2dyb3VwICYmICF0bXBmaWx0ZXIuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRBbGwgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRBbGwpIHtcbiAgICAgICAgICAgICAgICBncm91cC5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRQYXJlbnRGaWx0ZXIoZmlsdGVyOiBGaWVsZEZpbHRlcik6IEZpZWxkRmlsdGVyIHwgbnVsbCB7XG4gICAgICAgIGNvbnN0IGdldFBhcmVudEZpbHRlckluR3JvdXAgPSAoZ3JvdXA6IEZpZWxkRmlsdGVyLCBmaWx0ZXIyOiBGaWVsZEZpbHRlcik6IEZpZWxkRmlsdGVyIHwgbnVsbCA9PiB7XG4gICAgICAgICAgICByZXQgPSBudWxsO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGdyb3VwLmZpZWxkcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0bXBmaWx0ZXIgPSBncm91cC5maWVsZHNbaV07XG4gICAgICAgICAgICAgICAgaWYgKEpTT04uc3RyaW5naWZ5KHRtcGZpbHRlcikgPT09IEpTT04uc3RyaW5naWZ5KGZpbHRlcjIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBncm91cDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRtcGZpbHRlci5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldCA9IGdldFBhcmVudEZpbHRlckluR3JvdXAodG1wZmlsdGVyLCBmaWx0ZXIyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgIH07XG4gICAgICAgIGxldCByZXQgPSBudWxsO1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IHRoaXMuYWN0aXZlRmlsdGVycy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHRtcGZpbHRlciA9IHRoaXMuYWN0aXZlRmlsdGVyc1tpXTtcbiAgICAgICAgICAgIGlmIChKU09OLnN0cmluZ2lmeSh0bXBmaWx0ZXIpID09PSBKU09OLnN0cmluZ2lmeShmaWx0ZXIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRtcGZpbHRlci5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgcmV0ID0gZ2V0UGFyZW50RmlsdGVySW5Hcm91cCh0bXBmaWx0ZXIsIGZpbHRlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH1cblxuICAgIGFycmF5TW92ZSA9IChhcnI6IGFueVtdLCBvbGRJbmRleDogbnVtYmVyLCBuZXdJbmRleDogbnVtYmVyKTogYW55W10gPT4ge1xuICAgICAgICBpZiAobmV3SW5kZXggPiBhcnIubGVuZ3RoKSB7XG4gICAgICAgICAgICBsZXQgayA9IG5ld0luZGV4IC0gYXJyLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlIChrLS0pIHtcbiAgICAgICAgICAgICAgICBhcnIucHVzaCh1bmRlZmluZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGFyci5zcGxpY2UobmV3SW5kZXgsIDAsIGFyci5zcGxpY2Uob2xkSW5kZXgsIDEpWzBdKTtcbiAgICAgICAgcmV0dXJuIGFycjtcbiAgICB9XG5cbiAgICBtb3ZlVG8oZGlyZWN0aW9uOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGlkeCA9IC0xLFxuICAgICAgICAgICAgdG9JZHggPSAtMSxcbiAgICAgICAgICAgIGdyb3VwID0gLTE7XG4gICAgICAgIC8vIFNlYXJjaGluZyB0aGUgc2VsZWN0ZWQgZmlsdGVyLi4uXG4gICAgICAgIHRoaXMuYWN0aXZlRmlsdGVycy5mb3JFYWNoKChmaWx0ZXIsIHRtcGlkeCkgPT4ge1xuICAgICAgICAgICAgaWYgKGZpbHRlci5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIGlkeCA9IHRtcGlkeDtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGZpbHRlci5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgZmlsdGVyLmZpZWxkcy5mb3JFYWNoKChmaWx0ZXIyLCB0bXBpZHgyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIyLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZHggPSB0bXBpZHgyO1xuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXAgPSB0bXBpZHg7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGlkeCA+PSAwKSB7XG5cbiAgICAgICAgICAgIGlmIChncm91cCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgdG9JZHggPSAoaWR4ICsgZGlyZWN0aW9uKSA+PSAwID8gaWR4ICsgZGlyZWN0aW9uIDogdGhpcy5hY3RpdmVGaWx0ZXJzW2dyb3VwXS5maWVsZHMubGVuZ3RoICsgZGlyZWN0aW9uO1xuICAgICAgICAgICAgICAgIGlmICh0b0lkeCA+PSB0aGlzLmFjdGl2ZUZpbHRlcnNbZ3JvdXBdLmZpZWxkcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9JZHggPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUZpbHRlcnNbZ3JvdXBdLmZpZWxkcyA9IHRoaXMuYXJyYXlNb3ZlKHRoaXMuYWN0aXZlRmlsdGVyc1tncm91cF0uZmllbGRzLCBpZHgsIHRvSWR4KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdG9JZHggPSAoaWR4ICsgZGlyZWN0aW9uKSA+PSAwID8gaWR4ICsgZGlyZWN0aW9uIDogdGhpcy5hY3RpdmVGaWx0ZXJzLmxlbmd0aCArIGRpcmVjdGlvbjtcbiAgICAgICAgICAgICAgICBpZiAodG9JZHggPj0gdGhpcy5hY3RpdmVGaWx0ZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0b0lkeCA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlRmlsdGVycyA9IHRoaXMuYXJyYXlNb3ZlKHRoaXMuYWN0aXZlRmlsdGVycywgaWR4LCB0b0lkeCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2hhbmdlLmVtaXQodGhpcy5hY3RpdmVGaWx0ZXJzKTtcblxuICAgIH1cblxuICAgIGdldFNlbGVjdGVkKCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IGdldEluR3JvdXAgPSAoZ3JvdXA6IEZpZWxkRmlsdGVyKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZ3JvdXAuZmllbGRzLnJlZHVjZSgoYWNjMiwgZmlsdGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlci5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjYzIgKz0gZ2V0SW5Hcm91cChmaWx0ZXIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZmlsdGVyLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjYzIrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjYzI7XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWN0aXZlRmlsdGVycy5yZWR1Y2UoKGFjYywgZmlsdGVyKSA9PiB7XG4gICAgICAgICAgICBpZiAoZmlsdGVyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICBhY2MgKz0gZ2V0SW5Hcm91cChmaWx0ZXIpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChmaWx0ZXIuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICBhY2MrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIH0sIDApO1xuXG4gICAgfVxuXG4gICAgY2xlYXJTZWxlY3Rpb24oKTogdm9pZCB7XG5cbiAgICAgICAgY29uc3QgY2xlYXJTZWxlY3Rpb25Jbkdyb3VwID0gKGdyb3VwKSA9PiB7XG4gICAgICAgICAgICBncm91cC5maWVsZHMuZm9yRWFjaCgoZmlsdGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlci5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpbHRlciA9IGNsZWFyU2VsZWN0aW9uSW5Hcm91cChmaWx0ZXIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZpbHRlci5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gZ3JvdXA7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5hY3RpdmVGaWx0ZXJzID0gdGhpcy5hY3RpdmVGaWx0ZXJzLm1hcCgoZmlsdGVyKSA9PiB7XG4gICAgICAgICAgICBpZiAoZmlsdGVyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICBmaWx0ZXIgPSBjbGVhclNlbGVjdGlvbkluR3JvdXAoZmlsdGVyKTtcbiAgICAgICAgICAgICAgICAvLyBmaWx0ZXIuZmllbGRzID0gZmlsdGVyLmZpZWxkcy5tYXAoKGZpbHRlcjIpID0+IHtcbiAgICAgICAgICAgICAgICAvLyAgICAgZmlsdGVyMi5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIC8vICAgICByZXR1cm4gZmlsdGVyMjtcbiAgICAgICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbHRlci5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIGZpbHRlcjtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBjaGFuZ2VCaXR3aXNlKGZpbHRlcjogRmllbGRGaWx0ZXIsIGJpdHdpc2UpIHtcbiAgICAgICAgZmlsdGVyLmJpdHdpc2UgPSBiaXR3aXNlO1xuICAgICAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMuYWN0aXZlRmlsdGVycyk7XG4gICAgfVxuXG4gICAgZ3JvdXBTZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgZ3JvdXBTZWxlY3RlZEluR3JvdXAgPSAoZmlsdGVyOiBGaWVsZEZpbHRlcikgPT4ge1xuICAgICAgICAgICAgbGV0IHJldDIgPSAwO1xuICAgICAgICAgICAgaWYgKGZpbHRlci5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgZmlsdGVyLmZpZWxkcy5mb3JFYWNoKChmaWx0ZXIyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldDIgKz0gZ3JvdXBTZWxlY3RlZEluR3JvdXAoZmlsdGVyMik7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyMi5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldDIrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXQyO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgZ3JvdXBzID0gdGhpcy5hY3RpdmVGaWx0ZXJzLmZpbHRlcihmaWx0ZXIgPT4gZmlsdGVyLmlzZ3JvdXApO1xuICAgICAgICBsZXQgcmV0ID0gMDtcbiAgICAgICAgZ3JvdXBzLmZvckVhY2goKGdyb3VwKSA9PiB7XG4gICAgICAgICAgICBncm91cC5maWVsZHMuZm9yRWFjaChmaWx0ZXIgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgICAgICByZXQgKz0gZ3JvdXBTZWxlY3RlZEluR3JvdXAoZmlsdGVyKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZpbHRlci5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXQrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXQgPiAwO1xuICAgIH1cblxuICAgIGVudGlyZUdyb3VwU2VsZWN0ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IGVudGlyZUdyb3VwU2VsZWN0ZWRJbkdyb3VwID0gKGdyb3VwOiBGaWVsZEZpbHRlcikgPT4ge1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkMiA9IHRydWU7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gZ3JvdXAuZmllbGRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpbHRlciA9IGdyb3VwLmZpZWxkc1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQyID0gZW50aXJlR3JvdXBTZWxlY3RlZEluR3JvdXAoZmlsdGVyKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFmaWx0ZXIuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQyID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdGVkMiAmJiBncm91cC5maWVsZHMubGVuZ3RoID4gMDtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgZ3JvdXBzID0gdGhpcy5hY3RpdmVGaWx0ZXJzLmZpbHRlcihmaWx0ZXIgPT4gZmlsdGVyLmlzZ3JvdXApO1xuICAgICAgICBsZXQgc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICBmb3IgKGxldCBpZyA9IDAsIGxnID0gZ3JvdXBzLmxlbmd0aDsgaWcgPCBsZzsgaWcrKykge1xuICAgICAgICAgICAgY29uc3QgZ3JvdXAgPSBncm91cHNbaWddO1xuICAgICAgICAgICAgZm9yIChsZXQgaWcyID0gMCwgbGcyID0gZ3JvdXAuZmllbGRzLmxlbmd0aDsgaWcyIDwgbGcyOyBpZzIrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpbHRlciA9IGdyb3VwLmZpZWxkc1tpZzJdO1xuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZCA9IGVudGlyZUdyb3VwU2VsZWN0ZWRJbkdyb3VwKGZpbHRlcik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFmaWx0ZXIuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBncm91cC5maWVsZHMuZm9yRWFjaChmaWx0ZXIgPT4ge1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBncm91cHMuZm9yRWFjaCgoZ3JvdXApID0+IHtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzZWxlY3RlZCAmJiBncm91cHMubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICBjcmVhdGVHcm91cCgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgY3JlYXRlSW5Hcm91cCA9IChmaWx0ZXI6IEZpZWxkRmlsdGVyKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZDIgPSBmaWx0ZXIuZmllbGRzLmZpbHRlcihmaWx0ZXIyID0+IGZpbHRlcjIuc2VsZWN0ZWQpLFxuICAgICAgICAgICAgZ3JvdXBQb3NpdGlvbjIgPSBmaWx0ZXIuZmllbGRzLmZpbmRJbmRleCh2ID0+IHYuc2VsZWN0ZWQpO1xuICAgICAgICAgICAgbGV0IHJlc3VsdEZpbHRlcjI6IEZpZWxkRmlsdGVyW107XG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWQyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdEZpbHRlcjIgPSBmaWx0ZXIuZmllbGRzLmZpbHRlcihmaWx0ZXIyID0+ICFmaWx0ZXIyLnNlbGVjdGVkKTtcbiAgICAgICAgICAgICAgICByZXN1bHRGaWx0ZXIyLnNwbGljZShncm91cFBvc2l0aW9uMiwgMCwge1xuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJycsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICcnLFxuICAgICAgICAgICAgICAgICAgICBmaWVsZDogJycsXG4gICAgICAgICAgICAgICAgICAgIGlzZ3JvdXA6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGJpdHdpc2U6ICcmJicsXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkczogc2VsZWN0ZWQyXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3VsdEZpbHRlcjIgPSBmaWx0ZXIuZmllbGRzLm1hcChmaWx0ZXIyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlcjIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlSW5Hcm91cChmaWx0ZXIyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmlsdGVyMjtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbHRlci5maWVsZHMgPSByZXN1bHRGaWx0ZXIyO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5hY3RpdmVGaWx0ZXJzLmZpbHRlcihmaWx0ZXIgPT4gZmlsdGVyLnNlbGVjdGVkKSxcbiAgICAgICAgICAgICAgZ3JvdXBQb3NpdGlvbiA9IHRoaXMuYWN0aXZlRmlsdGVycy5maW5kSW5kZXgodiA9PiB2LnNlbGVjdGVkKTtcbiAgICAgICAgbGV0IHJlc3VsdEZpbHRlcjogRmllbGRGaWx0ZXJbXTtcbiAgICAgICAgaWYgKHNlbGVjdGVkLmxlbmd0aCkge1xuICAgICAgICAgICAgcmVzdWx0RmlsdGVyID0gdGhpcy5hY3RpdmVGaWx0ZXJzLmZpbHRlcihmaWx0ZXIgPT4gIWZpbHRlci5zZWxlY3RlZCk7XG4gICAgICAgICAgICByZXN1bHRGaWx0ZXIuc3BsaWNlKGdyb3VwUG9zaXRpb24sIDAsIHtcbiAgICAgICAgICAgICAgICBjb2xvcjogJycsXG4gICAgICAgICAgICAgICAgbmFtZTogJycsXG4gICAgICAgICAgICAgICAgZmllbGQ6ICcnLFxuICAgICAgICAgICAgICAgIGlzZ3JvdXA6IHRydWUsXG4gICAgICAgICAgICAgICAgYml0d2lzZTogJyYmJyxcbiAgICAgICAgICAgICAgICBmaWVsZHM6IHNlbGVjdGVkXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlRmlsdGVycyA9IHJlc3VsdEZpbHRlcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdEZpbHRlciA9IHRoaXMuYWN0aXZlRmlsdGVycy5tYXAoZmlsdGVyID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlSW5Hcm91cChmaWx0ZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmlsdGVyO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMuYWN0aXZlRmlsdGVycyk7XG4gICAgfVxuXG4gICAgc2FuaXRpemVHcm91cHMoKSB7XG4gICAgICAgIGNvbnN0IHNhbml0aXplR3JvdXBzSW5Hcm91cCA9IChncm91cCwgcGFyZW50PzogRmllbGRGaWx0ZXIpID0+IHtcbiAgICAgICAgICAgIGdyb3VwLmZpZWxkcy5tYXAoKGZpbHRlcjogRmllbGRGaWx0ZXIsIGlkeDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlci5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIuZmllbGRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXAuZmllbGRzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZpbHRlci5maWVsZHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBncm91cC5maWVsZHMucHVzaCh7Li4uZmlsdGVyLmZpZWxkc1swXX0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXAuZmllbGRzLnNwbGljZShpZHgsIDEsIHsuLi5maWx0ZXIuZmllbGRzWzBdfSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzYW5pdGl6ZUdyb3Vwc0luR3JvdXAoZmlsdGVyLCBncm91cCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hY3RpdmVGaWx0ZXJzLm1hcCgoZmlsdGVyOiBGaWVsZEZpbHRlciwgaWR4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGlmIChmaWx0ZXIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIuZmllbGRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUZpbHRlcnMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmaWx0ZXIuZmllbGRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmFjdGl2ZUZpbHRlcnMucHVzaCh7Li4uZmlsdGVyLmZpZWxkc1swXX0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUZpbHRlcnMuc3BsaWNlKGlkeCwgMSwgey4uLmZpbHRlci5maWVsZHNbMF19KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNhbml0aXplR3JvdXBzSW5Hcm91cChmaWx0ZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVtb3ZlRnJvbUdyb3VwKCk6IHZvaWQge1xuICAgICAgICBjb25zdCByZW1vdmVGcm9tR3JvdXBJbkdyb3VwID0gKGdyb3VwOiBGaWVsZEZpbHRlciwgcGFyZW50OiBGaWVsZEZpbHRlciwgaWR4KSA9PiB7XG4gICAgICAgICAgICBncm91cC5maWVsZHMuZm9yRWFjaCgoZmlsdGVyMiwgaWR4MikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlRnJvbUdyb3VwSW5Hcm91cChmaWx0ZXIyLCBncm91cCwgaWR4Mik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCB0bXBGaWx0ZXJzID0gZ3JvdXAuZmllbGRzLmZpbHRlcigoZmlsdGVyMjogRmllbGRGaWx0ZXIpID0+IGZpbHRlcjIuc2VsZWN0ZWQpO1xuICAgICAgICAgICAgZ3JvdXAuZmllbGRzID0gZ3JvdXAuZmllbGRzLmZpbHRlcigoZmlsdGVyMjogRmllbGRGaWx0ZXIpID0+ICFmaWx0ZXIyLnNlbGVjdGVkKTtcbiAgICAgICAgICAgIHRtcEZpbHRlcnMuZm9yRWFjaCgodjogRmllbGRGaWx0ZXIpID0+IHtcbiAgICAgICAgICAgICAgICB2LnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcGFyZW50LmZpZWxkcy5wdXNoKHYpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoZ3JvdXAuZmllbGRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHBhcmVudC5maWVsZHMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5hY3RpdmVGaWx0ZXJzID0gdGhpcy5hY3RpdmVGaWx0ZXJzLnJlZHVjZSgobmV3RmlsdGVycywgZmlsdGVyKSA9PiB7XG4gICAgICAgICAgICBpZiAoZmlsdGVyLmlzZ3JvdXApIHtcblxuICAgICAgICAgICAgICAgIGZpbHRlci5maWVsZHMuZm9yRWFjaCgoZmlsdGVyMiwgaWR4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZUZyb21Hcm91cEluR3JvdXAoZmlsdGVyMiwgZmlsdGVyLCBpZHgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB0bXBGaWx0ZXJzID0gZmlsdGVyLmZpZWxkcy5maWx0ZXIoZmlsdGVyMiA9PiBmaWx0ZXIyLnNlbGVjdGVkKTtcbiAgICAgICAgICAgICAgICBmaWx0ZXIuZmllbGRzID0gZmlsdGVyLmZpZWxkcy5maWx0ZXIoZmlsdGVyMiA9PiAhZmlsdGVyMi5zZWxlY3RlZCk7XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlci5maWVsZHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld0ZpbHRlcnMucHVzaChmaWx0ZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0bXBGaWx0ZXJzLmZvckVhY2godiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG5ld0ZpbHRlcnMucHVzaCh2KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV3RmlsdGVycy5wdXNoKGZpbHRlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV3RmlsdGVycztcbiAgICAgICAgfSwgW10pO1xuICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgIHRoaXMuc2FuaXRpemVHcm91cHMoKTtcbiAgICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh0aGlzLmFjdGl2ZUZpbHRlcnMpO1xuICAgIH1cblxuICAgIG9uU3RhcnREcmFnRmlsdGVyKF9ldmVudCwgX2ZpbHRlcikge1xuICAgIH1cblxuICAgIG9uRHJvcHBlZEZpbHRlcihldmVudCkge1xuICAgICAgICB0aGlzLmFycmF5TW92ZSh0aGlzLmFjdGl2ZUZpbHRlcnMsIGV2ZW50LnByZXZpb3VzSW5kZXgsIGV2ZW50LmN1cnJlbnRJbmRleCk7XG4gICAgICAgIC8vIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgdGhpcy5zYW5pdGl6ZUdyb3VwcygpO1xuICAgICAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMuYWN0aXZlRmlsdGVycyk7XG4gICAgfVxuXG4gICAgdXBsb2FkU2V0KCkge1xuICAgICAgICBjb25zdCBmaWxlT2JqID0gKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWxlU2V0JykpLmZpbGVzWzBdO1xuICAgICAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgICByZWFkZXIub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbGluZXMgPSAoPHN0cmluZz5yZWFkZXIucmVzdWx0KS5zcGxpdCgvXFxyP1xcbi8pLmZpbHRlcih2YWwgPT4gdmFsID4gJycpO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFZhbHVlID0gbGluZXMuam9pbignLCAnKTtcbiAgICAgICAgICAgIHRoaXMuZmlsZVNldC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XG4gICAgICAgIH07XG4gICAgICAgIHJlYWRlci5yZWFkQXNUZXh0KGZpbGVPYmopO1xuICAgIH1cblxuICAgIHJlbW92ZUZpbHRlcihmaWx0ZXI6IEZpZWxkRmlsdGVyKTogdm9pZCB7XG4gICAgICAgIC8vIGNvbnN0IHJlbW92ZUZpbHRlckluR3JvdXAgPSAoZ3JvdXAsIGZpbHRlcikgPT4ge1xuXG4gICAgICAgIC8vIH07XG4gICAgICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuZ2V0UGFyZW50RmlsdGVyKGZpbHRlcik7XG4gICAgICAgIGxldCBncm91cDogRmllbGRGaWx0ZXJbXTtcbiAgICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICAgICAgZ3JvdXAgPSBwYXJlbnQuZmllbGRzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ3JvdXAgPSB0aGlzLmFjdGl2ZUZpbHRlcnM7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBncm91cC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChKU09OLnN0cmluZ2lmeShncm91cFtpXSkgPT09IEpTT04uc3RyaW5naWZ5KGZpbHRlcikpIHtcbiAgICAgICAgICAgICAgICBncm91cC5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zYW5pdGl6ZUdyb3VwcygpO1xuICAgICAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMuYWN0aXZlRmlsdGVycyk7XG4gICAgfVxuXG4gICAgY2xlYXJGaWx0ZXJzKCkge1xuICAgICAgICB0aGlzLmFjdGl2ZUZpbHRlcnMgPSBbXTtcbiAgICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh0aGlzLmFjdGl2ZUZpbHRlcnMpO1xuICAgIH1cblxuICAgIG9uRm9jdXMoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5lZGl0aW5nID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBvbkJsdXIoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5lZGl0aW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuZmlsdGVyT3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICAgICAgdGhpcy5zZWxlY3RlZEZpZWxkID0gKHR5cGVvZiB0aGlzLmZpbHRlck9wdGlvbnMuZmllbGRzWzBdICE9PSAndW5kZWZpbmVkJykgPyB0aGlzLmZpbHRlck9wdGlvbnMuZmllbGRzWzBdLm5hbWUgOiAnbm9uZSc7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5jb25maWcgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmNvbmZpZy5vcGVyYXRpb25zRGF0YSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wZXJhdGlvbnNEYXRhID0gdGhpcy5jb25maWcub3BlcmF0aW9uc0RhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuY29uZmlnLmZpbHRlciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUZpbHRlcnMgPSB0aGlzLmNvbmZpZy5maWx0ZXIuc2xpY2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyB0aGlzLmZpbHRlck9wdGlvbnMgPSBKU09OLnBhcnNlKHRoaXMub3B0aW9ucyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTWF0SWNvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2ljb24nO1xuaW1wb3J0IHsgTWF0U2VsZWN0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2VsZWN0JztcbmltcG9ydCB7IE1hdENoaXBzTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY2hpcHMnO1xuaW1wb3J0IHsgTWF0SW5wdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pbnB1dCc7XG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24nO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IE1hdFRvb2x0aXBNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90b29sdGlwJztcbmltcG9ydCB7IE1hdE1lbnVNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9tZW51JztcbmltcG9ydCB7IERyYWdEcm9wTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XG5cbmltcG9ydCB7IFRXQUZpbHRlckVkaXRvckNvbXBvbmVudCB9IGZyb20gJy4vdHdhLW1kMi1maWx0ZXItZWRpdG9yLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUV0FGaWx0ZXJFZGl0b3JTZXJ2aWNlIH0gZnJvbSAnLi90d2EtbWQyLWZpbHRlci1lZGl0b3Iuc2VydmljZSc7XG5pbXBvcnQgeyBGaWVsZEZpbHRlciB9IGZyb20gJy4vdHdhLW1kMi1maWx0ZXItZWRpdG9yLmludGVyZmFjZSc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgICAgICBNYXRJY29uTW9kdWxlLFxuICAgICAgICBNYXRTZWxlY3RNb2R1bGUsXG4gICAgICAgIE1hdENoaXBzTW9kdWxlLFxuICAgICAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICAgICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgICAgICBGbGV4TGF5b3V0TW9kdWxlLFxuICAgICAgICBNYXRUb29sdGlwTW9kdWxlLFxuICAgICAgICBNYXRNZW51TW9kdWxlLFxuICAgICAgICBEcmFnRHJvcE1vZHVsZSxcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBUV0FGaWx0ZXJFZGl0b3JDb21wb25lbnQsXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIFRXQUZpbHRlckVkaXRvckNvbXBvbmVudCxcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBUV0FGaWx0ZXJFZGl0b3JTZXJ2aWNlXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBUV0FGaWx0ZXJFZGl0b3JNb2R1bGUge31cbiJdLCJuYW1lcyI6WyJJbmplY3RhYmxlIiwiRXZlbnRFbWl0dGVyIiwiQ29tcG9uZW50IiwiSW5wdXQiLCJPdXRwdXQiLCJWaWV3Q2hpbGQiLCJIb3N0TGlzdGVuZXIiLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSIsIkZvcm1zTW9kdWxlIiwiUmVhY3RpdmVGb3Jtc01vZHVsZSIsIk1hdEljb25Nb2R1bGUiLCJNYXRTZWxlY3RNb2R1bGUiLCJNYXRDaGlwc01vZHVsZSIsIk1hdElucHV0TW9kdWxlIiwiTWF0QnV0dG9uTW9kdWxlIiwiRmxleExheW91dE1vZHVsZSIsIk1hdFRvb2x0aXBNb2R1bGUiLCJNYXRNZW51TW9kdWxlIiwiRHJhZ0Ryb3BNb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7OztJQUFBOzs7Ozs7Ozs7Ozs7OztBQWNBLElBZU8sSUFBSSxRQUFRLEdBQUc7UUFDbEIsUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLElBQUksU0FBUyxRQUFRLENBQUMsQ0FBQztZQUMzQyxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDakQsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakIsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUFFLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7d0JBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNoRjtZQUNELE9BQU8sQ0FBQyxDQUFDO1NBQ1osQ0FBQTtRQUNELE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDM0MsQ0FBQyxDQUFBOzs7Ozs7O1FDakNEO1lBQUEsaUJBdUtDO1lBckZHLHFCQUFnQixHQUFHLFVBQUMsT0FBTzs7b0JBQ25CLFlBQVksR0FBRyxDQUFDOztvQkFDZCxVQUFVLEdBQUcsRUFBRTtnQkFDckIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQUMsRUFBRSxDQUFDO29CQUNqQixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sS0FBSyxJQUFJLEVBQUU7d0JBQzdCLFlBQVksRUFBRSxDQUFDO3dCQUNmLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7cUJBQ3ZCO29CQUNELElBQUksUUFBTyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxXQUFXLEVBQUU7d0JBQ2xELFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7cUJBQ3ZCO29CQUNELElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRTs7NEJBQ0wsUUFBUSxnQkFBTyxDQUFDLElBQUUsTUFBTSxFQUFFLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUM7O3dCQUVoRSxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3FCQUMzQzt5QkFBTTt3QkFDSCxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUNwQztpQkFDSixDQUFDLENBQUM7Z0JBRUgsT0FBTyxVQUFVLENBQUM7YUFDckIsQ0FBQTtZQUVELGVBQVUsR0FBRyxVQUFDLE1BQVcsRUFBRSxXQUFnQjs7b0JBRWpDLFdBQVcsR0FBRztvQkFDaEIsSUFBSSxFQUFFLFVBQUMsQ0FBUyxFQUFFLENBQVMsSUFBSyxPQUFBLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUE7b0JBQzdDLEtBQUssRUFBRSxVQUFDLENBQU0sRUFBRSxDQUFNLElBQUssT0FBQSxDQUFDLEtBQUssQ0FBQyxHQUFBO29CQUNsQyxJQUFJLEVBQUUsVUFBQyxDQUFNLEVBQUUsQ0FBTSxJQUFLLE9BQUEsQ0FBQyxJQUFJLENBQUMsR0FBQTtvQkFDaEMsR0FBRyxFQUFFLFVBQUMsQ0FBTSxFQUFFLENBQU0sSUFBSyxPQUFBLENBQUMsR0FBRyxDQUFDLEdBQUE7b0JBQzlCLElBQUksRUFBRSxVQUFDLENBQU0sRUFBRSxDQUFNLElBQUssT0FBQSxDQUFDLElBQUksQ0FBQyxHQUFBO29CQUNoQyxHQUFHLEVBQUUsVUFBQyxDQUFNLEVBQUUsQ0FBTSxJQUFLLE9BQUEsQ0FBQyxHQUFHLENBQUMsR0FBQTtvQkFDOUIsSUFBSSxFQUFFLFVBQUMsQ0FBTSxFQUFFLENBQU0sSUFBSyxPQUFBLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFBO2lCQUNyRDs7b0JBRUcsUUFBUSxHQUFHLEtBQUs7Z0JBRXBCLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRTtvQkFDaEIsUUFBUSxHQUFHLEtBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO2lCQUNwRDtxQkFBTTtvQkFDSCxJQUFJLEtBQUksQ0FBQyxXQUFXLEVBQUU7d0JBQ2xCLEtBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO3FCQUN6QztvQkFDRCxJQUFJO3dCQUNBLElBQUksT0FBTyxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLFFBQVEsS0FBSyxNQUFNLENBQUMsU0FBUyxLQUFLLElBQUksSUFBSSxNQUFNLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQyxFQUFFOzRCQUMzRyxRQUFRLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQzFCLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO3lCQUMzRDs2QkFBTTs0QkFDSCxRQUFRLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUMvQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7eUJBQ2hGO3FCQUNKO29CQUFDLFdBQU07d0JBQ0osUUFBUSxHQUFHLEtBQUssQ0FBQztxQkFDcEI7aUJBQ0o7Z0JBRUQsT0FBTyxRQUFRLENBQUM7YUFFbkIsQ0FBQTtZQUVELGdCQUFXLEdBQUcsVUFBQyxNQUFXLEVBQUUsV0FBZ0I7O29CQUVsQyxPQUFPLEdBQUcsRUFBRTt3Q0FFVCxDQUFDLEVBQU0sQ0FBQzs7d0JBQ1AsUUFBUSxHQUFHLEVBQUU7b0JBQ25CLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBUTt3QkFDL0IsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDO3FCQUNqRCxDQUFDLENBQUM7b0JBQ0gsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFVBQUMsR0FBRyxFQUFFLEVBQUU7d0JBQ2pDLElBQUksQ0FBQyxFQUFFLEVBQUU7NEJBQ0wsR0FBRyxHQUFHLEVBQUUsQ0FBQzt5QkFDWjt3QkFDRCxPQUFPLEdBQUcsQ0FBQztxQkFDZCxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7aUJBQ2I7Z0JBWEQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFOzRCQUEzQyxDQUFDLEVBQU0sQ0FBQztpQkFXaEI7Z0JBRUQsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQUMsR0FBRyxFQUFFLENBQUM7b0JBQ3pCLElBQUksQ0FBQyxFQUFFO3dCQUNILEdBQUcsR0FBRyxDQUFDLENBQUM7cUJBQ1g7b0JBQ0QsT0FBTyxHQUFHLENBQUM7aUJBQ2QsRUFBRSxLQUFLLENBQUMsQ0FBQzthQUViLENBQUE7U0FDSjs7Ozs7OztRQTVKRyxxQ0FBSTs7Ozs7O1lBQUosVUFDSSxNQUFnQyxFQUNoQyxJQUFXLEVBQ1gsV0FBc0I7Z0JBSDFCLGlCQWNDO2dCQVRHLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO2dCQUNyQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztnQkFDakIsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7Z0JBRS9CLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFDLE9BQXNCO29CQUNoRCxLQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztvQkFDdkIsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2lCQUN0QixDQUFDLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQzVFOzs7OztRQUVELDRDQUFXOzs7O1lBQVgsVUFBWSxJQUF3QjtnQkFBcEMsaUJBb0JDO2dCQXBCVyxxQkFBQTtvQkFBQSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFOzs7O29CQUc1QixHQUFHLEdBQUcsSUFBSTs7b0JBQ1IsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNO2dCQUUxQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBRXpFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO2dCQUVqQixJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQUksRUFBRSxHQUFHO29CQUN0QixJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztvQkFDckIsT0FBTyxJQUFJLENBQUM7aUJBQ2YsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFDLElBQVM7b0JBQ2hCLEdBQUcsR0FBRyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ2xDLE9BQU8sR0FBRyxDQUFDO2lCQUNkLENBQUMsQ0FBQztnQkFFSCxPQUFPLElBQUksQ0FBQzthQUVmOzs7OztRQUVELGlEQUFnQjs7OztZQUFoQixVQUFpQixJQUFJO2dCQUFyQixpQkErQkM7O29CQTdCTyxHQUFHLEdBQUcsSUFBSTs7b0JBQ1IsT0FBTyxHQUFHLEVBQUU7d0NBRVQsQ0FBQyxFQUFNLENBQUM7O3dCQUNQLFFBQVEsR0FBRyxFQUFFO29CQUNuQixPQUFLLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQWM7d0JBQzVDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztxQkFDM0MsQ0FBQyxDQUFDO29CQUNILE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFDLEdBQUcsRUFBRSxDQUFDO3dCQUNoQyxJQUFJLENBQUMsQ0FBQyxFQUFFOzRCQUNKLEdBQUcsR0FBRyxDQUFDLENBQUM7eUJBQ1g7d0JBQ0QsT0FBTyxHQUFHLENBQUM7cUJBQ2QsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO2lCQUNiOztnQkFYRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTs0QkFBbkQsQ0FBQyxFQUFNLENBQUM7aUJBV2hCO2dCQUVELElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTtvQkFDaEIsR0FBRyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBQyxHQUFHLEVBQUUsQ0FBQzt3QkFDeEIsSUFBSSxDQUFDLEVBQUU7NEJBQ0gsR0FBRyxHQUFHLENBQUMsQ0FBQzt5QkFDWDt3QkFDRCxPQUFPLEdBQUcsQ0FBQztxQkFDZCxFQUFFLEtBQUssQ0FBQyxDQUFDO2lCQUNiO3FCQUFNO29CQUNILEdBQUcsR0FBRyxJQUFJLENBQUM7aUJBQ2Q7Z0JBRUQsT0FBTyxHQUFHLENBQUM7YUFFZDs7b0JBaEZKQSxlQUFVOztRQXVLWCw2QkFBQztLQUFBOzs7Ozs7O1FDd0VHO1lBbEVVLFdBQU0sR0FBd0IsSUFBSUMsaUJBQVksRUFBUyxDQUFDO1lBS2xFLGtCQUFhLEdBQUcsTUFBTSxDQUFDO1lBQ3ZCLGtCQUFhLEdBQUcsRUFBRSxDQUFDO1lBQ25CLGNBQVMsR0FBRyxTQUFTLENBQUM7WUFDdEIsa0JBQWEsR0FBa0IsRUFBRSxDQUFDO1lBQ2xDLFlBQU8sR0FBRyxLQUFLLENBQUM7WUFDaEIsZUFBVSxHQUFRO2dCQUNkLE9BQU8sRUFBRSxJQUFJO2dCQUNiLEtBQUssRUFBRSxLQUFLO2dCQUNaLFlBQVksRUFBRSxJQUFJO2dCQUNsQixPQUFPLEVBQUUsR0FBRztnQkFDWixTQUFTLEVBQUUsSUFBSTtnQkFDZixJQUFJLEVBQUUsR0FBRztnQkFDVCxFQUFFLEVBQUUsSUFBSTthQUNYLENBQUM7WUFDRixtQkFBYyxHQUFHO2dCQUNiO29CQUNJLElBQUksRUFBRSxTQUFTO29CQUNmLEtBQUssRUFBRSxVQUFVO29CQUNqQixRQUFRLEVBQUUsSUFBSTtpQkFDakI7Z0JBQ0Q7b0JBQ0ksSUFBSSxFQUFFLE9BQU87b0JBQ2IsS0FBSyxFQUFFLFFBQVE7b0JBQ2YsUUFBUSxFQUFFLEtBQUs7aUJBQ2xCO2dCQUNEO29CQUNJLElBQUksRUFBRSxjQUFjO29CQUNwQixLQUFLLEVBQUUsa0JBQWtCO29CQUN6QixRQUFRLEVBQUUsSUFBSTtpQkFDakI7Z0JBQ0Q7b0JBQ0ksSUFBSSxFQUFFLFNBQVM7b0JBQ2YsS0FBSyxFQUFFLFNBQVM7b0JBQ2hCLFFBQVEsRUFBRSxHQUFHO2lCQUNoQjtnQkFDRDtvQkFDSSxJQUFJLEVBQUUsV0FBVztvQkFDakIsS0FBSyxFQUFFLGVBQWU7b0JBQ3RCLFFBQVEsRUFBRSxJQUFJO2lCQUNqQjtnQkFDRDtvQkFDSSxJQUFJLEVBQUUsTUFBTTtvQkFDWixLQUFLLEVBQUUsTUFBTTtvQkFDYixRQUFRLEVBQUUsR0FBRztpQkFDaEI7Z0JBQ0Q7b0JBQ0ksSUFBSSxFQUFFLElBQUk7b0JBQ1YsS0FBSyxFQUFFLElBQUk7b0JBQ1gsUUFBUSxFQUFFLElBQUk7aUJBQ2pCO2FBQ0osQ0FBQztZQXNHRixjQUFTLEdBQUcsVUFBQyxHQUFVLEVBQUUsUUFBZ0IsRUFBRSxRQUFnQjtnQkFDdkQsSUFBSSxRQUFRLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRTs7d0JBQ25CLENBQUMsR0FBRyxRQUFRLEdBQUcsR0FBRyxDQUFDLE1BQU07b0JBQzdCLE9BQU8sQ0FBQyxFQUFFLEVBQUU7d0JBQ1IsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztxQkFDdkI7aUJBQ0o7Z0JBQ0QsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BELE9BQU8sR0FBRyxDQUFDO2FBQ2QsQ0FBQTtTQXBHZTs7Ozs7UUFSaEIsc0RBQW1COzs7O1lBRG5CLFVBQ29CLEtBQW9CO2dCQUNwQyxLQUFLLEtBQUssQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxPQUFPLEdBQUc7b0JBQ3RDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztpQkFDdkI7cUJBQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssRUFBRSxFQUFFO29CQUM3QyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7aUJBQ3BCO2FBQ0o7Ozs7UUFJRCw4Q0FBVzs7O1lBQVg7Z0JBQ0ksUUFBUSxJQUFJLENBQUMsYUFBYSxLQUFLLE1BQU0sSUFBSSxJQUFJLENBQUMsYUFBYSxLQUFLLEVBQUUsRUFBRTthQUN2RTs7OztRQUVELDRDQUFTOzs7WUFBVDs7O29CQUNRLEtBQUssR0FBRyxFQUFFOztvQkFDVixLQUFLLEdBQUcsRUFBRTs7b0JBQ1YsS0FBSyxHQUFHLEVBQUU7O29CQUNWLElBQUksR0FBRyxFQUFFOztvQkFDVCxXQUFXLEdBQUcsSUFBSSxDQUFDLGFBQWEsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxhQUFhO2dCQUV2RyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQzlELElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxhQUFhLEVBQUU7Ozs7Ozs7O3dCQVExRCxDQUFDLGlDQUE0RCxFQUExRCxnQkFBSyxFQUFFLGdCQUFLLEVBQUUsZ0JBQUssRUFBRSxjQUFJLEVBQW1DO3dCQUMvRCxNQUFNO3FCQUNUO2lCQUNKO2dCQUNELElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxJQUFJLEVBQUU7b0JBQ3pCLFdBQVcsR0FBRyxJQUFJLENBQUMsYUFBYSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxRQUFRLENBQUM7aUJBQ3ZGO3FCQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxTQUFTLEVBQUU7O29CQUVyQyxXQUFXLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO2lCQUM5RztnQkFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztvQkFDcEIsS0FBSyxFQUFFLEtBQUs7b0JBQ1osV0FBVyxFQUFFLFdBQVc7b0JBQ3hCLEtBQUssRUFBRSxLQUFLO29CQUNaLElBQUksRUFBRSxJQUFJO29CQUNWLEtBQUssRUFBRSxLQUFLO29CQUNaLE9BQU8sRUFBRSxJQUFJO29CQUNiLFNBQVMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7b0JBQzFDLEtBQUssRUFBRSxJQUFJLENBQUMsYUFBYTtpQkFDNUIsQ0FBQyxDQUFDO2dCQUNILElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO2dCQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDeEM7Ozs7O1FBRUQsK0NBQVk7Ozs7WUFBWixVQUFhLE1BQW1CO2dCQUM1QixNQUFNLENBQUMsUUFBUSxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQzs7b0JBQzdCLEtBQUssR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQztnQkFDMUMsSUFBSSxLQUFLLEVBQUU7O3dCQUNILFdBQVcsR0FBRyxJQUFJO29CQUN0QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTs7NEJBQzNDLFNBQVMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzt3QkFDakMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFOzRCQUMzQyxXQUFXLEdBQUcsS0FBSyxDQUFDO3lCQUN2QjtxQkFDSjtvQkFDRCxJQUFJLFdBQVcsRUFBRTt3QkFDYixLQUFLLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztxQkFDekI7aUJBQ0o7YUFDSjs7Ozs7UUFFRCxrREFBZTs7OztZQUFmLFVBQWdCLE1BQW1COztvQkFDekIsc0JBQXNCLEdBQUcsVUFBQyxLQUFrQixFQUFFLE9BQW9CO29CQUNwRSxHQUFHLEdBQUcsSUFBSSxDQUFDO29CQUVYLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFOzs0QkFDM0MsU0FBUyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO3dCQUNqQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRTs0QkFDdkQsT0FBTyxLQUFLLENBQUM7eUJBQ2hCOzZCQUFNLElBQUksU0FBUyxDQUFDLE9BQU8sRUFBRTs0QkFDMUIsR0FBRyxHQUFHLHNCQUFzQixDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQzt5QkFDcEQ7cUJBQ0o7b0JBRUQsT0FBTyxHQUFHLENBQUM7aUJBQ2Q7O29CQUNHLEdBQUcsR0FBRyxJQUFJO2dCQUNkLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFOzt3QkFDakQsU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO29CQUN2QyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRTt3QkFDdEQsT0FBTyxJQUFJLENBQUM7cUJBQ2Y7eUJBQU0sSUFBSSxTQUFTLENBQUMsT0FBTyxFQUFFO3dCQUMxQixHQUFHLEdBQUcsc0JBQXNCLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO3FCQUNuRDtpQkFDSjtnQkFFRCxPQUFPLEdBQUcsQ0FBQzthQUNkOzs7OztRQWFELHlDQUFNOzs7O1lBQU4sVUFBTyxTQUFpQjs7b0JBQ2hCLEdBQUcsR0FBRyxDQUFDLENBQUM7O29CQUNSLEtBQUssR0FBRyxDQUFDLENBQUM7O29CQUNWLEtBQUssR0FBRyxDQUFDLENBQUM7O2dCQUVkLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQUMsTUFBTSxFQUFFLE1BQU07b0JBQ3RDLElBQUksTUFBTSxDQUFDLFFBQVEsRUFBRTt3QkFDakIsR0FBRyxHQUFHLE1BQU0sQ0FBQzt3QkFDYixPQUFPO3FCQUNWO3lCQUFNLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRTt3QkFDdkIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsT0FBTzs0QkFDbkMsSUFBSSxPQUFPLENBQUMsUUFBUSxFQUFFO2dDQUNsQixHQUFHLEdBQUcsT0FBTyxDQUFDO2dDQUNkLEtBQUssR0FBRyxNQUFNLENBQUM7Z0NBQ2YsT0FBTzs2QkFDVjt5QkFDSixDQUFDLENBQUM7cUJBQ047aUJBQ0osQ0FBQyxDQUFDO2dCQUVILElBQUksR0FBRyxJQUFJLENBQUMsRUFBRTtvQkFFVixJQUFJLEtBQUssSUFBSSxDQUFDLEVBQUU7d0JBQ1osS0FBSyxHQUFHLENBQUMsR0FBRyxHQUFHLFNBQVMsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO3dCQUN2RyxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7NEJBQ2xELEtBQUssR0FBRyxDQUFDLENBQUM7eUJBQ2I7d0JBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7cUJBQ25HO3lCQUFNO3dCQUNILEtBQUssR0FBRyxDQUFDLEdBQUcsR0FBRyxTQUFTLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxTQUFTLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO3dCQUN6RixJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRTs0QkFDcEMsS0FBSyxHQUFHLENBQUMsQ0FBQzt5QkFDYjt3QkFDRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7cUJBQ3ZFO2lCQUVKO2dCQUVELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUV4Qzs7OztRQUVELDhDQUFXOzs7WUFBWDs7b0JBQ1UsVUFBVSxHQUFHLFVBQUMsS0FBa0I7b0JBQ2xDLE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBQyxJQUFJLEVBQUUsTUFBTTt3QkFDcEMsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFOzRCQUNoQixJQUFJLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3lCQUM5Qjs2QkFBTSxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUU7NEJBQ3hCLElBQUksRUFBRSxDQUFDO3lCQUNWO3dCQUNELE9BQU8sSUFBSSxDQUFDO3FCQUNmLEVBQUUsQ0FBQyxDQUFDLENBQUM7aUJBQ1Q7Z0JBQ0QsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxVQUFDLEdBQUcsRUFBRSxNQUFNO29CQUN6QyxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7d0JBQ2hCLEdBQUcsSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7cUJBQzdCO3lCQUFNLElBQUksTUFBTSxDQUFDLFFBQVEsRUFBRTt3QkFDeEIsR0FBRyxFQUFFLENBQUM7cUJBQ1Q7b0JBQ0QsT0FBTyxHQUFHLENBQUM7aUJBQ2QsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUVUOzs7O1FBRUQsaURBQWM7OztZQUFkOztvQkFFVSxxQkFBcUIsR0FBRyxVQUFDLEtBQUs7b0JBQ2hDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUMsTUFBTTt3QkFDeEIsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFOzRCQUNoQixNQUFNLEdBQUcscUJBQXFCLENBQUMsTUFBTSxDQUFDLENBQUM7eUJBQzFDOzZCQUFNOzRCQUNILE1BQU0sQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO3lCQUMzQjtxQkFDSixDQUFDLENBQUM7b0JBRUgsT0FBTyxLQUFLLENBQUM7aUJBQ2hCO2dCQUVELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsVUFBQyxNQUFNO29CQUMvQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7d0JBQ2hCLE1BQU0sR0FBRyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7Ozs7cUJBSzFDO29CQUNELE1BQU0sQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO29CQUN4QixPQUFPLE1BQU0sQ0FBQztpQkFDakIsQ0FBQyxDQUFDO2FBRU47Ozs7OztRQUVELGdEQUFhOzs7OztZQUFiLFVBQWMsTUFBbUIsRUFBRSxPQUFPO2dCQUN0QyxNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztnQkFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQ3hDOzs7O1FBRUQsZ0RBQWE7OztZQUFiOztvQkFDVSxvQkFBb0IsR0FBRyxVQUFDLE1BQW1COzt3QkFDekMsSUFBSSxHQUFHLENBQUM7b0JBQ1osSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFO3dCQUNoQixNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFDLE9BQU87NEJBQzFCLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRTtnQ0FDakIsSUFBSSxJQUFJLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDOzZCQUN6QztpQ0FBTTtnQ0FDSCxJQUFJLE9BQU8sQ0FBQyxRQUFRLEVBQUU7b0NBQ2xCLElBQUksRUFBRSxDQUFDO2lDQUNWOzZCQUNKO3lCQUNKLENBQUMsQ0FBQzt3QkFDSCxPQUFPLElBQUksQ0FBQztxQkFDZjt5QkFBTTt3QkFDSCxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUU7NEJBQ2pCLE9BQU8sQ0FBQyxDQUFDO3lCQUNaO3FCQUNKO2lCQUNKOztvQkFDSyxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxNQUFNLENBQUMsT0FBTyxHQUFBLENBQUM7O29CQUM5RCxHQUFHLEdBQUcsQ0FBQztnQkFDWCxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBSztvQkFDakIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQSxNQUFNO3dCQUN2QixJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7NEJBQ2hCLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQzt5QkFDdkM7NkJBQU0sSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFOzRCQUN4QixHQUFHLEVBQUUsQ0FBQzt5QkFDVDtxQkFDSixDQUFDLENBQUM7aUJBQ04sQ0FBQyxDQUFDO2dCQUNILE9BQU8sR0FBRyxHQUFHLENBQUMsQ0FBQzthQUNsQjs7OztRQUVELHNEQUFtQjs7O1lBQW5COztvQkFDVSwwQkFBMEIsR0FBRyxVQUFDLEtBQWtCOzt3QkFDOUMsU0FBUyxHQUFHLElBQUk7b0JBRXBCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFOzs0QkFDM0MsTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO3dCQUM5QixJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7NEJBQ2hCLFNBQVMsR0FBRywwQkFBMEIsQ0FBQyxNQUFNLENBQUMsQ0FBQzs0QkFDL0MsSUFBSSxTQUFTLEVBQUU7Z0NBQ1gsT0FBTyxJQUFJLENBQUM7NkJBQ2Y7eUJBQ0o7NkJBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7NEJBQ3pCLFNBQVMsR0FBRyxLQUFLLENBQUM7eUJBQ3JCO3FCQUNKO29CQUNELE9BQU8sU0FBUyxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztpQkFDL0M7O29CQUNLLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUEsQ0FBQzs7b0JBQzlELFFBQVEsR0FBRyxJQUFJO2dCQUNuQixLQUFLLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFOzt3QkFDMUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUM7b0JBQ3hCLEtBQUssSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFOzs0QkFDckQsTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO3dCQUNoQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7NEJBQ2hCLFFBQVEsR0FBRywwQkFBMEIsQ0FBQyxNQUFNLENBQUMsQ0FBQzs0QkFDOUMsSUFBSSxRQUFRLEVBQUU7Z0NBQ1YsT0FBTyxJQUFJLENBQUM7NkJBQ2Y7eUJBQ0o7NkJBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7NEJBQ3pCLFFBQVEsR0FBRyxLQUFLLENBQUM7eUJBQ3BCO3FCQUNKO29CQUNELEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUEsTUFBTTtxQkFDMUIsQ0FBQyxDQUFDO29CQUNILElBQUksUUFBUSxFQUFFO3dCQUNWLE9BQU8sSUFBSSxDQUFDO3FCQUNmO2lCQUNKO2dCQUNELE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLO2lCQUNwQixDQUFDLENBQUM7Z0JBQ0gsT0FBTyxRQUFRLElBQUksTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7YUFDeEM7Ozs7UUFFRCw4Q0FBVzs7O1lBQVg7O29CQUNVLGFBQWEsR0FBRyxVQUFDLE1BQW1COzt3QkFDaEMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLFFBQVEsR0FBQSxDQUFDOzt3QkFDbkUsY0FBYyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLFFBQVEsR0FBQSxDQUFDOzt3QkFDckQsYUFBNEI7b0JBQ2hDLElBQUksU0FBUyxDQUFDLE1BQU0sRUFBRTt3QkFDbEIsYUFBYSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFBLENBQUMsQ0FBQzt3QkFDbkUsYUFBYSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQyxFQUFFOzRCQUNwQyxLQUFLLEVBQUUsRUFBRTs0QkFDVCxJQUFJLEVBQUUsRUFBRTs0QkFDUixLQUFLLEVBQUUsRUFBRTs0QkFDVCxPQUFPLEVBQUUsSUFBSTs0QkFDYixPQUFPLEVBQUUsSUFBSTs0QkFDYixNQUFNLEVBQUUsU0FBUzt5QkFDcEIsQ0FBQyxDQUFDO3FCQUNOO3lCQUFNO3dCQUNILGFBQWEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFBLE9BQU87NEJBQ3JDLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRTtnQ0FDakIsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDOzZCQUMxQjs0QkFDRCxPQUFPLE9BQU8sQ0FBQzt5QkFDbEIsQ0FBQyxDQUFDO3FCQUNOO29CQUNELE1BQU0sQ0FBQyxNQUFNLEdBQUcsYUFBYSxDQUFDO2lCQUNqQzs7b0JBRUssUUFBUSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsTUFBTSxDQUFDLFFBQVEsR0FBQSxDQUFDOztvQkFDL0QsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLFFBQVEsR0FBQSxDQUFDOztvQkFDL0QsWUFBMkI7Z0JBQy9CLElBQUksUUFBUSxDQUFDLE1BQU0sRUFBRTtvQkFDakIsWUFBWSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFBLENBQUMsQ0FBQztvQkFDckUsWUFBWSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxFQUFFO3dCQUNsQyxLQUFLLEVBQUUsRUFBRTt3QkFDVCxJQUFJLEVBQUUsRUFBRTt3QkFDUixLQUFLLEVBQUUsRUFBRTt3QkFDVCxPQUFPLEVBQUUsSUFBSTt3QkFDYixPQUFPLEVBQUUsSUFBSTt3QkFDYixNQUFNLEVBQUUsUUFBUTtxQkFDbkIsQ0FBQyxDQUFDO29CQUNILElBQUksQ0FBQyxhQUFhLEdBQUcsWUFBWSxDQUFDO2lCQUNyQztxQkFBTTtvQkFDSCxZQUFZLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsVUFBQSxNQUFNO3dCQUN4QyxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7NEJBQ2hCLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQzt5QkFDekI7d0JBQ0QsT0FBTyxNQUFNLENBQUM7cUJBQ2pCLENBQUMsQ0FBQztpQkFDTjtnQkFDRCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUN4Qzs7OztRQUVELGlEQUFjOzs7WUFBZDtnQkFBQSxpQkEyQkM7O29CQTFCUyxxQkFBcUIsR0FBRyxVQUFDLEtBQUssRUFBRSxNQUFvQjtvQkFDdEQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQyxNQUFtQixFQUFFLEdBQVc7d0JBQzlDLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRTs0QkFDaEIsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0NBQzVCLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQzs2QkFDL0I7aUNBQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7O2dDQUVuQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxlQUFNLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQzs2QkFDdEQ7aUNBQU07Z0NBQ0gscUJBQXFCLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDOzZCQUN4Qzt5QkFDSjtxQkFDSixDQUFDLENBQUM7aUJBQ047Z0JBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsVUFBQyxNQUFtQixFQUFFLEdBQVc7b0JBQ3BELElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRTt3QkFDaEIsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7NEJBQzVCLEtBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQzt5QkFDckM7NkJBQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7OzRCQUVuQyxLQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxlQUFNLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQzt5QkFDaEU7NkJBQU07NEJBQ0MscUJBQXFCLENBQUMsTUFBTSxDQUFDLENBQUM7eUJBQ2pDO3FCQUNKO2lCQUNKLENBQUMsQ0FBQzthQUNOOzs7O1FBRUQsa0RBQWU7OztZQUFmOztvQkFDVSxzQkFBc0IsR0FBRyxVQUFDLEtBQWtCLEVBQUUsTUFBbUIsRUFBRSxHQUFHO29CQUN4RSxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxJQUFJO3dCQUMvQixJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUU7NEJBQ2pCLHNCQUFzQixDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7eUJBQ2hEO3FCQUNKLENBQUMsQ0FBQzs7d0JBQ0csVUFBVSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQUMsT0FBb0IsSUFBSyxPQUFBLE9BQU8sQ0FBQyxRQUFRLEdBQUEsQ0FBQztvQkFDbEYsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFDLE9BQW9CLElBQUssT0FBQSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUEsQ0FBQyxDQUFDO29CQUNoRixVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBYzt3QkFDOUIsQ0FBQyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7d0JBQ25CLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUN6QixDQUFDLENBQUM7b0JBQ0gsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7d0JBQzNCLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztxQkFDaEM7aUJBQ0o7Z0JBRUQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxVQUFDLFVBQVUsRUFBRSxNQUFNO29CQUM5RCxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7d0JBRWhCLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLEdBQUc7NEJBQy9CLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRTtnQ0FDakIsc0JBQXNCLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQzs2QkFDaEQ7eUJBQ0osQ0FBQyxDQUFDOzs0QkFFRyxVQUFVLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsUUFBUSxHQUFBLENBQUM7d0JBQ3BFLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUEsQ0FBQyxDQUFDO3dCQUNuRSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFOzRCQUN0QixVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3lCQUMzQjt3QkFDRCxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQzs0QkFDaEIsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDdEIsQ0FBQyxDQUFDO3FCQUNOO3lCQUFNO3dCQUNILFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7cUJBQzNCO29CQUNELE9BQU8sVUFBVSxDQUFDO2lCQUNyQixFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUNQLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDeEM7Ozs7OztRQUVELG9EQUFpQjs7Ozs7WUFBakIsVUFBa0IsTUFBTSxFQUFFLE9BQU87YUFDaEM7Ozs7O1FBRUQsa0RBQWU7Ozs7WUFBZixVQUFnQixLQUFLO2dCQUNqQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7O2dCQUU1RSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUN4Qzs7OztRQUVELDRDQUFTOzs7WUFBVDtnQkFBQSxpQkFTQzs7b0JBUlMsT0FBTyxHQUFHLG9CQUFtQixRQUFRLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxJQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7O29CQUN6RSxNQUFNLEdBQUcsSUFBSSxVQUFVLEVBQUU7Z0JBQy9CLE1BQU0sQ0FBQyxNQUFNLEdBQUc7O3dCQUNOLEtBQUssR0FBRyxvQkFBUyxNQUFNLENBQUMsTUFBTSxJQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLEdBQUcsRUFBRSxHQUFBLENBQUM7b0JBQzVFLEtBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDdEMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztpQkFDekMsQ0FBQztnQkFDRixNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzlCOzs7OztRQUVELCtDQUFZOzs7O1lBQVosVUFBYSxNQUFtQjs7Ozs7b0JBSXRCLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQzs7b0JBQ3ZDLEtBQW9CO2dCQUN4QixJQUFJLE1BQU0sRUFBRTtvQkFDUixLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztpQkFDekI7cUJBQU07b0JBQ0gsS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7aUJBQzlCO2dCQUNELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQzFDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFO3dCQUNyRCxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzt3QkFDbkIsTUFBTTtxQkFDVDtpQkFDSjtnQkFDRCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUN4Qzs7OztRQUVELCtDQUFZOzs7WUFBWjtnQkFDSSxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztnQkFDeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQ3hDOzs7OztRQUVELDBDQUFPOzs7O1lBQVAsVUFBUSxLQUFLO2dCQUNULElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO2FBQ3ZCOzs7OztRQUVELHlDQUFNOzs7O1lBQU4sVUFBTyxLQUFLO2dCQUNSLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2FBQ3hCOzs7O1FBRUQsMkNBQVE7OztZQUFSO2dCQUNJLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDbEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssV0FBVyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7Z0JBQ3hILElBQUksT0FBTyxJQUFJLENBQUMsTUFBTSxLQUFLLFNBQVMsRUFBRTtvQkFDbEMsSUFBSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxLQUFLLFdBQVcsRUFBRTt3QkFDbkQsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQztxQkFDcEQ7b0JBQ0QsSUFBSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLFdBQVcsRUFBRTt3QkFDM0MsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztxQkFDbkQ7aUJBQ0o7O2FBRUo7O29CQXBzQkpDLGNBQVMsU0FBQzt3QkFDVCxRQUFRLEVBQUUsdUJBQXVCO3dCQUNqQyxRQUFRLEVBQUUsMm1PQXNJWDt3QkFDQyxNQUFNLEVBQUU7NEJBQ04sc2ZBMkJDO3lCQUNGO3FCQUNGOzs7Ozs4QkFJSUMsVUFBSzs2QkFDTEEsVUFBSzs2QkFDTEMsV0FBTTs4QkFFTkMsY0FBUyxTQUFDLFNBQVM7MENBdURuQkMsaUJBQVksU0FBQyxrQkFBa0IsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7UUErZGhELCtCQUFDO0tBQUE7Ozs7OztBQzFzQkQ7UUFrQkE7U0F5QnFDOztvQkF6QnBDQyxhQUFRLFNBQUM7d0JBQ04sT0FBTyxFQUFFOzRCQUNMQyxtQkFBWTs0QkFDWkMsaUJBQVc7NEJBQ1hDLHlCQUFtQjs0QkFDbkJDLGtCQUFhOzRCQUNiQyxzQkFBZTs0QkFDZkMsb0JBQWM7NEJBQ2RDLG9CQUFjOzRCQUNkQyxzQkFBZTs0QkFDZkMsMkJBQWdCOzRCQUNoQkMsd0JBQWdCOzRCQUNoQkMsa0JBQWE7NEJBQ2JDLHVCQUFjO3lCQUNqQjt3QkFDRCxZQUFZLEVBQUU7NEJBQ1Ysd0JBQXdCO3lCQUMzQjt3QkFDRCxPQUFPLEVBQUU7NEJBQ0wsd0JBQXdCO3lCQUMzQjt3QkFDRCxTQUFTLEVBQUU7NEJBQ1Asc0JBQXNCO3lCQUN6QjtxQkFDSjs7UUFDbUMsNEJBQUM7S0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9