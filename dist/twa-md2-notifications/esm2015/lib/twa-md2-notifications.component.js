/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        this.notifsService.get().subscribe((/**
         * @param {?} data
         * @return {?}
         */
        data => {
            this.notifs = data;
        }));
        this.globalClick = fromEvent(document, 'click').pipe(delay(1), tap((/**
         * @return {?}
         */
        () => {
            this.listening = true;
        })));
        this.globalClick.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            this.onGlobalClick(event);
        }));
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
            setTimeout((/**
             * @return {?}
             */
            () => {
                this.clearPanels();
            }), 200);
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
            <mat-icon [matBadge]="notifs.length" matBadgeSize="medium" *ngIf="notifs.length">notifications</mat-icon>
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
                <div class="notifsContainer" [ngClass]="{'scrolling': notifs.length > 4}">
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
                </div>
                <div class="notifPanelHideButton twa-notif" (click)="isOpened = false" fxLayout="row" fxLayoutAlign="center center">
                    <mat-icon>expand_less</mat-icon>
                </div>
            </div>
        </ng-template>
    `,
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
            }] }
];
/** @nocollapse */
TWAMd2NotificationsComponent.ctorParameters = () => [
    { type: ElementRef }
];
TWAMd2NotificationsComponent.propDecorators = {
    notifsService: [{ type: Input }],
    panelClicked: [{ type: Output }],
    notifPanel: [{ type: ViewChild, args: ['notifPanelContainer', { static: false },] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdhLW1kMi1ub3RpZmljYXRpb25zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3R3YS1tZDItbm90aWZpY2F0aW9ucy8iLCJzb3VyY2VzIjpbImxpYi90d2EtbWQyLW5vdGlmaWNhdGlvbnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEcsT0FBTyxFQUFFLDBCQUEwQixFQUFVLE1BQU0saUNBQWlDLENBQUM7QUFDckYsT0FBTyxFQUFjLFNBQVMsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM3QyxPQUFPLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQWlFNUMsTUFBTSxPQUFPLDRCQUE0Qjs7OztJQVlyQyxZQUNZLE1BQWtCO1FBQWxCLFdBQU0sR0FBTixNQUFNLENBQVk7UUFYcEIsaUJBQVksR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQU8vRCxhQUFRLEdBQUcsS0FBSyxDQUFDO0lBS2IsQ0FBQzs7OztJQUVMLFFBQVE7UUFDSixJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxDQUFDLFNBQVM7Ozs7UUFBQyxJQUFJLENBQUMsRUFBRTtZQUN0QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUN2QixDQUFDLEVBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQ2hELEtBQUssQ0FBQyxDQUFDLENBQUMsRUFDUixHQUFHOzs7UUFBQyxHQUFHLEVBQUU7WUFDTCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUMxQixDQUFDLEVBQUMsQ0FDTCxDQUFDO1FBQ0YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTOzs7O1FBQUMsQ0FBQyxLQUFpQixFQUFFLEVBQUU7WUFDN0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QixDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7O0lBRUQsYUFBYSxDQUFDLEtBQWlCO1FBQzNCLElBQUksS0FBSyxZQUFZLFVBQVU7WUFDM0IsSUFBSSxDQUFDLFNBQVMsS0FBSyxJQUFJO1lBQ3ZCLE9BQU8sSUFBSSxDQUFDLFVBQVUsS0FBSyxXQUFXO1lBQ3RDLElBQUksQ0FBQyxVQUFVLEtBQUssU0FBUyxFQUFFO1lBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUMzQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDMUIsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJO2dCQUN2RSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJO2dCQUNuRSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsS0FBSyxLQUFLLENBQUMsTUFBTTtnQkFDMUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLEVBQUU7Z0JBQzNDLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO2FBQ3pCO1NBQ0o7SUFDTCxDQUFDOzs7Ozs7SUFFRCxRQUFRLENBQUMsSUFBSSxFQUFFLFNBQVM7UUFDcEIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUNwQyxPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQzs7Ozs7O0lBRUQsWUFBWSxDQUFDLE1BQU0sRUFBRSxLQUFLOztZQUNsQixJQUFJLEdBQUcsS0FBSztRQUNoQixPQUFPLElBQUksS0FBSyxJQUFJLEVBQUU7WUFDbEIsSUFBSSxJQUFJLEtBQUssTUFBTSxFQUFFO2dCQUNqQixPQUFPLElBQUksQ0FBQzthQUNmO2lCQUFNO2dCQUNILElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO2FBQzFCO1NBQ0o7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDOzs7O0lBRUQsWUFBWTtRQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQ3ZDLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ25DLENBQUM7Ozs7OztJQUVELGlCQUFpQixDQUFDLEtBQWEsRUFBRSxRQUFnQjtRQUM3QyxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzNDLElBQUksT0FBTyxLQUFLLENBQUMsSUFBSSxLQUFLLFdBQVc7WUFDckMsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxXQUFXLEVBQUU7WUFDdEMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDNUI7YUFBTTtZQUNILElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2pDO1FBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7Ozs7SUFFRCxhQUFhO1FBQ1QsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDMUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7U0FDekI7SUFDTCxDQUFDOzs7OztJQUVELFdBQVcsQ0FBQyxRQUFnQjtRQUN4QixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDekIsQ0FBQzs7OztJQUVELFdBQVc7UUFDUCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN6QixVQUFVOzs7WUFBQyxHQUFHLEVBQUU7Z0JBQ1osSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3ZCLENBQUMsR0FBRSxHQUFHLENBQUMsQ0FBQztTQUNYO2FBQU07WUFDSCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7SUFDTCxDQUFDOzs7O0lBRUQsc0JBQXNCO1FBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUNyQyxDQUFDOzs7WUE3S0osU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSx1QkFBdUI7Z0JBQ2pDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQTJDVDt5QkFFRyxnRkFBZ0Y7d0JBQ3pELHVFQUF1RTtvQkFDOUYsbUdBQW1HO29CQUNuRywrR0FBK0c7b0JBQy9HLHNFQUFzRTtvQkFDdEUsK0ZBQStGO29CQUMvRixvRkFBb0Y7b0JBQ3BGLGtFQUFrRTtvQkFDbEUseUNBQXlDO29CQUN6Qyw0QkFBNEI7b0JBQzVCLHVGQUF1RjtvQkFDdkYsa0VBQWtFO29CQUNsRSwwQ0FBMEM7YUFFakQ7Ozs7WUFuRW1FLFVBQVU7Ozs0QkFxRXpFLEtBQUs7MkJBQ0wsTUFBTTt5QkFFTixTQUFTLFNBQUMscUJBQXFCLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFOzs7O0lBSG5ELHFEQUFtRDs7SUFDbkQsb0RBQStEOztJQUUvRCxrREFBZ0U7Ozs7O0lBRWhFLG1EQUF1Qzs7Ozs7SUFDdkMsaURBQTJCOztJQUUzQixnREFBaUI7O0lBQ2pCLDhDQUFpQjs7Ozs7SUFHYiw4Q0FBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgVmlld0NoaWxkLCBFdmVudEVtaXR0ZXIsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFR3YU1kMk5vdGlmaWNhdGlvbnNTZXJ2aWNlLCBJTm90aWYgfSBmcm9tICcuL3R3YS1tZDItbm90aWZpY2F0aW9ucy5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIGZyb21FdmVudCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVsYXksIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbi8vIGltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ3Byb3RyYWN0b3InO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3R3YS1tZDItbm90aWZpY2F0aW9ucycsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gI292ZXJsYXlPcmlnaW49XCJjZGtPdmVybGF5T3JpZ2luXCIgY2RrT3ZlcmxheU9yaWdpbiAoY2xpY2spPVwibm90aWZDbGlja2VkKClcIj5cbiAgICAgICAgICAgIDxtYXQtaWNvbiBbbWF0QmFkZ2VdPVwibm90aWZzLmxlbmd0aFwiIG1hdEJhZGdlU2l6ZT1cIm1lZGl1bVwiICpuZ0lmPVwibm90aWZzLmxlbmd0aFwiPm5vdGlmaWNhdGlvbnM8L21hdC1pY29uPlxuICAgICAgICAgICAgPG1hdC1pY29uICpuZ0lmPVwibm90aWZzLmxlbmd0aD09PTBcIj5ub3RpZmljYXRpb25zX25vbmU8L21hdC1pY29uPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPG5nLXRlbXBsYXRlXG4gICAgICAgICAgICBjZGtDb25uZWN0ZWRPdmVybGF5XG4gICAgICAgICAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheU9yaWdpbl09XCJvdmVybGF5T3JpZ2luXCJcbiAgICAgICAgICAgIFtjZGtDb25uZWN0ZWRPdmVybGF5T3Blbl09XCJpc09wZW5lZFwiXG4gICAgICAgICAgICAoZGV0YWNoKT1cImNvbm5lY3RlZE92ZXJsYXlEZXRhY2goKVwiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxkaXYgI25vdGlmUGFuZWxDb250YWluZXIgY2xhc3M9XCJub3RpZlBhbmVsQ29udGFpbmVyIHR3YS1ub3RpZlwiIGZ4TGF5b3V0R2FwPVwiMTJweFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBjbGFzcz1cInBhbmVsVGl0bGUgdHdhLW5vdGlmXCI+XG4gICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cInR3YS1ub3RpZlwiIGZ4RmxleD5Ob3RpZmljYXRpb25zPC9oMz5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInR3YS1ub3RpZlwiIG1hdC1pY29uLWJ1dHRvbiAoY2xpY2spPVwiY2xlYXJQYW5lbHMoKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwidHdhLW5vdGlmXCI+Y2xlYXJfYWxsPC9tYXQtaWNvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5vdGlmc0NvbnRhaW5lclwiIFtuZ0NsYXNzXT1cInsnc2Nyb2xsaW5nJzogbm90aWZzLmxlbmd0aCA+IDR9XCI+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtY2FyZCAqbmdGb3I9XCJsZXQgbm90aWYgb2Ygbm90aWZzOyBsZXQgaSA9IGluZGV4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmeExheW91dD1cInJvd1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJub3RpZiB0d2Etbm90aWZcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJub3RpZlBhbmVsQ2xpY2tlZChub3RpZiwgaSlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaWNvbiB0d2Etbm90aWZcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJwYW5lbEljb24gdHdhLW5vdGlmXCIgKm5nSWY9XCIhbm90aWYuaW1hZ2VcIj5ub3RpZmljYXRpb25zPC9tYXQtaWNvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPVwibm90aWZJbWFnZSB0d2Etbm90aWZcIiAqbmdJZj1cIm5vdGlmLmltYWdlXCIgW3NyY109XCJub3RpZi5pbWFnZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjY29udGVudCB0d2Etbm90aWZcIiBmeExheW91dD1cImNvbHVtblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBjbGFzcz1cInR3YS1ub3RpZlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3M9XCJ0d2Etbm90aWZcIiBmeEZsZXg+e3tub3RpZi50aXRsZX19PC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImNsb3NlIHR3YS1ub3RpZlwiIG1hdC1pY29uLWJ1dHRvbiAoY2xpY2spPVwicmVtb3ZlUGFuZWwoaSlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cInR3YS1ub3RpZlwiPmNsb3NlPC9tYXQtaWNvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJ0d2Etbm90aWZcIiBmeEZsZXg+e3tub3RpZi5tZXNzYWdlfX08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9tYXQtY2FyZD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibm90aWZQYW5lbEhpZGVCdXR0b24gdHdhLW5vdGlmXCIgKGNsaWNrKT1cImlzT3BlbmVkID0gZmFsc2VcIiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJjZW50ZXIgY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbj5leHBhbmRfbGVzczwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICBgLFxuICAgIHN0eWxlczogW1xuICAgICAgICAnLm5vdGlmUGFuZWxDb250YWluZXIgeyB3aWR0aDogMzIwcHg7IGJhY2tncm91bmQ6ICNlZWU7IGJvcmRlcjogMXB4IHNvbGlkICNjY2M7JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3BhZGRpbmc6IDEycHggMTJweCA0cHggMTJweDsgYm94LXNoYWRvdzogMCAycHggMTBweCByZ2JhKDAsMCwwLC4yKTsgfScsXG4gICAgICAgICcubm90aWZQYW5lbEhpZGVCdXR0b24geyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxOHB4OyBib3JkZXItdG9wOiAxcHggc29saWQgI2NjYzsgY3Vyc29yOiBwb2ludGVyOyB9JyxcbiAgICAgICAgJ2Rpdi5wYW5lbFRpdGxlIGgzIHsgY29sb3I6ICNhYWE7IGZvbnQtd2VpZ2h0OiA5MDA7IGZvbnQtZmFtaWx5OiBSb2JvdG8gTGlnaHQ7IGZvbnQtc2l6ZTogMjZweDsgbWFyZ2luOiA4cHg7IH0nLFxuICAgICAgICAnZGl2Lm5vdGlmc0NvbnRhaW5lci5zY3JvbGxpbmcgeyBtYXgtaGVpZ2h0OiA0MDhweDsgb3ZlcmZsb3c6IGF1dG87IH0nLFxuICAgICAgICAnbWF0LWNhcmQubm90aWYgeyBjdXJzb3I6IHBvaW50ZXI7IHBhZGRpbmc6IDEycHggMTJweCAxMnB4IDhweDsgbWFyZ2luOiAwIDAgOHB4IDAhaW1wb3J0YW50OyB9JyxcbiAgICAgICAgJ21hdC1jYXJkLm5vdGlmIGg0IHsgZm9udC1mYW1pbHk6IFJvYm90byBMaWdodDsgZm9udC1zaXplOiAxNnB4OyBtYXJnaW46IDhweCAwIDA7IH0nLFxuICAgICAgICAnbWF0LWNhcmQubm90aWYgcCB7IGZvbnQtZmFtaWx5OiBSb2JvdG8gTGlnaHQ7IG1hcmdpbjogOHB4IDAgMDsgfScsXG4gICAgICAgICcuY2ljb24geyBwYWRkaW5nOiAxMnB4IDEycHggMTJweCA0cHg7IH0nLFxuICAgICAgICAnLmNjb250ZW50IHsgd2lkdGg6IDEwMCU7IH0nLFxuICAgICAgICAnbWF0LWljb24ucGFuZWxJY29uIHsgZm9udC1zaXplOiA0MHB4OyBoZWlnaHQ6IDQwcHg7IHdpZHRoOiA0MHB4OyBsaW5lLWhlaWdodDogNDBweDsgfScsXG4gICAgICAgICdpbWcubm90aWZJbWFnZSB7IHdpZHRoOiA0MHg7IGhlaWdodDogNDBweDsgYm9yZGVyLXJhZGl1czogNTAlOyB9JyxcbiAgICAgICAgJ2J1dHRvbi5jbG9zZSB7IG1hcmdpbjogLTEycHggLTEycHggMCAwO30nLFxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgVFdBTWQyTm90aWZpY2F0aW9uc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQElucHV0KCkgbm90aWZzU2VydmljZTogVHdhTWQyTm90aWZpY2F0aW9uc1NlcnZpY2U7XG4gICAgQE91dHB1dCgpIHBhbmVsQ2xpY2tlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAVmlld0NoaWxkKCdub3RpZlBhbmVsQ29udGFpbmVyJywgeyBzdGF0aWM6IGZhbHNlIH0pIG5vdGlmUGFuZWw7XG5cbiAgICBwcml2YXRlIGdsb2JhbENsaWNrOiBPYnNlcnZhYmxlPEV2ZW50PjtcbiAgICBwcml2YXRlIGxpc3RlbmluZzogYm9vbGVhbjtcblxuICAgIGlzT3BlbmVkID0gZmFsc2U7XG4gICAgbm90aWZzOiBJTm90aWZbXTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9lbFJlZjogRWxlbWVudFJlZixcbiAgICApIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMubm90aWZzU2VydmljZS5nZXQoKS5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgICB0aGlzLm5vdGlmcyA9IGRhdGE7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmdsb2JhbENsaWNrID0gZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKS5waXBlKFxuICAgICAgICAgICAgZGVsYXkoMSksXG4gICAgICAgICAgICB0YXAoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdGVuaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuZ2xvYmFsQ2xpY2suc3Vic2NyaWJlKChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbkdsb2JhbENsaWNrKGV2ZW50KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25HbG9iYWxDbGljayhldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBNb3VzZUV2ZW50ICYmXG4gICAgICAgICAgICB0aGlzLmxpc3RlbmluZyA9PT0gdHJ1ZSAmJlxuICAgICAgICAgICAgdHlwZW9mIHRoaXMubm90aWZQYW5lbCAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgICAgIHRoaXMubm90aWZQYW5lbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm5vdGlmUGFuZWwubmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLl9lbFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGV2ZW50LnRhcmdldCk7XG4gICAgICAgICAgICBpZiAodGhpcy5pc0Rlc2NlbmRhbnQodGhpcy5ub3RpZlBhbmVsLm5hdGl2ZUVsZW1lbnQsIGV2ZW50LnRhcmdldCkgIT09IHRydWUgJiZcbiAgICAgICAgICAgICAgICB0aGlzLmlzRGVzY2VuZGFudCh0aGlzLl9lbFJlZi5uYXRpdmVFbGVtZW50LCBldmVudC50YXJnZXQpICE9PSB0cnVlICYmXG4gICAgICAgICAgICAgICAgdGhpcy5fZWxSZWYubmF0aXZlRWxlbWVudCAhPT0gZXZlbnQudGFyZ2V0ICYmXG4gICAgICAgICAgICAgICAgIXRoaXMuaGFzQ2xhc3MoZXZlbnQudGFyZ2V0LCAndHdhLW5vdGlmJykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzT3BlbmVkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYXNDbGFzcyhlbGVtLCBjbGFzc05hbWUpIHtcbiAgICAgICAgaWYgKGVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpc0Rlc2NlbmRhbnQocGFyZW50LCBjaGlsZCkge1xuICAgICAgICBsZXQgbm9kZSA9IGNoaWxkO1xuICAgICAgICB3aGlsZSAobm9kZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKG5vZGUgPT09IHBhcmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBub3RpZkNsaWNrZWQoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdub3RpZiBpY29uIGNsaWNrZWQhJyk7XG4gICAgICAgIGlmICghdGhpcy5pc09wZW5lZCAmJiAhdGhpcy5ub3RpZnMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pc09wZW5lZCA9ICF0aGlzLmlzT3BlbmVkO1xuICAgIH1cblxuICAgIG5vdGlmUGFuZWxDbGlja2VkKG5vdGlmOiBJTm90aWYsIG5vdGlmSWR4OiBudW1iZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ25vdGlmIHBhbmVsIGNsaWNrZWQhJywgbm90aWYpO1xuICAgICAgICBpZiAodHlwZW9mIG5vdGlmLmRhdGEgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgIHR5cGVvZiBub3RpZi5kYXRhLmFjdGlvbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIG5vdGlmLmRhdGEuYWN0aW9uKG5vdGlmKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucGFuZWxDbGlja2VkLmVtaXQobm90aWYpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubm90aWZzU2VydmljZS5yZW1vdmUobm90aWZJZHgpO1xuICAgICAgICB0aGlzLmNoZWNrSWZPcGVuZWQoKTtcbiAgICB9XG5cbiAgICBjaGVja0lmT3BlbmVkKCkge1xuICAgICAgICBpZiAodGhpcy5ub3RpZnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmlzT3BlbmVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW1vdmVQYW5lbChub3RpZklkeDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMubm90aWZzU2VydmljZS5yZW1vdmUobm90aWZJZHgpO1xuICAgICAgICB0aGlzLmNoZWNrSWZPcGVuZWQoKTtcbiAgICB9XG5cbiAgICBjbGVhclBhbmVscygpIHtcbiAgICAgICAgaWYgKHRoaXMubm90aWZzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5ub3RpZnMuc3BsaWNlKDAsIDEpO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhclBhbmVscygpO1xuICAgICAgICAgICAgfSwgMjAwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tJZk9wZW5lZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29ubmVjdGVkT3ZlcmxheURldGFjaCgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ292ZXJsYXkgZGV0YWNoZWQhJyk7XG4gICAgfVxuXG59XG4iXX0=