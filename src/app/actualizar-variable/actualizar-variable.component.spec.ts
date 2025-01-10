import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarVariableComponent } from './actualizar-variable.component';

describe('ActualizarVariableComponent', () => {
  let component: ActualizarVariableComponent;
  let fixture: ComponentFixture<ActualizarVariableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarVariableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActualizarVariableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
