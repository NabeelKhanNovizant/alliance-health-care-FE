import { Component, OnInit } from '@angular/core';
import { CarePlanService } from '../services/care-plan-service.service';
import { CarePlanGoal, CarePlanModel } from '../../models/care-plan-model';
import { ApiResponse } from '../../models/api-response';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-goal-popup',
  templateUrl: './goal-popup.component.html',
  styleUrl: './goal-popup.component.scss'
})
export class GoalPopupComponent implements OnInit {
  problems: string[] = [];
  filteredProblem: string[] = [];
  status: string[] = ['Open', 'InProgress', 'Closed'];
  filteredStatus: string[] = [];
  goals: string[] = [];
  filteredgoals: string[] = [];
  priorities: string[] = ['Low', 'Medium', 'High'];
  filteredpriorities: string[] = [];
  carePlanModel: CarePlanModel | null = null;
  apiResponse: ApiResponse | null = null;

  goalForm: FormGroup;

  constructor(private carePlanService: CarePlanService, private fb: FormBuilder) {
    this.goalForm = this.fb.group({
      problem: ['', Validators.required],
      goal: ['', Validators.required],
      status: ['', Validators.required],
      priority: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['']
    });
  }

  ngOnInit() {
    this.apiResponse = this.carePlanService.apiResponse;
    this.carePlanService.currentCarePlanModel.subscribe((model) => {
      this.carePlanModel = model;
      this.problems = this.carePlanModel?.problems.map(p => p.name)!;
      this.filteredProblem = this.problems;
    });

    this.filteredStatus = this.status;
    this.filteredpriorities = this.priorities;
  }

  onInput(value: any): void {
    this.filteredProblem = this.problems.filter(val => val.toLowerCase().includes(value.toLowerCase()));
  }

  onInputGoal(value: any): void {
    this.filteredgoals = this.goals.filter(val => val.toLowerCase().includes(value.toLowerCase()));
  }

  onInputStatus(value: any): void {
    this.filteredStatus = this.status.filter(val => val.toLowerCase().includes(value.toLowerCase()));
  }

  onInputPriority(value: any): void {
    this.filteredpriorities = this.priorities.filter(val => val.toLowerCase().includes(value.toLowerCase()));
  }

  onProblemSelected($event: any) {
    const problemModel = this.apiResponse?.cases[0].problems.find(p => p.name === $event.option.value);
    this.goals = problemModel?.goals.map(g => g.name) || [];
    this.filteredgoals = this.goals;
  }

  OnSaveGoal() {
    if (this.goalForm.valid && this.carePlanModel) {
      const formValues = this.goalForm.value;

      const goal = new CarePlanGoal();
      goal.name = formValues.goal;
      goal.problemName = formValues.problem;
      goal.status = formValues.status;
      goal.priority = formValues.priority;
      goal.startDate = formValues.startDate;
      goal.endDate = formValues.endDate;

      const problemModel = this.carePlanModel.problems.find(p => p.name === formValues.problem);
      problemModel?.goals.push(goal);

      this.carePlanService.updateCarePlanModel(this.carePlanModel);
    }
  }
}
