import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { HistorialactividadService } from 'app/historialactividad/historialactividad.service';
import { HistorialactividadDTO } from 'app/historialactividad/historialactividad.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { updateForm } from 'app/common/utils';


@Component({
  selector: 'app-historialactividad-edit',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './historialactividad-edit.component.html'
})
export class HistorialactividadEditComponent implements OnInit {

  historialactividadService = inject(HistorialactividadService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  usuariosValues?: Map<number,string>;
  currentIdhistorial?: number;

  editForm = new FormGroup({
    idhistorial: new FormControl({ value: null, disabled: true }),
    usuarioid: new FormControl(null),
    accion: new FormControl(null, [Validators.maxLength(255)]),
    entidadafectada: new FormControl(null, [Validators.maxLength(255)]),
    descripcion: new FormControl(null),
    fecha: new FormControl(null),
    usuarios: new FormControl(null)
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      updated: $localize`:@@historialactividad.update.success:Historialactividad was updated successfully.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.currentIdhistorial = +this.route.snapshot.params['idhistorial'];
    this.historialactividadService.getUsuariosValues()
        .subscribe({
          next: (data) => this.usuariosValues = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
    this.historialactividadService.getHistorialactividad(this.currentIdhistorial!)
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
    const data = new HistorialactividadDTO(this.editForm.value);
    this.historialactividadService.updateHistorialactividad(this.currentIdhistorial!, data)
        .subscribe({
          next: () => this.router.navigate(['/historialactividads'], {
            state: {
              msgSuccess: this.getMessage('updated')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.editForm, this.getMessage)
        });
  }

}
