import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranFormEditComponent } from './fran-form-edit.component';

describe('FranFormEditComponent', () => {
  let component: FranFormEditComponent;
  let fixture: ComponentFixture<FranFormEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranFormEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranFormEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
