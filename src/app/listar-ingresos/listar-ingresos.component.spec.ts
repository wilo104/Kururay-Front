import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarIngresosComponent } from './listar-ingresos.component';

describe('ListarIngresosComponent', () => {
  let component: ListarIngresosComponent;
  let fixture: ComponentFixture<ListarIngresosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarIngresosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarIngresosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
