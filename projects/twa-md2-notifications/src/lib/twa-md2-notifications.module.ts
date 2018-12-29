import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
// import { TwaMd2NotificationsService } from './twa-md2-notifications.service';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { OverlayModule } from '@angular/cdk/overlay';

import { TWAMd2NotificationsComponent } from './twa-md2-notifications.component';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        OverlayModule,
        // TWAMd2NotificationsComponent,
    ],
    declarations: [
        TWAMd2NotificationsComponent,
        // TwaMd2NotificationsService,
    ],
    exports: [
        OverlayModule,
        TWAMd2NotificationsComponent,
        // TwaMd2NotificationsService,
    ],
    entryComponents: [
        TWAMd2NotificationsComponent,
    ],
    providers: [
        TWAMd2NotificationsComponent,
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class TWAMd2NotificationsModule { }
