this.dialogsService
        .confirm(
            'Alert dialog',
            'This dialog only contains a text and a closing button.',
            'Close'
        )
        .subscribe(res => {
            console.log(res);
        }
    );
