import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; // Import Observable

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
  
}
