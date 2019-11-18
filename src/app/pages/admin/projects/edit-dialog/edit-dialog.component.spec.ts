import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProjectDialog } from './edit-dialog.component';

describe('EditProjectDialog', () => {
  let component: EditProjectDialog;
  let fixture: ComponentFixture<EditProjectDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProjectDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProjectDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
