import { TestBed } from '@angular/core/testing';

import { TwaMd2DialogsService } from './twa-md2-dialogs.service';

describe('TwaMd2DialogsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TwaMd2DialogsService = TestBed.get(TwaMd2DialogsService);
    expect(service).toBeTruthy();
  });
});
