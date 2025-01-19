import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesasignarVoluntarioModalComponent } from './desasignar-voluntario-modal.component';

describe('DesasignarVoluntarioModalComponent', () => {
  let component: DesasignarVoluntarioModalComponent;
  let fixture: ComponentFixture<DesasignarVoluntarioModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesasignarVoluntarioModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DesasignarVoluntarioModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
