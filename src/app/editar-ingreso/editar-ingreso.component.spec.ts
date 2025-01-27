import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarIngresoComponent } from './editar-ingreso.component';

describe('EditarIngresoComponent', () => {
  let component: EditarIngresoComponent;
  let fixture: ComponentFixture<EditarIngresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarIngresoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarIngresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
