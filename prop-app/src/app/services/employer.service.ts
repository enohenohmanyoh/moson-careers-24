import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

import { Job, JobStatus } from '../model/job.model';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {
  private apiUrl = 'api/employer'; // Adjust to your API endpoint

  constructor(private http: HttpClient) {}

  // Get all jobs posted by employer
  getEmployerJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.apiUrl}/jobs`).pipe(
      catchError(this.handleError)
    );
  }

  // Create new job posting
  createJob(job: Omit<Job, 'id'>): Observable<Job> {
    return this.http.post<Job>(`${this.apiUrl}/jobs`, job).pipe(
      catchError(this.handleError)
    );
  }

  // Update existing job
  updateJob(id: number, job: Partial<Job>): Observable<Job> {
    return this.http.patch<Job>(`${this.apiUrl}/jobs/${id}`, job).pipe(
      catchError(this.handleError)
    );
  }

  // Delete job posting
  deleteJob(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/jobs/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Get statistics
  getStatistics(): Observable<JobStatistics> {
    return this.http.get<JobStatistics>(`${this.apiUrl}/stats`).pipe(
      catchError(this.handleError)
    );
  }

  // Handle API errors
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}