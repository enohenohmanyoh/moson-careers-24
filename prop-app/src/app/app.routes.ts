import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { JobListComponent } from './pages/job-list/job-list.component';
import { JobDetailComponent } from './pages/home/job-detail/job-detail.component';
import {CourseComponent} from "./pages/course/course.component";
import {ListCourseComponent} from "./pages/list-course/list-course.component";
import {ViewCourseComponent} from "./pages/view-course/view-course.component";
import {AboutComponent} from "./pages/about/about.component";
import {UserComponent} from "./pages/user/user.component";
import {LoginComponent} from "./pages/login/login.component";
import {UserJobsComponent} from "./pages/user-jobs/user-jobs.component";
import {ManageJobsComponent} from "./pages/manage-jobs/manage-jobs.component";
import {CreateJobsComponent} from "./pages/create-jobs/create-jobs.component";


export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'list-jobs', component: JobListComponent},
  {path: 'jobs-details/:reference', component: JobDetailComponent},
  {path: 'courses', component: ListCourseComponent},
  {path: 'courses/create', component: CourseComponent},
  {path: 'courses/edit/:courseId', component: CourseComponent},
  {path: 'courses/view/:courseId', component: ViewCourseComponent},
  {path: 'about', component: AboutComponent},
  {path: 'user/create', component: UserComponent},
  {path: 'user-profile', component: UserComponent},
  {path: 'saved-jobs', component: UserJobsComponent},
  {path: 'applied-jobs', component: UserJobsComponent},
  {path: 'manage-jobs', component: ManageJobsComponent},
  {path: 'create-jobs/:reference', component: CreateJobsComponent},
  {path: 'login', component: LoginComponent},


//{ path: '**', redirectTo: '' },

];
