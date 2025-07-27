import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { JobService } from '../../services/job.service';
import { Job } from '../../model/job.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-candidate',
  standalone: true,
  imports: [CommonModule, RouterLink,RouterModule],
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent {
  activeTab = 'dashboard';
  savedJobs: Job[] = [];
  appliedJobs: Job[] = [];
  isLoading = false;

  profile = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    headline: 'Frontend Developer',
    skills: ['Angular', 'TypeScript', 'HTML/CSS', 'JavaScript'],
    resume: 'john_doe_resume.pdf'
  };

  constructor(private jobService: JobService) {}

  ngOnInit() {
    this.loadCandidateData();
  }

  loadCandidateData() {
    this.isLoading = true;

    this.jobService.getSavedJobs().subscribe({
      next: (jobs) => {
        this.savedJobs = jobs;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading saved jobs:', error);
        this.isLoading = false;
      }
    });

    this.jobService.getAppliedJobs().subscribe({
      next: (jobs) => {
        this.appliedJobs = jobs;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading applied jobs:', error);
        this.isLoading = false;
      }
    });
  }

  switchTab(tab: string) {
    this.activeTab = tab;
  }
}
