import { Injectable } from '@angular/core';
// import { KeycloakProfile } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userProfile: any | null = null;
  public accessToken: string | undefined;
  
}
