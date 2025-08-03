import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {HttpClientModule} from "@angular/common/http";
import {SweetAlertMessage} from "../../services/sweet.alert";


@Component({
  selector: 'app-login',
  standalone: true,
  providers: [AuthService],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  errorMessage = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder, private authService: AuthService, private router: Router,
    private sweetAlertMessage: SweetAlertMessage
  ) {

  }

  onLogin() {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    const user: any = this.loginForm.value;
    this.authService.login(user).subscribe({
      next: (response) => {
        this.isLoading = false;
        // Store user details and jwt token in local storage
        const loginUser = response.data;
        window.localStorage.setItem('userEmail', loginUser.email);
        window.localStorage.setItem('isLoggedIn', String(true));
        window.localStorage.setItem('firstName', String(loginUser.firstName));
        // Redirect based on user role
        if (loginUser.role.toLowerCase() === 'employer') {
          this.router.navigate(['/']);
          window.location.href = "/";
        } else {
          window.location.href = '/list-jobs';
          // window.location.reload();
        }

      },
      error: (error) => {
        this.isLoading = false;
        const errorMessage = error?.error?.error
        this.sweetAlertMessage.bannerMessage(errorMessage, 'warning');
      }
    });
  }
}
