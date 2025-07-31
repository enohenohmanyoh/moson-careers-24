import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { JobListComponent } from './pages/job-list/job-list.component';
import { JobDetailComponent } from './pages/home/job-detail/job-detail.component';
import {CourseComponent} from "./pages/course/course.component";
import {ListCourseComponent} from "./pages/list-course/list-course.component";


export const routes: Routes = [
  { path: '', component: HomeComponent },
  {path: 'list-jobs', component: JobListComponent},
  {path: 'jobs-details/:reference', component: JobDetailComponent},
  {path: 'courses', component: ListCourseComponent},
  { path: 'courses/create', component: CourseComponent },
  { path: 'courses/edit/:courseId', component: CourseComponent }


//{ path: '**', redirectTo: '' },

];
