import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from '../model/job.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = 'http://localhost:8080/api/job';

  constructor(private http: HttpClient) { }

  // Get all jobs
  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.apiUrl);
  }

  getAllJobs(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/all-jobs`);
  }

  // Updated to accept both string and number IDs
  getJobById(id: string | number): Observable<Job> {
    return this.http.get<Job>(`${this.apiUrl}/${id}`);
  }

  // Search jobs
  searchJobs(query: string, location?: string): Observable<Job[]> {
    const params: any = { q: query };
    if (location) params.location = location;
    return this.http.get<Job[]>(`${this.apiUrl}/search`, { params });
  }

  // Employer methods - updated to accept both string and number IDs
  getEmployerJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.apiUrl}/employer`);
  }

  postJob(jobData: any): Observable<Job> {
    return this.http.post<Job>(this.apiUrl, jobData);
  }

  updateJob(id: string | number, jobData: any): Observable<Job> {
    return this.http.put<Job>(`${this.apiUrl}/${id}`, jobData);
  }

  // Candidate methods - updated to accept both string and number IDs
  getSavedJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.apiUrl}/saved`);
  }

  getAppliedJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.apiUrl}/applications`);
  }

  applyForJob(userEmail: string, jobReference: any): Observable<any> {
    return this.http.post(` http://localhost:8080/api/user/apply-for-job?userEmail=t${userEmail}&jobReference=${jobReference}`,{});
  }

  saveJob(userEmail: string, jobReference: any): Observable<any> {
    return this.http.post(` http://localhost:8080/api/user/save-job?userEmail=t${userEmail}&jobReference=${jobReference}`,{});
  }
}
