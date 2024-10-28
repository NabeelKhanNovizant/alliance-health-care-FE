import { Component } from '@angular/core';
import { CarePlanModel } from '../../models/care-plan-model';
import { Patient } from '../../models/patient';
import { CarePlanService } from '../services/care-plan-service.service';
import { Assessment } from '../../models/assessment';

@Component({
  selector: 'app-assessment-details',
  templateUrl: './assessment-details.component.html',
  styleUrl: './assessment-details.component.scss'
})
export class AssessmentDetailsComponent {
  carePlanModel: CarePlanModel | null = null;
  assessment: Assessment | null = null;

  constructor(private carePlanService: CarePlanService) {}


  ngOnInit() {
    this.carePlanService.currentCarePlanModel.subscribe((model) => {
      this.assessment = model?.assessment || null;  // Get only the patient field
      console.log('Assessment in Care Plan Model:', this.assessment);
    });
  }
}
