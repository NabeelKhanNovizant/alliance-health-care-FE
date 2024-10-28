// care-plan.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CarePlanModel } from '../../models/care-plan-model';
import { ApiResponse } from '../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class CarePlanService {
  apiResponse : ApiResponse | null  = null;
  updateApiResponse(resp: ApiResponse) {
    this.apiResponse = resp;
  }
  private carePlanModelSource = new BehaviorSubject<CarePlanModel | null>(null);
  currentCarePlanModel = this.carePlanModelSource.asObservable();
  
  updateCarePlanModel(carePlanModel: CarePlanModel) {
    this.carePlanModelSource.next(carePlanModel);
  }
}
