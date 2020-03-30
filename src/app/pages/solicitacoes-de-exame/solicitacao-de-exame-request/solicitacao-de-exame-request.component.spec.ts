import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SolicitacaoDeExameRequestComponent } from "./solicitacao-de-exame-request.component";

describe("SolicitacaoDeExameRequestComponent", () => {
  let component: SolicitacaoDeExameRequestComponent;
  let fixture: ComponentFixture<SolicitacaoDeExameRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SolicitacaoDeExameRequestComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitacaoDeExameRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
