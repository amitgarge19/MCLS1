import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranBasicFormComponent } from './fran-basic-form.component';

describe('FranBasicFormComponent', () => {
  let component: FranBasicFormComponent;
  let fixture: ComponentFixture<FranBasicFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranBasicFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranBasicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
