import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { HorasextrasService } from './horasextras.service';
import { HorasextrasDTO } from './horasextras.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PaginationComponent } from '../common/pagination/pagination.component';

@Component({
  selector: 'app-horasextras-approve',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    PaginationComponent
  ],
  templateUrl: './horasextras-approve.component.html'
})
export class HorasextrasApproveComponent implements OnInit {
  horasextrasService = inject(HorasextrasService);

  displayedColumns = ['usuario', 'fecha', 'solicitadas', 'motivo', 'aprobadas', 'acciones'];
  dataSource = new MatTableDataSource<HorasextrasDTO>([]);
  mensaje: string | null = null;
  isLoading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.horasextrasService.getHorasextrasPendientes().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  aprobar(hora: HorasextrasDTO, horasAprobadas: string) {
    const payload = {
      horasAprobadas: horasAprobadas,
      estado: 'APROBADA'
    };

    this.horasextrasService.resolverHoraExtra(hora.id_hora_extra!, payload).subscribe({
      next: () => {
        this.removeFromList(hora);
        this.mostrarMensaje('Solicitud aprobada correctamente.');
      }
    });
  }

  rechazar(hora: HorasextrasDTO) {
    const payload = {
      horasAprobadas: '0',
      estado: 'RECHAZADA'
    };

    this.horasextrasService.resolverHoraExtra(hora.id_hora_extra!, payload).subscribe({
      next: () => {
        this.removeFromList(hora);
        this.mostrarMensaje('Solicitud rechazada correctamente.');
      }
    });
  }

  removeFromList(hora: HorasextrasDTO) {
    this.dataSource.data = this.dataSource.data.filter(h => h.id_hora_extra !== hora.id_hora_extra);
  }

  mostrarMensaje(texto: string) {
    this.mensaje = texto;
    setTimeout(() => (this.mensaje = null), 3000);
  }
}