import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent {
  @Input() isOpen = false;
  submenuOpen = false;

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  toggleSubmenu() {
    this.submenuOpen = !this.submenuOpen;
  }
}
