import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {JobService} from "../../services/job.service";
import {SweetAlertMessage} from "../../services/sweet.alert";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-home',
  standalone: true,
  providers: [JobService, SweetAlertMessage],
  imports: [CommonModule, RouterLink, HttpClientModule, ReactiveFormsModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  popularCategories = [
    {name: 'IT & Software', jobs: 1245},
    {name: 'Finance', jobs: 892},
    {name: 'Healthcare', jobs: 756},
    {name: 'Engineering', jobs: 1123},
    {name: 'Education', jobs: 543},
    {name: 'Marketing', jobs: 678}
  ];

  jobsList = [
    {
      title: 'Senior Frontend Developer',
      company: 'Tech Solutions Inc.',
      location: 'Cape Town',
      type: 'Full-time',
      salary: 'R60,000 - R80,000'
    }
  ];
  jobs: any[] = [];
  locationFilter: string = ''
  searchTerm: string = ''

  constructor(private jobService: JobService, private sweetAlertMessage: SweetAlertMessage,
              private router: Router) {
  }

  ngOnInit() {

    this.getAllJobs()
  }

  getAllJobs(): void {
    this.jobService.getAllJobs('?page=0&size=5&sort=createdAt,desc').subscribe(response => {
      this.jobsList = response?.data?.content;
      this.jobs = response?.data?.content;
    }, error => {
      const errorMessage = error.error.error
      this.sweetAlertMessage.bannerMessage(errorMessage, 'warning');
    });
  }

  filterJobsByLocation(): void {
    if (this.locationFilter) {
      this.jobService.getAllJobsByLocation(`${this.locationFilter}&page=0&size=5&sort=createdAt,desc`).subscribe(response => {
        this.jobsList = response?.data?.content;
        this.jobs = response?.data?.content;
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

  viewJob(job: any): void{
    this.router.navigate(['/jobs-details/', job.reference])
  }
}
