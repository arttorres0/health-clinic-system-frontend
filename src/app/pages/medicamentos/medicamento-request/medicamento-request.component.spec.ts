import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MedicamentoRequestComponent } from "./medicamento-request.component";

describe("MedicamentoRequestComponent", () => {
  let component: MedicamentoRequestComponent;
  let fixture: ComponentFixture<MedicamentoRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MedicamentoRequestComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicamentoRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
