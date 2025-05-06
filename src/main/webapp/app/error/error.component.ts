import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { getReasonPhrase } from 'http-status-codes';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule, MatButton, MatIcon],
  templateUrl: './error.component.html'
})
export class ErrorComponent implements OnInit {

  router = inject(Router);

  status = '404';
  error = getReasonPhrase(404); // Mensaje predeterminado

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state;

    if (state?.['errorStatus']) {
      this.status = state['errorStatus'];
      this.error = state['errorMessage'] || getReasonPhrase(Number(this.status));
    } else {
      // Si no viene desde una navegación con estado (ej: recarga directa), usar valores por defecto
      this.status = '404';
      this.error = getReasonPhrase(404);
    }
  }
}
