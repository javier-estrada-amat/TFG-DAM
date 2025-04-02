import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { RolesService } from 'app/roles/roles.service';
import { RolesDTO } from 'app/roles/roles.model';


@Component({
  selector: 'app-roles-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './roles-list.component.html'})
export class RolesListComponent implements OnInit, OnDestroy {

  rolesService = inject(RolesService);
  errorHandler = inject(ErrorHandler);
  router = inject(Router);
  roleses?: RolesDTO[];
  navigationSubscription?: Subscription;

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      confirm: $localize`:@@delete.confirm:Do you really want to delete this element? This cannot be undone.`,
      deleted: $localize`:@@roles.delete.success:Roles was removed successfully.`    };
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
    this.rolesService.getAllRoleses()
        .subscribe({
          next: (data) => this.roleses = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  confirmDelete(idrol: number) {
    if (!confirm(this.getMessage('confirm'))) {
      return;
    }
    this.rolesService.deleteRoles(idrol)
        .subscribe({
          next: () => this.router.navigate(['/roless'], {
            state: {
              msgInfo: this.getMessage('deleted')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

}
