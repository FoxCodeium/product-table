import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function greaterThanZero(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const raw = control.value;
    if (raw === null || raw === undefined || raw === '') return null;
    const value = typeof raw === 'number' ? raw : Number(raw);
    if (Number.isNaN(value)) return { notANumber: true };
    return value > 0 ? null : { greaterThanZero: true };
  };
}
