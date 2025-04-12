import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { EmpresasService } from 'app/empresas/empresas.service';
import { EmpresasDTO } from 'app/empresas/empresas.model';


@Component({
  selector: 'app-empresas-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './empresas-list.component.html'})
export class EmpresasListComponent implements OnInit, OnDestroy {


  errorHandler = inject(ErrorHandler);
  router = inject(Router);
  navigationSubscription?: Subscription;

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      confirm: $localize`:@@delete.confirm:Estas seguro de que quieres borrar la empresa? Se eleminara permanentemente.`,
      deleted: $localize`:@@empresas.delete.success:Empresa eliminada correctamente.`,
      'empresas.usuarios.empresas.referenced': $localize`:@@empresas.usuarios.empresas.referenced:This entity is still referenced by Usuarios ${details?.id} via field Empresas.`
    };
    return messages[key];
  }
  empresas: EmpresasDTO[] = [];
  isLoading = true;
  constructor(private empresasService: EmpresasService) {}

  ngOnInit() {
    console.log('EmpresasListComponent cargado');
    this.empresasService.getAllEmpresas().subscribe({
      next: (data) => {
        this.empresas = data;
        this.isLoading = false;
        console.log('Empresas recibidas:', data);
      },
      error: (error) => {
        console.error('Error cargando empresas:', error);
      },
    });
  }

  ngOnDestroy() {
    this.navigationSubscription!.unsubscribe();
  }

  loadData() {
    this.empresasService.getAllEmpresas()
        .subscribe({
          next: (data) => {
            this.empresas = data;
          },
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  confirmDelete(idempresa: number) {
    if (!confirm(this.getMessage('confirm'))) {
      return;
    }
    this.empresasService.deleteEmpresas(idempresa)
        .subscribe({
          next: () => this.router.navigate(['/empresas'], {
            state: {
              msgInfo: this.getMessage('deleted')
            }
          }),
          error: (error) => {
            if (error.error?.code === 'REFERENCED') {
              const messageParts = error.error.message.split(',');
              this.router.navigate(['/empresas'], {
                state: {
                  msgError: this.getMessage(messageParts[0], { id: messageParts[1] })
                }
              });
              return;
            }
            this.errorHandler.handleServerError(error.error)
          }
        });
  }

}
