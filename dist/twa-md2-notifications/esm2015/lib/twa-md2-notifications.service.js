/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * @record
 */
export function INotif() { }
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
export class TwaMd2NotificationsService {
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
            },] },
];
/** @nocollapse */
TwaMd2NotificationsService.ctorParameters = () => [];
/** @nocollapse */ TwaMd2NotificationsService.ngInjectableDef = i0.defineInjectable({ factory: function TwaMd2NotificationsService_Factory() { return new TwaMd2NotificationsService(); }, token: TwaMd2NotificationsService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    TwaMd2NotificationsService.prototype.queue;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdhLW1kMi1ub3RpZmljYXRpb25zLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly90d2EtbWQyLW5vdGlmaWNhdGlvbnMvIiwic291cmNlcyI6WyJsaWIvdHdhLW1kMi1ub3RpZmljYXRpb25zLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQzs7Ozs7QUFFdEMsNEJBT0M7OztJQU5HLHVCQUFjOztJQUNkLHlCQUFnQjs7SUFDaEIsc0JBQWE7O0lBQ2Isc0JBQVc7O0lBQ1gsc0JBQWM7O0lBQ2QsdUJBQWU7O0FBTW5CLE1BQU0sT0FBTywwQkFBMEI7SUFJbkM7UUFGUSxVQUFLLEdBQWEsRUFBRSxDQUFDO0lBRWIsQ0FBQzs7Ozs7SUFFVixHQUFHLENBQUMsS0FBYTtRQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNCLENBQUM7Ozs7O0lBRU0sTUFBTSxDQUFDLEdBQVc7UUFDckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzlCLENBQUM7Ozs7SUFFTSxHQUFHO1FBQ04sT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUM7Ozs7O0lBRU0sT0FBTyxDQUFDLEtBQWE7UUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QixDQUFDOzs7WUF4QkosVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7Ozs7Ozs7O0lBR0csMkNBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcblxuZXhwb3J0IGludGVyZmFjZSBJTm90aWYge1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIGRhdGU6IHN0cmluZztcbiAgICBkYXRhPzogYW55O1xuICAgIGljb24/OiBzdHJpbmc7XG4gICAgaW1hZ2U/OiBzdHJpbmc7XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFR3YU1kMk5vdGlmaWNhdGlvbnNTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgcXVldWU6IElOb3RpZltdID0gW107XG5cbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gICAgcHVibGljIGFkZChub3RpZjogSU5vdGlmKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKG5vdGlmKTtcbiAgICAgICAgdGhpcy5xdWV1ZS5wdXNoKG5vdGlmKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVtb3ZlKGlkeDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMucXVldWUuc3BsaWNlKGlkeCwgMSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCgpOiBPYnNlcnZhYmxlPElOb3RpZltdPiB7XG4gICAgICAgIHJldHVybiBvZih0aGlzLnF1ZXVlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xpY2tlZChub3RpZjogSU5vdGlmKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKG5vdGlmKTtcbiAgICB9XG5cbn1cbiJdfQ==