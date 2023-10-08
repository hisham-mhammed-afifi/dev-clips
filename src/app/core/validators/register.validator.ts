import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class EmailAlreadyExist implements AsyncValidator {
  constructor(private firebase: AngularFireAuth) {}

  validate = (
    control: AbstractControl<any, any>
  ): Promise<ValidationErrors | null> => {
    return this.firebase
      .fetchSignInMethodsForEmail(control.value)
      .then((res) => (!!res.length ? { alreadyExist: true } : null));
  };
}

export class RegisterValidators {
  static match(controlName: string, matchingName: string): ValidatorFn {
    return (form: AbstractControl): ValidationErrors | null => {
      const control = form.get(controlName);
      const matching = form.get(matchingName);
      if (!control || !matching) {
        return { notfound: true };
      }
      const error = control.value === matching.value ? null : { noMatch: true };
      matching.setErrors(error);
      return error;
    };
  }
}
