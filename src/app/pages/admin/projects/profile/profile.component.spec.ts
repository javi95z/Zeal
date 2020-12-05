import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ProjectProfileAdmin } from "./profile.component";

describe("ProjectProfileAdmin", () => {
  let component: ProjectProfileAdmin;
  let fixture: ComponentFixture<ProjectProfileAdmin>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectProfileAdmin],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectProfileAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
