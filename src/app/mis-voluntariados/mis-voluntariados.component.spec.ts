import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisVoluntariadosComponent } from './mis-voluntariados.component';

describe('MisVoluntariadosComponent', () => {
  let component: MisVoluntariadosComponent;
  let fixture: ComponentFixture<MisVoluntariadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisVoluntariadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MisVoluntariadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
