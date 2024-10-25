import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatButtonModule} from '@angular/material/button';
import { MaterialModule } from './material/material.module';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CaseSelectionComponent } from './modules/case/case-selection/case-selection.component';
import { SelectSubProblemsComponent } from './modules/sub-problems/select-sub-problems/select-sub-problems.component';
import { CarePlanComponent } from './modules/care-plan/care-plan/care-plan.component';
import { PlanViewComponent } from './modules/PlanView/plan-view/plan-view.component';
import { MemberDemoComponent } from './modules/member-demo/member-demo.component';
import { AssessmentDetailsComponent } from './modules/assessment-details/assessment-details.component';
import { CareManagementComponent } from './modules/care-management/care-management.component';
import { CaseProblemsComponent } from './modules/case-problems/case-problems.component';
import { CaseGoalsComponent } from './modules/case-goals/case-goals.component';
import { CaseMilestonesComponent } from './modules/case-milestones/case-milestones.component';
import { HttpClientModule } from '@angular/common/http';
import { CasePopupComponent } from './modules/case-popup/case-popup.component';
import { GoalPopupComponent } from './modules/goal-popup/goal-popup.component';
import { ProblemPopupComponent } from './modules/problem-popup/problem-popup.component';
import { MilestonePopupComponent } from './modules/milestone-popup/milestone-popup.component';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    CaseSelectionComponent,
    SelectSubProblemsComponent,
    CarePlanComponent,
    PlanViewComponent,
    MemberDemoComponent,
    AssessmentDetailsComponent,
    CareManagementComponent,
    CaseProblemsComponent,
    CaseGoalsComponent,
    CaseMilestonesComponent,
    CasePopupComponent,
    GoalPopupComponent,
    ProblemPopupComponent,
    MilestonePopupComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MaterialModule,
    SharedModule,
    FormsModule, // <-- Add FormsModule
    ReactiveFormsModule, // <-- Add ReactiveFormsModule
    MatSelectModule, // <-- Ensure Material Select is imported
    MatCardModule, // <-- Ensure Material Card is imported
    MatFormFieldModule ,
    HttpClientModule
    
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
