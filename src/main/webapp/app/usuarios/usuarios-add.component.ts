import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { UsuariosService } from 'app/usuarios/usuarios.service';
import { UsuariosDTO } from 'app/usuarios/usuarios.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { EmpresasService } from 'app/empresas/empresas.service';
import { RolesService } from 'app/roles/roles.service';

@Component({
  selector: 'app-usuarios-add',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './usuarios-add.component.html'
})
export class UsuariosAddComponent implements OnInit {

  usuariosService = inject(UsuariosService);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);
  empresasService = inject(EmpresasService);
  rolesService = inject(RolesService);

  empresasValues: Map<number, string> = new Map();
  rolesValues: Map<number, string> = new Map();

  addForm = new FormGroup({
    nombre: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
    apellidos: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
    email: new FormControl(null, [
      Validators.required,
      Validators.maxLength(100),
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    ]),
    telefono: new FormControl(null, [Validators.maxLength(20), Validators.pattern(/^[0-9]+$/)]),
    password: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
    activo: new FormControl(true, [Validators.required]),
    empresa: new FormControl(null, [Validators.required]),
    roles: new FormControl(null,[Validators.required])
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      created: $localize`:@@usuarios.create.success:Usuario creado satisfactoriamente.`,
      USUARIOS_EMAIL_UNIQUE: $localize`:@@Exists.usuarios.email:El e-mail ya está en uso.`,
      USUARIOS_CONFIGURACIONAUTENTICACION_UNIQUE: $localize`:@@Exists.usuarios.configuracionautenticacion:This Configuracionautenticacion is already referenced by another Usuarios.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.empresasService.getEmpresasValues().subscribe({
          next: (data) => {
            this.empresasValues = data;
            console.log('Empresas cargadas:', data);
          },
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
    this.rolesService.getRolesValues().subscribe({
          next: (data) => {
            this.rolesValues = data;
            console.log('Roles cargados:', data);
          },
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
    }

  handleSubmit() {
    window.scrollTo(0, 0);
    this.addForm.markAllAsTouched();
    if (!this.addForm.valid) {
      return;
    }

    const rawData = this.addForm.value;
    const empresaId = rawData.empresa;
    const usuarioPayload = new UsuariosDTO({
      ...rawData,
      empresa: empresaId != null ? { id_empresa: Number(empresaId) } : null,
      roles: rawData.roles ? [Number(rawData.roles)] : null
    });

    this.usuariosService.createUsuarios(usuarioPayload)
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
