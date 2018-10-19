import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AlertSampleComponent } from './components/alert-sample.component';
import { ConfirmSampleComponent } from './components/confirm-sample.component';
import { AutocompleteSampleComponent } from './components/autocomplete-sample.component';
import { FormSampleComponent } from './components/form-sample.component';

export const appRoutes: Routes = [
    { path: 'alert-sample', component: AlertSampleComponent },
    { path: 'confirm-sample', component: ConfirmSampleComponent },
    { path: 'autocomplete-sample', component: AutocompleteSampleComponent },
    { path: 'form-sample', component: FormSampleComponent },
];
