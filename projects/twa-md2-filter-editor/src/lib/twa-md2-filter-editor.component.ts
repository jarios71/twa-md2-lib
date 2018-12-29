import { Component, OnInit, Input, Output, ElementRef, EventEmitter, ViewChild } from '@angular/core';
import { HostListener } from '@angular/core';

import { FilterEditorOptions, FieldFilter, FilterEditorConfig } from './twa-md2-filter-editor.interface';

@Component({
  selector: 'twa-md2-filter-editor',
  templateUrl: './twa-md2-filter-editor.component.html',
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
})

export class TWAFilterEditorComponent implements OnInit {

    @Input() options: FilterEditorOptions;
    @Input() config: FilterEditorConfig;
    @Output() change: EventEmitter<any[]> = new EventEmitter<any[]>();

    @ViewChild('fileSet') fileSet: ElementRef;

    filterOptions: FilterEditorOptions;
    selectedField = 'none';
    selectedValue = '';
    operation = 'contain';
    activeFilters: FieldFilter[] = [];
    editing = false;
    operations: any = {
        contain: '=>',
        equal: '===',
        greaterEqual: '>=',
        greater: '>',
        lessEqual: '<=',
        less: '<',
        in: 'in',
    };
    operationsData = [
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

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if ((event.key === 'c' && event.ctrlKey) || event.keyCode === 27) {
            this.clearFilters();
        } else if (event.keyCode === 13) {
            this.addFilter();
        }
    }

    constructor() {}

    checkFilter(): boolean {
        return (this.selectedField === 'none' || this.selectedValue === '');
    }

    addFilter() {
        let color = '',
            field = '',
            label = '',
            name = '',
            explanation = this.selectedField + ' ' + this.operations[this.operation] + ' ' + this.selectedValue;

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
        } else if (this.operation === 'contain') {
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

    selectFilter(filter: FieldFilter) {
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

    getParentFilter(filter: FieldFilter): FieldFilter | null {
        const getParentFilterInGroup = (group: FieldFilter, filter2: FieldFilter): FieldFilter | null => {
            ret = null;

            for (let i = 0, l = group.fields.length; i < l; i++) {
                const tmpfilter = group.fields[i];
                if (JSON.stringify(tmpfilter) === JSON.stringify(filter2)) {
                    return group;
                } else if (tmpfilter.isgroup) {
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
            } else if (tmpfilter.isgroup) {
                ret = getParentFilterInGroup(tmpfilter, filter);
            }
        }

        return ret;
    }

    arrayMove = (arr: any[], oldIndex: number, newIndex: number): any[] => {
        if (newIndex > arr.length) {
            let k = newIndex - arr.length;
            while (k--) {
                arr.push(undefined);
            }
        }
        arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
        return arr;
    }

    moveTo(direction: number) {
        let idx = -1,
            toIdx = -1,
            group = -1;
        // Searching the selected filter...
        this.activeFilters.forEach((filter, tmpidx) => {
            if (filter.selected) {
                idx = tmpidx;
                return;
            } else if (filter.isgroup) {
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
            } else {
                toIdx = (idx + direction) >= 0 ? idx + direction : this.activeFilters.length + direction;
                if (toIdx >= this.activeFilters.length) {
                    toIdx = 0;
                }
                this.activeFilters = this.arrayMove(this.activeFilters, idx, toIdx);
            }

        }

        this.change.emit(this.activeFilters);

    }

    getSelected(): number {
        const getInGroup = (group: FieldFilter) => {
            return group.fields.reduce((acc2, filter) => {
                if (filter.isgroup) {
                    acc2 += getInGroup(filter);
                } else if (filter.selected) {
                    acc2++;
                }
                return acc2;
            }, 0);
        };
        return this.activeFilters.reduce((acc, filter) => {
            if (filter.isgroup) {
                acc += getInGroup(filter);
            } else if (filter.selected) {
                acc++;
            }
            return acc;
        }, 0);

    }

    clearSelection(): void {

        const clearSelectionInGroup = (group) => {
            group.fields.forEach((filter) => {
                if (filter.isgroup) {
                    filter = clearSelectionInGroup(filter);
                } else {
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

    changeBitwise(filter: FieldFilter, bitwise) {
        filter.bitwise = bitwise;
        this.change.emit(this.activeFilters);
    }

    groupSelected(): boolean {
        const groupSelectedInGroup = (filter: FieldFilter) => {
            let ret2 = 0;
            if (filter.isgroup) {
                filter.fields.forEach((filter2) => {
                    if (filter2.isgroup) {
                        ret2 += groupSelectedInGroup(filter2);
                    } else {
                        if (filter2.selected) {
                            ret2++;
                        }
                    }
                });
                return ret2;
            } else {
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
                } else if (filter.selected) {
                    ret++;
                }
            });
        });
        return ret > 0;
    }

    entireGroupSelected(): boolean {
        const entireGroupSelectedInGroup = (group: FieldFilter) => {
            let selected2 = true;

            for (let i = 0, l = group.fields.length; i < l; i++) {
                const filter = group.fields[i];
                if (filter.isgroup) {
                    selected2 = entireGroupSelectedInGroup(filter);
                    if (selected2) {
                        return true;
                    }
                } else if (!filter.selected) {
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
                } else if (!filter.selected) {
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

    createGroup(): void {
        const createInGroup = (filter: FieldFilter) => {
            const selected2 = filter.fields.filter(filter2 => filter2.selected),
            groupPosition2 = filter.fields.findIndex(v => v.selected);
            let resultFilter2: FieldFilter[];
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
            } else {
                resultFilter2 = filter.fields.map(filter2 => {
                    if (filter2.isgroup) {
                        createInGroup(filter2);
                    }
                    return filter2;
                });
            }
            filter.fields = resultFilter2;
        };

        const selected = this.activeFilters.filter(filter => filter.selected),
              groupPosition = this.activeFilters.findIndex(v => v.selected);
        let resultFilter: FieldFilter[];
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
        } else {
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
        const sanitizeGroupsInGroup = (group, parent?: FieldFilter) => {
            group.fields.map((filter: FieldFilter, idx: number) => {
                if (filter.isgroup) {
                    if (filter.fields.length === 0) {
                        group.fields.splice(idx, 1);
                    } else if (filter.fields.length === 1) {
                        // group.fields.push({...filter.fields[0]});
                        group.fields.splice(idx, 1, {...filter.fields[0]});
                    } else {
                        sanitizeGroupsInGroup(filter, group);
                    }
                }
            });
        };
        this.activeFilters.map((filter: FieldFilter, idx: number) => {
            if (filter.isgroup) {
                if (filter.fields.length === 0) {
                    this.activeFilters.splice(idx, 1);
                } else if (filter.fields.length === 1) {
                    // this.activeFilters.push({...filter.fields[0]});
                    this.activeFilters.splice(idx, 1, {...filter.fields[0]});
            } else {
                    sanitizeGroupsInGroup(filter);
                }
            }
        });
    }

    removeFromGroup(): void {
        const removeFromGroupInGroup = (group: FieldFilter, parent: FieldFilter, idx) => {
            group.fields.forEach((filter2, idx2) => {
                if (filter2.isgroup) {
                    removeFromGroupInGroup(filter2, group, idx2);
                }
            });
            const tmpFilters = group.fields.filter((filter2: FieldFilter) => filter2.selected);
            group.fields = group.fields.filter((filter2: FieldFilter) => !filter2.selected);
            tmpFilters.forEach((v: FieldFilter) => {
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
            } else {
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
        this.arrayMove(this.activeFilters, event.previousIndex, event.currentIndex);
        // this.clearSelection();
        this.sanitizeGroups();
        this.change.emit(this.activeFilters);
    }

    uploadSet() {
        const fileObj = (<HTMLInputElement>document.getElementById('fileSet')).files[0];
        const reader = new FileReader();
        reader.onload = () => {
            const lines = (<string>reader.result).split(/\r?\n/).filter(val => val > '');
            this.selectedValue = lines.join(', ');
            this.fileSet.nativeElement.value = '';
        };
        reader.readAsText(fileObj);
    }

    removeFilter(filter: FieldFilter): void {
        // const removeFilterInGroup = (group, filter) => {

        // };
        const parent = this.getParentFilter(filter);
        let group: FieldFilter[];
        if (parent) {
            group = parent.fields;
        } else {
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
