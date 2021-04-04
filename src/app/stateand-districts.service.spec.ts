import { TestBed } from '@angular/core/testing';

import { StateandDistrictsService } from './stateand-districts.service';

describe('StateandDistrictsService', () => {
  let service: StateandDistrictsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateandDistrictsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
