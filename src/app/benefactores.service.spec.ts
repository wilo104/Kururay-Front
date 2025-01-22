import { TestBed } from '@angular/core/testing';

import { BenefactoresService } from './benefactores.service';

describe('BenefactoresService', () => {
  let service: BenefactoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BenefactoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
