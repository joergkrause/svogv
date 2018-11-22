import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatagridpaginationComponent } from './datagridpagination.component';

describe('DatagridpaginationComponent', () => {
  let component: DatagridpaginationComponent;
  let fixture: ComponentFixture<DatagridpaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatagridpaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatagridpaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
