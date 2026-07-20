import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerlocComponent } from './customerloc.component';

describe('CustomerlocComponent', () => {
  let component: CustomerlocComponent;
  let fixture: ComponentFixture<CustomerlocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerlocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerlocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
