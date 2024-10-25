import { Component } from '@angular/core';

@Component({
  selector: 'app-goal-popup',
  templateUrl: './goal-popup.component.html',
  styleUrl: './goal-popup.component.scss'
})
export class GoalPopupComponent {

  problems: string[] = [ 'Level I - Disease/Health Management', 'Level II - Case Management', 'Level II - Complex Care Managment', 'Transition of Care (ToC)', 'MAT' ,'Enhanced Care Management (ECM)'];
    
  filteredProblem: string[] = [];
  selectedProblem: string = '';

  status: string[] = [ 'Open', 'InProgress', 'Closed'];
    
  filteredStatus: string[] = [];
  selectedStatu: string = '';

  goals: string[] = [ 'Goal 1', 'Goal 2', 'Goal 3'];
    
  filteredgoals: string[] = [];
  selectedgoal: string = '';

  priorities: string[] = [ 'Low', 'Medium', 'High'];
    
  filteredpriorities: string[] = [];
  selectedpriorities: string = '';

  constructor() {    
    this.filteredProblem = this.problems; // Initially show all countries    
    this.filteredStatus = this.status; // Initially show all countries 
    this.filteredgoals = this.goals; // Initially show all countries 
    this.filteredpriorities = this.priorities; // Initially show all countries     
  }

  ngOnInit() {
    // If needed, you can perform additional logic here
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
}
