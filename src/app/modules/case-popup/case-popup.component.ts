import { Component } from '@angular/core';
import { PatientsInfoService } from '../services/patients-info.service';
import { CarePlanService } from '../services/care-plan-service.service';
import { Assessment } from '../../models/assessment';
import { ApiResponse } from '../../models/api-response';

@Component({
  selector: 'app-case-popup',
  templateUrl: './case-popup.component.html',
  styleUrl: './case-popup.component.scss'
})
export class CasePopupComponent {
  case_equity: string[] = ['Low - Monthly', 'Medium - Bimonthly', 'High - Weekly', 'Catastrophic'];
  case_source: string[] = ['Member (Self Referral)', 'Care Management', 'Primary Care Physician', 'Specialist', 'Triage'];

  carePlanAPI: ApiResponse | null = null;

  filteredCase: string[] = [];
  selectedCase: string = '';

  filteredEquity: string[] = [];
  selectedEquity: string = '';

  filteredSource: string[] = [];
  selectedSource: string = '';
  caseName: string[] = [];

  apiResponse: ApiResponse | null = null;

  constructor(private patientsInfoService: PatientsInfoService,
    private carePlanService: CarePlanService
  ) {
    this.filteredCase = this.caseName; 
    this.filteredEquity = this.case_equity; 
    this.filteredSource = this.case_source; 
  }

  ngOnInit() {
    this.loadCases();
    }

    loadCases(){
      this.apiResponse = this.carePlanService.apiResponse;
      if(this.apiResponse && this.apiResponse.cases.length > 0) {
        
        this.caseName = this.apiResponse?.cases.map(item => {
          return item.name;
        });
        this.filteredCase = this.caseName;
        console.log("getting cases", this.caseName);
      }
       else {
        console.log("No cases found");
       } 
    }
  onCaseInput(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    this.filteredCase = this.caseName.filter((val) =>
      val.toLowerCase().includes(input.toLowerCase())
    );
  }
  

  onCaseEquityInput(value: any): void {
    this.filteredEquity = this.case_equity.filter((val) =>
      val.toLowerCase().includes(value.toLowerCase())
    );
  }

  onSourceInput(value: any): void {
    this.filteredSource = this.case_source.filter((val) =>
      val.toLowerCase().includes(value.toLowerCase())
    );
  }

}
