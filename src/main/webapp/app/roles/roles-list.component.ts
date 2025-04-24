import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { RolesService } from 'app/roles/roles.service';
import { RolesDTO } from 'app/roles/roles.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { PaginationComponent } from "../common/pagination/pagination.component";
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-roles-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    PaginationComponent,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  templateUrl: './roles-list.component.html',
})
export class RolesListComponent implements OnInit, OnDestroy {

  rolesService = inject(RolesService);
  errorHandler = inject(ErrorHandler);
  router = inject(Router);

  dataSource = new MatTableDataSource<RolesDTO>([]);
  displayedColumns = ['id_rol', 'nombre', 'acciones'];
  isLoading = true;
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
    this.rolesService.getAllRoleses().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      },
      error: (error) => this.errorHandler.handleServerError(error.error)
    });
  }

  confirmDelete(idrol: number) {
    if (!confirm(this.getMessage('confirm'))) return;
    this.rolesService.deleteRoles(idrol).subscribe({
      next: () => this.router.navigate(['/roles'], {
        state: { msgInfo: this.getMessage('deleted') }
      }),
      error: (error) => this.errorHandler.handleServerError(error.error)
    });
  }

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      confirm: $localize`:@@delete.confirm:¿Seguro que deseas eliminar este rol?`,
      deleted: $localize`:@@roles.delete.success:El rol ha sido eliminado correctamente.`
    };
    return messages[key];
  }
}
