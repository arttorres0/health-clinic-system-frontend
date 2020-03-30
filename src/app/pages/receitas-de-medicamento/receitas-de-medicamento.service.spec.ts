import { TestBed } from "@angular/core/testing";

import { ReceitasDeMedicamentoService } from "./receitas-de-medicamento.service";

describe("ReceitasDeMedicamentoService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: ReceitasDeMedicamentoService = TestBed.get(
      ReceitasDeMedicamentoService
    );
    expect(service).toBeTruthy();
  });
});
