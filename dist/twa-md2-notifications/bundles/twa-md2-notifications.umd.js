(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@angular/common'), require('@angular/flex-layout'), require('@angular/material/card'), require('@angular/material/button'), require('@angular/material/icon'), require('@angular/cdk/overlay')) :
    typeof define === 'function' && define.amd ? define('twa-md2-notifications', ['exports', '@angular/core', 'rxjs', '@angular/common', '@angular/flex-layout', '@angular/material/card', '@angular/material/button', '@angular/material/icon', '@angular/cdk/overlay'], factory) :
    (factory((global['twa-md2-notifications'] = {}),global.ng.core,global.rxjs,global.ng.common,global.ng['flex-layout'],global.ng.material.card,global.ng.material.button,global.ng.material.icon,global.ng.cdk.overlay));
}(this, (function (exports,i0,rxjs,common,flexLayout,card,button,icon,overlay) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var TwaMd2NotificationsService = (function () {
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
     * @suppress {checkTypes} checked by tsc
     */
    var TwaMd2NotificationsComponent = (function () {
        function TwaMd2NotificationsComponent() {
            this.panelClicked = new i0.EventEmitter();
            this.isOpened = false;
        }
        /**
         * @return {?}
         */
        TwaMd2NotificationsComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this.notifsService.get().subscribe(function (data) {
                    _this.notifs = data;
                });
            };
        /**
         * @return {?}
         */
        TwaMd2NotificationsComponent.prototype.notifClicked = /**
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
        TwaMd2NotificationsComponent.prototype.notifPanelClicked = /**
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
        TwaMd2NotificationsComponent.prototype.checkIfOpened = /**
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
        TwaMd2NotificationsComponent.prototype.removePanel = /**
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
        TwaMd2NotificationsComponent.prototype.clearPanels = /**
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
        TwaMd2NotificationsComponent.prototype.connectedOverlayDetach = /**
         * @return {?}
         */
            function () {
                console.log('overlay detached!');
            };
        TwaMd2NotificationsComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'twa-md2-notifications',
                        template: "\n        <button mat-icon-button #overlayOrigin=\"cdkOverlayOrigin\" cdkOverlayOrigin (click)=\"notifClicked()\">\n            <mat-icon *ngIf=\"notifs.length\">notifications</mat-icon>\n            <mat-icon *ngIf=\"notifs.length===0\">notifications_none</mat-icon>\n        </button>\n        <ng-template\n            cdkConnectedOverlay\n            [cdkConnectedOverlayOrigin]=\"overlayOrigin\"\n            [cdkConnectedOverlayOpen]=\"isOpened\"\n            (detach)=\"connectedOverlayDetach()\"\n        >\n            <div class=\"notifPanelContainer\" fxLayoutGap=\"12px\">\n                <div fxLayout=\"row\" class=\"panelTitle\">\n                    <h3 fxFlex>Notifications</h3>\n                    <button mat-icon-button (click)=\"clearPanels()\">\n                        <mat-icon>clear_all</mat-icon>\n                    </button>\n                </div>\n                <mat-card *ngFor=\"let notif of notifs; let i = index\" fxLayout=\"row\" class=\"notif\" (click)=\"notifPanelClicked(notif, i)\">\n                    <div class=\"cicon\">\n                        <mat-icon class=\"panelIcon\" *ngIf=\"!notif.image\">notifications</mat-icon>\n                        <img class=\"notifImage\" *ngIf=\"notif.image\" [src]=\"notif.image\" />\n                    </div>\n                    <div class=\"ccontent\" fxLayout=\"column\">\n                        <div fxLayout=\"row\">\n                            <h4 fxFlex>{{notif.title}}</h4>\n                            <button class=\"close\" mat-icon-button (click)=\"removePanel(i)\">\n                                <mat-icon>close</mat-icon>\n                            </button>\n                        </div>\n                        <p fxFlex>{{notif.message}}</p>\n                    </div>\n                </mat-card>\n                <div class=\"notifPanelHideButton\" (click)=\"isOpened = false\" fxLayout=\"row\" fxLayoutAlign=\"center center\">\n                    <mat-icon>expand_less</mat-icon>\n                </div>\n            </div>\n        </ng-template>\n    ",
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
        TwaMd2NotificationsComponent.ctorParameters = function () { return []; };
        TwaMd2NotificationsComponent.propDecorators = {
            notifsService: [{ type: i0.Input }],
            panelClicked: [{ type: i0.Output }]
        };
        return TwaMd2NotificationsComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var TwaMd2NotificationsModule = (function () {
        function TwaMd2NotificationsModule() {
        }
        TwaMd2NotificationsModule.decorators = [
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
                            TwaMd2NotificationsComponent,
                        ],
                        exports: [
                            overlay.OverlayModule,
                            TwaMd2NotificationsComponent,
                        ],
                        entryComponents: [
                            TwaMd2NotificationsComponent,
                        ],
                        providers: [
                            TwaMd2NotificationsComponent,
                        ],
                        schemas: [
                            i0.CUSTOM_ELEMENTS_SCHEMA
                        ]
                    },] },
        ];
        return TwaMd2NotificationsModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    exports.TwaMd2NotificationsService = TwaMd2NotificationsService;
    exports.TwaMd2NotificationsComponent = TwaMd2NotificationsComponent;
    exports.TwaMd2NotificationsModule = TwaMd2NotificationsModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdhLW1kMi1ub3RpZmljYXRpb25zLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vdHdhLW1kMi1ub3RpZmljYXRpb25zL2xpYi90d2EtbWQyLW5vdGlmaWNhdGlvbnMuc2VydmljZS50cyIsIm5nOi8vdHdhLW1kMi1ub3RpZmljYXRpb25zL2xpYi90d2EtbWQyLW5vdGlmaWNhdGlvbnMuY29tcG9uZW50LnRzIiwibmc6Ly90d2EtbWQyLW5vdGlmaWNhdGlvbnMvbGliL3R3YS1tZDItbm90aWZpY2F0aW9ucy5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcblxuZXhwb3J0IGludGVyZmFjZSBJTm90aWYge1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIGRhdGU6IHN0cmluZztcbiAgICBkYXRhPzogYW55O1xuICAgIGljb24/OiBzdHJpbmc7XG4gICAgaW1hZ2U/OiBzdHJpbmc7XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFR3YU1kMk5vdGlmaWNhdGlvbnNTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgcXVldWU6IElOb3RpZltdID0gW107XG5cbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gICAgcHVibGljIGFkZChub3RpZjogSU5vdGlmKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKG5vdGlmKTtcbiAgICAgICAgdGhpcy5xdWV1ZS5wdXNoKG5vdGlmKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVtb3ZlKGlkeDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMucXVldWUuc3BsaWNlKGlkeCwgMSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCgpOiBPYnNlcnZhYmxlPElOb3RpZltdPiB7XG4gICAgICAgIHJldHVybiBvZih0aGlzLnF1ZXVlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xpY2tlZChub3RpZjogSU5vdGlmKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKG5vdGlmKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFR3YU1kMk5vdGlmaWNhdGlvbnNTZXJ2aWNlLCBJTm90aWYgfSBmcm9tICcuL3R3YS1tZDItbm90aWZpY2F0aW9ucy5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbi8vIGltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ3Byb3RyYWN0b3InO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3R3YS1tZDItbm90aWZpY2F0aW9ucycsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gI292ZXJsYXlPcmlnaW49XCJjZGtPdmVybGF5T3JpZ2luXCIgY2RrT3ZlcmxheU9yaWdpbiAoY2xpY2spPVwibm90aWZDbGlja2VkKClcIj5cbiAgICAgICAgICAgIDxtYXQtaWNvbiAqbmdJZj1cIm5vdGlmcy5sZW5ndGhcIj5ub3RpZmljYXRpb25zPC9tYXQtaWNvbj5cbiAgICAgICAgICAgIDxtYXQtaWNvbiAqbmdJZj1cIm5vdGlmcy5sZW5ndGg9PT0wXCI+bm90aWZpY2F0aW9uc19ub25lPC9tYXQtaWNvbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgICAgICAgY2RrQ29ubmVjdGVkT3ZlcmxheVxuICAgICAgICAgICAgW2Nka0Nvbm5lY3RlZE92ZXJsYXlPcmlnaW5dPVwib3ZlcmxheU9yaWdpblwiXG4gICAgICAgICAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheU9wZW5dPVwiaXNPcGVuZWRcIlxuICAgICAgICAgICAgKGRldGFjaCk9XCJjb25uZWN0ZWRPdmVybGF5RGV0YWNoKClcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibm90aWZQYW5lbENvbnRhaW5lclwiIGZ4TGF5b3V0R2FwPVwiMTJweFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBjbGFzcz1cInBhbmVsVGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGgzIGZ4RmxleD5Ob3RpZmljYXRpb25zPC9oMz5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gKGNsaWNrKT1cImNsZWFyUGFuZWxzKClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbj5jbGVhcl9hbGw8L21hdC1pY29uPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8bWF0LWNhcmQgKm5nRm9yPVwibGV0IG5vdGlmIG9mIG5vdGlmczsgbGV0IGkgPSBpbmRleFwiIGZ4TGF5b3V0PVwicm93XCIgY2xhc3M9XCJub3RpZlwiIChjbGljayk9XCJub3RpZlBhbmVsQ2xpY2tlZChub3RpZiwgaSlcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNpY29uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJwYW5lbEljb25cIiAqbmdJZj1cIiFub3RpZi5pbWFnZVwiPm5vdGlmaWNhdGlvbnM8L21hdC1pY29uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cIm5vdGlmSW1hZ2VcIiAqbmdJZj1cIm5vdGlmLmltYWdlXCIgW3NyY109XCJub3RpZi5pbWFnZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2NvbnRlbnRcIiBmeExheW91dD1cImNvbHVtblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBmeEZsZXg+e3tub3RpZi50aXRsZX19PC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiY2xvc2VcIiBtYXQtaWNvbi1idXR0b24gKGNsaWNrKT1cInJlbW92ZVBhbmVsKGkpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbj5jbG9zZTwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGZ4RmxleD57e25vdGlmLm1lc3NhZ2V9fTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9tYXQtY2FyZD5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibm90aWZQYW5lbEhpZGVCdXR0b25cIiAoY2xpY2spPVwiaXNPcGVuZWQgPSBmYWxzZVwiIGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cImNlbnRlciBjZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1pY29uPmV4cGFuZF9sZXNzPC9tYXQtaWNvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgIGAsXG4gICAgc3R5bGVzOiBbXG4gICAgICAgICcubm90aWZQYW5lbENvbnRhaW5lciB7IHdpZHRoOiAzMjBweDsgYmFja2dyb3VuZDogI2VlZTsgYm9yZGVyOiAxcHggc29saWQgI2NjYzsnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncGFkZGluZzogMTJweCAxMnB4IDRweCAxMnB4OyBib3gtc2hhZG93OiAwIDJweCAxMHB4IHJnYmEoMCwwLDAsLjIpOyB9JyxcbiAgICAgICAgJy5ub3RpZlBhbmVsSGlkZUJ1dHRvbiB7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDE4cHg7IGJvcmRlci10b3A6IDFweCBzb2xpZCAjY2NjOyBjdXJzb3I6IHBvaW50ZXI7IH0nLFxuICAgICAgICAnZGl2LnBhbmVsVGl0bGUgaDMgeyBjb2xvcjogI2FhYTsgZm9udC13ZWlnaHQ6IDkwMDsgZm9udC1mYW1pbHk6IFJvYm90byBMaWdodDsgZm9udC1zaXplOiAyNnB4OyBtYXJnaW46IDhweDsgfScsXG4gICAgICAgICdtYXQtY2FyZC5ub3RpZiB7IGN1cnNvcjogcG9pbnRlcjsgcGFkZGluZzogMTJweCAxMnB4IDEycHggOHB4OyBtYXJnaW46IDAgMCA4cHggMCFpbXBvcnRhbnQ7IH0nLFxuICAgICAgICAnbWF0LWNhcmQubm90aWYgaDQgeyBmb250LWZhbWlseTogUm9ib3RvIExpZ2h0OyBmb250LXNpemU6IDE2cHg7IG1hcmdpbjogOHB4IDAgMDsgfScsXG4gICAgICAgICdtYXQtY2FyZC5ub3RpZiBwIHsgZm9udC1mYW1pbHk6IFJvYm90byBMaWdodDsgbWFyZ2luOiA4cHggMCAwOyB9JyxcbiAgICAgICAgJy5jaWNvbiB7IHBhZGRpbmc6IDEycHggMTJweCAxMnB4IDRweDsgfScsXG4gICAgICAgICcuY2NvbnRlbnQgeyB3aWR0aDogMTAwJTsgfScsXG4gICAgICAgICdtYXQtaWNvbi5wYW5lbEljb24geyBmb250LXNpemU6IDQwcHg7IGhlaWdodDogNDBweDsgd2lkdGg6IDQwcHg7IGxpbmUtaGVpZ2h0OiA0MHB4OyB9JyxcbiAgICAgICAgJ2ltZy5ub3RpZkltYWdlIHsgd2lkdGg6IDQweDsgaGVpZ2h0OiA0MHB4OyBib3JkZXItcmFkaXVzOiA1MCU7IH0nLFxuICAgICAgICAnYnV0dG9uLmNsb3NlIHsgbWFyZ2luOiAtMTJweCAtMTJweCAwIDA7fScsXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBUd2FNZDJOb3RpZmljYXRpb25zQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASW5wdXQoKSBub3RpZnNTZXJ2aWNlOiBUd2FNZDJOb3RpZmljYXRpb25zU2VydmljZTtcbiAgICBAT3V0cHV0KCkgcGFuZWxDbGlja2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIGlzT3BlbmVkID0gZmFsc2U7XG4gICAgbm90aWZzOiBJTm90aWZbXTtcblxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5ub3RpZnNTZXJ2aWNlLmdldCgpLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgICAgIHRoaXMubm90aWZzID0gZGF0YTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbm90aWZDbGlja2VkKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnbm90aWYgaWNvbiBjbGlja2VkIScpO1xuICAgICAgICBpZiAoIXRoaXMuaXNPcGVuZWQgJiYgIXRoaXMubm90aWZzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNPcGVuZWQgPSAhdGhpcy5pc09wZW5lZDtcbiAgICB9XG5cbiAgICBub3RpZlBhbmVsQ2xpY2tlZChub3RpZjogSU5vdGlmLCBub3RpZklkeDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdub3RpZiBwYW5lbCBjbGlja2VkIScsIG5vdGlmKTtcbiAgICAgICAgaWYgKHR5cGVvZiBub3RpZi5kYXRhICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICB0eXBlb2Ygbm90aWYuZGF0YS5hY3Rpb24gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBub3RpZi5kYXRhLmFjdGlvbihub3RpZik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnBhbmVsQ2xpY2tlZC5lbWl0KG5vdGlmKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5vdGlmc1NlcnZpY2UucmVtb3ZlKG5vdGlmSWR4KTtcbiAgICAgICAgdGhpcy5jaGVja0lmT3BlbmVkKCk7XG4gICAgfVxuXG4gICAgY2hlY2tJZk9wZW5lZCgpIHtcbiAgICAgICAgaWYgKHRoaXMubm90aWZzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5pc09wZW5lZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVtb3ZlUGFuZWwobm90aWZJZHg6IG51bWJlcikge1xuICAgICAgICB0aGlzLm5vdGlmc1NlcnZpY2UucmVtb3ZlKG5vdGlmSWR4KTtcbiAgICAgICAgdGhpcy5jaGVja0lmT3BlbmVkKCk7XG4gICAgfVxuXG4gICAgY2xlYXJQYW5lbHMoKSB7XG4gICAgICAgIGlmICh0aGlzLm5vdGlmcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMubm90aWZzLnNwbGljZSgwLCAxKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJQYW5lbHMoKTtcbiAgICAgICAgICAgIH0sIDIwMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrSWZPcGVuZWQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbm5lY3RlZE92ZXJsYXlEZXRhY2goKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdvdmVybGF5IGRldGFjaGVkIScpO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuaW1wb3J0IHsgTWF0Q2FyZE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NhcmQnO1xuLy8gaW1wb3J0IHsgVHdhTWQyTm90aWZpY2F0aW9uc1NlcnZpY2UgfSBmcm9tICcuL3R3YS1tZDItbm90aWZpY2F0aW9ucy5zZXJ2aWNlJztcblxuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYnV0dG9uJztcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pY29uJztcbmltcG9ydCB7IE92ZXJsYXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5cbmltcG9ydCB7IFR3YU1kMk5vdGlmaWNhdGlvbnNDb21wb25lbnQgfSBmcm9tICcuL3R3YS1tZDItbm90aWZpY2F0aW9ucy5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBGbGV4TGF5b3V0TW9kdWxlLFxuICAgICAgICBNYXRDYXJkTW9kdWxlLFxuICAgICAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgICAgIE1hdEljb25Nb2R1bGUsXG4gICAgICAgIE92ZXJsYXlNb2R1bGUsXG4gICAgICAgIC8vIFR3YU1kMk5vdGlmaWNhdGlvbnNDb21wb25lbnQsXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgVHdhTWQyTm90aWZpY2F0aW9uc0NvbXBvbmVudCxcbiAgICAgICAgLy8gVHdhTWQyTm90aWZpY2F0aW9uc1NlcnZpY2UsXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIE92ZXJsYXlNb2R1bGUsXG4gICAgICAgIFR3YU1kMk5vdGlmaWNhdGlvbnNDb21wb25lbnQsXG4gICAgICAgIC8vIFR3YU1kMk5vdGlmaWNhdGlvbnNTZXJ2aWNlLFxuICAgIF0sXG4gICAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgICAgIFR3YU1kMk5vdGlmaWNhdGlvbnNDb21wb25lbnQsXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgVHdhTWQyTm90aWZpY2F0aW9uc0NvbXBvbmVudCxcbiAgICBdLFxuICAgIHNjaGVtYXM6IFtcbiAgICAgICAgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgVHdhTWQyTm90aWZpY2F0aW9uc01vZHVsZSB7IH1cbiJdLCJuYW1lcyI6WyJvZiIsIkluamVjdGFibGUiLCJFdmVudEVtaXR0ZXIiLCJDb21wb25lbnQiLCJJbnB1dCIsIk91dHB1dCIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIiwiRmxleExheW91dE1vZHVsZSIsIk1hdENhcmRNb2R1bGUiLCJNYXRCdXR0b25Nb2R1bGUiLCJNYXRJY29uTW9kdWxlIiwiT3ZlcmxheU1vZHVsZSIsIkNVU1RPTV9FTEVNRU5UU19TQ0hFTUEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtRQW1CSTt5QkFGMEIsRUFBRTtTQUVYOzs7OztRQUVWLHdDQUFHOzs7O3NCQUFDLEtBQWE7Z0JBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Ozs7UUFHcEIsMkNBQU07Ozs7c0JBQUMsR0FBVztnQkFDckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7OztRQUd2Qix3Q0FBRzs7OztnQkFDTixPQUFPQSxPQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Ozs7UUFHbkIsNENBQU87Ozs7c0JBQUMsS0FBYTtnQkFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7O29CQXZCMUJDLGFBQVUsU0FBQzt3QkFDVixVQUFVLEVBQUUsTUFBTTtxQkFDbkI7Ozs7O3lDQWREOzs7Ozs7O0FDQUE7UUFvRUk7Z0NBTDRDLElBQUlDLGVBQVksRUFBRTs0QkFFbkQsS0FBSztTQUdDOzs7O1FBRWpCLCtDQUFROzs7WUFBUjtn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