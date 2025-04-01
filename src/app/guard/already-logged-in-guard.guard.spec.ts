import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { alreadyLoggedInGuardGuard } from './already-logged-in-guard.guard';

describe('alreadyLoggedInGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => alreadyLoggedInGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
