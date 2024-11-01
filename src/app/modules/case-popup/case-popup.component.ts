import { Component } from '@angular/core';
import { PatientsInfoService } from '../services/patients-info.service';
import { CarePlanService } from '../services/care-plan-service.service';
import { Assessment } from '../../models/assessment';
import { ApiResponse } from '../../models/api-response';
import { CarePlanModel } from '../../models/care-plan-model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-case-popup',
  templateUrl: './case-popup.component.html',
  styleUrl: './case-popup.component.scss'
})
export class CasePopupComponent {
  caseForm: FormGroup;
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
    private carePlanService: CarePlanService,
    private fb: FormBuilder
  ) {

    this.filteredCase = this.caseName;
    this.filteredEquity = this.case_equity;
    this.filteredSource = this.case_source;
    this.caseForm = this.fb.group({
      caseName: ['', Validators.required],
      caseEquity: ['', Validators.required],
      source: ['', Validators.required],
      description: [''],
      note: [''],
      primaryContact: [''],
      mainDiagnosis: [''],
      additionalDiagnosis: [''],
      additionalOtherDiagnosis: ['']
    });
  }

  ngOnInit() {
    this.carePlanService.currentCarePlanModel.subscribe((model) => {
      this.carePlanModel = model;  
      if (this.carePlanModel) {
        this.caseForm.patchValue({
          caseName: this.carePlanModel.caseName,
          caseEquity: this.carePlanModel.caseAcuity,
          source: this.carePlanModel.caseSource,
          description: this.carePlanModel.description,
          note: this.carePlanModel.note,
          primaryContact: this.carePlanModel.primaryContact,
          mainDiagnosis: this.carePlanModel.mainDiagnosis,
          additionalDiagnosis: this.carePlanModel.additionalDiagnosis,
          additionalOtherDiagnosis: this.carePlanModel.AdditionalOtherDiagnosis,
        });
      }
    });
    this.loadCases();
  }
  

  loadCases() {
    this.apiResponse = this.carePlanService.apiResponse;
    if (this.apiResponse && this.apiResponse.cases.length > 0) {
      this.caseName = this.apiResponse?.cases.map(item => item.name);
      this.filteredCase = this.caseName;
    } else {
      console.log("No cases found");
    }
  }
  
  onSave() {
    if (this.caseForm.valid && this.carePlanModel) {
      const formData = this.caseForm.value;
  
      this.carePlanModel.caseName = formData.caseName;
      this.carePlanModel.caseAcuity = formData.caseEquity;
      this.carePlanModel.caseSource = formData.source;
      this.carePlanModel.description = formData.description;
      this.carePlanModel.note = formData.note;
      this.carePlanModel.primaryContact = formData.primaryContact;
      this.carePlanModel.mainDiagnosis = formData.mainDiagnosis;
      this.carePlanModel.additionalDiagnosis = formData.additionalDiagnosis;
      this.carePlanModel.AdditionalOtherDiagnosis = formData.additionalOtherDiagnosis;
  
      this.carePlanService.updateCarePlanModel(this.carePlanModel);
    }
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

