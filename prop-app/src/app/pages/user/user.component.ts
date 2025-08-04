import {Component, OnInit} from '@angular/core';
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
  isEditMode = false;
  existingUser: any = null;

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
  type: string | null = '';

  constructor(private sweetAlertMessage: SweetAlertMessage, private userService: UserService
    , private router: Router, private activatedRoute: ActivatedRoute) {
    let userEmail = this.activatedRoute.snapshot.paramMap.get('userEmail')!;
    const urlSegments = this.activatedRoute.snapshot.url;

    this.type = urlSegments.map(segment => segment.path).join('/');
    if (this.type === 'user-profile') {
      this.isEditMode = true;
    }
  }

  ngOnInit() {
    this.getUserLocalStorage();
    console.log('type', this.type)
    if (this.isEditMode) {
      this.getUserDetails();
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


  submit(): void {
    this.sweetAlertMessage.showLoading();
    if (this.existingUser) {
      this.onupdateSubmit();
    } else {
      this.onCreateSubmit();
    }
  }

  onCreateSubmit(): void {
    this.user.skills = this.skillsString.split(',').map((s: string) => s.trim());
    console.log('User saved:', this.user);

    this.userService.saveUser(this.user).subscribe(response => {
      this.sweetAlertMessage.bannerMessage('user created successfully!', 'success');
      this.user = {}
      this.router.navigate(['/list-jobs'])
    }, error => {
      const errorMessage = error?.error?.error;
      this.sweetAlertMessage.bannerMessage(errorMessage, 'warning');
    });
  }

  onupdateSubmit(): void {
    this.user.skills = this.skillsString.split(',').map((s: string) => s.trim());
    this.user = Object.assign(this.existingUser, this.user);
    this.userService.updateUser(this.user).subscribe(response => {
      this.sweetAlertMessage.bannerMessage('user updated successfully!', 'success');
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

  getUserDetails() {
    console.log('userEmail: ', this.userEmail);
    if (this.userEmail) {
      this.userService.getUserByEmail(this.userEmail).subscribe(response => {
        this.user = response.data;
        this.existingUser = response.data;
        this.skillsString = this.existingUser.skills?.join(', ') || '';
      }, error => {
        const errorMessage = error?.error?.error
        this.sweetAlertMessage.bannerMessage(errorMessage, 'warning');
      });
    }
  }
}
