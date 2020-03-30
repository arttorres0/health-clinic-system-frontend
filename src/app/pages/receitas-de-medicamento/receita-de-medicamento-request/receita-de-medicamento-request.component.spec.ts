import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ReceitaDeMedicamentoRequestComponent } from "./receita-de-medicamento-request.component";

describe("ReceitaDeMedicamentoRequestComponent", () => {
  let component: ReceitaDeMedicamentoRequestComponent;
  let fixture: ComponentFixture<ReceitaDeMedicamentoRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReceitaDeMedicamentoRequestComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceitaDeMedicamentoRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
