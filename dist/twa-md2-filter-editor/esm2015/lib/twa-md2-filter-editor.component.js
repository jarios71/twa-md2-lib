import { __decorate, __metadata } from "tslib";
import { Component, Input, Output, ElementRef, EventEmitter, ViewChild } from '@angular/core';
import { HostListener } from '@angular/core';
let TWAFilterEditorComponent = class TWAFilterEditorComponent {
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
                let k = newIndex - arr.length;
                while (k--) {
                    arr.push(undefined);
                }
            }
            arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
            return arr;
        };
    }
    handleKeyboardEvent(event) {
        // if ((event.key === 'c' && event.ctrlKey)) {
        //     this.clearFilters();
        // } else if (this.editing && event.keyCode === 13) {
        //     this.addFilter();
        // }
        if (this.editing && event.keyCode === 13) {
            this.addFilter();
        }
    }
    openFilters() {
        const fileObj = document.getElementById('openFiltersFile').files[0];
        const reader = new FileReader();
        reader.onload = () => {
            // console.log(reader.result);
            const data = JSON.parse(reader.result);
            this.activeFilters = data;
            this.change.emit(this.activeFilters);
        };
        reader.readAsText(fileObj);
    }
    saveFilters() {
        const blob = new Blob([JSON.stringify(this.activeFilters)], { type: 'text/json' });
        const filename = 'filters.json';
        const element = document.createElement('a');
        element.href = window.URL.createObjectURL(blob);
        element.download = filename;
        document.body.appendChild(element);
        element.click();
    }
    checkFilter() {
        return (this.selectedField === 'none' || this.selectedValue === '');
    }
    sendFilter() {
        this.addFilter();
    }
    addFilter() {
        // console.log('adding filter...');
        let color = '', field = '', dbfield = '', label = '', name = '', explanation = this.selectedField + ' ' + this.operations[this.operation] + ' ' + this.selectedValue;
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
    selectFilter(filter) {
        filter.selected = !filter.selected;
        const group = this.getParentFilter(filter);
        if (group) {
            let selectedAll = true;
            for (let i = 0, l = group.fields.length; i < l; i++) {
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
    getParentFilter(filter) {
        const getParentFilterInGroup = (group, filter2) => {
            ret = null;
            for (let i = 0, l = group.fields.length; i < l; i++) {
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
        let ret = null;
        for (let i = 0, l = this.activeFilters.length; i < l; i++) {
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
    moveTo(direction) {
        let idx = -1, toIdx = -1, group = -1;
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
    getSelected() {
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
    clearSelection() {
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
    changeBitwise(filter, bitwise) {
        filter.bitwise = bitwise;
        this.change.emit(this.activeFilters);
    }
    groupSelected() {
        const groupSelectedInGroup = (filter) => {
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
        const groups = this.activeFilters.filter(filter => filter.isgroup);
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
    entireGroupSelected() {
        const entireGroupSelectedInGroup = (group) => {
            let selected2 = true;
            for (let i = 0, l = group.fields.length; i < l; i++) {
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
        const groups = this.activeFilters.filter(filter => filter.isgroup);
        let selected = true;
        for (let ig = 0, lg = groups.length; ig < lg; ig++) {
            const group = groups[ig];
            for (let ig2 = 0, lg2 = group.fields.length; ig2 < lg2; ig2++) {
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
    createGroup() {
        const createInGroup = (filter) => {
            const selected2 = filter.fields.filter(filter2 => filter2.selected), groupPosition2 = filter.fields.findIndex(v => v.selected);
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
        const selected = this.activeFilters.filter(filter => filter.selected), groupPosition = this.activeFilters.findIndex(v => v.selected);
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
    sanitizeGroups() {
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
    removeFromGroup() {
        const removeFromGroupInGroup = (group, parent, idx) => {
            group.fields.forEach((filter2, idx2) => {
                if (filter2.isgroup) {
                    removeFromGroupInGroup(filter2, group, idx2);
                }
            });
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
    onStartDragFilter(_event, _filter) {
    }
    onDroppedFilter(event) {
        console.log('dropped');
        this.arrayMove(this.activeFilters, event.previousIndex, event.currentIndex);
        console.log(this.activeFilters);
        // this.clearSelection();
        this.sanitizeGroups();
        this.change.emit(this.activeFilters);
    }
    uploadSet() {
        const fileObj = document.getElementById('fileSet').files[0];
        const reader = new FileReader();
        reader.onload = () => {
            const lines = reader.result.split(/\r?\n/).filter(val => val > '');
            this.selectedValue = lines.join(', ');
            this.fileSet.nativeElement.value = '';
        };
        reader.readAsText(fileObj);
    }
    removeFilter(filter) {
        // const removeFilterInGroup = (group, filter) => {
        // };
        const parent = this.getParentFilter(filter);
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
    clearFilters() {
        this.activeFilters = [];
        this.change.emit(this.activeFilters);
    }
    onFocus(event) {
        this.editing = true;
    }
    onBlur(event) {
        this.editing = false;
    }
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
                this.texts = Object.assign(Object.assign({}, this.texts), this.config.texts);
            }
        }
        // this.filterOptions = JSON.parse(this.options);
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], TWAFilterEditorComponent.prototype, "options", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TWAFilterEditorComponent.prototype, "config", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], TWAFilterEditorComponent.prototype, "change", void 0);
__decorate([
    ViewChild('fileSet', { static: true }),
    __metadata("design:type", ElementRef)
], TWAFilterEditorComponent.prototype, "fileSet", void 0);
__decorate([
    ViewChild('oepnFiltersFile', { static: true }),
    __metadata("design:type", ElementRef)
], TWAFilterEditorComponent.prototype, "openFiltersFile", void 0);
__decorate([
    HostListener('document:keydown', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [KeyboardEvent]),
    __metadata("design:returntype", void 0)
], TWAFilterEditorComponent.prototype, "handleKeyboardEvent", null);
TWAFilterEditorComponent = __decorate([
    Component({
        selector: 'twa-md2-filter-editor',
        template: "<div fxLayout=\"column\" style=\"width: 100%;\">\n    <div class=\"selector\" fxLayout=\"row\" fxLayoutGap=\"10px\">\n        <mat-form-field>\n            <mat-select [(ngModel)]=\"selectedField\">\n                <mat-option selected value=\"none\">{{texts.filterBy}}</mat-option>\n                <mat-option *ngFor=\"let field of filterOptions.fields\" [(value)]=\"field.name\">{{field.label}}</mat-option>\n            </mat-select>\n        </mat-form-field>\n        <mat-form-field>\n            <mat-select [(ngModel)]=\"operation\">\n                <mat-option *ngFor=\"let op of operationsData\" value=\"{{op.type}}\">{{op.label}}</mat-option>\n            </mat-select>\n        </mat-form-field>\n        <mat-form-field>\n            <input matInput placeholder=\"{{texts.filter}}\" [(ngModel)]=\"selectedValue\"\n                    (focus)=\"onFocus($event)\" (blur)=\"onBlur($event)\" />\n            <button mat-button *ngIf=\"operation==='in'\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"fileSet.click()\">\n                <mat-icon>attach_file</mat-icon>\n            </button>\n        </mat-form-field>\n        <div>\n            <button mat-button mat-icon-button (click)=\"sendFilter()\" [disabled]=\"checkFilter()\">\n                <mat-icon>send</mat-icon>\n            </button>\n        </div>\n        <div fxFlex></div>\n        <button mat-button mat-icon-button\n                *ngIf=\"activeFilters.length === 0\"\n                matTooltip=\"{{texts.openFilter}}\"\n                (click)=\"openFiltersFile.click()\">\n            <mat-icon>folder_open</mat-icon>\n        </button>\n        <div class=\"tools\" *ngIf=\"activeFilters.length > 0\" fxLayout=\"row\">\n            <button mat-button mat-icon-button\n                    matTooltip=\"{{texts.group}}\"\n                    (click)=\"createGroup()\"\n                    [disabled]=\"getSelected() < 2\">\n                <mat-icon>link</mat-icon>\n            </button>\n            <button mat-button mat-icon-button\n                    matTooltip=\"{{texts.ungroup}}\"\n                    (click)=\"removeFromGroup()\"\n                    [disabled]=\"!groupSelected()\">\n                <mat-icon>link_off</mat-icon>\n            </button>\n            <button mat-button mat-icon-button\n                    matTooltip=\"{{texts.moveLeft}}\"\n                    (click)=\"moveTo(-1)\"\n                    [disabled]=\"getSelected() !== 1 && !entireGroupSelected()\">\n                <mat-icon>arrow_back</mat-icon>\n            </button>\n            <button mat-button mat-icon-button\n                    matTooltip=\"{{texts.moveRight}}\"\n                    (click)=\"moveTo(1)\"\n                    [disabled]=\"getSelected() !== 1 && !entireGroupSelected()\">\n                <mat-icon>arrow_forward</mat-icon>\n            </button>\n            <button mat-button mat-icon-button\n                    matTooltip=\"{{texts.openFilter}}\"\n                    (click)=\"openFiltersFile.click()\">\n                <mat-icon>folder_open</mat-icon>\n            </button>\n            <button mat-button mat-icon-button\n                    matTooltip=\"{{texts.saveFilter}}\"\n                    [disabled]=\"getSelected() > 1\"\n                    (click)=\"saveFilters()\">\n                <mat-icon>save</mat-icon>\n            </button>\n            <button mat-button mat-icon-button\n                    matTooltip=\"{{texts.clearSelection}}\"\n                    [disabled]=\"getSelected() < 1\"\n                    (click)=\"clearSelection()\">\n                <mat-icon>clear</mat-icon>\n            </button>\n            <button mat-button mat-icon-button\n                    matTooltip=\"{{texts.clearAll}}\"\n                    [disabled]=\"activeFilters.length < 1\"\n                    (click)=\"clearFilters()\">\n                <mat-icon>clear_all</mat-icon>\n            </button>\n        </div>\n    </div>\n    <div class=\"filter\" fxLayoutGap=\"12\">\n        <mat-chip-list cdkDropList\n                        cdkDropListOrientation=\"horizontal\"\n                        #filterList=\"cdkDropList\"\n                        (cdkDropListDropped)=\"onDroppedFilter($event)\">\n            <!-- <ng-container *ngFor=\"let filter of activeFilters; let idx = index\"> -->\n                <div fxLayout=\"row\"\n                *ngFor=\"let filter of activeFilters; let idx = index\"\n                cdkDrag\n                (cdkDragStarted)=\"onStartDragFilter($event, filter)\" [ngClass]=\"{'cgroup': filter.isgroup}\">\n                    <button mat-button *ngIf=\"idx > 0\" [matMenuTriggerFor]=\"menu\" class=\"bitwise\">{{filter.bitwise}}</button>\n                    <mat-menu #menu=\"matMenu\">\n                        <button mat-menu-item (click)=\"changeBitwise(filter, '&&')\">&&</button>\n                        <button mat-menu-item (click)=\"changeBitwise(filter, '||')\">||</button>\n                    </mat-menu>\n                    <mat-chip color=\"{{filter.color}}\" selected=\"true\"\n                                id=\"filter-{{idx}}\"\n                                [removable]=\"true\" (removed)=\"removeFilter(filter)\"\n                                [matTooltip]=\"filter.value\"\n                                [matTooltipDisabled]=\"filter.operation!=='in'\"\n                                matTooltipShowDelay=\"1500\"\n                                (click)=\"selectFilter(filter)\"\n                                *ngIf=\"!filter.isgroup\"\n                                [ngClass]=\"{'selected': filter.selected, 'mat-accent': filter.selected}\">\n                        {{filter.explanation}}\n                        <mat-icon matChipRemove>cancel</mat-icon>\n                    </mat-chip>\n                    <div *ngIf=\"filter.isgroup\" fxLayout=\"row\">\n                        <div *ngTemplateOutlet=\"group; context: { filter: this.filter, idx: this.idx}\" fxLayout=\"row\">\n                        </div>\n                    </div>\n                </div>\n            <!-- </ng-container> -->\n        </mat-chip-list>\n    </div>\n</div>\n<input style=\"visibility: hidden; height: 0px; width: 0px;\" type=\"file\" id=\"fileSet\" #fileSet (change)=\"uploadSet()\" />\n<input style=\"visibility: hidden; height: 0px; width: 0px;\" type=\"file\" id=\"openFiltersFile\" #openFiltersFile (change)=\"openFilters()\" />\n<ng-template #group let-filter=\"filter\" let-idx=\"idx\">\n    <span class=\"group-start\">(</span>\n    <ng-container *ngFor=\"let filter2 of filter.fields; let idx2 = index\">\n        <button mat-button *ngIf=\"idx2 > 0\" [matMenuTriggerFor]=\"menu2\"\n                class=\"bitwise\">\n            {{filter2.bitwise}}\n        </button>\n        <mat-menu #menu2=\"matMenu\">\n            <button mat-menu-item (click)=\"changeBitwise(filter2, '&&')\">&&</button>\n            <button mat-menu-item (click)=\"changeBitwise(filter2, '||')\">||</button>\n        </mat-menu>\n        <div>\n            <mat-chip color=\"{{filter.color}}\" selected=\"true\"\n                id=\"filter-{{idx}}-{{idx2}}\"\n                [removable]=\"true\" (removed)=\"removeFilter(filter2)\"\n                [matTooltip]=\"filter2.value\"\n                [matTooltipDisabled]=\"filter.operation!=='in'\"\n                matTooltipShowDelay=\"1500\"\n                (click)=\"selectFilter(filter2)\"\n                [ngClass]=\"{'selected': filter2.selected, 'mat-accent': filter2.selected}\"\n                *ngIf=\"!filter2.isgroup\"\n            >{{filter2.explanation}}\n                <mat-icon matChipRemove>cancel</mat-icon>\n            </mat-chip>\n            <div *ngIf=\"filter2.isgroup\" fxLayout=\"row\">\n                <div *ngTemplateOutlet=\"group; context: { filter: this.filter2, idx: this.idx2}\">\n                </div>\n            </div>\n        </div>\n    </ng-container>\n    <span class=\"group-end\">)</span>\n</ng-template>\n",
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
    }),
    __metadata("design:paramtypes", [])
], TWAFilterEditorComponent);
export { TWAFilterEditorComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdhLW1kMi1maWx0ZXItZWRpdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3R3YS1tZDItZmlsdGVyLWVkaXRvci8iLCJzb3VyY2VzIjpbImxpYi90d2EtbWQyLWZpbHRlci1lZGl0b3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEcsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQXVDN0MsSUFBYSx3QkFBd0IsR0FBckMsTUFBYSx3QkFBd0I7SUF1RmpDO1FBbkZVLFdBQU0sR0FBd0IsSUFBSSxZQUFZLEVBQVMsQ0FBQztRQU1sRSxrQkFBYSxHQUFHLE1BQU0sQ0FBQztRQUN2QixrQkFBYSxHQUFHLEVBQUUsQ0FBQztRQUNuQixjQUFTLEdBQUcsU0FBUyxDQUFDO1FBQ3RCLGtCQUFhLEdBQWtCLEVBQUUsQ0FBQztRQUNsQyxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLFVBQUssR0FBRztZQUNKLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLE1BQU0sRUFBRSxRQUFRO1lBQ2hCLEtBQUssRUFBRSxPQUFPO1lBQ2QsT0FBTyxFQUFFLFNBQVM7WUFDbEIsUUFBUSxFQUFFLGNBQWM7WUFDeEIsU0FBUyxFQUFFLGVBQWU7WUFDMUIsVUFBVSxFQUFFLG1CQUFtQjtZQUMvQixVQUFVLEVBQUUsYUFBYTtZQUN6QixjQUFjLEVBQUUsaUJBQWlCO1lBQ2pDLFFBQVEsRUFBRSxlQUFlO1NBRTVCLENBQUM7UUFDRixlQUFVLEdBQVE7WUFDZCxPQUFPLEVBQUUsSUFBSTtZQUNiLEtBQUssRUFBRSxLQUFLO1lBQ1osWUFBWSxFQUFFLElBQUk7WUFDbEIsT0FBTyxFQUFFLEdBQUc7WUFDWixTQUFTLEVBQUUsSUFBSTtZQUNmLElBQUksRUFBRSxHQUFHO1lB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QkFBaUIsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUMsQ0FBQzs4QkFBa0IsVUFBVTtpRUFBQztBQXFFMUU7SUFEQyxZQUFZLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7cUNBQ2xCLGFBQWE7O21FQVN2QztBQXJGUSx3QkFBd0I7SUFuQ3BDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSx1QkFBdUI7UUFDakMseTFQQUFxRDtpQkFFbkQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQTJCQztLQUVKLENBQUM7O0dBRVcsd0JBQXdCLENBa2xCcEM7U0FsbEJZLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEZpbHRlckVkaXRvck9wdGlvbnMsIEZpZWxkRmlsdGVyLCBGaWx0ZXJFZGl0b3JDb25maWcgfSBmcm9tICcuL3R3YS1tZDItZmlsdGVyLWVkaXRvci5pbnRlcmZhY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0d2EtbWQyLWZpbHRlci1lZGl0b3InLFxuICB0ZW1wbGF0ZVVybDogJy4vdHdhLW1kMi1maWx0ZXItZWRpdG9yLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgIC5lcnJvciB7IGNvbG9yOiByZWQ7IH1cbiAgICAuc2VsZWN0b3Ige1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICB9XG4gICAgLmZpbHRlciB7XG4gICAgICAgIHBhZGRpbmctYm90dG9tOiAxMnB4O1xuICAgIH1cbiAgICAuZmlsdGVyIG1hdC1jaGlwIHtcbiAgICAgICAgbWFyZ2luOiA0cHg7XG4gICAgfVxuICAgIC5jZ3JvdXAge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgIH1cbiAgICBtYXQtY2hpcC5zZWxlY3RlZCB7XG4gICAgICAgIGNvbG9yOiAjZmZmO1xuICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICB9XG4gICAgc3Bhbi5ncm91cC1zdGFydCxcbiAgICBzcGFuLmdyb3VwLWVuZCB7XG4gICAgICAgIGZvbnQtc2l6ZTogMjVweDtcbiAgICB9XG4gICAgYnV0dG9uLmJpdHdpc2Uge1xuICAgICAgICBtaW4td2lkdGg6IDI0cHg7XG4gICAgICAgIHBhZGRpbmctbGVmdDogMDtcbiAgICAgICAgcGFkZGluZy1yaWdodDogMDtcbiAgICB9XG4gICAgYFxuICBdXG59KVxuXG5leHBvcnQgY2xhc3MgVFdBRmlsdGVyRWRpdG9yQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBJbnB1dCgpIG9wdGlvbnM6IEZpbHRlckVkaXRvck9wdGlvbnM7XG4gICAgQElucHV0KCkgY29uZmlnOiBGaWx0ZXJFZGl0b3JDb25maWc7XG4gICAgQE91dHB1dCgpIGNoYW5nZTogRXZlbnRFbWl0dGVyPGFueVtdPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55W10+KCk7XG5cbiAgICBAVmlld0NoaWxkKCdmaWxlU2V0Jywge3N0YXRpYzogdHJ1ZX0pIGZpbGVTZXQ6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZCgnb2VwbkZpbHRlcnNGaWxlJywge3N0YXRpYzogdHJ1ZX0pIG9wZW5GaWx0ZXJzRmlsZTogRWxlbWVudFJlZjtcblxuICAgIGZpbHRlck9wdGlvbnM6IEZpbHRlckVkaXRvck9wdGlvbnM7XG4gICAgc2VsZWN0ZWRGaWVsZCA9ICdub25lJztcbiAgICBzZWxlY3RlZFZhbHVlID0gJyc7XG4gICAgb3BlcmF0aW9uID0gJ2NvbnRhaW4nO1xuICAgIGFjdGl2ZUZpbHRlcnM6IEZpZWxkRmlsdGVyW10gPSBbXTtcbiAgICBlZGl0aW5nID0gZmFsc2U7XG4gICAgdGV4dHMgPSB7XG4gICAgICAgIGZpbHRlckJ5OiAnRmlsdGVyIGJ5Li4uJyxcbiAgICAgICAgZmlsdGVyOiAnZmlsdGVyJyxcbiAgICAgICAgZ3JvdXA6ICdHcm91cCcsXG4gICAgICAgIHVuZ3JvdXA6ICdVbmdyb3VwJyxcbiAgICAgICAgbW92ZUxlZnQ6ICdNb3ZlIHRvIGxlZnQnLFxuICAgICAgICBtb3ZlUmlnaHQ6ICdNb3ZlIHRvIHJpZ2h0JyxcbiAgICAgICAgb3BlbkZpbHRlcjogJ09wZW4gc2F2ZWQgZmlsdGVyJyxcbiAgICAgICAgc2F2ZUZpbHRlcjogJ1NhdmUgZmlsdGVyJyxcbiAgICAgICAgY2xlYXJTZWxlY3Rpb246ICdDbGVhciBzZWxlY3Rpb24nLFxuICAgICAgICBjbGVhckFsbDogJ0NsZWFyIGZpbHRlcnMnLFxuXG4gICAgfTtcbiAgICBvcGVyYXRpb25zOiBhbnkgPSB7XG4gICAgICAgIGNvbnRhaW46ICc9PicsXG4gICAgICAgIGVxdWFsOiAnPT09JyxcbiAgICAgICAgZ3JlYXRlckVxdWFsOiAnPj0nLFxuICAgICAgICBncmVhdGVyOiAnPicsXG4gICAgICAgIGxlc3NFcXVhbDogJzw9JyxcbiAgICAgICAgbGVzczogJzwnLFxuICAgICAgICBpbjogJ2luJyxcbiAgICB9O1xuICAgIG9wZXJhdGlvbnNEYXRhID0gW1xuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnY29udGFpbicsXG4gICAgICAgICAgICBsYWJlbDogJ2NvbnRhaW5zJyxcbiAgICAgICAgICAgIG9wZXJhdG9yOiAnPT4nXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdlcXVhbCcsXG4gICAgICAgICAgICBsYWJlbDogJ2VxdWFscycsXG4gICAgICAgICAgICBvcGVyYXRvcjogJz09PSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2dyZWF0ZXJFcXVhbCcsXG4gICAgICAgICAgICBsYWJlbDogJ2dyZWF0ZXIgb3IgZXF1YWwnLFxuICAgICAgICAgICAgb3BlcmF0b3I6ICc+PSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2dyZWF0ZXInLFxuICAgICAgICAgICAgbGFiZWw6ICdncmVhdGVyJyxcbiAgICAgICAgICAgIG9wZXJhdG9yOiAnPidcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2xlc3NFcXVhbCcsXG4gICAgICAgICAgICBsYWJlbDogJ2xlc3Mgb3IgZXF1YWwnLFxuICAgICAgICAgICAgb3BlcmF0b3I6ICc8PSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2xlc3MnLFxuICAgICAgICAgICAgbGFiZWw6ICdsZXNzJyxcbiAgICAgICAgICAgIG9wZXJhdG9yOiAnPCdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2luJyxcbiAgICAgICAgICAgIGxhYmVsOiAnaW4nLFxuICAgICAgICAgICAgb3BlcmF0b3I6ICdpbidcbiAgICAgICAgfSxcbiAgICBdO1xuXG4gICAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6a2V5ZG93bicsIFsnJGV2ZW50J10pXG4gICAgaGFuZGxlS2V5Ym9hcmRFdmVudChldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgLy8gaWYgKChldmVudC5rZXkgPT09ICdjJyAmJiBldmVudC5jdHJsS2V5KSkge1xuICAgICAgLy8gICAgIHRoaXMuY2xlYXJGaWx0ZXJzKCk7XG4gICAgICAvLyB9IGVsc2UgaWYgKHRoaXMuZWRpdGluZyAmJiBldmVudC5rZXlDb2RlID09PSAxMykge1xuICAgICAgLy8gICAgIHRoaXMuYWRkRmlsdGVyKCk7XG4gICAgICAvLyB9XG4gICAgICBpZiAodGhpcy5lZGl0aW5nICYmIGV2ZW50LmtleUNvZGUgPT09IDEzKSB7XG4gICAgICAgIHRoaXMuYWRkRmlsdGVyKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgb3BlbkZpbHRlcnMoKSB7XG4gICAgICAgIGNvbnN0IGZpbGVPYmogPSAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29wZW5GaWx0ZXJzRmlsZScpKS5maWxlc1swXTtcbiAgICAgICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgICAgcmVhZGVyLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlYWRlci5yZXN1bHQpO1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UoPHN0cmluZz5yZWFkZXIucmVzdWx0KTtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlRmlsdGVycyA9IGRhdGE7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMuYWN0aXZlRmlsdGVycyk7XG4gICAgICAgIH07XG4gICAgICAgIHJlYWRlci5yZWFkQXNUZXh0KGZpbGVPYmopO1xuICAgIH1cblxuICAgIHNhdmVGaWx0ZXJzKCkge1xuICAgICAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW0pTT04uc3RyaW5naWZ5KHRoaXMuYWN0aXZlRmlsdGVycyldLCB7IHR5cGU6ICd0ZXh0L2pzb24nIH0pO1xuICAgICAgICBjb25zdCBmaWxlbmFtZSA9ICdmaWx0ZXJzLmpzb24nO1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICBlbGVtZW50LmhyZWYgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgICAgICAgZWxlbWVudC5kb3dubG9hZCA9IGZpbGVuYW1lO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgICAgICBlbGVtZW50LmNsaWNrKCk7XG4gICAgfVxuXG4gICAgY2hlY2tGaWx0ZXIoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAodGhpcy5zZWxlY3RlZEZpZWxkID09PSAnbm9uZScgfHwgdGhpcy5zZWxlY3RlZFZhbHVlID09PSAnJyk7XG4gICAgfVxuXG4gICAgc2VuZEZpbHRlcigpIHtcbiAgICAgICAgdGhpcy5hZGRGaWx0ZXIoKTtcbiAgICB9XG5cbiAgICBhZGRGaWx0ZXIoKSB7XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2FkZGluZyBmaWx0ZXIuLi4nKTtcblxuICAgICAgICBsZXQgY29sb3IgPSAnJyxcbiAgICAgICAgICAgIGZpZWxkID0gJycsXG4gICAgICAgICAgICBkYmZpZWxkID0gJycsXG4gICAgICAgICAgICBsYWJlbCA9ICcnLFxuICAgICAgICAgICAgbmFtZSA9ICcnLFxuICAgICAgICAgICAgZXhwbGFuYXRpb24gPSB0aGlzLnNlbGVjdGVkRmllbGQgKyAnICcgKyB0aGlzLm9wZXJhdGlvbnNbdGhpcy5vcGVyYXRpb25dICsgJyAnICsgdGhpcy5zZWxlY3RlZFZhbHVlO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gdGhpcy5maWx0ZXJPcHRpb25zLmZpZWxkcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmZpbHRlck9wdGlvbnMuZmllbGRzW2ldLm5hbWUgPT09IHRoaXMuc2VsZWN0ZWRGaWVsZCkge1xuICAgICAgICAgICAgICAgIC8vIGNvbG9yID0gdGhpcy5maWx0ZXJPcHRpb25zLmZpZWxkc1tpXS5jb2xvcjtcbiAgICAgICAgICAgICAgICAvLyBmaWVsZCA9IHRoaXMuZmlsdGVyT3B0aW9ucy5maWVsZHNbaV0uZmllbGQ7XG4gICAgICAgICAgICAgICAgLy8gbGFiZWwgPSB0aGlzLmZpbHRlck9wdGlvbnMuZmllbGRzW2ldLmxhYmVsO1xuICAgICAgICAgICAgICAgIC8vIG5hbWUgPSB0aGlzLmZpbHRlck9wdGlvbnMuZmllbGRzW2ldLm5hbWU7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogLi4ud2l0aCBvYmplY3QgZGVzdHJ1Y3R1cmluZ1xuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICh7IGNvbG9yLCBmaWVsZCwgZGJmaWVsZCwgbGFiZWwsIG5hbWUgfSA9IHRoaXMuZmlsdGVyT3B0aW9ucy5maWVsZHNbaV0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wZXJhdGlvbiA9PT0gJ2luJykge1xuICAgICAgICAgICAgZXhwbGFuYXRpb24gPSB0aGlzLnNlbGVjdGVkRmllbGQgKyAnICcgKyB0aGlzLm9wZXJhdGlvbnNbdGhpcy5vcGVyYXRpb25dICsgJyAoLi4uKSc7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5vcGVyYXRpb24gPT09ICdjb250YWluJykge1xuICAgICAgICAgICAgLy8gZXhwbGFuYXRpb24gPSB0aGlzLnNlbGVjdGVkRmllbGQgKyAnICcgKyB0aGlzLm9wZXJhdGlvbnNbdGhpcy5vcGVyYXRpb25dICsgJyAnICsgdGhpcy5zZWxlY3RlZFZhbHVlO1xuICAgICAgICAgICAgZXhwbGFuYXRpb24gPSAnXCInICsgdGhpcy5zZWxlY3RlZFZhbHVlICsgJ1wiICcgKyB0aGlzLm9wZXJhdGlvbnNbdGhpcy5vcGVyYXRpb25dICsgJyAnICsgdGhpcy5zZWxlY3RlZEZpZWxkO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYWN0aXZlRmlsdGVycy5wdXNoKHtcbiAgICAgICAgICAgIGNvbG9yOiBjb2xvcixcbiAgICAgICAgICAgIGV4cGxhbmF0aW9uOiBleHBsYW5hdGlvbixcbiAgICAgICAgICAgIGxhYmVsOiBsYWJlbCxcbiAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICBmaWVsZDogZmllbGQsXG4gICAgICAgICAgICBkYmZpZWxkOiBkYmZpZWxkLFxuICAgICAgICAgICAgYml0d2lzZTogJyYmJyxcbiAgICAgICAgICAgIG9wZXJhdGlvbjogdGhpcy5vcGVyYXRpb25zW3RoaXMub3BlcmF0aW9uXSxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnNlbGVjdGVkVmFsdWVcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRWYWx1ZSA9ICcnO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmFjdGl2ZUZpbHRlcnMpO1xuICAgICAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMuYWN0aXZlRmlsdGVycyk7XG4gICAgfVxuXG4gICAgc2VsZWN0RmlsdGVyKGZpbHRlcjogRmllbGRGaWx0ZXIpIHtcbiAgICAgICAgZmlsdGVyLnNlbGVjdGVkID0gIWZpbHRlci5zZWxlY3RlZDtcbiAgICAgICAgY29uc3QgZ3JvdXAgPSB0aGlzLmdldFBhcmVudEZpbHRlcihmaWx0ZXIpO1xuICAgICAgICBpZiAoZ3JvdXApIHtcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZEFsbCA9IHRydWU7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGdyb3VwLmZpZWxkcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0bXBmaWx0ZXIgPSBncm91cC5maWVsZHNbaV07XG4gICAgICAgICAgICAgICAgaWYgKCF0bXBmaWx0ZXIuaXNncm91cCAmJiAhdG1wZmlsdGVyLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkQWxsID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkQWxsKSB7XG4gICAgICAgICAgICAgICAgZ3JvdXAuc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0UGFyZW50RmlsdGVyKGZpbHRlcjogRmllbGRGaWx0ZXIpOiBGaWVsZEZpbHRlciB8IG51bGwge1xuICAgICAgICBjb25zdCBnZXRQYXJlbnRGaWx0ZXJJbkdyb3VwID0gKGdyb3VwOiBGaWVsZEZpbHRlciwgZmlsdGVyMjogRmllbGRGaWx0ZXIpOiBGaWVsZEZpbHRlciB8IG51bGwgPT4ge1xuICAgICAgICAgICAgcmV0ID0gbnVsbDtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBncm91cC5maWVsZHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdG1wZmlsdGVyID0gZ3JvdXAuZmllbGRzW2ldO1xuICAgICAgICAgICAgICAgIGlmIChKU09OLnN0cmluZ2lmeSh0bXBmaWx0ZXIpID09PSBKU09OLnN0cmluZ2lmeShmaWx0ZXIyKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ3JvdXA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0bXBmaWx0ZXIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgICAgICByZXQgPSBnZXRQYXJlbnRGaWx0ZXJJbkdyb3VwKHRtcGZpbHRlciwgZmlsdGVyMik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICB9O1xuICAgICAgICBsZXQgcmV0ID0gbnVsbDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSB0aGlzLmFjdGl2ZUZpbHRlcnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCB0bXBmaWx0ZXIgPSB0aGlzLmFjdGl2ZUZpbHRlcnNbaV07XG4gICAgICAgICAgICBpZiAoSlNPTi5zdHJpbmdpZnkodG1wZmlsdGVyKSA9PT0gSlNPTi5zdHJpbmdpZnkoZmlsdGVyKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0bXBmaWx0ZXIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgIHJldCA9IGdldFBhcmVudEZpbHRlckluR3JvdXAodG1wZmlsdGVyLCBmaWx0ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG5cbiAgICBhcnJheU1vdmUgPSAoYXJyOiBhbnlbXSwgb2xkSW5kZXg6IG51bWJlciwgbmV3SW5kZXg6IG51bWJlcik6IGFueVtdID0+IHtcbiAgICAgICAgaWYgKG5ld0luZGV4ID4gYXJyLmxlbmd0aCkge1xuICAgICAgICAgICAgbGV0IGsgPSBuZXdJbmRleCAtIGFyci5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoay0tKSB7XG4gICAgICAgICAgICAgICAgYXJyLnB1c2godW5kZWZpbmVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBhcnIuc3BsaWNlKG5ld0luZGV4LCAwLCBhcnIuc3BsaWNlKG9sZEluZGV4LCAxKVswXSk7XG4gICAgICAgIHJldHVybiBhcnI7XG4gICAgfVxuXG4gICAgbW92ZVRvKGRpcmVjdGlvbjogbnVtYmVyKSB7XG4gICAgICAgIGxldCBpZHggPSAtMSxcbiAgICAgICAgICAgIHRvSWR4ID0gLTEsXG4gICAgICAgICAgICBncm91cCA9IC0xO1xuICAgICAgICAvLyBTZWFyY2hpbmcgdGhlIHNlbGVjdGVkIGZpbHRlci4uLlxuICAgICAgICB0aGlzLmFjdGl2ZUZpbHRlcnMuZm9yRWFjaCgoZmlsdGVyLCB0bXBpZHgpID0+IHtcbiAgICAgICAgICAgIGlmIChmaWx0ZXIuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICBpZHggPSB0bXBpZHg7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChmaWx0ZXIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgIGZpbHRlci5maWVsZHMuZm9yRWFjaCgoZmlsdGVyMiwgdG1waWR4MikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyMi5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWR4ID0gdG1waWR4MjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwID0gdG1waWR4O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChpZHggPj0gMCkge1xuXG4gICAgICAgICAgICBpZiAoZ3JvdXAgPj0gMCkge1xuICAgICAgICAgICAgICAgIHRvSWR4ID0gKGlkeCArIGRpcmVjdGlvbikgPj0gMCA/IGlkeCArIGRpcmVjdGlvbiA6IHRoaXMuYWN0aXZlRmlsdGVyc1tncm91cF0uZmllbGRzLmxlbmd0aCArIGRpcmVjdGlvbjtcbiAgICAgICAgICAgICAgICBpZiAodG9JZHggPj0gdGhpcy5hY3RpdmVGaWx0ZXJzW2dyb3VwXS5maWVsZHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvSWR4ID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVGaWx0ZXJzW2dyb3VwXS5maWVsZHMgPSB0aGlzLmFycmF5TW92ZSh0aGlzLmFjdGl2ZUZpbHRlcnNbZ3JvdXBdLmZpZWxkcywgaWR4LCB0b0lkeCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRvSWR4ID0gKGlkeCArIGRpcmVjdGlvbikgPj0gMCA/IGlkeCArIGRpcmVjdGlvbiA6IHRoaXMuYWN0aXZlRmlsdGVycy5sZW5ndGggKyBkaXJlY3Rpb247XG4gICAgICAgICAgICAgICAgaWYgKHRvSWR4ID49IHRoaXMuYWN0aXZlRmlsdGVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9JZHggPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUZpbHRlcnMgPSB0aGlzLmFycmF5TW92ZSh0aGlzLmFjdGl2ZUZpbHRlcnMsIGlkeCwgdG9JZHgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMuYWN0aXZlRmlsdGVycyk7XG5cbiAgICB9XG5cbiAgICBnZXRTZWxlY3RlZCgpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBnZXRJbkdyb3VwID0gKGdyb3VwOiBGaWVsZEZpbHRlcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGdyb3VwLmZpZWxkcy5yZWR1Y2UoKGFjYzIsIGZpbHRlcikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgICAgICBhY2MyICs9IGdldEluR3JvdXAoZmlsdGVyKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZpbHRlci5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICBhY2MyKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBhY2MyO1xuICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLmFjdGl2ZUZpbHRlcnMucmVkdWNlKChhY2MsIGZpbHRlcikgPT4ge1xuICAgICAgICAgICAgaWYgKGZpbHRlci5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgYWNjICs9IGdldEluR3JvdXAoZmlsdGVyKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZmlsdGVyLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgYWNjKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICB9LCAwKTtcblxuICAgIH1cblxuICAgIGNsZWFyU2VsZWN0aW9uKCk6IHZvaWQge1xuXG4gICAgICAgIGNvbnN0IGNsZWFyU2VsZWN0aW9uSW5Hcm91cCA9IChncm91cCkgPT4ge1xuICAgICAgICAgICAgZ3JvdXAuZmllbGRzLmZvckVhY2goKGZpbHRlcikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgICAgICBmaWx0ZXIgPSBjbGVhclNlbGVjdGlvbkluR3JvdXAoZmlsdGVyKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmaWx0ZXIuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIGdyb3VwO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuYWN0aXZlRmlsdGVycyA9IHRoaXMuYWN0aXZlRmlsdGVycy5tYXAoKGZpbHRlcikgPT4ge1xuICAgICAgICAgICAgaWYgKGZpbHRlci5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgZmlsdGVyID0gY2xlYXJTZWxlY3Rpb25Jbkdyb3VwKGZpbHRlcik7XG4gICAgICAgICAgICAgICAgLy8gZmlsdGVyLmZpZWxkcyA9IGZpbHRlci5maWVsZHMubWFwKChmaWx0ZXIyKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gICAgIGZpbHRlcjIuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAvLyAgICAgcmV0dXJuIGZpbHRlcjI7XG4gICAgICAgICAgICAgICAgLy8gfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaWx0ZXIuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiBmaWx0ZXI7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgY2hhbmdlQml0d2lzZShmaWx0ZXI6IEZpZWxkRmlsdGVyLCBiaXR3aXNlKSB7XG4gICAgICAgIGZpbHRlci5iaXR3aXNlID0gYml0d2lzZTtcbiAgICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh0aGlzLmFjdGl2ZUZpbHRlcnMpO1xuICAgIH1cblxuICAgIGdyb3VwU2VsZWN0ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IGdyb3VwU2VsZWN0ZWRJbkdyb3VwID0gKGZpbHRlcjogRmllbGRGaWx0ZXIpID0+IHtcbiAgICAgICAgICAgIGxldCByZXQyID0gMDtcbiAgICAgICAgICAgIGlmIChmaWx0ZXIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgIGZpbHRlci5maWVsZHMuZm9yRWFjaCgoZmlsdGVyMikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyMi5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXQyICs9IGdyb3VwU2VsZWN0ZWRJbkdyb3VwKGZpbHRlcjIpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlcjIuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXQyKys7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmV0MjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlci5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGdyb3VwcyA9IHRoaXMuYWN0aXZlRmlsdGVycy5maWx0ZXIoZmlsdGVyID0+IGZpbHRlci5pc2dyb3VwKTtcbiAgICAgICAgbGV0IHJldCA9IDA7XG4gICAgICAgIGdyb3Vwcy5mb3JFYWNoKChncm91cCkgPT4ge1xuICAgICAgICAgICAgZ3JvdXAuZmllbGRzLmZvckVhY2goZmlsdGVyID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0ICs9IGdyb3VwU2VsZWN0ZWRJbkdyb3VwKGZpbHRlcik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmaWx0ZXIuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0Kys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmV0ID4gMDtcbiAgICB9XG5cbiAgICBlbnRpcmVHcm91cFNlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCBlbnRpcmVHcm91cFNlbGVjdGVkSW5Hcm91cCA9IChncm91cDogRmllbGRGaWx0ZXIpID0+IHtcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZDIgPSB0cnVlO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGdyb3VwLmZpZWxkcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWx0ZXIgPSBncm91cC5maWVsZHNbaV07XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlci5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkMiA9IGVudGlyZUdyb3VwU2VsZWN0ZWRJbkdyb3VwKGZpbHRlcik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghZmlsdGVyLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkMiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzZWxlY3RlZDIgJiYgZ3JvdXAuZmllbGRzLmxlbmd0aCA+IDA7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGdyb3VwcyA9IHRoaXMuYWN0aXZlRmlsdGVycy5maWx0ZXIoZmlsdGVyID0+IGZpbHRlci5pc2dyb3VwKTtcbiAgICAgICAgbGV0IHNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgZm9yIChsZXQgaWcgPSAwLCBsZyA9IGdyb3Vwcy5sZW5ndGg7IGlnIDwgbGc7IGlnKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwID0gZ3JvdXBzW2lnXTtcbiAgICAgICAgICAgIGZvciAobGV0IGlnMiA9IDAsIGxnMiA9IGdyb3VwLmZpZWxkcy5sZW5ndGg7IGlnMiA8IGxnMjsgaWcyKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWx0ZXIgPSBncm91cC5maWVsZHNbaWcyXTtcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSBlbnRpcmVHcm91cFNlbGVjdGVkSW5Hcm91cChmaWx0ZXIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghZmlsdGVyLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ3JvdXAuZmllbGRzLmZvckVhY2goZmlsdGVyID0+IHtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZ3JvdXBzLmZvckVhY2goKGdyb3VwKSA9PiB7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc2VsZWN0ZWQgJiYgZ3JvdXBzLmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgY3JlYXRlR3JvdXAoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGNyZWF0ZUluR3JvdXAgPSAoZmlsdGVyOiBGaWVsZEZpbHRlcikgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWQyID0gZmlsdGVyLmZpZWxkcy5maWx0ZXIoZmlsdGVyMiA9PiBmaWx0ZXIyLnNlbGVjdGVkKSxcbiAgICAgICAgICAgIGdyb3VwUG9zaXRpb24yID0gZmlsdGVyLmZpZWxkcy5maW5kSW5kZXgodiA9PiB2LnNlbGVjdGVkKTtcbiAgICAgICAgICAgIGxldCByZXN1bHRGaWx0ZXIyOiBGaWVsZEZpbHRlcltdO1xuICAgICAgICAgICAgaWYgKHNlbGVjdGVkMi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRGaWx0ZXIyID0gZmlsdGVyLmZpZWxkcy5maWx0ZXIoZmlsdGVyMiA9PiAhZmlsdGVyMi5zZWxlY3RlZCk7XG4gICAgICAgICAgICAgICAgcmVzdWx0RmlsdGVyMi5zcGxpY2UoZ3JvdXBQb3NpdGlvbjIsIDAsIHtcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcnLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgZmllbGQ6ICcnLFxuICAgICAgICAgICAgICAgICAgICBpc2dyb3VwOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBiaXR3aXNlOiAnJiYnLFxuICAgICAgICAgICAgICAgICAgICBmaWVsZHM6IHNlbGVjdGVkMlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHRGaWx0ZXIyID0gZmlsdGVyLmZpZWxkcy5tYXAoZmlsdGVyMiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZUluR3JvdXAoZmlsdGVyMik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZpbHRlcjI7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaWx0ZXIuZmllbGRzID0gcmVzdWx0RmlsdGVyMjtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMuYWN0aXZlRmlsdGVycy5maWx0ZXIoZmlsdGVyID0+IGZpbHRlci5zZWxlY3RlZCksXG4gICAgICAgICAgICAgIGdyb3VwUG9zaXRpb24gPSB0aGlzLmFjdGl2ZUZpbHRlcnMuZmluZEluZGV4KHYgPT4gdi5zZWxlY3RlZCk7XG4gICAgICAgIGxldCByZXN1bHRGaWx0ZXI6IEZpZWxkRmlsdGVyW107XG4gICAgICAgIGlmIChzZWxlY3RlZC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJlc3VsdEZpbHRlciA9IHRoaXMuYWN0aXZlRmlsdGVycy5maWx0ZXIoZmlsdGVyID0+ICFmaWx0ZXIuc2VsZWN0ZWQpO1xuICAgICAgICAgICAgcmVzdWx0RmlsdGVyLnNwbGljZShncm91cFBvc2l0aW9uLCAwLCB7XG4gICAgICAgICAgICAgICAgY29sb3I6ICcnLFxuICAgICAgICAgICAgICAgIG5hbWU6ICcnLFxuICAgICAgICAgICAgICAgIGZpZWxkOiAnJyxcbiAgICAgICAgICAgICAgICBpc2dyb3VwOiB0cnVlLFxuICAgICAgICAgICAgICAgIGJpdHdpc2U6ICcmJicsXG4gICAgICAgICAgICAgICAgZmllbGRzOiBzZWxlY3RlZFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUZpbHRlcnMgPSByZXN1bHRGaWx0ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHRGaWx0ZXIgPSB0aGlzLmFjdGl2ZUZpbHRlcnMubWFwKGZpbHRlciA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlci5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUluR3JvdXAoZmlsdGVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpbHRlcjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh0aGlzLmFjdGl2ZUZpbHRlcnMpO1xuICAgIH1cblxuICAgIHNhbml0aXplR3JvdXBzKCkge1xuICAgICAgICBjb25zdCBzYW5pdGl6ZUdyb3Vwc0luR3JvdXAgPSAoZ3JvdXAsIHBhcmVudD86IEZpZWxkRmlsdGVyKSA9PiB7XG4gICAgICAgICAgICBncm91cC5maWVsZHMubWFwKChmaWx0ZXI6IEZpZWxkRmlsdGVyLCBpZHg6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLmZpZWxkcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwLmZpZWxkcy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmaWx0ZXIuZmllbGRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ3JvdXAuZmllbGRzLnB1c2goey4uLmZpbHRlci5maWVsZHNbMF19KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwLmZpZWxkcy5zcGxpY2UoaWR4LCAxLCB7Li4uZmlsdGVyLmZpZWxkc1swXX0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2FuaXRpemVHcm91cHNJbkdyb3VwKGZpbHRlciwgZ3JvdXApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYWN0aXZlRmlsdGVycy5tYXAoKGZpbHRlcjogRmllbGRGaWx0ZXIsIGlkeDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBpZiAoZmlsdGVyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLmZpZWxkcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVGaWx0ZXJzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZmlsdGVyLmZpZWxkcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5hY3RpdmVGaWx0ZXJzLnB1c2goey4uLmZpbHRlci5maWVsZHNbMF19KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVGaWx0ZXJzLnNwbGljZShpZHgsIDEsIHsuLi5maWx0ZXIuZmllbGRzWzBdfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzYW5pdGl6ZUdyb3Vwc0luR3JvdXAoZmlsdGVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbW92ZUZyb21Hcm91cCgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgcmVtb3ZlRnJvbUdyb3VwSW5Hcm91cCA9IChncm91cDogRmllbGRGaWx0ZXIsIHBhcmVudDogRmllbGRGaWx0ZXIsIGlkeCkgPT4ge1xuICAgICAgICAgICAgZ3JvdXAuZmllbGRzLmZvckVhY2goKGZpbHRlcjIsIGlkeDIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyMi5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUZyb21Hcm91cEluR3JvdXAoZmlsdGVyMiwgZ3JvdXAsIGlkeDIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3QgdG1wRmlsdGVycyA9IGdyb3VwLmZpZWxkcy5maWx0ZXIoKGZpbHRlcjI6IEZpZWxkRmlsdGVyKSA9PiBmaWx0ZXIyLnNlbGVjdGVkKTtcbiAgICAgICAgICAgIGdyb3VwLmZpZWxkcyA9IGdyb3VwLmZpZWxkcy5maWx0ZXIoKGZpbHRlcjI6IEZpZWxkRmlsdGVyKSA9PiAhZmlsdGVyMi5zZWxlY3RlZCk7XG4gICAgICAgICAgICB0bXBGaWx0ZXJzLmZvckVhY2goKHY6IEZpZWxkRmlsdGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgdi5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHBhcmVudC5maWVsZHMucHVzaCh2KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGdyb3VwLmZpZWxkcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBwYXJlbnQuZmllbGRzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuYWN0aXZlRmlsdGVycyA9IHRoaXMuYWN0aXZlRmlsdGVycy5yZWR1Y2UoKG5ld0ZpbHRlcnMsIGZpbHRlcikgPT4ge1xuICAgICAgICAgICAgaWYgKGZpbHRlci5pc2dyb3VwKSB7XG5cbiAgICAgICAgICAgICAgICBmaWx0ZXIuZmllbGRzLmZvckVhY2goKGZpbHRlcjIsIGlkeCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyMi5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVGcm9tR3JvdXBJbkdyb3VwKGZpbHRlcjIsIGZpbHRlciwgaWR4KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgdG1wRmlsdGVycyA9IGZpbHRlci5maWVsZHMuZmlsdGVyKGZpbHRlcjIgPT4gZmlsdGVyMi5zZWxlY3RlZCk7XG4gICAgICAgICAgICAgICAgZmlsdGVyLmZpZWxkcyA9IGZpbHRlci5maWVsZHMuZmlsdGVyKGZpbHRlcjIgPT4gIWZpbHRlcjIuc2VsZWN0ZWQpO1xuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIuZmllbGRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBuZXdGaWx0ZXJzLnB1c2goZmlsdGVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdG1wRmlsdGVycy5mb3JFYWNoKHYgPT4ge1xuICAgICAgICAgICAgICAgICAgICBuZXdGaWx0ZXJzLnB1c2godik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5ld0ZpbHRlcnMucHVzaChmaWx0ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ld0ZpbHRlcnM7XG4gICAgICAgIH0sIFtdKTtcbiAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICB0aGlzLnNhbml0aXplR3JvdXBzKCk7XG4gICAgICAgIHRoaXMuY2hhbmdlLmVtaXQodGhpcy5hY3RpdmVGaWx0ZXJzKTtcbiAgICB9XG5cbiAgICBvblN0YXJ0RHJhZ0ZpbHRlcihfZXZlbnQsIF9maWx0ZXIpIHtcbiAgICB9XG5cbiAgICBvbkRyb3BwZWRGaWx0ZXIoZXZlbnQpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdkcm9wcGVkJyk7XG4gICAgICB0aGlzLmFycmF5TW92ZSh0aGlzLmFjdGl2ZUZpbHRlcnMsIGV2ZW50LnByZXZpb3VzSW5kZXgsIGV2ZW50LmN1cnJlbnRJbmRleCk7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmFjdGl2ZUZpbHRlcnMpO1xuICAgICAgICAvLyB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgIHRoaXMuc2FuaXRpemVHcm91cHMoKTtcbiAgICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh0aGlzLmFjdGl2ZUZpbHRlcnMpO1xuICAgIH1cblxuICAgIHVwbG9hZFNldCgpIHtcbiAgICAgICAgY29uc3QgZmlsZU9iaiA9ICg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlsZVNldCcpKS5maWxlc1swXTtcbiAgICAgICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgICAgcmVhZGVyLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGxpbmVzID0gKDxzdHJpbmc+cmVhZGVyLnJlc3VsdCkuc3BsaXQoL1xccj9cXG4vKS5maWx0ZXIodmFsID0+IHZhbCA+ICcnKTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRWYWx1ZSA9IGxpbmVzLmpvaW4oJywgJyk7XG4gICAgICAgICAgICB0aGlzLmZpbGVTZXQubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnO1xuICAgICAgICB9O1xuICAgICAgICByZWFkZXIucmVhZEFzVGV4dChmaWxlT2JqKTtcbiAgICB9XG5cbiAgICByZW1vdmVGaWx0ZXIoZmlsdGVyOiBGaWVsZEZpbHRlcik6IHZvaWQge1xuICAgICAgICAvLyBjb25zdCByZW1vdmVGaWx0ZXJJbkdyb3VwID0gKGdyb3VwLCBmaWx0ZXIpID0+IHtcblxuICAgICAgICAvLyB9O1xuICAgICAgICBjb25zdCBwYXJlbnQgPSB0aGlzLmdldFBhcmVudEZpbHRlcihmaWx0ZXIpO1xuICAgICAgICBsZXQgZ3JvdXA6IEZpZWxkRmlsdGVyW107XG4gICAgICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgICAgIGdyb3VwID0gcGFyZW50LmZpZWxkcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdyb3VwID0gdGhpcy5hY3RpdmVGaWx0ZXJzO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gZ3JvdXAubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoSlNPTi5zdHJpbmdpZnkoZ3JvdXBbaV0pID09PSBKU09OLnN0cmluZ2lmeShmaWx0ZXIpKSB7XG4gICAgICAgICAgICAgICAgZ3JvdXAuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2FuaXRpemVHcm91cHMoKTtcbiAgICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh0aGlzLmFjdGl2ZUZpbHRlcnMpO1xuICAgIH1cblxuICAgIGNsZWFyRmlsdGVycygpIHtcbiAgICAgICAgdGhpcy5hY3RpdmVGaWx0ZXJzID0gW107XG4gICAgICAgIHRoaXMuY2hhbmdlLmVtaXQodGhpcy5hY3RpdmVGaWx0ZXJzKTtcbiAgICB9XG5cbiAgICBvbkZvY3VzKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZWRpdGluZyA9IHRydWU7XG4gICAgfVxuXG4gICAgb25CbHVyKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZWRpdGluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmZpbHRlck9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRGaWVsZCA9ICh0eXBlb2YgdGhpcy5maWx0ZXJPcHRpb25zLmZpZWxkc1swXSAhPT0gJ3VuZGVmaW5lZCcpID8gdGhpcy5maWx0ZXJPcHRpb25zLmZpZWxkc1swXS5uYW1lIDogJ25vbmUnO1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuY29uZmlnICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZyAmJiB0eXBlb2YgdGhpcy5jb25maWcub3BlcmF0aW9uc0RhdGEgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcGVyYXRpb25zRGF0YSA9IHRoaXMuY29uZmlnLm9wZXJhdGlvbnNEYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnICYmIHR5cGVvZiB0aGlzLmNvbmZpZy5maWx0ZXIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVGaWx0ZXJzID0gdGhpcy5jb25maWcuZmlsdGVyLnNsaWNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5jb25maWcgJiYgdHlwZW9mIHRoaXMuY29uZmlnLnRleHRzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHRoaXMudGV4dHMgPSB7Li4udGhpcy50ZXh0cywgLi4udGhpcy5jb25maWcudGV4dHN9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHRoaXMuZmlsdGVyT3B0aW9ucyA9IEpTT04ucGFyc2UodGhpcy5vcHRpb25zKTtcbiAgICB9XG59XG4iXX0=