import { Component, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { TwaMd2NotificationsService } from './twa-md2-notifications.service';
import { fromEvent } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
// import { EventEmitter } from 'protractor';
export class TWAMd2NotificationsComponent {
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
}
TWAMd2NotificationsComponent.decorators = [
    { type: Component, args: [{
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
            },] }
];
TWAMd2NotificationsComponent.ctorParameters = () => [
    { type: ElementRef }
];
TWAMd2NotificationsComponent.propDecorators = {
    notifsService: [{ type: Input }],
    panelClicked: [{ type: Output }],
    panelClosed: [{ type: Output }],
    notifPanel: [{ type: ViewChild, args: ['notifPanelContainer',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdhLW1kMi1ub3RpZmljYXRpb25zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi9wcm9qZWN0cy90d2EtbWQyLW5vdGlmaWNhdGlvbnMvc3JjLyIsInNvdXJjZXMiOlsibGliL3R3YS1tZDItbm90aWZpY2F0aW9ucy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RHLE9BQU8sRUFBRSwwQkFBMEIsRUFBVSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3JGLE9BQU8sRUFBYyxTQUFTLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1Qyw2Q0FBNkM7QUFnRTdDLE1BQU0sT0FBTyw0QkFBNEI7SUFhckMsWUFDWSxNQUFrQjtRQUFsQixXQUFNLEdBQU4sTUFBTSxDQUFZO1FBWnBCLGlCQUFZLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDckQsZ0JBQVcsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQU85RCxhQUFRLEdBQUcsS0FBSyxDQUFDO0lBS2IsQ0FBQztJQUVMLFFBQVE7UUFDSixJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN0QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQ2hELEtBQUssQ0FBQyxDQUFDLENBQUMsRUFDUixHQUFHLENBQUMsR0FBRyxFQUFFO1lBQ0wsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFD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YUFBYSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNwQyw0QkFBNEI7WUFDNUIsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDZCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDckIsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ1Q7YUFBTTtZQUNMLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN0QjtJQUNILENBQUM7SUFFRCxzQkFBc0I7UUFDcEIsb0NBQW9DO0lBQ3RDLENBQUM7OztZQWhMSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHVCQUF1QjtnQkFDakMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBMkNUO3lCQUVHLGdGQUFnRjt3QkFDekQsdUVBQXVFO29CQUM5RixtR0FBbUc7b0JBQ25HLCtHQUErRztvQkFDL0csc0VBQXNFO29CQUN0RSwrRkFBK0Y7b0JBQy9GLG9GQUFvRjtvQkFDcEYsa0VBQWtFO29CQUNsRSx5Q0FBeUM7b0JBQ3pDLDRCQUE0QjtvQkFDNUIsdUZBQXVGO29CQUN2RixrRUFBa0U7b0JBQ2xFLDBDQUEwQzthQUVqRDs7O1lBbkVtRSxVQUFVOzs7NEJBcUV6RSxLQUFLOzJCQUNMLE1BQU07MEJBQ04sTUFBTTt5QkFFTixTQUFTLFNBQUMscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIFZpZXdDaGlsZCwgRXZlbnRFbWl0dGVyLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUd2FNZDJOb3RpZmljYXRpb25zU2VydmljZSwgSU5vdGlmIH0gZnJvbSAnLi90d2EtbWQyLW5vdGlmaWNhdGlvbnMuc2VydmljZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBmcm9tRXZlbnQgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlbGF5LCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG4vLyBpbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdwcm90cmFjdG9yJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd0d2EtbWQyLW5vdGlmaWNhdGlvbnMnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uICNvdmVybGF5T3JpZ2luPVwiY2RrT3ZlcmxheU9yaWdpblwiIGNka092ZXJsYXlPcmlnaW4gKGNsaWNrKT1cIm5vdGlmQ2xpY2tlZCgpXCI+XG4gICAgICAgICAgICA8bWF0LWljb24gW21hdEJhZGdlXT1cIm5vdGlmcy5sZW5ndGhcIiBtYXRCYWRnZVNpemU9XCJtZWRpdW1cIiAqbmdJZj1cIm5vdGlmcy5sZW5ndGhcIj5ub3RpZmljYXRpb25zPC9tYXQtaWNvbj5cbiAgICAgICAgICAgIDxtYXQtaWNvbiAqbmdJZj1cIm5vdGlmcy5sZW5ndGg9PT0wXCI+bm90aWZpY2F0aW9uc19ub25lPC9tYXQtaWNvbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgICAgICAgY2RrQ29ubmVjdGVkT3ZlcmxheVxuICAgICAgICAgICAgW2Nka0Nvbm5lY3RlZE92ZXJsYXlPcmlnaW5dPVwib3ZlcmxheU9yaWdpblwiXG4gICAgICAgICAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheU9wZW5dPVwiaXNPcGVuZWRcIlxuICAgICAgICAgICAgKGRldGFjaCk9XCJjb25uZWN0ZWRPdmVybGF5RGV0YWNoKClcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2ICNub3RpZlBhbmVsQ29udGFpbmVyIGNsYXNzPVwibm90aWZQYW5lbENvbnRhaW5lciB0d2Etbm90aWZcIiBmeExheW91dEdhcD1cIjEycHhcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgY2xhc3M9XCJwYW5lbFRpdGxlIHR3YS1ub3RpZlwiPlxuICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJ0d2Etbm90aWZcIiBmeEZsZXg+Tm90aWZpY2F0aW9uczwvaDM+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJ0d2Etbm90aWZcIiBtYXQtaWNvbi1idXR0b24gKGNsaWNrKT1cImNsZWFyUGFuZWxzKClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cInR3YS1ub3RpZlwiPmNsZWFyX2FsbDwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJub3RpZnNDb250YWluZXJcIiBbbmdDbGFzc109XCJ7J3Njcm9sbGluZyc6IG5vdGlmcy5sZW5ndGggPiA0fVwiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWNhcmQgKm5nRm9yPVwibGV0IG5vdGlmIG9mIG5vdGlmczsgbGV0IGkgPSBpbmRleFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnhMYXlvdXQ9XCJyb3dcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwibm90aWYgdHdhLW5vdGlmXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwibm90aWZQYW5lbENsaWNrZWQobm90aWYsIGkpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2ljb24gdHdhLW5vdGlmXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwicGFuZWxJY29uIHR3YS1ub3RpZlwiICpuZ0lmPVwiIW5vdGlmLmltYWdlXCI+bm90aWZpY2F0aW9uczwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cIm5vdGlmSW1hZ2UgdHdhLW5vdGlmXCIgKm5nSWY9XCJub3RpZi5pbWFnZVwiIFtzcmNdPVwibm90aWYuaW1hZ2VcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2NvbnRlbnQgdHdhLW5vdGlmXCIgZnhMYXlvdXQ9XCJjb2x1bW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgY2xhc3M9XCJ0d2Etbm90aWZcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzPVwidHdhLW5vdGlmXCIgZnhGbGV4Pnt7bm90aWYudGl0bGV9fTwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJjbG9zZSB0d2Etbm90aWZcIiBtYXQtaWNvbi1idXR0b24gKGNsaWNrKT1cInJlbW92ZVBhbmVsKG5vdGlmLCBpKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwidHdhLW5vdGlmXCI+Y2xvc2U8L21hdC1pY29uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInR3YS1ub3RpZlwiIGZ4RmxleD57e25vdGlmLm1lc3NhZ2V9fTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L21hdC1jYXJkPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJub3RpZlBhbmVsSGlkZUJ1dHRvbiB0d2Etbm90aWZcIiAoY2xpY2spPVwiaXNPcGVuZWQgPSBmYWxzZVwiIGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cImNlbnRlciBjZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPG1hdC1pY29uPmV4cGFuZF9sZXNzPC9tYXQtaWNvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgIGAsXG4gICAgc3R5bGVzOiBbXG4gICAgICAgICcubm90aWZQYW5lbENvbnRhaW5lciB7IHdpZHRoOiAzMjBweDsgYmFja2dyb3VuZDogI2VlZTsgYm9yZGVyOiAxcHggc29saWQgI2NjYzsnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncGFkZGluZzogMTJweCAxMnB4IDRweCAxMnB4OyBib3gtc2hhZG93OiAwIDJweCAxMHB4IHJnYmEoMCwwLDAsLjIpOyB9JyxcbiAgICAgICAgJy5ub3RpZlBhbmVsSGlkZUJ1dHRvbiB7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDE4cHg7IGJvcmRlci10b3A6IDFweCBzb2xpZCAjY2NjOyBjdXJzb3I6IHBvaW50ZXI7IH0nLFxuICAgICAgICAnZGl2LnBhbmVsVGl0bGUgaDMgeyBjb2xvcjogI2FhYTsgZm9udC13ZWlnaHQ6IDkwMDsgZm9udC1mYW1pbHk6IFJvYm90byBMaWdodDsgZm9udC1zaXplOiAyNnB4OyBtYXJnaW46IDhweDsgfScsXG4gICAgICAgICdkaXYubm90aWZzQ29udGFpbmVyLnNjcm9sbGluZyB7IG1heC1oZWlnaHQ6IDQwOHB4OyBvdmVyZmxvdzogYXV0bzsgfScsXG4gICAgICAgICdtYXQtY2FyZC5ub3RpZiB7IGN1cnNvcjogcG9pbnRlcjsgcGFkZGluZzogMTJweCAxMnB4IDEycHggOHB4OyBtYXJnaW46IDAgMCA4cHggMCFpbXBvcnRhbnQ7IH0nLFxuICAgICAgICAnbWF0LWNhcmQubm90aWYgaDQgeyBmb250LWZhbWlseTogUm9ib3RvIExpZ2h0OyBmb250LXNpemU6IDE2cHg7IG1hcmdpbjogOHB4IDAgMDsgfScsXG4gICAgICAgICdtYXQtY2FyZC5ub3RpZiBwIHsgZm9udC1mYW1pbHk6IFJvYm90byBMaWdodDsgbWFyZ2luOiA4cHggMCAwOyB9JyxcbiAgICAgICAgJy5jaWNvbiB7IHBhZGRpbmc6IDEycHggMTJweCAxMnB4IDRweDsgfScsXG4gICAgICAgICcuY2NvbnRlbnQgeyB3aWR0aDogMTAwJTsgfScsXG4gICAgICAgICdtYXQtaWNvbi5wYW5lbEljb24geyBmb250LXNpemU6IDQwcHg7IGhlaWdodDogNDBweDsgd2lkdGg6IDQwcHg7IGxpbmUtaGVpZ2h0OiA0MHB4OyB9JyxcbiAgICAgICAgJ2ltZy5ub3RpZkltYWdlIHsgd2lkdGg6IDQweDsgaGVpZ2h0OiA0MHB4OyBib3JkZXItcmFkaXVzOiA1MCU7IH0nLFxuICAgICAgICAnYnV0dG9uLmNsb3NlIHsgbWFyZ2luOiAtMTJweCAtMTJweCAwIDA7fScsXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBUV0FNZDJOb3RpZmljYXRpb25zQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASW5wdXQoKSBub3RpZnNTZXJ2aWNlOiBUd2FNZDJOb3RpZmljYXRpb25zU2VydmljZTtcbiAgICBAT3V0cHV0KCkgcGFuZWxDbGlja2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgcGFuZWxDbG9zZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQFZpZXdDaGlsZCgnbm90aWZQYW5lbENvbnRhaW5lcicpIG5vdGlmUGFuZWw7XG5cbiAgICBwcml2YXRlIGdsb2JhbENsaWNrOiBPYnNlcnZhYmxlPEV2ZW50PjtcbiAgICBwcml2YXRlIGxpc3RlbmluZzogYm9vbGVhbjtcblxuICAgIGlzT3BlbmVkID0gZmFsc2U7XG4gICAgbm90aWZzOiBJTm90aWZbXTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9lbFJlZjogRWxlbWVudFJlZixcbiAgICApIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMubm90aWZzU2VydmljZS5nZXQoKS5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgICB0aGlzLm5vdGlmcyA9IGRhdGE7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmdsb2JhbENsaWNrID0gZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKS5waXBlKFxuICAgICAgICAgICAgZGVsYXkoMSksXG4gICAgICAgICAgICB0YXAoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdGVuaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuZ2xvYmFsQ2xpY2suc3Vic2NyaWJlKChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbkdsb2JhbENsaWNrKGV2ZW50KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25HbG9iYWxDbGljayhldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBNb3VzZUV2ZW50ICYmXG4gICAgICAgICAgICB0aGlzLmxpc3RlbmluZyA9PT0gdHJ1ZSAmJlxuICAgICAgICAgICAgdHlwZW9mIHRoaXMubm90aWZQYW5lbCAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgICAgIHRoaXMubm90aWZQYW5lbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLm5vdGlmUGFuZWwubmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLl9lbFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGV2ZW50LnRhcmdldCk7XG4gICAgICAgICAgICBpZiAodGhpcy5pc0Rlc2NlbmRhbnQodGhpcy5ub3RpZlBhbmVsLm5hdGl2ZUVsZW1lbnQsIGV2ZW50LnRhcmdldCkgIT09IHRydWUgJiZcbiAgICAgICAgICAgICAgICB0aGlzLmlzRGVzY2VuZGFudCh0aGlzLl9lbFJlZi5uYXRpdmVFbGVtZW50LCBldmVudC50YXJnZXQpICE9PSB0cnVlICYmXG4gICAgICAgICAgICAgICAgdGhpcy5fZWxSZWYubmF0aXZlRWxlbWVudCAhPT0gZXZlbnQudGFyZ2V0ICYmXG4gICAgICAgICAgICAgICAgIXRoaXMuaGFzQ2xhc3MoZXZlbnQudGFyZ2V0LCAndHdhLW5vdGlmJykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzT3BlbmVkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYXNDbGFzcyhlbGVtLCBjbGFzc05hbWUpIHtcbiAgICAgICAgaWYgKGVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpc0Rlc2NlbmRhbnQocGFyZW50LCBjaGlsZCkge1xuICAgICAgICBsZXQgbm9kZSA9IGNoaWxkO1xuICAgICAgICB3aGlsZSAobm9kZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKG5vZGUgPT09IHBhcmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBub3RpZkNsaWNrZWQoKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZygnbm90aWYgaWNvbiBjbGlja2VkIScpO1xuICAgICAgaWYgKCF0aGlzLmlzT3BlbmVkICYmICF0aGlzLm5vdGlmcy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5pc09wZW5lZCA9ICF0aGlzLmlzT3BlbmVkO1xuICAgIH1cblxuICAgIG5vdGlmUGFuZWxDbGlja2VkKG5vdGlmOiBJTm90aWYsIG5vdGlmSWR4OiBudW1iZXIpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdub3RpZiBwYW5lbCBjbGlja2VkIScsIG5vdGlmKTtcbiAgICAgIGlmICh0eXBlb2Ygbm90aWYuZGF0YSAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgIHR5cGVvZiBub3RpZi5kYXRhLmFjdGlvbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgbm90aWYuZGF0YS5hY3Rpb24obm90aWYpO1xuICAgICAgLy8gfSBlbHNlIHtcbiAgICAgIH1cbiAgICAgIHRoaXMucGFuZWxDbGlja2VkLmVtaXQobm90aWYpO1xuICAgICAgdGhpcy5ub3RpZnNTZXJ2aWNlLnJlbW92ZShub3RpZklkeCk7XG4gICAgICB0aGlzLmNoZWNrSWZPcGVuZWQoKTtcbiAgICB9XG5cbiAgICBjaGVja0lmT3BlbmVkKCkge1xuICAgICAgaWYgKHRoaXMubm90aWZzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aGlzLmlzT3BlbmVkID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmVtb3ZlUGFuZWwobm90aWY6IElOb3RpZiwgbm90aWZJZHg6IG51bWJlcikge1xuICAgICAgdGhpcy5wYW5lbENsb3NlZC5lbWl0KG5vdGlmKTtcbiAgICAgIHRoaXMubm90aWZzU2VydmljZS5yZW1vdmUobm90aWZJZHgpO1xuICAgICAgdGhpcy5jaGVja0lmT3BlbmVkKCk7XG4gICAgfVxuXG4gICAgY2xlYXJQYW5lbHMoKSB7XG4gICAgICBpZiAodGhpcy5ub3RpZnMubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlUGFuZWwodGhpcy5ub3RpZnNbMF0sIDApO1xuICAgICAgICAvLyB0aGlzLm5vdGlmcy5zcGxpY2UoMCwgMSk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuY2xlYXJQYW5lbHMoKTtcbiAgICAgICAgfSwgMTAwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY2hlY2tJZk9wZW5lZCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbm5lY3RlZE92ZXJsYXlEZXRhY2goKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZygnb3ZlcmxheSBkZXRhY2hlZCEnKTtcbiAgICB9XG5cbn1cbiJdfQ==