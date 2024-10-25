import { TestBed } from '@angular/core/testing';

import { PatientsInfoService } from './patients-info.service';

describe('PatientsInfoService', () => {
  let service: PatientsInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientsInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
