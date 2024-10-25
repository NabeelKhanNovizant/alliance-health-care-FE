import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { PatientComponent } from '../patients/components/patient/patient.component';

@Component({
  selector: 'app-member-demo',
  templateUrl: './member-demo.component.html',
  styleUrl: './member-demo.component.scss'
})
export class MemberDemoComponent implements OnInit {
  SelectedPatient: any = null;
  SelectedAssessment: any = null;
  @ViewChild(PatientComponent, { static: false }) patientComponent!: PatientComponent;

  constructor() {}

  ngOnInit(): void {}

  onPatientSelected(patientId: any) {
    this.SelectedPatient = patientId;
    console.log('Selected Patient ID in MemberDemoComponent:', this.SelectedPatient);
  }

  onAssessmentSelected(assessmentId: any) {
    this.SelectedAssessment = assessmentId;
    console.log('Selected Assessment ID in MemberDemoComponent:', this.SelectedAssessment);
  }
}


