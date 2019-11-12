import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionTableMenuComponent } from './action-table-menu.component';

describe('ActionTableMenuComponent', () => {
  let component: ActionTableMenuComponent;
  let fixture: ComponentFixture<ActionTableMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionTableMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionTableMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
