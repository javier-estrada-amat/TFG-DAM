import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { RegistrocambioscontraseniaService } from 'app/registrocambioscontrasenia/registrocambioscontrasenia.service';
import { RegistrocambioscontraseniaDTO } from 'app/registrocambioscontrasenia/registrocambioscontrasenia.model';


@Component({
  selector: 'app-registrocambioscontrasenia-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './registrocambioscontrasenia-list.component.html'})
export class RegistrocambioscontraseniaListComponent implements OnInit, OnDestroy {

  registrocambioscontraseniaService = inject(RegistrocambioscontraseniaService);
  errorHandler = inject(ErrorHandler);
  router = inject(Router);
  registrocambioscontrasenias?: RegistrocambioscontraseniaDTO[];
  navigationSubscription?: Subscription;

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      confirm: $localize`:@@delete.confirm:Do you really want to delete this element? This cannot be undone.`,
      deleted: $localize`:@@registrocambioscontrasenia.delete.success:Registrocambioscontrasenia was removed successfully.`    };
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
    this.registrocambioscontraseniaService.getAllRegistrocambioscontrasenias()
        .subscribe({
          next: (data) => this.registrocambioscontrasenias = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  confirmDelete(idregistro: number) {
    if (!confirm(this.getMessage('confirm'))) {
      return;
    }
    this.registrocambioscontraseniaService.deleteRegistrocambioscontrasenia(idregistro)
        .subscribe({
          next: () => this.router.navigate(['/registrocambioscontrasenias'], {
            state: {
              msgInfo: this.getMessage('deleted')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

}
