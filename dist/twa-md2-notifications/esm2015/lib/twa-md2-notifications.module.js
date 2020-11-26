import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
// import { TwaMd2NotificationsService } from './twa-md2-notifications.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatBadgeModule } from '@angular/material/badge';
import { TWAMd2NotificationsComponent } from './twa-md2-notifications.component';
export class TWAMd2NotificationsModule {
}
TWAMd2NotificationsModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FlexLayoutModule,
                    MatCardModule,
                    MatButtonModule,
                    MatIconModule,
                    OverlayModule,
                    MatBadgeModule,
                ],
                declarations: [
                    TWAMd2NotificationsComponent,
                ],
                exports: [
                    OverlayModule,
                    TWAMd2NotificationsComponent,
                ],
                // entryComponents: [
                //     TWAMd2NotificationsComponent,
                // ],
                providers: [
                    TWAMd2NotificationsComponent,
                ],
                schemas: [
                    CUSTOM_ELEMENTS_SCHEMA
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdhLW1kMi1ub3RpZmljYXRpb25zLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi9wcm9qZWN0cy90d2EtbWQyLW5vdGlmaWNhdGlvbnMvc3JjLyIsInNvdXJjZXMiOlsibGliL3R3YS1tZDItbm90aWZpY2F0aW9ucy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELGdGQUFnRjtBQUVoRixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFekQsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFnQ2pGLE1BQU0sT0FBTyx5QkFBeUI7OztZQTlCckMsUUFBUSxTQUFDO2dCQUNOLE9BQU8sRUFBRTtvQkFDTCxZQUFZO29CQUNaLGdCQUFnQjtvQkFDaEIsYUFBYTtvQkFDYixlQUFlO29CQUNmLGFBQWE7b0JBQ2IsYUFBYTtvQkFDYixjQUFjO2lCQUVqQjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1YsNEJBQTRCO2lCQUUvQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ0wsYUFBYTtvQkFDYiw0QkFBNEI7aUJBRS9CO2dCQUNELHFCQUFxQjtnQkFDckIsb0NBQW9DO2dCQUNwQyxLQUFLO2dCQUNMLFNBQVMsRUFBRTtvQkFDUCw0QkFBNEI7aUJBQy9CO2dCQUNELE9BQU8sRUFBRTtvQkFDTCxzQkFBc0I7aUJBQ3pCO2FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZsZXhMYXlvdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mbGV4LWxheW91dCc7XG5pbXBvcnQgeyBNYXRDYXJkTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY2FyZCc7XG4vLyBpbXBvcnQgeyBUd2FNZDJOb3RpZmljYXRpb25zU2VydmljZSB9IGZyb20gJy4vdHdhLW1kMi1ub3RpZmljYXRpb25zLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24nO1xuaW1wb3J0IHsgTWF0SWNvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2ljb24nO1xuaW1wb3J0IHsgT3ZlcmxheU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IE1hdEJhZGdlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYmFkZ2UnO1xuXG5pbXBvcnQgeyBUV0FNZDJOb3RpZmljYXRpb25zQ29tcG9uZW50IH0gZnJvbSAnLi90d2EtbWQyLW5vdGlmaWNhdGlvbnMuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgRmxleExheW91dE1vZHVsZSxcbiAgICAgICAgTWF0Q2FyZE1vZHVsZSxcbiAgICAgICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgICAgICBNYXRJY29uTW9kdWxlLFxuICAgICAgICBPdmVybGF5TW9kdWxlLFxuICAgICAgICBNYXRCYWRnZU1vZHVsZSxcbiAgICAgICAgLy8gVFdBTWQyTm90aWZpY2F0aW9uc0NvbXBvbmVudCxcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBUV0FNZDJOb3RpZmljYXRpb25zQ29tcG9uZW50LFxuICAgICAgICAvLyBUd2FNZDJOb3RpZmljYXRpb25zU2VydmljZSxcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgT3ZlcmxheU1vZHVsZSxcbiAgICAgICAgVFdBTWQyTm90aWZpY2F0aW9uc0NvbXBvbmVudCxcbiAgICAgICAgLy8gVHdhTWQyTm90aWZpY2F0aW9uc1NlcnZpY2UsXG4gICAgXSxcbiAgICAvLyBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICAvLyAgICAgVFdBTWQyTm90aWZpY2F0aW9uc0NvbXBvbmVudCxcbiAgICAvLyBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBUV0FNZDJOb3RpZmljYXRpb25zQ29tcG9uZW50LFxuICAgIF0sXG4gICAgc2NoZW1hczogW1xuICAgICAgICBDVVNUT01fRUxFTUVOVFNfU0NIRU1BXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBUV0FNZDJOb3RpZmljYXRpb25zTW9kdWxlIHsgfVxuIl19