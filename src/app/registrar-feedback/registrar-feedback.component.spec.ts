import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarFeedbackComponent } from './registrar-feedback.component';

describe('RegistrarFeedbackComponent', () => {
  let component: RegistrarFeedbackComponent;
  let fixture: ComponentFixture<RegistrarFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarFeedbackComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrarFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
