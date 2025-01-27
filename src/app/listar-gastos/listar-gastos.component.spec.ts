import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarGastosComponent } from './listar-gastos.component';

describe('ListarGastosComponent', () => {
  let component: ListarGastosComponent;
  let fixture: ComponentFixture<ListarGastosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarGastosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarGastosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
