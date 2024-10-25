import { Component } from '@angular/core';

@Component({
  selector: 'app-problem-popup',
  templateUrl: './problem-popup.component.html',
  styleUrl: './problem-popup.component.scss'
})
export class ProblemPopupComponent {

  problems: string[] = [ 'Level I - Disease/Health Management', 'Level II - Case Management', 'Level II - Complex Care Managment', 'Transition of Care (ToC)', 'MAT' ,'Enhanced Care Management (ECM)'];
    
  filteredProblem: string[] = [];
  selectedProblem: string = '';

  status: string[] = [ 'Open', 'InProgress', 'Closed'];
    
  filteredStatus: string[] = [];
  selectedStatu: string = '';

  constructor() {    
    this.filteredProblem = this.problems; // Initially show all countries    
    this.filteredStatus = this.status; // Initially show all countries    
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

}
