import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarClaveComponent } from './actualizar-clave.component';

describe('ActualizarClaveComponent', () => {
  let component: ActualizarClaveComponent;
  let fixture: ComponentFixture<ActualizarClaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarClaveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActualizarClaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
