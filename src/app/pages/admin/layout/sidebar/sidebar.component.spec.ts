import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SidebarAdmin } from "./sidebar.component";

describe("SidebarAdmin", () => {
  let component: SidebarAdmin;
  let fixture: ComponentFixture<SidebarAdmin>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarAdmin],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
