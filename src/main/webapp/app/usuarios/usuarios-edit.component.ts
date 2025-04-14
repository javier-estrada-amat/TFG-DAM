import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { UsuariosService } from 'app/usuarios/usuarios.service';
import { UsuariosDTO } from 'app/usuarios/usuarios.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { updateForm } from 'app/common/utils';
import { EmpresasService } from 'app/empresas/empresas.service';
import { RolesService } from 'app/roles/roles.service';
import { forkJoin } from 'rxjs';


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
  empresasService = inject(EmpresasService);
  rolesService = inject(RolesService);

  empresasValues?: Map<number,string>;
  rolesValues?: Map<number,string>;
  currentIdusuario?: number;
  mostrarCampoPassword = false;

  editForm = new FormGroup({
    id_usuario: new FormControl<number | null>({ value: null, disabled: true }),
    nombre: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
    apellidos: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
    email: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
    password: new FormControl({ value: null, disabled: true }, [Validators.maxLength(255)]),
    fecha_registro: new FormControl({ value: null, disabled: true }),
    activo: new FormControl(true, [Validators.required]),
    empresa: new FormControl(null, [Validators.required]),
    roles: new FormControl<number | null>(null, [Validators.required])

  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      updated: $localize`:@@usuarios.update.success:Usuarios was updated successfully.`,
      USUARIOS_EMAIL_UNIQUE: $localize`:@@Exists.usuarios.email:This Email is already taken.`
    };
    return messages[key];
  }

  toggleMostrarPassword() {
    this.mostrarCampoPassword = !this.mostrarCampoPassword;

    const control = this.editForm.get('password');
    if (this.mostrarCampoPassword) {
      control?.enable();
      control?.setValue(null);
    } else {
      control?.disable();
      control?.setValue(null);
    }
  }

  ngOnInit() {
    this.currentIdusuario = +this.route.snapshot.params['idusuario'];

    forkJoin({
      empresas: this.empresasService.getEmpresasValues(),
      roles: this.rolesService.getRolesValues()
    }).subscribe({
      next: ({ empresas, roles }) => {
        this.empresasValues = empresas;
        this.rolesValues = roles;

        this.usuariosService.getUsuarios(this.currentIdusuario!)
          .subscribe({
            next: (data) => {
              console.log('Rol asignado al usuario:', data.roles);
              console.log('RolesValues Map:', this.rolesValues);
              updateForm(this.editForm, data);
              this.editForm.get('password')?.disable();
            },
            error: (error) => this.errorHandler.handleServerError(error.error)
          });
      },
      error: (error) => this.errorHandler.handleServerError(error.error)
    });
  }


  handleSubmit() {
    window.scrollTo(0, 0);
    this.editForm.markAllAsTouched();
    if (!this.editForm.valid) return;

    const rawData: any = this.editForm.getRawValue();
    if (!this.mostrarCampoPassword || !rawData.password) {
      rawData.fecha_registro = null;
      rawData.password = null;
    }
    rawData.id_usuario = this.currentIdusuario ?? null;

    if (rawData.empresa) {
      rawData.empresa = { id_empresa: Number(rawData.empresa) };
    }

    if (rawData.roles) {
      rawData.roles = [Number(rawData.roles)];
    }

    const data = new UsuariosDTO(rawData);
    this.usuariosService.updateUsuarios(this.currentIdusuario!, data)
      .subscribe({
        next: () => this.router.navigate(['/usuarios'], {
          state: {
            msgSuccess: this.getMessage('updated')
          }
        }),
        error: (error) => this.errorHandler.handleServerError(error.error, this.editForm, this.getMessage)
      });
  }
}

