import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface INotif {
    title: string;
    message: string;
    date: string;
    data?: any;
    icon?: string;
    image?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TwaMd2NotificationsService {

    private queue: INotif[] = [];

    constructor() { }

    add(notif: INotif) {
        console.log(notif);
        this.queue.push(notif);
    }

    remove(idx: number) {
        this.queue.splice(idx, 1);
    }

    get(): Observable<INotif[]> {
        return of(this.queue);
    }

    clicked(notif: INotif) {
        console.log(notif);
    }

}
