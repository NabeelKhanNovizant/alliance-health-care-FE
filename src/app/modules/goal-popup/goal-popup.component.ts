import { Component } from '@angular/core';
import { CarePlanService } from '../services/care-plan-service.service';
import { CarePlanGoal, CarePlanModel } from '../../models/care-plan-model';
import { ApiResponse } from '../../models/api-response';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-goal-popup',
  templateUrl: './goal-popup.component.html',
  styleUrl: './goal-popup.component.scss'
})
export class GoalPopupComponent {

  problems: string[] = [ ];    
  filteredProblem: string[] = [];
  selectedProblem: string = '';

  status: string[] = [ 'Open', 'InProgress', 'Closed'];    
  filteredStatus: string[] = [];
  selectedStatu: string = 'Open';

  goals: string[] = [ ];    
  filteredgoals: string[] = [];
  selectedgoal: string = '';

  priorities: string[] = [ 'Low', 'Medium', 'High'];    
  filteredpriorities: string[] = [];
  selectedpriorities: string = 'Low';

  carePlanModel: CarePlanModel | null = null;
  apiResponse: ApiResponse | null = null;
  startDate: Date | any;
  endDate: Date |any;
  
  constructor(private carePlanService: CarePlanService) {        
    this.filteredStatus = this.status; // Initially show all countries     
    this.filteredpriorities = this.priorities; // Initially show all countries     
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

  onInputPriority(value: any): void {
    this.filteredpriorities = this.priorities.filter((val) =>
      val.toLowerCase().includes(value.toLowerCase())
    );
  }
  onProblemSelected($event: MatAutocompleteSelectedEvent) {
    var problemModel = this.apiResponse?.cases[0].problems.find(p => p.name == $event.option.value);
    this.goals = problemModel?.goals.map(g => {
      return g.name;
    })!;
    console.log('goals = ', this.goals);
    this.filteredgoals = this.goals; // Initially show all countries 
  }
  OnSaveGoal() {
    if(this.selectedProblem && this.selectedgoal && this.selectedStatu && this.startDate && this.endDate) {
      let goal = new CarePlanGoal();
      goal.name = this.selectedgoal;
      goal.problemName = this.selectedProblem;
      goal.status = this.selectedStatu;
      goal.priority = this.selectedpriorities;
      goal.startDate = this.startDate
      goal.endDate = this.endDate;
      
      let problemModel = this.carePlanModel?.problems.find(p => p.name == this.selectedProblem);
      problemModel?.goals.push(goal);

      this.carePlanService.updateCarePlanModel(this.carePlanModel!);
    }

  }
}
