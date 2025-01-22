import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroBeneficiariosComponent } from './registro-beneficiarios.component';

describe('RegistroBeneficiariosComponent', () => {
  let component: RegistroBeneficiariosComponent;
  let fixture: ComponentFixture<RegistroBeneficiariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroBeneficiariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistroBeneficiariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
