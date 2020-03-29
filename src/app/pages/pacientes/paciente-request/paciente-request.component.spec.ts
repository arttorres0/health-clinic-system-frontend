import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PacienteRequestComponent } from "./paciente-request.component";

describe("PacienteRequestComponent", () => {
  let component: PacienteRequestComponent;
  let fixture: ComponentFixture<PacienteRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PacienteRequestComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
