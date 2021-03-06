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

    public add(notif: INotif) {
        console.log(notif);
        this.queue.push(notif);
    }

    public remove(idx: number) {
        this.queue.splice(idx, 1);
    }

    public get(): Observable<INotif[]> {
        return of(this.queue);
    }

    public clicked(notif: INotif) {
        console.log(notif);
    }

}
