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

import { Ng2HandySyntaxHighlighterModule } from 'ng2-handy-syntax-highlighter';

import { TWADialogsModule, TWAConfirmDialogComponent, TWAPromptDialogComponent } from 'twa-md2-dialogs';
import { TwaMd2NotificationsModule } from 'twa-md2-notifications';

import { appRoutes } from './app.routing';
import { AppComponent } from './app.component';

import { AlertSampleComponent } from './components/alert-sample.component';
import { ConfirmSampleComponent } from './components/confirm-sample.component';
import { AutocompleteSampleComponent } from './components/autocomplete-sample.component';
import { FormSampleComponent } from './components/form-sample.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertSampleComponent,
    ConfirmSampleComponent,
    AutocompleteSampleComponent,
    FormSampleComponent

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    TWADialogsModule,
    TwaMd2NotificationsModule,
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
    Ng2HandySyntaxHighlighterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
