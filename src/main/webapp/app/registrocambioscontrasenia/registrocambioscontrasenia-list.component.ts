import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { RegistrocambioscontraseniaService } from 'app/registrocambioscontrasenia/registrocambioscontrasenia.service';
import { RegistrocambioscontraseniaDTO } from 'app/registrocambioscontrasenia/registrocambioscontrasenia.model';

import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { PaginationComponent } from "../common/pagination/pagination.component";

@Component({
  selector: 'app-registrocambioscontrasenia-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    PaginationComponent
],
  templateUrl: './registrocambioscontrasenia-list.component.html'
})
export class RegistrocambioscontraseniaListComponent implements OnInit, OnDestroy {

  registrocambioscontraseniaService = inject(RegistrocambioscontraseniaService);
  errorHandler = inject(ErrorHandler);
  router = inject(Router);

  dataSource = new MatTableDataSource<RegistrocambioscontraseniaDTO>([]);
  displayedColumns = ['idRegistro', 'usuarioId', 'fechaCambio'];

  isLoading = true;
  navigationSubscription?: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      confirm: $localize`:@@delete.confirm:Do you really want to delete this element? This cannot be undone.`,
      deleted: $localize`:@@registrocambioscontrasenia.delete.success:Registrocambioscontrasenia was removed successfully.`
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
    this.registrocambioscontraseniaService.getAllRegistrocambioscontrasenias()
      .subscribe({
        next: (data) => {
          this.dataSource.data = data;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.isLoading = false;
        },
        error: (error) => {
          this.errorHandler.handleServerError(error.error);
          this.isLoading = false;
        }
      });
  }

  confirmDelete(idregistro: number) {
    if (!confirm(this.getMessage('confirm'))) {
      return;
    }
    this.registrocambioscontraseniaService.deleteRegistrocambioscontrasenia(idregistro)
      .subscribe({
        next: () => this.router.navigate(['/registrocambioscontrasenias'], {
          state: { msgInfo: this.getMessage('deleted') }
        }),
        error: (error) => this.errorHandler.handleServerError(error.error)
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  trackById(index: number, item: RegistrocambioscontraseniaDTO): number | null {
    return item.idRegistro ?? null;
  }
}
