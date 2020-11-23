(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('@angular/common'), require('@angular/flex-layout'), require('@angular/material/card'), require('@angular/material/button'), require('@angular/material/icon'), require('@angular/cdk/overlay'), require('@angular/material/badge')) :
    typeof define === 'function' && define.amd ? define('twa-md2-notifications', ['exports', '@angular/core', 'rxjs', 'rxjs/operators', '@angular/common', '@angular/flex-layout', '@angular/material/card', '@angular/material/button', '@angular/material/icon', '@angular/cdk/overlay', '@angular/material/badge'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['twa-md2-notifications'] = {}, global.ng.core, global.rxjs, global.rxjs.operators, global.ng.common, global.ng.flexLayout, global.ng.material.card, global.ng.material.button, global.ng.material.icon, global.ng.cdk.overlay, global.ng.material.badge));
}(this, (function (exports, i0, rxjs, operators, common, flexLayout, card, button, icon, overlay, badge) { 'use strict';

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
        return TwaMd2NotificationsService;
    }());
    TwaMd2NotificationsService.ɵprov = i0.ɵɵdefineInjectable({ factory: function TwaMd2NotificationsService_Factory() { return new TwaMd2NotificationsService(); }, token: TwaMd2NotificationsService, providedIn: "root" });
    TwaMd2NotificationsService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    TwaMd2NotificationsService.ctorParameters = function () { return []; };

    // import { EventEmitter } from 'protractor';
    var TWAMd2NotificationsComponent = /** @class */ (function () {
        function TWAMd2NotificationsComponent(_elRef) {
            this._elRef = _elRef;
            this.panelClicked = new i0.EventEmitter();
            this.panelClosed = new i0.EventEmitter();
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
        return TWAMd2NotificationsComponent;
    }());
    TWAMd2NotificationsComponent.decorators = [
        { type: i0.Component, args: [{
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
                },] }
    ];
    TWAMd2NotificationsComponent.ctorParameters = function () { return [
        { type: i0.ElementRef }
    ]; };
    TWAMd2NotificationsComponent.propDecorators = {
        notifsService: [{ type: i0.Input }],
        panelClicked: [{ type: i0.Output }],
        panelClosed: [{ type: i0.Output }],
        notifPanel: [{ type: i0.ViewChild, args: ['notifPanelContainer',] }]
    };

    var TWAMd2NotificationsModule = /** @class */ (function () {
        function TWAMd2NotificationsModule() {
        }
        return TWAMd2NotificationsModule;
    }());
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
                    // entryComponents: [
                    //     TWAMd2NotificationsComponent,
                    // ],
                    providers: [
                        TWAMd2NotificationsComponent,
                    ],
                    schemas: [
                        i0.CUSTOM_ELEMENTS_SCHEMA
                    ]
                },] }
    ];

    /*
     * Public API Surface of twa-md2-notifications
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.TWAMd2NotificationsComponent = TWAMd2NotificationsComponent;
    exports.TWAMd2NotificationsModule = TWAMd2NotificationsModule;
    exports.TwaMd2NotificationsService = TwaMd2NotificationsService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=twa-md2-notifications.umd.js.map
