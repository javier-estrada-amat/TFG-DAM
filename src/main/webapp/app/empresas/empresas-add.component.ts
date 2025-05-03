import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { EmpresasService } from 'app/empresas/empresas.service';
import { EmpresasDTO } from 'app/empresas/empresas.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-empresas-add',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './empresas-add.component.html'
})
export class EmpresasAddComponent {

  empresasService = inject(EmpresasService);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  addForm = new FormGroup({
    nombre: new FormControl(null, [Validators.maxLength(100), Validators.required, Validators.minLength(4)]),
    cif: new FormControl(null, [Validators.maxLength(30), Validators.required, Validators.minLength(9)]),
    direccion: new FormControl(null, [Validators.maxLength(255), Validators.required, Validators.minLength(4)]),
    telefono: new FormControl(null, [Validators.maxLength(20), Validators.required, Validators.minLength(4)]),
    email: new FormControl(null, [Validators.maxLength(100), Validators.email, Validators.required]),
  }, { updateOn: 'submit' });

  getMessage(key: string) {
    const messages: Record<string, string> = {
      created: $localize`:@@empresas.create.success:Empresa creada correctamente.`
    };
    return messages[key];
  }

  handleSubmit() {
    window.scrollTo(0, 0);
    this.addForm.markAllAsTouched();
    if (!this.addForm.valid) return;

    const data = new EmpresasDTO(this.addForm.value);
    this.empresasService.createEmpresa(data)
      .subscribe({
        next: () => this.router.navigate(['/empresas'], {
          state: {
            msgSuccess: this.getMessage('created')
          }
        }),
        error: (error: HttpErrorResponse) => {
          if (error.status === 400 || error.status === 409) {
            const serverErrors = error.error?.errors || {};
            Object.keys(serverErrors).forEach(field => {
              const control = this.addForm.get(field);
              if (control) {
                control.setErrors({ server: serverErrors[field] });
                control.markAsTouched(); // Muy importante para que aparezca el error
              }
            });
          }
        }
      });
  }
}
