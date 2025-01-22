import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarEvidenciaComponent } from './registrar-evidencia.component';

describe('RegistrarEvidenciaComponent', () => {
  let component: RegistrarEvidenciaComponent;
  let fixture: ComponentFixture<RegistrarEvidenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarEvidenciaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrarEvidenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
