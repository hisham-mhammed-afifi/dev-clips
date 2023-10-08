import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  template: `
    <svg
      class="cursor-pointer"
      attr.fill="{{ color }}"
      attr.width="{{ size }}"
      attr.height="{{ size }}"
    >
      <use attr.xlink:href="assets/icons/icons.svg#{{ icon }}"></use>
    </svg>
  `,
})
export class IconComponent {
  @Input() icon: string = '';
  @Input() size: string = '1em';
  @Input() color: string = 'currentColor';
}
