(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('@angular/common'), require('@angular/flex-layout'), require('@angular/material/card'), require('@angular/material/button'), require('@angular/material/icon'), require('@angular/cdk/overlay')) :
    typeof define === 'function' && define.amd ? define('twa-md2-notifications', ['exports', '@angular/core', 'rxjs', 'rxjs/operators', '@angular/common', '@angular/flex-layout', '@angular/material/card', '@angular/material/button', '@angular/material/icon', '@angular/cdk/overlay'], factory) :
    (factory((global['twa-md2-notifications'] = {}),global.ng.core,global.rxjs,global.rxjs.operators,global.ng.common,global.ng['flex-layout'],global.ng.material.card,global.ng.material.button,global.ng.material.icon,global.ng.cdk.overlay));
}(this, (function (exports,i0,rxjs,operators,common,flexLayout,card,button,icon,overlay) { 'use strict';

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
                        template: "\n        <button mat-icon-button #overlayOrigin=\"cdkOverlayOrigin\" cdkOverlayOrigin (click)=\"notifClicked()\">\n            <mat-icon *ngIf=\"notifs.length\">notifications</mat-icon>\n            <mat-icon *ngIf=\"notifs.length===0\">notifications_none</mat-icon>\n        </button>\n        <ng-template\n            cdkConnectedOverlay\n            [cdkConnectedOverlayOrigin]=\"overlayOrigin\"\n            [cdkConnectedOverlayOpen]=\"isOpened\"\n            (detach)=\"connectedOverlayDetach()\"\n        >\n            <div #notifPanelContainer class=\"notifPanelContainer twa-notif\" fxLayoutGap=\"12px\">\n                <div fxLayout=\"row\" class=\"panelTitle twa-notif\">\n                    <h3 class=\"twa-notif\" fxFlex>Notifications</h3>\n                    <button class=\"twa-notif\" mat-icon-button (click)=\"clearPanels()\">\n                        <mat-icon class=\"twa-notif\">clear_all</mat-icon>\n                    </button>\n                </div>\n                <mat-card *ngFor=\"let notif of notifs; let i = index\" \n                          fxLayout=\"row\"\n                          class=\"notif twa-notif\"\n                          (click)=\"notifPanelClicked(notif, i)\">\n                    <div class=\"cicon twa-notif\">\n                        <mat-icon class=\"panelIcon twa-notif\" *ngIf=\"!notif.image\">notifications</mat-icon>\n                        <img class=\"notifImage twa-notif\" *ngIf=\"notif.image\" [src]=\"notif.image\" />\n                    </div>\n                    <div class=\"ccontent twa-notif\" fxLayout=\"column\">\n                        <div fxLayout=\"row\" class=\"twa-notif\">\n                            <h4 class=\"twa-notif\" fxFlex>{{notif.title}}</h4>\n                            <button class=\"close twa-notif\" mat-icon-button (click)=\"removePanel(i)\">\n                                <mat-icon class=\"twa-notif\">close</mat-icon>\n                            </button>\n                        </div>\n                        <p class=\"twa-notif\" fxFlex>{{notif.message}}</p>\n                    </div>\n                </mat-card>\n                <div class=\"notifPanelHideButton twa-notif\" (click)=\"isOpened = false\" fxLayout=\"row\" fxLayoutAlign=\"center center\">\n                    <mat-icon>expand_less</mat-icon>\n                </div>\n            </div>\n        </ng-template>\n    ",
                        styles: [
                            '.notifPanelContainer { width: 320px; background: #eee; border: 1px solid #ccc;' +
                                'padding: 12px 12px 4px 12px; box-shadow: 0 2px 10px rgba(0,0,0,.2); }',
                            '.notifPanelHideButton { width: 100%; height: 18px; border-top: 1px solid #ccc; cursor: pointer; }',
                            'div.panelTitle h3 { color: #aaa; font-weight: 900; font-family: Roboto Light; font-size: 26px; margin: 8px; }',
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdhLW1kMi1ub3RpZmljYXRpb25zLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vdHdhLW1kMi1ub3RpZmljYXRpb25zL2xpYi90d2EtbWQyLW5vdGlmaWNhdGlvbnMuc2VydmljZS50cyIsIm5nOi8vdHdhLW1kMi1ub3RpZmljYXRpb25zL2xpYi90d2EtbWQyLW5vdGlmaWNhdGlvbnMuY29tcG9uZW50LnRzIiwibmc6Ly90d2EtbWQyLW5vdGlmaWNhdGlvbnMvbGliL3R3YS1tZDItbm90aWZpY2F0aW9ucy5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcblxuZXhwb3J0IGludGVyZmFjZSBJTm90aWYge1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIGRhdGU6IHN0cmluZztcbiAgICBkYXRhPzogYW55O1xuICAgIGljb24/OiBzdHJpbmc7XG4gICAgaW1hZ2U/OiBzdHJpbmc7XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFR3YU1kMk5vdGlmaWNhdGlvbnNTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgcXVldWU6IElOb3RpZltdID0gW107XG5cbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gICAgcHVibGljIGFkZChub3RpZjogSU5vdGlmKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKG5vdGlmKTtcbiAgICAgICAgdGhpcy5xdWV1ZS5wdXNoKG5vdGlmKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVtb3ZlKGlkeDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMucXVldWUuc3BsaWNlKGlkeCwgMSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCgpOiBPYnNlcnZhYmxlPElOb3RpZltdPiB7XG4gICAgICAgIHJldHVybiBvZih0aGlzLnF1ZXVlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xpY2tlZChub3RpZjogSU5vdGlmKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKG5vdGlmKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBWaWV3Q2hpbGQsIEV2ZW50RW1pdHRlciwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHdhTWQyTm90aWZpY2F0aW9uc1NlcnZpY2UsIElOb3RpZiB9IGZyb20gJy4vdHdhLW1kMi1ub3RpZmljYXRpb25zLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgZnJvbUV2ZW50IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWxheSwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuLy8gaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAncHJvdHJhY3Rvcic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndHdhLW1kMi1ub3RpZmljYXRpb25zJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiAjb3ZlcmxheU9yaWdpbj1cImNka092ZXJsYXlPcmlnaW5cIiBjZGtPdmVybGF5T3JpZ2luIChjbGljayk9XCJub3RpZkNsaWNrZWQoKVwiPlxuICAgICAgICAgICAgPG1hdC1pY29uICpuZ0lmPVwibm90aWZzLmxlbmd0aFwiPm5vdGlmaWNhdGlvbnM8L21hdC1pY29uPlxuICAgICAgICAgICAgPG1hdC1pY29uICpuZ0lmPVwibm90aWZzLmxlbmd0aD09PTBcIj5ub3RpZmljYXRpb25zX25vbmU8L21hdC1pY29uPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPG5nLXRlbXBsYXRlXG4gICAgICAgICAgICBjZGtDb25uZWN0ZWRPdmVybGF5XG4gICAgICAgICAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheU9yaWdpbl09XCJvdmVybGF5T3JpZ2luXCJcbiAgICAgICAgICAgIFtjZGtDb25uZWN0ZWRPdmVybGF5T3Blbl09XCJpc09wZW5lZFwiXG4gICAgICAgICAgICAoZGV0YWNoKT1cImNvbm5lY3RlZE92ZXJsYXlEZXRhY2goKVwiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxkaXYgI25vdGlmUGFuZWxDb250YWluZXIgY2xhc3M9XCJub3RpZlBhbmVsQ29udGFpbmVyIHR3YS1ub3RpZlwiIGZ4TGF5b3V0R2FwPVwiMTJweFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBjbGFzcz1cInBhbmVsVGl0bGUgdHdhLW5vdGlmXCI+XG4gICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cInR3YS1ub3RpZlwiIGZ4RmxleD5Ob3RpZmljYXRpb25zPC9oMz5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInR3YS1ub3RpZlwiIG1hdC1pY29uLWJ1dHRvbiAoY2xpY2spPVwiY2xlYXJQYW5lbHMoKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwidHdhLW5vdGlmXCI+Y2xlYXJfYWxsPC9tYXQtaWNvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPG1hdC1jYXJkICpuZ0Zvcj1cImxldCBub3RpZiBvZiBub3RpZnM7IGxldCBpID0gaW5kZXhcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZnhMYXlvdXQ9XCJyb3dcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cIm5vdGlmIHR3YS1ub3RpZlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJub3RpZlBhbmVsQ2xpY2tlZChub3RpZiwgaSlcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNpY29uIHR3YS1ub3RpZlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwicGFuZWxJY29uIHR3YS1ub3RpZlwiICpuZ0lmPVwiIW5vdGlmLmltYWdlXCI+bm90aWZpY2F0aW9uczwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPVwibm90aWZJbWFnZSB0d2Etbm90aWZcIiAqbmdJZj1cIm5vdGlmLmltYWdlXCIgW3NyY109XCJub3RpZi5pbWFnZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2NvbnRlbnQgdHdhLW5vdGlmXCIgZnhMYXlvdXQ9XCJjb2x1bW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBjbGFzcz1cInR3YS1ub3RpZlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzcz1cInR3YS1ub3RpZlwiIGZ4RmxleD57e25vdGlmLnRpdGxlfX08L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJjbG9zZSB0d2Etbm90aWZcIiBtYXQtaWNvbi1idXR0b24gKGNsaWNrKT1cInJlbW92ZVBhbmVsKGkpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cInR3YS1ub3RpZlwiPmNsb3NlPC9tYXQtaWNvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJ0d2Etbm90aWZcIiBmeEZsZXg+e3tub3RpZi5tZXNzYWdlfX08L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvbWF0LWNhcmQ+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5vdGlmUGFuZWxIaWRlQnV0dG9uIHR3YS1ub3RpZlwiIChjbGljayk9XCJpc09wZW5lZCA9IGZhbHNlXCIgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwiY2VudGVyIGNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWljb24+ZXhwYW5kX2xlc3M8L21hdC1pY29uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgYCxcbiAgICBzdHlsZXM6IFtcbiAgICAgICAgJy5ub3RpZlBhbmVsQ29udGFpbmVyIHsgd2lkdGg6IDMyMHB4OyBiYWNrZ3JvdW5kOiAjZWVlOyBib3JkZXI6IDFweCBzb2xpZCAjY2NjOycgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdwYWRkaW5nOiAxMnB4IDEycHggNHB4IDEycHg7IGJveC1zaGFkb3c6IDAgMnB4IDEwcHggcmdiYSgwLDAsMCwuMik7IH0nLFxuICAgICAgICAnLm5vdGlmUGFuZWxIaWRlQnV0dG9uIHsgd2lkdGg6IDEwMCU7IGhlaWdodDogMThweDsgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNjY2M7IGN1cnNvcjogcG9pbnRlcjsgfScsXG4gICAgICAgICdkaXYucGFuZWxUaXRsZSBoMyB7IGNvbG9yOiAjYWFhOyBmb250LXdlaWdodDogOTAwOyBmb250LWZhbWlseTogUm9ib3RvIExpZ2h0OyBmb250LXNpemU6IDI2cHg7IG1hcmdpbjogOHB4OyB9JyxcbiAgICAgICAgJ21hdC1jYXJkLm5vdGlmIHsgY3Vyc29yOiBwb2ludGVyOyBwYWRkaW5nOiAxMnB4IDEycHggMTJweCA4cHg7IG1hcmdpbjogMCAwIDhweCAwIWltcG9ydGFudDsgfScsXG4gICAgICAgICdtYXQtY2FyZC5ub3RpZiBoNCB7IGZvbnQtZmFtaWx5OiBSb2JvdG8gTGlnaHQ7IGZvbnQtc2l6ZTogMTZweDsgbWFyZ2luOiA4cHggMCAwOyB9JyxcbiAgICAgICAgJ21hdC1jYXJkLm5vdGlmIHAgeyBmb250LWZhbWlseTogUm9ib3RvIExpZ2h0OyBtYXJnaW46IDhweCAwIDA7IH0nLFxuICAgICAgICAnLmNpY29uIHsgcGFkZGluZzogMTJweCAxMnB4IDEycHggNHB4OyB9JyxcbiAgICAgICAgJy5jY29udGVudCB7IHdpZHRoOiAxMDAlOyB9JyxcbiAgICAgICAgJ21hdC1pY29uLnBhbmVsSWNvbiB7IGZvbnQtc2l6ZTogNDBweDsgaGVpZ2h0OiA0MHB4OyB3aWR0aDogNDBweDsgbGluZS1oZWlnaHQ6IDQwcHg7IH0nLFxuICAgICAgICAnaW1nLm5vdGlmSW1hZ2UgeyB3aWR0aDogNDB4OyBoZWlnaHQ6IDQwcHg7IGJvcmRlci1yYWRpdXM6IDUwJTsgfScsXG4gICAgICAgICdidXR0b24uY2xvc2UgeyBtYXJnaW46IC0xMnB4IC0xMnB4IDAgMDt9JyxcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIFRXQU1kMk5vdGlmaWNhdGlvbnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBJbnB1dCgpIG5vdGlmc1NlcnZpY2U6IFR3YU1kMk5vdGlmaWNhdGlvbnNTZXJ2aWNlO1xuICAgIEBPdXRwdXQoKSBwYW5lbENsaWNrZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQFZpZXdDaGlsZCgnbm90aWZQYW5lbENvbnRhaW5lcicpIG5vdGlmUGFuZWw7XG5cbiAgICBwcml2YXRlIGdsb2JhbENsaWNrOiBPYnNlcnZhYmxlPEV2ZW50PjtcbiAgICBwcml2YXRlIGxpc3RlbmluZzogYm9vbGVhbjtcblxuICAgIGlzT3BlbmVkID0gZmFsc2U7XG4gICAgbm90aWZzOiBJTm90aWZbXTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9lbFJlZjogRWxlbWVudFJlZixcbiAgICApIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMubm90aWZzU2VydmljZS5nZXQoKS5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgICB0aGlzLm5vdGlmcyA9IGRhdGE7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmdsb2JhbENsaWNrID0gZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKS5waXBlKFxuICAgICAgICAgICAgZGVsYXkoMSksXG4gICAgICAgICAgICB0YXAoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdGVuaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuZ2xvYmFsQ2xpY2suc3Vic2NyaWJlKChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbkdsb2JhbENsaWNrKGV2ZW50KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25HbG9iYWxDbGljayhldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBNb3VzZUV2ZW50ICYmXG4gICAgICAgICAgICB0aGlzLmxpc3RlbmluZyA9PT0gdHJ1ZSAmJlxuICAgICAgICAgICAgdHlwZW9mIHRoaXMubm90aWZQYW5lbCAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgICAgIHRoaXMubm90aWZQYW5lbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm5vdGlmUGFuZWwubmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLl9lbFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGV2ZW50LnRhcmdldCk7XG4gICAgICAgICAgICBpZiAodGhpcy5pc0Rlc2NlbmRhbnQodGhpcy5ub3RpZlBhbmVsLm5hdGl2ZUVsZW1lbnQsIGV2ZW50LnRhcmdldCkgIT09IHRydWUgJiZcbiAgICAgICAgICAgICAgICB0aGlzLmlzRGVzY2VuZGFudCh0aGlzLl9lbFJlZi5uYXRpdmVFbGVtZW50LCBldmVudC50YXJnZXQpICE9PSB0cnVlICYmXG4gICAgICAgICAgICAgICAgdGhpcy5fZWxSZWYubmF0aXZlRWxlbWVudCAhPT0gZXZlbnQudGFyZ2V0ICYmXG4gICAgICAgICAgICAgICAgIXRoaXMuaGFzQ2xhc3MoZXZlbnQudGFyZ2V0LCAndHdhLW5vdGlmJykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzT3BlbmVkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYXNDbGFzcyhlbGVtLCBjbGFzc05hbWUpIHtcbiAgICAgICAgaWYgKGVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpc0Rlc2NlbmRhbnQocGFyZW50LCBjaGlsZCkge1xuICAgICAgICBsZXQgbm9kZSA9IGNoaWxkO1xuICAgICAgICB3aGlsZSAobm9kZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKG5vZGUgPT09IHBhcmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBub3RpZkNsaWNrZWQoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdub3RpZiBpY29uIGNsaWNrZWQhJyk7XG4gICAgICAgIGlmICghdGhpcy5pc09wZW5lZCAmJiAhdGhpcy5ub3RpZnMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pc09wZW5lZCA9ICF0aGlzLmlzT3BlbmVkO1xuICAgIH1cblxuICAgIG5vdGlmUGFuZWxDbGlja2VkKG5vdGlmOiBJTm90aWYsIG5vdGlmSWR4OiBudW1iZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ25vdGlmIHBhbmVsIGNsaWNrZWQhJywgbm90aWYpO1xuICAgICAgICBpZiAodHlwZW9mIG5vdGlmLmRhdGEgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgIHR5cGVvZiBub3RpZi5kYXRhLmFjdGlvbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIG5vdGlmLmRhdGEuYWN0aW9uKG5vdGlmKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucGFuZWxDbGlja2VkLmVtaXQobm90aWYpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubm90aWZzU2VydmljZS5yZW1vdmUobm90aWZJZHgpO1xuICAgICAgICB0aGlzLmNoZWNrSWZPcGVuZWQoKTtcbiAgICB9XG5cbiAgICBjaGVja0lmT3BlbmVkKCkge1xuICAgICAgICBpZiAodGhpcy5ub3RpZnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmlzT3BlbmVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW1vdmVQYW5lbChub3RpZklkeDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMubm90aWZzU2VydmljZS5yZW1vdmUobm90aWZJZHgpO1xuICAgICAgICB0aGlzLmNoZWNrSWZPcGVuZWQoKTtcbiAgICB9XG5cbiAgICBjbGVhclBhbmVscygpIHtcbiAgICAgICAgaWYgKHRoaXMubm90aWZzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5ub3RpZnMuc3BsaWNlKDAsIDEpO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhclBhbmVscygpO1xuICAgICAgICAgICAgfSwgMjAwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tJZk9wZW5lZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29ubmVjdGVkT3ZlcmxheURldGFjaCgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ292ZXJsYXkgZGV0YWNoZWQhJyk7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSwgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZsZXhMYXlvdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mbGV4LWxheW91dCc7XG5pbXBvcnQgeyBNYXRDYXJkTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY2FyZCc7XG4vLyBpbXBvcnQgeyBUd2FNZDJOb3RpZmljYXRpb25zU2VydmljZSB9IGZyb20gJy4vdHdhLW1kMi1ub3RpZmljYXRpb25zLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24nO1xuaW1wb3J0IHsgTWF0SWNvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2ljb24nO1xuaW1wb3J0IHsgT3ZlcmxheU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcblxuaW1wb3J0IHsgVFdBTWQyTm90aWZpY2F0aW9uc0NvbXBvbmVudCB9IGZyb20gJy4vdHdhLW1kMi1ub3RpZmljYXRpb25zLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEZsZXhMYXlvdXRNb2R1bGUsXG4gICAgICAgIE1hdENhcmRNb2R1bGUsXG4gICAgICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICAgICAgTWF0SWNvbk1vZHVsZSxcbiAgICAgICAgT3ZlcmxheU1vZHVsZSxcbiAgICAgICAgLy8gVFdBTWQyTm90aWZpY2F0aW9uc0NvbXBvbmVudCxcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBUV0FNZDJOb3RpZmljYXRpb25zQ29tcG9uZW50LFxuICAgICAgICAvLyBUd2FNZDJOb3RpZmljYXRpb25zU2VydmljZSxcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgT3ZlcmxheU1vZHVsZSxcbiAgICAgICAgVFdBTWQyTm90aWZpY2F0aW9uc0NvbXBvbmVudCxcbiAgICAgICAgLy8gVHdhTWQyTm90aWZpY2F0aW9uc1NlcnZpY2UsXG4gICAgXSxcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICAgICAgVFdBTWQyTm90aWZpY2F0aW9uc0NvbXBvbmVudCxcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBUV0FNZDJOb3RpZmljYXRpb25zQ29tcG9uZW50LFxuICAgIF0sXG4gICAgc2NoZW1hczogW1xuICAgICAgICBDVVNUT01fRUxFTUVOVFNfU0NIRU1BXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBUV0FNZDJOb3RpZmljYXRpb25zTW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbIm9mIiwiSW5qZWN0YWJsZSIsIkV2ZW50RW1pdHRlciIsImZyb21FdmVudCIsImRlbGF5IiwidGFwIiwiQ29tcG9uZW50IiwiRWxlbWVudFJlZiIsIklucHV0IiwiT3V0cHV0IiwiVmlld0NoaWxkIiwiTmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiLCJGbGV4TGF5b3V0TW9kdWxlIiwiTWF0Q2FyZE1vZHVsZSIsIk1hdEJ1dHRvbk1vZHVsZSIsIk1hdEljb25Nb2R1bGUiLCJPdmVybGF5TW9kdWxlIiwiQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO1FBbUJJO1lBRlEsVUFBSyxHQUFhLEVBQUUsQ0FBQztTQUVaOzs7OztRQUVWLHdDQUFHOzs7O1lBQVYsVUFBVyxLQUFhO2dCQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNuQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUMxQjs7Ozs7UUFFTSwyQ0FBTTs7OztZQUFiLFVB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