import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarVoluntariadoComponent } from './editar-voluntariado.component';

describe('EditarVoluntariadoComponent', () => {
  let component: EditarVoluntariadoComponent;
  let fixture: ComponentFixture<EditarVoluntariadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarVoluntariadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarVoluntariadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
