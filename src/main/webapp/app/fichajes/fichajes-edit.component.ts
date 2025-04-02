import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { FichajesService } from 'app/fichajes/fichajes.service';
import { FichajesDTO } from 'app/fichajes/fichajes.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { updateForm } from 'app/common/utils';


@Component({
  selector: 'app-fichajes-edit',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './fichajes-edit.component.html'
})
export class FichajesEditComponent implements OnInit {

  fichajesService = inject(FichajesService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  usuariosValues?: Map<number,string>;
  currentIdfichaje?: number;

  editForm = new FormGroup({
    idfichaje: new FormControl({ value: null, disabled: true }),
    usuarioid: new FormControl(null),
    fecha: new FormControl(null),
    horaentrada: new FormControl(null),
    horasalida: new FormControl(null),
    estado: new FormControl(null, [Validators.maxLength(255)]),
    usuarios: new FormControl(null)
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      updated: $localize`:@@fichajes.update.success:Fichajes was updated successfully.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.currentIdfichaje = +this.route.snapshot.params['idfichaje'];
    this.fichajesService.getUsuariosValues()
        .subscribe({
          next: (data) => this.usuariosValues = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
    this.fichajesService.getFichajes(this.currentIdfichaje!)
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
    const data = new FichajesDTO(this.editForm.value);
    this.fichajesService.updateFichajes(this.currentIdfichaje!, data)
        .subscribe({
          next: () => this.router.navigate(['/fichajess'], {
            state: {
              msgSuccess: this.getMessage('updated')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.editForm, this.getMessage)
        });
  }

}
