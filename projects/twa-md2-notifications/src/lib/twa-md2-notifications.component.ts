import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TwaMd2NotificationsService, INotif } from './twa-md2-notifications.service';
import { Observable } from 'rxjs';
// import { EventEmitter } from 'protractor';

@Component({
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
            <div class="notifPanelContainer" fxLayoutGap="12px">
                <div fxLayout="row" class="panelTitle">
                    <h3 fxFlex>Notifications</h3>
                    <button mat-icon-button (click)="clearPanels()">
                        <mat-icon>clear_all</mat-icon>
                    </button>
                </div>
                <mat-card *ngFor="let notif of notifs; let i = index" fxLayout="row" class="notif" (click)="notifPanelClicked(notif, i)">
                    <div class="cicon">
                        <mat-icon class="panelIcon" *ngIf="!notif.image">notifications</mat-icon>
                        <img class="notifImage" *ngIf="notif.image" [src]="notif.image" />
                    </div>
                    <div class="ccontent" fxLayout="column">
                        <div fxLayout="row">
                            <h4 fxFlex>{{notif.title}}</h4>
                            <button class="close" mat-icon-button (click)="removePanel(i)">
                                <mat-icon>close</mat-icon>
                            </button>
                        </div>
                        <p fxFlex>{{notif.message}}</p>
                    </div>
                </mat-card>
                <div class="notifPanelHideButton" (click)="isOpened = false" fxLayout="row" fxLayoutAlign="center center">
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
})
export class TwaMd2NotificationsComponent implements OnInit {
    @Input() notifsService: TwaMd2NotificationsService;
    @Output() panelClicked: EventEmitter<any> = new EventEmitter();

    isOpened = false;
    notifs: INotif[];

    constructor() { }

    ngOnInit() {
        this.notifsService.get().subscribe(data => {
            this.notifs = data;
        });
    }

    notifClicked() {
        console.log('notif icon clicked!');
        if (!this.isOpened && !this.notifs.length) {
            return;
        }
        this.isOpened = !this.isOpened;
    }

    notifPanelClicked(notif: INotif, notifIdx: number) {
        console.log('notif panel clicked!', notif);
        if (typeof notif.data !== 'undefined' &&
        typeof notif.data.action !== 'undefined') {
            notif.data.action(notif);
        } else {
            this.panelClicked.emit(notif);
        }
        this.notifsService.remove(notifIdx);
        this.checkIfOpened();
    }

    checkIfOpened() {
        if (this.notifs.length === 0) {
            this.isOpened = false;
        }
    }

    removePanel(notifIdx: number) {
        this.notifsService.remove(notifIdx);
        this.checkIfOpened();
    }

    clearPanels() {
        if (this.notifs.length) {
            this.notifs.splice(0, 1);
            setTimeout(() => {
                this.clearPanels();
            }, 200);
        } else {
            this.checkIfOpened();
        }
    }

    connectedOverlayDetach() {
        console.log('overlay detached!');
    }

}
