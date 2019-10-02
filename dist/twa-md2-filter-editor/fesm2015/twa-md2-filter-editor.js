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
class TWAFilterEditorService {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TWAFilterEditorComponent {
    constructor() {
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
        (arr, oldIndex, newIndex) => {
            if (newIndex > arr.length) {
                /** @type {?} */
                let k = newIndex - arr.length;
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
    handleKeyboardEvent(event) {
        if ((event.key === 'c' && event.ctrlKey)) {
            this.clearFilters();
        }
        else if (this.editing && event.keyCode === 13) {
            this.addFilter();
        }
    }
    /**
     * @return {?}
     */
    openFilters() {
        /** @type {?} */
        const fileObj = ((/** @type {?} */ (document.getElementById('openFiltersFile')))).files[0];
        /** @type {?} */
        const reader = new FileReader();
        reader.onload = (/**
         * @return {?}
         */
        () => {
            // console.log(reader.result);
            /** @type {?} */
            const data = JSON.parse((/** @type {?} */ (reader.result)));
            this.activeFilters = data;
            this.change.emit(this.activeFilters);
        });
        reader.readAsText(fileObj);
    }
    /**
     * @return {?}
     */
    saveFilters() {
        /** @type {?} */
        const blob = new Blob([JSON.stringify(this.activeFilters)], { type: 'text/json' });
        /** @type {?} */
        const filename = 'filters.json';
        /** @type {?} */
        const element = document.createElement('a');
        element.href = window.URL.createObjectURL(blob);
        element.download = filename;
        document.body.appendChild(element);
        element.click();
    }
    /**
     * @return {?}
     */
    checkFilter() {
        return (this.selectedField === 'none' || this.selectedValue === '');
    }
    /**
     * @return {?}
     */
    sendFilter() {
        this.addFilter();
    }
    /**
     * @return {?}
     */
    addFilter() {
        // console.log('adding filter...');
        // console.log('adding filter...');
        /** @type {?} */
        let color = '';
        /** @type {?} */
        let field = '';
        /** @type {?} */
        let dbfield = '';
        /** @type {?} */
        let label = '';
        /** @type {?} */
        let name = '';
        /** @type {?} */
        let explanation = this.selectedField + ' ' + this.operations[this.operation] + ' ' + this.selectedValue;
        for (let i = 0, l = this.filterOptions.fields.length; i < l; i++) {
            if (this.filterOptions.fields[i].name === this.selectedField) {
                // color = this.filterOptions.fields[i].color;
                // field = this.filterOptions.fields[i].field;
                // label = this.filterOptions.fields[i].label;
                // name = this.filterOptions.fields[i].name;
                /**
                 * ...with object destructuring
                 */
                ({ color, field, dbfield, label, name } = this.filterOptions.fields[i]);
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
    }
    /**
     * @param {?} filter
     * @return {?}
     */
    selectFilter(filter) {
        filter.selected = !filter.selected;
        /** @type {?} */
        const group = this.getParentFilter(filter);
        if (group) {
            /** @type {?} */
            let selectedAll = true;
            for (let i = 0, l = group.fields.length; i < l; i++) {
                /** @type {?} */
                const tmpfilter = group.fields[i];
                if (!tmpfilter.isgroup && !tmpfilter.selected) {
                    selectedAll = false;
                }
            }
            if (selectedAll) {
                group.selected = true;
            }
        }
    }
    /**
     * @param {?} filter
     * @return {?}
     */
    getParentFilter(filter) {
        /** @type {?} */
        const getParentFilterInGroup = (/**
         * @param {?} group
         * @param {?} filter2
         * @return {?}
         */
        (group, filter2) => {
            ret = null;
            for (let i = 0, l = group.fields.length; i < l; i++) {
                /** @type {?} */
                const tmpfilter = group.fields[i];
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
        let ret = null;
        for (let i = 0, l = this.activeFilters.length; i < l; i++) {
            /** @type {?} */
            const tmpfilter = this.activeFilters[i];
            if (JSON.stringify(tmpfilter) === JSON.stringify(filter)) {
                return null;
            }
            else if (tmpfilter.isgroup) {
                ret = getParentFilterInGroup(tmpfilter, filter);
            }
        }
        return ret;
    }
    /**
     * @param {?} direction
     * @return {?}
     */
    moveTo(direction) {
        /** @type {?} */
        let idx = -1;
        /** @type {?} */
        let toIdx = -1;
        /** @type {?} */
        let group = -1;
        // Searching the selected filter...
        this.activeFilters.forEach((/**
         * @param {?} filter
         * @param {?} tmpidx
         * @return {?}
         */
        (filter, tmpidx) => {
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
                (filter2, tmpidx2) => {
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
    }
    /**
     * @return {?}
     */
    getSelected() {
        /** @type {?} */
        const getInGroup = (/**
         * @param {?} group
         * @return {?}
         */
        (group) => {
            return group.fields.reduce((/**
             * @param {?} acc2
             * @param {?} filter
             * @return {?}
             */
            (acc2, filter) => {
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
        (acc, filter) => {
            if (filter.isgroup) {
                acc += getInGroup(filter);
            }
            else if (filter.selected) {
                acc++;
            }
            return acc;
        }), 0);
    }
    /**
     * @return {?}
     */
    clearSelection() {
        /** @type {?} */
        const clearSelectionInGroup = (/**
         * @param {?} group
         * @return {?}
         */
        (group) => {
            group.fields.forEach((/**
             * @param {?} filter
             * @return {?}
             */
            (filter) => {
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
        (filter) => {
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
    }
    /**
     * @param {?} filter
     * @param {?} bitwise
     * @return {?}
     */
    changeBitwise(filter, bitwise) {
        filter.bitwise = bitwise;
        this.change.emit(this.activeFilters);
    }
    /**
     * @return {?}
     */
    groupSelected() {
        /** @type {?} */
        const groupSelectedInGroup = (/**
         * @param {?} filter
         * @return {?}
         */
        (filter) => {
            /** @type {?} */
            let ret2 = 0;
            if (filter.isgroup) {
                filter.fields.forEach((/**
                 * @param {?} filter2
                 * @return {?}
                 */
                (filter2) => {
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
        const groups = this.activeFilters.filter((/**
         * @param {?} filter
         * @return {?}
         */
        filter => filter.isgroup));
        /** @type {?} */
        let ret = 0;
        groups.forEach((/**
         * @param {?} group
         * @return {?}
         */
        (group) => {
            group.fields.forEach((/**
             * @param {?} filter
             * @return {?}
             */
            filter => {
                if (filter.isgroup) {
                    ret += groupSelectedInGroup(filter);
                }
                else if (filter.selected) {
                    ret++;
                }
            }));
        }));
        return ret > 0;
    }
    /**
     * @return {?}
     */
    entireGroupSelected() {
        /** @type {?} */
        const entireGroupSelectedInGroup = (/**
         * @param {?} group
         * @return {?}
         */
        (group) => {
            /** @type {?} */
            let selected2 = true;
            for (let i = 0, l = group.fields.length; i < l; i++) {
                /** @type {?} */
                const filter = group.fields[i];
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
        const groups = this.activeFilters.filter((/**
         * @param {?} filter
         * @return {?}
         */
        filter => filter.isgroup));
        /** @type {?} */
        let selected = true;
        for (let ig = 0, lg = groups.length; ig < lg; ig++) {
            /** @type {?} */
            const group = groups[ig];
            for (let ig2 = 0, lg2 = group.fields.length; ig2 < lg2; ig2++) {
                /** @type {?} */
                const filter = group.fields[ig2];
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
            filter => {
            }));
            if (selected) {
                return true;
            }
        }
        groups.forEach((/**
         * @param {?} group
         * @return {?}
         */
        (group) => {
        }));
        return selected && groups.length > 0;
    }
    /**
     * @return {?}
     */
    createGroup() {
        /** @type {?} */
        const createInGroup = (/**
         * @param {?} filter
         * @return {?}
         */
        (filter) => {
            /** @type {?} */
            const selected2 = filter.fields.filter((/**
             * @param {?} filter2
             * @return {?}
             */
            filter2 => filter2.selected));
            /** @type {?} */
            const groupPosition2 = filter.fields.findIndex((/**
             * @param {?} v
             * @return {?}
             */
            v => v.selected));
            /** @type {?} */
            let resultFilter2;
            if (selected2.length) {
                resultFilter2 = filter.fields.filter((/**
                 * @param {?} filter2
                 * @return {?}
                 */
                filter2 => !filter2.selected));
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
                filter2 => {
                    if (filter2.isgroup) {
                        createInGroup(filter2);
                    }
                    return filter2;
                }));
            }
            filter.fields = resultFilter2;
        });
        /** @type {?} */
        const selected = this.activeFilters.filter((/**
         * @param {?} filter
         * @return {?}
         */
        filter => filter.selected));
        /** @type {?} */
        const groupPosition = this.activeFilters.findIndex((/**
         * @param {?} v
         * @return {?}
         */
        v => v.selected));
        /** @type {?} */
        let resultFilter;
        if (selected.length) {
            resultFilter = this.activeFilters.filter((/**
             * @param {?} filter
             * @return {?}
             */
            filter => !filter.selected));
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
            filter => {
                if (filter.isgroup) {
                    createInGroup(filter);
                }
                return filter;
            }));
        }
        this.clearSelection();
        this.change.emit(this.activeFilters);
    }
    /**
     * @return {?}
     */
    sanitizeGroups() {
        /** @type {?} */
        const sanitizeGroupsInGroup = (/**
         * @param {?} group
         * @param {?=} parent
         * @return {?}
         */
        (group, parent) => {
            group.fields.map((/**
             * @param {?} filter
             * @param {?} idx
             * @return {?}
             */
            (filter, idx) => {
                if (filter.isgroup) {
                    if (filter.fields.length === 0) {
                        group.fields.splice(idx, 1);
                    }
                    else if (filter.fields.length === 1) {
                        // group.fields.push({...filter.fields[0]});
                        group.fields.splice(idx, 1, Object.assign({}, filter.fields[0]));
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
        (filter, idx) => {
            if (filter.isgroup) {
                if (filter.fields.length === 0) {
                    this.activeFilters.splice(idx, 1);
                }
                else if (filter.fields.length === 1) {
                    // this.activeFilters.push({...filter.fields[0]});
                    this.activeFilters.splice(idx, 1, Object.assign({}, filter.fields[0]));
                }
                else {
                    sanitizeGroupsInGroup(filter);
                }
            }
        }));
    }
    /**
     * @return {?}
     */
    removeFromGroup() {
        /** @type {?} */
        const removeFromGroupInGroup = (/**
         * @param {?} group
         * @param {?} parent
         * @param {?} idx
         * @return {?}
         */
        (group, parent, idx) => {
            group.fields.forEach((/**
             * @param {?} filter2
             * @param {?} idx2
             * @return {?}
             */
            (filter2, idx2) => {
                if (filter2.isgroup) {
                    removeFromGroupInGroup(filter2, group, idx2);
                }
            }));
            /** @type {?} */
            const tmpFilters = group.fields.filter((/**
             * @param {?} filter2
             * @return {?}
             */
            (filter2) => filter2.selected));
            group.fields = group.fields.filter((/**
             * @param {?} filter2
             * @return {?}
             */
            (filter2) => !filter2.selected));
            tmpFilters.forEach((/**
             * @param {?} v
             * @return {?}
             */
            (v) => {
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
        (newFilters, filter) => {
            if (filter.isgroup) {
                filter.fields.forEach((/**
                 * @param {?} filter2
                 * @param {?} idx
                 * @return {?}
                 */
                (filter2, idx) => {
                    if (filter2.isgroup) {
                        removeFromGroupInGroup(filter2, filter, idx);
                    }
                }));
                /** @type {?} */
                const tmpFilters = filter.fields.filter((/**
                 * @param {?} filter2
                 * @return {?}
                 */
                filter2 => filter2.selected));
                filter.fields = filter.fields.filter((/**
                 * @param {?} filter2
                 * @return {?}
                 */
                filter2 => !filter2.selected));
                if (filter.fields.length) {
                    newFilters.push(filter);
                }
                tmpFilters.forEach((/**
                 * @param {?} v
                 * @return {?}
                 */
                v => {
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
    }
    /**
     * @param {?} _event
     * @param {?} _filter
     * @return {?}
     */
    onStartDragFilter(_event, _filter) {
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onDroppedFilter(event) {
        this.arrayMove(this.activeFilters, event.previousIndex, event.currentIndex);
        // this.clearSelection();
        this.sanitizeGroups();
        this.change.emit(this.activeFilters);
    }
    /**
     * @return {?}
     */
    uploadSet() {
        /** @type {?} */
        const fileObj = ((/** @type {?} */ (document.getElementById('fileSet')))).files[0];
        /** @type {?} */
        const reader = new FileReader();
        reader.onload = (/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const lines = ((/** @type {?} */ (reader.result))).split(/\r?\n/).filter((/**
             * @param {?} val
             * @return {?}
             */
            val => val > ''));
            this.selectedValue = lines.join(', ');
            this.fileSet.nativeElement.value = '';
        });
        reader.readAsText(fileObj);
    }
    /**
     * @param {?} filter
     * @return {?}
     */
    removeFilter(filter) {
        // const removeFilterInGroup = (group, filter) => {
        // const removeFilterInGroup = (group, filter) => {
        // };
        /** @type {?} */
        const parent = this.getParentFilter(filter);
        /** @type {?} */
        let group;
        if (parent) {
            group = parent.fields;
        }
        else {
            group = this.activeFilters;
        }
        for (let i = 0, l = group.length; i < l; i++) {
            if (JSON.stringify(group[i]) === JSON.stringify(filter)) {
                group.splice(i, 1);
                break;
            }
        }
        this.sanitizeGroups();
        this.change.emit(this.activeFilters);
    }
    /**
     * @return {?}
     */
    clearFilters() {
        this.activeFilters = [];
        this.change.emit(this.activeFilters);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onFocus(event) {
        this.editing = true;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onBlur(event) {
        this.editing = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
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
                this.texts = Object.assign({}, this.texts, this.config.texts);
            }
        }
        // this.filterOptions = JSON.parse(this.options);
    }
}
TWAFilterEditorComponent.decorators = [
    { type: Component, args: [{
                selector: 'twa-md2-filter-editor',
                template: "<div fxLayout=\"column\" style=\"width: 100%;\">\n    <div class=\"selector\" fxLayout=\"row\" fxLayoutGap=\"10px\">\n        <mat-form-field>\n            <mat-select [(ngModel)]=\"selectedField\">\n                <mat-option selected value=\"none\">{{texts.filterBy}}</mat-option>\n                <mat-option *ngFor=\"let field of filterOptions.fields\" [(value)]=\"field.name\">{{field.label}}</mat-option>\n            </mat-select>\n        </mat-form-field>\n        <mat-form-field>\n            <mat-select [(ngModel)]=\"operation\">\n                <mat-option *ngFor=\"let op of operationsData\" value=\"{{op.type}}\">{{op.label}}</mat-option>\n            </mat-select>\n        </mat-form-field>\n        <mat-form-field>\n            <input matInput placeholder=\"{{texts.filter}}\" [(ngModel)]=\"selectedValue\"\n                    (focus)=\"onFocus($event)\" (blur)=\"onBlur($event)\" />\n            <button mat-button *ngIf=\"operation==='in'\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"fileSet.click()\">\n                <mat-icon>attach_file</mat-icon>\n            </button>\n        </mat-form-field>\n        <div>\n            <button mat-button mat-icon-button (click)=\"sendFilter()\" [disabled]=\"checkFilter()\">\n                <mat-icon>send</mat-icon>\n            </button>\n        </div>\n        <div fxFlex></div>\n        <button mat-button mat-icon-button\n                *ngIf=\"activeFilters.length === 0\"\n                matTooltip=\"{{texts.openFilter}}\"\n                (click)=\"openFiltersFile.click()\">\n            <mat-icon>folder_open</mat-icon>\n        </button>\n        <div class=\"tools\" *ngIf=\"activeFilters.length > 0\" fxLayout=\"row\">\n            <button mat-button mat-icon-button\n                    matTooltip=\"{{texts.group}}\"\n                    (click)=\"createGroup()\"\n                    [disabled]=\"getSelected() < 2\">\n                <mat-icon>link</mat-icon>\n            </button>\n            <button mat-button mat-icon-button\n                    matTooltip=\"{{texts.ungroup}}\"\n                    (click)=\"removeFromGroup()\"\n                    [disabled]=\"!groupSelected()\">\n                <mat-icon>link_off</mat-icon>\n            </button>\n            <button mat-button mat-icon-button\n                    matTooltip=\"{{texts.moveLeft}}\"\n                    (click)=\"moveTo(-1)\"\n                    [disabled]=\"getSelected() !== 1 && !entireGroupSelected()\">\n                <mat-icon>arrow_back</mat-icon>\n            </button>\n            <button mat-button mat-icon-button\n                    matTooltip=\"{{texts.moveRight}}\"\n                    (click)=\"moveTo(1)\"\n                    [disabled]=\"getSelected() !== 1 && !entireGroupSelected()\">\n                <mat-icon>arrow_forward</mat-icon>\n            </button>\n            <button mat-button mat-icon-button\n                    matTooltip=\"{{texts.openFilter}}\"\n                    (click)=\"openFiltersFile.click()\">\n                <mat-icon>folder_open</mat-icon>\n            </button>\n            <button mat-button mat-icon-button\n                    matTooltip=\"{{texts.saveFilter}}\"\n                    [disabled]=\"getSelected() > 1\"\n                    (click)=\"saveFilters()\">\n                <mat-icon>save</mat-icon>\n            </button>\n            <button mat-button mat-icon-button\n                    matTooltip=\"{{texts.clearSelection}}\"\n                    [disabled]=\"getSelected() < 1\"\n                    (click)=\"clearSelection()\">\n                <mat-icon>clear</mat-icon>\n            </button>\n            <button mat-button mat-icon-button\n                    matTooltip=\"{{texts.clearAll}}\"\n                    [disabled]=\"activeFilters.length < 1\"\n                    (click)=\"clearFilters()\">\n                <mat-icon>clear_all</mat-icon>\n            </button>\n        </div>\n    </div>\n    <div class=\"filter\" fxLayoutGap=\"12\">\n        <mat-chip-list cdkDropList\n                        cdkDropListOrientation=\"horizontal\"\n                        (cdkDropListDropped)=\"onDroppedFilter($event)\">\n            <ng-container *ngFor=\"let filter of activeFilters; let idx = index\">\n                <div fxLayout=\"row\"\n                cdkDrag\n                (cdkDragStarted)=\"onStartDragFilter($event, filter)\" [ngClass]=\"{'cgroup': filter.isgroup}\">\n                    <button mat-button *ngIf=\"idx > 0\" [matMenuTriggerFor]=\"menu\" class=\"bitwise\">{{filter.bitwise}}</button>\n                    <mat-menu #menu=\"matMenu\">\n                        <button mat-menu-item (click)=\"changeBitwise(filter, '&&')\">&&</button>\n                        <button mat-menu-item (click)=\"changeBitwise(filter, '||')\">||</button>\n                    </mat-menu>\n                    <mat-chip color=\"{{filter.color}}\" selected=\"true\"\n                                id=\"filter-{{idx}}\"\n                                [removable]=\"true\" (removed)=\"removeFilter(filter)\"\n                                [matTooltip]=\"filter.value\"\n                                [matTooltipDisabled]=\"filter.operation!=='in'\"\n                                matTooltipShowDelay=\"1500\"\n                                (click)=\"selectFilter(filter)\"\n                                *ngIf=\"!filter.isgroup\"\n                                [ngClass]=\"{'selected': filter.selected, 'mat-accent': filter.selected}\">\n                        {{filter.explanation}}\n                        <mat-icon matChipRemove>cancel</mat-icon>\n                    </mat-chip>\n                    <div *ngIf=\"filter.isgroup\" fxLayout=\"row\">\n                        <div *ngTemplateOutlet=\"group; context: { filter: this.filter, idx: this.idx}\" fxLayout=\"row\">\n                        </div>\n                    </div>\n                </div>\n            </ng-container>\n        </mat-chip-list>\n    </div>\n</div>\n<input style=\"visibilty: hidden; height: 0px; width: 0px;\" type=\"file\" id=\"fileSet\" #fileSet (change)=\"uploadSet()\" />\n<input style=\"visibilty: hidden; height: 0px; width: 0px;\" type=\"file\" id=\"openFiltersFile\" #openFiltersFile (change)=\"openFilters()\" />\n<ng-template #group let-filter=\"filter\" let-idx=\"idx\">\n    <span class=\"group-start\">(</span>\n    <ng-container *ngFor=\"let filter2 of filter.fields; let idx2 = index\">\n        <button mat-button *ngIf=\"idx2 > 0\" [matMenuTriggerFor]=\"menu2\"\n                class=\"bitwise\">\n            {{filter2.bitwise}}\n        </button>\n        <mat-menu #menu2=\"matMenu\">\n            <button mat-menu-item (click)=\"changeBitwise(filter2, '&&')\">&&</button>\n            <button mat-menu-item (click)=\"changeBitwise(filter2, '||')\">||</button>\n        </mat-menu>\n        <div>\n            <mat-chip color=\"{{filter.color}}\" selected=\"true\"\n                id=\"filter-{{idx}}-{{idx2}}\"\n                [removable]=\"true\" (removed)=\"removeFilter(filter2)\"\n                [matTooltip]=\"filter2.value\"\n                [matTooltipDisabled]=\"filter.operation!=='in'\"\n                matTooltipShowDelay=\"1500\"\n                (click)=\"selectFilter(filter2)\"\n                [ngClass]=\"{'selected': filter2.selected, 'mat-accent': filter2.selected}\"\n                *ngIf=\"!filter2.isgroup\"\n            >{{filter2.explanation}}\n                <mat-icon matChipRemove>cancel</mat-icon>\n            </mat-chip>\n            <div *ngIf=\"filter2.isgroup\" fxLayout=\"row\">\n                <div *ngTemplateOutlet=\"group; context: { filter: this.filter2, idx: this.idx2}\">\n                </div>\n            </div>\n        </div>\n    </ng-container>\n    <span class=\"group-end\">)</span>\n</ng-template>\n",
                styles: [`
    .error { color: red; }
    .selector {
        width: 100%;
    }
    .filter {
        padding-bottom: 12px;
    }
    .filter mat-chip {
        margin: 4px;
    }
    .cgroup {
        display: flex;
    }
    mat-chip.selected {
        color: #fff;
        font-weight: bold;
    }
    span.group-start,
    span.group-end {
        font-size: 25px;
    }
    button.bitwise {
        min-width: 24px;
        padding-left: 0;
        padding-right: 0;
    }
    `]
            }] }
];
/** @nocollapse */
TWAFilterEditorComponent.ctorParameters = () => [];
TWAFilterEditorComponent.propDecorators = {
    options: [{ type: Input }],
    config: [{ type: Input }],
    change: [{ type: Output }],
    fileSet: [{ type: ViewChild, args: ['fileSet', { static: true },] }],
    openFiltersFile: [{ type: ViewChild, args: ['oepnFiltersFile', { static: true },] }],
    handleKeyboardEvent: [{ type: HostListener, args: ['document:keydown', ['$event'],] }]
};
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
class TWAFilterEditorModule {
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
