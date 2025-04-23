import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { HorasextrasService } from 'app/horasextras/horasextras.service';
import { HorasextrasDTO } from 'app/horasextras/horasextras.model';


@Component({
  selector: 'app-horasextras-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './horasextras-list.component.html'})
export class HorasextrasListComponent implements OnInit, OnDestroy {

  horasextrasService = inject(HorasextrasService);
  errorHandler = inject(ErrorHandler);
  router = inject(Router);
  horasextrases?: HorasextrasDTO[];
  navigationSubscription?: Subscription;

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
    this.horasextrasService.getAllHorasextras()
      .subscribe({
        next: (data) => {
          this.horasextrases = data.filter((item, index, self) =>
            item.id_hora_extra != null &&
            index === self.findIndex(t => t.id_hora_extra === item.id_hora_extra)
          );
          // Si quieres filtrar por usuario logado, puedes hacerlo aquí
          // const userId = localStorage.getItem('usuarioId');
          // this.horasextrases = data.filter(h => h.usuarioid === Number(userId));
        },
        error: (error) => this.errorHandler.handleServerError(error.error)
      });
  }

  trackByHoraExtra(index: number, item: HorasextrasDTO): any {
    return item.id_hora_extra ?? index;
  }
}
