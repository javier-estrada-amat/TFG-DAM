import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { EmpresasService } from 'app/empresas/empresas.service';
import { EmpresasDTO } from 'app/empresas/empresas.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { updateForm } from 'app/common/utils';


@Component({
  selector: 'app-empresas-edit',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './empresas-edit.component.html'
})
export class EmpresasEditComponent implements OnInit {

  empresasService = inject(EmpresasService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  currentIdempresa?: number;

  editForm = new FormGroup({
    idempresa: new FormControl({ value: null, disabled: true }),
    nombre: new FormControl(null, [Validators.maxLength(100)]),
    direccion: new FormControl(null, [Validators.maxLength(255)]),
    telefono: new FormControl(null, [Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.maxLength(100)])
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      updated: $localize`:@@empresas.update.success:Empresas was updated successfully.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.currentIdempresa = +this.route.snapshot.params['idempresa'];
    this.empresasService.getEmpresas(this.currentIdempresa!)
        .subscribe({
          next: (data) => updateForm(this.editForm, data),
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  handleSubmit() {
    window.scrollTo(0, 0);
    this.editForm.markAllAsTouched();
    if (!this.editForm.valid) {
      return;
    }
    const data = new EmpresasDTO(this.editForm.value);
    this.empresasService.updateEmpresas(this.currentIdempresa!, data)
        .subscribe({
          next: () => this.router.navigate(['/empresass'], {
            state: {
              msgSuccess: this.getMessage('updated')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.editForm, this.getMessage)
        });
  }

}
