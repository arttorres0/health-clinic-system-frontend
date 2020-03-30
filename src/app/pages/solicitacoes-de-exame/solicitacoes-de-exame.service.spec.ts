import { TestBed } from "@angular/core/testing";

import { SolicitacoesDeExameService } from "./solicitacoes-de-exame.service";

describe("SolicitacoesDeExameService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: SolicitacoesDeExameService = TestBed.get(
      SolicitacoesDeExameService
    );
    expect(service).toBeTruthy();
  });
});
