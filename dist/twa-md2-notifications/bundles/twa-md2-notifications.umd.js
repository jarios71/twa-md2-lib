(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('@angular/common'), require('@angular/flex-layout'), require('@angular/material/card'), require('@angular/material/button'), require('@angular/material/icon'), require('@angular/cdk/overlay'), require('@angular/material/badge')) :
    typeof define === 'function' && define.amd ? define('twa-md2-notifications', ['exports', '@angular/core', 'rxjs', 'rxjs/operators', '@angular/common', '@angular/flex-layout', '@angular/material/card', '@angular/material/button', '@angular/material/icon', '@angular/cdk/overlay', '@angular/material/badge'], factory) :
    (global = global || self, factory(global['twa-md2-notifications'] = {}, global.ng.core, global.rxjs, global.rxjs.operators, global.ng.common, global.ng.flexLayout, global.ng.material.card, global.ng.material.button, global.ng.material.icon, global.ng.cdk.overlay, global.ng.material.badge));
}(this, (function (exports, core, rxjs, operators, common, flexLayout, card, button, icon, overlay, badge) { 'use strict';

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

    var TwaMd2NotificationsService = /** @class */ (function () {
        function TwaMd2NotificationsService() {
            this.queue = [];
        }
        TwaMd2NotificationsService.prototype.add = function (notif) {
            // console.log(notif);
            this.queue.push(notif);
        };
        TwaMd2NotificationsService.prototype.remove = function (idx) {
            this.queue.splice(idx, 1);
        };
        TwaMd2NotificationsService.prototype.get = function () {
            return rxjs.of(this.queue);
        };
        TwaMd2NotificationsService.prototype.clicked = function (notif) {
            console.log(notif);
        };
        TwaMd2NotificationsService.ɵprov = core["ɵɵdefineInjectable"]({ factory: function TwaMd2NotificationsService_Factory() { return new TwaMd2NotificationsService(); }, token: TwaMd2NotificationsService, providedIn: "root" });
        TwaMd2NotificationsService = __decorate([
            core.Injectable({
                providedIn: 'root'
            }),
            __metadata("design:paramtypes", [])
        ], TwaMd2NotificationsService);
        return TwaMd2NotificationsService;
    }());

    // import { EventEmitter } from 'protractor';
    var TWAMd2NotificationsComponent = /** @class */ (function () {
        function TWAMd2NotificationsComponent(_elRef) {
            this._elRef = _elRef;
            this.panelClicked = new core.EventEmitter();
            this.panelClosed = new core.EventEmitter();
            this.isOpened = false;
        }
        TWAMd2NotificationsComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.notifsService.get().subscribe(function (data) {
                _this.notifs = data;
            });
            this.globalClick = rxjs.fromEvent(document, 'click').pipe(operators.delay(1), operators.tap(function () {
                _this.listening = true;
            }));
            this.globalClick.subscribe(function (event) {
                _this.onGlobalClick(event);
            });
        };
        TWAMd2NotificationsComponent.prototype.onGlobalClick = function (event) {
            if (event instanceof MouseEvent &&
                this.listening === true &&
                typeof this.notifPanel !== 'undefined' &&
                this.notifPanel !== undefined) {
                // console.log(this.notifPanel.nativeElement);
                // console.log(this._elRef.nativeElement);
                // console.log(event.target);
                if (this.isDescendant(this.notifPanel.nativeElement, event.target) !== true &&
                    this.isDescendant(this._elRef.nativeElement, event.target) !== true &&
                    this._elRef.nativeElement !== event.target &&
                    !this.hasClass(event.target, 'twa-notif')) {
                    this.isOpened = false;
                }
            }
        };
        TWAMd2NotificationsComponent.prototype.hasClass = function (elem, className) {
            if (elem.classList.contains(className)) {
                return true;
            }
            return false;
        };
        TWAMd2NotificationsComponent.prototype.isDescendant = function (parent, child) {
            var node = child;
            while (node !== null) {
                if (node === parent) {
                    return true;
                }
                else {
                    node = node.parentNode;
                }
            }
            return false;
        };
        TWAMd2NotificationsComponent.prototype.notifClicked = function () {
            // console.log('notif icon clicked!');
            if (!this.isOpened && !this.notifs.length) {
                return;
            }
            this.isOpened = !this.isOpened;
        };
        TWAMd2NotificationsComponent.prototype.notifPanelClicked = function (notif, notifIdx) {
            // console.log('notif panel clicked!', notif);
            if (typeof notif.data !== 'undefined' &&
                typeof notif.data.action !== 'undefined') {
                notif.data.action(notif);
                // } else {
            }
            this.panelClicked.emit(notif);
            this.notifsService.remove(notifIdx);
            this.checkIfOpened();
        };
        TWAMd2NotificationsComponent.prototype.checkIfOpened = function () {
            if (this.notifs.length === 0) {
                this.isOpened = false;
            }
        };
        TWAMd2NotificationsComponent.prototype.removePanel = function (notif, notifIdx) {
            this.panelClosed.emit(notif);
            this.notifsService.remove(notifIdx);
            this.checkIfOpened();
        };
        TWAMd2NotificationsComponent.prototype.clearPanels = function () {
            var _this = this;
            if (this.notifs.length) {
                this.removePanel(this.notifs[0], 0);
                // this.notifs.splice(0, 1);
                setTimeout(function () {
                    _this.clearPanels();
                }, 100);
            }
            else {
                this.checkIfOpened();
            }
        };
        TWAMd2NotificationsComponent.prototype.connectedOverlayDetach = function () {
            // console.log('overlay detached!');
        };
        TWAMd2NotificationsComponent.ctorParameters = function () { return [
            { type: core.ElementRef }
        ]; };
        __decorate([
            core.Input(),
            __metadata("design:type", TwaMd2NotificationsService)
        ], TWAMd2NotificationsComponent.prototype, "notifsService", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], TWAMd2NotificationsComponent.prototype, "panelClicked", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], TWAMd2NotificationsComponent.prototype, "panelClosed", void 0);
        __decorate([
            core.ViewChild('notifPanelContainer'),
            __metadata("design:type", Object)
        ], TWAMd2NotificationsComponent.prototype, "notifPanel", void 0);
        TWAMd2NotificationsComponent = __decorate([
            core.Component({
                selector: 'twa-md2-notifications',
                template: "\n        <button mat-icon-button #overlayOrigin=\"cdkOverlayOrigin\" cdkOverlayOrigin (click)=\"notifClicked()\">\n            <mat-icon [matBadge]=\"notifs.length\" matBadgeSize=\"medium\" *ngIf=\"notifs.length\">notifications</mat-icon>\n            <mat-icon *ngIf=\"notifs.length===0\">notifications_none</mat-icon>\n        </button>\n        <ng-template\n            cdkConnectedOverlay\n            [cdkConnectedOverlayOrigin]=\"overlayOrigin\"\n            [cdkConnectedOverlayOpen]=\"isOpened\"\n            (detach)=\"connectedOverlayDetach()\"\n        >\n            <div #notifPanelContainer class=\"notifPanelContainer twa-notif\" fxLayoutGap=\"12px\">\n                <div fxLayout=\"row\" class=\"panelTitle twa-notif\">\n                    <h3 class=\"twa-notif\" fxFlex>Notifications</h3>\n                    <button class=\"twa-notif\" mat-icon-button (click)=\"clearPanels()\">\n                        <mat-icon class=\"twa-notif\">clear_all</mat-icon>\n                    </button>\n                </div>\n                <div class=\"notifsContainer\" [ngClass]=\"{'scrolling': notifs.length > 4}\">\n                    <mat-card *ngFor=\"let notif of notifs; let i = index\"\n                            fxLayout=\"row\"\n                            class=\"notif twa-notif\"\n                            (click)=\"notifPanelClicked(notif, i)\">\n                        <div class=\"cicon twa-notif\">\n                            <mat-icon class=\"panelIcon twa-notif\" *ngIf=\"!notif.image\">notifications</mat-icon>\n                            <img class=\"notifImage twa-notif\" *ngIf=\"notif.image\" [src]=\"notif.image\" />\n                        </div>\n                        <div class=\"ccontent twa-notif\" fxLayout=\"column\">\n                            <div fxLayout=\"row\" class=\"twa-notif\">\n                                <h4 class=\"twa-notif\" fxFlex>{{notif.title}}</h4>\n                                <button class=\"close twa-notif\" mat-icon-button (click)=\"removePanel(notif, i)\">\n                                    <mat-icon class=\"twa-notif\">close</mat-icon>\n                                </button>\n                            </div>\n                            <p class=\"twa-notif\" fxFlex>{{notif.message}}</p>\n                        </div>\n                    </mat-card>\n                </div>\n                <div class=\"notifPanelHideButton twa-notif\" (click)=\"isOpened = false\" fxLayout=\"row\" fxLayoutAlign=\"center center\">\n                    <mat-icon>expand_less</mat-icon>\n                </div>\n            </div>\n        </ng-template>\n    ",
                styles: ['.notifPanelContainer { width: 320px; background: #eee; border: 1px solid #ccc;' +
                        'padding: 12px 12px 4px 12px; box-shadow: 0 2px 10px rgba(0,0,0,.2); }',
                    '.notifPanelHideButton { width: 100%; height: 18px; border-top: 1px solid #ccc; cursor: pointer; }',
                    'div.panelTitle h3 { color: #aaa; font-weight: 900; font-family: Roboto Light; font-size: 26px; margin: 8px; }',
                    'div.notifsContainer.scrolling { max-height: 408px; overflow: auto; }',
                    'mat-card.notif { cursor: pointer; padding: 12px 12px 12px 8px; margin: 0 0 8px 0!important; }',
                    'mat-card.notif h4 { font-family: Roboto Light; font-size: 16px; margin: 8px 0 0; }',
                    'mat-card.notif p { font-family: Roboto Light; margin: 8px 0 0; }',
                    '.cicon { padding: 12px 12px 12px 4px; }',
                    '.ccontent { width: 100%; }',
                    'mat-icon.panelIcon { font-size: 40px; height: 40px; width: 40px; line-height: 40px; }',
                    'img.notifImage { width: 40x; height: 40px; border-radius: 50%; }',
                    'button.close { margin: -12px -12px 0 0;}']
            }),
            __metadata("design:paramtypes", [core.ElementRef])
        ], TWAMd2NotificationsComponent);
        return TWAMd2NotificationsComponent;
    }());

    var TWAMd2NotificationsModule = /** @class */ (function () {
        function TWAMd2NotificationsModule() {
        }
        TWAMd2NotificationsModule = __decorate([
            core.NgModule({
                imports: [
                    common.CommonModule,
                    flexLayout.FlexLayoutModule,
                    card.MatCardModule,
                    button.MatButtonModule,
                    icon.MatIconModule,
                    overlay.OverlayModule,
                    badge.MatBadgeModule,
                ],
                declarations: [
                    TWAMd2NotificationsComponent,
                ],
                exports: [
                    overlay.OverlayModule,
                    TWAMd2NotificationsComponent,
                ],
                entryComponents: [
                    TWAMd2NotificationsComponent,
                ],
                providers: [
                    TWAMd2NotificationsComponent,
                ],
                schemas: [
                    core.CUSTOM_ELEMENTS_SCHEMA
                ]
            })
        ], TWAMd2NotificationsModule);
        return TWAMd2NotificationsModule;
    }());

    exports.TWAMd2NotificationsComponent = TWAMd2NotificationsComponent;
    exports.TWAMd2NotificationsModule = TWAMd2NotificationsModule;
    exports.TwaMd2NotificationsService = TwaMd2NotificationsService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=twa-md2-notifications.umd.js.map
