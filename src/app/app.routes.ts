import { Routes } from '@angular/router';
import { autoLoginPartialRoutesGuard } from 'angular-auth-oidc-client';
import { Home } from './home/home';

export const routes: Routes = [
  { path: '', component: Home, canActivate: [autoLoginPartialRoutesGuard] },
];
