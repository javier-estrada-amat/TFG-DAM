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

  @Input({ required: true })
  control?: AbstractControl;

  isString(value: any): boolean {
    return typeof value === 'string';
  }

  getMessage(key: string, details?: any) {
    const globalErrorMessage = getGlobalErrorMessage(key, details);
    return globalErrorMessage || key;
  }

}
