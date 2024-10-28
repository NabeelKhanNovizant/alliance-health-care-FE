import { Component } from '@angular/core';
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

  milestones: string[] = [ ];    
  filteredmilestones: string[] = [];
  selectedmilestones: string = '';
  
  problems: string[] = [ ];    
  filteredProblem: string[] = [];
  selectedProblem: string = '';

  status: string[] = [ 'Open', 'InProgress', 'Closed'];    
  filteredStatus: string[] = [];
  selectedStatu: string = 'Open';

  goals: string[] = [ ];    
  filteredgoals: string[] = [];
  selectedgoal: string = '';

  ActionType: string[] = [ 'Intervention', 'Outcome', 'Barrier', 'Other'];    
  filteredActionType: string[] = [];
  selectedActionType: string = '';

  carePlanModel: CarePlanModel | null = null;
  apiResponse: ApiResponse | null = null;

  constructor(private carePlanService: CarePlanService) {    
    this.filteredStatus = this.status; // Initially show all countries
    this.filteredActionType = this.ActionType; // Initially show all countries
  }

  ngOnInit() {
    this.apiResponse = this.carePlanService.apiResponse;
    this.carePlanService.currentCarePlanModel.subscribe((model) => {
      this.carePlanModel = model;
      this.problems = this.carePlanModel?.problems.map(p => {
        return p.name;
      })!;
      this.filteredProblem = this.problems; // Initially show all countries    
    });
  }

  // Method to filter countries based on user input
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
    let problemModel = this.apiResponse?.cases[0].problems.find(p => p.name == this.selectedProblem);
    let goalModel = problemModel?.goals.find(g => g.name == $event.option.value);
    this.milestones = goalModel?.items!;    
    this.filteredmilestones = this.milestones; // Initially show all countries     
  }
  onProblemSelected($event: MatAutocompleteSelectedEvent) {
    var problemModel = this.apiResponse?.cases[0].problems.find(p => p.name == $event.option.value);
    this.goals = problemModel?.goals.map(g => {
      return g.name;
    })!;    
    this.filteredgoals = this.goals; // Initially show all countries 
  }
  OnSaveMilestone() {
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
