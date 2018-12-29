import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwaMd2FilterEditorComponent } from './twa-md2-filter-editor.component';

describe('TwaMd2FilterEditorComponent', () => {
  let component: TwaMd2FilterEditorComponent;
  let fixture: ComponentFixture<TwaMd2FilterEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwaMd2FilterEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwaMd2FilterEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
