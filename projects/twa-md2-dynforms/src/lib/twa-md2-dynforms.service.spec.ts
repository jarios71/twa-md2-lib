import { TestBed } from '@angular/core/testing';

import { TwaMd2DynformsService } from './twa-md2-dynforms.service';

describe('TwaMd2DynformsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TwaMd2DynformsService = TestBed.get(TwaMd2DynformsService);
    expect(service).toBeTruthy();
  });
});
