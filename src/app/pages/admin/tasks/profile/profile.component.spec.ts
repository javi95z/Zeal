import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TaskProfileAdmin } from "./profile.component";

describe("TaskProfileAdmin", () => {
  let component: TaskProfileAdmin;
  let fixture: ComponentFixture<TaskProfileAdmin>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskProfileAdmin],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskProfileAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
