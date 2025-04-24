import { Component } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorIntlEspañol } from 'app/shared/mat-paginator-intl-es';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-pagination',
  imports: [   MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
  providers: [
    { provide: MatPaginatorIntl, useFactory: MatPaginatorIntlEspañol }
  ],
})
export class PaginationComponent {

}
