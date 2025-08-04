import {Component} from '@angular/core';
import {SweetAlertMessage} from "../../services/sweet.alert";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-create-jobs',
  standalone: true,
  providers: [UserService, SweetAlertMessage],
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './create-jobs.component.html',
  styleUrl: './create-jobs.component.css'
})
export class CreateJobsComponent {
  job: any = {
    status: 'OPEN',
    title: '',
    company: '',
    location: '',
    salary: '',
    description: '',
    reference: '',
    companyDescription: '',
    companyUrl: '',
    requiredSkills: [''],
    responsibilities: [''],
    benefits: [''],
    jobTypes: [],
  };

  jobTypeOptions = ['FULL_TIME', 'PART_TIME', 'CONTRACT', 'REMOTE', 'HYBRID'];
  locationOptions: string[] = [
    'Cape Town',
    'Johannesburg',
    'Durban',
    'Pretoria',
    'Bloemfontein',
    'Port Elizabeth',
    'Remote',
  ];


  toggleJobType(type: string) {
    const index = this.job.jobTypes.indexOf(type);
    if (index >= 0) {
      this.job.jobTypes.splice(index, 1);
    } else {
      this.job.jobTypes.push(type);
    }
  }

  submit() {
    console.log('Job submitted:', this.job);

  }


  newSkill = "";
  newResponsibility = "";
  newBenefit = "";

  addSkill(event: any) {
    const input = this.newSkill.trim();
    if (input) {
      this.job.requiredSkills.push(input);
      this.newSkill = '';
    }
    event.preventDefault(); // prevent form submission
  }

  removeSkill(index: number) {
    this.job.requiredSkills.splice(index, 1);
  }


  addResponsibility(event: any) {
    const input = this.newResponsibility.trim();
    if (input) {
      this.job.responsibilities.push(input);
      this.newResponsibility = '';
    }
    event.preventDefault(); // prevent form submission
  }

  removeResponsibility(index: number) {
    this.job.responsibilities.splice(index, 1);
  }

  addBenefit(event: any) {
    const input = this.newBenefit.trim();
    if (input) {
      this.job.benefits.push(input);
      this.newBenefit = '';
    }
    event.preventDefault(); // prevent form submission
  }

  removeBenefit(index: number) {
    this.job.benefits.splice(index, 1);
  }
}
