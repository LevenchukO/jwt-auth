import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqPassResetComponent } from './req-pass-reset.component';

describe('ReqPassResetComponent', () => {
  let component: ReqPassResetComponent;
  let fixture: ComponentFixture<ReqPassResetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReqPassResetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReqPassResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
