import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { HorasextrasService } from 'app/horasextras/horasextras.service';
import { HorasextrasDTO } from 'app/horasextras/horasextras.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { updateForm, validNumeric } from 'app/common/utils';


@Component({
  selector: 'app-horasextras-edit',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './horasextras-edit.component.html'
})
export class HorasextrasEditComponent implements OnInit {

  horasextrasService = inject(HorasextrasService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  usuariosValues?: Map<number,string>;
  currentIdhoraextra?: number;

  editForm = new FormGroup({
    idhoraextra: new FormControl({ value: null, disabled: true }),
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
      updated: $localize`:@@horasextras.update.success:Horasextras was updated successfully.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.currentIdhoraextra = +this.route.snapshot.params['idhoraextra'];
    this.horasextrasService.getUsuariosValues()
        .subscribe({
          next: (data) => this.usuariosValues = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
    this.horasextrasService.getHorasextras(this.currentIdhoraextra!)
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
    const data = new HorasextrasDTO(this.editForm.value);
    this.horasextrasService.updateHorasextras(this.currentIdhoraextra!, data)
        .subscribe({
          next: () => this.router.navigate(['/horasextrass'], {
            state: {
              msgSuccess: this.getMessage('updated')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.editForm, this.getMessage)
        });
  }

}
