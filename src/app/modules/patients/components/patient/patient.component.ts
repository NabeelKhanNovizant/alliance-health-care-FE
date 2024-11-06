import { Component, EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';
import { PatientsInfoService } from '../../../services/patients-info.service';
import { CarePlanModel } from '../../../../models/care-plan-model';
import { Patient } from '../../../../models/patient';
import { Assessment } from '../../../../models/assessment';
import { PatientIdServiceService } from '../../../services/patient-id-service.service';
import { Router } from '@angular/router';
import { CarePlanService } from '../../../services/care-plan-service.service';


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
  selectedPatient: any = null;
  selectedAssessment: any = null;
  filteredPatients: Observable<Patient[]> | undefined;
  filteredAssessments: Observable<Assessment[]> | undefined;
  @Output() canNavigate = new EventEmitter<CarePlanModel>();

  constructor(private patientsInfoService: PatientsInfoService,private router: Router
    , private carePlanService: CarePlanService
  ) {}

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
  getAssessments(patientId: number): void {
    this.loading = true;
    this.patientsInfoService.getAssessment(patientId).subscribe(
      (assessments) => {
        
        this.assessments = assessments;
        this.loading = false;
        this.filteredAssessments = this.assessmentControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterAssessments(value || ''))
        );
      },
      
    );
  }

  onPatientSelected(patient: Patient) {
    this.selectedPatient = patient;  
    this.carePlanModel.patient = patient;
    this.patientControl.setValue(patient.firstName + ' ' + patient.lastName);
  
    if (patient && patient.patientMasterId) {
      this.getAssessments(patient.patientMasterId);
    }
  
    this.clearAssessmentSelection(); 
  }
  
  onAssessmentSelected(assessment: Assessment) {
    this.selectedAssessment = assessment;  
    this.carePlanModel.assessment = assessment;
    this.assessmentControl.setValue(assessment.screenName);
  
    if (assessment && assessment.id > 0) {
      this.carePlanService.updateCarePlanModel(this.carePlanModel);
      this.canNavigate.emit(this.carePlanModel);
    }
  
  }
  

  onGenrateCarePlan() {
    if(this.carePlanModel && this.carePlanModel.patient && this.carePlanModel.assessment) {
      this.patientsInfoService.getCarePlan(this.carePlanModel.assessment.id).subscribe(
        (resp) => {
          this.carePlanService.updateApiResponse(resp);
          
        },
        (error) => {
          console.error('Error fetching care plan:', error);
        }
      );
    if (this.patients) {
      this.router.navigate(['/care-plan']);
    }
  }
}

loading: boolean = false;

GenAiCarePlan() {
  if (this.carePlanModel && this.carePlanModel.patient && this.carePlanModel.assessment) {
    this.loading = true; 
    this.patientsInfoService.getGenAiCarePlan(this.carePlanModel.assessment.id).subscribe(
      (resp) => {
        this.carePlanService.updateApiResponse(resp);
        this.loading = false;
        if (this.patients) {
          this.router.navigate(['/care-plan']);
        }
      },
      (error) => {
        console.error('Error fetching care plan:', error);
        this.loading = false;
      }
    );
  }
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
    return assessment ? assessment : '' ;
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


