import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { FichajesService } from 'app/fichajes/fichajes.service';
import { FichajesDTO } from 'app/fichajes/fichajes.model';


@Component({
  selector: 'app-fichajes-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './fichajes-list.component.html'})
export class FichajesListComponent implements OnInit, OnDestroy {

  fichajesService = inject(FichajesService);
  errorHandler = inject(ErrorHandler);
  router = inject(Router);
  fichajeses?: FichajesDTO[];
  navigationSubscription?: Subscription;

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      confirm: $localize`:@@delete.confirm:Do you really want to delete this element? This cannot be undone.`,
      deleted: $localize`:@@fichajes.delete.success:Fichajes was removed successfully.`    };
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
    this.fichajesService.getAllFichajeses()
        .subscribe({
          next: (data) => this.fichajeses = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  confirmDelete(idfichaje: number) {
    if (!confirm(this.getMessage('confirm'))) {
      return;
    }
    this.fichajesService.deleteFichajes(idfichaje)
        .subscribe({
          next: () => this.router.navigate(['/fichajess'], {
            state: {
              msgInfo: this.getMessage('deleted')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

}
