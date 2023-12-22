import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {KeycloakAuthGuard, KeycloakService} from "keycloak-angular";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard extends KeycloakAuthGuard {

  constructor(protected override readonly router: Router, protected readonly keycloak: KeycloakService) {
    super(router, keycloak);
  }

  async isAccessAllowed(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Promise<boolean | UrlTree> {

    if (!this.authenticated) {
      console.log(state.url);
      await this.keycloak.login({
        redirectUri: window.location.origin + state.url,
      });
    }

    this.keycloak.loadUserProfile(false).then(data => console.log(data.email));
    return this.authenticated;
  }

}
