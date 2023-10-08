import { ElementRef, Injectable } from '@angular/core';

interface IModal {
  id: string;
  visible: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modals: IModal[] = [];

  constructor() {}

  register(id: string) {
    this.modals.push({ id, visible: false });
  }

  isOpen(id: string): boolean {
    const modal = this.modals.find((m) => m.id === id);
    return !!modal?.visible;
  }

  open(id: string) {
    const idx = this.modals.findIndex((m) => m.id === id);
    this.modals[idx].visible = true;
  }

  close(id: string) {
    const idx = this.modals.findIndex((m) => m.id === id);
    this.modals[idx].visible = false;
  }
}
