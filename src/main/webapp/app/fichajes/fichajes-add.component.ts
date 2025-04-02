import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { FichajesService } from 'app/fichajes/fichajes.service';
import { FichajesDTO } from 'app/fichajes/fichajes.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';


@Component({
  selector: 'app-fichajes-add',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './fichajes-add.component.html'
})
export class FichajesAddComponent implements OnInit {

  fichajesService = inject(FichajesService);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  usuariosValues?: Map<number,string>;

  addForm = new FormGroup({
    usuarioid: new FormControl(null),
    fecha: new FormControl(null),
    horaentrada: new FormControl(null),
    horasalida: new FormControl(null),
    estado: new FormControl(null, [Validators.maxLength(255)]),
    usuarios: new FormControl(null)
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      created: $localize`:@@fichajes.create.success:Fichajes was created successfully.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.fichajesService.getUsuariosValues()
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
    const data = new FichajesDTO(this.addForm.value);
    this.fichajesService.createFichajes(data)
        .subscribe({
          next: () => this.router.navigate(['/fichajess'], {
            state: {
              msgSuccess: this.getMessage('created')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.addForm, this.getMessage)
        });
  }

}
