import { TestBed, inject } from '@angular/core/testing';

import { TwaMd2NotificationsService } from './twa-md2-notifications.service';

describe('TwaMd2NotificationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TwaMd2NotificationsService]
    });
  });

  it('should be created', inject([TwaMd2NotificationsService], (service: TwaMd2NotificationsService) => {
    expect(service).toBeTruthy();
  }));
});
