import { DOCUMENT } from '@angular/common';
import {
  Directive,
  HostBinding,
  HostListener,
  Inject,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  @Input() template!: TemplateRef<HTMLElement>;

  // @HostBinding('class.opened') isOpened: boolean = false;

  isOpened: boolean = false;

  @HostListener('click', ['$event'])
  toggle(event: MouseEvent) {
    event.stopImmediatePropagation();
    if (this.isOpened) {
      this.removeFromBody();
    } else {
      this.appendToBody(event.clientX, event.clientY);
    }
    console.log(this.template);
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    this.removeFromBody();
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private viewContainerRef: ViewContainerRef
  ) {}

  appendToBody(x: number, y: number): void {
    const embeddedViewRef = this.viewContainerRef.createEmbeddedView(
      this.template
    );
    embeddedViewRef.detectChanges();
    for (const node of embeddedViewRef.rootNodes) {
      node.style.top = y + 24 + 'px';
      node.style.left = x - 118 + 'px';
      this.document.body.appendChild(node);
    }
    this.isOpened = true;
  }

  removeFromBody(): void {
    this.viewContainerRef.clear();
    this.isOpened = false;
  }
}
