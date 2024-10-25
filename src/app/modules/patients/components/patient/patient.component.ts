import { Component, EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';
import { PatientsInfoService } from '../../../services/patients-info.service';
import { CarePlanModel } from '../../../../models/care-plan-model';
import { Patient } from '../../../../models/patient';
import { Assessment } from '../../../../models/assessment';


@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.scss'
})

export class PatientComponent implements OnInit {
  patientControl = new FormControl('');
  assessmentControl = new FormControl('');
  carePlanModel: CarePlanModel = new CarePlanModel();

  patients: Patient[] = [];  
  assessments: Assessment[] = []; 
  
  filteredPatients: Observable<Patient[]> | undefined;
  filteredAssessments: Observable<Assessment[]> | undefined;
  @Output() patientSelected = new EventEmitter<Patient>();

  selectedAssessment: Assessment | null = null;  
  
  constructor(private patientsInfoService: PatientsInfoService) {}

  ngOnInit() {
    this.filteredPatients = this.patientControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterPatients(value || ''))
    );

    this.filteredAssessments = this.assessmentControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterAssessments(value || ''))
    );

    this.getAllPatients();
  }

  getAllPatients(): void {
    this.patientsInfoService.getAllPatients().subscribe(
      (allPatients) => {
        this.patients = allPatients;

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
    this.carePlanModel.patient = patient;
    this.patientControl.setValue(patient.firstName + ' ' + patient.lastName);

    if (patient && patient.patientMasterId) {
      this.getAssessments(patient.patientMasterId);
    }
    this.patientSelected.emit(patient);
    this.clearAssessmentSelection(); 
  }

  getAssessments(patientId: number): void {
    this.patientsInfoService.getAssessment(patientId).subscribe(
      (assessments) => {
        this.assessments = assessments;
  
        this.filteredAssessments = this.assessmentControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterAssessments(value || ''))
        );
      },
      
    );
  }
  

  onAssessmentSelected(assessment: Assessment) {
    this.selectedAssessment = assessment;
    this.assessmentControl.setValue(this.selectedAssessment.screenName);
  }

  private _filterPatients(value: string): any[] {
    const filterValue = this._normalizeValue(value);
    return this.patients.filter(patient =>
      this._normalizeValue(patient.firstName + ' ' + patient.lastName).includes(filterValue)
    );
  }

  private _filterAssessments(value: string): any[] {
    const filterValue = this._normalizeValue(value);
    return this.assessments.filter(assessment =>
      this._normalizeValue(assessment.screenName).includes(filterValue)
    );
  }

  private _normalizeValue(value: string): string {    
    
      return (value + "").toLocaleLowerCase().replace(/\s/g, '');
  }

  displayPatient(patient: any): string {
    return patient ? patient : '';
  }

  displayAssessment(assessment: any): string {
    return assessment ? assessment : '';
  }


  clearSelection() {
    this.clearPatientSelection();
    this.clearAssessmentSelection();
  }

  clearPatientSelection() {
    this.carePlanModel.patient = null;
    this.patientControl.setValue('');
    this.assessments = [];  
  }

  clearAssessmentSelection() {
    this.carePlanModel.assessment = null;
    this.assessmentControl.setValue('');
  }
}


