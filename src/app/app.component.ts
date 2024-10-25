import { AfterViewInit, ChangeDetectorRef, Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { PatientComponent } from './modules/patients/components/patient/patient.component';
import { CarePlanModel } from './models/care-plan-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  title = 'TureCare';

  @ViewChild(PatientComponent) patientComponent!: PatientComponent;
  selectedCarePlanModel: CarePlanModel | null = null;
  showContent: boolean = true; // To toggle content visibility

  constructor(private router: Router, private cdr: ChangeDetectorRef) {
    // Subscribe to router events to detect route changes
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Check if the current route is '/care-plan'
        this.showContent = event.url !== '/care-plan';
      }
    });
  }

  ngOnInit() {
    this.router.navigate(['/patient']);
  }

  onCanNavigate(model: CarePlanModel) {
    this.selectedCarePlanModel = model;
    this.cdr.detectChanges(); 
  }

  OnSelect() {
    // Navigate to the care plan component
    this.router.navigate(['/care-plan']);
  }

}
  // onStepChange(event: any) {
  //   this.currentStep = event.selectedIndex; // Track step change
  //   if (this.currentStep === 0) {
  //     this.router.navigate(['/patient']); // Show patient component
  //   } 
  //   else if (this.currentStep === 1) {
  //     this.router.navigate(['/case-selection']); // Show case component
  //   } 
  //   else if (this.currentStep === 2) {
  //     this.router.navigate(['/care-plan']); // Show problem component
  //   }
  //   else if (this.currentStep === 3) {
  //     this.router.navigate(['/plan-view']); // Show problem component
  //   }
  //   else {
  //     console.log('No route for the current step');
  //   }
  // }
  // Form groups for stepper
  // firstFormGroup = this._formBuilder.group({
  //   firstCtrl: ['', Validators.required],
  // });
  // secondFormGroup = this._formBuilder.group({
  //   secondCtrl: ['', Validators.required],
  // });