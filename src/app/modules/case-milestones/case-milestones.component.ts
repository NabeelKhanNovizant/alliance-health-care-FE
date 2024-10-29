import { AfterViewInit, Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CarePlanMilestone } from '../../models/care-plan-model';
import { CarePlanService } from '../services/care-plan-service.service';

@Component({
  selector: 'app-case-milestones',
  templateUrl: './case-milestones.component.html',
  styleUrl: './case-milestones.component.scss'
})
export class CaseMilestonesComponent implements AfterViewInit {
  carePlanModel$ = this.carePlanService.currentCarePlanModel;

  milestones$: Observable<CarePlanMilestone[]> = this.carePlanModel$.pipe(
    map((model) =>
      model
        ? model.problems.flatMap((problem) => 
            problem.goals.flatMap((goal) => goal.milestones)
          )
        : []
    )
  );

  constructor(private carePlanService: CarePlanService) {}

  ngAfterViewInit(): void {}
}
