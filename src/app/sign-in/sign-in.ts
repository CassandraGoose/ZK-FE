import { Component, inject } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-sign-in',
  imports: [],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css',
})
export class SignIn {
  private readonly oidcSecurityService = inject(OidcSecurityService);

  login(): void {
    this.oidcSecurityService.authorize();
  }
}
