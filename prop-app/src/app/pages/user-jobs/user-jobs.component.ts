import {Component, OnInit} from '@angular/core';
import {CommonModule, DatePipe} from "@angular/common";
import {UserService} from "../../services/user.service";
import {SweetAlertMessage} from "../../services/sweet.alert";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {JobService} from "../../services/job.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-user-jobs',
  standalone: true,
  providers: [UserService, SweetAlertMessage, JobService],
  imports: [CommonModule, FormsModule, HttpClientModule, DatePipe],
  templateUrl: './user-jobs.component.html',
  styleUrl: './user-jobs.component.css'
})
export class UserJobsComponent implements OnInit {

  userEmail: string | null = null;
  jobs: any[] = [];
  title: any = 'Saved Jobs';
  type: any = '';

  constructor(private sweetAlertMessage: SweetAlertMessage, private jobService: JobService,
              private userService: UserService, private router: Router,
              private activatedRoute: ActivatedRoute) {
    const urlSegments = this.activatedRoute.snapshot.url;
     this.type = urlSegments.map(segment => segment.path).join('/');
  }

  ngOnInit() {
    this.getUserLocalStorage();
    this.getUserDetails();
  }

  getUserLocalStorage() {
    if (typeof window !== 'undefined') {
      this.userEmail = window.localStorage.getItem('userEmail');
    }
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


  getUserDetails() {
    if (this.userEmail) {
      this.userService.getUserByEmail(this.userEmail).subscribe(response => {
        if (this.type == 'saved-jobs') {
          this.jobs = response?.data?.savedJobs?.map((job: { job: any; }) => job.job);
          this.title = 'Saved Jobs';
        } else {
          this.jobs = response?.data?.appliedJobs?.map((job: { job: any; }) => job.job);
          this.title = 'Applied Jobs';
        }
      }, error => {
        const errorMessage = error?.error?.error
        this.sweetAlertMessage.bannerMessage(errorMessage, 'warning');
      });
    }
  }

  viewJob(job: any) {
    this.router.navigate(['/jobs-details/', job.reference]);
  }

  applyForJob(job: any) {
    if (this.userEmail) {
      this.sweetAlertMessage.showLoading();
      this.jobService.applyForJob(this.userEmail, job.reference).subscribe(response => {
        if (response?.status == 201) {
          this.sweetAlertMessage.bannerMessage('Successfully applied job!', 'success');
        }

      }, error => {
        const errorMessage = error?.error?.error
        this.sweetAlertMessage.bannerMessage(errorMessage, 'warning');
      });
    } else {
      this.sweetAlertMessage.bannerMessage('Login to apply for job!', 'warning');
    }
  }
}
