import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { getGlobalErrorMessage } from 'app/common/error-handler.injectable';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-errors',
  standalone: true,
  templateUrl: './input-errors.component.html',
  imports: [CommonModule]
})
export class InputErrorsComponent {
  @Input({ required: true }) control?: AbstractControl;

  isString(value: any): boolean {
    return typeof value === 'string';
  }

  getMessage(key: string, details?: any): string {
    const globalErrorMessage = getGlobalErrorMessage(key, details);
    return globalErrorMessage || key;
  }

  getServerErrors(): string[] {
    const errors = this.control?.errors;
    if (!errors) return [];

    return Object.keys(errors)
      .filter(key => key === 'server')
      .flatMap(() => {
        const val = errors['server'];
        if (Array.isArray(val)) {
          return val;
        } else if (typeof val === 'string') {
          return [val];
        } else {
          return [];
        }
      });
  }
}
