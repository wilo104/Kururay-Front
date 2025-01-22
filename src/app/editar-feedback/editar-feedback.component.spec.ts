import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarFeedbackComponent } from './editar-feedback.component';

describe('EditarFeedbackComponent', () => {
  let component: EditarFeedbackComponent;
  let fixture: ComponentFixture<EditarFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarFeedbackComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
