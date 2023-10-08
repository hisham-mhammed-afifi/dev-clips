import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { FirebaseService } from '../../services/firebase.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isDarkMode!: boolean;
  menuOpen = false;

  @Output() logout_user = new EventEmitter();

  constructor(
    public modalService: ModalService,
    public firebase: FirebaseService,
    public themeService: ThemeService
  ) {
    this.isDarkMode = this.themeService.currentTheme === 'dark';
  }

  ngOnInit(): void {}
}
