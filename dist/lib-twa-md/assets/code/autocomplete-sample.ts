this.dialogsService
        .prompt(
            'Dialog with autocomplete',
            'Here we show a text field with autocomplete.',
            [
                {
                    key: 'field1',
                    label: 'Autocomplete field',
                    type: 'text',
                    value: '',
                    fxFlex: '100',
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
