import { Injectable, NgModule, CUSTOM_ELEMENTS_SCHEMA, Component, Input, Output, ViewChild, EventEmitter, ElementRef, defineInjectable } from '@angular/core';
import { of, fromEvent } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { OverlayModule } from '@angular/cdk/overlay';

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
        return of(this.queue);
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
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    TwaMd2NotificationsService.ctorParameters = function () { return []; };
    /** @nocollapse */ TwaMd2NotificationsService.ngInjectableDef = defineInjectable({ factory: function TwaMd2NotificationsService_Factory() { return new TwaMd2NotificationsService(); }, token: TwaMd2NotificationsService, providedIn: "root" });
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
        this.panelClicked = new EventEmitter();
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
        this.globalClick = fromEvent(document, 'click').pipe(delay(1), tap(function () {
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
        { type: Component, args: [{
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
    TWAMd2NotificationsComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    TWAMd2NotificationsComponent.propDecorators = {
        notifsService: [{ type: Input }],
        panelClicked: [{ type: Output }],
        notifPanel: [{ type: ViewChild, args: ['notifPanelContainer',] }]
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
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FlexLayoutModule,
                        MatCardModule,
                        MatButtonModule,
                        MatIconModule,
                        OverlayModule,
                    ],
                    declarations: [
                        TWAMd2NotificationsComponent,
                    ],
                    exports: [
                        OverlayModule,
                        TWAMd2NotificationsComponent,
                    ],
                    entryComponents: [
                        TWAMd2NotificationsComponent,
                    ],
                    providers: [
                        TWAMd2NotificationsComponent,
                    ],
                    schemas: [
                        CUSTOM_ELEMENTS_SCHEMA
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

export { TwaMd2NotificationsService, TWAMd2NotificationsComponent, TWAMd2NotificationsModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdhLW1kMi1ub3RpZmljYXRpb25zLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly90d2EtbWQyLW5vdGlmaWNhdGlvbnMvbGliL3R3YS1tZDItbm90aWZpY2F0aW9ucy5zZXJ2aWNlLnRzIiwibmc6Ly90d2EtbWQyLW5vdGlmaWNhdGlvbnMvbGliL3R3YS1tZDItbm90aWZpY2F0aW9ucy5jb21wb25lbnQudHMiLCJuZzovL3R3YS1tZDItbm90aWZpY2F0aW9ucy9saWIvdHdhLW1kMi1ub3RpZmljYXRpb25zLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElOb3RpZiB7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgZGF0ZTogc3RyaW5nO1xuICAgIGRhdGE/OiBhbnk7XG4gICAgaWNvbj86IHN0cmluZztcbiAgICBpbWFnZT86IHN0cmluZztcbn1cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgVHdhTWQyTm90aWZpY2F0aW9uc1NlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSBxdWV1ZTogSU5vdGlmW10gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgICBwdWJsaWMgYWRkKG5vdGlmOiBJTm90aWYpIHtcbiAgICAgICAgY29uc29sZS5sb2cobm90aWYpO1xuICAgICAgICB0aGlzLnF1ZXVlLnB1c2gobm90aWYpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZW1vdmUoaWR4OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5xdWV1ZS5zcGxpY2UoaWR4LCAxKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0KCk6IE9ic2VydmFibGU8SU5vdGlmW10+IHtcbiAgICAgICAgcmV0dXJuIG9mKHRoaXMucXVldWUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjbGlja2VkKG5vdGlmOiBJTm90aWYpIHtcbiAgICAgICAgY29uc29sZS5sb2cobm90aWYpO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIFZpZXdDaGlsZCwgRXZlbnRFbWl0dGVyLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUd2FNZDJOb3RpZmljYXRpb25zU2VydmljZSwgSU5vdGlmIH0gZnJvbSAnLi90d2EtbWQyLW5vdGlmaWNhdGlvbnMuc2VydmljZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBmcm9tRXZlbnQgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlbGF5LCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG4vLyBpbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdwcm90cmFjdG9yJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd0d2EtbWQyLW5vdGlmaWNhdGlvbnMnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uICNvdmVybGF5T3JpZ2luPVwiY2RrT3ZlcmxheU9yaWdpblwiIGNka092ZXJsYXlPcmlnaW4gKGNsaWNrKT1cIm5vdGlmQ2xpY2tlZCgpXCI+XG4gICAgICAgICAgICA8bWF0LWljb24gKm5nSWY9XCJub3RpZnMubGVuZ3RoXCI+bm90aWZpY2F0aW9uczwvbWF0LWljb24+XG4gICAgICAgICAgICA8bWF0LWljb24gKm5nSWY9XCJub3RpZnMubGVuZ3RoPT09MFwiPm5vdGlmaWNhdGlvbnNfbm9uZTwvbWF0LWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8bmctdGVtcGxhdGVcbiAgICAgICAgICAgIGNka0Nvbm5lY3RlZE92ZXJsYXlcbiAgICAgICAgICAgIFtjZGtDb25uZWN0ZWRPdmVybGF5T3JpZ2luXT1cIm92ZXJsYXlPcmlnaW5cIlxuICAgICAgICAgICAgW2Nka0Nvbm5lY3RlZE92ZXJsYXlPcGVuXT1cImlzT3BlbmVkXCJcbiAgICAgICAgICAgIChkZXRhY2gpPVwiY29ubmVjdGVkT3ZlcmxheURldGFjaCgpXCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPGRpdiAjbm90aWZQYW5lbENvbnRhaW5lciBjbGFzcz1cIm5vdGlmUGFuZWxDb250YWluZXIgdHdhLW5vdGlmXCIgZnhMYXlvdXRHYXA9XCIxMnB4XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGNsYXNzPVwicGFuZWxUaXRsZSB0d2Etbm90aWZcIj5cbiAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzPVwidHdhLW5vdGlmXCIgZnhGbGV4Pk5vdGlmaWNhdGlvbnM8L2gzPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwidHdhLW5vdGlmXCIgbWF0LWljb24tYnV0dG9uIChjbGljayk9XCJjbGVhclBhbmVscygpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJ0d2Etbm90aWZcIj5jbGVhcl9hbGw8L21hdC1pY29uPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8bWF0LWNhcmQgKm5nRm9yPVwibGV0IG5vdGlmIG9mIG5vdGlmczsgbGV0IGkgPSBpbmRleFwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICBmeExheW91dD1cInJvd1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwibm90aWYgdHdhLW5vdGlmXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm5vdGlmUGFuZWxDbGlja2VkKG5vdGlmLCBpKVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2ljb24gdHdhLW5vdGlmXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJwYW5lbEljb24gdHdhLW5vdGlmXCIgKm5nSWY9XCIhbm90aWYuaW1hZ2VcIj5ub3RpZmljYXRpb25zPC9tYXQtaWNvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJub3RpZkltYWdlIHR3YS1ub3RpZlwiICpuZ0lmPVwibm90aWYuaW1hZ2VcIiBbc3JjXT1cIm5vdGlmLmltYWdlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjY29udGVudCB0d2Etbm90aWZcIiBmeExheW91dD1cImNvbHVtblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGNsYXNzPVwidHdhLW5vdGlmXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzPVwidHdhLW5vdGlmXCIgZnhGbGV4Pnt7bm90aWYudGl0bGV9fTwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImNsb3NlIHR3YS1ub3RpZlwiIG1hdC1pY29uLWJ1dHRvbiAoY2xpY2spPVwicmVtb3ZlUGFuZWwoaSlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwidHdhLW5vdGlmXCI+Y2xvc2U8L21hdC1pY29uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInR3YS1ub3RpZlwiIGZ4RmxleD57e25vdGlmLm1lc3NhZ2V9fTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9tYXQtY2FyZD5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibm90aWZQYW5lbEhpZGVCdXR0b24gdHdhLW5vdGlmXCIgKGNsaWNrKT1cImlzT3BlbmVkID0gZmFsc2VcIiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJjZW50ZXIgY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbj5leHBhbmRfbGVzczwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICBgLFxuICAgIHN0eWxlczogW1xuICAgICAgICAnLm5vdGlmUGFuZWxDb250YWluZXIgeyB3aWR0aDogMzIwcHg7IGJhY2tncm91bmQ6ICNlZWU7IGJvcmRlcjogMXB4IHNvbGlkICNjY2M7JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3BhZGRpbmc6IDEycHggMTJweCA0cHggMTJweDsgYm94LXNoYWRvdzogMCAycHggMTBweCByZ2JhKDAsMCwwLC4yKTsgfScsXG4gICAgICAgICcubm90aWZQYW5lbEhpZGVCdXR0b24geyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxOHB4OyBib3JkZXItdG9wOiAxcHggc29saWQgI2NjYzsgY3Vyc29yOiBwb2ludGVyOyB9JyxcbiAgICAgICAgJ2Rpdi5wYW5lbFRpdGxlIGgzIHsgY29sb3I6ICNhYWE7IGZvbnQtd2VpZ2h0OiA5MDA7IGZvbnQtZmFtaWx5OiBSb2JvdG8gTGlnaHQ7IGZvbnQtc2l6ZTogMjZweDsgbWFyZ2luOiA4cHg7IH0nLFxuICAgICAgICAnbWF0LWNhcmQubm90aWYgeyBjdXJzb3I6IHBvaW50ZXI7IHBhZGRpbmc6IDEycHggMTJweCAxMnB4IDhweDsgbWFyZ2luOiAwIDAgOHB4IDAhaW1wb3J0YW50OyB9JyxcbiAgICAgICAgJ21hdC1jYXJkLm5vdGlmIGg0IHsgZm9udC1mYW1pbHk6IFJvYm90byBMaWdodDsgZm9udC1zaXplOiAxNnB4OyBtYXJnaW46IDhweCAwIDA7IH0nLFxuICAgICAgICAnbWF0LWNhcmQubm90aWYgcCB7IGZvbnQtZmFtaWx5OiBSb2JvdG8gTGlnaHQ7IG1hcmdpbjogOHB4IDAgMDsgfScsXG4gICAgICAgICcuY2ljb24geyBwYWRkaW5nOiAxMnB4IDEycHggMTJweCA0cHg7IH0nLFxuICAgICAgICAnLmNjb250ZW50IHsgd2lkdGg6IDEwMCU7IH0nLFxuICAgICAgICAnbWF0LWljb24ucGFuZWxJY29uIHsgZm9udC1zaXplOiA0MHB4OyBoZWlnaHQ6IDQwcHg7IHdpZHRoOiA0MHB4OyBsaW5lLWhlaWdodDogNDBweDsgfScsXG4gICAgICAgICdpbWcubm90aWZJbWFnZSB7IHdpZHRoOiA0MHg7IGhlaWdodDogNDBweDsgYm9yZGVyLXJhZGl1czogNTAlOyB9JyxcbiAgICAgICAgJ2J1dHRvbi5jbG9zZSB7IG1hcmdpbjogLTEycHggLTEycHggMCAwO30nLFxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgVFdBTWQyTm90aWZpY2F0aW9uc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQElucHV0KCkgbm90aWZzU2VydmljZTogVHdhTWQyTm90aWZpY2F0aW9uc1NlcnZpY2U7XG4gICAgQE91dHB1dCgpIHBhbmVsQ2xpY2tlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAVmlld0NoaWxkKCdub3RpZlBhbmVsQ29udGFpbmVyJykgbm90aWZQYW5lbDtcblxuICAgIHByaXZhdGUgZ2xvYmFsQ2xpY2s6IE9ic2VydmFibGU8RXZlbnQ+O1xuICAgIHByaXZhdGUgbGlzdGVuaW5nOiBib29sZWFuO1xuXG4gICAgaXNPcGVuZWQgPSBmYWxzZTtcbiAgICBub3RpZnM6IElOb3RpZltdO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX2VsUmVmOiBFbGVtZW50UmVmLFxuICAgICkgeyB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5ub3RpZnNTZXJ2aWNlLmdldCgpLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgICAgIHRoaXMubm90aWZzID0gZGF0YTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZ2xvYmFsQ2xpY2sgPSBmcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpLnBpcGUoXG4gICAgICAgICAgICBkZWxheSgxKSxcbiAgICAgICAgICAgIHRhcCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0ZW5pbmcgPSB0cnVlO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5nbG9iYWxDbGljay5zdWJzY3JpYmUoKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uR2xvYmFsQ2xpY2soZXZlbnQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbkdsb2JhbENsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIE1vdXNlRXZlbnQgJiZcbiAgICAgICAgICAgIHRoaXMubGlzdGVuaW5nID09PSB0cnVlICYmXG4gICAgICAgICAgICB0eXBlb2YgdGhpcy5ub3RpZlBhbmVsICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgICAgdGhpcy5ub3RpZlBhbmVsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMubm90aWZQYW5lbC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuX2VsUmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzRGVzY2VuZGFudCh0aGlzLm5vdGlmUGFuZWwubmF0aXZlRWxlbWVudCwgZXZlbnQudGFyZ2V0KSAhPT0gdHJ1ZSAmJlxuICAgICAgICAgICAgICAgIHRoaXMuaXNEZXNjZW5kYW50KHRoaXMuX2VsUmVmLm5hdGl2ZUVsZW1lbnQsIGV2ZW50LnRhcmdldCkgIT09IHRydWUgJiZcbiAgICAgICAgICAgICAgICB0aGlzLl9lbFJlZi5uYXRpdmVFbGVtZW50ICE9PSBldmVudC50YXJnZXQgJiZcbiAgICAgICAgICAgICAgICAhdGhpcy5oYXNDbGFzcyhldmVudC50YXJnZXQsICd0d2Etbm90aWYnKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNPcGVuZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhc0NsYXNzKGVsZW0sIGNsYXNzTmFtZSkge1xuICAgICAgICBpZiAoZWxlbS5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlzRGVzY2VuZGFudChwYXJlbnQsIGNoaWxkKSB7XG4gICAgICAgIGxldCBub2RlID0gY2hpbGQ7XG4gICAgICAgIHdoaWxlIChub2RlICE9PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAobm9kZSA9PT0gcGFyZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIG5vdGlmQ2xpY2tlZCgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ25vdGlmIGljb24gY2xpY2tlZCEnKTtcbiAgICAgICAgaWYgKCF0aGlzLmlzT3BlbmVkICYmICF0aGlzLm5vdGlmcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlzT3BlbmVkID0gIXRoaXMuaXNPcGVuZWQ7XG4gICAgfVxuXG4gICAgbm90aWZQYW5lbENsaWNrZWQobm90aWY6IElOb3RpZiwgbm90aWZJZHg6IG51bWJlcikge1xuICAgICAgICBjb25zb2xlLmxvZygnbm90aWYgcGFuZWwgY2xpY2tlZCEnLCBub3RpZik7XG4gICAgICAgIGlmICh0eXBlb2Ygbm90aWYuZGF0YSAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgdHlwZW9mIG5vdGlmLmRhdGEuYWN0aW9uICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgbm90aWYuZGF0YS5hY3Rpb24obm90aWYpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wYW5lbENsaWNrZWQuZW1pdChub3RpZik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ub3RpZnNTZXJ2aWNlLnJlbW92ZShub3RpZklkeCk7XG4gICAgICAgIHRoaXMuY2hlY2tJZk9wZW5lZCgpO1xuICAgIH1cblxuICAgIGNoZWNrSWZPcGVuZWQoKSB7XG4gICAgICAgIGlmICh0aGlzLm5vdGlmcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuaXNPcGVuZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZVBhbmVsKG5vdGlmSWR4OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5ub3RpZnNTZXJ2aWNlLnJlbW92ZShub3RpZklkeCk7XG4gICAgICAgIHRoaXMuY2hlY2tJZk9wZW5lZCgpO1xuICAgIH1cblxuICAgIGNsZWFyUGFuZWxzKCkge1xuICAgICAgICBpZiAodGhpcy5ub3RpZnMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLm5vdGlmcy5zcGxpY2UoMCwgMSk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyUGFuZWxzKCk7XG4gICAgICAgICAgICB9LCAyMDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jaGVja0lmT3BlbmVkKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25uZWN0ZWRPdmVybGF5RGV0YWNoKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnb3ZlcmxheSBkZXRhY2hlZCEnKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IE1hdENhcmRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jYXJkJztcbi8vIGltcG9ydCB7IFR3YU1kMk5vdGlmaWNhdGlvbnNTZXJ2aWNlIH0gZnJvbSAnLi90d2EtbWQyLW5vdGlmaWNhdGlvbnMuc2VydmljZSc7XG5cbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2J1dHRvbic7XG5pbXBvcnQgeyBNYXRJY29uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaWNvbic7XG5pbXBvcnQgeyBPdmVybGF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuXG5pbXBvcnQgeyBUV0FNZDJOb3RpZmljYXRpb25zQ29tcG9uZW50IH0gZnJvbSAnLi90d2EtbWQyLW5vdGlmaWNhdGlvbnMuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgRmxleExheW91dE1vZHVsZSxcbiAgICAgICAgTWF0Q2FyZE1vZHVsZSxcbiAgICAgICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgICAgICBNYXRJY29uTW9kdWxlLFxuICAgICAgICBPdmVybGF5TW9kdWxlLFxuICAgICAgICAvLyBUV0FNZDJOb3RpZmljYXRpb25zQ29tcG9uZW50LFxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIFRXQU1kMk5vdGlmaWNhdGlvbnNDb21wb25lbnQsXG4gICAgICAgIC8vIFR3YU1kMk5vdGlmaWNhdGlvbnNTZXJ2aWNlLFxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBPdmVybGF5TW9kdWxlLFxuICAgICAgICBUV0FNZDJOb3RpZmljYXRpb25zQ29tcG9uZW50LFxuICAgICAgICAvLyBUd2FNZDJOb3RpZmljYXRpb25zU2VydmljZSxcbiAgICBdLFxuICAgIGVudHJ5Q29tcG9uZW50czogW1xuICAgICAgICBUV0FNZDJOb3RpZmljYXRpb25zQ29tcG9uZW50LFxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIFRXQU1kMk5vdGlmaWNhdGlvbnNDb21wb25lbnQsXG4gICAgXSxcbiAgICBzY2hlbWFzOiBbXG4gICAgICAgIENVU1RPTV9FTEVNRU5UU19TQ0hFTUFcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIFRXQU1kMk5vdGlmaWNhdGlvbnNNb2R1bGUgeyB9XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTtJQW1CSTtRQUZRLFVBQUssR0FBYSxFQUFFLENBQUM7S0FFWjs7Ozs7SUFFVix3Q0FBRzs7OztJQUFWLFVBQVcsS0FBYTtRQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzFCOzs7OztJQUVNLDJDQUFNOzs7O0lBQWIsVUFBYyxHQUFXO1FBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztLQUM3Qjs7OztJQUVNLHdDQUFHOzs7SUFBVjtRQUNJLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUN6Qjs7Ozs7SUFFTSw0Q0FBTzs7OztJQUFkLFVBQWUsS0FBYTtRQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3RCOztnQkF4QkosVUFBVSxTQUFDO29CQUNW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