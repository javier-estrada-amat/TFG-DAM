import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { HorasextrasService } from 'app/horasextras/horasextras.service';
import { HorasextrasDTO } from 'app/horasextras/horasextras.model';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-horasextras-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './horasextras-list.component.html',
  styleUrl: './horasextras-list.component.css'
})
export class HorasextrasListComponent implements OnInit, OnDestroy {
  horasextrasService = inject(HorasextrasService);
  errorHandler = inject(ErrorHandler);
  router = inject(Router);

  dataSource = new MatTableDataSource<HorasextrasDTO>([]);
  displayedColumns = ['id_hora_extra', 'usuario', 'fecha', 'horasSolicitadas', 'horasAprobadas', 'estado', 'aprobadoPor'];
  navigationSubscription?: Subscription;

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

  ngOnDestroy(): void {
    this.navigationSubscription?.unsubscribe();
  }

  loadData() {
    this.isLoading = true;
    this.horasextrasService.getAllHorasextras().subscribe({
      next: (data) => {
        const unique = data.filter((item, index, self) =>
          item.id_hora_extra != null &&
          index === self.findIndex(t => t.id_hora_extra === item.id_hora_extra)
        );
        this.dataSource.data = unique;
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
}
