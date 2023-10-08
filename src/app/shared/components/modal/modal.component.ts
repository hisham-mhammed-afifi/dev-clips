import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() title: string = '';
  @Input() modalId: string = '';

  constructor(
    public modalService: ModalService,
    private el: ElementRef,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.modalService.register(this.modalId);
    this.document.body.appendChild(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    // this.document.body.removeChild(this.el.nativeElement);
  }
}
