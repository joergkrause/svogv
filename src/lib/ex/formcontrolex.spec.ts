import {TestBed, async} from '@angular/core/testing';
import {FormControlEx} from './formcontrolex';


describe('FormControlEx', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [],
    });

    TestBed.compileComponents();
  }));

  it('should make an instance', () => {
    let f = new FormControlEx();

    expect(f).not.toBeNull();
  });
});

