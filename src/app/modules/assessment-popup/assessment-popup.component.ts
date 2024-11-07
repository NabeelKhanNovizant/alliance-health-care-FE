import { Component, OnInit } from '@angular/core';
import { PatientsInfoService } from '../services/patients-info.service';
import { CarePlanModel } from '../../models/care-plan-model';
import { CarePlanService } from '../services/care-plan-service.service';
import { map } from 'rxjs';
import { CarePlanRequest } from '../../models/care-plan-request';

@Component({
  selector: 'app-assessment-popup',
  templateUrl: './assessment-popup.component.html',
  styleUrl: './assessment-popup.component.scss'
})
export class AssessmentPopupComponent implements OnInit {
  carePlanModel: CarePlanModel = new CarePlanModel();
  assessmentDetails: CarePlanRequest = new CarePlanRequest(); 

  constructor(
    private patientsInfoService: PatientsInfoService,
    private currentCarePlan: CarePlanService
  ) {}

  ngOnInit(): void {
    this.currentCarePlan.currentCarePlanModel.subscribe((model) => {
      if (model) {
        this.carePlanModel = model;
      }
    });
    this.getAssessmentDetails();
  }

  getAssessmentDetails() {
    const assessmentId = this.carePlanModel.assessment?.id;
    if (assessmentId) {
      this.patientsInfoService.getAssessmentDetail(assessmentId).subscribe(
        (assessment) => {
          this.assessmentDetails = assessment; 
          console.log("Assessment details:", this.assessmentDetails);
        },
        (error) => {
          console.error("Failed to fetch assessment details", error);
        }
      );
    } else {
      console.warn("No assessment ID available.");
    }
  }
}