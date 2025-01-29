import { TestBed } from '@angular/core/testing';

import { RestaurarClaveService } from './restaurar-clave.service';

describe('RestaurarClaveService', () => {
  let service: RestaurarClaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestaurarClaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
