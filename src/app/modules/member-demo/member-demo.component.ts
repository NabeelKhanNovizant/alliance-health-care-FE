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
  patientControl = new FormControl('');
  newcarePlanModel: CarePlanModel = new CarePlanModel();
  patients: Patient[] = [];
  selectedPatient: any = null;
  filteredPatients: Observable<Patient[]> | undefined;
  loading: boolean = false;

  patientdetails: Patient | null = null;

  constructor(
    private carePlanService: CarePlanService,
    private patientsInfoService: PatientsInfoService,
    private cdRef: ChangeDetectorRef

  ) {}

  ngOnInit() {
    this.filteredPatients = this.patientControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterPatients(value || ''))
    );
    this.getAllPatients();
  }

  getAllPatients(): void {
    this.loading = true;
    this.cdRef.detectChanges(); 

    this.patientsInfoService.getAllPatients().subscribe(
      (allPatients) => {
        this.patients = allPatients;
        this.loading = false;
        this.cdRef.detectChanges(); 

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

  onPatientSelected(patient: Patient) {
    this.selectedPatient = patient;  
    this.newcarePlanModel.patient = patient;
    this.patientdetails = patient;  
    this.patientControl.setValue(patient.firstName + ' ' + patient.lastName);
  
    // Update the CarePlanModel in the service
    this.carePlanService.updateCarePlanModel(this.newcarePlanModel);
  }
  

  private _filterPatients(value: string): any[] {
    const filterValue = this._normalizeValue(value);
    return this.patients.filter(patient =>
      this._normalizeValue(patient.firstName + ' ' + patient.lastName).includes(filterValue)
    );
  }

  private _normalizeValue(value: string): string {    
    return (value + "").toLocaleLowerCase().replace(/\s/g, '');
  }

  displayPatient(patient: any): string {
    return patient ? patient : '';
  }

  clearSelection() {
    this.clearPatientSelection();
  }

  clearPatientSelection() {
    this.newcarePlanModel.patient = null;
    this.patientControl.setValue('');
    this.patientdetails = null; 
  }
}

