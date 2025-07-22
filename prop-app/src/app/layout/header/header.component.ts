import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  navLinks = [
    { path: '/', label: 'Home' },
    { 
      path: '/buy', 
      label: 'Buy',
      subLinks: [
        { path: '/residential-for-sale', label: 'Residential for Sale' },
        { path: '/commercial-for-sale', label: 'Commercial for Sale' }
      ]
    },
    { 
      path: '/sell', 
      label: 'Sell',
      subLinks: [
        { path: '/list-your-property', label: 'List Your Property' },
        { path: '/global-real-estate', label: 'Global Real Estate' }
      ]
    },
    { 
      path: '/rent', 
      label: 'Rent',
      subLinks: [
        { path: '/residential-to-rent', label: 'Residential to Rent' },
        { path: '/commercial-to-rent', label: 'Commercial to Rent' },
        { path: '/industrial-to-let', label: 'Industrial to Let' },
        { path: '/student-accommodation', label: 'Student Accommodation' }
      ]
    },
    { path: '/my', label: 'My Favourites' },
    { path: '/news', label: 'News' },
    { path: '/apprasals', label: 'Appraisals' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ];

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}