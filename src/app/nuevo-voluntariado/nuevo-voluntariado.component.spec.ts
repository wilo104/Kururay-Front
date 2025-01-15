import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoVoluntariadoComponent } from './nuevo-voluntariado.component';

describe('NuevoVoluntariadoComponent', () => {
  let component: NuevoVoluntariadoComponent;
  let fixture: ComponentFixture<NuevoVoluntariadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoVoluntariadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NuevoVoluntariadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
