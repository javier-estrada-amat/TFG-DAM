import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmpresasService } from 'app/empresas/empresas.service';
import { EmpresasDTO } from 'app/empresas/empresas.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorIntlEspañol } from 'app/shared/mat-paginator-intl-es';
import { PaginationComponent } from "../common/pagination/pagination.component";

@Component({
  selector: 'app-empresas-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    
  ],
  providers: [
    { provide: MatPaginatorIntl, useFactory: MatPaginatorIntlEspañol }
  ],
  templateUrl: './empresas-list.component.html',
  styleUrl: './empresas-list-component.css'
})
export class EmpresasListComponent implements OnInit, OnDestroy {

  empresasService = inject(EmpresasService);
  errorHandler = inject(ErrorHandler);
  router = inject(Router);
  navigationSubscription?: Subscription;

  dataSource = new MatTableDataSource<EmpresasDTO>([]);
  displayedColumns = ['id_empresa', 'nombre', 'cif', 'direccion', 'telefono', 'email', 'acciones'];

  isLoading = true;

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
    this.empresasService.getAllEmpresas().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      },
      error: (error) => this.errorHandler.handleServerError(error.error)
    });
  }

  confirmDelete(idempresa: number) {
    if (!confirm(this.getMessage('confirm'))) return;
    this.empresasService.deleteEmpresas(idempresa).subscribe({
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
        } else {
          this.errorHandler.handleServerError(error.error);
        }
      }
    });
  }

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      confirm: $localize`:@@delete.confirm:¿Seguro que deseas eliminar esta empresa?`,
      deleted: $localize`:@@empresas.delete.success:Empresa eliminada correctamente.`,
      'empresas.usuarios.empresas.referenced': $localize`:@@empresas.usuarios.empresas.referenced:Esta empresa está referenciada por Usuario ${details?.id}.`
    };
    return messages[key];
  }
}
