import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {JobService} from "../../services/job.service";
import {HttpClientModule} from "@angular/common/http";
import {Jobs} from "../../model/jobs.model";

@Component({
  selector: 'app-job-list',
  standalone: true,
  providers: [JobService],
  imports: [CommonModule, RouterLink, FormsModule, HttpClientModule],
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  jobs: any[] = [];

  filteredJobs: any = [];
  searchTerm = '';
  locationFilter = '';
  jobTypeFilter = '';
  jobsList: Jobs[] = [];

  constructor(private jobService: JobService, private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.getAllJobs();
  }

  getAllJobs(): void {
    this.jobService.getAllJobs().subscribe(response => {
      this.jobsList = response?.data?.content;
      this.jobs = response?.data?.content;
    }, error => {
      console.log(error)
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
      this.jobService.getAllJobsByLocation(this.locationFilter).subscribe(response => {
        this.jobsList = response?.data?.content;
        this.jobs = response?.data?.content;
      }, error => {
        console.log(error);
      });
    } else {
      this.getAllJobs();
    }
  }

  filterJobsByJobType(): void {
    if (this.jobTypeFilter) {
      this.jobService.getAllJobsByJobType([this.jobTypeFilter]).subscribe(response => {
        this.jobsList = response?.data?.content;
        this.jobs = response?.data?.content;
      }, error => {
        console.log(error);
      });
    } else {
      this.getAllJobs();
    }
  }

  filterJobs() {
    // If there is a search term and it's at least 2 characters, filter
    if (this.searchTerm && this.searchTerm.trim().length >= 2) {
      const search = this.searchTerm.toLowerCase();
      const filtered: any[] = []; // clear previous results

      this.jobs.forEach((job, index) => {
        if (
          job.title.toLowerCase().includes(search) ||
          job.company.toLowerCase().includes(search)
        ) {
          filtered.push(job); // push matching jobs
          console.log('index', index, job)
        }
      });
      this.jobsList = [...filtered];
      this.cd.markForCheck();
    } else {
      this.jobsList = [...this.jobs];
    }
  }


  saveJob(job: any) {
    console.log('Saved job:', job.title);
    // Add real saving logic here (e.g., call API or update local state)
  }
}
