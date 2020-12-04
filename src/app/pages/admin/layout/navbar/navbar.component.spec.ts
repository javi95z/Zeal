import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NavbarAdmin } from "./navbar.component";

describe("NavbarAdmin", () => {
  let component: NavbarAdmin;
  let fixture: ComponentFixture<NavbarAdmin>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarAdmin],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
