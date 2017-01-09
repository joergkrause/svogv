import {Component} from '@angular/core';
import {TestBed, async} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {FormControlEx} from './FormControlEx';


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

