import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranFormComponent } from './fran-form.component';

describe('FranFormComponent', () => {
  let component: FranFormComponent;
  let fixture: ComponentFixture<FranFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
