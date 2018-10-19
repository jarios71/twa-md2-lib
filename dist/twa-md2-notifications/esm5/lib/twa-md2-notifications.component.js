/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TwaMd2NotificationsService } from './twa-md2-notifications.service';
var TwaMd2NotificationsComponent = /** @class */ (function () {
    function TwaMd2NotificationsComponent() {
        this.panelClicked = new EventEmitter();
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
        { type: Component, args: [{
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
        notifsService: [{ type: Input }],
        panelClicked: [{ type: Output }]
    };
    return TwaMd2NotificationsComponent;
}());
export { TwaMd2NotificationsComponent };
function TwaMd2NotificationsComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    TwaMd2NotificationsComponent.prototype.notifsService;
    /** @type {?} */
    TwaMd2NotificationsComponent.prototype.panelClicked;
    /** @type {?} */
    TwaMd2NotificationsComponent.prototype.isOpened;
    /** @type {?} */
    TwaMd2NotificationsComponent.prototype.notifs;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdhLW1kMi1ub3RpZmljYXRpb25zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3R3YS1tZDItbm90aWZpY2F0aW9ucy8iLCJzb3VyY2VzIjpbImxpYi90d2EtbWQyLW5vdGlmaWNhdGlvbnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sRUFBRSwwQkFBMEIsRUFBVSxNQUFNLGlDQUFpQyxDQUFDOztJQW1FakY7NEJBTDRDLElBQUksWUFBWSxFQUFFO3dCQUVuRCxLQUFLO0tBR0M7Ozs7SUFFakIsK0NBQVE7OztJQUFSO1FBQUEsaUJBSUM7UUFIRyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFBLElBQUk7WUFDbkMsS0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FDdEIsQ0FBQyxDQUFDO0tBQ047Ozs7SUFFRCxtREFBWTs7O0lBQVo7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDbkMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLE1BQU0sQ0FBQztTQUNWO1FBQ0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7S0FDbEM7Ozs7OztJQUVELHdEQUFpQjs7Ozs7SUFBakIsVUFBa0IsS0FBYSxFQUFFLFFBQWdCO1FBQzdDLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDM0MsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLENBQUMsSUFBSSxLQUFLLFdBQVc7WUFDckMsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzVCO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNqQztRQUNELElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztLQUN4Qjs7OztJQUVELG9EQUFhOzs7SUFBYjtRQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7U0FDekI7S0FDSjs7Ozs7SUFFRCxrREFBVzs7OztJQUFYLFVBQVksUUFBZ0I7UUFDeEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0tBQ3hCOzs7O0lBRUQsa0RBQVc7OztJQUFYO1FBQUEsaUJBU0M7UUFSRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLFVBQVUsQ0FBQztnQkFDUCxLQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDdEIsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUNYO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7S0FDSjs7OztJQUVELDZEQUFzQjs7O0lBQXRCO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0tBQ3BDOztnQkFuSEosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSx1QkFBdUI7b0JBQ2pDLFFBQVEsRUFBRSw2aEVBc0NUO29CQUNELE1BQU0sRUFBRTt3QkFDSixnRkFBZ0Y7NEJBQ3pELHVFQUF1RTt3QkFDOUYsbUdBQW1HO3dCQUNuRywrR0FBK0c7d0JBQy9HLCtGQUErRjt3QkFDL0Ysb0ZBQW9GO3dCQUNwRixrRUFBa0U7d0JBQ2xFLHlDQUF5Qzt3QkFDekMsNEJBQTRCO3dCQUM1Qix1RkFBdUY7d0JBQ3ZGLGtFQUFrRTt3QkFDbEUsMENBQTBDO3FCQUM3QztpQkFDSjs7Ozs7Z0NBRUksS0FBSzsrQkFDTCxNQUFNOzt1Q0EvRFg7O1NBNkRhLDRCQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFR3YU1kMk5vdGlmaWNhdGlvbnNTZXJ2aWNlLCBJTm90aWYgfSBmcm9tICcuL3R3YS1tZDItbm90aWZpY2F0aW9ucy5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbi8vIGltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ3Byb3RyYWN0b3InO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3R3YS1tZDItbm90aWZpY2F0aW9ucycsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gI292ZXJsYXlPcmlnaW49XCJjZGtPdmVybGF5T3JpZ2luXCIgY2RrT3ZlcmxheU9yaWdpbiAoY2xpY2spPVwibm90aWZDbGlja2VkKClcIj5cbiAgICAgICAgICAgIDxtYXQtaWNvbiAqbmdJZj1cIm5vdGlmcy5sZW5ndGhcIj5ub3RpZmljYXRpb25zPC9tYXQtaWNvbj5cbiAgICAgICAgICAgIDxtYXQtaWNvbiAqbmdJZj1cIm5vdGlmcy5sZW5ndGg9PT0wXCI+bm90aWZpY2F0aW9uc19ub25lPC9tYXQtaWNvbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgICAgICAgY2RrQ29ubmVjdGVkT3ZlcmxheVxuICAgICAgICAgICAgW2Nka0Nvbm5lY3RlZE92ZXJsYXlPcmlnaW5dPVwib3ZlcmxheU9yaWdpblwiXG4gICAgICAgICAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheU9wZW5dPVwiaXNPcGVuZWRcIlxuICAgICAgICAgICAgKGRldGFjaCk9XCJjb25uZWN0ZWRPdmVybGF5RGV0YWNoKClcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibm90aWZQYW5lbENvbnRhaW5lclwiIGZ4TGF5b3V0R2FwPVwiMTJweFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBjbGFzcz1cInBhbmVsVGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGgzIGZ4RmxleD5Ob3RpZmljYXRpb25zPC9oMz5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gKGNsaWNrKT1cImNsZWFyUGFuZWxzKClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbj5jbGVhcl9hbGw8L21hdC1pY29uPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8bWF0LWNhcmQgKm5nRm9yPVwibGV0IG5vdGlmIG9mIG5vdGlmczsgbGV0IGkgPSBpbmRleFwiIGZ4TGF5b3V0PVwicm93XCIgY2xhc3M9XCJub3RpZlwiIChjbGljayk9XCJub3RpZlBhbmVsQ2xpY2tlZChub3RpZiwgaSlcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNpY29uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJwYW5lbEljb25cIiAqbmdJZj1cIiFub3RpZi5pbWFnZVwiPm5vdGlmaWNhdGlvbnM8L21hdC1pY29uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cIm5vdGlmSW1hZ2VcIiAqbmdJZj1cIm5vdGlmLmltYWdlXCIgW3NyY109XCJub3RpZi5pbWFnZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2NvbnRlbnRcIiBmeExheW91dD1cImNvbHVtblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBmeEZsZXg+e3tub3RpZi50aXRsZX19PC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiY2xvc2VcIiBtYXQtaWNvbi1idXR0b24gKGNsaWNrKT1cInJlbW92ZVBhbmVsKGkpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbj5jbG9zZTwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGZ4RmxleD57e25vdGlmLm1lc3NhZ2V9fTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9tYXQtY2FyZD5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibm90aWZQYW5lbEhpZGVCdXR0b25cIiAoY2xpY2spPVwiaXNPcGVuZWQgPSBmYWxzZVwiIGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cImNlbnRlciBjZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1pY29uPmV4cGFuZF9sZXNzPC9tYXQtaWNvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgIGAsXG4gICAgc3R5bGVzOiBbXG4gICAgICAgICcubm90aWZQYW5lbENvbnRhaW5lciB7IHdpZHRoOiAzMjBweDsgYmFja2dyb3VuZDogI2VlZTsgYm9yZGVyOiAxcHggc29saWQgI2NjYzsnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncGFkZGluZzogMTJweCAxMnB4IDRweCAxMnB4OyBib3gtc2hhZG93OiAwIDJweCAxMHB4IHJnYmEoMCwwLDAsLjIpOyB9JyxcbiAgICAgICAgJy5ub3RpZlBhbmVsSGlkZUJ1dHRvbiB7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDE4cHg7IGJvcmRlci10b3A6IDFweCBzb2xpZCAjY2NjOyBjdXJzb3I6IHBvaW50ZXI7IH0nLFxuICAgICAgICAnZGl2LnBhbmVsVGl0bGUgaDMgeyBjb2xvcjogI2FhYTsgZm9udC13ZWlnaHQ6IDkwMDsgZm9udC1mYW1pbHk6IFJvYm90byBMaWdodDsgZm9udC1zaXplOiAyNnB4OyBtYXJnaW46IDhweDsgfScsXG4gICAgICAgICdtYXQtY2FyZC5ub3RpZiB7IGN1cnNvcjogcG9pbnRlcjsgcGFkZGluZzogMTJweCAxMnB4IDEycHggOHB4OyBtYXJnaW46IDAgMCA4cHggMCFpbXBvcnRhbnQ7IH0nLFxuICAgICAgICAnbWF0LWNhcmQubm90aWYgaDQgeyBmb250LWZhbWlseTogUm9ib3RvIExpZ2h0OyBmb250LXNpemU6IDE2cHg7IG1hcmdpbjogOHB4IDAgMDsgfScsXG4gICAgICAgICdtYXQtY2FyZC5ub3RpZiBwIHsgZm9udC1mYW1pbHk6IFJvYm90byBMaWdodDsgbWFyZ2luOiA4cHggMCAwOyB9JyxcbiAgICAgICAgJy5jaWNvbiB7IHBhZGRpbmc6IDEycHggMTJweCAxMnB4IDRweDsgfScsXG4gICAgICAgICcuY2NvbnRlbnQgeyB3aWR0aDogMTAwJTsgfScsXG4gICAgICAgICdtYXQtaWNvbi5wYW5lbEljb24geyBmb250LXNpemU6IDQwcHg7IGhlaWdodDogNDBweDsgd2lkdGg6IDQwcHg7IGxpbmUtaGVpZ2h0OiA0MHB4OyB9JyxcbiAgICAgICAgJ2ltZy5ub3RpZkltYWdlIHsgd2lkdGg6IDQweDsgaGVpZ2h0OiA0MHB4OyBib3JkZXItcmFkaXVzOiA1MCU7IH0nLFxuICAgICAgICAnYnV0dG9uLmNsb3NlIHsgbWFyZ2luOiAtMTJweCAtMTJweCAwIDA7fScsXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBUd2FNZDJOb3RpZmljYXRpb25zQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASW5wdXQoKSBub3RpZnNTZXJ2aWNlOiBUd2FNZDJOb3RpZmljYXRpb25zU2VydmljZTtcbiAgICBAT3V0cHV0KCkgcGFuZWxDbGlja2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIGlzT3BlbmVkID0gZmFsc2U7XG4gICAgbm90aWZzOiBJTm90aWZbXTtcblxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5ub3RpZnNTZXJ2aWNlLmdldCgpLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgICAgIHRoaXMubm90aWZzID0gZGF0YTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbm90aWZDbGlja2VkKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnbm90aWYgaWNvbiBjbGlja2VkIScpO1xuICAgICAgICBpZiAoIXRoaXMuaXNPcGVuZWQgJiYgIXRoaXMubm90aWZzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNPcGVuZWQgPSAhdGhpcy5pc09wZW5lZDtcbiAgICB9XG5cbiAgICBub3RpZlBhbmVsQ2xpY2tlZChub3RpZjogSU5vdGlmLCBub3RpZklkeDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdub3RpZiBwYW5lbCBjbGlja2VkIScsIG5vdGlmKTtcbiAgICAgICAgaWYgKHR5cGVvZiBub3RpZi5kYXRhICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICB0eXBlb2Ygbm90aWYuZGF0YS5hY3Rpb24gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBub3RpZi5kYXRhLmFjdGlvbihub3RpZik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnBhbmVsQ2xpY2tlZC5lbWl0KG5vdGlmKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5vdGlmc1NlcnZpY2UucmVtb3ZlKG5vdGlmSWR4KTtcbiAgICAgICAgdGhpcy5jaGVja0lmT3BlbmVkKCk7XG4gICAgfVxuXG4gICAgY2hlY2tJZk9wZW5lZCgpIHtcbiAgICAgICAgaWYgKHRoaXMubm90aWZzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5pc09wZW5lZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVtb3ZlUGFuZWwobm90aWZJZHg6IG51bWJlcikge1xuICAgICAgICB0aGlzLm5vdGlmc1NlcnZpY2UucmVtb3ZlKG5vdGlmSWR4KTtcbiAgICAgICAgdGhpcy5jaGVja0lmT3BlbmVkKCk7XG4gICAgfVxuXG4gICAgY2xlYXJQYW5lbHMoKSB7XG4gICAgICAgIGlmICh0aGlzLm5vdGlmcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMubm90aWZzLnNwbGljZSgwLCAxKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJQYW5lbHMoKTtcbiAgICAgICAgICAgIH0sIDIwMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrSWZPcGVuZWQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbm5lY3RlZE92ZXJsYXlEZXRhY2goKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdvdmVybGF5IGRldGFjaGVkIScpO1xuICAgIH1cblxufVxuIl19