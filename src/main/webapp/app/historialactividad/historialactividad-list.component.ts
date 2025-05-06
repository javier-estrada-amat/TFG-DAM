import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { HistorialactividadService } from 'app/historialactividad/historialactividad.service';
import { HistorialactividadDTO } from 'app/historialactividad/historialactividad.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorIntlEspañol } from 'app/shared/mat-paginator-intl-es';

@Component({
  selector: 'app-historialactividad-list',
  standalone: true,
  imports: [
    CommonModule,
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
  templateUrl: './historialactividad-list.component.html',
  styleUrl: './historialactividad-list.component.css'
})


export class HistorialactividadListComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<HistorialactividadDTO>([]);
  displayedColumns = ['id',	'usuario',	'accion', 'entidad',	'fecha'];
  historialactividadService = inject(HistorialactividadService);
  errorHandler = inject(ErrorHandler);
  router = inject(Router);
  historialactividads?: HistorialactividadDTO[];
  navigationSubscription?: Subscription;

 
  ngOnInit() {
    this.loadData();
    this.navigationSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loadData();
      }
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.navigationSubscription!.unsubscribe();
  }

  loadData() {
    this.historialactividadService.getAllHistorialactividads()
      .subscribe({
        next: (data) => {
          this.historialactividads = data;
          this.dataSource.data = data;
        },
        error: (error) => this.errorHandler.handleServerError(error.error)
      });
  }

  trackById(index: number, item: HistorialactividadDTO): number {
    return item.idHistorial ?? index;
  }

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
   };
    return messages[key];
  }

}
