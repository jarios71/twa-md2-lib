import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { TWAFilterEditorComponent } from './twa-md2-filter-editor.component';
import { TWAFilterEditorService } from './twa-md2-filter-editor.service';
import { FieldFilter } from './twa-md2-filter-editor.interface';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatSelectModule,
        MatChipsModule,
        MatInputModule,
        MatButtonModule,
        FlexLayoutModule,
        MatTooltipModule,
        MatMenuModule,
        DragDropModule,
    ],
    declarations: [
        TWAFilterEditorComponent,
    ],
    exports: [
        TWAFilterEditorComponent,
    ],
    providers: [
        TWAFilterEditorService
    ]
})
export class TWAFilterEditorModule {}
