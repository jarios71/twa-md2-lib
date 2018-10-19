this.dialogsService
        .confirm(
            'Confirm Dialog',
            'This dialog allows you to display a message and set response options.',
            'Send',
            'Cancel'
        )
        .subscribe(res => {
            console.log(res);
        }
    );
