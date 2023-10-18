import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Observable, from, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EmailAlreadyExist implements AsyncValidator {
  constructor(private firebase: AngularFireAuth) {}

  validate = (
    control: AbstractControl<any, any>
  ): Observable<ValidationErrors | null> => {
    return control.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((email) => this.checkEmailExist(email)), // hish.abdelshafouk@gmail.com
      map((exist) => (exist ? { alreadyExist: true } : null)),
      tap((err) => control.setErrors(err))
    );
  };

  checkEmailExist(email: string): Observable<boolean> {
    return from(this.firebase.fetchSignInMethodsForEmail(email)).pipe(
      map((res) => !!res.length)
    );
  }
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
