import { OnInit, EventEmitter, ElementRef } from '@angular/core';
import { TwaMd2NotificationsService, INotif } from './twa-md2-notifications.service';
export declare class TwaMd2NotificationsComponent implements OnInit {
    private _elRef;
    notifsService: TwaMd2NotificationsService;
    panelClicked: EventEmitter<any>;
    private globalClick;
    private listening;
    isOpened: boolean;
    notifs: INotif[];
    constructor(_elRef: ElementRef);
    ngOnInit(): void;
    onGlobalClick(event: MouseEvent): void;
    isDescendant(parent: any, child: any): boolean;
    notifClicked(): void;
    notifPanelClicked(notif: INotif, notifIdx: number): void;
    checkIfOpened(): void;
    removePanel(notifIdx: number): void;
    clearPanels(): void;
    connectedOverlayDetach(): void;
}
