import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonWrapper } from './button-wrapper';

describe('ButtonWrapper', () => {
  let component: ButtonWrapper;
  let fixture: ComponentFixture<ButtonWrapper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonWrapper]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonWrapper);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
