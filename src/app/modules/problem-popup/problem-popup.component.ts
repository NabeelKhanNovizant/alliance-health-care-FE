import { Component, OnInit } from '@angular/core';
import { CarePlanModel, CarePlanProblem } from '../../models/care-plan-model';
import { CarePlanService } from '../services/care-plan-service.service';
import { ApiResponse } from '../../models/api-response';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-problem-popup',
  templateUrl: './problem-popup.component.html',
  styleUrl: './problem-popup.component.scss'
})
export class ProblemPopupComponent implements OnInit {
  carePlanModel: CarePlanModel | null = null;
  apiResponse: ApiResponse | null = null;
  problems: string[] = [];
  problemForm: FormGroup;
  filteredProblem: string[] = [];
  filteredStatus: string[] = [];
  status: string[] = ['Open', 'InProgress', 'Closed'];

  constructor(private carePlanService: CarePlanService, private fb: FormBuilder) {
    this.problemForm = this.fb.group({
      problem: ['', Validators.required],
      status: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['']
    });
  }

  ngOnInit() {
    // Subscribe to currentCarePlanModel and load problems if apiResponse is available
    this.carePlanService.currentCarePlanModel.subscribe((model) => {
      this.carePlanModel = model;
    });
    this.apiResponse = this.carePlanService.apiResponse;
    if (this.apiResponse && this.apiResponse.cases.length > 0) {
      this.problems = this.apiResponse.cases[0].problems.map((item) => item.name);
      this.filteredProblem = this.problems;
    } else {
      console.log('API Response is null');
    }

    // Initialize filteredStatus to display all status options initially
    this.filteredStatus = this.status;
  }

  onInput(value: any): void {
    this.filteredProblem = this.problems.filter((val) =>
      val.toLowerCase().includes(value.toLowerCase())
    );
  }

  onInputStatus(value: any): void {
    this.filteredStatus = this.status.filter((val) =>
      val.toLowerCase().includes(value.toLowerCase())
    );
  }

  SaveProblem() {
    if (this.problemForm.valid && this.carePlanModel) {
      const formValue = this.problemForm.value;
      let problem = new CarePlanProblem();
      problem.name = formValue.problem;
      problem.status = formValue.status;
      problem.startDate = formValue.startDate;
      problem.endDate = formValue.endDate;

      // Update carePlanModel and notify service
      this.carePlanModel.problems.push(problem);
      this.carePlanService.updateCarePlanModel(this.carePlanModel);
    }
  }
}
