import { Component } from '@angular/core';

@Component({
  selector: 'app-case-popup',
  templateUrl: './case-popup.component.html',
  styleUrl: './case-popup.component.scss'
})
export class CasePopupComponent {
  countries: string[] = ['India', 'Pakistan', 'Australia', 'Canada', 'USA'];
  case: string[] = ['Case 1', 'Case 2', 'Case 3'];
  case_equity: string[] = ['Low - Monthly', 'Medium - Bimonthly', 'High - Weekly', 'Catastrophic'];
  case_source: string[] = ['Member (Self Referral)', 'Care Management', 'Primary Care Physician', 'Specialist', 'Triage'];

  filteredCountries: string[] = [];
  selectedCountry: string = '';

  filteredCase: string[] = [];
  selectedCase: string = '';

  filteredEquity: string[] = [];
  selectedEquity: string = '';

  filteredSource: string[] = [];
  selectedSource: string = '';


  constructor() {
    //this.filteredCountries = this.countries; // Initially show all countries
    this.filteredCase = this.case; // Initially show all countries
    this.filteredEquity = this.case_equity; // Initially show all countries
    this.filteredSource = this.case_source; // Initially show all countries
  }

  ngOnInit() {
    // If needed, you can perform additional logic here
  }

  // Method to filter countries based on user input
  onInput(value: any): void {
    this.filteredCountries = this.countries.filter((country) =>
      country.toLowerCase().includes(value.toLowerCase())
    );
  }

  onCaseInput(value: any): void {
    this.filteredCase = this.case.filter((val) =>
      val.toLowerCase().includes(value.toLowerCase())
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
