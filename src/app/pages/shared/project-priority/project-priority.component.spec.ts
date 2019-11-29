import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPriorityComponent } from './project-priority.component';

describe('ProjectPriorityComponent', () => {
  let component: ProjectPriorityComponent;
  let fixture: ComponentFixture<ProjectPriorityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectPriorityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectPriorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
