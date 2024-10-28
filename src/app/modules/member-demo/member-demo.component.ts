import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { PatientComponent } from '../patients/components/patient/patient.component';
import { PatientIdServiceService } from '../services/patient-id-service.service';
import { ActivatedRoute } from '@angular/router';
import { PatientsInfoService } from '../services/patients-info.service';
import { map, Observable, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { CarePlanModel } from '../../models/care-plan-model';
import { CarePlanService } from '../services/care-plan-service.service';
import { Patient } from '../../models/patient';

@Component({
  selector: 'app-member-demo',
  templateUrl: './member-demo.component.html',
  styleUrl: './member-demo.component.scss'
})
export class MemberDemoComponent implements OnInit {
  carePlanModel: CarePlanModel | null = null;
  patient: Patient | null = null;

  constructor(private carePlanService: CarePlanService) {}


  ngOnInit() {
    this.carePlanService.currentCarePlanModel.subscribe((model) => {
      this.patient = model?.patient || null; 
      console.log('Patient in Care Plan Model:', this.patient);
    });
  }
}
  // getcarePlan(assessmentId: number): void {
  //   this.patientsInfoService.getCarePlan(this.assessmentId).subscribe(
  //     (carePlan) => {
  //       console.log('Care Plan fetched for assessment:', carePlan);
  //     },
  //     (error) => {
  //       console.error('Error fetching care plan:', error);
  //     }
  //   );
  // }