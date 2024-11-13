import { Component, model } from '@angular/core';
import { CarePlanModel } from '../../models/care-plan-model';
import { Patient } from '../../models/patient';
import { CarePlanService } from '../services/care-plan-service.service';
import { Assessment } from '../../models/assessment';
import { PatientsInfoService } from '../services/patients-info.service';
import { map, Observable, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-assessment-details',
  templateUrl: './assessment-details.component.html',
  styleUrl: './assessment-details.component.scss'
})
export class AssessmentDetailsComponent {
  carePlanModel: CarePlanModel | null = null;
  newCarePlanModel: CarePlanModel =  new CarePlanModel();
  assessmentdetails: Assessment | null = null;
  assessmentControl = new FormControl('');

  assessments: Assessment[] = [];
  selectedAssessment: any = null;
  filteredAssessments: Observable<Assessment[]> | undefined;

  loading: boolean = false;

  constructor(private carePlanService: CarePlanService,
    private patientsInfoService: PatientsInfoService
  ) {}

  ngOnInit() {
    this.filteredAssessments = this.assessmentControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterAssessments(value || ''))
    );
  
    this.carePlanService.currentCarePlanModel.subscribe((model) => {
      this.carePlanModel = model;
      this.assessmentdetails = model?.assessment || null;
      console.log('CarePlanModel:', this.carePlanModel);
  
      // Fetch assessments if patientMasterId exists
      const patientId = model?.patient?.patientMasterId;
      if (patientId) {
        this.getAssessments(patientId);
      }
    });
  }
  

  getAssessments(patientMasterId: number): void {  
    this.loading = true;
    this.patientsInfoService.getAssessment(patientMasterId).subscribe(
      (assessments) => {
        this.assessments = assessments;
        this.loading = false;
        this.filteredAssessments = this.assessmentControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterAssessments(value || ''))
        );
      },
      (error) => {
        console.error("Error fetching assessments:", error);
        this.loading = false;
      }
    );
  }
  
  onAssessmentSelected(assessment: Assessment) {
    this.selectedAssessment = assessment;
    this.assessmentdetails = assessment; 
    this.assessmentControl.setValue(assessment.screenName);
  
    if (assessment && assessment.id > 0) {
      const updatedModel = { ...this.carePlanModel, assessment: assessment };
      this.carePlanService.updateCarePlanModel(updatedModel as CarePlanModel);
    }
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
  displayAssessment(assessment: any): string {
    return assessment ? assessment : '' ;
  }

  clearAssessmentSelection() {
    this.newCarePlanModel.assessment = null;
    this.assessmentControl.setValue('');
    this.assessmentdetails = null;
  }
  clearSelection() {
    this.clearAssessmentSelection();
  }
}