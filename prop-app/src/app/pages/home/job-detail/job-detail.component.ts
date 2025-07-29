import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {JobService} from "../../../services/job.service";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-job-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [JobService],
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {
  job: any = {}

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

  constructor(private router: Router, private activedRouter: ActivatedRoute, private jobService: JobService) {

  }

  viewJobDetails(jobId: number) {
    this.router.navigate(['/jobs', jobId]);
  }

  ngOnInit() {
    let reference = this.activedRouter.snapshot.paramMap.get('reference')!;
    this.viewJobByReference(reference);
  }

  viewJobByReference(reference: string) {
    this.jobService.getJobByJobReference(reference).subscribe(response => {
      this.job = response.data;
    }, error => {
      console.log(error);
    })
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

  applyForJob() {
    let userEmail = ""
    let jobReference = ""
    this.jobService.applyForJob(userEmail, jobReference).subscribe(data => {

    }, error => {

    })
  }

  saveJob() {
    let userEmail = ""
    let jobReference = ""
    this.jobService.saveJob(userEmail, jobReference).subscribe(data => {

    }, error => {
      console.log(error)
    })
  }
}
