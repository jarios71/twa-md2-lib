import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import * as i0 from "@angular/core";
export class TwaMd2NotificationsService {
    constructor() {
        this.queue = [];
    }
    add(notif) {
        // console.log(notif);
        this.queue.push(notif);
    }
    remove(idx) {
        this.queue.splice(idx, 1);
    }
    get() {
        return of(this.queue);
    }
    clicked(notif) {
        console.log(notif);
    }
}
TwaMd2NotificationsService.ɵprov = i0.ɵɵdefineInjectable({ factory: function TwaMd2NotificationsService_Factory() { return new TwaMd2NotificationsService(); }, token: TwaMd2NotificationsService, providedIn: "root" });
TwaMd2NotificationsService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
TwaMd2NotificationsService.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdhLW1kMi1ub3RpZmljYXRpb25zLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vcHJvamVjdHMvdHdhLW1kMi1ub3RpZmljYXRpb25zL3NyYy8iLCJzb3VyY2VzIjpbImxpYi90d2EtbWQyLW5vdGlmaWNhdGlvbnMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7O0FBZXRDLE1BQU0sT0FBTywwQkFBMEI7SUFJbkM7UUFGUSxVQUFLLEdBQWEsRUFBRSxDQUFDO0lBRWIsQ0FBQztJQUVWLEdBQUcsQ0FBQyxLQUFhO1FBQ3BCLHNCQUFzQjtRQUN0QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRU0sTUFBTSxDQUFDLEdBQVc7UUFDckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFTSxHQUFHO1FBQ04sT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFTSxPQUFPLENBQUMsS0FBYTtRQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7Ozs7WUF4QkosVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcblxuZXhwb3J0IGludGVyZmFjZSBJTm90aWYge1xuICAgIGlkPzogc3RyaW5nO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIGRhdGU/OiBzdHJpbmc7XG4gICAgZGF0YT86IGFueTtcbiAgICBpY29uPzogc3RyaW5nO1xuICAgIGltYWdlPzogc3RyaW5nO1xufVxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBUd2FNZDJOb3RpZmljYXRpb25zU2VydmljZSB7XG5cbiAgICBwcml2YXRlIHF1ZXVlOiBJTm90aWZbXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IoKSB7IH1cblxuICAgIHB1YmxpYyBhZGQobm90aWY6IElOb3RpZikge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhub3RpZik7XG4gICAgICAgIHRoaXMucXVldWUucHVzaChub3RpZik7XG4gICAgfVxuXG4gICAgcHVibGljIHJlbW92ZShpZHg6IG51bWJlcikge1xuICAgICAgICB0aGlzLnF1ZXVlLnNwbGljZShpZHgsIDEpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQoKTogT2JzZXJ2YWJsZTxJTm90aWZbXT4ge1xuICAgICAgICByZXR1cm4gb2YodGhpcy5xdWV1ZSk7XG4gICAgfVxuXG4gICAgcHVibGljIGNsaWNrZWQobm90aWY6IElOb3RpZikge1xuICAgICAgICBjb25zb2xlLmxvZyhub3RpZik7XG4gICAgfVxuXG59XG4iXX0=