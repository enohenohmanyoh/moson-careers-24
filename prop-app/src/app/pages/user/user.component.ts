import {Component, Input, OnInit} from '@angular/core';
import {SweetAlertMessage} from "../../services/sweet.alert";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-user',
  standalone: true,
  providers: [UserService, SweetAlertMessage],
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  @Input() isEditMode = false;
  @Input() existingUser: any = null;

  user: any = {
    firstName: '',
    surname: '',
    email: '',
    password: '',
    summary: '',
    role: 'JOB_SEEKER',
    skills: [],
    educations: [],
    employmentRecords: [],
    createdAt: new Date().toISOString(),
  };

  skillsString = '';
  userEmail: string | null = '';

  constructor(private sweetAlertMessage: SweetAlertMessage, private userService: UserService
    , private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.getUserLocalStorage();
    if (this.isEditMode && this.existingUser) {
      this.user = {...this.existingUser};
      this.skillsString = this.user.skills?.join(', ') || '';
    }
  }

  addEducation() {
    this.user.educations.push({
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: ''
    });
  }

  removeEducation(index: number) {
    this.user.educations.splice(index, 1);
  }

  addEmployment() {
    this.user.employmentRecords.push({
      companyName: '',
      jobTitle: '',
      location: '',
      responsibilities: ['']
    });
  }

  removeEmployment(index: number) {
    this.user.employmentRecords.splice(index, 1);
  }

  onCvUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        // reader.result contains the base64 data
        const base64String = (reader.result as string).split(',')[1]; // remove prefix (data:application/pdf;base64,)
        this.user.cvProfile = base64String;

        console.log('Base64 CV:', this.user.cvProfile);
      };

      reader.onerror = (error) => {
        console.error('Error converting file to Base64:', error);
        this.sweetAlertMessage.bannerMessage('Failed to upload CV. Try again!', 'warning');
      };

      reader.readAsDataURL(file); // Converts file to Base64
    }
  }


  onSubmit() {
    this.user.skills = this.skillsString.split(',').map((s: string) => s.trim());
    console.log('User saved:', this.user);
    this.userService.saveUser(this.user).subscribe(response => {
      this.sweetAlertMessage.bannerMessage('User Created successfully!', 'success');
      this.user = {}
      this.router.navigate(['/list-jobs'])
    }, error => {
      const errorMessage = error?.error?.error;
      this.sweetAlertMessage.bannerMessage(errorMessage, 'warning');
    });
  }

  onCancel() {
    this.user = {}
    this.router.navigate(['/list-jobs'])
  }

  getUserLocalStorage() {
    if (typeof window !== 'undefined') {
      this.userEmail = window.localStorage.getItem('userEmail');
    }
  }
}
