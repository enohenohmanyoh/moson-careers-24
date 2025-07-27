import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Job,JobStatus } from '../model/job.model';

@Injectable({
  providedIn: 'root'
})
export class JobStaticService {
  private staticJobs: Job[] = [
    {
      id: 1,
      title: 'Senior Angular Developer',
      company: 'TechCorp',
      location: 'Cape Town',
      type: 'Full-time',
      salary: 'R70,000 - R90,000',
      status: 'active' as Status,
      description: 'Develop cutting-edge web applications using Angular...',
      requirements: [
        '5+ years Angular experience',
        'Strong TypeScript skills',
        'RxJS proficiency'
      ],
      postedAt: '2023-06-15',
      applications: 8,
      skills: ['Angular', 'TypeScript', 'NgRx']
    },
    {
      id: 2,
      title: 'UX/UI Designer',
      company: 'Creative Solutions',
      location: 'Johannesburg',
      type: 'Contract',
      salary: 'R45,000 - R60,000',
      status: 'active' as JobStatus,
      description: 'Design beautiful user interfaces for enterprise applications...',
      requirements: [
        '3+ years UI/UX experience',
        'Figma/Sketch expertise',
        'Portfolio required'
      ],
      postedAt: '2023-07-01',
      applications: 5,
      skills: ['Figma', 'UI Design', 'Prototyping']
    }
  ];

  constructor() {}

  // Get all jobs
  getJobs(): Observable<Job[]> {
    return of(this.staticJobs).pipe(delay(300)); // Simulate API delay
  }

  // Get job by ID
  getJobById(id: number): Observable<Job | undefined> {
    const job = this.staticJobs.find(j => j.id === id);
    return of(job).pipe(delay(200));
  }

  // Get jobs by status
  getJobsByStatus(status: JobStatus): Observable<Job[]> {
    const jobs = status === 'all' 
      ? this.staticJobs 
      : this.staticJobs.filter(j => j.status === status);
    return of(jobs).pipe(delay(250));
  }
}