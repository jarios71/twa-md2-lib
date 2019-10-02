import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwaMd2DialogsComponent } from './twa-md2-dialogs.component';

describe('TwaMd2DialogsComponent', () => {
  let component: TwaMd2DialogsComponent;
  let fixture: ComponentFixture<TwaMd2DialogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwaMd2DialogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwaMd2DialogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
