import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { FichajesService } from 'app/fichajes/fichajes.service';
import { FichajesDTO } from 'app/fichajes/fichajes.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorIntlEspañol } from 'app/shared/mat-paginator-intl-es';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PaginationComponent } from 'app/common/pagination/pagination.component';

// ... (importaciones iguales)

@Component({
  selector: 'app-fichajes-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    PaginationComponent
  ],
  providers: [
    { provide: MatPaginatorIntl, useFactory: MatPaginatorIntlEspañol }
  ],
  templateUrl: './fichajes-list.component.html'
})
export class FichajesListComponent implements OnInit, OnDestroy {

  fichajesService = inject(FichajesService);
  errorHandler = inject(ErrorHandler);
  router = inject(Router);

  dataSource = new MatTableDataSource<FichajesDTO>([]);
  displayedColumns = ['usuario_id', 'fecha', 'hora_entrada', 'hora_salida', 'estado'];

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
    this.fichajesService.getAllFichajes().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      },
      error: (error) => this.errorHandler.handleServerError(error.error)
    });
  }
}

