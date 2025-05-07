import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule,NgOptimizedImage],
  templateUrl: './login.component.html'
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
              localStorage.setItem('email', this.email);
              localStorage.setItem('token', response.token);
              if (response.primerAcceso) {
                this.router.navigate(['/cambiar-password']);
              } else {
              this.router.navigate(['/home']);
              }
            } else {
              this.error = 'Credenciales incorrectas.';
            }
          },
          error: (err) => {
            if (err.status === 401) {
              this.error = err.error?.mensaje || 'Credenciales incorrectas.';
            } else {
              console.error('Error en el servidor:', err);
              this.error = 'Error en el servidor. Inténtalo más tarde.';
            }
          }
      });
    }
  }


