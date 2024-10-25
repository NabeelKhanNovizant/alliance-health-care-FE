import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-home-start',
  templateUrl: './home-start.component.html',
  styleUrls: ['./home-start.component.scss'] // Fixed typo: 'styleUrl' should be 'styleUrls'
})
export class HomeStartComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav; // Add '!' to assure TypeScript that it will be initialized
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
}
