import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserIconsComponent } from './user-icons.component';

describe('UserIconsComponent', () => {
  let component: UserIconsComponent;
  let fixture: ComponentFixture<UserIconsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserIconsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
