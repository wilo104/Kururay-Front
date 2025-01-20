import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDetalleVoluntariadoComponent } from './ver-detalle-voluntariado.component';

describe('VerDetalleVoluntariadoComponent', () => {
  let component: VerDetalleVoluntariadoComponent;
  let fixture: ComponentFixture<VerDetalleVoluntariadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerDetalleVoluntariadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerDetalleVoluntariadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
