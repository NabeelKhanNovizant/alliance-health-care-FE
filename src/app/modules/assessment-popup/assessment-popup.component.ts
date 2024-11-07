import { Component, OnInit } from '@angular/core';
import { PatientsInfoService } from '../services/patients-info.service';
import { CarePlanModel } from '../../models/care-plan-model';
import { CarePlanService } from '../services/care-plan-service.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-assessment-popup',
  templateUrl: './assessment-popup.component.html',
  styleUrl: './assessment-popup.component.scss'
})
export class AssessmentPopupComponent implements OnInit  {
  carePlanModel: CarePlanModel = new CarePlanModel();

  constructor(private patientsInfoService: PatientsInfoService,
    private currentCarePlan: CarePlanService
  ){

  }
  ngOnInit(): void {
  }

}
