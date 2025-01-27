import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiInformacionVoluntarioComponent } from './mi-informacion-voluntario.component';

describe('MiInformacionVoluntarioComponent', () => {
  let component: MiInformacionVoluntarioComponent;
  let fixture: ComponentFixture<MiInformacionVoluntarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiInformacionVoluntarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MiInformacionVoluntarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
