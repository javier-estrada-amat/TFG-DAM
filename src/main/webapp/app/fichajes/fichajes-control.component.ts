import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-fichajes-control',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fichajes-control.component.html',
})
export class FichajesControlComponent implements OnInit {

  http = inject(HttpClient);
  apiUrl = environment.apiPath + 'fichajes';
  fichajeEnCurso: boolean = false;
  estado: 'INICIADO' | 'FINALIZADO' | null = null;
  cargando = false;

  ngOnInit(): void {
    const estadoGuardado = localStorage.getItem('estadoFichaje');
    this.estado = estadoGuardado === 'INICIADO' || estadoGuardado === 'FINALIZADO' ? estadoGuardado : null;
    this.consultarEstadoFichaje();
  }

  iniciarFichaje() {
    this.cargando = true;
    const headers = this.getAuthHeaders();
    this.http.post(`${this.apiUrl}/iniciar`, {}, { headers }).subscribe({
      next: () => {
        this.estado = 'INICIADO';
        localStorage.setItem('estadoFichaje', 'INICIADO');
        this.consultarEstadoFichaje();
      },
      error: (err) => {
        console.error('Error al iniciar el fichaje:', err);
      },
      complete: () => this.cargando = false
    });
  }

  finalizarFichaje() {
    this.cargando = true;
    const headers = this.getAuthHeaders();
    this.http.put(`${this.apiUrl}/finalizar`, {}, { headers }).subscribe({
      next: () => {
        this.estado = 'FINALIZADO';
        localStorage.setItem('estadoFichaje', 'FINALIZADO');
        this.consultarEstadoFichaje();
      },
      error: (err) => {
        console.error('Error al finalizar el fichaje:', err);
      },
      complete: () => this.cargando = false
    });
  }

  consultarEstadoFichaje() {
    this.http.get<boolean>(`${this.apiUrl}/estado`, { headers: this.getAuthHeaders() }).subscribe({
      next: (estado: boolean) => {
        this.fichajeEnCurso = estado;
      },
      error: (err) => console.error('Error al consultar el estado del fichaje', err)
    });
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }
}
