import { Component, ViewChild } from '@angular/core';

import { TWAMd2DynformsComponent } from './../../../projects/twa-md2-dynforms/src/lib/twa-md2-dynforms.component';
declare var require: any;       // To avoid compilation errors with "require"...

// import { TWADialogsModule } from '../../../projects/twa-md2-dialogs/src/public_api';


@Component({
    selector: 'dynform-sample',
    templateUrl: './dynform-sample.component.html',
})
export class DynFormSampleComponent {

    title = 'ld';
    demoForm: string = require('!!raw-loader!./../../assets/code/dynform-sample.ts.txt');
    responseForm = '';
    formFields = [
      {
          key: 'name',
          label: 'Name',
          type: 'text',
          value: '',
          fxFlex: '100%',
          validation: {
              required: true
          },
          validationMessages: {
              required: 'Please, we need your name...'
          }
      },
      {
          key: 'password',
          label: 'Pasword',
          type: 'password',
          value: '',
          fxFlex: '50%',
          validationMessages: {
              required: 'El campo es requerido'
          }
      },
      {
          key: 'password2',
          label: 'Confirm pasword',
          type: 'password',
          value: '',
          fxFlex: '50%',
          validation: {
              match: 'password'
          }
      },
      {
          key: 'file1',
          label: 'Add file',
          type: 'file',
          value: '',
          fxFlex: '100%'
      },
      {
          key: 'sex',
          label: 'Sex',
          type: 'select',
          value: '',
          fxFlex: '50%',
          options: [
              {
                  label: 'Male',
                  value: '1'
              },
              {
                  label: 'Female',
                  value: '2'
              },
          ]
      },
      {
          key: 'age',
          label: 'Age',
          type: 'number',
          value: '',
          fxFlex: '50%',
          validation: {
              min: '10',
              max: '30',
          },
          validationMessages: {
              min: 'You can\'t register under age of 10',
              max: 'You\'re too older! XD',
          }
      },
      {
          key: 'field1',
          label: 'Autocomplete field',
          type: 'text',
          value: '',
          fxFlex: '100%',
          autocomplete: {
              forceSelect: true,
              options: [
                  'first option',
                  'second option',
                  'third option',
                  'fourth option'
              ]
          }
      },
      {
          key: 'date',
          label: 'Date',
          type: 'date',
          value: '',
          fxFlex: 'false'
      },
    ];
    @ViewChild('dynform', {static: true})
    dynform: TWAMd2DynformsComponent;

    constructor() {
        fetch('./assets/code/dynform-sample.ts.txt').then(response => {
            response.text().then(text => {
                this.demoForm = text;
            });
        });
    }

    getData() {
      console.log(this.dynform.form);
    }

}
