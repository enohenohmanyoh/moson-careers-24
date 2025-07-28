import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {JobService} from "../../../services/job.service";

@Component({
  selector: 'app-job-detail',
  standalone: true,
  imports: [CommonModule],
  providers: [JobService],
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent {
  job = {

    id: 1,
    title: 'Senior Frontend Developer',
    company: 'Tech Solutions Inc.',
    location: 'Cape Town',
    type: 'Full-time',
    salary: 'R60,000 - R80,000',
    posted: '2 days ago',
    description: `
      <p>We are looking for an experienced Frontend Developer to join our growing team.
      The ideal candidate will have strong skills in Angular and a passion for creating
      beautiful, user-friendly interfaces.</p>

      <h3>Responsibilities:</h3>
      <ul>
        <li>Develop new user-facing features using Angular</li>
        <li>Build reusable components and front-end libraries</li>
        <li>Optimize applications for maximum speed and scalability</li>
        <li>Collaborate with back-end developers and web designers</li>
        <li>Ensure the technical feasibility of UI/UX designs</li>
      </ul>

      <h3>Requirements:</h3>
      <ul>
        <li>5+ years of experience with front-end development</li>
        <li>Strong proficiency in Angular (version 12+)</li>
        <li>Experience with TypeScript, HTML5, and CSS3</li>
        <li>Familiarity with RESTful APIs</li>
        <li>Knowledge of modern authorization mechanisms</li>
        <li>Familiarity with modern front-end build pipelines and tools</li>
      </ul>
    `,
    companyDescription: `
      <p>Tech Solutions Inc. is a leading software development company specializing in
      enterprise solutions. We work with clients across various industries to deliver
      high-quality, scalable software products.</p>
    `,
    benefits: [
      'Medical aid contribution',
      'Performance bonuses',
      'Flexible working hours',
      'Remote work options',
      'Professional development budget'
    ]
  };

  relatedJobs = [
    {
      id: 5,
      title: 'Backend Developer',
      company: 'Software House',
      location: 'Remote',
      type: 'Full-time',
      salary: 'R55,000 - R75,000',
      posted: '1 day ago'
    },
    {
      id: 6,
      title: 'UI/UX Designer',
      company: 'Digital Agency',
      location: 'Johannesburg',
      type: 'Full-time',
      salary: 'R45,000 - R60,000',
      posted: '3 days ago'
    }
  ];

  constructor(private router: Router, private jobService: JobService) {
  }

  viewJobDetails(jobId: number) {
    this.router.navigate(['/jobs', jobId]);
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

    })
  }
}
