import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { ConfiguracionautenticacionService } from 'app/configuracionautenticacion/configuracionautenticacion.service';
import { ConfiguracionautenticacionDTO } from 'app/configuracionautenticacion/configuracionautenticacion.model';


@Component({
  selector: 'app-configuracionautenticacion-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './configuracionautenticacion-list.component.html'})
export class ConfiguracionautenticacionListComponent implements OnInit, OnDestroy {

  configuracionautenticacionService = inject(ConfiguracionautenticacionService);
  errorHandler = inject(ErrorHandler);
  router = inject(Router);
  configuracionautenticacions?: ConfiguracionautenticacionDTO[];
  navigationSubscription?: Subscription;

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      confirm: $localize`:@@delete.confirm:Do you really want to delete this element? This cannot be undone.`,
      deleted: $localize`:@@configuracionautenticacion.delete.success:Configuracionautenticacion was removed successfully.`,
      'configuracionautenticacion.usuarios.configuracionautenticacion.referenced': $localize`:@@configuracionautenticacion.usuarios.configuracionautenticacion.referenced:This entity is still referenced by Usuarios ${details?.id} via field Configuracionautenticacion.`
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
    this.configuracionautenticacionService.getAllConfiguracionautenticacions()
        .subscribe({
          next: (data) => this.configuracionautenticacions = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  confirmDelete(idautenticacion: number) {
    if (!confirm(this.getMessage('confirm'))) {
      return;
    }
    this.configuracionautenticacionService.deleteConfiguracionautenticacion(idautenticacion)
        .subscribe({
          next: () => this.router.navigate(['/configuracionautenticacions'], {
            state: {
              msgInfo: this.getMessage('deleted')
            }
          }),
          error: (error) => {
            if (error.error?.code === 'REFERENCED') {
              const messageParts = error.error.message.split(',');
              this.router.navigate(['/configuracionautenticacions'], {
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
