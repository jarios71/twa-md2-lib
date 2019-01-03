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
class TWAFilterEditorService {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        this.arrayMove = (arr, oldIndex, newIndex) => {
            if (newIndex > arr.length) {
                /** @type {?} */
                let k = newIndex - arr.length;
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
        reader.onload = () => {
            console.log(reader.result);
            /** @type {?} */
            const data = JSON.parse((/** @type {?} */ (reader.result)));
            this.activeFilters = data;
        };
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
    addFilter() {
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
        const getParentFilterInGroup = (group, filter2) => {
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
        };
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
        this.activeFilters.forEach((filter, tmpidx) => {
            if (filter.selected) {
                idx = tmpidx;
                return;
            }
            else if (filter.isgroup) {
                filter.fields.forEach((filter2, tmpidx2) => {
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
    }
    /**
     * @return {?}
     */
    getSelected() {
        /** @type {?} */
        const getInGroup = (group) => {
            return group.fields.reduce((acc2, filter) => {
                if (filter.isgroup) {
                    acc2 += getInGroup(filter);
                }
                else if (filter.selected) {
                    acc2++;
                }
                return acc2;
            }, 0);
        };
        return this.activeFilters.reduce((acc, filter) => {
            if (filter.isgroup) {
                acc += getInGroup(filter);
            }
            else if (filter.selected) {
                acc++;
            }
            return acc;
        }, 0);
    }
    /**
     * @return {?}
     */
    clearSelection() {
        /** @type {?} */
        const clearSelectionInGroup = (group) => {
            group.fields.forEach((filter) => {
                if (filter.isgroup) {
                    filter = clearSelectionInGroup(filter);
                }
                else {
                    filter.selected = false;
                }
            });
            return group;
        };
        this.activeFilters = this.activeFilters.map((filter) => {
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
        const groupSelectedInGroup = (filter) => {
            /** @type {?} */
            let ret2 = 0;
            if (filter.isgroup) {
                filter.fields.forEach((filter2) => {
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
        const groups = this.activeFilters.filter(filter => filter.isgroup);
        /** @type {?} */
        let ret = 0;
        groups.forEach((group) => {
            group.fields.forEach(filter => {
                if (filter.isgroup) {
                    ret += groupSelectedInGroup(filter);
                }
                else if (filter.selected) {
                    ret++;
                }
            });
        });
        return ret > 0;
    }
    /**
     * @return {?}
     */
    entireGroupSelected() {
        /** @type {?} */
        const entireGroupSelectedInGroup = (group) => {
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
        };
        /** @type {?} */
        const groups = this.activeFilters.filter(filter => filter.isgroup);
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
            group.fields.forEach(filter => {
            });
            if (selected) {
                return true;
            }
        }
        groups.forEach((group) => {
        });
        return selected && groups.length > 0;
    }
    /**
     * @return {?}
     */
    createGroup() {
        /** @type {?} */
        const createInGroup = (filter) => {
            /** @type {?} */
            const selected2 = filter.fields.filter(filter2 => filter2.selected);
            /** @type {?} */
            const groupPosition2 = filter.fields.findIndex(v => v.selected);
            /** @type {?} */
            let resultFilter2;
            if (selected2.length) {
                resultFilter2 = filter.fields.filter(filter2 => !filter2.selected);
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
                resultFilter2 = filter.fields.map(filter2 => {
                    if (filter2.isgroup) {
                        createInGroup(filter2);
                    }
                    return filter2;
                });
            }
            filter.fields = resultFilter2;
        };
        /** @type {?} */
        const selected = this.activeFilters.filter(filter => filter.selected);
        /** @type {?} */
        const groupPosition = this.activeFilters.findIndex(v => v.selected);
        /** @type {?} */
        let resultFilter;
        if (selected.length) {
            resultFilter = this.activeFilters.filter(filter => !filter.selected);
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
            resultFilter = this.activeFilters.map(filter => {
                if (filter.isgroup) {
                    createInGroup(filter);
                }
                return filter;
            });
        }
        this.clearSelection();
        this.change.emit(this.activeFilters);
    }
    /**
     * @return {?}
     */
    sanitizeGroups() {
        /** @type {?} */
        const sanitizeGroupsInGroup = (group, parent) => {
            group.fields.map((filter, idx) => {
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
            });
        };
        this.activeFilters.map((filter, idx) => {
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
        });
    }
    /**
     * @return {?}
     */
    removeFromGroup() {
        /** @type {?} */
        const removeFromGroupInGroup = (group, parent, idx) => {
            group.fields.forEach((filter2, idx2) => {
                if (filter2.isgroup) {
                    removeFromGroupInGroup(filter2, group, idx2);
                }
            });
            /** @type {?} */
            const tmpFilters = group.fields.filter((filter2) => filter2.selected);
            group.fields = group.fields.filter((filter2) => !filter2.selected);
            tmpFilters.forEach((v) => {
                v.selected = false;
                parent.fields.push(v);
            });
            if (group.fields.length === 0) {
                parent.fields.splice(idx, 1);
            }
        };
        this.activeFilters = this.activeFilters.reduce((newFilters, filter) => {
            if (filter.isgroup) {
                filter.fields.forEach((filter2, idx) => {
                    if (filter2.isgroup) {
                        removeFromGroupInGroup(filter2, filter, idx);
                    }
                });
                /** @type {?} */
                const tmpFilters = filter.fields.filter(filter2 => filter2.selected);
                filter.fields = filter.fields.filter(filter2 => !filter2.selected);
                if (filter.fields.length) {
                    newFilters.push(filter);
                }
                tmpFilters.forEach(v => {
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
        reader.onload = () => {
            /** @type {?} */
            const lines = ((/** @type {?} */ (reader.result))).split(/\r?\n/).filter(val => val > '');
            this.selectedValue = lines.join(', ');
            this.fileSet.nativeElement.value = '';
        };
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
                template: `<div fxLayout="column" style="width: 100%;">
    <div class="selector" fxLayout="row" fxLayoutGap="10px">
        <mat-form-field>
            <mat-select [(ngModel)]="selectedField">
                <mat-option selected value="none">{{texts.filterBy}}</mat-option>
                <mat-option *ngFor="let field of filterOptions.fields" [(value)]="field.name">{{field.label}}</mat-option>
            </mat-select>
        </mat-form-field>
        <mat-form-field>
            <mat-select [(ngModel)]="operation">
                <mat-option *ngFor="let op of operationsData" value="{{op.type}}">{{op.label}}</mat-option>
            </mat-select>
        </mat-form-field>
        <mat-form-field>
            <input matInput placeholder="{{texts.filter}}" [(ngModel)]="selectedValue"
                    (focus)="onFocus($event)" (blur)="onBlur($event)" />
            <button mat-button *ngIf="operation==='in'" matSuffix mat-icon-button aria-label="Clear" (click)="fileSet.click()">
                <mat-icon>attach_file</mat-icon>
            </button>
        </mat-form-field>
        <div>
            <button mat-button mat-icon-button (click)="addFilter()" [disabled]="checkFilter()">
                <mat-icon>send</mat-icon>
            </button>
        </div>
        <div fxFlex></div>
        <button mat-button mat-icon-button
                *ngIf="activeFilters.length === 0"
                matTooltip="{{texts.openFilter}}"
                (click)="openFiltersFile.click()">
            <mat-icon>folder_open</mat-icon>
        </button>
        <div class="tools" *ngIf="activeFilters.length > 0" fxLayout="row">
            <button mat-button mat-icon-button
                    matTooltip="{{texts.group}}"
                    (click)="createGroup()"
                    [disabled]="getSelected() < 2">
                <mat-icon>link</mat-icon>
            </button>
            <button mat-button mat-icon-button
                    matTooltip="{{texts.ungroup}}"
                    (click)="removeFromGroup()"
                    [disabled]="!groupSelected()">
                <mat-icon>link_off</mat-icon>
            </button>
            <button mat-button mat-icon-button
                    matTooltip="{{texts.moveLeft}}"
                    (click)="moveTo(-1)"
                    [disabled]="getSelected() !== 1 && !entireGroupSelected()">
                <mat-icon>arrow_back</mat-icon>
            </button>
            <button mat-button mat-icon-button
                    matTooltip="{{texts.moveRight}}"
                    (click)="moveTo(1)"
                    [disabled]="getSelected() !== 1 && !entireGroupSelected()">
                <mat-icon>arrow_forward</mat-icon>
            </button>
            <button mat-button mat-icon-button
                    matTooltip="{{texts.openFilter}}"
                    (click)="openFiltersFile.click()">
                <mat-icon>folder_open</mat-icon>
            </button>
            <button mat-button mat-icon-button
                    matTooltip="{{texts.saveFilter}}"
                    [disabled]="getSelected() > 1"
                    (click)="saveFilters()">
                <mat-icon>save</mat-icon>
            </button>
            <button mat-button mat-icon-button
                    matTooltip="{{texts.clearSelection}}"
                    [disabled]="getSelected() < 1"
                    (click)="clearSelection()">
                <mat-icon>clear</mat-icon>
            </button>
            <button mat-button mat-icon-button
                    matTooltip="{{texts.clearAll}}"
                    [disabled]="activeFilters.length < 1"
                    (click)="clearFilters()">
                <mat-icon>clear_all</mat-icon>
            </button>
        </div>
    </div>
    <div class="filter" fxLayoutGap="12">
        <mat-chip-list cdkDropList
                        cdkDropListOrientation="horizontal"
                        (cdkDropListDropped)="onDroppedFilter($event)">
            <ng-container *ngFor="let filter of activeFilters; let idx = index">
                <div fxLayout="row"
                cdkDrag
                (cdkDragStarted)="onStartDragFilter($event, filter)" [ngClass]="{'cgroup': filter.isgroup}">
                    <button mat-button *ngIf="idx > 0" [matMenuTriggerFor]="menu" class="bitwise">{{filter.bitwise}}</button>
                    <mat-menu #menu="matMenu">
                        <button mat-menu-item (click)="changeBitwise(filter, '&&')">&&</button>
                        <button mat-menu-item (click)="changeBitwise(filter, '||')">||</button>
                    </mat-menu>
                    <mat-chip color="{{filter.color}}" selected="true"
                                id="filter-{{idx}}"
                                [removable]="true" (removed)="removeFilter(filter)"
                                [matTooltip]="filter.value"
                                [matTooltipDisabled]="filter.operation!=='in'"
                                matTooltipShowDelay="1500"
                                (click)="selectFilter(filter)"
                                *ngIf="!filter.isgroup"
                                [ngClass]="{'selected': filter.selected, 'mat-accent': filter.selected}">
                        {{filter.explanation}}
                        <mat-icon matChipRemove>cancel</mat-icon>
                    </mat-chip>
                    <div *ngIf="filter.isgroup" fxLayout="row">
                        <div *ngTemplateOutlet="group; context: { filter: this.filter, idx: this.idx}" fxLayout="row">
                        </div>
                    </div>
                </div>
            </ng-container>
        </mat-chip-list>
    </div>
</div>
<input style="visibilty: hidden; height: 0px; width: 0px;" type="file" id="fileSet" #fileSet (change)="uploadSet()" />
<input style="visibilty: hidden; height: 0px; width: 0px;" type="file" id="openFiltersFile" #openFiltersFile (change)="openFilters()" />
<ng-template #group let-filter="filter" let-idx="idx">
    <span class="group-start">(</span>
    <ng-container *ngFor="let filter2 of filter.fields; let idx2 = index">
        <button mat-button *ngIf="idx2 > 0" [matMenuTriggerFor]="menu2"
                class="bitwise">
            {{filter2.bitwise}}
        </button>
        <mat-menu #menu2="matMenu">
            <button mat-menu-item (click)="changeBitwise(filter2, '&&')">&&</button>
            <button mat-menu-item (click)="changeBitwise(filter2, '||')">||</button>
        </mat-menu>
        <div>
            <mat-chip color="{{filter.color}}" selected="true"
                id="filter-{{idx}}-{{idx2}}"
                [removable]="true" (removed)="removeFilter(filter2)"
                [matTooltip]="filter2.value"
                [matTooltipDisabled]="filter.operation!=='in'"
                matTooltipShowDelay="1500"
                (click)="selectFilter(filter2)"
                [ngClass]="{'selected': filter2.selected, 'mat-accent': filter2.selected}"
                *ngIf="!filter2.isgroup"
            >{{filter2.explanation}}
                <mat-icon matChipRemove>cancel</mat-icon>
            </mat-chip>
            <div *ngIf="filter2.isgroup" fxLayout="row">
                <div *ngTemplateOutlet="group; context: { filter: this.filter2, idx: this.idx2}">
                </div>
            </div>
        </div>
    </ng-container>
    <span class="group-end">)</span>
</ng-template>
`,
                styles: [
                    `
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
    `
                ]
            },] },
];
/** @nocollapse */
TWAFilterEditorComponent.ctorParameters = () => [];
TWAFilterEditorComponent.propDecorators = {
    options: [{ type: Input }],
    config: [{ type: Input }],
    change: [{ type: Output }],
    fileSet: [{ type: ViewChild, args: ['fileSet',] }],
    openFiltersFile: [{ type: ViewChild, args: ['oepnFiltersFile',] }],
    handleKeyboardEvent: [{ type: HostListener, args: ['document:keydown', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            },] },
];

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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdhLW1kMi1maWx0ZXItZWRpdG9yLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly90d2EtbWQyLWZpbHRlci1lZGl0b3IvbGliL3R3YS1tZDItZmlsdGVyLWVkaXRvci5zZXJ2aWNlLnRzIiwibmc6Ly90d2EtbWQyLWZpbHRlci1lZGl0b3IvbGliL3R3YS1tZDItZmlsdGVyLWVkaXRvci5jb21wb25lbnQudHMiLCJuZzovL3R3YS1tZDItZmlsdGVyLWVkaXRvci9saWIvdHdhLW1kMi1maWx0ZXItZWRpdG9yLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFRXQUZpbHRlckVkaXRvckNvbXBvbmVudCB9IGZyb20gJy4vdHdhLW1kMi1maWx0ZXItZWRpdG9yLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGaWVsZEZpbHRlciB9IGZyb20gJy4vdHdhLW1kMi1maWx0ZXItZWRpdG9yLmludGVyZmFjZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUV0FGaWx0ZXJFZGl0b3JTZXJ2aWNlIHtcblxuICAgIGZpbHRlcnM6IEZpZWxkRmlsdGVyW107XG5cbiAgICBmaWx0ZXJlZERhdGE6IGFueVtdO1xuICAgIGZpbHRlcjogVFdBRmlsdGVyRWRpdG9yQ29tcG9uZW50O1xuICAgIGRhdGE6IGFueVtdO1xuICAgIHByZXBhcmVEYXRhOiBGdW5jdGlvbjtcbiAgICBwcm9jZXNzZWRGaWx0ZXJzOiBhbnlbXTtcblxuICAgIGluaXQoXG4gICAgICAgIGZpbHRlcjogVFdBRmlsdGVyRWRpdG9yQ29tcG9uZW50LFxuICAgICAgICBkYXRhOiBhbnlbXSxcbiAgICAgICAgcHJlcGFyZURhdGE/OiBGdW5jdGlvblxuICAgICkge1xuICAgICAgICB0aGlzLmZpbHRlciA9IGZpbHRlcjtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICAgICAgdGhpcy5wcmVwYXJlRGF0YSA9IHByZXBhcmVEYXRhO1xuXG4gICAgICAgIHRoaXMuZmlsdGVyLmNoYW5nZS5zdWJzY3JpYmUoKGZpbHRlcnM6IEZpZWxkRmlsdGVyW10pID0+IHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVycyA9IGZpbHRlcnM7XG4gICAgICAgICAgICB0aGlzLmFwcGx5RmlsdGVyKCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnByb2Nlc3NlZEZpbHRlcnMgPSB0aGlzLnByb2Nlc3NGaWx0ZXJPcnModGhpcy5maWx0ZXIuYWN0aXZlRmlsdGVycyk7XG4gICAgfVxuXG4gICAgYXBwbHlGaWx0ZXIoZGF0YSA9IHRoaXMuZGF0YS5zbGljZSgpKSB7XG5cbiAgICAgICAgLy8gbGV0IGRhdGEgPSB0aGlzLmRhdGEuc2xpY2UoKTtcbiAgICAgICAgbGV0IHJldCA9IHRydWU7XG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IGRhdGEubGVuZ3RoO1xuXG4gICAgICAgIGlmICghdGhpcy5maWx0ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wcm9jZXNzZWRGaWx0ZXJzID0gdGhpcy5wcm9jZXNzRmlsdGVyT3JzKHRoaXMuZmlsdGVyLmFjdGl2ZUZpbHRlcnMpO1xuXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG5cbiAgICAgICAgZGF0YSA9IGRhdGEubWFwKChpdGVtLCBpZHgpID0+IHtcbiAgICAgICAgICAgIGl0ZW0ucmVhbEluZGV4ID0gaWR4O1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgIH0pLmZpbHRlcigoaXRlbTogYW55KSA9PiB7XG4gICAgICAgICAgICByZXQgPSB0aGlzLmFwcGx5RmlsdGVyVG9Sb3coaXRlbSk7XG4gICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGF0YTtcblxuICAgIH1cblxuICAgIGFwcGx5RmlsdGVyVG9Sb3coaXRlbSkge1xuXG4gICAgICAgIGxldCByZXQgPSB0cnVlO1xuICAgICAgICBjb25zdCByZXN1bHRzID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSB0aGlzLnByb2Nlc3NlZEZpbHRlcnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHRzMiA9IFtdO1xuICAgICAgICAgICAgdGhpcy5wcm9jZXNzZWRGaWx0ZXJzW2ldLmZvckVhY2goKHY6IEZpZWxkRmlsdGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzdWx0czIucHVzaCh0aGlzLmZpbHRlckRhdGEodiwgaXRlbSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXN1bHRzLnB1c2gocmVzdWx0czIucmVkdWNlKChhY2MsIHYpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXYpIHtcbiAgICAgICAgICAgICAgICAgICAgYWNjID0gdjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgICAgIH0sIHRydWUpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZXN1bHRzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0ID0gcmVzdWx0cy5yZWR1Y2UoKGFjYywgdikgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh2KSB7XG4gICAgICAgICAgICAgICAgICAgIGFjYyA9IHY7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJldDtcblxuICAgIH1cblxuICAgIHByb2Nlc3NGaWx0ZXJPcnMgPSAoZmlsdGVycykgPT4ge1xuICAgICAgICBsZXQgYWN0dWFsRmlsdGVyID0gMDtcbiAgICAgICAgY29uc3QgbmV3RmlsdGVycyA9IFtdO1xuICAgICAgICBmaWx0ZXJzLmZvckVhY2goKHYsIGkpID0+IHtcbiAgICAgICAgICAgIGlmIChpID4gMCAmJiB2LmJpdHdpc2UgPT09ICd8fCcpIHtcbiAgICAgICAgICAgICAgICBhY3R1YWxGaWx0ZXIrKztcbiAgICAgICAgICAgICAgICBuZXdGaWx0ZXJzLnB1c2goW10pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZihuZXdGaWx0ZXJzW2FjdHVhbEZpbHRlcl0pID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIG5ld0ZpbHRlcnMucHVzaChbXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodi5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3R3JvdXAgPSB7Li4udiwgZmllbGRzOiB0aGlzLnByb2Nlc3NGaWx0ZXJPcnModi5maWVsZHMpfTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhuZXdHcm91cCk7XG4gICAgICAgICAgICAgICAgbmV3RmlsdGVyc1thY3R1YWxGaWx0ZXJdLnB1c2gobmV3R3JvdXApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXdGaWx0ZXJzW2FjdHVhbEZpbHRlcl0ucHVzaCh2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIG5ld0ZpbHRlcnM7XG4gICAgfVxuXG4gICAgZmlsdGVyRGF0YSA9IChmaWx0ZXI6IGFueSwgZmlsdGVyVmFsdWU6IGFueSkgPT4ge1xuXG4gICAgICAgIGNvbnN0IGNvbXBhcmF0b3JzID0ge1xuICAgICAgICAgICAgJz0+JzogKGE6IHN0cmluZywgYjogc3RyaW5nKSA9PiBhLmluY2x1ZGVzKGIpLFxuICAgICAgICAgICAgJz09PSc6IChhOiBhbnksIGI6IGFueSkgPT4gYSA9PT0gYixcbiAgICAgICAgICAgICc+PSc6IChhOiBhbnksIGI6IGFueSkgPT4gYSA+PSBiLFxuICAgICAgICAgICAgJz4nOiAoYTogYW55LCBiOiBhbnkpID0+IGEgPiBiLFxuICAgICAgICAgICAgJzw9JzogKGE6IGFueSwgYjogYW55KSA9PiBhIDw9IGIsXG4gICAgICAgICAgICAnPCc6IChhOiBhbnksIGI6IGFueSkgPT4gYSA8IGIsXG4gICAgICAgICAgICAnaW4nOiAoYTogYW55LCBiOiBhbnkpID0+IGIuc3BsaXQoJywnKS5pbmNsdWRlcyhhKSxcbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgcmV0VmFsdWUgPSBmYWxzZTtcblxuICAgICAgICBpZiAoZmlsdGVyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgIHJldFZhbHVlID0gdGhpcy5maWx0ZXJHcm91cChmaWx0ZXIsIGZpbHRlclZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXBhcmVEYXRhKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmVwYXJlRGF0YShmaWx0ZXIsIGZpbHRlclZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBmaWx0ZXJWYWx1ZVtmaWx0ZXIuZmllbGRdID09PSAnbnVtYmVyJyAmJiAoZmlsdGVyLm9wZXJhdGlvbiAhPT0gJz0+JyAmJiBmaWx0ZXIub3BlcmF0aW9uICE9PSAnaW4nKSkge1xuICAgICAgICAgICAgICAgICAgICByZXRWYWx1ZSA9IGNvbXBhcmF0b3JzW2ZpbHRlci5vcGVyYXRpb25dKCtmaWx0ZXJWYWx1ZVtmaWx0ZXIuZmllbGRdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICtmaWx0ZXIudmFsdWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldFZhbHVlID0gY29tcGFyYXRvcnNbZmlsdGVyLm9wZXJhdGlvbl0oU3RyaW5nKGZpbHRlclZhbHVlW2ZpbHRlci5maWVsZF0pLnRvTG93ZXJDYXNlKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU3RyaW5nKGZpbHRlci52YWx1ZSkudG9Mb3dlckNhc2UoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICAgICAgcmV0VmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXRWYWx1ZTtcblxuICAgIH1cblxuICAgIGZpbHRlckdyb3VwID0gKGZpbHRlcjogYW55LCBmaWx0ZXJWYWx1ZTogYW55KSA9PiB7XG5cbiAgICAgICAgY29uc3QgcmVzdWx0cyA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gZmlsdGVyLmZpZWxkcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdHMyID0gW107XG4gICAgICAgICAgICBmaWx0ZXIuZmllbGRzW2ldLmZvckVhY2goKHY6IGFueVtdKSA9PiB7XG4gICAgICAgICAgICAgICByZXN1bHRzMi5wdXNoKHRoaXMuZmlsdGVyRGF0YSh2LCBmaWx0ZXJWYWx1ZSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXN1bHRzLnB1c2gocmVzdWx0czIucmVkdWNlKChhY2MsIHYyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF2Mikge1xuICAgICAgICAgICAgICAgICAgICBhY2MgPSB2MjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgICAgIH0sIHRydWUpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHRzLnJlZHVjZSgoYWNjLCB2KSA9PiB7XG4gICAgICAgICAgICBpZiAodikge1xuICAgICAgICAgICAgICAgIGFjYyA9IHY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICB9LCBmYWxzZSk7XG5cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBGaWx0ZXJFZGl0b3JPcHRpb25zLCBGaWVsZEZpbHRlciwgRmlsdGVyRWRpdG9yQ29uZmlnIH0gZnJvbSAnLi90d2EtbWQyLWZpbHRlci1lZGl0b3IuaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndHdhLW1kMi1maWx0ZXItZWRpdG9yJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGZ4TGF5b3V0PVwiY29sdW1uXCIgc3R5bGU9XCJ3aWR0aDogMTAwJTtcIj5cbiAgICA8ZGl2IGNsYXNzPVwic2VsZWN0b3JcIiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0R2FwPVwiMTBweFwiPlxuICAgICAgICA8bWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICA8bWF0LXNlbGVjdCBbKG5nTW9kZWwpXT1cInNlbGVjdGVkRmllbGRcIj5cbiAgICAgICAgICAgICAgICA8bWF0LW9wdGlvbiBzZWxlY3RlZCB2YWx1ZT1cIm5vbmVcIj57e3RleHRzLmZpbHRlckJ5fX08L21hdC1vcHRpb24+XG4gICAgICAgICAgICAgICAgPG1hdC1vcHRpb24gKm5nRm9yPVwibGV0IGZpZWxkIG9mIGZpbHRlck9wdGlvbnMuZmllbGRzXCIgWyh2YWx1ZSldPVwiZmllbGQubmFtZVwiPnt7ZmllbGQubGFiZWx9fTwvbWF0LW9wdGlvbj5cbiAgICAgICAgICAgIDwvbWF0LXNlbGVjdD5cbiAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgPG1hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgPG1hdC1zZWxlY3QgWyhuZ01vZGVsKV09XCJvcGVyYXRpb25cIj5cbiAgICAgICAgICAgICAgICA8bWF0LW9wdGlvbiAqbmdGb3I9XCJsZXQgb3Agb2Ygb3BlcmF0aW9uc0RhdGFcIiB2YWx1ZT1cInt7b3AudHlwZX19XCI+e3tvcC5sYWJlbH19PC9tYXQtb3B0aW9uPlxuICAgICAgICAgICAgPC9tYXQtc2VsZWN0PlxuICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICA8bWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgcGxhY2Vob2xkZXI9XCJ7e3RleHRzLmZpbHRlcn19XCIgWyhuZ01vZGVsKV09XCJzZWxlY3RlZFZhbHVlXCJcbiAgICAgICAgICAgICAgICAgICAgKGZvY3VzKT1cIm9uRm9jdXMoJGV2ZW50KVwiIChibHVyKT1cIm9uQmx1cigkZXZlbnQpXCIgLz5cbiAgICAgICAgICAgIDxidXR0b24gbWF0LWJ1dHRvbiAqbmdJZj1cIm9wZXJhdGlvbj09PSdpbidcIiBtYXRTdWZmaXggbWF0LWljb24tYnV0dG9uIGFyaWEtbGFiZWw9XCJDbGVhclwiIChjbGljayk9XCJmaWxlU2V0LmNsaWNrKClcIj5cbiAgICAgICAgICAgICAgICA8bWF0LWljb24+YXR0YWNoX2ZpbGU8L21hdC1pY29uPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8YnV0dG9uIG1hdC1idXR0b24gbWF0LWljb24tYnV0dG9uIChjbGljayk9XCJhZGRGaWx0ZXIoKVwiIFtkaXNhYmxlZF09XCJjaGVja0ZpbHRlcigpXCI+XG4gICAgICAgICAgICAgICAgPG1hdC1pY29uPnNlbmQ8L21hdC1pY29uPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGZ4RmxleD48L2Rpdj5cbiAgICAgICAgPGJ1dHRvbiBtYXQtYnV0dG9uIG1hdC1pY29uLWJ1dHRvblxuICAgICAgICAgICAgICAgICpuZ0lmPVwiYWN0aXZlRmlsdGVycy5sZW5ndGggPT09IDBcIlxuICAgICAgICAgICAgICAgIG1hdFRvb2x0aXA9XCJ7e3RleHRzLm9wZW5GaWx0ZXJ9fVwiXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9wZW5GaWx0ZXJzRmlsZS5jbGljaygpXCI+XG4gICAgICAgICAgICA8bWF0LWljb24+Zm9sZGVyX29wZW48L21hdC1pY29uPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRvb2xzXCIgKm5nSWY9XCJhY3RpdmVGaWx0ZXJzLmxlbmd0aCA+IDBcIiBmeExheW91dD1cInJvd1wiPlxuICAgICAgICAgICAgPGJ1dHRvbiBtYXQtYnV0dG9uIG1hdC1pY29uLWJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBtYXRUb29sdGlwPVwie3t0ZXh0cy5ncm91cH19XCJcbiAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cImNyZWF0ZUdyb3VwKClcIlxuICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZ2V0U2VsZWN0ZWQoKSA8IDJcIj5cbiAgICAgICAgICAgICAgICA8bWF0LWljb24+bGluazwvbWF0LWljb24+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gbWF0LWJ1dHRvbiBtYXQtaWNvbi1idXR0b25cbiAgICAgICAgICAgICAgICAgICAgbWF0VG9vbHRpcD1cInt7dGV4dHMudW5ncm91cH19XCJcbiAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cInJlbW92ZUZyb21Hcm91cCgpXCJcbiAgICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cIiFncm91cFNlbGVjdGVkKClcIj5cbiAgICAgICAgICAgICAgICA8bWF0LWljb24+bGlua19vZmY8L21hdC1pY29uPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIG1hdC1idXR0b24gbWF0LWljb24tYnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIG1hdFRvb2x0aXA9XCJ7e3RleHRzLm1vdmVMZWZ0fX1cIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwibW92ZVRvKC0xKVwiXG4gICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJnZXRTZWxlY3RlZCgpICE9PSAxICYmICFlbnRpcmVHcm91cFNlbGVjdGVkKClcIj5cbiAgICAgICAgICAgICAgICA8bWF0LWljb24+YXJyb3dfYmFjazwvbWF0LWljb24+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gbWF0LWJ1dHRvbiBtYXQtaWNvbi1idXR0b25cbiAgICAgICAgICAgICAgICAgICAgbWF0VG9vbHRpcD1cInt7dGV4dHMubW92ZVJpZ2h0fX1cIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwibW92ZVRvKDEpXCJcbiAgICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImdldFNlbGVjdGVkKCkgIT09IDEgJiYgIWVudGlyZUdyb3VwU2VsZWN0ZWQoKVwiPlxuICAgICAgICAgICAgICAgIDxtYXQtaWNvbj5hcnJvd19mb3J3YXJkPC9tYXQtaWNvbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBtYXQtYnV0dG9uIG1hdC1pY29uLWJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBtYXRUb29sdGlwPVwie3t0ZXh0cy5vcGVuRmlsdGVyfX1cIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwib3BlbkZpbHRlcnNGaWxlLmNsaWNrKClcIj5cbiAgICAgICAgICAgICAgICA8bWF0LWljb24+Zm9sZGVyX29wZW48L21hdC1pY29uPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIG1hdC1idXR0b24gbWF0LWljb24tYnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIG1hdFRvb2x0aXA9XCJ7e3RleHRzLnNhdmVGaWx0ZXJ9fVwiXG4gICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJnZXRTZWxlY3RlZCgpID4gMVwiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJzYXZlRmlsdGVycygpXCI+XG4gICAgICAgICAgICAgICAgPG1hdC1pY29uPnNhdmU8L21hdC1pY29uPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIG1hdC1idXR0b24gbWF0LWljb24tYnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIG1hdFRvb2x0aXA9XCJ7e3RleHRzLmNsZWFyU2VsZWN0aW9ufX1cIlxuICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZ2V0U2VsZWN0ZWQoKSA8IDFcIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwiY2xlYXJTZWxlY3Rpb24oKVwiPlxuICAgICAgICAgICAgICAgIDxtYXQtaWNvbj5jbGVhcjwvbWF0LWljb24+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gbWF0LWJ1dHRvbiBtYXQtaWNvbi1idXR0b25cbiAgICAgICAgICAgICAgICAgICAgbWF0VG9vbHRpcD1cInt7dGV4dHMuY2xlYXJBbGx9fVwiXG4gICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJhY3RpdmVGaWx0ZXJzLmxlbmd0aCA8IDFcIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwiY2xlYXJGaWx0ZXJzKClcIj5cbiAgICAgICAgICAgICAgICA8bWF0LWljb24+Y2xlYXJfYWxsPC9tYXQtaWNvbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZmlsdGVyXCIgZnhMYXlvdXRHYXA9XCIxMlwiPlxuICAgICAgICA8bWF0LWNoaXAtbGlzdCBjZGtEcm9wTGlzdFxuICAgICAgICAgICAgICAgICAgICAgICAgY2RrRHJvcExpc3RPcmllbnRhdGlvbj1cImhvcml6b250YWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKGNka0Ryb3BMaXN0RHJvcHBlZCk9XCJvbkRyb3BwZWRGaWx0ZXIoJGV2ZW50KVwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZmlsdGVyIG9mIGFjdGl2ZUZpbHRlcnM7IGxldCBpZHggPSBpbmRleFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIlxuICAgICAgICAgICAgICAgIGNka0RyYWdcbiAgICAgICAgICAgICAgICAoY2RrRHJhZ1N0YXJ0ZWQpPVwib25TdGFydERyYWdGaWx0ZXIoJGV2ZW50LCBmaWx0ZXIpXCIgW25nQ2xhc3NdPVwieydjZ3JvdXAnOiBmaWx0ZXIuaXNncm91cH1cIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBtYXQtYnV0dG9uICpuZ0lmPVwiaWR4ID4gMFwiIFttYXRNZW51VHJpZ2dlckZvcl09XCJtZW51XCIgY2xhc3M9XCJiaXR3aXNlXCI+e3tmaWx0ZXIuYml0d2lzZX19PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtbWVudSAjbWVudT1cIm1hdE1lbnVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gbWF0LW1lbnUtaXRlbSAoY2xpY2spPVwiY2hhbmdlQml0d2lzZShmaWx0ZXIsICcmJicpXCI+JiY8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gbWF0LW1lbnUtaXRlbSAoY2xpY2spPVwiY2hhbmdlQml0d2lzZShmaWx0ZXIsICd8fCcpXCI+fHw8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9tYXQtbWVudT5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1jaGlwIGNvbG9yPVwie3tmaWx0ZXIuY29sb3J9fVwiIHNlbGVjdGVkPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPVwiZmlsdGVyLXt7aWR4fX1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcmVtb3ZhYmxlXT1cInRydWVcIiAocmVtb3ZlZCk9XCJyZW1vdmVGaWx0ZXIoZmlsdGVyKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFttYXRUb29sdGlwXT1cImZpbHRlci52YWx1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFttYXRUb29sdGlwRGlzYWJsZWRdPVwiZmlsdGVyLm9wZXJhdGlvbiE9PSdpbidcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRUb29sdGlwU2hvd0RlbGF5PVwiMTUwMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJzZWxlY3RGaWx0ZXIoZmlsdGVyKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiIWZpbHRlci5pc2dyb3VwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieydzZWxlY3RlZCc6IGZpbHRlci5zZWxlY3RlZCwgJ21hdC1hY2NlbnQnOiBmaWx0ZXIuc2VsZWN0ZWR9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7e2ZpbHRlci5leHBsYW5hdGlvbn19XG4gICAgICAgICAgICAgICAgICAgICAgICA8bWF0LWljb24gbWF0Q2hpcFJlbW92ZT5jYW5jZWw8L21hdC1pY29uPlxuICAgICAgICAgICAgICAgICAgICA8L21hdC1jaGlwPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiZmlsdGVyLmlzZ3JvdXBcIiBmeExheW91dD1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiAqbmdUZW1wbGF0ZU91dGxldD1cImdyb3VwOyBjb250ZXh0OiB7IGZpbHRlcjogdGhpcy5maWx0ZXIsIGlkeDogdGhpcy5pZHh9XCIgZnhMYXlvdXQ9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L21hdC1jaGlwLWxpc3Q+XG4gICAgPC9kaXY+XG48L2Rpdj5cbjxpbnB1dCBzdHlsZT1cInZpc2liaWx0eTogaGlkZGVuOyBoZWlnaHQ6IDBweDsgd2lkdGg6IDBweDtcIiB0eXBlPVwiZmlsZVwiIGlkPVwiZmlsZVNldFwiICNmaWxlU2V0IChjaGFuZ2UpPVwidXBsb2FkU2V0KClcIiAvPlxuPGlucHV0IHN0eWxlPVwidmlzaWJpbHR5OiBoaWRkZW47IGhlaWdodDogMHB4OyB3aWR0aDogMHB4O1wiIHR5cGU9XCJmaWxlXCIgaWQ9XCJvcGVuRmlsdGVyc0ZpbGVcIiAjb3BlbkZpbHRlcnNGaWxlIChjaGFuZ2UpPVwib3BlbkZpbHRlcnMoKVwiIC8+XG48bmctdGVtcGxhdGUgI2dyb3VwIGxldC1maWx0ZXI9XCJmaWx0ZXJcIiBsZXQtaWR4PVwiaWR4XCI+XG4gICAgPHNwYW4gY2xhc3M9XCJncm91cC1zdGFydFwiPig8L3NwYW4+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZmlsdGVyMiBvZiBmaWx0ZXIuZmllbGRzOyBsZXQgaWR4MiA9IGluZGV4XCI+XG4gICAgICAgIDxidXR0b24gbWF0LWJ1dHRvbiAqbmdJZj1cImlkeDIgPiAwXCIgW21hdE1lbnVUcmlnZ2VyRm9yXT1cIm1lbnUyXCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cImJpdHdpc2VcIj5cbiAgICAgICAgICAgIHt7ZmlsdGVyMi5iaXR3aXNlfX1cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxtYXQtbWVudSAjbWVudTI9XCJtYXRNZW51XCI+XG4gICAgICAgICAgICA8YnV0dG9uIG1hdC1tZW51LWl0ZW0gKGNsaWNrKT1cImNoYW5nZUJpdHdpc2UoZmlsdGVyMiwgJyYmJylcIj4mJjwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBtYXQtbWVudS1pdGVtIChjbGljayk9XCJjaGFuZ2VCaXR3aXNlKGZpbHRlcjIsICd8fCcpXCI+fHw8L2J1dHRvbj5cbiAgICAgICAgPC9tYXQtbWVudT5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxtYXQtY2hpcCBjb2xvcj1cInt7ZmlsdGVyLmNvbG9yfX1cIiBzZWxlY3RlZD1cInRydWVcIlxuICAgICAgICAgICAgICAgIGlkPVwiZmlsdGVyLXt7aWR4fX0te3tpZHgyfX1cIlxuICAgICAgICAgICAgICAgIFtyZW1vdmFibGVdPVwidHJ1ZVwiIChyZW1vdmVkKT1cInJlbW92ZUZpbHRlcihmaWx0ZXIyKVwiXG4gICAgICAgICAgICAgICAgW21hdFRvb2x0aXBdPVwiZmlsdGVyMi52YWx1ZVwiXG4gICAgICAgICAgICAgICAgW21hdFRvb2x0aXBEaXNhYmxlZF09XCJmaWx0ZXIub3BlcmF0aW9uIT09J2luJ1wiXG4gICAgICAgICAgICAgICAgbWF0VG9vbHRpcFNob3dEZWxheT1cIjE1MDBcIlxuICAgICAgICAgICAgICAgIChjbGljayk9XCJzZWxlY3RGaWx0ZXIoZmlsdGVyMilcIlxuICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsnc2VsZWN0ZWQnOiBmaWx0ZXIyLnNlbGVjdGVkLCAnbWF0LWFjY2VudCc6IGZpbHRlcjIuc2VsZWN0ZWR9XCJcbiAgICAgICAgICAgICAgICAqbmdJZj1cIiFmaWx0ZXIyLmlzZ3JvdXBcIlxuICAgICAgICAgICAgPnt7ZmlsdGVyMi5leHBsYW5hdGlvbn19XG4gICAgICAgICAgICAgICAgPG1hdC1pY29uIG1hdENoaXBSZW1vdmU+Y2FuY2VsPC9tYXQtaWNvbj5cbiAgICAgICAgICAgIDwvbWF0LWNoaXA+XG4gICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiZmlsdGVyMi5pc2dyb3VwXCIgZnhMYXlvdXQ9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ1RlbXBsYXRlT3V0bGV0PVwiZ3JvdXA7IGNvbnRleHQ6IHsgZmlsdGVyOiB0aGlzLmZpbHRlcjIsIGlkeDogdGhpcy5pZHgyfVwiPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvbmctY29udGFpbmVyPlxuICAgIDxzcGFuIGNsYXNzPVwiZ3JvdXAtZW5kXCI+KTwvc3Bhbj5cbjwvbmctdGVtcGxhdGU+XG5gLFxuICBzdHlsZXM6IFtcbiAgICBgXG4gICAgLmVycm9yIHsgY29sb3I6IHJlZDsgfVxuICAgIC5zZWxlY3RvciB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgIH1cbiAgICAuZmlsdGVyIHtcbiAgICAgICAgcGFkZGluZy1ib3R0b206IDEycHg7XG4gICAgfVxuICAgIC5maWx0ZXIgbWF0LWNoaXAge1xuICAgICAgICBtYXJnaW46IDRweDtcbiAgICB9XG4gICAgLmNncm91cCB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgfVxuICAgIG1hdC1jaGlwLnNlbGVjdGVkIHtcbiAgICAgICAgY29sb3I6ICNmZmY7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIH1cbiAgICBzcGFuLmdyb3VwLXN0YXJ0LFxuICAgIHNwYW4uZ3JvdXAtZW5kIHtcbiAgICAgICAgZm9udC1zaXplOiAyNXB4O1xuICAgIH1cbiAgICBidXR0b24uYml0d2lzZSB7XG4gICAgICAgIG1pbi13aWR0aDogMjRweDtcbiAgICAgICAgcGFkZGluZy1sZWZ0OiAwO1xuICAgICAgICBwYWRkaW5nLXJpZ2h0OiAwO1xuICAgIH1cbiAgICBgXG4gIF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBUV0FGaWx0ZXJFZGl0b3JDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQElucHV0KCkgb3B0aW9uczogRmlsdGVyRWRpdG9yT3B0aW9ucztcbiAgICBASW5wdXQoKSBjb25maWc6IEZpbHRlckVkaXRvckNvbmZpZztcbiAgICBAT3V0cHV0KCkgY2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55W10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnlbXT4oKTtcblxuICAgIEBWaWV3Q2hpbGQoJ2ZpbGVTZXQnKSBmaWxlU2V0OiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoJ29lcG5GaWx0ZXJzRmlsZScpIG9wZW5GaWx0ZXJzRmlsZTogRWxlbWVudFJlZjtcblxuICAgIGZpbHRlck9wdGlvbnM6IEZpbHRlckVkaXRvck9wdGlvbnM7XG4gICAgc2VsZWN0ZWRGaWVsZCA9ICdub25lJztcbiAgICBzZWxlY3RlZFZhbHVlID0gJyc7XG4gICAgb3BlcmF0aW9uID0gJ2NvbnRhaW4nO1xuICAgIGFjdGl2ZUZpbHRlcnM6IEZpZWxkRmlsdGVyW10gPSBbXTtcbiAgICBlZGl0aW5nID0gZmFsc2U7XG4gICAgdGV4dHMgPSB7XG4gICAgICAgIGZpbHRlckJ5OiAnRmlsdGVyIGJ5Li4uJyxcbiAgICAgICAgZmlsdGVyOiAnZmlsdGVyJyxcbiAgICAgICAgZ3JvdXA6ICdHcm91cCcsXG4gICAgICAgIHVuZ3JvdXA6ICdVbmdyb3VwJyxcbiAgICAgICAgbW92ZUxlZnQ6ICdNb3ZlIHRvIGxlZnQnLFxuICAgICAgICBtb3ZlUmlnaHQ6ICdNb3ZlIHRvIHJpZ2h0JyxcbiAgICAgICAgb3BlbkZpbHRlcjogJ09wZW4gc2F2ZWQgZmlsdGVyJyxcbiAgICAgICAgc2F2ZUZpbHRlcjogJ1NhdmUgZmlsdGVyJyxcbiAgICAgICAgY2xlYXJTZWxlY3Rpb246ICdDbGVhciBzZWxlY3Rpb24nLFxuICAgICAgICBjbGVhckFsbDogJ0NsZWFyIGZpbHRlcnMnLFxuXG4gICAgfTtcbiAgICBvcGVyYXRpb25zOiBhbnkgPSB7XG4gICAgICAgIGNvbnRhaW46ICc9PicsXG4gICAgICAgIGVxdWFsOiAnPT09JyxcbiAgICAgICAgZ3JlYXRlckVxdWFsOiAnPj0nLFxuICAgICAgICBncmVhdGVyOiAnPicsXG4gICAgICAgIGxlc3NFcXVhbDogJzw9JyxcbiAgICAgICAgbGVzczogJzwnLFxuICAgICAgICBpbjogJ2luJyxcbiAgICB9O1xuICAgIG9wZXJhdGlvbnNEYXRhID0gW1xuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnY29udGFpbicsXG4gICAgICAgICAgICBsYWJlbDogJ2NvbnRhaW5zJyxcbiAgICAgICAgICAgIG9wZXJhdG9yOiAnPT4nXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdlcXVhbCcsXG4gICAgICAgICAgICBsYWJlbDogJ2VxdWFscycsXG4gICAgICAgICAgICBvcGVyYXRvcjogJz09PSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2dyZWF0ZXJFcXVhbCcsXG4gICAgICAgICAgICBsYWJlbDogJ2dyZWF0ZXIgb3IgZXF1YWwnLFxuICAgICAgICAgICAgb3BlcmF0b3I6ICc+PSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2dyZWF0ZXInLFxuICAgICAgICAgICAgbGFiZWw6ICdncmVhdGVyJyxcbiAgICAgICAgICAgIG9wZXJhdG9yOiAnPidcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2xlc3NFcXVhbCcsXG4gICAgICAgICAgICBsYWJlbDogJ2xlc3Mgb3IgZXF1YWwnLFxuICAgICAgICAgICAgb3BlcmF0b3I6ICc8PSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2xlc3MnLFxuICAgICAgICAgICAgbGFiZWw6ICdsZXNzJyxcbiAgICAgICAgICAgIG9wZXJhdG9yOiAnPCdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2luJyxcbiAgICAgICAgICAgIGxhYmVsOiAnaW4nLFxuICAgICAgICAgICAgb3BlcmF0b3I6ICdpbidcbiAgICAgICAgfSxcbiAgICBdO1xuXG4gICAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6a2V5ZG93bicsIFsnJGV2ZW50J10pXG4gICAgaGFuZGxlS2V5Ym9hcmRFdmVudChldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAoKGV2ZW50LmtleSA9PT0gJ2MnICYmIGV2ZW50LmN0cmxLZXkpKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyRmlsdGVycygpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZWRpdGluZyAmJiBldmVudC5rZXlDb2RlID09PSAxMykge1xuICAgICAgICAgICAgdGhpcy5hZGRGaWx0ZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKCkge31cblxuICAgIG9wZW5GaWx0ZXJzKCkge1xuICAgICAgICBjb25zdCBmaWxlT2JqID0gKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvcGVuRmlsdGVyc0ZpbGUnKSkuZmlsZXNbMF07XG4gICAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgIHJlYWRlci5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZWFkZXIucmVzdWx0KTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKDxzdHJpbmc+cmVhZGVyLnJlc3VsdCk7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUZpbHRlcnMgPSBkYXRhO1xuICAgICAgICB9O1xuICAgICAgICByZWFkZXIucmVhZEFzVGV4dChmaWxlT2JqKTtcbiAgICB9XG5cbiAgICBzYXZlRmlsdGVycygpIHtcbiAgICAgICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtKU09OLnN0cmluZ2lmeSh0aGlzLmFjdGl2ZUZpbHRlcnMpXSwgeyB0eXBlOiAndGV4dC9qc29uJyB9KTtcbiAgICAgICAgY29uc3QgZmlsZW5hbWUgPSAnZmlsdGVycy5qc29uJztcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgICAgZWxlbWVudC5ocmVmID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gICAgICAgIGVsZW1lbnQuZG93bmxvYWQgPSBmaWxlbmFtZTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICAgICAgZWxlbWVudC5jbGljaygpO1xuICAgIH1cblxuICAgIGNoZWNrRmlsdGVyKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKHRoaXMuc2VsZWN0ZWRGaWVsZCA9PT0gJ25vbmUnIHx8IHRoaXMuc2VsZWN0ZWRWYWx1ZSA9PT0gJycpO1xuICAgIH1cblxuICAgIGFkZEZpbHRlcigpIHtcbiAgICAgICAgbGV0IGNvbG9yID0gJycsXG4gICAgICAgICAgICBmaWVsZCA9ICcnLFxuICAgICAgICAgICAgZGJmaWVsZCA9ICcnLFxuICAgICAgICAgICAgbGFiZWwgPSAnJyxcbiAgICAgICAgICAgIG5hbWUgPSAnJyxcbiAgICAgICAgICAgIGV4cGxhbmF0aW9uID0gdGhpcy5zZWxlY3RlZEZpZWxkICsgJyAnICsgdGhpcy5vcGVyYXRpb25zW3RoaXMub3BlcmF0aW9uXSArICcgJyArIHRoaXMuc2VsZWN0ZWRWYWx1ZTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IHRoaXMuZmlsdGVyT3B0aW9ucy5maWVsZHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5maWx0ZXJPcHRpb25zLmZpZWxkc1tpXS5uYW1lID09PSB0aGlzLnNlbGVjdGVkRmllbGQpIHtcbiAgICAgICAgICAgICAgICAvLyBjb2xvciA9IHRoaXMuZmlsdGVyT3B0aW9ucy5maWVsZHNbaV0uY29sb3I7XG4gICAgICAgICAgICAgICAgLy8gZmllbGQgPSB0aGlzLmZpbHRlck9wdGlvbnMuZmllbGRzW2ldLmZpZWxkO1xuICAgICAgICAgICAgICAgIC8vIGxhYmVsID0gdGhpcy5maWx0ZXJPcHRpb25zLmZpZWxkc1tpXS5sYWJlbDtcbiAgICAgICAgICAgICAgICAvLyBuYW1lID0gdGhpcy5maWx0ZXJPcHRpb25zLmZpZWxkc1tpXS5uYW1lO1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIC4uLndpdGggb2JqZWN0IGRlc3RydWN0dXJpbmdcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAoeyBjb2xvciwgZmllbGQsIGRiZmllbGQsIGxhYmVsLCBuYW1lIH0gPSB0aGlzLmZpbHRlck9wdGlvbnMuZmllbGRzW2ldKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcGVyYXRpb24gPT09ICdpbicpIHtcbiAgICAgICAgICAgIGV4cGxhbmF0aW9uID0gdGhpcy5zZWxlY3RlZEZpZWxkICsgJyAnICsgdGhpcy5vcGVyYXRpb25zW3RoaXMub3BlcmF0aW9uXSArICcgKC4uLiknO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMub3BlcmF0aW9uID09PSAnY29udGFpbicpIHtcbiAgICAgICAgICAgIC8vIGV4cGxhbmF0aW9uID0gdGhpcy5zZWxlY3RlZEZpZWxkICsgJyAnICsgdGhpcy5vcGVyYXRpb25zW3RoaXMub3BlcmF0aW9uXSArICcgJyArIHRoaXMuc2VsZWN0ZWRWYWx1ZTtcbiAgICAgICAgICAgIGV4cGxhbmF0aW9uID0gJ1wiJyArIHRoaXMuc2VsZWN0ZWRWYWx1ZSArICdcIiAnICsgdGhpcy5vcGVyYXRpb25zW3RoaXMub3BlcmF0aW9uXSArICcgJyArIHRoaXMuc2VsZWN0ZWRGaWVsZDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFjdGl2ZUZpbHRlcnMucHVzaCh7XG4gICAgICAgICAgICBjb2xvcjogY29sb3IsXG4gICAgICAgICAgICBleHBsYW5hdGlvbjogZXhwbGFuYXRpb24sXG4gICAgICAgICAgICBsYWJlbDogbGFiZWwsXG4gICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgZmllbGQ6IGZpZWxkLFxuICAgICAgICAgICAgZGJmaWVsZDogZGJmaWVsZCxcbiAgICAgICAgICAgIGJpdHdpc2U6ICcmJicsXG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMub3BlcmF0aW9uc1t0aGlzLm9wZXJhdGlvbl0sXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5zZWxlY3RlZFZhbHVlXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNlbGVjdGVkVmFsdWUgPSAnJztcbiAgICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh0aGlzLmFjdGl2ZUZpbHRlcnMpO1xuICAgIH1cblxuICAgIHNlbGVjdEZpbHRlcihmaWx0ZXI6IEZpZWxkRmlsdGVyKSB7XG4gICAgICAgIGZpbHRlci5zZWxlY3RlZCA9ICFmaWx0ZXIuc2VsZWN0ZWQ7XG4gICAgICAgIGNvbnN0IGdyb3VwID0gdGhpcy5nZXRQYXJlbnRGaWx0ZXIoZmlsdGVyKTtcbiAgICAgICAgaWYgKGdyb3VwKSB7XG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRBbGwgPSB0cnVlO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBncm91cC5maWVsZHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdG1wZmlsdGVyID0gZ3JvdXAuZmllbGRzW2ldO1xuICAgICAgICAgICAgICAgIGlmICghdG1wZmlsdGVyLmlzZ3JvdXAgJiYgIXRtcGZpbHRlci5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEFsbCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzZWxlY3RlZEFsbCkge1xuICAgICAgICAgICAgICAgIGdyb3VwLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFBhcmVudEZpbHRlcihmaWx0ZXI6IEZpZWxkRmlsdGVyKTogRmllbGRGaWx0ZXIgfCBudWxsIHtcbiAgICAgICAgY29uc3QgZ2V0UGFyZW50RmlsdGVySW5Hcm91cCA9IChncm91cDogRmllbGRGaWx0ZXIsIGZpbHRlcjI6IEZpZWxkRmlsdGVyKTogRmllbGRGaWx0ZXIgfCBudWxsID0+IHtcbiAgICAgICAgICAgIHJldCA9IG51bGw7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gZ3JvdXAuZmllbGRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRtcGZpbHRlciA9IGdyb3VwLmZpZWxkc1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoSlNPTi5zdHJpbmdpZnkodG1wZmlsdGVyKSA9PT0gSlNPTi5zdHJpbmdpZnkoZmlsdGVyMikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdyb3VwO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodG1wZmlsdGVyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0ID0gZ2V0UGFyZW50RmlsdGVySW5Hcm91cCh0bXBmaWx0ZXIsIGZpbHRlcjIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IHJldCA9IG51bGw7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gdGhpcy5hY3RpdmVGaWx0ZXJzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgdG1wZmlsdGVyID0gdGhpcy5hY3RpdmVGaWx0ZXJzW2ldO1xuICAgICAgICAgICAgaWYgKEpTT04uc3RyaW5naWZ5KHRtcGZpbHRlcikgPT09IEpTT04uc3RyaW5naWZ5KGZpbHRlcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodG1wZmlsdGVyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICByZXQgPSBnZXRQYXJlbnRGaWx0ZXJJbkdyb3VwKHRtcGZpbHRlciwgZmlsdGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuXG4gICAgYXJyYXlNb3ZlID0gKGFycjogYW55W10sIG9sZEluZGV4OiBudW1iZXIsIG5ld0luZGV4OiBudW1iZXIpOiBhbnlbXSA9PiB7XG4gICAgICAgIGlmIChuZXdJbmRleCA+IGFyci5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCBrID0gbmV3SW5kZXggLSBhcnIubGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKGstLSkge1xuICAgICAgICAgICAgICAgIGFyci5wdXNoKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYXJyLnNwbGljZShuZXdJbmRleCwgMCwgYXJyLnNwbGljZShvbGRJbmRleCwgMSlbMF0pO1xuICAgICAgICByZXR1cm4gYXJyO1xuICAgIH1cblxuICAgIG1vdmVUbyhkaXJlY3Rpb246IG51bWJlcikge1xuICAgICAgICBsZXQgaWR4ID0gLTEsXG4gICAgICAgICAgICB0b0lkeCA9IC0xLFxuICAgICAgICAgICAgZ3JvdXAgPSAtMTtcbiAgICAgICAgLy8gU2VhcmNoaW5nIHRoZSBzZWxlY3RlZCBmaWx0ZXIuLi5cbiAgICAgICAgdGhpcy5hY3RpdmVGaWx0ZXJzLmZvckVhY2goKGZpbHRlciwgdG1waWR4KSA9PiB7XG4gICAgICAgICAgICBpZiAoZmlsdGVyLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgaWR4ID0gdG1waWR4O1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZmlsdGVyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICBmaWx0ZXIuZmllbGRzLmZvckVhY2goKGZpbHRlcjIsIHRtcGlkeDIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlcjIuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkeCA9IHRtcGlkeDI7XG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cCA9IHRtcGlkeDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoaWR4ID49IDApIHtcblxuICAgICAgICAgICAgaWYgKGdyb3VwID49IDApIHtcbiAgICAgICAgICAgICAgICB0b0lkeCA9IChpZHggKyBkaXJlY3Rpb24pID49IDAgPyBpZHggKyBkaXJlY3Rpb24gOiB0aGlzLmFjdGl2ZUZpbHRlcnNbZ3JvdXBdLmZpZWxkcy5sZW5ndGggKyBkaXJlY3Rpb247XG4gICAgICAgICAgICAgICAgaWYgKHRvSWR4ID49IHRoaXMuYWN0aXZlRmlsdGVyc1tncm91cF0uZmllbGRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0b0lkeCA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlRmlsdGVyc1tncm91cF0uZmllbGRzID0gdGhpcy5hcnJheU1vdmUodGhpcy5hY3RpdmVGaWx0ZXJzW2dyb3VwXS5maWVsZHMsIGlkeCwgdG9JZHgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0b0lkeCA9IChpZHggKyBkaXJlY3Rpb24pID49IDAgPyBpZHggKyBkaXJlY3Rpb24gOiB0aGlzLmFjdGl2ZUZpbHRlcnMubGVuZ3RoICsgZGlyZWN0aW9uO1xuICAgICAgICAgICAgICAgIGlmICh0b0lkeCA+PSB0aGlzLmFjdGl2ZUZpbHRlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvSWR4ID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVGaWx0ZXJzID0gdGhpcy5hcnJheU1vdmUodGhpcy5hY3RpdmVGaWx0ZXJzLCBpZHgsIHRvSWR4KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh0aGlzLmFjdGl2ZUZpbHRlcnMpO1xuXG4gICAgfVxuXG4gICAgZ2V0U2VsZWN0ZWQoKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgZ2V0SW5Hcm91cCA9IChncm91cDogRmllbGRGaWx0ZXIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBncm91cC5maWVsZHMucmVkdWNlKChhY2MyLCBmaWx0ZXIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgYWNjMiArPSBnZXRJbkdyb3VwKGZpbHRlcik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmaWx0ZXIuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgYWNjMisrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYWNjMjtcbiAgICAgICAgICAgIH0sIDApO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5hY3RpdmVGaWx0ZXJzLnJlZHVjZSgoYWNjLCBmaWx0ZXIpID0+IHtcbiAgICAgICAgICAgIGlmIChmaWx0ZXIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgIGFjYyArPSBnZXRJbkdyb3VwKGZpbHRlcik7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGZpbHRlci5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIGFjYysrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfSwgMCk7XG5cbiAgICB9XG5cbiAgICBjbGVhclNlbGVjdGlvbigpOiB2b2lkIHtcblxuICAgICAgICBjb25zdCBjbGVhclNlbGVjdGlvbkluR3JvdXAgPSAoZ3JvdXApID0+IHtcbiAgICAgICAgICAgIGdyb3VwLmZpZWxkcy5mb3JFYWNoKChmaWx0ZXIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyID0gY2xlYXJTZWxlY3Rpb25Jbkdyb3VwKGZpbHRlcik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiBncm91cDtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmFjdGl2ZUZpbHRlcnMgPSB0aGlzLmFjdGl2ZUZpbHRlcnMubWFwKChmaWx0ZXIpID0+IHtcbiAgICAgICAgICAgIGlmIChmaWx0ZXIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgIGZpbHRlciA9IGNsZWFyU2VsZWN0aW9uSW5Hcm91cChmaWx0ZXIpO1xuICAgICAgICAgICAgICAgIC8vIGZpbHRlci5maWVsZHMgPSBmaWx0ZXIuZmllbGRzLm1hcCgoZmlsdGVyMikgPT4ge1xuICAgICAgICAgICAgICAgIC8vICAgICBmaWx0ZXIyLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgLy8gICAgIHJldHVybiBmaWx0ZXIyO1xuICAgICAgICAgICAgICAgIC8vIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmlsdGVyLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gZmlsdGVyO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIGNoYW5nZUJpdHdpc2UoZmlsdGVyOiBGaWVsZEZpbHRlciwgYml0d2lzZSkge1xuICAgICAgICBmaWx0ZXIuYml0d2lzZSA9IGJpdHdpc2U7XG4gICAgICAgIHRoaXMuY2hhbmdlLmVtaXQodGhpcy5hY3RpdmVGaWx0ZXJzKTtcbiAgICB9XG5cbiAgICBncm91cFNlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCBncm91cFNlbGVjdGVkSW5Hcm91cCA9IChmaWx0ZXI6IEZpZWxkRmlsdGVyKSA9PiB7XG4gICAgICAgICAgICBsZXQgcmV0MiA9IDA7XG4gICAgICAgICAgICBpZiAoZmlsdGVyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICBmaWx0ZXIuZmllbGRzLmZvckVhY2goKGZpbHRlcjIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlcjIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0MiArPSBncm91cFNlbGVjdGVkSW5Hcm91cChmaWx0ZXIyKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIyLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0MisrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJldDI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBncm91cHMgPSB0aGlzLmFjdGl2ZUZpbHRlcnMuZmlsdGVyKGZpbHRlciA9PiBmaWx0ZXIuaXNncm91cCk7XG4gICAgICAgIGxldCByZXQgPSAwO1xuICAgICAgICBncm91cHMuZm9yRWFjaCgoZ3JvdXApID0+IHtcbiAgICAgICAgICAgIGdyb3VwLmZpZWxkcy5mb3JFYWNoKGZpbHRlciA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlci5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldCArPSBncm91cFNlbGVjdGVkSW5Hcm91cChmaWx0ZXIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZmlsdGVyLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldCsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJldCA+IDA7XG4gICAgfVxuXG4gICAgZW50aXJlR3JvdXBTZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgZW50aXJlR3JvdXBTZWxlY3RlZEluR3JvdXAgPSAoZ3JvdXA6IEZpZWxkRmlsdGVyKSA9PiB7XG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWQyID0gdHJ1ZTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBncm91cC5maWVsZHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmlsdGVyID0gZ3JvdXAuZmllbGRzW2ldO1xuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZDIgPSBlbnRpcmVHcm91cFNlbGVjdGVkSW5Hcm91cChmaWx0ZXIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWQyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIWZpbHRlci5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZDIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0ZWQyICYmIGdyb3VwLmZpZWxkcy5sZW5ndGggPiAwO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBncm91cHMgPSB0aGlzLmFjdGl2ZUZpbHRlcnMuZmlsdGVyKGZpbHRlciA9PiBmaWx0ZXIuaXNncm91cCk7XG4gICAgICAgIGxldCBzZWxlY3RlZCA9IHRydWU7XG4gICAgICAgIGZvciAobGV0IGlnID0gMCwgbGcgPSBncm91cHMubGVuZ3RoOyBpZyA8IGxnOyBpZysrKSB7XG4gICAgICAgICAgICBjb25zdCBncm91cCA9IGdyb3Vwc1tpZ107XG4gICAgICAgICAgICBmb3IgKGxldCBpZzIgPSAwLCBsZzIgPSBncm91cC5maWVsZHMubGVuZ3RoOyBpZzIgPCBsZzI7IGlnMisrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmlsdGVyID0gZ3JvdXAuZmllbGRzW2lnMl07XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlci5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gZW50aXJlR3JvdXBTZWxlY3RlZEluR3JvdXAoZmlsdGVyKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIWZpbHRlci5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGdyb3VwLmZpZWxkcy5mb3JFYWNoKGZpbHRlciA9PiB7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGdyb3Vwcy5mb3JFYWNoKChncm91cCkgPT4ge1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHNlbGVjdGVkICYmIGdyb3Vwcy5sZW5ndGggPiAwO1xuICAgIH1cblxuICAgIGNyZWF0ZUdyb3VwKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBjcmVhdGVJbkdyb3VwID0gKGZpbHRlcjogRmllbGRGaWx0ZXIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkMiA9IGZpbHRlci5maWVsZHMuZmlsdGVyKGZpbHRlcjIgPT4gZmlsdGVyMi5zZWxlY3RlZCksXG4gICAgICAgICAgICBncm91cFBvc2l0aW9uMiA9IGZpbHRlci5maWVsZHMuZmluZEluZGV4KHYgPT4gdi5zZWxlY3RlZCk7XG4gICAgICAgICAgICBsZXQgcmVzdWx0RmlsdGVyMjogRmllbGRGaWx0ZXJbXTtcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZDIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0RmlsdGVyMiA9IGZpbHRlci5maWVsZHMuZmlsdGVyKGZpbHRlcjIgPT4gIWZpbHRlcjIuc2VsZWN0ZWQpO1xuICAgICAgICAgICAgICAgIHJlc3VsdEZpbHRlcjIuc3BsaWNlKGdyb3VwUG9zaXRpb24yLCAwLCB7XG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJycsXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgaXNncm91cDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgYml0d2lzZTogJyYmJyxcbiAgICAgICAgICAgICAgICAgICAgZmllbGRzOiBzZWxlY3RlZDJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0RmlsdGVyMiA9IGZpbHRlci5maWVsZHMubWFwKGZpbHRlcjIgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyMi5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVJbkdyb3VwKGZpbHRlcjIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmaWx0ZXIyO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmlsdGVyLmZpZWxkcyA9IHJlc3VsdEZpbHRlcjI7XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLmFjdGl2ZUZpbHRlcnMuZmlsdGVyKGZpbHRlciA9PiBmaWx0ZXIuc2VsZWN0ZWQpLFxuICAgICAgICAgICAgICBncm91cFBvc2l0aW9uID0gdGhpcy5hY3RpdmVGaWx0ZXJzLmZpbmRJbmRleCh2ID0+IHYuc2VsZWN0ZWQpO1xuICAgICAgICBsZXQgcmVzdWx0RmlsdGVyOiBGaWVsZEZpbHRlcltdO1xuICAgICAgICBpZiAoc2VsZWN0ZWQubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXN1bHRGaWx0ZXIgPSB0aGlzLmFjdGl2ZUZpbHRlcnMuZmlsdGVyKGZpbHRlciA9PiAhZmlsdGVyLnNlbGVjdGVkKTtcbiAgICAgICAgICAgIHJlc3VsdEZpbHRlci5zcGxpY2UoZ3JvdXBQb3NpdGlvbiwgMCwge1xuICAgICAgICAgICAgICAgIGNvbG9yOiAnJyxcbiAgICAgICAgICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgICAgICAgICBmaWVsZDogJycsXG4gICAgICAgICAgICAgICAgaXNncm91cDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBiaXR3aXNlOiAnJiYnLFxuICAgICAgICAgICAgICAgIGZpZWxkczogc2VsZWN0ZWRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVGaWx0ZXJzID0gcmVzdWx0RmlsdGVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0RmlsdGVyID0gdGhpcy5hY3RpdmVGaWx0ZXJzLm1hcChmaWx0ZXIgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgICAgICBjcmVhdGVJbkdyb3VwKGZpbHRlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmaWx0ZXI7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgIHRoaXMuY2hhbmdlLmVtaXQodGhpcy5hY3RpdmVGaWx0ZXJzKTtcbiAgICB9XG5cbiAgICBzYW5pdGl6ZUdyb3VwcygpIHtcbiAgICAgICAgY29uc3Qgc2FuaXRpemVHcm91cHNJbkdyb3VwID0gKGdyb3VwLCBwYXJlbnQ/OiBGaWVsZEZpbHRlcikgPT4ge1xuICAgICAgICAgICAgZ3JvdXAuZmllbGRzLm1hcCgoZmlsdGVyOiBGaWVsZEZpbHRlciwgaWR4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlci5maWVsZHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cC5maWVsZHMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZmlsdGVyLmZpZWxkcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGdyb3VwLmZpZWxkcy5wdXNoKHsuLi5maWx0ZXIuZmllbGRzWzBdfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cC5maWVsZHMuc3BsaWNlKGlkeCwgMSwgey4uLmZpbHRlci5maWVsZHNbMF19KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNhbml0aXplR3JvdXBzSW5Hcm91cChmaWx0ZXIsIGdyb3VwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFjdGl2ZUZpbHRlcnMubWFwKChmaWx0ZXI6IEZpZWxkRmlsdGVyLCBpZHg6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgaWYgKGZpbHRlci5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlci5maWVsZHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlRmlsdGVycy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZpbHRlci5maWVsZHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuYWN0aXZlRmlsdGVycy5wdXNoKHsuLi5maWx0ZXIuZmllbGRzWzBdfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlRmlsdGVycy5zcGxpY2UoaWR4LCAxLCB7Li4uZmlsdGVyLmZpZWxkc1swXX0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2FuaXRpemVHcm91cHNJbkdyb3VwKGZpbHRlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW1vdmVGcm9tR3JvdXAoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHJlbW92ZUZyb21Hcm91cEluR3JvdXAgPSAoZ3JvdXA6IEZpZWxkRmlsdGVyLCBwYXJlbnQ6IEZpZWxkRmlsdGVyLCBpZHgpID0+IHtcbiAgICAgICAgICAgIGdyb3VwLmZpZWxkcy5mb3JFYWNoKChmaWx0ZXIyLCBpZHgyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlcjIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVGcm9tR3JvdXBJbkdyb3VwKGZpbHRlcjIsIGdyb3VwLCBpZHgyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IHRtcEZpbHRlcnMgPSBncm91cC5maWVsZHMuZmlsdGVyKChmaWx0ZXIyOiBGaWVsZEZpbHRlcikgPT4gZmlsdGVyMi5zZWxlY3RlZCk7XG4gICAgICAgICAgICBncm91cC5maWVsZHMgPSBncm91cC5maWVsZHMuZmlsdGVyKChmaWx0ZXIyOiBGaWVsZEZpbHRlcikgPT4gIWZpbHRlcjIuc2VsZWN0ZWQpO1xuICAgICAgICAgICAgdG1wRmlsdGVycy5mb3JFYWNoKCh2OiBGaWVsZEZpbHRlcikgPT4ge1xuICAgICAgICAgICAgICAgIHYuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBwYXJlbnQuZmllbGRzLnB1c2godik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChncm91cC5maWVsZHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcGFyZW50LmZpZWxkcy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmFjdGl2ZUZpbHRlcnMgPSB0aGlzLmFjdGl2ZUZpbHRlcnMucmVkdWNlKChuZXdGaWx0ZXJzLCBmaWx0ZXIpID0+IHtcbiAgICAgICAgICAgIGlmIChmaWx0ZXIuaXNncm91cCkge1xuXG4gICAgICAgICAgICAgICAgZmlsdGVyLmZpZWxkcy5mb3JFYWNoKChmaWx0ZXIyLCBpZHgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlcjIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlRnJvbUdyb3VwSW5Hcm91cChmaWx0ZXIyLCBmaWx0ZXIsIGlkeCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHRtcEZpbHRlcnMgPSBmaWx0ZXIuZmllbGRzLmZpbHRlcihmaWx0ZXIyID0+IGZpbHRlcjIuc2VsZWN0ZWQpO1xuICAgICAgICAgICAgICAgIGZpbHRlci5maWVsZHMgPSBmaWx0ZXIuZmllbGRzLmZpbHRlcihmaWx0ZXIyID0+ICFmaWx0ZXIyLnNlbGVjdGVkKTtcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLmZpZWxkcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3RmlsdGVycy5wdXNoKGZpbHRlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRtcEZpbHRlcnMuZm9yRWFjaCh2ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbmV3RmlsdGVycy5wdXNoKHYpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXdGaWx0ZXJzLnB1c2goZmlsdGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXdGaWx0ZXJzO1xuICAgICAgICB9LCBbXSk7XG4gICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgdGhpcy5zYW5pdGl6ZUdyb3VwcygpO1xuICAgICAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMuYWN0aXZlRmlsdGVycyk7XG4gICAgfVxuXG4gICAgb25TdGFydERyYWdGaWx0ZXIoX2V2ZW50LCBfZmlsdGVyKSB7XG4gICAgfVxuXG4gICAgb25Ecm9wcGVkRmlsdGVyKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuYXJyYXlNb3ZlKHRoaXMuYWN0aXZlRmlsdGVycywgZXZlbnQucHJldmlvdXNJbmRleCwgZXZlbnQuY3VycmVudEluZGV4KTtcbiAgICAgICAgLy8gdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICB0aGlzLnNhbml0aXplR3JvdXBzKCk7XG4gICAgICAgIHRoaXMuY2hhbmdlLmVtaXQodGhpcy5hY3RpdmVGaWx0ZXJzKTtcbiAgICB9XG5cbiAgICB1cGxvYWRTZXQoKSB7XG4gICAgICAgIGNvbnN0IGZpbGVPYmogPSAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpbGVTZXQnKSkuZmlsZXNbMF07XG4gICAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgIHJlYWRlci5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBsaW5lcyA9ICg8c3RyaW5nPnJlYWRlci5yZXN1bHQpLnNwbGl0KC9cXHI/XFxuLykuZmlsdGVyKHZhbCA9PiB2YWwgPiAnJyk7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkVmFsdWUgPSBsaW5lcy5qb2luKCcsICcpO1xuICAgICAgICAgICAgdGhpcy5maWxlU2V0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcbiAgICAgICAgfTtcbiAgICAgICAgcmVhZGVyLnJlYWRBc1RleHQoZmlsZU9iaik7XG4gICAgfVxuXG4gICAgcmVtb3ZlRmlsdGVyKGZpbHRlcjogRmllbGRGaWx0ZXIpOiB2b2lkIHtcbiAgICAgICAgLy8gY29uc3QgcmVtb3ZlRmlsdGVySW5Hcm91cCA9IChncm91cCwgZmlsdGVyKSA9PiB7XG5cbiAgICAgICAgLy8gfTtcbiAgICAgICAgY29uc3QgcGFyZW50ID0gdGhpcy5nZXRQYXJlbnRGaWx0ZXIoZmlsdGVyKTtcbiAgICAgICAgbGV0IGdyb3VwOiBGaWVsZEZpbHRlcltdO1xuICAgICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgICAgICBncm91cCA9IHBhcmVudC5maWVsZHM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBncm91cCA9IHRoaXMuYWN0aXZlRmlsdGVycztcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGdyb3VwLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgaWYgKEpTT04uc3RyaW5naWZ5KGdyb3VwW2ldKSA9PT0gSlNPTi5zdHJpbmdpZnkoZmlsdGVyKSkge1xuICAgICAgICAgICAgICAgIGdyb3VwLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNhbml0aXplR3JvdXBzKCk7XG4gICAgICAgIHRoaXMuY2hhbmdlLmVtaXQodGhpcy5hY3RpdmVGaWx0ZXJzKTtcbiAgICB9XG5cbiAgICBjbGVhckZpbHRlcnMoKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlRmlsdGVycyA9IFtdO1xuICAgICAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMuYWN0aXZlRmlsdGVycyk7XG4gICAgfVxuXG4gICAgb25Gb2N1cyhldmVudCkge1xuICAgICAgICB0aGlzLmVkaXRpbmcgPSB0cnVlO1xuICAgIH1cblxuICAgIG9uQmx1cihldmVudCkge1xuICAgICAgICB0aGlzLmVkaXRpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5maWx0ZXJPcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgICAgICB0aGlzLnNlbGVjdGVkRmllbGQgPSAodHlwZW9mIHRoaXMuZmlsdGVyT3B0aW9ucy5maWVsZHNbMF0gIT09ICd1bmRlZmluZWQnKSA/IHRoaXMuZmlsdGVyT3B0aW9ucy5maWVsZHNbMF0ubmFtZSA6ICdub25lJztcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmNvbmZpZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jb25maWcgJiYgdHlwZW9mIHRoaXMuY29uZmlnLm9wZXJhdGlvbnNEYXRhICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHRoaXMub3BlcmF0aW9uc0RhdGEgPSB0aGlzLmNvbmZpZy5vcGVyYXRpb25zRGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZyAmJiB0eXBlb2YgdGhpcy5jb25maWcuZmlsdGVyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlRmlsdGVycyA9IHRoaXMuY29uZmlnLmZpbHRlci5zbGljZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnICYmIHR5cGVvZiB0aGlzLmNvbmZpZy50ZXh0cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRleHRzID0gey4uLnRoaXMudGV4dHMsIC4uLnRoaXMuY29uZmlnLnRleHRzfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyB0aGlzLmZpbHRlck9wdGlvbnMgPSBKU09OLnBhcnNlKHRoaXMub3B0aW9ucyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTWF0SWNvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2ljb24nO1xuaW1wb3J0IHsgTWF0U2VsZWN0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2VsZWN0JztcbmltcG9ydCB7IE1hdENoaXBzTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY2hpcHMnO1xuaW1wb3J0IHsgTWF0SW5wdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pbnB1dCc7XG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24nO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IE1hdFRvb2x0aXBNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90b29sdGlwJztcbmltcG9ydCB7IE1hdE1lbnVNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9tZW51JztcbmltcG9ydCB7IERyYWdEcm9wTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XG5cbmltcG9ydCB7IFRXQUZpbHRlckVkaXRvckNvbXBvbmVudCB9IGZyb20gJy4vdHdhLW1kMi1maWx0ZXItZWRpdG9yLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUV0FGaWx0ZXJFZGl0b3JTZXJ2aWNlIH0gZnJvbSAnLi90d2EtbWQyLWZpbHRlci1lZGl0b3Iuc2VydmljZSc7XG5pbXBvcnQgeyBGaWVsZEZpbHRlciB9IGZyb20gJy4vdHdhLW1kMi1maWx0ZXItZWRpdG9yLmludGVyZmFjZSc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgICAgICBNYXRJY29uTW9kdWxlLFxuICAgICAgICBNYXRTZWxlY3RNb2R1bGUsXG4gICAgICAgIE1hdENoaXBzTW9kdWxlLFxuICAgICAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICAgICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgICAgICBGbGV4TGF5b3V0TW9kdWxlLFxuICAgICAgICBNYXRUb29sdGlwTW9kdWxlLFxuICAgICAgICBNYXRNZW51TW9kdWxlLFxuICAgICAgICBEcmFnRHJvcE1vZHVsZSxcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBUV0FGaWx0ZXJFZGl0b3JDb21wb25lbnQsXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIFRXQUZpbHRlckVkaXRvckNvbXBvbmVudCxcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBUV0FGaWx0ZXJFZGl0b3JTZXJ2aWNlXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBUV0FGaWx0ZXJFZGl0b3JNb2R1bGUge31cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE1BTWEsc0JBQXNCO0lBRG5DO1FBc0ZJLHFCQUFnQixHQUFHLENBQUMsT0FBTzs7Z0JBQ25CLFlBQVksR0FBRyxDQUFDOztrQkFDZCxVQUFVLEdBQUcsRUFBRTtZQUNyQixPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxLQUFLLElBQUksRUFBRTtvQkFDN0IsWUFBWSxFQUFFLENBQUM7b0JBQ2YsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFF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