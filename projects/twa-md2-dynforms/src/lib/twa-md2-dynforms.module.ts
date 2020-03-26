import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { TWAMd2DynformsComponent } from './twa-md2-dynforms.component';

@NgModule({
  declarations: [TWAMd2DynformsComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatRadioModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    NgxMaterialTimepickerModule,
  ],
  exports: [TWAMd2DynformsComponent],
  entryComponents: [TWAMd2DynformsComponent],
})
export class TWAMd2DynformsModule { }
