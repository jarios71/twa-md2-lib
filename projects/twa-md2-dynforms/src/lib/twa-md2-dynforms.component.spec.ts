import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwaMd2DynformsComponent } from './twa-md2-dynforms.component';

describe('TwaMd2DynformsComponent', () => {
  let component: TwaMd2DynformsComponent;
  let fixture: ComponentFixture<TwaMd2DynformsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwaMd2DynformsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwaMd2DynformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
