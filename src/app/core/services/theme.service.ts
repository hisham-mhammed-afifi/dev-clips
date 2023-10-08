import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly preferDark!: boolean;
  constructor(@Inject(DOCUMENT) private document: Document) {
    this.preferDark =
      'matchMedia' in window &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (this.currentTheme === 'dark') {
      this.document.documentElement.classList.add('dark');
    }
  }

  toggle() {
    if (this.document.documentElement.classList.contains('dark')) {
      this.document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', '');
    } else {
      this.document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  }

  get currentTheme(): string {
    if (localStorage.getItem('theme')) {
      return localStorage.getItem('theme') ?? '';
    } else if (this.preferDark) {
      localStorage.setItem('theme', 'dark');
      return 'dark';
    } else {
      localStorage.setItem('theme', '');
      return '';
    }
  }
}
