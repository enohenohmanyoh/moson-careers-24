import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false;
  isLoggedIn = true;
  userName = '';
  firstName: string | null = '';

  isDropdownOpen = false;

  constructor(private router: Router) {
    this.getUserDetails();
  }

  ngOnInit() {

  }

  getUserDetails(): void {

    if (typeof window !== 'undefined' && window.localStorage) {
      this.firstName = localStorage.getItem('firstName') || '';
      this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    }

  }

  toggleDropdown(open: boolean) {
    this.isDropdownOpen = open;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }


  logout() {
    // handle logout logic here
    window.localStorage.setItem('firstName', "");
    window.localStorage.setItem('userEmail', "");
    window.localStorage.setItem('isLoggedIn', String(false));
    this.isLoggedIn = false
    this.router.navigate(['/']);

  }
}


/*
import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule], // ✅ Add CommonModule here
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HeaderComponent {


}
*/
