/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
                ({ color, field, label, name } = this.filterOptions.fields[i]);
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
            if (typeof this.config.operationsData !== 'undefined') {
                this.operationsData = this.config.operationsData;
            }
            if (typeof this.config.filter !== 'undefined') {
                this.activeFilters = this.config.filter.slice();
            }
        }
        // this.filterOptions = JSON.parse(this.options);
    }
}
TWAFilterEditorComponent.decorators = [
    { type: Component, args: [{
                selector: 'twa-md2-filter-editor',
                template: `<div fxLayout="row" fxLayoutGap="20px">
    <div fxLayout="column" fxFlex>
        <div class="selector" fxLayout="row" fxLayoutGap="10px">
            <mat-form-field>
                <mat-select [(ngModel)]="selectedField">
                    <mat-option selected value="none">Filtrar por...</mat-option>
                    <mat-option *ngFor="let field of filterOptions.fields" [(value)]="field.name">{{field.label}}</mat-option>
                </mat-select>
            </mat-form-field>
            <mat-form-field>
                <mat-select [(ngModel)]="operation">
                    <mat-option *ngFor="let op of operationsData" value="{{op.type}}">{{op.label}}</mat-option>
                </mat-select>
            </mat-form-field>
            <mat-form-field>
                <input matInput placeholder="filtro" [(ngModel)]="selectedValue"
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
            <div fxFlex>&nbsp;</div>
            <div class="tools" *ngIf="activeFilters.length > 0" fxLayout="row">
                <button mat-button mat-icon-button
                    matTooltip="Agrupar"
                    (click)="createGroup()"
                    [disabled]="getSelected() < 2">
                    <mat-icon>link</mat-icon>
                </button>
                <button mat-button mat-icon-button
                    matTooltip="Desagrupar"
                    (click)="removeFromGroup()"
                    [disabled]="!groupSelected()">
                    <mat-icon>link_off</mat-icon>
                </button>
                <button mat-button mat-icon-button
                    matTooltip="Mover a la izquierda"
                    (click)="moveTo(-1)"
                    [disabled]="getSelected() !== 1 && !entireGroupSelected()">
                    <mat-icon>arrow_back</mat-icon>
                </button>
                <button mat-button mat-icon-button
                    matTooltip="Mover a la derecha"
                    (click)="moveTo(1)"
                    [disabled]="getSelected() !== 1 && !entireGroupSelected()">
                    <mat-icon>arrow_forward</mat-icon>
                </button>
                <button mat-button mat-icon-button
                    matTooltip="Limpiar selección"
                    [disabled]="getSelected() < 1"
                    (click)="clearSelection()">
                    <mat-icon>clear</mat-icon>
                </button>
                <button mat-button mat-icon-button
                        matTooltip="Limpiar filtros"
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
</div>
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
    TWAFilterEditorComponent.prototype.operations;
    /** @type {?} */
    TWAFilterEditorComponent.prototype.operationsData;
    /** @type {?} */
    TWAFilterEditorComponent.prototype.arrayMove;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdhLW1kMi1maWx0ZXItZWRpdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3R3YS1tZDItZmlsdGVyLWVkaXRvci8iLCJzb3VyY2VzIjpbImxpYi90d2EtbWQyLWZpbHRlci1lZGl0b3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEcsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQTZLN0MsTUFBTSxPQUFPLHdCQUF3QjtJQXNFakM7UUFsRVUsV0FBTSxHQUF3QixJQUFJLFlBQVksRUFBUyxDQUFDO1FBS2xFLGtCQUFhLEdBQUcsTUFBTSxDQUFDO1FBQ3ZCLGtCQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ25CLGNBQVMsR0FBRyxTQUFTLENBQUM7UUFDdEIsa0JBQWEsR0FBa0IsRUFBRSxDQUFDO1FBQ2xDLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsZUFBVSxHQUFRO1lBQ2QsT0FBTyxFQUFFLElBQUk7WUFDYixLQUFLLEVBQUUsS0FBSztZQUNaLFlBQVksRUFBRSxJQUFJO1lBQ2xCLE9BQU8sRUFBRSxHQUFHO1lBQ1osU0FBUyxFQUFFLElBQUk7WUFDZixJQUFJLEVBQUUsR0FBRztZQUNULEVBQUUsRUFBRSxJQUFJO1NBQ1gsQ0FBQztRQUNGLG1CQUFjLEdBQUc7WUFDYjtnQkFDSSxJQUFJLEVBQUUsU0FBUztnQkFDZixLQUFLLEVBQUUsVUFBVTtnQkFDakIsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRDtnQkFDSSxJQUFJLEVBQUUsT0FBTztnQkFDYixLQUFLLEVBQUUsUUFBUTtnQkFDZixRQUFRLEVBQUUsS0FBSzthQUNsQjtZQUNEO2dCQUNJLElBQUksRUFBRSxjQUFjO2dCQUNwQixLQUFLLEVBQUUsa0JBQWtCO2dCQUN6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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FzSVg7Z0JBQ0MsTUFBTSxFQUFFO29CQUNOOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0EyQkM7aUJBQ0Y7YUFDRjs7Ozs7c0JBSUksS0FBSztxQkFDTCxLQUFLO3FCQUNMLE1BQU07c0JBRU4sU0FBUyxTQUFDLFNBQVM7a0NBdURuQixZQUFZLFNBQUMsa0JBQWtCLEVBQUUsQ0FBQyxRQUFRLENBQUM7Ozs7SUEzRDVDLDJDQUFzQzs7SUFDdEMsMENBQW9DOztJQUNwQywwQ0FBa0U7O0lBRWxFLDJDQUEwQzs7SUFFMUMsaURBQW1DOztJQUNuQyxpREFBdUI7O0lBQ3ZCLGlEQUFtQjs7SUFDbkIsNkNBQXNCOztJQUN0QixpREFBa0M7O0lBQ2xDLDJDQUFnQjs7SUFDaEIsOENBUUU7O0lBQ0Ysa0RBb0NFOztJQXNHRiw2Q0FTQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEZpbHRlckVkaXRvck9wdGlvbnMsIEZpZWxkRmlsdGVyLCBGaWx0ZXJFZGl0b3JDb25maWcgfSBmcm9tICcuL3R3YS1tZDItZmlsdGVyLWVkaXRvci5pbnRlcmZhY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0d2EtbWQyLWZpbHRlci1lZGl0b3InLFxuICB0ZW1wbGF0ZTogYDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEdhcD1cIjIwcHhcIj5cbiAgICA8ZGl2IGZ4TGF5b3V0PVwiY29sdW1uXCIgZnhGbGV4PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic2VsZWN0b3JcIiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0R2FwPVwiMTBweFwiPlxuICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgICAgIDxtYXQtc2VsZWN0IFsobmdNb2RlbCldPVwic2VsZWN0ZWRGaWVsZFwiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LW9wdGlvbiBzZWxlY3RlZCB2YWx1ZT1cIm5vbmVcIj5GaWx0cmFyIHBvci4uLjwvbWF0LW9wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1vcHRpb24gKm5nRm9yPVwibGV0IGZpZWxkIG9mIGZpbHRlck9wdGlvbnMuZmllbGRzXCIgWyh2YWx1ZSldPVwiZmllbGQubmFtZVwiPnt7ZmllbGQubGFiZWx9fTwvbWF0LW9wdGlvbj5cbiAgICAgICAgICAgICAgICA8L21hdC1zZWxlY3Q+XG4gICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgICAgIDxtYXQtc2VsZWN0IFsobmdNb2RlbCldPVwib3BlcmF0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCBvcCBvZiBvcGVyYXRpb25zRGF0YVwiIHZhbHVlPVwie3tvcC50eXBlfX1cIj57e29wLmxhYmVsfX08L21hdC1vcHRpb24+XG4gICAgICAgICAgICAgICAgPC9tYXQtc2VsZWN0PlxuICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgcGxhY2Vob2xkZXI9XCJmaWx0cm9cIiBbKG5nTW9kZWwpXT1cInNlbGVjdGVkVmFsdWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKGZvY3VzKT1cIm9uRm9jdXMoJGV2ZW50KVwiIChibHVyKT1cIm9uQmx1cigkZXZlbnQpXCIgLz5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIG1hdC1idXR0b24gKm5nSWY9XCJvcGVyYXRpb249PT0naW4nXCIgbWF0U3VmZml4IG1hdC1pY29uLWJ1dHRvbiBhcmlhLWxhYmVsPVwiQ2xlYXJcIiAoY2xpY2spPVwiZmlsZVNldC5jbGljaygpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbj5hdHRhY2hfZmlsZTwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIG1hdC1idXR0b24gbWF0LWljb24tYnV0dG9uIChjbGljayk9XCJhZGRGaWx0ZXIoKVwiIFtkaXNhYmxlZF09XCJjaGVja0ZpbHRlcigpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbj5zZW5kPC9tYXQtaWNvbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBmeEZsZXg+Jm5ic3A7PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9vbHNcIiAqbmdJZj1cImFjdGl2ZUZpbHRlcnMubGVuZ3RoID4gMFwiIGZ4TGF5b3V0PVwicm93XCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBtYXQtYnV0dG9uIG1hdC1pY29uLWJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBtYXRUb29sdGlwPVwiQWdydXBhclwiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJjcmVhdGVHcm91cCgpXCJcbiAgICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImdldFNlbGVjdGVkKCkgPCAyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbj5saW5rPC9tYXQtaWNvbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIG1hdC1idXR0b24gbWF0LWljb24tYnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIG1hdFRvb2x0aXA9XCJEZXNhZ3J1cGFyXCJcbiAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cInJlbW92ZUZyb21Hcm91cCgpXCJcbiAgICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cIiFncm91cFNlbGVjdGVkKClcIj5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1pY29uPmxpbmtfb2ZmPC9tYXQtaWNvbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIG1hdC1idXR0b24gbWF0LWljb24tYnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIG1hdFRvb2x0aXA9XCJNb3ZlciBhIGxhIGl6cXVpZXJkYVwiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJtb3ZlVG8oLTEpXCJcbiAgICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImdldFNlbGVjdGVkKCkgIT09IDEgJiYgIWVudGlyZUdyb3VwU2VsZWN0ZWQoKVwiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWljb24+YXJyb3dfYmFjazwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBtYXQtYnV0dG9uIG1hdC1pY29uLWJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBtYXRUb29sdGlwPVwiTW92ZXIgYSBsYSBkZXJlY2hhXCJcbiAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm1vdmVUbygxKVwiXG4gICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJnZXRTZWxlY3RlZCgpICE9PSAxICYmICFlbnRpcmVHcm91cFNlbGVjdGVkKClcIj5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1pY29uPmFycm93X2ZvcndhcmQ8L21hdC1pY29uPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gbWF0LWJ1dHRvbiBtYXQtaWNvbi1idXR0b25cbiAgICAgICAgICAgICAgICAgICAgbWF0VG9vbHRpcD1cIkxpbXBpYXIgc2VsZWNjacOzblwiXG4gICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJnZXRTZWxlY3RlZCgpIDwgMVwiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJjbGVhclNlbGVjdGlvbigpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbj5jbGVhcjwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBtYXQtYnV0dG9uIG1hdC1pY29uLWJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgbWF0VG9vbHRpcD1cIkxpbXBpYXIgZmlsdHJvc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiYWN0aXZlRmlsdGVycy5sZW5ndGggPCAxXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJjbGVhckZpbHRlcnMoKVwiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWljb24+Y2xlYXJfYWxsPC9tYXQtaWNvbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZpbHRlclwiIGZ4TGF5b3V0R2FwPVwiMTJcIj5cbiAgICAgICAgICAgIDxtYXQtY2hpcC1saXN0IGNka0Ryb3BMaXN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjZGtEcm9wTGlzdE9yaWVudGF0aW9uPVwiaG9yaXpvbnRhbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAoY2RrRHJvcExpc3REcm9wcGVkKT1cIm9uRHJvcHBlZEZpbHRlcigkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZmlsdGVyIG9mIGFjdGl2ZUZpbHRlcnM7IGxldCBpZHggPSBpbmRleFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCJcbiAgICAgICAgICAgICAgICAgICAgY2RrRHJhZ1xuICAgICAgICAgICAgICAgICAgICAoY2RrRHJhZ1N0YXJ0ZWQpPVwib25TdGFydERyYWdGaWx0ZXIoJGV2ZW50LCBmaWx0ZXIpXCIgW25nQ2xhc3NdPVwieydjZ3JvdXAnOiBmaWx0ZXIuaXNncm91cH1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gbWF0LWJ1dHRvbiAqbmdJZj1cImlkeCA+IDBcIiBbbWF0TWVudVRyaWdnZXJGb3JdPVwibWVudVwiIGNsYXNzPVwiYml0d2lzZVwiPnt7ZmlsdGVyLmJpdHdpc2V9fTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1tZW51ICNtZW51PVwibWF0TWVudVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gbWF0LW1lbnUtaXRlbSAoY2xpY2spPVwiY2hhbmdlQml0d2lzZShmaWx0ZXIsICcmJicpXCI+JiY8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG1hdC1tZW51LWl0ZW0gKGNsaWNrKT1cImNoYW5nZUJpdHdpc2UoZmlsdGVyLCAnfHwnKVwiPnx8PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L21hdC1tZW51PlxuICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1jaGlwIGNvbG9yPVwie3tmaWx0ZXIuY29sb3J9fVwiIHNlbGVjdGVkPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9XCJmaWx0ZXIte3tpZHh9fVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3JlbW92YWJsZV09XCJ0cnVlXCIgKHJlbW92ZWQpPVwicmVtb3ZlRmlsdGVyKGZpbHRlcilcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFttYXRUb29sdGlwXT1cImZpbHRlci52YWx1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW21hdFRvb2x0aXBEaXNhYmxlZF09XCJmaWx0ZXIub3BlcmF0aW9uIT09J2luJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0VG9vbHRpcFNob3dEZWxheT1cIjE1MDBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJzZWxlY3RGaWx0ZXIoZmlsdGVyKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCIhZmlsdGVyLmlzZ3JvdXBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsnc2VsZWN0ZWQnOiBmaWx0ZXIuc2VsZWN0ZWQsICdtYXQtYWNjZW50JzogZmlsdGVyLnNlbGVjdGVkfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7ZmlsdGVyLmV4cGxhbmF0aW9ufX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bWF0LWljb24gbWF0Q2hpcFJlbW92ZT5jYW5jZWw8L21hdC1pY29uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9tYXQtY2hpcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJmaWx0ZXIuaXNncm91cFwiIGZ4TGF5b3V0PVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiAqbmdUZW1wbGF0ZU91dGxldD1cImdyb3VwOyBjb250ZXh0OiB7IGZpbHRlcjogdGhpcy5maWx0ZXIsIGlkeDogdGhpcy5pZHh9XCIgZnhMYXlvdXQ9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvbWF0LWNoaXAtbGlzdD5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGlucHV0IHN0eWxlPVwidmlzaWJpbHR5OiBoaWRkZW47IGhlaWdodDogMHB4OyB3aWR0aDogMHB4O1wiIHR5cGU9XCJmaWxlXCIgaWQ9XCJmaWxlU2V0XCIgI2ZpbGVTZXQgKGNoYW5nZSk9XCJ1cGxvYWRTZXQoKVwiIC8+XG48L2Rpdj5cbjxuZy10ZW1wbGF0ZSAjZ3JvdXAgbGV0LWZpbHRlcj1cImZpbHRlclwiIGxldC1pZHg9XCJpZHhcIj5cbiAgICA8c3BhbiBjbGFzcz1cImdyb3VwLXN0YXJ0XCI+KDwvc3Bhbj5cbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBmaWx0ZXIyIG9mIGZpbHRlci5maWVsZHM7IGxldCBpZHgyID0gaW5kZXhcIj5cbiAgICAgICAgPGJ1dHRvbiBtYXQtYnV0dG9uICpuZ0lmPVwiaWR4MiA+IDBcIiBbbWF0TWVudVRyaWdnZXJGb3JdPVwibWVudTJcIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwiYml0d2lzZVwiPlxuICAgICAgICAgICAge3tmaWx0ZXIyLmJpdHdpc2V9fVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPG1hdC1tZW51ICNtZW51Mj1cIm1hdE1lbnVcIj5cbiAgICAgICAgICAgIDxidXR0b24gbWF0LW1lbnUtaXRlbSAoY2xpY2spPVwiY2hhbmdlQml0d2lzZShmaWx0ZXIyLCAnJiYnKVwiPiYmPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIG1hdC1tZW51LWl0ZW0gKGNsaWNrKT1cImNoYW5nZUJpdHdpc2UoZmlsdGVyMiwgJ3x8JylcIj58fDwvYnV0dG9uPlxuICAgICAgICA8L21hdC1tZW51PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPG1hdC1jaGlwIGNvbG9yPVwie3tmaWx0ZXIuY29sb3J9fVwiIHNlbGVjdGVkPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgaWQ9XCJmaWx0ZXIte3tpZHh9fS17e2lkeDJ9fVwiXG4gICAgICAgICAgICAgICAgW3JlbW92YWJsZV09XCJ0cnVlXCIgKHJlbW92ZWQpPVwicmVtb3ZlRmlsdGVyKGZpbHRlcjIpXCJcbiAgICAgICAgICAgICAgICBbbWF0VG9vbHRpcF09XCJmaWx0ZXIyLnZhbHVlXCJcbiAgICAgICAgICAgICAgICBbbWF0VG9vbHRpcERpc2FibGVkXT1cImZpbHRlci5vcGVyYXRpb24hPT0naW4nXCJcbiAgICAgICAgICAgICAgICBtYXRUb29sdGlwU2hvd0RlbGF5PVwiMTUwMFwiXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cInNlbGVjdEZpbHRlcihmaWx0ZXIyKVwiXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieydzZWxlY3RlZCc6IGZpbHRlcjIuc2VsZWN0ZWQsICdtYXQtYWNjZW50JzogZmlsdGVyMi5zZWxlY3RlZH1cIlxuICAgICAgICAgICAgICAgICpuZ0lmPVwiIWZpbHRlcjIuaXNncm91cFwiXG4gICAgICAgICAgICA+e3tmaWx0ZXIyLmV4cGxhbmF0aW9ufX1cbiAgICAgICAgICAgICAgICA8bWF0LWljb24gbWF0Q2hpcFJlbW92ZT5jYW5jZWw8L21hdC1pY29uPlxuICAgICAgICAgICAgPC9tYXQtY2hpcD5cbiAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJmaWx0ZXIyLmlzZ3JvdXBcIiBmeExheW91dD1cInJvd1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nVGVtcGxhdGVPdXRsZXQ9XCJncm91cDsgY29udGV4dDogeyBmaWx0ZXI6IHRoaXMuZmlsdGVyMiwgaWR4OiB0aGlzLmlkeDJ9XCI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9uZy1jb250YWluZXI+XG4gICAgPHNwYW4gY2xhc3M9XCJncm91cC1lbmRcIj4pPC9zcGFuPlxuPC9uZy10ZW1wbGF0ZT5cbmAsXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICAuZXJyb3IgeyBjb2xvcjogcmVkOyB9XG4gICAgLnNlbGVjdG9yIHtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgfVxuICAgIC5maWx0ZXIge1xuICAgICAgICBwYWRkaW5nLWJvdHRvbTogMTJweDtcbiAgICB9XG4gICAgLmZpbHRlciBtYXQtY2hpcCB7XG4gICAgICAgIG1hcmdpbjogNHB4O1xuICAgIH1cbiAgICAuY2dyb3VwIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICB9XG4gICAgbWF0LWNoaXAuc2VsZWN0ZWQge1xuICAgICAgICBjb2xvcjogI2ZmZjtcbiAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgfVxuICAgIHNwYW4uZ3JvdXAtc3RhcnQsXG4gICAgc3Bhbi5ncm91cC1lbmQge1xuICAgICAgICBmb250LXNpemU6IDI1cHg7XG4gICAgfVxuICAgIGJ1dHRvbi5iaXR3aXNlIHtcbiAgICAgICAgbWluLXdpZHRoOiAyNHB4O1xuICAgICAgICBwYWRkaW5nLWxlZnQ6IDA7XG4gICAgICAgIHBhZGRpbmctcmlnaHQ6IDA7XG4gICAgfVxuICAgIGBcbiAgXVxufSlcblxuZXhwb3J0IGNsYXNzIFRXQUZpbHRlckVkaXRvckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBASW5wdXQoKSBvcHRpb25zOiBGaWx0ZXJFZGl0b3JPcHRpb25zO1xuICAgIEBJbnB1dCgpIGNvbmZpZzogRmlsdGVyRWRpdG9yQ29uZmlnO1xuICAgIEBPdXRwdXQoKSBjaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnlbXT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueVtdPigpO1xuXG4gICAgQFZpZXdDaGlsZCgnZmlsZVNldCcpIGZpbGVTZXQ6IEVsZW1lbnRSZWY7XG5cbiAgICBmaWx0ZXJPcHRpb25zOiBGaWx0ZXJFZGl0b3JPcHRpb25zO1xuICAgIHNlbGVjdGVkRmllbGQgPSAnbm9uZSc7XG4gICAgc2VsZWN0ZWRWYWx1ZSA9ICcnO1xuICAgIG9wZXJhdGlvbiA9ICdjb250YWluJztcbiAgICBhY3RpdmVGaWx0ZXJzOiBGaWVsZEZpbHRlcltdID0gW107XG4gICAgZWRpdGluZyA9IGZhbHNlO1xuICAgIG9wZXJhdGlvbnM6IGFueSA9IHtcbiAgICAgICAgY29udGFpbjogJz0+JyxcbiAgICAgICAgZXF1YWw6ICc9PT0nLFxuICAgICAgICBncmVhdGVyRXF1YWw6ICc+PScsXG4gICAgICAgIGdyZWF0ZXI6ICc+JyxcbiAgICAgICAgbGVzc0VxdWFsOiAnPD0nLFxuICAgICAgICBsZXNzOiAnPCcsXG4gICAgICAgIGluOiAnaW4nLFxuICAgIH07XG4gICAgb3BlcmF0aW9uc0RhdGEgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdjb250YWluJyxcbiAgICAgICAgICAgIGxhYmVsOiAnY29udGFpbnMnLFxuICAgICAgICAgICAgb3BlcmF0b3I6ICc9PidcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2VxdWFsJyxcbiAgICAgICAgICAgIGxhYmVsOiAnZXF1YWxzJyxcbiAgICAgICAgICAgIG9wZXJhdG9yOiAnPT09J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnZ3JlYXRlckVxdWFsJyxcbiAgICAgICAgICAgIGxhYmVsOiAnZ3JlYXRlciBvciBlcXVhbCcsXG4gICAgICAgICAgICBvcGVyYXRvcjogJz49J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnZ3JlYXRlcicsXG4gICAgICAgICAgICBsYWJlbDogJ2dyZWF0ZXInLFxuICAgICAgICAgICAgb3BlcmF0b3I6ICc+J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnbGVzc0VxdWFsJyxcbiAgICAgICAgICAgIGxhYmVsOiAnbGVzcyBvciBlcXVhbCcsXG4gICAgICAgICAgICBvcGVyYXRvcjogJzw9J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnbGVzcycsXG4gICAgICAgICAgICBsYWJlbDogJ2xlc3MnLFxuICAgICAgICAgICAgb3BlcmF0b3I6ICc8J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnaW4nLFxuICAgICAgICAgICAgbGFiZWw6ICdpbicsXG4gICAgICAgICAgICBvcGVyYXRvcjogJ2luJ1xuICAgICAgICB9LFxuICAgIF07XG5cbiAgICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDprZXlkb3duJywgWyckZXZlbnQnXSlcbiAgICBoYW5kbGVLZXlib2FyZEV2ZW50KGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICgoZXZlbnQua2V5ID09PSAnYycgJiYgZXZlbnQuY3RybEtleSkpIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJGaWx0ZXJzKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5lZGl0aW5nICYmIGV2ZW50LmtleUNvZGUgPT09IDEzKSB7XG4gICAgICAgICAgICB0aGlzLmFkZEZpbHRlcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgY2hlY2tGaWx0ZXIoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAodGhpcy5zZWxlY3RlZEZpZWxkID09PSAnbm9uZScgfHwgdGhpcy5zZWxlY3RlZFZhbHVlID09PSAnJyk7XG4gICAgfVxuXG4gICAgYWRkRmlsdGVyKCkge1xuICAgICAgICBsZXQgY29sb3IgPSAnJyxcbiAgICAgICAgICAgIGZpZWxkID0gJycsXG4gICAgICAgICAgICBsYWJlbCA9ICcnLFxuICAgICAgICAgICAgbmFtZSA9ICcnLFxuICAgICAgICAgICAgZXhwbGFuYXRpb24gPSB0aGlzLnNlbGVjdGVkRmllbGQgKyAnICcgKyB0aGlzLm9wZXJhdGlvbnNbdGhpcy5vcGVyYXRpb25dICsgJyAnICsgdGhpcy5zZWxlY3RlZFZhbHVlO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gdGhpcy5maWx0ZXJPcHRpb25zLmZpZWxkcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmZpbHRlck9wdGlvbnMuZmllbGRzW2ldLm5hbWUgPT09IHRoaXMuc2VsZWN0ZWRGaWVsZCkge1xuICAgICAgICAgICAgICAgIC8vIGNvbG9yID0gdGhpcy5maWx0ZXJPcHRpb25zLmZpZWxkc1tpXS5jb2xvcjtcbiAgICAgICAgICAgICAgICAvLyBmaWVsZCA9IHRoaXMuZmlsdGVyT3B0aW9ucy5maWVsZHNbaV0uZmllbGQ7XG4gICAgICAgICAgICAgICAgLy8gbGFiZWwgPSB0aGlzLmZpbHRlck9wdGlvbnMuZmllbGRzW2ldLmxhYmVsO1xuICAgICAgICAgICAgICAgIC8vIG5hbWUgPSB0aGlzLmZpbHRlck9wdGlvbnMuZmllbGRzW2ldLm5hbWU7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogLi4ud2l0aCBvYmplY3QgZGVzdHJ1Y3R1cmluZ1xuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICh7IGNvbG9yLCBmaWVsZCwgbGFiZWwsIG5hbWUgfSA9IHRoaXMuZmlsdGVyT3B0aW9ucy5maWVsZHNbaV0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wZXJhdGlvbiA9PT0gJ2luJykge1xuICAgICAgICAgICAgZXhwbGFuYXRpb24gPSB0aGlzLnNlbGVjdGVkRmllbGQgKyAnICcgKyB0aGlzLm9wZXJhdGlvbnNbdGhpcy5vcGVyYXRpb25dICsgJyAoLi4uKSc7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5vcGVyYXRpb24gPT09ICdjb250YWluJykge1xuICAgICAgICAgICAgLy8gZXhwbGFuYXRpb24gPSB0aGlzLnNlbGVjdGVkRmllbGQgKyAnICcgKyB0aGlzLm9wZXJhdGlvbnNbdGhpcy5vcGVyYXRpb25dICsgJyAnICsgdGhpcy5zZWxlY3RlZFZhbHVlO1xuICAgICAgICAgICAgZXhwbGFuYXRpb24gPSAnXCInICsgdGhpcy5zZWxlY3RlZFZhbHVlICsgJ1wiICcgKyB0aGlzLm9wZXJhdGlvbnNbdGhpcy5vcGVyYXRpb25dICsgJyAnICsgdGhpcy5zZWxlY3RlZEZpZWxkO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYWN0aXZlRmlsdGVycy5wdXNoKHtcbiAgICAgICAgICAgIGNvbG9yOiBjb2xvcixcbiAgICAgICAgICAgIGV4cGxhbmF0aW9uOiBleHBsYW5hdGlvbixcbiAgICAgICAgICAgIGxhYmVsOiBsYWJlbCxcbiAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICBmaWVsZDogZmllbGQsXG4gICAgICAgICAgICBiaXR3aXNlOiAnJiYnLFxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLm9wZXJhdGlvbnNbdGhpcy5vcGVyYXRpb25dLFxuICAgICAgICAgICAgdmFsdWU6IHRoaXMuc2VsZWN0ZWRWYWx1ZVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFZhbHVlID0gJyc7XG4gICAgICAgIHRoaXMuY2hhbmdlLmVtaXQodGhpcy5hY3RpdmVGaWx0ZXJzKTtcbiAgICB9XG5cbiAgICBzZWxlY3RGaWx0ZXIoZmlsdGVyOiBGaWVsZEZpbHRlcikge1xuICAgICAgICBmaWx0ZXIuc2VsZWN0ZWQgPSAhZmlsdGVyLnNlbGVjdGVkO1xuICAgICAgICBjb25zdCBncm91cCA9IHRoaXMuZ2V0UGFyZW50RmlsdGVyKGZpbHRlcik7XG4gICAgICAgIGlmIChncm91cCkge1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkQWxsID0gdHJ1ZTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gZ3JvdXAuZmllbGRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRtcGZpbHRlciA9IGdyb3VwLmZpZWxkc1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoIXRtcGZpbHRlci5pc2dyb3VwICYmICF0bXBmaWx0ZXIuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRBbGwgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRBbGwpIHtcbiAgICAgICAgICAgICAgICBncm91cC5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRQYXJlbnRGaWx0ZXIoZmlsdGVyOiBGaWVsZEZpbHRlcik6IEZpZWxkRmlsdGVyIHwgbnVsbCB7XG4gICAgICAgIGNvbnN0IGdldFBhcmVudEZpbHRlckluR3JvdXAgPSAoZ3JvdXA6IEZpZWxkRmlsdGVyLCBmaWx0ZXIyOiBGaWVsZEZpbHRlcik6IEZpZWxkRmlsdGVyIHwgbnVsbCA9PiB7XG4gICAgICAgICAgICByZXQgPSBudWxsO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGdyb3VwLmZpZWxkcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0bXBmaWx0ZXIgPSBncm91cC5maWVsZHNbaV07XG4gICAgICAgICAgICAgICAgaWYgKEpTT04uc3RyaW5naWZ5KHRtcGZpbHRlcikgPT09IEpTT04uc3RyaW5naWZ5KGZpbHRlcjIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBncm91cDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRtcGZpbHRlci5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldCA9IGdldFBhcmVudEZpbHRlckluR3JvdXAodG1wZmlsdGVyLCBmaWx0ZXIyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgIH07XG4gICAgICAgIGxldCByZXQgPSBudWxsO1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IHRoaXMuYWN0aXZlRmlsdGVycy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHRtcGZpbHRlciA9IHRoaXMuYWN0aXZlRmlsdGVyc1tpXTtcbiAgICAgICAgICAgIGlmIChKU09OLnN0cmluZ2lmeSh0bXBmaWx0ZXIpID09PSBKU09OLnN0cmluZ2lmeShmaWx0ZXIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRtcGZpbHRlci5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgcmV0ID0gZ2V0UGFyZW50RmlsdGVySW5Hcm91cCh0bXBmaWx0ZXIsIGZpbHRlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH1cblxuICAgIGFycmF5TW92ZSA9IChhcnI6IGFueVtdLCBvbGRJbmRleDogbnVtYmVyLCBuZXdJbmRleDogbnVtYmVyKTogYW55W10gPT4ge1xuICAgICAgICBpZiAobmV3SW5kZXggPiBhcnIubGVuZ3RoKSB7XG4gICAgICAgICAgICBsZXQgayA9IG5ld0luZGV4IC0gYXJyLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlIChrLS0pIHtcbiAgICAgICAgICAgICAgICBhcnIucHVzaCh1bmRlZmluZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGFyci5zcGxpY2UobmV3SW5kZXgsIDAsIGFyci5zcGxpY2Uob2xkSW5kZXgsIDEpWzBdKTtcbiAgICAgICAgcmV0dXJuIGFycjtcbiAgICB9XG5cbiAgICBtb3ZlVG8oZGlyZWN0aW9uOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGlkeCA9IC0xLFxuICAgICAgICAgICAgdG9JZHggPSAtMSxcbiAgICAgICAgICAgIGdyb3VwID0gLTE7XG4gICAgICAgIC8vIFNlYXJjaGluZyB0aGUgc2VsZWN0ZWQgZmlsdGVyLi4uXG4gICAgICAgIHRoaXMuYWN0aXZlRmlsdGVycy5mb3JFYWNoKChmaWx0ZXIsIHRtcGlkeCkgPT4ge1xuICAgICAgICAgICAgaWYgKGZpbHRlci5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIGlkeCA9IHRtcGlkeDtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGZpbHRlci5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgZmlsdGVyLmZpZWxkcy5mb3JFYWNoKChmaWx0ZXIyLCB0bXBpZHgyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIyLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZHggPSB0bXBpZHgyO1xuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXAgPSB0bXBpZHg7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGlkeCA+PSAwKSB7XG5cbiAgICAgICAgICAgIGlmIChncm91cCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgdG9JZHggPSAoaWR4ICsgZGlyZWN0aW9uKSA+PSAwID8gaWR4ICsgZGlyZWN0aW9uIDogdGhpcy5hY3RpdmVGaWx0ZXJzW2dyb3VwXS5maWVsZHMubGVuZ3RoICsgZGlyZWN0aW9uO1xuICAgICAgICAgICAgICAgIGlmICh0b0lkeCA+PSB0aGlzLmFjdGl2ZUZpbHRlcnNbZ3JvdXBdLmZpZWxkcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9JZHggPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUZpbHRlcnNbZ3JvdXBdLmZpZWxkcyA9IHRoaXMuYXJyYXlNb3ZlKHRoaXMuYWN0aXZlRmlsdGVyc1tncm91cF0uZmllbGRzLCBpZHgsIHRvSWR4KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdG9JZHggPSAoaWR4ICsgZGlyZWN0aW9uKSA+PSAwID8gaWR4ICsgZGlyZWN0aW9uIDogdGhpcy5hY3RpdmVGaWx0ZXJzLmxlbmd0aCArIGRpcmVjdGlvbjtcbiAgICAgICAgICAgICAgICBpZiAodG9JZHggPj0gdGhpcy5hY3RpdmVGaWx0ZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0b0lkeCA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlRmlsdGVycyA9IHRoaXMuYXJyYXlNb3ZlKHRoaXMuYWN0aXZlRmlsdGVycywgaWR4LCB0b0lkeCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2hhbmdlLmVtaXQodGhpcy5hY3RpdmVGaWx0ZXJzKTtcblxuICAgIH1cblxuICAgIGdldFNlbGVjdGVkKCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IGdldEluR3JvdXAgPSAoZ3JvdXA6IEZpZWxkRmlsdGVyKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZ3JvdXAuZmllbGRzLnJlZHVjZSgoYWNjMiwgZmlsdGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlci5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjYzIgKz0gZ2V0SW5Hcm91cChmaWx0ZXIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZmlsdGVyLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjYzIrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjYzI7XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWN0aXZlRmlsdGVycy5yZWR1Y2UoKGFjYywgZmlsdGVyKSA9PiB7XG4gICAgICAgICAgICBpZiAoZmlsdGVyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICBhY2MgKz0gZ2V0SW5Hcm91cChmaWx0ZXIpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChmaWx0ZXIuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICBhY2MrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIH0sIDApO1xuXG4gICAgfVxuXG4gICAgY2xlYXJTZWxlY3Rpb24oKTogdm9pZCB7XG5cbiAgICAgICAgY29uc3QgY2xlYXJTZWxlY3Rpb25Jbkdyb3VwID0gKGdyb3VwKSA9PiB7XG4gICAgICAgICAgICBncm91cC5maWVsZHMuZm9yRWFjaCgoZmlsdGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlci5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpbHRlciA9IGNsZWFyU2VsZWN0aW9uSW5Hcm91cChmaWx0ZXIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZpbHRlci5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gZ3JvdXA7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5hY3RpdmVGaWx0ZXJzID0gdGhpcy5hY3RpdmVGaWx0ZXJzLm1hcCgoZmlsdGVyKSA9PiB7XG4gICAgICAgICAgICBpZiAoZmlsdGVyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICBmaWx0ZXIgPSBjbGVhclNlbGVjdGlvbkluR3JvdXAoZmlsdGVyKTtcbiAgICAgICAgICAgICAgICAvLyBmaWx0ZXIuZmllbGRzID0gZmlsdGVyLmZpZWxkcy5tYXAoKGZpbHRlcjIpID0+IHtcbiAgICAgICAgICAgICAgICAvLyAgICAgZmlsdGVyMi5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIC8vICAgICByZXR1cm4gZmlsdGVyMjtcbiAgICAgICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbHRlci5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIGZpbHRlcjtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBjaGFuZ2VCaXR3aXNlKGZpbHRlcjogRmllbGRGaWx0ZXIsIGJpdHdpc2UpIHtcbiAgICAgICAgZmlsdGVyLmJpdHdpc2UgPSBiaXR3aXNlO1xuICAgICAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMuYWN0aXZlRmlsdGVycyk7XG4gICAgfVxuXG4gICAgZ3JvdXBTZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgZ3JvdXBTZWxlY3RlZEluR3JvdXAgPSAoZmlsdGVyOiBGaWVsZEZpbHRlcikgPT4ge1xuICAgICAgICAgICAgbGV0IHJldDIgPSAwO1xuICAgICAgICAgICAgaWYgKGZpbHRlci5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgZmlsdGVyLmZpZWxkcy5mb3JFYWNoKChmaWx0ZXIyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldDIgKz0gZ3JvdXBTZWxlY3RlZEluR3JvdXAoZmlsdGVyMik7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyMi5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldDIrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXQyO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgZ3JvdXBzID0gdGhpcy5hY3RpdmVGaWx0ZXJzLmZpbHRlcihmaWx0ZXIgPT4gZmlsdGVyLmlzZ3JvdXApO1xuICAgICAgICBsZXQgcmV0ID0gMDtcbiAgICAgICAgZ3JvdXBzLmZvckVhY2goKGdyb3VwKSA9PiB7XG4gICAgICAgICAgICBncm91cC5maWVsZHMuZm9yRWFjaChmaWx0ZXIgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgICAgICByZXQgKz0gZ3JvdXBTZWxlY3RlZEluR3JvdXAoZmlsdGVyKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZpbHRlci5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXQrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXQgPiAwO1xuICAgIH1cblxuICAgIGVudGlyZUdyb3VwU2VsZWN0ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IGVudGlyZUdyb3VwU2VsZWN0ZWRJbkdyb3VwID0gKGdyb3VwOiBGaWVsZEZpbHRlcikgPT4ge1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkMiA9IHRydWU7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gZ3JvdXAuZmllbGRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpbHRlciA9IGdyb3VwLmZpZWxkc1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQyID0gZW50aXJlR3JvdXBTZWxlY3RlZEluR3JvdXAoZmlsdGVyKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFmaWx0ZXIuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQyID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdGVkMiAmJiBncm91cC5maWVsZHMubGVuZ3RoID4gMDtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgZ3JvdXBzID0gdGhpcy5hY3RpdmVGaWx0ZXJzLmZpbHRlcihmaWx0ZXIgPT4gZmlsdGVyLmlzZ3JvdXApO1xuICAgICAgICBsZXQgc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICBmb3IgKGxldCBpZyA9IDAsIGxnID0gZ3JvdXBzLmxlbmd0aDsgaWcgPCBsZzsgaWcrKykge1xuICAgICAgICAgICAgY29uc3QgZ3JvdXAgPSBncm91cHNbaWddO1xuICAgICAgICAgICAgZm9yIChsZXQgaWcyID0gMCwgbGcyID0gZ3JvdXAuZmllbGRzLmxlbmd0aDsgaWcyIDwgbGcyOyBpZzIrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpbHRlciA9IGdyb3VwLmZpZWxkc1tpZzJdO1xuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZCA9IGVudGlyZUdyb3VwU2VsZWN0ZWRJbkdyb3VwKGZpbHRlcik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFmaWx0ZXIuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBncm91cC5maWVsZHMuZm9yRWFjaChmaWx0ZXIgPT4ge1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBncm91cHMuZm9yRWFjaCgoZ3JvdXApID0+IHtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzZWxlY3RlZCAmJiBncm91cHMubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICBjcmVhdGVHcm91cCgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgY3JlYXRlSW5Hcm91cCA9IChmaWx0ZXI6IEZpZWxkRmlsdGVyKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZDIgPSBmaWx0ZXIuZmllbGRzLmZpbHRlcihmaWx0ZXIyID0+IGZpbHRlcjIuc2VsZWN0ZWQpLFxuICAgICAgICAgICAgZ3JvdXBQb3NpdGlvbjIgPSBmaWx0ZXIuZmllbGRzLmZpbmRJbmRleCh2ID0+IHYuc2VsZWN0ZWQpO1xuICAgICAgICAgICAgbGV0IHJlc3VsdEZpbHRlcjI6IEZpZWxkRmlsdGVyW107XG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWQyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdEZpbHRlcjIgPSBmaWx0ZXIuZmllbGRzLmZpbHRlcihmaWx0ZXIyID0+ICFmaWx0ZXIyLnNlbGVjdGVkKTtcbiAgICAgICAgICAgICAgICByZXN1bHRGaWx0ZXIyLnNwbGljZShncm91cFBvc2l0aW9uMiwgMCwge1xuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJycsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICcnLFxuICAgICAgICAgICAgICAgICAgICBmaWVsZDogJycsXG4gICAgICAgICAgICAgICAgICAgIGlzZ3JvdXA6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGJpdHdpc2U6ICcmJicsXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkczogc2VsZWN0ZWQyXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3VsdEZpbHRlcjIgPSBmaWx0ZXIuZmllbGRzLm1hcChmaWx0ZXIyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlcjIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlSW5Hcm91cChmaWx0ZXIyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmlsdGVyMjtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbHRlci5maWVsZHMgPSByZXN1bHRGaWx0ZXIyO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5hY3RpdmVGaWx0ZXJzLmZpbHRlcihmaWx0ZXIgPT4gZmlsdGVyLnNlbGVjdGVkKSxcbiAgICAgICAgICAgICAgZ3JvdXBQb3NpdGlvbiA9IHRoaXMuYWN0aXZlRmlsdGVycy5maW5kSW5kZXgodiA9PiB2LnNlbGVjdGVkKTtcbiAgICAgICAgbGV0IHJlc3VsdEZpbHRlcjogRmllbGRGaWx0ZXJbXTtcbiAgICAgICAgaWYgKHNlbGVjdGVkLmxlbmd0aCkge1xuICAgICAgICAgICAgcmVzdWx0RmlsdGVyID0gdGhpcy5hY3RpdmVGaWx0ZXJzLmZpbHRlcihmaWx0ZXIgPT4gIWZpbHRlci5zZWxlY3RlZCk7XG4gICAgICAgICAgICByZXN1bHRGaWx0ZXIuc3BsaWNlKGdyb3VwUG9zaXRpb24sIDAsIHtcbiAgICAgICAgICAgICAgICBjb2xvcjogJycsXG4gICAgICAgICAgICAgICAgbmFtZTogJycsXG4gICAgICAgICAgICAgICAgZmllbGQ6ICcnLFxuICAgICAgICAgICAgICAgIGlzZ3JvdXA6IHRydWUsXG4gICAgICAgICAgICAgICAgYml0d2lzZTogJyYmJyxcbiAgICAgICAgICAgICAgICBmaWVsZHM6IHNlbGVjdGVkXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlRmlsdGVycyA9IHJlc3VsdEZpbHRlcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdEZpbHRlciA9IHRoaXMuYWN0aXZlRmlsdGVycy5tYXAoZmlsdGVyID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlSW5Hcm91cChmaWx0ZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmlsdGVyO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMuYWN0aXZlRmlsdGVycyk7XG4gICAgfVxuXG4gICAgc2FuaXRpemVHcm91cHMoKSB7XG4gICAgICAgIGNvbnN0IHNhbml0aXplR3JvdXBzSW5Hcm91cCA9IChncm91cCwgcGFyZW50PzogRmllbGRGaWx0ZXIpID0+IHtcbiAgICAgICAgICAgIGdyb3VwLmZpZWxkcy5tYXAoKGZpbHRlcjogRmllbGRGaWx0ZXIsIGlkeDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlci5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIuZmllbGRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXAuZmllbGRzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZpbHRlci5maWVsZHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBncm91cC5maWVsZHMucHVzaCh7Li4uZmlsdGVyLmZpZWxkc1swXX0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXAuZmllbGRzLnNwbGljZShpZHgsIDEsIHsuLi5maWx0ZXIuZmllbGRzWzBdfSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzYW5pdGl6ZUdyb3Vwc0luR3JvdXAoZmlsdGVyLCBncm91cCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hY3RpdmVGaWx0ZXJzLm1hcCgoZmlsdGVyOiBGaWVsZEZpbHRlciwgaWR4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGlmIChmaWx0ZXIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIuZmllbGRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUZpbHRlcnMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmaWx0ZXIuZmllbGRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmFjdGl2ZUZpbHRlcnMucHVzaCh7Li4uZmlsdGVyLmZpZWxkc1swXX0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUZpbHRlcnMuc3BsaWNlKGlkeCwgMSwgey4uLmZpbHRlci5maWVsZHNbMF19KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNhbml0aXplR3JvdXBzSW5Hcm91cChmaWx0ZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVtb3ZlRnJvbUdyb3VwKCk6IHZvaWQge1xuICAgICAgICBjb25zdCByZW1vdmVGcm9tR3JvdXBJbkdyb3VwID0gKGdyb3VwOiBGaWVsZEZpbHRlciwgcGFyZW50OiBGaWVsZEZpbHRlciwgaWR4KSA9PiB7XG4gICAgICAgICAgICBncm91cC5maWVsZHMuZm9yRWFjaCgoZmlsdGVyMiwgaWR4MikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlRnJvbUdyb3VwSW5Hcm91cChmaWx0ZXIyLCBncm91cCwgaWR4Mik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCB0bXBGaWx0ZXJzID0gZ3JvdXAuZmllbGRzLmZpbHRlcigoZmlsdGVyMjogRmllbGRGaWx0ZXIpID0+IGZpbHRlcjIuc2VsZWN0ZWQpO1xuICAgICAgICAgICAgZ3JvdXAuZmllbGRzID0gZ3JvdXAuZmllbGRzLmZpbHRlcigoZmlsdGVyMjogRmllbGRGaWx0ZXIpID0+ICFmaWx0ZXIyLnNlbGVjdGVkKTtcbiAgICAgICAgICAgIHRtcEZpbHRlcnMuZm9yRWFjaCgodjogRmllbGRGaWx0ZXIpID0+IHtcbiAgICAgICAgICAgICAgICB2LnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcGFyZW50LmZpZWxkcy5wdXNoKHYpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoZ3JvdXAuZmllbGRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHBhcmVudC5maWVsZHMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5hY3RpdmVGaWx0ZXJzID0gdGhpcy5hY3RpdmVGaWx0ZXJzLnJlZHVjZSgobmV3RmlsdGVycywgZmlsdGVyKSA9PiB7XG4gICAgICAgICAgICBpZiAoZmlsdGVyLmlzZ3JvdXApIHtcblxuICAgICAgICAgICAgICAgIGZpbHRlci5maWVsZHMuZm9yRWFjaCgoZmlsdGVyMiwgaWR4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZUZyb21Hcm91cEluR3JvdXAoZmlsdGVyMiwgZmlsdGVyLCBpZHgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB0bXBGaWx0ZXJzID0gZmlsdGVyLmZpZWxkcy5maWx0ZXIoZmlsdGVyMiA9PiBmaWx0ZXIyLnNlbGVjdGVkKTtcbiAgICAgICAgICAgICAgICBmaWx0ZXIuZmllbGRzID0gZmlsdGVyLmZpZWxkcy5maWx0ZXIoZmlsdGVyMiA9PiAhZmlsdGVyMi5zZWxlY3RlZCk7XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlci5maWVsZHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld0ZpbHRlcnMucHVzaChmaWx0ZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0bXBGaWx0ZXJzLmZvckVhY2godiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG5ld0ZpbHRlcnMucHVzaCh2KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV3RmlsdGVycy5wdXNoKGZpbHRlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV3RmlsdGVycztcbiAgICAgICAgfSwgW10pO1xuICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgIHRoaXMuc2FuaXRpemVHcm91cHMoKTtcbiAgICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh0aGlzLmFjdGl2ZUZpbHRlcnMpO1xuICAgIH1cblxuICAgIG9uU3RhcnREcmFnRmlsdGVyKF9ldmVudCwgX2ZpbHRlcikge1xuICAgIH1cblxuICAgIG9uRHJvcHBlZEZpbHRlcihldmVudCkge1xuICAgICAgICB0aGlzLmFycmF5TW92ZSh0aGlzLmFjdGl2ZUZpbHRlcnMsIGV2ZW50LnByZXZpb3VzSW5kZXgsIGV2ZW50LmN1cnJlbnRJbmRleCk7XG4gICAgICAgIC8vIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgdGhpcy5zYW5pdGl6ZUdyb3VwcygpO1xuICAgICAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMuYWN0aXZlRmlsdGVycyk7XG4gICAgfVxuXG4gICAgdXBsb2FkU2V0KCkge1xuICAgICAgICBjb25zdCBmaWxlT2JqID0gKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWxlU2V0JykpLmZpbGVzWzBdO1xuICAgICAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgICByZWFkZXIub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbGluZXMgPSAoPHN0cmluZz5yZWFkZXIucmVzdWx0KS5zcGxpdCgvXFxyP1xcbi8pLmZpbHRlcih2YWwgPT4gdmFsID4gJycpO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFZhbHVlID0gbGluZXMuam9pbignLCAnKTtcbiAgICAgICAgICAgIHRoaXMuZmlsZVNldC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XG4gICAgICAgIH07XG4gICAgICAgIHJlYWRlci5yZWFkQXNUZXh0KGZpbGVPYmopO1xuICAgIH1cblxuICAgIHJlbW92ZUZpbHRlcihmaWx0ZXI6IEZpZWxkRmlsdGVyKTogdm9pZCB7XG4gICAgICAgIC8vIGNvbnN0IHJlbW92ZUZpbHRlckluR3JvdXAgPSAoZ3JvdXAsIGZpbHRlcikgPT4ge1xuXG4gICAgICAgIC8vIH07XG4gICAgICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuZ2V0UGFyZW50RmlsdGVyKGZpbHRlcik7XG4gICAgICAgIGxldCBncm91cDogRmllbGRGaWx0ZXJbXTtcbiAgICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICAgICAgZ3JvdXAgPSBwYXJlbnQuZmllbGRzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ3JvdXAgPSB0aGlzLmFjdGl2ZUZpbHRlcnM7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBncm91cC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChKU09OLnN0cmluZ2lmeShncm91cFtpXSkgPT09IEpTT04uc3RyaW5naWZ5KGZpbHRlcikpIHtcbiAgICAgICAgICAgICAgICBncm91cC5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zYW5pdGl6ZUdyb3VwcygpO1xuICAgICAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMuYWN0aXZlRmlsdGVycyk7XG4gICAgfVxuXG4gICAgY2xlYXJGaWx0ZXJzKCkge1xuICAgICAgICB0aGlzLmFjdGl2ZUZpbHRlcnMgPSBbXTtcbiAgICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh0aGlzLmFjdGl2ZUZpbHRlcnMpO1xuICAgIH1cblxuICAgIG9uRm9jdXMoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5lZGl0aW5nID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBvbkJsdXIoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5lZGl0aW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuZmlsdGVyT3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICAgICAgdGhpcy5zZWxlY3RlZEZpZWxkID0gKHR5cGVvZiB0aGlzLmZpbHRlck9wdGlvbnMuZmllbGRzWzBdICE9PSAndW5kZWZpbmVkJykgPyB0aGlzLmZpbHRlck9wdGlvbnMuZmllbGRzWzBdLm5hbWUgOiAnbm9uZSc7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5jb25maWcgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmNvbmZpZy5vcGVyYXRpb25zRGF0YSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wZXJhdGlvbnNEYXRhID0gdGhpcy5jb25maWcub3BlcmF0aW9uc0RhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuY29uZmlnLmZpbHRlciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUZpbHRlcnMgPSB0aGlzLmNvbmZpZy5maWx0ZXIuc2xpY2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyB0aGlzLmZpbHRlck9wdGlvbnMgPSBKU09OLnBhcnNlKHRoaXMub3B0aW9ucyk7XG4gICAgfVxufVxuIl19