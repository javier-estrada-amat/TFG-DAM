import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { RegistrocambioscontraseniaService } from 'app/registrocambioscontrasenia/registrocambioscontrasenia.service';
import { RegistrocambioscontraseniaDTO } from 'app/registrocambioscontrasenia/registrocambioscontrasenia.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { updateForm } from 'app/common/utils';


@Component({
  selector: 'app-registrocambioscontrasenia-edit',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './registrocambioscontrasenia-edit.component.html'
})
export class RegistrocambioscontraseniaEditComponent implements OnInit {

  registrocambioscontraseniaService = inject(RegistrocambioscontraseniaService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  usuariosValues?: Map<number,string>;
  currentIdregistro?: number;

  editForm = new FormGroup({
    idregistro: new FormControl({ value: null, disabled: true }),
    usuarioid: new FormControl(null),
    fechacambio: new FormControl(null),
    usuarios: new FormControl(null)
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      updated: $localize`:@@registrocambioscontrasenia.update.success:Registrocambioscontrasenia was updated successfully.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.currentIdregistro = +this.route.snapshot.params['idregistro'];
    this.registrocambioscontraseniaService.getUsuariosValues()
        .subscribe({
          next: (data) => this.usuariosValues = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
    this.registrocambioscontraseniaService.getRegistrocambioscontrasenia(this.currentIdregistro!)
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
    const data = new RegistrocambioscontraseniaDTO(this.editForm.value);
    this.registrocambioscontraseniaService.updateRegistrocambioscontrasenia(this.currentIdregistro!, data)
        .subscribe({
          next: () => this.router.navigate(['/registrocambioscontrasenias'], {
            state: {
              msgSuccess: this.getMessage('updated')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.editForm, this.getMessage)
        });
  }

}
