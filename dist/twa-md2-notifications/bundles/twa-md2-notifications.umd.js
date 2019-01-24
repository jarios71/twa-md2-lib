(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('@angular/common'), require('@angular/flex-layout'), require('@angular/material/card'), require('@angular/material/button'), require('@angular/material/icon'), require('@angular/cdk/overlay'), require('@angular/material/badge')) :
    typeof define === 'function' && define.amd ? define('twa-md2-notifications', ['exports', '@angular/core', 'rxjs', 'rxjs/operators', '@angular/common', '@angular/flex-layout', '@angular/material/card', '@angular/material/button', '@angular/material/icon', '@angular/cdk/overlay', '@angular/material/badge'], factory) :
    (factory((global['twa-md2-notifications'] = {}),global.ng.core,global.rxjs,global.rxjs.operators,global.ng.common,global.ng['flex-layout'],global.ng.material.card,global.ng.material.button,global.ng.material.icon,global.ng.cdk.overlay,global.ng.material.badge));
}(this, (function (exports,i0,rxjs,operators,common,flexLayout,card,button,icon,overlay,badge) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var TwaMd2NotificationsService = /** @class */ (function () {
        function TwaMd2NotificationsService() {
            this.queue = [];
        }
        /**
         * @param {?} notif
         * @return {?}
         */
        TwaMd2NotificationsService.prototype.add = /**
         * @param {?} notif
         * @return {?}
         */
            function (notif) {
                console.log(notif);
                this.queue.push(notif);
            };
        /**
         * @param {?} idx
         * @return {?}
         */
        TwaMd2NotificationsService.prototype.remove = /**
         * @param {?} idx
         * @return {?}
         */
            function (idx) {
                this.queue.splice(idx, 1);
            };
        /**
         * @return {?}
         */
        TwaMd2NotificationsService.prototype.get = /**
         * @return {?}
         */
            function () {
                return rxjs.of(this.queue);
            };
        /**
         * @param {?} notif
         * @return {?}
         */
        TwaMd2NotificationsService.prototype.clicked = /**
         * @param {?} notif
         * @return {?}
         */
            function (notif) {
                console.log(notif);
            };
        TwaMd2NotificationsService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        TwaMd2NotificationsService.ctorParameters = function () { return []; };
        /** @nocollapse */ TwaMd2NotificationsService.ngInjectableDef = i0.defineInjectable({ factory: function TwaMd2NotificationsService_Factory() { return new TwaMd2NotificationsService(); }, token: TwaMd2NotificationsService, providedIn: "root" });
        return TwaMd2NotificationsService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    // import { EventEmitter } from 'protractor';
    var TWAMd2NotificationsComponent = /** @class */ (function () {
        function TWAMd2NotificationsComponent(_elRef) {
            this._elRef = _elRef;
            this.panelClicked = new i0.EventEmitter();
            this.isOpened = false;
        }
        /**
         * @return {?}
         */
        TWAMd2NotificationsComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
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
        /**
         * @param {?} event
         * @return {?}
         */
        TWAMd2NotificationsComponent.prototype.onGlobalClick = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                if (event instanceof MouseEvent &&
                    this.listening === true &&
                    typeof this.notifPanel !== 'undefined' &&
                    this.notifPanel !== undefined) {
                    console.log(this.notifPanel.nativeElement);
                    console.log(this._elRef.nativeElement);
                    console.log(event.target);
                    if (this.isDescendant(this.notifPanel.nativeElement, event.target) !== true &&
                        this.isDescendant(this._elRef.nativeElement, event.target) !== true &&
                        this._elRef.nativeElement !== event.target &&
                        !this.hasClass(event.target, 'twa-notif')) {
                        this.isOpened = false;
                    }
                }
            };
        /**
         * @param {?} elem
         * @param {?} className
         * @return {?}
         */
        TWAMd2NotificationsComponent.prototype.hasClass = /**
         * @param {?} elem
         * @param {?} className
         * @return {?}
         */
            function (elem, className) {
                if (elem.classList.contains(className)) {
                    return true;
                }
                return false;
            };
        /**
         * @param {?} parent
         * @param {?} child
         * @return {?}
         */
        TWAMd2NotificationsComponent.prototype.isDescendant = /**
         * @param {?} parent
         * @param {?} child
         * @return {?}
         */
            function (parent, child) {
                /** @type {?} */
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
        /**
         * @return {?}
         */
        TWAMd2NotificationsComponent.prototype.notifClicked = /**
         * @return {?}
         */
            function () {
                console.log('notif icon clicked!');
                if (!this.isOpened && !this.notifs.length) {
                    return;
                }
                this.isOpened = !this.isOpened;
            };
        /**
         * @param {?} notif
         * @param {?} notifIdx
         * @return {?}
         */
        TWAMd2NotificationsComponent.prototype.notifPanelClicked = /**
         * @param {?} notif
         * @param {?} notifIdx
         * @return {?}
         */
            function (notif, notifIdx) {
                console.log('notif panel clicked!', notif);
                if (typeof notif.data !== 'undefined' &&
                    typeof notif.data.action !== 'undefined') {
                    notif.data.action(notif);
                }
                else {
                    this.panelClicked.emit(notif);
                }
                this.notifsService.remove(notifIdx);
                this.checkIfOpened();
            };
        /**
         * @return {?}
         */
        TWAMd2NotificationsComponent.prototype.checkIfOpened = /**
         * @return {?}
         */
            function () {
                if (this.notifs.length === 0) {
                    this.isOpened = false;
                }
            };
        /**
         * @param {?} notifIdx
         * @return {?}
         */
        TWAMd2NotificationsComponent.prototype.removePanel = /**
         * @param {?} notifIdx
         * @return {?}
         */
            function (notifIdx) {
                this.notifsService.remove(notifIdx);
                this.checkIfOpened();
            };
        /**
         * @return {?}
         */
        TWAMd2NotificationsComponent.prototype.clearPanels = /**
         * @return {?}
         */
            function () {
                var _this = this;
                if (this.notifs.length) {
                    this.notifs.splice(0, 1);
                    setTimeout(function () {
                        _this.clearPanels();
                    }, 200);
                }
                else {
                    this.checkIfOpened();
                }
            };
        /**
         * @return {?}
         */
        TWAMd2NotificationsComponent.prototype.connectedOverlayDetach = /**
         * @return {?}
         */
            function () {
                console.log('overlay detached!');
            };
        TWAMd2NotificationsComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'twa-md2-notifications',
                        template: "\n        <button mat-icon-button #overlayOrigin=\"cdkOverlayOrigin\" cdkOverlayOrigin (click)=\"notifClicked()\">\n            <mat-icon [matBadge]=\"notifs.length\" matBadgeSize=\"medium\" *ngIf=\"notifs.length\">notifications</mat-icon>\n            <mat-icon *ngIf=\"notifs.length===0\">notifications_none</mat-icon>\n        </button>\n        <ng-template\n            cdkConnectedOverlay\n            [cdkConnectedOverlayOrigin]=\"overlayOrigin\"\n            [cdkConnectedOverlayOpen]=\"isOpened\"\n            (detach)=\"connectedOverlayDetach()\"\n        >\n            <div #notifPanelContainer class=\"notifPanelContainer twa-notif\" fxLayoutGap=\"12px\">\n                <div fxLayout=\"row\" class=\"panelTitle twa-notif\">\n                    <h3 class=\"twa-notif\" fxFlex>Notifications</h3>\n                    <button class=\"twa-notif\" mat-icon-button (click)=\"clearPanels()\">\n                        <mat-icon class=\"twa-notif\">clear_all</mat-icon>\n                    </button>\n                </div>\n                <div class=\"notifsContainer\" [ngClass]=\"{'scrolling': notifs.length > 4}\">\n                    <mat-card *ngFor=\"let notif of notifs; let i = index\"\n                            fxLayout=\"row\"\n                            class=\"notif twa-notif\"\n                            (click)=\"notifPanelClicked(notif, i)\">\n                        <div class=\"cicon twa-notif\">\n                            <mat-icon class=\"panelIcon twa-notif\" *ngIf=\"!notif.image\">notifications</mat-icon>\n                            <img class=\"notifImage twa-notif\" *ngIf=\"notif.image\" [src]=\"notif.image\" />\n                        </div>\n                        <div class=\"ccontent twa-notif\" fxLayout=\"column\">\n                            <div fxLayout=\"row\" class=\"twa-notif\">\n                                <h4 class=\"twa-notif\" fxFlex>{{notif.title}}</h4>\n                                <button class=\"close twa-notif\" mat-icon-button (click)=\"removePanel(i)\">\n                                    <mat-icon class=\"twa-notif\">close</mat-icon>\n                                </button>\n                            </div>\n                            <p class=\"twa-notif\" fxFlex>{{notif.message}}</p>\n                        </div>\n                    </mat-card>\n                </div>\n                <div class=\"notifPanelHideButton twa-notif\" (click)=\"isOpened = false\" fxLayout=\"row\" fxLayoutAlign=\"center center\">\n                    <mat-icon>expand_less</mat-icon>\n                </div>\n            </div>\n        </ng-template>\n    ",
                        styles: [
                            '.notifPanelContainer { width: 320px; background: #eee; border: 1px solid #ccc;' +
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
                            'button.close { margin: -12px -12px 0 0;}',
                        ]
                    },] },
        ];
        /** @nocollapse */
        TWAMd2NotificationsComponent.ctorParameters = function () {
            return [
                { type: i0.ElementRef }
            ];
        };
        TWAMd2NotificationsComponent.propDecorators = {
            notifsService: [{ type: i0.Input }],
            panelClicked: [{ type: i0.Output }],
            notifPanel: [{ type: i0.ViewChild, args: ['notifPanelContainer',] }]
        };
        return TWAMd2NotificationsComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var TWAMd2NotificationsModule = /** @class */ (function () {
        function TWAMd2NotificationsModule() {
        }
        TWAMd2NotificationsModule.decorators = [
            { type: i0.NgModule, args: [{
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
                            i0.CUSTOM_ELEMENTS_SCHEMA
                        ]
                    },] },
        ];
        return TWAMd2NotificationsModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.TwaMd2NotificationsService = TwaMd2NotificationsService;
    exports.TWAMd2NotificationsComponent = TWAMd2NotificationsComponent;
    exports.TWAMd2NotificationsModule = TWAMd2NotificationsModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdhLW1kMi1ub3RpZmljYXRpb25zLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vdHdhLW1kMi1ub3RpZmljYXRpb25zL2xpYi90d2EtbWQyLW5vdGlmaWNhdGlvbnMuc2VydmljZS50cyIsIm5nOi8vdHdhLW1kMi1ub3RpZmljYXRpb25zL2xpYi90d2EtbWQyLW5vdGlmaWNhdGlvbnMuY29tcG9uZW50LnRzIiwibmc6Ly90d2EtbWQyLW5vdGlmaWNhdGlvbnMvbGliL3R3YS1tZDItbm90aWZpY2F0aW9ucy5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcblxuZXhwb3J0IGludGVyZmFjZSBJTm90aWYge1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIGRhdGU6IHN0cmluZztcbiAgICBkYXRhPzogYW55O1xuICAgIGljb24/OiBzdHJpbmc7XG4gICAgaW1hZ2U/OiBzdHJpbmc7XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFR3YU1kMk5vdGlmaWNhdGlvbnNTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgcXVldWU6IElOb3RpZltdID0gW107XG5cbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gICAgcHVibGljIGFkZChub3RpZjogSU5vdGlmKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKG5vdGlmKTtcbiAgICAgICAgdGhpcy5xdWV1ZS5wdXNoKG5vdGlmKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVtb3ZlKGlkeDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMucXVldWUuc3BsaWNlKGlkeCwgMSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCgpOiBPYnNlcnZhYmxlPElOb3RpZltdPiB7XG4gICAgICAgIHJldHVybiBvZih0aGlzLnF1ZXVlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xpY2tlZChub3RpZjogSU5vdGlmKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKG5vdGlmKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBWaWV3Q2hpbGQsIEV2ZW50RW1pdHRlciwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHdhTWQyTm90aWZpY2F0aW9uc1NlcnZpY2UsIElOb3RpZiB9IGZyb20gJy4vdHdhLW1kMi1ub3RpZmljYXRpb25zLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgZnJvbUV2ZW50IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWxheSwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuLy8gaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAncHJvdHJhY3Rvcic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndHdhLW1kMi1ub3RpZmljYXRpb25zJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiAjb3ZlcmxheU9yaWdpbj1cImNka092ZXJsYXlPcmlnaW5cIiBjZGtPdmVybGF5T3JpZ2luIChjbGljayk9XCJub3RpZkNsaWNrZWQoKVwiPlxuICAgICAgICAgICAgPG1hdC1pY29uIFttYXRCYWRnZV09XCJub3RpZnMubGVuZ3RoXCIgbWF0QmFkZ2VTaXplPVwibWVkaXVtXCIgKm5nSWY9XCJub3RpZnMubGVuZ3RoXCI+bm90aWZpY2F0aW9uczwvbWF0LWljb24+XG4gICAgICAgICAgICA8bWF0LWljb24gKm5nSWY9XCJub3RpZnMubGVuZ3RoPT09MFwiPm5vdGlmaWNhdGlvbnNfbm9uZTwvbWF0LWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8bmctdGVtcGxhdGVcbiAgICAgICAgICAgIGNka0Nvbm5lY3RlZE92ZXJsYXlcbiAgICAgICAgICAgIFtjZGtDb25uZWN0ZWRPdmVybGF5T3JpZ2luXT1cIm92ZXJsYXlPcmlnaW5cIlxuICAgICAgICAgICAgW2Nka0Nvbm5lY3RlZE92ZXJsYXlPcGVuXT1cImlzT3BlbmVkXCJcbiAgICAgICAgICAgIChkZXRhY2gpPVwiY29ubmVjdGVkT3ZlcmxheURldGFjaCgpXCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPGRpdiAjbm90aWZQYW5lbENvbnRhaW5lciBjbGFzcz1cIm5vdGlmUGFuZWxDb250YWluZXIgdHdhLW5vdGlmXCIgZnhMYXlvdXRHYXA9XCIxMnB4XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGNsYXNzPVwicGFuZWxUaXRsZSB0d2Etbm90aWZcIj5cbiAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzPVwidHdhLW5vdGlmXCIgZnhGbGV4Pk5vdGlmaWNhdGlvbnM8L2gzPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwidHdhLW5vdGlmXCIgbWF0LWljb24tYnV0dG9uIChjbGljayk9XCJjbGVhclBhbmVscygpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJ0d2Etbm90aWZcIj5jbGVhcl9hbGw8L21hdC1pY29uPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibm90aWZzQ29udGFpbmVyXCIgW25nQ2xhc3NdPVwieydzY3JvbGxpbmcnOiBub3RpZnMubGVuZ3RoID4gNH1cIj5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1jYXJkICpuZ0Zvcj1cImxldCBub3RpZiBvZiBub3RpZnM7IGxldCBpID0gaW5kZXhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ4TGF5b3V0PVwicm93XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cIm5vdGlmIHR3YS1ub3RpZlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm5vdGlmUGFuZWxDbGlja2VkKG5vdGlmLCBpKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNpY29uIHR3YS1ub3RpZlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cInBhbmVsSWNvbiB0d2Etbm90aWZcIiAqbmdJZj1cIiFub3RpZi5pbWFnZVwiPm5vdGlmaWNhdGlvbnM8L21hdC1pY29uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJub3RpZkltYWdlIHR3YS1ub3RpZlwiICpuZ0lmPVwibm90aWYuaW1hZ2VcIiBbc3JjXT1cIm5vdGlmLmltYWdlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNjb250ZW50IHR3YS1ub3RpZlwiIGZ4TGF5b3V0PVwiY29sdW1uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGNsYXNzPVwidHdhLW5vdGlmXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzcz1cInR3YS1ub3RpZlwiIGZ4RmxleD57e25vdGlmLnRpdGxlfX08L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiY2xvc2UgdHdhLW5vdGlmXCIgbWF0LWljb24tYnV0dG9uIChjbGljayk9XCJyZW1vdmVQYW5lbChpKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwidHdhLW5vdGlmXCI+Y2xvc2U8L21hdC1pY29uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInR3YS1ub3RpZlwiIGZ4RmxleD57e25vdGlmLm1lc3NhZ2V9fTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L21hdC1jYXJkPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJub3RpZlBhbmVsSGlkZUJ1dHRvbiB0d2Etbm90aWZcIiAoY2xpY2spPVwiaXNPcGVuZWQgPSBmYWxzZVwiIGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cImNlbnRlciBjZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1pY29uPmV4cGFuZF9sZXNzPC9tYXQtaWNvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgIGAsXG4gICAgc3R5bGVzOiBbXG4gICAgICAgICcubm90aWZQYW5lbENvbnRhaW5lciB7IHdpZHRoOiAzMjBweDsgYmFja2dyb3VuZDogI2VlZTsgYm9yZGVyOiAxcHggc29saWQgI2NjYzsnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncGFkZGluZzogMTJweCAxMnB4IDRweCAxMnB4OyBib3gtc2hhZG93OiAwIDJweCAxMHB4IHJnYmEoMCwwLDAsLjIpOyB9JyxcbiAgICAgICAgJy5ub3RpZlBhbmVsSGlkZUJ1dHRvbiB7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDE4cHg7IGJvcmRlci10b3A6IDFweCBzb2xpZCAjY2NjOyBjdXJzb3I6IHBvaW50ZXI7IH0nLFxuICAgICAgICAnZGl2LnBhbmVsVGl0bGUgaDMgeyBjb2xvcjogI2FhYTsgZm9udC13ZWlnaHQ6IDkwMDsgZm9udC1mYW1pbHk6IFJvYm90byBMaWdodDsgZm9udC1zaXplOiAyNnB4OyBtYXJnaW46IDhweDsgfScsXG4gICAgICAgICdkaXYubm90aWZzQ29udGFpbmVyLnNjcm9sbGluZyB7IG1heC1oZWlnaHQ6IDQwOHB4OyBvdmVyZmxvdzogYXV0bzsgfScsXG4gICAgICAgICdtYXQtY2FyZC5ub3RpZiB7IGN1cnNvcjogcG9pbnRlcjsgcGFkZGluZzogMTJweCAxMnB4IDEycHggOHB4OyBtYXJnaW46IDAgMCA4cHggMCFpbXBvcnRhbnQ7IH0nLFxuICAgICAgICAnbWF0LWNhcmQubm90aWYgaDQgeyBmb250LWZhbWlseTogUm9ib3RvIExpZ2h0OyBmb250LXNpemU6IDE2cHg7IG1hcmdpbjogOHB4IDAgMDsgfScsXG4gICAgICAgICdtYXQtY2FyZC5ub3RpZiBwIHsgZm9udC1mYW1pbHk6IFJvYm90byBMaWdodDsgbWFyZ2luOiA4cHggMCAwOyB9JyxcbiAgICAgICAgJy5jaWNvbiB7IHBhZGRpbmc6IDEycHggMTJweCAxMnB4IDRweDsgfScsXG4gICAgICAgICcuY2NvbnRlbnQgeyB3aWR0aDogMTAwJTsgfScsXG4gICAgICAgICdtYXQtaWNvbi5wYW5lbEljb24geyBmb250LXNpemU6IDQwcHg7IGhlaWdodDogNDBweDsgd2lkdGg6IDQwcHg7IGxpbmUtaGVpZ2h0OiA0MHB4OyB9JyxcbiAgICAgICAgJ2ltZy5ub3RpZkltYWdlIHsgd2lkdGg6IDQweDsgaGVpZ2h0OiA0MHB4OyBib3JkZXItcmFkaXVzOiA1MCU7IH0nLFxuICAgICAgICAnYnV0dG9uLmNsb3NlIHsgbWFyZ2luOiAtMTJweCAtMTJweCAwIDA7fScsXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBUV0FNZDJOb3RpZmljYXRpb25zQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASW5wdXQoKSBub3RpZnNTZXJ2aWNlOiBUd2FNZDJOb3RpZmljYXRpb25zU2VydmljZTtcbiAgICBAT3V0cHV0KCkgcGFuZWxDbGlja2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBWaWV3Q2hpbGQoJ25vdGlmUGFuZWxDb250YWluZXInKSBub3RpZlBhbmVsO1xuXG4gICAgcHJpdmF0ZSBnbG9iYWxDbGljazogT2JzZXJ2YWJsZTxFdmVudD47XG4gICAgcHJpdmF0ZSBsaXN0ZW5pbmc6IGJvb2xlYW47XG5cbiAgICBpc09wZW5lZCA9IGZhbHNlO1xuICAgIG5vdGlmczogSU5vdGlmW107XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfZWxSZWY6IEVsZW1lbnRSZWYsXG4gICAgKSB7IH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLm5vdGlmc1NlcnZpY2UuZ2V0KCkuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICAgICAgdGhpcy5ub3RpZnMgPSBkYXRhO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5nbG9iYWxDbGljayA9IGZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJykucGlwZShcbiAgICAgICAgICAgIGRlbGF5KDEpLFxuICAgICAgICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RlbmluZyA9IHRydWU7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmdsb2JhbENsaWNrLnN1YnNjcmliZSgoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMub25HbG9iYWxDbGljayhldmVudCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uR2xvYmFsQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgTW91c2VFdmVudCAmJlxuICAgICAgICAgICAgdGhpcy5saXN0ZW5pbmcgPT09IHRydWUgJiZcbiAgICAgICAgICAgIHR5cGVvZiB0aGlzLm5vdGlmUGFuZWwgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgICB0aGlzLm5vdGlmUGFuZWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5ub3RpZlBhbmVsLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5fZWxSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhldmVudC50YXJnZXQpO1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNEZXNjZW5kYW50KHRoaXMubm90aWZQYW5lbC5uYXRpdmVFbGVtZW50LCBldmVudC50YXJnZXQpICE9PSB0cnVlICYmXG4gICAgICAgICAgICAgICAgdGhpcy5pc0Rlc2NlbmRhbnQodGhpcy5fZWxSZWYubmF0aXZlRWxlbWVudCwgZXZlbnQudGFyZ2V0KSAhPT0gdHJ1ZSAmJlxuICAgICAgICAgICAgICAgIHRoaXMuX2VsUmVmLm5hdGl2ZUVsZW1lbnQgIT09IGV2ZW50LnRhcmdldCAmJlxuICAgICAgICAgICAgICAgICF0aGlzLmhhc0NsYXNzKGV2ZW50LnRhcmdldCwgJ3R3YS1ub3RpZicpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc09wZW5lZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFzQ2xhc3MoZWxlbSwgY2xhc3NOYW1lKSB7XG4gICAgICAgIGlmIChlbGVtLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaXNEZXNjZW5kYW50KHBhcmVudCwgY2hpbGQpIHtcbiAgICAgICAgbGV0IG5vZGUgPSBjaGlsZDtcbiAgICAgICAgd2hpbGUgKG5vZGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChub2RlID09PSBwYXJlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgbm90aWZDbGlja2VkKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnbm90aWYgaWNvbiBjbGlja2VkIScpO1xuICAgICAgICBpZiAoIXRoaXMuaXNPcGVuZWQgJiYgIXRoaXMubm90aWZzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNPcGVuZWQgPSAhdGhpcy5pc09wZW5lZDtcbiAgICB9XG5cbiAgICBub3RpZlBhbmVsQ2xpY2tlZChub3RpZjogSU5vdGlmLCBub3RpZklkeDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdub3RpZiBwYW5lbCBjbGlja2VkIScsIG5vdGlmKTtcbiAgICAgICAgaWYgKHR5cGVvZiBub3RpZi5kYXRhICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICB0eXBlb2Ygbm90aWYuZGF0YS5hY3Rpb24gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBub3RpZi5kYXRhLmFjdGlvbihub3RpZik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnBhbmVsQ2xpY2tlZC5lbWl0KG5vdGlmKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5vdGlmc1NlcnZpY2UucmVtb3ZlKG5vdGlmSWR4KTtcbiAgICAgICAgdGhpcy5jaGVja0lmT3BlbmVkKCk7XG4gICAgfVxuXG4gICAgY2hlY2tJZk9wZW5lZCgpIHtcbiAgICAgICAgaWYgKHRoaXMubm90aWZzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5pc09wZW5lZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVtb3ZlUGFuZWwobm90aWZJZHg6IG51bWJlcikge1xuICAgICAgICB0aGlzLm5vdGlmc1NlcnZpY2UucmVtb3ZlKG5vdGlmSWR4KTtcbiAgICAgICAgdGhpcy5jaGVja0lmT3BlbmVkKCk7XG4gICAgfVxuXG4gICAgY2xlYXJQYW5lbHMoKSB7XG4gICAgICAgIGlmICh0aGlzLm5vdGlmcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMubm90aWZzLnNwbGljZSgwLCAxKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJQYW5lbHMoKTtcbiAgICAgICAgICAgIH0sIDIwMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrSWZPcGVuZWQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbm5lY3RlZE92ZXJsYXlEZXRhY2goKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdvdmVybGF5IGRldGFjaGVkIScpO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuaW1wb3J0IHsgTWF0Q2FyZE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NhcmQnO1xuLy8gaW1wb3J0IHsgVHdhTWQyTm90aWZpY2F0aW9uc1NlcnZpY2UgfSBmcm9tICcuL3R3YS1tZDItbm90aWZpY2F0aW9ucy5zZXJ2aWNlJztcblxuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYnV0dG9uJztcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pY29uJztcbmltcG9ydCB7IE92ZXJsYXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBNYXRCYWRnZU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2JhZGdlJztcblxuaW1wb3J0IHsgVFdBTWQyTm90aWZpY2F0aW9uc0NvbXBvbmVudCB9IGZyb20gJy4vdHdhLW1kMi1ub3RpZmljYXRpb25zLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEZsZXhMYXlvdXRNb2R1bGUsXG4gICAgICAgIE1hdENhcmRNb2R1bGUsXG4gICAgICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICAgICAgTWF0SWNvbk1vZHVsZSxcbiAgICAgICAgT3ZlcmxheU1vZHVsZSxcbiAgICAgICAgTWF0QmFkZ2VNb2R1bGUsXG4gICAgICAgIC8vIFRXQU1kMk5vdGlmaWNhdGlvbnNDb21wb25lbnQsXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgVFdBTWQyTm90aWZpY2F0aW9uc0NvbXBvbmVudCxcbiAgICAgICAgLy8gVHdhTWQyTm90aWZpY2F0aW9uc1NlcnZpY2UsXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIE92ZXJsYXlNb2R1bGUsXG4gICAgICAgIFRXQU1kMk5vdGlmaWNhdGlvbnNDb21wb25lbnQsXG4gICAgICAgIC8vIFR3YU1kMk5vdGlmaWNhdGlvbnNTZXJ2aWNlLFxuICAgIF0sXG4gICAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgICAgIFRXQU1kMk5vdGlmaWNhdGlvbnNDb21wb25lbnQsXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgVFdBTWQyTm90aWZpY2F0aW9uc0NvbXBvbmVudCxcbiAgICBdLFxuICAgIHNjaGVtYXM6IFtcbiAgICAgICAgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgVFdBTWQyTm90aWZpY2F0aW9uc01vZHVsZSB7IH1cbiJdLCJuYW1lcyI6WyJvZiIsIkluamVjdGFibGUiLCJFdmVudEVtaXR0ZXIiLCJmcm9tRXZlbnQiLCJkZWxheSIsInRhcCIsIkNvbXBvbmVudCIsIkVsZW1lbnRSZWYiLCJJbnB1dCIsIk91dHB1dCIsIlZpZXdDaGlsZCIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIiwiRmxleExheW91dE1vZHVsZSIsIk1hdENhcmRNb2R1bGUiLCJNYXRCdXR0b25Nb2R1bGUiLCJNYXRJY29uTW9kdWxlIiwiT3ZlcmxheU1vZHVsZSIsIk1hdEJhZGdlTW9kdWxlIiwiQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO1FBbUJJO1lBRlEsVUFBSyxHQUFhLEVBQUUsQ0FBQztTQUVaOzs7OztRQUVWLHdDQUFHOzs7O1lBQVYsVUFBVyxLQUFhO2dCQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNuQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUMxQjs7Ozs7UUFFTSwyQ0FBTTs7OztZQUFiLFVBQWMsR0FBVztnQkFDckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQzdCOzs7O1FBRU0sd0NBQUc7OztZQUFWO2dCQUNJLE9BQU9BLE9BQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDekI7Ozs7O1FBRU0sNENBQU87Ozs7WUFBZCxVQUFlLEtBQWE7Z0JBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDdEI7O29CQXhCSkMsYUFBVSxTQUFDO3dCQUNWLFVBQVUsRUFBRSxNQUFNO3FCQUNuQjs7Ozs7eUNBZEQ7S0FzQ0M7Ozs7OztBQ3RDRDtBQU1BO1FBMEVJLHNDQUNZLE1BQWtCO1lBQWxCLFdBQU0sR0FBTixNQUFNLENBQVk7WUFYcEIsaUJBQVksR0FBc0IsSUFBSUMsZUFBWSxFQUFFLENBQUM7WUFPL0QsYUFBUSxHQUFHLEtBQUssQ0FBQztTQUtaOzs7O1FBRUwsK0NBQVE7OztZQUFSO2dCQUFBLGlCQWFDO2dCQVpHLElBQUksQ0FBQyxhQUFhLENB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