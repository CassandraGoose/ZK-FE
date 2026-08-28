import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAuth } from 'angular-auth-oidc-client';

import { authConfig } from '../auth/auth.config';
import { NavigationBar } from './navigation-bar';

describe('NavigationBar', () => {
  let component: NavigationBar;
  let fixture: ComponentFixture<NavigationBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationBar],
      providers: [provideAuth(authConfig)],
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
