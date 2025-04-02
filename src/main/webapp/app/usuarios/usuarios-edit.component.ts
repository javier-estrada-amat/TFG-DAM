import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { UsuariosService } from 'app/usuarios/usuarios.service';
import { UsuariosDTO } from 'app/usuarios/usuarios.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { updateForm } from 'app/common/utils';


@Component({
  selector: 'app-usuarios-edit',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './usuarios-edit.component.html'
})
export class UsuariosEditComponent implements OnInit {

  usuariosService = inject(UsuariosService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  empresasValues?: Map<number,string>;
  rolesValues?: Map<number,string>;
  configuracionautenticacionValues?: Map<number,string>;
  horasextrasusuariosValues?: Map<number,string>;
  currentIdusuario?: number;

  editForm = new FormGroup({
    idusuario: new FormControl({ value: null, disabled: true }),
    nombre: new FormControl(null, [Validators.maxLength(50)]),
    apellidos: new FormControl(null, [Validators.maxLength(100)]),
    email: new FormControl(null, [Validators.maxLength(100)]),
    password: new FormControl(null, [Validators.maxLength(255)]),
    activo: new FormControl(false),
    primeracceso: new FormControl(false),
    empresas: new FormControl(null),
    roles: new FormControl([]),
    configuracionautenticacion: new FormControl(null),
    horasextrasusuarios: new FormControl(null)
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      updated: $localize`:@@usuarios.update.success:Usuarios was updated successfully.`,
      USUARIOS_EMAIL_UNIQUE: $localize`:@@Exists.usuarios.email:This Email is already taken.`,
      USUARIOS_CONFIGURACIONAUTENTICACION_UNIQUE: $localize`:@@Exists.usuarios.configuracionautenticacion:This Configuracionautenticacion is already referenced by another Usuarios.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.currentIdusuario = +this.route.snapshot.params['idusuario'];
    this.usuariosService.getEmpresasValues()
        .subscribe({
          next: (data) => this.empresasValues = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
    this.usuariosService.getRolesValues()
        .subscribe({
          next: (data) => this.rolesValues = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
    this.usuariosService.getConfiguracionautenticacionValues()
        .subscribe({
          next: (data) => this.configuracionautenticacionValues = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
    this.usuariosService.getHorasextrasusuariosValues()
        .subscribe({
          next: (data) => this.horasextrasusuariosValues = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
    this.usuariosService.getUsuarios(this.currentIdusuario!)
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
    const data = new UsuariosDTO(this.editForm.value);
    this.usuariosService.updateUsuarios(this.currentIdusuario!, data)
        .subscribe({
          next: () => this.router.navigate(['/usuarioss'], {
            state: {
              msgSuccess: this.getMessage('updated')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.editForm, this.getMessage)
        });
  }

}
