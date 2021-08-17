import { TestBed } from '@angular/core/testing';

import { ServerAddressInterceptor } from './server-address.interceptor';

describe('ServerAddressInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ServerAddressInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ServerAddressInterceptor = TestBed.inject(ServerAddressInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
