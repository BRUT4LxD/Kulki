/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { KulkaComponent } from './kulka.component';

describe('KulkaComponent', () => {
  let component: KulkaComponent;
  let fixture: ComponentFixture<KulkaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KulkaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KulkaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
