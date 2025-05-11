import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cambiar-password',
  standalone: true,
  templateUrl: './cambiarpassword.component.html',
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class CambiarPasswordComponent {
  form: FormGroup;
  error: string = '';
  success: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nuevaPassword: ['', [Validators.required, Validators.minLength(6)]],
      repetirPassword: ['', [Validators.required]]
    });
  }

  cambiarPassword() {
    this.error = '';
    this.success = '';
    const nueva = this.form.get('nuevaPassword')?.value;
    const repetir = this.form.get('repetirPassword')?.value;

    if (this.form.get('nuevaPassword')?.invalid) {
      this.error = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }

    if (nueva !== repetir) {
      this.error = 'Las contraseñas no coinciden.';
      return;
    }

    const email = localStorage.getItem('email');
    if (!email) {
      this.error = 'Email no encontrado.';
      return;
    }

    this.authService.cambiarPassword(email!, this.form.value.nuevaPassword).subscribe({
      next: () => {
        this.success = 'Contraseña cambiada con éxito.';

        this.authService.login(email!, this.form.value.nuevaPassword).subscribe({
          next: (loginResp) => {
            localStorage.setItem('token', loginResp.token);
            localStorage.removeItem('email');
            this.router.navigate(['/home']);
          },
          error: () => {
            this.error = 'La contraseña se cambió pero el inicio de sesión falló.';
          }
        });
      },
      error: () => {
        this.error = 'Error al cambiar la contraseña. Intenta de nuevo.';
      }
    });
  }
}
