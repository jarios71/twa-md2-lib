(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/forms'), require('@angular/material/icon'), require('@angular/material/select'), require('@angular/material/chips'), require('@angular/material/input'), require('@angular/material/button'), require('@angular/flex-layout'), require('@angular/material/tooltip'), require('@angular/material/menu'), require('@angular/cdk/drag-drop')) :
    typeof define === 'function' && define.amd ? define('twa-md2-filter-editor', ['exports', '@angular/core', '@angular/common', '@angular/forms', '@angular/material/icon', '@angular/material/select', '@angular/material/chips', '@angular/material/input', '@angular/material/button', '@angular/flex-layout', '@angular/material/tooltip', '@angular/material/menu', '@angular/cdk/drag-drop'], factory) :
    (global = global || self, factory(global['twa-md2-filter-editor'] = {}, global.ng.core, global.ng.common, global.ng.forms, global.ng.material.icon, global.ng.material.select, global.ng.material.chips, global.ng.material.input, global.ng.material.button, global.ng.flexLayout, global.ng.material.tooltip, global.ng.material.menu, global.ng.cdk.dragDrop));
}(this, (function (exports, core, common, forms, icon, select, chips, input, button, flexLayout, tooltip, menu, dragDrop) { 'use strict';

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
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    var TWAFilterEditorService = /** @class */ (function () {
        function TWAFilterEditorService() {
            var _this = this;
            this.processFilterOrs = function (filters) {
                var actualFilter = 0;
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
                        var newGroup = __assign(__assign({}, v), { fields: _this.processFilterOrs(v.fields) });
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
                var comparators = {
                    '=>': function (a, b) { return a.includes(b); },
                    '===': function (a, b) { return a === b; },
                    '>=': function (a, b) { return a >= b; },
                    '>': function (a, b) { return a > b; },
                    '<=': function (a, b) { return a <= b; },
                    '<': function (a, b) { return a < b; },
                    'in': function (a, b) { return b.split(',').includes(a); },
                };
                var isNumeric = function (n) {
                    return !isNaN(parseFloat(n)) && isFinite(n);
                };
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
                        else if ((!isNumeric(filterValue[filter.field]) || !isNumeric(filter.value)) &&
                            (typeof filterValue[filter.field] === 'string' || filterValue[filter.field] instanceof String)) {
                            retValue = comparators[filter.operation](String(filterValue[filter.field]).toLowerCase(), String(filter.value).toLowerCase());
                        }
                        else if (isNumeric(filterValue[filter.field]) && isNumeric(filter.value)) {
                            retValue = comparators[filter.operation](+filterValue[filter.field], +filter.value);
                        }
                        else {
                            retValue = comparators[filter.operation](filterValue[filter.field], filter.value);
                        }
                    }
                    catch (_a) {
                        retValue = false;
                    }
                }
                return retValue;
            };
            this.filterGroup = function (filter, filterValue) {
                var results = [];
                var _loop_1 = function (i, l) {
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
        TWAFilterEditorService.prototype.init = function (filter, data, prepareData) {
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
        TWAFilterEditorService.prototype.applyFilter = function (data) {
            var _this = this;
            if (data === void 0) { data = this.data.slice(); }
            // let data = this.data.slice();
            var ret = true;
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
        TWAFilterEditorService.prototype.applyFilterToRow = function (item) {
            var _this = this;
            var ret = true;
            var results = [];
            var _loop_2 = function (i, l) {
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
        TWAFilterEditorService = __decorate([
            core.Injectable()
        ], TWAFilterEditorService);
        return TWAFilterEditorService;
    }());

    var TWAFilterEditorComponent = /** @class */ (function () {
        function TWAFilterEditorComponent() {
            this.change = new core.EventEmitter();
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
                    var k = newIndex - arr.length;
                    while (k--) {
                        arr.push(undefined);
                    }
                }
                arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
                return arr;
            };
        }
        TWAFilterEditorComponent.prototype.handleKeyboardEvent = function (event) {
            // if ((event.key === 'c' && event.ctrlKey)) {
            //     this.clearFilters();
            // } else if (this.editing && event.keyCode === 13) {
            //     this.addFilter();
            // }
            if (this.editing && event.keyCode === 13) {
                this.addFilter();
            }
        };
        TWAFilterEditorComponent.prototype.openFilters = function () {
            var _this = this;
            var fileObj = document.getElementById('openFiltersFile').files[0];
            var reader = new FileReader();
            reader.onload = function () {
                // console.log(reader.result);
                var data = JSON.parse(reader.result);
                _this.activeFilters = data;
                _this.change.emit(_this.activeFilters);
            };
            reader.readAsText(fileObj);
        };
        TWAFilterEditorComponent.prototype.saveFilters = function () {
            var blob = new Blob([JSON.stringify(this.activeFilters)], { type: 'text/json' });
            var filename = 'filters.json';
            var element = document.createElement('a');
            element.href = window.URL.createObjectURL(blob);
            element.download = filename;
            document.body.appendChild(element);
            element.click();
        };
        TWAFilterEditorComponent.prototype.checkFilter = function () {
            return (this.selectedField === 'none' || this.selectedValue === '');
        };
        TWAFilterEditorComponent.prototype.sendFilter = function () {
            this.addFilter();
        };
        TWAFilterEditorComponent.prototype.addFilter = function () {
            // console.log('adding filter...');
            var _a;
            var color = '', field = '', dbfield = '', label = '', name = '', explanation = this.selectedField + ' ' + this.operations[this.operation] + ' ' + this.selectedValue;
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
        TWAFilterEditorComponent.prototype.selectFilter = function (filter) {
            filter.selected = !filter.selected;
            var group = this.getParentFilter(filter);
            if (group) {
                var selectedAll = true;
                for (var i = 0, l = group.fields.length; i < l; i++) {
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
        TWAFilterEditorComponent.prototype.getParentFilter = function (filter) {
            var getParentFilterInGroup = function (group, filter2) {
                ret = null;
                for (var i = 0, l = group.fields.length; i < l; i++) {
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
            var ret = null;
            for (var i = 0, l = this.activeFilters.length; i < l; i++) {
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
        TWAFilterEditorComponent.prototype.moveTo = function (direction) {
            var idx = -1, toIdx = -1, group = -1;
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
        TWAFilterEditorComponent.prototype.getSelected = function () {
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
        TWAFilterEditorComponent.prototype.clearSelection = function () {
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
        TWAFilterEditorComponent.prototype.changeBitwise = function (filter, bitwise) {
            filter.bitwise = bitwise;
            this.change.emit(this.activeFilters);
        };
        TWAFilterEditorComponent.prototype.groupSelected = function () {
            var groupSelectedInGroup = function (filter) {
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
            var groups = this.activeFilters.filter(function (filter) { return filter.isgroup; });
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
        TWAFilterEditorComponent.prototype.entireGroupSelected = function () {
            var entireGroupSelectedInGroup = function (group) {
                var selected2 = true;
                for (var i = 0, l = group.fields.length; i < l; i++) {
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
            var groups = this.activeFilters.filter(function (filter) { return filter.isgroup; });
            var selected = true;
            for (var ig = 0, lg = groups.length; ig < lg; ig++) {
                var group = groups[ig];
                for (var ig2 = 0, lg2 = group.fields.length; ig2 < lg2; ig2++) {
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
        TWAFilterEditorComponent.prototype.createGroup = function () {
            var createInGroup = function (filter) {
                var selected2 = filter.fields.filter(function (filter2) { return filter2.selected; }), groupPosition2 = filter.fields.findIndex(function (v) { return v.selected; });
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
            var selected = this.activeFilters.filter(function (filter) { return filter.selected; }), groupPosition = this.activeFilters.findIndex(function (v) { return v.selected; });
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
        TWAFilterEditorComponent.prototype.sanitizeGroups = function () {
            var _this = this;
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
        TWAFilterEditorComponent.prototype.removeFromGroup = function () {
            var removeFromGroupInGroup = function (group, parent, idx) {
                group.fields.forEach(function (filter2, idx2) {
                    if (filter2.isgroup) {
                        removeFromGroupInGroup(filter2, group, idx2);
                    }
                });
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
        TWAFilterEditorComponent.prototype.onStartDragFilter = function (_event, _filter) {
        };
        TWAFilterEditorComponent.prototype.onDroppedFilter = function (event) {
            console.log('dropped');
            this.arrayMove(this.activeFilters, event.previousIndex, event.currentIndex);
            console.log(this.activeFilters);
            // this.clearSelection();
            this.sanitizeGroups();
            this.change.emit(this.activeFilters);
        };
        TWAFilterEditorComponent.prototype.uploadSet = function () {
            var _this = this;
            var fileObj = document.getElementById('fileSet').files[0];
            var reader = new FileReader();
            reader.onload = function () {
                var lines = reader.result.split(/\r?\n/).filter(function (val) { return val > ''; });
                _this.selectedValue = lines.join(', ');
                _this.fileSet.nativeElement.value = '';
            };
            reader.readAsText(fileObj);
        };
        TWAFilterEditorComponent.prototype.removeFilter = function (filter) {
            // const removeFilterInGroup = (group, filter) => {
            // };
            var parent = this.getParentFilter(filter);
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
        TWAFilterEditorComponent.prototype.clearFilters = function () {
            this.activeFilters = [];
            this.change.emit(this.activeFilters);
        };
        TWAFilterEditorComponent.prototype.onFocus = function (event) {
            this.editing = true;
        };
        TWAFilterEditorComponent.prototype.onBlur = function (event) {
            this.editing = false;
        };
        TWAFilterEditorComponent.prototype.ngOnInit = function () {
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
                    this.texts = __assign(__assign({}, this.texts), this.config.texts);
                }
            }
            // this.filterOptions = JSON.parse(this.options);
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TWAFilterEditorComponent.prototype, "options", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TWAFilterEditorComponent.prototype, "config", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], TWAFilterEditorComponent.prototype, "change", void 0);
        __decorate([
            core.ViewChild('fileSet', { static: true }),
            __metadata("design:type", core.ElementRef)
        ], TWAFilterEditorComponent.prototype, "fileSet", void 0);
        __decorate([
            core.ViewChild('oepnFiltersFile', { static: true }),
            __metadata("design:type", core.ElementRef)
        ], TWAFilterEditorComponent.prototype, "openFiltersFile", void 0);
        __decorate([
            core.HostListener('document:keydown', ['$event']),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [KeyboardEvent]),
            __metadata("design:returntype", void 0)
        ], TWAFilterEditorComponent.prototype, "handleKeyboardEvent", null);
        TWAFilterEditorComponent = __decorate([
            core.Component({
                selector: 'twa-md2-filter-editor',
                template: "<div fxLayout=\"column\" style=\"width: 100%;\">\n    <div class=\"selector\" fxLayout=\"row\" fxLayoutGap=\"10px\">\n        <mat-form-field>\n            <mat-select [(ngModel)]=\"selectedField\">\n                <mat-option selected value=\"none\">{{texts.filterBy}}</mat-option>\n                <mat-option *ngFor=\"let field of filterOptions.fields\" [(value)]=\"field.name\">{{field.label}}</mat-option>\n            </mat-select>\n        </mat-form-field>\n        <mat-form-field>\n            <mat-select [(ngModel)]=\"operation\">\n                <mat-option *ngFor=\"let op of operationsData\" value=\"{{op.type}}\">{{op.label}}</mat-option>\n            </mat-select>\n        </mat-form-field>\n        <mat-form-field>\n            <input matInput placeholder=\"{{texts.filter}}\" [(ngModel)]=\"selectedValue\"\n                    (focus)=\"onFocus($event)\" (blur)=\"onBlur($event)\" />\n            <button mat-button *ngIf=\"operation==='in'\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"fileSet.click()\">\n                <mat-icon>attach_file</mat-icon>\n            </button>\n        </mat-form-field>\n        <div>\n            <button mat-button mat-icon-button (click)=\"sendFilter()\" [disabled]=\"checkFilter()\">\n                <mat-icon>send</mat-icon>\n            </button>\n        </div>\n        <div fxFlex></div>\n        <button mat-button mat-icon-button\n                *ngIf=\"activeFilters.length === 0\"\n                matTooltip=\"{{texts.openFilter}}\"\n                (click)=\"openFiltersFile.click()\">\n            <mat-icon>folder_open</mat-icon>\n        </button>\n        <div class=\"tools\" *ngIf=\"activeFilters.length > 0\" fxLayout=\"row\">\n            <button mat-button mat-icon-button\n                    matTooltip=\"{{texts.group}}\"\n                    (click)=\"createGroup()\"\n                    [disabled]=\"getSelected() < 2\">\n                <mat-icon>link</mat-icon>\n            </button>\n            <button mat-button mat-icon-button\n                    matTooltip=\"{{texts.ungroup}}\"\n                    (click)=\"removeFromGroup()\"\n                    [disabled]=\"!groupSelected()\">\n                <mat-icon>link_off</mat-icon>\n            </button>\n            <button mat-button mat-icon-button\n                    matTooltip=\"{{texts.moveLeft}}\"\n                    (click)=\"moveTo(-1)\"\n                    [disabled]=\"getSelected() !== 1 && !entireGroupSelected()\">\n                <mat-icon>arrow_back</mat-icon>\n            </button>\n            <button mat-button mat-icon-button\n                    matTooltip=\"{{texts.moveRight}}\"\n                    (click)=\"moveTo(1)\"\n                    [disabled]=\"getSelected() !== 1 && !entireGroupSelected()\">\n                <mat-icon>arrow_forward</mat-icon>\n            </button>\n            <button mat-button mat-icon-button\n                    matTooltip=\"{{texts.openFilter}}\"\n                    (click)=\"openFiltersFile.click()\">\n                <mat-icon>folder_open</mat-icon>\n            </button>\n            <button mat-button mat-icon-button\n                    matTooltip=\"{{texts.saveFilter}}\"\n                    [disabled]=\"getSelected() > 1\"\n                    (click)=\"saveFilters()\">\n                <mat-icon>save</mat-icon>\n            </button>\n            <button mat-button mat-icon-button\n                    matTooltip=\"{{texts.clearSelection}}\"\n                    [disabled]=\"getSelected() < 1\"\n                    (click)=\"clearSelection()\">\n                <mat-icon>clear</mat-icon>\n            </button>\n            <button mat-button mat-icon-button\n                    matTooltip=\"{{texts.clearAll}}\"\n                    [disabled]=\"activeFilters.length < 1\"\n                    (click)=\"clearFilters()\">\n                <mat-icon>clear_all</mat-icon>\n            </button>\n        </div>\n    </div>\n    <div class=\"filter\" fxLayoutGap=\"12\">\n        <mat-chip-list cdkDropList\n                        cdkDropListOrientation=\"horizontal\"\n                        #filterList=\"cdkDropList\"\n                        (cdkDropListDropped)=\"onDroppedFilter($event)\">\n            <!-- <ng-container *ngFor=\"let filter of activeFilters; let idx = index\"> -->\n                <div fxLayout=\"row\"\n                *ngFor=\"let filter of activeFilters; let idx = index\"\n                cdkDrag\n                (cdkDragStarted)=\"onStartDragFilter($event, filter)\" [ngClass]=\"{'cgroup': filter.isgroup}\">\n                    <button mat-button *ngIf=\"idx > 0\" [matMenuTriggerFor]=\"menu\" class=\"bitwise\">{{filter.bitwise}}</button>\n                    <mat-menu #menu=\"matMenu\">\n                        <button mat-menu-item (click)=\"changeBitwise(filter, '&&')\">&&</button>\n                        <button mat-menu-item (click)=\"changeBitwise(filter, '||')\">||</button>\n                    </mat-menu>\n                    <mat-chip color=\"{{filter.color}}\" selected=\"true\"\n                                id=\"filter-{{idx}}\"\n                                [removable]=\"true\" (removed)=\"removeFilter(filter)\"\n                                [matTooltip]=\"filter.value\"\n                                [matTooltipDisabled]=\"filter.operation!=='in'\"\n                                matTooltipShowDelay=\"1500\"\n                                (click)=\"selectFilter(filter)\"\n                                *ngIf=\"!filter.isgroup\"\n                                [ngClass]=\"{'selected': filter.selected, 'mat-accent': filter.selected}\">\n                        {{filter.explanation}}\n                        <mat-icon matChipRemove>cancel</mat-icon>\n                    </mat-chip>\n                    <div *ngIf=\"filter.isgroup\" fxLayout=\"row\">\n                        <div *ngTemplateOutlet=\"group; context: { filter: this.filter, idx: this.idx}\" fxLayout=\"row\">\n                        </div>\n                    </div>\n                </div>\n            <!-- </ng-container> -->\n        </mat-chip-list>\n    </div>\n</div>\n<input style=\"visibility: hidden; height: 0px; width: 0px;\" type=\"file\" id=\"fileSet\" #fileSet (change)=\"uploadSet()\" />\n<input style=\"visibility: hidden; height: 0px; width: 0px;\" type=\"file\" id=\"openFiltersFile\" #openFiltersFile (change)=\"openFilters()\" />\n<ng-template #group let-filter=\"filter\" let-idx=\"idx\">\n    <span class=\"group-start\">(</span>\n    <ng-container *ngFor=\"let filter2 of filter.fields; let idx2 = index\">\n        <button mat-button *ngIf=\"idx2 > 0\" [matMenuTriggerFor]=\"menu2\"\n                class=\"bitwise\">\n            {{filter2.bitwise}}\n        </button>\n        <mat-menu #menu2=\"matMenu\">\n            <button mat-menu-item (click)=\"changeBitwise(filter2, '&&')\">&&</button>\n            <button mat-menu-item (click)=\"changeBitwise(filter2, '||')\">||</button>\n        </mat-menu>\n        <div>\n            <mat-chip color=\"{{filter.color}}\" selected=\"true\"\n                id=\"filter-{{idx}}-{{idx2}}\"\n                [removable]=\"true\" (removed)=\"removeFilter(filter2)\"\n                [matTooltip]=\"filter2.value\"\n                [matTooltipDisabled]=\"filter.operation!=='in'\"\n                matTooltipShowDelay=\"1500\"\n                (click)=\"selectFilter(filter2)\"\n                [ngClass]=\"{'selected': filter2.selected, 'mat-accent': filter2.selected}\"\n                *ngIf=\"!filter2.isgroup\"\n            >{{filter2.explanation}}\n                <mat-icon matChipRemove>cancel</mat-icon>\n            </mat-chip>\n            <div *ngIf=\"filter2.isgroup\" fxLayout=\"row\">\n                <div *ngTemplateOutlet=\"group; context: { filter: this.filter2, idx: this.idx2}\">\n                </div>\n            </div>\n        </div>\n    </ng-container>\n    <span class=\"group-end\">)</span>\n</ng-template>\n",
                styles: ["\n    .error { color: red; }\n    .selector {\n        width: 100%;\n    }\n    .filter {\n        padding-bottom: 12px;\n    }\n    .filter mat-chip {\n        margin: 4px;\n    }\n    .cgroup {\n        display: flex;\n    }\n    mat-chip.selected {\n        color: #fff;\n        font-weight: bold;\n    }\n    span.group-start,\n    span.group-end {\n        font-size: 25px;\n    }\n    button.bitwise {\n        min-width: 24px;\n        padding-left: 0;\n        padding-right: 0;\n    }\n    "]
            }),
            __metadata("design:paramtypes", [])
        ], TWAFilterEditorComponent);
        return TWAFilterEditorComponent;
    }());

    var TWAFilterEditorModule = /** @class */ (function () {
        function TWAFilterEditorModule() {
        }
        TWAFilterEditorModule = __decorate([
            core.NgModule({
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
            })
        ], TWAFilterEditorModule);
        return TWAFilterEditorModule;
    }());

    exports.TWAFilterEditorComponent = TWAFilterEditorComponent;
    exports.TWAFilterEditorModule = TWAFilterEditorModule;
    exports.TWAFilterEditorService = TWAFilterEditorService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=twa-md2-filter-editor.umd.js.map
