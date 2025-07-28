import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {JobService} from "../../services/job.service";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-job-list',
  standalone: true,
  providers: [JobService],
  imports: [CommonModule, RouterLink, FormsModule, HttpClientModule],
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  jobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'Tech Solutions Inc.',
      location: 'Cape Town',
      type: 'Full-time',
      salary: 'R60,000 - R80,000',
      posted: '2 days ago',
      description: 'We are looking for an experienced Frontend Developer to join our team...'
    },
    {
      id: 2,
      title: 'Financial Analyst',
      company: 'Global Finance',
      location: 'Johannesburg',
      type: 'Full-time',
      salary: 'R45,000 - R60,000',
      posted: '1 week ago',
      description: 'Join our finance team as a Financial Analyst...'
    },
    {
      id: 3,
      title: 'Nurse Practitioner',
      company: 'City Hospital',
      location: 'Durban',
      type: 'Part-time',
      salary: 'R35,000 - R45,000',
      posted: '3 days ago',
      description: 'Looking for a qualified Nurse Practitioner...'
    },
    {
      id: 4,
      title: 'Marketing Manager',
      company: 'Creative Agency',
      location: 'Pretoria',
      type: 'Full-time',
      salary: 'R50,000 - R70,000',
      posted: '5 days ago',
      description: 'Lead our marketing team to new heights...'
    },
    {
      id: 5,
      title: 'Backend Developer',
      company: 'Software House',
      location: 'Remote',
      type: 'Full-time',
      salary: 'R55,000 - R75,000',
      posted: '1 day ago',
      description: 'Looking for a skilled Backend Developer...'
    },
    {
      id: 6,
      title: 'HR Manager',
      company: 'Corporate Solutions',
      location: 'Johannesburg',
      type: 'Full-time',
      salary: 'R45,000 - R65,000',
      posted: '2 weeks ago',
      description: 'Manage our human resources department...'
    }
  ];

  filteredJobs = [...this.jobs];
  searchTerm = '';
  locationFilter = '';
  jobTypeFilter = '';

  constructor(private jobService: JobService) {
  }

  ngOnInit() {
    this.getAllJobs();
  }

  getAllJobs() {
    this.jobService.getAllJobs().subscribe(response => {

      let jobs = response.data.content;
      console.log(jobs)
    }, error => {
      console.log(error)
    });
  }

  filterJobs() {
    this.filteredJobs = this.jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesLocation = this.locationFilter ? job.location.toLowerCase() === this.locationFilter.toLowerCase() : true;
      const matchesType = this.jobTypeFilter ? job.type.toLowerCase() === this.jobTypeFilter.toLowerCase() : true;

      return matchesSearch && matchesLocation && matchesType;
    });
  }

  saveJob(job: any) {
    console.log('Saved job:', job.title);
    // Add real saving logic here (e.g., call API or update local state)
  }
}
