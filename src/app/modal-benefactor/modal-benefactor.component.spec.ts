import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBenefactorComponent } from './modal-benefactor.component';

describe('ModalBenefactorComponent', () => {
  let component: ModalBenefactorComponent;
  let fixture: ComponentFixture<ModalBenefactorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalBenefactorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalBenefactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
