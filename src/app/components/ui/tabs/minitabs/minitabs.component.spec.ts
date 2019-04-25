import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinitabsComponent } from './minitabs.component';

describe('MinitabsComponent', () => {
  let component: MinitabsComponent;
  let fixture: ComponentFixture<MinitabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinitabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinitabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
