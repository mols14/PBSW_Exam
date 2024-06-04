import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {}

  handleRegister(username: string, email: string, password: string) {
    this.authService.register(username, email, password).subscribe(
      response => {
        this.router.navigate(['/login-page']); // Navigate to the login page after successful registration
        this.userService.addUser({ username, email, password, role: 'User', totalScore: 0, upgrades: [] });
      },
      error => {
        this.error = error; // Display the specific error message
        console.error('Registration error:', error); // Log error to console
      }
    );
  }
}
