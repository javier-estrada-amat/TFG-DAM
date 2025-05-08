import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginResponse } from '../models/login-response.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response: LoginResponse) => {
        if (response.code === 1) {
          localStorage.setItem('email', this.email);
          localStorage.setItem('token', response.token);
          localStorage.setItem('nombre', response.usuario.nombre);
          localStorage.setItem('apellidos', response.usuario.apellidos);

          this.snackBar.open('✅ Has iniciado sesión correctamente', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });

          if (response.primerAcceso) {
            this.router.navigate(['/cambiar-password']);
          } else {
            this.router.navigate(['/home']);
          }
        } else {
          this.error = 'Credenciales incorrectas.';
        }
      },
      error: (err: any) => {
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
