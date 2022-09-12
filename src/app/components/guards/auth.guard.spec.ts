import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard, NotAuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard],
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});

describe('NotAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotAuthGuard],
    });
  });

  it('should ...', inject([NotAuthGuard], (guard: NotAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
