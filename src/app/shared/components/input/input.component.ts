import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  @Input() id: string = '';
  @Input() label: string = '';
  @Input() required: boolean = false;
  @Input() type: string = 'text';
  @Input() control = new FormControl();
  @Input() dropSpecialCharacters = false;
  @Input() format = '';
  @Input() prefix = '';

  constructor() {}

  ngOnInit(): void {}
}
