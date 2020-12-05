import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { UsersAdmin } from "./users.component";

describe("UsersAdmin", () => {
  let component: UsersAdmin;
  let fixture: ComponentFixture<UsersAdmin>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UsersAdmin],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
