import { __assign } from 'tslib';
import { Injectable, Component, Input, Output, EventEmitter, ViewChild, HostListener, NgModule } from '@angular/core';
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
    TWAFilterEditorComponent.prototype.openFilters = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var fileObj = ((/** @type {?} */ (document.getElementById('openFiltersFile')))).files[0];
        /** @type {?} */
        var reader = new FileReader();
        reader.onload = function () {
            console.log(reader.result);
            /** @type {?} */
            var data = JSON.parse((/** @type {?} */ (reader.result)));
            _this.activeFilters = data;
        };
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
        var fileObj = ((/** @type {?} */ (document.getElementById('fileSet')))).files[0];
        /** @type {?} */
        var reader = new FileReader();
        reader.onload = function () {
            /** @type {?} */
            var lines = ((/** @type {?} */ (reader.result))).split(/\r?\n/).filter(function (val) { return val > ''; });
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
        { type: Component, args: [{
                    selector: 'twa-md2-filter-editor',
                    template: "<div fxLayout=\"column\" style=\"width: 100%;\">\n    <div class=\"selector\" fxLayout=\"row\" fxLayoutGap=\"10px\">\n        <mat-form-field>\n            <mat-select [(ngModel)]=\"selectedField\">\n                <mat-option selected value=\"none\">{{texts.filterBy}}</mat-option>\n                <mat-option *ngFor=\"let field of filterOptions.fields\" [(value)]=\"field.name\">{{field.label}}</mat-option>\n            </mat-select>\n        </mat-form-field>\n        <mat-form-field>\n            <mat-select [(ngModel)]=\"operation\">\n                <mat-option *ngFor=\"let op of operationsData\" value=\"{{op.type}}\">{{op.label}}</mat-option>\n            </mat-select>\n        </mat-form-field>\n        <mat-form-field>\n            <input matInput placeholder=\"{{texts.filter}}\" [(ngModel)]=\"selectedValue\"\n                    (focus)=\"onFocus($event)\" (blur)=\"onBlur($event)\" />\n            <button mat-button *ngIf=\"operation==='in'\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"fileSet.click()\">\n                <mat-icon>attach_file</mat-icon>\n            </button>\n        </mat-form-field>\n        <div>\n            <button mat-button mat-icon-button (click)=\"addFilter()\" [disabled]=\"checkFilter()\">\n                <mat-icon>send</mat-icon>\n            </button>\n        </div>\n        <div fxFlex></div>\n        <button mat-button mat-icon-button\n                *ngIf=\"activeFilters.length === 0\"\n                matTooltip=\"{{texts.openFilter}}\"\n                (click)=\"openFiltersFile.click()\">\n            <mat-icon>folder_open</mat-icon>\n        </button>\n        <div class=\"tools\" *ngIf=\"activeFilters.length > 0\" fxLayout=\"row\">\n            <button mat-button mat-icon-button\n                    matTooltip=\"{{texts.group}}\"\n                    (click)=\"createGroup()\"\n                    [disabled]=\"getSelected() < 2\">\n                <mat-icon>link</mat-icon>\n            </button>\n            <button mat-button mat-icon-button\n                    matTooltip=\"{{texts.ungroup}}\"\n                    (click)=\"removeFromGroup()\"\n                    [disabled]=\"!groupSelected()\">\n                <mat-icon>link_off</mat-icon>\n            </button>\n            <button mat-button mat-icon-button\n                    matTooltip=\"{{texts.moveLeft}}\"\n                    (click)=\"moveTo(-1)\"\n                    [disabled]=\"getSelected() !== 1 && !entireGroupSelected()\">\n                <mat-icon>arrow_back</mat-icon>\n            </button>\n            <button mat-button mat-icon-button\n                    matTooltip=\"{{texts.moveRight}}\"\n                    (click)=\"moveTo(1)\"\n                    [disabled]=\"getSelected() !== 1 && !entireGroupSelected()\">\n                <mat-icon>arrow_forward</mat-icon>\n            </button>\n            <button mat-button mat-icon-button\n                    matTooltip=\"{{texts.openFilter}}\"\n                    (click)=\"openFiltersFile.click()\">\n                <mat-icon>folder_open</mat-icon>\n            </button>\n            <button mat-button mat-icon-button\n                    matTooltip=\"{{texts.saveFilter}}\"\n                    [disabled]=\"getSelected() > 1\"\n                    (click)=\"saveFilters()\">\n                <mat-icon>save</mat-icon>\n            </button>\n            <button mat-button mat-icon-button\n                    matTooltip=\"{{texts.clearSelection}}\"\n                    [disabled]=\"getSelected() < 1\"\n                    (click)=\"clearSelection()\">\n                <mat-icon>clear</mat-icon>\n            </button>\n            <button mat-button mat-icon-button\n                    matTooltip=\"{{texts.clearAll}}\"\n                    [disabled]=\"activeFilters.length < 1\"\n                    (click)=\"clearFilters()\">\n                <mat-icon>clear_all</mat-icon>\n            </button>\n        </div>\n    </div>\n    <div class=\"filter\" fxLayoutGap=\"12\">\n        <mat-chip-list cdkDropList\n                        cdkDropListOrientation=\"horizontal\"\n                        (cdkDropListDropped)=\"onDroppedFilter($event)\">\n            <ng-container *ngFor=\"let filter of activeFilters; let idx = index\">\n                <div fxLayout=\"row\"\n                cdkDrag\n                (cdkDragStarted)=\"onStartDragFilter($event, filter)\" [ngClass]=\"{'cgroup': filter.isgroup}\">\n                    <button mat-button *ngIf=\"idx > 0\" [matMenuTriggerFor]=\"menu\" class=\"bitwise\">{{filter.bitwise}}</button>\n                    <mat-menu #menu=\"matMenu\">\n                        <button mat-menu-item (click)=\"changeBitwise(filter, '&&')\">&&</button>\n                        <button mat-menu-item (click)=\"changeBitwise(filter, '||')\">||</button>\n                    </mat-menu>\n                    <mat-chip color=\"{{filter.color}}\" selected=\"true\"\n                                id=\"filter-{{idx}}\"\n                                [removable]=\"true\" (removed)=\"removeFilter(filter)\"\n                                [matTooltip]=\"filter.value\"\n                                [matTooltipDisabled]=\"filter.operation!=='in'\"\n                                matTooltipShowDelay=\"1500\"\n                                (click)=\"selectFilter(filter)\"\n                                *ngIf=\"!filter.isgroup\"\n                                [ngClass]=\"{'selected': filter.selected, 'mat-accent': filter.selected}\">\n                        {{filter.explanation}}\n                        <mat-icon matChipRemove>cancel</mat-icon>\n                    </mat-chip>\n                    <div *ngIf=\"filter.isgroup\" fxLayout=\"row\">\n                        <div *ngTemplateOutlet=\"group; context: { filter: this.filter, idx: this.idx}\" fxLayout=\"row\">\n                        </div>\n                    </div>\n                </div>\n            </ng-container>\n        </mat-chip-list>\n    </div>\n</div>\n<input style=\"visibilty: hidden; height: 0px; width: 0px;\" type=\"file\" id=\"fileSet\" #fileSet (change)=\"uploadSet()\" />\n<input style=\"visibilty: hidden; height: 0px; width: 0px;\" type=\"file\" id=\"openFiltersFile\" #openFiltersFile (change)=\"openFilters()\" />\n<ng-template #group let-filter=\"filter\" let-idx=\"idx\">\n    <span class=\"group-start\">(</span>\n    <ng-container *ngFor=\"let filter2 of filter.fields; let idx2 = index\">\n        <button mat-button *ngIf=\"idx2 > 0\" [matMenuTriggerFor]=\"menu2\"\n                class=\"bitwise\">\n            {{filter2.bitwise}}\n        </button>\n        <mat-menu #menu2=\"matMenu\">\n            <button mat-menu-item (click)=\"changeBitwise(filter2, '&&')\">&&</button>\n            <button mat-menu-item (click)=\"changeBitwise(filter2, '||')\">||</button>\n        </mat-menu>\n        <div>\n            <mat-chip color=\"{{filter.color}}\" selected=\"true\"\n                id=\"filter-{{idx}}-{{idx2}}\"\n                [removable]=\"true\" (removed)=\"removeFilter(filter2)\"\n                [matTooltip]=\"filter2.value\"\n                [matTooltipDisabled]=\"filter.operation!=='in'\"\n                matTooltipShowDelay=\"1500\"\n                (click)=\"selectFilter(filter2)\"\n                [ngClass]=\"{'selected': filter2.selected, 'mat-accent': filter2.selected}\"\n                *ngIf=\"!filter2.isgroup\"\n            >{{filter2.explanation}}\n                <mat-icon matChipRemove>cancel</mat-icon>\n            </mat-chip>\n            <div *ngIf=\"filter2.isgroup\" fxLayout=\"row\">\n                <div *ngTemplateOutlet=\"group; context: { filter: this.filter2, idx: this.idx2}\">\n                </div>\n            </div>\n        </div>\n    </ng-container>\n    <span class=\"group-end\">)</span>\n</ng-template>\n",
                    styles: [
                        "\n    .error { color: red; }\n    .selector {\n        width: 100%;\n    }\n    .filter {\n        padding-bottom: 12px;\n    }\n    .filter mat-chip {\n        margin: 4px;\n    }\n    .cgroup {\n        display: flex;\n    }\n    mat-chip.selected {\n        color: #fff;\n        font-weight: bold;\n    }\n    span.group-start,\n    span.group-end {\n        font-size: 25px;\n    }\n    button.bitwise {\n        min-width: 24px;\n        padding-left: 0;\n        padding-right: 0;\n    }\n    "
                    ]
                },] },
    ];
    /** @nocollapse */
    TWAFilterEditorComponent.ctorParameters = function () { return []; };
    TWAFilterEditorComponent.propDecorators = {
        options: [{ type: Input }],
        config: [{ type: Input }],
        change: [{ type: Output }],
        fileSet: [{ type: ViewChild, args: ['fileSet',] }],
        openFiltersFile: [{ type: ViewChild, args: ['oepnFiltersFile',] }],
        handleKeyboardEvent: [{ type: HostListener, args: ['document:keydown', ['$event'],] }]
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { TWAFilterEditorService, TWAFilterEditorComponent, TWAFilterEditorModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdhLW1kMi1maWx0ZXItZWRpdG9yLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly90d2EtbWQyLWZpbHRlci1lZGl0b3IvbGliL3R3YS1tZDItZmlsdGVyLWVkaXRvci5zZXJ2aWNlLnRzIiwibmc6Ly90d2EtbWQyLWZpbHRlci1lZGl0b3IvbGliL3R3YS1tZDItZmlsdGVyLWVkaXRvci5jb21wb25lbnQudHMiLCJuZzovL3R3YS1tZDItZmlsdGVyLWVkaXRvci9saWIvdHdhLW1kMi1maWx0ZXItZWRpdG9yLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFRXQUZpbHRlckVkaXRvckNvbXBvbmVudCB9IGZyb20gJy4vdHdhLW1kMi1maWx0ZXItZWRpdG9yLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGaWVsZEZpbHRlciB9IGZyb20gJy4vdHdhLW1kMi1maWx0ZXItZWRpdG9yLmludGVyZmFjZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUV0FGaWx0ZXJFZGl0b3JTZXJ2aWNlIHtcblxuICAgIGZpbHRlcnM6IEZpZWxkRmlsdGVyW107XG5cbiAgICBmaWx0ZXJlZERhdGE6IGFueVtdO1xuICAgIGZpbHRlcjogVFdBRmlsdGVyRWRpdG9yQ29tcG9uZW50O1xuICAgIGRhdGE6IGFueVtdO1xuICAgIHByZXBhcmVEYXRhOiBGdW5jdGlvbjtcbiAgICBwcm9jZXNzZWRGaWx0ZXJzOiBhbnlbXTtcblxuICAgIGluaXQoXG4gICAgICAgIGZpbHRlcjogVFdBRmlsdGVyRWRpdG9yQ29tcG9uZW50LFxuICAgICAgICBkYXRhOiBhbnlbXSxcbiAgICAgICAgcHJlcGFyZURhdGE/OiBGdW5jdGlvblxuICAgICkge1xuICAgICAgICB0aGlzLmZpbHRlciA9IGZpbHRlcjtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICAgICAgdGhpcy5wcmVwYXJlRGF0YSA9IHByZXBhcmVEYXRhO1xuXG4gICAgICAgIHRoaXMuZmlsdGVyLmNoYW5nZS5zdWJzY3JpYmUoKGZpbHRlcnM6IEZpZWxkRmlsdGVyW10pID0+IHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVycyA9IGZpbHRlcnM7XG4gICAgICAgICAgICB0aGlzLmFwcGx5RmlsdGVyKCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnByb2Nlc3NlZEZpbHRlcnMgPSB0aGlzLnByb2Nlc3NGaWx0ZXJPcnModGhpcy5maWx0ZXIuYWN0aXZlRmlsdGVycyk7XG4gICAgfVxuXG4gICAgYXBwbHlGaWx0ZXIoZGF0YSA9IHRoaXMuZGF0YS5zbGljZSgpKSB7XG5cbiAgICAgICAgLy8gbGV0IGRhdGEgPSB0aGlzLmRhdGEuc2xpY2UoKTtcbiAgICAgICAgbGV0IHJldCA9IHRydWU7XG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IGRhdGEubGVuZ3RoO1xuXG4gICAgICAgIGlmICghdGhpcy5maWx0ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wcm9jZXNzZWRGaWx0ZXJzID0gdGhpcy5wcm9jZXNzRmlsdGVyT3JzKHRoaXMuZmlsdGVyLmFjdGl2ZUZpbHRlcnMpO1xuXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG5cbiAgICAgICAgZGF0YSA9IGRhdGEubWFwKChpdGVtLCBpZHgpID0+IHtcbiAgICAgICAgICAgIGl0ZW0ucmVhbEluZGV4ID0gaWR4O1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgIH0pLmZpbHRlcigoaXRlbTogYW55KSA9PiB7XG4gICAgICAgICAgICByZXQgPSB0aGlzLmFwcGx5RmlsdGVyVG9Sb3coaXRlbSk7XG4gICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGF0YTtcblxuICAgIH1cblxuICAgIGFwcGx5RmlsdGVyVG9Sb3coaXRlbSkge1xuXG4gICAgICAgIGxldCByZXQgPSB0cnVlO1xuICAgICAgICBjb25zdCByZXN1bHRzID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSB0aGlzLnByb2Nlc3NlZEZpbHRlcnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHRzMiA9IFtdO1xuICAgICAgICAgICAgdGhpcy5wcm9jZXNzZWRGaWx0ZXJzW2ldLmZvckVhY2goKHY6IEZpZWxkRmlsdGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzdWx0czIucHVzaCh0aGlzLmZpbHRlckRhdGEodiwgaXRlbSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXN1bHRzLnB1c2gocmVzdWx0czIucmVkdWNlKChhY2MsIHYpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXYpIHtcbiAgICAgICAgICAgICAgICAgICAgYWNjID0gdjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgICAgIH0sIHRydWUpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZXN1bHRzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0ID0gcmVzdWx0cy5yZWR1Y2UoKGFjYywgdikgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh2KSB7XG4gICAgICAgICAgICAgICAgICAgIGFjYyA9IHY7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJldDtcblxuICAgIH1cblxuICAgIHByb2Nlc3NGaWx0ZXJPcnMgPSAoZmlsdGVycykgPT4ge1xuICAgICAgICBsZXQgYWN0dWFsRmlsdGVyID0gMDtcbiAgICAgICAgY29uc3QgbmV3RmlsdGVycyA9IFtdO1xuICAgICAgICBmaWx0ZXJzLmZvckVhY2goKHYsIGkpID0+IHtcbiAgICAgICAgICAgIGlmIChpID4gMCAmJiB2LmJpdHdpc2UgPT09ICd8fCcpIHtcbiAgICAgICAgICAgICAgICBhY3R1YWxGaWx0ZXIrKztcbiAgICAgICAgICAgICAgICBuZXdGaWx0ZXJzLnB1c2goW10pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZihuZXdGaWx0ZXJzW2FjdHVhbEZpbHRlcl0pID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIG5ld0ZpbHRlcnMucHVzaChbXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodi5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3R3JvdXAgPSB7Li4udiwgZmllbGRzOiB0aGlzLnByb2Nlc3NGaWx0ZXJPcnModi5maWVsZHMpfTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhuZXdHcm91cCk7XG4gICAgICAgICAgICAgICAgbmV3RmlsdGVyc1thY3R1YWxGaWx0ZXJdLnB1c2gobmV3R3JvdXApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXdGaWx0ZXJzW2FjdHVhbEZpbHRlcl0ucHVzaCh2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIG5ld0ZpbHRlcnM7XG4gICAgfVxuXG4gICAgZmlsdGVyRGF0YSA9IChmaWx0ZXI6IGFueSwgZmlsdGVyVmFsdWU6IGFueSkgPT4ge1xuXG4gICAgICAgIGNvbnN0IGNvbXBhcmF0b3JzID0ge1xuICAgICAgICAgICAgJz0+JzogKGE6IHN0cmluZywgYjogc3RyaW5nKSA9PiBhLmluY2x1ZGVzKGIpLFxuICAgICAgICAgICAgJz09PSc6IChhOiBhbnksIGI6IGFueSkgPT4gYSA9PT0gYixcbiAgICAgICAgICAgICc+PSc6IChhOiBhbnksIGI6IGFueSkgPT4gYSA+PSBiLFxuICAgICAgICAgICAgJz4nOiAoYTogYW55LCBiOiBhbnkpID0+IGEgPiBiLFxuICAgICAgICAgICAgJzw9JzogKGE6IGFueSwgYjogYW55KSA9PiBhIDw9IGIsXG4gICAgICAgICAgICAnPCc6IChhOiBhbnksIGI6IGFueSkgPT4gYSA8IGIsXG4gICAgICAgICAgICAnaW4nOiAoYTogYW55LCBiOiBhbnkpID0+IGIuc3BsaXQoJywnKS5pbmNsdWRlcyhhKSxcbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgcmV0VmFsdWUgPSBmYWxzZTtcblxuICAgICAgICBpZiAoZmlsdGVyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgIHJldFZhbHVlID0gdGhpcy5maWx0ZXJHcm91cChmaWx0ZXIsIGZpbHRlclZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXBhcmVEYXRhKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmVwYXJlRGF0YShmaWx0ZXIsIGZpbHRlclZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBmaWx0ZXJWYWx1ZVtmaWx0ZXIuZmllbGRdID09PSAnbnVtYmVyJyAmJiAoZmlsdGVyLm9wZXJhdGlvbiAhPT0gJz0+JyAmJiBmaWx0ZXIub3BlcmF0aW9uICE9PSAnaW4nKSkge1xuICAgICAgICAgICAgICAgICAgICByZXRWYWx1ZSA9IGNvbXBhcmF0b3JzW2ZpbHRlci5vcGVyYXRpb25dKCtmaWx0ZXJWYWx1ZVtmaWx0ZXIuZmllbGRdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICtmaWx0ZXIudmFsdWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldFZhbHVlID0gY29tcGFyYXRvcnNbZmlsdGVyLm9wZXJhdGlvbl0oU3RyaW5nKGZpbHRlclZhbHVlW2ZpbHRlci5maWVsZF0pLnRvTG93ZXJDYXNlKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU3RyaW5nKGZpbHRlci52YWx1ZSkudG9Mb3dlckNhc2UoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICAgICAgcmV0VmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXRWYWx1ZTtcblxuICAgIH1cblxuICAgIGZpbHRlckdyb3VwID0gKGZpbHRlcjogYW55LCBmaWx0ZXJWYWx1ZTogYW55KSA9PiB7XG5cbiAgICAgICAgY29uc3QgcmVzdWx0cyA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gZmlsdGVyLmZpZWxkcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdHMyID0gW107XG4gICAgICAgICAgICBmaWx0ZXIuZmllbGRzW2ldLmZvckVhY2goKHY6IGFueVtdKSA9PiB7XG4gICAgICAgICAgICAgICByZXN1bHRzMi5wdXNoKHRoaXMuZmlsdGVyRGF0YSh2LCBmaWx0ZXJWYWx1ZSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXN1bHRzLnB1c2gocmVzdWx0czIucmVkdWNlKChhY2MsIHYyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF2Mikge1xuICAgICAgICAgICAgICAgICAgICBhY2MgPSB2MjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgICAgIH0sIHRydWUpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHRzLnJlZHVjZSgoYWNjLCB2KSA9PiB7XG4gICAgICAgICAgICBpZiAodikge1xuICAgICAgICAgICAgICAgIGFjYyA9IHY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICB9LCBmYWxzZSk7XG5cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBGaWx0ZXJFZGl0b3JPcHRpb25zLCBGaWVsZEZpbHRlciwgRmlsdGVyRWRpdG9yQ29uZmlnIH0gZnJvbSAnLi90d2EtbWQyLWZpbHRlci1lZGl0b3IuaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndHdhLW1kMi1maWx0ZXItZWRpdG9yJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGZ4TGF5b3V0PVwiY29sdW1uXCIgc3R5bGU9XCJ3aWR0aDogMTAwJTtcIj5cbiAgICA8ZGl2IGNsYXNzPVwic2VsZWN0b3JcIiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0R2FwPVwiMTBweFwiPlxuICAgICAgICA8bWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICA8bWF0LXNlbGVjdCBbKG5nTW9kZWwpXT1cInNlbGVjdGVkRmllbGRcIj5cbiAgICAgICAgICAgICAgICA8bWF0LW9wdGlvbiBzZWxlY3RlZCB2YWx1ZT1cIm5vbmVcIj57e3RleHRzLmZpbHRlckJ5fX08L21hdC1vcHRpb24+XG4gICAgICAgICAgICAgICAgPG1hdC1vcHRpb24gKm5nRm9yPVwibGV0IGZpZWxkIG9mIGZpbHRlck9wdGlvbnMuZmllbGRzXCIgWyh2YWx1ZSldPVwiZmllbGQubmFtZVwiPnt7ZmllbGQubGFiZWx9fTwvbWF0LW9wdGlvbj5cbiAgICAgICAgICAgIDwvbWF0LXNlbGVjdD5cbiAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgPG1hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgPG1hdC1zZWxlY3QgWyhuZ01vZGVsKV09XCJvcGVyYXRpb25cIj5cbiAgICAgICAgICAgICAgICA8bWF0LW9wdGlvbiAqbmdGb3I9XCJsZXQgb3Agb2Ygb3BlcmF0aW9uc0RhdGFcIiB2YWx1ZT1cInt7b3AudHlwZX19XCI+e3tvcC5sYWJlbH19PC9tYXQtb3B0aW9uPlxuICAgICAgICAgICAgPC9tYXQtc2VsZWN0PlxuICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICA8bWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgcGxhY2Vob2xkZXI9XCJ7e3RleHRzLmZpbHRlcn19XCIgWyhuZ01vZGVsKV09XCJzZWxlY3RlZFZhbHVlXCJcbiAgICAgICAgICAgICAgICAgICAgKGZvY3VzKT1cIm9uRm9jdXMoJGV2ZW50KVwiIChibHVyKT1cIm9uQmx1cigkZXZlbnQpXCIgLz5cbiAgICAgICAgICAgIDxidXR0b24gbWF0LWJ1dHRvbiAqbmdJZj1cIm9wZXJhdGlvbj09PSdpbidcIiBtYXRTdWZmaXggbWF0LWljb24tYnV0dG9uIGFyaWEtbGFiZWw9XCJDbGVhclwiIChjbGljayk9XCJmaWxlU2V0LmNsaWNrKClcIj5cbiAgICAgICAgICAgICAgICA8bWF0LWljb24+YXR0YWNoX2ZpbGU8L21hdC1pY29uPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8YnV0dG9uIG1hdC1idXR0b24gbWF0LWljb24tYnV0dG9uIChjbGljayk9XCJhZGRGaWx0ZXIoKVwiIFtkaXNhYmxlZF09XCJjaGVja0ZpbHRlcigpXCI+XG4gICAgICAgICAgICAgICAgPG1hdC1pY29uPnNlbmQ8L21hdC1pY29uPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGZ4RmxleD48L2Rpdj5cbiAgICAgICAgPGJ1dHRvbiBtYXQtYnV0dG9uIG1hdC1pY29uLWJ1dHRvblxuICAgICAgICAgICAgICAgICpuZ0lmPVwiYWN0aXZlRmlsdGVycy5sZW5ndGggPT09IDBcIlxuICAgICAgICAgICAgICAgIG1hdFRvb2x0aXA9XCJ7e3RleHRzLm9wZW5GaWx0ZXJ9fVwiXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9wZW5GaWx0ZXJzRmlsZS5jbGljaygpXCI+XG4gICAgICAgICAgICA8bWF0LWljb24+Zm9sZGVyX29wZW48L21hdC1pY29uPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRvb2xzXCIgKm5nSWY9XCJhY3RpdmVGaWx0ZXJzLmxlbmd0aCA+IDBcIiBmeExheW91dD1cInJvd1wiPlxuICAgICAgICAgICAgPGJ1dHRvbiBtYXQtYnV0dG9uIG1hdC1pY29uLWJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBtYXRUb29sdGlwPVwie3t0ZXh0cy5ncm91cH19XCJcbiAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cImNyZWF0ZUdyb3VwKClcIlxuICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZ2V0U2VsZWN0ZWQoKSA8IDJcIj5cbiAgICAgICAgICAgICAgICA8bWF0LWljb24+bGluazwvbWF0LWljb24+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gbWF0LWJ1dHRvbiBtYXQtaWNvbi1idXR0b25cbiAgICAgICAgICAgICAgICAgICAgbWF0VG9vbHRpcD1cInt7dGV4dHMudW5ncm91cH19XCJcbiAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cInJlbW92ZUZyb21Hcm91cCgpXCJcbiAgICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cIiFncm91cFNlbGVjdGVkKClcIj5cbiAgICAgICAgICAgICAgICA8bWF0LWljb24+bGlua19vZmY8L21hdC1pY29uPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIG1hdC1idXR0b24gbWF0LWljb24tYnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIG1hdFRvb2x0aXA9XCJ7e3RleHRzLm1vdmVMZWZ0fX1cIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwibW92ZVRvKC0xKVwiXG4gICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJnZXRTZWxlY3RlZCgpICE9PSAxICYmICFlbnRpcmVHcm91cFNlbGVjdGVkKClcIj5cbiAgICAgICAgICAgICAgICA8bWF0LWljb24+YXJyb3dfYmFjazwvbWF0LWljb24+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gbWF0LWJ1dHRvbiBtYXQtaWNvbi1idXR0b25cbiAgICAgICAgICAgICAgICAgICAgbWF0VG9vbHRpcD1cInt7dGV4dHMubW92ZVJpZ2h0fX1cIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwibW92ZVRvKDEpXCJcbiAgICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImdldFNlbGVjdGVkKCkgIT09IDEgJiYgIWVudGlyZUdyb3VwU2VsZWN0ZWQoKVwiPlxuICAgICAgICAgICAgICAgIDxtYXQtaWNvbj5hcnJvd19mb3J3YXJkPC9tYXQtaWNvbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBtYXQtYnV0dG9uIG1hdC1pY29uLWJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBtYXRUb29sdGlwPVwie3t0ZXh0cy5vcGVuRmlsdGVyfX1cIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwib3BlbkZpbHRlcnNGaWxlLmNsaWNrKClcIj5cbiAgICAgICAgICAgICAgICA8bWF0LWljb24+Zm9sZGVyX29wZW48L21hdC1pY29uPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIG1hdC1idXR0b24gbWF0LWljb24tYnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIG1hdFRvb2x0aXA9XCJ7e3RleHRzLnNhdmVGaWx0ZXJ9fVwiXG4gICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJnZXRTZWxlY3RlZCgpID4gMVwiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJzYXZlRmlsdGVycygpXCI+XG4gICAgICAgICAgICAgICAgPG1hdC1pY29uPnNhdmU8L21hdC1pY29uPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIG1hdC1idXR0b24gbWF0LWljb24tYnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIG1hdFRvb2x0aXA9XCJ7e3RleHRzLmNsZWFyU2VsZWN0aW9ufX1cIlxuICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZ2V0U2VsZWN0ZWQoKSA8IDFcIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwiY2xlYXJTZWxlY3Rpb24oKVwiPlxuICAgICAgICAgICAgICAgIDxtYXQtaWNvbj5jbGVhcjwvbWF0LWljb24+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gbWF0LWJ1dHRvbiBtYXQtaWNvbi1idXR0b25cbiAgICAgICAgICAgICAgICAgICAgbWF0VG9vbHRpcD1cInt7dGV4dHMuY2xlYXJBbGx9fVwiXG4gICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJhY3RpdmVGaWx0ZXJzLmxlbmd0aCA8IDFcIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwiY2xlYXJGaWx0ZXJzKClcIj5cbiAgICAgICAgICAgICAgICA8bWF0LWljb24+Y2xlYXJfYWxsPC9tYXQtaWNvbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZmlsdGVyXCIgZnhMYXlvdXRHYXA9XCIxMlwiPlxuICAgICAgICA8bWF0LWNoaXAtbGlzdCBjZGtEcm9wTGlzdFxuICAgICAgICAgICAgICAgICAgICAgICAgY2RrRHJvcExpc3RPcmllbnRhdGlvbj1cImhvcml6b250YWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKGNka0Ryb3BMaXN0RHJvcHBlZCk9XCJvbkRyb3BwZWRGaWx0ZXIoJGV2ZW50KVwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZmlsdGVyIG9mIGFjdGl2ZUZpbHRlcnM7IGxldCBpZHggPSBpbmRleFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIlxuICAgICAgICAgICAgICAgIGNka0RyYWdcbiAgICAgICAgICAgICAgICAoY2RrRHJhZ1N0YXJ0ZWQpPVwib25TdGFydERyYWdGaWx0ZXIoJGV2ZW50LCBmaWx0ZXIpXCIgW25nQ2xhc3NdPVwieydjZ3JvdXAnOiBmaWx0ZXIuaXNncm91cH1cIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBtYXQtYnV0dG9uICpuZ0lmPVwiaWR4ID4gMFwiIFttYXRNZW51VHJpZ2dlckZvcl09XCJtZW51XCIgY2xhc3M9XCJiaXR3aXNlXCI+e3tmaWx0ZXIuYml0d2lzZX19PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtbWVudSAjbWVudT1cIm1hdE1lbnVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gbWF0LW1lbnUtaXRlbSAoY2xpY2spPVwiY2hhbmdlQml0d2lzZShmaWx0ZXIsICcmJicpXCI+JiY8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gbWF0LW1lbnUtaXRlbSAoY2xpY2spPVwiY2hhbmdlQml0d2lzZShmaWx0ZXIsICd8fCcpXCI+fHw8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9tYXQtbWVudT5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1jaGlwIGNvbG9yPVwie3tmaWx0ZXIuY29sb3J9fVwiIHNlbGVjdGVkPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPVwiZmlsdGVyLXt7aWR4fX1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcmVtb3ZhYmxlXT1cInRydWVcIiAocmVtb3ZlZCk9XCJyZW1vdmVGaWx0ZXIoZmlsdGVyKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFttYXRUb29sdGlwXT1cImZpbHRlci52YWx1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFttYXRUb29sdGlwRGlzYWJsZWRdPVwiZmlsdGVyLm9wZXJhdGlvbiE9PSdpbidcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRUb29sdGlwU2hvd0RlbGF5PVwiMTUwMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJzZWxlY3RGaWx0ZXIoZmlsdGVyKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiIWZpbHRlci5pc2dyb3VwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieydzZWxlY3RlZCc6IGZpbHRlci5zZWxlY3RlZCwgJ21hdC1hY2NlbnQnOiBmaWx0ZXIuc2VsZWN0ZWR9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7e2ZpbHRlci5leHBsYW5hdGlvbn19XG4gICAgICAgICAgICAgICAgICAgICAgICA8bWF0LWljb24gbWF0Q2hpcFJlbW92ZT5jYW5jZWw8L21hdC1pY29uPlxuICAgICAgICAgICAgICAgICAgICA8L21hdC1jaGlwPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiZmlsdGVyLmlzZ3JvdXBcIiBmeExheW91dD1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiAqbmdUZW1wbGF0ZU91dGxldD1cImdyb3VwOyBjb250ZXh0OiB7IGZpbHRlcjogdGhpcy5maWx0ZXIsIGlkeDogdGhpcy5pZHh9XCIgZnhMYXlvdXQ9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L21hdC1jaGlwLWxpc3Q+XG4gICAgPC9kaXY+XG48L2Rpdj5cbjxpbnB1dCBzdHlsZT1cInZpc2liaWx0eTogaGlkZGVuOyBoZWlnaHQ6IDBweDsgd2lkdGg6IDBweDtcIiB0eXBlPVwiZmlsZVwiIGlkPVwiZmlsZVNldFwiICNmaWxlU2V0IChjaGFuZ2UpPVwidXBsb2FkU2V0KClcIiAvPlxuPGlucHV0IHN0eWxlPVwidmlzaWJpbHR5OiBoaWRkZW47IGhlaWdodDogMHB4OyB3aWR0aDogMHB4O1wiIHR5cGU9XCJmaWxlXCIgaWQ9XCJvcGVuRmlsdGVyc0ZpbGVcIiAjb3BlbkZpbHRlcnNGaWxlIChjaGFuZ2UpPVwib3BlbkZpbHRlcnMoKVwiIC8+XG48bmctdGVtcGxhdGUgI2dyb3VwIGxldC1maWx0ZXI9XCJmaWx0ZXJcIiBsZXQtaWR4PVwiaWR4XCI+XG4gICAgPHNwYW4gY2xhc3M9XCJncm91cC1zdGFydFwiPig8L3NwYW4+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZmlsdGVyMiBvZiBmaWx0ZXIuZmllbGRzOyBsZXQgaWR4MiA9IGluZGV4XCI+XG4gICAgICAgIDxidXR0b24gbWF0LWJ1dHRvbiAqbmdJZj1cImlkeDIgPiAwXCIgW21hdE1lbnVUcmlnZ2VyRm9yXT1cIm1lbnUyXCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cImJpdHdpc2VcIj5cbiAgICAgICAgICAgIHt7ZmlsdGVyMi5iaXR3aXNlfX1cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxtYXQtbWVudSAjbWVudTI9XCJtYXRNZW51XCI+XG4gICAgICAgICAgICA8YnV0dG9uIG1hdC1tZW51LWl0ZW0gKGNsaWNrKT1cImNoYW5nZUJpdHdpc2UoZmlsdGVyMiwgJyYmJylcIj4mJjwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBtYXQtbWVudS1pdGVtIChjbGljayk9XCJjaGFuZ2VCaXR3aXNlKGZpbHRlcjIsICd8fCcpXCI+fHw8L2J1dHRvbj5cbiAgICAgICAgPC9tYXQtbWVudT5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxtYXQtY2hpcCBjb2xvcj1cInt7ZmlsdGVyLmNvbG9yfX1cIiBzZWxlY3RlZD1cInRydWVcIlxuICAgICAgICAgICAgICAgIGlkPVwiZmlsdGVyLXt7aWR4fX0te3tpZHgyfX1cIlxuICAgICAgICAgICAgICAgIFtyZW1vdmFibGVdPVwidHJ1ZVwiIChyZW1vdmVkKT1cInJlbW92ZUZpbHRlcihmaWx0ZXIyKVwiXG4gICAgICAgICAgICAgICAgW21hdFRvb2x0aXBdPVwiZmlsdGVyMi52YWx1ZVwiXG4gICAgICAgICAgICAgICAgW21hdFRvb2x0aXBEaXNhYmxlZF09XCJmaWx0ZXIub3BlcmF0aW9uIT09J2luJ1wiXG4gICAgICAgICAgICAgICAgbWF0VG9vbHRpcFNob3dEZWxheT1cIjE1MDBcIlxuICAgICAgICAgICAgICAgIChjbGljayk9XCJzZWxlY3RGaWx0ZXIoZmlsdGVyMilcIlxuICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsnc2VsZWN0ZWQnOiBmaWx0ZXIyLnNlbGVjdGVkLCAnbWF0LWFjY2VudCc6IGZpbHRlcjIuc2VsZWN0ZWR9XCJcbiAgICAgICAgICAgICAgICAqbmdJZj1cIiFmaWx0ZXIyLmlzZ3JvdXBcIlxuICAgICAgICAgICAgPnt7ZmlsdGVyMi5leHBsYW5hdGlvbn19XG4gICAgICAgICAgICAgICAgPG1hdC1pY29uIG1hdENoaXBSZW1vdmU+Y2FuY2VsPC9tYXQtaWNvbj5cbiAgICAgICAgICAgIDwvbWF0LWNoaXA+XG4gICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiZmlsdGVyMi5pc2dyb3VwXCIgZnhMYXlvdXQ9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ1RlbXBsYXRlT3V0bGV0PVwiZ3JvdXA7IGNvbnRleHQ6IHsgZmlsdGVyOiB0aGlzLmZpbHRlcjIsIGlkeDogdGhpcy5pZHgyfVwiPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvbmctY29udGFpbmVyPlxuICAgIDxzcGFuIGNsYXNzPVwiZ3JvdXAtZW5kXCI+KTwvc3Bhbj5cbjwvbmctdGVtcGxhdGU+XG5gLFxuICBzdHlsZXM6IFtcbiAgICBgXG4gICAgLmVycm9yIHsgY29sb3I6IHJlZDsgfVxuICAgIC5zZWxlY3RvciB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgIH1cbiAgICAuZmlsdGVyIHtcbiAgICAgICAgcGFkZGluZy1ib3R0b206IDEycHg7XG4gICAgfVxuICAgIC5maWx0ZXIgbWF0LWNoaXAge1xuICAgICAgICBtYXJnaW46IDRweDtcbiAgICB9XG4gICAgLmNncm91cCB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgfVxuICAgIG1hdC1jaGlwLnNlbGVjdGVkIHtcbiAgICAgICAgY29sb3I6ICNmZmY7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIH1cbiAgICBzcGFuLmdyb3VwLXN0YXJ0LFxuICAgIHNwYW4uZ3JvdXAtZW5kIHtcbiAgICAgICAgZm9udC1zaXplOiAyNXB4O1xuICAgIH1cbiAgICBidXR0b24uYml0d2lzZSB7XG4gICAgICAgIG1pbi13aWR0aDogMjRweDtcbiAgICAgICAgcGFkZGluZy1sZWZ0OiAwO1xuICAgICAgICBwYWRkaW5nLXJpZ2h0OiAwO1xuICAgIH1cbiAgICBgXG4gIF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBUV0FGaWx0ZXJFZGl0b3JDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQElucHV0KCkgb3B0aW9uczogRmlsdGVyRWRpdG9yT3B0aW9ucztcbiAgICBASW5wdXQoKSBjb25maWc6IEZpbHRlckVkaXRvckNvbmZpZztcbiAgICBAT3V0cHV0KCkgY2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55W10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnlbXT4oKTtcblxuICAgIEBWaWV3Q2hpbGQoJ2ZpbGVTZXQnKSBmaWxlU2V0OiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoJ29lcG5GaWx0ZXJzRmlsZScpIG9wZW5GaWx0ZXJzRmlsZTogRWxlbWVudFJlZjtcblxuICAgIGZpbHRlck9wdGlvbnM6IEZpbHRlckVkaXRvck9wdGlvbnM7XG4gICAgc2VsZWN0ZWRGaWVsZCA9ICdub25lJztcbiAgICBzZWxlY3RlZFZhbHVlID0gJyc7XG4gICAgb3BlcmF0aW9uID0gJ2NvbnRhaW4nO1xuICAgIGFjdGl2ZUZpbHRlcnM6IEZpZWxkRmlsdGVyW10gPSBbXTtcbiAgICBlZGl0aW5nID0gZmFsc2U7XG4gICAgdGV4dHMgPSB7XG4gICAgICAgIGZpbHRlckJ5OiAnRmlsdGVyIGJ5Li4uJyxcbiAgICAgICAgZmlsdGVyOiAnZmlsdGVyJyxcbiAgICAgICAgZ3JvdXA6ICdHcm91cCcsXG4gICAgICAgIHVuZ3JvdXA6ICdVbmdyb3VwJyxcbiAgICAgICAgbW92ZUxlZnQ6ICdNb3ZlIHRvIGxlZnQnLFxuICAgICAgICBtb3ZlUmlnaHQ6ICdNb3ZlIHRvIHJpZ2h0JyxcbiAgICAgICAgb3BlbkZpbHRlcjogJ09wZW4gc2F2ZWQgZmlsdGVyJyxcbiAgICAgICAgc2F2ZUZpbHRlcjogJ1NhdmUgZmlsdGVyJyxcbiAgICAgICAgY2xlYXJTZWxlY3Rpb246ICdDbGVhciBzZWxlY3Rpb24nLFxuICAgICAgICBjbGVhckFsbDogJ0NsZWFyIGZpbHRlcnMnLFxuXG4gICAgfTtcbiAgICBvcGVyYXRpb25zOiBhbnkgPSB7XG4gICAgICAgIGNvbnRhaW46ICc9PicsXG4gICAgICAgIGVxdWFsOiAnPT09JyxcbiAgICAgICAgZ3JlYXRlckVxdWFsOiAnPj0nLFxuICAgICAgICBncmVhdGVyOiAnPicsXG4gICAgICAgIGxlc3NFcXVhbDogJzw9JyxcbiAgICAgICAgbGVzczogJzwnLFxuICAgICAgICBpbjogJ2luJyxcbiAgICB9O1xuICAgIG9wZXJhdGlvbnNEYXRhID0gW1xuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnY29udGFpbicsXG4gICAgICAgICAgICBsYWJlbDogJ2NvbnRhaW5zJyxcbiAgICAgICAgICAgIG9wZXJhdG9yOiAnPT4nXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdlcXVhbCcsXG4gICAgICAgICAgICBsYWJlbDogJ2VxdWFscycsXG4gICAgICAgICAgICBvcGVyYXRvcjogJz09PSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2dyZWF0ZXJFcXVhbCcsXG4gICAgICAgICAgICBsYWJlbDogJ2dyZWF0ZXIgb3IgZXF1YWwnLFxuICAgICAgICAgICAgb3BlcmF0b3I6ICc+PSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2dyZWF0ZXInLFxuICAgICAgICAgICAgbGFiZWw6ICdncmVhdGVyJyxcbiAgICAgICAgICAgIG9wZXJhdG9yOiAnPidcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2xlc3NFcXVhbCcsXG4gICAgICAgICAgICBsYWJlbDogJ2xlc3Mgb3IgZXF1YWwnLFxuICAgICAgICAgICAgb3BlcmF0b3I6ICc8PSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2xlc3MnLFxuICAgICAgICAgICAgbGFiZWw6ICdsZXNzJyxcbiAgICAgICAgICAgIG9wZXJhdG9yOiAnPCdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2luJyxcbiAgICAgICAgICAgIGxhYmVsOiAnaW4nLFxuICAgICAgICAgICAgb3BlcmF0b3I6ICdpbidcbiAgICAgICAgfSxcbiAgICBdO1xuXG4gICAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6a2V5ZG93bicsIFsnJGV2ZW50J10pXG4gICAgaGFuZGxlS2V5Ym9hcmRFdmVudChldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAoKGV2ZW50LmtleSA9PT0gJ2MnICYmIGV2ZW50LmN0cmxLZXkpKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyRmlsdGVycygpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZWRpdGluZyAmJiBldmVudC5rZXlDb2RlID09PSAxMykge1xuICAgICAgICAgICAgdGhpcy5hZGRGaWx0ZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKCkge31cblxuICAgIG9wZW5GaWx0ZXJzKCkge1xuICAgICAgICBjb25zdCBmaWxlT2JqID0gKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvcGVuRmlsdGVyc0ZpbGUnKSkuZmlsZXNbMF07XG4gICAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgIHJlYWRlci5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZWFkZXIucmVzdWx0KTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKDxzdHJpbmc+cmVhZGVyLnJlc3VsdCk7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUZpbHRlcnMgPSBkYXRhO1xuICAgICAgICB9O1xuICAgICAgICByZWFkZXIucmVhZEFzVGV4dChmaWxlT2JqKTtcbiAgICB9XG5cbiAgICBzYXZlRmlsdGVycygpIHtcbiAgICAgICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtKU09OLnN0cmluZ2lmeSh0aGlzLmFjdGl2ZUZpbHRlcnMpXSwgeyB0eXBlOiAndGV4dC9qc29uJyB9KTtcbiAgICAgICAgY29uc3QgZmlsZW5hbWUgPSAnZmlsdGVycy5qc29uJztcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgICAgZWxlbWVudC5ocmVmID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gICAgICAgIGVsZW1lbnQuZG93bmxvYWQgPSBmaWxlbmFtZTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICAgICAgZWxlbWVudC5jbGljaygpO1xuICAgIH1cblxuICAgIGNoZWNrRmlsdGVyKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKHRoaXMuc2VsZWN0ZWRGaWVsZCA9PT0gJ25vbmUnIHx8IHRoaXMuc2VsZWN0ZWRWYWx1ZSA9PT0gJycpO1xuICAgIH1cblxuICAgIGFkZEZpbHRlcigpIHtcbiAgICAgICAgbGV0IGNvbG9yID0gJycsXG4gICAgICAgICAgICBmaWVsZCA9ICcnLFxuICAgICAgICAgICAgZGJmaWVsZCA9ICcnLFxuICAgICAgICAgICAgbGFiZWwgPSAnJyxcbiAgICAgICAgICAgIG5hbWUgPSAnJyxcbiAgICAgICAgICAgIGV4cGxhbmF0aW9uID0gdGhpcy5zZWxlY3RlZEZpZWxkICsgJyAnICsgdGhpcy5vcGVyYXRpb25zW3RoaXMub3BlcmF0aW9uXSArICcgJyArIHRoaXMuc2VsZWN0ZWRWYWx1ZTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IHRoaXMuZmlsdGVyT3B0aW9ucy5maWVsZHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5maWx0ZXJPcHRpb25zLmZpZWxkc1tpXS5uYW1lID09PSB0aGlzLnNlbGVjdGVkRmllbGQpIHtcbiAgICAgICAgICAgICAgICAvLyBjb2xvciA9IHRoaXMuZmlsdGVyT3B0aW9ucy5maWVsZHNbaV0uY29sb3I7XG4gICAgICAgICAgICAgICAgLy8gZmllbGQgPSB0aGlzLmZpbHRlck9wdGlvbnMuZmllbGRzW2ldLmZpZWxkO1xuICAgICAgICAgICAgICAgIC8vIGxhYmVsID0gdGhpcy5maWx0ZXJPcHRpb25zLmZpZWxkc1tpXS5sYWJlbDtcbiAgICAgICAgICAgICAgICAvLyBuYW1lID0gdGhpcy5maWx0ZXJPcHRpb25zLmZpZWxkc1tpXS5uYW1lO1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIC4uLndpdGggb2JqZWN0IGRlc3RydWN0dXJpbmdcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAoeyBjb2xvciwgZmllbGQsIGRiZmllbGQsIGxhYmVsLCBuYW1lIH0gPSB0aGlzLmZpbHRlck9wdGlvbnMuZmllbGRzW2ldKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcGVyYXRpb24gPT09ICdpbicpIHtcbiAgICAgICAgICAgIGV4cGxhbmF0aW9uID0gdGhpcy5zZWxlY3RlZEZpZWxkICsgJyAnICsgdGhpcy5vcGVyYXRpb25zW3RoaXMub3BlcmF0aW9uXSArICcgKC4uLiknO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMub3BlcmF0aW9uID09PSAnY29udGFpbicpIHtcbiAgICAgICAgICAgIC8vIGV4cGxhbmF0aW9uID0gdGhpcy5zZWxlY3RlZEZpZWxkICsgJyAnICsgdGhpcy5vcGVyYXRpb25zW3RoaXMub3BlcmF0aW9uXSArICcgJyArIHRoaXMuc2VsZWN0ZWRWYWx1ZTtcbiAgICAgICAgICAgIGV4cGxhbmF0aW9uID0gJ1wiJyArIHRoaXMuc2VsZWN0ZWRWYWx1ZSArICdcIiAnICsgdGhpcy5vcGVyYXRpb25zW3RoaXMub3BlcmF0aW9uXSArICcgJyArIHRoaXMuc2VsZWN0ZWRGaWVsZDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFjdGl2ZUZpbHRlcnMucHVzaCh7XG4gICAgICAgICAgICBjb2xvcjogY29sb3IsXG4gICAgICAgICAgICBleHBsYW5hdGlvbjogZXhwbGFuYXRpb24sXG4gICAgICAgICAgICBsYWJlbDogbGFiZWwsXG4gICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgZmllbGQ6IGZpZWxkLFxuICAgICAgICAgICAgZGJmaWVsZDogZGJmaWVsZCxcbiAgICAgICAgICAgIGJpdHdpc2U6ICcmJicsXG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMub3BlcmF0aW9uc1t0aGlzLm9wZXJhdGlvbl0sXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5zZWxlY3RlZFZhbHVlXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNlbGVjdGVkVmFsdWUgPSAnJztcbiAgICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh0aGlzLmFjdGl2ZUZpbHRlcnMpO1xuICAgIH1cblxuICAgIHNlbGVjdEZpbHRlcihmaWx0ZXI6IEZpZWxkRmlsdGVyKSB7XG4gICAgICAgIGZpbHRlci5zZWxlY3RlZCA9ICFmaWx0ZXIuc2VsZWN0ZWQ7XG4gICAgICAgIGNvbnN0IGdyb3VwID0gdGhpcy5nZXRQYXJlbnRGaWx0ZXIoZmlsdGVyKTtcbiAgICAgICAgaWYgKGdyb3VwKSB7XG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRBbGwgPSB0cnVlO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBncm91cC5maWVsZHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdG1wZmlsdGVyID0gZ3JvdXAuZmllbGRzW2ldO1xuICAgICAgICAgICAgICAgIGlmICghdG1wZmlsdGVyLmlzZ3JvdXAgJiYgIXRtcGZpbHRlci5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEFsbCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzZWxlY3RlZEFsbCkge1xuICAgICAgICAgICAgICAgIGdyb3VwLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFBhcmVudEZpbHRlcihmaWx0ZXI6IEZpZWxkRmlsdGVyKTogRmllbGRGaWx0ZXIgfCBudWxsIHtcbiAgICAgICAgY29uc3QgZ2V0UGFyZW50RmlsdGVySW5Hcm91cCA9IChncm91cDogRmllbGRGaWx0ZXIsIGZpbHRlcjI6IEZpZWxkRmlsdGVyKTogRmllbGRGaWx0ZXIgfCBudWxsID0+IHtcbiAgICAgICAgICAgIHJldCA9IG51bGw7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gZ3JvdXAuZmllbGRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRtcGZpbHRlciA9IGdyb3VwLmZpZWxkc1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoSlNPTi5zdHJpbmdpZnkodG1wZmlsdGVyKSA9PT0gSlNPTi5zdHJpbmdpZnkoZmlsdGVyMikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdyb3VwO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodG1wZmlsdGVyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0ID0gZ2V0UGFyZW50RmlsdGVySW5Hcm91cCh0bXBmaWx0ZXIsIGZpbHRlcjIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IHJldCA9IG51bGw7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gdGhpcy5hY3RpdmVGaWx0ZXJzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgdG1wZmlsdGVyID0gdGhpcy5hY3RpdmVGaWx0ZXJzW2ldO1xuICAgICAgICAgICAgaWYgKEpTT04uc3RyaW5naWZ5KHRtcGZpbHRlcikgPT09IEpTT04uc3RyaW5naWZ5KGZpbHRlcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodG1wZmlsdGVyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICByZXQgPSBnZXRQYXJlbnRGaWx0ZXJJbkdyb3VwKHRtcGZpbHRlciwgZmlsdGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuXG4gICAgYXJyYXlNb3ZlID0gKGFycjogYW55W10sIG9sZEluZGV4OiBudW1iZXIsIG5ld0luZGV4OiBudW1iZXIpOiBhbnlbXSA9PiB7XG4gICAgICAgIGlmIChuZXdJbmRleCA+IGFyci5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCBrID0gbmV3SW5kZXggLSBhcnIubGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKGstLSkge1xuICAgICAgICAgICAgICAgIGFyci5wdXNoKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYXJyLnNwbGljZShuZXdJbmRleCwgMCwgYXJyLnNwbGljZShvbGRJbmRleCwgMSlbMF0pO1xuICAgICAgICByZXR1cm4gYXJyO1xuICAgIH1cblxuICAgIG1vdmVUbyhkaXJlY3Rpb246IG51bWJlcikge1xuICAgICAgICBsZXQgaWR4ID0gLTEsXG4gICAgICAgICAgICB0b0lkeCA9IC0xLFxuICAgICAgICAgICAgZ3JvdXAgPSAtMTtcbiAgICAgICAgLy8gU2VhcmNoaW5nIHRoZSBzZWxlY3RlZCBmaWx0ZXIuLi5cbiAgICAgICAgdGhpcy5hY3RpdmVGaWx0ZXJzLmZvckVhY2goKGZpbHRlciwgdG1waWR4KSA9PiB7XG4gICAgICAgICAgICBpZiAoZmlsdGVyLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgaWR4ID0gdG1waWR4O1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZmlsdGVyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICBmaWx0ZXIuZmllbGRzLmZvckVhY2goKGZpbHRlcjIsIHRtcGlkeDIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlcjIuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkeCA9IHRtcGlkeDI7XG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cCA9IHRtcGlkeDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoaWR4ID49IDApIHtcblxuICAgICAgICAgICAgaWYgKGdyb3VwID49IDApIHtcbiAgICAgICAgICAgICAgICB0b0lkeCA9IChpZHggKyBkaXJlY3Rpb24pID49IDAgPyBpZHggKyBkaXJlY3Rpb24gOiB0aGlzLmFjdGl2ZUZpbHRlcnNbZ3JvdXBdLmZpZWxkcy5sZW5ndGggKyBkaXJlY3Rpb247XG4gICAgICAgICAgICAgICAgaWYgKHRvSWR4ID49IHRoaXMuYWN0aXZlRmlsdGVyc1tncm91cF0uZmllbGRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0b0lkeCA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlRmlsdGVyc1tncm91cF0uZmllbGRzID0gdGhpcy5hcnJheU1vdmUodGhpcy5hY3RpdmVGaWx0ZXJzW2dyb3VwXS5maWVsZHMsIGlkeCwgdG9JZHgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0b0lkeCA9IChpZHggKyBkaXJlY3Rpb24pID49IDAgPyBpZHggKyBkaXJlY3Rpb24gOiB0aGlzLmFjdGl2ZUZpbHRlcnMubGVuZ3RoICsgZGlyZWN0aW9uO1xuICAgICAgICAgICAgICAgIGlmICh0b0lkeCA+PSB0aGlzLmFjdGl2ZUZpbHRlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvSWR4ID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVGaWx0ZXJzID0gdGhpcy5hcnJheU1vdmUodGhpcy5hY3RpdmVGaWx0ZXJzLCBpZHgsIHRvSWR4KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh0aGlzLmFjdGl2ZUZpbHRlcnMpO1xuXG4gICAgfVxuXG4gICAgZ2V0U2VsZWN0ZWQoKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgZ2V0SW5Hcm91cCA9IChncm91cDogRmllbGRGaWx0ZXIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBncm91cC5maWVsZHMucmVkdWNlKChhY2MyLCBmaWx0ZXIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgYWNjMiArPSBnZXRJbkdyb3VwKGZpbHRlcik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmaWx0ZXIuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgYWNjMisrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYWNjMjtcbiAgICAgICAgICAgIH0sIDApO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5hY3RpdmVGaWx0ZXJzLnJlZHVjZSgoYWNjLCBmaWx0ZXIpID0+IHtcbiAgICAgICAgICAgIGlmIChmaWx0ZXIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgIGFjYyArPSBnZXRJbkdyb3VwKGZpbHRlcik7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGZpbHRlci5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIGFjYysrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfSwgMCk7XG5cbiAgICB9XG5cbiAgICBjbGVhclNlbGVjdGlvbigpOiB2b2lkIHtcblxuICAgICAgICBjb25zdCBjbGVhclNlbGVjdGlvbkluR3JvdXAgPSAoZ3JvdXApID0+IHtcbiAgICAgICAgICAgIGdyb3VwLmZpZWxkcy5mb3JFYWNoKChmaWx0ZXIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyID0gY2xlYXJTZWxlY3Rpb25Jbkdyb3VwKGZpbHRlcik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiBncm91cDtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmFjdGl2ZUZpbHRlcnMgPSB0aGlzLmFjdGl2ZUZpbHRlcnMubWFwKChmaWx0ZXIpID0+IHtcbiAgICAgICAgICAgIGlmIChmaWx0ZXIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgIGZpbHRlciA9IGNsZWFyU2VsZWN0aW9uSW5Hcm91cChmaWx0ZXIpO1xuICAgICAgICAgICAgICAgIC8vIGZpbHRlci5maWVsZHMgPSBmaWx0ZXIuZmllbGRzLm1hcCgoZmlsdGVyMikgPT4ge1xuICAgICAgICAgICAgICAgIC8vICAgICBmaWx0ZXIyLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgLy8gICAgIHJldHVybiBmaWx0ZXIyO1xuICAgICAgICAgICAgICAgIC8vIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmlsdGVyLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gZmlsdGVyO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIGNoYW5nZUJpdHdpc2UoZmlsdGVyOiBGaWVsZEZpbHRlciwgYml0d2lzZSkge1xuICAgICAgICBmaWx0ZXIuYml0d2lzZSA9IGJpdHdpc2U7XG4gICAgICAgIHRoaXMuY2hhbmdlLmVtaXQodGhpcy5hY3RpdmVGaWx0ZXJzKTtcbiAgICB9XG5cbiAgICBncm91cFNlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCBncm91cFNlbGVjdGVkSW5Hcm91cCA9IChmaWx0ZXI6IEZpZWxkRmlsdGVyKSA9PiB7XG4gICAgICAgICAgICBsZXQgcmV0MiA9IDA7XG4gICAgICAgICAgICBpZiAoZmlsdGVyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICBmaWx0ZXIuZmllbGRzLmZvckVhY2goKGZpbHRlcjIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlcjIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0MiArPSBncm91cFNlbGVjdGVkSW5Hcm91cChmaWx0ZXIyKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIyLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0MisrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJldDI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBncm91cHMgPSB0aGlzLmFjdGl2ZUZpbHRlcnMuZmlsdGVyKGZpbHRlciA9PiBmaWx0ZXIuaXNncm91cCk7XG4gICAgICAgIGxldCByZXQgPSAwO1xuICAgICAgICBncm91cHMuZm9yRWFjaCgoZ3JvdXApID0+IHtcbiAgICAgICAgICAgIGdyb3VwLmZpZWxkcy5mb3JFYWNoKGZpbHRlciA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlci5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldCArPSBncm91cFNlbGVjdGVkSW5Hcm91cChmaWx0ZXIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZmlsdGVyLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldCsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJldCA+IDA7XG4gICAgfVxuXG4gICAgZW50aXJlR3JvdXBTZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgZW50aXJlR3JvdXBTZWxlY3RlZEluR3JvdXAgPSAoZ3JvdXA6IEZpZWxkRmlsdGVyKSA9PiB7XG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWQyID0gdHJ1ZTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBncm91cC5maWVsZHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmlsdGVyID0gZ3JvdXAuZmllbGRzW2ldO1xuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZDIgPSBlbnRpcmVHcm91cFNlbGVjdGVkSW5Hcm91cChmaWx0ZXIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWQyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIWZpbHRlci5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZDIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0ZWQyICYmIGdyb3VwLmZpZWxkcy5sZW5ndGggPiAwO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBncm91cHMgPSB0aGlzLmFjdGl2ZUZpbHRlcnMuZmlsdGVyKGZpbHRlciA9PiBmaWx0ZXIuaXNncm91cCk7XG4gICAgICAgIGxldCBzZWxlY3RlZCA9IHRydWU7XG4gICAgICAgIGZvciAobGV0IGlnID0gMCwgbGcgPSBncm91cHMubGVuZ3RoOyBpZyA8IGxnOyBpZysrKSB7XG4gICAgICAgICAgICBjb25zdCBncm91cCA9IGdyb3Vwc1tpZ107XG4gICAgICAgICAgICBmb3IgKGxldCBpZzIgPSAwLCBsZzIgPSBncm91cC5maWVsZHMubGVuZ3RoOyBpZzIgPCBsZzI7IGlnMisrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmlsdGVyID0gZ3JvdXAuZmllbGRzW2lnMl07XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlci5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gZW50aXJlR3JvdXBTZWxlY3RlZEluR3JvdXAoZmlsdGVyKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIWZpbHRlci5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGdyb3VwLmZpZWxkcy5mb3JFYWNoKGZpbHRlciA9PiB7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGdyb3Vwcy5mb3JFYWNoKChncm91cCkgPT4ge1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHNlbGVjdGVkICYmIGdyb3Vwcy5sZW5ndGggPiAwO1xuICAgIH1cblxuICAgIGNyZWF0ZUdyb3VwKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBjcmVhdGVJbkdyb3VwID0gKGZpbHRlcjogRmllbGRGaWx0ZXIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkMiA9IGZpbHRlci5maWVsZHMuZmlsdGVyKGZpbHRlcjIgPT4gZmlsdGVyMi5zZWxlY3RlZCksXG4gICAgICAgICAgICBncm91cFBvc2l0aW9uMiA9IGZpbHRlci5maWVsZHMuZmluZEluZGV4KHYgPT4gdi5zZWxlY3RlZCk7XG4gICAgICAgICAgICBsZXQgcmVzdWx0RmlsdGVyMjogRmllbGRGaWx0ZXJbXTtcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZDIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0RmlsdGVyMiA9IGZpbHRlci5maWVsZHMuZmlsdGVyKGZpbHRlcjIgPT4gIWZpbHRlcjIuc2VsZWN0ZWQpO1xuICAgICAgICAgICAgICAgIHJlc3VsdEZpbHRlcjIuc3BsaWNlKGdyb3VwUG9zaXRpb24yLCAwLCB7XG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJycsXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgaXNncm91cDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgYml0d2lzZTogJyYmJyxcbiAgICAgICAgICAgICAgICAgICAgZmllbGRzOiBzZWxlY3RlZDJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0RmlsdGVyMiA9IGZpbHRlci5maWVsZHMubWFwKGZpbHRlcjIgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyMi5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVJbkdyb3VwKGZpbHRlcjIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmaWx0ZXIyO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmlsdGVyLmZpZWxkcyA9IHJlc3VsdEZpbHRlcjI7XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLmFjdGl2ZUZpbHRlcnMuZmlsdGVyKGZpbHRlciA9PiBmaWx0ZXIuc2VsZWN0ZWQpLFxuICAgICAgICAgICAgICBncm91cFBvc2l0aW9uID0gdGhpcy5hY3RpdmVGaWx0ZXJzLmZpbmRJbmRleCh2ID0+IHYuc2VsZWN0ZWQpO1xuICAgICAgICBsZXQgcmVzdWx0RmlsdGVyOiBGaWVsZEZpbHRlcltdO1xuICAgICAgICBpZiAoc2VsZWN0ZWQubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXN1bHRGaWx0ZXIgPSB0aGlzLmFjdGl2ZUZpbHRlcnMuZmlsdGVyKGZpbHRlciA9PiAhZmlsdGVyLnNlbGVjdGVkKTtcbiAgICAgICAgICAgIHJlc3VsdEZpbHRlci5zcGxpY2UoZ3JvdXBQb3NpdGlvbiwgMCwge1xuICAgICAgICAgICAgICAgIGNvbG9yOiAnJyxcbiAgICAgICAgICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgICAgICAgICBmaWVsZDogJycsXG4gICAgICAgICAgICAgICAgaXNncm91cDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBiaXR3aXNlOiAnJiYnLFxuICAgICAgICAgICAgICAgIGZpZWxkczogc2VsZWN0ZWRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVGaWx0ZXJzID0gcmVzdWx0RmlsdGVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0RmlsdGVyID0gdGhpcy5hY3RpdmVGaWx0ZXJzLm1hcChmaWx0ZXIgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgICAgICBjcmVhdGVJbkdyb3VwKGZpbHRlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmaWx0ZXI7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgIHRoaXMuY2hhbmdlLmVtaXQodGhpcy5hY3RpdmVGaWx0ZXJzKTtcbiAgICB9XG5cbiAgICBzYW5pdGl6ZUdyb3VwcygpIHtcbiAgICAgICAgY29uc3Qgc2FuaXRpemVHcm91cHNJbkdyb3VwID0gKGdyb3VwLCBwYXJlbnQ/OiBGaWVsZEZpbHRlcikgPT4ge1xuICAgICAgICAgICAgZ3JvdXAuZmllbGRzLm1hcCgoZmlsdGVyOiBGaWVsZEZpbHRlciwgaWR4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlci5maWVsZHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cC5maWVsZHMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZmlsdGVyLmZpZWxkcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGdyb3VwLmZpZWxkcy5wdXNoKHsuLi5maWx0ZXIuZmllbGRzWzBdfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cC5maWVsZHMuc3BsaWNlKGlkeCwgMSwgey4uLmZpbHRlci5maWVsZHNbMF19KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNhbml0aXplR3JvdXBzSW5Hcm91cChmaWx0ZXIsIGdyb3VwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFjdGl2ZUZpbHRlcnMubWFwKChmaWx0ZXI6IEZpZWxkRmlsdGVyLCBpZHg6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgaWYgKGZpbHRlci5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlci5maWVsZHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlRmlsdGVycy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZpbHRlci5maWVsZHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuYWN0aXZlRmlsdGVycy5wdXNoKHsuLi5maWx0ZXIuZmllbGRzWzBdfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlRmlsdGVycy5zcGxpY2UoaWR4LCAxLCB7Li4uZmlsdGVyLmZpZWxkc1swXX0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2FuaXRpemVHcm91cHNJbkdyb3VwKGZpbHRlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW1vdmVGcm9tR3JvdXAoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHJlbW92ZUZyb21Hcm91cEluR3JvdXAgPSAoZ3JvdXA6IEZpZWxkRmlsdGVyLCBwYXJlbnQ6IEZpZWxkRmlsdGVyLCBpZHgpID0+IHtcbiAgICAgICAgICAgIGdyb3VwLmZpZWxkcy5mb3JFYWNoKChmaWx0ZXIyLCBpZHgyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlcjIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVGcm9tR3JvdXBJbkdyb3VwKGZpbHRlcjIsIGdyb3VwLCBpZHgyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IHRtcEZpbHRlcnMgPSBncm91cC5maWVsZHMuZmlsdGVyKChmaWx0ZXIyOiBGaWVsZEZpbHRlcikgPT4gZmlsdGVyMi5zZWxlY3RlZCk7XG4gICAgICAgICAgICBncm91cC5maWVsZHMgPSBncm91cC5maWVsZHMuZmlsdGVyKChmaWx0ZXIyOiBGaWVsZEZpbHRlcikgPT4gIWZpbHRlcjIuc2VsZWN0ZWQpO1xuICAgICAgICAgICAgdG1wRmlsdGVycy5mb3JFYWNoKCh2OiBGaWVsZEZpbHRlcikgPT4ge1xuICAgICAgICAgICAgICAgIHYuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBwYXJlbnQuZmllbGRzLnB1c2godik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChncm91cC5maWVsZHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcGFyZW50LmZpZWxkcy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmFjdGl2ZUZpbHRlcnMgPSB0aGlzLmFjdGl2ZUZpbHRlcnMucmVkdWNlKChuZXdGaWx0ZXJzLCBmaWx0ZXIpID0+IHtcbiAgICAgICAgICAgIGlmIChmaWx0ZXIuaXNncm91cCkge1xuXG4gICAgICAgICAgICAgICAgZmlsdGVyLmZpZWxkcy5mb3JFYWNoKChmaWx0ZXIyLCBpZHgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlcjIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlRnJvbUdyb3VwSW5Hcm91cChmaWx0ZXIyLCBmaWx0ZXIsIGlkeCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHRtcEZpbHRlcnMgPSBmaWx0ZXIuZmllbGRzLmZpbHRlcihmaWx0ZXIyID0+IGZpbHRlcjIuc2VsZWN0ZWQpO1xuICAgICAgICAgICAgICAgIGZpbHRlci5maWVsZHMgPSBmaWx0ZXIuZmllbGRzLmZpbHRlcihmaWx0ZXIyID0+ICFmaWx0ZXIyLnNlbGVjdGVkKTtcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLmZpZWxkcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3RmlsdGVycy5wdXNoKGZpbHRlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRtcEZpbHRlcnMuZm9yRWFjaCh2ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbmV3RmlsdGVycy5wdXNoKHYpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXdGaWx0ZXJzLnB1c2goZmlsdGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXdGaWx0ZXJzO1xuICAgICAgICB9LCBbXSk7XG4gICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgdGhpcy5zYW5pdGl6ZUdyb3VwcygpO1xuICAgICAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMuYWN0aXZlRmlsdGVycyk7XG4gICAgfVxuXG4gICAgb25TdGFydERyYWdGaWx0ZXIoX2V2ZW50LCBfZmlsdGVyKSB7XG4gICAgfVxuXG4gICAgb25Ecm9wcGVkRmlsdGVyKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuYXJyYXlNb3ZlKHRoaXMuYWN0aXZlRmlsdGVycywgZXZlbnQucHJldmlvdXNJbmRleCwgZXZlbnQuY3VycmVudEluZGV4KTtcbiAgICAgICAgLy8gdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICB0aGlzLnNhbml0aXplR3JvdXBzKCk7XG4gICAgICAgIHRoaXMuY2hhbmdlLmVtaXQodGhpcy5hY3RpdmVGaWx0ZXJzKTtcbiAgICB9XG5cbiAgICB1cGxvYWRTZXQoKSB7XG4gICAgICAgIGNvbnN0IGZpbGVPYmogPSAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpbGVTZXQnKSkuZmlsZXNbMF07XG4gICAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgIHJlYWRlci5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBsaW5lcyA9ICg8c3RyaW5nPnJlYWRlci5yZXN1bHQpLnNwbGl0KC9cXHI/XFxuLykuZmlsdGVyKHZhbCA9PiB2YWwgPiAnJyk7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkVmFsdWUgPSBsaW5lcy5qb2luKCcsICcpO1xuICAgICAgICAgICAgdGhpcy5maWxlU2V0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcbiAgICAgICAgfTtcbiAgICAgICAgcmVhZGVyLnJlYWRBc1RleHQoZmlsZU9iaik7XG4gICAgfVxuXG4gICAgcmVtb3ZlRmlsdGVyKGZpbHRlcjogRmllbGRGaWx0ZXIpOiB2b2lkIHtcbiAgICAgICAgLy8gY29uc3QgcmVtb3ZlRmlsdGVySW5Hcm91cCA9IChncm91cCwgZmlsdGVyKSA9PiB7XG5cbiAgICAgICAgLy8gfTtcbiAgICAgICAgY29uc3QgcGFyZW50ID0gdGhpcy5nZXRQYXJlbnRGaWx0ZXIoZmlsdGVyKTtcbiAgICAgICAgbGV0IGdyb3VwOiBGaWVsZEZpbHRlcltdO1xuICAgICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgICAgICBncm91cCA9IHBhcmVudC5maWVsZHM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBncm91cCA9IHRoaXMuYWN0aXZlRmlsdGVycztcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGdyb3VwLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgaWYgKEpTT04uc3RyaW5naWZ5KGdyb3VwW2ldKSA9PT0gSlNPTi5zdHJpbmdpZnkoZmlsdGVyKSkge1xuICAgICAgICAgICAgICAgIGdyb3VwLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNhbml0aXplR3JvdXBzKCk7XG4gICAgICAgIHRoaXMuY2hhbmdlLmVtaXQodGhpcy5hY3RpdmVGaWx0ZXJzKTtcbiAgICB9XG5cbiAgICBjbGVhckZpbHRlcnMoKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlRmlsdGVycyA9IFtdO1xuICAgICAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMuYWN0aXZlRmlsdGVycyk7XG4gICAgfVxuXG4gICAgb25Gb2N1cyhldmVudCkge1xuICAgICAgICB0aGlzLmVkaXRpbmcgPSB0cnVlO1xuICAgIH1cblxuICAgIG9uQmx1cihldmVudCkge1xuICAgICAgICB0aGlzLmVkaXRpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5maWx0ZXJPcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgICAgICB0aGlzLnNlbGVjdGVkRmllbGQgPSAodHlwZW9mIHRoaXMuZmlsdGVyT3B0aW9ucy5maWVsZHNbMF0gIT09ICd1bmRlZmluZWQnKSA/IHRoaXMuZmlsdGVyT3B0aW9ucy5maWVsZHNbMF0ubmFtZSA6ICdub25lJztcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmNvbmZpZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jb25maWcgJiYgdHlwZW9mIHRoaXMuY29uZmlnLm9wZXJhdGlvbnNEYXRhICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHRoaXMub3BlcmF0aW9uc0RhdGEgPSB0aGlzLmNvbmZpZy5vcGVyYXRpb25zRGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZyAmJiB0eXBlb2YgdGhpcy5jb25maWcuZmlsdGVyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlRmlsdGVycyA9IHRoaXMuY29uZmlnLmZpbHRlci5zbGljZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnICYmIHR5cGVvZiB0aGlzLmNvbmZpZy50ZXh0cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRleHRzID0gey4uLnRoaXMudGV4dHMsIC4uLnRoaXMuY29uZmlnLnRleHRzfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyB0aGlzLmZpbHRlck9wdGlvbnMgPSBKU09OLnBhcnNlKHRoaXMub3B0aW9ucyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTWF0SWNvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2ljb24nO1xuaW1wb3J0IHsgTWF0U2VsZWN0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2VsZWN0JztcbmltcG9ydCB7IE1hdENoaXBzTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY2hpcHMnO1xuaW1wb3J0IHsgTWF0SW5wdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pbnB1dCc7XG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24nO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IE1hdFRvb2x0aXBNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90b29sdGlwJztcbmltcG9ydCB7IE1hdE1lbnVNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9tZW51JztcbmltcG9ydCB7IERyYWdEcm9wTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XG5cbmltcG9ydCB7IFRXQUZpbHRlckVkaXRvckNvbXBvbmVudCB9IGZyb20gJy4vdHdhLW1kMi1maWx0ZXItZWRpdG9yLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUV0FGaWx0ZXJFZGl0b3JTZXJ2aWNlIH0gZnJvbSAnLi90d2EtbWQyLWZpbHRlci1lZGl0b3Iuc2VydmljZSc7XG5pbXBvcnQgeyBGaWVsZEZpbHRlciB9IGZyb20gJy4vdHdhLW1kMi1maWx0ZXItZWRpdG9yLmludGVyZmFjZSc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgICAgICBNYXRJY29uTW9kdWxlLFxuICAgICAgICBNYXRTZWxlY3RNb2R1bGUsXG4gICAgICAgIE1hdENoaXBzTW9kdWxlLFxuICAgICAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICAgICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgICAgICBGbGV4TGF5b3V0TW9kdWxlLFxuICAgICAgICBNYXRUb29sdGlwTW9kdWxlLFxuICAgICAgICBNYXRNZW51TW9kdWxlLFxuICAgICAgICBEcmFnRHJvcE1vZHVsZSxcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBUV0FGaWx0ZXJFZGl0b3JDb21wb25lbnQsXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIFRXQUZpbHRlckVkaXRvckNvbXBvbmVudCxcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBUV0FGaWx0ZXJFZGl0b3JTZXJ2aWNlXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBUV0FGaWx0ZXJFZGl0b3JNb2R1bGUge31cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBS0E7UUFBQSxpQkEyS0M7UUFyRkcscUJBQWdCLEdBQUcsVUFBQyxPQUFPOztnQkFDbkIsWUFBWSxHQUFHLENBQUM7O2dCQUNkLFVBQVUsR0FBRyxFQUFFO1lBQ3JCLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQztnQkFDakIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEtBQUssSUFBSSxFQUFFO29CQUM3QixZQUFZLEVBQUUsQ0FBQztvQkFDZixVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2lCQUN2QjtnQkFDRCxJQUFJLFFBQU8sVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssV0FBVyxFQUFFO29CQUNsRCxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2lCQUN2QjtnQkFDRCxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUU7O3dCQUNMLFFBQVEsZ0JBQU8sQ0FBQyxJQUFFLE1BQU0sRUFBRSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFDOztvQkFFaEUsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDM0M7cUJBQU07b0JBQ0gsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDcEM7YUFDSixDQUFDLENBQUM7WUFFSCxPQUFPLFVBQVUsQ0FBQztTQUNyQixDQUFBO1FBRUQsZUFBVSxHQUFHLFVBQUMsTUFBVyxFQUFFLFdBQWdCOztnQkFFakMsV0FBVyxHQUFHO2dCQUNoQixJQUFJLEVBQUUsVUFBQyxDQUFTLEVBQUUsQ0FBUyxJQUFLLE9BQUEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBQTtnQkFDN0MsS0FBSyxFQUFFLFVBQUMsQ0FBTSxFQUFFLENBQU0sSUFBSyxPQUFBLENBQUMsS0FBSyxDQUFDLEdBQUE7Z0JBQ2xDLElBQUksRUFBRSxVQUFDLENBQU0sRUFBRSxDQUFNLElBQUssT0FBQSxDQUFDLElBQUksQ0FBQyxHQUFBO2dCQUNoQyxHQUFHLEVBQUUsVUFBQyxDQUFNLEVBQUUsQ0FBTSxJQUFLLE9BQUEsQ0FBQyxHQUFHLENBQUMsR0FBQTtnQkFDOUIsSUFBSSxFQUFFLFVBQUMsQ0FBTSxFQUFFLENBQU0sSUFBSyxPQUFBLENBQUMsSUFBSSxDQUFDLEdBQUE7Z0JBQ2hDLEdBQUcsRUFBRSxVQUFDLENBQU0sRUFBRSxDQUFNLElBQUssT0FBQSxDQUFDLEdBQUcsQ0FBQyxHQUFBO2dCQUM5QixJQUFJLEVBQUUsVUFBQyxDQUFNLEVBQUUsQ0FBTSxJQUFLLE9BQUEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUE7YUFDckQ7O2dCQUVHLFFBQVEsR0FBRyxLQUFLO1lBRXBCLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRTtnQkFDaEIsUUFBUSxHQUFHLEtBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO2FBQ3BEO2lCQUFNO2dCQUNILElBQUksS0FBSSxDQUFDLFdBQVcsRUFBRTtvQkFDbEIsS0FBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUM7aUJBQ3pDO2dCQUNELElBQUk7b0JBQ0EsSUFBSSxPQUFPLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssUUFBUSxLQUFLLE1BQU0sQ0FBQyxTQUFTLEtBQUssSUFBSSxJQUFJLE1BQU0sQ0FBQyxTQUFTLEtBQUssSUFBSSxDQUFDLEVBQUU7d0JBQzNHLFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFDMUIsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQzNEO3lCQUFNO3dCQUNILFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQy9DLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztxQkFDaEY7aUJBQ0o7Z0JBQUMsV0FBTTtvQkFDSixRQUFRLEdBQUcsS0FBSyxDQUFDO2lCQUNwQjthQUNKO1lBRUQsT0FBTyxRQUFRLENBQUM7U0FFbkIsQ0FBQTtRQUVELGdCQUFXLEdBQUcsVUFBQyxNQUFXLEVBQUUsV0FBZ0I7O2dCQUVsQyxPQUFPLEdBQUcsRUFBRTtvQ0FFVCxDQUFDLEVBQU0sQ0FBQzs7b0JBQ1AsUUFBUSxHQUFHLEVBQUU7Z0JBQ25CLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBUTtvQkFDL0IsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDO2lCQUNqRCxDQUFDLENBQUM7Z0JBQ0gsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFVBQUMsR0FBRyxFQUFFLEVBQUU7b0JBQ2pDLElBQUksQ0FBQyxFQUFFLEVBQUU7d0JBQ0wsR0FBRyxHQUFHLEVBQUUsQ0FBQztxQkFDWjtvQkFDRCxPQUFPLEdBQUcsQ0FBQztpQkFDZCxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7YUFDYjtZQVhELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTt3QkFBM0MsQ0FBQyxFQUFNLENBQUM7YUFXaEI7WUFFRCxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBQyxHQUFHLEVBQUUsQ0FBQztnQkFDekIsSUFBSSxDQUFDLEVBQUU7b0JBQ0gsR0FBRyxHQUFHLENBQUMsQ0FBQztpQkFDWDtnQkFDRCxPQUFPLEdBQUcsQ0FBQzthQUNkLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FFYixDQUFBO0tBQ0o7Ozs7Ozs7SUFoS0cscUNBQUk7Ozs7OztJQUFKLFVBQ0ksTUFBZ0MsRUFDaEMsSUFBVyxFQUNYLFdBQXNCO1FBSDFCLGlCQWNDO1FBVEcsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFFL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQUMsT0FBc0I7WUFDaEQsS0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDdkIsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3RCLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztLQUM1RTs7Ozs7SUFFRCw0Q0FBVzs7OztJQUFYLFVBQVksSUFBd0I7UUFBcEMsaUJBd0JDO1FBeEJXLHFCQUFBLEVBQUEsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTs7O1lBRzVCLEdBQUcsR0FBRyxJQUFJOztZQUNSLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTTtRQUUxQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNkLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFFRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFekUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFFakIsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQyxJQUFJLEVBQUUsR0FBRztZQUN0QixJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztZQUNyQixPQUFPLElBQUksQ0FBQztTQUNmLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQyxJQUFTO1lBQ2hCLEdBQUcsR0FBRyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEMsT0FBTyxHQUFHLENBQUM7U0FDZCxDQUFDLENBQUM7UUFFSCxPQUFPLElBQUksQ0FBQztLQUVmOzs7OztJQUVELGlEQUFnQjs7OztJQUFoQixVQUFpQixJQUFJO1FBQXJCLGlCQStCQzs7WUE3Qk8sR0FBRyxHQUFHLElBQUk7O1lBQ1IsT0FBTyxHQUFHLEVBQUU7Z0NBRVQsQ0FBQyxFQUFNLENBQUM7O2dCQUNQLFFBQVEsR0FBRyxFQUFFO1lBQ25CLE9BQUssZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBYztnQkFDNUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQzNDLENBQUMsQ0FBQztZQUNILE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUNoQyxJQUFJLENBQUMsQ0FBQyxFQUFFO29CQUNKLEdBQUcsR0FBRyxDQUFDLENBQUM7aUJBQ1g7Z0JBQ0QsT0FBTyxHQUFHLENBQUM7YUFDZCxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDYjs7UUFYRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTtvQkFBbkQsQ0FBQyxFQUFNLENBQUM7U0FXaEI7UUFFRCxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDaEIsR0FBRyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBQyxHQUFHLEVBQUUsQ0FBQztnQkFDeEIsSUFBSSxDQUFDLEVBQUU7b0JBQ0gsR0FBRyxHQUFHLENBQUMsQ0FBQztpQkFDWDtnQkFDRCxPQUFPLEdBQUcsQ0FBQzthQUNkLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDYjthQUFNO1lBQ0gsR0FBRyxHQUFHLElBQUksQ0FBQztTQUNkO1FBRUQsT0FBTyxHQUFHLENBQUM7S0FFZDs7Z0JBcEZKLFVBQVU7O0lBMktYLDZCQUFDO0NBQUE7Ozs7Ozs7SUNrR0c7UUFoRlUsV0FBTSxHQUF3QixJQUFJLFlBQVksRUFBUyxDQUFDO1FBTWxFLGtCQUFhLEdBQUcsTUFBTSxDQUFDO1FBQ3ZCLGtCQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ25CLGNBQVMsR0FBRyxTQUFTLENBQUM7UUFDdEIsa0JBQWEsR0FBa0IsRUFBRSxDQUFDO1FBQ2xDLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsVUFBSyxHQUFHO1lBQ0osUUFBUSxFQUFFLGNBQWM7WUFDeEIsTUFBTSxFQUFFLFFBQVE7WUFDaEIsS0FBSyxFQUFFLE9BQU87WUFDZCxPQUFPLEVBQUUsU0FBUztZQUNsQixRQUFRLEVBQUUsY0FBYztZQUN4QixTQUFTLEVBQUUsZUFBZTtZQUMxQixVQUFVLEVBQUUsbUJBQW1CO1lBQy9CLFVBQVUsRUFBRSxhQUFhO1lBQ3pCLGNBQWMsRUFBRSxpQkFBaUI7WUFDakMsUUFBUSxFQUFFLGVBQWU7U0FFNUIsQ0FBQztRQUNGLGVBQVUsR0FBUTtZQUNkLE9BQU8sRUFBRSxJQUFJO1lBQ2IsS0FBSyxFQUFFLEtBQUs7WUFDWixZQUFZLEVBQUUsSUFBSTtZQUNsQixPQUFPLEVBQUUsR0FBRztZQUNaLFNBQVMsRUFBRSxJQUFJO1lBQ2YsSUFBSSxFQUFFLEdBQUc7WUFDVCxFQUFFLEVBQUUsSUFBSTtTQUNYLENBQUM7UUFDRixtQkFBYyxHQUFHO1lBQ2I7Z0JBQ0ksSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsS0FBSyxFQUFFLFVBQVU7Z0JBQ2pCLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0Q7Z0JBQ0ksSUFBSSxFQUFFLE9BQU87Z0JBQ2IsS0FBSyxFQUFFLFFBQVE7Z0JBQ2YsUUFBUSxFQUFFLEtBQUs7YUFDbEI7WUFDRDtnQkFDSSxJQUFJLEVBQUUsY0FBYztnQkFDcEIsS0FBSyxFQUFFLGtCQUFrQjtnQkFDekIsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRDtnQkFDSSxJQUFJLEVBQUUsU0FBUztnQkFDZixLQUFLLEVBQUUsU0FBUztnQkFDaEIsUUFBUSxFQUFFLEdBQUc7YUFDaEI7WUFDRDtnQkFDSSxJQUFJLEVBQUUsV0FBVztnQkFDakIsS0FBSyxFQUFFLGVBQWU7Z0JBQ3RCLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0Q7Z0JBQ0ksSUFBSSxFQUFFLE1BQU07Z0JBQ1osS0FBSyxFQUFFLE1BQU07Z0JBQ2IsUUFBUSxFQUFFLEdBQUc7YUFDaEI7WUFDRDtnQkFDSSxJQUFJLEVBQUUsSUFBSTtnQkFDVixLQUFLLEVBQUUsSUFBSTtnQkFDWCxRQUFRLEVBQUUsSUFBSTthQUNqQjtTQUNKLENBQUM7UUE2SEYsY0FBUyxHQUFHLFVBQUMsR0FBVSxFQUFFLFFBQWdCLEVBQUUsUUFBZ0I7WUFDdkQsSUFBSSxRQUFRLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRTs7b0JBQ25CLENBQUMsR0FBRyxRQUFRLEdBQUcsR0FBRyxDQUFDLE1BQU07Z0JBQzdCLE9BQU8sQ0FBQyxFQUFFLEVBQUU7b0JBQ1IsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztpQkFDdkI7YUFDSjtZQUNELEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BELE9BQU8sR0FBRyxDQUFDO1NBQ2QsQ0FBQTtLQTNIZTs7Ozs7SUFSaEIsc0RBQW1COzs7O0lBRG5CLFVBQ29CLEtBQW9CO1FBQ3BDLEtBQUssS0FBSyxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLE9BQU8sR0FBRztZQUN0QyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDdkI7YUFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxFQUFFLEVBQUU7WUFDN0MsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQ3BCO0tBQ0o7Ozs7SUFJRCw4Q0FBVzs7O0lBQVg7UUFBQSxpQkFTQzs7WUFSUyxPQUFPLEdBQUcsb0JBQW1CLFFBQVEsQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsSUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDOztZQUNqRixNQUFNLEdBQUcsSUFBSSxVQUFVLEVBQUU7UUFDL0IsTUFBTSxDQUFDLE1BQU0sR0FBRztZQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDOztnQkFDckIsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLG9CQUFTLE1BQU0sQ0FBQyxNQUFNLEdBQUM7WUFDOUMsS0FBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7U0FDN0IsQ0FBQztRQUNGLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDOUI7Ozs7SUFFRCw4Q0FBVzs7O0lBQVg7O1lBQ1UsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsQ0FBQzs7WUFDNUUsUUFBUSxHQUFHLGNBQWM7O1lBQ3pCLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQztRQUMzQyxPQUFPLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hELE9BQU8sQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQzVCLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ25DLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztLQUNuQjs7OztJQUVELDhDQUFXOzs7SUFBWDtRQUNJLFFBQVEsSUFBSSxDQUFDLGFBQWEsS0FBSyxNQUFNLElBQUksSUFBSSxDQUFDLGFBQWEsS0FBSyxFQUFFLEVBQUU7S0FDdkU7Ozs7SUFFRCw0Q0FBUzs7O0lBQVQ7OztZQUNRLEtBQUssR0FBRyxFQUFFOztZQUNWLEtBQUssR0FBRyxFQUFFOztZQUNWLE9BQU8sR0FBRyxFQUFFOztZQUNaLEtBQUssR0FBRyxFQUFFOztZQUNWLElBQUksR0FBRyxFQUFFOztZQUNULFdBQVcsR0FBRyxJQUFJLENBQUMsYUFBYSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLGFBQWE7UUFFdkcsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzlELElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxhQUFhLEVBQUU7Ozs7Ozs7O2dCQVExRCxDQUFDLGlDQUFxRSxFQUFuRSxnQkFBSyxFQUFFLGdCQUFLLEVBQUUsb0JBQU8sRUFBRSxnQkFBSyxFQUFFLGNBQUksRUFBbUM7Z0JBQ3hFLE1BQU07YUFDVDtTQUNKO1FBQ0QsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUksRUFBRTtZQUN6QixXQUFXLEdBQUcsSUFBSSxDQUFDLGFBQWEsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsUUFBUSxDQUFDO1NBQ3ZGO2FBQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLFNBQVMsRUFBRTs7WUFFckMsV0FBVyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztTQUM5RztRQUNELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO1lBQ3BCLEtBQUssRUFBRSxLQUFLO1lBQ1osV0FBVyxFQUFFLFdBQVc7WUFDeEIsS0FBSyxFQUFFLEtBQUs7WUFDWixJQUFJLEVBQUUsSUFBSTtZQUNWLEtBQUssRUFBRSxLQUFLO1lBQ1osT0FBTyxFQUFFLE9BQU87WUFDaEIsT0FBTyxFQUFFLElBQUk7WUFDYixTQUFTLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQzFDLEtBQUssRUFBRSxJQUFJLENBQUMsYUFBYTtTQUM1QixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7S0FDeEM7Ozs7O0lBRUQsK0NBQVk7Ozs7SUFBWixVQUFhLE1BQW1CO1FBQzVCLE1BQU0sQ0FBQyxRQUFRLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDOztZQUM3QixLQUFLLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUM7UUFDMUMsSUFBSSxLQUFLLEVBQUU7O2dCQUNILFdBQVcsR0FBRyxJQUFJO1lBQ3RCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFOztvQkFDM0MsU0FBUyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUU7b0JBQzNDLFdBQVcsR0FBRyxLQUFLLENBQUM7aUJBQ3ZCO2FBQ0o7WUFDRCxJQUFJLFdBQVcsRUFBRTtnQkFDYixLQUFLLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQzthQUN6QjtTQUNKO0tBQ0o7Ozs7O0lBRUQsa0RBQWU7Ozs7SUFBZixVQUFnQixNQUFtQjs7WUFDekIsc0JBQXNCLEdBQUcsVUFBQyxLQUFrQixFQUFFLE9BQW9CO1lBQ3BFLEdBQUcsR0FBRyxJQUFJLENBQUM7WUFFWCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTs7b0JBQzNDLFNBQVMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDakMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxLQUFLLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQ3ZELE9BQU8sS0FBSyxDQUFDO2lCQUNoQjtxQkFBTSxJQUFJLFNBQVMsQ0FBQyxPQUFPLEVBQUU7b0JBQzFCLEdBQUcsR0FBRyxzQkFBc0IsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7aUJBQ3BEO2FBQ0o7WUFFRCxPQUFPLEdBQUcsQ0FBQztTQUNkOztZQUNHLEdBQUcsR0FBRyxJQUFJO1FBQ2QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7O2dCQUNqRCxTQUFTLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDdkMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxLQUFLLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ3RELE9BQU8sSUFBSSxDQUFDO2FBQ2Y7aUJBQU0sSUFBSSxTQUFTLENBQUMsT0FBTyxFQUFFO2dCQUMxQixHQUFHLEdBQUcsc0JBQXNCLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2FBQ25EO1NBQ0o7UUFFRCxPQUFPLEdBQUcsQ0FBQztLQUNkOzs7OztJQWFELHlDQUFNOzs7O0lBQU4sVUFBTyxTQUFpQjs7WUFDaEIsR0FBRyxHQUFHLENBQUMsQ0FBQzs7WUFDUixLQUFLLEdBQUcsQ0FBQyxDQUFDOztZQUNWLEtBQUssR0FBRyxDQUFDLENBQUM7O1FBRWQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBQyxNQUFNLEVBQUUsTUFBTTtZQUN0QyxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUU7Z0JBQ2pCLEdBQUcsR0FBRyxNQUFNLENBQUM7Z0JBQ2IsT0FBTzthQUNWO2lCQUFNLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRTtnQkFDdkIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsT0FBTztvQkFDbkMsSUFBSSxPQUFPLENBQUMsUUFBUSxFQUFFO3dCQUNsQixHQUFHLEdBQUcsT0FBTyxDQUFDO3dCQUNkLEtBQUssR0FBRyxNQUFNLENBQUM7d0JBQ2YsT0FBTztxQkFDVjtpQkFDSixDQUFDLENBQUM7YUFDTjtTQUNKLENBQUMsQ0FBQztRQUVILElBQUksR0FBRyxJQUFJLENBQUMsRUFBRTtZQUVWLElBQUksS0FBSyxJQUFJLENBQUMsRUFBRTtnQkFDWixLQUFLLEdBQUcsQ0FBQyxHQUFHLEdBQUcsU0FBUyxLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7Z0JBQ3ZHLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtvQkFDbEQsS0FBSyxHQUFHLENBQUMsQ0FBQztpQkFDYjtnQkFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQzthQUNuRztpQkFBTTtnQkFDSCxLQUFLLEdBQUcsQ0FBQyxHQUFHLEdBQUcsU0FBUyxLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztnQkFDekYsSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUU7b0JBQ3BDLEtBQUssR0FBRyxDQUFDLENBQUM7aUJBQ2I7Z0JBQ0QsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ3ZFO1NBRUo7UUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7S0FFeEM7Ozs7SUFFRCw4Q0FBVzs7O0lBQVg7O1lBQ1UsVUFBVSxHQUFHLFVBQUMsS0FBa0I7WUFDbEMsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFDLElBQUksRUFBRSxNQUFNO2dCQUNwQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7b0JBQ2hCLElBQUksSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQzlCO3FCQUFNLElBQUksTUFBTSxDQUFDLFFBQVEsRUFBRTtvQkFDeEIsSUFBSSxFQUFFLENBQUM7aUJBQ1Y7Z0JBQ0QsT0FBTyxJQUFJLENBQUM7YUFDZixFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ1Q7UUFDRCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLFVBQUMsR0FBRyxFQUFFLE1BQU07WUFDekMsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFO2dCQUNoQixHQUFHLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQzdCO2lCQUFNLElBQUksTUFBTSxDQUFDLFFBQVEsRUFBRTtnQkFDeEIsR0FBRyxFQUFFLENBQUM7YUFDVDtZQUNELE9BQU8sR0FBRyxDQUFDO1NBQ2QsRUFBRSxDQUFDLENBQUMsQ0FBQztLQUVUOzs7O0lBRUQsaURBQWM7OztJQUFkOztZQUVVLHFCQUFxQixHQUFHLFVBQUMsS0FBSztZQUNoQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQU07Z0JBQ3hCLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRTtvQkFDaEIsTUFBTSxHQUFHLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUMxQztxQkFBTTtvQkFDSCxNQUFNLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztpQkFDM0I7YUFDSixDQUFDLENBQUM7WUFFSCxPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUVELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsVUFBQyxNQUFNO1lBQy9DLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRTtnQkFDaEIsTUFBTSxHQUFHLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7OzthQUsxQztZQUNELE1BQU0sQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLE9BQU8sTUFBTSxDQUFDO1NBQ2pCLENBQUMsQ0FBQztLQUVOOzs7Ozs7SUFFRCxnREFBYTs7Ozs7SUFBYixVQUFjLE1BQW1CLEVBQUUsT0FBTztRQUN0QyxNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7S0FDeEM7Ozs7SUFFRCxnREFBYTs7O0lBQWI7O1lBQ1Usb0JBQW9CLEdBQUcsVUFBQyxNQUFtQjs7Z0JBQ3pDLElBQUksR0FBRyxDQUFDO1lBQ1osSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFO2dCQUNoQixNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFDLE9BQU87b0JBQzFCLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRTt3QkFDakIsSUFBSSxJQUFJLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDO3FCQUN6Qzt5QkFBTTt3QkFDSCxJQUFJLE9BQU8sQ0FBQyxRQUFRLEVBQUU7NEJBQ2xCLElBQUksRUFBRSxDQUFDO3lCQUNWO3FCQUNKO2lCQUNKLENBQUMsQ0FBQztnQkFDSCxPQUFPLElBQUksQ0FBQzthQUNmO2lCQUFNO2dCQUNILElBQUksTUFBTSxDQUFDLFFBQVEsRUFBRTtvQkFDakIsT0FBTyxDQUFDLENBQUM7aUJBQ1o7YUFDSjtTQUNKOztZQUNLLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUEsQ0FBQzs7WUFDOUQsR0FBRyxHQUFHLENBQUM7UUFDWCxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBSztZQUNqQixLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFBLE1BQU07Z0JBQ3ZCLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRTtvQkFDaEIsR0FBRyxJQUFJLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUN2QztxQkFBTSxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUU7b0JBQ3hCLEdBQUcsRUFBRSxDQUFDO2lCQUNUO2FBQ0osQ0FBQyxDQUFDO1NBQ04sQ0FBQyxDQUFDO1FBQ0gsT0FBTyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0tBQ2xCOzs7O0lBRUQsc0RBQW1COzs7SUFBbkI7O1lBQ1UsMEJBQTBCLEdBQUcsVUFBQyxLQUFrQjs7Z0JBQzlDLFNBQVMsR0FBRyxJQUFJO1lBRXBCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFOztvQkFDM0MsTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7b0JBQ2hCLFNBQVMsR0FBRywwQkFBMEIsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDL0MsSUFBSSxTQUFTLEVBQUU7d0JBQ1gsT0FBTyxJQUFJLENBQUM7cUJBQ2Y7aUJBQ0o7cUJBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7b0JBQ3pCLFNBQVMsR0FBRyxLQUFLLENBQUM7aUJBQ3JCO2FBQ0o7WUFDRCxPQUFPLFNBQVMsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7U0FDL0M7O1lBQ0ssTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsTUFBTSxDQUFDLE9BQU8sR0FBQSxDQUFDOztZQUM5RCxRQUFRLEdBQUcsSUFBSTtRQUNuQixLQUFLLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFOztnQkFDMUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDeEIsS0FBSyxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7O29CQUNyRCxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7Z0JBQ2hDLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRTtvQkFDaEIsUUFBUSxHQUFHLDBCQUEwQixDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUM5QyxJQUFJLFFBQVEsRUFBRTt3QkFDVixPQUFPLElBQUksQ0FBQztxQkFDZjtpQkFDSjtxQkFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtvQkFDekIsUUFBUSxHQUFHLEtBQUssQ0FBQztpQkFDcEI7YUFDSjtZQUNELEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUEsTUFBTTthQUMxQixDQUFDLENBQUM7WUFDSCxJQUFJLFFBQVEsRUFBRTtnQkFDVixPQUFPLElBQUksQ0FBQzthQUNmO1NBQ0o7UUFDRCxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBSztTQUNwQixDQUFDLENBQUM7UUFDSCxPQUFPLFFBQVEsSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztLQUN4Qzs7OztJQUVELDhDQUFXOzs7SUFBWDs7WUFDVSxhQUFhLEdBQUcsVUFBQyxNQUFtQjs7Z0JBQ2hDLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxRQUFRLEdBQUEsQ0FBQzs7Z0JBQ25FLGNBQWMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxRQUFRLEdBQUEsQ0FBQzs7Z0JBQ3JELGFBQTRCO1lBQ2hDLElBQUksU0FBUyxDQUFDLE1BQU0sRUFBRTtnQkFDbEIsYUFBYSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFBLENBQUMsQ0FBQztnQkFDbkUsYUFBYSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQyxFQUFFO29CQUNwQyxLQUFLLEVBQUUsRUFBRTtvQkFDVCxJQUFJLEVBQUUsRUFBRTtvQkFDUixLQUFLLEVBQUUsRUFBRTtvQkFDVCxPQUFPLEVBQUUsSUFBSTtvQkFDYixPQUFPLEVBQUUsSUFBSTtvQkFDYixNQUFNLEVBQUUsU0FBUztpQkFDcEIsQ0FBQyxDQUFDO2FBQ047aUJBQU07Z0JBQ0gsYUFBYSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUEsT0FBTztvQkFDckMsSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFO3dCQUNqQixhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7cUJBQzFCO29CQUNELE9BQU8sT0FBTyxDQUFDO2lCQUNsQixDQUFDLENBQUM7YUFDTjtZQUNELE1BQU0sQ0FBQyxNQUFNLEdBQUcsYUFBYSxDQUFDO1NBQ2pDOztZQUVLLFFBQVEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLE1BQU0sQ0FBQyxRQUFRLEdBQUEsQ0FBQzs7WUFDL0QsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLFFBQVEsR0FBQSxDQUFDOztZQUMvRCxZQUEyQjtRQUMvQixJQUFJLFFBQVEsQ0FBQyxNQUFNLEVBQUU7WUFDakIsWUFBWSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFBLENBQUMsQ0FBQztZQUNyRSxZQUFZLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDLEVBQUU7Z0JBQ2xDLEtBQUssRUFBRSxFQUFFO2dCQUNULElBQUksRUFBRSxFQUFFO2dCQUNSLEtBQUssRUFBRSxFQUFFO2dCQUNULE9BQU8sRUFBRSxJQUFJO2dCQUNiLE9BQU8sRUFBRSxJQUFJO2dCQUNiLE1BQU0sRUFBRSxRQUFRO2FBQ25CLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxhQUFhLEdBQUcsWUFBWSxDQUFDO1NBQ3JDO2FBQU07WUFDSCxZQUFZLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsVUFBQSxNQUFNO2dCQUN4QyxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7b0JBQ2hCLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDekI7Z0JBQ0QsT0FBTyxNQUFNLENBQUM7YUFDakIsQ0FBQyxDQUFDO1NBQ047UUFDRCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0tBQ3hDOzs7O0lBRUQsaURBQWM7OztJQUFkO1FBQUEsaUJBMkJDOztZQTFCUyxxQkFBcUIsR0FBRyxVQUFDLEtBQUssRUFBRSxNQUFvQjtZQUN0RCxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFDLE1BQW1CLEVBQUUsR0FBVztnQkFDOUMsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFO29CQUNoQixJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTt3QkFDNUIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO3FCQUMvQjt5QkFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTs7d0JBRW5DLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLGVBQU0sTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO3FCQUN0RDt5QkFBTTt3QkFDSCxxQkFBcUIsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7cUJBQ3hDO2lCQUNKO2FBQ0osQ0FBQyxDQUFDO1NBQ047UUFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxVQUFDLE1BQW1CLEVBQUUsR0FBVztZQUNwRCxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7Z0JBQ2hCLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO29CQUM1QixLQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7aUJBQ3JDO3FCQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFOztvQkFFbkMsS0FBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsZUFBTSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7aUJBQ2hFO3FCQUFNO29CQUNDLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUNqQzthQUNKO1NBQ0osQ0FBQyxDQUFDO0tBQ047Ozs7SUFFRCxrREFBZTs7O0lBQWY7O1lBQ1Usc0JBQXNCLEdBQUcsVUFBQyxLQUFrQixFQUFFLE1BQW1CLEVBQUUsR0FBRztZQUN4RSxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxJQUFJO2dCQUMvQixJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUU7b0JBQ2pCLHNCQUFzQixDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7aUJBQ2hEO2FBQ0osQ0FBQyxDQUFDOztnQkFDRyxVQUFVLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBQyxPQUFvQixJQUFLLE9BQUEsT0FBTyxDQUFDLFFBQVEsR0FBQSxDQUFDO1lBQ2xGLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBQyxPQUFvQixJQUFLLE9BQUEsQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFBLENBQUMsQ0FBQztZQUNoRixVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBYztnQkFDOUIsQ0FBQyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7Z0JBQ25CLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3pCLENBQUMsQ0FBQztZQUNILElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUMzQixNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDaEM7U0FDSjtRQUVELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsVUFBQyxVQUFVLEVBQUUsTUFBTTtZQUM5RCxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7Z0JBRWhCLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLEdBQUc7b0JBQy9CLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRTt3QkFDakIsc0JBQXNCLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztxQkFDaEQ7aUJBQ0osQ0FBQyxDQUFDOztvQkFFRyxVQUFVLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsUUFBUSxHQUFBLENBQUM7Z0JBQ3BFLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUEsQ0FBQyxDQUFDO2dCQUNuRSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO29CQUN0QixVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUMzQjtnQkFDRCxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQztvQkFDaEIsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDdEIsQ0FBQyxDQUFDO2FBQ047aUJBQU07Z0JBQ0gsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUMzQjtZQUNELE9BQU8sVUFBVSxDQUFDO1NBQ3JCLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDUCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztLQUN4Qzs7Ozs7O0lBRUQsb0RBQWlCOzs7OztJQUFqQixVQUFrQixNQUFNLEVBQUUsT0FBTztLQUNoQzs7Ozs7SUFFRCxrREFBZTs7OztJQUFmLFVBQWdCLEtBQUs7UUFDakIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDOztRQUU1RSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0tBQ3hDOzs7O0lBRUQsNENBQVM7OztJQUFUO1FBQUEsaUJBU0M7O1lBUlMsT0FBTyxHQUFHLG9CQUFtQixRQUFRLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxJQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7O1lBQ3pFLE1BQU0sR0FBRyxJQUFJLFVBQVUsRUFBRTtRQUMvQixNQUFNLENBQUMsTUFBTSxHQUFHOztnQkFDTixLQUFLLEdBQUcsb0JBQVMsTUFBTSxDQUFDLE1BQU0sSUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxHQUFHLEVBQUUsR0FBQSxDQUFDO1lBQzVFLEtBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0QyxLQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1NBQ3pDLENBQUM7UUFDRixNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQzlCOzs7OztJQUVELCtDQUFZOzs7O0lBQVosVUFBYSxNQUFtQjs7Ozs7WUFJdEIsTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDOztZQUN2QyxLQUFvQjtRQUN4QixJQUFJLE1BQU0sRUFBRTtZQUNSLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1NBQ3pCO2FBQU07WUFDSCxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztTQUM5QjtRQUNELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDMUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ3JELEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixNQUFNO2FBQ1Q7U0FDSjtRQUNELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7S0FDeEM7Ozs7SUFFRCwrQ0FBWTs7O0lBQVo7UUFDSSxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7S0FDeEM7Ozs7O0lBRUQsMENBQU87Ozs7SUFBUCxVQUFRLEtBQUs7UUFDVCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztLQUN2Qjs7Ozs7SUFFRCx5Q0FBTTs7OztJQUFOLFVBQU8sS0FBSztRQUNSLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0tBQ3hCOzs7O0lBRUQsMkNBQVE7OztJQUFSO1FBQ0ksSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLFdBQVcsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO1FBQ3hILElBQUksT0FBTyxJQUFJLENBQUMsTUFBTSxLQUFLLFNBQVMsRUFBRTtZQUNsQyxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsS0FBSyxXQUFXLEVBQUU7Z0JBQ2xFLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUM7YUFDcEQ7WUFDRCxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxXQUFXLEVBQUU7Z0JBQzFELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDbkQ7WUFDRCxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssS0FBSyxXQUFXLEVBQUU7Z0JBQ3pELElBQUksQ0FBQyxLQUFLLGdCQUFPLElBQUksQ0FBQyxLQUFLLEVBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN0RDtTQUNKOztLQUVKOztnQkE1dkJKLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsdUJBQXVCO29CQUNqQyxRQUFRLEVBQUUsNHJQQXNKWDtvQkFDQyxNQUFNLEVBQUU7d0JBQ04sc2ZBMkJDO3FCQUNGO2lCQUNGOzs7OzswQkFJSSxLQUFLO3lCQUNMLEtBQUs7eUJBQ0wsTUFBTTswQkFFTixTQUFTLFNBQUMsU0FBUztrQ0FDbkIsU0FBUyxTQUFDLGlCQUFpQjtzQ0FvRTNCLFlBQVksU0FBQyxrQkFBa0IsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7SUF5ZmhELCtCQUFDO0NBQUE7Ozs7OztBQ2x3QkQ7SUFrQkE7S0F5QnFDOztnQkF6QnBDLFFBQVEsU0FBQztvQkFDTixPQUFPLEVBQUU7d0JBQ0wsWUFBWTt3QkFDWixXQUFXO3dCQUNYLG1CQUFtQjt3QkFDbkIsYUFBYTt3QkFDYixlQUFlO3dCQUNmLGNBQWM7d0JBQ2QsY0FBYzt3QkFDZCxlQUFlO3dCQUNmLGdCQUFnQjt3QkFDaEIsZ0JBQWdCO3dCQUNoQixhQUFhO3dCQUNiLGNBQWM7cUJBQ2pCO29CQUNELFlBQVksRUFBRTt3QkFDVix3QkFBd0I7cUJBQzNCO29CQUNELE9BQU8sRUFBRTt3QkFDTCx3QkFBd0I7cUJBQzNCO29CQUNELFNBQVMsRUFBRTt3QkFDUCxzQkFBc0I7cUJBQ3pCO2lCQUNKOztJQUNtQyw0QkFBQztDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9