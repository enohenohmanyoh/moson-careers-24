import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { JobListComponent } from './pages/job-list/job-list.component';
import { JobDetailComponent } from './pages/home/job-detail/job-detail.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  {path: 'list-jobs', component: JobListComponent},
  {path: 'jobs-details/:reference', component: JobDetailComponent}


//{ path: '**', redirectTo: '' },

];
