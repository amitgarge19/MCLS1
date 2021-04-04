import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranProfileComponent } from './fran-profile.component';

describe('FranProfileComponent', () => {
  let component: FranProfileComponent;
  let fixture: ComponentFixture<FranProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
