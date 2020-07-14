import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AulaBPage } from './aula-b.page';

describe('AulaBPage', () => {
  let component: AulaBPage;
  let fixture: ComponentFixture<AulaBPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AulaBPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AulaBPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
