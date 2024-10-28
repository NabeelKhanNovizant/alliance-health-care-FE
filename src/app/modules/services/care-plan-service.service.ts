// care-plan.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CarePlanModel } from '../../models/care-plan-model';

@Injectable({
  providedIn: 'root'
})
export class CarePlanService {
  private carePlanModelSource = new BehaviorSubject<CarePlanModel | null>(null);
  currentCarePlanModel = this.carePlanModelSource.asObservable();

  updateCarePlanModel(carePlanModel: CarePlanModel) {
    this.carePlanModelSource.next(carePlanModel);
  }
}
