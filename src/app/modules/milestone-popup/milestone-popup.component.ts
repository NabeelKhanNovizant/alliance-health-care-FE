import { Component, ElementRef, HostListener } from '@angular/core';
import { CarePlanService } from '../services/care-plan-service.service';
import { CarePlanMilestone, CarePlanModel } from '../../models/care-plan-model';
import { ApiResponse } from '../../models/api-response';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-milestone-popup',
  templateUrl: './milestone-popup.component.html',
  styleUrl: './milestone-popup.component.scss'
})
export class MilestonePopupComponent {
  startDate: any;
  endDate: any;

  milestones: string[] = [];
  filteredmilestones: string[] = [];
  selectedmilestones: string = '';
  
  problems: string[] = [];    
  filteredProblem: string[] = [];
  selectedProblem: string = '';

  status: string[] = ['Open', 'InProgress', 'Closed'];    
  filteredStatus: string[] = [];
  selectedStatu: string = 'Open';

  goals: string[] = [];    
  filteredgoals: string[] = [];
  selectedgoal: string = '';

  ActionType: string[] = ['Intervention', 'Outcome', 'Barrier', 'Other'];    
  filteredActionType: string[] = [];
  selectedActionType: string = '';

  carePlanModel: CarePlanModel | null = null;
  apiResponse: ApiResponse | null = null;

  constructor(private carePlanService: CarePlanService,
    private el: ElementRef
  ) {    
    this.filteredStatus = this.status; 
    this.filteredActionType = this.ActionType; 
  }


  ngOnInit() {
    this.apiResponse = this.carePlanService.apiResponse;
    this.apiResponse?.cases?.forEach(singleCase => {
      singleCase.problems?.forEach(problem => {
        problem.goals?.forEach(goal => {
          goal.milestones ?? [];
        });
      });
    });

    this.carePlanService.currentCarePlanModel.subscribe((model) => {
      this.carePlanModel = model;
      this.problems = this.carePlanModel?.problems.map(p => p.name) || [];
      this.filteredProblem = this.problems;
    });
  }

  onInput(value: any): void {
    this.filteredProblem = this.problems.filter((val) =>
      val.toLowerCase().includes((value + "").toLowerCase())
    );
  }

  onInputStatus(value: any): void {
    this.filteredStatus = this.status.filter((val) =>
      val.toLowerCase().includes(value.toLowerCase())
    );
  }

  onInputGoal(value: any): void {
    this.filteredgoals = this.goals.filter((val) =>
      val.toLowerCase().includes(value.toLowerCase())
    );
  }

  onInputActionType(value: any): void {
    this.filteredActionType = this.ActionType.filter((val) =>
      val.toLowerCase().includes(value.toLowerCase())
    );
  }

  onGoalSelected($event: MatAutocompleteSelectedEvent) {
    if (this.apiResponse?.cases && this.apiResponse.cases.length > 0) {
      const problemModel = this.apiResponse.cases[0].problems.find(p => p.name === this.selectedProblem);
      if (problemModel) {
        const goalModel = problemModel.goals.find(g => g.name === $event.option.value);
        if (goalModel) {
          this.milestones = goalModel.milestones || [];
          this.filteredmilestones = this.milestones;
        }
      }
    }
  }

  onProblemSelected($event: MatAutocompleteSelectedEvent) {
    var problemModel = this.carePlanModel?.problems.find(p => p.name == $event.option.value);
    this.goals = problemModel?.goals.map(g => {
      return g.name;
    })!; 
    this.filteredgoals = this.goals;
  }

  OnSaveMilestone() {
    if (this.formIsValid && this.carePlanModel) {
      let milestone = new CarePlanMilestone();
      milestone.actionType = this.selectedActionType;
      milestone.endDate = this.endDate;
      milestone.goalName = this.selectedgoal;
      milestone.name = this.selectedmilestones;
      milestone.problemName = this.selectedProblem;
      milestone.startDate = this.startDate;
      milestone.status = this.selectedStatu;

      let problemModel = this.carePlanModel?.problems.find(p => p.name == this.selectedProblem);
      let goalModel = problemModel?.goals.find(g => g.name == this.selectedgoal);
      goalModel?.milestones.push(milestone);

      this.carePlanService.updateCarePlanModel(this.carePlanModel!);
    }
  }

  get formIsValid(): boolean {
    return !!(
      this.selectedProblem &&
      this.selectedgoal &&
      this.selectedmilestones &&
      this.startDate &&
      this.endDate &&
      this.selectedActionType
    );
  }
}