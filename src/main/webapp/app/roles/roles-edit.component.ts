import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { RolesService } from 'app/roles/roles.service';
import { RolesDTO } from 'app/roles/roles.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { updateForm } from 'app/common/utils';


@Component({
  selector: 'app-roles-edit',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './roles-edit.component.html'
})
export class RolesEditComponent implements OnInit {

  rolesService = inject(RolesService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  currentIdrol?: number;

  editForm = new FormGroup({
    idrol: new FormControl({ value: null, disabled: true }),
    nombre: new FormControl(null, [Validators.maxLength(50)]),
    descripcion: new FormControl(null)
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      updated: $localize`:@@roles.update.success:Roles was updated successfully.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.currentIdrol = +this.route.snapshot.params['idrol'];
    this.rolesService.getRoles(this.currentIdrol!)
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
    const data = new RolesDTO(this.editForm.value);
    this.rolesService.updateRoles(this.currentIdrol!, data)
        .subscribe({
          next: () => this.router.navigate(['/roless'], {
            state: {
              msgSuccess: this.getMessage('updated')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.editForm, this.getMessage)
        });
  }

}
