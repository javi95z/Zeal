import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ProjectsAdmin } from "./projects.component";

describe("ProjectsAdmin", () => {
  let component: ProjectsAdmin;
  let fixture: ComponentFixture<ProjectsAdmin>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectsAdmin],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
