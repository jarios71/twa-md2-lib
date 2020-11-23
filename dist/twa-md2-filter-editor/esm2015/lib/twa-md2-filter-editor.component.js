import { Component, Input, Output, ElementRef, EventEmitter, ViewChild } from '@angular/core';
import { HostListener } from '@angular/core';
export class TWAFilterEditorComponent {
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
}
TWAFilterEditorComponent.decorators = [
    { type: Component, args: [{
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
            },] }
];
TWAFilterEditorComponent.ctorParameters = () => [];
TWAFilterEditorComponent.propDecorators = {
    options: [{ type: Input }],
    config: [{ type: Input }],
    change: [{ type: Output }],
    fileSet: [{ type: ViewChild, args: ['fileSet', { static: true },] }],
    openFiltersFile: [{ type: ViewChild, args: ['oepnFiltersFile', { static: true },] }],
    handleKeyboardEvent: [{ type: HostListener, args: ['document:keydown', ['$event'],] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdhLW1kMi1maWx0ZXItZWRpdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS5vbGQvam9zZS93b3JrL3NpcmEuZXMvc2lyYS1uZzItY29tcG9uZW50cy9saWItdHdhLW1kL3Byb2plY3RzL3R3YS1tZDItZmlsdGVyLWVkaXRvci9zcmMvIiwic291cmNlcyI6WyJsaWIvdHdhLW1kMi1maWx0ZXItZWRpdG9yLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEcsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQXVDN0MsTUFBTSxPQUFPLHdCQUF3QjtJQXVGakM7UUFuRlUsV0FBTSxHQUF3QixJQUFJLFlBQVksRUFBUyxDQUFDO1FBTWxFLGtCQUFhLEdBQUcsTUFBTSxDQUFDO1FBQ3ZCLGtCQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ25CLGNBQVMsR0FBRyxTQUFTLENBQUM7UUFDdEIsa0JBQWEsR0FBa0IsRUFBRSxDQUFDO1FBQ2xDLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsVUFBSyxHQUFHO1lBQ0osUUFBUSxFQUFFLGNBQWM7WUFDeEIsTUFBTSxFQUFFLFFBQVE7WUFDaEIsS0FBSyxFQUFFLE9BQU87WUFDZCxPQUFPLEVBQUUsU0FBUztZQUNsQixRQUFRLEVBQUUsY0FBYztZQUN4QixTQUFTLEVBQUUsZUFBZTtZQUMxQixVQUFVLEVBQUUsbUJBQW1CO1lBQy9CLFVBQVUsRUFBRSxhQUFhO1lBQ3pCLGNBQWMsRUFBRSxpQkFBaUI7WUFDakMsUUFBUSxFQUFFLGVBQWU7U0FFNUIsQ0FBQztRQUNGLGVBQVUsR0FBUTtZQUNkLE9BQU8sRUFBRSxJQUFJO1lBQ2IsS0FBSyxFQUFFLEtBQUs7WUFDWixZQUFZLEVBQUUsSUFBSTtZQUNsQixPQUFP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UyxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQzs4QkFDbkMsU0FBUyxTQUFDLGlCQUFpQixFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQztrQ0FvRTNDLFlBQVksU0FBQyxrQkFBa0IsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEZpbHRlckVkaXRvck9wdGlvbnMsIEZpZWxkRmlsdGVyLCBGaWx0ZXJFZGl0b3JDb25maWcgfSBmcm9tICcuL3R3YS1tZDItZmlsdGVyLWVkaXRvci5pbnRlcmZhY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0d2EtbWQyLWZpbHRlci1lZGl0b3InLFxuICB0ZW1wbGF0ZVVybDogJy4vdHdhLW1kMi1maWx0ZXItZWRpdG9yLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgIC5lcnJvciB7IGNvbG9yOiByZWQ7IH1cbiAgICAuc2VsZWN0b3Ige1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICB9XG4gICAgLmZpbHRlciB7XG4gICAgICAgIHBhZGRpbmctYm90dG9tOiAxMnB4O1xuICAgIH1cbiAgICAuZmlsdGVyIG1hdC1jaGlwIHtcbiAgICAgICAgbWFyZ2luOiA0cHg7XG4gICAgfVxuICAgIC5jZ3JvdXAge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgIH1cbiAgICBtYXQtY2hpcC5zZWxlY3RlZCB7XG4gICAgICAgIGNvbG9yOiAjZmZmO1xuICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICB9XG4gICAgc3Bhbi5ncm91cC1zdGFydCxcbiAgICBzcGFuLmdyb3VwLWVuZCB7XG4gICAgICAgIGZvbnQtc2l6ZTogMjVweDtcbiAgICB9XG4gICAgYnV0dG9uLmJpdHdpc2Uge1xuICAgICAgICBtaW4td2lkdGg6IDI0cHg7XG4gICAgICAgIHBhZGRpbmctbGVmdDogMDtcbiAgICAgICAgcGFkZGluZy1yaWdodDogMDtcbiAgICB9XG4gICAgYFxuICBdXG59KVxuXG5leHBvcnQgY2xhc3MgVFdBRmlsdGVyRWRpdG9yQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBJbnB1dCgpIG9wdGlvbnM6IEZpbHRlckVkaXRvck9wdGlvbnM7XG4gICAgQElucHV0KCkgY29uZmlnOiBGaWx0ZXJFZGl0b3JDb25maWc7XG4gICAgQE91dHB1dCgpIGNoYW5nZTogRXZlbnRFbWl0dGVyPGFueVtdPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55W10+KCk7XG5cbiAgICBAVmlld0NoaWxkKCdmaWxlU2V0Jywge3N0YXRpYzogdHJ1ZX0pIGZpbGVTZXQ6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZCgnb2VwbkZpbHRlcnNGaWxlJywge3N0YXRpYzogdHJ1ZX0pIG9wZW5GaWx0ZXJzRmlsZTogRWxlbWVudFJlZjtcblxuICAgIGZpbHRlck9wdGlvbnM6IEZpbHRlckVkaXRvck9wdGlvbnM7XG4gICAgc2VsZWN0ZWRGaWVsZCA9ICdub25lJztcbiAgICBzZWxlY3RlZFZhbHVlID0gJyc7XG4gICAgb3BlcmF0aW9uID0gJ2NvbnRhaW4nO1xuICAgIGFjdGl2ZUZpbHRlcnM6IEZpZWxkRmlsdGVyW10gPSBbXTtcbiAgICBlZGl0aW5nID0gZmFsc2U7XG4gICAgdGV4dHMgPSB7XG4gICAgICAgIGZpbHRlckJ5OiAnRmlsdGVyIGJ5Li4uJyxcbiAgICAgICAgZmlsdGVyOiAnZmlsdGVyJyxcbiAgICAgICAgZ3JvdXA6ICdHcm91cCcsXG4gICAgICAgIHVuZ3JvdXA6ICdVbmdyb3VwJyxcbiAgICAgICAgbW92ZUxlZnQ6ICdNb3ZlIHRvIGxlZnQnLFxuICAgICAgICBtb3ZlUmlnaHQ6ICdNb3ZlIHRvIHJpZ2h0JyxcbiAgICAgICAgb3BlbkZpbHRlcjogJ09wZW4gc2F2ZWQgZmlsdGVyJyxcbiAgICAgICAgc2F2ZUZpbHRlcjogJ1NhdmUgZmlsdGVyJyxcbiAgICAgICAgY2xlYXJTZWxlY3Rpb246ICdDbGVhciBzZWxlY3Rpb24nLFxuICAgICAgICBjbGVhckFsbDogJ0NsZWFyIGZpbHRlcnMnLFxuXG4gICAgfTtcbiAgICBvcGVyYXRpb25zOiBhbnkgPSB7XG4gICAgICAgIGNvbnRhaW46ICc9PicsXG4gICAgICAgIGVxdWFsOiAnPT09JyxcbiAgICAgICAgZ3JlYXRlckVxdWFsOiAnPj0nLFxuICAgICAgICBncmVhdGVyOiAnPicsXG4gICAgICAgIGxlc3NFcXVhbDogJzw9JyxcbiAgICAgICAgbGVzczogJzwnLFxuICAgICAgICBpbjogJ2luJyxcbiAgICB9O1xuICAgIG9wZXJhdGlvbnNEYXRhID0gW1xuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnY29udGFpbicsXG4gICAgICAgICAgICBsYWJlbDogJ2NvbnRhaW5zJyxcbiAgICAgICAgICAgIG9wZXJhdG9yOiAnPT4nXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdlcXVhbCcsXG4gICAgICAgICAgICBsYWJlbDogJ2VxdWFscycsXG4gICAgICAgICAgICBvcGVyYXRvcjogJz09PSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2dyZWF0ZXJFcXVhbCcsXG4gICAgICAgICAgICBsYWJlbDogJ2dyZWF0ZXIgb3IgZXF1YWwnLFxuICAgICAgICAgICAgb3BlcmF0b3I6ICc+PSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2dyZWF0ZXInLFxuICAgICAgICAgICAgbGFiZWw6ICdncmVhdGVyJyxcbiAgICAgICAgICAgIG9wZXJhdG9yOiAnPidcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2xlc3NFcXVhbCcsXG4gICAgICAgICAgICBsYWJlbDogJ2xlc3Mgb3IgZXF1YWwnLFxuICAgICAgICAgICAgb3BlcmF0b3I6ICc8PSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2xlc3MnLFxuICAgICAgICAgICAgbGFiZWw6ICdsZXNzJyxcbiAgICAgICAgICAgIG9wZXJhdG9yOiAnPCdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2luJyxcbiAgICAgICAgICAgIGxhYmVsOiAnaW4nLFxuICAgICAgICAgICAgb3BlcmF0b3I6ICdpbidcbiAgICAgICAgfSxcbiAgICBdO1xuXG4gICAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6a2V5ZG93bicsIFsnJGV2ZW50J10pXG4gICAgaGFuZGxlS2V5Ym9hcmRFdmVudChldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgLy8gaWYgKChldmVudC5rZXkgPT09ICdjJyAmJiBldmVudC5jdHJsS2V5KSkge1xuICAgICAgLy8gICAgIHRoaXMuY2xlYXJGaWx0ZXJzKCk7XG4gICAgICAvLyB9IGVsc2UgaWYgKHRoaXMuZWRpdGluZyAmJiBldmVudC5rZXlDb2RlID09PSAxMykge1xuICAgICAgLy8gICAgIHRoaXMuYWRkRmlsdGVyKCk7XG4gICAgICAvLyB9XG4gICAgICBpZiAodGhpcy5lZGl0aW5nICYmIGV2ZW50LmtleUNvZGUgPT09IDEzKSB7XG4gICAgICAgIHRoaXMuYWRkRmlsdGVyKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgb3BlbkZpbHRlcnMoKSB7XG4gICAgICAgIGNvbnN0IGZpbGVPYmogPSAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29wZW5GaWx0ZXJzRmlsZScpKS5maWxlc1swXTtcbiAgICAgICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgICAgcmVhZGVyLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlYWRlci5yZXN1bHQpO1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UoPHN0cmluZz5yZWFkZXIucmVzdWx0KTtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlRmlsdGVycyA9IGRhdGE7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMuYWN0aXZlRmlsdGVycyk7XG4gICAgICAgIH07XG4gICAgICAgIHJlYWRlci5yZWFkQXNUZXh0KGZpbGVPYmopO1xuICAgIH1cblxuICAgIHNhdmVGaWx0ZXJzKCkge1xuICAgICAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW0pTT04uc3RyaW5naWZ5KHRoaXMuYWN0aXZlRmlsdGVycyldLCB7IHR5cGU6ICd0ZXh0L2pzb24nIH0pO1xuICAgICAgICBjb25zdCBmaWxlbmFtZSA9ICdmaWx0ZXJzLmpzb24nO1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICBlbGVtZW50LmhyZWYgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgICAgICAgZWxlbWVudC5kb3dubG9hZCA9IGZpbGVuYW1lO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgICAgICBlbGVtZW50LmNsaWNrKCk7XG4gICAgfVxuXG4gICAgY2hlY2tGaWx0ZXIoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAodGhpcy5zZWxlY3RlZEZpZWxkID09PSAnbm9uZScgfHwgdGhpcy5zZWxlY3RlZFZhbHVlID09PSAnJyk7XG4gICAgfVxuXG4gICAgc2VuZEZpbHRlcigpIHtcbiAgICAgICAgdGhpcy5hZGRGaWx0ZXIoKTtcbiAgICB9XG5cbiAgICBhZGRGaWx0ZXIoKSB7XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2FkZGluZyBmaWx0ZXIuLi4nKTtcblxuICAgICAgICBsZXQgY29sb3IgPSAnJyxcbiAgICAgICAgICAgIGZpZWxkID0gJycsXG4gICAgICAgICAgICBkYmZpZWxkID0gJycsXG4gICAgICAgICAgICBsYWJlbCA9ICcnLFxuICAgICAgICAgICAgbmFtZSA9ICcnLFxuICAgICAgICAgICAgZXhwbGFuYXRpb24gPSB0aGlzLnNlbGVjdGVkRmllbGQgKyAnICcgKyB0aGlzLm9wZXJhdGlvbnNbdGhpcy5vcGVyYXRpb25dICsgJyAnICsgdGhpcy5zZWxlY3RlZFZhbHVlO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gdGhpcy5maWx0ZXJPcHRpb25zLmZpZWxkcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmZpbHRlck9wdGlvbnMuZmllbGRzW2ldLm5hbWUgPT09IHRoaXMuc2VsZWN0ZWRGaWVsZCkge1xuICAgICAgICAgICAgICAgIC8vIGNvbG9yID0gdGhpcy5maWx0ZXJPcHRpb25zLmZpZWxkc1tpXS5jb2xvcjtcbiAgICAgICAgICAgICAgICAvLyBmaWVsZCA9IHRoaXMuZmlsdGVyT3B0aW9ucy5maWVsZHNbaV0uZmllbGQ7XG4gICAgICAgICAgICAgICAgLy8gbGFiZWwgPSB0aGlzLmZpbHRlck9wdGlvbnMuZmllbGRzW2ldLmxhYmVsO1xuICAgICAgICAgICAgICAgIC8vIG5hbWUgPSB0aGlzLmZpbHRlck9wdGlvbnMuZmllbGRzW2ldLm5hbWU7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogLi4ud2l0aCBvYmplY3QgZGVzdHJ1Y3R1cmluZ1xuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICh7IGNvbG9yLCBmaWVsZCwgZGJmaWVsZCwgbGFiZWwsIG5hbWUgfSA9IHRoaXMuZmlsdGVyT3B0aW9ucy5maWVsZHNbaV0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wZXJhdGlvbiA9PT0gJ2luJykge1xuICAgICAgICAgICAgZXhwbGFuYXRpb24gPSB0aGlzLnNlbGVjdGVkRmllbGQgKyAnICcgKyB0aGlzLm9wZXJhdGlvbnNbdGhpcy5vcGVyYXRpb25dICsgJyAoLi4uKSc7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5vcGVyYXRpb24gPT09ICdjb250YWluJykge1xuICAgICAgICAgICAgLy8gZXhwbGFuYXRpb24gPSB0aGlzLnNlbGVjdGVkRmllbGQgKyAnICcgKyB0aGlzLm9wZXJhdGlvbnNbdGhpcy5vcGVyYXRpb25dICsgJyAnICsgdGhpcy5zZWxlY3RlZFZhbHVlO1xuICAgICAgICAgICAgZXhwbGFuYXRpb24gPSAnXCInICsgdGhpcy5zZWxlY3RlZFZhbHVlICsgJ1wiICcgKyB0aGlzLm9wZXJhdGlvbnNbdGhpcy5vcGVyYXRpb25dICsgJyAnICsgdGhpcy5zZWxlY3RlZEZpZWxkO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYWN0aXZlRmlsdGVycy5wdXNoKHtcbiAgICAgICAgICAgIGNvbG9yOiBjb2xvcixcbiAgICAgICAgICAgIGV4cGxhbmF0aW9uOiBleHBsYW5hdGlvbixcbiAgICAgICAgICAgIGxhYmVsOiBsYWJlbCxcbiAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICBmaWVsZDogZmllbGQsXG4gICAgICAgICAgICBkYmZpZWxkOiBkYmZpZWxkLFxuICAgICAgICAgICAgYml0d2lzZTogJyYmJyxcbiAgICAgICAgICAgIG9wZXJhdGlvbjogdGhpcy5vcGVyYXRpb25zW3RoaXMub3BlcmF0aW9uXSxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnNlbGVjdGVkVmFsdWVcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRWYWx1ZSA9ICcnO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmFjdGl2ZUZpbHRlcnMpO1xuICAgICAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMuYWN0aXZlRmlsdGVycyk7XG4gICAgfVxuXG4gICAgc2VsZWN0RmlsdGVyKGZpbHRlcjogRmllbGRGaWx0ZXIpIHtcbiAgICAgICAgZmlsdGVyLnNlbGVjdGVkID0gIWZpbHRlci5zZWxlY3RlZDtcbiAgICAgICAgY29uc3QgZ3JvdXAgPSB0aGlzLmdldFBhcmVudEZpbHRlcihmaWx0ZXIpO1xuICAgICAgICBpZiAoZ3JvdXApIHtcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZEFsbCA9IHRydWU7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGdyb3VwLmZpZWxkcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0bXBmaWx0ZXIgPSBncm91cC5maWVsZHNbaV07XG4gICAgICAgICAgICAgICAgaWYgKCF0bXBmaWx0ZXIuaXNncm91cCAmJiAhdG1wZmlsdGVyLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkQWxsID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkQWxsKSB7XG4gICAgICAgICAgICAgICAgZ3JvdXAuc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0UGFyZW50RmlsdGVyKGZpbHRlcjogRmllbGRGaWx0ZXIpOiBGaWVsZEZpbHRlciB8IG51bGwge1xuICAgICAgICBjb25zdCBnZXRQYXJlbnRGaWx0ZXJJbkdyb3VwID0gKGdyb3VwOiBGaWVsZEZpbHRlciwgZmlsdGVyMjogRmllbGRGaWx0ZXIpOiBGaWVsZEZpbHRlciB8IG51bGwgPT4ge1xuICAgICAgICAgICAgcmV0ID0gbnVsbDtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBncm91cC5maWVsZHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdG1wZmlsdGVyID0gZ3JvdXAuZmllbGRzW2ldO1xuICAgICAgICAgICAgICAgIGlmIChKU09OLnN0cmluZ2lmeSh0bXBmaWx0ZXIpID09PSBKU09OLnN0cmluZ2lmeShmaWx0ZXIyKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ3JvdXA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0bXBmaWx0ZXIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgICAgICByZXQgPSBnZXRQYXJlbnRGaWx0ZXJJbkdyb3VwKHRtcGZpbHRlciwgZmlsdGVyMik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICB9O1xuICAgICAgICBsZXQgcmV0ID0gbnVsbDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSB0aGlzLmFjdGl2ZUZpbHRlcnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCB0bXBmaWx0ZXIgPSB0aGlzLmFjdGl2ZUZpbHRlcnNbaV07XG4gICAgICAgICAgICBpZiAoSlNPTi5zdHJpbmdpZnkodG1wZmlsdGVyKSA9PT0gSlNPTi5zdHJpbmdpZnkoZmlsdGVyKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0bXBmaWx0ZXIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgIHJldCA9IGdldFBhcmVudEZpbHRlckluR3JvdXAodG1wZmlsdGVyLCBmaWx0ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG5cbiAgICBhcnJheU1vdmUgPSAoYXJyOiBhbnlbXSwgb2xkSW5kZXg6IG51bWJlciwgbmV3SW5kZXg6IG51bWJlcik6IGFueVtdID0+IHtcbiAgICAgICAgaWYgKG5ld0luZGV4ID4gYXJyLmxlbmd0aCkge1xuICAgICAgICAgICAgbGV0IGsgPSBuZXdJbmRleCAtIGFyci5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoay0tKSB7XG4gICAgICAgICAgICAgICAgYXJyLnB1c2godW5kZWZpbmVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBhcnIuc3BsaWNlKG5ld0luZGV4LCAwLCBhcnIuc3BsaWNlKG9sZEluZGV4LCAxKVswXSk7XG4gICAgICAgIHJldHVybiBhcnI7XG4gICAgfVxuXG4gICAgbW92ZVRvKGRpcmVjdGlvbjogbnVtYmVyKSB7XG4gICAgICAgIGxldCBpZHggPSAtMSxcbiAgICAgICAgICAgIHRvSWR4ID0gLTEsXG4gICAgICAgICAgICBncm91cCA9IC0xO1xuICAgICAgICAvLyBTZWFyY2hpbmcgdGhlIHNlbGVjdGVkIGZpbHRlci4uLlxuICAgICAgICB0aGlzLmFjdGl2ZUZpbHRlcnMuZm9yRWFjaCgoZmlsdGVyLCB0bXBpZHgpID0+IHtcbiAgICAgICAgICAgIGlmIChmaWx0ZXIuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICBpZHggPSB0bXBpZHg7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChmaWx0ZXIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgIGZpbHRlci5maWVsZHMuZm9yRWFjaCgoZmlsdGVyMiwgdG1waWR4MikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyMi5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWR4ID0gdG1waWR4MjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwID0gdG1waWR4O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChpZHggPj0gMCkge1xuXG4gICAgICAgICAgICBpZiAoZ3JvdXAgPj0gMCkge1xuICAgICAgICAgICAgICAgIHRvSWR4ID0gKGlkeCArIGRpcmVjdGlvbikgPj0gMCA/IGlkeCArIGRpcmVjdGlvbiA6IHRoaXMuYWN0aXZlRmlsdGVyc1tncm91cF0uZmllbGRzLmxlbmd0aCArIGRpcmVjdGlvbjtcbiAgICAgICAgICAgICAgICBpZiAodG9JZHggPj0gdGhpcy5hY3RpdmVGaWx0ZXJzW2dyb3VwXS5maWVsZHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvSWR4ID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVGaWx0ZXJzW2dyb3VwXS5maWVsZHMgPSB0aGlzLmFycmF5TW92ZSh0aGlzLmFjdGl2ZUZpbHRlcnNbZ3JvdXBdLmZpZWxkcywgaWR4LCB0b0lkeCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRvSWR4ID0gKGlkeCArIGRpcmVjdGlvbikgPj0gMCA/IGlkeCArIGRpcmVjdGlvbiA6IHRoaXMuYWN0aXZlRmlsdGVycy5sZW5ndGggKyBkaXJlY3Rpb247XG4gICAgICAgICAgICAgICAgaWYgKHRvSWR4ID49IHRoaXMuYWN0aXZlRmlsdGVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9JZHggPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUZpbHRlcnMgPSB0aGlzLmFycmF5TW92ZSh0aGlzLmFjdGl2ZUZpbHRlcnMsIGlkeCwgdG9JZHgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMuYWN0aXZlRmlsdGVycyk7XG5cbiAgICB9XG5cbiAgICBnZXRTZWxlY3RlZCgpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBnZXRJbkdyb3VwID0gKGdyb3VwOiBGaWVsZEZpbHRlcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGdyb3VwLmZpZWxkcy5yZWR1Y2UoKGFjYzIsIGZpbHRlcikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgICAgICBhY2MyICs9IGdldEluR3JvdXAoZmlsdGVyKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZpbHRlci5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICBhY2MyKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBhY2MyO1xuICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLmFjdGl2ZUZpbHRlcnMucmVkdWNlKChhY2MsIGZpbHRlcikgPT4ge1xuICAgICAgICAgICAgaWYgKGZpbHRlci5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgYWNjICs9IGdldEluR3JvdXAoZmlsdGVyKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZmlsdGVyLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgYWNjKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICB9LCAwKTtcblxuICAgIH1cblxuICAgIGNsZWFyU2VsZWN0aW9uKCk6IHZvaWQge1xuXG4gICAgICAgIGNvbnN0IGNsZWFyU2VsZWN0aW9uSW5Hcm91cCA9IChncm91cCkgPT4ge1xuICAgICAgICAgICAgZ3JvdXAuZmllbGRzLmZvckVhY2goKGZpbHRlcikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgICAgICBmaWx0ZXIgPSBjbGVhclNlbGVjdGlvbkluR3JvdXAoZmlsdGVyKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmaWx0ZXIuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIGdyb3VwO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuYWN0aXZlRmlsdGVycyA9IHRoaXMuYWN0aXZlRmlsdGVycy5tYXAoKGZpbHRlcikgPT4ge1xuICAgICAgICAgICAgaWYgKGZpbHRlci5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgZmlsdGVyID0gY2xlYXJTZWxlY3Rpb25Jbkdyb3VwKGZpbHRlcik7XG4gICAgICAgICAgICAgICAgLy8gZmlsdGVyLmZpZWxkcyA9IGZpbHRlci5maWVsZHMubWFwKChmaWx0ZXIyKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gICAgIGZpbHRlcjIuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAvLyAgICAgcmV0dXJuIGZpbHRlcjI7XG4gICAgICAgICAgICAgICAgLy8gfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaWx0ZXIuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiBmaWx0ZXI7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgY2hhbmdlQml0d2lzZShmaWx0ZXI6IEZpZWxkRmlsdGVyLCBiaXR3aXNlKSB7XG4gICAgICAgIGZpbHRlci5iaXR3aXNlID0gYml0d2lzZTtcbiAgICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh0aGlzLmFjdGl2ZUZpbHRlcnMpO1xuICAgIH1cblxuICAgIGdyb3VwU2VsZWN0ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IGdyb3VwU2VsZWN0ZWRJbkdyb3VwID0gKGZpbHRlcjogRmllbGRGaWx0ZXIpID0+IHtcbiAgICAgICAgICAgIGxldCByZXQyID0gMDtcbiAgICAgICAgICAgIGlmIChmaWx0ZXIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgIGZpbHRlci5maWVsZHMuZm9yRWFjaCgoZmlsdGVyMikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyMi5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXQyICs9IGdyb3VwU2VsZWN0ZWRJbkdyb3VwKGZpbHRlcjIpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlcjIuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXQyKys7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmV0MjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlci5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGdyb3VwcyA9IHRoaXMuYWN0aXZlRmlsdGVycy5maWx0ZXIoZmlsdGVyID0+IGZpbHRlci5pc2dyb3VwKTtcbiAgICAgICAgbGV0IHJldCA9IDA7XG4gICAgICAgIGdyb3Vwcy5mb3JFYWNoKChncm91cCkgPT4ge1xuICAgICAgICAgICAgZ3JvdXAuZmllbGRzLmZvckVhY2goZmlsdGVyID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0ICs9IGdyb3VwU2VsZWN0ZWRJbkdyb3VwKGZpbHRlcik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmaWx0ZXIuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0Kys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmV0ID4gMDtcbiAgICB9XG5cbiAgICBlbnRpcmVHcm91cFNlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCBlbnRpcmVHcm91cFNlbGVjdGVkSW5Hcm91cCA9IChncm91cDogRmllbGRGaWx0ZXIpID0+IHtcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZDIgPSB0cnVlO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGdyb3VwLmZpZWxkcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWx0ZXIgPSBncm91cC5maWVsZHNbaV07XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlci5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkMiA9IGVudGlyZUdyb3VwU2VsZWN0ZWRJbkdyb3VwKGZpbHRlcik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghZmlsdGVyLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkMiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzZWxlY3RlZDIgJiYgZ3JvdXAuZmllbGRzLmxlbmd0aCA+IDA7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGdyb3VwcyA9IHRoaXMuYWN0aXZlRmlsdGVycy5maWx0ZXIoZmlsdGVyID0+IGZpbHRlci5pc2dyb3VwKTtcbiAgICAgICAgbGV0IHNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgZm9yIChsZXQgaWcgPSAwLCBsZyA9IGdyb3Vwcy5sZW5ndGg7IGlnIDwgbGc7IGlnKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwID0gZ3JvdXBzW2lnXTtcbiAgICAgICAgICAgIGZvciAobGV0IGlnMiA9IDAsIGxnMiA9IGdyb3VwLmZpZWxkcy5sZW5ndGg7IGlnMiA8IGxnMjsgaWcyKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWx0ZXIgPSBncm91cC5maWVsZHNbaWcyXTtcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSBlbnRpcmVHcm91cFNlbGVjdGVkSW5Hcm91cChmaWx0ZXIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghZmlsdGVyLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ3JvdXAuZmllbGRzLmZvckVhY2goZmlsdGVyID0+IHtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZ3JvdXBzLmZvckVhY2goKGdyb3VwKSA9PiB7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc2VsZWN0ZWQgJiYgZ3JvdXBzLmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgY3JlYXRlR3JvdXAoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGNyZWF0ZUluR3JvdXAgPSAoZmlsdGVyOiBGaWVsZEZpbHRlcikgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWQyID0gZmlsdGVyLmZpZWxkcy5maWx0ZXIoZmlsdGVyMiA9PiBmaWx0ZXIyLnNlbGVjdGVkKSxcbiAgICAgICAgICAgIGdyb3VwUG9zaXRpb24yID0gZmlsdGVyLmZpZWxkcy5maW5kSW5kZXgodiA9PiB2LnNlbGVjdGVkKTtcbiAgICAgICAgICAgIGxldCByZXN1bHRGaWx0ZXIyOiBGaWVsZEZpbHRlcltdO1xuICAgICAgICAgICAgaWYgKHNlbGVjdGVkMi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRGaWx0ZXIyID0gZmlsdGVyLmZpZWxkcy5maWx0ZXIoZmlsdGVyMiA9PiAhZmlsdGVyMi5zZWxlY3RlZCk7XG4gICAgICAgICAgICAgICAgcmVzdWx0RmlsdGVyMi5zcGxpY2UoZ3JvdXBQb3NpdGlvbjIsIDAsIHtcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcnLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgZmllbGQ6ICcnLFxuICAgICAgICAgICAgICAgICAgICBpc2dyb3VwOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBiaXR3aXNlOiAnJiYnLFxuICAgICAgICAgICAgICAgICAgICBmaWVsZHM6IHNlbGVjdGVkMlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHRGaWx0ZXIyID0gZmlsdGVyLmZpZWxkcy5tYXAoZmlsdGVyMiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZUluR3JvdXAoZmlsdGVyMik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZpbHRlcjI7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaWx0ZXIuZmllbGRzID0gcmVzdWx0RmlsdGVyMjtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMuYWN0aXZlRmlsdGVycy5maWx0ZXIoZmlsdGVyID0+IGZpbHRlci5zZWxlY3RlZCksXG4gICAgICAgICAgICAgIGdyb3VwUG9zaXRpb24gPSB0aGlzLmFjdGl2ZUZpbHRlcnMuZmluZEluZGV4KHYgPT4gdi5zZWxlY3RlZCk7XG4gICAgICAgIGxldCByZXN1bHRGaWx0ZXI6IEZpZWxkRmlsdGVyW107XG4gICAgICAgIGlmIChzZWxlY3RlZC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJlc3VsdEZpbHRlciA9IHRoaXMuYWN0aXZlRmlsdGVycy5maWx0ZXIoZmlsdGVyID0+ICFmaWx0ZXIuc2VsZWN0ZWQpO1xuICAgICAgICAgICAgcmVzdWx0RmlsdGVyLnNwbGljZShncm91cFBvc2l0aW9uLCAwLCB7XG4gICAgICAgICAgICAgICAgY29sb3I6ICcnLFxuICAgICAgICAgICAgICAgIG5hbWU6ICcnLFxuICAgICAgICAgICAgICAgIGZpZWxkOiAnJyxcbiAgICAgICAgICAgICAgICBpc2dyb3VwOiB0cnVlLFxuICAgICAgICAgICAgICAgIGJpdHdpc2U6ICcmJicsXG4gICAgICAgICAgICAgICAgZmllbGRzOiBzZWxlY3RlZFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUZpbHRlcnMgPSByZXN1bHRGaWx0ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHRGaWx0ZXIgPSB0aGlzLmFjdGl2ZUZpbHRlcnMubWFwKGZpbHRlciA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlci5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUluR3JvdXAoZmlsdGVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpbHRlcjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh0aGlzLmFjdGl2ZUZpbHRlcnMpO1xuICAgIH1cblxuICAgIHNhbml0aXplR3JvdXBzKCkge1xuICAgICAgICBjb25zdCBzYW5pdGl6ZUdyb3Vwc0luR3JvdXAgPSAoZ3JvdXAsIHBhcmVudD86IEZpZWxkRmlsdGVyKSA9PiB7XG4gICAgICAgICAgICBncm91cC5maWVsZHMubWFwKChmaWx0ZXI6IEZpZWxkRmlsdGVyLCBpZHg6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLmZpZWxkcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwLmZpZWxkcy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmaWx0ZXIuZmllbGRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ3JvdXAuZmllbGRzLnB1c2goey4uLmZpbHRlci5maWVsZHNbMF19KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwLmZpZWxkcy5zcGxpY2UoaWR4LCAxLCB7Li4uZmlsdGVyLmZpZWxkc1swXX0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2FuaXRpemVHcm91cHNJbkdyb3VwKGZpbHRlciwgZ3JvdXApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYWN0aXZlRmlsdGVycy5tYXAoKGZpbHRlcjogRmllbGRGaWx0ZXIsIGlkeDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBpZiAoZmlsdGVyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLmZpZWxkcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVGaWx0ZXJzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZmlsdGVyLmZpZWxkcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5hY3RpdmVGaWx0ZXJzLnB1c2goey4uLmZpbHRlci5maWVsZHNbMF19KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVGaWx0ZXJzLnNwbGljZShpZHgsIDEsIHsuLi5maWx0ZXIuZmllbGRzWzBdfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzYW5pdGl6ZUdyb3Vwc0luR3JvdXAoZmlsdGVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbW92ZUZyb21Hcm91cCgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgcmVtb3ZlRnJvbUdyb3VwSW5Hcm91cCA9IChncm91cDogRmllbGRGaWx0ZXIsIHBhcmVudDogRmllbGRGaWx0ZXIsIGlkeCkgPT4ge1xuICAgICAgICAgICAgZ3JvdXAuZmllbGRzLmZvckVhY2goKGZpbHRlcjIsIGlkeDIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyMi5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUZyb21Hcm91cEluR3JvdXAoZmlsdGVyMiwgZ3JvdXAsIGlkeDIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3QgdG1wRmlsdGVycyA9IGdyb3VwLmZpZWxkcy5maWx0ZXIoKGZpbHRlcjI6IEZpZWxkRmlsdGVyKSA9PiBmaWx0ZXIyLnNlbGVjdGVkKTtcbiAgICAgICAgICAgIGdyb3VwLmZpZWxkcyA9IGdyb3VwLmZpZWxkcy5maWx0ZXIoKGZpbHRlcjI6IEZpZWxkRmlsdGVyKSA9PiAhZmlsdGVyMi5zZWxlY3RlZCk7XG4gICAgICAgICAgICB0bXBGaWx0ZXJzLmZvckVhY2goKHY6IEZpZWxkRmlsdGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgdi5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHBhcmVudC5maWVsZHMucHVzaCh2KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGdyb3VwLmZpZWxkcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBwYXJlbnQuZmllbGRzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuYWN0aXZlRmlsdGVycyA9IHRoaXMuYWN0aXZlRmlsdGVycy5yZWR1Y2UoKG5ld0ZpbHRlcnMsIGZpbHRlcikgPT4ge1xuICAgICAgICAgICAgaWYgKGZpbHRlci5pc2dyb3VwKSB7XG5cbiAgICAgICAgICAgICAgICBmaWx0ZXIuZmllbGRzLmZvckVhY2goKGZpbHRlcjIsIGlkeCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyMi5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVGcm9tR3JvdXBJbkdyb3VwKGZpbHRlcjIsIGZpbHRlciwgaWR4KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgdG1wRmlsdGVycyA9IGZpbHRlci5maWVsZHMuZmlsdGVyKGZpbHRlcjIgPT4gZmlsdGVyMi5zZWxlY3RlZCk7XG4gICAgICAgICAgICAgICAgZmlsdGVyLmZpZWxkcyA9IGZpbHRlci5maWVsZHMuZmlsdGVyKGZpbHRlcjIgPT4gIWZpbHRlcjIuc2VsZWN0ZWQpO1xuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIuZmllbGRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBuZXdGaWx0ZXJzLnB1c2goZmlsdGVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdG1wRmlsdGVycy5mb3JFYWNoKHYgPT4ge1xuICAgICAgICAgICAgICAgICAgICBuZXdGaWx0ZXJzLnB1c2godik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5ld0ZpbHRlcnMucHVzaChmaWx0ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ld0ZpbHRlcnM7XG4gICAgICAgIH0sIFtdKTtcbiAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICB0aGlzLnNhbml0aXplR3JvdXBzKCk7XG4gICAgICAgIHRoaXMuY2hhbmdlLmVtaXQodGhpcy5hY3RpdmVGaWx0ZXJzKTtcbiAgICB9XG5cbiAgICBvblN0YXJ0RHJhZ0ZpbHRlcihfZXZlbnQsIF9maWx0ZXIpIHtcbiAgICB9XG5cbiAgICBvbkRyb3BwZWRGaWx0ZXIoZXZlbnQpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdkcm9wcGVkJyk7XG4gICAgICB0aGlzLmFycmF5TW92ZSh0aGlzLmFjdGl2ZUZpbHRlcnMsIGV2ZW50LnByZXZpb3VzSW5kZXgsIGV2ZW50LmN1cnJlbnRJbmRleCk7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmFjdGl2ZUZpbHRlcnMpO1xuICAgICAgICAvLyB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgIHRoaXMuc2FuaXRpemVHcm91cHMoKTtcbiAgICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh0aGlzLmFjdGl2ZUZpbHRlcnMpO1xuICAgIH1cblxuICAgIHVwbG9hZFNldCgpIHtcbiAgICAgICAgY29uc3QgZmlsZU9iaiA9ICg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlsZVNldCcpKS5maWxlc1swXTtcbiAgICAgICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgICAgcmVhZGVyLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGxpbmVzID0gKDxzdHJpbmc+cmVhZGVyLnJlc3VsdCkuc3BsaXQoL1xccj9cXG4vKS5maWx0ZXIodmFsID0+IHZhbCA+ICcnKTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRWYWx1ZSA9IGxpbmVzLmpvaW4oJywgJyk7XG4gICAgICAgICAgICB0aGlzLmZpbGVTZXQubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnO1xuICAgICAgICB9O1xuICAgICAgICByZWFkZXIucmVhZEFzVGV4dChmaWxlT2JqKTtcbiAgICB9XG5cbiAgICByZW1vdmVGaWx0ZXIoZmlsdGVyOiBGaWVsZEZpbHRlcik6IHZvaWQge1xuICAgICAgICAvLyBjb25zdCByZW1vdmVGaWx0ZXJJbkdyb3VwID0gKGdyb3VwLCBmaWx0ZXIpID0+IHtcblxuICAgICAgICAvLyB9O1xuICAgICAgICBjb25zdCBwYXJlbnQgPSB0aGlzLmdldFBhcmVudEZpbHRlcihmaWx0ZXIpO1xuICAgICAgICBsZXQgZ3JvdXA6IEZpZWxkRmlsdGVyW107XG4gICAgICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgICAgIGdyb3VwID0gcGFyZW50LmZpZWxkcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdyb3VwID0gdGhpcy5hY3RpdmVGaWx0ZXJzO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gZ3JvdXAubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoSlNPTi5zdHJpbmdpZnkoZ3JvdXBbaV0pID09PSBKU09OLnN0cmluZ2lmeShmaWx0ZXIpKSB7XG4gICAgICAgICAgICAgICAgZ3JvdXAuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2FuaXRpemVHcm91cHMoKTtcbiAgICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh0aGlzLmFjdGl2ZUZpbHRlcnMpO1xuICAgIH1cblxuICAgIGNsZWFyRmlsdGVycygpIHtcbiAgICAgICAgdGhpcy5hY3RpdmVGaWx0ZXJzID0gW107XG4gICAgICAgIHRoaXMuY2hhbmdlLmVtaXQodGhpcy5hY3RpdmVGaWx0ZXJzKTtcbiAgICB9XG5cbiAgICBvbkZvY3VzKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZWRpdGluZyA9IHRydWU7XG4gICAgfVxuXG4gICAgb25CbHVyKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZWRpdGluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmZpbHRlck9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRGaWVsZCA9ICh0eXBlb2YgdGhpcy5maWx0ZXJPcHRpb25zLmZpZWxkc1swXSAhPT0gJ3VuZGVmaW5lZCcpID8gdGhpcy5maWx0ZXJPcHRpb25zLmZpZWxkc1swXS5uYW1lIDogJ25vbmUnO1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuY29uZmlnICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZyAmJiB0eXBlb2YgdGhpcy5jb25maWcub3BlcmF0aW9uc0RhdGEgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcGVyYXRpb25zRGF0YSA9IHRoaXMuY29uZmlnLm9wZXJhdGlvbnNEYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnICYmIHR5cGVvZiB0aGlzLmNvbmZpZy5maWx0ZXIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVGaWx0ZXJzID0gdGhpcy5jb25maWcuZmlsdGVyLnNsaWNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5jb25maWcgJiYgdHlwZW9mIHRoaXMuY29uZmlnLnRleHRzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHRoaXMudGV4dHMgPSB7Li4udGhpcy50ZXh0cywgLi4udGhpcy5jb25maWcudGV4dHN9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHRoaXMuZmlsdGVyT3B0aW9ucyA9IEpTT04ucGFyc2UodGhpcy5vcHRpb25zKTtcbiAgICB9XG59XG4iXX0=