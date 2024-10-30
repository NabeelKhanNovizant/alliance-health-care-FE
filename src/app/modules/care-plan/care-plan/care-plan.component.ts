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
import { take } from 'rxjs/operators';


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
  carePlanModel$ = this.carePlanService.currentCarePlanModel;
 
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
  opeCaseDialog(): void {
    const dialogRef = this.dialog.open(CasePopupComponent, {
      width: '600px',
      data: {}, // Optional: Pass data if needed
    });

    dialogRef.afterClosed().subscribe((result) => {
     // console.log('Dialog closed, selected country:', result);
    });
  }


opeProblemDialog(): void {
  this.carePlanModel$.pipe(take(1)).subscribe((carePlanModel) => {
    if (!carePlanModel || !carePlanModel.caseName) {
      alert("Please select a case");
      this.opeCaseDialog(); 
      return;
    }
    const dialogRef = this.dialog.open(ProblemPopupComponent, {
      width: '600px',
      data: {}, 
    });
  
    dialogRef.afterClosed().subscribe((result) => {
    //  console.log('Dialog closed, selected country:', result);
    });
  });
  
}

  
opeGoalDialog(): void {
  this.carePlanModel$.pipe(take(1)).subscribe((carePlanModel) => {
    if (!carePlanModel || carePlanModel.problems.length === 0) {
      alert("Please select a case with problems");
      this.opeProblemDialog();
      return; 
    }

    const dialogRef = this.dialog.open(GoalPopupComponent, {
      width: '600px',
      data: {}, 
    });
  
    dialogRef.afterClosed().subscribe((result) => {
    //  console.log('Dialog closed, selected country:', result);
    });
  });
}

opeMilestoneDialog(): void {
  this.carePlanModel$.pipe(take(1)).subscribe((carePlanModel) => {
    const hasGoals = carePlanModel?.problems.some(problem => problem.goals.length > 0);
    
    if (!hasGoals) {
      alert("Please select a case with goals");
      this.opeGoalDialog();
      return; 
    }

    const dialogRef = this.dialog.open(MilestonePopupComponent, {
      width: '600px',
      data: {}, 
    });

    dialogRef.afterClosed().subscribe((result) => {
   //   console.log('Dialog closed, selected country:', result);
    });
  });
}

  hasChild = (_: number, node: FlatNode) => node.expandable;

  onCheckboxChange(node: FlatNode) {
    node.checked = !node.checked;
    console.log(`${node.name} is checked: ${node.checked}`);
  }
}
