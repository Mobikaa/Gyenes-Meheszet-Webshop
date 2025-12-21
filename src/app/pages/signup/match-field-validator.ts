import { AbstractControl, ValidationErrors } from "@angular/forms";

export function matchFieldsValidator(
  field: string,
  confirmField: string,
  errorKey = 'fieldsMismatch'
) {
  return (control: AbstractControl): ValidationErrors | null => {
    const fieldCtrl = control.get(field);
    const confirmCtrl = control.get(confirmField);

    if (!fieldCtrl || !confirmCtrl) return null;

    if (fieldCtrl.value !== confirmCtrl.value) {
      confirmCtrl.setErrors({
        ...confirmCtrl.errors,
        [errorKey]: true
      });
    } else {
      const errors = confirmCtrl.errors;
      if (errors) {
        delete errors[errorKey];
        if (!Object.keys(errors).length) {
          confirmCtrl.setErrors(null);
        }
      }
    }

    return null;
  };
}
