import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ReceitasDeMedicamentoListComponent } from "./receitas-de-medicamento-list.component";

describe("ReceitasDeMedicamentoListComponent", () => {
  let component: ReceitasDeMedicamentoListComponent;
  let fixture: ComponentFixture<ReceitasDeMedicamentoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReceitasDeMedicamentoListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceitasDeMedicamentoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
