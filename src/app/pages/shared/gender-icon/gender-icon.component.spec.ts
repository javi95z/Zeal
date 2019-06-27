import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenderIconComponent } from './gender-icon.component';

describe('GenderIconComponent', () => {
  let component: GenderIconComponent;
  let fixture: ComponentFixture<GenderIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenderIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenderIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
