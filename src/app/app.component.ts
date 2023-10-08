import { Component, OnInit } from '@angular/core';
import { ModalService } from './core/services/modal.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from './core/services/firebase.service';
import IUser from './core/models/User';
import {
  EmailAlreadyExist,
  RegisterValidators,
} from './core/validators/register.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  alert = {
    show: false,
    type: 'success',
    message: '',
  };

  isLoginForm = true;
  registring = false;
  loging = false;

  credentials = {
    email: '',
    password: '',
  };

  constructor(
    public modalService: ModalService,
    public firebase: FirebaseService,
    private emailExist: EmailAlreadyExist,
    private router: Router
  ) {}

  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  email = new FormControl(
    '',
    [Validators.required, Validators.email],
    [this.emailExist.validate]
  );
  age = new FormControl<number | null>(null, [
    Validators.required,
    Validators.min(5),
    Validators.max(100),
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm),
  ]);
  confirm_password = new FormControl('', [Validators.required]);
  phone_number = new FormControl('', [Validators.required]);

  registerForm = new FormGroup(
    {
      name: this.name,
      email: this.email,
      age: this.age,
      password: this.password,
      confirm_password: this.confirm_password,
      phone_number: this.phone_number,
    },
    [RegisterValidators.match('password', 'confirm_password')]
  );

  ngOnInit(): void {}

  register(e: Event) {
    e.preventDefault();
    this.registring = true;
    this.alert.show = true;
    this.alert.type = 'info';
    this.alert.message = 'wait..., preparing your account';
    this.firebase.signup(this.registerForm.value as IUser).subscribe({
      next: () => {
        this.alert.show = true;
        this.alert.type = 'success';
        this.alert.message = 'success..., your account has been created';
        this.hideAlert();
        this.modalService.close('auth');
      },
      error: () => {
        this.alert.show = true;
        this.alert.type = 'danger';
        this.alert.message = 'error..., please try again later';
        this.hideAlert();
      },
    });
  }

  login(e: Event) {
    e.preventDefault();
    this.firebase.login(this.credentials).subscribe({
      next: () => {
        this.alert.show = true;
        this.alert.type = 'success';
        this.alert.message = 'You are logedin successfuly';
        this.hideAlert();
        this.modalService.close('auth');
      },
      error: () => {
        this.alert.show = true;
        this.alert.type = 'danger';
        this.alert.message = 'something went wrong, please try again later';
        this.hideAlert();
      },
    });
  }

  logout() {
    this.firebase.logout().subscribe();
  }

  hideAlert() {
    setTimeout(() => {
      this.registring = false;
      this.loging = false;
      this.alert.show = false;
    }, 2000);
  }
}
