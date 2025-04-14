import { FormGroup, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


/**
* Update all controls of the provided form group with the given data.
*/
export function updateForm(group: FormGroup, data: any) {
  for (const field in group.controls) {
    const control = group.get(field)!;

    let value = null;

    if (field === 'empresa' && data.empresa?.id_empresa !== undefined) {
      value = data.empresa.id_empresa;
    } else if (field === 'roles' && Array.isArray(data.roles) && data.roles.length > 0) {
        value = data.roles[0];
    } else {
      value = data[field] === undefined ? null : data[field];
    }

    control.setValue(value, { emitEvent: false });
  }
}

/**
 * Helper function for transforming a Record to a Map to support number as a key.
 */
export function transformRecordToMap(data:Record<string, number | string>):Map<number, string> {
  const dataMap = new Map<number, string>();
  for (const [key, value] of Object.entries(data)) {
    dataMap.set(Number(key), String(value));
  }
  return dataMap;
}

export function validNumeric(precision: number, scale: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value === null) {
      return null;
    }
    if (!/^(-?)[0-9]*(\.[0-9]+)?$/.test(control.value)) {
      return { validNumeric: { value: control.value } };
    }
    const numericRegex = new RegExp('^(-?)[0-9]{0,' + precision + '}(\\.[0-9]{0,' + scale + '})?$');
    if (!numericRegex.test(control.value)) {
      return { validNumericDigits: { value: control.value, precision, scale } };
    }
    return null;
  }
}
