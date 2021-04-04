import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAdditionalComponent } from './customer-additional.component';

describe('CustomerAdditionalComponent', () => {
  let component: CustomerAdditionalComponent;
  let fixture: ComponentFixture<CustomerAdditionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerAdditionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAdditionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
