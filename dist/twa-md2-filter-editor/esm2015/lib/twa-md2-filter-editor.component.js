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
        if ((event.key === 'c' && event.ctrlKey) || event.keyCode === 27) {
            this.clearFilters();
        }
        else if (event.keyCode === 13) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdhLW1kMi1maWx0ZXItZWRpdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3R3YS1tZDItZmlsdGVyLWVkaXRvci8iLCJzb3VyY2VzIjpbImxpYi90d2EtbWQyLWZpbHRlci1lZGl0b3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEcsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQTZLN0MsTUFBTSxPQUFPLHdCQUF3QjtJQXNFakM7UUFsRVUsV0FBTSxHQUF3QixJQUFJLFlBQVksRUFBUyxDQUFDO1FBS2xFLGtCQUFhLEdBQUcsTUFBTSxDQUFDO1FBQ3ZCLGtCQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ25CLGNBQVMsR0FBRyxTQUFTLENBQUM7UUFDdEIsa0JBQWEsR0FBa0IsRUFBRSxDQUFDO1FBQ2xDLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsZUFBVSxHQUFRO1lBQ2QsT0FBTyxFQUFFLElBQUk7WUFDYixLQUFLLEVBQUUsS0FBSztZQUNaLFlBQVksRUFBRSxJQUFJO1lBQ2xCLE9BQU8sRUFBRSxHQUFHO1lBQ1osU0FBUyxFQUFFLElBQUk7WUFDZixJQUFJLEVBQUUsR0FBRztZQUNULEVBQUUsRUFBRSxJQUFJO1NBQ1gsQ0FBQztRQUNGLG1CQUFjLEdBQUc7WUFDYjtnQkFDSSxJQUFJLEVBQUUsU0FBUztnQkFDZixLQUFLLEVBQUUsVUFBVTtnQkFDakIsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRDtnQkFDSSxJQUFJLEVBQUUsT0FBTztnQkFDYixLQUFLLEVBQUUsUUFBUTtnQkFDZixRQUFRLEVBQUUsS0FBSzthQUNsQjtZQUNEO2dCQUNJLElBQUksRUFBRSxjQUFjO2dCQUNwQixLQUFLLEVBQUUsa0JBQWtCO2dCQUN6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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBc0lYO2dCQUNDLE1BQU0sRUFBRTtvQkFDTjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBMkJDO2lCQUNGO2FBQ0Y7Ozs7O3NCQUlJLEtBQUs7cUJBQ0wsS0FBSztxQkFDTCxNQUFNO3NCQUVOLFNBQVMsU0FBQyxTQUFTO2tDQXVEbkIsWUFBWSxTQUFDLGtCQUFrQixFQUFFLENBQUMsUUFBUSxDQUFDOzs7O0lBM0Q1QywyQ0FBc0M7O0lBQ3RDLDBDQUFvQzs7SUFDcEMsMENBQWtFOztJQUVsRSwyQ0FBMEM7O0lBRTFDLGlEQUFtQzs7SUFDbkMsaURBQXVCOztJQUN2QixpREFBbUI7O0lBQ25CLDZDQUFzQjs7SUFDdEIsaURBQWtDOztJQUNsQywyQ0FBZ0I7O0lBQ2hCLDhDQVFFOztJQUNGLGtEQW9DRTs7SUFzR0YsNkNBU0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBGaWx0ZXJFZGl0b3JPcHRpb25zLCBGaWVsZEZpbHRlciwgRmlsdGVyRWRpdG9yQ29uZmlnIH0gZnJvbSAnLi90d2EtbWQyLWZpbHRlci1lZGl0b3IuaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndHdhLW1kMi1maWx0ZXItZWRpdG9yJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRHYXA9XCIyMHB4XCI+XG4gICAgPGRpdiBmeExheW91dD1cImNvbHVtblwiIGZ4RmxleD5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNlbGVjdG9yXCIgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEdhcD1cIjEwcHhcIj5cbiAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgICAgICA8bWF0LXNlbGVjdCBbKG5nTW9kZWwpXT1cInNlbGVjdGVkRmllbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1vcHRpb24gc2VsZWN0ZWQgdmFsdWU9XCJub25lXCI+RmlsdHJhciBwb3IuLi48L21hdC1vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCBmaWVsZCBvZiBmaWx0ZXJPcHRpb25zLmZpZWxkc1wiIFsodmFsdWUpXT1cImZpZWxkLm5hbWVcIj57e2ZpZWxkLmxhYmVsfX08L21hdC1vcHRpb24+XG4gICAgICAgICAgICAgICAgPC9tYXQtc2VsZWN0PlxuICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgICAgICA8bWF0LXNlbGVjdCBbKG5nTW9kZWwpXT1cIm9wZXJhdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LW9wdGlvbiAqbmdGb3I9XCJsZXQgb3Agb2Ygb3BlcmF0aW9uc0RhdGFcIiB2YWx1ZT1cInt7b3AudHlwZX19XCI+e3tvcC5sYWJlbH19PC9tYXQtb3B0aW9uPlxuICAgICAgICAgICAgICAgIDwvbWF0LXNlbGVjdD5cbiAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICAgICAgPGlucHV0IG1hdElucHV0IHBsYWNlaG9sZGVyPVwiZmlsdHJvXCIgWyhuZ01vZGVsKV09XCJzZWxlY3RlZFZhbHVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChmb2N1cyk9XCJvbkZvY3VzKCRldmVudClcIiAoYmx1cik9XCJvbkJsdXIoJGV2ZW50KVwiIC8+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBtYXQtYnV0dG9uICpuZ0lmPVwib3BlcmF0aW9uPT09J2luJ1wiIG1hdFN1ZmZpeCBtYXQtaWNvbi1idXR0b24gYXJpYS1sYWJlbD1cIkNsZWFyXCIgKGNsaWNrKT1cImZpbGVTZXQuY2xpY2soKVwiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWljb24+YXR0YWNoX2ZpbGU8L21hdC1pY29uPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBtYXQtYnV0dG9uIG1hdC1pY29uLWJ1dHRvbiAoY2xpY2spPVwiYWRkRmlsdGVyKClcIiBbZGlzYWJsZWRdPVwiY2hlY2tGaWx0ZXIoKVwiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWljb24+c2VuZDwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgZnhGbGV4PiZuYnNwOzwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvb2xzXCIgKm5nSWY9XCJhY3RpdmVGaWx0ZXJzLmxlbmd0aCA+IDBcIiBmeExheW91dD1cInJvd1wiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gbWF0LWJ1dHRvbiBtYXQtaWNvbi1idXR0b25cbiAgICAgICAgICAgICAgICAgICAgbWF0VG9vbHRpcD1cIkFncnVwYXJcIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwiY3JlYXRlR3JvdXAoKVwiXG4gICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJnZXRTZWxlY3RlZCgpIDwgMlwiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWljb24+bGluazwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBtYXQtYnV0dG9uIG1hdC1pY29uLWJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBtYXRUb29sdGlwPVwiRGVzYWdydXBhclwiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJyZW1vdmVGcm9tR3JvdXAoKVwiXG4gICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCIhZ3JvdXBTZWxlY3RlZCgpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbj5saW5rX29mZjwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBtYXQtYnV0dG9uIG1hdC1pY29uLWJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBtYXRUb29sdGlwPVwiTW92ZXIgYSBsYSBpenF1aWVyZGFcIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwibW92ZVRvKC0xKVwiXG4gICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJnZXRTZWxlY3RlZCgpICE9PSAxICYmICFlbnRpcmVHcm91cFNlbGVjdGVkKClcIj5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1pY29uPmFycm93X2JhY2s8L21hdC1pY29uPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gbWF0LWJ1dHRvbiBtYXQtaWNvbi1idXR0b25cbiAgICAgICAgICAgICAgICAgICAgbWF0VG9vbHRpcD1cIk1vdmVyIGEgbGEgZGVyZWNoYVwiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJtb3ZlVG8oMSlcIlxuICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZ2V0U2VsZWN0ZWQoKSAhPT0gMSAmJiAhZW50aXJlR3JvdXBTZWxlY3RlZCgpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbj5hcnJvd19mb3J3YXJkPC9tYXQtaWNvbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIG1hdC1idXR0b24gbWF0LWljb24tYnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIG1hdFRvb2x0aXA9XCJMaW1waWFyIHNlbGVjY2nDs25cIlxuICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZ2V0U2VsZWN0ZWQoKSA8IDFcIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwiY2xlYXJTZWxlY3Rpb24oKVwiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWljb24+Y2xlYXI8L21hdC1pY29uPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gbWF0LWJ1dHRvbiBtYXQtaWNvbi1idXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdFRvb2x0aXA9XCJMaW1waWFyIGZpbHRyb3NcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImFjdGl2ZUZpbHRlcnMubGVuZ3RoIDwgMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwiY2xlYXJGaWx0ZXJzKClcIj5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1pY29uPmNsZWFyX2FsbDwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmaWx0ZXJcIiBmeExheW91dEdhcD1cIjEyXCI+XG4gICAgICAgICAgICA8bWF0LWNoaXAtbGlzdCBjZGtEcm9wTGlzdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY2RrRHJvcExpc3RPcmllbnRhdGlvbj1cImhvcml6b250YWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNka0Ryb3BMaXN0RHJvcHBlZCk9XCJvbkRyb3BwZWRGaWx0ZXIoJGV2ZW50KVwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGZpbHRlciBvZiBhY3RpdmVGaWx0ZXJzOyBsZXQgaWR4ID0gaW5kZXhcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiXG4gICAgICAgICAgICAgICAgICAgIGNka0RyYWdcbiAgICAgICAgICAgICAgICAgICAgKGNka0RyYWdTdGFydGVkKT1cIm9uU3RhcnREcmFnRmlsdGVyKCRldmVudCwgZmlsdGVyKVwiIFtuZ0NsYXNzXT1cInsnY2dyb3VwJzogZmlsdGVyLmlzZ3JvdXB9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG1hdC1idXR0b24gKm5nSWY9XCJpZHggPiAwXCIgW21hdE1lbnVUcmlnZ2VyRm9yXT1cIm1lbnVcIiBjbGFzcz1cImJpdHdpc2VcIj57e2ZpbHRlci5iaXR3aXNlfX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxtYXQtbWVudSAjbWVudT1cIm1hdE1lbnVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG1hdC1tZW51LWl0ZW0gKGNsaWNrKT1cImNoYW5nZUJpdHdpc2UoZmlsdGVyLCAnJiYnKVwiPiYmPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBtYXQtbWVudS1pdGVtIChjbGljayk9XCJjaGFuZ2VCaXR3aXNlKGZpbHRlciwgJ3x8JylcIj58fDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9tYXQtbWVudT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxtYXQtY2hpcCBjb2xvcj1cInt7ZmlsdGVyLmNvbG9yfX1cIiBzZWxlY3RlZD1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPVwiZmlsdGVyLXt7aWR4fX1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtyZW1vdmFibGVdPVwidHJ1ZVwiIChyZW1vdmVkKT1cInJlbW92ZUZpbHRlcihmaWx0ZXIpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbWF0VG9vbHRpcF09XCJmaWx0ZXIudmFsdWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFttYXRUb29sdGlwRGlzYWJsZWRdPVwiZmlsdGVyLm9wZXJhdGlvbiE9PSdpbidcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdFRvb2x0aXBTaG93RGVsYXk9XCIxNTAwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwic2VsZWN0RmlsdGVyKGZpbHRlcilcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiIWZpbHRlci5pc2dyb3VwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3NlbGVjdGVkJzogZmlsdGVyLnNlbGVjdGVkLCAnbWF0LWFjY2VudCc6IGZpbHRlci5zZWxlY3RlZH1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7e2ZpbHRlci5leHBsYW5hdGlvbn19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1pY29uIG1hdENoaXBSZW1vdmU+Y2FuY2VsPC9tYXQtaWNvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbWF0LWNoaXA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiZmlsdGVyLmlzZ3JvdXBcIiBmeExheW91dD1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nVGVtcGxhdGVPdXRsZXQ9XCJncm91cDsgY29udGV4dDogeyBmaWx0ZXI6IHRoaXMuZmlsdGVyLCBpZHg6IHRoaXMuaWR4fVwiIGZ4TGF5b3V0PVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L21hdC1jaGlwLWxpc3Q+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxpbnB1dCBzdHlsZT1cInZpc2liaWx0eTogaGlkZGVuOyBoZWlnaHQ6IDBweDsgd2lkdGg6IDBweDtcIiB0eXBlPVwiZmlsZVwiIGlkPVwiZmlsZVNldFwiICNmaWxlU2V0IChjaGFuZ2UpPVwidXBsb2FkU2V0KClcIiAvPlxuPC9kaXY+XG48bmctdGVtcGxhdGUgI2dyb3VwIGxldC1maWx0ZXI9XCJmaWx0ZXJcIiBsZXQtaWR4PVwiaWR4XCI+XG4gICAgPHNwYW4gY2xhc3M9XCJncm91cC1zdGFydFwiPig8L3NwYW4+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZmlsdGVyMiBvZiBmaWx0ZXIuZmllbGRzOyBsZXQgaWR4MiA9IGluZGV4XCI+XG4gICAgICAgIDxidXR0b24gbWF0LWJ1dHRvbiAqbmdJZj1cImlkeDIgPiAwXCIgW21hdE1lbnVUcmlnZ2VyRm9yXT1cIm1lbnUyXCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cImJpdHdpc2VcIj5cbiAgICAgICAgICAgIHt7ZmlsdGVyMi5iaXR3aXNlfX1cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxtYXQtbWVudSAjbWVudTI9XCJtYXRNZW51XCI+XG4gICAgICAgICAgICA8YnV0dG9uIG1hdC1tZW51LWl0ZW0gKGNsaWNrKT1cImNoYW5nZUJpdHdpc2UoZmlsdGVyMiwgJyYmJylcIj4mJjwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBtYXQtbWVudS1pdGVtIChjbGljayk9XCJjaGFuZ2VCaXR3aXNlKGZpbHRlcjIsICd8fCcpXCI+fHw8L2J1dHRvbj5cbiAgICAgICAgPC9tYXQtbWVudT5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxtYXQtY2hpcCBjb2xvcj1cInt7ZmlsdGVyLmNvbG9yfX1cIiBzZWxlY3RlZD1cInRydWVcIlxuICAgICAgICAgICAgICAgIGlkPVwiZmlsdGVyLXt7aWR4fX0te3tpZHgyfX1cIlxuICAgICAgICAgICAgICAgIFtyZW1vdmFibGVdPVwidHJ1ZVwiIChyZW1vdmVkKT1cInJlbW92ZUZpbHRlcihmaWx0ZXIyKVwiXG4gICAgICAgICAgICAgICAgW21hdFRvb2x0aXBdPVwiZmlsdGVyMi52YWx1ZVwiXG4gICAgICAgICAgICAgICAgW21hdFRvb2x0aXBEaXNhYmxlZF09XCJmaWx0ZXIub3BlcmF0aW9uIT09J2luJ1wiXG4gICAgICAgICAgICAgICAgbWF0VG9vbHRpcFNob3dEZWxheT1cIjE1MDBcIlxuICAgICAgICAgICAgICAgIChjbGljayk9XCJzZWxlY3RGaWx0ZXIoZmlsdGVyMilcIlxuICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsnc2VsZWN0ZWQnOiBmaWx0ZXIyLnNlbGVjdGVkLCAnbWF0LWFjY2VudCc6IGZpbHRlcjIuc2VsZWN0ZWR9XCJcbiAgICAgICAgICAgICAgICAqbmdJZj1cIiFmaWx0ZXIyLmlzZ3JvdXBcIlxuICAgICAgICAgICAgPnt7ZmlsdGVyMi5leHBsYW5hdGlvbn19XG4gICAgICAgICAgICAgICAgPG1hdC1pY29uIG1hdENoaXBSZW1vdmU+Y2FuY2VsPC9tYXQtaWNvbj5cbiAgICAgICAgICAgIDwvbWF0LWNoaXA+XG4gICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiZmlsdGVyMi5pc2dyb3VwXCIgZnhMYXlvdXQ9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ1RlbXBsYXRlT3V0bGV0PVwiZ3JvdXA7IGNvbnRleHQ6IHsgZmlsdGVyOiB0aGlzLmZpbHRlcjIsIGlkeDogdGhpcy5pZHgyfVwiPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvbmctY29udGFpbmVyPlxuICAgIDxzcGFuIGNsYXNzPVwiZ3JvdXAtZW5kXCI+KTwvc3Bhbj5cbjwvbmctdGVtcGxhdGU+XG5gLFxuICBzdHlsZXM6IFtcbiAgICBgXG4gICAgLmVycm9yIHsgY29sb3I6IHJlZDsgfVxuICAgIC5zZWxlY3RvciB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgIH1cbiAgICAuZmlsdGVyIHtcbiAgICAgICAgcGFkZGluZy1ib3R0b206IDEycHg7XG4gICAgfVxuICAgIC5maWx0ZXIgbWF0LWNoaXAge1xuICAgICAgICBtYXJnaW46IDRweDtcbiAgICB9XG4gICAgLmNncm91cCB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgfVxuICAgIG1hdC1jaGlwLnNlbGVjdGVkIHtcbiAgICAgICAgY29sb3I6ICNmZmY7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIH1cbiAgICBzcGFuLmdyb3VwLXN0YXJ0LFxuICAgIHNwYW4uZ3JvdXAtZW5kIHtcbiAgICAgICAgZm9udC1zaXplOiAyNXB4O1xuICAgIH1cbiAgICBidXR0b24uYml0d2lzZSB7XG4gICAgICAgIG1pbi13aWR0aDogMjRweDtcbiAgICAgICAgcGFkZGluZy1sZWZ0OiAwO1xuICAgICAgICBwYWRkaW5nLXJpZ2h0OiAwO1xuICAgIH1cbiAgICBgXG4gIF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBUV0FGaWx0ZXJFZGl0b3JDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQElucHV0KCkgb3B0aW9uczogRmlsdGVyRWRpdG9yT3B0aW9ucztcbiAgICBASW5wdXQoKSBjb25maWc6IEZpbHRlckVkaXRvckNvbmZpZztcbiAgICBAT3V0cHV0KCkgY2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55W10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnlbXT4oKTtcblxuICAgIEBWaWV3Q2hpbGQoJ2ZpbGVTZXQnKSBmaWxlU2V0OiBFbGVtZW50UmVmO1xuXG4gICAgZmlsdGVyT3B0aW9uczogRmlsdGVyRWRpdG9yT3B0aW9ucztcbiAgICBzZWxlY3RlZEZpZWxkID0gJ25vbmUnO1xuICAgIHNlbGVjdGVkVmFsdWUgPSAnJztcbiAgICBvcGVyYXRpb24gPSAnY29udGFpbic7XG4gICAgYWN0aXZlRmlsdGVyczogRmllbGRGaWx0ZXJbXSA9IFtdO1xuICAgIGVkaXRpbmcgPSBmYWxzZTtcbiAgICBvcGVyYXRpb25zOiBhbnkgPSB7XG4gICAgICAgIGNvbnRhaW46ICc9PicsXG4gICAgICAgIGVxdWFsOiAnPT09JyxcbiAgICAgICAgZ3JlYXRlckVxdWFsOiAnPj0nLFxuICAgICAgICBncmVhdGVyOiAnPicsXG4gICAgICAgIGxlc3NFcXVhbDogJzw9JyxcbiAgICAgICAgbGVzczogJzwnLFxuICAgICAgICBpbjogJ2luJyxcbiAgICB9O1xuICAgIG9wZXJhdGlvbnNEYXRhID0gW1xuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnY29udGFpbicsXG4gICAgICAgICAgICBsYWJlbDogJ2NvbnRhaW5zJyxcbiAgICAgICAgICAgIG9wZXJhdG9yOiAnPT4nXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdlcXVhbCcsXG4gICAgICAgICAgICBsYWJlbDogJ2VxdWFscycsXG4gICAgICAgICAgICBvcGVyYXRvcjogJz09PSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2dyZWF0ZXJFcXVhbCcsXG4gICAgICAgICAgICBsYWJlbDogJ2dyZWF0ZXIgb3IgZXF1YWwnLFxuICAgICAgICAgICAgb3BlcmF0b3I6ICc+PSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2dyZWF0ZXInLFxuICAgICAgICAgICAgbGFiZWw6ICdncmVhdGVyJyxcbiAgICAgICAgICAgIG9wZXJhdG9yOiAnPidcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2xlc3NFcXVhbCcsXG4gICAgICAgICAgICBsYWJlbDogJ2xlc3Mgb3IgZXF1YWwnLFxuICAgICAgICAgICAgb3BlcmF0b3I6ICc8PSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2xlc3MnLFxuICAgICAgICAgICAgbGFiZWw6ICdsZXNzJyxcbiAgICAgICAgICAgIG9wZXJhdG9yOiAnPCdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2luJyxcbiAgICAgICAgICAgIGxhYmVsOiAnaW4nLFxuICAgICAgICAgICAgb3BlcmF0b3I6ICdpbidcbiAgICAgICAgfSxcbiAgICBdO1xuXG4gICAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6a2V5ZG93bicsIFsnJGV2ZW50J10pXG4gICAgaGFuZGxlS2V5Ym9hcmRFdmVudChldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAoKGV2ZW50LmtleSA9PT0gJ2MnICYmIGV2ZW50LmN0cmxLZXkpIHx8IGV2ZW50LmtleUNvZGUgPT09IDI3KSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyRmlsdGVycygpO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmtleUNvZGUgPT09IDEzKSB7XG4gICAgICAgICAgICB0aGlzLmFkZEZpbHRlcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgY2hlY2tGaWx0ZXIoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAodGhpcy5zZWxlY3RlZEZpZWxkID09PSAnbm9uZScgfHwgdGhpcy5zZWxlY3RlZFZhbHVlID09PSAnJyk7XG4gICAgfVxuXG4gICAgYWRkRmlsdGVyKCkge1xuICAgICAgICBsZXQgY29sb3IgPSAnJyxcbiAgICAgICAgICAgIGZpZWxkID0gJycsXG4gICAgICAgICAgICBsYWJlbCA9ICcnLFxuICAgICAgICAgICAgbmFtZSA9ICcnLFxuICAgICAgICAgICAgZXhwbGFuYXRpb24gPSB0aGlzLnNlbGVjdGVkRmllbGQgKyAnICcgKyB0aGlzLm9wZXJhdGlvbnNbdGhpcy5vcGVyYXRpb25dICsgJyAnICsgdGhpcy5zZWxlY3RlZFZhbHVlO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gdGhpcy5maWx0ZXJPcHRpb25zLmZpZWxkcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmZpbHRlck9wdGlvbnMuZmllbGRzW2ldLm5hbWUgPT09IHRoaXMuc2VsZWN0ZWRGaWVsZCkge1xuICAgICAgICAgICAgICAgIC8vIGNvbG9yID0gdGhpcy5maWx0ZXJPcHRpb25zLmZpZWxkc1tpXS5jb2xvcjtcbiAgICAgICAgICAgICAgICAvLyBmaWVsZCA9IHRoaXMuZmlsdGVyT3B0aW9ucy5maWVsZHNbaV0uZmllbGQ7XG4gICAgICAgICAgICAgICAgLy8gbGFiZWwgPSB0aGlzLmZpbHRlck9wdGlvbnMuZmllbGRzW2ldLmxhYmVsO1xuICAgICAgICAgICAgICAgIC8vIG5hbWUgPSB0aGlzLmZpbHRlck9wdGlvbnMuZmllbGRzW2ldLm5hbWU7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogLi4ud2l0aCBvYmplY3QgZGVzdHJ1Y3R1cmluZ1xuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICh7IGNvbG9yLCBmaWVsZCwgbGFiZWwsIG5hbWUgfSA9IHRoaXMuZmlsdGVyT3B0aW9ucy5maWVsZHNbaV0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wZXJhdGlvbiA9PT0gJ2luJykge1xuICAgICAgICAgICAgZXhwbGFuYXRpb24gPSB0aGlzLnNlbGVjdGVkRmllbGQgKyAnICcgKyB0aGlzLm9wZXJhdGlvbnNbdGhpcy5vcGVyYXRpb25dICsgJyAoLi4uKSc7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5vcGVyYXRpb24gPT09ICdjb250YWluJykge1xuICAgICAgICAgICAgLy8gZXhwbGFuYXRpb24gPSB0aGlzLnNlbGVjdGVkRmllbGQgKyAnICcgKyB0aGlzLm9wZXJhdGlvbnNbdGhpcy5vcGVyYXRpb25dICsgJyAnICsgdGhpcy5zZWxlY3RlZFZhbHVlO1xuICAgICAgICAgICAgZXhwbGFuYXRpb24gPSAnXCInICsgdGhpcy5zZWxlY3RlZFZhbHVlICsgJ1wiICcgKyB0aGlzLm9wZXJhdGlvbnNbdGhpcy5vcGVyYXRpb25dICsgJyAnICsgdGhpcy5zZWxlY3RlZEZpZWxkO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYWN0aXZlRmlsdGVycy5wdXNoKHtcbiAgICAgICAgICAgIGNvbG9yOiBjb2xvcixcbiAgICAgICAgICAgIGV4cGxhbmF0aW9uOiBleHBsYW5hdGlvbixcbiAgICAgICAgICAgIGxhYmVsOiBsYWJlbCxcbiAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICBmaWVsZDogZmllbGQsXG4gICAgICAgICAgICBiaXR3aXNlOiAnJiYnLFxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLm9wZXJhdGlvbnNbdGhpcy5vcGVyYXRpb25dLFxuICAgICAgICAgICAgdmFsdWU6IHRoaXMuc2VsZWN0ZWRWYWx1ZVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFZhbHVlID0gJyc7XG4gICAgICAgIHRoaXMuY2hhbmdlLmVtaXQodGhpcy5hY3RpdmVGaWx0ZXJzKTtcbiAgICB9XG5cbiAgICBzZWxlY3RGaWx0ZXIoZmlsdGVyOiBGaWVsZEZpbHRlcikge1xuICAgICAgICBmaWx0ZXIuc2VsZWN0ZWQgPSAhZmlsdGVyLnNlbGVjdGVkO1xuICAgICAgICBjb25zdCBncm91cCA9IHRoaXMuZ2V0UGFyZW50RmlsdGVyKGZpbHRlcik7XG4gICAgICAgIGlmIChncm91cCkge1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkQWxsID0gdHJ1ZTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gZ3JvdXAuZmllbGRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRtcGZpbHRlciA9IGdyb3VwLmZpZWxkc1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoIXRtcGZpbHRlci5pc2dyb3VwICYmICF0bXBmaWx0ZXIuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRBbGwgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRBbGwpIHtcbiAgICAgICAgICAgICAgICBncm91cC5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRQYXJlbnRGaWx0ZXIoZmlsdGVyOiBGaWVsZEZpbHRlcik6IEZpZWxkRmlsdGVyIHwgbnVsbCB7XG4gICAgICAgIGNvbnN0IGdldFBhcmVudEZpbHRlckluR3JvdXAgPSAoZ3JvdXA6IEZpZWxkRmlsdGVyLCBmaWx0ZXIyOiBGaWVsZEZpbHRlcik6IEZpZWxkRmlsdGVyIHwgbnVsbCA9PiB7XG4gICAgICAgICAgICByZXQgPSBudWxsO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGdyb3VwLmZpZWxkcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0bXBmaWx0ZXIgPSBncm91cC5maWVsZHNbaV07XG4gICAgICAgICAgICAgICAgaWYgKEpTT04uc3RyaW5naWZ5KHRtcGZpbHRlcikgPT09IEpTT04uc3RyaW5naWZ5KGZpbHRlcjIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBncm91cDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRtcGZpbHRlci5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldCA9IGdldFBhcmVudEZpbHRlckluR3JvdXAodG1wZmlsdGVyLCBmaWx0ZXIyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgIH07XG4gICAgICAgIGxldCByZXQgPSBudWxsO1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IHRoaXMuYWN0aXZlRmlsdGVycy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHRtcGZpbHRlciA9IHRoaXMuYWN0aXZlRmlsdGVyc1tpXTtcbiAgICAgICAgICAgIGlmIChKU09OLnN0cmluZ2lmeSh0bXBmaWx0ZXIpID09PSBKU09OLnN0cmluZ2lmeShmaWx0ZXIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRtcGZpbHRlci5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgcmV0ID0gZ2V0UGFyZW50RmlsdGVySW5Hcm91cCh0bXBmaWx0ZXIsIGZpbHRlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH1cblxuICAgIGFycmF5TW92ZSA9IChhcnI6IGFueVtdLCBvbGRJbmRleDogbnVtYmVyLCBuZXdJbmRleDogbnVtYmVyKTogYW55W10gPT4ge1xuICAgICAgICBpZiAobmV3SW5kZXggPiBhcnIubGVuZ3RoKSB7XG4gICAgICAgICAgICBsZXQgayA9IG5ld0luZGV4IC0gYXJyLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlIChrLS0pIHtcbiAgICAgICAgICAgICAgICBhcnIucHVzaCh1bmRlZmluZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGFyci5zcGxpY2UobmV3SW5kZXgsIDAsIGFyci5zcGxpY2Uob2xkSW5kZXgsIDEpWzBdKTtcbiAgICAgICAgcmV0dXJuIGFycjtcbiAgICB9XG5cbiAgICBtb3ZlVG8oZGlyZWN0aW9uOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGlkeCA9IC0xLFxuICAgICAgICAgICAgdG9JZHggPSAtMSxcbiAgICAgICAgICAgIGdyb3VwID0gLTE7XG4gICAgICAgIC8vIFNlYXJjaGluZyB0aGUgc2VsZWN0ZWQgZmlsdGVyLi4uXG4gICAgICAgIHRoaXMuYWN0aXZlRmlsdGVycy5mb3JFYWNoKChmaWx0ZXIsIHRtcGlkeCkgPT4ge1xuICAgICAgICAgICAgaWYgKGZpbHRlci5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIGlkeCA9IHRtcGlkeDtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGZpbHRlci5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgZmlsdGVyLmZpZWxkcy5mb3JFYWNoKChmaWx0ZXIyLCB0bXBpZHgyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIyLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZHggPSB0bXBpZHgyO1xuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXAgPSB0bXBpZHg7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGlkeCA+PSAwKSB7XG5cbiAgICAgICAgICAgIGlmIChncm91cCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgdG9JZHggPSAoaWR4ICsgZGlyZWN0aW9uKSA+PSAwID8gaWR4ICsgZGlyZWN0aW9uIDogdGhpcy5hY3RpdmVGaWx0ZXJzW2dyb3VwXS5maWVsZHMubGVuZ3RoICsgZGlyZWN0aW9uO1xuICAgICAgICAgICAgICAgIGlmICh0b0lkeCA+PSB0aGlzLmFjdGl2ZUZpbHRlcnNbZ3JvdXBdLmZpZWxkcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9JZHggPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUZpbHRlcnNbZ3JvdXBdLmZpZWxkcyA9IHRoaXMuYXJyYXlNb3ZlKHRoaXMuYWN0aXZlRmlsdGVyc1tncm91cF0uZmllbGRzLCBpZHgsIHRvSWR4KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdG9JZHggPSAoaWR4ICsgZGlyZWN0aW9uKSA+PSAwID8gaWR4ICsgZGlyZWN0aW9uIDogdGhpcy5hY3RpdmVGaWx0ZXJzLmxlbmd0aCArIGRpcmVjdGlvbjtcbiAgICAgICAgICAgICAgICBpZiAodG9JZHggPj0gdGhpcy5hY3RpdmVGaWx0ZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0b0lkeCA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlRmlsdGVycyA9IHRoaXMuYXJyYXlNb3ZlKHRoaXMuYWN0aXZlRmlsdGVycywgaWR4LCB0b0lkeCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2hhbmdlLmVtaXQodGhpcy5hY3RpdmVGaWx0ZXJzKTtcblxuICAgIH1cblxuICAgIGdldFNlbGVjdGVkKCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IGdldEluR3JvdXAgPSAoZ3JvdXA6IEZpZWxkRmlsdGVyKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZ3JvdXAuZmllbGRzLnJlZHVjZSgoYWNjMiwgZmlsdGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlci5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjYzIgKz0gZ2V0SW5Hcm91cChmaWx0ZXIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZmlsdGVyLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjYzIrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjYzI7XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWN0aXZlRmlsdGVycy5yZWR1Y2UoKGFjYywgZmlsdGVyKSA9PiB7XG4gICAgICAgICAgICBpZiAoZmlsdGVyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICBhY2MgKz0gZ2V0SW5Hcm91cChmaWx0ZXIpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChmaWx0ZXIuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICBhY2MrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIH0sIDApO1xuXG4gICAgfVxuXG4gICAgY2xlYXJTZWxlY3Rpb24oKTogdm9pZCB7XG5cbiAgICAgICAgY29uc3QgY2xlYXJTZWxlY3Rpb25Jbkdyb3VwID0gKGdyb3VwKSA9PiB7XG4gICAgICAgICAgICBncm91cC5maWVsZHMuZm9yRWFjaCgoZmlsdGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlci5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpbHRlciA9IGNsZWFyU2VsZWN0aW9uSW5Hcm91cChmaWx0ZXIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZpbHRlci5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gZ3JvdXA7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5hY3RpdmVGaWx0ZXJzID0gdGhpcy5hY3RpdmVGaWx0ZXJzLm1hcCgoZmlsdGVyKSA9PiB7XG4gICAgICAgICAgICBpZiAoZmlsdGVyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICBmaWx0ZXIgPSBjbGVhclNlbGVjdGlvbkluR3JvdXAoZmlsdGVyKTtcbiAgICAgICAgICAgICAgICAvLyBmaWx0ZXIuZmllbGRzID0gZmlsdGVyLmZpZWxkcy5tYXAoKGZpbHRlcjIpID0+IHtcbiAgICAgICAgICAgICAgICAvLyAgICAgZmlsdGVyMi5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIC8vICAgICByZXR1cm4gZmlsdGVyMjtcbiAgICAgICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbHRlci5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIGZpbHRlcjtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBjaGFuZ2VCaXR3aXNlKGZpbHRlcjogRmllbGRGaWx0ZXIsIGJpdHdpc2UpIHtcbiAgICAgICAgZmlsdGVyLmJpdHdpc2UgPSBiaXR3aXNlO1xuICAgICAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMuYWN0aXZlRmlsdGVycyk7XG4gICAgfVxuXG4gICAgZ3JvdXBTZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgZ3JvdXBTZWxlY3RlZEluR3JvdXAgPSAoZmlsdGVyOiBGaWVsZEZpbHRlcikgPT4ge1xuICAgICAgICAgICAgbGV0IHJldDIgPSAwO1xuICAgICAgICAgICAgaWYgKGZpbHRlci5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgZmlsdGVyLmZpZWxkcy5mb3JFYWNoKChmaWx0ZXIyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldDIgKz0gZ3JvdXBTZWxlY3RlZEluR3JvdXAoZmlsdGVyMik7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyMi5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldDIrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXQyO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgZ3JvdXBzID0gdGhpcy5hY3RpdmVGaWx0ZXJzLmZpbHRlcihmaWx0ZXIgPT4gZmlsdGVyLmlzZ3JvdXApO1xuICAgICAgICBsZXQgcmV0ID0gMDtcbiAgICAgICAgZ3JvdXBzLmZvckVhY2goKGdyb3VwKSA9PiB7XG4gICAgICAgICAgICBncm91cC5maWVsZHMuZm9yRWFjaChmaWx0ZXIgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgICAgICByZXQgKz0gZ3JvdXBTZWxlY3RlZEluR3JvdXAoZmlsdGVyKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZpbHRlci5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXQrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXQgPiAwO1xuICAgIH1cblxuICAgIGVudGlyZUdyb3VwU2VsZWN0ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IGVudGlyZUdyb3VwU2VsZWN0ZWRJbkdyb3VwID0gKGdyb3VwOiBGaWVsZEZpbHRlcikgPT4ge1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkMiA9IHRydWU7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gZ3JvdXAuZmllbGRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpbHRlciA9IGdyb3VwLmZpZWxkc1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQyID0gZW50aXJlR3JvdXBTZWxlY3RlZEluR3JvdXAoZmlsdGVyKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFmaWx0ZXIuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQyID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdGVkMiAmJiBncm91cC5maWVsZHMubGVuZ3RoID4gMDtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgZ3JvdXBzID0gdGhpcy5hY3RpdmVGaWx0ZXJzLmZpbHRlcihmaWx0ZXIgPT4gZmlsdGVyLmlzZ3JvdXApO1xuICAgICAgICBsZXQgc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICBmb3IgKGxldCBpZyA9IDAsIGxnID0gZ3JvdXBzLmxlbmd0aDsgaWcgPCBsZzsgaWcrKykge1xuICAgICAgICAgICAgY29uc3QgZ3JvdXAgPSBncm91cHNbaWddO1xuICAgICAgICAgICAgZm9yIChsZXQgaWcyID0gMCwgbGcyID0gZ3JvdXAuZmllbGRzLmxlbmd0aDsgaWcyIDwgbGcyOyBpZzIrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpbHRlciA9IGdyb3VwLmZpZWxkc1tpZzJdO1xuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZCA9IGVudGlyZUdyb3VwU2VsZWN0ZWRJbkdyb3VwKGZpbHRlcik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFmaWx0ZXIuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBncm91cC5maWVsZHMuZm9yRWFjaChmaWx0ZXIgPT4ge1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBncm91cHMuZm9yRWFjaCgoZ3JvdXApID0+IHtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzZWxlY3RlZCAmJiBncm91cHMubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICBjcmVhdGVHcm91cCgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgY3JlYXRlSW5Hcm91cCA9IChmaWx0ZXI6IEZpZWxkRmlsdGVyKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZDIgPSBmaWx0ZXIuZmllbGRzLmZpbHRlcihmaWx0ZXIyID0+IGZpbHRlcjIuc2VsZWN0ZWQpLFxuICAgICAgICAgICAgZ3JvdXBQb3NpdGlvbjIgPSBmaWx0ZXIuZmllbGRzLmZpbmRJbmRleCh2ID0+IHYuc2VsZWN0ZWQpO1xuICAgICAgICAgICAgbGV0IHJlc3VsdEZpbHRlcjI6IEZpZWxkRmlsdGVyW107XG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWQyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdEZpbHRlcjIgPSBmaWx0ZXIuZmllbGRzLmZpbHRlcihmaWx0ZXIyID0+ICFmaWx0ZXIyLnNlbGVjdGVkKTtcbiAgICAgICAgICAgICAgICByZXN1bHRGaWx0ZXIyLnNwbGljZShncm91cFBvc2l0aW9uMiwgMCwge1xuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJycsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICcnLFxuICAgICAgICAgICAgICAgICAgICBmaWVsZDogJycsXG4gICAgICAgICAgICAgICAgICAgIGlzZ3JvdXA6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGJpdHdpc2U6ICcmJicsXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkczogc2VsZWN0ZWQyXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3VsdEZpbHRlcjIgPSBmaWx0ZXIuZmllbGRzLm1hcChmaWx0ZXIyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlcjIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlSW5Hcm91cChmaWx0ZXIyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmlsdGVyMjtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbHRlci5maWVsZHMgPSByZXN1bHRGaWx0ZXIyO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5hY3RpdmVGaWx0ZXJzLmZpbHRlcihmaWx0ZXIgPT4gZmlsdGVyLnNlbGVjdGVkKSxcbiAgICAgICAgICAgICAgZ3JvdXBQb3NpdGlvbiA9IHRoaXMuYWN0aXZlRmlsdGVycy5maW5kSW5kZXgodiA9PiB2LnNlbGVjdGVkKTtcbiAgICAgICAgbGV0IHJlc3VsdEZpbHRlcjogRmllbGRGaWx0ZXJbXTtcbiAgICAgICAgaWYgKHNlbGVjdGVkLmxlbmd0aCkge1xuICAgICAgICAgICAgcmVzdWx0RmlsdGVyID0gdGhpcy5hY3RpdmVGaWx0ZXJzLmZpbHRlcihmaWx0ZXIgPT4gIWZpbHRlci5zZWxlY3RlZCk7XG4gICAgICAgICAgICByZXN1bHRGaWx0ZXIuc3BsaWNlKGdyb3VwUG9zaXRpb24sIDAsIHtcbiAgICAgICAgICAgICAgICBjb2xvcjogJycsXG4gICAgICAgICAgICAgICAgbmFtZTogJycsXG4gICAgICAgICAgICAgICAgZmllbGQ6ICcnLFxuICAgICAgICAgICAgICAgIGlzZ3JvdXA6IHRydWUsXG4gICAgICAgICAgICAgICAgYml0d2lzZTogJyYmJyxcbiAgICAgICAgICAgICAgICBmaWVsZHM6IHNlbGVjdGVkXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlRmlsdGVycyA9IHJlc3VsdEZpbHRlcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdEZpbHRlciA9IHRoaXMuYWN0aXZlRmlsdGVycy5tYXAoZmlsdGVyID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlSW5Hcm91cChmaWx0ZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmlsdGVyO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMuYWN0aXZlRmlsdGVycyk7XG4gICAgfVxuXG4gICAgc2FuaXRpemVHcm91cHMoKSB7XG4gICAgICAgIGNvbnN0IHNhbml0aXplR3JvdXBzSW5Hcm91cCA9IChncm91cCwgcGFyZW50PzogRmllbGRGaWx0ZXIpID0+IHtcbiAgICAgICAgICAgIGdyb3VwLmZpZWxkcy5tYXAoKGZpbHRlcjogRmllbGRGaWx0ZXIsIGlkeDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlci5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIuZmllbGRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXAuZmllbGRzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZpbHRlci5maWVsZHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBncm91cC5maWVsZHMucHVzaCh7Li4uZmlsdGVyLmZpZWxkc1swXX0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXAuZmllbGRzLnNwbGljZShpZHgsIDEsIHsuLi5maWx0ZXIuZmllbGRzWzBdfSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzYW5pdGl6ZUdyb3Vwc0luR3JvdXAoZmlsdGVyLCBncm91cCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hY3RpdmVGaWx0ZXJzLm1hcCgoZmlsdGVyOiBGaWVsZEZpbHRlciwgaWR4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGlmIChmaWx0ZXIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIuZmllbGRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUZpbHRlcnMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmaWx0ZXIuZmllbGRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmFjdGl2ZUZpbHRlcnMucHVzaCh7Li4uZmlsdGVyLmZpZWxkc1swXX0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUZpbHRlcnMuc3BsaWNlKGlkeCwgMSwgey4uLmZpbHRlci5maWVsZHNbMF19KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNhbml0aXplR3JvdXBzSW5Hcm91cChmaWx0ZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVtb3ZlRnJvbUdyb3VwKCk6IHZvaWQge1xuICAgICAgICBjb25zdCByZW1vdmVGcm9tR3JvdXBJbkdyb3VwID0gKGdyb3VwOiBGaWVsZEZpbHRlciwgcGFyZW50OiBGaWVsZEZpbHRlciwgaWR4KSA9PiB7XG4gICAgICAgICAgICBncm91cC5maWVsZHMuZm9yRWFjaCgoZmlsdGVyMiwgaWR4MikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlRnJvbUdyb3VwSW5Hcm91cChmaWx0ZXIyLCBncm91cCwgaWR4Mik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCB0bXBGaWx0ZXJzID0gZ3JvdXAuZmllbGRzLmZpbHRlcigoZmlsdGVyMjogRmllbGRGaWx0ZXIpID0+IGZpbHRlcjIuc2VsZWN0ZWQpO1xuICAgICAgICAgICAgZ3JvdXAuZmllbGRzID0gZ3JvdXAuZmllbGRzLmZpbHRlcigoZmlsdGVyMjogRmllbGRGaWx0ZXIpID0+ICFmaWx0ZXIyLnNlbGVjdGVkKTtcbiAgICAgICAgICAgIHRtcEZpbHRlcnMuZm9yRWFjaCgodjogRmllbGRGaWx0ZXIpID0+IHtcbiAgICAgICAgICAgICAgICB2LnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcGFyZW50LmZpZWxkcy5wdXNoKHYpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoZ3JvdXAuZmllbGRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHBhcmVudC5maWVsZHMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5hY3RpdmVGaWx0ZXJzID0gdGhpcy5hY3RpdmVGaWx0ZXJzLnJlZHVjZSgobmV3RmlsdGVycywgZmlsdGVyKSA9PiB7XG4gICAgICAgICAgICBpZiAoZmlsdGVyLmlzZ3JvdXApIHtcblxuICAgICAgICAgICAgICAgIGZpbHRlci5maWVsZHMuZm9yRWFjaCgoZmlsdGVyMiwgaWR4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZUZyb21Hcm91cEluR3JvdXAoZmlsdGVyMiwgZmlsdGVyLCBpZHgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB0bXBGaWx0ZXJzID0gZmlsdGVyLmZpZWxkcy5maWx0ZXIoZmlsdGVyMiA9PiBmaWx0ZXIyLnNlbGVjdGVkKTtcbiAgICAgICAgICAgICAgICBmaWx0ZXIuZmllbGRzID0gZmlsdGVyLmZpZWxkcy5maWx0ZXIoZmlsdGVyMiA9PiAhZmlsdGVyMi5zZWxlY3RlZCk7XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlci5maWVsZHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld0ZpbHRlcnMucHVzaChmaWx0ZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0bXBGaWx0ZXJzLmZvckVhY2godiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG5ld0ZpbHRlcnMucHVzaCh2KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV3RmlsdGVycy5wdXNoKGZpbHRlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV3RmlsdGVycztcbiAgICAgICAgfSwgW10pO1xuICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgIHRoaXMuc2FuaXRpemVHcm91cHMoKTtcbiAgICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh0aGlzLmFjdGl2ZUZpbHRlcnMpO1xuICAgIH1cblxuICAgIG9uU3RhcnREcmFnRmlsdGVyKF9ldmVudCwgX2ZpbHRlcikge1xuICAgIH1cblxuICAgIG9uRHJvcHBlZEZpbHRlcihldmVudCkge1xuICAgICAgICB0aGlzLmFycmF5TW92ZSh0aGlzLmFjdGl2ZUZpbHRlcnMsIGV2ZW50LnByZXZpb3VzSW5kZXgsIGV2ZW50LmN1cnJlbnRJbmRleCk7XG4gICAgICAgIC8vIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgdGhpcy5zYW5pdGl6ZUdyb3VwcygpO1xuICAgICAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMuYWN0aXZlRmlsdGVycyk7XG4gICAgfVxuXG4gICAgdXBsb2FkU2V0KCkge1xuICAgICAgICBjb25zdCBmaWxlT2JqID0gKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWxlU2V0JykpLmZpbGVzWzBdO1xuICAgICAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgICByZWFkZXIub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbGluZXMgPSAoPHN0cmluZz5yZWFkZXIucmVzdWx0KS5zcGxpdCgvXFxyP1xcbi8pLmZpbHRlcih2YWwgPT4gdmFsID4gJycpO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFZhbHVlID0gbGluZXMuam9pbignLCAnKTtcbiAgICAgICAgICAgIHRoaXMuZmlsZVNldC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XG4gICAgICAgIH07XG4gICAgICAgIHJlYWRlci5yZWFkQXNUZXh0KGZpbGVPYmopO1xuICAgIH1cblxuICAgIHJlbW92ZUZpbHRlcihmaWx0ZXI6IEZpZWxkRmlsdGVyKTogdm9pZCB7XG4gICAgICAgIC8vIGNvbnN0IHJlbW92ZUZpbHRlckluR3JvdXAgPSAoZ3JvdXAsIGZpbHRlcikgPT4ge1xuXG4gICAgICAgIC8vIH07XG4gICAgICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuZ2V0UGFyZW50RmlsdGVyKGZpbHRlcik7XG4gICAgICAgIGxldCBncm91cDogRmllbGRGaWx0ZXJbXTtcbiAgICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICAgICAgZ3JvdXAgPSBwYXJlbnQuZmllbGRzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ3JvdXAgPSB0aGlzLmFjdGl2ZUZpbHRlcnM7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBncm91cC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChKU09OLnN0cmluZ2lmeShncm91cFtpXSkgPT09IEpTT04uc3RyaW5naWZ5KGZpbHRlcikpIHtcbiAgICAgICAgICAgICAgICBncm91cC5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zYW5pdGl6ZUdyb3VwcygpO1xuICAgICAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMuYWN0aXZlRmlsdGVycyk7XG4gICAgfVxuXG4gICAgY2xlYXJGaWx0ZXJzKCkge1xuICAgICAgICB0aGlzLmFjdGl2ZUZpbHRlcnMgPSBbXTtcbiAgICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh0aGlzLmFjdGl2ZUZpbHRlcnMpO1xuICAgIH1cblxuICAgIG9uRm9jdXMoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5lZGl0aW5nID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBvbkJsdXIoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5lZGl0aW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuZmlsdGVyT3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICAgICAgdGhpcy5zZWxlY3RlZEZpZWxkID0gKHR5cGVvZiB0aGlzLmZpbHRlck9wdGlvbnMuZmllbGRzWzBdICE9PSAndW5kZWZpbmVkJykgPyB0aGlzLmZpbHRlck9wdGlvbnMuZmllbGRzWzBdLm5hbWUgOiAnbm9uZSc7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5jb25maWcgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmNvbmZpZy5vcGVyYXRpb25zRGF0YSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wZXJhdGlvbnNEYXRhID0gdGhpcy5jb25maWcub3BlcmF0aW9uc0RhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuY29uZmlnLmZpbHRlciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUZpbHRlcnMgPSB0aGlzLmNvbmZpZy5maWx0ZXIuc2xpY2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyB0aGlzLmZpbHRlck9wdGlvbnMgPSBKU09OLnBhcnNlKHRoaXMub3B0aW9ucyk7XG4gICAgfVxufVxuIl19