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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdhLW1kMi1ub3RpZmljYXRpb25zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS5vbGQvam9zZS93b3JrL3NpcmEuZXMvc2lyYS1uZzItY29tcG9uZW50cy9saWItdHdhLW1kL3Byb2plY3RzL3R3YS1tZDItbm90aWZpY2F0aW9ucy9zcmMvIiwic291cmNlcyI6WyJsaWIvdHdhLW1kMi1ub3RpZmljYXRpb25zLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEcsT0FBTyxFQUFFLDBCQUEwQixFQUFVLE1BQU0saUNBQWlDLENBQUM7QUFDckYsT0FBTyxFQUFjLFNBQVMsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM3QyxPQUFPLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLDZDQUE2QztBQWdFN0MsTUFBTSxPQUFPLDRCQUE0QjtJQWFyQyxZQUNZLE1BQWtCO1FBQWxCLFdBQU0sR0FBTixNQUFNLENBQVk7UUFacEIsaUJBQVksR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNyRCxnQkFBVyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBTzlELGFBQVEsR0FBRyxLQUFLLENBQUM7SUFLYixDQUFDO0lBRUwsUUFBUTtRQUNKLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3RDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FDaEQsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUNSLEdBQUcsQ0FB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QUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7WUFDdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLDRCQUE0QjtZQUM1QixVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNkLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNyQixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDVDthQUFNO1lBQ0wsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3RCO0lBQ0gsQ0FBQztJQUVELHNCQUFzQjtRQUNwQixvQ0FBb0M7SUFDdEMsQ0FBQzs7O1lBaExKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsdUJBQXVCO2dCQUNqQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0EyQ1Q7eUJBRUcsZ0ZBQWdGO3dCQUN6RCx1RUFBdUU7b0JBQzlGLG1HQUFtRztvQkFDbkcsK0dBQStHO29CQUMvRyxzRUFBc0U7b0JBQ3RFLCtGQUErRjtvQkFDL0Ysb0ZBQW9GO29CQUNwRixrRUFBa0U7b0JBQ2xFLHlDQUF5QztvQkFDekMsNEJBQTRCO29CQUM1Qix1RkFBdUY7b0JBQ3ZGLGtFQUFrRTtvQkFDbEUsMENBQTBDO2FBRWpEOzs7WUFuRW1FLFVBQVU7Ozs0QkFxRXpFLEtBQUs7MkJBQ0wsTUFBTTswQkFDTixNQUFNO3lCQUVOLFNBQVMsU0FBQyxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgVmlld0NoaWxkLCBFdmVudEVtaXR0ZXIsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFR3YU1kMk5vdGlmaWNhdGlvbnNTZXJ2aWNlLCBJTm90aWYgfSBmcm9tICcuL3R3YS1tZDItbm90aWZpY2F0aW9ucy5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIGZyb21FdmVudCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVsYXksIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbi8vIGltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ3Byb3RyYWN0b3InO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3R3YS1tZDItbm90aWZpY2F0aW9ucycsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gI292ZXJsYXlPcmlnaW49XCJjZGtPdmVybGF5T3JpZ2luXCIgY2RrT3ZlcmxheU9yaWdpbiAoY2xpY2spPVwibm90aWZDbGlja2VkKClcIj5cbiAgICAgICAgICAgIDxtYXQtaWNvbiBbbWF0QmFkZ2VdPVwibm90aWZzLmxlbmd0aFwiIG1hdEJhZGdlU2l6ZT1cIm1lZGl1bVwiICpuZ0lmPVwibm90aWZzLmxlbmd0aFwiPm5vdGlmaWNhdGlvbnM8L21hdC1pY29uPlxuICAgICAgICAgICAgPG1hdC1pY29uICpuZ0lmPVwibm90aWZzLmxlbmd0aD09PTBcIj5ub3RpZmljYXRpb25zX25vbmU8L21hdC1pY29uPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPG5nLXRlbXBsYXRlXG4gICAgICAgICAgICBjZGtDb25uZWN0ZWRPdmVybGF5XG4gICAgICAgICAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheU9yaWdpbl09XCJvdmVybGF5T3JpZ2luXCJcbiAgICAgICAgICAgIFtjZGtDb25uZWN0ZWRPdmVybGF5T3Blbl09XCJpc09wZW5lZFwiXG4gICAgICAgICAgICAoZGV0YWNoKT1cImNvbm5lY3RlZE92ZXJsYXlEZXRhY2goKVwiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxkaXYgI25vdGlmUGFuZWxDb250YWluZXIgY2xhc3M9XCJub3RpZlBhbmVsQ29udGFpbmVyIHR3YS1ub3RpZlwiIGZ4TGF5b3V0R2FwPVwiMTJweFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBjbGFzcz1cInBhbmVsVGl0bGUgdHdhLW5vdGlmXCI+XG4gICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cInR3YS1ub3RpZlwiIGZ4RmxleD5Ob3RpZmljYXRpb25zPC9oMz5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInR3YS1ub3RpZlwiIG1hdC1pY29uLWJ1dHRvbiAoY2xpY2spPVwiY2xlYXJQYW5lbHMoKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwidHdhLW5vdGlmXCI+Y2xlYXJfYWxsPC9tYXQtaWNvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5vdGlmc0NvbnRhaW5lclwiIFtuZ0NsYXNzXT1cInsnc2Nyb2xsaW5nJzogbm90aWZzLmxlbmd0aCA+IDR9XCI+XG4gICAgICAgICAgICAgICAgICAgIDxtYXQtY2FyZCAqbmdGb3I9XCJsZXQgbm90aWYgb2Ygbm90aWZzOyBsZXQgaSA9IGluZGV4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmeExheW91dD1cInJvd1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJub3RpZiB0d2Etbm90aWZcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJub3RpZlBhbmVsQ2xpY2tlZChub3RpZiwgaSlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaWNvbiB0d2Etbm90aWZcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJwYW5lbEljb24gdHdhLW5vdGlmXCIgKm5nSWY9XCIhbm90aWYuaW1hZ2VcIj5ub3RpZmljYXRpb25zPC9tYXQtaWNvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPVwibm90aWZJbWFnZSB0d2Etbm90aWZcIiAqbmdJZj1cIm5vdGlmLmltYWdlXCIgW3NyY109XCJub3RpZi5pbWFnZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjY29udGVudCB0d2Etbm90aWZcIiBmeExheW91dD1cImNvbHVtblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBjbGFzcz1cInR3YS1ub3RpZlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3M9XCJ0d2Etbm90aWZcIiBmeEZsZXg+e3tub3RpZi50aXRsZX19PC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImNsb3NlIHR3YS1ub3RpZlwiIG1hdC1pY29uLWJ1dHRvbiAoY2xpY2spPVwicmVtb3ZlUGFuZWwobm90aWYsIGkpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJ0d2Etbm90aWZcIj5jbG9zZTwvbWF0LWljb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwidHdhLW5vdGlmXCIgZnhGbGV4Pnt7bm90aWYubWVzc2FnZX19PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvbWF0LWNhcmQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5vdGlmUGFuZWxIaWRlQnV0dG9uIHR3YS1ub3RpZlwiIChjbGljayk9XCJpc09wZW5lZCA9IGZhbHNlXCIgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwiY2VudGVyIGNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8bWF0LWljb24+ZXhwYW5kX2xlc3M8L21hdC1pY29uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgYCxcbiAgICBzdHlsZXM6IFtcbiAgICAgICAgJy5ub3RpZlBhbmVsQ29udGFpbmVyIHsgd2lkdGg6IDMyMHB4OyBiYWNrZ3JvdW5kOiAjZWVlOyBib3JkZXI6IDFweCBzb2xpZCAjY2NjOycgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdwYWRkaW5nOiAxMnB4IDEycHggNHB4IDEycHg7IGJveC1zaGFkb3c6IDAgMnB4IDEwcHggcmdiYSgwLDAsMCwuMik7IH0nLFxuICAgICAgICAnLm5vdGlmUGFuZWxIaWRlQnV0dG9uIHsgd2lkdGg6IDEwMCU7IGhlaWdodDogMThweDsgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNjY2M7IGN1cnNvcjogcG9pbnRlcjsgfScsXG4gICAgICAgICdkaXYucGFuZWxUaXRsZSBoMyB7IGNvbG9yOiAjYWFhOyBmb250LXdlaWdodDogOTAwOyBmb250LWZhbWlseTogUm9ib3RvIExpZ2h0OyBmb250LXNpemU6IDI2cHg7IG1hcmdpbjogOHB4OyB9JyxcbiAgICAgICAgJ2Rpdi5ub3RpZnNDb250YWluZXIuc2Nyb2xsaW5nIHsgbWF4LWhlaWdodDogNDA4cHg7IG92ZXJmbG93OiBhdXRvOyB9JyxcbiAgICAgICAgJ21hdC1jYXJkLm5vdGlmIHsgY3Vyc29yOiBwb2ludGVyOyBwYWRkaW5nOiAxMnB4IDEycHggMTJweCA4cHg7IG1hcmdpbjogMCAwIDhweCAwIWltcG9ydGFudDsgfScsXG4gICAgICAgICdtYXQtY2FyZC5ub3RpZiBoNCB7IGZvbnQtZmFtaWx5OiBSb2JvdG8gTGlnaHQ7IGZvbnQtc2l6ZTogMTZweDsgbWFyZ2luOiA4cHggMCAwOyB9JyxcbiAgICAgICAgJ21hdC1jYXJkLm5vdGlmIHAgeyBmb250LWZhbWlseTogUm9ib3RvIExpZ2h0OyBtYXJnaW46IDhweCAwIDA7IH0nLFxuICAgICAgICAnLmNpY29uIHsgcGFkZGluZzogMTJweCAxMnB4IDEycHggNHB4OyB9JyxcbiAgICAgICAgJy5jY29udGVudCB7IHdpZHRoOiAxMDAlOyB9JyxcbiAgICAgICAgJ21hdC1pY29uLnBhbmVsSWNvbiB7IGZvbnQtc2l6ZTogNDBweDsgaGVpZ2h0OiA0MHB4OyB3aWR0aDogNDBweDsgbGluZS1oZWlnaHQ6IDQwcHg7IH0nLFxuICAgICAgICAnaW1nLm5vdGlmSW1hZ2UgeyB3aWR0aDogNDB4OyBoZWlnaHQ6IDQwcHg7IGJvcmRlci1yYWRpdXM6IDUwJTsgfScsXG4gICAgICAgICdidXR0b24uY2xvc2UgeyBtYXJnaW46IC0xMnB4IC0xMnB4IDAgMDt9JyxcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIFRXQU1kMk5vdGlmaWNhdGlvbnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBJbnB1dCgpIG5vdGlmc1NlcnZpY2U6IFR3YU1kMk5vdGlmaWNhdGlvbnNTZXJ2aWNlO1xuICAgIEBPdXRwdXQoKSBwYW5lbENsaWNrZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBwYW5lbENsb3NlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAVmlld0NoaWxkKCdub3RpZlBhbmVsQ29udGFpbmVyJykgbm90aWZQYW5lbDtcblxuICAgIHByaXZhdGUgZ2xvYmFsQ2xpY2s6IE9ic2VydmFibGU8RXZlbnQ+O1xuICAgIHByaXZhdGUgbGlzdGVuaW5nOiBib29sZWFuO1xuXG4gICAgaXNPcGVuZWQgPSBmYWxzZTtcbiAgICBub3RpZnM6IElOb3RpZltdO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX2VsUmVmOiBFbGVtZW50UmVmLFxuICAgICkgeyB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5ub3RpZnNTZXJ2aWNlLmdldCgpLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgICAgIHRoaXMubm90aWZzID0gZGF0YTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZ2xvYmFsQ2xpY2sgPSBmcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpLnBpcGUoXG4gICAgICAgICAgICBkZWxheSgxKSxcbiAgICAgICAgICAgIHRhcCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0ZW5pbmcgPSB0cnVlO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5nbG9iYWxDbGljay5zdWJzY3JpYmUoKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uR2xvYmFsQ2xpY2soZXZlbnQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbkdsb2JhbENsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIE1vdXNlRXZlbnQgJiZcbiAgICAgICAgICAgIHRoaXMubGlzdGVuaW5nID09PSB0cnVlICYmXG4gICAgICAgICAgICB0eXBlb2YgdGhpcy5ub3RpZlBhbmVsICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgICAgdGhpcy5ub3RpZlBhbmVsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMubm90aWZQYW5lbC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuX2VsUmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzRGVzY2VuZGFudCh0aGlzLm5vdGlmUGFuZWwubmF0aXZlRWxlbWVudCwgZXZlbnQudGFyZ2V0KSAhPT0gdHJ1ZSAmJlxuICAgICAgICAgICAgICAgIHRoaXMuaXNEZXNjZW5kYW50KHRoaXMuX2VsUmVmLm5hdGl2ZUVsZW1lbnQsIGV2ZW50LnRhcmdldCkgIT09IHRydWUgJiZcbiAgICAgICAgICAgICAgICB0aGlzLl9lbFJlZi5uYXRpdmVFbGVtZW50ICE9PSBldmVudC50YXJnZXQgJiZcbiAgICAgICAgICAgICAgICAhdGhpcy5oYXNDbGFzcyhldmVudC50YXJnZXQsICd0d2Etbm90aWYnKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNPcGVuZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhc0NsYXNzKGVsZW0sIGNsYXNzTmFtZSkge1xuICAgICAgICBpZiAoZWxlbS5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlzRGVzY2VuZGFudChwYXJlbnQsIGNoaWxkKSB7XG4gICAgICAgIGxldCBub2RlID0gY2hpbGQ7XG4gICAgICAgIHdoaWxlIChub2RlICE9PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAobm9kZSA9PT0gcGFyZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIG5vdGlmQ2xpY2tlZCgpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdub3RpZiBpY29uIGNsaWNrZWQhJyk7XG4gICAgICBpZiAoIXRoaXMuaXNPcGVuZWQgJiYgIXRoaXMubm90aWZzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLmlzT3BlbmVkID0gIXRoaXMuaXNPcGVuZWQ7XG4gICAgfVxuXG4gICAgbm90aWZQYW5lbENsaWNrZWQobm90aWY6IElOb3RpZiwgbm90aWZJZHg6IG51bWJlcikge1xuICAgICAgLy8gY29uc29sZS5sb2coJ25vdGlmIHBhbmVsIGNsaWNrZWQhJywgbm90aWYpO1xuICAgICAgaWYgKHR5cGVvZiBub3RpZi5kYXRhICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgdHlwZW9mIG5vdGlmLmRhdGEuYWN0aW9uICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBub3RpZi5kYXRhLmFjdGlvbihub3RpZik7XG4gICAgICAvLyB9IGVsc2Uge1xuICAgICAgfVxuICAgICAgdGhpcy5wYW5lbENsaWNrZWQuZW1pdChub3RpZik7XG4gICAgICB0aGlzLm5vdGlmc1NlcnZpY2UucmVtb3ZlKG5vdGlmSWR4KTtcbiAgICAgIHRoaXMuY2hlY2tJZk9wZW5lZCgpO1xuICAgIH1cblxuICAgIGNoZWNrSWZPcGVuZWQoKSB7XG4gICAgICBpZiAodGhpcy5ub3RpZnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRoaXMuaXNPcGVuZWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZW1vdmVQYW5lbChub3RpZjogSU5vdGlmLCBub3RpZklkeDogbnVtYmVyKSB7XG4gICAgICB0aGlzLnBhbmVsQ2xvc2VkLmVtaXQobm90aWYpO1xuICAgICAgdGhpcy5ub3RpZnNTZXJ2aWNlLnJlbW92ZShub3RpZklkeCk7XG4gICAgICB0aGlzLmNoZWNrSWZPcGVuZWQoKTtcbiAgICB9XG5cbiAgICBjbGVhclBhbmVscygpIHtcbiAgICAgIGlmICh0aGlzLm5vdGlmcy5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVQYW5lbCh0aGlzLm5vdGlmc1swXSwgMCk7XG4gICAgICAgIC8vIHRoaXMubm90aWZzLnNwbGljZSgwLCAxKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5jbGVhclBhbmVscygpO1xuICAgICAgICB9LCAxMDApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jaGVja0lmT3BlbmVkKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29ubmVjdGVkT3ZlcmxheURldGFjaCgpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdvdmVybGF5IGRldGFjaGVkIScpO1xuICAgIH1cblxufVxuIl19