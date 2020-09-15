import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreGermanComponent } from './core-german.component';

describe('CoreGermanComponent', () => {
  let component: CoreGermanComponent;
  let fixture: ComponentFixture<CoreGermanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoreGermanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreGermanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
