import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';
import { CarePlanModel } from '../../models/care-plan-model';
import { CarePlanService } from '../services/care-plan-service.service';

@Component({
  selector: 'app-care-management',
  templateUrl: './care-management.component.html',
  styleUrl: './care-management.component.scss'
})
export class CareManagementComponent implements OnInit  {
  carePlanModel: CarePlanModel | null = null;
  constructor(private carePlanService: CarePlanService){}
  ngOnInit(): void {
    this.carePlanService.currentCarePlanModel.subscribe((model) => {
      this.carePlanModel = model;
      console.log('Care Plan Model:', this.carePlanModel);
    });
  }
}
  // caseControl = new FormControl();
  // cases: string[] = [
  //   'Diabetes Mellitus',
  //   'Hypertension',
  //   'Asthma',
  //   'Chronic Obstructive Pulmonary Disease (COPD)',
  //   'Heart Failure',
  //   'Chronic Kidney Disease',
  //   'Osteoarthritis',
  //   'Depression',
  //   'Anxiety Disorder',
  //   'Hypothyroidism'
  // ];
  // filteredCases: Observable<string[]> | undefined;

  // ngOnInit() {
  //   this.filteredCases = this.caseControl.valueChanges
  //     .pipe(
  //       startWith(''),
  //       map(value => this._filter(value || ''))
  //     );
  // }

  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();
  //   return this.cases.filter(caseName => caseName.toLowerCase().includes(filterValue));
  // }
