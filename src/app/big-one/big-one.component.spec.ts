import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BigOneComponent } from './big-one.component';

describe('BigOneComponent', () => {
  let component: BigOneComponent;
  let fixture: ComponentFixture<BigOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BigOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BigOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
