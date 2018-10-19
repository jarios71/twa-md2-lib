import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwaMd2NotificationsComponent } from './twa-md2-notifications.component';

describe('TwaMd2NotificationsComponent', () => {
  let component: TwaMd2NotificationsComponent;
  let fixture: ComponentFixture<TwaMd2NotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwaMd2NotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwaMd2NotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
