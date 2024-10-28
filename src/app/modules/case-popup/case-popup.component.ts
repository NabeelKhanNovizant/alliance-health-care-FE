import { Component } from '@angular/core';
import { PatientsInfoService } from '../services/patients-info.service';
import { CarePlanService } from '../services/care-plan-service.service';
import { Assessment } from '../../models/assessment';
import { ApiResponse } from '../../models/api-response';
import { CarePlanModel } from '../../models/care-plan-model';

@Component({
  selector: 'app-case-popup',
  templateUrl: './case-popup.component.html',
  styleUrl: './case-popup.component.scss'
})
export class CasePopupComponent {
  // Existing properties
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
  carePlanModel: CarePlanModel | null = null;

  description: string = '';
  note: string = '';
  primaryContact: string = '';
  mainDiagnosis: string = '';
  additionalDiagnosis: string = '';
  additionalOtherDiagnosis: string = '';

  constructor(
    private patientsInfoService: PatientsInfoService,
    private carePlanService: CarePlanService
  ) {
    this.filteredCase = this.caseName;
    this.filteredEquity = this.case_equity;
    this.filteredSource = this.case_source;
  }

  ngOnInit() {
    this.carePlanService.currentCarePlanModel.subscribe((model) => {
      this.carePlanModel = model;
    });
    this.loadCases();
  }

  loadCases() {
    this.apiResponse = this.carePlanService.apiResponse;
    if (this.apiResponse && this.apiResponse.cases.length > 0) {
      this.caseName = this.apiResponse?.cases.map(item => item.name);
      this.filteredCase = this.caseName;
      console.log("getting cases", this.caseName);
    } else {
      console.log("No cases found");
    }
  }
  
  onSave() {
    this.carePlanModel!.caseName = this.selectedCase;
    this.carePlanModel!.caseAcuity = this.selectedEquity;
    this.carePlanModel!.caseSource = this.selectedSource;
    this.carePlanModel!.description = this.description;
    this.carePlanModel!.note = this.note;
    this.carePlanModel!.primaryContact = this.primaryContact;
    this.carePlanModel!.mainDiagnosis = this.mainDiagnosis;
    this.carePlanModel!.additionalDiagnosis = this.additionalDiagnosis;
    this.carePlanModel!.AdditionalOtherDiagnosis = this.additionalOtherDiagnosis;

    this.carePlanService.updateCarePlanModel(this.carePlanModel!);
    
    
  }

  onCaseInput(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    this.filteredCase = this.caseName.filter(val =>
      val.toLowerCase().includes(input.toLowerCase())
    );
  }

  onCaseEquityInput(value: any): void {
    this.filteredEquity = this.case_equity.filter(val =>
      val.toLowerCase().includes(value.toLowerCase())
    );
  }

  onSourceInput(value: any): void {
    this.filteredSource = this.case_source.filter(val =>
      val.toLowerCase().includes(value.toLowerCase())
    );
  }
}

