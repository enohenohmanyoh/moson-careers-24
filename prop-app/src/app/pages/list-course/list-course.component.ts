import {Component, OnInit} from '@angular/core';
import {SweetAlertMessage} from "../../services/sweet.alert";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {CourseService} from "../../services/course.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-course',
  standalone: true,
  providers: [CourseService, SweetAlertMessage],
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './list-course.component.html',
  styleUrl: './list-course.component.css'
})
export class ListCourseComponent implements OnInit {

  searchTerm: string = '';
  courseList: any[] = [];
  courses: any[] = [];

  constructor(private courseService: CourseService, private sweetAlertMessage: SweetAlertMessage,
              private router: Router,) {
  }

  ngOnInit() {
    this.getCourses();
  }

  getCourses(): void {
    this.courseService.getAllCourses(0, 25, 'createdAt,desc').subscribe(response => {
      this.courseList = response?.data?.content;
      this.courses = response?.data?.content;
    }, error => {
      const errorMessage = error.error.error
      this.sweetAlertMessage.bannerMessage(errorMessage, 'warning');
    });
  }

  filterCourses(): void {

  }

  createCourse(): void {
    this.router.navigate(['/courses/create']);
  }

  viewCourse(course: any): void {
    console.log("View Course")
    this.router.navigate([`/courses/view/${course.id}`]).then();
  }

  editCourse(course: any): void {
    console.log("Edit Course")
    this.router.navigate([`/courses/edit/${course.id}`, course]).then();
  }

  deleteCourse(courseId: string): void {
    this.courseService.deleteCourseById(courseId).subscribe(response => {
      this.sweetAlertMessage.bannerMessage('Course Deactivated Successfully', 'success');
    this.getCourses();
      }, error => {
      const errorMessage = error.error.error
      this.sweetAlertMessage.bannerMessage(errorMessage, 'warning');
    });
  }
}
