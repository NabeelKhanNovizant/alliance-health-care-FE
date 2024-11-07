import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; // Import Observable
import { ApiResponse } from '../../models/api-response';
import { CarePlanRequest } from '../../models/care-plan-request';

@Injectable({
  providedIn: 'root'
})
export class PatientsInfoService {
  private baseUrl = 'https://api-careplan.azurewebsites.net/PatientData/';
  
  constructor(private http: HttpClient) { }
  
  getAllPatients(): Observable<any> {
    const url = `${this.baseUrl}`;
    return this.http.get(url);
  }

  getAssessment(patientId: number): Observable<any> {
    const url = `${this.baseUrl}Assessments/${patientId}`;
    return this.http.get(url);
  }

  getAssessmentDetail(assessmentId: number): Observable<CarePlanRequest> {
    const url = `${this.baseUrl}Assessment/${assessmentId}`;
    return this.http.get<CarePlanRequest>(url);
  }


  getCarePlan(assessmentId: number): Observable<ApiResponse>{
    const url = `${this.baseUrl}Careplan/${assessmentId}`;
    return this.http.get<ApiResponse>(url);
  }


  getGenAiCarePlan(assessmentId: number): Observable<ApiResponse>{
    const url = `${this.baseUrl}GenCareplan/${assessmentId}`;
    return this.http.get<ApiResponse>(url);
  }
  
}
