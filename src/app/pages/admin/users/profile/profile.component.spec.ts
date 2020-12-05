import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { UserProfileAdmin } from "./profile.component";

describe("UserProfileAdmin", () => {
  let component: UserProfileAdmin;
  let fixture: ComponentFixture<UserProfileAdmin>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserProfileAdmin],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
