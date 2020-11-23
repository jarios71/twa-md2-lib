import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import * as i0 from "@angular/core";
var TwaMd2NotificationsService = /** @class */ (function () {
    function TwaMd2NotificationsService() {
        this.queue = [];
    }
    TwaMd2NotificationsService.prototype.add = function (notif) {
        // console.log(notif);
        this.queue.push(notif);
    };
    TwaMd2NotificationsService.prototype.remove = function (idx) {
        this.queue.splice(idx, 1);
    };
    TwaMd2NotificationsService.prototype.get = function () {
        return of(this.queue);
    };
    TwaMd2NotificationsService.prototype.clicked = function (notif) {
        console.log(notif);
    };
    TwaMd2NotificationsService.ɵprov = i0.ɵɵdefineInjectable({ factory: function TwaMd2NotificationsService_Factory() { return new TwaMd2NotificationsService(); }, token: TwaMd2NotificationsService, providedIn: "root" });
    TwaMd2NotificationsService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], TwaMd2NotificationsService);
    return TwaMd2NotificationsService;
}());
export { TwaMd2NotificationsService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdhLW1kMi1ub3RpZmljYXRpb25zLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly90d2EtbWQyLW5vdGlmaWNhdGlvbnMvIiwic291cmNlcyI6WyJsaWIvdHdhLW1kMi1ub3RpZmljYXRpb25zLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQzs7QUFldEM7SUFJSTtRQUZRLFVBQUssR0FBYSxFQUFFLENBQUM7SUFFYixDQUFDO0lBRVYsd0NBQUcsR0FBVixVQUFXLEtBQWE7UUFDcEIsc0JBQXNCO1FBQ3RCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFTSwyQ0FBTSxHQUFiLFVBQWMsR0FBVztRQUNyQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVNLHdDQUFHLEdBQVY7UUFDSSxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVNLDRDQUFPLEdBQWQsVUFBZSxLQUFhO1FBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkIsQ0FBQzs7SUFyQlEsMEJBQTBCO1FBSHRDLFVBQVUsQ0FBQztZQUNWLFVBQVUsRUFBRSxNQUFNO1NBQ25CLENBQUM7O09BQ1csMEJBQTBCLENBdUJ0QztxQ0F2Q0Q7Q0F1Q0MsQUF2QkQsSUF1QkM7U0F2QlksMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcblxuZXhwb3J0IGludGVyZmFjZSBJTm90aWYge1xuICAgIGlkPzogc3RyaW5nO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIGRhdGU/OiBzdHJpbmc7XG4gICAgZGF0YT86IGFueTtcbiAgICBpY29uPzogc3RyaW5nO1xuICAgIGltYWdlPzogc3RyaW5nO1xufVxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBUd2FNZDJOb3RpZmljYXRpb25zU2VydmljZSB7XG5cbiAgICBwcml2YXRlIHF1ZXVlOiBJTm90aWZbXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IoKSB7IH1cblxuICAgIHB1YmxpYyBhZGQobm90aWY6IElOb3RpZikge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhub3RpZik7XG4gICAgICAgIHRoaXMucXVldWUucHVzaChub3RpZik7XG4gICAgfVxuXG4gICAgcHVibGljIHJlbW92ZShpZHg6IG51bWJlcikge1xuICAgICAgICB0aGlzLnF1ZXVlLnNwbGljZShpZHgsIDEpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQoKTogT2JzZXJ2YWJsZTxJTm90aWZbXT4ge1xuICAgICAgICByZXR1cm4gb2YodGhpcy5xdWV1ZSk7XG4gICAgfVxuXG4gICAgcHVibGljIGNsaWNrZWQobm90aWY6IElOb3RpZikge1xuICAgICAgICBjb25zb2xlLmxvZyhub3RpZik7XG4gICAgfVxuXG59XG4iXX0=