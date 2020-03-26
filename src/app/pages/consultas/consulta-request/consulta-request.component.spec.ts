import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaRequestComponent } from './consulta-request.component';

describe('ConsultaRequestComponent', () => {
  let component: ConsultaRequestComponent;
  let fixture: ComponentFixture<ConsultaRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
