import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariableSistemaComponent } from './variable-sistema.component';

describe('VariableSistemaComponent', () => {
  let component: VariableSistemaComponent;
  let fixture: ComponentFixture<VariableSistemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VariableSistemaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VariableSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
