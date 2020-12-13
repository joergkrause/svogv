import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoFormComponent } from './autoform.component';

describe('GridComponent', () => {
  let component: AutoFormComponent;
  let fixture: ComponentFixture<AutoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
