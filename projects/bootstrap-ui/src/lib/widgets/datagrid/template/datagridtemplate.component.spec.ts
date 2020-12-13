import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridtemplateComponent } from './datagridtemplate.component';

describe('GridtemplateComponent', () => {
  let component: GridtemplateComponent;
  let fixture: ComponentFixture<GridtemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridtemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridtemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
