import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  email: string = '';
  password: string = '';
  error: string = '';
  loggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    this.loggedIn = this.authService.isLoggedIn();
  }

  handleLogin(email: string, password: string) {
    this.authService.login(email, password).subscribe(
      response => {
        this.loggedIn = true;
        this.router.navigate(['/']); // Navigate to the homepage or any other page
      },
      error => {
        this.error = 'Invalid email or password.';
      }
    );
  }

  navigateToPage(page: string) {
    this.router.navigate([`/${page}`]);
  }
}