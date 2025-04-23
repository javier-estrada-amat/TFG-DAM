import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { UsuariosService } from 'app/usuarios/usuarios.service';
import { UsuariosDTO } from 'app/usuarios/usuarios.model';

import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorIntlEspañol } from 'app/shared/mat-paginator-intl-es';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-usuarios-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
providers: [
    { provide: MatPaginatorIntl, useFactory: MatPaginatorIntlEspañol }
  ],
  templateUrl: './usuarios-list.component.html'
})
export class UsuariosListComponent implements OnInit, OnDestroy {

  usuariosService = inject(UsuariosService);
  errorHandler = inject(ErrorHandler);
  router = inject(Router);

  dataSource = new MatTableDataSource<UsuariosDTO>([]);
  displayedColumns = ['id_usuario', 'nombre', 'apellidos', 'email', 'fecha_registro', 'empresa', 'acciones'];

  isLoading = true;
  mostrarSoloActivos: boolean = true;
  navigationSubscription?: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.loadData();
    this.navigationSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loadData();
      }
    });
  }

  ngOnDestroy() {
    this.navigationSubscription?.unsubscribe();
  }

  loadData() {
    const request = this.mostrarSoloActivos
      ? this.usuariosService.getUsuariosActivos()
      : this.usuariosService.getAllUsuarios();

    request.subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      },
      error: (error) => this.errorHandler.handleServerError(error.error)
    });
  }

  alternarFiltro() {
    this.mostrarSoloActivos = !this.mostrarSoloActivos;
    this.loadData();
  }

  confirmDelete(idusuario: number) {
    if (!confirm(this.getMessage('confirm'))) {
      return;
    }
    this.usuariosService.desactivarUsuarios(idusuario).subscribe({
      next: () => this.router.navigate(['/usuarios'], {
        state: {
          msgInfo: this.getMessage('deleted')
        }
      }),
      error: (error) => {
        if (error.error?.code === 'REFERENCED') {
          const messageParts = error.error.message.split(',');
          this.router.navigate(['/usuarios'], {
            state: {
              msgError: this.getMessage(messageParts[0], { id: messageParts[1] })
            }
          });
          return;
        }
        this.errorHandler.handleServerError(error.error);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      confirm: $localize`:@@delete.confirm:¿Seguro que deseas eliminar este elemento?`,
      deleted: $localize`:@@usuarios.delete.success:El usuario fue eliminado correctamente.`,
      'usuarios.fichajes.usuarios.referenced': $localize`:@@usuarios.fichajes.usuarios.referenced:Este usuario está referenciado por Fichajes ${details?.id}.`,
      'usuarios.horasextras.usuarios.referenced': $localize`:@@usuarios.horasextras.usuarios.referenced:Este usuario está referenciado por Horas Extras ${details?.id}.`,
      'usuarios.registrocambioscontrasenia.usuarios.referenced': $localize`:@@usuarios.registrocambioscontrasenia.usuarios.referenced:Este usuario está referenciado por Registro de Cambios de Contraseña ${details?.id}.`,
      'usuarios.historialactividad.usuarios.referenced': $localize`:@@usuarios.historialactividad.usuarios.referenced:Este usuario está referenciado por Historial de Actividad ${details?.id}.`
    };
    return messages[key];
  }
}
