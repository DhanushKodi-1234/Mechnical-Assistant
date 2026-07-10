import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsignupComponent } from './msignup.component';

describe('MsignupComponent', () => {
  let component: MsignupComponent;
  let fixture: ComponentFixture<MsignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MsignupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MsignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
