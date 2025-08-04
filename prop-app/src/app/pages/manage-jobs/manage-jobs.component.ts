import {Component, OnInit} from '@angular/core';
import {CommonModule, DatePipe} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Jobs} from "../../model/jobs.model";
import {Router, RouterLink} from "@angular/router";
import {JobService} from "../../services/job.service";
import {SweetAlertMessage} from "../../services/sweet.alert";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-manage-jobs',
  standalone: true,
  providers: [JobService, SweetAlertMessage],
  imports: [CommonModule, RouterLink, FormsModule, HttpClientModule, DatePipe],
  templateUrl: './manage-jobs.component.html',
  styleUrl: './manage-jobs.component.css'
})
export class ManageJobsComponent implements OnInit {
  jobs: any[] = [];
  searchTerm = '';
  locationFilter = '';
  jobTypeFilter = '';
  jobsList: Jobs[] = [];


  userEmail: string | null = '';


  constructor(private router: Router, private jobService: JobService, private sweetAlertMessage: SweetAlertMessage) {
  }

  ngOnInit() {
    this.getUserLocalStorage();
    this.getAllJobs();
  }

  getAllJobs(): void {
    this.sweetAlertMessage.showLoading();
    if (this.userEmail) {
      this.jobService.getEmployerJobs(this.userEmail).subscribe(response => {
        this.jobsList = response?.data;
        this.jobs = response?.data;
        this.sweetAlertMessage.closeBox();
      }, error => {
        const errorMessage = error.error.error
        this.sweetAlertMessage.bannerMessage(errorMessage, 'warning');
      });
    } else {
      this.sweetAlertMessage.bannerMessage('Please login to view jobs', 'warning')
    }
  }

  closeJob(reference: string): void {

    if (reference) {
      this.sweetAlertMessage.confirmation('Are you sure?', "you want to close this job application?",)
        .then(result => {
          if (result.isConfirmed) {
            // If Confirmed the delete
            this.sweetAlertMessage.showLoading();
            this.jobService.closeJob(reference).subscribe(response => {
              this.sweetAlertMessage.bannerMessage('status updated successfully!', 'success');
              this.getAllJobs();
            }, error => {
              const errorMessage = error.error.error
              this.sweetAlertMessage.bannerMessage(errorMessage, 'warning');
            });
          } else {
            //    DO Nothing
          }
        });
    } else {
      this.sweetAlertMessage.bannerMessage('Please login to view jobs', 'warning')
    }
  }


  jobStatus(status: string) {
    return status === 'OPEN' ? 'OPEN' : 'CLOSED';
  }

  formatJobType(type: string): string {
    if (type) {
      return type
        .toLowerCase()
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    } else {
      return "";
    }
  }

  filterJobsByLocation(): void {
    if (this.locationFilter) {
      this.sweetAlertMessage.showLoading();
      if (this.userEmail) {
        this.jobsList = [];
        this.jobService.getAllJobsByUserAndLocation(this.userEmail, this.locationFilter).subscribe(response => {
          this.jobsList = response?.data;
          this.jobs = response?.data;
          this.sweetAlertMessage.closeBox();
        }, error => {
          const errorMessage = error.error.error
          this.sweetAlertMessage.bannerMessage(errorMessage, 'warning');
        });
      }
    } else {
      this.getAllJobs();
    }
  }

  filterJobsByJobType(): void {
    if (this.jobTypeFilter) {
      this.sweetAlertMessage.showLoading();
      if (this.userEmail) {
        this.jobsList = [];
        this.jobService.getAllJobsByUserAndJobTypes(this.userEmail, [this.jobTypeFilter]).subscribe(response => {
          this.jobsList = response?.data;
          this.jobs = response?.data;
          this.sweetAlertMessage.closeBox();
        }, error => {
          const errorMessage = error.error.error
          this.sweetAlertMessage.bannerMessage(errorMessage, 'warning');
        });
      }
    } else {
      this.getAllJobs();
    }
  }

  filterJobs() {
    // If there is a search term and it's at least 2 characters, filter
    if (this.searchTerm && this.searchTerm.trim().length >= 2) {
      const search = this.searchTerm.toLowerCase();
      const filtered: any[] = [];

      this.jobs.forEach((job, index) => {
        if (
          job.title.toLowerCase().includes(search) ||
          job.company.toLowerCase().includes(search)
        ) {
          filtered.push(job);
        }
      });
      this.jobsList = [...filtered];
    } else {
      this.jobsList = [...this.jobs];
    }
  }

  addJob(job: any) {
    this.router.navigate(['/create-jobs', '12345']);
  }

  saveJob(job: any) {
    this.sweetAlertMessage.showLoading();
    if (this.userEmail) {
      this.jobService.saveJob(this.userEmail, job.reference).subscribe(response => {
        if (response?.status == 201) {
          this.sweetAlertMessage.bannerMessage('Successfully closed application!', 'success');
        }

      }, error => {
        const errorMessage = error?.error?.error
        this.sweetAlertMessage.bannerMessage(errorMessage, 'warning');
      });
    } else {
      this.sweetAlertMessage.bannerMessage('Login to saved job!', 'warning');
    }
  }

  getUserLocalStorage() {
    if (typeof window !== 'undefined') {
      this.userEmail = window.localStorage.getItem('userEmail');
    }
  }
}
