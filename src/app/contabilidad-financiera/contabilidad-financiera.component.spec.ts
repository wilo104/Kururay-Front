import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContabilidadFinancieraComponent } from './contabilidad-financiera.component';

describe('ContabilidadFinancieraComponent', () => {
  let component: ContabilidadFinancieraComponent;
  let fixture: ComponentFixture<ContabilidadFinancieraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContabilidadFinancieraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContabilidadFinancieraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
