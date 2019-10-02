import { Injectable, ɵɵdefineInjectable, EventEmitter, Component, ElementRef, Input, Output, ViewChild, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function INotif() { }
if (false) {
    /** @type {?} */
    INotif.prototype.title;
    /** @type {?} */
    INotif.prototype.message;
    /** @type {?} */
    INotif.prototype.date;
    /** @type {?|undefined} */
    INotif.prototype.data;
    /** @type {?|undefined} */
    INotif.prototype.icon;
    /** @type {?|undefined} */
    INotif.prototype.image;
}
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
            },] }
];
/** @nocollapse */
TwaMd2NotificationsService.ctorParameters = () => [];
/** @nocollapse */ TwaMd2NotificationsService.ngInjectableDef = ɵɵdefineInjectable({ factory: function TwaMd2NotificationsService_Factory() { return new TwaMd2NotificationsService(); }, token: TwaMd2NotificationsService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    TwaMd2NotificationsService.prototype.queue;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { TWAMd2NotificationsComponent, TWAMd2NotificationsModule, TwaMd2NotificationsService };
//# sourceMappingURL=twa-md2-notifications.js.map
