import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TasksAdmin } from "./tasks.component";

describe("TasksAdmin", () => {
  let component: TasksAdmin;
  let fixture: ComponentFixture<TasksAdmin>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TasksAdmin],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
