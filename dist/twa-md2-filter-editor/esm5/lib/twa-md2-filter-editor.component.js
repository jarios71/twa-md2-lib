/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Output, ElementRef, EventEmitter, ViewChild } from '@angular/core';
import { HostListener } from '@angular/core';
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
        this.arrayMove = (/**
         * @param {?} arr
         * @param {?} oldIndex
         * @param {?} newIndex
         * @return {?}
         */
        function (arr, oldIndex, newIndex) {
            if (newIndex > arr.length) {
                /** @type {?} */
                var k = newIndex - arr.length;
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
        reader.onload = (/**
         * @return {?}
         */
        function () {
            // console.log(reader.result);
            /** @type {?} */
            var data = JSON.parse((/** @type {?} */ (reader.result)));
            _this.activeFilters = data;
            _this.change.emit(_this.activeFilters);
        });
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
    TWAFilterEditorComponent.prototype.sendFilter = /**
     * @return {?}
     */
    function () {
        this.addFilter();
    };
    /**
     * @return {?}
     */
    TWAFilterEditorComponent.prototype.addFilter = /**
     * @return {?}
     */
    function () {
        // console.log('adding filter...');
        var _a;
        // console.log('adding filter...');
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
        // console.log(this.activeFilters);
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
        var getParentFilterInGroup = (/**
         * @param {?} group
         * @param {?} filter2
         * @return {?}
         */
        function (group, filter2) {
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
        });
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
        this.activeFilters.forEach((/**
         * @param {?} filter
         * @param {?} tmpidx
         * @return {?}
         */
        function (filter, tmpidx) {
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
                function (filter2, tmpidx2) {
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
    };
    /**
     * @return {?}
     */
    TWAFilterEditorComponent.prototype.getSelected = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var getInGroup = (/**
         * @param {?} group
         * @return {?}
         */
        function (group) {
            return group.fields.reduce((/**
             * @param {?} acc2
             * @param {?} filter
             * @return {?}
             */
            function (acc2, filter) {
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
        function (acc, filter) {
            if (filter.isgroup) {
                acc += getInGroup(filter);
            }
            else if (filter.selected) {
                acc++;
            }
            return acc;
        }), 0);
    };
    /**
     * @return {?}
     */
    TWAFilterEditorComponent.prototype.clearSelection = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var clearSelectionInGroup = (/**
         * @param {?} group
         * @return {?}
         */
        function (group) {
            group.fields.forEach((/**
             * @param {?} filter
             * @return {?}
             */
            function (filter) {
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
        function (filter) {
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
        var groupSelectedInGroup = (/**
         * @param {?} filter
         * @return {?}
         */
        function (filter) {
            /** @type {?} */
            var ret2 = 0;
            if (filter.isgroup) {
                filter.fields.forEach((/**
                 * @param {?} filter2
                 * @return {?}
                 */
                function (filter2) {
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
        var groups = this.activeFilters.filter((/**
         * @param {?} filter
         * @return {?}
         */
        function (filter) { return filter.isgroup; }));
        /** @type {?} */
        var ret = 0;
        groups.forEach((/**
         * @param {?} group
         * @return {?}
         */
        function (group) {
            group.fields.forEach((/**
             * @param {?} filter
             * @return {?}
             */
            function (filter) {
                if (filter.isgroup) {
                    ret += groupSelectedInGroup(filter);
                }
                else if (filter.selected) {
                    ret++;
                }
            }));
        }));
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
        var entireGroupSelectedInGroup = (/**
         * @param {?} group
         * @return {?}
         */
        function (group) {
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
        });
        /** @type {?} */
        var groups = this.activeFilters.filter((/**
         * @param {?} filter
         * @return {?}
         */
        function (filter) { return filter.isgroup; }));
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
            group.fields.forEach((/**
             * @param {?} filter
             * @return {?}
             */
            function (filter) {
            }));
            if (selected) {
                return true;
            }
        }
        groups.forEach((/**
         * @param {?} group
         * @return {?}
         */
        function (group) {
        }));
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
        var createInGroup = (/**
         * @param {?} filter
         * @return {?}
         */
        function (filter) {
            /** @type {?} */
            var selected2 = filter.fields.filter((/**
             * @param {?} filter2
             * @return {?}
             */
            function (filter2) { return filter2.selected; }));
            /** @type {?} */
            var groupPosition2 = filter.fields.findIndex((/**
             * @param {?} v
             * @return {?}
             */
            function (v) { return v.selected; }));
            /** @type {?} */
            var resultFilter2;
            if (selected2.length) {
                resultFilter2 = filter.fields.filter((/**
                 * @param {?} filter2
                 * @return {?}
                 */
                function (filter2) { return !filter2.selected; }));
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
                function (filter2) {
                    if (filter2.isgroup) {
                        createInGroup(filter2);
                    }
                    return filter2;
                }));
            }
            filter.fields = resultFilter2;
        });
        /** @type {?} */
        var selected = this.activeFilters.filter((/**
         * @param {?} filter
         * @return {?}
         */
        function (filter) { return filter.selected; }));
        /** @type {?} */
        var groupPosition = this.activeFilters.findIndex((/**
         * @param {?} v
         * @return {?}
         */
        function (v) { return v.selected; }));
        /** @type {?} */
        var resultFilter;
        if (selected.length) {
            resultFilter = this.activeFilters.filter((/**
             * @param {?} filter
             * @return {?}
             */
            function (filter) { return !filter.selected; }));
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
            function (filter) {
                if (filter.isgroup) {
                    createInGroup(filter);
                }
                return filter;
            }));
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
        var sanitizeGroupsInGroup = (/**
         * @param {?} group
         * @param {?=} parent
         * @return {?}
         */
        function (group, parent) {
            group.fields.map((/**
             * @param {?} filter
             * @param {?} idx
             * @return {?}
             */
            function (filter, idx) {
                if (filter.isgroup) {
                    if (filter.fields.length === 0) {
                        group.fields.splice(idx, 1);
                    }
                    else if (filter.fields.length === 1) {
                        // group.fields.push({...filter.fields[0]});
                        group.fields.splice(idx, 1, tslib_1.__assign({}, filter.fields[0]));
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
        function (filter, idx) {
            if (filter.isgroup) {
                if (filter.fields.length === 0) {
                    _this.activeFilters.splice(idx, 1);
                }
                else if (filter.fields.length === 1) {
                    // this.activeFilters.push({...filter.fields[0]});
                    _this.activeFilters.splice(idx, 1, tslib_1.__assign({}, filter.fields[0]));
                }
                else {
                    sanitizeGroupsInGroup(filter);
                }
            }
        }));
    };
    /**
     * @return {?}
     */
    TWAFilterEditorComponent.prototype.removeFromGroup = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var removeFromGroupInGroup = (/**
         * @param {?} group
         * @param {?} parent
         * @param {?} idx
         * @return {?}
         */
        function (group, parent, idx) {
            group.fields.forEach((/**
             * @param {?} filter2
             * @param {?} idx2
             * @return {?}
             */
            function (filter2, idx2) {
                if (filter2.isgroup) {
                    removeFromGroupInGroup(filter2, group, idx2);
                }
            }));
            /** @type {?} */
            var tmpFilters = group.fields.filter((/**
             * @param {?} filter2
             * @return {?}
             */
            function (filter2) { return filter2.selected; }));
            group.fields = group.fields.filter((/**
             * @param {?} filter2
             * @return {?}
             */
            function (filter2) { return !filter2.selected; }));
            tmpFilters.forEach((/**
             * @param {?} v
             * @return {?}
             */
            function (v) {
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
        function (newFilters, filter) {
            if (filter.isgroup) {
                filter.fields.forEach((/**
                 * @param {?} filter2
                 * @param {?} idx
                 * @return {?}
                 */
                function (filter2, idx) {
                    if (filter2.isgroup) {
                        removeFromGroupInGroup(filter2, filter, idx);
                    }
                }));
                /** @type {?} */
                var tmpFilters = filter.fields.filter((/**
                 * @param {?} filter2
                 * @return {?}
                 */
                function (filter2) { return filter2.selected; }));
                filter.fields = filter.fields.filter((/**
                 * @param {?} filter2
                 * @return {?}
                 */
                function (filter2) { return !filter2.selected; }));
                if (filter.fields.length) {
                    newFilters.push(filter);
                }
                tmpFilters.forEach((/**
                 * @param {?} v
                 * @return {?}
                 */
                function (v) {
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
        reader.onload = (/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var lines = ((/** @type {?} */ (reader.result))).split(/\r?\n/).filter((/**
             * @param {?} val
             * @return {?}
             */
            function (val) { return val > ''; }));
            _this.selectedValue = lines.join(', ');
            _this.fileSet.nativeElement.value = '';
        });
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
                this.texts = tslib_1.__assign({}, this.texts, this.config.texts);
            }
        }
        // this.filterOptions = JSON.parse(this.options);
    };
    TWAFilterEditorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'twa-md2-filter-editor',
                    template: "<div fxLayout=\"column\" style=\"width: 100%;\">\n    <div class=\"selector\" fxLayout=\"row\" fxLayoutGap=\"10px\">\n        <mat-form-field>\n            <mat-select [(ngModel)]=\"selectedField\">\n                <mat-option selected value=\"none\">{{texts.filterBy}}</mat-option>\n                <mat-option *ngFor=\"let field of filterOptions.fields\" [(value)]=\"field.name\">{{field.label}}</mat-option>\n            </mat-select>\n        </mat-form-field>\n        <mat-form-field>\n            <mat-select [(ngModel)]=\"operation\">\n                <mat-option *ngFor=\"let op of operationsData\" value=\"{{op.type}}\">{{op.label}}</mat-option>\n            </mat-select>\n        </mat-form-field>\n        <mat-form-field>\n            <input matInput placeholder=\"{{texts.filter}}\" [(ngModel)]=\"selectedValue\"\n                    (focus)=\"onFocus($event)\" (blur)=\"onBlur($event)\" />\n            <button mat-button *ngIf=\"operation==='in'\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"fileSet.click()\">\n                <mat-icon>attach_file</mat-icon>\n            </button>\n        </mat-form-field>\n        <div>\n            <button mat-button mat-icon-button (click)=\"sendFilter()\" [disabled]=\"checkFilter()\">\n                <mat-icon>send</mat-icon>\n            </button>\n        </div>\n        <div fxFlex></div>\n        <button mat-button mat-icon-button\n                *ngIf=\"activeFilters.length === 0\"\n                matTooltip=\"{{texts.openFilter}}\"\n                (click)=\"openFiltersFile.click()\">\n            <mat-icon>folder_open</mat-icon>\n        </button>\n        <div class=\"tools\" *ngIf=\"activeFilters.length > 0\" fxLayout=\"row\">\n            <button mat-button mat-icon-button\n                    matTooltip=\"{{texts.group}}\"\n                    (click)=\"createGroup()\"\n                    [disabled]=\"getSelected() < 2\">\n                <mat-icon>link</mat-icon>\n            </button>\n            <button mat-button mat-icon-button\n                    matTooltip=\"{{texts.ungroup}}\"\n                    (click)=\"removeFromGroup()\"\n                    [disabled]=\"!groupSelected()\">\n                <mat-icon>link_off</mat-icon>\n            </button>\n            <button mat-button mat-icon-button\n                    matTooltip=\"{{texts.moveLeft}}\"\n                    (click)=\"moveTo(-1)\"\n                    [disabled]=\"getSelected() !== 1 && !entireGroupSelected()\">\n                <mat-icon>arrow_back</mat-icon>\n            </button>\n            <button mat-button mat-icon-button\n                    matTooltip=\"{{texts.moveRight}}\"\n                    (click)=\"moveTo(1)\"\n                    [disabled]=\"getSelected() !== 1 && !entireGroupSelected()\">\n                <mat-icon>arrow_forward</mat-icon>\n            </button>\n            <button mat-button mat-icon-button\n                    matTooltip=\"{{texts.openFilter}}\"\n                    (click)=\"openFiltersFile.click()\">\n                <mat-icon>folder_open</mat-icon>\n            </button>\n            <button mat-button mat-icon-button\n                    matTooltip=\"{{texts.saveFilter}}\"\n                    [disabled]=\"getSelected() > 1\"\n                    (click)=\"saveFilters()\">\n                <mat-icon>save</mat-icon>\n            </button>\n            <button mat-button mat-icon-button\n                    matTooltip=\"{{texts.clearSelection}}\"\n                    [disabled]=\"getSelected() < 1\"\n                    (click)=\"clearSelection()\">\n                <mat-icon>clear</mat-icon>\n            </button>\n            <button mat-button mat-icon-button\n                    matTooltip=\"{{texts.clearAll}}\"\n                    [disabled]=\"activeFilters.length < 1\"\n                    (click)=\"clearFilters()\">\n                <mat-icon>clear_all</mat-icon>\n            </button>\n        </div>\n    </div>\n    <div class=\"filter\" fxLayoutGap=\"12\">\n        <mat-chip-list cdkDropList\n                        cdkDropListOrientation=\"horizontal\"\n                        (cdkDropListDropped)=\"onDroppedFilter($event)\">\n            <ng-container *ngFor=\"let filter of activeFilters; let idx = index\">\n                <div fxLayout=\"row\"\n                cdkDrag\n                (cdkDragStarted)=\"onStartDragFilter($event, filter)\" [ngClass]=\"{'cgroup': filter.isgroup}\">\n                    <button mat-button *ngIf=\"idx > 0\" [matMenuTriggerFor]=\"menu\" class=\"bitwise\">{{filter.bitwise}}</button>\n                    <mat-menu #menu=\"matMenu\">\n                        <button mat-menu-item (click)=\"changeBitwise(filter, '&&')\">&&</button>\n                        <button mat-menu-item (click)=\"changeBitwise(filter, '||')\">||</button>\n                    </mat-menu>\n                    <mat-chip color=\"{{filter.color}}\" selected=\"true\"\n                                id=\"filter-{{idx}}\"\n                                [removable]=\"true\" (removed)=\"removeFilter(filter)\"\n                                [matTooltip]=\"filter.value\"\n                                [matTooltipDisabled]=\"filter.operation!=='in'\"\n                                matTooltipShowDelay=\"1500\"\n                                (click)=\"selectFilter(filter)\"\n                                *ngIf=\"!filter.isgroup\"\n                                [ngClass]=\"{'selected': filter.selected, 'mat-accent': filter.selected}\">\n                        {{filter.explanation}}\n                        <mat-icon matChipRemove>cancel</mat-icon>\n                    </mat-chip>\n                    <div *ngIf=\"filter.isgroup\" fxLayout=\"row\">\n                        <div *ngTemplateOutlet=\"group; context: { filter: this.filter, idx: this.idx}\" fxLayout=\"row\">\n                        </div>\n                    </div>\n                </div>\n            </ng-container>\n        </mat-chip-list>\n    </div>\n</div>\n<input style=\"visibilty: hidden; height: 0px; width: 0px;\" type=\"file\" id=\"fileSet\" #fileSet (change)=\"uploadSet()\" />\n<input style=\"visibilty: hidden; height: 0px; width: 0px;\" type=\"file\" id=\"openFiltersFile\" #openFiltersFile (change)=\"openFilters()\" />\n<ng-template #group let-filter=\"filter\" let-idx=\"idx\">\n    <span class=\"group-start\">(</span>\n    <ng-container *ngFor=\"let filter2 of filter.fields; let idx2 = index\">\n        <button mat-button *ngIf=\"idx2 > 0\" [matMenuTriggerFor]=\"menu2\"\n                class=\"bitwise\">\n            {{filter2.bitwise}}\n        </button>\n        <mat-menu #menu2=\"matMenu\">\n            <button mat-menu-item (click)=\"changeBitwise(filter2, '&&')\">&&</button>\n            <button mat-menu-item (click)=\"changeBitwise(filter2, '||')\">||</button>\n        </mat-menu>\n        <div>\n            <mat-chip color=\"{{filter.color}}\" selected=\"true\"\n                id=\"filter-{{idx}}-{{idx2}}\"\n                [removable]=\"true\" (removed)=\"removeFilter(filter2)\"\n                [matTooltip]=\"filter2.value\"\n                [matTooltipDisabled]=\"filter.operation!=='in'\"\n                matTooltipShowDelay=\"1500\"\n                (click)=\"selectFilter(filter2)\"\n                [ngClass]=\"{'selected': filter2.selected, 'mat-accent': filter2.selected}\"\n                *ngIf=\"!filter2.isgroup\"\n            >{{filter2.explanation}}\n                <mat-icon matChipRemove>cancel</mat-icon>\n            </mat-chip>\n            <div *ngIf=\"filter2.isgroup\" fxLayout=\"row\">\n                <div *ngTemplateOutlet=\"group; context: { filter: this.filter2, idx: this.idx2}\">\n                </div>\n            </div>\n        </div>\n    </ng-container>\n    <span class=\"group-end\">)</span>\n</ng-template>\n",
                    styles: ["\n    .error { color: red; }\n    .selector {\n        width: 100%;\n    }\n    .filter {\n        padding-bottom: 12px;\n    }\n    .filter mat-chip {\n        margin: 4px;\n    }\n    .cgroup {\n        display: flex;\n    }\n    mat-chip.selected {\n        color: #fff;\n        font-weight: bold;\n    }\n    span.group-start,\n    span.group-end {\n        font-size: 25px;\n    }\n    button.bitwise {\n        min-width: 24px;\n        padding-left: 0;\n        padding-right: 0;\n    }\n    "]
                }] }
    ];
    /** @nocollapse */
    TWAFilterEditorComponent.ctorParameters = function () { return []; };
    TWAFilterEditorComponent.propDecorators = {
        options: [{ type: Input }],
        config: [{ type: Input }],
        change: [{ type: Output }],
        fileSet: [{ type: ViewChild, args: ['fileSet', { static: true },] }],
        openFiltersFile: [{ type: ViewChild, args: ['oepnFiltersFile', { static: true },] }],
        handleKeyboardEvent: [{ type: HostListener, args: ['document:keydown', ['$event'],] }]
    };
    return TWAFilterEditorComponent;
}());
export { TWAFilterEditorComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdhLW1kMi1maWx0ZXItZWRpdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3R3YS1tZDItZmlsdGVyLWVkaXRvci8iLCJzb3VyY2VzIjpbImxpYi90d2EtbWQyLWZpbHRlci1lZGl0b3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RHLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJN0M7SUF1SEk7UUFoRlUsV0FBTSxHQUF3QixJQUFJLFlBQVksRUFBUyxDQUFDO1FBTWxFLGtCQUFhLEdBQUcsTUFBTSxDQUFDO1FBQ3ZCLGtCQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ25CLGNBQVMsR0FBRyxTQUFTLENBQUM7UUFDdEIsa0JBQWEsR0FBa0IsRUFBRSxDQUFDO1FBQ2xDLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsVUFBSyxHQUFHO1lBQ0osUUFBUSxFQUFFLGNBQWM7WUFDeEIsTUFBTSxFQUFFLFFBQVE7WUFDaEIsS0FBSyxFQUFFLE9BQU87WUFDZCxPQUFPLEVBQUUsU0FBUztZQUNsQixRQUFRLEVBQUUsY0FBYztZQUN4QixTQUFTLEVBQUUsZUFBZTtZQUMxQixVQUFVLEVBQUUsbUJBQW1CO1lBQy9CLFVBQVUsRUFBRSxhQUFhO1lBQ3pCLGNBQWMsRUFBRSxpQkFBaUI7WUFDakMsUUFBUSxFQUFFLGVBQWU7U0FFNUIsQ0FBQztRQUNGLGVBQVUsR0FBUTtZQUNkLE9BQU8sRUFBRSxJQUFJO1lBQ2IsS0FBSyxFQUFFLEtBQUs7WUFDWixZQUFZLEVBQUUsSUFBSTtZQUNsQixPQUFPLEVBQUUsR0FBRztZQUNaLFNBQVMsRUFBRSxJQUFJO1lBQ2YsSUFBSSxFQUFFLEdBQUc7WUFDVCxFQUFFLEVBQUUsSUFBSTtTQUNYLENBQUM7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QUFFLENBQUMsUUFBUSxDQUFDOztJQWtnQmhELCtCQUFDO0NBQUEsQUFobkJELElBZ25CQztTQTdrQlksd0JBQXdCOzs7SUFFakMsMkNBQXNDOztJQUN0QywwQ0FBb0M7O0lBQ3BDLDBDQUFrRTs7SUFFbEUsMkNBQTBEOztJQUMxRCxtREFBMEU7O0lBRTFFLGlEQUFtQzs7SUFDbkMsaURBQXVCOztJQUN2QixpREFBbUI7O0lBQ25CLDZDQUFzQjs7SUFDdEIsaURBQWtDOztJQUNsQywyQ0FBZ0I7O0lBQ2hCLHlDQVlFOztJQUNGLDhDQVFFOztJQUNGLGtEQW9DRTs7SUFzSUYsNkNBU0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBGaWx0ZXJFZGl0b3JPcHRpb25zLCBGaWVsZEZpbHRlciwgRmlsdGVyRWRpdG9yQ29uZmlnIH0gZnJvbSAnLi90d2EtbWQyLWZpbHRlci1lZGl0b3IuaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndHdhLW1kMi1maWx0ZXItZWRpdG9yJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3R3YS1tZDItZmlsdGVyLWVkaXRvci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICAuZXJyb3IgeyBjb2xvcjogcmVkOyB9XG4gICAgLnNlbGVjdG9yIHtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgfVxuICAgIC5maWx0ZXIge1xuICAgICAgICBwYWRkaW5nLWJvdHRvbTogMTJweDtcbiAgICB9XG4gICAgLmZpbHRlciBtYXQtY2hpcCB7XG4gICAgICAgIG1hcmdpbjogNHB4O1xuICAgIH1cbiAgICAuY2dyb3VwIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICB9XG4gICAgbWF0LWNoaXAuc2VsZWN0ZWQge1xuICAgICAgICBjb2xvcjogI2ZmZjtcbiAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgfVxuICAgIHNwYW4uZ3JvdXAtc3RhcnQsXG4gICAgc3Bhbi5ncm91cC1lbmQge1xuICAgICAgICBmb250LXNpemU6IDI1cHg7XG4gICAgfVxuICAgIGJ1dHRvbi5iaXR3aXNlIHtcbiAgICAgICAgbWluLXdpZHRoOiAyNHB4O1xuICAgICAgICBwYWRkaW5nLWxlZnQ6IDA7XG4gICAgICAgIHBhZGRpbmctcmlnaHQ6IDA7XG4gICAgfVxuICAgIGBcbiAgXVxufSlcblxuZXhwb3J0IGNsYXNzIFRXQUZpbHRlckVkaXRvckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBASW5wdXQoKSBvcHRpb25zOiBGaWx0ZXJFZGl0b3JPcHRpb25zO1xuICAgIEBJbnB1dCgpIGNvbmZpZzogRmlsdGVyRWRpdG9yQ29uZmlnO1xuICAgIEBPdXRwdXQoKSBjaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnlbXT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueVtdPigpO1xuXG4gICAgQFZpZXdDaGlsZCgnZmlsZVNldCcsIHtzdGF0aWM6IHRydWV9KSBmaWxlU2V0OiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoJ29lcG5GaWx0ZXJzRmlsZScsIHtzdGF0aWM6IHRydWV9KSBvcGVuRmlsdGVyc0ZpbGU6IEVsZW1lbnRSZWY7XG5cbiAgICBmaWx0ZXJPcHRpb25zOiBGaWx0ZXJFZGl0b3JPcHRpb25zO1xuICAgIHNlbGVjdGVkRmllbGQgPSAnbm9uZSc7XG4gICAgc2VsZWN0ZWRWYWx1ZSA9ICcnO1xuICAgIG9wZXJhdGlvbiA9ICdjb250YWluJztcbiAgICBhY3RpdmVGaWx0ZXJzOiBGaWVsZEZpbHRlcltdID0gW107XG4gICAgZWRpdGluZyA9IGZhbHNlO1xuICAgIHRleHRzID0ge1xuICAgICAgICBmaWx0ZXJCeTogJ0ZpbHRlciBieS4uLicsXG4gICAgICAgIGZpbHRlcjogJ2ZpbHRlcicsXG4gICAgICAgIGdyb3VwOiAnR3JvdXAnLFxuICAgICAgICB1bmdyb3VwOiAnVW5ncm91cCcsXG4gICAgICAgIG1vdmVMZWZ0OiAnTW92ZSB0byBsZWZ0JyxcbiAgICAgICAgbW92ZVJpZ2h0OiAnTW92ZSB0byByaWdodCcsXG4gICAgICAgIG9wZW5GaWx0ZXI6ICdPcGVuIHNhdmVkIGZpbHRlcicsXG4gICAgICAgIHNhdmVGaWx0ZXI6ICdTYXZlIGZpbHRlcicsXG4gICAgICAgIGNsZWFyU2VsZWN0aW9uOiAnQ2xlYXIgc2VsZWN0aW9uJyxcbiAgICAgICAgY2xlYXJBbGw6ICdDbGVhciBmaWx0ZXJzJyxcblxuICAgIH07XG4gICAgb3BlcmF0aW9uczogYW55ID0ge1xuICAgICAgICBjb250YWluOiAnPT4nLFxuICAgICAgICBlcXVhbDogJz09PScsXG4gICAgICAgIGdyZWF0ZXJFcXVhbDogJz49JyxcbiAgICAgICAgZ3JlYXRlcjogJz4nLFxuICAgICAgICBsZXNzRXF1YWw6ICc8PScsXG4gICAgICAgIGxlc3M6ICc8JyxcbiAgICAgICAgaW46ICdpbicsXG4gICAgfTtcbiAgICBvcGVyYXRpb25zRGF0YSA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2NvbnRhaW4nLFxuICAgICAgICAgICAgbGFiZWw6ICdjb250YWlucycsXG4gICAgICAgICAgICBvcGVyYXRvcjogJz0+J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnZXF1YWwnLFxuICAgICAgICAgICAgbGFiZWw6ICdlcXVhbHMnLFxuICAgICAgICAgICAgb3BlcmF0b3I6ICc9PT0nXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdncmVhdGVyRXF1YWwnLFxuICAgICAgICAgICAgbGFiZWw6ICdncmVhdGVyIG9yIGVxdWFsJyxcbiAgICAgICAgICAgIG9wZXJhdG9yOiAnPj0nXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdncmVhdGVyJyxcbiAgICAgICAgICAgIGxhYmVsOiAnZ3JlYXRlcicsXG4gICAgICAgICAgICBvcGVyYXRvcjogJz4nXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdsZXNzRXF1YWwnLFxuICAgICAgICAgICAgbGFiZWw6ICdsZXNzIG9yIGVxdWFsJyxcbiAgICAgICAgICAgIG9wZXJhdG9yOiAnPD0nXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdsZXNzJyxcbiAgICAgICAgICAgIGxhYmVsOiAnbGVzcycsXG4gICAgICAgICAgICBvcGVyYXRvcjogJzwnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdpbicsXG4gICAgICAgICAgICBsYWJlbDogJ2luJyxcbiAgICAgICAgICAgIG9wZXJhdG9yOiAnaW4nXG4gICAgICAgIH0sXG4gICAgXTtcblxuICAgIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmtleWRvd24nLCBbJyRldmVudCddKVxuICAgIGhhbmRsZUtleWJvYXJkRXZlbnQoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKChldmVudC5rZXkgPT09ICdjJyAmJiBldmVudC5jdHJsS2V5KSkge1xuICAgICAgICAgICAgdGhpcy5jbGVhckZpbHRlcnMoKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmVkaXRpbmcgJiYgZXZlbnQua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkRmlsdGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgICBvcGVuRmlsdGVycygpIHtcbiAgICAgICAgY29uc3QgZmlsZU9iaiA9ICg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3BlbkZpbHRlcnNGaWxlJykpLmZpbGVzWzBdO1xuICAgICAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgICByZWFkZXIub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVhZGVyLnJlc3VsdCk7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZSg8c3RyaW5nPnJlYWRlci5yZXN1bHQpO1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVGaWx0ZXJzID0gZGF0YTtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlLmVtaXQodGhpcy5hY3RpdmVGaWx0ZXJzKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmVhZGVyLnJlYWRBc1RleHQoZmlsZU9iaik7XG4gICAgfVxuXG4gICAgc2F2ZUZpbHRlcnMoKSB7XG4gICAgICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbSlNPTi5zdHJpbmdpZnkodGhpcy5hY3RpdmVGaWx0ZXJzKV0sIHsgdHlwZTogJ3RleHQvanNvbicgfSk7XG4gICAgICAgIGNvbnN0IGZpbGVuYW1lID0gJ2ZpbHRlcnMuanNvbic7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgIGVsZW1lbnQuaHJlZiA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgICAgICBlbGVtZW50LmRvd25sb2FkID0gZmlsZW5hbWU7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgICAgIGVsZW1lbnQuY2xpY2soKTtcbiAgICB9XG5cbiAgICBjaGVja0ZpbHRlcigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLnNlbGVjdGVkRmllbGQgPT09ICdub25lJyB8fCB0aGlzLnNlbGVjdGVkVmFsdWUgPT09ICcnKTtcbiAgICB9XG5cbiAgICBzZW5kRmlsdGVyKCkge1xuICAgICAgICB0aGlzLmFkZEZpbHRlcigpO1xuICAgIH1cblxuICAgIGFkZEZpbHRlcigpIHtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZygnYWRkaW5nIGZpbHRlci4uLicpO1xuXG4gICAgICAgIGxldCBjb2xvciA9ICcnLFxuICAgICAgICAgICAgZmllbGQgPSAnJyxcbiAgICAgICAgICAgIGRiZmllbGQgPSAnJyxcbiAgICAgICAgICAgIGxhYmVsID0gJycsXG4gICAgICAgICAgICBuYW1lID0gJycsXG4gICAgICAgICAgICBleHBsYW5hdGlvbiA9IHRoaXMuc2VsZWN0ZWRGaWVsZCArICcgJyArIHRoaXMub3BlcmF0aW9uc1t0aGlzLm9wZXJhdGlvbl0gKyAnICcgKyB0aGlzLnNlbGVjdGVkVmFsdWU7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSB0aGlzLmZpbHRlck9wdGlvbnMuZmllbGRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMuZmlsdGVyT3B0aW9ucy5maWVsZHNbaV0ubmFtZSA9PT0gdGhpcy5zZWxlY3RlZEZpZWxkKSB7XG4gICAgICAgICAgICAgICAgLy8gY29sb3IgPSB0aGlzLmZpbHRlck9wdGlvbnMuZmllbGRzW2ldLmNvbG9yO1xuICAgICAgICAgICAgICAgIC8vIGZpZWxkID0gdGhpcy5maWx0ZXJPcHRpb25zLmZpZWxkc1tpXS5maWVsZDtcbiAgICAgICAgICAgICAgICAvLyBsYWJlbCA9IHRoaXMuZmlsdGVyT3B0aW9ucy5maWVsZHNbaV0ubGFiZWw7XG4gICAgICAgICAgICAgICAgLy8gbmFtZSA9IHRoaXMuZmlsdGVyT3B0aW9ucy5maWVsZHNbaV0ubmFtZTtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiAuLi53aXRoIG9iamVjdCBkZXN0cnVjdHVyaW5nXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgKHsgY29sb3IsIGZpZWxkLCBkYmZpZWxkLCBsYWJlbCwgbmFtZSB9ID0gdGhpcy5maWx0ZXJPcHRpb25zLmZpZWxkc1tpXSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3BlcmF0aW9uID09PSAnaW4nKSB7XG4gICAgICAgICAgICBleHBsYW5hdGlvbiA9IHRoaXMuc2VsZWN0ZWRGaWVsZCArICcgJyArIHRoaXMub3BlcmF0aW9uc1t0aGlzLm9wZXJhdGlvbl0gKyAnICguLi4pJztcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm9wZXJhdGlvbiA9PT0gJ2NvbnRhaW4nKSB7XG4gICAgICAgICAgICAvLyBleHBsYW5hdGlvbiA9IHRoaXMuc2VsZWN0ZWRGaWVsZCArICcgJyArIHRoaXMub3BlcmF0aW9uc1t0aGlzLm9wZXJhdGlvbl0gKyAnICcgKyB0aGlzLnNlbGVjdGVkVmFsdWU7XG4gICAgICAgICAgICBleHBsYW5hdGlvbiA9ICdcIicgKyB0aGlzLnNlbGVjdGVkVmFsdWUgKyAnXCIgJyArIHRoaXMub3BlcmF0aW9uc1t0aGlzLm9wZXJhdGlvbl0gKyAnICcgKyB0aGlzLnNlbGVjdGVkRmllbGQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hY3RpdmVGaWx0ZXJzLnB1c2goe1xuICAgICAgICAgICAgY29sb3I6IGNvbG9yLFxuICAgICAgICAgICAgZXhwbGFuYXRpb246IGV4cGxhbmF0aW9uLFxuICAgICAgICAgICAgbGFiZWw6IGxhYmVsLFxuICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgIGZpZWxkOiBmaWVsZCxcbiAgICAgICAgICAgIGRiZmllbGQ6IGRiZmllbGQsXG4gICAgICAgICAgICBiaXR3aXNlOiAnJiYnLFxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLm9wZXJhdGlvbnNbdGhpcy5vcGVyYXRpb25dLFxuICAgICAgICAgICAgdmFsdWU6IHRoaXMuc2VsZWN0ZWRWYWx1ZVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFZhbHVlID0gJyc7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuYWN0aXZlRmlsdGVycyk7XG4gICAgICAgIHRoaXMuY2hhbmdlLmVtaXQodGhpcy5hY3RpdmVGaWx0ZXJzKTtcbiAgICB9XG5cbiAgICBzZWxlY3RGaWx0ZXIoZmlsdGVyOiBGaWVsZEZpbHRlcikge1xuICAgICAgICBmaWx0ZXIuc2VsZWN0ZWQgPSAhZmlsdGVyLnNlbGVjdGVkO1xuICAgICAgICBjb25zdCBncm91cCA9IHRoaXMuZ2V0UGFyZW50RmlsdGVyKGZpbHRlcik7XG4gICAgICAgIGlmIChncm91cCkge1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkQWxsID0gdHJ1ZTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gZ3JvdXAuZmllbGRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRtcGZpbHRlciA9IGdyb3VwLmZpZWxkc1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoIXRtcGZpbHRlci5pc2dyb3VwICYmICF0bXBmaWx0ZXIuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRBbGwgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRBbGwpIHtcbiAgICAgICAgICAgICAgICBncm91cC5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRQYXJlbnRGaWx0ZXIoZmlsdGVyOiBGaWVsZEZpbHRlcik6IEZpZWxkRmlsdGVyIHwgbnVsbCB7XG4gICAgICAgIGNvbnN0IGdldFBhcmVudEZpbHRlckluR3JvdXAgPSAoZ3JvdXA6IEZpZWxkRmlsdGVyLCBmaWx0ZXIyOiBGaWVsZEZpbHRlcik6IEZpZWxkRmlsdGVyIHwgbnVsbCA9PiB7XG4gICAgICAgICAgICByZXQgPSBudWxsO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGdyb3VwLmZpZWxkcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0bXBmaWx0ZXIgPSBncm91cC5maWVsZHNbaV07XG4gICAgICAgICAgICAgICAgaWYgKEpTT04uc3RyaW5naWZ5KHRtcGZpbHRlcikgPT09IEpTT04uc3RyaW5naWZ5KGZpbHRlcjIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBncm91cDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRtcGZpbHRlci5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldCA9IGdldFBhcmVudEZpbHRlckluR3JvdXAodG1wZmlsdGVyLCBmaWx0ZXIyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgIH07XG4gICAgICAgIGxldCByZXQgPSBudWxsO1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IHRoaXMuYWN0aXZlRmlsdGVycy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHRtcGZpbHRlciA9IHRoaXMuYWN0aXZlRmlsdGVyc1tpXTtcbiAgICAgICAgICAgIGlmIChKU09OLnN0cmluZ2lmeSh0bXBmaWx0ZXIpID09PSBKU09OLnN0cmluZ2lmeShmaWx0ZXIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRtcGZpbHRlci5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgcmV0ID0gZ2V0UGFyZW50RmlsdGVySW5Hcm91cCh0bXBmaWx0ZXIsIGZpbHRlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH1cblxuICAgIGFycmF5TW92ZSA9IChhcnI6IGFueVtdLCBvbGRJbmRleDogbnVtYmVyLCBuZXdJbmRleDogbnVtYmVyKTogYW55W10gPT4ge1xuICAgICAgICBpZiAobmV3SW5kZXggPiBhcnIubGVuZ3RoKSB7XG4gICAgICAgICAgICBsZXQgayA9IG5ld0luZGV4IC0gYXJyLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlIChrLS0pIHtcbiAgICAgICAgICAgICAgICBhcnIucHVzaCh1bmRlZmluZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGFyci5zcGxpY2UobmV3SW5kZXgsIDAsIGFyci5zcGxpY2Uob2xkSW5kZXgsIDEpWzBdKTtcbiAgICAgICAgcmV0dXJuIGFycjtcbiAgICB9XG5cbiAgICBtb3ZlVG8oZGlyZWN0aW9uOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGlkeCA9IC0xLFxuICAgICAgICAgICAgdG9JZHggPSAtMSxcbiAgICAgICAgICAgIGdyb3VwID0gLTE7XG4gICAgICAgIC8vIFNlYXJjaGluZyB0aGUgc2VsZWN0ZWQgZmlsdGVyLi4uXG4gICAgICAgIHRoaXMuYWN0aXZlRmlsdGVycy5mb3JFYWNoKChmaWx0ZXIsIHRtcGlkeCkgPT4ge1xuICAgICAgICAgICAgaWYgKGZpbHRlci5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIGlkeCA9IHRtcGlkeDtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGZpbHRlci5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgZmlsdGVyLmZpZWxkcy5mb3JFYWNoKChmaWx0ZXIyLCB0bXBpZHgyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIyLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZHggPSB0bXBpZHgyO1xuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXAgPSB0bXBpZHg7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGlkeCA+PSAwKSB7XG5cbiAgICAgICAgICAgIGlmIChncm91cCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgdG9JZHggPSAoaWR4ICsgZGlyZWN0aW9uKSA+PSAwID8gaWR4ICsgZGlyZWN0aW9uIDogdGhpcy5hY3RpdmVGaWx0ZXJzW2dyb3VwXS5maWVsZHMubGVuZ3RoICsgZGlyZWN0aW9uO1xuICAgICAgICAgICAgICAgIGlmICh0b0lkeCA+PSB0aGlzLmFjdGl2ZUZpbHRlcnNbZ3JvdXBdLmZpZWxkcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9JZHggPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUZpbHRlcnNbZ3JvdXBdLmZpZWxkcyA9IHRoaXMuYXJyYXlNb3ZlKHRoaXMuYWN0aXZlRmlsdGVyc1tncm91cF0uZmllbGRzLCBpZHgsIHRvSWR4KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdG9JZHggPSAoaWR4ICsgZGlyZWN0aW9uKSA+PSAwID8gaWR4ICsgZGlyZWN0aW9uIDogdGhpcy5hY3RpdmVGaWx0ZXJzLmxlbmd0aCArIGRpcmVjdGlvbjtcbiAgICAgICAgICAgICAgICBpZiAodG9JZHggPj0gdGhpcy5hY3RpdmVGaWx0ZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0b0lkeCA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlRmlsdGVycyA9IHRoaXMuYXJyYXlNb3ZlKHRoaXMuYWN0aXZlRmlsdGVycywgaWR4LCB0b0lkeCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2hhbmdlLmVtaXQodGhpcy5hY3RpdmVGaWx0ZXJzKTtcblxuICAgIH1cblxuICAgIGdldFNlbGVjdGVkKCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IGdldEluR3JvdXAgPSAoZ3JvdXA6IEZpZWxkRmlsdGVyKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZ3JvdXAuZmllbGRzLnJlZHVjZSgoYWNjMiwgZmlsdGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlci5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjYzIgKz0gZ2V0SW5Hcm91cChmaWx0ZXIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZmlsdGVyLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjYzIrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjYzI7XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWN0aXZlRmlsdGVycy5yZWR1Y2UoKGFjYywgZmlsdGVyKSA9PiB7XG4gICAgICAgICAgICBpZiAoZmlsdGVyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICBhY2MgKz0gZ2V0SW5Hcm91cChmaWx0ZXIpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChmaWx0ZXIuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICBhY2MrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIH0sIDApO1xuXG4gICAgfVxuXG4gICAgY2xlYXJTZWxlY3Rpb24oKTogdm9pZCB7XG5cbiAgICAgICAgY29uc3QgY2xlYXJTZWxlY3Rpb25Jbkdyb3VwID0gKGdyb3VwKSA9PiB7XG4gICAgICAgICAgICBncm91cC5maWVsZHMuZm9yRWFjaCgoZmlsdGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlci5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpbHRlciA9IGNsZWFyU2VsZWN0aW9uSW5Hcm91cChmaWx0ZXIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZpbHRlci5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gZ3JvdXA7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5hY3RpdmVGaWx0ZXJzID0gdGhpcy5hY3RpdmVGaWx0ZXJzLm1hcCgoZmlsdGVyKSA9PiB7XG4gICAgICAgICAgICBpZiAoZmlsdGVyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICBmaWx0ZXIgPSBjbGVhclNlbGVjdGlvbkluR3JvdXAoZmlsdGVyKTtcbiAgICAgICAgICAgICAgICAvLyBmaWx0ZXIuZmllbGRzID0gZmlsdGVyLmZpZWxkcy5tYXAoKGZpbHRlcjIpID0+IHtcbiAgICAgICAgICAgICAgICAvLyAgICAgZmlsdGVyMi5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIC8vICAgICByZXR1cm4gZmlsdGVyMjtcbiAgICAgICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbHRlci5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIGZpbHRlcjtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBjaGFuZ2VCaXR3aXNlKGZpbHRlcjogRmllbGRGaWx0ZXIsIGJpdHdpc2UpIHtcbiAgICAgICAgZmlsdGVyLmJpdHdpc2UgPSBiaXR3aXNlO1xuICAgICAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMuYWN0aXZlRmlsdGVycyk7XG4gICAgfVxuXG4gICAgZ3JvdXBTZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgZ3JvdXBTZWxlY3RlZEluR3JvdXAgPSAoZmlsdGVyOiBGaWVsZEZpbHRlcikgPT4ge1xuICAgICAgICAgICAgbGV0IHJldDIgPSAwO1xuICAgICAgICAgICAgaWYgKGZpbHRlci5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgZmlsdGVyLmZpZWxkcy5mb3JFYWNoKChmaWx0ZXIyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldDIgKz0gZ3JvdXBTZWxlY3RlZEluR3JvdXAoZmlsdGVyMik7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyMi5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldDIrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXQyO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgZ3JvdXBzID0gdGhpcy5hY3RpdmVGaWx0ZXJzLmZpbHRlcihmaWx0ZXIgPT4gZmlsdGVyLmlzZ3JvdXApO1xuICAgICAgICBsZXQgcmV0ID0gMDtcbiAgICAgICAgZ3JvdXBzLmZvckVhY2goKGdyb3VwKSA9PiB7XG4gICAgICAgICAgICBncm91cC5maWVsZHMuZm9yRWFjaChmaWx0ZXIgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgICAgICByZXQgKz0gZ3JvdXBTZWxlY3RlZEluR3JvdXAoZmlsdGVyKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZpbHRlci5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXQrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXQgPiAwO1xuICAgIH1cblxuICAgIGVudGlyZUdyb3VwU2VsZWN0ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IGVudGlyZUdyb3VwU2VsZWN0ZWRJbkdyb3VwID0gKGdyb3VwOiBGaWVsZEZpbHRlcikgPT4ge1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkMiA9IHRydWU7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gZ3JvdXAuZmllbGRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpbHRlciA9IGdyb3VwLmZpZWxkc1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQyID0gZW50aXJlR3JvdXBTZWxlY3RlZEluR3JvdXAoZmlsdGVyKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFmaWx0ZXIuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQyID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdGVkMiAmJiBncm91cC5maWVsZHMubGVuZ3RoID4gMDtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgZ3JvdXBzID0gdGhpcy5hY3RpdmVGaWx0ZXJzLmZpbHRlcihmaWx0ZXIgPT4gZmlsdGVyLmlzZ3JvdXApO1xuICAgICAgICBsZXQgc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICBmb3IgKGxldCBpZyA9IDAsIGxnID0gZ3JvdXBzLmxlbmd0aDsgaWcgPCBsZzsgaWcrKykge1xuICAgICAgICAgICAgY29uc3QgZ3JvdXAgPSBncm91cHNbaWddO1xuICAgICAgICAgICAgZm9yIChsZXQgaWcyID0gMCwgbGcyID0gZ3JvdXAuZmllbGRzLmxlbmd0aDsgaWcyIDwgbGcyOyBpZzIrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpbHRlciA9IGdyb3VwLmZpZWxkc1tpZzJdO1xuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZCA9IGVudGlyZUdyb3VwU2VsZWN0ZWRJbkdyb3VwKGZpbHRlcik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFmaWx0ZXIuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBncm91cC5maWVsZHMuZm9yRWFjaChmaWx0ZXIgPT4ge1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBncm91cHMuZm9yRWFjaCgoZ3JvdXApID0+IHtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzZWxlY3RlZCAmJiBncm91cHMubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICBjcmVhdGVHcm91cCgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgY3JlYXRlSW5Hcm91cCA9IChmaWx0ZXI6IEZpZWxkRmlsdGVyKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZDIgPSBmaWx0ZXIuZmllbGRzLmZpbHRlcihmaWx0ZXIyID0+IGZpbHRlcjIuc2VsZWN0ZWQpLFxuICAgICAgICAgICAgZ3JvdXBQb3NpdGlvbjIgPSBmaWx0ZXIuZmllbGRzLmZpbmRJbmRleCh2ID0+IHYuc2VsZWN0ZWQpO1xuICAgICAgICAgICAgbGV0IHJlc3VsdEZpbHRlcjI6IEZpZWxkRmlsdGVyW107XG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWQyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdEZpbHRlcjIgPSBmaWx0ZXIuZmllbGRzLmZpbHRlcihmaWx0ZXIyID0+ICFmaWx0ZXIyLnNlbGVjdGVkKTtcbiAgICAgICAgICAgICAgICByZXN1bHRGaWx0ZXIyLnNwbGljZShncm91cFBvc2l0aW9uMiwgMCwge1xuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJycsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICcnLFxuICAgICAgICAgICAgICAgICAgICBmaWVsZDogJycsXG4gICAgICAgICAgICAgICAgICAgIGlzZ3JvdXA6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGJpdHdpc2U6ICcmJicsXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkczogc2VsZWN0ZWQyXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3VsdEZpbHRlcjIgPSBmaWx0ZXIuZmllbGRzLm1hcChmaWx0ZXIyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlcjIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlSW5Hcm91cChmaWx0ZXIyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmlsdGVyMjtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbHRlci5maWVsZHMgPSByZXN1bHRGaWx0ZXIyO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5hY3RpdmVGaWx0ZXJzLmZpbHRlcihmaWx0ZXIgPT4gZmlsdGVyLnNlbGVjdGVkKSxcbiAgICAgICAgICAgICAgZ3JvdXBQb3NpdGlvbiA9IHRoaXMuYWN0aXZlRmlsdGVycy5maW5kSW5kZXgodiA9PiB2LnNlbGVjdGVkKTtcbiAgICAgICAgbGV0IHJlc3VsdEZpbHRlcjogRmllbGRGaWx0ZXJbXTtcbiAgICAgICAgaWYgKHNlbGVjdGVkLmxlbmd0aCkge1xuICAgICAgICAgICAgcmVzdWx0RmlsdGVyID0gdGhpcy5hY3RpdmVGaWx0ZXJzLmZpbHRlcihmaWx0ZXIgPT4gIWZpbHRlci5zZWxlY3RlZCk7XG4gICAgICAgICAgICByZXN1bHRGaWx0ZXIuc3BsaWNlKGdyb3VwUG9zaXRpb24sIDAsIHtcbiAgICAgICAgICAgICAgICBjb2xvcjogJycsXG4gICAgICAgICAgICAgICAgbmFtZTogJycsXG4gICAgICAgICAgICAgICAgZmllbGQ6ICcnLFxuICAgICAgICAgICAgICAgIGlzZ3JvdXA6IHRydWUsXG4gICAgICAgICAgICAgICAgYml0d2lzZTogJyYmJyxcbiAgICAgICAgICAgICAgICBmaWVsZHM6IHNlbGVjdGVkXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlRmlsdGVycyA9IHJlc3VsdEZpbHRlcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdEZpbHRlciA9IHRoaXMuYWN0aXZlRmlsdGVycy5tYXAoZmlsdGVyID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlSW5Hcm91cChmaWx0ZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmlsdGVyO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMuYWN0aXZlRmlsdGVycyk7XG4gICAgfVxuXG4gICAgc2FuaXRpemVHcm91cHMoKSB7XG4gICAgICAgIGNvbnN0IHNhbml0aXplR3JvdXBzSW5Hcm91cCA9IChncm91cCwgcGFyZW50PzogRmllbGRGaWx0ZXIpID0+IHtcbiAgICAgICAgICAgIGdyb3VwLmZpZWxkcy5tYXAoKGZpbHRlcjogRmllbGRGaWx0ZXIsIGlkeDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlci5pc2dyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIuZmllbGRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXAuZmllbGRzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZpbHRlci5maWVsZHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBncm91cC5maWVsZHMucHVzaCh7Li4uZmlsdGVyLmZpZWxkc1swXX0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXAuZmllbGRzLnNwbGljZShpZHgsIDEsIHsuLi5maWx0ZXIuZmllbGRzWzBdfSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzYW5pdGl6ZUdyb3Vwc0luR3JvdXAoZmlsdGVyLCBncm91cCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hY3RpdmVGaWx0ZXJzLm1hcCgoZmlsdGVyOiBGaWVsZEZpbHRlciwgaWR4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGlmIChmaWx0ZXIuaXNncm91cCkge1xuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIuZmllbGRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUZpbHRlcnMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmaWx0ZXIuZmllbGRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmFjdGl2ZUZpbHRlcnMucHVzaCh7Li4uZmlsdGVyLmZpZWxkc1swXX0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUZpbHRlcnMuc3BsaWNlKGlkeCwgMSwgey4uLmZpbHRlci5maWVsZHNbMF19KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNhbml0aXplR3JvdXBzSW5Hcm91cChmaWx0ZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVtb3ZlRnJvbUdyb3VwKCk6IHZvaWQge1xuICAgICAgICBjb25zdCByZW1vdmVGcm9tR3JvdXBJbkdyb3VwID0gKGdyb3VwOiBGaWVsZEZpbHRlciwgcGFyZW50OiBGaWVsZEZpbHRlciwgaWR4KSA9PiB7XG4gICAgICAgICAgICBncm91cC5maWVsZHMuZm9yRWFjaCgoZmlsdGVyMiwgaWR4MikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlRnJvbUdyb3VwSW5Hcm91cChmaWx0ZXIyLCBncm91cCwgaWR4Mik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCB0bXBGaWx0ZXJzID0gZ3JvdXAuZmllbGRzLmZpbHRlcigoZmlsdGVyMjogRmllbGRGaWx0ZXIpID0+IGZpbHRlcjIuc2VsZWN0ZWQpO1xuICAgICAgICAgICAgZ3JvdXAuZmllbGRzID0gZ3JvdXAuZmllbGRzLmZpbHRlcigoZmlsdGVyMjogRmllbGRGaWx0ZXIpID0+ICFmaWx0ZXIyLnNlbGVjdGVkKTtcbiAgICAgICAgICAgIHRtcEZpbHRlcnMuZm9yRWFjaCgodjogRmllbGRGaWx0ZXIpID0+IHtcbiAgICAgICAgICAgICAgICB2LnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcGFyZW50LmZpZWxkcy5wdXNoKHYpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoZ3JvdXAuZmllbGRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHBhcmVudC5maWVsZHMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5hY3RpdmVGaWx0ZXJzID0gdGhpcy5hY3RpdmVGaWx0ZXJzLnJlZHVjZSgobmV3RmlsdGVycywgZmlsdGVyKSA9PiB7XG4gICAgICAgICAgICBpZiAoZmlsdGVyLmlzZ3JvdXApIHtcblxuICAgICAgICAgICAgICAgIGZpbHRlci5maWVsZHMuZm9yRWFjaCgoZmlsdGVyMiwgaWR4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIyLmlzZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZUZyb21Hcm91cEluR3JvdXAoZmlsdGVyMiwgZmlsdGVyLCBpZHgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB0bXBGaWx0ZXJzID0gZmlsdGVyLmZpZWxkcy5maWx0ZXIoZmlsdGVyMiA9PiBmaWx0ZXIyLnNlbGVjdGVkKTtcbiAgICAgICAgICAgICAgICBmaWx0ZXIuZmllbGRzID0gZmlsdGVyLmZpZWxkcy5maWx0ZXIoZmlsdGVyMiA9PiAhZmlsdGVyMi5zZWxlY3RlZCk7XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlci5maWVsZHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld0ZpbHRlcnMucHVzaChmaWx0ZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0bXBGaWx0ZXJzLmZvckVhY2godiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG5ld0ZpbHRlcnMucHVzaCh2KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV3RmlsdGVycy5wdXNoKGZpbHRlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV3RmlsdGVycztcbiAgICAgICAgfSwgW10pO1xuICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgIHRoaXMuc2FuaXRpemVHcm91cHMoKTtcbiAgICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh0aGlzLmFjdGl2ZUZpbHRlcnMpO1xuICAgIH1cblxuICAgIG9uU3RhcnREcmFnRmlsdGVyKF9ldmVudCwgX2ZpbHRlcikge1xuICAgIH1cblxuICAgIG9uRHJvcHBlZEZpbHRlcihldmVudCkge1xuICAgICAgICB0aGlzLmFycmF5TW92ZSh0aGlzLmFjdGl2ZUZpbHRlcnMsIGV2ZW50LnByZXZpb3VzSW5kZXgsIGV2ZW50LmN1cnJlbnRJbmRleCk7XG4gICAgICAgIC8vIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgdGhpcy5zYW5pdGl6ZUdyb3VwcygpO1xuICAgICAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMuYWN0aXZlRmlsdGVycyk7XG4gICAgfVxuXG4gICAgdXBsb2FkU2V0KCkge1xuICAgICAgICBjb25zdCBmaWxlT2JqID0gKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWxlU2V0JykpLmZpbGVzWzBdO1xuICAgICAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgICByZWFkZXIub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbGluZXMgPSAoPHN0cmluZz5yZWFkZXIucmVzdWx0KS5zcGxpdCgvXFxyP1xcbi8pLmZpbHRlcih2YWwgPT4gdmFsID4gJycpO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFZhbHVlID0gbGluZXMuam9pbignLCAnKTtcbiAgICAgICAgICAgIHRoaXMuZmlsZVNldC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XG4gICAgICAgIH07XG4gICAgICAgIHJlYWRlci5yZWFkQXNUZXh0KGZpbGVPYmopO1xuICAgIH1cblxuICAgIHJlbW92ZUZpbHRlcihmaWx0ZXI6IEZpZWxkRmlsdGVyKTogdm9pZCB7XG4gICAgICAgIC8vIGNvbnN0IHJlbW92ZUZpbHRlckluR3JvdXAgPSAoZ3JvdXAsIGZpbHRlcikgPT4ge1xuXG4gICAgICAgIC8vIH07XG4gICAgICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuZ2V0UGFyZW50RmlsdGVyKGZpbHRlcik7XG4gICAgICAgIGxldCBncm91cDogRmllbGRGaWx0ZXJbXTtcbiAgICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICAgICAgZ3JvdXAgPSBwYXJlbnQuZmllbGRzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ3JvdXAgPSB0aGlzLmFjdGl2ZUZpbHRlcnM7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBncm91cC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChKU09OLnN0cmluZ2lmeShncm91cFtpXSkgPT09IEpTT04uc3RyaW5naWZ5KGZpbHRlcikpIHtcbiAgICAgICAgICAgICAgICBncm91cC5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zYW5pdGl6ZUdyb3VwcygpO1xuICAgICAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMuYWN0aXZlRmlsdGVycyk7XG4gICAgfVxuXG4gICAgY2xlYXJGaWx0ZXJzKCkge1xuICAgICAgICB0aGlzLmFjdGl2ZUZpbHRlcnMgPSBbXTtcbiAgICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh0aGlzLmFjdGl2ZUZpbHRlcnMpO1xuICAgIH1cblxuICAgIG9uRm9jdXMoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5lZGl0aW5nID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBvbkJsdXIoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5lZGl0aW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuZmlsdGVyT3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICAgICAgdGhpcy5zZWxlY3RlZEZpZWxkID0gKHR5cGVvZiB0aGlzLmZpbHRlck9wdGlvbnMuZmllbGRzWzBdICE9PSAndW5kZWZpbmVkJykgPyB0aGlzLmZpbHRlck9wdGlvbnMuZmllbGRzWzBdLm5hbWUgOiAnbm9uZSc7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5jb25maWcgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnICYmIHR5cGVvZiB0aGlzLmNvbmZpZy5vcGVyYXRpb25zRGF0YSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wZXJhdGlvbnNEYXRhID0gdGhpcy5jb25maWcub3BlcmF0aW9uc0RhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5jb25maWcgJiYgdHlwZW9mIHRoaXMuY29uZmlnLmZpbHRlciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUZpbHRlcnMgPSB0aGlzLmNvbmZpZy5maWx0ZXIuc2xpY2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZyAmJiB0eXBlb2YgdGhpcy5jb25maWcudGV4dHMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0cyA9IHsuLi50aGlzLnRleHRzLCAuLi50aGlzLmNvbmZpZy50ZXh0c307XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gdGhpcy5maWx0ZXJPcHRpb25zID0gSlNPTi5wYXJzZSh0aGlzLm9wdGlvbnMpO1xuICAgIH1cbn1cbiJdfQ==