import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent {
  constructor(
    private keycloak: KeycloakService,

  ) { }

  logout() {
    this.keycloak.logout();
  }
}
