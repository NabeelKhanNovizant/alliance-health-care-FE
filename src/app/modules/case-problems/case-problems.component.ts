import { AfterViewInit, Component } from '@angular/core';
import { CarePlanService } from '../services/care-plan-service.service';
import { CarePlanProblem } from '../../models/care-plan-model';

@Component({
  selector: 'app-case-problems',
  templateUrl: './case-problems.component.html',
  styleUrl: './case-problems.component.scss'
})
export class CaseProblemsComponent implements AfterViewInit {
  carePlanModel$ = this.carePlanService.currentCarePlanModel;
  problems: CarePlanProblem[] = [];

  constructor(private carePlanService: CarePlanService) {}

  ngAfterViewInit(): void {
    this.carePlanModel$.subscribe((model) => {
      if (model) {
        this.problems = model.problems;
      }
    });
  }
}

