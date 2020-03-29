import { TestBed } from '@angular/core/testing';

import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { FormValidatorModel } from './formvalidator.model';

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ReactiveFormsModule]
  });

  // const fixture = TestBed.createComponent(DynamicFormComponent);
  // component = fixture.componentInstance;
});

describe('Component: FormValidatorModel', () => {
  let model: FormValidatorModel;

  it('should have a defined component', () => {
    model = {
      'anyfield': {
        'display': {
          'name': 'fieldName'
        }
      }
    };
    expect(model).toBeDefined();
    expect(model['anyfield']['displaygroup'].name).toEqual('fieldName');
  });
});
