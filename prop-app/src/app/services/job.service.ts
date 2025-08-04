import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {
  }


  getAllJobs(search: string = ''): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/job/all-jobs${search ? search : ''}`);

  }

  getJobByJobReference(reference: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/job/by-reference?reference=${reference}`);
  }

  getAllJobsByJobType(jobTypes: string[]): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/job/all-jobs-by-job-types?jobTypes=${jobTypes}`);
  }

  getAllJobsByLocation(location: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/job/all-jobs-by-location?location=${location}`);
  }

  getEmployerJobs(userEmail: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/job/by-user-email?userEmail=${userEmail}`);
  }

  getAllJobsByUserAndJobTypes(userEmail: string, jobTypes: string[]): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/job/by-user-email-job-types?jobTypes=${jobTypes}&userEmail=${userEmail}`);
  }

  getAllJobsByUserAndLocation(userEmail: string, location: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/job/by-user-email-location?location=${location}&userEmail=${userEmail}`);
  }

  closeJob(reference: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/job/close-job-by-reference?reference=${reference}`);
  }


  applyForJob(userEmail: string, jobReference: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/apply-for-job?userEmail=${userEmail}&jobReference=${jobReference}`, {});
  }

  saveJob(userEmail: string, jobReference: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/save-job?userEmail=${userEmail}&jobReference=${jobReference}`, {});
  }
}
