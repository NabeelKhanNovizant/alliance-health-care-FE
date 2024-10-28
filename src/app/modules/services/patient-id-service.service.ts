import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientIdServiceService {

  patientSelected = new Subject<any>();
  assessmentSelected = new Subject<any>();

  constructor() {}

  selectPatient(patientId: any) {
    this.patientSelected.next(patientId);
  }

  selectAssessment(assessmentId: any) {
    this.assessmentSelected.next(assessmentId);
  }
}
