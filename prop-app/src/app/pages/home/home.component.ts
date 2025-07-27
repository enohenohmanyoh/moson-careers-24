import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  popularCategories = [
    { name: 'IT & Software', jobs: 1245 },
    { name: 'Finance', jobs: 892 },
    { name: 'Healthcare', jobs: 756 },
    { name: 'Engineering', jobs: 1123 },
    { name: 'Education', jobs: 543 },
    { name: 'Marketing', jobs: 678 }
  ];

  featuredJobs = [
    { 
      title: 'Senior Frontend Developer', 
      company: 'Tech Solutions Inc.', 
      location: 'Cape Town', 
      type: 'Full-time', 
      salary: 'R60,000 - R80,000' 
    },
    { 
      title: 'Financial Analyst', 
      company: 'Global Finance', 
      location: 'Johannesburg', 
      type: 'Full-time', 
      salary: 'R45,000 - R60,000' 
    },
    { 
      title: 'Nurse Practitioner', 
      company: 'City Hospital', 
      location: 'Durban', 
      type: 'Part-time', 
      salary: 'R35,000 - R45,000' 
    }
  ];
}