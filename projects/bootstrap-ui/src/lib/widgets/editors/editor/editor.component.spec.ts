import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { FormValidatorService } from '../../../services/formvalidator.service';
import { EditorComponent } from './editor.component';

describe('EditorComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;
  let service: FormValidatorService;
  let spy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorComponent);
    const fb = new FormBuilder();
    service = new FormValidatorService(fb);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('accepts formgroup', () => {
    spy = spyOn(service, 'build').and.returnValue({});
    component.userForm = spy;
    expect(component.userForm).toEqual({});
    expect(component.userForm).toHaveBeenCalled();
  });

});
