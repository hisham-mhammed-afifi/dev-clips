import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './components/icon/icon.component';
import { ModalComponent } from './components/modal/modal.component';
import { InputComponent } from './components/input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideEnvironmentNgxMask } from 'ngx-mask';
import { AlertComponent } from './components/alert/alert.component';
import { DropdownDirective } from './directives/dropdown.directive';

@NgModule({
  declarations: [
    IconComponent,
    ModalComponent,
    InputComponent,
    AlertComponent,
    DropdownDirective,
  ],
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective],
  exports: [
    IconComponent,
    ModalComponent,
    InputComponent,
    AlertComponent,
    DropdownDirective,
  ],
  providers: [provideEnvironmentNgxMask()],
})
export class SharedModule {}
