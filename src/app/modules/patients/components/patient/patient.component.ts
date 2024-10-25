import { Component, EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';
import { PatientsInfoService } from '../../../services/patients-info.service';


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
  
  patients: any[] = [];  
  assessments: any[] = []; 
  
  filteredPatients: Observable<any[]> | undefined;
  filteredAssessments: Observable<any[]> | undefined;
  @Output() patientSelected = new EventEmitter<any>();
  @Output() assessmentSelected = new EventEmitter<any>();

  selectedPatient: any = null;  
  selectedAssessment: any = null;  
  
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

  getAssessments(patientId: number): void {
    this.patientsInfoService.getAssessment(patientId).subscribe(
      (assessments) => {
        console.log('Assessments fetched for patient:', assessments);
  
        this.assessments = assessments.map((assessment: any) => ({
          id: assessment.id,               
          name: assessment.screenName,      
          date: assessment.assesmentDate    
        }));
  
        this.filteredAssessments = this.assessmentControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterAssessments(value || ''))
        );
      },
      
    );
  }
  

  onPatientSelected(patient: any) {
    this.selectedPatient = patient;
    this.patientControl.setValue(this.selectedPatient);

    if (this.selectedPatient && this.selectedPatient.id) {
      this.getAssessments(this.selectedPatient.id);
    }
    this.patientSelected.emit(this.selectedPatient.id);

    console.log('Patient selected:', this.selectedPatient.id);

    this.clearAssessmentSelection(); 
  }
  onAssessmentSelected(assessment: any) {
    this.selectedAssessment = assessment;
    this.assessmentControl.setValue(this.selectedAssessment);
    this.assessmentSelected.emit(this.selectedAssessment.id);
    console.log('Assessment selected:', this.selectedAssessment.id);
  }

  private _filterPatients(value: string): any[] {
    const filterValue = this._normalizeValue(value);
    return this.patients.filter(patient =>
      this._normalizeValue(patient.name).includes(filterValue)
    );
  }

  private _filterAssessments(value: string): any[] {
    const filterValue = this._normalizeValue(value);
  
    return this.assessments.filter(assessment => {
      const nameMatches = this._normalizeValue(assessment.name).includes(filterValue);
      
      // Format date as MM/DD/YYYY for filtering
      const formattedDate = new Date(assessment.date).toLocaleDateString('en-US');
      const dateMatches = this._normalizeValue(formattedDate).includes(filterValue);
      
      return nameMatches || dateMatches;
    });
  }
  

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  displayPatient(patient: any): string {
    return patient ? patient.name : '';
  }

  displayAssessment(assessment: any): string {
    if (assessment) {
      const formattedDate = new Date(assessment.date).toLocaleDateString('en-US');
      return `${assessment.name} | ${formattedDate}`;
    }
    return '';
  }
  


  clearSelection() {
    this.clearPatientSelection();
    this.clearAssessmentSelection();
  }

  clearPatientSelection() {
    this.selectedPatient = null;
    this.patientControl.setValue('');
    this.assessments = [];  
  }

  clearAssessmentSelection() {
    this.selectedAssessment = null;
    this.assessmentControl.setValue('');
  }
}


