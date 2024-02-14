import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariableRegistroComponent } from './variable-registro.component';

describe('VariableRegistroComponent', () => {
  let component: VariableRegistroComponent;
  let fixture: ComponentFixture<VariableRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VariableRegistroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VariableRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
