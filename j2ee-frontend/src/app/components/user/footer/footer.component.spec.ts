import { ComponentFixture, TestBed } from '@angular/core/testing';

import { footerComponent } from './footer.component';

describe('footerComponent', () => {
  let component: footerComponent;
  let fixture: ComponentFixture<footerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [footerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(footerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
