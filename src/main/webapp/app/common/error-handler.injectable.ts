import { inject, Injectable } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ErrorHandler {

  router = inject(Router);

  /**
   * Handle server errors and show the error page if required. If provided, write all field errors
   * from the server response to the matching form fields. Resolves the error message from the
   * errorMessages map if available.
   */
  handleServerError(error: any, group?: FormGroup, getMessage?: (key: string) => string) {
    const extractedError = typeof error === 'object' && error?.error ? error.error : error;

    if (typeof extractedError === 'string' && group && getMessage) {
      if (extractedError === 'USUARIOS_EMAIL_UNIQUE') {
        group.get('email')?.setErrors({ custom: getMessage(extractedError) });
        return;
      }
      if (extractedError === 'EMPRESAS_CIF_UNIQUE') {
        group.get('cif')?.setErrors({ custom: getMessage(extractedError) });
        return;
      }
      if (extractedError === 'EMPRESAS_NOMBRE_UNIQUE') {
        group.get('nombre')?.setErrors({ custom: getMessage(extractedError) });
        return;
      }
    }

    if (!error || typeof error.status === 'undefined') {
      this.router.navigate(['/error'], {
        state: {
          errorStatus: '503'
        }
      });
      return;
    }

    if (!error.fieldErrors) {
      this.router.navigate(['/error'], {
        state: {
          errorStatus: '' + error.status
        }
      });
      return;
    }

    const errorsMap: Record<string, ValidationErrors> = {};
    for (const fieldError of error.fieldErrors) {
      const fieldName = fieldError.property;
      if (!errorsMap[fieldName]) {
        errorsMap[fieldName] = {};
      }

      let errorMessage = getGlobalErrorMessage(fieldError.code) || fieldError.code;
      if (getMessage) {
        errorMessage = getMessage(fieldError.property + '.' + fieldError.code) ||
          getMessage(fieldError.code) || errorMessage;
      }
      errorsMap[fieldName][fieldError.code] = errorMessage;
    }

    for (const [key, value] of Object.entries(errorsMap)) {
      group?.get(key)?.setErrors(value);
    }
  }


}

/**
 * Get an error message for a set of defined keys. Optional parameters can be used within
 * each message (for example with ${value}).
 */
export function getGlobalErrorMessage(key: string, details?: any) {
  let globalErrorMessages: Record<string, string> = {
    required: $localize`:@@required:Please provide a value.`,
    maxlength: $localize`:@@maxlength:Your value must have a length of less then ${details?.requiredLength} characters.`,
    validNumeric: $localize`:@@valid.numeric.format:Please provide a valid numeric number.`,
    validNumericDigits: $localize`:@@valid.numeric.digits:Your provided value is out of the valid range: <${details?.precision} digits>.<${details?.scale} digits> expected.`
  };
  return globalErrorMessages[key];
}

interface FieldError {

  code: string;
  property: string;
  message: string;
  rejectedValue: any|null;
  path: string|null;

}

interface ErrorResponse {

  status: number;
  code: string;
  message: string;
  fieldErrors?: FieldError[];

}
