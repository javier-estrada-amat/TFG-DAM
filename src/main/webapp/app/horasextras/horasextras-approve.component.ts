import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorasextrasService } from './horasextras.service';
import { HorasextrasDTO } from './horasextras.model';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-horasextras-approve',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './horasextras-approve.component.html'
})
export class HorasextrasApproveComponent implements OnInit {

  horasextrasService = inject(HorasextrasService);
  http = inject(HttpClient);

  pendientes: HorasextrasDTO[] = [];
  errores: string[] = [];
  mensaje: string | null = null;

  ngOnInit(): void {
    this.horasextrasService.getHorasextrasPendientes().subscribe({
      next: (data) => this.pendientes = data,
      error: (err) => this.errores.push('Error al cargar las horas extras pendientes')
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
        },
        error: () => this.errores.push(`Error al aprobar la solicitud ${hora.id_hora_extra}`)
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
        },
        error: () => this.errores.push(`Error al rechazar la solicitud ${hora.id_hora_extra}`)
      });
  }

  removeFromList(hora: HorasextrasDTO) {
    this.pendientes = this.pendientes.filter(h => h.id_hora_extra !== hora.id_hora_extra);
  }

  mostrarMensaje(texto: string) {
    this.mensaje = texto;
    setTimeout(() => {
      this.mensaje = null;
    }, 3000); // Oculta el mensaje después de 3 segundos
  }
}
