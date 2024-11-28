import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdcaptchaComponent } from './adcaptcha.component';

describe('AdcaptchaComponent', () => {
  let component: AdcaptchaComponent;
  let fixture: ComponentFixture<AdcaptchaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdcaptchaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdcaptchaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
