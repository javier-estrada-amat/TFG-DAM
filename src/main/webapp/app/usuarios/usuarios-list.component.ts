import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { UsuariosService } from 'app/usuarios/usuarios.service';
import { UsuariosDTO } from 'app/usuarios/usuarios.model';


@Component({
  selector: 'app-usuarios-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './usuarios-list.component.html'})
export class UsuariosListComponent implements OnInit, OnDestroy {

  usuariosService = inject(UsuariosService);
  errorHandler = inject(ErrorHandler);
  router = inject(Router);
  usuarioses?: UsuariosDTO[];
  navigationSubscription?: Subscription;

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      confirm: $localize`:@@delete.confirm:Do you really want to delete this element? This cannot be undone.`,
      deleted: $localize`:@@usuarios.delete.success:Usuarios was removed successfully.`,
      'usuarios.fichajes.usuarios.referenced': $localize`:@@usuarios.fichajes.usuarios.referenced:This entity is still referenced by Fichajes ${details?.id} via field Usuarios.`,
      'usuarios.horasextras.usuarios.referenced': $localize`:@@usuarios.horasextras.usuarios.referenced:This entity is still referenced by Horasextras ${details?.id} via field Usuarios.`,
      'usuarios.registrocambioscontrasenia.usuarios.referenced': $localize`:@@usuarios.registrocambioscontrasenia.usuarios.referenced:This entity is still referenced by Registrocambioscontrasenia ${details?.id} via field Usuarios.`,
      'usuarios.historialactividad.usuarios.referenced': $localize`:@@usuarios.historialactividad.usuarios.referenced:This entity is still referenced by Historialactividad ${details?.id} via field Usuarios.`
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
    this.usuariosService.getAllUsuarioses()
        .subscribe({
          next: (data) => this.usuarioses = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  confirmDelete(idusuario: number) {
    if (!confirm(this.getMessage('confirm'))) {
      return;
    }
    this.usuariosService.deleteUsuarios(idusuario)
        .subscribe({
          next: () => this.router.navigate(['/usuarioss'], {
            state: {
              msgInfo: this.getMessage('deleted')
            }
          }),
          error: (error) => {
            if (error.error?.code === 'REFERENCED') {
              const messageParts = error.error.message.split(',');
              this.router.navigate(['/usuarioss'], {
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
