import { Component } from '@angular/core';
import { CarePlanModel, CarePlanProblem } from '../../models/care-plan-model';
import { CarePlanService } from '../services/care-plan-service.service';
import { ApiResponse } from '../../models/api-response';

@Component({
  selector: 'app-problem-popup',
  templateUrl: './problem-popup.component.html',
  styleUrl: './problem-popup.component.scss'
})
export class ProblemPopupComponent {
  carePlanModel: CarePlanModel | null = null;
  apiResponse: ApiResponse | null = null;
  problems: string[] = [ ];
    
  filteredProblem: string[] = [];
  selectedProblem: string = '';

  status: string[] = [ 'Open', 'InProgress', 'Closed'];    
  filteredStatus: string[] = [];
  selectedStatu: string = '';
  startDate: Date | any;
  endDate: Date | any;

  constructor(private carePlanService: CarePlanService) {       
    this.filteredStatus = this.status; // Initially show all countries    
  }  
  ngOnInit() {    
    this.carePlanService.currentCarePlanModel.subscribe((model) => {
      this.carePlanModel = model;       
    });
    this.apiResponse = this.carePlanService.apiResponse;
    if(this.apiResponse && this.apiResponse.cases.length > 0) {
      this.problems = this.apiResponse?.cases[0].problems.map((item) => {
        return item.name;
      })!;
      this.filteredProblem = this.problems; 
      console.log("Problems Filterd", this.filteredProblem); 
    }
    else {
      console.log('Api Response is null');
    }
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
    if(this.selectedProblem && this.selectedStatu && this.startDate && this.endDate)
    {
      let problem = new CarePlanProblem();
      problem.name = this.selectedProblem;
      problem.status = this.selectedStatu;
      problem.startDate = this.startDate;
      problem.endDate = this.endDate;

      this.carePlanModel?.problems.push(problem);
      this.carePlanService.updateCarePlanModel(this.carePlanModel!);
    }
    console.log("Problems Updated",this.carePlanModel);
  }

}
