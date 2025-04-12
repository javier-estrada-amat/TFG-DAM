import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
   email: string = '';
    password: string = '';
    error: string = '';

    constructor(
      private authService: AuthService, private router: Router) {}

      login() {
      this.authService.login(this.email, this.password).subscribe({
        next: (response) => {
          if (response.code === 1) {
              localStorage.setItem('token', response.token);
              this.router.navigate(['/home']);
            } else {
              this.error = 'Credenciales incorrectas.';
            }
          },
        error: (err) => {
          console.error('Error en el servidor:', err);
          this.error = 'Error en el servidor. Inténtalo más tarde.';
        }
      });
    }
  }


