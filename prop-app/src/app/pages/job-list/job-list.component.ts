import {Component, OnInit} from '@angular/core';
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

  filteredJobs = [...this.jobs];
  searchTerm = '';
  locationFilter = '';
  jobTypeFilter = '';
  jobsList: Jobs[] = [];

  constructor(private jobService: JobService) {
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
    if (this.searchTerm && this.searchTerm.length > 3) {
      let filteredJobs = this.jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(this.searchTerm.toLowerCase());
        const matchesLocation = this.locationFilter ? job.location.toLowerCase() === this.locationFilter.toLowerCase() : true;
        const matchesType = this.jobTypeFilter ? job.type.toLowerCase() === this.jobTypeFilter.toLowerCase() : true;

        return matchesSearch && matchesLocation && matchesType;
      }).map(job => job);
      this.filteredJobs = filteredJobs;
    }
  }

  saveJob(job: any) {
    console.log('Saved job:', job.title);
    // Add real saving logic here (e.g., call API or update local state)
  }
}
