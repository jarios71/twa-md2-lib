import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSortModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
// import { MatModule } from '@angular/material/';
import { FlexLayoutModule } from '@angular/flex-layout';

import { TWADialogsModule, TWAConfirmDialogComponent, TWAPromptDialogComponent } from 'twa-md2-dialogs';
// import { TWADialogsModule } from '../../projects/twa-md2-dialogs/src/public_api';
import { TWAMd2NotificationsModule } from 'twa-md2-notifications';
// import { TWAFilterEditorModule } from 'twa-md2-filter-editor';
// import { TWADialogsModule } from '../../projects/twa-md2-dialogs/src/lib/twa-dialogs.module';
// import { TWAMd2NotificationsModule } from '../../projects/twa-md2-notifications/src/public_api';
import { TWAFilterEditorModule } from '../../projects/twa-md2-filter-editor/src/lib/twa-md2-filter-editor.module';

import { appRoutes } from './app.routing';
import { AppComponent } from './app.component';

import { AlertSampleComponent } from './components/alert-sample.component';
import { ConfirmSampleComponent } from './components/confirm-sample.component';
import { AutocompleteSampleComponent } from './components/autocomplete-sample.component';
import { FormSampleComponent } from './components/form-sample.component';
import { FilterEditorSampleComponent } from './components/filter-editor-sample.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { EllipsisPipe } from './pipes/ellipsis.pipe';

import { HighlightModule } from 'ngx-highlightjs';

import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import typescript from 'highlight.js/lib/languages/typescript';

/**
 * Import every language you wish to highlight here
 * NOTE: The name of each language must match the file name its imported from
 */
export function hljsLanguages() {
    return [
        {name: 'typescript', func: typescript},
        {name: 'css', func: css},
        {name: 'xml', func: xml}
    ];
}

@NgModule({
  declarations: [
    AppComponent,
    AlertSampleComponent,
    ConfirmSampleComponent,
    AutocompleteSampleComponent,
    FormSampleComponent,
    FilterEditorSampleComponent,
    EllipsisPipe,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    TWADialogsModule,
    HttpClientModule,
    TWAMd2NotificationsModule,
    TWAFilterEditorModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatToolbarModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatSortModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatDialogModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatGridListModule,
    FlexLayoutModule,
    HighlightModule.forRoot({
        languages: hljsLanguages
    }),
  ],
  providers: [
      HttpClient,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
