import { Component, ElementRef, inject, HostListener } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from 'app/auth/auth.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(public auth: AuthService) {}
  elRef = inject(ElementRef);

  get nombreCompleto(): string {
    const nombre = localStorage.getItem('nombre') || '';
    const apellidos = localStorage.getItem('apellidos') || '';
    return `${nombre} ${apellidos}`.trim();
  }

  @HostListener('document:click', ['$event'])
  handleDropdown(event: Event) {
    // close any open dropdown
    const $clickedDropdown = (event.target as HTMLElement).closest('.js-dropdown');
    const $dropdowns = this.elRef.nativeElement.querySelectorAll('.js-dropdown');
    $dropdowns.forEach(($dropdown:HTMLElement) => {
      if ($clickedDropdown !== $dropdown && $dropdown.getAttribute('data-dropdown-keepopen') !== 'true') {
        $dropdown.ariaExpanded = 'false';
        $dropdown.nextElementSibling!.classList.add('hidden');
      }
    });
    // toggle selected if applicable
    if ($clickedDropdown) {
      $clickedDropdown.ariaExpanded = '' + ($clickedDropdown.ariaExpanded !== 'true');
      $clickedDropdown.nextElementSibling!.classList.toggle('hidden');
    }
  }

}
