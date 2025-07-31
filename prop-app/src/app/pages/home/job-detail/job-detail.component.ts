import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {JobService} from "../../../services/job.service";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {SweetAlertMessage} from "../../../services/sweet.alert";

@Component({
  selector: 'app-job-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [JobService, SweetAlertMessage],
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {
  job: any = {}
  userEmail: string | null = '';

  relatedJobs = [
    {
      id: 5,
      title: 'Backend Developer',
      company: 'Software House',
      location: 'Remote',
      type: 'Full-time',
      salary: 'R55,000 - R75,000',
      posted: '1 day ago',
      jobTypes: [],
      createdAt: '',
    },
    {
      id: 6,
      title: 'UI/UX Designer',
      company: 'Digital Agency',
      location: 'Johannesburg',
      type: 'Full-time',
      salary: 'R45,000 - R60,000',
      posted: '3 days ago',
      jobTypes: [],
      createdAt: '',
    }
  ];

  constructor(private router: Router, private activatedRouter: ActivatedRoute, private jobService: JobService,
              private sweetAlertMessage: SweetAlertMessage) {


  }


  ngOnInit() {
    this.getUserLocalStorage();
    let reference = this.activatedRouter.snapshot.paramMap.get('reference')!;
    this.viewJobByReference(reference);
  }

  viewJobByReference(reference: string) {
    this.jobService.getJobByJobReference(reference).subscribe(response => {
      this.job = response.data;
    }, error => {
      const errorMessage = error?.error?.error
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

  getUserLocalStorage() {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('userEmail', 'embottabi@gmail.com');

      this.userEmail = window.localStorage.getItem('userEmail');
    }
  }


  saveJob(job: any) {
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


  applyForJob(job: any) {
    if (this.userEmail) {
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

  viewJobDetails(jobId: number) {
    this.router.navigate(['/jobs', jobId]);
  }

}
