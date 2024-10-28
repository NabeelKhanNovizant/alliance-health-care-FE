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
  showContent: boolean = true;

  constructor(private router: Router, private cdr: ChangeDetectorRef) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
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




}