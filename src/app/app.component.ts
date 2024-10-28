import { AfterViewInit, ChangeDetectorRef, Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { PatientComponent } from './modules/patients/components/patient/patient.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  title = 'TureCare';

  @ViewChild(PatientComponent) patientComponent!: PatientComponent;
  SelectedPatient: any = null;
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

  onPatientSelected(patient: any) {
    this.SelectedPatient = patient;
    console.log('Selected Patient: ', this.SelectedPatient);
    this.cdr.detectChanges(); 
  }

  OnSelect() {
    const patientId = this.patientComponent.selectedPatient.id;
    console.log(patientId);
    this.router.navigate(['/care-plan', patientId]);
}


}