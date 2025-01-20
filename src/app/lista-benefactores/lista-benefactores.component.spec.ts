import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaBenefactoresComponent } from './lista-benefactores.component';

describe('ListaBenefactoresComponent', () => {
  let component: ListaBenefactoresComponent;
  let fixture: ComponentFixture<ListaBenefactoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaBenefactoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaBenefactoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
