import { FlatTreeControl } from '@angular/cdk/tree';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-care-plan',
  templateUrl: './care-plan.component.html',
  styleUrl: './care-plan.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class CarePlanComponent {
  assessmentId!: string;


  constructor(private route: ActivatedRoute) {}

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

  onPatientSelected(event: any) {
    // Handle patient selection if needed
  }
}
