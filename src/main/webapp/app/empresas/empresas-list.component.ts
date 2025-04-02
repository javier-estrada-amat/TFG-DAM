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

  empresasService = inject(EmpresasService);
  errorHandler = inject(ErrorHandler);
  router = inject(Router);
  empresases?: EmpresasDTO[];
  navigationSubscription?: Subscription;

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      confirm: $localize`:@@delete.confirm:Do you really want to delete this element? This cannot be undone.`,
      deleted: $localize`:@@empresas.delete.success:Empresas was removed successfully.`,
      'empresas.usuarios.empresas.referenced': $localize`:@@empresas.usuarios.empresas.referenced:This entity is still referenced by Usuarios ${details?.id} via field Empresas.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.loadData();
    this.navigationSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loadData();
      }
    });
  }

  ngOnDestroy() {
    this.navigationSubscription!.unsubscribe();
  }
  
  loadData() {
    this.empresasService.getAllEmpresases()
        .subscribe({
          next: (data) => this.empresases = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  confirmDelete(idempresa: number) {
    if (!confirm(this.getMessage('confirm'))) {
      return;
    }
    this.empresasService.deleteEmpresas(idempresa)
        .subscribe({
          next: () => this.router.navigate(['/empresass'], {
            state: {
              msgInfo: this.getMessage('deleted')
            }
          }),
          error: (error) => {
            if (error.error?.code === 'REFERENCED') {
              const messageParts = error.error.message.split(',');
              this.router.navigate(['/empresass'], {
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
