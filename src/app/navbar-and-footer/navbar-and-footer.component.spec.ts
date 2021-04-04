import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarAndFooterComponent } from './navbar-and-footer.component';

describe('NavbarAndFooterComponent', () => {
  let component: NavbarAndFooterComponent;
  let fixture: ComponentFixture<NavbarAndFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarAndFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarAndFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
