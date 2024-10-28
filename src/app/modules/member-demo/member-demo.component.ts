import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { PatientComponent } from '../patients/components/patient/patient.component';
import { PatientIdServiceService } from '../services/patient-id-service.service';
import { ActivatedRoute } from '@angular/router';
import { PatientsInfoService } from '../services/patients-info.service';
import { map, Observable, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-member-demo',
  templateUrl: './member-demo.component.html',
  styleUrl: './member-demo.component.scss'
})
export class MemberDemoComponent  {
 patientId!: number;
 patients: any[] = [];  
 patientControl = new FormControl('');
 filteredPatients: Observable<any[]> | undefined;



  constructor(private route: ActivatedRoute, private patientsInfoService: PatientsInfoService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.patientId = params['id'];
      if (this.patientId) {
        this.loadPatientData();
      }
    });
  }

  private loadPatientData() {
    console.log('DEMO:', this.patientId);
    // this.getcarePlan(this.assessmentId);
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

  getAllPatients(): void {
    this.patientsInfoService.getAllPatients().subscribe(
      (allPatients) => {
        console.log("AllPatients", allPatients);
        this.patients = allPatients.map((patient: any) => ({
          id: patient.patientMasterId,
          name: `${patient.firstName} ${patient.lastName}`,
          email: patient.email,
          dob: patient.dob
        }));

        this.filteredPatients = this.patientControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterPatients(value || ''))
        );
      },
      (error) => {
        console.error('Error fetching patients:', error);
      }
    );
  }
  private _filterPatients(value: string): any[] {
    const filterValue = this._normalizeValue(value);
    return this.patients.filter(patient =>
      this._normalizeValue(patient.name).includes(filterValue)
    );
  }
  
  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

}