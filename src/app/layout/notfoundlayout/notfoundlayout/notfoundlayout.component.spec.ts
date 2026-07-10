import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotfoundlayoutComponent } from './notfoundlayout.component';

describe('NotfoundlayoutComponent', () => {
  let component: NotfoundlayoutComponent;
  let fixture: ComponentFixture<NotfoundlayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotfoundlayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotfoundlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
