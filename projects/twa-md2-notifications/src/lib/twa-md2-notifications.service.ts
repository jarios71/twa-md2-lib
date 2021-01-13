import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface INotif {
    id?: string;
    title: string;
    message: string;
    date?: string;
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

    public add(notif: INotif, prepend = true) {
        // console.log(notif);
        if (prepend) {
          this.queue.unshift(notif);
        } else {
          this.queue.push(notif);
        }
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
