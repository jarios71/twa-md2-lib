# twa-md2-notifications

This module makes it easy to generate silent notifications and interact with them.

The notifications can be customizable and provide a service that makes them accessible throughout the application.

## Installation

npm way:

npm i twa-md2-notifications --save

## Usage

First, include the module in your app module:

```typescript
import { TwaMd2NotificationsModule } from 'twa-md2-notifications';

@NgModule({
    imports: [
        ...
        TwaMd2NotificationsModule,
        ...
    ],
    ...
})
```

And you can start to launch notifications:

```typescript
import { TwaMd2NotificationsModule } from 'twa-md2-notifications';

export class AppComponent {

    constructor(
        private notifsService: TwaMd2NotificationsModule
    ) {
        this.notifsService.add({
            title: 'Hi! I\'m a notification',
            message: 'I\'m part of another component from this library',
            date: '',
            data: {
                type: 'notification',
                action: (notif) => {
                    console.log('Callback successful!!', notif);
                }
            }
        });
    }

```

