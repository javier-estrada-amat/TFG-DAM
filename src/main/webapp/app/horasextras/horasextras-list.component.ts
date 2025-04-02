import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { HorasextrasService } from 'app/horasextras/horasextras.service';
import { HorasextrasDTO } from 'app/horasextras/horasextras.model';


@Component({
  selector: 'app-horasextras-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './horasextras-list.component.html'})
export class HorasextrasListComponent implements OnInit, OnDestroy {

  horasextrasService = inject(HorasextrasService);
  errorHandler = inject(ErrorHandler);
  router = inject(Router);
  horasextrases?: HorasextrasDTO[];
  navigationSubscription?: Subscription;

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      confirm: $localize`:@@delete.confirm:Do you really want to delete this element? This cannot be undone.`,
      deleted: $localize`:@@horasextras.delete.success:Horasextras was removed successfully.`,
      'horasextras.usuarios.horasextrasusuarios.referenced': $localize`:@@horasextras.usuarios.horasextrasusuarios.referenced:This entity is still referenced by Usuarios ${details?.id} via field Horasextrasusuarios.`
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
    this.horasextrasService.getAllHorasextrases()
        .subscribe({
          next: (data) => this.horasextrases = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  confirmDelete(idhoraextra: number) {
    if (!confirm(this.getMessage('confirm'))) {
      return;
    }
    this.horasextrasService.deleteHorasextras(idhoraextra)
        .subscribe({
          next: () => this.router.navigate(['/horasextrass'], {
            state: {
              msgInfo: this.getMessage('deleted')
            }
          }),
          error: (error) => {
            if (error.error?.code === 'REFERENCED') {
              const messageParts = error.error.message.split(',');
              this.router.navigate(['/horasextrass'], {
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
