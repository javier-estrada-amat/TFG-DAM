import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { ConfiguracionautenticacionService } from 'app/configuracionautenticacion/configuracionautenticacion.service';
import { ConfiguracionautenticacionDTO } from 'app/configuracionautenticacion/configuracionautenticacion.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';


@Component({
  selector: 'app-configuracionautenticacion-add',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './configuracionautenticacion-add.component.html'
})
export class ConfiguracionautenticacionAddComponent {

  configuracionautenticacionService = inject(ConfiguracionautenticacionService);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  addForm = new FormGroup({
    usuarioid: new FormControl(null),
    codigosecreto: new FormControl(null, [Validators.maxLength(255)]),
    activado: new FormControl(false)
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      created: $localize`:@@configuracionautenticacion.create.success:Configuracionautenticacion was created successfully.`
    };
    return messages[key];
  }

  handleSubmit() {
    window.scrollTo(0, 0);
    this.addForm.markAllAsTouched();
    if (!this.addForm.valid) {
      return;
    }
    const data = new ConfiguracionautenticacionDTO(this.addForm.value);
    this.configuracionautenticacionService.createConfiguracionautenticacion(data)
        .subscribe({
          next: () => this.router.navigate(['/configuracionautenticacions'], {
            state: {
              msgSuccess: this.getMessage('created')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.addForm, this.getMessage)
        });
  }

}
