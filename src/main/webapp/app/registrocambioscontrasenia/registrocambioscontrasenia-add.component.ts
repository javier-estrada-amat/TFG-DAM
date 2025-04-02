import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { RegistrocambioscontraseniaService } from 'app/registrocambioscontrasenia/registrocambioscontrasenia.service';
import { RegistrocambioscontraseniaDTO } from 'app/registrocambioscontrasenia/registrocambioscontrasenia.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';


@Component({
  selector: 'app-registrocambioscontrasenia-add',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './registrocambioscontrasenia-add.component.html'
})
export class RegistrocambioscontraseniaAddComponent implements OnInit {

  registrocambioscontraseniaService = inject(RegistrocambioscontraseniaService);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  usuariosValues?: Map<number,string>;

  addForm = new FormGroup({
    usuarioid: new FormControl(null),
    fechacambio: new FormControl(null),
    usuarios: new FormControl(null)
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      created: $localize`:@@registrocambioscontrasenia.create.success:Registrocambioscontrasenia was created successfully.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.registrocambioscontraseniaService.getUsuariosValues()
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
    const data = new RegistrocambioscontraseniaDTO(this.addForm.value);
    this.registrocambioscontraseniaService.createRegistrocambioscontrasenia(data)
        .subscribe({
          next: () => this.router.navigate(['/registrocambioscontrasenias'], {
            state: {
              msgSuccess: this.getMessage('created')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.addForm, this.getMessage)
        });
  }

}
