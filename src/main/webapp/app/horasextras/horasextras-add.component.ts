import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { HorasextrasService } from 'app/horasextras/horasextras.service';
import { HorasextrasDTO } from 'app/horasextras/horasextras.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { validNumeric } from 'app/common/utils';


@Component({
  selector: 'app-horasextras-add',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './horasextras-add.component.html'
})
export class HorasextrasAddComponent implements OnInit {

  horasextrasService = inject(HorasextrasService);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  usuariosValues?: Map<number,string>;

  addForm = new FormGroup({
    usuarioid: new FormControl(null),
    fecha: new FormControl(null),
    horassolicitadas: new FormControl(null, [validNumeric(4, 2)]),
    horasaprobadas: new FormControl(null, [validNumeric(4, 2)]),
    motivo: new FormControl(null),
    estado: new FormControl(null, [Validators.maxLength(255)]),
    aprobadopor: new FormControl(null),
    usuarios: new FormControl(null)
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      created: $localize`:@@horasextras.create.success:Horasextras was created successfully.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.horasextrasService.getUsuariosValues()
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
    const data = new HorasextrasDTO(this.addForm.value);
    this.horasextrasService.createHorasextras(data)
        .subscribe({
          next: () => this.router.navigate(['/horasextrass'], {
            state: {
              msgSuccess: this.getMessage('created')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.addForm, this.getMessage)
        });
  }

}
