import { FlatTreeControl } from '@angular/cdk/tree';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { CasePopupComponent } from '../../case-popup/case-popup.component';
import { ProblemPopupComponent } from '../../problem-popup/problem-popup.component';
import { MilestonePopupComponent } from '../../milestone-popup/milestone-popup.component';
import { GoalPopupComponent } from '../../goal-popup/goal-popup.component';
import { ActivatedRoute } from '@angular/router';
import { CarePlanService } from '../../services/care-plan-service.service';
import { map, take } from 'rxjs/operators';
import { AssessmentPopupComponent } from '../../assessment-popup/assessment-popup.component';


interface TreeNode {
  name: string;
  children?: TreeNode[];
}

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
  checked?: boolean;
}

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
@Component({
  selector: 'app-care-plan',
  templateUrl: './care-plan.component.html',
  styleUrl: './care-plan.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class CarePlanComponent {
  assessmentId!: number;

  readonly panelOpenState = signal(false);
  hasCaseName$ = this.carePlanService.currentCarePlanModel.pipe(
    map((carePlanModel) => !!carePlanModel?.caseName)
  );
  hasProblems$ = this.carePlanService.currentCarePlanModel.pipe(
    map((carePlanModel) => !!carePlanModel?.problems?.length)
  );
  hasGoal$ = this.carePlanService.currentCarePlanModel.pipe(
    map((carePlanModel) =>!!carePlanModel?.problems?.flatMap((problem) => problem.goals)?.length)
  )
  hasMilestone$ = this.carePlanService.currentCarePlanModel.pipe(
    map((carePlanModel) =>
      carePlanModel?.problems?.some(problem =>
        problem.goals?.some(goal => goal.milestones?.length > 0)
      ) || false
    )
  );
  

  constructor(private dialog: MatDialog,private route: ActivatedRoute,private carePlanService: CarePlanService) {
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.assessmentId = params['id'];
      if (this.assessmentId) {
        this.loadPatientData();
      }
    });
  }

  private loadPatientData() {
    console.log('Loading patient data for ID:', this.assessmentId);
  }

  openViewAssessment(){
    const dialogRef = this.dialog.open(AssessmentPopupComponent, {
      width: '1200px',
      data: {}, 
    });

    dialogRef.afterClosed().subscribe((result) => {
     // console.log('Dialog closed, selected country:', result);
    });
  }
  opeCaseDialog(): void {
    const dialogRef = this.dialog.open(CasePopupComponent, {
      width: '600px',
      data: {}, 
    });

    dialogRef.afterClosed().subscribe((result) => {
     // console.log('Dialog closed, selected country:', result);
    });
  }


opeProblemDialog(): void {
    const dialogRef = this.dialog.open(ProblemPopupComponent, {
      width: '600px',
      data: {}, 
    });
  
    dialogRef.afterClosed().subscribe((result) => {
    //  console.log('Dialog closed, selected country:', result);
    });

  
}

  
opeGoalDialog(): void {
  const dialogRef = this.dialog.open(GoalPopupComponent, {
    width: '600px',
    data: {}, 
  });

  dialogRef.afterClosed().subscribe((result) => {
  //  console.log('Dialog closed, selected country:', result);
  });
}

opeMilestoneDialog(): void {
  const dialogRef = this.dialog.open(MilestonePopupComponent, {
    width: '600px',
    data: {}, 
  });

  dialogRef.afterClosed().subscribe((result) => {
 //   console.log('Dialog closed, selected country:', result);
  });
}

OnSubmit() {
  this.carePlanService.currentCarePlanModel.pipe(take(1)).subscribe((carePlanModel) => {
    console.log('Care Plan on Submitting', carePlanModel);
  });
}

}
