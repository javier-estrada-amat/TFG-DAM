import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { HistorialactividadService } from 'app/historialactividad/historialactividad.service';
import { HistorialactividadDTO } from 'app/historialactividad/historialactividad.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';


@Component({
  selector: 'app-historialactividad-add',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './historialactividad-add.component.html'
})
export class HistorialactividadAddComponent implements OnInit {

  historialactividadService = inject(HistorialactividadService);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  usuariosValues?: Map<number,string>;

  addForm = new FormGroup({
    usuarioid: new FormControl(null),
    accion: new FormControl(null, [Validators.maxLength(255)]),
    entidadafectada: new FormControl(null, [Validators.maxLength(255)]),
    descripcion: new FormControl(null),
    fecha: new FormControl(null),
    usuarios: new FormControl(null)
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      created: $localize`:@@historialactividad.create.success:Historialactividad was created successfully.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.historialactividadService.getUsuariosValues()
        .subscribe({
          next: (data) => this.usuariosValues = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  handleSubmit() {
    window.scrollTo(0, 0);
    this.addForm.markAllAsTouched();
    if (!this.addForm.valid) {
      return;
    }
    const data = new HistorialactividadDTO(this.addForm.value);
    this.historialactividadService.createHistorialactividad(data)
        .subscribe({
          next: () => this.router.navigate(['/historialactividads'], {
            state: {
              msgSuccess: this.getMessage('created')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.addForm, this.getMessage)
        });
  }

}
