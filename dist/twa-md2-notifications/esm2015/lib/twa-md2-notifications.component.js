/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { TwaMd2NotificationsService } from './twa-md2-notifications.service';
import { fromEvent } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
// import { EventEmitter } from 'protractor';
export class TWAMd2NotificationsComponent {
    /**
     * @param {?} _elRef
     */
    constructor(_elRef) {
        this._elRef = _elRef;
        this.panelClicked = new EventEmitter();
        this.isOpened = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.notifsService.get().subscribe(data => {
            this.notifs = data;
        });
        this.globalClick = fromEvent(document, 'click').pipe(delay(1), tap(() => {
            this.listening = true;
        }));
        this.globalClick.subscribe((event) => {
            this.onGlobalClick(event);
        });
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onGlobalClick(event) {
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
    }
    /**
     * @param {?} elem
     * @param {?} className
     * @return {?}
     */
    hasClass(elem, className) {
        if (elem.classList.contains(className)) {
            return true;
        }
        return false;
    }
    /**
     * @param {?} parent
     * @param {?} child
     * @return {?}
     */
    isDescendant(parent, child) {
        /** @type {?} */
        let node = child;
        while (node !== null) {
            if (node === parent) {
                return true;
            }
            else {
                node = node.parentNode;
            }
        }
        return false;
    }
    /**
     * @return {?}
     */
    notifClicked() {
        console.log('notif icon clicked!');
        if (!this.isOpened && !this.notifs.length) {
            return;
        }
        this.isOpened = !this.isOpened;
    }
    /**
     * @param {?} notif
     * @param {?} notifIdx
     * @return {?}
     */
    notifPanelClicked(notif, notifIdx) {
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
    }
    /**
     * @return {?}
     */
    checkIfOpened() {
        if (this.notifs.length === 0) {
            this.isOpened = false;
        }
    }
    /**
     * @param {?} notifIdx
     * @return {?}
     */
    removePanel(notifIdx) {
        this.notifsService.remove(notifIdx);
        this.checkIfOpened();
    }
    /**
     * @return {?}
     */
    clearPanels() {
        if (this.notifs.length) {
            this.notifs.splice(0, 1);
            setTimeout(() => {
                this.clearPanels();
            }, 200);
        }
        else {
            this.checkIfOpened();
        }
    }
    /**
     * @return {?}
     */
    connectedOverlayDetach() {
        console.log('overlay detached!');
    }
}
TWAMd2NotificationsComponent.decorators = [
    { type: Component, args: [{
                selector: 'twa-md2-notifications',
                template: `
        <button mat-icon-button #overlayOrigin="cdkOverlayOrigin" cdkOverlayOrigin (click)="notifClicked()">
            <mat-icon *ngIf="notifs.length">notifications</mat-icon>
            <mat-icon *ngIf="notifs.length===0">notifications_none</mat-icon>
        </button>
        <ng-template
            cdkConnectedOverlay
            [cdkConnectedOverlayOrigin]="overlayOrigin"
            [cdkConnectedOverlayOpen]="isOpened"
            (detach)="connectedOverlayDetach()"
        >
            <div #notifPanelContainer class="notifPanelContainer twa-notif" fxLayoutGap="12px">
                <div fxLayout="row" class="panelTitle twa-notif">
                    <h3 class="twa-notif" fxFlex>Notifications</h3>
                    <button class="twa-notif" mat-icon-button (click)="clearPanels()">
                        <mat-icon class="twa-notif">clear_all</mat-icon>
                    </button>
                </div>
                <mat-card *ngFor="let notif of notifs; let i = index" 
                          fxLayout="row"
                          class="notif twa-notif"
                          (click)="notifPanelClicked(notif, i)">
                    <div class="cicon twa-notif">
                        <mat-icon class="panelIcon twa-notif" *ngIf="!notif.image">notifications</mat-icon>
                        <img class="notifImage twa-notif" *ngIf="notif.image" [src]="notif.image" />
                    </div>
                    <div class="ccontent twa-notif" fxLayout="column">
                        <div fxLayout="row" class="twa-notif">
                            <h4 class="twa-notif" fxFlex>{{notif.title}}</h4>
                            <button class="close twa-notif" mat-icon-button (click)="removePanel(i)">
                                <mat-icon class="twa-notif">close</mat-icon>
                            </button>
                        </div>
                        <p class="twa-notif" fxFlex>{{notif.message}}</p>
                    </div>
                </mat-card>
                <div class="notifPanelHideButton twa-notif" (click)="isOpened = false" fxLayout="row" fxLayoutAlign="center center">
                    <mat-icon>expand_less</mat-icon>
                </div>
            </div>
        </ng-template>
    `,
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
TWAMd2NotificationsComponent.ctorParameters = () => [
    { type: ElementRef }
];
TWAMd2NotificationsComponent.propDecorators = {
    notifsService: [{ type: Input }],
    panelClicked: [{ type: Output }],
    notifPanel: [{ type: ViewChild, args: ['notifPanelContainer',] }]
};
if (false) {
    /** @type {?} */
    TWAMd2NotificationsComponent.prototype.notifsService;
    /** @type {?} */
    TWAMd2NotificationsComponent.prototype.panelClicked;
    /** @type {?} */
    TWAMd2NotificationsComponent.prototype.notifPanel;
    /**
     * @type {?}
     * @private
     */
    TWAMd2NotificationsComponent.prototype.globalClick;
    /**
     * @type {?}
     * @private
     */
    TWAMd2NotificationsComponent.prototype.listening;
    /** @type {?} */
    TWAMd2NotificationsComponent.prototype.isOpened;
    /** @type {?} */
    TWAMd2NotificationsComponent.prototype.notifs;
    /**
     * @type {?}
     * @private
     */
    TWAMd2NotificationsComponent.prototype._elRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdhLW1kMi1ub3RpZmljYXRpb25zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3R3YS1tZDItbm90aWZpY2F0aW9ucy8iLCJzb3VyY2VzIjpbImxpYi90d2EtbWQyLW5vdGlmaWNhdGlvbnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEcsT0FBTyxFQUFFLDBCQUEwQixFQUFVLE1BQU0saUNBQWlDLENBQUM7QUFDckYsT0FBTyxFQUFjLFNBQVMsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM3QyxPQUFPLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQThENUMsTUFBTSxPQUFPLDRCQUE0Qjs7OztJQVlyQyxZQUNZLE1BQWtCO1FBQWxCLFdBQU0sR0FBTixNQUFNLENBQVk7UUFYcEIsaUJBQVksR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQU8vRCxhQUFRLEdBQUcsS0FBSyxDQUFDO0lBS2IsQ0FBQzs7OztJQUVMLFFBQVE7UUFDSixJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN0QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQ2hELEtBQUssQ0FBQyxDQUFDLENBQUMsRUFDUixHQUFHLENBQUMsR0FBRyxFQUFFO1lBQ0wsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQ0wsQ0FBQztRQUNGLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFD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K0Q7O0lBRS9ELGtEQUE2Qzs7Ozs7SUFFN0MsbURBQXVDOzs7OztJQUN2QyxpREFBMkI7O0lBRTNCLGdEQUFpQjs7SUFDakIsOENBQWlCOzs7OztJQUdiLDhDQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBWaWV3Q2hpbGQsIEV2ZW50RW1pdHRlciwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHdhTWQyTm90aWZpY2F0aW9uc1NlcnZpY2UsIElOb3RpZiB9IGZyb20gJy4vdHdhLW1kMi1ub3RpZmljYXRpb25zLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgZnJvbUV2ZW50IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWxheSwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuLy8gaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAncHJvdHJhY3Rvcic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndHdhLW1kMi1ub3RpZmljYXRpb25zJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiAjb3ZlcmxheU9yaWdpbj1cImNka092ZXJsYXlPcmlnaW5cIiBjZGtPdmVybGF5T3JpZ2luIChjbGljayk9XCJub3RpZkNsaWNrZWQoKVwiPlxuICAgICAgICAgICAgPG1hdC1pY29uICpuZ0lmPVwibm90aWZzLmxlbmd0aFwiPm5vdGlmaWNhdGlvbnM8L21hdC1pY29uPlxuICAgICAgICAgICAgPG1hdC1pY29uICpuZ0lmPVwibm90aWZzLmxlbmd0aD09PTBcIj5ub3RpZmljYXRpb25zX25vbmU8L21hdC1pY29uPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPG5nLXRlbXBsYXRlXG4gICAgICAgICAgICBjZGtDb25uZWN0ZWRPdmVybGF5XG4gICAgICAgICAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheU9yaWdpbl09XCJvdmVybGF5T3JpZ2luXCJcbiAgICAgICAgICAgIFtjZGtDb25uZWN0ZWRPdmVybGF5T3Blbl09XCJpc09wZW5lZFwiXG4gICAgICAgICAgICAoZGV0YWNoKT1cImNvbm5lY3RlZE92ZXJsYXlEZXRhY2goKVwiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxkaXYgI25vdGlmUGFuZWxDb250YWluZXIgY2xhc3M9XCJub3RpZlBhbmVsQ29udGFpbmVyIHR3YS1ub3RpZlwiIGZ4TGF5b3V0R2FwPVwiMTJweFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBjbGFzcz1cInBhbmVsVGl0bGUgdHdhLW5vdGlmXCI+XG4gICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cInR3YS1ub3RpZlwiIGZ4RmxleD5Ob3RpZmljYXRpb25zPC9oMz5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInR3YS1ub3RpZlwiIG1hdC1pY29uLWJ1dHRvbiAoY2xpY2spPVwiY2xlYXJQYW5lbHMoKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwidHdhLW5vdGlmXCI+Y2xlYXJfYWxsPC9tYXQtaWNvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPG1hdC1jYXJkICpuZ0Zvcj1cImxldCBub3RpZiBvZiBub3RpZnM7IGxldCBpID0gaW5kZXhcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZnhMYXlvdXQ9XCJyb3dcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cIm5vdGlmIHR3YS1ub3RpZlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJub3RpZlBhbmVsQ2xpY2tlZChub3RpZiwgaSlcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNpY29uIHR3YS1ub3RpZlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwicGFuZWxJY29uIHR3YS1ub3RpZlwiICpuZ0lmPVwiIW5vdGlmLmltYWdlXCI+bm90aWZpY2F0aW9uczwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPVwibm90aWZJbWFnZSB0d2Etbm90aWZcIiAqbmdJZj1cIm5vdGlmLmltYWdlXCIgW3NyY109XCJub3RpZi5pbWFnZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2NvbnRlbnQgdHdhLW5vdGlmXCIgZnhMYXlvdXQ9XCJjb2x1bW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBjbGFzcz1cInR3YS1ub3RpZlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzcz1cInR3YS1ub3RpZlwiIGZ4RmxleD57e25vdGlmLnRpdGxlfX08L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJjbG9zZSB0d2Etbm90aWZcIiBtYXQtaWNvbi1idXR0b24gKGNsaWNrKT1cInJlbW92ZVBhbmVsKGkpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cInR3YS1ub3RpZlwiPmNsb3NlPC9tYXQtaWNvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJ0d2Etbm90aWZcIiBmeEZsZXg+e3tub3RpZi5tZXNzYWdlfX08L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvbWF0LWNhcmQ+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5vdGlmUGFuZWxIaWRlQnV0dG9uIHR3YS1ub3RpZlwiIChjbGljayk9XCJpc09wZW5lZCA9IGZhbHNlXCIgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwiY2VudGVyIGNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWljb24+ZXhwYW5kX2xlc3M8L21hdC1pY29uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgYCxcbiAgICBzdHlsZXM6IFtcbiAgICAgICAgJy5ub3RpZlBhbmVsQ29udGFpbmVyIHsgd2lkdGg6IDMyMHB4OyBiYWNrZ3JvdW5kOiAjZWVlOyBib3JkZXI6IDFweCBzb2xpZCAjY2NjOycgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdwYWRkaW5nOiAxMnB4IDEycHggNHB4IDEycHg7IGJveC1zaGFkb3c6IDAgMnB4IDEwcHggcmdiYSgwLDAsMCwuMik7IH0nLFxuICAgICAgICAnLm5vdGlmUGFuZWxIaWRlQnV0dG9uIHsgd2lkdGg6IDEwMCU7IGhlaWdodDogMThweDsgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNjY2M7IGN1cnNvcjogcG9pbnRlcjsgfScsXG4gICAgICAgICdkaXYucGFuZWxUaXRsZSBoMyB7IGNvbG9yOiAjYWFhOyBmb250LXdlaWdodDogOTAwOyBmb250LWZhbWlseTogUm9ib3RvIExpZ2h0OyBmb250LXNpemU6IDI2cHg7IG1hcmdpbjogOHB4OyB9JyxcbiAgICAgICAgJ21hdC1jYXJkLm5vdGlmIHsgY3Vyc29yOiBwb2ludGVyOyBwYWRkaW5nOiAxMnB4IDEycHggMTJweCA4cHg7IG1hcmdpbjogMCAwIDhweCAwIWltcG9ydGFudDsgfScsXG4gICAgICAgICdtYXQtY2FyZC5ub3RpZiBoNCB7IGZvbnQtZmFtaWx5OiBSb2JvdG8gTGlnaHQ7IGZvbnQtc2l6ZTogMTZweDsgbWFyZ2luOiA4cHggMCAwOyB9JyxcbiAgICAgICAgJ21hdC1jYXJkLm5vdGlmIHAgeyBmb250LWZhbWlseTogUm9ib3RvIExpZ2h0OyBtYXJnaW46IDhweCAwIDA7IH0nLFxuICAgICAgICAnLmNpY29uIHsgcGFkZGluZzogMTJweCAxMnB4IDEycHggNHB4OyB9JyxcbiAgICAgICAgJy5jY29udGVudCB7IHdpZHRoOiAxMDAlOyB9JyxcbiAgICAgICAgJ21hdC1pY29uLnBhbmVsSWNvbiB7IGZvbnQtc2l6ZTogNDBweDsgaGVpZ2h0OiA0MHB4OyB3aWR0aDogNDBweDsgbGluZS1oZWlnaHQ6IDQwcHg7IH0nLFxuICAgICAgICAnaW1nLm5vdGlmSW1hZ2UgeyB3aWR0aDogNDB4OyBoZWlnaHQ6IDQwcHg7IGJvcmRlci1yYWRpdXM6IDUwJTsgfScsXG4gICAgICAgICdidXR0b24uY2xvc2UgeyBtYXJnaW46IC0xMnB4IC0xMnB4IDAgMDt9JyxcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIFRXQU1kMk5vdGlmaWNhdGlvbnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBJbnB1dCgpIG5vdGlmc1NlcnZpY2U6IFR3YU1kMk5vdGlmaWNhdGlvbnNTZXJ2aWNlO1xuICAgIEBPdXRwdXQoKSBwYW5lbENsaWNrZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQFZpZXdDaGlsZCgnbm90aWZQYW5lbENvbnRhaW5lcicpIG5vdGlmUGFuZWw7XG5cbiAgICBwcml2YXRlIGdsb2JhbENsaWNrOiBPYnNlcnZhYmxlPEV2ZW50PjtcbiAgICBwcml2YXRlIGxpc3RlbmluZzogYm9vbGVhbjtcblxuICAgIGlzT3BlbmVkID0gZmFsc2U7XG4gICAgbm90aWZzOiBJTm90aWZbXTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9lbFJlZjogRWxlbWVudFJlZixcbiAgICApIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMubm90aWZzU2VydmljZS5nZXQoKS5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgICB0aGlzLm5vdGlmcyA9IGRhdGE7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmdsb2JhbENsaWNrID0gZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKS5waXBlKFxuICAgICAgICAgICAgZGVsYXkoMSksXG4gICAgICAgICAgICB0YXAoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdGVuaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuZ2xvYmFsQ2xpY2suc3Vic2NyaWJlKChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbkdsb2JhbENsaWNrKGV2ZW50KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25HbG9iYWxDbGljayhldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBNb3VzZUV2ZW50ICYmXG4gICAgICAgICAgICB0aGlzLmxpc3RlbmluZyA9PT0gdHJ1ZSAmJlxuICAgICAgICAgICAgdHlwZW9mIHRoaXMubm90aWZQYW5lbCAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgICAgIHRoaXMubm90aWZQYW5lbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm5vdGlmUGFuZWwubmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLl9lbFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGV2ZW50LnRhcmdldCk7XG4gICAgICAgICAgICBpZiAodGhpcy5pc0Rlc2NlbmRhbnQodGhpcy5ub3RpZlBhbmVsLm5hdGl2ZUVsZW1lbnQsIGV2ZW50LnRhcmdldCkgIT09IHRydWUgJiZcbiAgICAgICAgICAgICAgICB0aGlzLmlzRGVzY2VuZGFudCh0aGlzLl9lbFJlZi5uYXRpdmVFbGVtZW50LCBldmVudC50YXJnZXQpICE9PSB0cnVlICYmXG4gICAgICAgICAgICAgICAgdGhpcy5fZWxSZWYubmF0aXZlRWxlbWVudCAhPT0gZXZlbnQudGFyZ2V0ICYmXG4gICAgICAgICAgICAgICAgIXRoaXMuaGFzQ2xhc3MoZXZlbnQudGFyZ2V0LCAndHdhLW5vdGlmJykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzT3BlbmVkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYXNDbGFzcyhlbGVtLCBjbGFzc05hbWUpIHtcbiAgICAgICAgaWYgKGVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpc0Rlc2NlbmRhbnQocGFyZW50LCBjaGlsZCkge1xuICAgICAgICBsZXQgbm9kZSA9IGNoaWxkO1xuICAgICAgICB3aGlsZSAobm9kZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKG5vZGUgPT09IHBhcmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBub3RpZkNsaWNrZWQoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdub3RpZiBpY29uIGNsaWNrZWQhJyk7XG4gICAgICAgIGlmICghdGhpcy5pc09wZW5lZCAmJiAhdGhpcy5ub3RpZnMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pc09wZW5lZCA9ICF0aGlzLmlzT3BlbmVkO1xuICAgIH1cblxuICAgIG5vdGlmUGFuZWxDbGlja2VkKG5vdGlmOiBJTm90aWYsIG5vdGlmSWR4OiBudW1iZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ25vdGlmIHBhbmVsIGNsaWNrZWQhJywgbm90aWYpO1xuICAgICAgICBpZiAodHlwZW9mIG5vdGlmLmRhdGEgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgIHR5cGVvZiBub3RpZi5kYXRhLmFjdGlvbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIG5vdGlmLmRhdGEuYWN0aW9uKG5vdGlmKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucGFuZWxDbGlja2VkLmVtaXQobm90aWYpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubm90aWZzU2VydmljZS5yZW1vdmUobm90aWZJZHgpO1xuICAgICAgICB0aGlzLmNoZWNrSWZPcGVuZWQoKTtcbiAgICB9XG5cbiAgICBjaGVja0lmT3BlbmVkKCkge1xuICAgICAgICBpZiAodGhpcy5ub3RpZnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmlzT3BlbmVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW1vdmVQYW5lbChub3RpZklkeDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMubm90aWZzU2VydmljZS5yZW1vdmUobm90aWZJZHgpO1xuICAgICAgICB0aGlzLmNoZWNrSWZPcGVuZWQoKTtcbiAgICB9XG5cbiAgICBjbGVhclBhbmVscygpIHtcbiAgICAgICAgaWYgKHRoaXMubm90aWZzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5ub3RpZnMuc3BsaWNlKDAsIDEpO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhclBhbmVscygpO1xuICAgICAgICAgICAgfSwgMjAwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tJZk9wZW5lZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29ubmVjdGVkT3ZlcmxheURldGFjaCgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ292ZXJsYXkgZGV0YWNoZWQhJyk7XG4gICAgfVxuXG59XG4iXX0=