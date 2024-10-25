import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientComponent } from './modules/patients/components/patient/patient.component';
import { HomeStartComponent } from './modules/Main/components/home-start/home-start.component';
import { AppComponent } from './app.component';
import { CaseSelectionComponent } from './modules/case/case-selection/case-selection.component';
import { SelectSubProblemsComponent } from './modules/sub-problems/select-sub-problems/select-sub-problems.component';
import { CarePlanComponent } from './modules/care-plan/care-plan/care-plan.component';
import { PlanViewComponent } from './modules/PlanView/plan-view/plan-view.component';

const routes: Routes = [
  { path: 'patient', component: PatientComponent },
  { path: 'case-selection', component: CaseSelectionComponent },
  { path: 'sub-problems', component: SelectSubProblemsComponent},
  { path: 'care-plan', component: CarePlanComponent},
  { path: 'plan-view', component: PlanViewComponent},
  { path: '', redirectTo: 'patient', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [PatientComponent,HomeStartComponent];
