import { TestBed } from "@angular/core/testing";

import { ReceitaDeMedicamentosService } from "./receitaDeMedicamentos.service";

describe("ReceitaDeMedicamentosService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: ReceitaDeMedicamentosService = TestBed.get(
      ReceitaDeMedicamentosService
    );
    expect(service).toBeTruthy();
  });
});
