import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarVoluntarioModalComponent } from './asignar-voluntario-modal.component';

describe('AsignarVoluntarioModalComponent', () => {
  let component: AsignarVoluntarioModalComponent;
  let fixture: ComponentFixture<AsignarVoluntarioModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignarVoluntarioModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsignarVoluntarioModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
