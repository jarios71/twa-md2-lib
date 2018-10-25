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
                    fxFlex: '50%'
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
