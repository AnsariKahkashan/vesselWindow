import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VesselWindowComponent } from './vessel-window.component';

describe('VesselWindowComponent', () => {
  let component: VesselWindowComponent;
  let fixture: ComponentFixture<VesselWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VesselWindowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VesselWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
