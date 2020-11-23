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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdhLW1kMi1ub3RpZmljYXRpb25zLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiL2hvbWUub2xkL2pvc2Uvd29yay9zaXJhLmVzL3NpcmEtbmcyLWNvbXBvbmVudHMvbGliLXR3YS1tZC9wcm9qZWN0cy90d2EtbWQyLW5vdGlmaWNhdGlvbnMvc3JjLyIsInNvdXJjZXMiOlsibGliL3R3YS1tZDItbm90aWZpY2F0aW9ucy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQzs7QUFldEMsTUFBTSxPQUFPLDBCQUEwQjtJQUluQztRQUZRLFVBQUssR0FBYSxFQUFFLENBQUM7SUFFYixDQUFDO0lBRVYsR0FBRyxDQUFDLEtBQWE7UUFDcEIsc0JBQXNCO1FBQ3RCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFTSxNQUFNLENBQUMsR0FBVztRQUNyQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVNLEdBQUc7UUFDTixPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVNLE9BQU8sQ0FBQyxLQUFhO1FBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkIsQ0FBQzs7OztZQXhCSixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElOb3RpZiB7XG4gICAgaWQ/OiBzdHJpbmc7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgZGF0ZT86IHN0cmluZztcbiAgICBkYXRhPzogYW55O1xuICAgIGljb24/OiBzdHJpbmc7XG4gICAgaW1hZ2U/OiBzdHJpbmc7XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFR3YU1kMk5vdGlmaWNhdGlvbnNTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgcXVldWU6IElOb3RpZltdID0gW107XG5cbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gICAgcHVibGljIGFkZChub3RpZjogSU5vdGlmKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKG5vdGlmKTtcbiAgICAgICAgdGhpcy5xdWV1ZS5wdXNoKG5vdGlmKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVtb3ZlKGlkeDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMucXVldWUuc3BsaWNlKGlkeCwgMSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCgpOiBPYnNlcnZhYmxlPElOb3RpZltdPiB7XG4gICAgICAgIHJldHVybiBvZih0aGlzLnF1ZXVlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xpY2tlZChub3RpZjogSU5vdGlmKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKG5vdGlmKTtcbiAgICB9XG5cbn1cbiJdfQ==