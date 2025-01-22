import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarBenefactorComponent } from './editar-benefactor.component';

describe('EditarBenefactorComponent', () => {
  let component: EditarBenefactorComponent;
  let fixture: ComponentFixture<EditarBenefactorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarBenefactorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarBenefactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
