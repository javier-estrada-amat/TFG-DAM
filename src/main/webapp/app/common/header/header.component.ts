import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'app/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  openDropdown = false;
  @ViewChild('dropdown', { static: false }) dropdownRef!: ElementRef;

  constructor(public auth: AuthService, private router: Router) {}

  get nombreCompleto(): string {
    const nombre = localStorage.getItem('nombre') || '';
    const apellidos = localStorage.getItem('apellidos') || '';
    return `${nombre} ${apellidos}`.trim();
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (this.dropdownRef && this.dropdownRef.nativeElement.contains(target)) {
      return;
    }
    this.openDropdown = false;
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.openDropdown = !this.openDropdown;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}