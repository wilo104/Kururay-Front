import { TestBed } from '@angular/core/testing';

import { VolutariadosService } from './volutariados.service';

describe('VolutariadosService', () => {
  let service: VolutariadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VolutariadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
