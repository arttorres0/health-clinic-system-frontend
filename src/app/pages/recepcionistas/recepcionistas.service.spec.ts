import { TestBed } from "@angular/core/testing";

import { RecepcionistasService } from "./recepcionistas.service";

describe("RecepcionistasService", () => {
  let service: RecepcionistasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecepcionistasService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
