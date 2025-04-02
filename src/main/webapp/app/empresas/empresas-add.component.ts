import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { EmpresasService } from 'app/empresas/empresas.service';
import { EmpresasDTO } from 'app/empresas/empresas.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';


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
    nombre: new FormControl(null, [Validators.maxLength(100)]),
    direccion: new FormControl(null, [Validators.maxLength(255)]),
    telefono: new FormControl(null, [Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.maxLength(100)])
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      created: $localize`:@@empresas.create.success:Empresas was created successfully.`
    };
    return messages[key];
  }

  handleSubmit() {
    window.scrollTo(0, 0);
    this.addForm.markAllAsTouched();
    if (!this.addForm.valid) {
      return;
    }
    const data = new EmpresasDTO(this.addForm.value);
    this.empresasService.createEmpresas(data)
        .subscribe({
          next: () => this.router.navigate(['/empresass'], {
            state: {
              msgSuccess: this.getMessage('created')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.addForm, this.getMessage)
        });
  }

}
