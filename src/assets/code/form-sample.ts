this.dialogsService
        .prompt(
            'Dialog with simple form',
            'Here we show a simple form',
            [
                {
                    key: 'name',
                    label: 'Name',
                    type: 'text',
                    value: '',
                    fxFlex: '100%',
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
                    key: 'date',
                    label: 'Date',
                    type: 'date',
                    value: '',
                    fxFlex: '100%'
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
            ],
            'Send',
            'Cancel')
        .subscribe(res => {
            console.log(res);
        }
    );
