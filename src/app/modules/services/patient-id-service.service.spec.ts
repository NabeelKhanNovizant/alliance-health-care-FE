import { TestBed } from '@angular/core/testing';

import { PatientIdServiceService } from './patient-id-service.service';

describe('PatientIdServiceService', () => {
  let service: PatientIdServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientIdServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
