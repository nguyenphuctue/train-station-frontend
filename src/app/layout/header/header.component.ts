import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() collapsedChange = new EventEmitter<boolean>();

  isCollapsed = false;

  constructor(
    private router: Router,
    private keycloak: KeycloakService,

  ) { }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
    this.collapsedChange.emit(this.isCollapsed);
  }

  logout() {
    // this.keycloak.logout();
    this.router.navigate(['/auth/login']);
  }

}
