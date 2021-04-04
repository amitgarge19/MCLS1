import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustBasicFormComponent } from './cust-basic-form.component';

describe('CustBasicFormComponent', () => {
  let component: CustBasicFormComponent;
  let fixture: ComponentFixture<CustBasicFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustBasicFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustBasicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
