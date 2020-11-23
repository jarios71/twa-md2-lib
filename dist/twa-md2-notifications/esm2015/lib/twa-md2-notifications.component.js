import { __decorate, __metadata } from "tslib";
import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { TwaMd2NotificationsService } from './twa-md2-notifications.service';
import { fromEvent } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
// import { EventEmitter } from 'protractor';
let TWAMd2NotificationsComponent = class TWAMd2NotificationsComponent {
    constructor(_elRef) {
        this._elRef = _elRef;
        this.panelClicked = new EventEmitter();
        this.panelClosed = new EventEmitter();
        this.isOpened = false;
    }
    ngOnInit() {
        this.notifsService.get().subscribe(data => {
            this.notifs = data;
        });
        this.globalClick = fromEvent(document, 'click').pipe(delay(1), tap(() => {
            this.listening = true;
        }));
        this.globalClick.subscribe((event) => {
            this.onGlobalClick(event);
        });
    }
    onGlobalClick(event) {
        if (event instanceof MouseEvent &&
            this.listening === true &&
            typeof this.notifPanel !== 'undefined' &&
            this.notifPanel !== undefined) {
            // console.log(this.notifPanel.nativeElement);
            // console.log(this._elRef.nativeElement);
            // console.log(event.target);
            if (this.isDescendant(this.notifPanel.nativeElement, event.target) !== true &&
                this.isDescendant(this._elRef.nativeElement, event.target) !== true &&
                this._elRef.nativeElement !== event.target &&
                !this.hasClass(event.target, 'twa-notif')) {
                this.isOpened = false;
            }
        }
    }
    hasClass(elem, className) {
        if (elem.classList.contains(className)) {
            return true;
        }
        return false;
    }
    isDescendant(parent, child) {
        let node = child;
        while (node !== null) {
            if (node === parent) {
                return true;
            }
            else {
                node = node.parentNode;
            }
        }
        return false;
    }
    notifClicked() {
        // console.log('notif icon clicked!');
        if (!this.isOpened && !this.notifs.length) {
            return;
        }
        this.isOpened = !this.isOpened;
    }
    notifPanelClicked(notif, notifIdx) {
        // console.log('notif panel clicked!', notif);
        if (typeof notif.data !== 'undefined' &&
            typeof notif.data.action !== 'undefined') {
            notif.data.action(notif);
            // } else {
        }
        this.panelClicked.emit(notif);
        this.notifsService.remove(notifIdx);
        this.checkIfOpened();
    }
    checkIfOpened() {
        if (this.notifs.length === 0) {
            this.isOpened = false;
        }
    }
    removePanel(notif, notifIdx) {
        this.panelClosed.emit(notif);
        this.notifsService.remove(notifIdx);
        this.checkIfOpened();
    }
    clearPanels() {
        if (this.notifs.length) {
            this.removePanel(this.notifs[0], 0);
            // this.notifs.splice(0, 1);
            setTimeout(() => {
                this.clearPanels();
            }, 100);
        }
        else {
            this.checkIfOpened();
        }
    }
    connectedOverlayDetach() {
        // console.log('overlay detached!');
    }
};
TWAMd2NotificationsComponent.ctorParameters = () => [
    { type: ElementRef }
];
__decorate([
    Input(),
    __metadata("design:type", TwaMd2NotificationsService)
], TWAMd2NotificationsComponent.prototype, "notifsService", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], TWAMd2NotificationsComponent.prototype, "panelClicked", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], TWAMd2NotificationsComponent.prototype, "panelClosed", void 0);
__decorate([
    ViewChild('notifPanelContainer'),
    __metadata("design:type", Object)
], TWAMd2NotificationsComponent.prototype, "notifPanel", void 0);
TWAMd2NotificationsComponent = __decorate([
    Component({
        selector: 'twa-md2-notifications',
        template: `
        <button mat-icon-button #overlayOrigin="cdkOverlayOrigin" cdkOverlayOrigin (click)="notifClicked()">
            <mat-icon [matBadge]="notifs.length" matBadgeSize="medium" *ngIf="notifs.length">notifications</mat-icon>
            <mat-icon *ngIf="notifs.length===0">notifications_none</mat-icon>
        </button>
        <ng-template
            cdkConnectedOverlay
            [cdkConnectedOverlayOrigin]="overlayOrigin"
            [cdkConnectedOverlayOpen]="isOpened"
            (detach)="connectedOverlayDetach()"
        >
            <div #notifPanelContainer class="notifPanelContainer twa-notif" fxLayoutGap="12px">
                <div fxLayout="row" class="panelTitle twa-notif">
                    <h3 class="twa-notif" fxFlex>Notifications</h3>
                    <button class="twa-notif" mat-icon-button (click)="clearPanels()">
                        <mat-icon class="twa-notif">clear_all</mat-icon>
                    </button>
                </div>
                <div class="notifsContainer" [ngClass]="{'scrolling': notifs.length > 4}">
                    <mat-card *ngFor="let notif of notifs; let i = index"
                            fxLayout="row"
                            class="notif twa-notif"
                            (click)="notifPanelClicked(notif, i)">
                        <div class="cicon twa-notif">
                            <mat-icon class="panelIcon twa-notif" *ngIf="!notif.image">notifications</mat-icon>
                            <img class="notifImage twa-notif" *ngIf="notif.image" [src]="notif.image" />
                        </div>
                        <div class="ccontent twa-notif" fxLayout="column">
                            <div fxLayout="row" class="twa-notif">
                                <h4 class="twa-notif" fxFlex>{{notif.title}}</h4>
                                <button class="close twa-notif" mat-icon-button (click)="removePanel(notif, i)">
                                    <mat-icon class="twa-notif">close</mat-icon>
                                </button>
                            </div>
                            <p class="twa-notif" fxFlex>{{notif.message}}</p>
                        </div>
                    </mat-card>
                </div>
                <div class="notifPanelHideButton twa-notif" (click)="isOpened = false" fxLayout="row" fxLayoutAlign="center center">
                    <mat-icon>expand_less</mat-icon>
                </div>
            </div>
        </ng-template>
    `,
        styles: ['.notifPanelContainer { width: 320px; background: #eee; border: 1px solid #ccc;' +
                'padding: 12px 12px 4px 12px; box-shadow: 0 2px 10px rgba(0,0,0,.2); }',
            '.notifPanelHideButton { width: 100%; height: 18px; border-top: 1px solid #ccc; cursor: pointer; }',
            'div.panelTitle h3 { color: #aaa; font-weight: 900; font-family: Roboto Light; font-size: 26px; margin: 8px; }',
            'div.notifsContainer.scrolling { max-height: 408px; overflow: auto; }',
            'mat-card.notif { cursor: pointer; padding: 12px 12px 12px 8px; margin: 0 0 8px 0!important; }',
            'mat-card.notif h4 { font-family: Roboto Light; font-size: 16px; margin: 8px 0 0; }',
            'mat-card.notif p { font-family: Roboto Light; margin: 8px 0 0; }',
            '.cicon { padding: 12px 12px 12px 4px; }',
            '.ccontent { width: 100%; }',
            'mat-icon.panelIcon { font-size: 40px; height: 40px; width: 40px; line-height: 40px; }',
            'img.notifImage { width: 40x; height: 40px; border-radius: 50%; }',
            'button.close { margin: -12px -12px 0 0;}']
    }),
    __metadata("design:paramtypes", [ElementRef])
], TWAMd2NotificationsComponent);
export { TWAMd2NotificationsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdhLW1kMi1ub3RpZmljYXRpb25zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3R3YS1tZDItbm90aWZpY2F0aW9ucy8iLCJzb3VyY2VzIjpbImxpYi90d2EtbWQyLW5vdGlmaWNhdGlvbnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RHLE9BQU8sRUFBRSwwQkFBMEIsRUFBVSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3JGLE9BQU8sRUFBYyxTQUFTLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1Qyw2Q0FBNkM7QUFnRTdDLElBQWEsNEJBQTRCLEdBQXpDLE1BQWEsNEJBQTRCO0lBYXJDLFlBQ1ksTUFBa0I7UUFBbEIsV0FBTSxHQUFOLE1BQU0sQ0FBWTtRQVpwQixpQkFBWSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3JELGdCQUFXLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFPOUQsYUFBUSxHQUFHLEtBQUssQ0FBQztJQUtiLENBQUM7SUFFTCxRQUFRO1FBQ0osSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDdEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUNoRCxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQ1IsR0FBRyxDQUFDLEdBQUcsRUFBRTtZQUNMLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxD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Qiw0QkFBNEIsQ0FvSHhDO1NBcEhZLDRCQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBWaWV3Q2hpbGQsIEV2ZW50RW1pdHRlciwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHdhTWQyTm90aWZpY2F0aW9uc1NlcnZpY2UsIElOb3RpZiB9IGZyb20gJy4vdHdhLW1kMi1ub3RpZmljYXRpb25zLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgZnJvbUV2ZW50IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWxheSwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuLy8gaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAncHJvdHJhY3Rvcic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndHdhLW1kMi1ub3RpZmljYXRpb25zJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiAjb3ZlcmxheU9yaWdpbj1cImNka092ZXJsYXlPcmlnaW5cIiBjZGtPdmVybGF5T3JpZ2luIChjbGljayk9XCJub3RpZkNsaWNrZWQoKVwiPlxuICAgICAgICAgICAgPG1hdC1pY29uIFttYXRCYWRnZV09XCJub3RpZnMubGVuZ3RoXCIgbWF0QmFkZ2VTaXplPVwibWVkaXVtXCIgKm5nSWY9XCJub3RpZnMubGVuZ3RoXCI+bm90aWZpY2F0aW9uczwvbWF0LWljb24+XG4gICAgICAgICAgICA8bWF0LWljb24gKm5nSWY9XCJub3RpZnMubGVuZ3RoPT09MFwiPm5vdGlmaWNhdGlvbnNfbm9uZTwvbWF0LWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8bmctdGVtcGxhdGVcbiAgICAgICAgICAgIGNka0Nvbm5lY3RlZE92ZXJsYXlcbiAgICAgICAgICAgIFtjZGtDb25uZWN0ZWRPdmVybGF5T3JpZ2luXT1cIm92ZXJsYXlPcmlnaW5cIlxuICAgICAgICAgICAgW2Nka0Nvbm5lY3RlZE92ZXJsYXlPcGVuXT1cImlzT3BlbmVkXCJcbiAgICAgICAgICAgIChkZXRhY2gpPVwiY29ubmVjdGVkT3ZlcmxheURldGFjaCgpXCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPGRpdiAjbm90aWZQYW5lbENvbnRhaW5lciBjbGFzcz1cIm5vdGlmUGFuZWxDb250YWluZXIgdHdhLW5vdGlmXCIgZnhMYXlvdXRHYXA9XCIxMnB4XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGNsYXNzPVwicGFuZWxUaXRsZSB0d2Etbm90aWZcIj5cbiAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzPVwidHdhLW5vdGlmXCIgZnhGbGV4Pk5vdGlmaWNhdGlvbnM8L2gzPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwidHdhLW5vdGlmXCIgbWF0LWljb24tYnV0dG9uIChjbGljayk9XCJjbGVhclBhbmVscygpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJ0d2Etbm90aWZcIj5jbGVhcl9hbGw8L21hdC1pY29uPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibm90aWZzQ29udGFpbmVyXCIgW25nQ2xhc3NdPVwieydzY3JvbGxpbmcnOiBub3RpZnMubGVuZ3RoID4gNH1cIj5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1jYXJkICpuZ0Zvcj1cImxldCBub3RpZiBvZiBub3RpZnM7IGxldCBpID0gaW5kZXhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ4TGF5b3V0PVwicm93XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cIm5vdGlmIHR3YS1ub3RpZlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm5vdGlmUGFuZWxDbGlja2VkKG5vdGlmLCBpKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNpY29uIHR3YS1ub3RpZlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cInBhbmVsSWNvbiB0d2Etbm90aWZcIiAqbmdJZj1cIiFub3RpZi5pbWFnZVwiPm5vdGlmaWNhdGlvbnM8L21hdC1pY29uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJub3RpZkltYWdlIHR3YS1ub3RpZlwiICpuZ0lmPVwibm90aWYuaW1hZ2VcIiBbc3JjXT1cIm5vdGlmLmltYWdlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNjb250ZW50IHR3YS1ub3RpZlwiIGZ4TGF5b3V0PVwiY29sdW1uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGNsYXNzPVwidHdhLW5vdGlmXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzcz1cInR3YS1ub3RpZlwiIGZ4RmxleD57e25vdGlmLnRpdGxlfX08L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiY2xvc2UgdHdhLW5vdGlmXCIgbWF0LWljb24tYnV0dG9uIChjbGljayk9XCJyZW1vdmVQYW5lbChub3RpZiwgaSlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cInR3YS1ub3RpZlwiPmNsb3NlPC9tYXQtaWNvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJ0d2Etbm90aWZcIiBmeEZsZXg+e3tub3RpZi5tZXNzYWdlfX08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9tYXQtY2FyZD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibm90aWZQYW5lbEhpZGVCdXR0b24gdHdhLW5vdGlmXCIgKGNsaWNrKT1cImlzT3BlbmVkID0gZmFsc2VcIiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJjZW50ZXIgY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbj5leHBhbmRfbGVzczwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICBgLFxuICAgIHN0eWxlczogW1xuICAgICAgICAnLm5vdGlmUGFuZWxDb250YWluZXIgeyB3aWR0aDogMzIwcHg7IGJhY2tncm91bmQ6ICNlZWU7IGJvcmRlcjogMXB4IHNvbGlkICNjY2M7JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3BhZGRpbmc6IDEycHggMTJweCA0cHggMTJweDsgYm94LXNoYWRvdzogMCAycHggMTBweCByZ2JhKDAsMCwwLC4yKTsgfScsXG4gICAgICAgICcubm90aWZQYW5lbEhpZGVCdXR0b24geyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxOHB4OyBib3JkZXItdG9wOiAxcHggc29saWQgI2NjYzsgY3Vyc29yOiBwb2ludGVyOyB9JyxcbiAgICAgICAgJ2Rpdi5wYW5lbFRpdGxlIGgzIHsgY29sb3I6ICNhYWE7IGZvbnQtd2VpZ2h0OiA5MDA7IGZvbnQtZmFtaWx5OiBSb2JvdG8gTGlnaHQ7IGZvbnQtc2l6ZTogMjZweDsgbWFyZ2luOiA4cHg7IH0nLFxuICAgICAgICAnZGl2Lm5vdGlmc0NvbnRhaW5lci5zY3JvbGxpbmcgeyBtYXgtaGVpZ2h0OiA0MDhweDsgb3ZlcmZsb3c6IGF1dG87IH0nLFxuICAgICAgICAnbWF0LWNhcmQubm90aWYgeyBjdXJzb3I6IHBvaW50ZXI7IHBhZGRpbmc6IDEycHggMTJweCAxMnB4IDhweDsgbWFyZ2luOiAwIDAgOHB4IDAhaW1wb3J0YW50OyB9JyxcbiAgICAgICAgJ21hdC1jYXJkLm5vdGlmIGg0IHsgZm9udC1mYW1pbHk6IFJvYm90byBMaWdodDsgZm9udC1zaXplOiAxNnB4OyBtYXJnaW46IDhweCAwIDA7IH0nLFxuICAgICAgICAnbWF0LWNhcmQubm90aWYgcCB7IGZvbnQtZmFtaWx5OiBSb2JvdG8gTGlnaHQ7IG1hcmdpbjogOHB4IDAgMDsgfScsXG4gICAgICAgICcuY2ljb24geyBwYWRkaW5nOiAxMnB4IDEycHggMTJweCA0cHg7IH0nLFxuICAgICAgICAnLmNjb250ZW50IHsgd2lkdGg6IDEwMCU7IH0nLFxuICAgICAgICAnbWF0LWljb24ucGFuZWxJY29uIHsgZm9udC1zaXplOiA0MHB4OyBoZWlnaHQ6IDQwcHg7IHdpZHRoOiA0MHB4OyBsaW5lLWhlaWdodDogNDBweDsgfScsXG4gICAgICAgICdpbWcubm90aWZJbWFnZSB7IHdpZHRoOiA0MHg7IGhlaWdodDogNDBweDsgYm9yZGVyLXJhZGl1czogNTAlOyB9JyxcbiAgICAgICAgJ2J1dHRvbi5jbG9zZSB7IG1hcmdpbjogLTEycHggLTEycHggMCAwO30nLFxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgVFdBTWQyTm90aWZpY2F0aW9uc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQElucHV0KCkgbm90aWZzU2VydmljZTogVHdhTWQyTm90aWZpY2F0aW9uc1NlcnZpY2U7XG4gICAgQE91dHB1dCgpIHBhbmVsQ2xpY2tlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIHBhbmVsQ2xvc2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBWaWV3Q2hpbGQoJ25vdGlmUGFuZWxDb250YWluZXInKSBub3RpZlBhbmVsO1xuXG4gICAgcHJpdmF0ZSBnbG9iYWxDbGljazogT2JzZXJ2YWJsZTxFdmVudD47XG4gICAgcHJpdmF0ZSBsaXN0ZW5pbmc6IGJvb2xlYW47XG5cbiAgICBpc09wZW5lZCA9IGZhbHNlO1xuICAgIG5vdGlmczogSU5vdGlmW107XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfZWxSZWY6IEVsZW1lbnRSZWYsXG4gICAgKSB7IH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLm5vdGlmc1NlcnZpY2UuZ2V0KCkuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICAgICAgdGhpcy5ub3RpZnMgPSBkYXRhO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5nbG9iYWxDbGljayA9IGZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJykucGlwZShcbiAgICAgICAgICAgIGRlbGF5KDEpLFxuICAgICAgICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RlbmluZyA9IHRydWU7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmdsb2JhbENsaWNrLnN1YnNjcmliZSgoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMub25HbG9iYWxDbGljayhldmVudCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uR2xvYmFsQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgTW91c2VFdmVudCAmJlxuICAgICAgICAgICAgdGhpcy5saXN0ZW5pbmcgPT09IHRydWUgJiZcbiAgICAgICAgICAgIHR5cGVvZiB0aGlzLm5vdGlmUGFuZWwgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgICB0aGlzLm5vdGlmUGFuZWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5ub3RpZlBhbmVsLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5fZWxSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhldmVudC50YXJnZXQpO1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNEZXNjZW5kYW50KHRoaXMubm90aWZQYW5lbC5uYXRpdmVFbGVtZW50LCBldmVudC50YXJnZXQpICE9PSB0cnVlICYmXG4gICAgICAgICAgICAgICAgdGhpcy5pc0Rlc2NlbmRhbnQodGhpcy5fZWxSZWYubmF0aXZlRWxlbWVudCwgZXZlbnQudGFyZ2V0KSAhPT0gdHJ1ZSAmJlxuICAgICAgICAgICAgICAgIHRoaXMuX2VsUmVmLm5hdGl2ZUVsZW1lbnQgIT09IGV2ZW50LnRhcmdldCAmJlxuICAgICAgICAgICAgICAgICF0aGlzLmhhc0NsYXNzKGV2ZW50LnRhcmdldCwgJ3R3YS1ub3RpZicpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc09wZW5lZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFzQ2xhc3MoZWxlbSwgY2xhc3NOYW1lKSB7XG4gICAgICAgIGlmIChlbGVtLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaXNEZXNjZW5kYW50KHBhcmVudCwgY2hpbGQpIHtcbiAgICAgICAgbGV0IG5vZGUgPSBjaGlsZDtcbiAgICAgICAgd2hpbGUgKG5vZGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChub2RlID09PSBwYXJlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgbm90aWZDbGlja2VkKCkge1xuICAgICAgLy8gY29uc29sZS5sb2coJ25vdGlmIGljb24gY2xpY2tlZCEnKTtcbiAgICAgIGlmICghdGhpcy5pc09wZW5lZCAmJiAhdGhpcy5ub3RpZnMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuaXNPcGVuZWQgPSAhdGhpcy5pc09wZW5lZDtcbiAgICB9XG5cbiAgICBub3RpZlBhbmVsQ2xpY2tlZChub3RpZjogSU5vdGlmLCBub3RpZklkeDogbnVtYmVyKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZygnbm90aWYgcGFuZWwgY2xpY2tlZCEnLCBub3RpZik7XG4gICAgICBpZiAodHlwZW9mIG5vdGlmLmRhdGEgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICB0eXBlb2Ygbm90aWYuZGF0YS5hY3Rpb24gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIG5vdGlmLmRhdGEuYWN0aW9uKG5vdGlmKTtcbiAgICAgIC8vIH0gZWxzZSB7XG4gICAgICB9XG4gICAgICB0aGlzLnBhbmVsQ2xpY2tlZC5lbWl0KG5vdGlmKTtcbiAgICAgIHRoaXMubm90aWZzU2VydmljZS5yZW1vdmUobm90aWZJZHgpO1xuICAgICAgdGhpcy5jaGVja0lmT3BlbmVkKCk7XG4gICAgfVxuXG4gICAgY2hlY2tJZk9wZW5lZCgpIHtcbiAgICAgIGlmICh0aGlzLm5vdGlmcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhpcy5pc09wZW5lZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZVBhbmVsKG5vdGlmOiBJTm90aWYsIG5vdGlmSWR4OiBudW1iZXIpIHtcbiAgICAgIHRoaXMucGFuZWxDbG9zZWQuZW1pdChub3RpZik7XG4gICAgICB0aGlzLm5vdGlmc1NlcnZpY2UucmVtb3ZlKG5vdGlmSWR4KTtcbiAgICAgIHRoaXMuY2hlY2tJZk9wZW5lZCgpO1xuICAgIH1cblxuICAgIGNsZWFyUGFuZWxzKCkge1xuICAgICAgaWYgKHRoaXMubm90aWZzLmxlbmd0aCkge1xuICAgICAgICB0aGlzLnJlbW92ZVBhbmVsKHRoaXMubm90aWZzWzBdLCAwKTtcbiAgICAgICAgLy8gdGhpcy5ub3RpZnMuc3BsaWNlKDAsIDEpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLmNsZWFyUGFuZWxzKCk7XG4gICAgICAgIH0sIDEwMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNoZWNrSWZPcGVuZWQoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25uZWN0ZWRPdmVybGF5RGV0YWNoKCkge1xuICAgICAgLy8gY29uc29sZS5sb2coJ292ZXJsYXkgZGV0YWNoZWQhJyk7XG4gICAgfVxuXG59XG4iXX0=