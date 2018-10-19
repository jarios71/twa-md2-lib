import { OnInit, EventEmitter } from '@angular/core';
import { TwaMd2NotificationsService, INotif } from './twa-md2-notifications.service';
export declare class TwaMd2NotificationsComponent implements OnInit {
    notifsService: TwaMd2NotificationsService;
    panelClicked: EventEmitter<any>;
    isOpened: boolean;
    notifs: INotif[];
    constructor();
    ngOnInit(): void;
    notifClicked(): void;
    notifPanelClicked(notif: INotif, notifIdx: number): void;
    checkIfOpened(): void;
    removePanel(notifIdx: number): void;
    clearPanels(): void;
    connectedOverlayDetach(): void;
}
