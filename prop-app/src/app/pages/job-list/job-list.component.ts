import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {JobService} from "../../services/job.service";
import {HttpClientModule} from "@angular/common/http";
import {Jobs} from "../../model/jobs.model";
import {SweetAlertMessage} from "../../services/sweet.alert";

@Component({
  selector: 'app-job-list',
  standalone: true,
  providers: [JobService, SweetAlertMessage],
  imports: [CommonModule, RouterLink, FormsModule, HttpClientModule],
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  jobs: any[] = [];
  searchTerm = '';
  locationFilter = '';
  jobTypeFilter = '';
  jobsList: Jobs[] = [];


  userEmail: string | null = '';


  constructor(private jobService: JobService, private sweetAlertMessage: SweetAlertMessage) {
  }

  ngOnInit() {
    this.getAllJobs();
    this.getUserLocalStorage();
  }

  getAllJobs(): void {
    this.sweetAlertMessage.showLoading();
    this.jobService.getAllJobs().subscribe(response => {
      this.jobsList = response?.data?.content;
      this.jobs = response?.data?.content;
      this.sweetAlertMessage.closeBox();
    }, error => {
      const errorMessage = error.error.error
      this.sweetAlertMessage.bannerMessage(errorMessage, 'warning');
    });
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
      this.jobService.getAllJobsByLocation(this.locationFilter).subscribe(response => {
        this.jobsList = response?.data?.content;
        this.jobs = response?.data?.content;
        this.sweetAlertMessage.closeBox();
      }, error => {
        const errorMessage = error.error.error
        this.sweetAlertMessage.bannerMessage(errorMessage, 'warning');
      });
    } else {
      this.getAllJobs();
    }
  }

  filterJobsByJobType(): void {
    if (this.jobTypeFilter) {
      this.sweetAlertMessage.showLoading();
      this.jobService.getAllJobsByJobType([this.jobTypeFilter]).subscribe(response => {
        this.jobsList = response?.data?.content;
        this.jobs = response?.data?.content;
        this.sweetAlertMessage.closeBox();
      }, error => {
        const errorMessage = error.error.error
        this.sweetAlertMessage.bannerMessage(errorMessage, 'warning');
      });
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


  saveJob(job: any) {
    this.sweetAlertMessage.showLoading();
    if (this.userEmail) {
      this.jobService.saveJob(this.userEmail, job.reference).subscribe(response => {
        if (response?.status == 201) {
          this.sweetAlertMessage.bannerMessage('Successfully saved job!', 'success');
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
      window.localStorage.setItem('userEmail', 'embottabi@gmail.com');

      this.userEmail = window.localStorage.getItem('userEmail');
    }
  }
}
