import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { HistorialactividadService } from 'app/historialactividad/historialactividad.service';
import { HistorialactividadDTO } from 'app/historialactividad/historialactividad.model';


@Component({
  selector: 'app-historialactividad-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './historialactividad-list.component.html'})
export class HistorialactividadListComponent implements OnInit, OnDestroy {

  historialactividadService = inject(HistorialactividadService);
  errorHandler = inject(ErrorHandler);
  router = inject(Router);
  historialactividads?: HistorialactividadDTO[];
  navigationSubscription?: Subscription;

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      confirm: $localize`:@@delete.confirm:Do you really want to delete this element? This cannot be undone.`,
      deleted: $localize`:@@historialactividad.delete.success:Historialactividad was removed successfully.`    };
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
    this.historialactividadService.getAllHistorialactividads()
        .subscribe({
          next: (data) => this.historialactividads = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  confirmDelete(idhistorial: number) {
    if (!confirm(this.getMessage('confirm'))) {
      return;
    }
    this.historialactividadService.deleteHistorialactividad(idhistorial)
        .subscribe({
          next: () => this.router.navigate(['/historialactividads'], {
            state: {
              msgInfo: this.getMessage('deleted')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

}
