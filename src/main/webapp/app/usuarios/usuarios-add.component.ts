import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { UsuariosService } from 'app/usuarios/usuarios.service';
import { UsuariosDTO } from 'app/usuarios/usuarios.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';


@Component({
  selector: 'app-usuarios-add',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './usuarios-add.component.html'
})
export class UsuariosAddComponent implements OnInit {

  usuariosService = inject(UsuariosService);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  empresasValues?: Map<number,string>;
  rolesValues?: Map<number,string>;
  configuracionautenticacionValues?: Map<number,string>;
  horasextrasusuariosValues?: Map<number,string>;

  addForm = new FormGroup({
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
      created: $localize`:@@usuarios.create.success:Usuarios was created successfully.`,
      USUARIOS_EMAIL_UNIQUE: $localize`:@@Exists.usuarios.email:This Email is already taken.`,
      USUARIOS_CONFIGURACIONAUTENTICACION_UNIQUE: $localize`:@@Exists.usuarios.configuracionautenticacion:This Configuracionautenticacion is already referenced by another Usuarios.`
    };
    return messages[key];
  }

  ngOnInit() {
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
  }

  handleSubmit() {
    window.scrollTo(0, 0);
    this.addForm.markAllAsTouched();
    if (!this.addForm.valid) {
      return;
    }
    const data = new UsuariosDTO(this.addForm.value);
    this.usuariosService.createUsuarios(data)
        .subscribe({
          next: () => this.router.navigate(['/usuarios'], {
            state: {
              msgSuccess: this.getMessage('created')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.addForm, this.getMessage)
        });
  }

}
