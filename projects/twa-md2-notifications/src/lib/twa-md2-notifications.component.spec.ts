import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TWAMd2NotificationsComponent } from './twa-md2-notifications.component';

describe('TWAMd2NotificationsComponent', () => {
  let component: TWAMd2NotificationsComponent;
  let fixture: ComponentFixture<TWAMd2NotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TWAMd2NotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TWAMd2NotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
