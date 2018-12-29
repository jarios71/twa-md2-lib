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
                if ((event.key === 'c' && event.ctrlKey) || event.keyCode === 27) {
                    this.clearFilters();
                }
                else if (event.keyCode === 13) {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdhLW1kMi1maWx0ZXItZWRpdG9yLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbbnVsbCwibmc6Ly90d2EtbWQyLWZpbHRlci1lZGl0b3IvbGliL3R3YS1tZDItZmlsdGVyLWVkaXRvci5zZXJ2aWNlLnRzIiwibmc6Ly90d2EtbWQyLWZpbHRlci1lZGl0b3IvbGliL3R3YS1tZDItZmlsdGVyLWVkaXRvci5jb21wb25lbnQudHMiLCJuZzovL3R3YS1tZDItZmlsdGVyLWVkaXRvci9saWIvdHdhLW1kMi1maWx0ZXItZWRpdG9yLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgVFdBRmlsdGVyRWRpdG9yQ29tcG9uZW50IH0gZnJvbSAnLi90d2EtbWQyLWZpbHRlci1lZGl0b3IuY29tcG9uZW50JztcbmltcG9ydCB7IEZpZWxkRmlsdGVyIH0gZnJvbSAnLi90d2EtbWQyLWZpbHRlci1lZGl0b3IuaW50ZXJmYWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRXQUZpbHRlckVkaXRvclNlcnZpY2Uge1xuXG4gICAgZmlsdGVyczogRmllbGRGaWx0ZXJbXTtcblxuICAgIGZpbHRlcmVkRGF0YTogYW55W107XG4gICAgZmlsdGVyOiBUV0FGaWx0ZXJFZGl0b3JDb21wb25lbnQ7XG4gICAgZGF0YTogYW55W107XG4gICAgcHJlcGFyZURhdGE6IEZ1bmN0aW9uO1xuICAgIHByb2Nlc3NlZEZpbHRlcnM6IGFueVtdO1xuXG4gICAgaW5pdChcbiAgICAgICAgZmlsdGVyOiBUV0FGaWx0ZXJFZGl0b3JDb21wb25lbnQsXG4gICAgICAgIGRhdGE6IGFueVtdLFxuICAgICAgICBwcmVwYXJlRGF0YT86IEZ1bmN0aW9uXG4gICAgKSB7XG4gICAgICAgIHRoaXMuZmlsdGVyID0gZmlsdGVyO1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgICAgICB0aGlzLnByZXBhcmVEYXRhID0gcHJlcGFyZURhdGE7XG5cbiAgICAgICAgdGhpcy5maWx0ZXIuY2hhbmdlLnN1YnNjcmliZSgoZmlsdGVyczogRmllbGRGaWx0ZXJbXSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJzID0gZmlsdGVycztcbiAgICAgICAgICAgIHRoaXMuYXBwbHlGaWx0ZXIoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucHJvY2Vzc2VkRmlsdGVycyA9IHRoaXMucHJvY2Vzc0ZpbHRlck9ycyh0aGlzLmZpbHRlci5hY3RpdmVGaWx0ZXJzKTtcbiAgICB9XG5cbiAgICBhcHBseUZpbHRlcihkYXRhID0gdGhpcy5kYXRhLnNsaWNlKCkpIHtcblxuICAgICAgICAvLyBsZXQgZGF0YSA9IHRoaXMuZGF0YS5zbGljZSgpO1xuICAgICAgICBsZXQgcmV0ID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gZGF0YS5sZW5ndGg7XG5cbiAgICAgICAgdGhpcy5wcm9jZXNzZWRGaWx0ZXJzID0gdGhpcy5wcm9jZXNzRmlsdGVyT3JzKHRoaXMuZmlsdGVyLmFjdGl2ZUZpbHRlcnMpO1xuXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG5cbiAgICAgICAgZGF0YSA9IGRhdGEubWFwKChpdGVtLCBpZHgpID0+IHtcbiAgICAgICAgICAgIGl0ZW0ucmVhbEluZGV4ID0gaWR4O1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgIH0pLmZpbHRlcigoaXRlbTogYW55KSA9PiB7XG4gICAgICAgICAgICByZXQgPSB0aGlzLmFwcGx5RmlsdGVyVG9Sb3coaXRlbSk7XG4gICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGF0YTtcblxuICAgIH1cblxuICAgIGFwcGx5RmlsdGVyVG9Sb3coaXRlbSkge1xuXG4gICAgICAgIGxldCByZXQgPSB0cnVlO1xuICAgICAgICBjb25zdCByZXN1bHRzID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSB0aGlzLnByb2Nlc3NlZEZpbHRlcnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHRzMiA9IFtdO1xuICAgICAgICAgICAgdGhpcy5wcm9jZXNzZWRGaWx0ZXJzW2ldLmZvckVhY2goKHY6IEZpZWxkRmlsdGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzdWx0czIucHVzaCh0aGlzLmZpbHRlckRhdGEodiwgaXRlbSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXN1bHRzLnB1c2gocmVzdWx0czIucmVkdWNlKChhY2MsIHYpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXYpIHtcbiAgICAgICAgICAgICAgICAgICAgYWNjID0gdjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgICAgIH0sIHRydWUpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZXN1bHRzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0ID0gcmVzdWx0cy5yZWR1Y2UoKGFjYywgdikgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh2KSB7XG4gICAgICAgICAgICAgICAgICAgIGFjYyA9IHY7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJldDtcblxuICAgIH1cblxuICAgIHByb2Nlc3NGaWx0ZXJPcnMgPSAoZmlsdGVycykgPT4ge1xuICAgICAgICBsZXQgYWN0dWFsRmlsdGVyID0gMDtcbiAgICAgICAgY29uc3QgbmV3RmlsdGVycyA9IFtdO1xuICAgICAgICBmaWx0ZXJzLmZvckVhY2goKHYsIGkpID0+IHtcbiAgICAgICAgICAgIGlmIChpID4gMCAmJiB2LmJpdHdpc2UgPT09ICd8fCcpIHtcbiAgICAgICAgICAgICAgICBhY3R1YWxGaWx0ZXIrKztcbiAgICAgICAgICAgICAgICBuZXdGaWx0ZXJzLnB1c2goW10pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZihuZXdGaWx0ZXJzW2FjdHVhbEZpbHRlcl0pID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIG5ld0ZpbHRlcnMucHVzaChbXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodi5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3R3JvdXAgPSB7Li4udiwgZmllbGRzOiB0aGlzLnByb2Nlc3NGaWx0ZXJPcnModi5maWVsZHMpfTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhuZXdHcm91cCk7XG4gICAgICAgICAgICAgICAgbmV3RmlsdGVyc1thY3R1YWxGaWx0ZXJdLnB1c2gobmV3R3JvdXApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXdGaWx0ZXJzW2FjdHVhbEZpbHRlcl0ucHVzaCh2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIG5ld0ZpbHRlcnM7XG4gICAgfVxuXG4gICAgZmlsdGVyRGF0YSA9IChmaWx0ZXI6IGFueSwgZmlsdGVyVmFsdWU6IGFueSkgPT4ge1xuXG4gICAgICAgIGNvbnN0IGNvbXBhcmF0b3JzID0ge1xuICAgICAgICAgICAgJz0+JzogKGE6IHN0cmluZywgYjogc3RyaW5nKSA9PiBhLmluY2x1ZGVzKGIpLFxuICAgICAgICAgICAgJz09PSc6IChhOiBhbnksIGI6IGFueSkgPT4gYSA9PT0gYixcbiAgICAgICAgICAgICc+PSc6IChhOiBhbnksIGI6IGFueSkgPT4gYSA+PSBiLFxuICAgICAgICAgICAgJz4nOiAoYTogYW55LCBiOiBhbnkpID0+IGEgPiBiLFxuICAgICAgICAgICAgJzw9JzogKGE6IGFueSwgYjogYW55KSA9PiBhIDw9IGIsXG4gICAgICAgICAgICAnPCc6IChhOiBhbnksIGI6IGFueSkgPT4gYSA8IGIsXG4gICAgICAgICAgICAnaW4nOiAoYTogYW55LCBiOiBhbnkpID0+IGIuc3BsaXQoJywnKS5pbmNsdWRlcyhhKSxcbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgcmV0VmFsdWUgPSBmYWxzZTtcblxuICAgICAgICBpZiAoZmlsdGVyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgIHJldFZhbHVlID0gdGhpcy5maWx0ZXJHcm91cChmaWx0ZXIsIGZpbHRlclZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXBhcmVEYXRhKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmVwYXJlRGF0YShmaWx0ZXIsIGZpbHRlclZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBmaWx0ZXJWYWx1ZVtmaWx0ZXIuZmllbGRdID09PSAnbnVtYmVyJyAmJiAoZmlsdGVyLm9wZXJhdGlvbiAhPT0gJz0+JyAmJiBmaWx0ZXIub3BlcmF0aW9uICE9PSAnaW4nKSkge1xuICAgICAgICAgICAgICAgICAgICByZXRWYWx1ZSA9IGNvbXBhcmF0b3JzW2ZpbHRlci5vcGVyYXRpb25dKCtmaWx0ZXJWYWx1ZVtmaWx0ZXIuZmllbGRdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICtmaWx0ZXIudmFsdWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldFZhbHVlID0gY29tcGFyYXRvcnNbZmlsdGVyLm9wZXJhdGlvbl0oU3RyaW5nKGZpbHRlclZhbHVlW2ZpbHRlci5maWVsZF0pLnRvTG93ZXJDYXNlKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU3RyaW5nKGZpbHRlci52YWx1ZSkudG9Mb3dlckNhc2UoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICAgICAgcmV0VmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXRWYWx1ZTtcblxuICAgIH1cblxuICAgIGZpbHRlckdyb3VwID0gKGZpbHRlcjogYW55LCBmaWx0ZXJWYWx1ZTogYW55KSA9PiB7XG5cbiAgICAgICAgY29uc3QgcmVzdWx0cyA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gZmlsdGVyLmZpZWxkcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdHMyID0gW107XG4gICAgICAgICAgICBmaWx0ZXIuZmllbGRzW2ldLmZvckVhY2goKHY6IGFueVtdKSA9PiB7XG4gICAgICAgICAgICAgICByZXN1bHRzMi5wdXNoKHRoaXMuZmlsdGVyRGF0YSh2LCBmaWx0ZXJWYWx1ZSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXN1bHRzLnB1c2gocmVzdWx0czIucmVkdWNlKChhY2MsIHYyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF2Mikge1xuICAgICAgICAgICAgICAgICAgICBhY2MgPSB2MjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgICAgIH0sIHRydWUpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHRzLnJlZHVjZSgoYWNjLCB2KSA9PiB7XG4gICAgICAgICAgICBpZiAodikge1xuICAgICAgICAgICAgICAgIGFjYyA9IHY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICB9LCBmYWxzZSk7XG5cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBGaWx0ZXJFZGl0b3JPcHRpb25zLCBGaWVsZEZpbHRlciwgRmlsdGVyRWRpdG9yQ29uZmlnIH0gZnJvbSAnLi90d2EtbWQyLWZpbHRlci1lZGl0b3IuaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndHdhLW1kMi1maWx0ZXItZWRpdG9yJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRHYXA9XCIyMHB4XCI+XG4gICAgPGRpdiBmeExheW91dD1cImNvbHVtblwiIGZ4RmxleD5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNlbGVjdG9yXCIgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEdhcD1cIjEwcHhcIj5cbiAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgICAgICA8bWF0LXNlbGVjdCBbKG5nTW9kZWwpXT1cInNlbGVjdGVkRmllbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1vcHRpb24gc2VsZWN0ZWQgdmFsdWU9XCJub25lXCI+RmlsdHJhciBwb3IuLi48L21hdC1vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCBmaWVsZCBvZiBmaWx0ZXJPcHRpb25zLmZpZWxkc1wiIFsodmFsdWUpXT1cImZpZWxkLm5hbWVcIj57e2ZpZWxkLmxhYmVsfX08L21hdC1vcHRpb24+XG4gICAgICAgICAgICAgICAgPC9tYXQtc2VsZWN0PlxuICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgICAgICA8bWF0LXNlbGVjdCBbKG5nTW9kZWwpXT1cIm9wZXJhdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LW9wdGlvbiAqbmdGb3I9XCJsZXQgb3Agb2Ygb3BlcmF0aW9uc0RhdGFcIiB2YWx1ZT1cInt7b3AudHlwZX19XCI+e3tvcC5sYWJlbH19PC9tYXQtb3B0aW9uPlxuICAgICAgICAgICAgICAgIDwvbWF0LXNlbGVjdD5cbiAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICAgICAgPGlucHV0IG1hdElucHV0IHBsYWNlaG9sZGVyPVwiZmlsdHJvXCIgWyhuZ01vZGVsKV09XCJzZWxlY3RlZFZhbHVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChmb2N1cyk9XCJvbkZvY3VzKCRldmVudClcIiAoYmx1cik9XCJvbkJsdXIoJGV2ZW50KVwiIC8+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBtYXQtYnV0dG9uICpuZ0lmPVwib3BlcmF0aW9uPT09J2luJ1wiIG1hdFN1ZmZpeCBtYXQtaWNvbi1idXR0b24gYXJpYS1sYWJlbD1cIkNsZWFyXCIgKGNsaWNrKT1cImZpbGVTZXQuY2xpY2soKVwiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWljb24+YXR0YWNoX2ZpbGU8L21hdC1pY29uPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBtYXQtYnV0dG9uIG1hdC1pY29uLWJ1dHRvbiAoY2xpY2spPVwiYWRkRmlsdGVyKClcIiBbZGlzYWJsZWRdPVwiY2hlY2tGaWx0ZXIoKVwiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWljb24+c2VuZDwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgZnhGbGV4PiZuYnNwOzwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvb2xzXCIgKm5nSWY9XCJhY3RpdmVGaWx0ZXJzLmxlbmd0aCA+IDBcIiBmeExheW91dD1cInJvd1wiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gbWF0LWJ1dHRvbiBtYXQtaWNvbi1idXR0b25cbiAgICAgICAgICAgICAgICAgICAgbWF0VG9vbHRpcD1cIkFncnVwYXJcIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwiY3JlYXRlR3JvdXAoKVwiXG4gICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJnZXRTZWxlY3RlZCgpIDwgMlwiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWljb24+bGluazwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBtYXQtYnV0dG9uIG1hdC1pY29uLWJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBtYXRUb29sdGlwPVwiRGVzYWdydXBhclwiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJyZW1vdmVGcm9tR3JvdXAoKVwiXG4gICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCIhZ3JvdXBTZWxlY3RlZCgpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbj5saW5rX29mZjwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBtYXQtYnV0dG9uIG1hdC1pY29uLWJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBtYXRUb29sdGlwPVwiTW92ZXIgYSBsYSBpenF1aWVyZGFcIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwibW92ZVRvKC0xKVwiXG4gICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJnZXRTZWxlY3RlZCgpICE9PSAxICYmICFlbnRpcmVHcm91cFNlbGVjdGVkKClcIj5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1pY29uPmFycm93X2JhY2s8L21hdC1pY29uPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gbWF0LWJ1dHRvbiBtYXQtaWNvbi1idXR0b25cbiAgICAgICAgICAgICAgICAgICAgbWF0VG9vbHRpcD1cIk1vdmVyIGEgbGEgZGVyZWNoYVwiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJtb3ZlVG8oMSlcIlxuICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZ2V0U2VsZWN0ZWQoKSAhPT0gMSAmJiAhZW50aXJlR3JvdXBTZWxlY3RlZCgpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbj5hcnJvd19mb3J3YXJkPC9tYXQtaWNvbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIG1hdC1idXR0b24gbWF0LWljb24tYnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIG1hdFRvb2x0aXA9XCJMaW1waWFyIHNlbGVjY2nDg8KzblwiXG4gICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJnZXRTZWxlY3RlZCgpIDwgMVwiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJjbGVhclNlbGVjdGlvbigpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbj5jbGVhcjwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBtYXQtYnV0dG9uIG1hdC1pY29uLWJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgbWF0VG9vbHRpcD1cIkxpbXBpYXIgZmlsdHJvc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiYWN0aXZlRmlsdGVycy5sZW5ndGggPCAxXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJjbGVhckZpbHRlcnMoKVwiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWljb24+Y2xlYXJfYWxsPC9tYXQtaWNvbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZpbHRlclwiIGZ4TGF5b3V0R2FwPVwiMTJcIj5cbiAgICAgICAgICAgIDxtYXQtY2hpcC1saXN0IGNka0Ryb3BMaXN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjZGtEcm9wTGlzdE9yaWVudGF0aW9uPVwiaG9yaXpvbnRhbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAoY2RrRHJvcExpc3REcm9wcGVkKT1cIm9uRHJvcHBlZEZpbHRlcigkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZmlsdGVyIG9mIGFjdGl2ZUZpbHRlcnM7IGxldCBpZHggPSBpbmRleFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCJcbiAgICAgICAgICAgICAgICAgICAgY2RrRHJhZ1xuICAgICAgICAgICAgICAgICAgICAoY2RrRHJhZ1N0YXJ0ZWQpPVwib25TdGFydERyYWdGaWx0ZXIoJGV2ZW50LCBmaWx0ZXIpXCIgW25nQ2xhc3NdPVwieydjZ3JvdXAnOiBmaWx0ZXIuaXNncm91cH1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gbWF0LWJ1dHRvbiAqbmdJZj1cImlkeCA+IDBcIiBbbWF0TWVudVRyaWdnZXJGb3JdPVwibWVudVwiIGNsYXNzPVwiYml0d2lzZVwiPnt7ZmlsdGVyLmJpdHdpc2V9fTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1tZW51ICNtZW51PVwibWF0TWVudVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gbWF0LW1lbnUtaXRlbSAoY2xpY2spPVwiY2hhbmdlQml0d2lzZShmaWx0ZXIsICcmJicpXCI+JiY8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG1hdC1tZW51LWl0ZW0gKGNsaWNrKT1cImNoYW5nZUJpdHdpc2UoZmlsdGVyLCAnfHwnKVwiPnx8PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L21hdC1tZW51PlxuICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1jaGlwIGNvbG9yPVwie3tmaWx0ZXIuY29sb3J9fVwiIHNlbGVjdGVkPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9XCJmaWx0ZXIte3tpZHh9fVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3JlbW92YWJsZV09XCJ0cnVlXCIgKHJlbW92ZWQpPVwicmVtb3ZlRmlsdGVyKGZpbHRlcilcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFttYXRUb29sdGlwXT1cImZpbHRlci52YWx1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW21hdFRvb2x0aXBEaXNhYmxlZF09XCJmaWx0ZXIub3BlcmF0aW9uIT09J2luJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0VG9vbHRpcFNob3dEZWxheT1cIjE1MDBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJzZWxlY3RGaWx0ZXIoZmlsdGVyKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCIhZmlsdGVyLmlzZ3JvdXBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsnc2VsZWN0ZWQnOiBmaWx0ZXIuc2VsZWN0ZWQsICdtYXQtYWNjZW50JzogZmlsdGVyLnNlbGVjdGVkfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7ZmlsdGVyLmV4cGxhbmF0aW9ufX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bWF0LWljb24gbWF0Q2hpcFJlbW92ZT5jYW5jZWw8L21hdC1pY29uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9tYXQtY2hpcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJmaWx0ZXIuaXNncm91cFwiIGZ4TGF5b3V0PVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiAqbmdUZW1wbGF0ZU91dGxldD1cImdyb3VwOyBjb250ZXh0OiB7IGZpbHRlcjogdGhpcy5maWx0ZXIsIGlkeDogdGhpcy5pZHh9XCIgZnhMYXlvdXQ9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvbWF0LWNoaXAtbGlzdD5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGlucHV0IHN0eWxlPVwidmlzaWJpbHR5OiBoaWRkZW47IGhlaWdodDogMHB4OyB3aWR0aDogMHB4O1wiIHR5cGU9XCJmaWxlXCIgaWQ9XCJmaWxlU2V0XCIgI2ZpbGVTZXQgKGNoYW5nZSk9XCJ1cGxvYWRTZXQoKVwiIC8+XG48L2Rpdj5cbjxuZy10ZW1wbGF0ZSAjZ3JvdXAgbGV0LWZpbHRlcj1cImZpbHRlclwiIGxldC1pZHg9XCJpZHhcIj5cbiAgICA8c3BhbiBjbGFzcz1cImdyb3VwLXN0YXJ0XCI+KDwvc3Bhbj5cbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBmaWx0ZXIyIG9mIGZpbHRlci5maWVsZHM7IGxldCBpZHgyID0gaW5kZXhcIj5cbiAgICAgICAgPGJ1dHRvbiBtYXQtYnV0dG9uICpuZ0lmPVwiaWR4MiA+IDBcIiBbbWF0TWVudVRyaWdnZXJGb3JdPVwibWVudTJcIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwiYml0d2lzZVwiPlxuICAgICAgICAgICAge3tmaWx0ZXIyLmJpdHdpc2V9fVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPG1hdC1tZW51ICNtZW51Mj1cIm1hdE1lbnVcIj5cbiAgICAgICAgICAgIDxidXR0b24gbWF0LW1lbnUtaXRlbSAoY2xpY2spPVwiY2hhbmdlQml0d2lzZShmaWx0ZXIyLCAnJiYnKVwiPiYmPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIG1hdC1tZW51LWl0ZW0gKGNsaWNrKT1cImNoYW5nZUJpdHdpc2UoZmlsdGVyMiwgJ3x8JylcIj58fDwvYnV0dG9uPlxuICAgICAgICA8L21hdC1tZW51PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPG1hdC1jaGlwIGNvbG9yPVwie3tmaWx0ZXIuY29sb3J9fVwiIHNlbGVjdGVkPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgaWQ9XCJmaWx0ZXIte3tpZHh9fS17e2lkeDJ9fVwiXG4gICAgICAgICAgICAgICAgW3JlbW92YWJsZV09XCJ0cnVlXCIgKHJlbW92ZWQpPVwicmVtb3ZlRmlsdGVyKGZpbHRlcjIpXCJcbiAgICAgICAgICAgICAgICBbbWF0VG9vbHRpcF09XCJmaWx0ZXIyLnZhbHVlXCJcbiAgICAgICAgICAgICAgICBbbWF0VG9vbHRpcERpc2FibGVkXT1cImZpbHRlci5vcGVyYXRpb24hPT0naW4nXCJcbiAgICAgICAgICAgICAgICBtYXRUb29sdGlwU2hvd0RlbGF5PVwiMTUwMFwiXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cInNlbGVjdEZpbHRlcihmaWx0ZXIyKVwiXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieydzZWxlY3RlZCc6IGZpbHRlcjIuc2VsZWN0ZWQsICdtYXQtYWNjZW50JzogZmlsdGVyMi5zZWxlY3RlZH1cIlxuICAgICAgICAgICAgICAgICpuZ0lmPVwiIWZpbHRlcjIuaXNncm91cFwiXG4gICAgICAgICAgICA+e3tmaWx0ZXIyLmV4cGxhbmF0aW9ufX1cbiAgICAgICAgICAgICAgICA8bWF0LWljb24gbWF0Q2hpcFJlbW92ZT5jYW5jZWw8L21hdC1pY29uPlxuICAgICAgICAgICAgPC9tYXQtY2hpcD5cbiAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJmaWx0ZXIyLmlzZ3JvdXBcIiBmeExheW91dD1cInJvd1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nVGVtcGxhdGVPdXRsZXQ9XCJncm91cDsgY29udGV4dDogeyBmaWx0ZXI6IHRoaXMuZmlsdGVyMiwgaWR4OiB0aGlzLmlkeDJ9XCI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9uZy1jb250YWluZXI+XG4gICAgPHNwYW4gY2xhc3M9XCJncm91cC1lbmRcIj4pPC9zcGFuPlxuPC9uZy10ZW1wbGF0ZT5cbmAsXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICAuZXJyb3IgeyBjb2xvcjogcmVkOyB9XG4gICAgLnNlbGVjdG9yIHtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgfVxuICAgIC5maWx0ZXIge1xuICAgICAgICBwYWRkaW5nLWJvdHRvbTogMTJweDtcbiAgICB9XG4gICAgLmZpbHRlciBtYXQtY2hpcCB7XG4gICAgICAgIG1hcmdpbjogNHB4O1xuICAgIH1cbiAgICAuY2dyb3VwIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICB9XG4gICAgbWF0LWNoaXAuc2VsZWN0ZWQge1xuICAgICAgICBjb2xvcjogI2ZmZjtcbiAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgfVxuICAgIHNwYW4uZ3JvdXAtc3RhcnQsXG4gICAgc3Bhbi5ncm91cC1lbmQge1xuICAgICAgICBmb250LXNpemU6IDI1cHg7XG4gICAgfVxuICAgIGJ1dHRvbi5iaXR3aXNlIHtcbiAgICAgICAgbWluLXdpZHRoOiAyNHB4O1xuICAgICAgICBwYWRkaW5nLWxlZnQ6IDA7XG4gICAgICAgIHBhZGRpbmctcmlnaHQ6IDA7XG4gICAgfVxuICAgIGBcbiAgXVxufSlcblxuZXhwb3J0IGNsYXNzIFRXQUZpbHRlckVkaXRvckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBASW5wdXQoKSBvcHRpb25zOiBGaWx0ZXJFZGl0b3JPcHRpb25zO1xuICAgIEBJbnB1dCgpIGNvbmZpZzogRmlsdGVyRWRpdG9yQ29uZmlnO1xuICAgIEBPdXRwdXQoKSBjaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnlbXT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueVtdPigpO1xuXG4gICAgQFZpZXdDaGlsZCgnZmlsZVNldCcpIGZpbGVTZXQ6IEVsZW1lbnRSZWY7XG5cbiAgICBmaWx0ZXJPcHRpb25zOiBGaWx0ZXJFZGl0b3JPcHRpb25zO1xuICAgIHNlbGVjdGVkRmllbGQgPSAnbm9uZSc7XG4gICAgc2VsZWN0ZWRWYWx1ZSA9ICcnO1xuICAgIG9wZXJhdGlvbiA9ICdjb250YWluJztcbiAgICBhY3RpdmVGaWx0ZXJzOiBGaWVsZEZpbHRlcltdID0gW107XG4gICAgZWRpdGluZyA9IGZhbHNlO1xuICAgIG9wZXJhdGlvbnM6IGFueSA9IHtcbiAgICAgICAgY29udGFpbjogJz0+JyxcbiAgICAgICAgZXF1YWw6ICc9PT0nLFxuICAgICAgICBncmVhdGVyRXF1YWw6ICc+PScsXG4gICAgICAgIGdyZWF0ZXI6ICc+JyxcbiAgICAgICAgbGVzc0VxdWFsOiAnPD0nLFxuICAgICAgICBsZXNzOiAnPCcsXG4gICAgICAgIGluOiAnaW4nLFxuICAgIH07XG4gICAgb3BlcmF0aW9uc0RhdGEgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdjb250YWluJyxcbiAgICAgICAgICAgIGxhYmVsOiAnY29udGFpbnMnLFxuICAgICAgICAgICAgb3BlcmF0b3I6ICc9PidcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2VxdWFsJyxcbiAgICAgICAgICAgIGxhYmVsOiAnZXF1YWxzJyxcbiAgICAgICAgICAgIG9wZXJhdG9yOiAnPT09J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnZ3JlYXRlckVxdWFsJyxcbiAgICAgICAgICAgIGxhYmVsOiAnZ3JlYXRlciBvciBlcXVhbCcsXG4gICAgICAgICAgICBvcGVyYXRvcjogJz49J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnZ3JlYXRlcicsXG4gICAgICAgICAgICBsYWJlbDogJ2dyZWF0ZXInLFxuICAgICAgICAgICAgb3BlcmF0b3I6ICc+J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnbGVzc0VxdWFsJyxcbiAgICAgICAgICAgIGxhYmVsOiAnbGVzcyBvciBlcXVhbCcsXG4gICAgICAgICAgICBvcGVyYXRvcjogJzw9J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnbGVzcycsXG4gICAgICAgICAgICBsYWJlbDogJ2xlc3MnLFxuICAgICAgICAgICAgb3BlcmF0b3I6ICc8J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnaW4nLFxuICAgICAgICAgICAgbGFiZWw6ICdpbicsXG4gICAgICAgICAgICBvcGVyYXRvcjogJ2luJ1xuICAgICAgICB9LFxuICAgIF07XG5cbiAgICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDprZXlkb3duJywgWyckZXZlbnQnXSlcbiAgICBoYW5kbGVLZXlib2FyZEV2ZW50KGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICgoZXZlbnQua2V5ID09PSAnYycgJiYgZXZlbnQuY3RybEtleSkgfHwgZXZlbnQua2V5Q29kZSA9PT0gMjcpIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJGaWx0ZXJzKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkRmlsdGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgICBjaGVja0ZpbHRlcigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLnNlbGVjdGVkRmllbGQgPT09ICdub25lJyB8fCB0aGlzLnNlbGVjdGVkVmFsdWUgPT09ICcnKTtcbiAgICB9XG5cbiAgICBhZGRGaWx0ZXIoKSB7XG4gICAgICAgIGxldCBjb2xvciA9ICcnLFxuICAgICAgICAgICAgZmllbGQgPSAnJyxcbiAgICAgICAgICAgIGxhYmVsID0gJycsXG4gICAgICAgICAgICBuYW1lID0gJycsXG4gICAgICAgICAgICBleHBsYW5hdGlvbiA9IHRoaXMuc2VsZWN0ZWRGaWVsZCArICcgJyArIHRoaXMub3BlcmF0aW9uc1t0aGlzLm9wZXJhdGlvbl0gKyAnICcgKyB0aGlzLnNlbGVjdGVkVmFsdWU7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSB0aGlzLmZpbHRlck9wdGlvbnMuZmllbGRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMuZmlsdGVyT3B0aW9ucy5maWVsZHNbaV0ubmFtZSA9PT0gdGhpcy5zZWxlY3RlZEZpZWxkKSB7XG4gICAgICAgICAgICAgICAgLy8gY29sb3IgPSB0aGlzLmZpbHRlck9wdGlvbnMuZmllbGRzW2ldLmNvbG9yO1xuICAgICAgICAgICAgICAgIC8vIGZpZWxkID0gdGhpcy5maWx0ZXJPcHRpb25zLmZpZWxkc1tpXS5maWVsZDtcbiAgICAgICAgICAgICAgICAvLyBsYWJlbCA9IHRoaXMuZmlsdGVyT3B0aW9ucy5maWVsZHNbaV0ubGFiZWw7XG4gICAgICAgICAgICAgICAgLy8gbmFtZSA9IHRoaXMuZmlsdGVyT3B0aW9ucy5maWVsZHNbaV0ubmFtZTtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiAuLi53aXRoIG9iamVjdCBkZXN0cnVjdHVyaW5nXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgKHsgY29sb3IsIGZpZWxkLCBsYWJlbCwgbmFtZSB9ID0gdGhpcy5maWx0ZXJPcHRpb25zLmZpZWxkc1tpXSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3BlcmF0aW9uID09PSAnaW4nKSB7XG4gICAgICAgICAgICBleHBsYW5hdGlvbiA9IHRoaXMuc2VsZWN0ZWRGaWVsZCArICcgJyArIHRoaXMub3BlcmF0aW9uc1t0aGlzLm9wZXJhdGlvbl0gKyAnICguLi4pJztcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm9wZXJhdGlvbiA9PT0gJ2NvbnRhaW4nKSB7XG4gICAgICAgICAgICAvLyBleHBsYW5hdGlvbiA9IHRoaXMuc2VsZWN0ZWRGaWVsZCArICcgJyArIHRoaXMub3BlcmF0aW9uc1t0aGlzLm9wZXJhdGlvbl0gKyAnICcgKyB0aGlzLnNlbGVjdGVkVmFsdWU7XG4gICAgICAgICAgICBleHBsYW5hdGlvbiA9ICdcIicgKyB0aGlzLnNlbGVjdGVkVmFsdWUgKyAnXCIgJyArIHRoaXMub3BlcmF0aW9uc1t0aGlzLm9wZXJhdGlvbl0gKyAnICcgKyB0aGlzLnNlbGVjdGVkRmllbGQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hY3RpdmVGaWx0ZXJzLnB1c2goe1xuICAgICAgICAgICAgY29sb3I6IGNvbG9yLFxuICAgICAgICAgICAgZXhwbGFuYXRpb246IGV4cGxhbmF0aW9uLFxuICAgICAgICAgICAgbGFiZWw6IGxhYmVsLFxuICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgIGZpZWxkOiBmaWVsZCxcbiAgICAgICAgICAgIGJpdHdpc2U6ICcmJicsXG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMub3BlcmF0aW9uc1t0aGlzLm9wZXJhdGlvbl0sXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5zZWxlY3RlZFZhbHVlXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNlbGVjdGVkVmFsdWUgPSAnJztcbiAgICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh0aGlzLmFjdGl2ZUZpbHRlcnMpO1xuICAgIH1cblxuICAgIHNlbGVjdEZpbHRlcihmaWx0ZXI6IEZpZWxkRmlsdGVyKSB7XG4gICAgICAgIGZpbHRlci5zZWxlY3RlZCA9ICFmaWx0ZXIuc2VsZWN0ZWQ7XG4gICAgICAgIGNvbnN0IGdyb3VwID0gdGhpcy5nZXRQYXJlbnRGaWx0ZXIoZmlsdGVyKTtcbiAgICAgICAgaWYgKGdyb3VwKSB7XG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRBbGwgPSB0cnVlO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBncm91cC5maWVsZHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdG1wZmlsdGVyID0gZ3JvdXAuZmllbGRzW2ldO1xuICAgICAgICAgICAgICAgIGlmICghdG1wZmlsdGVyLmlzZ3JvdXAgJiYgIXRtcGZpbHRlci5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEFsbCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzZWxlY3RlZEFsbCkge1xuICAgICAgICAgICAgICAgIGdyb3VwLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFBhcmVudEZpbHRlcihmaWx0ZXI6IEZpZWxkRmlsdGVyKTogRmllbGRGaWx0ZXIgfCBudWxsIHtcbiAgICAgICAgY29uc3QgZ2V0UGFyZW50RmlsdGVySW5Hcm91cCA9IChncm91cDogRmllbGRGaWx0ZXIsIGZpbHRlcjI6IEZpZWxkRmlsdGVyKTogRmllbGRGaWx0ZXIgfCBudWxsID0+IHtcbiAgICAgICAgICAgIHJldCA9IG51bGw7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gZ3JvdXAuZmllbGRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRtcGZpbHRlciA9IGdyb3VwLmZpZWxkc1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoSlNPTi5zdHJpbmdpZnkodG1wZmlsdGVyKSA9PT0gSlNPTi5zdHJpbmdpZnkoZmlsdGVyMikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdyb3VwO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodG1wZmlsdGVyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0ID0gZ2V0UGFyZW50RmlsdGVySW5Hcm91cCh0bXBmaWx0ZXIsIGZpbHRlcjIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IHJldCA9IG51bGw7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gdGhpcy5hY3RpdmVGaWx0ZXJzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgdG1wZmlsdGVyID0gdGhpcy5hY3RpdmVGaWx0ZXJzW2ldO1xuICAgICAgICAgICAgaWYgKEpTT04uc3RyaW5naWZ5KHRtcGZpbHRlcikgPT09IEpTT04uc3RyaW5naWZ5KGZpbHRlcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodG1wZmlsdGVyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICByZXQgPSBnZXRQYXJlbnRGaWx0ZXJJbkdyb3VwKHRtcGZpbHRlciwgZmlsdGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuXG4gICAgYXJyYXlNb3ZlID0gKGFycjogYW55W10sIG9sZEluZGV4OiBudW1iZXIsIG5ld0luZGV4OiBudW1iZXIpOiBhbnlbXSA9PiB7XG4gICAgICAgIGlmIChuZXdJbmRleCA+IGFyci5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCBrID0gbmV3SW5kZXggLSBhcnIubGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKGstLSkge1xuICAgICAgICAgICAgICAgIGFyci5wdXNoKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYXJyLnNwbGljZShuZXdJbmRleCwgMCwgYXJyLnNwbGljZShvbGRJbmRleCwgMSlbMF0pO1xuICAgICAgICByZXR1cm4gYXJyO1xuICAgIH1cblxuICAgIG1vdmVUbyhkaXJlY3Rpb246IG51bWJlcikge1xuICAgICAgICBsZXQgaWR4ID0gLTEsXG4gICAgICAgICAgICB0b0lkeCA9IC0xLFxuICAgICAgICAgICAgZ3JvdXAgPSAtMTtcbiAgICAgICAgLy8gU2VhcmNoaW5nIHRoZSBzZWxlY3RlZCBmaWx0ZXIuLi5cbiAgICAgICAgdGhpcy5hY3RpdmVGaWx0ZXJzLmZvckVhY2goKGZpbHRlciwgdG1waWR4KSA9PiB7XG4gICAgICAgICAgICBpZiAoZmlsdGVyLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgaWR4ID0gdG1waWR4O1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZmlsdGVyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICBmaWx0ZXIuZmllbGRzLmZvckVhY2goKGZpbHRlcjIsIHRtcGlkeDIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlcjIuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkeCA9IHRtcGlkeDI7XG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cCA9IHRtcGlkeDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoaWR4ID49IDApIHtcblxuICAgICAgICAgICAgaWYgKGdyb3VwID49IDApIHtcbiAgICAgICAgICAgICAgICB0b0lkeCA9IChpZHggKyBkaXJlY3Rpb24pID49IDAgPyBpZHggKyBkaXJlY3Rpb24gOiB0aGlzLmFjdGl2ZUZpbHRlcnNbZ3JvdXBdLmZpZWxkcy5sZW5ndGggKyBkaXJlY3Rpb247XG4gICAgICAgICAgICAgICAgaWYgKHRvSWR4ID49IHRoaXMuYWN0aXZlRmlsdGVyc1tncm91cF0uZmllbGRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0b0lkeCA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlRmlsdGVyc1tncm91cF0uZmllbGRzID0gdGhpcy5hcnJheU1vdmUodGhpcy5hY3RpdmVGaWx0ZXJzW2dyb3VwXS5maWVsZHMsIGlkeCwgdG9JZHgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0b0lkeCA9IChpZHggKyBkaXJlY3Rpb24pID49IDAgPyBpZHggKyBkaXJlY3Rpb24gOiB0aGlzLmFjdGl2ZUZpbHRlcnMubGVuZ3RoICsgZGlyZWN0aW9uO1xuICAgICAgICAgICAgICAgIGlmICh0b0lkeCA+PSB0aGlzLmFjdGl2ZUZpbHRlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvSWR4ID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVGaWx0ZXJzID0gdGhpcy5hcnJheU1vdmUodGhpcy5hY3RpdmVGaWx0ZXJzLCBpZHgsIHRvSWR4KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh0aGlzLmFjdGl2ZUZpbHRlcnMpO1xuXG4gICAgfVxuXG4gICAgZ2V0U2VsZWN0ZWQoKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgZ2V0SW5Hcm91cCA9IChncm91cDogRmllbGRGaWx0ZXIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBncm91cC5maWVsZHMucmVkdWNlKChhY2MyLCBmaWx0ZXIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgYWNjMiArPSBnZXRJbkdyb3VwKGZpbHRlcik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmaWx0ZXIuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgYWNjMisrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYWNjMjtcbiAgICAgICAgICAgIH0sIDApO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5hY3RpdmVGaWx0ZXJzLnJlZHVjZSgoYWNjLCBmaWx0ZXIpID0+IHtcbiAgICAgICAgICAgIGlmIChmaWx0ZXIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgIGFjYyArPSBnZXRJbkdyb3VwKGZpbHRlcik7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGZpbHRlci5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIGFjYysrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfSwgMCk7XG5cbiAgICB9XG5cbiAgICBjbGVhclNlbGVjdGlvbigpOiB2b2lkIHtcblxuICAgICAgICBjb25zdCBjbGVhclNlbGVjdGlvbkluR3JvdXAgPSAoZ3JvdXApID0+IHtcbiAgICAgICAgICAgIGdyb3VwLmZpZWxkcy5mb3JFYWNoKChmaWx0ZXIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyID0gY2xlYXJTZWxlY3Rpb25Jbkdyb3VwKGZpbHRlcik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiBncm91cDtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmFjdGl2ZUZpbHRlcnMgPSB0aGlzLmFjdGl2ZUZpbHRlcnMubWFwKChmaWx0ZXIpID0+IHtcbiAgICAgICAgICAgIGlmIChmaWx0ZXIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgIGZpbHRlciA9IGNsZWFyU2VsZWN0aW9uSW5Hcm91cChmaWx0ZXIpO1xuICAgICAgICAgICAgICAgIC8vIGZpbHRlci5maWVsZHMgPSBmaWx0ZXIuZmllbGRzLm1hcCgoZmlsdGVyMikgPT4ge1xuICAgICAgICAgICAgICAgIC8vICAgICBmaWx0ZXIyLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgLy8gICAgIHJldHVybiBmaWx0ZXIyO1xuICAgICAgICAgICAgICAgIC8vIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmlsdGVyLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gZmlsdGVyO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIGNoYW5nZUJpdHdpc2UoZmlsdGVyOiBGaWVsZEZpbHRlciwgYml0d2lzZSkge1xuICAgICAgICBmaWx0ZXIuYml0d2lzZSA9IGJpdHdpc2U7XG4gICAgICAgIHRoaXMuY2hhbmdlLmVtaXQodGhpcy5hY3RpdmVGaWx0ZXJzKTtcbiAgICB9XG5cbiAgICBncm91cFNlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCBncm91cFNlbGVjdGVkSW5Hcm91cCA9IChmaWx0ZXI6IEZpZWxkRmlsdGVyKSA9PiB7XG4gICAgICAgICAgICBsZXQgcmV0MiA9IDA7XG4gICAgICAgICAgICBpZiAoZmlsdGVyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICBmaWx0ZXIuZmllbGRzLmZvckVhY2goKGZpbHRlcjIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlcjIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0MiArPSBncm91cFNlbGVjdGVkSW5Hcm91cChmaWx0ZXIyKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIyLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0MisrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJldDI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBncm91cHMgPSB0aGlzLmFjdGl2ZUZpbHRlcnMuZmlsdGVyKGZpbHRlciA9PiBmaWx0ZXIuaXNncm91cCk7XG4gICAgICAgIGxldCByZXQgPSAwO1xuICAgICAgICBncm91cHMuZm9yRWFjaCgoZ3JvdXApID0+IHtcbiAgICAgICAgICAgIGdyb3VwLmZpZWxkcy5mb3JFYWNoKGZpbHRlciA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlci5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldCArPSBncm91cFNlbGVjdGVkSW5Hcm91cChmaWx0ZXIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZmlsdGVyLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldCsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJldCA+IDA7XG4gICAgfVxuXG4gICAgZW50aXJlR3JvdXBTZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgZW50aXJlR3JvdXBTZWxlY3RlZEluR3JvdXAgPSAoZ3JvdXA6IEZpZWxkRmlsdGVyKSA9PiB7XG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWQyID0gdHJ1ZTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBncm91cC5maWVsZHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmlsdGVyID0gZ3JvdXAuZmllbGRzW2ldO1xuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZDIgPSBlbnRpcmVHcm91cFNlbGVjdGVkSW5Hcm91cChmaWx0ZXIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWQyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIWZpbHRlci5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZDIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0ZWQyICYmIGdyb3VwLmZpZWxkcy5sZW5ndGggPiAwO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBncm91cHMgPSB0aGlzLmFjdGl2ZUZpbHRlcnMuZmlsdGVyKGZpbHRlciA9PiBmaWx0ZXIuaXNncm91cCk7XG4gICAgICAgIGxldCBzZWxlY3RlZCA9IHRydWU7XG4gICAgICAgIGZvciAobGV0IGlnID0gMCwgbGcgPSBncm91cHMubGVuZ3RoOyBpZyA8IGxnOyBpZysrKSB7XG4gICAgICAgICAgICBjb25zdCBncm91cCA9IGdyb3Vwc1tpZ107XG4gICAgICAgICAgICBmb3IgKGxldCBpZzIgPSAwLCBsZzIgPSBncm91cC5maWVsZHMubGVuZ3RoOyBpZzIgPCBsZzI7IGlnMisrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmlsdGVyID0gZ3JvdXAuZmllbGRzW2lnMl07XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlci5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gZW50aXJlR3JvdXBTZWxlY3RlZEluR3JvdXAoZmlsdGVyKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIWZpbHRlci5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGdyb3VwLmZpZWxkcy5mb3JFYWNoKGZpbHRlciA9PiB7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGdyb3Vwcy5mb3JFYWNoKChncm91cCkgPT4ge1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHNlbGVjdGVkICYmIGdyb3Vwcy5sZW5ndGggPiAwO1xuICAgIH1cblxuICAgIGNyZWF0ZUdyb3VwKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBjcmVhdGVJbkdyb3VwID0gKGZpbHRlcjogRmllbGRGaWx0ZXIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkMiA9IGZpbHRlci5maWVsZHMuZmlsdGVyKGZpbHRlcjIgPT4gZmlsdGVyMi5zZWxlY3RlZCksXG4gICAgICAgICAgICBncm91cFBvc2l0aW9uMiA9IGZpbHRlci5maWVsZHMuZmluZEluZGV4KHYgPT4gdi5zZWxlY3RlZCk7XG4gICAgICAgICAgICBsZXQgcmVzdWx0RmlsdGVyMjogRmllbGRGaWx0ZXJbXTtcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZDIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0RmlsdGVyMiA9IGZpbHRlci5maWVsZHMuZmlsdGVyKGZpbHRlcjIgPT4gIWZpbHRlcjIuc2VsZWN0ZWQpO1xuICAgICAgICAgICAgICAgIHJlc3VsdEZpbHRlcjIuc3BsaWNlKGdyb3VwUG9zaXRpb24yLCAwLCB7XG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJycsXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgaXNncm91cDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgYml0d2lzZTogJyYmJyxcbiAgICAgICAgICAgICAgICAgICAgZmllbGRzOiBzZWxlY3RlZDJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0RmlsdGVyMiA9IGZpbHRlci5maWVsZHMubWFwKGZpbHRlcjIgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyMi5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVJbkdyb3VwKGZpbHRlcjIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmaWx0ZXIyO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmlsdGVyLmZpZWxkcyA9IHJlc3VsdEZpbHRlcjI7XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLmFjdGl2ZUZpbHRlcnMuZmlsdGVyKGZpbHRlciA9PiBmaWx0ZXIuc2VsZWN0ZWQpLFxuICAgICAgICAgICAgICBncm91cFBvc2l0aW9uID0gdGhpcy5hY3RpdmVGaWx0ZXJzLmZpbmRJbmRleCh2ID0+IHYuc2VsZWN0ZWQpO1xuICAgICAgICBsZXQgcmVzdWx0RmlsdGVyOiBGaWVsZEZpbHRlcltdO1xuICAgICAgICBpZiAoc2VsZWN0ZWQubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXN1bHRGaWx0ZXIgPSB0aGlzLmFjdGl2ZUZpbHRlcnMuZmlsdGVyKGZpbHRlciA9PiAhZmlsdGVyLnNlbGVjdGVkKTtcbiAgICAgICAgICAgIHJlc3VsdEZpbHRlci5zcGxpY2UoZ3JvdXBQb3NpdGlvbiwgMCwge1xuICAgICAgICAgICAgICAgIGNvbG9yOiAnJyxcbiAgICAgICAgICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgICAgICAgICBmaWVsZDogJycsXG4gICAgICAgICAgICAgICAgaXNncm91cDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBiaXR3aXNlOiAnJiYnLFxuICAgICAgICAgICAgICAgIGZpZWxkczogc2VsZWN0ZWRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVGaWx0ZXJzID0gcmVzdWx0RmlsdGVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0RmlsdGVyID0gdGhpcy5hY3RpdmVGaWx0ZXJzLm1hcChmaWx0ZXIgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgICAgICBjcmVhdGVJbkdyb3VwKGZpbHRlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmaWx0ZXI7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgIHRoaXMuY2hhbmdlLmVtaXQodGhpcy5hY3RpdmVGaWx0ZXJzKTtcbiAgICB9XG5cbiAgICBzYW5pdGl6ZUdyb3VwcygpIHtcbiAgICAgICAgY29uc3Qgc2FuaXRpemVHcm91cHNJbkdyb3VwID0gKGdyb3VwLCBwYXJlbnQ/OiBGaWVsZEZpbHRlcikgPT4ge1xuICAgICAgICAgICAgZ3JvdXAuZmllbGRzLm1hcCgoZmlsdGVyOiBGaWVsZEZpbHRlciwgaWR4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlci5maWVsZHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cC5maWVsZHMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZmlsdGVyLmZpZWxkcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGdyb3VwLmZpZWxkcy5wdXNoKHsuLi5maWx0ZXIuZmllbGRzWzBdfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cC5maWVsZHMuc3BsaWNlKGlkeCwgMSwgey4uLmZpbHRlci5maWVsZHNbMF19KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNhbml0aXplR3JvdXBzSW5Hcm91cChmaWx0ZXIsIGdyb3VwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFjdGl2ZUZpbHRlcnMubWFwKChmaWx0ZXI6IEZpZWxkRmlsdGVyLCBpZHg6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgaWYgKGZpbHRlci5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlci5maWVsZHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlRmlsdGVycy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZpbHRlci5maWVsZHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuYWN0aXZlRmlsdGVycy5wdXNoKHsuLi5maWx0ZXIuZmllbGRzWzBdfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlRmlsdGVycy5zcGxpY2UoaWR4LCAxLCB7Li4uZmlsdGVyLmZpZWxkc1swXX0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2FuaXRpemVHcm91cHNJbkdyb3VwKGZpbHRlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW1vdmVGcm9tR3JvdXAoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHJlbW92ZUZyb21Hcm91cEluR3JvdXAgPSAoZ3JvdXA6IEZpZWxkRmlsdGVyLCBwYXJlbnQ6IEZpZWxkRmlsdGVyLCBpZHgpID0+IHtcbiAgICAgICAgICAgIGdyb3VwLmZpZWxkcy5mb3JFYWNoKChmaWx0ZXIyLCBpZHgyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlcjIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVGcm9tR3JvdXBJbkdyb3VwKGZpbHRlcjIsIGdyb3VwLCBpZHgyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IHRtcEZpbHRlcnMgPSBncm91cC5maWVsZHMuZmlsdGVyKChmaWx0ZXIyOiBGaWVsZEZpbHRlcikgPT4gZmlsdGVyMi5zZWxlY3RlZCk7XG4gICAgICAgICAgICBncm91cC5maWVsZHMgPSBncm91cC5maWVsZHMuZmlsdGVyKChmaWx0ZXIyOiBGaWVsZEZpbHRlcikgPT4gIWZpbHRlcjIuc2VsZWN0ZWQpO1xuICAgICAgICAgICAgdG1wRmlsdGVycy5mb3JFYWNoKCh2OiBGaWVsZEZpbHRlcikgPT4ge1xuICAgICAgICAgICAgICAgIHYuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBwYXJlbnQuZmllbGRzLnB1c2godik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChncm91cC5maWVsZHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcGFyZW50LmZpZWxkcy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmFjdGl2ZUZpbHRlcnMgPSB0aGlzLmFjdGl2ZUZpbHRlcnMucmVkdWNlKChuZXdGaWx0ZXJzLCBmaWx0ZXIpID0+IHtcbiAgICAgICAgICAgIGlmIChmaWx0ZXIuaXNncm91cCkge1xuXG4gICAgICAgICAgICAgICAgZmlsdGVyLmZpZWxkcy5mb3JFYWNoKChmaWx0ZXIyLCBpZHgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlcjIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlRnJvbUdyb3VwSW5Hcm91cChmaWx0ZXIyLCBmaWx0ZXIsIGlkeCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHRtcEZpbHRlcnMgPSBmaWx0ZXIuZmllbGRzLmZpbHRlcihmaWx0ZXIyID0+IGZpbHRlcjIuc2VsZWN0ZWQpO1xuICAgICAgICAgICAgICAgIGZpbHRlci5maWVsZHMgPSBmaWx0ZXIuZmllbGRzLmZpbHRlcihmaWx0ZXIyID0+ICFmaWx0ZXIyLnNlbGVjdGVkKTtcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLmZpZWxkcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3RmlsdGVycy5wdXNoKGZpbHRlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRtcEZpbHRlcnMuZm9yRWFjaCh2ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbmV3RmlsdGVycy5wdXNoKHYpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXdGaWx0ZXJzLnB1c2goZmlsdGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXdGaWx0ZXJzO1xuICAgICAgICB9LCBbXSk7XG4gICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgdGhpcy5zYW5pdGl6ZUdyb3VwcygpO1xuICAgICAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMuYWN0aXZlRmlsdGVycyk7XG4gICAgfVxuXG4gICAgb25TdGFydERyYWdGaWx0ZXIoX2V2ZW50LCBfZmlsdGVyKSB7XG4gICAgfVxuXG4gICAgb25Ecm9wcGVkRmlsdGVyKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuYXJyYXlNb3ZlKHRoaXMuYWN0aXZlRmlsdGVycywgZXZlbnQucHJldmlvdXNJbmRleCwgZXZlbnQuY3VycmVudEluZGV4KTtcbiAgICAgICAgLy8gdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICB0aGlzLnNhbml0aXplR3JvdXBzKCk7XG4gICAgICAgIHRoaXMuY2hhbmdlLmVtaXQodGhpcy5hY3RpdmVGaWx0ZXJzKTtcbiAgICB9XG5cbiAgICB1cGxvYWRTZXQoKSB7XG4gICAgICAgIGNvbnN0IGZpbGVPYmogPSAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpbGVTZXQnKSkuZmlsZXNbMF07XG4gICAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgIHJlYWRlci5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBsaW5lcyA9ICg8c3RyaW5nPnJlYWRlci5yZXN1bHQpLnNwbGl0KC9cXHI/XFxuLykuZmlsdGVyKHZhbCA9PiB2YWwgPiAnJyk7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkVmFsdWUgPSBsaW5lcy5qb2luKCcsICcpO1xuICAgICAgICAgICAgdGhpcy5maWxlU2V0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcbiAgICAgICAgfTtcbiAgICAgICAgcmVhZGVyLnJlYWRBc1RleHQoZmlsZU9iaik7XG4gICAgfVxuXG4gICAgcmVtb3ZlRmlsdGVyKGZpbHRlcjogRmllbGRGaWx0ZXIpOiB2b2lkIHtcbiAgICAgICAgLy8gY29uc3QgcmVtb3ZlRmlsdGVySW5Hcm91cCA9IChncm91cCwgZmlsdGVyKSA9PiB7XG5cbiAgICAgICAgLy8gfTtcbiAgICAgICAgY29uc3QgcGFyZW50ID0gdGhpcy5nZXRQYXJlbnRGaWx0ZXIoZmlsdGVyKTtcbiAgICAgICAgbGV0IGdyb3VwOiBGaWVsZEZpbHRlcltdO1xuICAgICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgICAgICBncm91cCA9IHBhcmVudC5maWVsZHM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBncm91cCA9IHRoaXMuYWN0aXZlRmlsdGVycztcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGdyb3VwLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgaWYgKEpTT04uc3RyaW5naWZ5KGdyb3VwW2ldKSA9PT0gSlNPTi5zdHJpbmdpZnkoZmlsdGVyKSkge1xuICAgICAgICAgICAgICAgIGdyb3VwLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNhbml0aXplR3JvdXBzKCk7XG4gICAgICAgIHRoaXMuY2hhbmdlLmVtaXQodGhpcy5hY3RpdmVGaWx0ZXJzKTtcbiAgICB9XG5cbiAgICBjbGVhckZpbHRlcnMoKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlRmlsdGVycyA9IFtdO1xuICAgICAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMuYWN0aXZlRmlsdGVycyk7XG4gICAgfVxuXG4gICAgb25Gb2N1cyhldmVudCkge1xuICAgICAgICB0aGlzLmVkaXRpbmcgPSB0cnVlO1xuICAgIH1cblxuICAgIG9uQmx1cihldmVudCkge1xuICAgICAgICB0aGlzLmVkaXRpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5maWx0ZXJPcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgICAgICB0aGlzLnNlbGVjdGVkRmllbGQgPSAodHlwZW9mIHRoaXMuZmlsdGVyT3B0aW9ucy5maWVsZHNbMF0gIT09ICd1bmRlZmluZWQnKSA/IHRoaXMuZmlsdGVyT3B0aW9ucy5maWVsZHNbMF0ubmFtZSA6ICdub25lJztcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmNvbmZpZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuY29uZmlnLm9wZXJhdGlvbnNEYXRhICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHRoaXMub3BlcmF0aW9uc0RhdGEgPSB0aGlzLmNvbmZpZy5vcGVyYXRpb25zRGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5jb25maWcuZmlsdGVyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlRmlsdGVycyA9IHRoaXMuY29uZmlnLmZpbHRlci5zbGljZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHRoaXMuZmlsdGVyT3B0aW9ucyA9IEpTT04ucGFyc2UodGhpcy5vcHRpb25zKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNYXRJY29uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaWNvbic7XG5pbXBvcnQgeyBNYXRTZWxlY3RNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zZWxlY3QnO1xuaW1wb3J0IHsgTWF0Q2hpcHNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jaGlwcyc7XG5pbXBvcnQgeyBNYXRJbnB1dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2lucHV0JztcbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2J1dHRvbic7XG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuaW1wb3J0IHsgTWF0VG9vbHRpcE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3Rvb2x0aXAnO1xuaW1wb3J0IHsgTWF0TWVudU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL21lbnUnO1xuaW1wb3J0IHsgRHJhZ0Ryb3BNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcblxuaW1wb3J0IHsgVFdBRmlsdGVyRWRpdG9yQ29tcG9uZW50IH0gZnJvbSAnLi90d2EtbWQyLWZpbHRlci1lZGl0b3IuY29tcG9uZW50JztcbmltcG9ydCB7IFRXQUZpbHRlckVkaXRvclNlcnZpY2UgfSBmcm9tICcuL3R3YS1tZDItZmlsdGVyLWVkaXRvci5zZXJ2aWNlJztcbmltcG9ydCB7IEZpZWxkRmlsdGVyIH0gZnJvbSAnLi90d2EtbWQyLWZpbHRlci1lZGl0b3IuaW50ZXJmYWNlJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgRm9ybXNNb2R1bGUsXG4gICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgICAgIE1hdEljb25Nb2R1bGUsXG4gICAgICAgIE1hdFNlbGVjdE1vZHVsZSxcbiAgICAgICAgTWF0Q2hpcHNNb2R1bGUsXG4gICAgICAgIE1hdElucHV0TW9kdWxlLFxuICAgICAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgICAgIEZsZXhMYXlvdXRNb2R1bGUsXG4gICAgICAgIE1hdFRvb2x0aXBNb2R1bGUsXG4gICAgICAgIE1hdE1lbnVNb2R1bGUsXG4gICAgICAgIERyYWdEcm9wTW9kdWxlLFxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIFRXQUZpbHRlckVkaXRvckNvbXBvbmVudCxcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgVFdBRmlsdGVyRWRpdG9yQ29tcG9uZW50LFxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIFRXQUZpbHRlckVkaXRvclNlcnZpY2VcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIFRXQUZpbHRlckVkaXRvck1vZHVsZSB7fVxuIl0sIm5hbWVzIjpbIkluamVjdGFibGUiLCJFdmVudEVtaXR0ZXIiLCJDb21wb25lbnQiLCJJbnB1dCIsIk91dHB1dCIsIlZpZXdDaGlsZCIsIkhvc3RMaXN0ZW5lciIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIiwiRm9ybXNNb2R1bGUiLCJSZWFjdGl2ZUZvcm1zTW9kdWxlIiwiTWF0SWNvbk1vZHVsZSIsIk1hdFNlbGVjdE1vZHVsZSIsIk1hdENoaXBzTW9kdWxlIiwiTWF0SW5wdXRNb2R1bGUiLCJNYXRCdXR0b25Nb2R1bGUiLCJGbGV4TGF5b3V0TW9kdWxlIiwiTWF0VG9vbHRpcE1vZHVsZSIsIk1hdE1lbnVNb2R1bGUiLCJEcmFnRHJvcE1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0lBQUE7Ozs7Ozs7Ozs7Ozs7O0FBY0EsSUFlTyxJQUFJLFFBQVEsR0FBRztRQUNsQixRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sSUFBSSxTQUFTLFFBQVEsQ0FBQyxDQUFDO1lBQzNDLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNqRCxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqQixLQUFLLElBQUksQ0FBQyxJQUFJLENBQUM7b0JBQUUsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2hGO1lBQ0QsT0FBTyxDQUFDLENBQUM7U0FDWixDQUFBO1FBQ0QsT0FBTyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztJQUMzQyxDQUFDLENBQUE7Ozs7Ozs7UUNqQ0Q7WUFBQSxpQkF1S0M7WUFyRkcscUJBQWdCLEdBQUcsVUFBQyxPQUFPOztvQkFDbkIsWUFBWSxHQUFHLENBQUM7O29CQUNkLFVBQVUsR0FBRyxFQUFFO2dCQUNyQixPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUM7b0JBQ2pCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxD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