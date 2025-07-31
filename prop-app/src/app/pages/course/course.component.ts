import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {SweetAlertMessage} from "../../services/sweet.alert";
import {CourseService} from "../../services/course.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-course',
  standalone: true,
  providers: [SweetAlertMessage, CourseService],
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent {
  @Input() isEditMode = false;
  @Input() existingCourse: any = null;
  userEmail: string | null = '';
  course: any = {
    id: null,
    title: '',
    description: '',
    category: '',
    duration: '',
    level: 'Beginner',
    price: '',
    language: 'English',
    thumbnailUrl: '',
    status: 'ACTIVE',
    modules: [],
    createdBy: '',
    aboutTutor: '',
    userEmail: ''
  };

  constructor(private courseService: CourseService, private sweetAlertMessage: SweetAlertMessage,
              private router: Router, private activatedRouter: ActivatedRoute) {
    this.existingCourse = this.activatedRouter.snapshot.paramMap.get('courseId')!;

  }

  ngOnInit() {
    this.getUserLocalStorage();
    if (this.existingCourse) {
      this.course = JSON.parse(JSON.stringify(this.existingCourse)); // Deep copy for edit
      this.isEditMode = true;
      this.getCourseById(this.existingCourse);
    }
  }

  addModule() {
    this.course.modules.push({
      title: '',
      order: this.course.modules.length + 1,
      description: '',
      videoUrl: '',
      materials: []
    });
  }

  removeModule(index: number) {
    this.course.modules.splice(index, 1);
  }

  addMaterial(moduleIndex: number) {
    this.course.modules[moduleIndex].materials.push('');
  }

  removeMaterial(moduleIndex: number, materialIndex: number) {
    this.course.modules[moduleIndex].materials.splice(materialIndex, 1);
  }

  getCourseById(id: string) {
    this.courseService.getCourseById(id).subscribe(response => {
     this.course =  response.data;
    }, error => {
      const errorMessage = error?.error?.error;
      this.sweetAlertMessage.bannerMessage(errorMessage, 'warning');
    });
  }

  onSubmit() {
    this.course.userEmail = this.userEmail;
    if (this.isEditMode || this.course.id) {
      this.courseService.updateCourse(this.course).subscribe(response => {
        this.sweetAlertMessage.showSuccessMessage('Successfully Updated Course').then(data => {
          this.routeToCourse()
        });
      }, error => {
        const errorMessage = error?.error?.error;
        this.sweetAlertMessage.bannerMessage(errorMessage, 'warning');
      });
    } else {
      this.courseService.createCourse(this.course).subscribe(response => {
        this.sweetAlertMessage.showSuccessMessage('Successfully Created Course').then(data => {
          this.routeToCourse()
        });
      }, error => {
        const errorMessage = error?.error?.error;
        this.sweetAlertMessage.bannerMessage(errorMessage, 'warning');
      });
    }
  }

  routeToCourse() {
    this.router.navigate(['/courses']);
  }

  getUserLocalStorage() {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('userEmail', 'embottabi@gmail.com');

      this.userEmail = window.localStorage.getItem('userEmail');
    }
  }
}
