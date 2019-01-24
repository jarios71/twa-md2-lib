import { Injectable, NgModule, CUSTOM_ELEMENTS_SCHEMA, Component, Input, Output, ViewChild, EventEmitter, ElementRef, defineInjectable } from '@angular/core';
import { of, fromEvent } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatBadgeModule } from '@angular/material/badge';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TwaMd2NotificationsService {
    constructor() {
        this.queue = [];
    }
    /**
     * @param {?} notif
     * @return {?}
     */
    add(notif) {
        console.log(notif);
        this.queue.push(notif);
    }
    /**
     * @param {?} idx
     * @return {?}
     */
    remove(idx) {
        this.queue.splice(idx, 1);
    }
    /**
     * @return {?}
     */
    get() {
        return of(this.queue);
    }
    /**
     * @param {?} notif
     * @return {?}
     */
    clicked(notif) {
        console.log(notif);
    }
}
TwaMd2NotificationsService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */
TwaMd2NotificationsService.ctorParameters = () => [];
/** @nocollapse */ TwaMd2NotificationsService.ngInjectableDef = defineInjectable({ factory: function TwaMd2NotificationsService_Factory() { return new TwaMd2NotificationsService(); }, token: TwaMd2NotificationsService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// import { EventEmitter } from 'protractor';
class TWAMd2NotificationsComponent {
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
TWAMd2NotificationsComponent.ctorParameters = () => [
    { type: ElementRef }
];
TWAMd2NotificationsComponent.propDecorators = {
    notifsService: [{ type: Input }],
    panelClicked: [{ type: Output }],
    notifPanel: [{ type: ViewChild, args: ['notifPanelContainer',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TWAMd2NotificationsModule {
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
                    MatBadgeModule,
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { TwaMd2NotificationsService, TWAMd2NotificationsComponent, TWAMd2NotificationsModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdhLW1kMi1ub3RpZmljYXRpb25zLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly90d2EtbWQyLW5vdGlmaWNhdGlvbnMvbGliL3R3YS1tZDItbm90aWZpY2F0aW9ucy5zZXJ2aWNlLnRzIiwibmc6Ly90d2EtbWQyLW5vdGlmaWNhdGlvbnMvbGliL3R3YS1tZDItbm90aWZpY2F0aW9ucy5jb21wb25lbnQudHMiLCJuZzovL3R3YS1tZDItbm90aWZpY2F0aW9ucy9saWIvdHdhLW1kMi1ub3RpZmljYXRpb25zLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElOb3RpZiB7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgZGF0ZTogc3RyaW5nO1xuICAgIGRhdGE/OiBhbnk7XG4gICAgaWNvbj86IHN0cmluZztcbiAgICBpbWFnZT86IHN0cmluZztcbn1cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgVHdhTWQyTm90aWZpY2F0aW9uc1NlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSBxdWV1ZTogSU5vdGlmW10gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgICBwdWJsaWMgYWRkKG5vdGlmOiBJTm90aWYpIHtcbiAgICAgICAgY29uc29sZS5sb2cobm90aWYpO1xuICAgICAgICB0aGlzLnF1ZXVlLnB1c2gobm90aWYpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZW1vdmUoaWR4OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5xdWV1ZS5zcGxpY2UoaWR4LCAxKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0KCk6IE9ic2VydmFibGU8SU5vdGlmW10+IHtcbiAgICAgICAgcmV0dXJuIG9mKHRoaXMucXVldWUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjbGlja2VkKG5vdGlmOiBJTm90aWYpIHtcbiAgICAgICAgY29uc29sZS5sb2cobm90aWYpO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIFZpZXdDaGlsZCwgRXZlbnRFbWl0dGVyLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUd2FNZDJOb3RpZmljYXRpb25zU2VydmljZSwgSU5vdGlmIH0gZnJvbSAnLi90d2EtbWQyLW5vdGlmaWNhdGlvbnMuc2VydmljZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBmcm9tRXZlbnQgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlbGF5LCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG4vLyBpbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdwcm90cmFjdG9yJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd0d2EtbWQyLW5vdGlmaWNhdGlvbnMnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uICNvdmVybGF5T3JpZ2luPVwiY2RrT3ZlcmxheU9yaWdpblwiIGNka092ZXJsYXlPcmlnaW4gKGNsaWNrKT1cIm5vdGlmQ2xpY2tlZCgpXCI+XG4gICAgICAgICAgICA8bWF0LWljb24gW21hdEJhZGdlXT1cIm5vdGlmcy5sZW5ndGhcIiBtYXRCYWRnZVNpemU9XCJtZWRpdW1cIiAqbmdJZj1cIm5vdGlmcy5sZW5ndGhcIj5ub3RpZmljYXRpb25zPC9tYXQtaWNvbj5cbiAgICAgICAgICAgIDxtYXQtaWNvbiAqbmdJZj1cIm5vdGlmcy5sZW5ndGg9PT0wXCI+bm90aWZpY2F0aW9uc19ub25lPC9tYXQtaWNvbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgICAgICAgY2RrQ29ubmVjdGVkT3ZlcmxheVxuICAgICAgICAgICAgW2Nka0Nvbm5lY3RlZE92ZXJsYXlPcmlnaW5dPVwib3ZlcmxheU9yaWdpblwiXG4gICAgICAgICAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheU9wZW5dPVwiaXNPcGVuZWRcIlxuICAgICAgICAgICAgKGRldGFjaCk9XCJjb25uZWN0ZWRPdmVybGF5RGV0YWNoKClcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2ICNub3RpZlBhbmVsQ29udGFpbmVyIGNsYXNzPVwibm90aWZQYW5lbENvbnRhaW5lciB0d2Etbm90aWZcIiBmeExheW91dEdhcD1cIjEycHhcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgY2xhc3M9XCJwYW5lbFRpdGxlIHR3YS1ub3RpZlwiPlxuICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJ0d2Etbm90aWZcIiBmeEZsZXg+Tm90aWZpY2F0aW9uczwvaDM+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJ0d2Etbm90aWZcIiBtYXQtaWNvbi1idXR0b24gKGNsaWNrKT1cImNsZWFyUGFuZWxzKClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cInR3YS1ub3RpZlwiPmNsZWFyX2FsbDwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJub3RpZnNDb250YWluZXJcIiBbbmdDbGFzc109XCJ7J3Njcm9sbGluZyc6IG5vdGlmcy5sZW5ndGggPiA0fVwiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWNhcmQgKm5nRm9yPVwibGV0IG5vdGlmIG9mIG5vdGlmczsgbGV0IGkgPSBpbmRleFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnhMYXlvdXQ9XCJyb3dcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwibm90aWYgdHdhLW5vdGlmXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwibm90aWZQYW5lbENsaWNrZWQobm90aWYsIGkpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2ljb24gdHdhLW5vdGlmXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwicGFuZWxJY29uIHR3YS1ub3RpZlwiICpuZ0lmPVwiIW5vdGlmLmltYWdlXCI+bm90aWZpY2F0aW9uczwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cIm5vdGlmSW1hZ2UgdHdhLW5vdGlmXCIgKm5nSWY9XCJub3RpZi5pbWFnZVwiIFtzcmNdPVwibm90aWYuaW1hZ2VcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2NvbnRlbnQgdHdhLW5vdGlmXCIgZnhMYXlvdXQ9XCJjb2x1bW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgY2xhc3M9XCJ0d2Etbm90aWZcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzPVwidHdhLW5vdGlmXCIgZnhGbGV4Pnt7bm90aWYudGl0bGV9fTwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJjbG9zZSB0d2Etbm90aWZcIiBtYXQtaWNvbi1idXR0b24gKGNsaWNrKT1cInJlbW92ZVBhbmVsKGkpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJ0d2Etbm90aWZcIj5jbG9zZTwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwidHdhLW5vdGlmXCIgZnhGbGV4Pnt7bm90aWYubWVzc2FnZX19PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvbWF0LWNhcmQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5vdGlmUGFuZWxIaWRlQnV0dG9uIHR3YS1ub3RpZlwiIChjbGljayk9XCJpc09wZW5lZCA9IGZhbHNlXCIgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwiY2VudGVyIGNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWljb24+ZXhwYW5kX2xlc3M8L21hdC1pY29uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgYCxcbiAgICBzdHlsZXM6IFtcbiAgICAgICAgJy5ub3RpZlBhbmVsQ29udGFpbmVyIHsgd2lkdGg6IDMyMHB4OyBiYWNrZ3JvdW5kOiAjZWVlOyBib3JkZXI6IDFweCBzb2xpZCAjY2NjOycgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdwYWRkaW5nOiAxMnB4IDEycHggNHB4IDEycHg7IGJveC1zaGFkb3c6IDAgMnB4IDEwcHggcmdiYSgwLDAsMCwuMik7IH0nLFxuICAgICAgICAnLm5vdGlmUGFuZWxIaWRlQnV0dG9uIHsgd2lkdGg6IDEwMCU7IGhlaWdodDogMThweDsgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNjY2M7IGN1cnNvcjogcG9pbnRlcjsgfScsXG4gICAgICAgICdkaXYucGFuZWxUaXRsZSBoMyB7IGNvbG9yOiAjYWFhOyBmb250LXdlaWdodDogOTAwOyBmb250LWZhbWlseTogUm9ib3RvIExpZ2h0OyBmb250LXNpemU6IDI2cHg7IG1hcmdpbjogOHB4OyB9JyxcbiAgICAgICAgJ2Rpdi5ub3RpZnNDb250YWluZXIuc2Nyb2xsaW5nIHsgbWF4LWhlaWdodDogNDA4cHg7IG92ZXJmbG93OiBhdXRvOyB9JyxcbiAgICAgICAgJ21hdC1jYXJkLm5vdGlmIHsgY3Vyc29yOiBwb2ludGVyOyBwYWRkaW5nOiAxMnB4IDEycHggMTJweCA4cHg7IG1hcmdpbjogMCAwIDhweCAwIWltcG9ydGFudDsgfScsXG4gICAgICAgICdtYXQtY2FyZC5ub3RpZiBoNCB7IGZvbnQtZmFtaWx5OiBSb2JvdG8gTGlnaHQ7IGZvbnQtc2l6ZTogMTZweDsgbWFyZ2luOiA4cHggMCAwOyB9JyxcbiAgICAgICAgJ21hdC1jYXJkLm5vdGlmIHAgeyBmb250LWZhbWlseTogUm9ib3RvIExpZ2h0OyBtYXJnaW46IDhweCAwIDA7IH0nLFxuICAgICAgICAnLmNpY29uIHsgcGFkZGluZzogMTJweCAxMnB4IDEycHggNHB4OyB9JyxcbiAgICAgICAgJy5jY29udGVudCB7IHdpZHRoOiAxMDAlOyB9JyxcbiAgICAgICAgJ21hdC1pY29uLnBhbmVsSWNvbiB7IGZvbnQtc2l6ZTogNDBweDsgaGVpZ2h0OiA0MHB4OyB3aWR0aDogNDBweDsgbGluZS1oZWlnaHQ6IDQwcHg7IH0nLFxuICAgICAgICAnaW1nLm5vdGlmSW1hZ2UgeyB3aWR0aDogNDB4OyBoZWlnaHQ6IDQwcHg7IGJvcmRlci1yYWRpdXM6IDUwJTsgfScsXG4gICAgICAgICdidXR0b24uY2xvc2UgeyBtYXJnaW46IC0xMnB4IC0xMnB4IDAgMDt9JyxcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIFRXQU1kMk5vdGlmaWNhdGlvbnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBJbnB1dCgpIG5vdGlmc1NlcnZpY2U6IFR3YU1kMk5vdGlmaWNhdGlvbnNTZXJ2aWNlO1xuICAgIEBPdXRwdXQoKSBwYW5lbENsaWNrZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQFZpZXdDaGlsZCgnbm90aWZQYW5lbENvbnRhaW5lcicpIG5vdGlmUGFuZWw7XG5cbiAgICBwcml2YXRlIGdsb2JhbENsaWNrOiBPYnNlcnZhYmxlPEV2ZW50PjtcbiAgICBwcml2YXRlIGxpc3RlbmluZzogYm9vbGVhbjtcblxuICAgIGlzT3BlbmVkID0gZmFsc2U7XG4gICAgbm90aWZzOiBJTm90aWZbXTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9lbFJlZjogRWxlbWVudFJlZixcbiAgICApIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMubm90aWZzU2VydmljZS5nZXQoKS5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgICB0aGlzLm5vdGlmcyA9IGRhdGE7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmdsb2JhbENsaWNrID0gZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKS5waXBlKFxuICAgICAgICAgICAgZGVsYXkoMSksXG4gICAgICAgICAgICB0YXAoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdGVuaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuZ2xvYmFsQ2xpY2suc3Vic2NyaWJlKChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbkdsb2JhbENsaWNrKGV2ZW50KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25HbG9iYWxDbGljayhldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBNb3VzZUV2ZW50ICYmXG4gICAgICAgICAgICB0aGlzLmxpc3RlbmluZyA9PT0gdHJ1ZSAmJlxuICAgICAgICAgICAgdHlwZW9mIHRoaXMubm90aWZQYW5lbCAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgICAgIHRoaXMubm90aWZQYW5lbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm5vdGlmUGFuZWwubmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLl9lbFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGV2ZW50LnRhcmdldCk7XG4gICAgICAgICAgICBpZiAodGhpcy5pc0Rlc2NlbmRhbnQodGhpcy5ub3RpZlBhbmVsLm5hdGl2ZUVsZW1lbnQsIGV2ZW50LnRhcmdldCkgIT09IHRydWUgJiZcbiAgICAgICAgICAgICAgICB0aGlzLmlzRGVzY2VuZGFudCh0aGlzLl9lbFJlZi5uYXRpdmVFbGVtZW50LCBldmVudC50YXJnZXQpICE9PSB0cnVlICYmXG4gICAgICAgICAgICAgICAgdGhpcy5fZWxSZWYubmF0aXZlRWxlbWVudCAhPT0gZXZlbnQudGFyZ2V0ICYmXG4gICAgICAgICAgICAgICAgIXRoaXMuaGFzQ2xhc3MoZXZlbnQudGFyZ2V0LCAndHdhLW5vdGlmJykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzT3BlbmVkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYXNDbGFzcyhlbGVtLCBjbGFzc05hbWUpIHtcbiAgICAgICAgaWYgKGVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpc0Rlc2NlbmRhbnQocGFyZW50LCBjaGlsZCkge1xuICAgICAgICBsZXQgbm9kZSA9IGNoaWxkO1xuICAgICAgICB3aGlsZSAobm9kZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKG5vZGUgPT09IHBhcmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBub3RpZkNsaWNrZWQoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdub3RpZiBpY29uIGNsaWNrZWQhJyk7XG4gICAgICAgIGlmICghdGhpcy5pc09wZW5lZCAmJiAhdGhpcy5ub3RpZnMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pc09wZW5lZCA9ICF0aGlzLmlzT3BlbmVkO1xuICAgIH1cblxuICAgIG5vdGlmUGFuZWxDbGlja2VkKG5vdGlmOiBJTm90aWYsIG5vdGlmSWR4OiBudW1iZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ25vdGlmIHBhbmVsIGNsaWNrZWQhJywgbm90aWYpO1xuICAgICAgICBpZiAodHlwZW9mIG5vdGlmLmRhdGEgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgIHR5cGVvZiBub3RpZi5kYXRhLmFjdGlvbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIG5vdGlmLmRhdGEuYWN0aW9uKG5vdGlmKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucGFuZWxDbGlja2VkLmVtaXQobm90aWYpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubm90aWZzU2VydmljZS5yZW1vdmUobm90aWZJZHgpO1xuICAgICAgICB0aGlzLmNoZWNrSWZPcGVuZWQoKTtcbiAgICB9XG5cbiAgICBjaGVja0lmT3BlbmVkKCkge1xuICAgICAgICBpZiAodGhpcy5ub3RpZnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmlzT3BlbmVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW1vdmVQYW5lbChub3RpZklkeDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMubm90aWZzU2VydmljZS5yZW1vdmUobm90aWZJZHgpO1xuICAgICAgICB0aGlzLmNoZWNrSWZPcGVuZWQoKTtcbiAgICB9XG5cbiAgICBjbGVhclBhbmVscygpIHtcbiAgICAgICAgaWYgKHRoaXMubm90aWZzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5ub3RpZnMuc3BsaWNlKDAsIDEpO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhclBhbmVscygpO1xuICAgICAgICAgICAgfSwgMjAwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tJZk9wZW5lZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29ubmVjdGVkT3ZlcmxheURldGFjaCgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ292ZXJsYXkgZGV0YWNoZWQhJyk7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSwgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZsZXhMYXlvdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mbGV4LWxheW91dCc7XG5pbXBvcnQgeyBNYXRDYXJkTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY2FyZCc7XG4vLyBpbXBvcnQgeyBUd2FNZDJOb3RpZmljYXRpb25zU2VydmljZSB9IGZyb20gJy4vdHdhLW1kMi1ub3RpZmljYXRpb25zLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24nO1xuaW1wb3J0IHsgTWF0SWNvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2ljb24nO1xuaW1wb3J0IHsgT3ZlcmxheU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IE1hdEJhZGdlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYmFkZ2UnO1xuXG5pbXBvcnQgeyBUV0FNZDJOb3RpZmljYXRpb25zQ29tcG9uZW50IH0gZnJvbSAnLi90d2EtbWQyLW5vdGlmaWNhdGlvbnMuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgRmxleExheW91dE1vZHVsZSxcbiAgICAgICAgTWF0Q2FyZE1vZHVsZSxcbiAgICAgICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgICAgICBNYXRJY29uTW9kdWxlLFxuICAgICAgICBPdmVybGF5TW9kdWxlLFxuICAgICAgICBNYXRCYWRnZU1vZHVsZSxcbiAgICAgICAgLy8gVFdBTWQyTm90aWZpY2F0aW9uc0NvbXBvbmVudCxcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBUV0FNZDJOb3RpZmljYXRpb25zQ29tcG9uZW50LFxuICAgICAgICAvLyBUd2FNZDJOb3RpZmljYXRpb25zU2VydmljZSxcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgT3ZlcmxheU1vZHVsZSxcbiAgICAgICAgVFdBTWQyTm90aWZpY2F0aW9uc0NvbXBvbmVudCxcbiAgICAgICAgLy8gVHdhTWQyTm90aWZpY2F0aW9uc1NlcnZpY2UsXG4gICAgXSxcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICAgICAgVFdBTWQyTm90aWZpY2F0aW9uc0NvbXBvbmVudCxcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBUV0FNZDJOb3RpZmljYXRpb25zQ29tcG9uZW50LFxuICAgIF0sXG4gICAgc2NoZW1hczogW1xuICAgICAgICBDVVNUT01fRUxFTUVOVFNfU0NIRU1BXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBUV0FNZDJOb3RpZmljYXRpb25zTW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE1BZWEsMEJBQTBCO0lBSW5DO1FBRlEsVUFBSyxHQUFhLEVBQUUs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