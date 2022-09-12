import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchingValidatior: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');

  const confirmPassword = control.get('rePassword');

  return password?.value === confirmPassword?.value
    ? null
    : { notMatched: true };
};

export const createEmailDuplicateValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  let isDuplicate = control.value.some((item: string, index: number) => {
    return control.value.indexOf(item) != index;
  });
  return isDuplicate ? { errorEmail: 'Email must be unique' } : null;
};
