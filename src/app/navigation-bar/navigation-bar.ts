import { Component, inject } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-navigation-bar',
  imports: [],
  templateUrl: './navigation-bar.html',
  styleUrl: './navigation-bar.css',
})
export class NavigationBar {
  private readonly oidcSecurityService = inject(OidcSecurityService);

  logout(): void {
    this.oidcSecurityService.logoffLocal();

    const logoutUri = encodeURIComponent(window.location.origin);
    const clientId = encodeURIComponent(environment.cognitoClientId);

    window.location.href = `${environment.cognitoDomain}/logout?client_id=${clientId}&logout_uri=${logoutUri}`;
  }
}
