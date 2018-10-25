/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * @record
 */
export function INotif() { }
function INotif_tsickle_Closure_declarations() {
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
var TwaMd2NotificationsService = /** @class */ (function () {
    function TwaMd2NotificationsService() {
        this.queue = [];
    }
    /**
     * @param {?} notif
     * @return {?}
     */
    TwaMd2NotificationsService.prototype.add = /**
     * @param {?} notif
     * @return {?}
     */
    function (notif) {
        console.log(notif);
        this.queue.push(notif);
    };
    /**
     * @param {?} idx
     * @return {?}
     */
    TwaMd2NotificationsService.prototype.remove = /**
     * @param {?} idx
     * @return {?}
     */
    function (idx) {
        this.queue.splice(idx, 1);
    };
    /**
     * @return {?}
     */
    TwaMd2NotificationsService.prototype.get = /**
     * @return {?}
     */
    function () {
        return of(this.queue);
    };
    /**
     * @param {?} notif
     * @return {?}
     */
    TwaMd2NotificationsService.prototype.clicked = /**
     * @param {?} notif
     * @return {?}
     */
    function (notif) {
        console.log(notif);
    };
    TwaMd2NotificationsService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    TwaMd2NotificationsService.ctorParameters = function () { return []; };
    /** @nocollapse */ TwaMd2NotificationsService.ngInjectableDef = i0.defineInjectable({ factory: function TwaMd2NotificationsService_Factory() { return new TwaMd2NotificationsService(); }, token: TwaMd2NotificationsService, providedIn: "root" });
    return TwaMd2NotificationsService;
}());
export { TwaMd2NotificationsService };
function TwaMd2NotificationsService_tsickle_Closure_declarations() {
    /** @type {?} */
    TwaMd2NotificationsService.prototype.queue;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdhLW1kMi1ub3RpZmljYXRpb25zLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly90d2EtbWQyLW5vdGlmaWNhdGlvbnMvIiwic291cmNlcyI6WyJsaWIvdHdhLW1kMi1ub3RpZmljYXRpb25zLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBa0JsQztxQkFGMEIsRUFBRTtLQUVYOzs7OztJQUVWLHdDQUFHOzs7O2NBQUMsS0FBYTtRQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Ozs7SUFHcEIsMkNBQU07Ozs7Y0FBQyxHQUFXO1FBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFHdkIsd0NBQUc7Ozs7UUFDTixNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Ozs7O0lBR25CLDRDQUFPOzs7O2NBQUMsS0FBYTtRQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Z0JBdkIxQixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7OztxQ0FkRDs7U0FlYSwwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElOb3RpZiB7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgZGF0ZTogc3RyaW5nO1xuICAgIGRhdGE/OiBhbnk7XG4gICAgaWNvbj86IHN0cmluZztcbiAgICBpbWFnZT86IHN0cmluZztcbn1cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgVHdhTWQyTm90aWZpY2F0aW9uc1NlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSBxdWV1ZTogSU5vdGlmW10gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgICBwdWJsaWMgYWRkKG5vdGlmOiBJTm90aWYpIHtcbiAgICAgICAgY29uc29sZS5sb2cobm90aWYpO1xuICAgICAgICB0aGlzLnF1ZXVlLnB1c2gobm90aWYpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZW1vdmUoaWR4OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5xdWV1ZS5zcGxpY2UoaWR4LCAxKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0KCk6IE9ic2VydmFibGU8SU5vdGlmW10+IHtcbiAgICAgICAgcmV0dXJuIG9mKHRoaXMucXVldWUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjbGlja2VkKG5vdGlmOiBJTm90aWYpIHtcbiAgICAgICAgY29uc29sZS5sb2cobm90aWYpO1xuICAgIH1cblxufVxuIl19