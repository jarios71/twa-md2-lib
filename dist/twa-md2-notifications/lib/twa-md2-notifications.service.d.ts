import { Observable } from 'rxjs';
export interface INotif {
    title: string;
    message: string;
    date: string;
    data?: any;
    icon?: string;
    image?: string;
}
export declare class TwaMd2NotificationsService {
    private queue;
    constructor();
    add(notif: INotif): void;
    remove(idx: number): void;
    get(): Observable<INotif[]>;
    clicked(notif: INotif): void;
}
