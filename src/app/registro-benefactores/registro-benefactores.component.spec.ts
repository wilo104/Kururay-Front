import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroBenefactoresComponent } from './registro-benefactores.component';

describe('RegistroBenefactoresComponent', () => {
  let component: RegistroBenefactoresComponent;
  let fixture: ComponentFixture<RegistroBenefactoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroBenefactoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistroBenefactoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
