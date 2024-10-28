import { AfterViewInit, Component } from '@angular/core';
import { CarePlanGoal, CarePlanProblem } from '../../models/care-plan-model';
import { CarePlanService } from '../services/care-plan-service.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';

@Component({
  selector: 'app-case-goals',
  templateUrl: './case-goals.component.html',
  styleUrl: './case-goals.component.scss'
})
export class CaseGoalsComponent implements AfterViewInit {
  carePlanModel$ = this.carePlanService.currentCarePlanModel;

  goals$: Observable<CarePlanGoal[]> = this.carePlanModel$.pipe(
    map((model) => model ? model.problems.flatMap((problem) => problem.goals) : [])
  );

  constructor(private carePlanService: CarePlanService) {}

  ngAfterViewInit(): void {}
}
