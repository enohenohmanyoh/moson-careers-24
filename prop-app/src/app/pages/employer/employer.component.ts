import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { EmployerService } from '../../services/employer.service';
import { Job, JobStatistics, JobStatus } from '../../models/job.model';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { JobFormComponent } from '../../components/job-form/job-form.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-employer',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    JobFormComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.css']
})
export class EmployerComponent implements OnInit {
  // Component state
  activeTab: 'dashboard' | 'jobs' | 'applications' | 'profile' = 'dashboard';
  postedJobs: Job[] = [];
  filteredJobs: Job[] = [];
  stats: JobStatistics = {
    totalJobs: 0,
    activeJobs: 0,
    applications: 0,
    recentApplications: 0
  };
  
  // UI state
  isLoading: boolean = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  searchTerm: string = '';
  statusFilter: JobStatus | 'all' = 'all';
  
  // Form state
  showJobForm: boolean = false;
  jobToEdit: Job | null = null;

  constructor(
    private employerService: EmployerService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  // Data loading
  loadData(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.employerService.getEmployerJobs().subscribe({
      next: (jobs) => {
        this.postedJobs = jobs;
        this.filteredJobs = [...jobs];
        this.calculateStatistics();
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.handleError(error, 'Failed to load jobs');
      }
    });
  }

  calculateStatistics(): void {
    this.stats = {
      totalJobs: this.postedJobs.length,
      activeJobs: this.postedJobs.filter(job => job.status === 'active').length,
      applications: this.postedJobs.reduce((acc, job) => acc + (job.applications || 0), 0),
      recentApplications: this.postedJobs.reduce((acc, job) => {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        return job.postedAt && new Date(job.postedAt) > oneWeekAgo 
          ? acc + (job.applications || 0) 
          : acc;
      }, 0)
    };
  }

  // Job CRUD operations
  createNewJob(): void {
    this.jobToEdit = null;
    this.showJobForm = true;
  }

  editJob(job: Job): void {
    this.jobToEdit = { ...job };
    this.showJobForm = true;
  }

  saveJob(jobData: Job): void {
    this.isLoading = true;
    this.errorMessage = null;

    const observable = this.jobToEdit
      ? this.employerService.updateJob(this.jobToEdit.id, jobData)
      : this.employerService.createJob(jobData);

    observable.subscribe({
      next: (savedJob) => {
        this.handleJobSaveSuccess(savedJob);
      },
      error: (error: HttpErrorResponse) => {
        this.handleError(error, 'Failed to save job');
      }
    });
  }

  private handleJobSaveSuccess(savedJob: Job): void {
    if (this.jobToEdit) {
      const index = this.postedJobs.findIndex(j => j.id === savedJob.id);
      if (index !== -1) {
        this.postedJobs[index] = savedJob;
      }
    } else {
      this.postedJobs = [savedJob, ...this.postedJobs];
    }
    
    this.filteredJobs = [...this.postedJobs];
    this.calculateStatistics();
    this.showJobForm = false;
    this.isLoading = false;
    this.successMessage = `Job ${this.jobToEdit ? 'updated' : 'created'} successfully`;
    setTimeout(() => this.successMessage = null, 3000);
  }

  deleteJob(jobId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this job posting?'
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.isLoading = true;
        this.errorMessage = null;

        this.employerService.deleteJob(jobId).subscribe({
          next: () => {
            this.postedJobs = this.postedJobs.filter(job => job.id !== jobId);
            this.filteredJobs = this.filteredJobs.filter(job => job.id !== jobId);
            this.calculateStatistics();
            this.isLoading = false;
            this.successMessage = 'Job deleted successfully';
            setTimeout(() => this.successMessage = null, 3000);
          },
          error: (error: HttpErrorResponse) => {
            this.handleError(error, 'Failed to delete job');
          }
        });
      }
    });
  }

  // Filtering and pagination
  applyFilters(): void {
    this.filteredJobs = this.postedJobs.filter(job => {
      const matchesSearch = this.searchTerm 
        ? job.title.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
          job.description.toLowerCase().includes(this.searchTerm.toLowerCase())
        : true;
      
      const matchesStatus = this.statusFilter !== 'all' 
        ? job.status === this.statusFilter 
        : true;
      
      return matchesSearch && matchesStatus;
    });
    
    this.currentPage = 1; // Reset to first page when filters change
  }

  get paginatedJobs(): Job[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredJobs.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredJobs.length / this.itemsPerPage);
  }

  // Navigation
  viewApplications(jobId: number): void {
    this.router.navigate(['/employer/job', jobId, 'applications']);
  }

  // Helpers
  private handleError(error: HttpErrorResponse, defaultMessage: string): void {
    this.errorMessage = error.error?.message || defaultMessage;
    this.isLoading = false;
    setTimeout(() => this.errorMessage = null, 5000);
  }

  closeForm(): void {
    this.showJobForm = false;
    this.jobToEdit = null;
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.statusFilter = 'all';
    this.applyFilters();
  }
}