import { TestBed, inject } from '@angular/core/testing';

import { TwaMd2FilterEditorService } from './twa-md2-filter-editor.service';

describe('TwaMd2FilterEditorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TwaMd2FilterEditorService]
    });
  });

  it('should be created', inject([TwaMd2FilterEditorService], (service: TwaMd2FilterEditorService) => {
    expect(service).toBeTruthy();
  }));
});
